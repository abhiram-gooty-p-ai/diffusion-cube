-- Org registry shown on the contributor signup form. canonical_role is the
-- Org Role label pre-filled when a user selects an existing org — read-only
-- for the user, editable only when registering a brand-new org name.
create table if not exists public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  url text not null default '',
  canonical_role text not null default '',
  created_at timestamptz not null default now()
);

alter table public.organisations enable row level security;

-- Any signed-in user can read orgs for the signup autocomplete.
create policy "Signed-in users can view organisations"
  on public.organisations for select
  using (auth.uid() is not null);

-- Inserts happen server-side only (admin approval confirms a new org into the
-- registry) — no user-facing insert policy.
