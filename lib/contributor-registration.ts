import { createClient } from '@/lib/supabase/client';

export interface ContributorRegistrationInput {
  organisationName: string;
  organisationType: string;
  pocName: string;
  pocRole: string;
  pocEmail: string;
  pocPhone: string;
  pathwayName: string;
  publicLinks: string;
  logoUrl: string;
  declarationAccepted: boolean;
  mouAccepted: boolean;
  consentName: boolean;
  consentLogo: boolean;
  consentQuote: boolean;
  consentBlog: boolean;
}

// One row per contributor, ever — see migration 0016. Insert fails on a
// second attempt for the same user (unique on user_id), which is fine since
// the gate in ContributorRegistrationGate.tsx only ever renders once per
// user in the first place.
export async function submitContributorRegistration(
  userId: string,
  input: ContributorRegistrationInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createClient();
  const { error } = await supabase.from('contributor_registrations').insert({
    user_id: userId,
    organisation_name: input.organisationName,
    organisation_type: input.organisationType,
    poc_name: input.pocName,
    poc_role: input.pocRole,
    poc_email: input.pocEmail,
    poc_phone: input.pocPhone,
    pathway_name: input.pathwayName,
    public_links: input.publicLinks,
    logo_url: input.logoUrl,
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
