import { createClient } from '@/lib/supabase/client';

export interface PathwaySubmissionRow {
  id: string;
  design_id: string;
  user_id: string;
  content: string;
  status: 'pending_review' | 'reviewed' | 'published';
  created_at: string;
  reviewed_at: string | null;
}

export interface PathwaySubmissionVersionRow {
  id: string;
  submission_id: string;
  version_number: number;
  content: string;
  commit_message: string;
  created_at: string;
}

// One draft per adoption (design_id is unique on pathway_submissions — see
// migration 0013). Creates the row on first draft, otherwise just updates
// its denormalized `content` pointer to the latest version.
export async function upsertPathwaySubmission(
  designId: string,
  content: string
): Promise<PathwaySubmissionRow | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('pathway_submissions')
    .upsert({ design_id: designId, content }, { onConflict: 'design_id' })
    .select()
    .single();

  if (error) {
    console.error('[pathway-submission-versions] Failed to upsert submission:', error.message);
    return null;
  }
  return data as PathwaySubmissionRow;
}

export async function getPathwaySubmissionByDesign(designId: string): Promise<PathwaySubmissionRow | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from('pathway_submissions').select('*').eq('design_id', designId).maybeSingle();

  if (error) {
    console.error('[pathway-submission-versions] Failed to read submission:', error.message);
    return null;
  }
  return data as PathwaySubmissionRow | null;
}

export async function listPathwaySubmissionVersions(submissionId: string): Promise<PathwaySubmissionVersionRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('pathway_submission_versions')
    .select('*')
    .eq('submission_id', submissionId)
    .order('version_number', { ascending: false });

  if (error) {
    console.error('[pathway-submission-versions] Failed to list versions:', error.message);
    return [];
  }
  return (data as PathwaySubmissionVersionRow[]) ?? [];
}

// Inserts the next version (latest version_number + 1, or 1 if none exist).
export async function insertPathwaySubmissionVersion(
  submissionId: string,
  content: string,
  commitMessage: string,
  previousVersionNumber: number
): Promise<PathwaySubmissionVersionRow | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('pathway_submission_versions')
    .insert({
      submission_id: submissionId,
      version_number: previousVersionNumber + 1,
      content,
      commit_message: commitMessage,
    })
    .select()
    .single();

  if (error) {
    console.error('[pathway-submission-versions] Failed to insert new version:', error.message);
    return null;
  }
  return data as PathwaySubmissionVersionRow;
}

export function formatVersionLabel(versionNumber: number): string {
  return `v${versionNumber}`;
}

// Backend-only executive summary, generated alongside every draft/revision
// (see generateSubmissionExecutiveSummary in lib/adoption-conversation.ts).
// Latest only — upserts on submission_id rather than versioning. Never read
// back by this app's client code; RLS has no select policy for this table
// (see migration 0015), so this insert/update is the only operation that
// will ever succeed from a contributor's own session.
export async function upsertPathwaySubmissionExecSummary(submissionId: string, content: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('pathway_submission_exec_summaries')
    .upsert({ submission_id: submissionId, content, updated_at: new Date().toISOString() }, { onConflict: 'submission_id' });

  if (error) {
    console.error('[pathway-submission-versions] Failed to upsert exec summary:', error.message);
  }
}

// Whether/where a submission is currently live, and what's actually live —
// used for the pane's "Draft" vs "Published" status line (compared against
// whichever version is currently displayed, not just "has this submission
// ever been published") and the chat-driven publish confirmation's "View it
// live" link. Not derived from pathway_submissions.status, since that
// column's check constraint doesn't actually allow a 'published' value (see
// app/api/pathway-submissions/push/route.ts, which sets it anyway — a
// pre-existing no-op, not fixed here); published_pathways.source_submission_id
// is the real source of truth.
export async function getPublishedInfoBySubmission(submissionId: string): Promise<{ slug: string; content: string } | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from('published_pathways')
    .select('slug, content')
    .eq('source_submission_id', submissionId)
    .maybeSingle();
  return data ?? null;
}

export interface PathwayDocStatus {
  versionNumber: number;
  // True only when the LATEST version's content matches what's actually
  // live — a newer, unpublished revision on an already-published submission
  // reports false here, same "reflect the version being shown" rule as the
  // pane (see AdoptionWorkspace/PathwayDocumentPane; there it's the
  // *selected* version being compared, here it's always the latest since
  // that's what this grid displays).
  published: boolean;
}

// Batched status lookup for the "Your Contributions" grid — one round trip
// per table rather than N+1 per card. Keyed by design_id so the caller can
// look a card's adoption id straight up; a design with no submission yet is
// simply absent from the result (no draft to show a status for).
export async function getPathwayDocStatusesByDesignIds(designIds: string[]): Promise<Record<string, PathwayDocStatus>> {
  if (designIds.length === 0) return {};
  const supabase = createClient();

  const { data: submissions } = await supabase.from('pathway_submissions').select('id, design_id').in('design_id', designIds);
  if (!submissions || submissions.length === 0) return {};

  const submissionIds = submissions.map((s) => s.id);

  const [{ data: versions }, { data: published }] = await Promise.all([
    supabase.from('pathway_submission_versions').select('submission_id, version_number, content').in('submission_id', submissionIds),
    supabase.from('published_pathways').select('source_submission_id, content').in('source_submission_id', submissionIds),
  ]);

  const publishedContentBySubmission = new Map((published ?? []).map((p) => [p.source_submission_id, p.content]));
  const latestBySubmission = new Map<string, { versionNumber: number; content: string }>();
  for (const v of versions ?? []) {
    const current = latestBySubmission.get(v.submission_id);
    if (!current || v.version_number > current.versionNumber) {
      latestBySubmission.set(v.submission_id, { versionNumber: v.version_number, content: v.content });
    }
  }

  const result: Record<string, PathwayDocStatus> = {};
  for (const s of submissions) {
    const latest = latestBySubmission.get(s.id);
    if (!latest) continue;
    const publishedContent = publishedContentBySubmission.get(s.id);
    result[s.design_id] = { versionNumber: latest.versionNumber, published: publishedContent === latest.content };
  }
  return result;
}
