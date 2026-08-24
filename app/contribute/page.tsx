import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { hasAnyRole, hasRole, isAdmin } from '@/lib/roles';
import ContributeGrid from './ContributeGrid';
import ContributeAccessGate from './ContributeAccessGate';
import AccessGateMessage from '@/components/AccessGateMessage';
import AppShell from '@/components/AppShell';

// Always visible in the sidebar, approved or not — lives outside the (app)
// route group (like /explore and /strengthen) so it isn't gated by that
// layout's account-approval screen, and builds its own AppShell instead.
export default async function ContributePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Explain what it does and offer to log in/sign up rather than redirecting
  // away with nothing shown.
  if (!user) {
    return (
      <AppShell email={null} adoptions={[]} isAdmin={false}>
        <AccessGateMessage
          eyebrow="100 Pathways · Contribute"
          heading={
            <>
              Turn your deployment into a <span className="font-serif italic text-coral">pathway</span>
            </>
          }
          body="Contribute turns your own deployment write-up into a corpus pathway page for the next adopter to learn from — the Cube reads your documents, drafts the page in the framework's structure, and you publish it live yourself once it's ready."
          cta={{ label: 'Log in or sign up', href: '/login' }}
        />
      </AppShell>
    );
  }

  const email = (await headers()).get('x-user-email');

  // Signed in but zero roles at all yet — nothing to show here specifically;
  // /explore is where a pending account waits, not a stalled gate page.
  if (!(await hasAnyRole(supabase))) {
    redirect('/explore');
  }

  const [{ data: adoptions }, adminAccess, { data: registration }] = await Promise.all([
    supabase.from('designs').select('id, meta, updated_at').order('updated_at', { ascending: false }),
    isAdmin(supabase, email),
    supabase.from('contributor_registrations').select('id, access_status').eq('user_id', user.id).maybeSingle(),
  ]);

  // No registration yet — show the one-time registration form
  if (!registration) {
    const meta = user.user_metadata ?? {};
    return (
      <AppShell email={email} adoptions={adoptions ?? []} isAdmin={adminAccess}>
        <ContributeAccessGate
          userId={user.id}
          userName={meta.name ?? ''}
          userEmail={user.email ?? ''}
          userOrganisation={meta.organization ?? ''}
        />
      </AppShell>
    );
  }

  if (registration.access_status === 'rejected') {
    return (
      <AppShell email={email} adoptions={adoptions ?? []} isAdmin={adminAccess}>
        <AccessGateMessage
          eyebrow="100 Pathways · Contribute"
          heading={
            <>
              Registration not <span className="font-serif italic text-coral">approved</span>
            </>
          }
          body="Your contributor registration wasn't approved. If you think this is a mistake, reach out to the 100 Pathways team directly."
        />
      </AppShell>
    );
  }

  // Registration submitted but admin hasn't granted pathway_contributor role yet
  const isContributor = await hasRole(supabase, 'pathway_contributor');
  if (!isContributor) {
    return (
      <AppShell email={email} adoptions={adoptions ?? []} isAdmin={adminAccess}>
        <AccessGateMessage
          eyebrow="100 Pathways · Contribute"
          heading={
            <>
              Application under <span className="font-serif italic text-coral">review</span>
            </>
          }
          body="Your contributor registration has been received. An admin will review it and grant you access shortly — you'll be able to start contributing as soon as that's done."
        />
      </AppShell>
    );
  }

  return (
    <AppShell email={email} adoptions={adoptions ?? []} isAdmin={adminAccess}>
      <ContributeGrid />
    </AppShell>
  );
}
