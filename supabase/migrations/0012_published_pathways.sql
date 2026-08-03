-- Admin-published community pathways. Once an admin decides an approved
-- pathway_submissions draft is genuinely ready for other users, "Publish"
-- inserts it here rather than requiring a git commit + redeploy for every
-- new pathway. lib/wiki-content.ts (on-demand /wiki browsing) and
-- lib/wiki-loader.ts (the companion's prompt corpus) both merge this table
-- with the static files in content/wiki/pathways/.
create table if not exists public.published_pathways (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  category text not null default 'From Adopters',
  content text not null,
  source_submission_id uuid references public.pathway_submissions (id) on delete set null,
  published_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

alter table public.published_pathways enable row level security;

-- Intentionally public — that's the whole point of "publish": any approved
-- app user can read it. Inserts only happen through the service-role client
-- (see app/api/admin/pathway-submissions/publish/route.ts); there is no
-- insert/update policy for the normal authenticated role.
create policy "Anyone can view published pathways"
  on public.published_pathways for select
  using (true);

alter table public.pathway_submissions
  drop constraint if exists pathway_submissions_status_check;
alter table public.pathway_submissions
  add constraint pathway_submissions_status_check
  check (status in ('pending_review', 'reviewed', 'published'));
