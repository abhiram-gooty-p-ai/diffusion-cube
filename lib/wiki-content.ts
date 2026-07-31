import { readFile } from 'fs/promises';
import path from 'path';

// Reads the same in-repo corpus lib/wiki-loader.ts injects into prompts, but
// for on-demand browsing in the app UI — separate concerns: wiki-loader.ts
// feeds the model, this feeds the /wiki pages a signed-in user reads
// directly. WIKI_PATH lets both point at the same override if set.
const WIKI_PATH = process.env.WIKI_PATH ?? path.join(process.cwd(), 'content', 'wiki');

async function readSource(filePath: string): Promise<string> {
  try {
    return await readFile(filePath, 'utf-8');
  } catch {
    return '';
  }
}

export interface WikiPathwaySummary {
  slug: string;
  title: string;
  description: string;
  category: string;
}

// Parses the pathways index's grouped bullet list:
// # Category
// * [Title](slug.md) - description.
export async function listWikiPathways(): Promise<WikiPathwaySummary[]> {
  const index = await readSource(path.join(WIKI_PATH, 'pathways', 'index.md'));
  if (!index) return [];

  const pathways: WikiPathwaySummary[] = [];
  let category = '';
  const bulletRe = /^\*\s*\[(.+?)\]\((.+?)\.md\)\s*-\s*(.+)$/;

  for (const rawLine of index.split('\n')) {
    const line = rawLine.trim();
    const headingMatch = line.match(/^#\s+(.+)$/);
    if (headingMatch) {
      if (headingMatch[1].trim() !== 'Pathways') category = headingMatch[1].trim();
      continue;
    }
    const m = line.match(bulletRe);
    if (m) pathways.push({ title: m[1], slug: m[2], description: m[3], category });
  }

  return pathways;
}

// The Provenance appendix is contributor-only (see content/pathway-generation-
// prompt.md) — never surfaced to adopters in any mode, including this
// browsing page. Cuts at the first heading whose text mentions "Provenance".
function stripProvenanceAppendix(markdown: string): string {
  const match = markdown.match(/^#{1,6}\s*.*provenance.*$/im);
  if (!match || match.index === undefined) return markdown;
  return markdown.slice(0, match.index).trim();
}

function stripFrontmatter(markdown: string): string {
  return markdown.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
}

export interface WikiPathwayContent {
  title: string;
  content: string;
}

export async function getWikiPathway(slug: string): Promise<WikiPathwayContent | null> {
  const raw = await readSource(path.join(WIKI_PATH, 'pathways', `${slug}.md`));
  if (!raw) return null;

  const titleMatch = raw.match(/^title:\s*(.+)$/m);
  return {
    title: titleMatch?.[1]?.trim() ?? slug,
    content: stripProvenanceAppendix(stripFrontmatter(raw)),
  };
}
