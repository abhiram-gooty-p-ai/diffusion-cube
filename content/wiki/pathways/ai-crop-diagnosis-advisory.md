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