-- A user can preview how their adoption would read as a new corpus pathway
-- page, edit it, and "approve" it. Approving flags it here for admin /
-- pathway_contributor curation — it never auto-publishes into the live wiki
-- (content/wiki/pathways/); joining the corpus is a separate, human step.
create table if not exists public.pathway_submissions (
  id uuid primary key default gen_random_uuid(),
  design_id uuid not null references public.designs (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  content text not null,
  status text not null default 'pending_review' check (status in ('pending_review', 'reviewed')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table public.pathway_submissions enable row level security;

create policy "Users can view their own pathway submissions"
  on public.pathway_submissions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own pathway submissions"
  on public.pathway_submissions for insert
  with check (auth.uid() = user_id);

-- No update/delete policy for the owning user — marking a submission
-- "reviewed" is an admin action, done through the service-role client
-- (see app/api/admin/pathway-submissions/review/route.ts), same pattern as
-- role assignment and signup rejection.
