-- Only material a contributor deliberately shares as open-source is a pathway
-- resource. Working attachments are never represented here.
create table if not exists public.pathway_resources (
  id uuid primary key default gen_random_uuid(),
  pathway_id uuid not null references public.pathways(id) on delete cascade,
  adoption_file_id uuid unique references public.adoption_files(id) on delete cascade,
  title text not null,
  external_url text,
  visibility text not null default 'draft' check (visibility in ('draft', 'published')),
  created_by uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  check ((adoption_file_id is not null) <> (external_url is not null))
);

create index if not exists pathway_resources_pathway_visibility_idx
  on public.pathway_resources(pathway_id, visibility, created_at);

alter table public.pathway_resources enable row level security;

create policy "Anyone can view published pathway resources"
  on public.pathway_resources for select using (visibility = 'published');

create policy "Contributors can view their draft resources"
  on public.pathway_resources for select using (created_by = auth.uid());

create policy "Contributors can add their own pathway resources"
  on public.pathway_resources for insert with check (created_by = auth.uid());
