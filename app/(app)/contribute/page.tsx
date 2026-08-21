import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { hasAnyRole, hasRole } from '@/lib/roles';
import ContributeGrid from './ContributeGrid';
import ContributeAccessGate from './ContributeAccessGate';

export default async function ContributePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !(await hasAnyRole(supabase))) {
    redirect('/');
  }

  const { data: registration } = await supabase
    .from('contributor_registrations')
    .select('id, access_status')
    .eq('user_id', user.id)
    .maybeSingle();

  // No registration yet — show the one-time registration form
  if (!registration) {
    const meta = user.user_metadata ?? {};
    return (
      <ContributeAccessGate
        userId={user.id}
        userName={meta.name ?? ''}
        userEmail={user.email ?? ''}
        userOrganisation={meta.organization ?? ''}
      />
    );
  }

  // Registration submitted but admin hasn't granted pathway_contributor role yet
  const isContributor = await hasRole(supabase, 'pathway_contributor');
  if (!isContributor) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-paper p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral">100 Pathways · Contribute</p>
        <h1 className="font-display text-2xl font-medium tracking-tight text-navy">
          Application under <span className="font-serif italic text-coral">review</span>
        </h1>
        <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
          Your contributor registration has been received. An admin will review it and grant you access
          shortly — you&apos;ll be able to start contributing as soon as that&apos;s done.
        </p>
      </div>
    );
  }

  return <ContributeGrid />;
}
