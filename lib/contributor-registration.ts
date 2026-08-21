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

export interface ContributorRegistrationInput {
  organisationName: string;
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
    pathway_role: input.pathwayRole,
    poc_name: input.pocName,
    poc_email: input.pocEmail,
    pathway_description: input.pathwayDescription,
    declaration_accepted: input.declarationAccepted,
    mou_accepted: input.mouAccepted,
    consent_name: input.consentName,
    consent_logo: input.consentLogo,
    consent_quote: input.consentQuote,
    consent_blog: input.consentBlog,
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
