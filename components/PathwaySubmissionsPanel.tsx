'use client';

import { useState } from 'react';
import WikiMarkdown from '@/components/WikiMarkdown';

export interface PathwaySubmissionRow {
  id: string;
  adoptionName: string;
  content: string;
  status: 'pending_review' | 'reviewed';
  created_at: string;
}

export default function PathwaySubmissionsPanel({ initialRows }: { initialRows: PathwaySubmissionRow[] }) {
  const [rows, setRows] = useState(initialRows);
  const [openId, setOpenId] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);

  async function markReviewed(id: string) {
    setPending(id);
    try {
      const res = await fetch('/api/admin/pathway-submissions/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submission_id: id }),
      });
      if (!res.ok) return;
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'reviewed' } : r)));
    } finally {
      setPending(null);
    }
  }

  if (rows.length === 0) {
    return <p className="text-sm text-ink-soft">No pathway submissions yet.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row) => {
        const isOpen = openId === row.id;
        return (
          <div key={row.id} className="rounded-xl border border-navy/10 bg-white">
            <button
              onClick={() => setOpenId(isOpen ? null : row.id)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <div>
                <span className="font-medium text-navy">{row.adoptionName || 'Untitled Adoption'}</span>
                <span className="ml-2 text-xs text-ink-soft">{new Date(row.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${
                    row.status === 'reviewed' ? 'bg-paper-dim text-ink-soft' : 'bg-yellow-soft text-navy'
                  }`}
                >
                  {row.status === 'reviewed' ? 'Reviewed' : 'Pending'}
                </span>
                {row.status !== 'reviewed' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markReviewed(row.id);
                    }}
                    disabled={pending === row.id}
                    className="rounded-lg border border-navy/20 px-2.5 py-1 text-xs font-medium text-navy transition hover:border-coral hover:text-coral disabled:opacity-50"
                  >
                    Mark reviewed
                  </button>
                )}
              </div>
            </button>
            {isOpen && (
              <div className="max-h-[50vh] overflow-y-auto border-t border-navy/10 px-4 py-3">
                <WikiMarkdown markdown={row.content} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
