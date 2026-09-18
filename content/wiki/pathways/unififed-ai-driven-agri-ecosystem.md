---
title: Bharat Vistaar
description: A Ministry of Agriculture-backed pan-India AI advisory platform that federates the OAN governance template across states and institutions to deliver voice-first agricultural advisory to 140M+ smallholder farmers.
stage: Scale
sector: Agriculture
location: New Delhi, India (Pan-India deployment)
tags: [Voice AI, Smallholder Farmers, Digital Public Infrastructure, Multilingual Advisory]
---

# Bharat Vistaar

## Section 0 — Reading guide

This pathway documents a national-scale AI advisory deployment for smallholder farmers in India. Its primary value for the next adopter is not the product itself — the helpline, the app, the chatbot — but the governance architecture that makes federated AI advisory sustainable across institutions with different data owners, different mandates, and different languages.

The densest knowledge in this pathway sits at **Define** and **Scale** — the architecture decisions and the federation model. **Pilot** is the thinnest stage: what broke with real users before national rollout, and how the institution responded, is not documented here. A new adopter building toward Scale should treat the Pilot gap as an active risk, not a resolved one.

**How to navigate:**
- If you are deciding whether to build this at all → Section 3, Persona and Institution units at Explore
- If you are choosing an architecture or data partner model → Section 3, Solution and Ecosystem units at Define
- If you are federating across states or geographies → Section 3, Ecosystem units at Scale
- If you are asking what the next adopter can lift directly → Section 4 (Toolkits) and Section 6 (Retrieval guide)

---

## Section 1 — Pathway identity

| Field | Detail |
|---|---|
| **Deployment name** | Bharat VISTAAR (Virtually Integrated System to Access Agricultural Resources) |
| **Sector** | Agriculture |
| **Geography** | Pan-India; Phase 1 across Maharashtra, Bihar, Gujarat and Hindi/English-speaking states |
| **Population served** | 140M+ smallholder farmers; rural, low-income, digitally underserved; feature-phone users; low-literacy populations |
| **Stage reached** | Scale |
| **Contributing organisation** | COSS (Centre for Open Societal Systems) — a joint initiative of EkStep Foundation and IIIT Bangalore |
| **Key dates** | February 2026 — Phase 1 launch; mid-2026 — ~10M queries answered |
| **Summary** | Bharat VISTAAR is a Ministry of Agriculture-backed, pan-India AI advisory platform accessible via toll-free helpline (155261), mobile app, and web portal in Hindi and English, with 11 languages planned. Built on the OAN 7-layer architecture with ICAR, IMD, AgriStack, and mandi price systems as named federated data sources, it is the national instance of the same governance template proven at state level in MahaVISTAAR and Amul AI. |
| **Scale achieved** | ~10M queries answered; 378K+ farmers reached (as of mid-2026). MahaVISTAAR (state-level predecessor): ~3M queries, 646K+ farmers in 14 months. Amul AI (cooperative network): ~1.4M queries, 230K+ farmers in 6 months. |
| **Cost anchor** | ₹2,800+ crore allocated for India's Digital Agriculture Mission (2024–26) — the budget envelope within which this deployment sits. Per-interaction cost not documented in the source. |
| **Build effort** | Not documented in the source for Bharat Vistaar specifically. Predecessor instances compressed from 9 months (MahaVISTAAR, built from scratch) to 3 months (Ethiopia) to 3 weeks (Amul AI) as the governance template matured. |
| **Known downstream adopters** | Ethiopia (national agri and livestock AI advisory), Kenya (agri and livestock network with Strathmore University), Sri Lanka (enterprise solutions provider using same governance template). All four run the same OAN governance template, localised at each stop. |
| **Scope / does not transfer when** | The OAN architecture and governance template transfer; localised agricultural knowledge bases, language models, and integration with country-specific agronomy and extension systems must be rebuilt at each deployment. The template fails when no research institution equivalent to ICAR exists to ground advisory in verified agronomic knowledge, or when no national farmer identity registry equivalent to AgriStack is available to provide farmer context to AI agents. |

---

## Section 2 — Coverage grid and gaps

| Dimension | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| **Persona** | ●● | ● | ○ | ● |
| **Solution** | ●● | ●● | ○ | ●● |
| **Institution** | ●● | ●● | ○ | ○ |
| **Ecosystem** | ○ | ●● | ○ | ●● |

**Density key:** ●●● rich · ●● good · ● present · ○ absent

**Gaps — active questions this pathway does not answer:**

1. **Pilot × All dimensions — what broke with real users before national rollout?** The source documents move directly from architecture design to Scale-stage metrics. No failure taxonomy, no documented data quality incident, no account of how the institution responded to the first public error. Any adopter preparing for their own pilot should treat this as an open question. *(Relates to the absence of any Pilot-stage unit)*

2. **Institution × Scale — who owns this operationally without the founding team?** The source names COSS and the Ministry of Agriculture as contributors and mandate holders, but does not document a named operational owner, a standing review cadence, or a permanent budget line separate from the Digital Agriculture Mission envelope. Whether the service has been absorbed institutionally — or remains a project — is not established. *(Relates to Units 5, 6)*

3. **Persona × Pilot — which user interactions failed, and why?** The source does not distinguish scope failures (questions outside the system's mandate) from quality failures (mandate questions answered badly). At ~10M queries, some failure modes will have emerged; they are not documented here. *(Relates to the absence of any Pilot-stage unit)*

4. **Ecosystem × Explore — who else tried to solve this for this population, and what happened?** The pathway documents OAN's own lineage (MahaVISTAAR → Bharat Vistaar) but does not assess prior attempts by others to provide national-scale agricultural advisory AI in India, or what those attempts revealed about the barriers. *(Relates to grid cell Ecosystem × Explore)*

5. **Solution × Scale — which data sources are breaking under national load, and do formal SLAs exist?** The source names ICAR, IMD, AgriStack, and mandi price systems as federated data sources but does not document whether formal SLAs govern their update cadence, who is accountable when a source goes stale, or which source has caused the most quality problems at scale. *(Relates to Unit 4)*

---

## Section 3 — Micro-innovations

### Persona

**1. Voice-first, feature-phone-first design as the non-negotiable inclusion constraint**

- **Dimension:** Persona
- **Stage:** Explore
- **Also relevant at:** Define, Scale
- **Type:** Strategic Decision

- **Decision:** Design the primary interface around the phone call — not the smartphone app — so that the system is accessible to farmers without data connections, strong digital literacy, or reading ability.
- **Alternative considered:** App-first design with voice as an add-on channel.
- **Why:** 140M+ smallholder farmers include a large proportion relying on feature phones. An app-first design would replicate the exclusion already present in existing agricultural portals and extension services. The workaround farmers use today — calling an agrodealer, a relative, or an extension officer — is itself a voice interaction, making voice AI a direct improvement on the existing channel rather than a new behaviour to learn.
- **What this looked like here:** The toll-free helpline 155261 was launched as the primary access point. The app and web portal (with chatbot "Bharti") are secondary channels. Phase 1 design prioritised Hindi and English, with 11 languages planned to follow.
- **Condition — applies when:** Target population includes significant proportion of feature-phone users, low-literacy users, or users for whom smartphone data costs are prohibitive.

---

**2. Scope defined by the farmer's actual decision cycle, not by departmental boundaries**

- **Dimension:** Persona
- **Stage:** Define
- **Type:** Strategic Decision

- **Decision:** Scope the advisory system around the full range of decisions a smallholder farmer actually faces — crop guidance, weather, pest and disease, market prices, scheme eligibility — rather than limiting scope to a single department's remit.
- **Alternative considered:** Single-department scope (e.g., crop advisory only from ICAR) to simplify governance and data integration.
- **Why:** Farmers do not experience their decisions as departmentally siloed. A farmer asking about pest control also needs to know whether a government scheme covers the recommended input. Artificial scope limits would reproduce the fragmentation the system exists to solve, and would push farmers back to the informal networks (agrodealers, relatives) they currently rely on.
- **What this looked like here:** The platform integrates crop advisory, weather (IMD), mandi prices, soil health, and government schemes (including PM Fasal Bima Yojana) into a single interface. The OAN architecture routes each query to the appropriate data provider via the AI agent layer.
- **Condition — applies when:** Target population faces decisions that cut across multiple institutional data owners. Requires a governance model that can hold multiple data relationships simultaneously — a single-institution deployment cannot execute this scope.

---

### Solution

**3. OAN 7-layer open architecture as the non-reversible foundation choice**

- **Dimension:** Solution
- **Stage:** Define
- **Also relevant at:** Scale
- **Type:** Strategic Decision

- **Decision:** Build on the Open AgriNet (OAN) 7-layer architecture — user interface, language AI, AI module (moderation + intent + reasoning), registries, open network (Beckn), provider services, and data/ingestion pipeline — as open-source, modular, and federated, rather than a closed platform owned by any single organisation.
- **Alternative considered:** A centralised platform architecture in which one institution owns the stack and others plug in as data suppliers.
- **Why:** A centralised platform creates a single point of control, a single point of failure, and a governance problem: which institution owns what the system says? The open network model means each provider institution registers independently and is discovered by class — no re-onboarding required when a new provider joins, no shared directory, no neutral third party required. This is the structural argument for building as an open network rather than a platform. It is also the hardest decision to reverse: switching to a centralised model after federated deployment would require renegotiating every provider relationship.
- **What this looked like here:** The AI Module — moderation, intent classification, and multi-step reasoning — runs as a single module. Provider services (ICAR, IMD, mandi data, scheme databases) register on the network independently. A peer-network capability allows a farmer querying on one network to be answered by a provider on another, with no re-onboarding on either side.
- **Condition — applies when:** Multiple data owners with different update cadences, different accountability structures, and different institutional mandates. Fails when a single institution controls all required data and can maintain it — in that case, the open network overhead is unnecessary complexity.

---

**4. Federated data ownership: AI layer retrieves but does not own institutional data**

- **Dimension:** Solution
- **Stage:** Define
- **Also relevant at:** Scale
- **Type:** Failure and Fix

- **Failure:** When AI systems are built with the knowledge base embedded in the model or hardwired to a single backend, a data source change — a new crop advisory from ICAR, a revised scheme eligibility rule — requires rebuilding the AI layer rather than updating the source.
- **Fix:** The OAN architecture separates the AI layer from the data layer via a standardised ingestion pipeline and vector index. Each provider institution owns its data; the AI retrieves from the index but does not own it. Scope, validity dates, and version are set at write time by the data owner.
- **Insight:** At national scale with 5+ institutional data owners, this separation is the difference between a maintainable system and a fragile one. Data errors are fixed by the data owner without touching the AI layer. Accountability for accuracy stays with the institution that produced the knowledge.
- **Condition — applies when:** Multiple data sources with different owners, update cadences, and institutional accountability chains. Government deployments where data accuracy is a public accountability question, not just a quality metric.

---

### Institution

**5. Government mandate as the irreplaceable precondition — not a procurement relationship**

- **Dimension:** Institution
- **Stage:** Explore
- **Also relevant at:** Define
- **Type:** Strategic Decision

- **Decision:** Position the deployment explicitly within the Ministry of Agriculture's Digital Agriculture Mission, with ministerial launch and government mandate, rather than as a technology vendor's product adopted by government.
- **Alternative considered:** Civil society or private sector-led deployment, with government as a data partner or funder rather than the accountable institution.
- **Why:** For a system that answers questions farmers use to make consequential decisions — what to plant, when to sell, which scheme to apply for — institutional accountability is not separable from user trust. A farmer who receives wrong advice needs to know who stands behind the answer. A civil society-led system can build the technology; it cannot provide the public authority that makes the answer trustworthy. The government mandate also unlocks data access (ICAR, IMD, AgriStack) that would be difficult to negotiate without it.
- **What this looked like here:** Bharat VISTAAR was launched by the Union Minister for Agriculture in Jaipur. The toll-free number 155261 is a government helpline. COSS (EkStep/IIIT Bangalore) built and governs the OAN architecture; the Ministry of Agriculture owns the mandate and the public-facing service.
- **Condition — applies when:** The advisory system covers decisions with material consequences for users (income, crop loss, scheme access). Fails when government is a passive funder — the mandate must be active, with a named ministerial owner who has publicly committed to the service.

---

**6. Reusing the governance template across instances, not just the code**

- **Dimension:** Institution
- **Stage:** Scale
- **Type:** Strategic Decision

- **Decision:** When federating the system across states, cooperatives, and countries, transfer the governance template — institutional ownership structure, data accountability model, content authority assignment — not just the open-source codebase.
- **Alternative considered:** Providing the codebase and architecture documentation, and letting each new instance design its own governance.
- **Why:** The OAN slides make the distinction explicit: "What travels each time is the same governance, the same institutional ownership, the same template — made local at every stop." A new instance that builds on the code but not the governance template will face the same institutional questions (who owns what the system says? who corrects a wrong answer?) without the answers already worked out. The template does not eliminate local adaptation — it provides the structure within which local adaptation happens safely.
- **What this looked like here:** MahaVISTAAR (Maharashtra), Amul AI (dairy cooperative), Bihar Krishi, Ethiopia, Kenya, and Sri Lanka all run on the same OAN governance template. Each required localised knowledge bases and language models. None required redesigning the accountability structure.
- **Condition — applies when:** Federating across geographically or institutionally distinct deployments. Does not apply when a single institution controls the full deployment — in that case, the template overhead is unnecessary.

---

### Ecosystem

**7. 30+ named partner roles resolved before model work begins**

- **Dimension:** Ecosystem
- **Stage:** Define
- **Type:** Strategic Decision

- **Decision:** Map all required ecosystem roles — technology, domain, data, language, delivery, financing, research — and assign a named organisation to each before architecture work begins.
- **Alternative considered:** Begin building with core partners named, and resolve remaining roles as needed during development.
- **Why:** In a federated AI advisory system, unnamed dependencies are unmanaged risks. A language model gap discovered mid-build requires either a delay or a compromise. A data partnership that isn't formalised before deployment becomes an informal agreement that breaks under operational pressure. The OAN slide deck names 30+ organisations across solution and shared capabilities, provider institutions, community and ecosystem, and sponsor/owner roles — all resolved before the national instance launched.
- **What this looked like here:** Named partners include COSS, EkStep, AI4Bharat, Bhashini, Vassar Labs, IISc, IIT Bombay, Samagra, VoiceEra, India AI Mission, Karya, Artha Global, and multiple telephony providers on the solution side; ICAR, agricultural universities, market data institutions, Maharashtra livestock and fisheries departments on the provider side; Gates Foundation, World Bank, UNDP on the community/ecosystem side.
- **Condition — applies when:** Any deployment requiring more than 5 distinct external partners or data sources. A single unnamed role in a chain of 30 is enough to stall a launch.

---

**8. Federal-by-design federation: states and institutions plug in side by side, not stacked**

- **Dimension:** Ecosystem
- **Stage:** Scale
- **Type:** Strategic Decision

- **Decision:** Design the national instance so that states and institutions join as peers on a shared network, rather than as subordinate nodes reporting to a central platform.
- **Alternative considered:** A hub-and-spoke model in which Bharat Vistaar is the central platform and state instances are sub-deployments that inherit configuration from the centre.
- **Why:** A hub-and-spoke model concentrates governance decisions at the centre and creates dependency on central availability and policy choices. The peer model — each instance running its own network registry with two-way contracts — means a state can update its knowledge base, add a language, or change a data provider without requiring central approval or central rebuild. It also means a farmer querying on the national network can be answered by a provider registered on a state network, with no re-onboarding on either side.
- **What this looked like here:** The OAN diagram shows Bharat Vistaar, MahaVISTAAR, Amul AI, and Bihar Krishi as co-equal instances on the same architecture — "side by side, not stacked above it." The same peer-network model extends to Ethiopia, Kenya, and Sri Lanka.
- **Condition — applies when:** Multiple institutionally distinct deployments need to share data and services without centralising governance. Fails when regulatory or data sovereignty requirements mandate a single point of control.

---

## Section 4 — Toolkits and playbooks

| # | Asset | Type | One-line reuse condition |
|---|---|---|---|
| 3 | OAN 7-layer open architecture | Toolkit Asset | Use when deploying AI advisory across multiple institutional data owners; requires open-source stack and Beckn-compatible open network layer |
| 4 | Federated data ingestion pipeline (parse → OCR → chunk → embed → scope/version) | Toolkit Asset | Use when multiple external data sources with different owners and update cadences must feed a single AI layer without embedding knowledge in the model |
| 7 | 30+ partner role map (solution, provider, ecosystem, sponsor) | Toolkit Asset | Use at Define stage to verify all ecosystem dependencies are named before architecture work begins |
| 6 | Governance template for multi-instance federation | Toolkit Asset | Use when replicating the deployment across states or countries; the template must travel with the code, not be redesigned locally |

---

## Section 6 — Retrieval guide

*"Who is this platform actually built for, and how do they access it?"* → Unit 1, Unit 2

*"Why voice and not an app?"* → Unit 1

*"How do we avoid building a system that locks us into one vendor or one data provider?"* → Unit 3, Unit 4

*"Which architecture decisions will be hardest to reverse?"* → Unit 3

*"Who owns what the system says when it gives wrong advice?"* → Unit 4, Unit 5

*"How do we get government to take ownership, not just fund this?"* → Unit 5

*"We want to expand to other states — how do we federate without losing governance?"* → Unit 6, Unit 8

*"How many partners do we need, and when do we need to name them?"* → Unit 7

*"What travels when this model is adopted in another country?"* → Unit 6, Unit 8, Section 1 (Scope/does-not-transfer-when)

*"What broke with real users before national rollout?"* → Not documented in the source; see Section 2 Gap 1

*"Who operates this day to day once the founding team steps back?"* → Not documented in the source; see Section 2 Gap 2

*"Which data sources are going stale and who is accountable?"* → Unit 4; see Section 2 Gap 5

*"How quickly can a new country instance be stood up?"* → Section 1 (Build effort); Unit 6, Unit 8

---

---

## Source Trace appendix

*Contributor-facing only — not surfaced in any adopter-facing response.*

| Source file | Covers | Notes |
|---|---|---|
| DESIGNED_ Pursuit of OAN - JB interim - v4.pptx (contributed September 18, 2026) | Section 1 — all architecture, partner, and federation fields; Units 3, 4, 6, 7, 8 in full; Unit 2 (scope design rationale); Section 4 toolkit entries for Units 3, 4, 6, 7 | Primary source. Most detailed account of OAN architecture, partner ecosystem, and federal-by-design federation model. Scale metrics for all three flagship deployments (Bharat Vistaar, MahaVISTAAR, Amul AI) drawn from Slide 9. |
| Bharat Vistaar RFI Form (1).docx (contributed September 18, 2026) | Section 1 — problem statement, target population, geographic scope, cost anchor (Digital Agriculture Mission budget), key partnerships, replicability notes; Unit 1 (voice-first design rationale); Unit 5 (government mandate framing) | Primary source for population-level framing and formal impact metrics. Build effort compression (9 months → 3 weeks) confirmed here. Cost-per-interaction data absent from this source. |
| BharatVistaar_Summary.docx (contributed September 18, 2026) | Section 1 — access channels (155261, app, web, "Bharti" chatbot), launch details (minister, location, date), integrated systems list, Phase 1 language scope | Compiled from public sources (government announcements, news coverage, app listing) — not a direct scrape of vistaar.da.gov.in. Confirms RFI form and OAN deck; adds channel-level detail and launch context. Does not add new units. |
| Adoption Companion conversation (September 18, 2026) | Section 1 — stage confirmed as Scale by contributor; grid density assessments | Contributor's own account. Stage and grid density reflect contributor's characterisation, not independently verified. |

