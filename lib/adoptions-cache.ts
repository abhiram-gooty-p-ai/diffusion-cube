import { AdoptionConversation, rowToConversation } from '@/lib/adoption-conversation';
import { createClient } from '@/lib/supabase/client';

// Short-lived, in-memory (per browser tab) cache for the adoptions list —
// navigating back and forth would otherwise re-hit Supabase for the same
// list every time. Any create/delete/update explicitly refreshes the cache
// instead of waiting out the TTL, so it never shows stale data after an
// action the user just took themselves.
const TTL_MS = 60_000;

let cache: { data: AdoptionConversation[]; timestamp: number } | null = null;

export async function fetchAdoptionsList(): Promise<AdoptionConversation[]> {
  if (cache && Date.now() - cache.timestamp < TTL_MS) {
    return cache.data;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;

  const list = (data as Parameters<typeof rowToConversation>[0][]).map(rowToConversation);
  cache = { data: list, timestamp: Date.now() };
  return list;
}

// Call after any create/delete/update so the cache reflects it immediately.
export function setAdoptionsListCache(list: AdoptionConversation[]) {
  cache = { data: list, timestamp: Date.now() };
}

// One adoption by id, read fresh — deliberately not served from the list
// cache above. Deep links (/strengthen?open=<id>) can arrive for a row created
// seconds ago, which a still-warm list cache wouldn't know about, and a
// conversation continued in another tab would come back short of its latest
// messages. A single-row read is cheap enough that correctness wins.
export async function fetchAdoption(id: string): Promise<AdoptionConversation | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from('designs').select('*').eq('id', id).maybeSingle();
  if (error || !data) return null;
  return rowToConversation(data as Parameters<typeof rowToConversation>[0]);
}
