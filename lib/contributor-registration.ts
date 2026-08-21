import { createClient } from '@/lib/supabase/client';

export const PATHWAY_ROLES = [
  'Sponsoring Organization',
  'Program Owner',
  'Program Management',
  'Program Execution Partner',
  'Technology/Implementation Partner',
  'Funder',
  'Research Partner',
  'Content Partner',
] as const;

export type PathwayRole = typeof PATHWAY_ROLES[number];

// How much of the contributor's own identity gets surfaced to Explorers when
// the companion cites their pathway (see groundingRules()'s "Contributed by"
// attribution in lib/system-prompts.ts) — three mutually exclusive levels,
// nothing shared by default. Maps to contributor_registrations' share_name /
// share_contact / contact_info columns (migration 0023).
export const SHARING_LEVELS = ['none', 'name', 'name_and_email'] as const;
export type SharingLevel = (typeof SHARING_LEVELS)[number];

export interface ContributorRegistrationInput {
  organisationName: string;
  // Set only when the org was picked from the existing-org autocomplete —
  // informational at registration time; the actual org registry row is
  // found-or-created at join time (see app/api/pathways/[id]/join/route.ts),
  // which is when contributor_registrations.org_id gets backfilled.
  organisationUrl: string;
  pathwayRole: PathwayRole | string;
  pocName: string;
  pocEmail: string;
  pathwayDescription: string;
  declarationAccepted: boolean;
  mouAccepted: boolean;
  consentName: boolean;
  consentLogo: boolean;
  consentQuote: boolean;
  consentBlog: boolean;
  sharingLevel: SharingLevel;
}

// One row per contributor, ever — see migration 0016. Insert fails on a
// second attempt for the same user (unique on user_id), which is fine since
// the gate only ever renders once per user in the first place.
export async function submitContributorRegistration(
  userId: string,
  input: ContributorRegistrationInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createClient();
  const { error } = await supabase.from('contributor_registrations').insert({
    user_id: userId,
    organisation_name: input.organisationName,
    // public_links predates the multi-contributor rework (originally a
    // generic "website/LinkedIn/coverage" field) — reused here specifically
    // for the organisation's website, since it's the one place that data
    // still needs to travel through before ensureOrganisation can set it on
    // the org registry row at join time.
    public_links: input.organisationUrl,
    pathway_role: input.pathwayRole,
    poc_name: input.pocName,
    poc_email: input.pocEmail,
    pathway_description: input.pathwayDescription,
    declaration_accepted: input.declarationAccepted,
    mou_accepted: input.mouAccepted,
    terms_accepted_at: input.mouAccepted ? new Date().toISOString() : null,
    consent_name: input.consentName,
    consent_logo: input.consentLogo,
    consent_quote: input.consentQuote,
    consent_blog: input.consentBlog,
    share_name: input.sharingLevel !== 'none',
    share_contact: input.sharingLevel === 'name_and_email',
    contact_info: input.sharingLevel === 'name_and_email' ? input.pocEmail : '',
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
