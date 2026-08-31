-- Carries the adoption's own AdoptionMeta.sector (already required before a
-- Contributor can draft a pathway at all — see contributorSystemPrompt step 1)
-- onto the published pathway, so the corpus's real sector spread can be
-- surfaced (e.g. the "Explore the Pathways Library" intent's opening line)
-- without inventing a separate contributor-facing sector picker. Nullable:
-- rows published before this migration have no sector on record and are
-- simply excluded from sector-based listings, same as an untagged pathway.
alter table public.published_pathways
  add column if not exists sector text;
