'use client';

import { InlineRun, parsePlanMarkdown, parseStatusBullet, splitInlineBold } from '@/lib/adoption-plan-markdown';
import { downloadPlanAsPdf } from '@/lib/adoption-plan-pdf';
import WikiMarkdown from '@/components/WikiMarkdown';

export interface VersionOption {
  version_number: number;
  created_at: string;
}

interface Props {
  title: string;
  markdown: string;
  loading: boolean;
  error: string | null;
  deploymentName: string;
  onClose: () => void;
  filenameSuffix: string;
  loadingLabel: string;
  version?: string;
  versions?: VersionOption[];
  selectedVersionNumber?: number;
  onSelectVersion?: (versionNumber: number) => void;
  // 'modal' (default): fixed overlay dialog.
  // 'panel': fills its container — used inside the resizable side panel.
  mode?: 'modal' | 'panel';
}

function InlineText({ text }: { text: string }) {
  return (
    <>
      {splitInlineBold(text).map((run: InlineRun, i) =>
        run.bold ? <strong key={i}>{run.text}</strong> : <span key={i}>{run.text}</span>
      )}
    </>
  );
}

function ContentBlocks({
  blocks,
  loading,
  error,
  loadingLabel,
}: {
  blocks: ReturnType<typeof parsePlanMarkdown>;
  loading: boolean;
  error: string | null;
  loadingLabel: string;
}) {
  return (
    <>
      {error && <p className="text-coral text-sm">{error}</p>}
      {!error && blocks.length === 0 && loading && (
        <p className="animate-pulse text-sm text-ink-soft">{loadingLabel}</p>
      )}
      {!error &&
        blocks.map((block, i) => {
          switch (block.type) {
            case 'h2':
              return (
                <h2 key={i} className="mb-2 mt-2 font-display text-xl font-medium text-navy">
                  <InlineText text={block.text} />
                </h2>
              );
            case 'h3':
              return (
                <h3 key={i} className="mb-1.5 mt-5 font-display text-base font-medium text-navy">
                  <InlineText text={block.text} />
                </h3>
              );
            case 'italic':
              return (
                <p key={i} className="mb-1 font-serif text-sm italic text-ink-soft">
                  <InlineText text={block.text} />
                </p>
              );
            case 'paragraph':
              return (
                <p key={i} className="mb-3 text-sm leading-relaxed">
                  <InlineText text={block.text} />
                </p>
              );
            case 'bullets':
              return (
                <ul key={i} className="mb-3 list-none space-y-1 pl-0">
                  {block.items.map((item, j) => {
                    const { status, text } = parseStatusBullet(item);
                    return (
                      <li key={j} className="flex items-baseline gap-2 text-sm leading-relaxed">
                        {status ? (
                          <span
                            className="inline-block h-2.5 w-2.5 flex-shrink-0 translate-y-[1px] rounded-full"
                            style={{ backgroundColor: '#ff6543' }}
                            aria-hidden
                          />
                        ) : (
                          <span className="flex-shrink-0" aria-hidden>
                            •
                          </span>
                        )}
                        <span>
                          <InlineText text={text} />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              );
            case 'numbered':
              return (
                <ol key={i} className="mb-3 list-decimal space-y-1 pl-5">
                  {block.items.map((item, j) => (
                    <li key={j} className="text-sm leading-relaxed">
                      <InlineText text={item} />
                    </li>
                  ))}
                </ol>
              );
            default:
              return null;
          }
        })}
      {!error && loading && blocks.length > 0 && (
        <p className="mt-2 animate-pulse text-xs text-ink-soft">Generating…</p>
      )}
    </>
  );
}

export default function AdoptionPlanModal({
  title,
  markdown,
  loading,
  error,
  deploymentName,
  onClose,
  filenameSuffix,
  loadingLabel,
  version,
  versions,
  selectedVersionNumber,
  onSelectVersion,
  mode = 'modal',
}: Props) {
  const blocks = parsePlanMarkdown(markdown);

  function handleDownload() {
    const safeName = (deploymentName || 'deployment').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    downloadPlanAsPdf(markdown, `${safeName}-${filenameSuffix}.pdf`);
  }

  // Panel mode: fills its container (used inside the resizable side panel).
  // The tab bar above already has the title and close button.
  if (mode === 'panel') {
    return (
      <div className="flex h-full flex-col overflow-hidden">
        {/* Panel header — mirrors PathwayDocumentPane's header style */}
        <div className="flex flex-shrink-0 items-center justify-between gap-2 border-b border-navy/10 p-3">
          <h2 className="font-display text-sm font-medium text-navy">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="px-1 text-lg leading-none text-ink-soft transition hover:text-navy"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && <p className="text-sm text-coral">{error}</p>}
          {!error && !markdown && loading && (
            <p className="animate-pulse text-sm text-ink-soft">{loadingLabel}</p>
          )}
          {!error && markdown && <WikiMarkdown markdown={markdown} />}
          {!error && loading && markdown && (
            <p className="mt-2 animate-pulse text-xs text-ink-soft">Generating…</p>
          )}
        </div>

        {/* Footer — Download PDF, consistent with PathwayDocumentPane */}
        {!error && markdown && (
          <div className="flex flex-shrink-0 items-center justify-end border-t border-navy/10 p-3">
            <button
              onClick={handleDownload}
              disabled={loading || !markdown}
              className="flex-shrink-0 rounded-lg border border-navy/15 px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-coral hover:text-coral disabled:opacity-40"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    );
  }

  // Modal mode (default): fixed overlay dialog.
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-3 sm:p-6">
      <div
        className="flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-paper text-ink shadow-xl"
        style={{ maxHeight: '85vh' }}
      >
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-navy/10 p-4">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-medium text-navy">{title}</h2>
            {version && (
              <span className="rounded-full bg-paper-dim px-2 py-0.5 font-mono text-xs text-ink-soft">
                {version}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {versions && versions.length > 1 && onSelectVersion && (
              <select
                value={selectedVersionNumber}
                onChange={(e) => onSelectVersion(Number(e.target.value))}
                className="rounded-lg border border-navy/15 bg-white px-2 py-1.5 text-xs text-ink"
                aria-label="Select version"
              >
                {versions.map((v) => (
                  <option key={v.version_number} value={v.version_number}>
                    v0.{v.version_number} — {new Date(v.created_at).toLocaleDateString()}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={handleDownload}
              disabled={loading || !markdown}
              className="rounded-lg bg-navy px-3 py-1.5 text-xs font-medium text-white transition hover:bg-coral disabled:opacity-40"
            >
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="px-1 text-lg leading-none text-ink-soft transition hover:text-navy"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <ContentBlocks blocks={blocks} loading={loading} error={error} loadingLabel={loadingLabel} />
        </div>
      </div>
    </div>
  );
}
