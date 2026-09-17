alter table public.pathways
  add column if not exists assembled_design_doc_id uuid references public.design_documents(id),
  add column if not exists published_design_doc_id uuid references public.design_documents(id);
