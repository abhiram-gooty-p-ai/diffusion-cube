'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ChatPanel, { Message } from '@/components/ChatPanel';
import AttachmentsPanel from '@/components/AttachmentsPanel';
import PathwayDocumentPane from '@/components/PathwayDocumentPane';
import AdoptionPlanModal from '@/components/AdoptionPlanModal';
import {
  AdoptionConversation,
  AdoptionFlow,
  extractUploadedFileNames,
  useAdoptionConversation,
} from '@/lib/adoption-conversation';
import {
  WHAT_THE_CUBE_DOES,
  STRENGTHEN_INTRO,
  getExplorerIntent,
  type ExplorerIntent,
} from '@/lib/explorer-intents';
import type { DocType } from '@/lib/design-documents';

// The fixed opening line a brand-new Contributor conversation shows before
// any row exists — the whole point of this flow is document-first, so it
// asks for documents immediately instead of a marketing hero. Never
// persisted; it's replaced the moment a real conversation exists.
const CONTRIBUTOR_OPENING_MESSAGE: Message = {
  role: 'assistant',
  content: "Please share your deployment related documents (pdf, docx). I'll read through them and put together a draft pathway for you to check.",
};

// Strengthen (fixedFlow==='explorer', i.e. /strengthen specifically — not
// the picker-based /adoptions "start new" path) skips the 4-intent menu
// entirely and opens straight into chat with this line, same text as the
// access-gate page a signed-out visitor saw first (see STRENGTHEN_INTRO's
// comment) so logging in doesn't feel like a context switch. Defaults to the
// 'guidance' intent under the hood — the broadest of the four, since there's
// no explicit picker here to ask.
const STRENGTHEN_OPENING_MESSAGE: Message = {
  role: 'assistant',
  content: STRENGTHEN_INTRO,
};

const BACK_CONTROL_CLASS = 'text-xs font-medium text-ink-soft transition hover:text-coral';

// The Explorer flow's way back to the intent menu, used while no row exists
// yet and passed in as `backLabel` by /strengthen for the rest of the
// conversation. Callers where "back" means something else (the /adoptions
// grid) keep the default '← Back'.
export const PICK_INTENT_LABEL = '← Pick a different starting point';

// A Link to /contribute is a no-op when already on that route (the App
// Router doesn't remount on a same-URL navigation) — onBack lets the actual
// list-owning page reset its own local `selection` state instead.
function BackControl({ onBack }: { onBack?: () => void }) {
  return onBack ? (
    <button type="button" onClick={onBack} className={BACK_CONTROL_CLASS}>
      ← Back
    </button>
  ) : (
    <Link href="/contribute" className={BACK_CONTROL_CLASS}>
      ← Back
    </Link>
  );
}

// What the two Explorer documents are called wherever they're surfaced — the
// header buttons, the modal, and the exported PDF's filename. The Analysis
// Document is the primary output and the Executive Summary is deliberately
// the smaller companion piece, so they're never labelled interchangeably.
const EXPLORER_DOC_LABELS: Record<DocType, { title: string; filenameSuffix: string; loadingLabel: string }> = {
  analysis: {
    title: 'Analysis Document',
    filenameSuffix: 'analysis',
    loadingLabel: 'Putting your analysis document together…',
  },
  plan: {
    title: 'Executive Summary',
    filenameSuffix: 'executive-summary',
    loadingLabel: 'Putting your executive summary together…',
  },
  // 'draft' is Contributor-only and never opened as an explorer doc modal.
  draft: { title: '', filenameSuffix: '', loadingLabel: '' },
};

interface Props {
  initial: AdoptionConversation | null;
  // Set from a dedicated entry point (/strengthen or /contribute) — the
  // welcome screen shows a single Start button bound to this flow instead
  // of a picker. Falls back to canStrengthen/canContribute below if omitted.
  fixedFlow?: AdoptionFlow;
  // Contributor-only: the pathway this workspace is linked to, chosen via
  // PathwaySelector before the workspace opens.
  pathwayId?: string;
  canStrengthen?: boolean;
  canContribute?: boolean;
  onCreated?: (c: AdoptionConversation) => void;
  onChange?: (c: AdoptionConversation) => void;
  // Contributor-only "← Back" control in the header — the caller owns
  // whatever list view it should return to (ContributeGrid's own grid,
  // /adoptions' grid if opened from there). Falls back to a real navigation
  // to /contribute when omitted, since a Link to the page you're already on
  // is a no-op in the App Router — it never remounts local `selection` state.
  onBack?: () => void;
  // What that control says in the Explorer flow, since "back" means different
  // things per caller: the intent menu on /strengthen, the grid on /adoptions.
  backLabel?: string;
}

type PathwayInfo = {
  title: string;
  description?: string;
  sector?: string;
  stage?: string;
  timestamp?: string;
  contributor?: string;
};

export default function AdoptionWorkspace({
  initial,
  fixedFlow,
  pathwayId,
  canStrengthen = false,
  canContribute = false,
  onCreated,
  onChange,
  onBack,
  backLabel = '← Back',
}: Props) {
  const {
    conversation,
    loading,
    pendingAttachments,
    handleUserSend,
    handleAttachFiles,
    removeAttachment,
    pathwayDoc,
    pathwayPreview,
    openPathwayDocument,
    closePathwayDocument,
    selectPathwayDocVersion,
    publishPathwayDocument,
    explorerDoc,
    openExplorerDocument,
    closeExplorerDocument,
  } = useAdoptionConversation({ initial, pathwayId, onCreated, onChange });

  // Resolved once, at the top level, so both the welcome screen's file/drop
  // handlers and its Start button use the exact same flow — a prior bug had
  // this computed only inside the JSX below, which the file-upload path
  // (drag-drop and the attach button) never saw, so uploads silently created
  // the row with an empty flow regardless of /strengthen vs /contribute.
  const defaultFlow: AdoptionFlow = fixedFlow ?? (canStrengthen ? 'explorer' : canContribute ? 'contributor' : '');

  const [welcomeInput, setWelcomeInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [filesOpen, setFilesOpen] = useState(false);
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const [pathwayLookup, setPathwayLookup] = useState<Record<string, PathwayInfo>>({});
  useEffect(() => {
    fetch('/api/wiki-pathways')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: (PathwayInfo & { slug: string })[] | null) => {
        if (!data) return;
        const lookup: Record<string, PathwayInfo> = {};
        for (const { slug, ...info } of data) lookup[slug] = info;
        setPathwayLookup(lookup);
      })
      .catch(() => {});
  }, []);

  // Which flow is currently in play — used by file-attach handlers.
  const activeIntent: ExplorerIntent = conversation?.meta.intent ?? 'open';

  // A specific older version picked from the pane's dropdown wins first;
  // otherwise the latest own draft; otherwise fall back to the pathway's
  // already-published document, so a contributor who hasn't drafted
  // anything in this chat yet can still view what another contributor
  // published.
  const selectedPathwayDocVersion =
    pathwayDoc.selectedVersionNumber !== null
      ? pathwayDoc.versions.find((v) => v.version_number === pathwayDoc.selectedVersionNumber)
      : undefined;
  const pathwayDocMarkdown = selectedPathwayDocVersion?.content ?? pathwayDoc.content ?? pathwayDoc.pathwayPublishedContent ?? '';
  const pathwayDocPublishedSlug = pathwayDoc.publishedSlug ?? pathwayDoc.pathwayPublishedSlug;
  // "Published" means the content CURRENTLY SHOWN is exactly what's live —
  // not just "this pathway has been published at some point." Any
  // unpublished edit (a new generate/revise, or browsing an older version
  // via the dropdown) shows as "Draft" again, even after a prior publish.
  const pathwayDocIsPublished =
    !!pathwayDoc.pathwayPublishedContent && pathwayDocMarkdown === pathwayDoc.pathwayPublishedContent;
  // Deep-links back to this specific chat (not just the Contribute grid) —
  // conversation.id may not exist yet if nothing has been sent in this chat.
  const pathwayDocLiveHref = pathwayDocPublishedSlug
    ? `/wiki/${pathwayDocPublishedSlug}?from=contribute${conversation ? `&designId=${conversation.id}` : ''}`
    : null;

  const explorerDocMarkdown =
    (explorerDoc.open === 'analysis' ? explorerDoc.analysis?.content : explorerDoc.summary?.content) ?? '';

  // The opening line is a deterministic function of flow/intent, never
  // persisted to `messages` (see preChat above — the Messages API requires
  // history to start on a user turn). Once a row exists it has to be
  // re-derived and prepended for display here as well, or it disappears the
  // moment the user's first real message lands and `conversation` stops
  // being null.
  const conversationOpeningMessage: Message | null = conversation
    ? conversation.meta.flow === 'contributor'
      ? CONTRIBUTOR_OPENING_MESSAGE
      : conversation.meta.flow === 'explorer'
        ? STRENGTHEN_OPENING_MESSAGE
        : null
    : null;

  const displayMessages = conversation
    ? conversationOpeningMessage
      ? [conversationOpeningMessage, ...conversation.messages]
      : conversation.messages
    : [];

  function handleWelcomeFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (files.length) handleAttachFiles(files, defaultFlow, activeIntent);
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current++;
    if (e.dataTransfer.types.includes('Files')) setIsDragging(true);
  }
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }
  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current = Math.max(0, dragCounter.current - 1);
    if (dragCounter.current === 0) setIsDragging(false);
  }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files ?? []);
    if (files.length) handleAttachFiles(files, defaultFlow, activeIntent);
  }

  // Both flows can open straight into a chat before any row exists: the
  // Contributor's document-first entry point (no marketing hero) and the
  // Explorer's auto-detect flow. The opening line is client-constructed and
  // never persisted — the row is created lazily by the first real send,
  // carrying the flow and intent ('open' for Explorer, to be auto-detected).
  const preChat: { opening: Message; flow: AdoptionFlow; intent: ExplorerIntent; onBackToMenu?: () => void } | null =
    conversation
      ? null
      : fixedFlow === 'contributor'
        ? { opening: CONTRIBUTOR_OPENING_MESSAGE, flow: 'contributor', intent: '' }
        : fixedFlow === 'explorer'
          ? { opening: STRENGTHEN_OPENING_MESSAGE, flow: 'explorer', intent: 'open' }
          : null;

  if (preChat) {
    return (
      <div
        className="relative flex flex-1 flex-col overflow-hidden bg-paper"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center border-4 border-dashed border-coral bg-paper/90">
            <p className="text-sm font-medium text-ink-soft">Drop files to share them</p>
          </div>
        )}

        <div className="border-b border-navy/10 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {preChat.onBackToMenu ? (
              <button type="button" onClick={preChat.onBackToMenu} className={BACK_CONTROL_CLASS}>
                {PICK_INTENT_LABEL}
              </button>
            ) : preChat.flow === 'contributor' ? (
              <BackControl onBack={onBack} />
            ) : (
              <span />
            )}
            <div className="flex flex-shrink-0 items-center gap-2">
              <button
                onClick={() => setFilesOpen(true)}
                className="rounded-lg border border-navy/15 px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-coral hover:text-coral md:hidden"
              >
                📎 Files
              </button>
              {preChat.flow === 'contributor' && (
                <button
                  onClick={openPathwayDocument}
                  disabled={!pathwayDocMarkdown}
                  className="rounded-lg border border-navy/15 px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-coral hover:text-coral disabled:opacity-40 disabled:hover:border-navy/15 disabled:hover:text-ink-soft"
                >
                  View Pathway Document
                </button>
              )}
            </div>
          </div>
          {preChat.flow === 'explorer' && (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-coral">
              Navigate through your own adoption
            </p>
          )}
          {preChat.flow === 'contributor' && pathwayPreview?.title && (
            <>
              <h2 className="mt-2 font-display text-lg font-medium tracking-tight text-navy">{pathwayPreview.title}</h2>
              {pathwayPreview.sector && (
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft">{pathwayPreview.sector}</p>
              )}
              {pathwayPreview.description && (
                <p className="mt-2 text-sm leading-relaxed text-ink">{pathwayPreview.description}</p>
              )}
            </>
          )}
        </div>

        <div className="relative flex flex-1 overflow-hidden">
          <div className={`min-w-0 flex-1 ${pathwayDoc.paneOpen ? 'lg:max-w-[420px] lg:flex-shrink-0' : ''}`}>
            <ChatPanel
              messages={[preChat.opening]}
              onSend={(text) => handleUserSend(text, preChat.flow, preChat.intent)}
              onAttachFiles={(files) => handleAttachFiles(files, preChat.flow, preChat.intent)}
              onRemoveAttachment={removeAttachment}
              pendingAttachments={pendingAttachments}
              loading={loading}
              placeholder="Ask, share, or think out loud…"
              pathwayLookup={pathwayLookup}
              hideAccuracyDisclaimer={preChat.flow === 'contributor'}
            />
          </div>

          {pathwayDoc.paneOpen && (
            <div className="fixed inset-0 z-50 bg-paper lg:static lg:z-auto lg:min-w-0 lg:flex-1 lg:border-l lg:border-navy/10">
              <PathwayDocumentPane
                markdown={pathwayDocMarkdown}
                loading={pathwayDoc.loading}
                error={pathwayDoc.error}
                onPublish={publishPathwayDocument}
                liveHref={pathwayDocLiveHref}
                isPublished={pathwayDocIsPublished}
                versions={pathwayDoc.versions}
                selectedVersionNumber={pathwayDoc.selectedVersionNumber}
                latestVersionNumber={pathwayDoc.versionNumber}
                onSelectVersion={selectPathwayDocVersion}
                onClose={closePathwayDocument}
              />
            </div>
          )}

          {!pathwayDoc.paneOpen && (
            <div className="group relative hidden h-full flex-shrink-0 md:block">
              <div className="flex h-full w-8 cursor-default items-center justify-center border-l border-navy/10 text-ink-soft transition group-hover:border-coral/40 group-hover:text-coral">
                <span aria-hidden className="rotate-180 font-mono text-[10px] uppercase tracking-[0.2em] [writing-mode:vertical-lr]">
                  Files
                </span>
              </div>
              <div className="invisible absolute inset-y-0 right-0 z-30 w-[280px] overflow-y-auto border-l border-navy/10 bg-paper p-3 opacity-0 shadow-lg transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
                <AttachmentsPanel
                  attachments={pendingAttachments}
                  onAttachFiles={(files) => handleAttachFiles(files, preChat.flow, preChat.intent)}
                  onRemoveAttachment={removeAttachment}
                />
              </div>
            </div>
          )}

          {filesOpen && (
            <div className="fixed inset-0 z-40 flex items-end bg-navy/40 md:hidden" onClick={() => setFilesOpen(false)}>
              <div className="max-h-[70vh] w-full overflow-y-auto rounded-t-2xl bg-paper p-4" onClick={(e) => e.stopPropagation()}>
                <div className="mb-2 flex justify-end">
                  <button
                    onClick={() => setFilesOpen(false)}
                    aria-label="Close"
                    className="px-1 text-lg leading-none text-ink-soft transition hover:text-navy"
                  >
                    ×
                  </button>
                </div>
                <AttachmentsPanel
                  attachments={pendingAttachments}
                  onAttachFiles={(files) => handleAttachFiles(files, preChat.flow, preChat.intent)}
                  onRemoveAttachment={removeAttachment}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!conversation) {
    const hasBlockingAttachment = pendingAttachments.some((a) => a.state !== 'ready');
    const hasReadyAttachment = pendingAttachments.some((a) => a.state === 'ready');
    const canSend = !loading && !hasBlockingAttachment && (welcomeInput.trim().length > 0 || hasReadyAttachment);

    function handleWelcomeSend(flow: AdoptionFlow, intent: ExplorerIntent = '') {
      if (!canSend) return;
      const text = welcomeInput.trim();
      setWelcomeInput('');
      void handleUserSend(text, flow, intent);
    }

    function handleWelcomeKey(e: React.KeyboardEvent) {
      if (e.key !== 'Enter' || e.shiftKey) return;
      if (!defaultFlow) return;
      e.preventDefault();
      handleWelcomeSend(defaultFlow, fixedFlow === 'explorer' ? 'open' : '');
    }

    return (
      <div
        className="relative flex-1 flex flex-col items-center justify-center bg-paper p-4 sm:p-8"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center border-4 border-dashed border-coral bg-paper/90">
            <p className="text-sm font-medium text-ink-soft">Drop files to share them</p>
          </div>
        )}

        <div className="w-full max-w-2xl animate-fade-in-up">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral">
            {fixedFlow === 'contributor' ? 'Contribute a Pathway' : 'Diffusion Cube'}
          </p>
          <h1
            className="font-display mt-4 text-3xl font-medium leading-[1.15] tracking-tight text-navy sm:text-4xl"
          >
            {fixedFlow === 'contributor' ? (
              <>
                Turn your deployment into a <span className="font-serif italic text-coral">pathway</span>
              </>
            ) : (
              <>
                What brings you to the <span className="font-serif italic text-coral">Cube</span>?
              </>
            )}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
            {fixedFlow === 'contributor'
              ? "Share the write-up you have. I'll remap it into the four-dimension pathway format, flag the open gaps, and help you push it to the wiki once you're ready."
              : WHAT_THE_CUBE_DOES}
          </p>

          <div className="mt-8">
            {pendingAttachments.length > 0 && (
              <div className="mb-2 flex flex-col gap-1">
                {pendingAttachments.map((a) => (
                  <div
                    key={a.id}
                    className={`flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-xs ${
                      a.state === 'error'
                        ? 'border-coral/40 bg-coral-soft text-coral'
                        : 'border-navy/15 bg-white text-ink-soft'
                    }`}
                  >
                    <span className="truncate">
                      {a.state === 'reading' ? '⏳' : a.state === 'error' ? '⚠️' : '📎'} {a.name}
                      {a.state === 'error' && a.error ? ` — ${a.error}` : ''}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(a.id)}
                      disabled={a.state === 'reading'}
                      className="flex-shrink-0 text-ink-soft transition hover:text-navy disabled:opacity-30"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="glow-input flex items-end gap-2 rounded-2xl border border-navy/10 bg-white p-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.docx,.xlsx,.xls,.pptx,.txt,.md,.png,.jpg,.jpeg,.gif,.webp"
                className="hidden"
                onChange={handleWelcomeFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-ink-soft transition hover:text-navy"
                aria-label="Attach files"
              >
                📎
              </button>
              <textarea
                className="flex-1 resize-none bg-transparent py-2 text-sm text-ink placeholder-ink-soft focus:outline-none"
                rows={1}
                value={welcomeInput}
                onChange={(e) => setWelcomeInput(e.target.value)}
                onKeyDown={handleWelcomeKey}
                placeholder="Describe your adoption, or drop a document…"
                disabled={loading}
              />
              {fixedFlow && (
                <button
                  onClick={() => handleWelcomeSend(fixedFlow, fixedFlow === 'explorer' ? 'open' : '')}
                  disabled={!canSend}
                  className="rounded-xl bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-coral disabled:opacity-40"
                >
                  Start
                </button>
              )}
            </div>

            {!fixedFlow &&
              (canStrengthen || canContribute ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {canContribute && (
                    <button
                      onClick={() => handleWelcomeSend('contributor')}
                      disabled={!canSend}
                      className="rounded-xl border border-navy/20 px-4 py-2 text-sm font-medium text-navy transition hover:border-coral hover:text-coral disabled:opacity-40"
                    >
                      Contribute a pathway
                    </button>
                  )}
                </div>
              ) : (
                <p className="mt-3 text-xs text-ink-soft">
                  Ask an admin to grant you Explorer or Contributor access to get started.
                </p>
              ))}
            <p className="mt-3 text-center text-xs text-ink-soft">
              Cube can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const flow = conversation.meta.flow;
  const intentDef = getExplorerIntent(conversation.meta.intent);
  // Browsing the corpus or working one specific issue isn't about a
  // deployment of the user's own, so those two intents keep the header they
  // started with — the way back plus the intent chip — instead of naming an
  // adoption that was never described. An Explorer row from before intents
  // existed has no intentDef and keeps the old header.
  const showDeploymentHeader = flow !== 'explorer' || !intentDef || intentDef.tracksDeployment;

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-paper">
      {/* Workspace header: title, sector/geography/stage, summary, dimension chips */}
      <div className="border-b border-navy/10 p-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          {flow === 'contributor' ? (
            <BackControl onBack={onBack} />
          ) : flow === 'explorer' && onBack ? (
            <button type="button" onClick={onBack} className={BACK_CONTROL_CLASS}>
              {backLabel}
            </button>
          ) : (
            <span />
          )}
          <div className="flex flex-shrink-0 items-center gap-2">
            <button
              onClick={() => setFilesOpen(true)}
              className="rounded-lg border border-navy/15 px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-coral hover:text-coral md:hidden"
            >
              📎 Files
            </button>
            {flow === 'contributor' && (
              <button
                onClick={openPathwayDocument}
                disabled={!pathwayDocMarkdown}
                className="rounded-lg border border-navy/15 px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-coral hover:text-coral disabled:opacity-40 disabled:hover:border-navy/15 disabled:hover:text-ink-soft"
              >
                View Pathway Document
              </button>
            )}
            {/* Once generated, either Explorer document stays reachable for
                the rest of the conversation — that persistence is the point
                of storing them in design_documents rather than leaving them
                as chat text. */}
            {flow === 'explorer' && explorerDoc.analysis && (
              <button
                onClick={() => openExplorerDocument('analysis')}
                className="rounded-lg border border-navy/15 px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-coral hover:text-coral"
              >
                Analysis Document
              </button>
            )}
            {flow === 'explorer' && explorerDoc.summary && (
              <button
                onClick={() => openExplorerDocument('plan')}
                className="rounded-lg border border-navy/15 px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-coral hover:text-coral"
              >
                Executive Summary
              </button>
            )}
          </div>
        </div>

        {flow === 'explorer' && (
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral">
            {'Navigate through your own adoption'}
          </p>
        )}
        {showDeploymentHeader && (
          <>
            <button
              onClick={() => setHeaderExpanded((v) => !v)}
              className="mt-0.5 flex items-center gap-1.5 text-left"
              aria-expanded={headerExpanded}
            >
              <h2 className="font-display text-lg font-medium tracking-tight text-navy">
                {conversation.meta.name || 'New adoption'}
              </h2>
              <span
                className={`text-ink-soft transition-transform ${headerExpanded ? 'rotate-180' : ''}`}
                aria-hidden
              >
                ▾
              </span>
            </button>
            {headerExpanded && (
              <>
                {[conversation.meta.sector, conversation.meta.geography, conversation.meta.stage].some(Boolean) && (
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft">
                    {[conversation.meta.sector, conversation.meta.geography, conversation.meta.stage]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                )}
                {conversation.meta.summary && (
                  <p className="mt-2 max-h-24 overflow-y-auto whitespace-pre-line text-sm leading-relaxed text-ink">
                    {conversation.meta.summary}
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Chat + files (+ the pathway document pane, alongside chat rather than over it) */}
      <div className="relative flex flex-1 overflow-hidden">
        <div className={`min-w-0 flex-1 ${pathwayDoc.paneOpen ? 'lg:max-w-[420px] lg:flex-shrink-0' : ''}`}>
          <ChatPanel
            messages={displayMessages}
            onSend={handleUserSend}
            onAttachFiles={handleAttachFiles}
            onRemoveAttachment={removeAttachment}
            pendingAttachments={pendingAttachments}
            loading={loading}
            placeholder="Ask, share, or think out loud…"
            grid={conversation.grid}
            onOpenPathwayDocument={flow === 'contributor' ? openPathwayDocument : undefined}
            onOpenExplorerDocument={flow === 'explorer' ? openExplorerDocument : undefined}
            pathwayLookup={pathwayLookup}
            hideAccuracyDisclaimer={flow === 'contributor'}
          />
        </div>

        {pathwayDoc.paneOpen && (
          <div className="fixed inset-0 z-50 bg-paper lg:static lg:z-auto lg:min-w-0 lg:flex-1 lg:border-l lg:border-navy/10">
            <PathwayDocumentPane
              markdown={pathwayDocMarkdown}
              loading={pathwayDoc.loading}
              error={pathwayDoc.error}
              onPublish={publishPathwayDocument}
              liveHref={pathwayDocLiveHref}
              isPublished={pathwayDocIsPublished}
              versions={pathwayDoc.versions}
              selectedVersionNumber={pathwayDoc.selectedVersionNumber}
              latestVersionNumber={pathwayDoc.versionNumber}
              onSelectVersion={selectPathwayDocVersion}
              onClose={closePathwayDocument}
            />
          </div>
        )}

        {!pathwayDoc.paneOpen && (
          <div className="group relative hidden h-full flex-shrink-0 md:block">
            {/* Slim edge tab — always in-flow, doesn't steal chat width. The
                full panel below is absolutely positioned and only reveals on
                hover, so files stay out of the way until actually needed.
                inset-y-0 (rather than top-0 + h-full) anchors both edges
                directly to this wrapper's height, so it reliably fills the
                full column instead of depending on percentage-height
                resolving through an absolutely positioned descendant. */}
            <div className="flex h-full w-8 cursor-default items-center justify-center border-l border-navy/10 text-ink-soft transition group-hover:border-coral/40 group-hover:text-coral">
              <span aria-hidden className="rotate-180 font-mono text-[10px] uppercase tracking-[0.2em] [writing-mode:vertical-lr]">
                Files
              </span>
            </div>
            <div className="invisible absolute inset-y-0 right-0 z-30 w-[280px] overflow-y-auto border-l border-navy/10 bg-paper p-3 opacity-0 shadow-lg transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
              <AttachmentsPanel
                attachments={pendingAttachments}
                uploadedFileNames={extractUploadedFileNames(conversation.messages)}
                onAttachFiles={handleAttachFiles}
                onRemoveAttachment={removeAttachment}
              />
            </div>
          </div>
        )}

        {filesOpen && (
          <div className="fixed inset-0 z-40 flex items-end bg-navy/40 md:hidden" onClick={() => setFilesOpen(false)}>
            <div
              className="max-h-[70vh] w-full overflow-y-auto rounded-t-2xl bg-paper p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-2 flex justify-end">
                <button
                  onClick={() => setFilesOpen(false)}
                  aria-label="Close"
                  className="px-1 text-lg leading-none text-ink-soft transition hover:text-navy"
                >
                  ×
                </button>
              </div>
              <AttachmentsPanel
                attachments={pendingAttachments}
                uploadedFileNames={extractUploadedFileNames(conversation.messages)}
                onAttachFiles={handleAttachFiles}
                onRemoveAttachment={removeAttachment}
              />
            </div>
          </div>
        )}
      </div>

      {/* The Explorer flow's stored documents. Opened automatically the
          moment one is generated, and reopenable from the header buttons or
          the chat card for the rest of the conversation. */}
      {explorerDoc.open && (
        <AdoptionPlanModal
          title={EXPLORER_DOC_LABELS[explorerDoc.open].title}
          markdown={explorerDocMarkdown}
          loading={explorerDoc.generating === explorerDoc.open}
          error={explorerDoc.error}
          deploymentName={conversation.meta.name}
          onClose={closeExplorerDocument}
          filenameSuffix={EXPLORER_DOC_LABELS[explorerDoc.open].filenameSuffix}
          loadingLabel={EXPLORER_DOC_LABELS[explorerDoc.open].loadingLabel}
        />
      )}
    </div>
  );
}
