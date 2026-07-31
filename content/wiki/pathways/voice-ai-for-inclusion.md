---
type: Pathway
title: Voice AI for Inclusion
description: A cross-deployment synthesis of what MahaVISTAAR, BharatVISTAAR, Amul/Sarlaben, Jal Jeevan Mission Assam, and the Bhili effort learned about reaching users excluded by literacy, language, device access, or connectivity.
tags: [Voice AI, Inclusion, Cross-deployment]
stage: Scale
timestamp: 2026-07-31
---

# 0. Overview

A horizontal pathway synthesised across multiple voice deployments — not
one case study but the recurring implementation questions that showed up
in all of them. Source deployments: MahaVISTAAR (Maharashtra),
BharatVISTAAR, Amul/Sarlaben, Jal Jeevan Mission Assam, the Bhili
language effort, Lend A Hand, and the India–Africa exchange with Crane
AI Labs.

**Who it serves.** Female farmers, feature-phone users, Indic language
speakers, migrant labourers, rural households — users excluded by
existing digital service channels.

**Scale achieved.** MahaVISTAAR: 342K+ unique users, 1.67M+ questions
answered, 17 lakh farmers/day via proactive alerts. Amul/Sarlaben: 3.6M
farmers, launched in 3 weeks.

**Cost anchor.** ~$250K setup, ~$250K/year at MahaVISTAAR's scale
(mid-2026) — an order-of-magnitude anchor, not a voice-specific
benchmark.

**Where this pathway doesn't apply.** Built from deployments solving
access problems. If the use case is closer to internal automation, or
users are already comfortable with apps and smartphones, this won't
transfer cleanly.

# 1. Pathway identity

| Field | Value |
|---|---|
| Scale achieved | MahaVISTAAR: 342K+ unique users, 1.67M+ questions answered, 17 lakh farmers/day via proactive alerts (as of mid-2026). Amul/Sarlaben: 3.6M farmers. |
| Cost anchor | ~$250K setup, ~$250K/year at MahaVISTAAR's scale (as of mid-2026) — an order-of-magnitude anchor, not a voice-specific benchmark. |
| Build effort | 9 months (MahaVISTAAR, built from scratch) → 3 months (Ethiopia's ATI, drawing on MahaVISTAAR) → 3 weeks (Amul/Sarlaben, drawing on two full learning cycles). |
| Known downstream adopters | Ethiopia's ATI (drew on MahaVISTAAR's architecture and trust-framing); Amul/Sarlaben (drew on two prior learning cycles). |
| Scope / does not transfer when | Built from deployments solving access problems for users excluded by literacy, language, device, or connectivity. Does not transfer cleanly to internal automation use cases, or to user populations already comfortable with apps and smartphones. |

# 2. Coverage grid and gaps

| Dimension | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| Persona | ● | ● | ●● | ● |
| Solution | ●● | ●● | ● | ●● |
| Institution | ○ | ●●● | ●●● | ●●● |
| Ecosystem | ○ | ● | ○ | ● |

Density counts each unit once, at its Stage of origin (Section 3).

**Gaps**

- **No current-workaround detail behind the named excluded users (Persona).** Unit 1 names who is excluded (women farmers, dispersed interns, rural piped-water households) but doesn't record what they do instead today — the workaround itself, not just the person, is what Explore is supposed to surface.
- **No liability or compliance framing for what the bot gets wrong (Institution).** Units 13 and 14 establish who owns the channel and what it can't say, but nothing in the source addresses formal liability, legal accountability, or compliance sign-off for incorrect answers at scale.
- **No named-partner dependency map for the core voice stack (Ecosystem).** Unit 25 covers ecosystem-building for a low-resource language, but no equivalent dependency map — naming a partner for telephony, ASR, LLM, or TTS — exists for the ordinary voice stack itself.
- **No partner-performance log or contingency plan (Ecosystem).** Unit 10 covers parallel model/vendor testing before selection, but nothing in the source describes monitoring a live partner's performance mid-pilot or having a contingency if one underperforms.

# 3. Micro-innovations

## Persona

**1. Anchor the excluded-user definition to a precise sentence, not a demographic label**
- Dimension: Persona
- Stage: Explore
- Type: Strategic Decision
- Origin deployment: MahaVISTAAR; Lend A Hand; Jal Jeevan Mission Assam
- Decision: "We want to do voice AI" is a legitimate starting point only if it's quickly tied to a specific excluded user rather than left as a technology in search of a problem. Not "farmers" but "women farmers in remote districts who rely on small trust circles" (MahaVISTAAR); not "youth" but "interns across dispersed locations needing fortnightly feedback that two human callers can't keep up with" (Lend A Hand); not "citizens" but "rural households on piped water where the government needs to know if water actually arrives daily" (Jal Jeevan Mission Assam).
- Alternative considered: starting from the technology and looking for a use case afterward.
- Condition — applies when: a team already has stated interest in voice AI and needs to convert that interest into a real problem definition.
- Before → After: Not documented in the source.

**2. Treat unresolved persona definition as a resourced milestone, not a skipped step**
- Dimension: Persona
- Stage: Define
- Type: Strategic Decision
- Decision: Precise user definition is the single highest-leverage step, and sometimes a genuine luxury requiring multiple rounds of discussion. Where it can't be resolved upfront, it should be an explicit, resourced first milestone, not a formality skipped on the way to building.
- Alternative considered: treating persona definition as already settled and moving straight to build.
- Condition — applies when: the target user isn't yet precisely agreed on inside the team.
- Before → After: Not documented in the source.

**3. Size human-channel capacity honestly before positioning voice AI as extension, not replacement**
- Dimension: Persona
- Stage: Pilot
- Type: Tactical Decision
- Origin deployment: Lend A Hand
- Decision: One human caller manages 60-80 calls a day at ~₹1,000 daily wage; two callers couldn't cover the required fortnightly-feedback frequency at any wage. Voice AI was positioned to extend reach without replacing the human judgement complex cases still need.
- Alternative considered: hiring additional human callers to cover the required frequency.
- Condition — applies when: the volume/frequency required outstrips what human callers can cover regardless of staffing.
- Before → After: Two human callers at capacity, unable to meet required call frequency → voice AI extends reach to the required frequency while humans remain for complex cases.

**4. Voice-only channel design fails users who need images, quiet text, or human escalation**
- Dimension: Persona
- Stage: Pilot
- Type: Failure and Fix
- Failure: Several deployments romanticised voice and discovered later that some users needed to send images, some preferred text in noisy environments, and some needed human escalation the bot couldn't provide.
- Fix: Treat voice as the channel that opens the door, not the channel that has to complete the entire journey — add complementary channels/escalation paths where the journey requires them.
- Insight: A single channel, however well designed, can't serve every context a heterogeneous user base brings to it.
- Condition — applies when: the user base spans varied contexts (noise, literacy, complexity) that no single channel can serve alone.

**5. Trust attaches to the institution behind the voice, not to the AI itself**
- Dimension: Persona
- Stage: Scale
- Type: Strategic Decision
- Decision: Users don't trust a voice system because it's AI — they trust it because of who stands behind it. The institution behind the voice is part of the product, especially for personas with small trust networks.
- Alternative considered: Not documented in the source.
- Condition — applies when: the persona relies on small, local trust circles rather than institutional brand recognition.
- Before → After: Not documented in the source.

## Solution

**6. Five-layer voice stack, with an on-device variant for offline/edge conditions**
- Dimension: Solution
- Stage: Explore
- Type: Toolkit Asset
- Origin deployment: India–Africa exchange with Crane AI Labs (edge variant)
- Toolkit asset: A reference architecture of five layers that connect in sequence for a telephony-led use case — telephony, ASR, LLM, TTS, orchestration. In offline/edge deployments, the telephony layer may not be needed — ASR-LLM-TTS runs locally on-device instead.
- Reusable as-is: A new adopter can map their own deployment onto these five layers to decide what to build versus buy, and to recognise when the edge variant (dropping telephony) applies.
- Condition — applies when: a telephony-led deployment for the standard variant; unreliable or absent connectivity for the on-device edge variant.

**7. A capacity-and-intent lens before choosing an architecture starting point**
- Dimension: Solution
- Stage: Explore
- Type: Toolkit Asset
- Toolkit asset: Two independent lenses to apply before choosing an architecture — what capacity you already have (zero / limited / evolved technical team), and what you actually want (test quickly / scale quickly / long-term sovereignty).
- Reusable as-is: A new adopter can place themselves on both axes to identify their actual starting point, rather than an aspirational one.
- Condition — applies when: a team is choosing where to start architecturally and risks defaulting to an aspirational rather than actual position.

**8. Start bundled, plan to unbundle**
- Dimension: Solution
- Stage: Define
- Type: Strategic Decision
- Decision: A team with limited capacity testing quickly should start fully bundled without apology; a team with an evolved technical function wanting sovereignty may unbundle earlier.
- Alternative considered: unbundling components from day one regardless of team capacity.
- Condition — applies when: limited capacity and a need to test quickly (start bundled).
- Condition — fails when: an evolved technical team wants long-term sovereignty from the outset (unbundle earlier instead).
- Before → After: Not documented in the source.

**9. Ordered model-selection criteria**
- Dimension: Solution
- Stage: Define
- Type: Toolkit Asset
- Toolkit asset: A ranked model-selection checklist, in order — conversational language support (not nominal support); latency (1-2 seconds, non-negotiable on a call); sectoral precedent; long-term control; cost at scale.
- Reusable as-is: An adopter can apply the same ranked criteria directly when evaluating vendors for a live telephony use case.
- Condition — applies when: selecting a conversational/voice model for a real-time call channel.

**10. Passing benchmarks isn't the same as covering real dialects — parallel vendor testing during pilot**
- Dimension: Solution
- Stage: Pilot
- Type: Failure and Fix
- Origin deployment: not named in the source ("one deployment")
- Failure: One deployment passed every benchmark and then hit a dialect gap its test group hadn't covered.
- Fix: Use metrics to reject a model, use real users to select it — shortlist multiple vendors and test them in parallel during the pilot.
- Insight: There's no shortcut around real-user testing for coverage gaps that a benchmark's test group simply didn't include.
- Condition — applies when: usage-based vendor pricing makes parallel testing cheap relative to the lock-in risk it removes.

**11. Voiceera: an open-source, agnostic orchestration layer**
- Dimension: Solution
- Stage: Scale
- Type: Toolkit Asset
- Toolkit asset: Voiceera — open-source, model-agnostic, language-agnostic, telephony-provider-agnostic orchestration software that connects telephony, ASR, LLM, and TTS into one deployable system.
- Reusable as-is: An adopter can use Voiceera directly instead of building custom orchestration between components, avoiding vendor lock-in at any one layer.
- Condition — applies when: the recurring gap is not a lack of language models but the absence of an orchestration layer connecting them.

**12. WebSocket over WebRTC for Indian telephony conditions**
- Dimension: Solution
- Stage: Scale
- Type: Tactical Decision
- Decision: WebSocket APIs proved more practical than WebRTC for Indian telephony conditions specifically.
- Alternative considered: WebRTC.
- Condition — applies when: operating under Indian telephony infrastructure conditions specifically.
- Before → After: Not documented in the source.

## Institution

**13. Name an accountable channel owner before launch**
- Dimension: Institution
- Stage: Define
- Type: Strategic Decision
- Decision: Who owns this channel and is accountable for its output must be answered before launch, not deferred. A voice agent can be technically ready and institutionally homeless — no owner, no update process, nobody accountable when it fails.
- Alternative considered: deferring ownership until after launch.
- Condition — applies when: a voice channel is about to launch in an institution's name.
- Before → After: Not documented in the source.

**14. Define what the bot is not allowed to say before launch**
- Dimension: Institution
- Stage: Define
- Type: Strategic Decision
- Decision: What the bot is not allowed to say must be answered before launch, not deferred, alongside channel ownership.
- Alternative considered: relying on general prompting without an explicit boundary definition.
- Condition — applies when: a voice channel speaks in an institution's name and its outputs carry institutional weight.
- Before → After: Not documented in the source.

**15. Voice AI should extend human capacity by explicit design, not default to replacement**
- Dimension: Institution
- Stage: Define
- Type: Strategic Decision
- Decision: Voice AI should extend human capacity, not automatically replace it — this has to be a design decision made explicitly, not an afterthought.
- Alternative considered: designing voice AI as a straightforward replacement for human agents.
- Condition — applies when: an institution already has human agents/callers performing a related function.
- Before → After: Not documented in the source.

**16. Two-phase operating model: validate first, then scale**
- Dimension: Institution
- Stage: Define
- Type: Playbook
- Playbook: (1) Validate — prove voice is the right channel for a specific user, problem, and institutional context, using a narrow use case and a bundled provider. Only once that's proven: (2) Scale — unbundle components where it matters, separate data ownership from the AI layer, plan multilingual expansion, build the safety bank, and set up monitoring.
- Note: Not documented in the source whether skipping the validate phase was attempted or what happened when it was.
- Condition — applies when: an institution is building out a voice channel in phases rather than committing to full scale immediately.
- Before → After: Not documented in the source.

**17. Pre-launch safety/stress-test bank**
- Dimension: Institution
- Stage: Pilot
- Type: Toolkit Asset
- Toolkit asset: A stress-test bank covering out-of-scope questions, distress, harassment, romantic/inappropriate prompts (especially relevant with a female voice), jailbreak attempts, and escalation triggers — built before public launch.
- Reusable as-is: An adopter can build their own test bank directly from these named categories rather than discovering them live with real users.
- Condition — applies when: launching a voice channel in an institution's name, particularly one using a female voice.

**18. Staged institutional testing gate**
- Dimension: Institution
- Stage: Pilot
- Type: Playbook
- Playbook: Institutional testing proceeds in stages, each gating the next — builder team, then a small institutional group, then a wider group across geographies and accents, then a limited public rollout.
- Note: Don't outsource trust to a vendor — the institution itself has to run this progression rather than delegate it.
- Condition — applies when: preparing a voice channel for public rollout.
- Before → After: Not documented in the source.

**19. Split interactions by type: AI for structured, humans for high-risk**
- Dimension: Institution
- Stage: Pilot
- Also relevant at: Scale
- Type: Tactical Decision
- Decision: The right design is almost always a combination — voice AI handles repeated, structured, scalable interactions; humans handle sensitive, complex, ambiguous, or high-risk cases. At scale, this is named explicitly as extension officers and human agents handling the relationship while the system handles the routine, off-hours question — a division of labour that has to be named, not assumed.
- Alternative considered: framing voice AI as a human replacement.
- Condition — applies when: interaction types genuinely vary in sensitivity and complexity.
- Condition — fails when: framed purely as replacement — this loses institutional trust quickly.
- Before → After: Not documented in the source.

**20. Dead air during backend fetch breaks the feel of the call**
- Dimension: Institution
- Stage: Pilot
- Type: Failure and Fix
- Failure: Dead silence during a backend data fetch made the call feel broken rather than alive.
- Fix: A hold message plus targeted latency work.
- Insight: Small experience choices decide whether a call feels alive or broken — perceived responsiveness matters as much as actual latency.
- Condition — applies when: any turn requires a backend round-trip long enough to be perceptible to the caller.

**21. Call-experience design heuristics**
- Dimension: Institution
- Stage: Pilot
- Type: Toolkit Asset
- Toolkit asset: A short set of call-design heuristics — introductions under 30 seconds; lighter follow-up prompts for a public-service tone rather than a commercial one; simpler yes/no question design where it improves accuracy more than a better model would.
- Reusable as-is: An adopter can apply these heuristics directly when scripting their own voice flows.
- Condition — applies when: designing telephony-based conversational scripts for public-service, non-commercial contexts.

**22. Scale-readiness checklist: control, not just uptime**
- Dimension: Institution
- Stage: Scale
- Type: Toolkit Asset
- Toolkit asset: A four-point scale-readiness check — can the institution change vendors, update data, monitor failures, and govern safety, without the founding team?
- Reusable as-is: An adopter can run this same four-point check against their own deployment before committing to scale.
- Condition — applies when: assessing whether an institution is genuinely ready to scale, as opposed to merely live.

**23. Cost-tracking dimensions from pilot onward**
- Dimension: Institution
- Stage: Scale
- Also relevant at: Pilot
- Type: Toolkit Asset
- Toolkit asset: Cost is shaped by architectural decisions, not just negotiation — premium TTS, proprietary LLMs, Indic tokenisation, agentic tool calls, and long conversations all drive cost at scale. Track cost per minute, per interaction, by language, and for failed calls, starting from pilot onward.
- Reusable as-is: An adopter can adopt the same four cost dimensions as their own monitoring framework from pilot onward, rather than discovering cost drivers only once at scale.
- Condition — applies when: an architecture involves any of premium TTS, proprietary LLMs, Indic tokenisation, agentic tool calls, or long conversations.

**24. Named continuous-improvement ownership, or the system degrades invisibly**
- Dimension: Institution
- Stage: Scale
- Type: Strategic Decision
- Decision: The work doesn't end at launch — someone must own continuous improvement, or the system degrades invisibly.
- Alternative considered: treating launch as the end state with no dedicated ongoing ownership.
- Condition — applies when: a voice channel has moved from pilot into ongoing operation.
- Before → After: Not documented in the source.

## Ecosystem

**25. For low-resource languages, the ecosystem is the deliverable, not the dataset**
- Dimension: Ecosystem
- Stage: Define
- Type: Strategic Decision
- Decision: For low-resource languages, the ecosystem — native speakers, annotators, linguistic experts, model builders, hosting infrastructure, a real-world application, a neutral convening authority — is the actual deliverable. A dataset is one output of building that ecosystem, not the goal itself.
- Alternative considered: treating a completed dataset as the end goal of the work.
- Condition — applies when: building for a language with no existing ecosystem of speakers, annotators, or tooling in place.
- Before → After: Not documented in the source.

**26. Size data requirements to the use case, not a generic assumption**
- Dimension: Ecosystem
- Stage: Scale
- Type: Strategic Decision
- Origin deployment: Jal Jeevan Mission Assam; MahaVISTAAR
- Decision: Not every deployment needs a large dataset. Jal Jeevan Mission Assam needed phone numbers and five questions; MahaVISTAAR needed multiple live, governed data sources. The minimum viable data requirement comes from the use case, not from generic assumptions.
- Alternative considered: assuming every deployment requires a large dataset regardless of use case.
- Condition — applies when: sizing data requirements for a new deployment.
- Before → After: Jal Jeevan Mission Assam (minimal: phone numbers plus five questions) and MahaVISTAAR (multiple live, governed data sources) each sized to their own use case rather than a shared generic assumption.

# 4. Toolkits and playbooks

| Unit | Type | Reuse condition |
|---|---|---|
| 6 | Toolkit Asset | Applies to any telephony-led voice deployment; the on-device variant applies where connectivity is unreliable. |
| 7 | Toolkit Asset | Applies when choosing an architecture starting point and at risk of defaulting to an aspirational rather than actual position. |
| 9 | Toolkit Asset | Applies when selecting a conversational/voice model for a real-time call channel. |
| 11 | Toolkit Asset | Applies when the gap is orchestration, not the absence of language models. |
| 16 | Playbook | Applies when building out a voice channel in phases rather than committing to full scale immediately. |
| 17 | Toolkit Asset | Applies when launching a voice channel in an institution's name, particularly with a female voice. |
| 18 | Playbook | Applies when preparing a voice channel for public rollout. |
| 21 | Toolkit Asset | Applies when designing telephony scripts for public-service, non-commercial contexts. |
| 22 | Toolkit Asset | Applies when assessing genuine scale-readiness, not just liveness. |
| 23 | Toolkit Asset | Applies when architecture includes premium TTS, proprietary LLMs, Indic tokenisation, agentic tool calls, or long conversations. |

# 5. Problem→solution patterns

| Problem | Root cause | Solution | Result | Condition |
|---|---|---|---|---|
| Voice-only channel leaves some users unable to complete their journey | Some users need to send images, some prefer text in noisy environments, some need human escalation the bot can't provide | Treat voice as the entry channel, not the whole journey — add complementary channels/escalation paths | Users complete the journey through the channel suited to their situation | Applies when the user base spans varied contexts (noise, literacy, complexity) |
| A model passes every benchmark, then fails in the field on an uncovered dialect | Benchmark/test-group coverage didn't include the dialect actually encountered in deployment | Use benchmarks only to reject candidates; use parallel real-user testing with shortlisted vendors during pilot to select | Dialect gap caught before full-scale rollout, at marginal added cost | Applies when usage-based vendor pricing makes parallel testing cheap relative to lock-in risk |
| Calls feel broken during backend data fetches | Dead silence with no acknowledgment while the system retrieves data | Add a hold message plus targeted latency work | The call feels alive and responsive instead of dead during fetch waits | Applies when any turn requires a backend round-trip long enough to be perceptible to the caller |

# 6. Retrieval guide

*"How do we describe our target user precisely instead of a broad demographic label?"* → Unit 1

*"We can't get everyone to agree on exactly who this is for — is that a blocker?"* → Unit 2

*"Should voice AI replace our human callers entirely?"* → Unit 3, Unit 15, Unit 19

*"Users keep asking for things voice alone can't handle — what does that mean?"* → Unit 4

*"Whose trust are we actually building — the AI's or someone else's?"* → Unit 5

*"What components do we need to stitch together for a phone-based voice assistant?"* → Unit 6

*"We don't have much of a technical team yet — where should we start?"* → Unit 7

*"Should we build everything ourselves or use a bundled vendor first?"* → Unit 8, Unit 16

*"How do we pick a model or vendor for a voice deployment?"* → Unit 9

*"Our model passed every benchmark — are we ready to launch?"* → Unit 10

*"What's actually missing in the voice AI tooling landscape right now?"* → Unit 11

*"WebRTC or WebSocket for our telephony integration?"* → Unit 12

*"Who owns this channel once it's live?"* → Unit 13

*"What is the bot not allowed to say?"* → Unit 14

*"How do we test for safety before public launch?"* → Unit 17, Unit 18

*"How do we split work between the AI and our staff?"* → Unit 15, Unit 19

*"Why does the call feel awkward or broken partway through?"* → Unit 20, Unit 21

*"Are we actually ready to scale, or just live?"* → Unit 22

*"How do we track cost once we're at scale?"* → Unit 23

*"The system feels like it's degrading since launch — is that normal?"* → Unit 24

*"We're building for a language with almost no digital presence — where do we start?"* → Unit 25

*"How much data do we actually need before we can launch?"* → Unit 26

---

## Provenance appendix

| Source file | Covers | Notes |
|---|---|---|
| `voice-ai-for-inclusion.md` (previous version, 7-category framework, timestamp 2026-07-26) | Section 1 (all fields); Section 2 (grid and gaps); Section 3 Units 1–26 (all); Section 4; Section 5; Section 6 | Reclassification of an existing corpus entry into the new 4-dimension framework — not a synthesis from fresh raw material. Same underlying facts, decisions, and examples as the prior version; re-tagged by dimension/sub-category/stage/type and restructured into the Sections 0–6 format. No new source material consulted. |
