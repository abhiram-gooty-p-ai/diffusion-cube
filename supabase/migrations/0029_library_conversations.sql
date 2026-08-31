-- Saved Explore (/explore, "the Library") conversations for signed-in users
-- only — an anonymous visitor's chat stays purely in-memory (see
-- app/explore/ExploreLibrary.tsx). One row per conversation; pathway_slug/
-- pathway_title are set when the conversation started from a pathway card,
-- null for a general question. Not an "adoption" (designs table) — these are
-- ephemeral-by-default library chats that a signed-in visitor can optionally
-- resume, not a tracked flow with its own grid/meta.
create table if not exists public.library_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  pathway_slug text,
  pathway_title text,
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists library_conversations_user_updated_idx
  on public.library_conversations (user_id, updated_at desc);

alter table public.library_conversations enable row level security;

create policy "Users can view their own library conversations"
  on public.library_conversations for select
  using (auth.uid() = user_id);

create policy "Users can insert their own library conversations"
  on public.library_conversations for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own library conversations"
  on public.library_conversations for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own library conversations"
  on public.library_conversations for delete
  using (auth.uid() = user_id);
