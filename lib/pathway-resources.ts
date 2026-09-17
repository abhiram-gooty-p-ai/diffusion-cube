import { createAdminClient } from '@/lib/supabase/admin';

export interface PublishedPathwayResource {
  id: string;
  pathway_id: string | null;
  library_pathway_id: string | null;
  title: string;
  external_url: string | null;
}

export async function publishedResourcesForPathway(pathwayId: string): Promise<PublishedPathwayResource[]> {
  const { data } = await createAdminClient()
    .from('pathway_resources')
    .select('id, pathway_id, library_pathway_id, title, external_url')
    .eq('pathway_id', pathwayId)
    .eq('visibility', 'published')
    .order('created_at');
  return (data ?? []) as PublishedPathwayResource[];
}

export async function publishedResourcesForLibraryPathway(libraryPathwayId: string): Promise<PublishedPathwayResource[]> {
  const { data } = await createAdminClient()
    .from('pathway_resources')
    .select('id, pathway_id, library_pathway_id, title, external_url')
    .eq('library_pathway_id', libraryPathwayId)
    .eq('visibility', 'published')
    .order('created_at');
  return (data ?? []) as PublishedPathwayResource[];
}

export async function publishedResourcesMarkdown(origin: string, libraryPathwayId?: string): Promise<string> {
  let query = createAdminClient()
    .from('pathway_resources')
    .select('id, pathway_id, library_pathway_id, title, external_url, pathways(slug, title)')
    .eq('visibility', 'published')
    .order('created_at');
  if (libraryPathwayId) query = query.eq('library_pathway_id', libraryPathwayId);
  const { data } = await query;
  if (!data?.length) return '';
  return data.map((resource: any) => {
    const url = resource.external_url || `${origin}/resources/${resource.id}`;
    return `- [${resource.title}](${url}) — reusable material for ${resource.pathways?.title ?? resource.library_pathway_id ?? 'a documented pathway'}.`;
  }).join('\n');
}
