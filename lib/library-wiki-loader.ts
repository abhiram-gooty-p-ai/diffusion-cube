import { readdir, readFile } from 'fs/promises';
import path from 'path';

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

// Concatenates every pathway's frontmatter block, prefixed by its id, for
// the general (no-pathway-selected) system prompt — mirrors the original
// Diffusion Library backend's build_library_overview().
export async function buildLibraryOverview(): Promise<string> {
  const ids = await libraryPathwayIds();
  const sections = await Promise.all(
    ids.map(async (id) => {
      const text = await readLibraryPathwayDocument(id);
      if (!text) return null;
      const parts = text.split('---');
      const frontmatter = parts.length >= 3 ? parts[1] : '';
      return `[${id}]\n${frontmatter.trim()}`;
    })
  );
  return sections.filter((s): s is string => s !== null).join('\n\n');
}
