import { readdir, readFile } from 'fs/promises';
import path from 'path';
import { createAdminClient } from '@/lib/supabase/admin';

// A fully separate corpus from lib/wiki-loader.ts's content/wiki/pathways/
// (which now grounds Analyse). This one backs /explore (the Diffusion
// Library) and is kept as the standalone Diffusion Library app's own
// content, ported verbatim — see lib/library-pathways.ts for the card data
// and content/library-wiki/pathways/ for the full documents this loader reads.
const LIBRARY_WIKI_DIR = path.join(process.cwd(), 'content', 'library-wiki', 'pathways');

export async function readLibraryPathwayDocument(id: string): Promise<string | null> {
  try {
    return await readFile(path.join(LIBRARY_WIKI_DIR, `${id}.md`), 'utf-8');
  } catch {
    return null;
  }
}

async function libraryPathwayIds(): Promise<string[]> {
  try {
    const files = await readdir(LIBRARY_WIKI_DIR);
    return files.filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3)).sort();
  } catch {
    return [];
  }
}

type PublishedPathwayRow = {
  slug: string;
  title: string | null;
  description: string | null;
  sector: string | null;
  stage: string | null;
  location: string | null;
  tags: string[] | null;
};

// Format a DB row as a YAML-like frontmatter block that matches the shape
// the static loader emits from .md frontmatter, so the overview blob reads
// uniformly regardless of source.
function formatDbFrontmatter(row: PublishedPathwayRow): string {
  const lines: string[] = [];
  if (row.title) lines.push(`title: ${row.title}`);
  if (row.description) lines.push(`description: ${row.description}`);
  if (row.sector) lines.push(`sector: ${row.sector}`);
  if (row.stage) lines.push(`stage: ${row.stage}`);
  if (row.location) lines.push(`location: ${row.location}`);
  if (row.tags?.length) lines.push(`tags: [${row.tags.join(', ')}]`);
  return lines.join('\n');
}

// Concatenates every pathway's frontmatter block, prefixed by its id, for
// the general (no-pathway-selected) system prompt — mirrors the original
// Diffusion Library backend's build_library_overview(). Merges static
// library pathways with community pathways from published_pathways, DB
// taking precedence by slug so a re-published pathway is always the latest.
export async function buildLibraryOverview(): Promise<string> {
  const [ids, dbResult] = await Promise.all([
    libraryPathwayIds(),
    createAdminClient()
      .from('published_pathways')
      .select('slug, title, description, sector, stage, location, tags')
      .order('created_at', { ascending: false }),
  ]);

  const dbRows = (dbResult.data ?? []) as PublishedPathwayRow[];
  const dbSlugs = new Set(dbRows.map((r) => r.slug));

  const staticSections = await Promise.all(
    ids
      .filter((id) => !dbSlugs.has(id))
      .map(async (id) => {
        const text = await readLibraryPathwayDocument(id);
        if (!text) return null;
        const parts = text.split('---');
        const frontmatter = parts.length >= 3 ? parts[1] : '';
        return `[${id}]\n${frontmatter.trim()}`;
      })
  );

  const dbSections = dbRows.map((row) => `[${row.slug}]\n${formatDbFrontmatter(row)}`);

  return [...dbSections, ...staticSections.filter((s): s is string => s !== null)].join('\n\n');
}
