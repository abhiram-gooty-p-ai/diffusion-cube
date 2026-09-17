import { createAdminClient } from '@/lib/supabase/admin';

export interface PublishedPathwayResource {
  id: string;
  pathway_id: string;
  title: string;
  external_url: string | null;
}

export async function publishedResourcesForPathway(pathwayId: string): Promise<PublishedPathwayResource[]> {
  const { data } = await createAdminClient()
    .from('pathway_resources')
    .select('id, pathway_id, title, external_url')
    .eq('pathway_id', pathwayId)
    .eq('visibility', 'published')
    .order('created_at');
  return (data ?? []) as PublishedPathwayResource[];
}

export async function publishedResourcesMarkdown(origin: string): Promise<string> {
  const { data } = await createAdminClient()
    .from('pathway_resources')
    .select('id, pathway_id, title, external_url, pathways!inner(slug, title)')
    .eq('visibility', 'published')
    .order('created_at');
  if (!data?.length) return '';
  return data.map((resource: any) => {
    const url = resource.external_url || `${origin}/resources/${resource.id}`;
    return `- [${resource.title}](${url}) — reusable material for ${resource.pathways?.title ?? 'a documented pathway'}.`;
  }).join('\n');
}
