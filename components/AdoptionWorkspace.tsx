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
  EXPLORER_INTENTS,
  WHAT_THE_CUBE_DOES,
  getExplorerIntent,
  getBrowseOpeningMessage,
  type ExplorerIntent,
  type ExplorerIntentId,
} from '@/lib/explorer-intents';
import type { DocType } from '@/lib/design-documents';
import type { WikiStats } from '@/lib/wiki-content';

// The fixed opening line a brand-new Contributor conversation shows before
// any row exists — the whole point of this flow is document-first, so it
// asks for documents immediately instead of a marketing hero. Never
// persisted; it's replaced the moment a real conversation exists.
const CONTRIBUTOR_OPENING_MESSAGE: Message = {
  role: 'assistant',
  content: "Please share your deployment related documents (pdf, docx). I'll read through them and put together a draft pathway for you to check.",
};

const BACK_CONTROL_CLASS = 'text-xs font-medium text-ink-soft transition hover:text-coral';

// The Explorer flow's way back to the intent menu, used while no row exists
// yet and passed in as `backLabel` by /explore for the rest of the
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
  // Set from a dedicated entry point (/explore or /contribute) — the
  // welcome screen shows a single Start button bound to this flow instead
  // of a picker. Falls back to canExplore/canContribute below if omitted.
  fixedFlow?: AdoptionFlow;
  // Contributor-only: the pathway this workspace is linked to, chosen via
  // PathwaySelector before the workspace opens.
  pathwayId?: string;
  canExplore?: boolean;
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
  // things per caller: the intent menu on /explore, the grid on /adoptions.
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
  canExplore = false,
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
    openPathwayDocument,
    closePathwayDocument,
    publishPathwayDocument,
    explorerDoc,
    openExplorerDocument,
    closeExplorerDocument,
  } = useAdoptionConversation({ initial, pathwayId, onCreated, onChange });

  // Resolved once, at the top level, so both the welcome screen's file/drop
  // handlers and its Start button use the exact same flow — a prior bug had
  // this computed only inside the JSX below, which the file-upload path
  // (drag-drop and the attach button) never saw, so uploads silently created
  // the row with an empty flow regardless of /explore vs /contribute.
  const defaultFlow: AdoptionFlow = fixedFlow ?? (canExplore ? 'explorer' : canContribute ? 'contributor' : '');

  const [welcomeInput, setWelcomeInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [filesOpen, setFilesOpen] = useState(false);
  const [headerExpanded, setHeaderExpanded] = useState(true);
  // The Explorer intent picked from the welcome menu, before any row exists.
  // Once a row exists the intent lives on conversation.meta.intent instead —
  // this only carries the choice across the gap between "picked an intent"
  // and "sent the first message," which is what lazily creates the row.
  const [pendingIntent, setPendingIntent] = useState<ExplorerIntentId | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  // Backs the "browse" intent's opening line (how many pathways, which
  // sectors) — fetched once on mount rather than hardcoded, so it stays
  // accurate as the corpus grows via community publishing. Null until it
  // resolves; getBrowseOpeningMessage falls back to a static line if so.
  const [wikiStats, setWikiStats] = useState<WikiStats | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch('/api/wiki-stats')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setWikiStats(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

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

  // Which flow's intent is currently in play, for the handlers below —
  // conversation.meta.intent once a row exists, the pending menu choice
  // before that.
  const activeIntent: ExplorerIntent = conversation?.meta.intent ?? pendingIntent ?? '';

  // Resolves an intent's opening line — dynamic for "browse" (see
  // wikiStats above), the fixed copy from lib/explorer-intents.ts otherwise.
  function resolveOpeningMessage(intent: ExplorerIntentId): string {
    return intent === 'browse' ? getBrowseOpeningMessage(wikiStats) : getExplorerIntent(intent)!.openingMessage;
  }

  // Own draft always wins; otherwise fall back to the pathway's already-
  // published document, so a contributor who hasn't drafted anything in this
  // chat yet can still view what another contributor published.
  const pathwayDocMarkdown = pathwayDoc.content ?? pathwayDoc.pathwayPublishedContent ?? '';
  const pathwayDocPublishedSlug = pathwayDoc.publishedSlug ?? pathwayDoc.pathwayPublishedSlug;

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
      : conversation.meta.flow === 'explorer' && conversation.meta.intent
        ? { role: 'assistant', content: resolveOpeningMessage(conversation.meta.intent) }
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
  // Contributor's document-first entry point (no marketing hero — it asks for
  // documents immediately), and an Explorer who has just picked an intent
  // from the welcome menu. Either way the opening line is client-constructed
  // and never persisted, which keeps the stored history starting on a user
  // turn — the Messages API requires that. The row itself is created lazily
  // by the first real send, carrying the flow and (for Explorer) the intent.
  const preChat: { opening: Message; flow: AdoptionFlow; intent: ExplorerIntent; onBackToMenu?: () => void } | null =
    conversation
      ? null
      : fixedFlow === 'contributor'
        ? { opening: CONTRIBUTOR_OPENING_MESSAGE, flow: 'contributor', intent: '' }
        : pendingIntent
          ? {
              opening: { role: 'assistant', content: resolveOpeningMessage(pendingIntent) },
              flow: 'explorer',
              intent: pendingIntent,
              onBackToMenu: () => setPendingIntent(null),
            }
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
            ) : (
              <BackControl onBack={onBack} />
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
          {preChat.intent && (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-coral">
              Explorer · {getExplorerIntent(preChat.intent)?.chipLabel}
            </p>
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
            />
          </div>

          {pathwayDoc.paneOpen && (
            <div className="fixed inset-0 z-50 bg-paper lg:static lg:z-auto lg:min-w-0 lg:flex-1 lg:border-l lg:border-navy/10">
              <PathwayDocumentPane
                markdown={pathwayDocMarkdown}
                loading={pathwayDoc.loading}
                error={pathwayDoc.error}
                onPublish={publishPathwayDocument}
                publishedSlug={pathwayDocPublishedSlug}
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
    // The Explorer flow always starts from the intent menu, so it replaces
    // the generic "Start" button wherever the Explorer flow is startable.
    const showExplorerMenu = fixedFlow === 'explorer' || (!fixedFlow && canExplore);

    function handleWelcomeSend(flow: AdoptionFlow, intent: ExplorerIntent = '') {
      if (!canSend) return;
      const text = welcomeInput.trim();
      setWelcomeInput('');
      void handleUserSend(text, flow, intent);
    }

    // The Explorer flow's intent is chosen here, explicitly, before anything
    // else happens — the Cube never infers it from what someone types. If
    // they've already typed something or staged a document, that goes
    // straight through as the first message; otherwise the chat opens on this
    // intent's own opening line and waits.
    function handlePickIntent(intent: ExplorerIntentId) {
      if (canSend) {
        handleWelcomeSend('explorer', intent);
        return;
      }
      setPendingIntent(intent);
    }

    function handleWelcomeKey(e: React.KeyboardEvent) {
      if (e.key !== 'Enter' || e.shiftKey) return;
      // With the intent menu up there's no single "start" action to bind
      // Enter to — the choice of intent is the start. Let the newline happen.
      if (showExplorerMenu || !defaultFlow) return;
      e.preventDefault();
      handleWelcomeSend(defaultFlow);
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
          {/* The intent menu opens on its question directly — a kicker above
              it just delays the one thing the screen is actually asking. */}
          {!showExplorerMenu && (
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral">
              {fixedFlow === 'contributor' ? 'Contribute a Pathway' : 'Diffusion Cube'}
            </p>
          )}
          <h1
            className={`font-display text-3xl font-medium leading-[1.15] tracking-tight text-navy sm:text-4xl ${
              showExplorerMenu ? '' : 'mt-4'
            }`}
          >
            {fixedFlow === 'contributor' ? (
              <>
                Turn your deployment into a <span className="font-serif italic text-coral">pathway</span>
              </>
            ) : showExplorerMenu ? (
              <>
                What brings you to the <span className="font-serif italic text-coral">Cube</span>?
              </>
            ) : (
              <>
                Where does your adoption <span className="font-serif italic text-coral">actually</span> stand?
              </>
            )}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
            {fixedFlow === 'contributor'
              ? "Share the write-up you have. I'll remap it into the four-dimension pathway format, flag the open gaps, and help you push it to the wiki once you're ready."
              : showExplorerMenu
                ? WHAT_THE_CUBE_DOES
                : 'Share the documents you have, or just start talking. Everything you hear back is grounded in what real deployments learned.'}
          </p>

          {/* The intent menu. Explicit and up front — the Cube asks rather
              than inferring which of the four jobs someone is here for, so
              the flow it runs is never a guess about their free text. */}
          {showExplorerMenu && (
            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              {EXPLORER_INTENTS.map((intent) => (
                <button
                  key={intent.id}
                  type="button"
                  onClick={() => handlePickIntent(intent.id)}
                  disabled={loading || hasBlockingAttachment}
                  className="group flex flex-col justify-start rounded-xl border border-navy/15 bg-white p-4 text-left transition hover:border-coral disabled:opacity-40"
                >
                  <p className="text-sm font-medium text-navy transition group-hover:text-coral">{intent.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{intent.menuDescription}</p>
                </button>
              ))}
            </div>
          )}

          <div className="mt-8">
            {showExplorerMenu && (
              <p className="mb-2 text-xs text-ink-soft">
                Optional — add a document or a few lines of context first, then pick a starting point above.
              </p>
            )}
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
                  onClick={() => handleWelcomeSend(showExplorerMenu ? 'explorer' : fixedFlow, showExplorerMenu ? 'open' : '')}
                  disabled={!canSend}
                  className="rounded-xl bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-coral disabled:opacity-40"
                >
                  Start
                </button>
              )}
            </div>

            {!fixedFlow &&
              (canExplore || canContribute ? (
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
            {intentDef ? `Explorer · ${intentDef.chipLabel}` : 'Explorer'}
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
          />
        </div>

        {pathwayDoc.paneOpen && (
          <div className="fixed inset-0 z-50 bg-paper lg:static lg:z-auto lg:min-w-0 lg:flex-1 lg:border-l lg:border-navy/10">
            <PathwayDocumentPane
              markdown={pathwayDocMarkdown}
              loading={pathwayDoc.loading}
              error={pathwayDoc.error}
              onPublish={publishPathwayDocument}
              publishedSlug={pathwayDocPublishedSlug}
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
