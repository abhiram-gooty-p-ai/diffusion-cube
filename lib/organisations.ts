// Server-only helpers for the organisations registry.
// Client components should fetch from /api/organisations, not import this.

import { createAdminClient } from '@/lib/supabase/admin'

export interface Organisation {
  id: string
  name: string
  canonical_role: string | null
}

/** Search by name prefix — used for the autocomplete in OrganisationInput. */
export async function searchOrganisations(query: string): Promise<Organisation[]> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('organisations')
    .select('id, name, canonical_role')
    .ilike('name', `%${query}%`)
    .order('name', { ascending: true })
    .limit(10)
  return (data as Organisation[]) ?? []
}

/**
 * Find an existing org by exact name (case-insensitive) or create it.
 * Returns the org id. Used by the join-pathway route.
 */
export async function ensureOrganisation(name: string, canonicalRole?: string): Promise<string> {
  const admin = createAdminClient()
  const trimmed = name.trim()

  // Try exact match first (case-insensitive via ilike + limit 1)
  const { data: existing } = await admin
    .from('organisations')
    .select('id')
    .ilike('name', trimmed)
    .limit(1)
    .maybeSingle()

  if (existing) return existing.id as string

  // Create a new org (service-role bypasses the "inserts via service-role only" RLS)
  const { data: created, error } = await admin
    .from('organisations')
    .insert({ name: trimmed, canonical_role: canonicalRole ?? null })
    .select('id')
    .single()

  if (error || !created) throw new Error(`Could not create organisation "${trimmed}": ${error?.message}`)
  return created.id as string
}
