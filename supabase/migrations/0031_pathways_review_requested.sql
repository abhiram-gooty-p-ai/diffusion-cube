alter table public.pathways
  add column if not exists review_requested boolean not null default false;
