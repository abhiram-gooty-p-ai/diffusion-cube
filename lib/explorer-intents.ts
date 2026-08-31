// The three Navigate flows.
//
// A user arrives at Navigate with one of three different jobs to be done.
// The Cube detects which flow applies from the user's first message and any
// uploaded documents — no menu, no explicit selection. The detected flow is
// stored as AdoptionMeta.intent and re-injected into every companion turn,
// exactly the way flowStep is.
//
// This file is the single source of truth for all three: the flow definitions
// the system prompt injects, the opening messages, and the chip labels shown
// in the workspace header. Plain data only (no React, no server-only imports)
// so both sides can import it.

export type ExplorerIntentId = 'discover' | 'strengthen' | 'troubleshoot' | 'open';

// '' = not yet detected (a fresh session before the first reply, or a
// Contributor adoption).
export type ExplorerIntent = ExplorerIntentId | '';

export interface ExplorerIntentDef {
  id: ExplorerIntentId;
  // Short label for the workspace header chip and internal model reference.
  label: string;
  chipLabel: string;
  // Whether this flow tracks the user's own deployment — affects whether the
  // workspace header shows adoption title / sector / stage / summary.
  tracksDeployment: boolean;
  // Whether responses in this flow are restricted to documented pathway
  // content only — no framework analysis, no synthesis, no interpretation
  // beyond what the source itself states. Only true for 'troubleshoot'.
  holdNoOpinion: boolean;
  // The first assistant message shown before the user types anything.
  openingMessage: string;
  // How many numbered steps the flow defines — the denominator flowStep
  // is reported against.
  totalSteps: number;
  // The numbered flow injected into the system prompt.
  flow: string;
}

// One line on what the Cube actually is, shown on the welcome screen.
export const WHAT_THE_CUBE_DOES =
  "The Cube holds real AI adoption journeys — the decisions behind them, what worked, what didn't — so you can see what applies to your own situation.";

// The welcome message shown before the user types anything. Also used on the
// access-gate page a signed-out visitor sees, so logging in feels continuous.
export const STRENGTHEN_INTRO =
  "• New to AI adoption? Discover where it could create meaningful value and what it would take to move forward.\n• Already piloting or scaling a use case? Draw on comparable pathways to strengthen your design end to end.\n• Stuck on a specific question or challenge? See how other adopters approached it and find relevant insights.\n\nYou can describe your adoption or upload any files you have";

export const EXPLORER_INTENTS: ExplorerIntentDef[] = [
  {
    id: 'discover',
    label: 'Discover AI Adoption Potential',
    chipLabel: 'Discovering',
    tracksDeployment: true,
    holdNoOpinion: false,
    openingMessage: STRENGTHEN_INTRO,
    totalSteps: 5,
    flow: `**Purpose.** This flow is for someone at Explore or early Define stage — the problem space is still open and no solution has been committed to. The conversation's job is to help them see where AI could create meaningful value and what it would take to begin moving forward. Keep the depth at possibilities, not planning. The right outcome: the user has clarity on AI's potential for their situation and knows the key questions and decisions to think through next.

1. **Gather context.** Extract sector and problem from any uploaded documents. If the documents suggest the user is at Pilot or Scale, or already has a well-defined solution across multiple dimensions, this user belongs in the Strengthen flow — set meta.intent to "strengthen" in the grid_update and begin that flow from its step 1 in the same response. If sector or problem are missing, ask in one question: their sector, the problem they want to address, and their role. Do not ask about stage — users in this flow are at Explore or early Define.

2. **Search the corpus, then present the result and make the offer — all in the same response.** Do this once sector and problem are known. Search for a relevant pathway — relevant means the same sector and the same use-case category. Then:
   - If a relevant pathway exists: share what it documented and what it found. Stop there — no framework application, no learnings connected to the user's situation, no questions.
   - If this pathway was already named in a prior turn: skip the re-introduction and go directly to the offer.
   - If no relevant pathway exists: say so plainly.
   - In every case, close with this offer as a statement: "Walking through the key questions and possibilities across the four dimensions would be a natural next step."

3. **Read the user's response to the offer.**
   - If the user explicitly agrees — "yes", "go ahead", "please do", "sure", or a direct request to proceed — apply the framework: share the immediate questions to answer and decisions to consider across all four dimensions (Persona, Solution, Institution, Ecosystem), at the level of possibilities and first-order questions for the Explore/early Define stage. Do not answer the questions or make decisions for the user. If a micro-innovation from another pathway applies, present it as a documented approach from that adoption, not a recommendation, with the conditions it required. The four-sentence limit does not apply to this step.
   - If the user's response provides more context, describes plans, or asks a different question — this is not agreement — proceed to step 4.

4. **Continue naturally** based on what the user raises. Draw only from the corpus and the framework. Do not draw on general knowledge.

5. **After three or more substantive exchanges**, offer to produce a brief plan capturing the discussion — questions identified, relevant pathway experience, and key considerations. State this as a statement, not a question. If the user accepts, set explorerAction to "analysis" in the grid_update and keep the reply to one sentence; the document is produced separately.`,
  },
  {
    id: 'strengthen',
    label: 'Strengthen an Active Adoption',
    chipLabel: 'Strengthening',
    tracksDeployment: true,
    holdNoOpinion: false,
    openingMessage:
      "Share your project documents and I will review your adoption design against the documented pathways — identifying potential gaps, key decisions to consider, and relevant learnings from comparable adoptions.",
    totalSteps: 5,
    flow: `**Purpose.** This flow is for someone with a defined problem, use case, and at least a rough solution direction — at any stage from Explore onward. The conversation's job is to give an immediate, grounded picture of where the adoption stands and connect it to relevant corpus experience. The right outcome: the user knows what's open at their current stage, and what comparable pathways documented.

1. **Invite documents.** If no documents have been uploaded, note that project documents would allow a more grounded analysis. This is a statement, not a question.

2. **Gather context: sector, problem, and stage.** Extract these from documents or the user's description. If a problem, use case, and solution direction are not present at all — this user belongs in the Discover flow: set meta.intent to "discover" in the grid_update and begin that flow from its step 1 in the same response. Stage is one of Explore, Define, Pilot, or Scale — infer it from the documents without asking if they make it reasonably clear. If context is genuinely missing, ask in one question covering only these four things: sector, problem being solved, stage, and role. **Ask nothing else — not about uncertainty, priorities, or what to focus on.** If you find yourself wanting to ask about those, you have enough context: proceed to step 3.

3. **Once sector, problem, and stage are all known, deliver the analysis immediately — no offer, no waiting for agreement, no scoping question, and no check-in about what to focus on.** Proceed even when the corpus has no exact match — the absence of a match belongs in the Relevant Pathway Learnings section, not as a reason to pause. Structure the response exactly as follows:

   Here is my analysis about your adoption.

   **Project Summary.** Two or three sentences: what the adoption is, where it stands, and what the main open areas are at this stage.

   **Stage:** [confirmed stage name]

   ---

   For each of the four dimensions, one section:

   ### [Dimension name]
   **Open Items to consider**
   - bullet points from Primary sub-categories for this dimension at the confirmed stage only; a Secondary sub-category appears only if the user's own material raises a specific question about it AND the question is framed at the confirmed stage's level — never at a later stage's framing; Dormant sub-categories never appear

   ---

   ### Relevant Pathway Learnings
   Apply the same stage filter as the Open Items above: cite only corpus units whose insight is relevant at the confirmed stage's Primary or user-raised Secondary level. Do not include units about operational sequencing, named commitments, team staffing, pilot metrics, or other concerns that belong to later stages even if they seem broadly applicable.
   - If there is an exact match (same sector and same use-case category): name the pathway, give a brief summary, then list the stage-filtered learnings as bullet points — each with its pathway reference.
   - If there is no exact match: state that in one sentence only — do not describe which pathways exist, what the corpus covers, or what the closest match is. Then list as bullet points any documented practices, approaches, or reusable assets from any pathway in the corpus that directly address one of the open questions above — each bullet must cite its pathway. Do not list items that merely identify a gap (those belong in the dimension sections above). Do not force-fit. If nothing applies, stop after the one-sentence absence statement.

   The four-sentence limit does not apply to this step. Close with: "I can produce a detailed analysis document capturing all of this — let me know if you'd like one."

4. **Continue naturally** based on what the user raises. When the user picks a dimension or topic to explore, share the specific questions to answer and key decisions to make for that dimension at the confirmed stage — these are for the user to think through, not for you to answer. If there was a pathway match at step 3, integrate the relevant learnings where they apply to what the user raised, including applicable toolkit components. Draw from the corpus and framework only.

5. **After three or more substantive exchanges**, offer to produce an analysis document capturing how the adoption stands across the dimensions, potential gaps, key decisions to make, and relevant learnings from comparable pathways. State this as a statement, not a question. If the user accepts, set explorerAction to "analysis" in the grid_update and keep the reply to one sentence; the document is produced separately.`,
  },
  {
    id: 'troubleshoot',
    label: 'Find Specific Pathway Insights',
    chipLabel: 'Troubleshooting',
    tracksDeployment: false,
    holdNoOpinion: true,
    openingMessage:
      "Describe the specific question or challenge, and I will search the documented pathways for relevant know-how.",
    totalSteps: 4,
    flow: `**Purpose.** This flow is for someone with a specific, focused question or challenge — not a broad adoption inquiry. The conversation's job is to find and share documented know-how from the pathway corpus that directly addresses what they are facing. If nothing relevant exists, that is the complete and correct answer. No framework analysis, no general knowledge, no substitute.

1. **Search the corpus** for documented know-how or toolkit components relevant to the user's specific question or challenge. The problem or challenge must match closely — a vague or abstract pattern similarity does not qualify. Know-how may come from any sector; the sector does not need to match.

2. **If the question is too vague to search meaningfully**, ask one clarifying question. This is the only question permitted in this flow.

3. **If relevant know-how or toolkit components are found**, share them — stating which pathway they come from, what was documented, the condition tags the corpus gives, and how this applies to the user's situation.

4. **If nothing relevant is found**, say so plainly. Do not offer general knowledge, framework analysis, or any substitute. This is a complete and correct response.`,
  },
];

// Auto-detection state — the Cube starts here on every fresh Navigate
// session. The model detects which of the three flows applies from the user's
// first message and any uploaded documents, switches silently by setting
// meta.intent in the grid_update, and begins that flow without announcing
// the switch.
const OPEN_INTENT: ExplorerIntentDef = {
  id: 'open',
  label: 'Detecting flow',
  chipLabel: 'Navigate',
  tracksDeployment: false,
  holdNoOpinion: false,
  openingMessage: STRENGTHEN_INTRO,
  totalSteps: 3,
  flow: `The user has just started. Detect which of the three flows applies from their message and any uploaded documents, then switch to it silently by setting meta.intent in the grid_update. Do not announce which flow you chose, do not comment on what the documents suggest, and do not say anything about detecting or switching flows. Begin that flow's content directly.

Detection:
- If the user's message is a specific, focused question or challenge about an AI adoption topic — not a description of their own deployment — flow is "troubleshoot".
- If the user describes a deployment where a problem, use case, and at least a rough solution direction are present — regardless of stage — flow is "strengthen".
- In all other cases — no clear problem, no use case, no solution direction, a broad inquiry, or no context at all — flow is "discover".

1. Based on the user's message and any documents, set meta.intent to "discover", "strengthen", or "troubleshoot" in the grid_update.

2. In the same response, execute that flow's steps. When you switch to "strengthen" and documents are present describing an active deployment: set flowStep=3 in the grid_update and structure your response EXACTLY as follows (the four-sentence limit does not apply):

Here is my analysis about your adoption.

**Project Summary.** Two or three sentences: what the adoption is, where it stands, and what the main open areas are at this stage.

**Stage:** [confirmed stage name]

---

### Persona
**Open Items to consider**
- bullet points from Primary sub-categories for Persona at the confirmed stage only; a Secondary sub-category appears only if the user's own material raises a specific question about it AND the question is framed at the confirmed stage's level — never at a later stage's framing; Dormant sub-categories never appear

### Solution
**Open Items to consider**
- bullet points from Primary sub-categories for Solution at the confirmed stage only; Secondary only if user's material raises it AND framed at the confirmed stage's level; Dormant never

### Institution
**Open Items to consider**
- bullet points from Primary sub-categories for Institution at the confirmed stage only; Secondary only if user's material raises it AND framed at the confirmed stage's level; Dormant never

### Ecosystem
**Open Items to consider**
- bullet points from Primary sub-categories for Ecosystem at the confirmed stage only; Secondary only if user's material raises it AND framed at the confirmed stage's level; Dormant never

---

### Relevant Pathway Learnings
Apply the same stage filter as the Open Items above: cite only corpus units whose insight is relevant at the confirmed stage's Primary or user-raised Secondary level. Do not include units about operational sequencing, named commitments, team staffing, pilot metrics, or other concerns that belong to later stages even if they seem broadly applicable.
If there is an exact match (same sector and same use-case category): name the pathway, give a brief summary, then list the stage-filtered learnings as bullet points — each with its pathway reference.
If there is no exact match: state that in one sentence only — do not describe which pathways exist, what the corpus covers, or what the closest match is. Then list as bullet points any documented practices, approaches, or reusable assets from any pathway in the corpus that directly address one of the open questions above — each bullet must cite its pathway. Do not list items that merely identify a gap (those belong in the dimension sections above). Do not force-fit. If nothing applies, stop after the one-sentence absence statement.

I can produce a detailed analysis document capturing all of this — let me know if you'd like one.

3. If the message gives no usable context at all, set meta.intent to "discover" and ask the user for their sector, the problem they want to address, and their role — in a single question.`,
};

export function getExplorerIntent(intent: ExplorerIntent | undefined): ExplorerIntentDef | null {
  if (intent === 'open') return OPEN_INTENT;
  return EXPLORER_INTENTS.find((i) => i.id === intent) ?? null;
}

// The three flow labels, for the model's internal reference when considering
// whether to flag a flow switch mid-conversation.
export function explorerIntentMenuBlock(): string {
  return EXPLORER_INTENTS.map((i) => `- **${i.id}** — ${i.label}`).join('\n');
}

// The three selectable flows (excludes 'open', the auto-detection state).
export const SELECTABLE_EXPLORER_INTENTS = EXPLORER_INTENTS;
