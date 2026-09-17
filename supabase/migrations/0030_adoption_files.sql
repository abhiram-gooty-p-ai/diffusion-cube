-- Durable source files attached in Analyse and Contribute. The object itself
-- lives in private S3; this table keeps the owner, adoption, and S3 key used
-- to issue a short-lived read URL.
create table if not exists public.adoption_files (
  id uuid primary key default gen_random_uuid(),
  design_id uuid not null references public.designs(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  file_name text not null,
  object_key text not null unique,
  content_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  created_at timestamptz not null default now()
);

create index if not exists adoption_files_design_id_created_at_idx
  on public.adoption_files (design_id, created_at);

alter table public.adoption_files enable row level security;

create policy "Users can view their own adoption files"
  on public.adoption_files for select
  using (auth.uid() = user_id);

create policy "Users can add their own adoption files"
  on public.adoption_files for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own adoption files"
  on public.adoption_files for delete
  using (auth.uid() = user_id);
