-- Curated Explore-library pathways are identified by a stable string slug,
-- not a row in public.pathways. Resources can therefore belong to either a
-- contributor pathway or one curated library pathway, never both.
alter table public.pathway_resources
  alter column pathway_id drop not null,
  add column if not exists library_pathway_id text;

alter table public.pathway_resources
  add constraint pathway_resources_one_owner
  check (num_nonnulls(pathway_id, library_pathway_id) = 1);

create index if not exists pathway_resources_library_visibility_idx
  on public.pathway_resources(library_pathway_id, visibility, created_at);
