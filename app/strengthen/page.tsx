import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import StrengthenWorkspace from './StrengthenWorkspace';
import AccessGateMessage from '@/components/AccessGateMessage';
import AppShell from '@/components/AppShell';
import { createClient } from '@/lib/supabase/server';
import { hasAnyRole, hasRole, isAdmin } from '@/lib/roles';

const STRENGTHEN_COPY = {
  eyebrow: '100 Pathways · Strengthen',
  heading: (
    <>
      Strengthen your <span className="font-serif italic text-coral">own</span> adoption
    </>
  ),
  body: "Strengthen does two things: it works through your own AI adoption end to end, turning it into a clear, grounded plan — or, if you already know exactly what you're stuck on, it answers that one specific question about your pathway directly. Either way, everything it tells you traces back to real deployments in the corpus.",
};

// Always visible in the sidebar, approved or not — this page (like /explore
// and /contribute) lives outside the (app) route group so it isn't gated by
// that layout's account-approval screen, and builds its own AppShell instead.
// Its own gating has three tiers: not signed in at all (explain what it
// does, offer to log in/sign up), signed in but not yet approved for
// anything (send them back to /explore rather than stall here — see
// app/login/page.tsx's post-signup redirect for where that "waiting" period
// actually lives), and signed in without the adopter role specifically (same
// explanation, no button since only an admin can grant that).
export default async function StrengthenPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <AppShell email={null} adoptions={[]} isAdmin={false}>
        <AccessGateMessage {...STRENGTHEN_COPY} cta={{ label: 'Log in or sign up', href: '/login' }} />
      </AppShell>
    );
  }

  const email = (await headers()).get('x-user-email');

  if (!(await hasAnyRole(supabase))) {
    redirect('/explore');
  }

  const [{ data: adoptions }, isAdopter, adminAccess] = await Promise.all([
    supabase.from('designs').select('id, meta, updated_at').order('updated_at', { ascending: false }),
    hasRole(supabase, 'adopter'),
    isAdmin(supabase, email),
  ]);

  if (!isAdopter) {
    return (
      <AppShell email={email} adoptions={adoptions ?? []} isAdmin={adminAccess}>
        <AccessGateMessage
          {...STRENGTHEN_COPY}
          body={`${STRENGTHEN_COPY.body} Ask an admin to grant you Explorer access to get started.`}
        />
      </AppShell>
    );
  }

  return (
    <AppShell email={email} adoptions={adoptions ?? []} isAdmin={adminAccess}>
      {/* key="strengthen" forces a fresh mount when navigating here from
          /contribute — otherwise React reconciles both routes' workspace as
          the same instance (same type, same tree position) and carries over
          the other flow's conversation state, ignoring fixedFlow. */}
      <StrengthenWorkspace key="strengthen" />
    </AppShell>
  );
}
