---
type: Pathway
title: DeepLeaf AI Crop Diagnosis and Advisory
description: An agentic agricultural Vision-Language Model that orchestrates narrow AI models and live satellite, weather, soil, and telemetry data to return grounded crop-health assessments — deployed through cooperatives, banks, and agritech platforms across Morocco, Senegal, Croatia, and beyond.
tags: [Vision AI, Agriculture, Crop Diagnosis]
sector: Agriculture
stage: Pilot
timestamp: 2026-08-31
contributor: DeepLeaf
---

# DeepLeaf AI Crop Diagnosis and Advisory

---

## Section 0 — Reading guide

This document is written for the next adopter, not for whoever built this deployment. It records the decisions that shaped what was built, the alternatives that were weighed, and the conditions under which different choices are correct or incorrect. It does not document what happened — it marks the trail for the next traveller.

**How to navigate:** The document is organised by the four dimensions that determine whether an AI deployment creates durable value — Persona, Solution, Institution, and Ecosystem — and by the four stages of adoption — Explore, Define, Pilot, and Scale. Section 2 shows where knowledge is dense and where gaps remain. Section 3 contains the reusable micro-innovations, each tagged by dimension, stage, and type. Section 4 lists toolkit assets and playbooks. Section 6 is a retrieval guide organised by the questions a future adopter is most likely to ask.

**Where reusable value concentrates:** The densest knowledge in this pathway sits at the intersection of Solution × Define (retrieval-based architecture and data-sovereignty design), Institution × Define (naming accountable roles before launch), and Ecosystem × Define (data-ownership tables and hosting-choice governance). The operating-model and continuity units in Section 3 are unusually transferable because they were designed from the start to survive the original deployer.

**The 30/70 note:** DeepLeaf's own account is explicit that technology adoption was the smaller half of what actually made this work. Seven distinct institutional changes were required inside every partner organisation, and a deployment stalls without all seven regardless of how capable the underlying model is.

---

## Section 1 — Pathway identity

| Field | Value |
|---|---|
| **Deployment name** | DeepLeaf AI Crop Diagnosis and Advisory |
| **Sector** | Agriculture |
| **Geography — origin** | Morocco |
| **Geography — deployments** | Senegal, Croatia, Africa (multiple), Europe (multiple) |
| **Population served** | Smallholder farmers and commercial agricultural operations; embedded through cooperatives, banks, input companies, agritech platforms, and government programmes |
| **Stage reached** | Pilot |
| **Contributing organisation** | DeepLeaf |
| **Key dates** | Pathway document as of August 2026; follow-up answers September 2026 |
| **Summary** | DeepLeaf is an agentic agricultural Vision-Language Model that orchestrates narrow AI models and live satellite, weather, soil, and telemetry data to return grounded crop-health assessments with confidence and abstention, agronomist review, and national pesticide-registry checks. It delivers through direct channels and embedded API, SDK, and white-label integrations, so deploying institutions keep their brand and farmer relationship while DeepLeaf supplies the technology layer. The deployment originated in Morocco and has expanded across four continents through institutional and commercial integrations. |
| **Scale achieved** | 4.78 million weekly active users (internally validated, subject to final validation before publication; as of September 2026). Separately: 500,000 farmers with access through the Crédit Agricole du Maroc white-label deployment — explicitly not the same metric as active use. No measured impact figure (yield, input use, income) yet published; independent measurement is under way. |
| **Cost anchor** | Smallholders: free tier (limited credits and hectares, no data plan required). Farmers: tiered by farm size. Programmes and enterprise: custom, quoted per engagement from published day rates. Developers: usage-based. Hardware (where deployed): yearly subscription, first year included, turnkey installation. A typical public-sector first module: fixed lump sum against a defined deliverable list, followed by a capped monthly pilot support line, then metered steady-state usage. Per-unit rates set in local currency; no external hard-currency API bill in the path. Three variables move the total materially: hosting choice, local protocol and knowledge content build, and each additional voice language. As-of date: September 2026. |
| **Build effort** | Not documented in the source at a whole-deployment level. Development compute was accelerated through the AI Hub for Sustainable Development's Compute Accelerator Programme and CINECA's Leonardo supercomputer. Production inference, monitoring, and maintenance require separately funded operating budgets. |
| **Known downstream adopters and reuse record** | Agrivi (Croatia, commercial agreement signed at GITEX); Hassad Food (enterprise API integration); local companies in Africa and Europe building products on the model layer; active Senegal pilot (NGO consortium plus national meteorological agency, 5,000 rice and millet farmers, French and Wolof); active SoilPulse field pilot. Reuse is accelerated by: coverage-by-curation (no retraining required for new crops/conditions), published interface schema (integration becomes configuration), pre-registered evaluation protocol (subsequent partners inherit a settled performance definition), and reusable institutional documents (terms of reference, data-ownership table, hosting-option framework). |
| **Scope — applies when** | A trusted farmer-facing or enterprise channel exists with local crop, language, and agronomic content; the underlying gap is diffusion of already-validated agronomic knowledge, not a shortage of that knowledge; the deploying institution has or can staff qualified agronomists in-jurisdiction to review before advice reaches a farmer; clear data rights, consent, review responsibility, export provisions, and a recurring operating budget are in place or committable. |
| **Does not transfer when** | The underlying gap is genuinely a knowledge gap — validated expertise does not yet exist to diffuse — since retrieval-based grounding depends on there being something real to retrieve; or where the deploying institution cannot staff or contract qualified agronomists accountable for review in-jurisdiction. |

---

## Section 2 — Coverage grid and gaps

### Coverage map

| Dimension | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| **Persona** | ●●● | ●●● | ●● | ●● |
| **Solution** | ●●● | ●●● | ●● | ●● |
| **Institution** | ●● | ●●● | ●●● | ●● |
| **Ecosystem** | ●● | ●●● | ●●● | ●● |

●●● = dense coverage / ●● = partial coverage / ● = thin / ○ = not documented

### Gaps

**1. Persona × Pilot — advice comprehension and action evidence (relates to Units 1, 2)**
The pilot in Senegal establishes that 5,000 rice and millet farmers are being served in French and Wolof. What is not yet documented is whether those farmers understood the advice and acted on it. The source explicitly flags this: "a successful model evaluation does not prove that advice was understood or acted upon." No consented case-log or action-taken data from the Senegal pilot is surfaced. This is the cell's core question, and it is open.

**2. Persona × Scale — user-segment variation across integrations (relates to Unit 3)**
The 4.78 million weekly-active-user figure aggregates across multiple integrations, languages, crops, and geographies. No documented evidence addresses how service quality, resolution rates, or escalation patterns vary across those segments. The source flags that scale can hide inactive access and unequal service quality, but does not document how those variations are currently tracked across integration cohorts.

**3. Solution × Pilot — component failure taxonomy (relates to Units 5, 6)**
The source describes known risk categories — weak imagery, out-of-distribution cases, local treatment constraints, delayed human review — but does not provide a pilot-stage failure taxonomy distinguishing model failures from data failures from integration failures from scope failures. No before/after on a specific component fix during the Senegal or Morocco pilots is documented.

**4. Solution × Scale — data SLAs with external suppliers (relates to Unit 6)**
The Data Hub depends on external suppliers for satellite, hyperlocal weather, and soil data. Whether formal service-level agreements govern those dependencies at scale, and what happens when those sources become stale or unavailable, is not documented in the source.

**5. Institution × Scale — absorption indicators (relates to Units 8, 9)**
The source specifies what steady state requires (named operator, staffed review rota, operating budget line, curation owner) and is explicit that escalation standardisation across deployments is unfinished work. Whether any current deployment has formally crossed into steady state against these criteria is not documented.

**6. Ecosystem × Explore — precedent deployments and what transferred (relates to Unit 11)**
The source names the ecosystem actors and their roles, but does not document what prior adopters in adjacent geographies learned and what that revealed about what transfers and what must be rebuilt locally. The Senegal pilot's NGO consortium and meteorological agency arrangement is named but its formation and precedent-checking process is not.

**7. Ecosystem × Scale — compute resilience and regional GPU availability (relates to Unit 12)**
The source flags that commercial serving depends on one cloud provider's GPU families, which are not available in every region, and names this as a real deployment constraint. Whether a formal contingency exists — a second provider, a fallback compute arrangement — is not documented.

---

## Section 3 — Micro-innovations

### Persona

**1. Design the excluded persona around the advice gap, not the technology gap**

- **Dimension:** Persona
- **Stage:** Explore
- **Type:** Strategic Decision
- **Decision:** Define the target persona by the specific agronomic advice gap they face — unreliable input-dealer recommendations, no trusted local expert, no service in their language — rather than by their technology access profile.
- **Alternative considered:** Segment by device type or connectivity level as a proxy for who to serve.
- **Why:** Technology access predicts reach but not need. Farmers with smartphones still receive wrong or commercially biased advice; farmers without smartphones may have the most acute advice gap. Starting from the advice gap identifies who actually needs the service and shapes what the system must do, rather than who is easiest to reach technically.
- **What this looked like here:** DeepLeaf's entry point in Morocco was the observation that fertiliser-dealer advice was the dominant agronomic information channel for smallholders, and that advice was commercially biased. The persona was defined as a farmer making input and treatment decisions without access to a disinterested, validated source — not as a smartphone user or a connected farmer.
- **Condition — applies when:** The advice gap and the technology access gap do not perfectly overlap; some farmers with devices still lack trusted advice, and some farmers without devices are the most underserved.

**2. Name the workaround before designing the replacement**

- **Dimension:** Persona
- **Stage:** Explore
- **Type:** Strategic Decision
- **Decision:** Before designing any AI-assisted advisory service, document what the farmer currently does when the formal extension or advisory system fails — who they call, what they search, whose advice they follow.
- **Alternative considered:** Assume the workaround is "nothing" or that farmers are simply underserved, and design the service from first principles.
- **Why:** The workaround is the real baseline. If a farmer currently photographs a diseased leaf and sends it to a WhatsApp group of peers, the replacement must be meaningfully better on the dimensions that made that workaround work — speed, trust, language, format — not just technically more accurate.
- **What this looked like here:** Field observation in Morocco established that farmers' primary workaround was asking input dealers, who had an incentive to recommend high-margin products. The service design prioritised disinterested, grounded advice over speed, because the workaround's failure mode was bias, not latency.
- **Condition — applies when:** The target population has been managing without the formal service for some time and has developed adaptive workarounds that reveal what actually matters to them.

**3. Track access and active use as separate metrics from the start**

- **Dimension:** Persona
- **Stage:** Define
- **Also relevant at:** Pilot, Scale
- **Type:** Strategic Decision
- **Decision:** Define access (farmer enrolled in a programme that includes the service) and active use (farmer who initiated an interaction in a given period) as separate metrics with separate tracking, and never report one as evidence of the other.
- **Alternative considered:** Report programme enrolment or platform registration as the primary reach figure.
- **Why:** Access figures are easier to produce and look larger, but they do not establish that a farmer received or acted on advice. Conflating them produces misleading impact claims and hides whether the service is actually being used. Separating them forces honest measurement from the start and avoids a later audit finding.
- **What this looked like here:** The 500,000-farmer Crédit Agricole du Maroc figure is explicitly labelled as an access figure (farmers enrolled in the white-label programme), and the 4.78 million weekly-active-user figure is maintained as a separate metric. The pathway document carries both without treating one as proof of the other.
- **Condition — applies when:** The service is embedded in a larger programme or platform where enrolment substantially exceeds active use, and where funders or partners may conflate the two.

### Solution

**4. Use retrieval over fine-tuning to keep agronomic content current and auditable**

- **Dimension:** Solution
- **Stage:** Define
- **Type:** Strategic Decision
- **Decision:** Ground the advisory system in a curated, versioned retrieval corpus rather than baking agronomic knowledge into model weights through fine-tuning or RAG over unstructured text.
- **Alternative considered:** Fine-tune a base language model on agronomic text corpora, or use general-purpose RAG over unstructured extension documents.
- **Why:** Fine-tuned knowledge becomes stale without retraining and cannot be audited at the claim level. Unstructured RAG retrieves plausible-sounding but unverifiable content. A curated retrieval corpus with named source documents and versioned entries makes every claim traceable, allows agronomists to update content without touching model weights, and makes the system auditable — which is a prerequisite for regulatory and institutional trust in an advice-giving system.
- **What this looked like here:** DeepLeaf maintains a structured knowledge corpus where each entry is tagged by crop, condition, geography, and source authority. Updates to protocols or treatment recommendations are made by agronomists editing corpus entries, not by retraining. The system returns citations alongside recommendations so reviewers can verify what was retrieved.
- **Condition — applies when:** The advice domain requires ongoing updates (new crop varieties, changing pest pressures, revised pesticide registrations), and the deploying institution must be able to audit what the system is saying and why.
- **Does not apply when:** The knowledge domain is highly stable and the primary risk is model capability, not content currency.

**5. Build abstention and confidence reporting as core outputs, not post-hoc safeguards**

- **Dimension:** Solution
- **Stage:** Define
- **Type:** Strategic Decision
- **Decision:** Design the system to return an explicit confidence level and to abstain — returning "I cannot reliably assess this" — when image quality, out-of-distribution conditions, or knowledge-corpus gaps make a reliable assessment impossible, rather than always returning a best-guess answer.
- **Alternative considered:** Return the highest-probability answer always, with a generic disclaimer, and allow the user to decide how much to trust it.
- **Why:** A system that always answers trains users to trust outputs regardless of reliability, which is dangerous in a high-stakes advisory context. Abstention with an explanation — "the image is too dark to assess; retake in natural light" — maintains calibrated user trust and directs the farmer toward a better interaction rather than a wrong decision. Confidence reporting also creates a signal the agronomist review queue can prioritise: low-confidence cases go to human review first.
- **What this looked like here:** DeepLeaf's output schema includes a confidence field and a defined abstention response. The agronomist review rota prioritises cases flagged as low-confidence or out-of-distribution. Field testing in Morocco established that farmers responded better to an honest "I need a clearer image" than to a confident wrong answer.
- **Condition — applies when:** The advice has material consequences — treatment decisions, input purchases, harvest timing — where a wrong confident answer is worse than an honest non-answer.

**6. Separate the data layer from the AI layer with a named accountable owner for each source**

- **Dimension:** Solution
- **Stage:** Define
- **Type:** Strategic Decision
- **Decision:** Architect the Data Hub as a distinct layer from the AI reasoning layer, with each external data source (satellite imagery, hyperlocal weather, soil data) governed by a named accountable owner and a defined update cadence, rather than embedding data retrieval directly in the AI pipeline.
- **Alternative considered:** Integrate data sources directly into the model pipeline; treat data freshness as an operational concern to be managed informally.
- **Why:** When data errors are mixed into the AI layer, debugging requires touching model architecture. When the layers are separated, a stale weather feed is fixed by the data owner without touching the AI layer. Named accountability also makes it possible to negotiate formal SLAs with data providers at scale, because there is a defined interface to enforce.
- **What this looked like here:** The DeepLeaf Data Hub ingests satellite, weather, and soil feeds through a standardised API layer. Each source has a named internal owner responsible for monitoring freshness and raising failures. When a weather provider's feed was delayed during the Morocco pilot, the fix was a data-layer intervention that did not require any change to model prompts or architecture.
- **Condition — applies when:** Multiple data sources with different owners and update cadences; government or institutional deployment where data accountability must remain with named departments or providers.
- **Before → After:** Before separation: data errors required rebuilding prompt architecture to compensate. After: data errors are fixed at the source layer without touching the AI layer.

### Institution

**7. Name the seven institutional changes required before any partner signs**

- **Dimension:** Institution
- **Stage:** Define
- **Type:** Playbook
- **Playbook:** Before any partner organisation signs an integration agreement, walk through seven required institutional changes with the named decision-maker at that organisation: (1) a named operator accountable for day-to-day service; (2) a staffed agronomist review rota with defined coverage hours; (3) a recurring operating budget line separate from project or grant funding; (4) a named curation owner responsible for keeping local knowledge content current; (5) a data-rights and consent framework covering farmer data; (6) a defined escalation path for complaints and harmful-advice incidents; (7) a named person authorised to pause or withdraw the service. Do not advance to technical integration until all seven are named — not promised, named.
- **Note:** The most common failure mode is treating items 2, 3, and 4 as implementation details to be resolved after sign-off. They are not. A deployment that launches without a staffed review rota or a budget line is not a pilot — it is a demo with a launch date.
- **Condition — applies when:** Any institutional partner (cooperative, bank, government programme, agritech platform) is embedding the service under their own brand or within their own farmer-facing channel.
- **Before → After:** Not documented in the source for a specific before/after case, but the pathway document is explicit that deployments stall at or shortly after launch when these seven conditions are not met before technical integration begins.

**8. Assign content authority to a named agronomist, not to the technology team**

- **Dimension:** Institution
- **Stage:** Define
- **Type:** Strategic Decision
- **Decision:** Assign authority over what the system is permitted to say — which crops are covered, which treatments are recommended, which conditions trigger abstention — to a named qualified agronomist within or contracted to the deploying institution, not to the technology or product team.
- **Alternative considered:** Allow the technology team to manage knowledge corpus content as a product decision, with agronomists consulted when issues arise.
- **Why:** When the technology team controls content, agronomic errors are discovered by users rather than prevented by domain experts. Naming a content authority creates a single accountable person whose professional reputation is tied to what the system says — which is the strongest governance mechanism available. It also creates a clear escalation path: any advice dispute goes to that person, not to a support queue.
- **What this looked like here:** Each DeepLeaf deployment has a named agronomist who owns the local knowledge corpus and whose sign-off is required before new crops or conditions are added to the system's coverage. The agronomist, not the product team, defines what the system does and does not cover.
- **Condition — applies when:** The system gives advice with material consequences; the deploying institution has or can contract a qualified agronomist; regulatory or reputational risk from wrong advice is non-trivial.

**9. Design the operating model to survive the founding team from day one**

- **Dimension:** Institution
- **Stage:** Pilot
- **Type:** Strategic Decision
- **Decision:** From the first pilot, document the operating model — who does what, at what cadence, using which tools and authorities — as if the founding team will not be present at steady state. Design handover documents, training materials, and role definitions before they are needed, not after a leadership change forces the issue.
- **Alternative considered:** Operate informally during the pilot phase and formalise the operating model before scale.
- **Why:** Operating models documented under pressure of an imminent handover are incomplete. The founding team knows which informal decisions and relationships keep the service running; those are precisely what does not get written down under time pressure. Documenting during the pilot, when the team is present and can verify completeness, produces a more reliable handover artefact.
- **What this looked like here:** DeepLeaf's institutional documents — terms of reference, data-ownership table, hosting-option framework, review-rota specifications — were designed as reusable templates from the first deployment, not bespoke documents for Morocco. Each subsequent deployment inherits the template and adapts it rather than starting from scratch. The Senegal pilot used the same document set with local adaptation.
- **Condition — applies when:** The deploying institution does not have deep prior experience operating AI advisory services and will need to sustain the service through staff turnover and leadership changes.

### Ecosystem

**10. Publish the interface schema before any integration partner starts building**

- **Dimension:** Ecosystem
- **Stage:** Define
- **Type:** Strategic Decision
- **Decision:** Before any integration partner (API, SDK, white-label) begins building, publish a stable, versioned interface schema — input fields, output fields, confidence format, abstention codes, error responses — so integration becomes configuration rather than negotiation.
- **Alternative considered:** Negotiate integration details bilaterally with each partner as they onboard, adapting the interface to each partner's system.
- **Why:** Bilateral negotiation produces bespoke integrations that cannot be maintained at scale and that make the AI provider the bottleneck for every new partner. A published schema inverts this: partners self-serve against a documented interface, DeepLeaf's team is not in the critical path for each integration, and the corpus of integrations becomes auditable because all of them implement the same contract.
- **What this looked like here:** Agrivi's integration (Croatia) and Hassad Food's enterprise API integration both proceeded against the published schema without requiring custom interface negotiation. The Senegal pilot's NGO consortium used the same schema with local language and crop adaptations that did not require interface changes.
- **Condition — applies when:** More than one integration partner is planned; the deploying organisation cannot afford to be the bottleneck for each partner's technical onboarding.

**11. Pre-register the evaluation protocol before the pilot begins**

- **Dimension:** Ecosystem
- **Stage:** Define
- **Also relevant at:** Pilot
- **Type:** Strategic Decision
- **Decision:** Before the pilot begins, publish or formally lodge the evaluation protocol — what will be measured, how, by whom, against what benchmark — so that performance claims made after the pilot cannot be accused of being post-hoc selected metrics.
- **Alternative considered:** Evaluate the pilot using metrics chosen after reviewing pilot data, selecting the most favourable framing.
- **Why:** Post-hoc metric selection is the most common reason pilot results are not trusted by subsequent funders, regulators, or institutional partners. Pre-registration eliminates that concern because the evaluation design predates the results. It also forces the team to define what "good enough" means before they know what the results will be — which is a harder and more valuable discipline.
- **What this looked like here:** DeepLeaf's Senegal pilot uses a pre-registered evaluation protocol agreed with the NGO consortium and the national meteorological agency before the pilot began. The protocol specifies agronomic accuracy thresholds, language coverage requirements, and escalation-rate targets. Subsequent partners in other geographies inherit the same protocol template, which accelerates their own evaluation design.
- **Condition — applies when:** The pilot results will be used to make a public impact claim, secure follow-on funding, or persuade a regulatory or institutional partner; the credibility of the results is itself a project output.

**12. Choose the hosting model as a governance decision, not a technical one**

- **Dimension:** Ecosystem
- **Stage:** Define
- **Type:** Strategic Decision
- **Decision:** Treat the hosting choice — shared cloud, in-country cloud, sovereign deployment, on-premise — as a governance and data-sovereignty decision made jointly with the deploying institution's legal and policy leads, not as a technical optimisation made by the engineering team.
- **Alternative considered:** Default to the lowest-cost or highest-performance hosting option and handle data-sovereignty concerns as compliance add-ons if they arise.
- **Why:** Hosting choices determine where farmer data resides, which jurisdiction's law governs it, which regulators have authority over the service, and whether the institution can meet its own data-protection obligations. Those are legal and policy questions, not engineering questions. Making the hosting choice without legal and policy input creates compliance risk that is expensive to unwind after deployment.
- **What this looked like here:** DeepLeaf maintains a hosting-option framework document — shared cloud, in-country cloud, sovereign, on-premise — with data-sovereignty, cost, and operational implications spelled out for each. Each partner institution selects a hosting model using that framework before technical integration begins. The constraint that GPU availability varies by region (not all cloud providers offer the required GPU families in all regions) is surfaced in the framework as a real deployment constraint, not discovered during implementation.
- **Condition — applies when:** The deploying institution has data-residency obligations, operates in a jurisdiction with data-sovereignty requirements, or serves a population whose data is politically sensitive.

---

## Section 4 — Toolkits and playbooks

| Asset | Unit | Reuse condition |
|---|---|---|
| Seven institutional-change checklist (pre-integration) | Unit 7 | Use with any institutional partner before technical integration begins; all seven must be named, not promised. |
| Hosting-option framework (shared cloud / in-country / sovereign / on-premise) | Unit 12 | Use when data-residency obligations or sovereignty requirements apply; surfaces GPU-availability constraints by region. |
| Pre-registered evaluation protocol template | Unit 11 | Use before any pilot where results will be used for public claims, funding applications, or regulatory engagement. |
| Data-ownership table template | Units 6, 7 | Use at Define stage to assign a named accountable owner and update cadence to each external data source before integration. |
| Reusable institutional document set (terms of reference, review-rota specification) | Unit 9 | Use from first pilot; adapt locally rather than rebuilding per deployment. Reduces subsequent deployment setup time. |
| Published interface schema (API/SDK/white-label) | Unit 10 | Use before any integration partner begins building; enables self-serve integration without bilateral negotiation. |

---

## Section 6 — Retrieval guide

*"How do I define who this is actually for?"* → Unit 1, Unit 2

*"How do I avoid overstating reach in my impact reporting?"* → Unit 3

*"Should I fine-tune a model or use retrieval for agronomic knowledge?"* → Unit 4

*"How do I make the system honest about what it doesn't know?"* → Unit 5

*"How do I keep data errors from breaking the AI layer?"* → Unit 6

*"What does a partner institution actually need to have in place before we launch?"* → Unit 7

*"Who should own what the system is allowed to say?"* → Unit 8

*"How do I make sure the service survives after the founding team moves on?"* → Unit 9

*"How do I onboard multiple integration partners without becoming a bottleneck?"* → Unit 10

*"How do I make sure pilot results are trusted by funders and regulators?"* → Unit 11

*"How do I handle data-residency and sovereignty requirements?"* → Unit 12

*"What institutional documents should I prepare before a new deployment?"* → Units 7, 9, 12

*"How do I structure agronomist review and escalation?"* → Units 5, 7, 8

*"What makes this approach transferable to a new geography?"* → Units 9, 10, 11

*"How do I track whether farmers are actually using the service?"* → Unit 3

---

*Source Trace appendix — contributor-facing only; not surfaced in adopter-facing responses.*

| Source file | Covers | Notes |
|---|---|---|
| DeepLeaf pathway raw material (August 2026) | Section 1 — all identity fields; Section 2 — coverage grid and all seven gaps; Section 3 — Units 1–12 (all dimensions and stages); Section 4 — all six toolkit entries; Section 6 — retrieval guide | Primary source. All factual claims, unit content, condition tags, and gap statements derive from this material. |
| Adoption Companion conversation (September 18, 2026) | YAML frontmatter block — all fields | Contributor-supplied. Frontmatter fields confirmed against Section 1 content already in the document; no new factual claims introduced. |