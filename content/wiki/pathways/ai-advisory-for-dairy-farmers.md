---
type: Pathway
title: Amul AI / Sarla Ben
description: Amul's AI advisory assistant for 3.6 million dairy farmer-members - built in one month on 50+ years of cooperative data, with daily quality review and ongoing expansion into credit and IoT health alerts.
tags: [Voice AI, Agriculture, Dairy]
sector: Agriculture / Dairy
stage: Scale
timestamp: 2026-09-16
contributor: GCMMF (Amul) / EkStep Foundation
---

# Amul AI / Sarla Ben

---

## Section 0 — Reading guide

This document is written for the next adopter, not as a record of what Amul built. Every section is oriented toward decisions you will face, conditions under which choices are correct, and what breaks under real conditions.

**What a pathway document is.** A pathway document extracts the reusable content from a real deployment — decisions, failures, fixes, and conditions — so the next adopter can start where this one stopped rather than repeating the same learning.

**How to navigate.** The coverage grid in Section 2 shows where knowledge is dense and where gaps remain. Section 3 contains the core reusable units, organised by dimension and ordered within each dimension from Explore to Scale. Section 4 lists reusable toolkits and playbooks. Section 6 maps the questions a future adopter is likely to ask to the units that answer them.

**Where reusable value concentrates.** The highest-density cells in this deployment are Institution × Explore (the PMO-trigger-to-MD-ownership sequence), Solution × Pilot (the discovery that chat outperformed voice, and the landing-page fix that doubled usage), and Ecosystem × Define (the multi-source knowledge ingestion process). The per-cow data gap identified by EkStep's COO is the most important forward-looking insight for adopters planning personalised advisory rather than general knowledge retrieval.

---

## Section 1 — Pathway identity

| Field | Detail |
|---|---|
| **Deployment name** | Amul AI / Sarla Ben |
| **Sector** | Agriculture / Dairy |
| **Geography** | Gujarat, India (national and international expansion underway as of September 2026) |
| **Population served** | 3.6 million dairy farmer-members of GCMMF (Amul), primarily women responsible for daily milking and cattle care; feature-phone and smartphone users across Gujarati-speaking rural Gujarat |
| **Stage reached** | Scale |
| **Contributing organisation** | GCMMF (Amul) / EkStep Foundation |
| **Key dates** | PMO call to Amul MD: 8 January 2026 · First version live: approximately February 2026 (three weeks after project start, in time for Global AI Summit) · CM launch of Amul AI: 11 February 2026 · Bharat Vistaar integration completed: approximately August 2026 · Interviews recorded: 7–9 September 2026 |
| **Two-sentence summary** | Sarla Ben is Amul's AI advisory assistant, built in one month on 50+ years of cooperative dairy data, serving 3.6 million farmers across Gujarat via voice, app, and WhatsApp in Gujarati, Hindi, and English. It has become a declared permanent programme with daily quality review, ongoing feature expansion into credit and IoT health alerts, and active interest from New Zealand, Ethiopia, NDDB, and multiple state governments. |
| **Scale achieved (as of August 2026)** | ~1,000 inbound calls/day (40,000+ total); ~15,000 chats/day (500,000+ total); 78,599 unique users in August 2026 alone; 360,871 message turns in August 2026; 96.98% answer-delivery rate; 41% returning users; 82.5% Gujarati-language share; 30,000 vet-visit transactions completed; peak single day 16,791 turns |
| **Cost anchor** | GPU compute provided free by Government of India; AI expertise provided pro bono by EkStep Foundation. Amul's direct cash outlay for setup was effectively zero. Run-rate costs (GPU, expert time) remain covered by these arrangements as of September 2026; Amul has stated it can sustain the platform from its own resources if funding lapses, as the platform and training are already built. Exact cost-per-interaction figure not documented in the source. |
| **Build effort** | One month from project start to first live version; internal Amul team (no-holiday, same-day delivery mandate) plus EkStep Foundation technical team (Jagadish/JB as COO; named members include Kirti Pandey, Mohit, Sunny, Naren Nirand, Kanav). Partner count: EkStep Foundation (technical build and pro-bono AI expertise), NDDB (knowledge content), state government of Gujarat (knowledge content and GPU), veterinary colleges in Anand (knowledge content), 21 district unions (champion teams, knowledge, field distribution). |
| **Downstream adoptions / reuse** | Bharat Vistaar (integrated as backend for agriculture queries, completed ~August 2026); NDDB exploring integration or parallel build; New Zealand dairy sector (interest expressed at International Dairy Federation event, November 2026 planned); Ethiopia (interest expressed); multiple Indian state governments in discussion. OAN/OpenAgriNet architecture underlying Sarla Ben also powers MahaVISTAAR (Maharashtra) and Bihar Krishi, with the same governance template applied locally each time. |
| **Scope / does-not-transfer-when** | Transfers when: the deploying institution already holds per-farmer, per-cattle transactional data in digital form; a cooperative or farmer-trust structure exists that farmers already believe in; a senior institutional owner personally commits. Does not transfer easily when: farmer data is not digitised to individual-animal level; no pre-existing institution has the trust of target farmers; GPU and expert resources must be procured commercially rather than accessed through government or pro-bono arrangements. |

---

## Section 2 — Coverage grid and gaps

| | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| **Persona** | ●● | ●● | ●● | ●● |
| **Solution** | ●● | ●● | ●● | ●● |
| **Institution** | ●● | ●● | ●● | ●● |
| **Ecosystem** | ● | ●● | ●● | ●● |

**Density key:** ●●● rich · ●● covered · ● thin · ○ absent

**Open questions this pathway does not answer**

1. **Persona × Scale — unregistered-number users.** Units 6 and 7 establish that a large share of callers arrive on unregistered numbers (family members calling on behalf of a registered farmer), and that secondary-number linking is being built. What the eventual design looks like, and what share of the 30–40 lakh target population it can reach, is not yet documented. (Relates to Unit 6.)

2. **Solution × Scale — per-cow yield data as the missing input for personalised advice.** Jagadish (EkStep COO) identifies the gap between farmer-level milk yield data (which exists) and per-cow yield data (which does not exist at scale) as the binding constraint on moving from general knowledge retrieval to genuinely personalised health and breeding advice. How this data gap will be closed — whether through IoT collar belts, manual entry, or infrastructure change — is not yet resolved. (Relates to Unit 5.)

3. **Solution × Explore — AI-fit justification for dairy versus simpler alternatives.** The sources establish that Amul had significant prior digitisation and app infrastructure. What was specifically blocking a non-AI solution (e.g. a well-structured FAQ or rule-based triage) from achieving the same outcome for farmers is not explicitly argued in the source material.

4. **Institution × Scale — long-term funding and staffing model after pro-bono period ends.** The Amul official states the platform can be sustained even without funding, because it is built and trained. However, the specific arrangement for GPU costs, EkStep expert time, and Amul's own dedicated staffing beyond the current shared-resource model is not documented. (Relates to Unit 8.)

5. **Ecosystem × Explore — precedent deployments reviewed before starting.** The source does not document whether Amul or EkStep reviewed other voice AI or cooperative-AI deployments before beginning. The OAN slide deck indicates MahaVISTAAR preceded Amul AI; whether lessons from MahaVISTAAR were formally reviewed at Explore stage is not stated.

---

## Section 3 — Micro-innovations

---

### Persona

**1. Starting with the woman who cannot leave the farm**

- **Dimension:** Persona
- **Stage:** Explore
- **Type:** Strategic Decision
- **Decision:** Define the primary user not as "the farmer" in the abstract but as the woman who milks twice daily regardless of circumstances — who is the one the cattle recognise, who is up at 4am, and who has no trusted expert available at that hour or in her language.
- **Alternative considered:** Not documented in the source. The framing emerged from Amul's existing cooperative model, which already tracked that women are the primary cattle-care workers.
- **Why:** Animal husbandry advice delivered to someone other than the person actually performing the care is likely to be ignored or misapplied. Designing for the woman at the farm at 5am — available on any phone, in local Gujarati dialect, at any hour — is a different product than designing for a household's registered farmer account.
- **What this looked like here:** Sarla Ben is accessible on voice (any phone), app, and WhatsApp; it recognises users by mobile number; it answers at any hour; it uses a female persona that farmers report feeling comfortable with. Usage peaks at 6–9am and 6–9pm — the milking windows — confirming the design matched the actual use moment.
- **Condition — applies when:** The care worker and the registered cooperative member are different people in the same household; the primary care window is early morning and evening when formal channels are unavailable.

---

**2. Chat preferred over voice — but voice preferred for transactions**

- **Dimension:** Persona
- **Stage:** Pilot
- **Type:** Failure and Fix
- **Failure:** The team designed and scaled voice capacity assuming voice would be the dominant channel. Farmers turned out to prefer chat for advisory and knowledge queries. Voice capacity was expanded two to three times before the pattern was understood.
- **Fix:** Recognised that the two channels serve different user needs: chat is preferred for advisory (farmers can re-read, copy, and share the answer; the record persists) while voice is preferred for transactions (booking a vet visit feels natural by phone call). Invested in chat quality and capacity accordingly.
- **Insight:** "Voice is easier for farmers" is an assumption, not a finding. Farmers who have mobile phones also have WhatsApp and app interfaces, and they choose chat when they want a record they can refer back to or share. The channel preference is query-type-specific, not user-type-specific.
- **Condition — applies when:** Users have smartphones or WhatsApp access (not feature-phone-only); the advisory content is something a user wants to save, share, or re-read; transactions still benefit from voice confirmation.

---

### Solution

**3. Landing page with suggested questions doubled usage**

- **Dimension:** Solution
- **Stage:** Pilot
- **Type:** Tactical Decision
- **Decision:** Place a Sarla Ben entry point on the app's landing screen (not buried in a menu), with 150 suggested questions shown five at a time in random rotation, so a farmer only has to tap rather than compose a question from scratch.
- **Alternative considered:** Keeping Sarla Ben as a separate section users navigate to, requiring them to know what to ask.
- **Why:** Farmers were not failing to use the system because they lacked interest — they were failing to start because typing a question is hard and knowing what questions are answerable is not obvious. Reducing the cognitive and mechanical cost of a first interaction removes the barrier without changing the underlying capability.
- **What this looked like here:** Usage doubled immediately after the landing-page change. The 150 questions in the backend are rotated in sets of five; the most-asked questions from the daily pivot-table analysis are promoted to the landing page. This is now a continuous loop: analyse top questions → fix most popular on the landing page → observe new top questions.
- **Before → After:** Before: farmers had to navigate to a separate Sarla Ben section and compose a question. After: usage doubled; engagement begins from the moment the app opens.
- **Condition — applies when:** The app already has a meaningful user base (Amul had 10 lakh downloads before this change); the barrier is starting, not sustaining; users have enough familiarity with touchscreens to tap a suggested question.

---

**4. Open-source model as the stated goal from day one; gradual migration validated**

- **Dimension:** Solution
- **Stage:** Define
- **Type:** Strategic Decision
- **Decision:** Commit from the start to running on open-source models, with proprietary models (OpenAI, Claude) used only as a transition scaffold while open-source performance was validated.
- **Alternative considered:** Remaining on proprietary cloud models (OpenAI, Claude were both tested).
- **Why:** The deployment is for a not-for-profit cooperative with cost-consciousness built into its operating philosophy. Sovereign data custody and long-term cost control both point toward open-source. The goal was stated at the Delhi demo that triggered the project.
- **What this looked like here:** Migration was staged — started at approximately 20% open-source / 80% cloud, moved to 40/60, eventually reached 100% open-source. The team continues to monitor whether newer models outperform the current one. The system is hosted privately; no farmer data travels to external model providers.
- **Before → After:** Before: 100% proprietary cloud model. After: 100% open-source, privately hosted, with an ongoing model-evaluation practice in place.
- **Condition — applies when:** The institution is cost-sensitive and sovereignty-conscious; the deployment is in a regulated or trust-sensitive domain where data residency matters; the institution has (or can access) technical expertise to evaluate open-source model performance.

---

**5. API-based data architecture separates the AI layer from data ownership**

- **Dimension:** Solution
- **Stage:** Define
- **Also relevant at:** Scale
- **Type:** Strategic Decision
- **Decision:** Build the AI layer so that it retrieves data at runtime through APIs rather than owning or copying the data. Each data source remains with its accountable owner; the AI system is a consumer, not a custodian.
- **Alternative considered:** Ingesting data into a single AI-owned store (the initial instinct, and what was done for the static knowledge corpus).
- **Why:** At scale with multiple data sources and multiple institutional owners (NDDB, state government, 21 unions, cooperative banks), data errors must be fixable by the data owner without requiring the AI team to rebuild anything. The AI layer presenting institutional knowledge must not become the de facto new source of truth — it must remain a surface over accountable, maintainable sources.
- **What this looked like here:** The architecture distinguishes between the static knowledge corpus (ingested documents from NDDB, vet colleges, state government, Amul's own 50-year archive) and live data retrieved at runtime (milk collection records, vaccination history, mandi prices via Bharat Vistaar). Union scheme information is pulled nightly from union websites, with named union IT coordinators responsible for keeping their page current.
- **Condition — applies when:** Multiple external institutions own data that the AI layer must surface; data accuracy is safety-relevant (veterinary advice, financial transactions); the institution wants to add and remove data sources without rebuilding the AI layer.

---

### Institution

**6. MD personal ownership as the non-negotiable precondition**

- **Dimension:** Institution
- **Stage:** Explore
- **Type:** Strategic Decision
- **Decision:** Treat the MD's personal commitment — not procurement sign-off, not a project sponsor title — as the precondition for starting. The project started because the PMO called the MD directly, and the MD personally convened and drove it.
- **Alternative considered:** Not documented in the source. The trigger was external (PMO) rather than a choice between internal champions.
- **Why:** A one-month, no-holiday build with same-day task completion is only possible when the most senior person in the institution has made it their personal priority. The Amul MD frames Sarla Ben as serving the cooperative's fundamental obligation to its farmer-owners — not as a technology project. That framing cascades: every team member treats farmer requests as the mission, not as tickets.
- **What this looked like here:** The MD personally demonstrated Sarla Ben to the Prime Minister and 30 global leaders at the AI Summit. He drove the cooperative bank integration by framing it as a conversation with the EkStep team about data that "stays with you, stays with me, but the farmer gets the service." He holds a standing 3pm daily call with EkStep and the internal team, which has run every day since January 8.
- **Condition — applies when:** The deployment touches the institution's core purpose (not a peripheral initiative); the build timeline is compressed; the institution needs to mobilise multiple internal teams simultaneously without a formal project structure.

---

**7. No-holiday internal team with same-day delivery commitment**

- **Dimension:** Institution
- **Stage:** Define
- **Type:** Tactical Decision
- **Decision:** Form a dedicated internal team with an explicit no-holiday, same-day-completion mandate for the build period, matched to the EkStep team's own response speed.
- **Alternative considered:** Normal project management with sprint cycles and approval gates.
- **Why:** The one-month timeline was set externally (the Global AI Summit in February). Meeting it required eliminating the internal delays — waiting for approvals, scheduling reviews, batching tasks — that would have consumed the month. The Amul official's framing was: "whatever guidance and instructions they give, we'll do it the same day."
- **What this looked like here:** The team delivered the first version in three weeks (the Prime Minister described it as a miracle). The same-day delivery culture has continued beyond the build: the EkStep technical team (Sunny, Naren Nirand, Kanav) delivers suggested changes same-day, and the Amul team's morning routine starts with a 10-minute review of previous-day usage data.
- **Before → After:** Before: standard project cadence. After: three-week delivery to a live, demo-ready system; daily iteration pace sustained into Scale.
- **Condition — applies when:** An external deadline is fixed and non-negotiable; the institution's leadership has visibly committed; the technical partner matches the same delivery pace.

---

**8. Permanent programme declared; operating model absorbed into cooperative structure**

- **Dimension:** Institution
- **Stage:** Scale
- **Type:** Strategic Decision
- **Decision:** Declare Sarla Ben a permanent programme — not a pilot or a project — explicitly stating it will continue even if external funding lapses, because the platform is built and training is done.
- **Alternative considered:** Treating it as a project dependent on continued EkStep pro-bono support and government GPU provision.
- **Why:** Amul is cost-conscious and farmer-owned. The MD frames Sarla Ben as serving the cooperative's core obligation. Permanence is declared not because funding is secured but because the cooperative's cost-consciousness and mission alignment mean the marginal cost of continuing is now low relative to the value delivered to 3.6 million farmer-owners.
- **What this looked like here:** The declared permanence is supported by: (1) the platform already being built and training already done; (2) 21 union champion teams now embedded in the ongoing operation; (3) the MIS tracking which villages and societies have zero usage, with the union structure providing the outreach channel; (4) the daily 3pm cross-team call as a standing governance mechanism. Specific budget line for GPU and expert costs is not documented in the source.
- **Condition — applies when:** The institution is the primary beneficiary (not an implementing NGO); marginal operating costs are low relative to the value delivered; the deployment is aligned with the institution's core purpose rather than a peripheral initiative.

---

### Ecosystem

**9. Three-tier cooperative structure as the ready-made distribution and feedback channel**

- **Dimension:** Ecosystem
- **Stage:** Explore
- **Also relevant at:** Scale
- **Type:** Strategic Decision
- **Decision:** Use Amul's existing three-tier structure — village dairy cooperative society (DCS) → district union → GCMMF federation — as the primary channel for rollout, training, feedback, and quality improvement, rather than building a new distribution layer.
- **Alternative considered:** Not documented explicitly. The cooperative structure was the obvious channel given Amul's existing farmer relationships.
- **Why:** The cooperative structure already has every farmer's trust, every farmer's mobile number, every cattle's tag number, and every village's secretary and chairman. Building trust from scratch for a new channel would have taken years; using an existing trusted channel compresses both adoption and feedback loops to weeks.
- **What this looked like here:** Champion teams were appointed at each of the 21 unions; WhatsApp groups were created at union level; early rollout used ~2,000 people trained in two-hour sessions. At Scale, the MIS tracks usage by union, district, and village DCS — allowing the team to identify zero-usage societies and have the union secretary or chairman call them directly. The "Sarla Ben Sakhi" programme (appointing a named female champion in each village) is the Scale-stage continuation of the same pattern.
- **Condition — applies when:** A cooperative or membership-based trust structure already exists with pre-built relationships, data, and communication channels to the target population. Does not transfer to contexts where the deploying institution must build farmer trust from zero.

---

## Section 4 — Toolkits and playbooks

| # | Title | Type | One-line reuse condition |
|---|---|---|---|
| 3 | Landing page with suggested questions | Tactical Decision | Use when the app already has a user base and the barrier is starting an interaction, not finding the app |
| 4 | Open-source model migration staging (20/40/100%) | Tactical Decision | Use when sovereign data custody and long-term cost control are requirements, and performance validation is needed before full migration |
| 5 | API-based data architecture with named owner per source | Strategic Decision | Use when multiple institutions own data the AI must surface, and data errors must be fixable without rebuilding the AI layer |
| 7 | No-holiday same-day-delivery team mandate | Tactical Decision | Use when an external deadline is fixed, senior leadership has committed, and the technical partner matches the same pace |
| 9 | Three-tier cooperative structure as distribution and feedback channel | Strategic Decision | Use when a cooperative or membership trust structure with pre-existing farmer data and relationships is available as the deployment channel |

---

## Section 5

*Omitted. Failure-and-Fix units in Section 3 cover this material.*

---

## Section 6 — Retrieval guide

*"Who is this actually built for — the registered farmer or the woman doing the work?"* → Unit 1

*"We assumed voice would dominate — what actually happened?"* → Unit 2

*"How do we get farmers to start using the system?"* → Unit 3

*"Should we use open-source or proprietary models?"* → Unit 4

*"How do we handle multiple data owners without rebuilding the AI layer every time one changes their data?"* → Unit 5

*"What does the data architecture look like when you have NDDB, state government, unions, and cooperative banks all as separate sources?"* → Unit 5

*"What does meaningful senior ownership look like — is a project sponsor enough?"* → Unit 6

*"How did Amul build this in one month?"* → Unit 7

*"How do we make this permanent rather than a pilot that ends when funding ends?"* → Unit 8

*"We don't have Amul's cooperative structure — can we still use this approach?"* → Unit 9 (see condition tag: does not transfer when trust infrastructure must be built from zero)

*"How do we reach farmers who aren't registered or whose family members are calling on unregistered numbers?"* → Section 2, Gap 1

*"What does it take to move from general knowledge retrieval to personalised per-cow advice?"* → Section 2, Gap 2; Unit 5 (also relevant at Scale)

*"Farmers use the system at what times of day — how should we size infrastructure?"* → Unit 1 (usage peaks align with milking windows, 6–9am and 6–9pm)

*"How do we handle dialect variation within a single state language?"* → Unit 1 (2,000-word glossary built; farmer-contributed feedback loop for new terms); Section 2, Gap 5

*"What's the right channel mix — voice, app, WhatsApp?"* → Unit 2

*"How do cooperative banks integrate with an AI advisory system?"* → Unit 8 (the bank integration is described but the detailed mechanics are in the MD interview; specific replication conditions not fully documented in the source)

---

---

## Source Trace appendix

*Contributor-facing only. Not surfaced in any adopter-facing response.*

| Source file | Covers | Notes |
|---|---|---|
| Ajay Seth (Sarla Ben) - Interview.docx (recorded 8 September 2026) | Section 1 — all identity fields, scale/cost/build effort fields; Units 1, 2, 3, 4, 5, 6, 7, 8, 9 (primary source for all); Section 2 gaps 1, 2, 4 | Primary source. Ajay Seth is identified as the Amul official leading the Sarla Ben implementation; his officer "Sridhar" is named. This is the richest single source for institutional and solution decisions. |
| Interviewees (Farmers & Dairy Producers) (1).docx (recorded, Amul pathway trip Ahmedabad, field interviews) | Unit 1 (farmer persona and use moments); Unit 2 (chat vs voice preference, confirmed from user side); Section 2 gap 1 (unregistered number problem stated by farmer); Unit 9 (three-tier structure as experienced by farmers) | Primary source for Persona dimension. Confirms and adds detail to decisions documented in the Ajay Seth interview. Two farmers interviewed (Session 1 and Session 2). "Bhavesh bhai" is the Amul field guide. |
| Jagadish (EkStep COO) - Interview.docx (recorded 7 September 2026) | Section 2 gap 2 (per-cow yield data as the missing input for personalised advice — this is Jagadish's primary contribution); Unit 4 (open-source model goal, confirmed from EkStep side); Unit 5 (API architecture, confirmed) | Primary source for the forward-looking personalised-advice gap. Confirms decisions already documented in the Ajay Seth interview but adds the specific data-gap framing that does not appear elsewhere. |
| Jayen Mehta (MD) - Interview (1).docx (recorded 9 September 2026) | Section 1 — scale of operations context (36 lakh farmers, $11B turnover, 80-year cooperative history); Unit 6 (MD personal ownership — primary source for MD perspective); Unit 8 (permanent programme and cooperative bank integration — primary source for MD framing); Section 2 gap 4 (long-term staffing/funding model) | Primary source for Institution dimension, MD perspective. Some fields in Section 1 (founding history, global interest) sourced here and not elsewhere. |
| OTTER transcript - meeting with the product team.docx (date not specified in document; content consistent with September 2026 visit) | Unit 3 (suggested questions, landing page — additional detail on 150-question pool, rotation logic); Unit 2 (chat vs voice — team's own surprise confirmed); Unit 9 (MIS by union/village, champion team structure); Section 2 gap 1 (unregistered number / household mapping discussed in meeting); Unit 5 (API architecture, union website integration, nightly re-read) | Primary source for product-team-level implementation detail not in the Ajay Seth interview. Speaker labels are unreliable (Otter auto-assignment); content is treated as the collective Amul product team's account. |
| DESIGNED_ Pursuit of OAN - JB interim - v4.pptx (dated 27 August 2026) | Section 1 — downstream adoptions (MahaVISTAAR, Bihar Krishi, Ethiopia, Kenya, Sri Lanka listed as OAN instances); Unit 5 (OAN architecture layers — confirms API/registry design); Section 1 — scope/does-not-transfer-when (governance template described as what travels, local data/trust as what must be rebuilt) | Primary source for Ecosystem × Scale and for understanding Sarla Ben's place in the broader OAN architecture. Jagadish is the author/presenter. Confirms Unit 5 architectural decisions from an architecture-design perspective rather than an implementation perspective. |
| Photographs (slides photographed during product team meeting, September 2026) | Section 1 — August 2026 metrics (360,871 message turns, 191,037 chat sessions, 78,599 unique users, 96.98% answer rate, 41% returning users, 82.5% Gujarati share, peak day 16,791 turns; usage pattern 6–9am and 6–9pm); demand category breakdown (milk collection/deposit records 31.78%, earnings 13.88%, milk-yield improvement 9.46%, etc.); knowledge collection sources (8 categories listed); implementation plan slide (outbound calls, TVC, Sarla Ben Sakhi, collar belt integration) | Primary source for quantitative Section 1 metrics. These slides were displayed during the product team meeting and photographed; they are the only source for the August 2026 dashboard figures. |
| Adoption Companion conversation (as of 2026-09-17) | YAML frontmatter block (all fields) | Contributor-supplied values for type, title, description, tags, sector, stage, timestamp, and contributor. Not independently verified. |