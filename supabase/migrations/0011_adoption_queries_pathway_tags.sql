-- Tags each recorded query with the pathway slug(s) the companion actually
-- drew on to answer it (parsed from that turn's <grid_update> block — see
-- lib/system-prompts.ts's companionSystemPrompt and app/api/chat/route.ts).
-- Without this, adoption_queries was just a flat log with no way to group
-- "what have others asked about a pathway like mine."
alter table public.adoption_queries
  add column if not exists pathway_slugs text[] not null default '{}';
