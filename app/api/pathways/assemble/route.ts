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

// What the model actually returns — micro-innovation units carry `number`
// instead of `content` (see the comment above EXTRACT_TOOL for why).
interface RawExtractedUnit {
  section: 'identity' | 'micro-innovation'
  unit_type: string
  dimension: string | null
  stage: string | null
  content?: string
  number?: number
}

const EXTRACT_PROMPT = (draft: string) => `Extract content units from this pathway document draft, and call extract_units with the result.

For each field in Section 1 (Pathway Identity), add a unit with:
- section: "identity"
- unit_type: one of name, sector, stage, problem, solution
- content: the field's value

For each numbered entry in Section 3 (Micro-Innovations), add a unit with:
- section: "micro-innovation"
- unit_type: one of strategic-decision, tactical-decision, failure-fix, playbook, toolkit-asset — read from the unit's own \`Type:\` line in its tag block (Strategic Decision → strategic-decision, Tactical Decision → tactical-decision, Failure and Fix → failure-fix, Playbook → playbook, Toolkit Asset → toolkit-asset)
- dimension: one of persona, solution, institution, ecosystem — read from the unit's own \`Dimension:\` line in its tag block (lowercase it), not from the subsection heading alone (headings can be omitted or reused across units)
- stage: one of explore, define, pilot, scale — read from the unit's own \`Stage:\` line in its tag block (lowercase it). This is the stage of ORIGIN. If the unit also has an \`Also relevant at:\` line, ignore it for this field — that line is for retrieval only and must never be used as the stage value.
- number: the unit's own sequential number from its title line (\`**N. Title**\`) — do NOT include the unit's text itself, just this number.

Units are plain sequentially numbered (**1.**, **2.**, ...) — there is no composite ID code to parse; every tag comes from the bulleted lines directly under each unit's title.

Ignore Sections 0, 2, 4, 5, 6 and the Source Trace appendix.

Document:
${draft}`

// Forced tool-use rather than "reply with a JSON array" of full unit text —
// asking the model to reproduce long, markdown-formatted unit bodies
// verbatim inside a JSON string proved unreliable in practice (consistent
// JSON syntax errors at the same relative position across repeated retries,
// regardless of max_tokens headroom — a JSON-escaping problem, not a
// truncation one). So the model's job here is classification only:
// identity fields (short values — name/sector/stage/problem/solution) are
// still returned directly, but micro-innovation units return their
// sequential `number` instead of `content` — the actual unit text is then
// sliced straight out of the draft by extractUnitText() below, entirely
// bypassing the model for that large, complex text.
const EXTRACT_TOOL: Anthropic.Tool = {
  name: 'extract_units',
  description: 'Record the content units extracted from a pathway document draft.',
  input_schema: {
    type: 'object',
    properties: {
      units: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            section: { type: 'string', enum: ['identity', 'micro-innovation'] },
            unit_type: { type: 'string' },
            dimension: { type: ['string', 'null'] },
            stage: { type: ['string', 'null'] },
            content: { type: 'string', description: 'Identity units only — the field value.' },
            number: { type: 'integer', description: "Micro-innovation units only — the unit's own sequential number." },
          },
          required: ['section', 'unit_type'],
        },
      },
    },
    required: ['units'],
  },
}

// Slices one micro-innovation unit's full raw text (title, tag block, every
// body field) directly out of the draft — bounded by the start of the next
// numbered unit, or the next section heading if this was the last one.
// Deterministic string parsing instead of an LLM round-trip, since the
// generation prompt guarantees this exact `**N. Title**` structure.
function extractUnitText(draft: string, number: number): string {
  const startMatch = draft.match(new RegExp(`\\*\\*${number}\\.[^\\n]*`))
  if (!startMatch || startMatch.index === undefined) return ''
  const start = startMatch.index
  const rest = draft.slice(start + startMatch[0].length)
  const nextUnitMatch = rest.match(new RegExp(`\\n\\*\\*${number + 1}\\.`))
  const nextSectionMatch = rest.match(/\n#{1,3}\s/)
  const boundaries = [nextUnitMatch, nextSectionMatch]
    .filter((m): m is RegExpMatchArray => !!m && m.index !== undefined)
    .map((m) => m.index as number)
  const relEnd = boundaries.length ? Math.min(...boundaries) : rest.length
  return (startMatch[0] + rest.slice(0, relEnd)).trim()
}

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
    console.error('[assemble] no draft row for design_id:', designId)
    return NextResponse.json(
      { error: 'No draft found for this workspace. Generate a pathway document first.' },
      { status: 400 }
    )
  }
  console.log('[assemble] draft found, length:', draftRow.content.length, 'design_id:', designId)

  // 3. Classify units via LLM (forced tool-use — see EXTRACT_TOOL's comment).
  // The model's output here is small (short identity values, plus a bare
  // number per micro-innovation unit) — well within a plain, non-streaming
  // call, and small enough that the JSON-escaping failures seen when it used
  // to return full unit text don't apply.
  let units: ExtractedUnit[] = []
  try {
    const extraction = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      tools: [EXTRACT_TOOL],
      tool_choice: { type: 'tool', name: 'extract_units' },
      messages: [{ role: 'user', content: EXTRACT_PROMPT(draftRow.content) }],
    })
    const toolUse = extraction.content.find((b) => b.type === 'tool_use')
    if (!toolUse || toolUse.type !== 'tool_use') throw new Error('Model did not call extract_units')
    let rawUnits = (toolUse.input as { units?: unknown }).units
    // Defensive: earlier testing showed the model sometimes JSON-encodes
    // this field as a string instead of returning it natively, even though
    // the schema declares it as an array. Output is small now, so this
    // should be rare, but parse it if it happens rather than failing outright.
    if (typeof rawUnits === 'string') rawUnits = JSON.parse(rawUnits)
    if (!Array.isArray(rawUnits)) throw new Error('Tool input did not contain a units array.')

    // Micro-innovation units carry only a `number` from the model — their
    // actual text is sliced straight out of the draft, never round-tripped
    // through the model as JSON (see extractUnitText's comment above).
    units = (rawUnits as RawExtractedUnit[])
      .map((u): ExtractedUnit | null => {
        if (u.section === 'identity') {
          return { section: u.section, unit_type: u.unit_type, dimension: u.dimension ?? null, stage: u.stage ?? null, content: u.content ?? '' }
        }
        if (typeof u.number !== 'number') return null
        const content = extractUnitText(draftRow.content, u.number)
        if (!content) return null
        return { section: u.section, unit_type: u.unit_type, dimension: u.dimension ?? null, stage: u.stage ?? null, content }
      })
      .filter((u): u is ExtractedUnit => u !== null)
  } catch (err) {
    console.error('[assemble] unit extraction failed:', err)
    return NextResponse.json({ error: 'Could not extract units from the draft. Try again.' }, { status: 500 })
  }

  if (units.length === 0) {
    console.error('[assemble] extraction returned zero units for design_id:', designId)
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
