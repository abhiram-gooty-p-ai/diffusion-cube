-- Explore library card fields for published_pathways. These are parsed from
-- the pathway document's frontmatter at publish time by
-- app/api/admin/pathways/publish/route.ts — no separate contributor input
-- required. accent is derived at runtime from the slug (not stored).
alter table public.published_pathways
  add column if not exists location text not null default '';

alter table public.published_pathways
  add column if not exists tags text[] not null default '{}';

alter table public.published_pathways
  add column if not exists stage text not null default '';
