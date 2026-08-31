-- One-time gate in front of the Contribute flow (see
-- components/ContributorRegistrationGate.tsx and app/(app)/contribute/page.tsx).
-- A pathway_contributor's first visit to /contribute shows a registration
-- form instead of the contributions grid; submitting it inserts exactly one
-- row here, and every later visit skips straight to the grid as before.
-- Fields mirror the "Contributor Brief — Intake, Verification & Publishing
-- Flow" spec's Stages 1 (Profile), 2 (KYC & Declaration), 3 (Light-Touch
-- MOU), and 4 (Attribution Consent) — Stages 5 onward are the existing
-- document-upload-through-publish flow, unchanged by this migration.
create table if not exists public.contributor_registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,

  -- Stage 1: Contributor Profile
  organisation_name text not null,
  organisation_type text not null,
  poc_name text not null,
  poc_role text not null,
  poc_email text not null,
  poc_phone text not null,
  pathway_name text not null,
  public_links text not null default '',
  logo_url text not null default '',

  -- Stage 2 + 3: KYC Declaration and Light-Touch MOU, synthesized into two
  -- acceptance checkboxes rather than separate signed documents.
  declaration_accepted boolean not null default false,
  mou_accepted boolean not null default false,

  -- Stage 4: Attribution Consent — independently revocable, default off,
  -- never implied by registering alone.
  consent_name boolean not null default false,
  consent_logo boolean not null default false,
  consent_quote boolean not null default false,
  consent_blog boolean not null default false,

  created_at timestamptz not null default now()
);

alter table public.contributor_registrations enable row level security;

create policy "Users can view their own registration"
  on public.contributor_registrations for select
  using (auth.uid() = user_id);

create policy "Users can insert their own registration"
  on public.contributor_registrations for insert
  with check (auth.uid() = user_id);
