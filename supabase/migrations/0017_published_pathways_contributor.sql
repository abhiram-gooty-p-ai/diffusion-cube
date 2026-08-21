-- Stores the contributing organization's name alongside each published
-- community pathway, so the LLM context and UI can attribute surfaced
-- insights to the contributor rather than asserting them as the Cube's own.
-- For the 7 curated static pathways, contributor is in their frontmatter
-- (contributor: EkStep Foundation) and handled by wiki-loader.ts at runtime
-- without a DB row. This column covers community-contributed pathways only.
ALTER TABLE published_pathways ADD COLUMN contributor_org text;
