# Savyasachi

---

## Section 0 — Reading guide

This document is written for the next person building an AI personal assistant for founders or operators — not as a record of what Savyasachi did, but as a marked trail of what was decided, why, and under what conditions those decisions hold. The knowledge here is thin at the edges: Savyasachi is at Explore stage, so coverage concentrates in problem definition, persona framing, and early architecture choices. Define, Pilot, and Scale cells are empty — those gaps are flagged explicitly in Section 2.

Navigate by what you need: if you're still asking whether AI is the right tool, start with the Persona and Solution units. If you're looking for what integrations were chosen and why, go to Units 3 and 4. The retrieval guide in Section 6 maps common adopter questions to specific units.

---

## Section 1 — Pathway identity

| Field | Value |
|---|---|
| **Deployment name** | Savyasachi (Savya) |
| **Sector** | Productivity / AI tools |
| **Geography** | India |
| **Population served** | Early-stage Indian founders; freelancers and consultants; small agency owners (expansion) |
| **Stage reached** | Explore |
| **Contributing organisation** | Not documented in the source |
| **Key dates** | As of August 24, 2026 |
| **Summary** | Savyasachi is an AI personal assistant built for Indian founders and operators. It converts voice memos and calls into structured memory and automated actions across Notion, Calendar, Gmail, and WhatsApp. V1 is in build; 10 early users are being recruited. The core problem is context loss and execution gaps for founders managing multiple tools and relationships simultaneously. |
| **Scale / impact achieved** | Not documented in the source (pre-launch, 10 early users targeted) |
| **Cost anchor** | Positioned below ₹40,000/month (cost of a human EA in India). Exact pricing not documented in the source. As of August 2026. |
| **Build effort** | 2 months total — 1 month for building, 1 month for testing. |
| **Known downstream adopters** | None at this stage |
| **Scope / does-not-transfer-when** | Designed specifically for Indian market conditions: WhatsApp-native workflows, Indian founder context-juggling patterns, and price sensitivity relative to Western SaaS. Architecture choices may not transfer directly to Western markets or enterprise contexts where compliance, data residency, and procurement are dominant concerns. |

---

## Section 2 — Coverage grid and gaps

### Coverage map

| | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| **Persona** | ●● | ○ | ○ | ○ |
| **Solution** | ●● | ○ | ○ | ○ |
| **Institution** | ● | ○ | ○ | ○ |
| **Ecosystem** | ● | ○ | ○ | ○ |

●●● = dense · ●● = moderate · ● = thin · ○ = empty

### Gaps

The deployment is at Explore stage, so empty Define/Pilot/Scale cells are expected. The gaps below are those that matter most before moving to Define.

1. **Who specifically is the one person this must work for first?** Three personas are named (founders, freelancers, agency owners), but the source does not identify which one Savyasachi is optimising for in V1. Without a single primary persona committed to, the data model, prompt design, and safety boundaries remain underdetermined. *Related to Unit 1.*

2. **What does the current workaround actually look like?** The problem framing describes context loss and execution gaps, but the specific workaround — what founders do today instead of Savya — is not documented. The workaround is the real replacement baseline and shapes what the system needs to outperform. *Related to Unit 1.*

3. **Which data sources are named and owned?** The V1 stack names Whisper, Supabase, Notion MCP, Google Calendar MCP, and Gmail MCP as components, but no named owner or accountability is documented for each integration point. Before Define, each dependency needs an owner and a known failure mode. *Related to Units 3 and 4.*

4. **What is the content authority for what Savya says and does?** When Savya drafts an email or schedules a calendar event incorrectly, who is responsible — the founder, the tool, or the builder? The approval loop (WhatsApp review) is described architecturally, but the accountability question is not resolved. This is the institutional boundary that Define stage must answer.

5. **What is the one question or task V1 must handle correctly, or the pilot fails?** V1 scope is defined as a feature list, not a binary success condition. A single critical use case with a pass/fail definition would sharpen data model decisions and constrain scope before build progresses further. *Related to Unit 2.*

---

## Section 3 — Micro-innovations

### Persona

**1. Founder-as-glue as the problem definition**

- `Dimension: Persona`
- `Stage: Explore`
- `Type: Strategic Decision`

- **Decision:** Frame the core problem not as "too many tools" but as the founder becoming the connective tissue between tools — the human integration layer. This reframes the solution target from tool consolidation to human cognitive offload.
- **Alternative considered:** Not documented in the source.
- **Why:** When the founder is the system, the cost is not inefficiency — it is the opportunity cost of the founder's attention. This framing justifies an AI that acts, not just organises, and sets the bar for what "better" means: fewer decisions the founder has to make, not fewer apps.
- **What this looked like here:** The pitch names three symptoms — context loss on calls, execution falling through WhatsApp and notes apps, and the founder as manual connector — and treats all three as expressions of the same root problem.
- **Condition — applies when:** The user's job involves coordinating across multiple async channels and the cost of coordination is measured in the user's own time, not a team's time.

---

**2. Three-persona sequencing with a named expansion path**

- `Dimension: Persona`
- `Stage: Explore`
- `Type: Strategic Decision`

- **Decision:** Name three personas in sequence — primary (early-stage founders), secondary (freelancers/consultants), expansion (small agency owners) — rather than building for one or collapsing all three into a single undifferentiated "busy professional."
- **Alternative considered:** Not documented in the source.
- **Why:** The three personas share the context-loss problem but differ in who they are coordinating with (self, clients, or a team). Sequencing them preserves a single V1 scope while making the growth path explicit. Agency owners introduce multi-user complexity that V1 deliberately defers.
- **What this looked like here:** V1 feature list targets solo-user workflows only. Multi-user team features are explicitly deferred to V2, consistent with the persona sequencing decision.
- **Condition — applies when:** The expansion personas share the core problem but add a meaningful layer of complexity (multi-user, compliance, team coordination) that would bloat V1 if included. Sequencing only works if the V1 persona is genuinely self-contained.
- **Condition — fails when:** The secondary and expansion personas have fundamentally different data needs or trust requirements from the primary — in that case, sequencing produces a V1 that cannot extend without a rebuild.

---

### Solution

**3. Voice-first input with WhatsApp-native review loop**

- `Dimension: Solution`
- `Stage: Explore`
- `Type: Strategic Decision`

- **Decision:** Design input as voice (memo or call) and review as WhatsApp notification, rather than a dedicated app or dashboard interface. The AI layer operates between these two touchpoints.
- **Alternative considered:** Not documented in the source.
- **Why:** Indian founders already live in WhatsApp. Meeting them at an existing behavioural touchpoint — rather than requiring adoption of a new interface — lowers the activation barrier. Voice input removes the friction of structured data entry at the moment of highest context (during or immediately after a call).
- **What this looked like here:** The review step is explicitly framed as "you approve or redirect" via WhatsApp — not a login, not a dashboard. This positions Savya as ambient infrastructure rather than another app to open.
- **Condition — applies when:** The target user already uses WhatsApp as a primary async communication tool and the primary capture moment is voice-first (calls, voice memos). Breaks down for users whose primary work surface is desktop-first or whose organisation restricts WhatsApp for work communications.

---

**4. MCP agent layer for cross-tool execution**

- `Dimension: Solution`
- `Stage: Explore`
- `Type: Tactical Decision`

- **Decision:** Use MCP (Model Context Protocol) agents for execution across Notion, Google Calendar, and Gmail, rather than custom API integrations or RPA-style automation.
- **Alternative considered:** Not documented in the source.
- **Why:** Not documented in the source beyond the V1 feature list naming MCP as the execution layer.
- **What this looked like here:** Three MCP integrations named for V1 — Notion (page creation), Google Calendar (follow-up scheduling), Gmail (draft emails). A Supabase vector store provides org memory that agents draw on.
- **Condition — applies when:** Target tools have stable MCP connectors. If a required tool lacks an MCP connector, the architecture requires a fallback integration strategy not documented here.
- **Before → After:** Not documented in the source (pre-launch).

---

**5. Market-sizing the EA cost as the price anchor**

- `Dimension: Solution`
- `Stage: Explore`
- `Type: Strategic Decision`

- **Decision:** Set pricing reference against the cost of a human executive assistant in India (₹40,000/month) rather than against competing SaaS tools or Western AI productivity pricing ($49/month Western SaaS cited as the contrast).
- **Alternative considered:** Western SaaS pricing benchmarks (explicitly named and rejected as the comparison point).
- **Why:** Indian founders are price-sensitive relative to Western SaaS benchmarks, but the real alternative they are replacing is human admin support — which carries a concrete, known cost. Anchoring against the EA cost makes the value proposition legible and positions Savya as infrastructure, not a luxury add-on.
- **What this looked like here:** The pitch cites ₹40,000/month as the EA cost benchmark. Savya's actual price is not documented in the source.
- **Condition — applies when:** The user population has genuine familiarity with the cost of human admin support and is making a real build-vs-hire decision. Fails when users have never considered hiring an EA — in that case, the anchor has no purchase.

---

### Institution

**6. Founder-built, founder-tested as the early validation model**

- `Dimension: Institution`
- `Stage: Explore`
- `Type: Strategic Decision`

- **Decision:** Recruit 10 Indian founders and operators as co-builders for early access rather than building in stealth and launching to a cold audience.
- **Alternative considered:** Not documented in the source.
- **Why:** The target persona is founders — people who understand iteration and have high tolerance for rough edges if they have input on direction. Early co-builders provide signal on whether the persona framing holds (does a real founder actually experience the problem as described?) and lock in founding-user pricing as an acquisition mechanic.
- **What this looked like here:** The call-to-action in the pitch is direct co-builder recruitment: "We're looking for 10 Indian founders and operators to build Savya with us from day one. Free early access — no credit card."
- **Condition — applies when:** The product is genuinely unfinished and the builder has capacity to incorporate user input. Fails when early users expect a polished product or when the builder cannot act on feedback without a major rebuild.

---

### Ecosystem

**7. WhatsApp as distribution and trust layer, not just notification**

- `Dimension: Ecosystem`
- `Stage: Explore`
- `Type: Strategic Decision`

- **Decision:** Treat WhatsApp as a trust and distribution layer — the channel through which Savya earns ongoing permission from the founder — rather than as a simple push notification rail.
- **Alternative considered:** Not documented in the source.
- **Why:** In Indian founder contexts, WhatsApp is where real decisions happen. A tool that lives in WhatsApp is treated as part of the workflow; a tool that sends notifications to WhatsApp from outside is treated as an interruption. Positioning review as a WhatsApp-native action (approve or redirect) gives Savya ongoing permission to act rather than requiring the founder to re-engage a separate interface.
- **What this looked like here:** Every Savya action cycle ends with a WhatsApp notification for review — the founder's approval is given in WhatsApp, not in a dashboard. This is the only described touchpoint for the human-in-the-loop step.
- **Condition — applies when:** The target market uses WhatsApp as a professional-grade async channel where decisions are made, not just as a consumer messaging app. Does not transfer to markets where WhatsApp is a personal-only channel or where enterprise communication happens on Slack, Teams, or email exclusively.

---

## Section 4 — Toolkits and playbooks

| Unit | Title | Type | Reuse condition |
|---|---|---|---|
| 3 | Voice-first input with WhatsApp-native review loop | Strategic Decision | Applies when target users are WhatsApp-native professionals and the primary capture moment is voice. Does not transfer to desktop-first or enterprise-restricted environments. |
| 4 | MCP agent layer for cross-tool execution | Tactical Decision | Applies when target tools have stable MCP connectors. Requires fallback strategy if a required tool lacks MCP support. |
| 7 | WhatsApp as distribution and trust layer | Strategic Decision | Applies when WhatsApp functions as a professional decision channel for the target market, not just a consumer app. |

---

## Section 6 — Retrieval guide

*"How do I frame the problem for a persona who's drowning in tools?"* → Unit 1

*"Should I build for one persona first or address all of them?"* → Unit 2

*"How do I justify the price point for an Indian market?"* → Unit 5

*"Why voice input rather than a structured form or dashboard?"* → Unit 3

*"Why WhatsApp for review rather than a dedicated app?"* → Units 3, 7

*"Which integrations should I build first for a founder-facing PA?"* → Unit 4

*"How do I recruit early users without a finished product?"* → Unit 6

*"What makes WhatsApp work as more than a notification channel?"* → Unit 7

*"How do I sequence personas without losing focus on V1?"* → Unit 2

*"What is the right comparison point for pricing an AI productivity tool in India?"* → Unit 5

---

---

## Source Trace appendix

*Contributor-facing only — not surfaced in any adopter-facing response.*

| Source file | Covers | Notes |
|---|---|---|
| `savyasachi_pitch.pptx` (as of August 24, 2026) | Section 1 — all fields except contributing organisation and build effort; Section 3 — Units 1–7 (all content); Section 4 — all entries; Section 2 — gap identification for Units 1, 2, 3, 4 | Primary source. All factual claims in Sections 1–4 derive from this file. No independent verification. Contributor's own account. |
| Adoption Companion conversation (as of August 24, 2026, 2:52 AM) | Section 1 — build effort field ("2 months total — 1 month for building, 1 month for testing"); stage confirmed as Explore; Section 2 — gap framing | Contributor's own account. Build effort figure introduced in this conversation; not present in the pitch deck. |