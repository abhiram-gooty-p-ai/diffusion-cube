import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { hasAnyRole, hasRole } from '@/lib/roles'

// A contributor "publishing" no longer writes to GitHub directly — it
// submits the current draft for admin approval. Only
// app/api/admin/pathway-publish-requests/review/route.ts's approve branch
// actually commits content/wiki/pathways/<slug>.md and updates
// pathways.content_cache. One request per design (unique on design_id):
// publishing again while already pending just refreshes its content;
// publishing again after a rejection resets it back to pending.
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

  // Drafts are versioned (every generate/revise appends a row — see
  // insertDraftVersion in lib/design-documents.ts), so this must pick the
  // latest explicitly rather than an arbitrary row.
  const { data: draftRow } = await admin
    .from('design_documents')
    .select('content')
    .eq('design_id', designId)
    .eq('doc_type', 'draft')
    .order('version_number', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!draftRow?.content) {
    console.error('[assemble] no draft row for design_id:', designId)
    return NextResponse.json(
      { error: 'No draft found for this workspace. Generate a pathway document first.' },
      { status: 400 }
    )
  }

  const { error: upsertError } = await admin
    .from('pathway_publish_requests')
    .upsert(
      {
        pathway_id: pathwayId,
        design_id: designId,
        requested_by: user.id,
        content: draftRow.content,
        status: 'pending',
        admin_note: '',
        reviewed_by: null,
        reviewed_at: null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'design_id' }
    )

  if (upsertError) {
    console.error('[assemble] publish request failed:', upsertError)
    return NextResponse.json({ error: 'Could not submit for review', detail: upsertError.message }, { status: 500 })
  }

  return NextResponse.json({ status: 'pending_review', content: draftRow.content })
}
