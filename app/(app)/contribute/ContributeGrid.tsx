'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AdoptionWorkspace from '@/components/AdoptionWorkspace';
import PathwaySelector from '@/components/PathwaySelector';
import { AdoptionConversation } from '@/lib/adoption-conversation';
import { createClient } from '@/lib/supabase/client';
import { fetchAdoptionsList, setAdoptionsListCache } from '@/lib/adoptions-cache';

interface PathwaySummary {
  id: string;
  slug: string;
  title: string;
  sector: string | null;
  description: string | null;
  created_at: string;
  isContributor: boolean;
}

function formatRelativeTime(iso: string): string {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// 'pathways' — top level, one block per pathway the user contributes to.
// 'chats'    — one pathway's own chats/workspaces, as blocks.
// 'pick'     — the pathway selector, for a genuinely new contribution.
// 'new'      — a fresh workspace linked to a pathway (either just picked, or
//              "+ New Chat" within a pathway already being viewed).
// 'existing' — an existing chat/workspace, opened directly.
type View =
  | { kind: 'pathways' }
  | { kind: 'chats'; pathwayId: string }
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
  const myPathways = pathways.filter((p) => p.isContributor);

  // Deep-links (e.g. /contribute?open=<id>) always jump straight to the chat,
  // regardless of which view is currently showing.
  if (loaded && openId && openId !== appliedOpenId && contributions.some((a) => a.id === openId)) {
    setAppliedOpenId(openId);
    setView({ kind: 'existing', id: openId });
  }

  async function deleteContribution(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    if (!window.confirm('Delete this contribution? This cannot be undone.')) return;

    const supabase = createClient();
    const { error } = await supabase.from('designs').delete().eq('id', id);
    if (error) {
      setLoadError('Could not delete that contribution. Try again.');
      return;
    }
    setAdoptions((prev) => {
      const next = prev.filter((a) => a.id !== id);
      setAdoptionsListCache(next);
      return next;
    });
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
  // — either just picked via PathwaySelector, or "+ New Chat" within a
  // pathway already being viewed (skips the picker entirely).
  if (view.kind === 'new') {
    return (
      <AdoptionWorkspace
        key={`new-${view.pathwayId}`}
        initial={null}
        fixedFlow="contributor"
        pathwayId={view.pathwayId}
        onBack={() => setView({ kind: 'chats', pathwayId: view.pathwayId })}
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
    const backPathwayId = existing?.meta.pathwayId;
    return (
      <AdoptionWorkspace
        key={view.id}
        initial={existing}
        onBack={() => setView(backPathwayId ? { kind: 'chats', pathwayId: backPathwayId } : { kind: 'pathways' })}
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

  // Step: one pathway's own chats, as blocks.
  if (view.kind === 'chats') {
    const pathway = pathways.find((p) => p.id === view.pathwayId);
    const chats = contributions.filter((a) => a.meta.pathwayId === view.pathwayId);

    return (
      <div className="flex-1 overflow-y-auto bg-paper p-4 sm:p-8">
        <button
          type="button"
          onClick={() => setView({ kind: 'pathways' })}
          className="mb-4 text-xs font-medium text-ink-soft transition hover:text-coral"
        >
          ← All pathways
        </button>
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-xl">
            <h1 className="font-display text-2xl font-medium tracking-tight text-navy">
              {pathway?.title ?? 'Pathway'}
            </h1>
            {pathway?.sector && (
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft">{pathway.sector}</p>
            )}
            {pathway?.description && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pathway.description}</p>}
          </div>
          <button
            onClick={() => setView({ kind: 'new', pathwayId: view.pathwayId })}
            className="flex-shrink-0 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-coral"
          >
            + New Chat
          </button>
        </div>

        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <p className="text-sm text-ink-soft">Start a new chat from the button above to see it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {chats.map((a) => (
              <div
                key={a.id}
                role="button"
                tabIndex={0}
                onClick={() => setView({ kind: 'existing', id: a.id })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setView({ kind: 'existing', id: a.id });
                  }
                }}
                className="group relative flex cursor-pointer flex-col gap-2 rounded-2xl border border-navy/10 bg-white p-5 text-left transition hover:border-coral/50 hover:shadow-sm"
              >
                <button
                  type="button"
                  onClick={(e) => deleteContribution(e, a.id)}
                  aria-label="Delete chat"
                  className="absolute top-3 right-3 text-ink-soft/50 opacity-0 transition hover:text-coral group-hover:opacity-100"
                >
                  🗑
                </button>
                <div className="pr-5 font-display font-medium text-navy">{a.meta.name || 'New chat'}</div>
                {a.meta.summary && <p className="line-clamp-3 text-sm leading-relaxed text-ink-soft">{a.meta.summary}</p>}
                <div className="mt-auto pt-2 text-[10px] text-ink-soft/70">Updated {formatRelativeTime(a.updatedAt)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Top level: one block per pathway the user contributes to.
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

      {!loaded ? (
        <p className="text-sm text-ink-soft">Loading…</p>
      ) : myPathways.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <p className="text-sm text-ink-soft">Start a new contribution from the button above to see it here.</p>
          {loadError && <p className="text-xs text-coral">{loadError}</p>}
        </div>
      ) : (
        <>
          {loadError && <p className="mb-4 text-xs text-coral">{loadError}</p>}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {myPathways.map((p) => {
              const chatCount = contributions.filter((a) => a.meta.pathwayId === p.id).length;
              return (
                <div
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setView({ kind: 'chats', pathwayId: p.id })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setView({ kind: 'chats', pathwayId: p.id });
                    }
                  }}
                  className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-navy/10 bg-white p-5 text-left transition hover:border-coral/50 hover:shadow-sm"
                >
                  <div className="font-display font-medium text-navy">{p.title}</div>
                  {p.sector && (
                    <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft">{p.sector}</div>
                  )}
                  {p.description && <p className="line-clamp-3 text-sm leading-relaxed text-ink-soft">{p.description}</p>}
                  <div className="mt-auto pt-2 text-[10px] text-ink-soft/70">
                    {chatCount} chat{chatCount === 1 ? '' : 's'}
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
