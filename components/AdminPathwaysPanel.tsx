'use client';

import { useState } from 'react';

export interface AdminPathwayRow {
  id: string;
  slug: string;
  title: string;
  sector: string;
  created_at: string;
  contributorCount: number;
}

export default function AdminPathwaysPanel({ initialRows }: { initialRows: AdminPathwayRow[] }) {
  const [rows, setRows] = useState(initialRows);
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function remove(id: string, title: string) {
    if (
      !window.confirm(
        `Delete "${title}"? This removes the pathway and every contributor's units for it from the database. It does not remove anything already published to GitHub. This cannot be undone.`
      )
    )
      return;
    setPending(id);
    setError(null);
    try {
      const res = await fetch('/api/admin/pathways/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pathway_id: id }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? 'Could not delete pathway.');
        return;
      }
      setRows((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setPending(null);
    }
  }

  if (rows.length === 0) {
    return <p className="text-sm text-ink-soft">No pathways yet.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {error && <p className="text-xs text-coral">{error}</p>}
      {rows.map((row) => (
        <div
          key={row.id}
          className="flex items-center justify-between gap-3 rounded-xl border border-navy/10 bg-white px-4 py-3"
        >
          <div className="min-w-0">
            <span className="font-medium text-navy">{row.title}</span>
            <span className="ml-2 text-xs text-ink-soft">
              {row.sector || 'No sector'} · {row.contributorCount} contributor{row.contributorCount === 1 ? '' : 's'} ·{' '}
              {new Date(row.created_at).toLocaleDateString()}
            </span>
          </div>
          <button
            type="button"
            onClick={() => remove(row.id, row.title)}
            disabled={pending === row.id}
            className="flex-shrink-0 rounded-lg border border-coral/30 px-2.5 py-1 text-xs font-medium text-coral transition hover:bg-coral hover:text-white disabled:opacity-50"
          >
            {pending === row.id ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      ))}
    </div>
  );
}
