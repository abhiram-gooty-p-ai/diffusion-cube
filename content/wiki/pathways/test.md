# Savyasachi

---

## Section 0 — Reading guide

This document is written for the next person building or evaluating an AI personal assistant for Indian founders and operators — not as a record of what was built, but as a marked trail for what they would need to decide, the alternatives they would consider, and the conditions under which different choices are correct.

Knowledge here is organised across four dimensions (Persona, Solution, Institution, Ecosystem) and four stages (Explore, Define, Pilot, Scale). At this point, Savyasachi has generated knowledge primarily at the Explore stage. Define, Pilot, and Scale cells are sparse or empty — those gaps are named explicitly in Section 2.

Reusable value concentrates in Section 3 (micro-innovations) and the retrieval guide in Section 6. Navigate by the question you're trying to answer, not by reading front to back.

---

## Section 1 — Pathway identity

| Field | Detail |
|---|---|
| **Deployment name** | Savyasachi (product name: Savya) |
| **Sector** | Productivity / AI Tools |
| **Geography** | India |
| **Population served** | Early-stage Indian founders and operators; secondary: freelancers and consultants; expansion: small agency owners |
| **Stage reached** | Explore — pre-launch, recruiting 10 early users |
| **Contributing organisation** | Not documented in the source |
| **Key dates** | As of August 2026 |
| **Summary** | Savyasachi is an AI personal assistant built for Indian founders and operators. It captures voice memos and calls, extracts entities, links context to organisational memory, and executes tasks across Notion, Google Calendar, Gmail, and WhatsApp via MCP agents. The product is pre-launch, recruiting 10 founding users. |
| **Scale / impact achieved** | Not documented in the source — pre-launch |
| **Cost anchor** | Positioned as a fraction of ₹40,000/month (cost of a human EA in India); exact pricing not documented in the source. As of August 2026. |
| **Build effort** | Not documented in the source |
| **Known downstream adopters** | None yet — seeking first 10 users |
| **Scope / does-not-transfer-when** | Designed specifically for WhatsApp-native Indian workflows and Indian market pricing expectations. Core positioning depends on WhatsApp as the primary notification and review channel. Likely does not transfer as-is to markets where WhatsApp is not the dominant professional communication layer. |

---

## Section 2 — Coverage grid and gaps

### Coverage map

| Dimension | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| **Persona** | ●● | ○ | ○ | ○ |
| **Solution** | ●● | ○ | ○ | ○ |
| **Institution** | ● | ○ | ○ | ○ |
| **Ecosystem** | ● | ○ | ○ | ○ |

●●● = dense coverage · ●● = partial · ● = thin · ○ = not yet covered

### Gaps

The following gaps are genuine open questions for this deployment at its current stage, not padding for empty cells.

**Gap 1 — Persona × Define (relates to Unit 1):** The primary user is named, but the single critical use case that defines pilot success is not yet specified. What is the one question a Savya user must be able to answer, or the pilot fails? "Nothing slips" is a benefit, not a binary success definition. This needs resolving before data models and safety boundaries are designed.

**Gap 2 — Solution × Define (relates to Unit 3):** The V1 architecture lists six MCP integrations and two data layers (Supabase vector store + live tool APIs). Which of these, if architected wrongly, would take six months to undo? The irreversibility hierarchy across the stack is not documented.

**Gap 3 — Institution × Explore (relates to Unit 4):** The product is solo founder-built with no institutional structure documented. Who inside this organisation has to personally want this to work — and what is their specific professional stake? At a solo-founder stage, this question is about the founder's own commitment horizon and what would cause them to stop.

**Gap 4 — Ecosystem × Define (relates to Units 3 and 5):** WhatsApp, Notion, Google Calendar, Gmail, and Supabase are named as platform dependencies. No named accountability owner, SLA, or contingency exists for any of them. Which dependency, if it broke, would most damage user trust — and is there a fallback?

**Gap 5 — Persona × Pilot:** Three user segments are named (founders, freelancers, agency owners), but no failure taxonomy exists yet. When Savya answers badly for a founder, is that a scope problem (outside what Savya should handle) or a quality problem (within scope, answered wrongly)? This distinction will determine whether the fix is prompt design or boundary redesign.

---

## Section 3 — Micro-innovations

### Persona

**1. Define the primary user by what they are forced to do, not what they want**

- `Dimension: Persona`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** Frame the target user by the compensatory behaviour the product eliminates — not by job title or company stage. The Indian early-stage founder is defined here not as "Series A or earlier" but as "the person who has become the connective tissue between every conversation and action in their company."
- **Alternative considered:** Not documented in the source.
- **Why:** A behaviour-based definition forces the product to solve for the actual pain (founder as glue) rather than a demographic proxy. It also makes the problem legible to the user immediately — they recognise themselves without needing explanation.
- **What this looked like here:** The pitch centres on the phrase "you end up being the glue between every conversation and every action." This doubles as the acquisition message and the product brief — the same framing drives both who is recruited and what gets built.
- **Condition — applies when:** The pain is a systemic behaviour the user is trapped in, not a single discrete task. Works when the user already feels the problem acutely but has no language for it yet.

---

**2. Sequence user segments by expansion logic, not by market size**

- `Dimension: Persona`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** Order user segments as primary → secondary → expansion based on which segment's pain is sharpest and whose adoption validates the next. Freelancers confirm the core memory-and-execution loop works for a single person managing multiple client contexts. Agency owners are the natural next segment once multi-context memory is proven — not a separate product, the same core with team features layered on.
- **Alternative considered:** Not documented in the source.
- **Why:** Building for the expansion segment (agency owners) first would require multi-user features before the core loop is validated. Sequencing by pain sharpness means the V1 scope is defensible — team features are explicitly parked to V2.
- **What this looked like here:** V1 ships zero multi-user features. Agency owners are named as an expansion segment, not a launch target. Multi-user team features appear explicitly in the V2 roadmap.
- **Condition — applies when:** Each subsequent segment's core job-to-be-done is a superset of the previous segment's. Fails when segments have fundamentally different workflows requiring parallel product tracks.

---

### Solution

**3. Separate the capture layer from the execution layer at the architecture level**

- `Dimension: Solution`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** Design the system as two distinct layers — a capture-and-structure layer (voice → transcription → entity extraction → vector memory) and an execution layer (MCP agents acting across tools). The user interacts primarily at the capture end and review end; the middle runs autonomously.
- **Alternative considered:** Not documented in the source.
- **Why:** Keeping capture and execution as separate layers means failures in one do not cascade into the other. A transcription error is a capture problem; a misfired calendar event is an execution problem. Each has a different fix path and a different accountability owner.
- **What this looked like here:** The V1 architecture names Whisper for transcription, Supabase for vector storage, and separate MCP connectors for each tool (Notion, Google Calendar, Gmail, WhatsApp). These are named as distinct components, not a monolithic pipeline.
- **Condition — applies when:** The input modality (voice, text, call) is variable and the output tools are multiple. Fails when there is a single, fixed input-output pair — in that case, the layered architecture adds complexity with no benefit.

---

**4. Use WhatsApp as the review and approval channel, not an additional integration**

- `Dimension: Solution`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** Route all Savya outputs requiring user review back through WhatsApp — the channel the target user already lives in — rather than requiring them to return to a dashboard or a new interface.
- **Alternative considered:** Not documented in the source.
- **Why:** For Indian founders, WhatsApp is the ambient professional layer. A review step that requires opening a new app adds friction that compounds across every interaction. WhatsApp-native review makes "you approve or redirect" feel like existing behaviour, not a new workflow.
- **What this looked like here:** WhatsApp notification is the final step in the V1 flow — after Notion, Calendar, and Gmail actions are drafted, the user is notified on WhatsApp for review. It is not a supplementary channel; it is the primary human-in-the-loop interface.
- **Condition — applies when:** Target users are in a geography where WhatsApp is the dominant professional communication layer and already use it for time-sensitive decisions. Does not transfer to markets where email or Slack is the primary ambient layer.

---

**5. Treat market-specific pricing as a product decision, not a go-to-market decision**

- `Dimension: Solution`
- `Stage: Explore`
- `Type: Strategic Decision`

- **Decision:** Price Savya as a fraction of the Indian EA market rate (₹40,000/month), not as a discount to Western SaaS benchmarks. The comparison point is a local human alternative, not a global software category.
- **Alternative considered:** Western SaaS pricing (cited in the source as ~$49/month) was explicitly rejected.
- **Why:** For Indian founders, ₹40,000/month for a human EA is a real and familiar cost. Pricing against that benchmark makes the value case immediate and concrete. Pricing against $49/month Western SaaS frames Savya as a cheaper version of something foreign, not a replacement for something local.
- **What this looked like here:** The pitch explicitly names "₹40k cost of a human EA/month" and positions Savya as "a fraction" of that — not as a cheaper Notion AI or similar.
- **Condition — applies when:** A human-role alternative exists in the target market at a known, familiar cost, and that alternative is the real competitive baseline. Fails when no local human-role benchmark exists or when the product is genuinely in a software category with established local pricing norms.

---

### Institution

**6. Recruit founding users as co-builders, not beta testers**

- `Dimension: Institution`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** The first 10 users are recruited explicitly as co-builders with direct input on features and founding pricing locked forever — not as recipients of a finished product being tested.
- **Alternative considered:** Not documented in the source.
- **Why:** At pre-launch stage with no usage data, co-builder framing accomplishes two things simultaneously: it recruits people motivated to give structured feedback (not just use or churn), and it creates a social contract that makes those users invested in the product's success rather than passive evaluators.
- **What this looked like here:** The pitch's call to action is "build Savya with us from day one" — free early access, direct feature input, founding pricing. The framing is explicit: these users are named as people who will shape what gets built.
- **Condition — applies when:** The product is genuinely incomplete and the founding users' domain expertise (in this case, Indian founder workflows) would materially change product decisions. Fails when the product is already defined and "co-builder" framing would create false expectations about influence.

---

### Ecosystem

**7. Name WhatsApp as infrastructure, not a feature**

- `Dimension: Ecosystem`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** WhatsApp is positioned as a foundational infrastructure dependency — the primary delivery rail — not as one integration among many. This means platform risk (API policy changes, rate limits, business account restrictions) is a first-order concern, not a secondary one.
- **Alternative considered:** Not documented in the source.
- **Why:** When a platform dependency is treated as a feature, its risks are managed as product risks (edge cases, bugs). When it is treated as infrastructure, its risks are managed as existential risks requiring contingency planning. The distinction matters because WhatsApp's Business API has historically changed access rules in ways that affected third-party products significantly.
- **What this looked like here:** WhatsApp is named in both the product architecture (notification and review channel) and the market positioning ("WhatsApp-native notifications — where Indian founders already live"). Its centrality is not incidental.
- **Condition — applies when:** A single third-party platform is both the primary delivery channel and the primary trust signal for the target user. The risk is proportional to how irreplaceable that platform is for reaching the user.

---

## Section 4 — Toolkits and playbooks

| # | Title | Type | Reuse condition |
|---|---|---|---|
| 2 | Sequence user segments by expansion logic | Strategic Decision | Applies when each subsequent user segment's job-to-be-done is a superset of the previous segment's |
| 3 | Separate the capture layer from the execution layer | Strategic Decision | Applies when input modality is variable and output tools are multiple |
| 4 | Use WhatsApp as the review and approval channel | Strategic Decision | Applies when target users are in a WhatsApp-dominant professional context |
| 6 | Recruit founding users as co-builders | Strategic Decision | Applies when the product is genuinely incomplete and founding users have domain expertise that would materially change product decisions |

---

## Section 6 — Retrieval guide

*"Who is the right first user to recruit for an AI productivity tool in India?"* → Unit 1, Unit 2

*"How do I frame the value proposition against a human assistant rather than a software competitor?"* → Unit 5

*"Should I build a dashboard for user review, or use the channel they already use?"* → Unit 4

*"How do I structure V1 scope when I want to serve founders, freelancers, and agencies?"* → Unit 2

*"How should I architect a system that captures input and then acts across multiple tools?"* → Unit 3

*"WhatsApp is central to my product — what risks does that create?"* → Unit 7

*"How do I recruit early users in a way that generates useful feedback, not just usage data?"* → Unit 6

*"How do I price an AI assistant in the Indian market?"* → Unit 5

*"What should I resolve before moving from Explore to Define?"* → Unit 1 (Gap 1), Unit 3 (Gap 2), Unit 7 (Gap 4)

---

---

## Source Trace appendix

*Contributor-facing only — not surfaced in any adopter-facing response.*

| Source file | Covers | Notes |
|---|---|---|
| savyasachi_pitch.pptx, as of August 26, 2026 | Section 1 — all fields except Contributing Organisation and Build Effort; Section 3 — Units 1–7; Section 4 — all entries; Section 6 — all retrieval entries; Section 2 — coverage grid and Gaps 1–5 | Primary source. Solo founder pitch deck, pre-launch. All facts are this contributor's own account; not independently verified. |
| Adoption Companion conversation, as of August 26, 2026 | Section 1 — Stage, Geography, Sector, Summary; Section 2 — coverage grid density labels | Confirms pitch deck content; confirms Explore stage. Adds no new facts beyond what the pitch deck establishes. |