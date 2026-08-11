---
type: Pathway
title: MahaVISTAAR
description: Maharashtra's state-run voice advisory line for farmers — 1.67M+ questions answered, and the architecture, data, and governance decisions behind it.
resource: tel:155313
tags: [Voice AI, Agriculture, Government]
sector: Agriculture
stage: Scale
timestamp: 2026-07-31
---

# Section 0 — Overview

A state government-run voice advisory system for smallholder farmers in
Maharashtra — crop advisory, pest management, market pricing, government
scheme access, and grievance tracking through a single voice call on any
phone. Built by the Department of Agriculture (Government of Maharashtra),
EkStep Foundation, and the OpenAgriNet (OAN) ecosystem.

**Who it serves.** Smallholder farmers in Maharashtra — primarily
Marathi-speaking, feature-phone users, with limited literacy and no
reliable internet. Women farmers who do the actual farming while land
titles stay in their husbands' names are the sharpest version of the
excluded user this pathway names.

**Scale achieved.** 342K+ unique users · 1.67M+ questions answered ·
791K+ sessions · 17 lakh farmers reached daily via proactive voice
alerts · 97–98.5% positive feedback.

**Cost anchor.** ~$250K setup, ~$250K/year at scale (mid-2026). AI
inference cost dropped 180× after moving off a bundled provider:
₹9.4 → ₹0.05 per question.

**Compression evidence.** MahaVISTAAR took 9 months to build from
scratch, with 30 partner organisations and 3 million farmers reached —
there was no prior pathway to draw on. Ethiopia's ATI, building on
MahaVISTAAR's architecture, took 3 months. Amul/Sarlaben, drawing on two
full cycles of shared learning, launched in 3 weeks and served 3.6
million farmers and 40 million cattle from day one.

**Where this pathway doesn't apply.** Strongest where the population is
feature-phone-dependent and Indic-language-speaking, institutional
credibility is a trust asset, and the data needed already exists in
fragmented institutional form. Weaker where users already have
smartphones and text literacy, government credibility is contested, or
the goal is internal efficiency rather than last-mile inclusion.

# Section 1 — Pathway identity

| Field | Value |
|---|---|
| Scale achieved | 342K+ unique users, 1.67M+ questions answered, 791K+ sessions, 17 lakh farmers reached daily via proactive alerts, 97–98.5% positive feedback (as of mid-2026) |
| Cost anchor | ~$250K setup, ~$250K/year at scale (mid-2026); per-question inference cost fell 180× (₹9.4 → ₹0.05) after migrating off the bundled provider |
| Build effort | 9 months from scratch, 30 partner organisations, no prior pathway to draw on; 3 million farmers reached at initial build |
| Known downstream adopters | Ethiopia's ATI (built directly on this architecture, 3-month build); Amul/Sarlaben (drew on two full cycles of shared learning, 3-week build, 3.6M farmers and 40M cattle served from day one); Bharat-VISTAAR (national federation of this architecture, announced Union Budget 2026-27) |
| Scope / does not transfer when | Weaker where users already have smartphones and text literacy, where government credibility is contested, or where the goal is internal efficiency rather than last-mile inclusion |

# Section 2 — Coverage grid and gaps

| Dimension | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| Persona | ●● | ●● | ● | ● |
| Solution | ● | ●●● | ●● | ● |
| Institution | ● | ●● | ●●● | ●●● |
| Ecosystem | ● | ● | ● | ● |

**Open questions this pathway doesn't resolve:**

- Whether extension officers resisted the system, and whether any reduced their own advisory effort because it was available, is flagged in the source material itself as unanswered (relates to Unit 19; Institution, Scale).
- No formal liability or compliance mechanism for incorrect advice at scale is documented — the pre-launch ownership checklist (Unit 15) names who is accountable at Define, but not how that accountability is formalised once the system is carrying real advisory volume (Institution, Scale).
- No contingency plan for an underperforming ecosystem partner — a data-source institution, telephony provider, or the orchestration platform itself — is documented at Pilot or Scale, even though named partnerships are (Units 25, 26; Ecosystem).
- No outcome data broken out by the excluded-user segment named at Explore (women farmers in Marathwada) is documented at Scale — the 97–98.5% positive-feedback figure is aggregate, not segmented, so whether the originally-targeted user's outcomes specifically improved is unconfirmed (relates to Unit 2; Persona).

# Section 3 — Micro-innovations

## Persona

**1. Reframe the problem as connecting existing knowledge, not creating new knowledge**
- Dimension: Persona
- Stage: Explore
- Type: Strategic Decision
- Decision: Treat the problem as institutional data fragmentation — university crop knowledge, weather data, mandi prices, and scheme status already existed but weren't reachable through one channel — rather than a knowledge-creation problem. This reframing also meant staffing an advisory model that scales with headcount was not the right comparison; an AI advisory model scales with usage instead.
- Alternative considered: Expanding field-officer staffing to close the advisory gap (the existing ratio was roughly one officer per 2,000 farmers in comparable states).
- Condition — applies when: The required domain knowledge already exists somewhere in the system, fragmented across institutions, rather than needing to be created.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source as a specific metric tied to this framing decision alone.

**2. Define the excluded user as women farmers in Marathwada, not "farmers" generically**
- Dimension: Persona
- Stage: Explore
- Type: Strategic Decision
- Decision: Narrow the target persona to women farmers in Marathwada specifically — reliant on small trust circles, not visiting agriculture offices, and receiving contradictory advice from fertiliser sellers with a sales incentive. Land titles stay in husbands' names while women do the actual farming, so the "registered farmer" in government systems is often not the person making crop decisions day to day.
- Alternative considered: Designing for the registered (typically male) landholder as the default user.
- Condition — applies when: The registered or official user of a system and the actual day-to-day decision-maker diverge.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source as a specific number; this definition shaped the channel, data, language, and testing choices that followed.

**3. Choose voice because the population is uniformly feature-phone-dependent and non-literate**
- Dimension: Persona
- Stage: Define
- Also relevant at: Pilot
- Type: Strategic Decision
- Decision: Size the gap between the AI use case and the current state — not the technology itself — before committing, and choose a voice channel because the target population is uniformly feature-phone-dependent, Marathi-speaking, and text-illiterate.
- Alternative considered: Not documented in the source (implicit alternative is a text/app-based channel, ruled out because it would exclude the named persona).
- Condition — applies when: The population is uniformly feature-phone-dependent and low-literacy in a specific language — a context-specific claim, not a universal one.
- Condition — fails when: Users already have smartphones and text literacy (see Section 1, scope).
- Before → After: Not documented in the source as a specific comparison metric.

**4. Treat persona definition as a resourced milestone, not a formality**
- Dimension: Persona
- Stage: Define
- Type: Strategic Decision
- Decision: Give precise persona definition explicit standing as a first milestone, because it determines the channel, model, data, language, and testing process downstream.
- Alternative considered: Folding persona work informally into general planning rather than resourcing it as its own step.
- Condition — applies when: Multiple downstream decisions (channel, data, language, testing) all hinge on precisely who the user is.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**5. Shift from inbound-only to proactive outbound advisories**
- Dimension: Persona
- Stage: Pilot
- Also relevant at: Define
- Type: Strategic Decision
- Decision: Launch as inbound-only (farmers call 155313 with questions), then shift a second phase to proactive outbound — crop calendar advisories, pest alerts, pre-harvest timing.
- Alternative considered: Remaining inbound-only indefinitely.
- Condition — applies when: The use case has structured trigger data (weather, crop calendar, scheme deadlines) that can drive proactive outreach.
- Condition — fails when: No structured trigger data exists to drive outbound alerts.
- Before → After: An inbound-only service that was "useful when you remembered" became one reaching 17 lakh farmers daily through proactive outbound alerts — "indispensable because it finds you."

**6. Persona built for Marathi speakers meets multilingual demand at scale**
- Dimension: Persona
- Stage: Scale
- Also relevant at: Define
- Type: Failure and Fix
- Failure: The system was designed around a Marathi-speaking persona; at scale, demand surfaced for languages beyond that — Hindi, Bhili, English — that the original persona definition hadn't anticipated.
- Fix: Not documented in the source beyond a pointer to a related language-enablement effort (see Related pathway note, below Section 6).
- Insight: The persona a system is built for can turn out narrower than the population that actually shows up once it scales; retrofitting multilingual support after launch is harder than designing for it upfront.
- Condition — applies when: The initial pilot geography or language is narrower than the eventual population the service reaches.

## Solution

**7. Layered, model-agnostic architecture so infrastructure survives model churn**
- Dimension: Solution
- Stage: Explore
- Type: Toolkit Asset
- Toolkit asset: The OpenAgriNet seven-layer reference architecture — user layer, interface layer, moderation layer, AI decision engine, knowledge and scientific models, live data sources, DPI foundation — used on the premise that no AI model is permanent, so the infrastructure beneath it must stay stable as models evolve.
- Reusable as-is: The layer boundaries are defined independently of any specific model or vendor, so a new adopter can map their own components onto the same seven layers.
- Condition — applies when: Planning for a multi-year deployment where the underlying AI model will be swapped or upgraded over time.

**8. Start bundled, plan to unbundle**
- Dimension: Solution
- Stage: Define
- Also relevant at: Scale
- Type: Tactical Decision
- Decision: Launch the first production version on a bundled provider (GPT-4.1 via Azure OpenAI, ~₹9.4/question) for speed, while building a provider-abstraction layer on day one so the provider is resolved at configuration time, not in application code.
- Alternative considered: Building a self-hosted, fine-tuned model from day one instead of starting bundled.
- Condition — applies when: Speed-to-launch matters more than per-query cost initially, and a provider-abstraction layer is built in from day one.
- Condition — fails when: Not documented in the source.
- Before → After: Bundled provider at ~₹9.4/question migrated to a self-hosted, fine-tuned model (Qwen3.5-27B), cutting cost to ~₹0.05/question — a 180× reduction.

**9. Two-endpoint moderation on separate infrastructure**
- Dimension: Solution
- Stage: Define
- Type: Strategic Decision
- Decision: Run an independent moderation model (GPT-OSS Safeguard 20B) on entirely separate infrastructure from the advisory engine (Qwen3.5-27B), so a problem with one doesn't disable the other.
- Alternative considered: Running moderation and advisory on shared infrastructure.
- Condition — applies when: The system needs safety and advisory functions to fail independently of one another.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source as a specific metric; the outcome is architectural — a fault in one endpoint no longer takes down the other.

**10. Data stays with its owner — the AI connects, it doesn't collect**
- Dimension: Solution
- Stage: Define
- Type: Strategic Decision
- Decision: Keep every data source (ICAR crop advisories, IMD weather, APMC mandi prices, NIPHM pest alerts, AgriStack farmer registry) with its owning institution; the AI retrieves at query time rather than centralising raw data.
- Alternative considered: Centralising or ingesting raw data from each institution into a single owned datastore.
- Condition — applies when: Data owners need to retain control and accountability over their own data.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source as a specific metric.

**11. Dual-provider failover instead of queuing at peak load**
- Dimension: Solution
- Stage: Pilot
- Type: Tactical Decision
- Decision: At peak load, route instantly to a fallback provider rather than queuing requests.
- Alternative considered: Queuing requests during peak load.
- Condition — applies when: The interaction is real-time voice, where 3–4 seconds of silence reads to the caller as failure, not as processing.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source as a specific metric for this decision alone.

**12. WebSocket over WebRTC for Indian telephony**
- Dimension: Solution
- Stage: Pilot
- Type: Tactical Decision
- Decision: Use WebSocket APIs for telephony integration.
- Alternative considered: WebRTC.
- Condition — applies when: Building voice AI over Indian telephony infrastructure.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source as a specific metric; WebSocket "proved more practical" than WebRTC in this deployment.

**13. GPU allocation stranded by tensor-parallelism's power-of-two constraint**
- Dimension: Solution
- Stage: Scale
- Type: Failure and Fix
- Failure: Tensor parallelism only accepts power-of-two GPU splits; a naive split across the advisory and moderation workloads stranded capacity.
- Fix: A dedicated single-H100 node for moderation, consolidating the main node's 8 GPUs for the advisory LLM at TP=8.
- Insight: Infrastructure topology constraints (like power-of-two tensor-parallel splits) need to be designed around explicitly, not discovered after under-provisioning.
- Condition — applies when: Self-hosting multiple model workloads (e.g. advisory and moderation) on shared GPU infrastructure using tensor-parallel serving.
- Result: A self-hosted 16-GPU build-out pencils at ~₹2 crore/year, against a projected ~₹18 crore/year on Azure at the same volume.

## Institution

**14. Institutional authorisation as the critical path, ahead of the technical build**
- Dimension: Institution
- Stage: Explore
- Type: Strategic Decision
- Decision: Treat institutional data-sharing authorisation as the critical path preceding any technical build. Data-sharing sign-off across the Department of Agriculture, four universities, IMD, 307 APMCs, and the state scheme database was needed before a line of code was written.
- Alternative considered: Starting the technical build in parallel with authorisation negotiations.
- Condition — applies when: The AI system depends on multiple distinct institutional data sources, each requiring formal sign-off.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source as a specific metric.

**15. Pre-launch institutional ownership checklist**
- Dimension: Institution
- Stage: Define
- Also relevant at: Scale
- Type: Toolkit Asset
- Toolkit asset: A seven-question ownership checklist answered explicitly before launch — who owns the system, who approves what it can say, who decides what it must not say, who reviews failures, who updates the knowledge base, who handles complaints, and who is accountable when it's wrong. An Agri Secretary-level sponsor and named nodal officers were the first concrete answers.
- Reusable as-is: The seven questions are generic to any institutionally-backed advisory AI and don't depend on MahaVISTAAR-specific content to apply.
- Condition — applies when: Before any public launch of an institutionally-backed advisory system.

**16. Operating model defined as staffing roles, not a leftover of the build team**
- Dimension: Institution
- Stage: Define
- Type: Strategic Decision
- Decision: Define the operating model explicitly as named staffing roles — who decides when the model needs retraining, who updates the advisory corpus, who manages vendor relationships — rather than defaulting to the team that built it.
- Alternative considered: Relying on the original build team to continue operating the system informally ("the people who built it" as the de facto operating model).
- Condition — applies when: Transitioning from initial build to ongoing operations.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source at Define stage; the realised form of this decision appears at Scale (Units 22, 23).

**17. Safety and stress-test bank of 500 attack patterns**
- Dimension: Institution
- Stage: Pilot
- Also relevant at: Scale
- Type: Toolkit Asset
- Toolkit asset: A safety and stress-test bank covering in-scope, out-of-scope, distress, abuse, jailbreak, and escalation scenarios — 500 attack patterns, maintained as a living document. Designed for refusal, not just response.
- Reusable as-is: The category taxonomy (in-scope / out-of-scope / distress / abuse / jailbreak / escalation) transfers to any institutional voice or chat AI regardless of domain.
- Condition — applies when: Deploying a public-facing advisory AI that must be able to refuse gracefully outside its mandate.

**18. Staged testing progression before public rollout**
- Dimension: Institution
- Stage: Pilot
- Type: Playbook
- Playbook: Test in stages before public expansion — (1) builder team, (2) small institutional group, (3) wider institutional group, (4) limited district-level rollout, before (5) public expansion.
- Note: Not documented in the source what the specific gate criteria were between stages, or what happens when a stage is skipped.
- Condition — applies when: Launching an institutionally-backed, public-facing AI system where a public failure carries reputational or political risk.
- Before → After: Not documented in the source as a specific metric.

**19. Frame the system as capacity extension, not replacement**
- Dimension: Institution
- Stage: Pilot
- Type: Strategic Decision
- Decision: Frame the system explicitly as extending human capacity — extension officers handle the relationship; the system handles the 3am question — with explicit rules for when humans must stay in the loop.
- Alternative considered: Positioning the system as a reduction or replacement of extension-officer workload.
- Condition — applies when: Deploying alongside an existing human advisory workforce whose cooperation and buy-in are needed.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**20. Small latency and tone choices determine whether the call feels alive or broken**
- Dimension: Institution
- Stage: Pilot
- Type: Failure and Fix
- Failure: Dead silence of 3–4 seconds on the call read to users as failure, not processing.
- Fix: A hold message plus a latency fix cut dead silence to ~1 second; introductions were kept under 30 seconds; follow-up nudging was softened for a public-service, not commercial, tone.
- Insight: Perceived reliability on a voice channel is governed by small UX and latency choices, not just backend correctness.
- Condition — applies when: Delivering a public-service voice interaction where tone and pacing carry institutional trust.
- Result: A typical exchange now completes in 12–15 seconds.

**21. Bound pilot ambition before pursuing national federation**
- Dimension: Institution
- Stage: Scale
- Type: Strategic Decision
- Decision: Deliberately bound the pilot's scope — selected Kharif districts, limited crops, Marathi only — before pursuing national federation.
- Alternative considered: Launching broad, multi-state, multi-crop, multi-language from the start.
- Condition — applies when: Institutional credibility and proof-of-concept at small scale is a prerequisite for larger political or budgetary commitment.
- Condition — fails when: Not documented in the source.
- Before → After: A bounded state-level pilot preceded Bharat-VISTAAR, a national federation of the architecture, announced in the Union Budget 2026-27, only after the state-level architecture was proven.

**22. Optimise for prefix caching, not output-token efficiency**
- Dimension: Institution
- Stage: Scale
- Type: Tactical Decision
- Decision: Focus cost optimisation on prefix caching (the input-token cost lever) rather than output-token generation efficiency, based on a cost breakdown showing input tokens made up 79.7% of total spend.
- Alternative considered: Optimising output-token generation efficiency.
- Condition — applies when: Input context (prompts, retrieved data) dominates token spend, as in retrieval-heavy advisory prompts.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source as a specific dollar figure for this optimisation alone.

**23. Assign explicit ownership for acting on the usage signal**
- Dimension: Institution
- Stage: Scale
- Type: Strategic Decision
- Decision: Assign explicit ownership for interpreting and acting on usage-signal data (205,000+ monthly queries), rather than treating volume growth as self-evidently positive.
- Alternative considered: Not documented in the source.
- Condition — applies when: Usage volume is growing and generating a demand signal.
- Condition — fails when: No one owns acting on the signal — the system degrades invisibly until trust is already damaged.
- Before → After: Not documented in the source as a realised example; stated as a principle rather than an observed event.

## Ecosystem

**24. Diagnose fragmentation across independent institutions, not absence of data**
- Dimension: Ecosystem
- Stage: Explore
- Type: Strategic Decision
- Decision: Diagnose the problem at the outset as fragmentation across institutions that don't talk to each other — university, weather service, market committees, scheme database — not a data-absence problem.
- Alternative considered: Treating it as a data-creation problem requiring new institutional data.
- Condition — applies when: The required data or knowledge already exists across multiple organisationally-separate institutions.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**25. Data-source ownership registry, named before launch**
- Dimension: Ecosystem
- Stage: Define
- Also relevant at: Pilot
- Type: Toolkit Asset
- Toolkit asset: A data-source ownership registry — source paired with a named institutional owner accountable for accuracy and update frequency — populated pre-launch for ICAR, IMD, APMC, and NIPHM.
- Reusable as-is: The registry structure (source × named owner × accountability for accuracy/cadence) transfers to any multi-source institutional AI deployment regardless of the specific institutions involved.
- Condition — applies when: The system depends on multiple external institutional data feeds; discovering an unowned data source at Pilot stage costs months, so the registry is populated before any code is written.

**26. Voiceera orchestration platform on OpenAgriNet architecture**
- Dimension: Ecosystem
- Stage: Pilot
- Type: Toolkit Asset
- Toolkit asset: Voiceera, an open-source voice-orchestration platform built on OpenAgriNet's architecture, addressing the gap between having language models and having a deployable, maintainable system — model-agnostic, language-agnostic, and telephony-provider-agnostic.
- Reusable as-is: Open-source and explicitly designed to be reusable across sectors, not just agriculture.
- Condition — applies when: Building a voice AI system that needs to swap models, languages, or telephony providers without a rebuild.

**27. This deployment's architecture as the reusable asset, not just its outputs**
- Dimension: Ecosystem
- Stage: Scale
- Type: Strategic Decision
- Decision: Treat the deployment's own architecture — not just its advisory content or outputs — as the reusable asset for the next ecosystem members.
- Alternative considered: Not documented in the source.
- Condition — applies when: The architecture is modular and documented enough that a new adopter's team can build on it directly.
- Condition — fails when: Government credibility is contested, or the target population already has smartphone and text access (see Section 1, scope).
- Before → After: MahaVISTAAR was built from scratch in 9 months with no prior pathway. Ethiopia's ATI, building directly on this architecture, took 3 months. Amul/Sarlaben, drawing on two full learning cycles, launched in 3 weeks and served 3.6 million farmers and 40 million cattle from day one.

# Section 4 — Toolkits and playbooks

| Unit | Name | Type | Reuse condition |
|---|---|---|---|
| 7 | OpenAgriNet seven-layer architecture | Toolkit Asset | Multi-year deployment where the underlying AI model will be swapped or upgraded over time |
| 15 | Pre-launch institutional ownership checklist | Toolkit Asset | Before any public launch of an institutionally-backed advisory system |
| 17 | 500-pattern safety and stress-test bank | Toolkit Asset | Public-facing advisory AI that must refuse gracefully outside its mandate |
| 18 | Staged testing progression | Playbook | Institutionally-backed, public-facing AI launch where a public failure carries reputational or political risk |
| 25 | Data-source ownership registry | Toolkit Asset | System depends on multiple external institutional data feeds |
| 26 | Voiceera orchestration platform | Toolkit Asset | Voice AI needing to swap models, languages, or telephony providers without a rebuild |

# Section 5 — Problem→solution patterns

| Problem | Root cause | Solution | Result | Condition |
|---|---|---|---|---|
| Multilingual demand surfaced after launch that the original persona didn't anticipate | Persona was defined around Marathi speakers only | Not documented in the source beyond a pointer to a related language-enablement effort | Not documented in the source | Applies when the initial pilot geography or language is narrower than the eventual population the service reaches |
| GPU capacity stranded when advisory and moderation workloads were split naively | Tensor parallelism only accepts power-of-two GPU splits | Dedicated single-H100 node for moderation; consolidated 8 GPUs for advisory at TP=8 | Self-hosted 16-GPU build-out at ~₹2 crore/year vs. a projected ~₹18 crore/year on Azure at the same volume | Applies when self-hosting multiple model workloads on shared GPU infrastructure using tensor-parallel serving |
| Dead silence of 3–4 seconds on voice calls read as failure to users | Latency and interaction pacing, not backend correctness | Hold message plus latency fix; shortened introductions; softened tone | Dead silence cut to ~1 second; typical exchange completes in 12–15 seconds | Applies when delivering a public-service voice interaction where tone and pacing carry institutional trust |

# Section 6 — Retrieval guide

- *"Do we need to create new agricultural content, or is the knowledge already out there somewhere?"* → Unit 1
- *"How do we figure out who we're actually building this for?"* → Unit 2, Unit 4
- *"Should we build a text app or a voice line?"* → Unit 3
- *"We only have budget for inbound calls right now — is that enough?"* → Unit 5
- *"We launched in one language — now other language speakers are showing up, what do we do?"* → Unit 6
- *"How do we make sure our architecture doesn't get locked to one AI model?"* → Unit 7
- *"Should we start with a commercial model or build our own?"* → Unit 8
- *"How do we keep a safety filter from taking down the whole system if it breaks?"* → Unit 9
- *"Do we need to centralise everyone's data into our own database?"* → Unit 10
- *"What happens if our AI provider is slow or down during peak hours?"* → Unit 11
- *"What's the right way to connect a voice system to telephony in India?"* → Unit 12
- *"Our self-hosted GPU setup isn't performing as expected — what's wrong?"* → Unit 13
- *"Who needs to sign off before we can even start building?"* → Unit 14
- *"What questions should we answer before we launch, institutionally?"* → Unit 15
- *"Who's supposed to run this once it's live — the same team that built it?"* → Unit 16, Unit 22, Unit 23
- *"How do we test for misuse or off-topic questions before going public?"* → Unit 17
- *"What's a sane rollout sequence before going fully public?"* → Unit 18
- *"Will this replace our field staff?"* → Unit 19
- *"Why do people say the call feels broken even though the answers are right?"* → Unit 20
- *"Should we launch statewide/nationwide right away, or start smaller?"* → Unit 21
- *"Where should we focus our AI cost-reduction efforts?"* → Unit 22
- *"Usage is growing fast — is that automatically a good sign?"* → Unit 23
- *"Is this really a data problem, or a coordination problem?"* → Unit 24
- *"How do we make sure a data partner's info doesn't quietly go stale?"* → Unit 25
- *"Do we need to build our own voice orchestration stack from scratch?"* → Unit 26
- *"What would actually transfer if another state or country wanted to reuse this?"* → Unit 27

---

## Provenance appendix

*Contributor-facing only. Not part of Sections 0–6 and never surfaced in adopter-facing output.*

| Source file | Covers | Notes |
|---|---|---|
| `Diffusion Library/wiki/pathways/mahavistaar.md` (as of 2026-07-26, prior version) | Section 1 (all identity fields); Section 2 (grid and all four gaps); Section 3, Units 1–27 (all); Section 4 (all six table rows); Section 5 (all three rows); Section 6 (all retrieval questions) | Primary and only source. This document is a reclassification of an existing corpus entry — written under the prior 7-category × 4-stage framework (Problem, Persona, Technology, Institution, Ecosystem, Workforce, Operating Model) — into the new 4-dimension × 4-stage unit-based framework. It is not a fresh synthesis from raw material; no new facts were introduced beyond what the prior version stated. Dimension mapping used: old Problem + old Persona → Persona; old Technology → Solution; old Institution + old Workforce + old Operating Model → Institution; old Ecosystem → Ecosystem. |

Related pathway: [Voice AI for Inclusion](voice-ai-for-inclusion.md) (horizontal synthesis across MahaVISTAAR and other voice deployments); [Bhili Language Enablement](bhili-language-enablement.md) (the language effort that plugged into MahaVISTAAR's Vasudha voice bot — referenced in Unit 6's Fix field as not detailed in the source used for this document).
