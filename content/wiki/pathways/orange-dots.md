---
title: Orange Dots — Open Tourism Discovery Network
description: Open digital rails that make local tourism operators, experiences, and opportunities discoverable across multiple applications — serving both tourists seeking contextual local experiences and operators seeking emerging demand.
stage: Define
sector: Tourism
location: India
tags: [Open Infrastructure, Two-Sided Discovery, Voice AI, Community Tourism]
---

## Section 0 — Reading guide

This document is written for the next adopter — someone considering whether and how to build open discovery infrastructure for tourism. It is not a case study of what happened. It is a marked trail: the decisions that shaped what is being built, the conditions under which those decisions hold, and the questions that remain open.

**How to navigate:**
- **Section 1** names the deployment and its current scope.
- **Section 2** shows where reusable knowledge is dense and where gaps remain.
- **Section 3** contains the micro-innovations — the reusable decisions and structural insights.
- **Section 4** lists toolkit assets available for direct reuse.
- **Section 6** maps realistic adopter questions to specific units.

**Where reusable value concentrates:** The densest knowledge in this pathway is at Explore stage — the problem framing, the two-sided market architecture, the AI positioning, and the ecosystem actor structure. Define stage is where this deployment currently sits; the pathway reflects that honestly, with open questions named in Section 2. Pilot and Scale cells are empty: this pathway will become substantially more useful to the next adopter once those stages generate evidence.

**30/70 note:** The Explore-stage thinking here is well-developed. The larger work — named institutional owners, committed local network operators, a data source registry, a fixed pilot use case — remains ahead.

---

## Section 1 — Pathway identity

| Field | Detail |
|---|---|
| **Deployment name** | Orange Dots — Open Tourism Discovery Network |
| **Sector** | Tourism |
| **Geography** | India (pilot destinations not yet confirmed) |
| **Population served** | Domestic and international tourists seeking contextual local experiences; small and community-based tourism operators, guides, homestays, artisans, and entrepreneurs who are capable but digitally invisible to demand that already exists for what they offer |
| **Stage reached** | Define |
| **Contributing organisation** | EkStep |
| **Key dates** | Concept note as of September 2026 |
| **2-sentence summary** | Orange Dots proposes open digital rails for tourism discovery — making local operators, experiences, and opportunities discoverable across multiple applications rather than through any single platform. It operates a two-sided network: tourists discover operators, and operators discover emerging demand. |
| **Scale / impact achieved** | Pilot target: 500–1,000 tourism providers and experiences made discoverable across 2–3 destinations with different characteristics (heritage, nature/adventure, rural/community). No live deployment outcomes documented yet. As of September 2026. |
| **Cost anchor** | Not documented in the source |
| **Build effort** | Initial build took 5 months |
| **Known downstream adopters** | Not documented in the source |
| **Scope / does not transfer when** | The open-rails architecture transfers when the goal is discoverability across multiple applications rather than owning a single platform. Does not transfer when the adopter needs a transactional marketplace — Orange Dots deliberately excludes booking, payment, and customer relationship management from its scope. |

---

## Section 2 — Coverage grid and gaps

| | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| **Persona** | ●● | ○ | ○ | ○ |
| **Solution** | ●●● | ○ | ○ | ○ |
| **Institution** | ● | ○ | ○ | ○ |
| **Ecosystem** | ●● | ○ | ○ | ○ |

●●● = three or more units · ●● = two units · ● = one unit · ○ = no units

**Open questions — gaps that matter now, at Define stage:**

1. **Institution/Define — no named mandate holder or governance body.** The concept note describes a neutral governance institution responsible for interoperability specifications, credential frameworks, and protocol evolution. No named organisation or individual has agreed to fulfil this role. Without a named mandate holder, the governance layer remains a design principle rather than a commitment. *(Relates to Units 6, 7)*

2. **Institution/Define — no named pilot champion.** No individual inside a specific state tourism department, ministry, or platform has been documented as personally committed to running the pilot. A named champion with a professional stake in success is a prerequisite for the pilot proceeding. *(Relates to Unit 6)*

3. **Persona/Define — minimum viable use case not fixed.** The concept note illustrates the discovery problem with multiple examples across heritage, food, nature, and community tourism. The single critical use case the pilot must answer — whose failure would mean the pilot has failed — has not yet been defined. This decision shapes the data model, trust requirements, and what the AI translation layer must resolve. *(Relates to Units 1, 2, 4)*

4. **Solution/Define — data source registry absent.** The architecture requires live provider profiles, credential registries from multiple issuing bodies, and opportunity signals from tourism departments. No specific data owners, update cadences, or accountable individuals have been named. For a network whose value depends on trusted, current information, unnamed data dependencies are unmanaged risk. *(Relates to Units 4, 5)*

5. **Ecosystem/Define — local network operator roles unassigned.** Local tourism networks are described as essential intermediaries for onboarding small providers. No specific organisations — state tourism departments, destination management organisations, guide associations, or cooperatives — have been documented as having agreed to play this role in the pilot destinations. *(Relates to Unit 8)*

---

## Section 3 — Micro-innovations

### Persona

**1. Frame the excluded user as capable-but-invisible, not merely underserved**

- `Dimension: Persona`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** Define the primary excluded user as someone who possesses genuine tourism capability but cannot be discovered by demand that already exists for what they offer. The exclusion is a discoverability failure, not a capability failure.
- **Alternative considered:** Frame the problem as small operators needing to be brought up to a standard before they can participate in tourism markets, leading to training-and-certification programmes as the primary intervention.
- **Why:** A capability-gap framing leads to interventions that take years and still leave providers invisible at the end. A discoverability-gap framing leads to infrastructure that makes existing capability visible — faster, more scalable, and directly connected to the market failure being addressed.
- **What this looked like here:** The target population includes licensed guides, informal local guides, homestays, craft collectives, cultural performers, and community organisations — many of whom are already delivering experiences, but only to walk-in customers, hotel referrals, or WhatsApp contacts. Their capability is real; their visibility is not.
- **Condition — applies when:** The gap between supply capability and supply visibility is the binding constraint. Fails when the supply side genuinely lacks capability — in that case, a discoverability intervention will surface poor experiences and damage trust in the network.

---

**2. Serve both sides of the market as first-class users from the outset**

- `Dimension: Persona`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** Design the network from the start to serve two distinct discovery journeys — tourists finding operators, and operators finding emerging demand — rather than treating operators as supply inputs to a tourist-facing product.
- **Alternative considered:** Build a tourist-facing discovery product first; add operator-side demand signals later if the supply side asks for them.
- **Why:** The long tail of informal providers will not invest in maintaining a digital profile for occasional tourist-side benefits alone. The opportunity discovery loop — operators finding demand signals before investing in a new offering — creates an independent reason for providers to participate and keep their profiles current. Without it, supply-side onboarding depends entirely on altruism or administrative pressure.
- **What this looked like here:** Two equal discovery journeys are designed in parallel: Journey 1 (tourist → operator) and Journey 2 (operator → opportunity). The Tourism Opportunity Orange Dot — a structured broadcast of unmet or emerging demand — is the mechanism for the second journey, allowing operators to discover demand before committing to create supply around it.
- **Condition — applies when:** The supply side is fragmented, informal, and unlikely to invest in digital presence for tourist-facing benefits alone. The operator-side value proposition must be independently compelling.

---

### Solution

**3. Build open rails, not another marketplace**

- `Dimension: Solution`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** Design the system as discovery infrastructure — a shared layer that makes tourism actors and opportunities findable across many applications — rather than as a platform that owns the user relationship, controls rankings, sets commissions, and mediates transactions.
- **Alternative considered:** Build a national tourism super-app or portal that aggregates providers and handles discovery, recommendations, and booking end-to-end through a single government or private interface.
- **Why:** A vertically integrated marketplace determines who participates and how visibility is allocated. For the long tail of local and community-based providers, marketplace economics consistently favour standardised, high-volume products — producing the same invisibility the intervention is meant to address. Open rails allow any application to surface any discoverable provider; marketplace competition among applications does not determine provider visibility at the infrastructure level.
- **What this looked like here:** The architecture separates the discovery and trust layer — Orange Dots' responsibility — from user experience, recommendations, itinerary creation, booking, and payments, which are left to competing applications. The concept note explicitly defines what Orange Dots is not: a national portal, a government travel agency, a single booking application, or a replacement for existing OTAs.
- **Condition — applies when:** Multiple applications and channels already serve tourism demand, and the goal is to make underlying supply discoverable across all of them. Fails when the adopter needs a single controlled channel, or when no applications are willing to build on common infrastructure — the open-rails model only works if there are builders on top of it.

---

**4. Position AI as a translation layer above the network, not embedded within it**

- `Dimension: Solution`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** Use conversational and vernacular AI to convert natural-language tourist intent and operator capability statements into structured discovery queries, while keeping the discovery network itself independent of any specific AI model or provider.
- **Alternative considered:** Build AI into the core discovery and matching layer so that the network is AI-native from the infrastructure level up.
- **Why:** Embedding AI in the infrastructure layer creates model dependency, raises the technical bar for applications that want to participate without AI capability, and makes the network harder to govern. Keeping AI above the network means any application — including simple non-AI tourist apps — can query the same discovery infrastructure, while AI-capable applications get the additional benefit of intent translation. The network's value is not contingent on any one AI provider.
- **What this looked like here:** A tourist speaking in Telugu about wanting a tribal culture guide in Araku is translated by AI into structured attributes — location, time, group size, experience type, language — which the network then resolves against provider profiles. The network layer itself remains protocol-based and application-agnostic; the AI sits only at the interface.
- **Condition — applies when:** The user population includes people who cannot or will not navigate structured search — vernacular speakers, low-digital-literacy users, tourists unfamiliar with local taxonomy. Fails when users are already comfortable with structured search and the AI translation layer adds complexity without proportionate benefit.

---

**5. Make trust granular and portable, not a binary gate**

- `Dimension: Solution`
- `Stage: Define`
- `Type: Strategic Decision`

- **Decision:** Design provider trust profiles as a collection of independently verifiable claims, each attested by a named credentialling authority, rather than a single verified/unverified status for the whole provider.
- **Alternative considered:** Require providers to meet a minimum verification threshold — a set of mandatory credentials — before appearing in the network at all.
- **Why:** A binary trust gate excludes informal providers who have real capabilities but incomplete formal credentials — precisely the population Orange Dots is trying to make discoverable. Granular attestations allow a provider to be discoverable with whatever credentials they currently hold, while giving tourists the information to make their own trust judgements. Portability means providers do not rebuild reputation from zero on each new platform they join.
- **What this looked like here:** Specific attributes are mapped to potential verifiers: guide licence to the Tourism Department, adventure qualification to a recognised certifying body, vehicle permit to the Transport Department, language certification to an authorised institution, local association membership to a registered association. A provider accumulates attestations over time rather than clearing a single gate.
- **Condition — applies when:** The provider population mixes formally credentialled and informally capable actors, and the goal is inclusion rather than filtering to a credentialled minority. Fails when the use case requires a high-assurance trust environment where informal providers genuinely pose a safety or liability risk to users.

---

### Institution

**6. Assign government the role of ecosystem enabler, not marketplace operator**

- `Dimension: Institution`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** Assign government the roles of mobilisation, trust infrastructure, standards, opportunity creation, and inclusion support — explicitly not the role of operating the primary tourism discovery marketplace or owning the consumer relationship.
- **Alternative considered:** Government builds and operates a national tourism portal that aggregates providers and handles discovery centrally, with private platforms plugging into it.
- **Why:** Government-operated marketplaces tend to favour standardised, easily regulated products and create a single point of failure for discoverability across the whole sector. Government's comparative advantage is in authoritative credential issuance, mobilisation of small providers through existing field networks, and publishing opportunity signals from destination investment and visitor flow data — none of which require owning the consumer-facing product.
- **What this looked like here:** Five specific enabling roles are assigned to government: mobilisation (bringing small providers onto digital networks), trust (making credentials digitally verifiable), standards (interoperability specifications), opportunity creation (publishing demand signals based on destination development and visitor flows), and inclusion (ensuring community-based providers participate alongside digitally sophisticated operators).
- **Condition — applies when:** A functioning private tourism application ecosystem exists or can be expected to develop. Fails when no private applications are willing to build on common infrastructure — in that case a government-operated portal may be the only viable starting point, accepting the limitations that entails.

---

### Ecosystem

**7. Govern shared infrastructure through a neutral body, not a market participant**

- `Dimension: Ecosystem`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** Vest governance of the shared discovery infrastructure — interoperability specifications, credential frameworks, participant policies, trust registries, protocol evolution, dispute frameworks — in a neutral ecosystem institution that is not itself a tourism marketplace competitor.
- **Alternative considered:** Have the largest or most credible tourism platform govern the shared infrastructure, with other participants as members of a governing council.
- **Why:** Shared infrastructure governed by a market participant creates a structural conflict of interest: the governing participant can evolve protocols in ways that favour their own application, whether deliberately or gradually. Neutral governance is the condition under which competing tourism applications are willing to build on common infrastructure rather than maintaining proprietary discovery layers — making neutral governance not just a fairness principle but a participation prerequisite.
- **What this looked like here:** The concept note draws a clear boundary between the shared layer (governed neutrally: discovery, trust, interoperability) and the competitive layer (left entirely outside governance: interfaces, recommendations, AI, itinerary creation, booking, payments). Governance scope is explicitly bounded to what must be shared; everything that can be competed on is excluded.
- **Condition — applies when:** The ecosystem includes or is expected to include multiple competing applications that must each trust the infrastructure equally. Fails when there is only one application — neutral governance adds overhead without the participation benefit it is designed to create.

---

**8. Route small-provider onboarding through local tourism networks, not self-service**

- `Dimension: Ecosystem`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** Do not require small tourism operators to directly integrate with national digital infrastructure. Enable local tourism networks — state tourism departments, destination management organisations, guide associations, cooperatives, hotel associations, community tourism organisations — to act as intermediaries who onboard, digitise, verify, and maintain provider profiles on behalf of providers.
- **Alternative considered:** Build self-service onboarding tools that allow individual providers to register and maintain their own Orange Dot profiles directly through a mobile app or web portal.
- **Why:** Self-service onboarding requires consistent digital literacy, reliable internet access, and sustained motivation to maintain a profile — conditions that do not hold for informal guides, artisans, and community providers. Local network operators already have field relationships with these providers and existing reasons to engage with them. Routing onboarding through intermediaries converts hundreds of otherwise invisible providers into discoverable entities without requiring each provider to individually navigate digital infrastructure.
- **What this looked like here:** The concept note defines local network operator responsibilities as: operator mobilisation, onboarding, digitisation of offerings, verification, opportunity creation, capacity building, and grievance support. The intermediary layer is designed to make the network accessible to providers who would never reach it directly.
- **Condition — applies when:** The target provider population includes a significant share who lack the digital literacy or motivation to self-onboard. Fails when providers are already digitally active and self-service onboarding is lower friction than routing through an intermediary — adding an intermediary layer then creates unnecessary delay and dependency.

---

## Section 4 — Toolkits and playbooks

| # | Asset | Type | One-line reuse condition |
|---|---|---|---|
| 5 | Granular trust profile schema: attribute × named verifier mapping | Toolkit Asset | Use when provider population mixes formally credentialled and informally capable actors and a binary verification gate would exclude the informal majority |
| 7 | Neutral governance scope boundary definition: shared infrastructure layer vs. competitive application layer | Toolkit Asset | Use when designing governance for shared infrastructure where participants also compete on top of it — the boundary must be drawn before participant sign-up, not after |
| 8 | Local network operator role definition: onboarding, verification, opportunity creation, grievance support | Toolkit Asset | Use when target provider population cannot reliably self-onboard and existing field intermediaries can be enabled as the access layer instead |

---

## Section 6 — Retrieval guide

*"How do we avoid building another platform that excludes small operators the same way existing OTAs do?"* → Unit 3

*"Should we build AI into the core of the network, or keep it as a separate layer?"* → Unit 4

*"How do we handle trust when many of our providers have no formal credentials?"* → Unit 5

*"What should government's role be — should the tourism department run the portal?"* → Unit 6

*"Who should govern the shared infrastructure — can the biggest platform take that role?"* → Unit 7

*"Our target providers are informal guides and artisans who won't self-register. How do we get them onboard?"* → Unit 8

*"Is the core problem that small operators lack capability, or that they can't be found?"* → Unit 1

*"Should we design this for tourists first and add the operator side later?"* → Unit 2

*"How do we convince operators to join when they might only get a few bookings a year?"* → Unit 2

*"We're not sure which use case to fix the pilot around — how do we choose?"* → Units 1, 2, Section 2 gap 3

*"Who needs to own this institutionally before the pilot can proceed?"* → Unit 6, Section 2 gaps 1, 2

*"We have credentials coming from multiple government bodies — how should we structure the trust layer?"* → Unit 5, Section 2 gap 4

*"How do we keep the network open to future AI models without locking in to the one we start with?"* → Unit 4

*"What is the right governance structure so that no single tourism platform controls the rails?"* → Units 3, 7

---

---

## Source Trace appendix

*Contributor-facing only — not surfaced in any adopter-facing response.*

| Source file | Covers | Notes |
|---|---|---|
| Orange Dots.pdf (as of September 2026) | Section 1 — all Pathway Identity fields except Build effort; Section 3 — Units 1–8 in full; Section 4 — all three toolkit entries; Section 2 — coverage grid and all five gap statements | Primary source. Concept note representing the contributor's own account of a deployment at Define stage. No independently verified cost, build effort, or live outcome data. Quantitative pilot targets (500–1,000 providers, 2–3 destinations) taken directly from this document. |
| Adoption Companion conversation (September 18, 2026, 3:05 PM) | Section 1 — stage confirmed as Define; Section 2 — gap prioritisation and framing | Contributor's own account. Confirms stage and framing from the PDF. Does not add facts beyond what the PDF establishes. |
| Adoption Companion conversation (September 18, 2026, 3:25 PM) | Section 1 — Build effort field ("Initial build took 5 months") | Contributor's own account. Not independently verified. |