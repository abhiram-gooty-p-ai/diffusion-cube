'use client';

// Lets a contributor pick an existing pathway to join, or create a new one.
// Org name and role are read server-side from contributor_registrations —
// no need to ask again here.

import { useEffect, useState } from 'react';

interface PathwaySummary {
  id: string;
  slug: string;
  title: string;
  sector: string | null;
  created_at: string;
  isContributor: boolean;
}

interface Props {
  onSelect: (pathwayId: string) => void;
  onBack: () => void;
}

export default function PathwaySelector({ onSelect, onBack }: Props) {
  const [pathways, setPathways] = useState<PathwaySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSector, setNewSector] = useState('');

  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetch('/api/pathways')
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then((data: PathwaySummary[]) => {
        setPathways(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load pathways. Try again.');
        setLoading(false);
      });
  }, []);

  async function joinAndSelect(pathwayId: string, alreadyJoined: boolean) {
    if (alreadyJoined) {
      onSelect(pathwayId);
      return;
    }
    setJoining(true);
    setError(null);
    try {
      const res = await fetch(`/api/pathways/${pathwayId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Could not join pathway.');
        return;
      }
      onSelect(pathwayId);
    } catch {
      setError('Could not reach the server. Try again.');
    } finally {
      setJoining(false);
    }
  }

  async function handleCreate() {
    if (!newTitle.trim()) return;
    setCreating(true);
    setError(null);
    try {
      const res = await fetch('/api/pathways', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle.trim(), sector: newSector.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Could not create pathway.'); return; }
      await joinAndSelect(data.id, false);
    } catch {
      setError('Could not create pathway. Try again.');
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-paper p-4 sm:p-8">
      <div className="mx-auto max-w-2xl">
        <button type="button" onClick={onBack} className="mb-6 text-xs font-medium text-ink-soft transition hover:text-coral">
          ← Back
        </button>
        <h1 className="font-display text-2xl font-medium tracking-tight text-navy">Which pathway are you contributing to?</h1>
        <p className="mt-2 text-sm text-ink-soft">Join an existing pathway to add your deployment experience, or start a new one if yours is the first.</p>

        {error && <p className="mt-4 text-sm text-coral">{error}</p>}

        {joining && (
          <p className="mt-4 text-sm text-ink-soft">Joining pathway…</p>
        )}

        <div className="mt-6 space-y-3">
          {loading ? (
            <p className="text-sm text-ink-soft">Loading…</p>
          ) : pathways.length === 0 ? (
            <p className="text-sm text-ink-soft">No pathways yet — create the first one below.</p>
          ) : (
            pathways.map((p) => (
              <button
                key={p.id}
                type="button"
                disabled={joining}
                onClick={() => joinAndSelect(p.id, p.isContributor)}
                className="flex w-full items-start justify-between gap-4 rounded-xl border border-navy/10 bg-white p-4 text-left transition hover:border-coral/50 hover:shadow-sm disabled:opacity-50"
              >
                <div className="min-w-0">
                  <div className="font-display font-medium text-navy">{p.title}</div>
                  {p.sector && <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft">{p.sector}</div>}
                </div>
                {p.isContributor && (
                  <span className="flex-shrink-0 rounded-full bg-navy/8 px-2 py-0.5 text-[10px] font-medium text-navy">Contributing</span>
                )}
              </button>
            ))
          )}
        </div>

        {/* Create new pathway */}
        <div className="mt-8 rounded-xl border border-navy/10 bg-white p-5">
          <h2 className="font-display font-medium text-navy">Start a new pathway</h2>
          <p className="mt-1 text-xs text-ink-soft">Only if your adoption domain isn&apos;t covered above.</p>
          <div className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-soft">Pathway name</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Voice AI for Agricultural Extension"
                className="w-full rounded-lg border border-navy/15 bg-paper px-3 py-2 text-sm text-navy placeholder-ink-soft/50 outline-none focus:border-coral focus:ring-1 focus:ring-coral/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-soft">Sector</label>
              <input
                type="text"
                value={newSector}
                onChange={(e) => setNewSector(e.target.value)}
                placeholder="e.g. Agriculture, Health, Education"
                className="w-full rounded-lg border border-navy/15 bg-paper px-3 py-2 text-sm text-navy placeholder-ink-soft/50 outline-none focus:border-coral focus:ring-1 focus:ring-coral/30"
              />
            </div>
            <button
              type="button"
              onClick={handleCreate}
              disabled={!newTitle.trim() || creating || joining}
              className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-coral disabled:opacity-40"
            >
              {creating ? 'Creating…' : 'Create and continue →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
