import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { hasRole } from '@/lib/roles';
import ContributeGrid from './ContributeGrid';
import ContributeAccessGate from './ContributeAccessGate';

// A dedicated entry point rather than a choice on a shared welcome screen —
// mirrors the pre-revamp Explore/Design split. Shows a grid of the user's
// past contributions (same structure as /adoptions), with a "+ New
// Contribution" button that opens a fresh Contributor-flow workspace —
// unlike /explore, which always starts fresh directly.
//
// Gated a second time beyond the role check: a pathway_contributor's first
// visit here shows a one-time registration form (see migration 0016 and
// ContributeAccessGate) before they ever see the grid.
export default async function ContributePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !(await hasRole(supabase, 'pathway_contributor'))) {
    redirect('/');
  }

  const { data: registration } = await supabase
    .from('contributor_registrations')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!registration) {
    return <ContributeAccessGate userId={user.id} />;
  }

  return <ContributeGrid />;
}
