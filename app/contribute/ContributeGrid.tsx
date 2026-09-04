'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AdoptionWorkspace from '@/components/AdoptionWorkspace';
import PathwaySelector from '@/components/PathwaySelector';
import { AdoptionConversation } from '@/lib/adoption-conversation';
import { fetchAdoptionsList, setAdoptionsListCache } from '@/lib/adoptions-cache';

interface PathwaySummary {
  id: string;
  slug: string;
  title: string;
  sector: string | null;
  description: string | null;
  created_at: string;
  isContributor: boolean;
  orgs: string[];
}

type Accent = 'coral' | 'yellow' | 'blue' | 'navy';
const ACCENT_ROTATION: Accent[] = ['coral', 'yellow', 'blue', 'navy'];
const orgBadgeClass: Record<Accent, string> = {
  coral: 'bg-coral-soft text-coral',
  yellow: 'bg-yellow-soft text-[#8a6b00]',
  blue: 'bg-blue-soft text-blue',
  navy: 'bg-navy/10 text-navy',
};
const orgChipActiveClass: Record<Accent, string> = {
  coral: 'bg-coral text-white border-coral',
  yellow: 'bg-yellow text-navy border-yellow',
  blue: 'bg-blue text-white border-blue',
  navy: 'bg-navy text-white border-navy',
};

function accentForOrg(org: string, allOrgs: string[]): Accent {
  const index = allOrgs.indexOf(org);
  return ACCENT_ROTATION[index % ACCENT_ROTATION.length];
}

// Turned off for everyone for now — keeping the filter chips, activeOrg
// state, and visiblePathways logic below intact (all inert while this is
// false) rather than deleting them, in case this comes back later.
const SHOW_ORG_FILTER = false;

function formatRelativeTime(iso: string): string {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// 'pathways' — top level, one block per pathway the user contributes to.
//              Clicking a block goes straight into that pathway's chat: the
//              existing one if there is already one, otherwise a fresh one.
// 'pick'     — the pathway selector, for a genuinely new contribution.
// 'new'      — a fresh workspace linked to a pathway just picked/created.
// 'existing' — an existing chat/workspace, opened directly.
type View =
  | { kind: 'pathways' }
  | { kind: 'pick' }
  | { kind: 'new'; pathwayId: string }
  | { kind: 'existing'; id: string };

function ContributeGridContent() {
  const searchParams = useSearchParams();
  const openId = searchParams.get('open');

  const [adoptions, setAdoptions] = useState<AdoptionConversation[]>([]);
  const [pathways, setPathways] = useState<PathwaySummary[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [view, setView] = useState<View>({ kind: 'pathways' });
  const [appliedOpenId, setAppliedOpenId] = useState<string | null>(null);
  const [activeOrg, setActiveOrg] = useState<string>('All');

  function refreshPathways() {
    return fetch('/api/pathways')
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then((pathwaysList: PathwaySummary[]) => setPathways(pathwaysList));
  }

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetchAdoptionsList(),
      fetch('/api/pathways').then((r) => (r.ok ? r.json() : Promise.reject(r.statusText))),
    ])
      .then(([adoptionsList, pathwaysList]: [AdoptionConversation[], PathwaySummary[]]) => {
        if (cancelled) return;
        setAdoptions(adoptionsList);
        setPathways(pathwaysList);
        setLoaded(true);
      })
      .catch(() => {
        if (cancelled) return;
        setLoadError('Could not load your contributions.');
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // The full list is shared (same cache as /adoptions) — this page only
  // shows the Contributor-flow slice of it.
  const contributions = adoptions.filter((a) => a.meta.flow === 'contributor');

  // All orgs actually contributing somewhere in the corpus, in first-seen
  // order — drives both the filter chips and each card's stable badge color.
  const allOrgs = Array.from(new Set(pathways.flatMap((p) => p.orgs)));
  const visiblePathways =
    activeOrg === 'All' ? pathways : pathways.filter((p) => p.orgs.includes(activeOrg));

  // Deep-links (e.g. /contribute?open=<id>) always jump straight to the chat,
  // regardless of which view is currently showing.
  if (loaded && openId && openId !== appliedOpenId && contributions.some((a) => a.id === openId)) {
    setAppliedOpenId(openId);
    setView({ kind: 'existing', id: openId });
  }

  // Step: pick (or create) the pathway a brand-new contribution belongs to.
  if (view.kind === 'pick') {
    return (
      <PathwaySelector
        onSelect={(pathwayId) => {
          // Joining (or creating) just happened by the time onSelect fires —
          // the pathways list was fetched once on mount and never refetched
          // since, so without this the grid would keep showing a stale
          // "not yet a contributor" state (and a brand-new pathway wouldn't
          // be in the list at all) when the user backs out to it.
          void refreshPathways();
          setView({ kind: 'new', pathwayId });
        }}
        onBack={() => setView({ kind: 'pathways' })}
      />
    );
  }

  // Step: contributor workspace for a brand-new design, linked to a pathway
  // just picked or created via PathwaySelector.
  if (view.kind === 'new') {
    return (
      <AdoptionWorkspace
        key={`new-${view.pathwayId}`}
        initial={null}
        fixedFlow="contributor"
        pathwayId={view.pathwayId}
        onBack={() => setView({ kind: 'pathways' })}
        onCreated={(c) =>
          setAdoptions((prev) => {
            const next = [c, ...prev];
            setAdoptionsListCache(next);
            return next;
          })
        }
        onChange={(c) =>
          setAdoptions((prev) => {
            const next = prev.map((a) => (a.id === c.id ? c : a));
            setAdoptionsListCache(next);
            return next;
          })
        }
      />
    );
  }

  if (view.kind === 'existing') {
    const existing = contributions.find((a) => a.id === view.id) ?? null;
    return (
      <AdoptionWorkspace
        key={view.id}
        initial={existing}
        onBack={() => setView({ kind: 'pathways' })}
        onChange={(c) =>
          setAdoptions((prev) => {
            const next = prev.map((a) => (a.id === c.id ? c : a));
            setAdoptionsListCache(next);
            return next;
          })
        }
      />
    );
  }

  // Top level: one block per pathway in the corpus, optionally narrowed by
  // org. Clicking a block goes straight into that pathway's chat — the most
  // recently updated one if the user already has one, otherwise a fresh chat
  // that joins them onto it (same join-on-open behavior PathwaySelector uses).
  function openPathway(pathwayId: string) {
    const chat = contributions.find((a) => a.meta.pathwayId === pathwayId);
    setView(chat ? { kind: 'existing', id: chat.id } : { kind: 'new', pathwayId });
  }

  return (
    <div className="flex-1 overflow-y-auto bg-paper p-4 sm:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-xl">
          <h1 className="font-display text-2xl font-medium tracking-tight text-navy">Share your learnings.</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            The Cube turns your adoption journey — the decisions, the frictions, what worked — into a pathway others
            can learn from.
          </p>
        </div>
        <button
          onClick={() => setView({ kind: 'pick' })}
          className="flex-shrink-0 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-coral"
        >
          + New Contribution
        </button>
      </div>

      {SHOW_ORG_FILTER && allOrgs.length > 0 && (
        <div className="mb-6">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft">Filter by organization</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveOrg('All')}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                activeOrg === 'All' ? 'border-navy bg-navy text-white' : 'border-navy/15 bg-white text-navy hover:border-navy/40'
              }`}
            >
              All orgs
            </button>
            {allOrgs.map((org) => {
              const accent = accentForOrg(org, allOrgs);
              return (
                <button
                  key={org}
                  onClick={() => setActiveOrg(org)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    activeOrg === org ? orgChipActiveClass[accent] : 'border-navy/15 bg-white text-navy hover:border-navy/40'
                  }`}
                >
                  {org}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!loaded ? (
        <p className="text-sm text-ink-soft">Loading…</p>
      ) : visiblePathways.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <p className="text-sm text-ink-soft">
            {pathways.length === 0
              ? 'Start a new contribution from the button above to see it here.'
              : 'No pathways from this organization yet.'}
          </p>
          {loadError && <p className="text-xs text-coral">{loadError}</p>}
        </div>
      ) : (
        <>
          {loadError && <p className="mb-4 text-xs text-coral">{loadError}</p>}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visiblePathways.map((p) => {
              const chat = contributions.find((a) => a.meta.pathwayId === p.id);
              return (
                <div
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => openPathway(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openPathway(p.id);
                    }
                  }}
                  className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-navy/10 bg-white p-5 text-left transition hover:border-coral/50 hover:shadow-sm"
                >
                  <div className="font-display font-medium text-navy">{p.title}</div>
                  {p.sector && (
                    <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft">{p.sector}</div>
                  )}
                  {p.orgs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {p.orgs.map((org) => (
                        <span
                          key={org}
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${orgBadgeClass[accentForOrg(org, allOrgs)]}`}
                        >
                          {org}
                        </span>
                      ))}
                    </div>
                  )}
                  {p.description && <p className="line-clamp-3 text-sm leading-relaxed text-ink-soft">{p.description}</p>}
                  <div className="mt-auto pt-2 text-[10px] text-ink-soft/70">
                    {chat ? `Updated ${formatRelativeTime(chat.updatedAt)}` : p.isContributor ? 'Not started yet' : 'Join to contribute'}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default function ContributeGrid() {
  return (
    <Suspense fallback={null}>
      <ContributeGridContent />
    </Suspense>
  );
}
