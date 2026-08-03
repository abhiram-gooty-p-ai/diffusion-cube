'use client';

import { useState } from 'react';
import Link from 'next/link';
import WikiMarkdown from '@/components/WikiMarkdown';

export interface PathwaySubmissionRow {
  id: string;
  adoptionName: string;
  content: string;
  status: 'pending_review' | 'reviewed' | 'published';
  created_at: string;
  slug?: string;
}

const STATUS_LABEL: Record<PathwaySubmissionRow['status'], string> = {
  pending_review: 'Pending',
  reviewed: 'Reviewed',
  published: 'Published',
};

export default function PathwaySubmissionsPanel({ initialRows }: { initialRows: PathwaySubmissionRow[] }) {
  const [rows, setRows] = useState(initialRows);
  const [openId, setOpenId] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);

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

  async function publish(id: string) {
    setPending(id);
    setPublishError(null);
    try {
      const res = await fetch('/api/admin/pathway-submissions/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submission_id: id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.error || 'Could not publish this pathway.');
        return;
      }
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'published', slug: data.slug } : r)));
    } finally {
      setPending(null);
    }
  }

  if (rows.length === 0) {
    return <p className="text-sm text-ink-soft">No pathway submissions yet.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {publishError && <p className="text-xs text-coral">{publishError}</p>}
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
                    row.status === 'published'
                      ? 'bg-coral-soft text-coral'
                      : row.status === 'reviewed'
                        ? 'bg-paper-dim text-ink-soft'
                        : 'bg-yellow-soft text-navy'
                  }`}
                >
                  {STATUS_LABEL[row.status]}
                </span>
                {row.status === 'published' && row.slug ? (
                  <Link
                    href={`/wiki/${row.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-lg border border-navy/20 px-2.5 py-1 text-xs font-medium text-navy transition hover:border-coral hover:text-coral"
                  >
                    View live
                  </Link>
                ) : (
                  <>
                    {row.status !== 'reviewed' && row.status !== 'published' && (
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        publish(row.id);
                      }}
                      disabled={pending === row.id}
                      className="rounded-lg bg-navy px-2.5 py-1 text-xs font-medium text-white transition hover:bg-coral disabled:opacity-50"
                    >
                      {pending === row.id ? 'Publishing…' : 'Publish'}
                    </button>
                  </>
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
