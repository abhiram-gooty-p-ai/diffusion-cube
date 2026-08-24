import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { hasAnyRole, hasRole } from '@/lib/roles'
import { ghReadFile, ghWriteFile } from '@/lib/github'

// Publishes a contributor's current pathway draft as the pathway's live
// document, verbatim — whatever design_documents (doc_type='draft') holds
// for this design becomes content/wiki/pathways/<slug>.md and
// pathways.content_cache exactly as-is. No app-level reformatting or
// unit extraction: when this pathway already has a published document, the
// contributor's draft was generated as a merge of it (see
// pathwayDraftSystemPrompt's merge rules and generatePathwayDraft in
// lib/adoption-conversation.ts) — the merging happens once, in that
// generation call, not again here.
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (!(await hasAnyRole(supabase))) {
    return NextResponse.json({ error: 'Account not approved' }, { status: 403 })
  }
  if (!(await hasRole(supabase, 'pathway_contributor'))) {
    return NextResponse.json({ error: 'Contributor role required' }, { status: 403 })
  }

  const body = await req.json().catch(() => ({}))
  const { pathwayId, designId } = body as { pathwayId?: string; designId?: string }
  if (!pathwayId) return NextResponse.json({ error: 'pathwayId required' }, { status: 400 })
  if (!designId) return NextResponse.json({ error: 'designId required' }, { status: 400 })

  // Verify the caller is a contributor to this pathway
  const { data: membership } = await supabase
    .from('pathway_contributors')
    .select('user_id')
    .eq('pathway_id', pathwayId)
    .eq('user_id', user.id)
    .maybeSingle()
  if (!membership) {
    return NextResponse.json({ error: 'Not a contributor to this pathway' }, { status: 403 })
  }

  const admin = createAdminClient()

  const { data: pathway, error: pwErr } = await admin
    .from('pathways')
    .select('id, slug')
    .eq('id', pathwayId)
    .single()
  if (pwErr || !pathway) return NextResponse.json({ error: 'Pathway not found' }, { status: 404 })

  const { data: draftRow } = await admin
    .from('design_documents')
    .select('content')
    .eq('design_id', designId)
    .eq('doc_type', 'draft')
    .limit(1)
    .maybeSingle()

  if (!draftRow?.content) {
    console.error('[assemble] no draft row for design_id:', designId)
    return NextResponse.json(
      { error: 'No draft found for this workspace. Generate a pathway document first.' },
      { status: 400 }
    )
  }

  try {
    const assembledPath = `content/wiki/pathways/${pathway.slug}.md`
    const existing = await ghReadFile(assembledPath)
    await ghWriteFile(assembledPath, draftRow.content, `publish pathway: ${pathway.slug}`, existing?.sha)

    // Best-effort — the GitHub commit already succeeded either way.
    await admin.from('pathways').update({ content_cache: draftRow.content }).eq('id', pathwayId)

    return NextResponse.json({ content: draftRow.content, slug: pathway.slug })
  } catch (err) {
    console.error('[assemble] publish failed:', err)
    return NextResponse.json({ error: 'Publish failed', detail: String(err) }, { status: 500 })
  }
}
