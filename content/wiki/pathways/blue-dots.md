---
type: Pathway
title: Blue Dots
description: Open voice-AI discovery infrastructure making local jobs, talent, and services visible to each other within a district — modelled on UPI.
tags: [Livelihoods, Discovery, District Economy]
sector: Livelihoods
stage: Scale
timestamp: 2026-07-31
contributor: EkStep Foundation
---

# 0. Overview

A shared, open voice-AI discovery infrastructure that makes local jobs, talent, and
services visible to each other within a district — comparable in spirit to what UPI
did for payments. Source deployments: Dharwad, Karnataka (pioneer district, 2024)
and Ghaziabad, Uttar Pradesh (second district), now scaling across multiple
districts in Uttar Pradesh and Karnataka.

**Who it serves.** Job seekers and citizens (especially women re-entering work,
persons with disabilities, first-generation graduates, daily-wage workers), SMBs and
service providers, local ecosystem aggregators (ITIs, MSME associations, NGOs),
district administrations, and private innovators (staffing, assessment, skilling,
transport, finance).

**Scale achieved.** Fewer than 10% of Ghaziabad's SMBs surfaced on the shared map
made 10,000+ local job openings visible in under 60 days. In Dharwad, one MSME
association onboarded 300+ employers and one ITI onboarded 500+ seekers, both
within two weeks.

**Cost anchor.** Discovery cost drops from ₹500+ per field-survey interaction to
₹10 per voice interaction. A conservative 5% workforce-participation gain in one
district is estimated at ₹1,050 crore in additional annual GDP; scaled across
India's top 100 progressive districts, ₹87,500 crore annually.

**Compression evidence.** 10 months (Dharwad, pioneer, building the playbook while
running it) → 4 months (Ghaziabad, drawing directly on Dharwad) → further
compression expected now that reusable building blocks and a documented playbook
exist, though timelines still depend on district readiness, not technology alone.

**Where this pathway doesn't apply.** Built from a deployment solving a local
discovery failure — things that already exist but can't find each other. If the use
case is closer to creating new demand or supply, or users are already well served
by existing digital platforms, this won't transfer cleanly.

# 1. Pathway Identity

| Field | Detail |
|---|---|
| Scale achieved | In Ghaziabad, fewer than 10% of SMBs surfaced on the shared map made 10,000+ local job openings visible in under 60 days. In Dharwad, one MSME association onboarded 300+ employers and one ITI onboarded 500+ seekers, both within two weeks. (as of 2026-07-26) |
| Cost anchor | Discovery cost fell from ₹500+ per field-survey interaction to ₹10 per voice interaction. Telephony costs fell from ~₹6/minute to ~₹1/minute over the rollout. A conservative 5% workforce-participation gain in one district is estimated at ₹1,050 crore in additional annual GDP; scaled across India's top 100 progressive districts, ₹87,500 crore annually. (as of 2026-07-26) |
| Build effort | 10 months for the pioneer deployment (Dharwad, building the playbook while running it), compressed to 4 months for the second deployment (Ghaziabad, drawing directly on Dharwad). Further compression is expected now that reusable building blocks and a documented playbook exist, though timelines still depend on district readiness, not technology alone. (as of 2026-07-26) |
| Known downstream reuse | Dharwad, Karnataka (pioneer, 2024) and Ghaziabad, Uttar Pradesh (second district) are the source deployments; now scaling across multiple districts in Uttar Pradesh and Karnataka. A related pathway, Data DHARA, shares this pathway's "coordination, not absence of data" diagnosis, applied to government data rather than livelihoods discovery. |
| Scope / does not transfer when | Built from a deployment solving a local discovery failure — things that already exist but can't find each other. Does not transfer cleanly when the use case is closer to creating new demand or supply, or when users are already well served by existing digital platforms. |

# 2. Coverage Grid and Gaps

| Dimension | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| Persona | ●●● | ○ | ○ | ● |
| Solution | ● | ● | ● | ● |
| Institution | ○ | ●●● | ●●● | ●●● |
| Ecosystem | ● | ● | ● | ● |

**Gaps**

- Institutional mandate-holders (District Champion, State Sponsor) are named only from Define onward (Units 9–10); the source documents no Explore-stage evidence of who inside the institution personally needed this to work before that naming happened.
- Formal consent and data-policy handling for government-held citizen data is named as a live, unresolved issue at Scale, but no named data steward or policy process is documented — it sits alongside the self-funding transition in Unit 17 as an open question, not a closed one.
- No partner-performance log or contingency plan is documented for the sequenced ecosystem actors in Units 18–21 — the source states the onboarding sequence but not what happens if a named aggregator or facilitation-team role underperforms or drops out mid-rollout.
- Dialect and vocabulary adaptation is documented (Unit 7), but no throughput, uptime, or error-rate benchmarks for the voice system itself are documented in the source at Pilot or Scale.

# 3. Micro-innovations

## Persona

**1. Diagnose a discovery failure, not a scarcity problem**
- Dimension: Persona
- Sub-category: A. Problem and Persona
- Stage: Explore
- Type: Strategic Decision
- Decision: Frame the core problem as a discovery/coordination failure — jobs, talent, and services already exist in real supply within the district but cannot find each other — rather than a resource-scarcity problem. Districts contribute roughly 80% of the country's jobs.
- Alternative considered: Treating the gap as insufficient jobs, talent, or services requiring creation of new supply or demand.
- Condition — applies when: Real supply already exists in a district but is invisible to the people who need it.
- Condition — fails when: The use case is about creating new demand or supply rather than surfacing what already exists.
- Before → After: Not documented in the source.

**2. Anchor the persona in a concrete, named case**
- Dimension: Persona
- Sub-category: A. Problem and Persona
- Stage: Explore
- Type: Strategic Decision
- Decision: Use a concrete, individually specific case — a commerce graduate in Ghaziabad being pushed by her family to migrate to Delhi, while a manufacturing firm two kilometres from her house needed exactly her profile — to define the excluded persona, instead of an abstract category like "job seeker."
- Alternative considered: Defining the target user only as a generic demographic or occupational category.
- Condition — applies when: An abstract category is masking a concrete, locally-resolvable mismatch between supply and demand.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**3. Design for existing behaviour, not new behaviour**
- Dimension: Persona
- Sub-category: B. Current Journey and Friction
- Stage: Explore
- Also relevant at: Define
- Type: Strategic Decision
- Decision: Design the system to meet users' existing discovery behaviour and channels rather than requiring them to adopt new behaviour.
- Alternative considered: Requiring users to build a resume or use a job portal, based on a field visit to an ITI in Ghaziabad that found four out of five people had no resume, while employers advertised jobs on poles and trees, not portals.
- Condition — applies when: The target population's actual discovery behaviour is informal and oral rather than document- or portal-based.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**4. Expect the persona set to widen at scale**
- Dimension: Persona
- Sub-category: D. Scope, Inclusion, and Trust
- Stage: Scale
- Type: Strategic Decision
- Decision: Treat the pilot population — women re-entering the workforce, persons with disabilities, first-generation graduates, and daily-wage workers who find work only through informal networks — as the anchor, not the ceiling: the same discovery failure recurs in white-collar work as the map scales.
- Alternative considered: Not documented in the source.
- Condition — applies when: The excluded population is defined by network scarcity rather than a single occupational tier.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

## Solution

**5. Build shared, open rails instead of a platform or physical mobilisation**
- Dimension: Solution
- Sub-category: A. AI Fit and Comparative Advantage
- Stage: Explore
- Type: Strategic Decision
- Decision: Build shared, open digital rails for voice-AI discovery — explicitly modelled on UPI — rather than a platform any single organisation would own.
- Alternative considered: National digital job/service platforms, which surfaced fewer than 100 local listings even where tens of thousands of real openings existed (they assume literacy, smartphone ownership, and interface familiarity); and physical mobilisation (job fairs, field surveys), which cost ₹500+ per interaction, took weeks, and converted below 10%.
- Condition — applies when: The population is excluded from existing digital platforms by literacy, device, or interface assumptions, and physical mobilisation is too slow and expensive to reach district scale.
- Condition — fails when: The target users are already well served by existing digital platforms.
- Before → After: Discovery cost ₹500+ per field-survey interaction → ₹10 per voice interaction; in Ghaziabad, under 10% of SMBs surfaced on the shared map made 10,000+ local job openings visible in under 60 days.

**6. Build reusable, open-source building blocks, not a closed application**
- Dimension: Solution
- Sub-category: C. Model, Architecture, and Infrastructure
- Stage: Define
- Type: Strategic Decision
- Decision: Build the system as reusable, open-source components — seven building blocks (Knowledge Engine, Memory Layer, Trust Layer, Agent Core, Action Gateway, Reach Layer, Learning Layer) plus purpose-built Signal, Aggregator, and Facilitator components — rather than a single closed application built per district.
- Alternative considered: A closed, purpose-built application per district.
- Condition — applies when: The deployment is expected to be replicated across multiple districts or geographies rather than run as a one-off.
- Condition — fails when: Not documented in the source.
- Before → After: The building blocks can be configured and activated for a new district in ~2 weeks.

**7. Choose adaptability over benchmark; adapt dialect and vocabulary directly**
- Dimension: Solution
- Sub-category: C. Model, Architecture, and Infrastructure
- Stage: Pilot
- Type: Tactical Decision
- Decision: Select speech/model partners for adaptability and iteration speed rather than locking into a single benchmark-leading speech model, and treat dialect and local vocabulary as requiring direct, local adaptation, not just a language switch — Dharwad Kannada versus Bangalore Kannada required a local glossary and tone-matching.
- Alternative considered: Locking into a single vendor or model chosen by benchmark performance, and treating base-language support as sufficient for dialect coverage.
- Condition — applies when: The speech/model layer is expected to keep evolving and the deployment spans multiple dialect regions.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**8. Hold the open-ownership architecture as durable at scale**
- Dimension: Solution
- Sub-category: C. Model, Architecture, and Infrastructure
- Stage: Scale
- Type: Strategic Decision
- Decision: Treat the rails' open, shared-ownership architecture as effectively irreversible once operating at scale — reversing to a closed, single-owner platform would undo the trust the ecosystem is built on.
- Alternative considered: Converting to a closed, organisation-owned platform after establishing scale and traction.
- Condition — applies when: Not documented in the source.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

## Institution

**9. Name a District Champion and State Sponsor before activation**
- Dimension: Institution
- Sub-category: A. Mandate, Ownership, and Decision Rights
- Stage: Define
- Type: Strategic Decision
- Decision: Name institutional ownership before activation, not during — a District Champion (CDO or District Collector) who frames the problem and convenes aggregators, and a State Sponsor (Mission Director or Secretary) who provides political cover and budget.
- Alternative considered: Not documented in the source.
- Condition — applies when: The ecosystem needs a mandate-holder willing to say "this runs in my name" before other actors will commit.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**10. Fund at least 12 months of cold start before activation**
- Dimension: Institution
- Sub-category: F. Operating Model and Sustainability
- Stage: Define
- Type: Strategic Decision
- Decision: Secure funder commitment for at least 12 months of facilitation-team costs and technology setup before activation begins, covering the cold-start period before private actors have their own reason to join.
- Alternative considered: Not documented in the source.
- Condition — applies when: The ecosystem has not yet reached a density at which private actors self-fund their participation.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**11. Stand up a District Facilitation Team**
- Dimension: Institution
- Sub-category: B. Workforce and Change
- Stage: Define
- Also relevant at: Pilot, Scale
- Type: Toolkit Asset
- Toolkit asset: A District Facilitation Team of 6–8 people, drawn from government, the social sector, and MSME associations — constituted as a convening and coordination team, not a technology team.
- Reusable as-is: The team-size range, cross-sector staffing sources, and the explicit convening/coordination (non-technical) mandate can be lifted directly by a new district setting up its own facilitation function.
- Condition — applies when: A district needs a small, cross-sector team to convene aggregators and sustain a discovery ecosystem, rather than to build technology.

**12. Verify participants in gated stages**
- Dimension: Institution
- Sub-category: C. Governance, Safety, and Redress
- Stage: Pilot
- Type: Playbook
- Playbook: Verify participants in stages rather than all at once — identity, then education claims, then experience, then skill assessment.
- Note: At the current stage, priority has been on ensuring genuine participants onboard; fuller credentialing is still being built out, not yet fully public.
- Condition — applies when: Onboarding a large, dispersed population where requiring full credentialing upfront would itself be a barrier to participation.
- Before → After: Not documented in the source.

**13. Expect and absorb early failure modes through daily iteration**
- Dimension: Institution
- Sub-category: B. Workforce and Change
- Stage: Pilot
- Type: Failure and Fix
- Failure: Early failure modes were pervasive in the first three to four months — pronunciation errors, comprehension errors, and sparse or unhelpful responses (for example, "I'm okay with any job").
- Fix: The District Facilitation Team ran daily iteration by design for the first three to four months, and kept a weekly discovery rhythm active afterward.
- Insight: Without active maintenance, the discovery map goes stale and discovery reverts to old patterns — the daily-iteration period is how the system is designed to mature, not a sign that something is wrong.
- Condition — applies when: Launching in a new district or cohort where local pronunciation, vocabulary, and response patterns haven't yet been tuned.

**14. Track connections and provider growth, not just sign-ups**
- Dimension: Institution
- Sub-category: F. Operating Model and Sustainability
- Stage: Pilot
- Type: Failure and Fix
- Failure: Density and freshness broke first during Pilot — not the underlying technology.
- Fix: Track metrics that reflect real ecosystem health — connections made and the number of other service providers joining — rather than relying on raw sign-up counts alone.
- Insight: Sign-up counts can look healthy while the underlying discovery function is actually stale; the metrics that matter track live connection activity, not registration.
- Condition — applies when: Assessing whether a discovery-ecosystem pilot is actually working, not just growing.

**15. Layer trust institution → aggregator → individual**
- Dimension: Institution
- Sub-category: C. Governance, Safety, and Redress
- Stage: Scale
- Type: Playbook
- Playbook: Build trust in three sequential layers — institutional trust (via a joint facilitation centre), then aggregator/physical trust, then individual verification (identity, opportunity, experience) — do not attempt individual verification before the first two layers are in place.
- Note: Not documented in the source.
- Condition — applies when: Scaling trust across a large population where trust needs to start with people, not the AI system itself.
- Before → After: Not documented in the source.

**16. Shift the facilitation team from building density to sustaining it**
- Dimension: Institution
- Sub-category: B. Workforce and Change
- Stage: Scale
- Type: Strategic Decision
- Decision: Shift the facilitation team's role from actively building density to sustaining it, once seekers, providers, and innovators are joining the ecosystem on their own terms.
- Alternative considered: Not documented in the source.
- Condition — applies when: A density threshold has been reached and outside actors have their own incentive to participate.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**17. Design the funding model to self-sustain past a density threshold**
- Dimension: Institution
- Sub-category: F. Operating Model and Sustainability
- Stage: Scale
- Type: Strategic Decision
- Decision: Design the funding model to transition from continuous philanthropic subsidy to self-sustaining once a density threshold is reached.
- Alternative considered: Continuous philanthropic or public subsidy of ecosystem participation indefinitely.
- Condition — applies when: A critical mass of participants and listings has been reached.
- Condition — fails when: Not documented in the source.
- Before → After: Continuous funder subsidy required pre-threshold → self-funding, self-sustaining ecosystem within three months of reaching density in both Ghaziabad and Dharwad, as innovators found their own economic reasons to engage.

## Ecosystem

**18. Structure the ecosystem around four reinforcing levers**
- Dimension: Ecosystem
- Sub-category: A. Partner Architecture and Roles
- Stage: Explore
- Type: Strategic Decision
- Decision: Structure the ecosystem around four reinforcing levers, none sufficient alone — the shared digital rails, local ecosystem aggregators, a district facilitation team, and innovators building on the rails.
- Alternative considered: Not documented in the source.
- Condition — applies when: Not documented in the source.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**19. Onboard through aggregators, not individual by individual**
- Dimension: Ecosystem
- Sub-category: A. Partner Architecture and Roles
- Stage: Define
- Type: Tactical Decision
- Decision: Route onboarding through local ecosystem aggregators (ITIs, MSME associations, NGOs, skilling centres) who already hold relationships with the long tail, rather than onboarding individuals one by one.
- Alternative considered: Direct one-by-one onboarding of individual job seekers and employers.
- Condition — applies when: An intermediary layer with existing trusted relationships to the target population already exists.
- Condition — fails when: Not documented in the source.
- Before → After: One MSME association onboarded 300+ employers and one ITI onboarded 500+ seekers, both within two weeks (Dharwad).

**20. Bring ecosystem actors on in a fixed sequence**
- Dimension: Ecosystem
- Sub-category: A. Partner Architecture and Roles
- Stage: Pilot
- Type: Playbook
- Playbook: Bring ecosystem actors on in a fixed sequence — (1) district champion and state sponsor commit first, since there is no spine without them; (2) a funder enables the cold start; (3) the facilitation team builds initial density; (4) local aggregators bring the long tail on board; (5) seekers, providers, and innovators join once density is sufficient.
- Note: Not documented in the source.
- Condition — applies when: Building a multi-sided discovery ecosystem from zero in a new district.
- Before → After: Not documented in the source.

**21. Keep the rails open so innovators plug in on their own initiative**
- Dimension: Ecosystem
- Sub-category: A. Partner Architecture and Roles
- Stage: Scale
- Type: Strategic Decision
- Decision: Keep the rails open so third-party innovators can plug into the shared map on their own initiative, rather than requiring bespoke integration agreements with each one.
- Alternative considered: Not documented in the source.
- Condition — applies when: The shared infrastructure already provides enough value that innovators have their own incentive to integrate.
- Condition — fails when: Not documented in the source.
- Before → After: Named innovators plugged in at near-zero acquisition cost, including Head Held High, Recex, JobsUp, TRRAIN, Proof of Skill, and Digital Labour Chowk.

# 4. Toolkits and Playbooks

| Unit | Type | Reuse condition |
|---|---|---|
| 11. District Facilitation Team | Toolkit Asset | Applies when a district needs a small, cross-sector convening and coordination team, not a technology team. |
| 12. Staged participant verification | Playbook | Applies when onboarding a large, dispersed population where full upfront credentialing would itself be a barrier. |
| 15. Three-layer trust build | Playbook | Applies when scaling trust across a large population, starting with people, not the AI system. |
| 20. Sequenced ecosystem onboarding | Playbook | Applies when building a multi-sided discovery ecosystem from zero in a new district. |

# 5. Problem → Solution Patterns

| Problem | Root cause | Solution | Result | Condition |
|---|---|---|---|---|
| Pronunciation errors, comprehension errors, and sparse responses in the first months of Pilot | New district/cohort not yet tuned to local pronunciation, vocabulary, and response patterns | District Facilitation Team runs daily iteration by design for three to four months, then sustains a weekly discovery rhythm | System stabilises; without this maintenance, the discovery map goes stale and discovery reverts to old patterns | Applies when launching in a new district or cohort |
| Density and freshness broke first during Pilot, not the technology | Sign-up counts don't reflect live discovery activity | Track connections made and new provider joins instead of raw sign-up counts | Surfaces real ecosystem health rather than a false sense of growth | Applies when assessing whether a discovery-ecosystem pilot is actually working |

# 6. Retrieval Guide

- *"How do you know this is a discovery problem and not a lack of jobs?"* → Unit 1
- *"How specific should our persona be — can we just say 'job seekers'?"* → Unit 2
- *"Our target users don't have resumes or use portals — does voice AI still work?"* → Unit 3
- *"Will this still be relevant once we go beyond blue-collar and daily-wage workers?"* → Unit 4
- *"Why build custom voice AI instead of pointing people to an existing national job platform?"* → Unit 5
- *"Should we build one closed app or something more modular?"* → Unit 6
- *"How do we handle different dialects of the same language?"* → Unit 7
- *"Could we switch to a closed, owned platform later if it's easier to monetise?"* → Unit 8
- *"Who inside government actually needs to sign off before we can launch?"* → Unit 9
- *"How long should we expect to fund this before it pays for itself?"* → Units 10, 17
- *"What kind of team do we need on the ground, and how big?"* → Unit 11
- *"How do we verify that participants are who they say they are without blocking onboarding?"* → Unit 12
- *"What should we expect to go wrong in the first few months, and is that a bad sign?"* → Unit 13
- *"What should we actually be measuring during a pilot?"* → Unit 14
- *"How do we build trust with a population that's never used something like this?"* → Unit 15
- *"Does the facilitation team's job change once things are working?"* → Unit 16
- *"Who should we partner with, and in what order, when we launch?"* → Units 18, 20
- *"How do we get local organisations to bring people in at scale?"* → Unit 19
- *"How do outside companies or startups plug into something like this?"* → Unit 21
- *"What's still unresolved about handling government data at scale?"* → Section 2 gaps (Unit 17)
- *"What happens if one of our local partners drops out mid-rollout?"* → Section 2 gaps

---

## Provenance appendix

*Contributor-facing only. Not surfaced in any adopter-facing response.*

| Source file | Covers | Notes |
|---|---|---|
| `Diffusion Library/wiki/pathways/blue-dots.md` (as of 2026-07-26) | Section 1 (all identity fields); Section 2 (grid counts and all listed gaps); Section 3, Units 1–21 in full; Section 4 (all rows); Section 5 (all rows) | Primary and only source. This document is a reclassification of an existing corpus entry — originally written under the prior 7-category framework (Problem, Persona, Technology, Institution, Ecosystem, Workforce, Operating Model) — into the 4-dimension framework (Persona, Solution, Institution, Ecosystem). It is not fresh raw-material synthesis; no other source file was consulted. |
