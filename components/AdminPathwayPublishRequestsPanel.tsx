'use client';

import { useState } from 'react';
import Link from 'next/link';
import WikiMarkdown from '@/components/WikiMarkdown';

export interface PathwayPublishRequestRow {
  id: string;
  pathwayTitle: string;
  pathwaySlug: string;
  requestedByEmail: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const STATUS_BADGE: Record<PathwayPublishRequestRow['status'], string> = {
  pending: 'bg-yellow-soft text-navy',
  approved: 'bg-coral-soft text-coral',
  rejected: 'bg-navy/10 text-ink-soft',
};

const STATUS_LABEL: Record<PathwayPublishRequestRow['status'], string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
};

// Contributor publishing goes to admin review before going live (see
// app/api/pathways/assemble/route.ts and app/api/admin/pathway-publish-
// requests/review/route.ts) — this panel is where that review happens.
// Approving commits the content to GitHub; rejecting just marks the
// request, leaving the pathway untouched — the contributor can resubmit
// anytime from their own workspace.
export default function AdminPathwayPublishRequestsPanel({ initialRows }: { initialRows: PathwayPublishRequestRow[] }) {
  const [rows, setRows] = useState(initialRows);
  const [openId, setOpenId] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  async function review(id: string, action: 'approve' | 'reject') {
    setPending(id);
    setActionError(null);
    try {
      const res = await fetch('/api/admin/pathway-publish-requests/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: id, action }),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || 'Could not update this request.');
        return;
      }
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: action === 'approve' ? 'approved' : 'rejected' } : r)));
    } finally {
      setPending(null);
    }
  }

  const pendingRows = rows.filter((r) => r.status === 'pending');
  const decidedRows = rows.filter((r) => r.status !== 'pending');
  const openRow = rows.find((r) => r.id === openId) ?? null;

  if (rows.length === 0) {
    return <p className="text-sm text-ink-soft">No pathway publish requests yet.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {actionError && <p className="text-xs text-coral">{actionError}</p>}
      {[...pendingRows, ...decidedRows].map((row) => (
        <div key={row.id} className="rounded-xl border border-navy/10 bg-white">
          <button
            onClick={() => setOpenId(row.id)}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
          >
            <div className="min-w-0">
              <span className="font-medium text-navy">{row.pathwayTitle || 'Untitled Pathway'}</span>
              <span className="ml-2 text-xs text-ink-soft">
                {row.requestedByEmail} · {new Date(row.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${STATUS_BADGE[row.status]}`}>
                {STATUS_LABEL[row.status]}
              </span>
              {row.status === 'pending' ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      review(row.id, 'reject');
                    }}
                    disabled={pending === row.id}
                    className="rounded-lg border border-navy/20 px-2.5 py-1 text-xs font-medium text-navy transition hover:border-coral hover:text-coral disabled:opacity-50"
                  >
                    Reject
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      review(row.id, 'approve');
                    }}
                    disabled={pending === row.id}
                    className="rounded-lg bg-navy px-2.5 py-1 text-xs font-medium text-white transition hover:bg-coral disabled:opacity-50"
                  >
                    {pending === row.id ? 'Working…' : 'Approve'}
                  </button>
                </>
              ) : row.status === 'approved' ? (
                <Link
                  href={`/wiki/${row.pathwaySlug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-lg border border-navy/20 px-2.5 py-1 text-xs font-medium text-navy transition hover:border-coral hover:text-coral"
                >
                  View live
                </Link>
              ) : null}
            </div>
          </button>
        </div>
      ))}

      {openRow && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-navy/40 p-4"
          onClick={() => setOpenId(null)}
        >
          <div
            className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-paper shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-shrink-0 items-center justify-between gap-2 border-b border-navy/10 p-4">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral">Pathway publish request</p>
                <p className="truncate font-display text-sm font-medium text-navy">{openRow.pathwayTitle || 'Untitled Pathway'}</p>
              </div>
              <button
                onClick={() => setOpenId(null)}
                aria-label="Close"
                className="flex-shrink-0 px-1 text-lg leading-none text-ink-soft transition hover:text-navy"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <WikiMarkdown markdown={openRow.content} />
            </div>
            {openRow.status === 'pending' && (
              <div className="flex flex-shrink-0 items-center justify-end gap-2 border-t border-navy/10 p-3">
                {actionError && <p className="mr-auto text-xs text-coral">{actionError}</p>}
                <button
                  onClick={() => review(openRow.id, 'reject')}
                  disabled={pending === openRow.id}
                  className="rounded-lg border border-navy/20 px-3 py-1.5 text-sm font-medium text-navy transition hover:border-coral hover:text-coral disabled:opacity-50"
                >
                  Reject
                </button>
                <button
                  onClick={() => review(openRow.id, 'approve')}
                  disabled={pending === openRow.id}
                  className="rounded-lg bg-navy px-4 py-1.5 text-sm font-medium text-white transition hover:bg-coral disabled:opacity-50"
                >
                  {pending === openRow.id ? 'Working…' : 'Approve'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
