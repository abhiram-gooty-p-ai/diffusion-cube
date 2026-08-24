-- design_documents.doc_type's original check constraint only allowed
-- ('analysis', 'plan') — from before the multi-contributor rework started
-- storing the Contributor flow's in-progress draft here too (doc_type
-- 'draft', see lib/design-documents.ts's upsertDraftDocument). Every draft
-- insert has been silently failing the constraint ever since, so no draft
-- ever actually reached the DB and publish (app/api/pathways/assemble)
-- could never find one to assemble.
alter table public.design_documents drop constraint if exists design_documents_doc_type_check;
alter table public.design_documents add constraint design_documents_doc_type_check
  check (doc_type in ('analysis', 'plan', 'draft'));
