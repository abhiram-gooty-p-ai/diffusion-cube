import { useCallback, useEffect, useRef, useState } from 'react';
import { EMPTY_GRID, type GridState } from '@/lib/dimensions';
import { Message } from '@/components/ChatPanel';
import { createClient } from '@/lib/supabase/client';
import { extractTextFromFile, fileToImageBlock, getFileExtension, isImageFile } from '@/lib/extract-text';
import { parseGridUpdate, stripGridUpdate, DELIVERABLE_START, PATHWAY_DOC_MARKER, type ParsedGridUpdate } from '@/lib/grid-update';
import { extractGapsFromPathwayDraft } from '@/lib/pathway-gaps';
import {
  PathwaySubmissionVersionRow,
  getPathwaySubmissionByDesign,
  getPublishedInfoBySubmission,
  insertPathwaySubmissionVersion,
  listPathwaySubmissionVersions,
  upsertPathwaySubmission,
} from '@/lib/pathway-submission-versions';

export type AdoptionFlow = 'explorer' | 'contributor' | '';

// Explorer-only working assessment: the Cube's own current stage/coverage
// read and whether the adopter has confirmed it — distinct from `stage`
// above, which is only ever filled from the user's own words. Dimension
// names (coveredDimensions etc.) are the four dimension display names
// (Persona, Solution, Institution, Ecosystem) — any dimension absent from
// all three arrays is implicitly Unknown, so there's no fourth array for it.
// See CubeAssessment in lib/system-prompts.ts.
export interface CubeAssessment {
  currentStage: string;
  coveredDimensions: string[];
  partialDimensions: string[];
  missingDimensions: string[];
  assessmentConfirmed: boolean;
}

export const EMPTY_CUBE_ASSESSMENT: CubeAssessment = {
  currentStage: '',
  coveredDimensions: [],
  partialDimensions: [],
  missingDimensions: [],
  assessmentConfirmed: false,
};

export interface AdoptionMeta {
  name: string;
  sector: string;
  geography: string;
  stage: string;
  summary: string;
  // Chosen once on the welcome screen, gated by role — fixes which system
  // prompt (explorer vs contributor) this adoption's companion turns use.
  flow: AdoptionFlow;
  // Which numbered step of that flow the model last reported being on (see
  // gridUpdateContract in lib/system-prompts.ts). 0 = no turn yet. Persisted
  // here and re-injected into the prompt every turn, since the grid_update
  // block itself is stripped before a message is stored — the model can't
  // "read back" its own past JSON from history.
  flowStep: number;
  // The model's own working reasoning state, same carry-forward mechanism as
  // flowStep: its current best-guess hypothesis, the biggest open risk, its
  // confidence in that hypothesis, the decision it believes the user is
  // actually working toward, and its own conversational posture. Re-injected
  // every turn via currentProgressBlock so the model revises its prior
  // reasoning instead of re-deriving it from scratch each time.
  hypothesis: string;
  biggestRisk: string;
  confidence: string;
  decision: string;
  conversationMode: string;
  // Explorer-only — see CubeAssessment above.
  cubeAssessment: CubeAssessment;
}

export const EMPTY_META: AdoptionMeta = {
  name: '',
  sector: '',
  geography: '',
  stage: '',
  summary: '',
  flow: '',
  flowStep: 0,
  hypothesis: '',
  biggestRisk: '',
  confidence: '',
  decision: '',
  conversationMode: '',
  cubeAssessment: EMPTY_CUBE_ASSESSMENT,
};

export { EMPTY_GRID };

const UPLOAD_LINE = /(?:📄|🖼️)\s*Uploaded\s+\*\*(.+?)\*\*/g;

// Files already sent in past turns aren't tracked separately — they're
// embedded in each upload message's displayContent (e.g. "📄 Uploaded
// **name**"), so this recovers the list for display in the files panel.
export function extractUploadedFileNames(messages: Message[]): string[] {
  const names: string[] = [];
  for (const m of messages) {
    if (!m.displayContent) continue;
    for (const match of m.displayContent.matchAll(UPLOAD_LINE)) {
      names.push(match[1]);
    }
  }
  return names;
}

// A staged attachment carries its extracted payload once processed, so it can
// be folded into the actual API message once the user presses Enter.
export interface StagedAttachment {
  id: string;
  name: string;
  state: 'reading' | 'ready' | 'error';
  error?: string;
  kind?: 'image' | 'text';
  text?: string;
  image?: { mediaType: string; base64: string };
}

export interface AdoptionConversation {
  id: string;
  meta: AdoptionMeta;
  grid: GridState;
  messages: Message[];
  updatedAt: string;
}

// Shape of a row in the `designs` table (see supabase/migrations/). The
// grid_state column was renamed from cube_state in the 4×4 revamp
// (migration 0008); old 7-dimension rows were cleared rather than migrated.
interface AdoptionRow {
  id: string;
  meta: AdoptionMeta;
  grid_state: GridState;
  messages: Message[];
  updated_at: string;
}

// Contributor-only: the current state of this adoption's pathway document —
// driven automatically by pathwayAction (see contributorSystemPrompt's JSON
// contract) as well as the manual "View Pathway Document" / "Publish"
// actions. `versions` is ordered newest-first (see
// listPathwaySubmissionVersions); the latest generated content is always
// versions[0], regardless of which version the pane currently has selected
// for viewing.
export interface PathwayDocState {
  submissionId: string | null;
  versions: PathwaySubmissionVersionRow[];
  selectedVersionNumber?: number;
  publishedSlug: string | null;
  // What's actually live right now, if anything — compared against
  // whichever version is currently selected (not just "has this submission
  // ever been published") so the pane's status line reflects the version
  // it's showing, not the submission's history. Null whenever publishedSlug
  // is null.
  publishedContent: string | null;
  paneOpen: boolean;
  loading: boolean;
  error: string | null;
}

export const EMPTY_PATHWAY_DOC: PathwayDocState = {
  submissionId: null,
  versions: [],
  selectedVersionNumber: undefined,
  publishedSlug: null,
  publishedContent: null,
  paneOpen: false,
  loading: false,
  error: null,
};

export function rowToConversation(row: AdoptionRow): AdoptionConversation {
  return {
    id: row.id,
    meta: row.meta ?? EMPTY_META,
    grid: { ...EMPTY_GRID, ...(row.grid_state ?? {}) },
    messages: row.messages ?? [],
    updatedAt: row.updated_at,
  };
}

// Converts our Message[] into the Anthropic content shape, expanding any
// attached images into content blocks — shared by the main chat turn and the
// one-off document-generation calls so they build requests identically.
export function toApiMessages(messages: Message[]) {
  return messages.map(({ role, content, images }) => ({
    role,
    content:
      images && images.length > 0
        ? [
            { type: 'text', text: content },
            ...images.map((img) => ({
              type: 'image',
              source: { type: 'base64', media_type: img.mediaType, data: img.base64 },
            })),
          ]
        : content,
  }));
}

interface UseAdoptionConversationOptions {
  // Pass an already-loaded row, or null to create the row lazily on the
  // first message/attachment the user actually sends.
  initial: AdoptionConversation | null;
  onCreated?: (conversation: AdoptionConversation) => void;
  onChange?: (conversation: AdoptionConversation) => void;
}

export function useAdoptionConversation({ initial, onCreated, onChange }: UseAdoptionConversationOptions) {
  const [conversation, setConversation] = useState<AdoptionConversation | null>(initial);
  const conversationRef = useRef<AdoptionConversation | null>(initial);
  const [loading, setLoading] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<StagedAttachment[]>([]);
  // Dedupes concurrent ensureCreated() calls (e.g. several files dropped at
  // once, each triggering extraction) so they share one row-creation insert
  // instead of racing to create duplicates.
  const creatingRef = useRef<Promise<AdoptionConversation> | null>(null);

  // Contributor-only pathway document state — see PathwayDocState. Mirrored
  // into a ref (same idiom as conversation/conversationRef above) so the
  // internal helpers below always read the latest value even though they're
  // plain functions, not memoized against pathwayDoc's identity.
  const [pathwayDoc, setPathwayDoc] = useState<PathwayDocState>(EMPTY_PATHWAY_DOC);
  const pathwayDocRef = useRef<PathwayDocState>(EMPTY_PATHWAY_DOC);
  const updatePathwayDoc = useCallback((updater: (d: PathwayDocState) => PathwayDocState) => {
    setPathwayDoc((prev) => {
      const next = updater(prev);
      pathwayDocRef.current = next;
      return next;
    });
  }, []);

  // Loads an existing contribution's pathway document state once, on mount —
  // AdoptionWorkspace remounts with a fresh `key` per selected adoption (see
  // ContributeGrid.tsx), so this never needs to re-run for a conversation
  // switch, only for the initial load of an existing one.
  useEffect(() => {
    if (!initial) return;
    (async () => {
      const submission = await getPathwaySubmissionByDesign(initial.id);
      if (!submission) return;
      const [versions, publishedInfo] = await Promise.all([
        listPathwaySubmissionVersions(submission.id),
        getPublishedInfoBySubmission(submission.id),
      ]);
      updatePathwayDoc((prev) => ({
        ...prev,
        submissionId: submission.id,
        versions,
        selectedVersionNumber: versions[0]?.version_number,
        publishedSlug: publishedInfo?.slug ?? null,
        publishedContent: publishedInfo?.content ?? null,
      }));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Updater functions passed to setState must be pure — calling onChange
  // (which triggers the parent's list update) from inside one produces
  // React's "Cannot update a component while rendering a different
  // component" warning. Keep the latest onChange in a ref and fire it from
  // an effect once `conversation` has actually changed, after commit.
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (conversation) onChangeRef.current?.(conversation);
  }, [conversation]);

  const update = useCallback((updater: (c: AdoptionConversation) => AdoptionConversation) => {
    setConversation((prev) => {
      if (!prev) return prev;
      const next = updater(prev);
      conversationRef.current = next;
      return next;
    });
  }, []);

  async function persist(c: AdoptionConversation) {
    const updatedAt = new Date().toISOString();
    const supabase = createClient();
    await supabase
      .from('designs')
      .update({
        meta: c.meta,
        grid_state: c.grid,
        messages: c.messages,
        updated_at: updatedAt,
      })
      .eq('id', c.id);
    update((cur) => ({ ...cur, updatedAt }));
  }

  // Generates (revisionInstruction omitted) or regenerates (given) the
  // pathway document via the `pathway-draft` mode — same request shape the
  // old manual "Generate Pathway Wiki" button used — then stores the result
  // as a new version. Returns the generated markdown, or null on failure.
  // Called automatically from sendMessage below when the Contributor
  // companion sets pathwayAction to "generate"/"revise"; never called
  // directly by UI code anymore.
  async function generatePathwayDraft(revisionInstruction?: string): Promise<string | null> {
    const c = conversationRef.current;
    if (!c) return null;

    updatePathwayDoc((prev) => ({ ...prev, loading: true, error: null }));

    const trailingMessage = revisionInstruction
      ? `Please revise the pathway draft as follows: ${revisionInstruction}. Return the full revised document in the same Sections 0-6 + Provenance appendix format.`
      : 'Draft my adoption as a pathway page now.';

    try {
      const latestDraft = pathwayDocRef.current.versions[0]?.content;
      const priorDraft = latestDraft ? [{ role: 'assistant', content: latestDraft }] : [];

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...toApiMessages(c.messages), ...priorDraft, { role: 'user', content: trailingMessage }],
          mode: 'pathway-draft',
          grid: c.grid,
          meta: c.meta,
        }),
      });
      if (!res.body) throw new Error('No response from the server.');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
      }

      const submission = await upsertPathwaySubmission(c.id, text);
      if (!submission) throw new Error('Could not save the draft.');

      const versions = await listPathwaySubmissionVersions(submission.id);
      const previousVersionNumber = versions[0]?.version_number ?? 0;
      const newVersion = await insertPathwaySubmissionVersion(
        submission.id,
        text,
        revisionInstruction ?? 'Initial draft',
        previousVersionNumber
      );
      const updatedVersions = newVersion ? [newVersion, ...versions] : versions;

      updatePathwayDoc((prev) => ({
        ...prev,
        submissionId: submission.id,
        versions: updatedVersions,
        selectedVersionNumber: newVersion?.version_number ?? previousVersionNumber,
        loading: false,
      }));

      return text;
    } catch {
      updatePathwayDoc((prev) => ({ ...prev, loading: false, error: 'Could not draft this pathway page. Try again.' }));
      return null;
    }
  }

  // Pushes the current submission straight to the public wiki (see
  // app/api/pathway-submissions/push/route.ts) — used by both the pane's
  // manual "Publish" button and a chat-driven publish request (pathwayAction
  // "publish"), so a push behaves identically either way.
  async function publishPathwayDocument(commitMessage?: string): Promise<{ ok: boolean; slug?: string; error?: string }> {
    const submissionId = pathwayDocRef.current.submissionId;
    if (!submissionId) return { ok: false, error: 'Nothing to publish yet.' };
    try {
      const res = await fetch('/api/pathway-submissions/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submission_id: submissionId, commit_message: commitMessage || 'Update pathway page' }),
      });
      const data = await res.json();
      if (!res.ok) return { ok: false, error: data.error };
      // A push always sends the latest version (versions[0] — see
      // generatePathwayDraft/upsertPathwaySubmission above), so that's what's
      // now live, regardless of which version the pane currently has selected.
      const publishedContent = pathwayDocRef.current.versions[0]?.content ?? null;
      updatePathwayDoc((prev) => ({ ...prev, publishedSlug: data.slug ?? prev.publishedSlug, publishedContent }));
      return { ok: true, slug: data.slug };
    } catch {
      return { ok: false, error: 'Could not reach the server. Try again.' };
    }
  }

  function openPathwayDocument() {
    updatePathwayDoc((prev) => ({ ...prev, paneOpen: true }));
  }

  function closePathwayDocument() {
    updatePathwayDoc((prev) => ({ ...prev, paneOpen: false }));
  }

  function selectPathwayVersion(versionNumber: number) {
    updatePathwayDoc((prev) =>
      prev.versions.some((v) => v.version_number === versionNumber) ? { ...prev, selectedVersionNumber: versionNumber } : prev
    );
  }

  // Appends one client-constructed (never model-authored) assistant message
  // carrying the PATHWAY_DOC_MARKER card — see components/ChatPanel.tsx for
  // the rendering side. Used for both the first draft (with its real gap
  // list, parsed straight from the generated document's own Section 2 — see
  // lib/pathway-gaps.ts) and every later revision (no gap list restated).
  function appendPathwayDocMessage(markdown: string, opts: { includeGaps: boolean }) {
    const gaps = opts.includeGaps ? extractGapsFromPathwayDraft(markdown) : [];
    const gapsLine = gaps.length ? `\n\nA few things I couldn't find in the documents:\n${gaps.map((g) => `- ${g}`).join('\n')}` : '';
    const intro = opts.includeGaps ? `Here is the pathway document drafted from your documents.${gapsLine}` : "Here's the updated pathway document.";
    const content = `${intro}\n\n${PATHWAY_DOC_MARKER}\n\nDo you want to make any changes or want to publish it?`;

    update((c) => ({ ...c, messages: [...c.messages, { role: 'assistant', content }] }));
    if (conversationRef.current) void persist(conversationRef.current);
  }

  function appendPublishOutcomeMessage(result: { ok: boolean; slug?: string; error?: string }) {
    const content = result.ok ? `Published — it's live now.\n\n${PATHWAY_DOC_MARKER}` : `I couldn't publish it — ${result.error || 'something went wrong. Try again.'}`;
    update((c) => ({ ...c, messages: [...c.messages, { role: 'assistant', content }] }));
    if (conversationRef.current) void persist(conversationRef.current);
  }

  // Reacts to the Contributor companion's pathwayAction — see
  // contributorSystemPrompt's JSON contract in lib/system-prompts.ts. Runs
  // after the companion's own reply has finished streaming, from inside
  // sendMessage below, so the "Thinking…" indicator naturally covers the
  // extra draft-generation round trip too.
  async function handlePathwayAction(action: NonNullable<ParsedGridUpdate['pathwayAction']>) {
    if (action.type === 'generate') {
      const markdown = await generatePathwayDraft();
      if (markdown) appendPathwayDocMessage(markdown, { includeGaps: true });
    } else if (action.type === 'revise') {
      const markdown = await generatePathwayDraft(action.instruction || 'Apply the requested change.');
      if (markdown) appendPathwayDocMessage(markdown, { includeGaps: false });
    } else if (action.type === 'publish') {
      const result = await publishPathwayDocument();
      appendPublishOutcomeMessage(result);
    }
  }

  const sendMessage = useCallback(
    async (id: string, history: Message[], userMessage: Message, flow: AdoptionFlow, grid: GridState, meta: AdoptionMeta) => {
      const next: Message[] = [...history, userMessage];
      update((c) => ({ ...c, messages: next }));
      setLoading(true);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: toApiMessages(next),
          mode: 'companion',
          designId: id,
          flow,
          grid,
          meta,
        }),
      });

      if (!res.body) { setLoading(false); return; }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';
      let lastParsed: ParsedGridUpdate | null = null;

      update((c) => ({ ...c, messages: [...c.messages, { role: 'assistant', content: '' }] }));

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });

        const parsed = parseGridUpdate(assistantText);
        if (parsed) {
          lastParsed = parsed;
          update((c) => {
            const nextGrid = { ...c.grid };
            for (const [key, cell] of Object.entries(parsed.cells)) {
              if (cell && key in nextGrid) nextGrid[key] = cell;
            }
            const m = parsed.meta;
            const nextMeta: AdoptionMeta = {
              ...c.meta,
              name: m?.name || c.meta.name,
              sector: m?.sector || c.meta.sector,
              geography: m?.geography || c.meta.geography,
              stage: m?.stage || c.meta.stage,
              summary: m?.summary || c.meta.summary,
              flowStep: parsed.flowStep != null ? Math.max(c.meta.flowStep, parsed.flowStep) : c.meta.flowStep,
              hypothesis: m?.hypothesis || c.meta.hypothesis,
              biggestRisk: m?.biggestRisk || c.meta.biggestRisk,
              confidence: m?.confidence || c.meta.confidence,
              decision: m?.decision || c.meta.decision,
              conversationMode: m?.conversationMode || c.meta.conversationMode,
              cubeAssessment: m?.cubeAssessment
                ? {
                    currentStage: m.cubeAssessment.currentStage ?? c.meta.cubeAssessment.currentStage,
                    coveredDimensions: m.cubeAssessment.coveredDimensions ?? c.meta.cubeAssessment.coveredDimensions,
                    partialDimensions: m.cubeAssessment.partialDimensions ?? c.meta.cubeAssessment.partialDimensions,
                    missingDimensions: m.cubeAssessment.missingDimensions ?? c.meta.cubeAssessment.missingDimensions,
                    assessmentConfirmed:
                      m.cubeAssessment.assessmentConfirmed ?? c.meta.cubeAssessment.assessmentConfirmed,
                  }
                : c.meta.cubeAssessment,
            };
            return { ...c, grid: nextGrid, meta: nextMeta };
          });
        }

        // Step 5 (Generate Output) wraps the full document in <deliverable>
        // tags — once that tag shows up, stop live-typing the message out.
        // Freeze the visible content at whatever came before the tag (the
        // short intro sentence) and show a loading state instead, so the
        // document itself appears as a finished whole once the stream
        // completes below, rather than streaming in piece by piece.
        const stripped = stripGridUpdate(assistantText);
        const deliverableIdx = stripped.indexOf(DELIVERABLE_START);
        update((c) => {
          const msgs = [...c.messages];
          msgs[msgs.length - 1] =
            deliverableIdx === -1
              ? { role: 'assistant', content: stripped }
              : { role: 'assistant', content: stripped.slice(0, deliverableIdx).trim(), generatingDoc: true };
          return { ...c, messages: msgs };
        });
      }

      // Final reveal — for a deliverable message this is the first time the
      // real content (including the finished document) replaces the loading
      // state; for a normal message it's a no-op past what's already shown.
      update((c) => {
        const msgs = [...c.messages];
        msgs[msgs.length - 1] = { role: 'assistant', content: stripGridUpdate(assistantText) };
        return { ...c, messages: msgs };
      });

      if (conversationRef.current && conversationRef.current.id === id) {
        void persist(conversationRef.current);
      }

      // Contributor-only: react to the companion's pathwayAction, if any —
      // done before setLoading(false) so the "Thinking…" indicator covers
      // the extra draft-generation round trip this can trigger (see
      // handlePathwayAction above).
      if (flow === 'contributor' && lastParsed?.pathwayAction && lastParsed.pathwayAction.type !== 'none') {
        await handlePathwayAction(lastParsed.pathwayAction);
      }

      setLoading(false);
    },
    [update]
  );

  // Creates the row on first use; a no-op if the conversation already exists
  // (in which case `flow` is ignored — it only matters at creation time).
  // Concurrent callers (e.g. several dropped files each kicking off
  // extraction) share the same in-flight insert rather than racing.
  function ensureCreated(flow: AdoptionFlow = ''): Promise<AdoptionConversation> {
    if (conversationRef.current) return Promise.resolve(conversationRef.current);
    if (creatingRef.current) return creatingRef.current;

    const promise = (async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('designs')
          .insert({
            meta: { ...EMPTY_META, flow },
            grid_state: EMPTY_GRID,
            messages: [],
          })
          .select()
          .single();

        if (error || !data) {
          console.error('Failed to create adoption row:', error);
          throw new Error('Could not start a new adoption workspace. Try again.');
        }

        const created = rowToConversation(data as AdoptionRow);
        conversationRef.current = created;
        setConversation(created);
        onCreated?.(created);
        return created;
      } finally {
        creatingRef.current = null;
      }
    })();

    creatingRef.current = promise;
    return promise;
  }

  // Silent, one-shot extraction pass (mode `extract-insights`): reads one
  // uploaded document on its own, before the user has said anything, and
  // seeds the grid immediately rather than waiting for a chat turn. Never
  // blocks or surfaces an error to the user — the document's text still
  // reaches the model normally once they do send a message.
  async function extractInsightsForAttachment(text: string, flow: AdoptionFlow) {
    try {
      const c = await ensureCreated(flow);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: text }],
          mode: 'extract-insights',
          grid: c.grid,
        }),
      });
      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
      }

      const parsed = parseGridUpdate(full);
      if (!parsed) return;

      update((cur) => {
        const nextGrid = { ...cur.grid };
        for (const [key, cell] of Object.entries(parsed.cells)) {
          if (cell && key in nextGrid) nextGrid[key] = cell;
        }
        const m = parsed.meta;
        const nextMeta: AdoptionMeta = {
          ...cur.meta,
          name: m?.name || cur.meta.name,
          sector: m?.sector || cur.meta.sector,
          geography: m?.geography || cur.meta.geography,
          stage: m?.stage || cur.meta.stage,
          summary: m?.summary || cur.meta.summary,
          flowStep: parsed.flowStep != null ? Math.max(cur.meta.flowStep, parsed.flowStep) : cur.meta.flowStep,
        };
        return { ...cur, grid: nextGrid, meta: nextMeta };
      });

      if (conversationRef.current) void persist(conversationRef.current);
    } catch {
      // Best-effort enhancement — silently give up; nothing else depends on it.
    }
  }

  const handleUserSend = useCallback(
    async (text: string, flow: AdoptionFlow = '') => {
      const readyAttachments = pendingAttachments.filter((a) => a.state === 'ready');
      const c = await ensureCreated(flow);
      const activeFlow = c.meta.flow;

      if (readyAttachments.length > 0) {
        const images = readyAttachments.filter((a) => a.kind === 'image').map((a) => a.image!);
        const textParts = readyAttachments
          .filter((a) => a.kind === 'text')
          .map((a) => `--- Uploaded: ${a.name} ---\n${a.text}`);

        const baseText =
          text || 'Please read the attached file(s) and tell me what they establish about this adoption.';
        const content = [baseText, ...textParts].join('\n\n');
        const displayLines = [
          ...(text ? [text] : []),
          ...readyAttachments.map((a) => `${a.kind === 'image' ? '🖼️' : '📄'} Uploaded **${a.name}**`),
        ];

        setPendingAttachments([]);

        sendMessage(
          c.id,
          c.messages,
          {
            role: 'user',
            content,
            displayContent: displayLines.join('\n'),
            images: images.length ? images : undefined,
          },
          activeFlow,
          c.grid,
          c.meta
        );
        return;
      }

      sendMessage(c.id, c.messages, { role: 'user', content: text }, activeFlow, c.grid, c.meta);
    },
    [pendingAttachments, sendMessage]
  );

  function handleAttachFiles(files: File[], flow: AdoptionFlow = '') {
    for (const file of files) {
      const attachmentId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      if (!getFileExtension(file.name)) {
        setPendingAttachments((s) => [
          ...s,
          {
            id: attachmentId,
            name: file.name,
            state: 'error',
            error: 'Unsupported type — use .pdf, .docx, .xlsx, .xls, .pptx, .txt, .md, or an image.',
          },
        ]);
        continue;
      }

      setPendingAttachments((s) => [...s, { id: attachmentId, name: file.name, state: 'reading' }]);

      (async () => {
        try {
          if (isImageFile(file.name)) {
            const image = await fileToImageBlock(file);
            setPendingAttachments((s) =>
              s.map((a) => (a.id === attachmentId ? { ...a, state: 'ready', kind: 'image', image } : a))
            );
          } else {
            const text = await extractTextFromFile(file);
            if (!text) throw new Error('No readable text found — it may be a scanned/image PDF.');
            setPendingAttachments((s) =>
              s.map((a) => (a.id === attachmentId ? { ...a, state: 'ready', kind: 'text', text } : a))
            );
            // Only pre-seed the grid for an upload into an already-open
            // conversation. On the welcome screen (no row yet), this used to
            // eagerly create the row and flip the UI straight into the chat
            // view before the user had actually sent anything — the file's
            // text still reaches the model normally as part of the real
            // first message once they press Start, so nothing is lost by
            // waiting.
            if (conversationRef.current) void extractInsightsForAttachment(text, flow);
          }
        } catch (err) {
          setPendingAttachments((s) =>
            s.map((a) =>
              a.id === attachmentId
                ? { ...a, state: 'error', error: err instanceof Error ? err.message : `Could not read ${file.name}.` }
                : a
            )
          );
        }
      })();
    }
  }

  function removeAttachment(attachmentId: string) {
    setPendingAttachments((s) => s.filter((a) => a.id !== attachmentId));
  }

  return {
    conversation,
    loading,
    pendingAttachments,
    handleUserSend,
    handleAttachFiles,
    removeAttachment,
    pathwayDoc,
    openPathwayDocument,
    closePathwayDocument,
    selectPathwayVersion,
    publishPathwayDocument,
  };
}
