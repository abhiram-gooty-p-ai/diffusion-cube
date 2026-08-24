-- Links contributors to pathways. One row per person per pathway — a person
-- can contribute to multiple pathways (multiple rows) and multiple people
-- from the same org can contribute to the same pathway. org_role captures
-- the role label at join time, which may differ from the org's canonical_role
-- if the user registered with a new org and typed their own role.
create table if not exists public.pathway_contributors (
  id uuid primary key default gen_random_uuid(),
  pathway_id uuid not null references public.pathways (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  org_id uuid references public.organisations (id) on delete set null,
  org_role text not null default '',
  joined_at timestamptz not null default now(),
  unique (pathway_id, user_id)
);

alter table public.pathway_contributors enable row level security;

-- Any signed-in user can see who contributes to a pathway.
create policy "Signed-in users can view pathway contributors"
  on public.pathway_contributors for select
  using (auth.uid() is not null);

-- A contributor registers themselves on a pathway when they first open a
-- workspace for it.
create policy "Contributors can join pathways"
  on public.pathway_contributors for insert
  with check (auth.uid() = user_id);
