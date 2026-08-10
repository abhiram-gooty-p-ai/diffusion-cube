// The four Explorer intents.
//
// An Explorer arrives at the Cube with one of four quite different jobs to be
// done, and the flow that serves each is genuinely different — so the intent
// is picked explicitly from a menu on /explore rather than inferred from free
// text (see AdoptionWorkspace's welcome screen). Once picked it's stored as
// AdoptionMeta.intent and re-injected into every companion turn, exactly the
// way flowStep is.
//
// This file is the single source of truth for all four: the menu copy the UI
// renders, the opening line the chat starts on, and the numbered flow the
// Explorer system prompt injects. Plain data only (no React, no server-only
// imports) so both sides can import it.

export type ExplorerIntentId = 'browse' | 'validate' | 'troubleshoot' | 'guidance';

// '' = not chosen yet (a pre-intent-menu row, or a Contributor adoption).
export type ExplorerIntent = ExplorerIntentId | '';

export interface ExplorerIntentDef {
  id: ExplorerIntentId;
  // Menu card title, and the one-line description under it.
  label: string;
  menuDescription: string;
  // Compact label for the workspace header chip.
  chipLabel: string;
  // Whether this intent is about the user's own deployment. When it isn't
  // (browsing the corpus, or asking about one specific issue), the workspace
  // header stays exactly as the conversation started — the intent chip and
  // nothing else — rather than sprouting an adoption title, sector/stage
  // line, and summary for a deployment the user never came here to describe.
  tracksDeployment: boolean;
  // The first assistant message this intent's chat opens on. Client-
  // constructed and never persisted — same idiom as the Contributor flow's
  // opening message, which keeps the stored history starting on a user turn
  // (the Messages API requires it).
  openingMessage: string;
  // How many numbered steps `flow` below defines — the denominator the model
  // reports flowStep against.
  totalSteps: number;
  // The numbered flow injected into the Explorer system prompt. Written as
  // instructions to the model, in the same voice as the rest of that prompt.
  flow: string;
}

// One line on what the Cube actually is, shown above the menu so someone
// choosing has enough context to choose well.
export const WHAT_THE_CUBE_DOES =
  "The Cube holds real AI adoption journeys — the decisions behind them, what worked, what didn't — so you can see what applies to your own situation.";

export const EXPLORER_INTENTS: ExplorerIntentDef[] = [
  {
    id: 'browse',
    label: 'See what the Cube has',
    menuDescription: 'Browse the documented pathways — what exists, and what each one enabled and their learnings.',
    chipLabel: 'Browsing the Cube',
    tracksDeployment: false,
    openingMessage:
      "Happy to walk you through what's in here. Are you looking for a particular sector or use case, or would you like an overview of a few pathways first?",
    totalSteps: 4,
    flow: `1. **Find out what they're actually after.** Ask once, plainly, whether they're looking for a particular sector or use case, or a general overview. Don't interview them — one question, then work with whatever they give you.

2. **If they named a sector or use case, search the corpus for it and answer with what's actually there.** Apply the matching definition and the presentation rules above exactly:
   - Exact match (same sector, same use-case category): present it directly.
   - Adjacent match only: present it, and say plainly in the same breath that it isn't an exact match to what they asked for, and what the difference is.
   - Neither: say plainly that the Cube doesn't have adoptions like that currently. Do not substitute general knowledge, and do not stretch an unrelated pathway to fill the space.

3. **If they want an overview, or they're not sure what they want, give high-level info on a few pathways and see what catches.** Two or three, one line each — what it is, who it serves, what it enabled. Then ask whether any of them is worth going into. Vary which pathways you lead with across a conversation rather than always opening on the same one.

4. **Once they're interested in a specific pathway, answer their questions about it from that pathway's own documented content.** Facts only — no interpretation, no judgment, no outside knowledge, even where a plausible-sounding answer is available. You may simplify the explanation, or expand it with more of the documented detail, depending on how they want it explained; the underlying facts never change. If they ask something the pathway document doesn't cover, say that it isn't documented. Stay on this step for as long as they keep asking, and go back to step 2 or 3 whenever they move to a different pathway or a new sector.`,
  },
  {
    id: 'validate',
    label: 'Validate what I am already doing',
    menuDescription:
      "You're already onto a use case adoption and want to reflect on your approach and explore what you can learn from other adoptions.",
    chipLabel: 'Validating an adoption',
    tracksDeployment: true,
    openingMessage:
      "Let's look at what you have. Tell me about the deployment — or upload the documents you're working from — and I'll go through it against what the documented pathways show. Sector, use case, and roughly what stage you're at are the three things I need to be clear on.",
    totalSteps: 5,
    flow: `1. **Get the details of what they're working on — as text or as uploaded documents.** Three things have to be genuinely clear before you go further: the **sector**, the **use case**, and the **stage of adoption**. Ask for whatever is still missing, one question at a time, and read any uploaded document rather than asking them to repeat what's in it. Stay on this step until all three are clear.

2. **Analyze what they've shared against the framework, and surface what it raises as questions to consider or decisions to take.** Never phrase any of it as a deficiency, a gap in their work, or something they're missing — "Have you decided who owns this once the pilot ends?" is right; "You're missing institutional ownership" is not. Weight your attention toward what the framework marks Primary at their current stage. Emit the literal tag <cube_grid/> on its own line once, at the point in this message where the grid belongs, if it helps them see where their coverage stands — never build a grid yourself out of text or a table.

3. **If a relevant pathway exists, share its details and ask whether they want to know more.** Relevant means the matching definition above: same sector, same use-case category. Follow the presentation rules — exact match presented directly, adjacent match presented with the caveat stated plainly.

4. **If there is no relevant pathway, check the corpus for micro-innovations relevant to their adoption instead.** Say first, plainly, that there's no pathway matching their sector and use case. Then, if relevant micro-innovations exist, present them as suggested choices drawn from the lived experience of other adoptions — never as recommendations. They judge whether each one fits their context; offer to think through with them how a chosen one might be contextualized to their situation.

5. **If neither a relevant pathway nor relevant micro-innovations exist, state both absences explicitly.** Both, not one. "There's no pathway in the Cube for your sector and use case, and no micro-innovations that apply either" — then stop there rather than filling the space with general advice. From here on, keep working with them on whatever they raise, staying inside these same rules.`,
  },
  {
    id: 'troubleshoot',
    label: 'Get help with a specific issue',
    menuDescription: "Something specific is blocking you, and you want to know how others handled it.",
    chipLabel: 'Working through an issue',
    tracksDeployment: false,
    openingMessage:
      "Tell me what you're running into — as specifically as you can. I'll search the documented pathways for how others handled it, and I'll tell you plainly if nothing in there speaks to it.",
    totalSteps: 5,
    flow: `1. **Let them state the problem.** They lead here. Don't open with a framework tour or a list of questions.

2. **Ask for more context only if you genuinely need it to search the corpus meaningfully.** If what they said is already specific enough to search on, skip straight to step 3 — an unnecessary clarifying question is a cost, not a courtesy. At most one question here.

3. **If you find a highly relevant documented solution, share it along with the pathway it came from.** Name the pathway, say where it was implemented, and say how it actually worked — including its condition tag where the corpus gives one (what it applies to, when it fails).

4. **If you find no highly relevant solution but you do find something with real similarity, say that clearly before sharing it.** State plainly that this isn't a direct match for their problem, share what's there, and ask them whether it's relevant to their situation. Let them make that call — don't make it for them.

5. **If you find nothing relevant at all, say plainly that you cannot suggest anything, because there is no relevant information in the pathways.** Do not offer a general answer instead, do not reason from outside knowledge, and do not stretch an unrelated pathway to look like an answer. This is a correct and complete response. If they then raise a different problem, go back to step 1 and run the same sequence again.`,
  },
  {
    id: 'guidance',
    label: 'Explore what AI could do for me',
    menuDescription: 'New to this, and looking for guidance on a set of use cases, or one you have in mind.',
    chipLabel: 'Exploring what AI could do',
    tracksDeployment: true,
    openingMessage:
      "Good place to start. Tell me what you're thinking about — the sector you work in, and either the use cases you're weighing or the one you already have in mind. Documents are welcome too if you have them.",
    totalSteps: 7,
    flow: `1. **Get the details of what they're working on — as text or as uploaded documents.** Three things have to be genuinely clear before you go further: the **sector**, the **use case**, and the **stage of adoption**. Ask for whatever is still missing, one question at a time. Stay on this step until all three are clear.

2. **If a relevant pathway exists, share its details and ask whether they want to know more.** Relevant means the matching definition above: same sector, same use-case category. Follow the presentation rules — exact match presented directly, adjacent match presented with the caveat stated plainly.

3. **If there is no relevant pathway, say so plainly, then ask whether they want to focus on any specific aspects of the four dimensions: Persona and Problem, Solution, Institution, Ecosystem.** Name all four, don't recommend one, and let them pick as many or as few as they want.

4. **Once they've named the aspect(s), analyze what they've shared against the framework on those dimensions, and surface what it raises as questions to consider or decisions to take.** Same framing rule as everywhere else — never a deficiency, never something they're missing. Emit the literal tag <cube_grid/> on its own line once, at the point where the grid belongs, if seeing their coverage would help.

5. **Check the corpus for micro-innovations relevant to those aspects, and present what you find as suggested choices.** Suggested choices drawn from the lived experience of other adoptions — never recommendations. They judge whether each fits their context; offer to think through how a chosen one might be contextualized to their situation. If neither a relevant pathway nor relevant micro-innovations exist for the dimension(s) they chose, state **both** absences explicitly rather than only one.

6. **Keep working through it with them — and once the conversation has real substance, offer the analysis document.** They'll think through decisions on some of the questions, accept or reject some of the micro-innovations, raise new things. Judge readiness on substance, not on a count: roughly four or five of these exchanges is a fallback heuristic, not a rule. When there's genuinely enough to be useful, ask — once, plainly — whether they'd like an analysis document based on the conversation so far. If they say yes, set explorerAction to "analysis" on that turn (see the JSON contract below) and keep your visible reply to a sentence; the document itself is produced separately, not written out by you in chat. If they say no, carry on and don't ask again unless the conversation has moved on substantially.

7. **Separately from the analysis document, you may offer an executive summary.** This is a different, shorter thing: an executive summary of their implementation plus a summary of the suggestions from the analysis. Offer it only after the analysis document exists, and make the distinction explicit when you offer it, so they're never unsure which is the primary output — the analysis document is the main one. If they accept, set explorerAction to "executive-summary" on that turn and keep your visible reply to a sentence. After either document, the conversation stays open — go back to step 6's rhythm and keep working with them.`,
  },
];

export function getExplorerIntent(intent: ExplorerIntent | undefined): ExplorerIntentDef | null {
  return EXPLORER_INTENTS.find((i) => i.id === intent) ?? null;
}

// The whole menu, rendered for the model — it needs to know what the other
// three intents are in order to notice that one of them now fits better and
// flag it (see the intent-switch rule in the Explorer prompt).
export function explorerIntentMenuBlock(): string {
  return EXPLORER_INTENTS.map((i) => `- **${i.id}** — ${i.label}: ${i.menuDescription}`).join('\n');
}
