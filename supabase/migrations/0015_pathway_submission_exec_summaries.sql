-- Backend-only executive summary of a pathway submission, generated
-- automatically alongside every draft/revision (see generatePathwayDraft in
-- lib/adoption-conversation.ts) for internal review use. Never surfaced to
-- the contributor — only latest matters, so this upserts on submission_id
-- rather than versioning like pathway_submission_versions does.
create table if not exists public.pathway_submission_exec_summaries (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique references public.pathway_submissions (id) on delete cascade,
  content text not null,
  updated_at timestamptz not null default now()
);

alter table public.pathway_submission_exec_summaries enable row level security;

-- The contributor's own session writes this (generated inline with their
-- draft/revision), but must never read it back — deliberately no select
-- policy for `authenticated`, which defaults to deny. Admin reads go through
-- the service-role client in app/admin/page.tsx, same as every other
-- admin-only read in this schema (published_pathways, user_roles).
create policy "Owners can insert their submission's exec summary"
  on public.pathway_submission_exec_summaries for insert
  with check (
    exists (
      select 1 from public.pathway_submissions ps
      where ps.id = submission_id and ps.user_id = auth.uid()
    )
  );

create policy "Owners can update their submission's exec summary"
  on public.pathway_submission_exec_summaries for update
  using (
    exists (
      select 1 from public.pathway_submissions ps
      where ps.id = submission_id and ps.user_id = auth.uid()
    )
  );
