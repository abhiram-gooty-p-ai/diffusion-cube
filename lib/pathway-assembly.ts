// Assembles a multi-contributor pathway document from:
//   - contribution_units rows in the DB (metadata + unit_internal_id keys)
//   - Per-contributor draft files on GitHub (actual unit text, keyed by unit_internal_id)
//
// Assembly is entirely code-driven except for one small LLM call for Section 6
// (Retrieval Guide). No LLM is involved in structuring or ordering content —
// that happens deterministically from the DB metadata.
//
// Draft file format (drafts/<slug>/<user-id>.md):
//   <!-- unit-id: u_abc123 -->
//   Content of the unit (title bold line + bullet fields)...
//
//   <!-- unit-id: u_def456 -->
//   ...next unit...
//
// Published assembled file: content/wiki/pathways/<slug>.md on GITHUB_BRANCH.
// DB content_cache is updated after every successful assembly.

import Anthropic from '@anthropic-ai/sdk'
import { createAdminClient } from '@/lib/supabase/admin'
import { ghReadFile, ghWriteFile } from '@/lib/github'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ── Canonical ordering ──────────────────────────────────────────────────────

const DIM_ORDER = ['persona', 'solution', 'institution', 'ecosystem'] as const
const STAGE_ORDER = ['explore', 'define', 'pilot', 'scale'] as const

const DIM_LABEL: Record<string, string> = {
  persona: 'Persona',
  solution: 'Solution',
  institution: 'Institution',
  ecosystem: 'Ecosystem',
}
const STAGE_LABEL: Record<string, string> = {
  explore: 'Explore',
  define: 'Define',
  pilot: 'Pilot',
  scale: 'Scale',
}

// ── Internal types ──────────────────────────────────────────────────────────

interface UnitRow {
  id: string
  unit_internal_id: string
  user_id: string
  section: 'identity' | 'micro-innovation'
  unit_type: string
  dimension: string | null
  stage: string | null
  source_doc: string
  content: string | null
  published_at: string
}

interface ContributorInfo {
  name: string
  org_name: string
  role: string
}

interface AssemblyUnit extends UnitRow {
  contributor: ContributorInfo
}

interface NumberedUnit extends AssemblyUnit {
  number: number
}

export interface AssemblyResult {
  content: string
  commitSha: string
  version: number
}

// ── Public entry point ──────────────────────────────────────────────────────

export async function assemblePathway(pathwayId: string): Promise<AssemblyResult> {
  const admin = createAdminClient()

  // 1. Pathway metadata
  const { data: pathway, error: pwErr } = await admin
    .from('pathways')
    .select('id, slug, title, sector')
    .eq('id', pathwayId)
    .single()
  if (pwErr || !pathway) throw new Error(`Pathway not found: ${pathwayId}`)

  // 2. Contributors with their org names
  const { data: contribRows, error: cErr } = await admin
    .from('pathway_contributors')
    .select('user_id, role, organisations(name)')
    .eq('pathway_id', pathwayId)
  if (cErr) throw new Error(`Failed to load contributors: ${cErr.message}`)

  // Fetch each contributor's display name from auth.users (service-role only)
  const contributorMap = new Map<string, ContributorInfo>()
  for (const row of contribRows ?? []) {
    const { data: userRecord } = await admin.auth.admin.getUserById(row.user_id)
    const name: string = userRecord?.user?.user_metadata?.name ?? 'Contributor'
    const orgData = row.organisations as unknown as { name: string } | { name: string }[] | null
    const orgName: string = Array.isArray(orgData) ? (orgData[0]?.name ?? '') : (orgData?.name ?? '')
    contributorMap.set(row.user_id, { name, org_name: orgName, role: row.role })
  }

  // 3. All published contribution units for this pathway (content stored in DB)
  const { data: unitRows, error: uErr } = await admin
    .from('contribution_units')
    .select('id, unit_internal_id, user_id, section, unit_type, dimension, stage, source_doc, content, published_at')
    .eq('pathway_id', pathwayId)
    .not('published_at', 'is', null)
    .order('published_at', { ascending: true })
  if (uErr) throw new Error(`Failed to load units: ${uErr.message}`)

  // 4. Partition into identity vs micro-innovation units
  const identityValues: Record<string, string> = {}
  const microUnits: AssemblyUnit[] = []

  for (const row of unitRows ?? []) {
    const contributor = contributorMap.get(row.user_id) ?? {
      name: 'Contributor',
      org_name: '',
      role: '',
    }
    const unit: AssemblyUnit = { ...row, content: row.content ?? '', contributor }

    if (row.section === 'identity') {
      identityValues[row.unit_type] = unit.content ?? ''
    } else {
      microUnits.push(unit)
    }
  }

  // Sort micro-innovations: dimension → stage → published_at
  microUnits.sort((a, b) => {
    const dA = DIM_ORDER.indexOf(a.dimension as typeof DIM_ORDER[number])
    const dB = DIM_ORDER.indexOf(b.dimension as typeof DIM_ORDER[number])
    if (dA !== dB) return (dA === -1 ? 99 : dA) - (dB === -1 ? 99 : dB)
    const sA = STAGE_ORDER.indexOf(a.stage as typeof STAGE_ORDER[number])
    const sB = STAGE_ORDER.indexOf(b.stage as typeof STAGE_ORDER[number])
    if (sA !== sB) return (sA === -1 ? 99 : sA) - (sB === -1 ? 99 : sB)
    return new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
  })

  // Assign sequential display numbers
  const numbered: NumberedUnit[] = microUnits.map((u, i) => ({ ...u, number: i + 1 }))

  // 6. Determine the next version number
  const assembledPath = `content/wiki/pathways/${pathway.slug}.md`
  const existing = await ghReadFile(assembledPath)
  const version = nextVersion(existing?.content ?? null)

  // 7. Build each section
  const frontmatter = buildFrontmatter(pathway.slug, identityValues, pathway.title, pathway.sector ?? '', version)
  const sec0 = buildSection0(identityValues, pathway.title)
  const sec1 = buildSection1(identityValues, pathway.title, pathway.sector ?? '')
  const sec2 = buildSection2(numbered)
  const sec3 = buildSection3(numbered)
  const sec4 = buildSection4(numbered)
  const sec6 = await buildSection6(numbered)
  const provenance = buildProvenance(contribRows ?? [], contributorMap, numbered)

  const doc = [frontmatter, '', sec0, '', sec1, '', sec2, '', sec3, '', sec4, '', sec6, '', '---', '', provenance].join('\n')

  // 8. Commit assembled file to GitHub
  const { commitSha } = await ghWriteFile(
    assembledPath,
    doc,
    `assemble pathway: ${pathway.slug} (v${version})`,
    existing?.sha
  )

  // 9. Update read cache in DB (best-effort — GitHub commit already succeeded)
  await admin.from('pathways').update({ content_cache: doc }).eq('id', pathwayId)

  return { content: doc, commitSha, version }
}

// ── Section builders ────────────────────────────────────────────────────────

function buildFrontmatter(
  slug: string,
  identity: Record<string, string>,
  fallbackTitle: string,
  fallbackSector: string,
  version: number
): string {
  const today = new Date().toISOString().split('T')[0]
  return [
    '---',
    'type: Pathway',
    `title: ${identity['name'] || fallbackTitle}`,
    `sector: ${identity['sector'] || fallbackSector}`,
    `stage: ${identity['stage'] || ''}`,
    `timestamp: ${today}`,
    `version: v${version}`,
    '---',
  ].join('\n')
}

function buildSection0(identity: Record<string, string>, fallbackTitle: string): string {
  const name = identity['name'] || fallbackTitle
  const problem = identity['problem'] || ''
  const solution = identity['solution'] || ''
  const sector = identity['sector'] || ''

  const lines = [`# 0. Overview`, '', `Community-contributed pathway: **${name}**`]
  if (sector) lines.push(``, `**Sector:** ${sector}`)
  if (problem) lines.push(``, `**Problem:** ${problem}`)
  if (solution) lines.push(``, `**Approach:** ${solution}`)
  return lines.join('\n')
}

function buildSection1(
  identity: Record<string, string>,
  fallbackTitle: string,
  fallbackSector: string
): string {
  const rows = [
    ['Name', identity['name'] || fallbackTitle],
    ['Sector', identity['sector'] || fallbackSector],
    ['Stage', identity['stage'] || 'Not documented'],
    ['Problem', identity['problem'] || 'Not documented'],
    ['Solution approach', identity['solution'] || 'Not documented'],
  ]
  const table = ['| Field | Value |', '|---|---|', ...rows.map(([f, v]) => `| ${f} | ${v} |`)].join('\n')
  return `# 1. Pathway Identity\n\n${table}`
}

function buildSection2(units: NumberedUnit[]): string {
  // Count published units per dimension+stage cell
  const counts: Record<string, Record<string, number>> = {}
  for (const dim of DIM_ORDER) {
    counts[dim] = {}
    for (const stage of STAGE_ORDER) counts[dim][stage] = 0
  }
  for (const u of units) {
    if (u.dimension && u.stage && counts[u.dimension]) {
      counts[u.dimension][u.stage] = (counts[u.dimension][u.stage] ?? 0) + 1
    }
  }

  const dot = (n: number) => (n === 0 ? '○' : n === 1 ? '●' : n === 2 ? '●●' : '●●●')

  const header = '| Dimension | Explore | Define | Pilot | Scale |'
  const sep = '|---|---|---|---|---|'
  const rows = DIM_ORDER.map(
    (dim) => `| ${DIM_LABEL[dim]} | ${STAGE_ORDER.map((s) => dot(counts[dim][s])).join(' | ')} |`
  )

  const gaps: string[] = []
  for (const dim of DIM_ORDER) {
    for (const stage of STAGE_ORDER) {
      if (counts[dim][stage] === 0) {
        gaps.push(`**${DIM_LABEL[dim]} / ${STAGE_LABEL[stage]}** — No documented know-how for this stage yet.`)
      }
    }
  }

  const gapBlock =
    gaps.length > 0
      ? `\n**Coverage gaps:**\n\n${gaps.slice(0, 8).map((g) => `- ${g}`).join('\n')}`
      : ''

  return `# 2. Coverage and Gaps\n\n${[header, sep, ...rows].join('\n')}${gapBlock}`
}

function buildSection3(units: NumberedUnit[]): string {
  if (units.length === 0) return '# 3. Micro-Innovations\n\nNo micro-innovations published yet.'

  const lines: string[] = ['# 3. Micro-Innovations', '']
  let currentDim = ''

  for (const u of units) {
    const dim = u.dimension ?? 'unknown'
    if (dim !== currentDim) {
      lines.push(`## ${DIM_LABEL[dim] ?? dim}`, '')
      currentDim = dim
    }

    const title = extractTitle(u.content ?? '')
    const body = stripTitle(u.content ?? '')
    const date = u.published_at ? new Date(u.published_at).toISOString().split('T')[0] : ''
    const attrib = [u.contributor.name, u.contributor.org_name, u.contributor.role, date]
      .filter(Boolean)
      .join(' · ')

    lines.push(`**${u.number}. ${title}**`)
    if (body) lines.push(body)
    lines.push(``, `*— ${attrib}*`, '')
  }

  return lines.join('\n')
}

function buildSection4(units: NumberedUnit[]): string {
  const eligible = units.filter(
    (u) => u.unit_type === 'toolkit-asset' || u.unit_type === 'playbook'
  )
  if (eligible.length === 0) {
    return '# 4. Toolkits and Playbooks\n\nNone documented.'
  }

  const rows = eligible.slice(0, 6).map((u) => {
    const type = u.unit_type === 'toolkit-asset' ? 'Toolkit Asset' : 'Playbook'
    const condition = extractCondition(u.content ?? '')
    return `| ${u.number} | ${type} | ${condition} |`
  })

  const table = ['| Unit | Type | Reuse condition |', '|---|---|---|', ...rows].join('\n')
  return `# 4. Toolkits and Playbooks\n\n${table}`
}

async function buildSection6(units: NumberedUnit[]): Promise<string> {
  if (units.length === 0) return '# 6. Retrieval Guide\n\nNo units published yet.'

  const summary = units
    .map((u) => `Unit ${u.number} [${u.unit_type}, ${u.dimension ?? '?'}/${u.stage ?? '?'}]: ${extractTitle(u.content ?? '')}`)
    .join('\n')

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 800,
    messages: [
      {
        role: 'user',
        content: `Write a retrieval guide for a pathway document. It is a flat bullet list of realistic questions a future adopter might type, each mapped to the most relevant unit number(s).

Format every line exactly as:
- *"question in their own words"* → Unit N, Unit M

Available units:
${summary}

Rules: cover the range of dimensions; use plain adopter language, no framework jargon; map each question to 1–3 units; write 8–15 questions. Return only the bullet list — no heading, no explanation.`,
      },
    ],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text.trim() : ''
  return `# 6. Retrieval Guide\n\n${text}`
}

function buildProvenance(
  contribRows: Array<{ user_id: string; role: string }>,
  contributorMap: Map<string, ContributorInfo>,
  units: NumberedUnit[]
): string {
  const rows = (contribRows ?? []).map((row) => {
    const info = contributorMap.get(row.user_id) ?? { name: 'Contributor', org_name: '', role: '' }
    const count = units.filter((u) => u.user_id === row.user_id).length
    return `| ${info.name} | ${info.org_name} | ${info.role} | ${count} unit${count !== 1 ? 's' : ''} |`
  })

  const table = ['| Contributor | Organisation | Role | Units |', '|---|---|---|---|', ...rows].join('\n')
  return `## Provenance\n\n${table}`
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function extractTitle(content: string): string {
  const m = content.match(/^\*\*([^*]+)\*\*/)
  return m ? m[1].trim() : content.split('\n')[0].trim() || 'Untitled'
}

function stripTitle(content: string): string {
  return content.replace(/^\*\*[^*]+\*\*\n?/, '').trim()
}

function extractCondition(content: string): string {
  const m = content.match(/Condition\s*[—–-]\s*applies when[:\s]+([^\n]+)/i)
  return m ? m[1].trim() : 'See unit for reuse condition'
}

function nextVersion(existingContent: string | null): number {
  if (!existingContent) return 1
  const m = existingContent.match(/^version:\s*v(\d+)/m)
  return m ? parseInt(m[1], 10) + 1 : 1
}
