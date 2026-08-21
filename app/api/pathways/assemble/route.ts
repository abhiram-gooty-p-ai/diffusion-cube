import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { hasAnyRole, hasRole } from '@/lib/roles'
import { assemblePathway } from '@/lib/pathway-assembly'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Stable unit ID: same contributor + same pathway + same cell always produces
// the same ID, so repeated publishes upsert (update) rather than duplicate.
function unitId(pathwayId: string, userId: string, section: string, unitType: string, dimension: string | null, stage: string | null): string {
  const key = `${pathwayId}|${userId}|${section}|${unitType}|${dimension ?? ''}|${stage ?? ''}`
  return 'u_' + createHash('sha256').update(key).digest('hex').slice(0, 12)
}

interface ExtractedUnit {
  section: 'identity' | 'micro-innovation'
  unit_type: string
  dimension: string | null
  stage: string | null
  content: string
}

const EXTRACT_PROMPT = (draft: string) => `Extract content units from this pathway document draft. Return a JSON array only — no other text, no markdown fences.

For each field in Section 1 (Pathway Identity) return:
{ "section": "identity", "unit_type": "<field>", "dimension": null, "stage": null, "content": "<value>" }
where unit_type is one of: name, sector, stage, problem, solution

For each numbered entry in Section 3 (Micro-Innovations) return:
{ "section": "micro-innovation", "unit_type": "<type>", "dimension": "<dim>", "stage": "<stage>", "content": "<full text>" }
where:
- unit_type is one of: strategic-decision, tactical-decision, failure-fix, playbook, toolkit-asset (read from the **Type:** line)
- dimension is one of: persona, solution, institution, ecosystem (from the ## subsection header)
- stage is one of: explore, define, pilot, scale (from the unit code, e.g. [P1.x] → explore, [P2.x] → define, [P3.x] → pilot, [P4.x] → scale)
- content: include the full unit text (title, type line, condition line, body)

Ignore Sections 0, 2, 4, 5, 6 and the Provenance appendix.

Document:
${draft}`

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

  // 1. Get pathway slug for the return value
  const { data: pathway, error: pwErr } = await admin
    .from('pathways')
    .select('id, slug')
    .eq('id', pathwayId)
    .single()
  if (pwErr || !pathway) return NextResponse.json({ error: 'Pathway not found' }, { status: 404 })

  // 2. Read the contributor's current draft
  const { data: draftRow } = await admin
    .from('design_documents')
    .select('content')
    .eq('design_id', designId)
    .eq('doc_type', 'draft')
    .limit(1)
    .maybeSingle()

  if (!draftRow?.content) {
    return NextResponse.json(
      { error: 'No draft found for this workspace. Generate a pathway document first.' },
      { status: 400 }
    )
  }

  // 3. Extract structured units from the draft via LLM
  let units: ExtractedUnit[] = []
  try {
    const extraction = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      messages: [{ role: 'user', content: EXTRACT_PROMPT(draftRow.content) }],
    })
    const raw = extraction.content[0].type === 'text' ? extraction.content[0].text.trim() : '[]'
    units = JSON.parse(raw)
  } catch (err) {
    console.error('[assemble] unit extraction failed:', err)
    return NextResponse.json({ error: 'Could not extract units from the draft. Try again.' }, { status: 500 })
  }

  if (!Array.isArray(units) || units.length === 0) {
    return NextResponse.json({ error: 'No units found in draft. Make sure a pathway document has been generated.' }, { status: 400 })
  }

  // 4. Upsert units into contribution_units with published_at = now
  const now = new Date().toISOString()
  for (const unit of units) {
    const uid = unitId(pathwayId, user.id, unit.section, unit.unit_type, unit.dimension, unit.stage)
    const { error: upsertErr } = await admin
      .from('contribution_units')
      .upsert(
        {
          unit_internal_id: uid,
          pathway_id: pathwayId,
          design_id: designId,
          user_id: user.id,
          section: unit.section,
          unit_type: unit.unit_type,
          dimension: unit.dimension ?? null,
          stage: unit.stage ?? null,
          source_doc: '',
          content: unit.content,
          published_at: now,
        },
        { onConflict: 'pathway_id,unit_internal_id' }
      )
    if (upsertErr) {
      console.error('[assemble] unit upsert failed:', upsertErr.message)
    }
  }

  // 5. Assemble and commit to GitHub
  try {
    const result = await assemblePathway(pathwayId)
    return NextResponse.json({ ...result, slug: pathway.slug })
  } catch (err) {
    console.error('[assemble] assembly failed:', err)
    return NextResponse.json({ error: 'Assembly failed', detail: String(err) }, { status: 500 })
  }
}
