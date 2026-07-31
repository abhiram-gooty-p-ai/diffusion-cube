-- Records every companion-mode user message, for future cross-adoption
-- insight gathering ("what have others asked about a pathway like mine" —
-- explicitly deferred as a live feature, see CLAUDE.md; this just starts
-- capturing the raw material for it). Insert-only from the server
-- (app/api/chat/route.ts); nothing reads this yet.
create table if not exists public.adoption_queries (
  id uuid primary key default gen_random_uuid(),
  design_id uuid references public.designs (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.adoption_queries enable row level security;

create policy "Users can insert their own queries"
  on public.adoption_queries for insert
  with check (auth.uid() = user_id);
