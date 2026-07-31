import { readFile } from 'fs/promises';
import path from 'path';

// The corpus is read from the local filesystem for now (WIKI_PATH points at
// the Diffusion Library wiki checkout); S3 is the likely eventual home. All
// reads go through readSource() so swapping local-disk for S3 later is a
// one-function change, no call-site edits.
//
// NOTE: local reads outside this repo work in dev but NOT on Vercel — before
// deploying, either commit the wiki into this repo or complete the S3 move.
const WIKI_PATH = process.env.WIKI_PATH ?? '/Users/abhiramgooty/projects/Diffusion Library/wiki';

// The framework question bank ships inside this repo (content/framework.md)
// rather than the external wiki: it's the app's own operating framework, and
// bundling it means it survives deployment regardless of where the pathway
// corpus ends up living.
const FRAMEWORK_FILE = path.join(process.cwd(), 'content', 'framework.md');

async function readSource(filePath: string): Promise<string> {
  try {
    return await readFile(filePath, 'utf-8');
  } catch {
    console.error(`[wiki-loader] Could not read ${filePath}`);
    return '';
  }
}

// Parse pathway slugs from the pathways index's relative links:
// * [MahaVISTAAR](mahavistaar.md) - ...
function parsePathwaySlugs(indexMd: string): string[] {
  const slugs: string[] = [];
  const re = /\(([a-z0-9-]+\.md)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(indexMd)) !== null) {
    if (m[1] !== 'index.md') slugs.push(m[1]);
  }
  return slugs;
}

// The AI Diffusion Pathway Framework — dimensions, sub-categories, stage
// weighting, the full question bank (core questions, listening-for, insight
// forms, corpus examples), unit types, and tagging rules. Injected into
// prompts rather than hardcoded in system-prompts.ts.
export async function loadFrameworkContent(): Promise<string> {
  return readSource(FRAMEWORK_FILE);
}

// Loads the pathway corpus: the pathways index plus every pathway document.
// The whole corpus goes into context — with 7 pathways this is fine; revisit
// with retrieval once the corpus grows meaningfully.
export async function loadWikiContext(): Promise<string> {
  const index = await readSource(path.join(WIKI_PATH, 'pathways', 'index.md'));
  if (!index) return '';

  const parts: string[] = [`# Pathways Index\n\n${index}`];

  const slugs = parsePathwaySlugs(index);
  const pages = await Promise.all(
    slugs.map(async (slug) => {
      const page = await readSource(path.join(WIKI_PATH, 'pathways', slug));
      return page ? `# Pathway: ${slug.replace(/\.md$/, '')}\n\n${page}` : '';
    })
  );
  parts.push(...pages.filter(Boolean));

  return parts.join('\n\n---\n\n');
}
