-- Canonical pathway entity — exists independently of any contributor.
-- created_by is the first contributor (audit only, not "owner").
-- slug matches the filename in content/wiki/pathways/ and drafts/<slug>/.
-- content_cache holds the latest assembled document text for fast Explorer
-- reads; updated on every publish by the assembly process (service-role).
-- Version history lives in Git (pathways/<slug>.md commit log), not here.
create table if not exists public.pathways (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  sector text not null default '',
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  content_cache text not null default ''
);

alter table public.pathways enable row level security;

-- Any signed-in user can view pathways (Explorers browse, Contributors pick).
create policy "Signed-in users can view pathways"
  on public.pathways for select
  using (auth.uid() is not null);

-- The first contributor creates the pathway entity after the similarity check
-- passes in the app layer. Gated on the pathway_contributor role.
create policy "Contributors can create pathways"
  on public.pathways for insert
  with check (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'pathway_contributor'
    )
  );

-- content_cache updates happen via the service-role client (assembly process)
-- — no user-facing update policy.
