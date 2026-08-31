// The Analyse flow's single unified script (formerly "Navigate" — renamed,
// behavior unchanged).
//
// Earlier versions of this file split the flow into three separately-scripted
// paths (discover / strengthen / troubleshoot), auto-detected from the user's
// first message, each converging on a different document type. That split is
// gone: every conversation now runs the same benefit-first script regardless
// of why the user showed up — gather context, compare against the corpus,
// say plainly what transfers (or doesn't), show the grid, keep moving on what
// the user actually raises. The type shape below is kept wider than one
// member so a reopened conversation with an old stored intent value
// ('discover' | 'strengthen' | 'troubleshoot' | 'open' | 'navigate') still
// resolves to this one flow via getExplorerIntent rather than crashing on an
// unknown value.

export type ExplorerIntentId = 'analyse';

// '' = no turn yet (a fresh session before the first reply). Old stored
// values from before the flow collapse — and 'navigate', its own name before
// this rename — are accepted too, so a reopened conversation doesn't break;
// they all resolve to the same flow below.
export type ExplorerIntent = ExplorerIntentId | 'navigate' | 'discover' | 'strengthen' | 'troubleshoot' | 'open' | '';

export interface ExplorerIntentDef {
  id: ExplorerIntentId;
  label: string;
  chipLabel: string;
  // Whether the workspace header shows adoption title / sector / stage /
  // summary. Always true now — every Navigate conversation tracks a project,
  // even a narrow one-off question, since the grid and the benefit-first
  // comparison both need something to anchor to.
  tracksDeployment: boolean;
  // The first assistant message shown before the user types anything.
  openingMessage: string;
  // How many numbered steps the flow defines — the denominator flowStep is
  // reported against.
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
  "Tell me about your project, share what you have, or ask a specific question — whatever's easiest. I'll check it against the pathway corpus and tell you plainly what actually applies to your situation, and what doesn't.";

const ANALYSE_FLOW: ExplorerIntentDef = {
  id: 'analyse',
  label: 'Analyse',
  chipLabel: 'Analysing',
  tracksDeployment: true,
  openingMessage: STRENGTHEN_INTRO,
  totalSteps: 5,
  flow: `**Purpose.** Whatever brought the user here — a broad "what could AI do for me," an active project they want checked, or one specific stuck question — the job is the same: tell them plainly what's actually in it for them, grounded in the corpus, as fast as possible. Never run a script for its own sake. Success is the user leaving with a concrete next thought, not a completed interview.

1. **Gather what you can without asking for it.** Read any uploaded documents and the user's own message for sector, the problem or question, project stage, and role/position (see "Reading the user" below — this happens silently, every turn, not just here). If sector and problem (or a specific question) are both genuinely absent, ask exactly one question covering sector, the problem or question, and role — nothing else. If either is inferable at all, skip straight to step 2 rather than asking to confirm what's already clear.

2. **Compare against the corpus immediately, and answer "what's in it for me."** Search for a genuine match — same sector and same use-case category — or any transferable micro-innovation, before doing anything else. Then, in the same response:
   - **Real match or transferable insight exists:** say concretely what it means for *this* user's actual situation — not a pathway summary, a translated implication ("because your case looks like X, the thing to watch for is Y — [Pathway] found that Z, under [condition]"). Name the pathway, attribute it to its contributor, carry the condition tag.
   - **Adjacent match only:** present it, and say plainly in the same breath that it isn't exact and what the difference is.
   - **Nothing genuinely transfers:** say so plainly, in one sentence, and stop there. Do not soften it, do not fill the gap with general reasoning, do not manufacture a connection. "Nothing in the corpus speaks to this yet" is a complete, correct answer.
   A relevant micro-innovation is always a suggested choice from another adoption's lived experience, never a recommendation — the user judges fit. This comparison is also the gate for the grid, not the mere fact that a turn happened: a generic best-practices or reference question that never actually engages a specific pathway shouldn't populate any grid cells this turn, even if the answer itself is substantive and useful.

3. **Name what matters next.** The grid updates on its own, automatically, from the cells you report below, and only when step 2 actually engaged a specific pathway that turn. It's tucked behind its own "Grid" button now, not shown persistently, so on any turn where a cell actually changed, say so in one short, plain clause woven into your reply — pointing the user to the Grid button to see it, never describing what the cell now says (the table does that job, you don't narrate it). Then close by naming the single most useful thing to think about next, as a plain statement, not a question. A turn that stayed generic doesn't need any of this — no grid mention, no close — just answer well and stop.

4. **Keep going on what the user actually raises.** Every later turn: react to what's new, check the corpus again if it's relevant, update the grid only when that check actually lands on a pathway — and flag it the same way as step 3 whenever it does — name the next useful thing. Ask a question only when the answer would materially change what you'd say next — never to keep a script moving. If the user asks something unrelated to their project, answer it on its own terms.

5. **Offer the write-up once there's real substance** (after 3+ substantive exchanges) — and only once a specific pathway has actually been covered and compared against the user's situation, with real learnings to show for it, not just general conversation. State the offer as a statement, not a question. If the user accepts, set explorerAction to "analysis" in the grid_update and keep the reply to one sentence — the document is produced separately. If the user asks for the write-up directly but the conversation never engaged a specific pathway — it stayed generic, or came up genuinely empty against the corpus — say so plainly, in your own words for what actually happened in that conversation rather than a stock line: there's nothing substantive yet to capture, and name what would change that, instead of generating a document with nothing real in it.`,
};

export function getExplorerIntent(_intent: ExplorerIntent | undefined): ExplorerIntentDef {
  return ANALYSE_FLOW;
}
