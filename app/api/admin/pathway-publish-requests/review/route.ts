import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isAdmin } from '@/lib/roles'
import { ghReadFile, ghWriteFile } from '@/lib/github'

// Approving is the only thing that actually commits a contributor's draft
// live — content/wiki/pathways/<slug>.md and pathways.content_cache, same
// write the old self-serve app/api/pathways/assemble/route.ts used to do
// directly. Rejecting just marks the request so the contributor sees it
// wasn't approved; nothing about the pathway or its draft changes, and
// publishing again from the pane/chat resets the same row back to pending.
export async function POST(req: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!(await isAdmin(supabase, user?.email))) {
    return Response.json({ error: 'Not authorized.' }, { status: 403 })
  }

  const body = await req.json().catch(() => ({}))
  const { requestId, action, note } = body as { requestId?: string; action?: 'approve' | 'reject'; note?: string }
  if (!requestId || (action !== 'approve' && action !== 'reject')) {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const admin = createAdminClient()

  const { data: request, error: fetchError } = await admin
    .from('pathway_publish_requests')
    .select('id, pathway_id, content, status, pathways(slug)')
    .eq('id', requestId)
    .single()

  if (fetchError || !request) {
    return Response.json({ error: 'Request not found.' }, { status: 404 })
  }
  if (request.status !== 'pending') {
    return Response.json({ error: 'This request has already been reviewed.' }, { status: 400 })
  }

  const pathwayRef = request.pathways as unknown as { slug: string } | { slug: string }[] | null
  const slug = Array.isArray(pathwayRef) ? pathwayRef[0]?.slug : pathwayRef?.slug
  if (!slug) {
    return Response.json({ error: 'Pathway not found for this request.' }, { status: 404 })
  }

  if (action === 'approve') {
    try {
      const assembledPath = `content/wiki/pathways/${slug}.md`
      const existing = await ghReadFile(assembledPath)
      await ghWriteFile(assembledPath, request.content, `publish pathway: ${slug}`, existing?.sha)
      await admin.from('pathways').update({ content_cache: request.content }).eq('id', request.pathway_id)
    } catch (err) {
      console.error('[pathway-publish-requests/review] publish failed:', err)
      return Response.json({ error: 'Publish failed', detail: String(err) }, { status: 500 })
    }
  }

  const { error: updateError } = await admin
    .from('pathway_publish_requests')
    .update({
      status: action === 'approve' ? 'approved' : 'rejected',
      admin_note: typeof note === 'string' ? note : '',
      reviewed_by: user?.id ?? null,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', requestId)

  if (updateError) {
    return Response.json({ error: updateError.message }, { status: 500 })
  }

  return Response.json({ ok: true, slug })
}
