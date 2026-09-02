-- Gates contributor publishing behind admin approval. Publishing (button or
-- chat-driven) no longer writes to GitHub directly (see
-- app/api/pathways/assemble/route.ts) — it upserts a request here instead,
-- one per design (a later publish while pending, or after rejection, just
-- updates the same row's content and resets it to pending). An admin
-- approving a request is what actually commits the content to GitHub and
-- updates pathways.content_cache (see app/api/admin/pathway-publish-
-- requests/review/route.ts).
create table if not exists public.pathway_publish_requests (
  id uuid primary key default gen_random_uuid(),
  pathway_id uuid not null references public.pathways (id) on delete cascade,
  design_id uuid not null unique references public.designs (id) on delete cascade,
  requested_by uuid references auth.users (id) on delete set null,
  content text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  admin_note text not null default '',
  reviewed_by uuid references auth.users (id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pathway_publish_requests_pathway_idx
  on public.pathway_publish_requests (pathway_id);

alter table public.pathway_publish_requests enable row level security;

-- A contributor can see and create/update their own requests (via the
-- request-scoped client — the approve/reject action itself always goes
-- through the service-role client in the admin route, never this policy).
create policy "Contributors can view their own publish requests"
  on public.pathway_publish_requests for select
  using (auth.uid() = requested_by);

create policy "Contributors can create their own publish requests"
  on public.pathway_publish_requests for insert
  with check (auth.uid() = requested_by);

create policy "Contributors can update their own pending/rejected requests"
  on public.pathway_publish_requests for update
  using (auth.uid() = requested_by)
  with check (auth.uid() = requested_by);

-- Admins need to see and act on every contributor's requests.
create policy "Admins can view all publish requests"
  on public.pathway_publish_requests for select
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );
