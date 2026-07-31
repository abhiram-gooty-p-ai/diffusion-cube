import { readdir } from 'fs/promises';
import path from 'path';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/roles';

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'pathway'
  );
}

async function existingSlugs(admin: ReturnType<typeof createAdminClient>): Promise<Set<string>> {
  const staticDir = path.join(process.cwd(), 'content', 'wiki', 'pathways');
  const staticFiles = await readdir(staticDir).catch(() => [] as string[]);
  const staticSlugs = staticFiles.filter((f) => f.endsWith('.md') && f !== 'index.md').map((f) => f.replace(/\.md$/, ''));

  const { data } = await admin.from('published_pathways').select('slug');
  const publishedSlugs = (data ?? []).map((r) => r.slug);

  return new Set([...staticSlugs, ...publishedSlugs]);
}

function uniqueSlug(base: string, taken: Set<string>): string {
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!(await isAdmin(supabase, user?.email))) {
    return Response.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const { submission_id } = await req.json();
  if (typeof submission_id !== 'string') {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const admin = createAdminClient();

  const { data: submission, error: fetchError } = await admin
    .from('pathway_submissions')
    .select('id, content, design_id, designs(meta)')
    .eq('id', submission_id)
    .single();

  if (fetchError || !submission) {
    return Response.json({ error: 'Submission not found.' }, { status: 404 });
  }

  const design = submission.designs as unknown as { meta?: { name?: string; summary?: string } } | { meta?: { name?: string; summary?: string } }[] | null;
  const meta = Array.isArray(design) ? design[0]?.meta : design?.meta;
  const title = meta?.name || 'Untitled Adoption';
  const description = meta?.summary || '';

  const taken = await existingSlugs(admin);
  const slug = uniqueSlug(slugify(title), taken);

  const { error: insertError } = await admin.from('published_pathways').insert({
    slug,
    title,
    description,
    content: submission.content,
    source_submission_id: submission.id,
    published_by: user?.id,
  });

  if (insertError) {
    return Response.json({ error: insertError.message }, { status: 500 });
  }

  await admin
    .from('pathway_submissions')
    .update({ status: 'published', reviewed_at: new Date().toISOString() })
    .eq('id', submission_id);

  return Response.json({ ok: true, slug });
}
