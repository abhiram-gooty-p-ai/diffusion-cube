import { readFile } from 'fs/promises';
import path from 'path';

// The corpus lives inside this repo (content/wiki/) so it deploys on Vercel
// with no extra step; S3 is the likely eventual home once the corpus grows
// past what's comfortable to commit. All reads go through readSource() so
// swapping in-repo for S3 later is a one-function change, no call-site edits.
// WIKI_PATH can still override this (e.g. to point at a different checkout
// in local dev) but nothing requires it anymore.
const WIKI_PATH = process.env.WIKI_PATH ?? path.join(process.cwd(), 'content', 'wiki');

// The framework question bank ships inside this repo (content/framework.md)
// rather than the external wiki: it's the app's own operating framework, and
// bundling it means it survives deployment regardless of where the pathway
// corpus ends up living.
const FRAMEWORK_FILE = path.join(process.cwd(), 'content', 'framework.md');

// The contributor-side generation prompt — the exact rules for the pathway
// document's output structure (Sections 0-6 + Provenance appendix). Also
// used at runtime for the `pathway-draft` mode, which drafts a user's own
// adoption in the same structure for their review.
const PATHWAY_GENERATION_PROMPT_FILE = path.join(process.cwd(), 'content', 'pathway-generation-prompt.md');

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

export async function loadPathwayGenerationPrompt(): Promise<string> {
  return readSource(PATHWAY_GENERATION_PROMPT_FILE);
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
