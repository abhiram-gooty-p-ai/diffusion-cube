import { createClient } from '@/lib/supabase/server';
import { hasAnyRole } from '@/lib/roles';
import { listWikiPathways } from '@/lib/wiki-content';

// Lightweight index of all pathways — slug, title, contributor — used by the
// client to render source attribution chips on chat messages that cite pathway
// content (pathwaysReferenced from <grid_update>).
export async function GET() {
  const supabase = await createClient();
  const approved = await hasAnyRole(supabase);
  if (!approved) {
    return Response.json({ error: 'Your account is awaiting approval.' }, { status: 403 });
  }

  const pathways = await listWikiPathways();
  const index = pathways.map(({ slug, title, description, sector, stage, timestamp, contributor }) => ({
    slug, title, description, sector, stage, timestamp, contributor,
  }));
  return Response.json(index);
}
