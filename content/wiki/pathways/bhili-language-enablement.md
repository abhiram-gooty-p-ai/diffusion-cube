---
type: Pathway
title: Bhili Language Enablement for Voice AI
description: Bringing Dehwali Bhili, a zero-digital-resource tribal language, into ASR/NMT/TTS and into MahaVISTAAR's live voice bot — from a near-miss isolated data-collection effort to a district-to-state replication playbook.
tags: [Voice AI, Language, Tribal Inclusion]
sector: Agriculture
stage: Pilot
timestamp: 2026-08-31
contributor: EkStep Foundation
---

# 0. Reading Guide

This is not a case study — it documents what was built. This is a pathway — the marked trail Project Astitva's team left for the next adopter bringing a new language onto the AI map.

Most of what matters here lives in three kinds of source: a structured interview with EkStep's Voice and Language AI lead (the programme-level view — decisions, models, cost, sustainability); eight field interviews recorded in Nandurbar with the district's own team, contributors, and farmers (the ground-level view — what the work actually felt like, what broke, what a live field test of the helpline showed); and the district's own published replication handbook. Where these three views agree, that's the strongest signal. Where they add detail to each other, both are kept.

Reusable value concentrates in Section 3 (eight tagged decisions, failures, and reusable assets, each with a condition tag) and Section 4 (the one fully reusable toolkit this deployment produced). Navigate by dimension if you're weighing a specific kind of decision (Persona = who this is for, Solution = what got built, Institution = who owns and governs it, Ecosystem = who else has to show up), or by stage if you know where your own effort stands (Explore = should we do this at all, Define = what has to be decided before recording starts, Pilot = what breaks with real users, Scale = can this run without its founding champion).

# 1. Pathway Identity

| Field | Value |
|---|---|
| Deployment name | Project Astitva — Dehwali Bhili Language Enablement |
| Sector | Agriculture (voice-first government advisory) |
| Geography | Nandurbar district, Maharashtra — extends to Bhili-speaking populations across Madhya Pradesh and Rajasthan |
| Population served | 10 million+ Dehwali Bhili speakers nationally; within Nandurbar, tribal community members specifically — particularly women farmers with smaller advice networks, limited exposure to Marathi, and reduced access to government schemes reaching everyone else |
| Stage reached | Pilot — text and voice chat live inside MahaVISTAAR's Vasudha bot since ~26 May 2026; a standalone telephony/IVR line was in active field testing as of the August 2026 site visit, targeted for full rollout before October 2026 |
| Contributing organisation(s) | District Administration, Nandurbar (convening authority); Karya (data collection platform); Bhashini/ULCA (national hosting); AI4Bharat/IIT Madras (model building); Voicera (voice stack / telephony integration learnings); State Agriculture Department & POCRA (deployment into MahaVISTAAR); EkStep Foundation (cross-stakeholder orchestration) |
| Key dates (as of Aug 2026) | Data collection: ~1 month, standing start; models live in MahaVISTAAR app: ~26 May 2026; telephony/IVR field testing: August 2026; full telephony rollout targeted: before October 2026 |
| Summary | A district-run effort to collect Dehwali Bhili voice and translation data, discovered running in isolation from the national model-building ecosystem and then connected to it, produced the first tribal-language voice AI stack built from zero digital presence — now a live, if still-tuning, feature inside Maharashtra's agricultural advisory bot, and an explicit replication playbook for the next language. |
| Scale/impact achieved (as of Aug 2026) | 25,000 agricultural + 15,000 non-agricultural sentences (translation pairs); 60,000+ voice samples; ~60 hours spontaneous speech, ~6 hours studio speech, ~2 hours conversational speech per the booklet's later count (Otter interview cites ~500 hours as a longer-run target, not what Phase 1 actually delivered); live inside MahaVISTAAR's Vasudha voice bot and the MahaDBT-adjacent advisory channel; three further languages (Mathwadi Bhili, Mavchi, Pawari) queued using the same playbook |

# 2. Effort Details

**Cost anchor (as of Jul 2026).** Phase 1 cost roughly ₹27 lakh, fully government-funded. Close to ₹20 lakh of that went directly back to community contributors — paid per task, with reported rates around ₹1 per word to validate and ₹2 per word to transcribe/translate; one lead validator's per-task rate is separately documented at ₹500/₹6,000 per 10-minute conversational block (₹3,000 per partner per 12-task batch). Model training itself was subsidised by AI4Bharat in exchange for open data access — not a cash cost to the district.

**Build effort.** One month for the first data-collection phase, involving a 22–25 person field contributor team (selected from a ~70-person taluka agriculture staff pool by the Taluka Agriculture Officer), a small central studio team recording 10–12 hours a day in an existing community radio station, at least five named institutional partners, and a single lead district champion (the District Collector) coordinating across all of them. Roughly 100 days end to end from first recording to a live public feature.

**Downstream adoptions.** None yet formally documented as live deployments by other adopters — but the same playbook is already committed to three further languages (Mathwadi Bhili, Mavchi, Pawari), with Bodo and Garo named as later candidates, and the district has published its own four-step replication handbook (see Unit 8) explicitly for other districts to pick up.

## The 4×4 Coverage Grid

Density reflects where this pathway's units originate (Stage of origin only — see Section 3), not where a topic is discussed in passing.

| | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| **Persona** | ●● (Unit 1) | ○ | ● (helpline field test, no numbered unit — see gaps) | ○ |
| **Solution** | ○ | ●●● (Units 2, 3) | ● (validator/dialect friction, folded into Unit 5) | ○ |
| **Institution** | ●● (Unit 4) | ●● (Unit 5) | ●● (Unit 6) | ○ |
| **Ecosystem** | ○ | ●● (Unit 7) | ○ | ●● (Unit 8) |

**Where this is thin.** Persona/Explore's "current workaround" component (what excluded women actually did before this existed — informal relay through male family members, unregulated shopkeeper advice) is implied across several sources but never stated as a clean, citable fact — flagged as a gap rather than invented. Solution/Pilot and Solution/Scale have no reported Word Error Rate, BLEU, or Mean Opinion Score numbers despite the framework calling for them explicitly at this stage — the EkStep interview describes the evaluation approach in principle but the actual figures were not shared in any source reviewed. Institution/Scale and Ecosystem/Define-onward data-SLA formalisation are not documented with the same specificity as the Explore/Define material — see Section 2 gaps below for the full list.

## Gaps

1. No stated Word Error Rate, BLEU, or Mean Opinion Score figures for the live ASR/NMT/TTS models, despite these being named as the standard evaluation yardsticks in the EkStep interview itself. *(Solution/E, Pilot)*
2. No documented "current workaround" for the specifically excluded population (tribal women) before this service existed — barriers are named, the prior behaviour is not. *(Persona/B, Explore)*
3. No named budget line or recurring funding commitment for Scale-stage operation, beyond the general statement that ownership has "transitioned to the state." *(Institution/F, Scale)*
4. No documented formal data SLA (cadence, accountability) between the state agriculture department and any external data source feeding the live advisory answers, unlike the mandi-price SLA pattern documented in the related MahaVISTAAR pathway. *(Ecosystem/B, Scale)*
5. No account of what happened to the roughly 5–8 of the original 22–25 field contributors who did not complete the work — attrition is mentioned by the Taluka Agriculture Officer but not why, or what (if anything) was done about it. *(Ecosystem/E, Pilot)*
6. No documented mechanism for a Bhili speaker to flag a wrong or unhelpful helpline answer back to the model-building team — the interview describes model-side monitoring, not a user-facing feedback path. *(Institution/C, Pilot)*
7. No stated criteria for when the standalone telephony/IVR line — still in field testing as of August 2026 — will be judged ready for full public rollout, beyond a target date. *(Solution/E, Pilot)*

# 3. Micro-Innovations

## Persona

**1. Center the specific population digital infrastructure keeps invisible, not "the language" in the abstract**
- Dimension: Persona
- Stage: Explore
- Type: Strategic Decision
- Decision: Frame the effort around a named excluded person and the service they can't access, not around the language as a technical artifact.
- Alternative considered: Approach the project as "build Bhili AI resources" for the language generally.
- Why: A district collector who had earlier served in a different tribal posting had already seen that speaking to people in their own language changes the entire dynamic of a service interaction — Marathi-only advisory left tribal women, who travel less and had the least Marathi exposure of anyone in the community, most cut off from agriculture, health, and education schemes.
- What this looked like here: In the collector's own words, discussing the broader reframe the project forced: "Let's be careful when we say low-resource languages. They are not low-resource cultures. They are not low-resource communities. They are low-resource in our digital imagination." The project's stated aim was explicitly to reach "the last mile of society," with women in tribal communities named as the specific group at greatest risk of exclusion.
- Condition — applies when: The population most excluded by a digital service is identifiable and named, not a diffuse "everyone who speaks language X."
- Condition — fails when: The language effort has no specific service or excluded user in mind — the framework document's own related caution applies: "don't begin with 'let's build a model for this language.'"

## Solution

**2. Design for the phone call people will actually make, not the clean recording it's easy to collect**
- Dimension: Solution
- Stage: Define
- Type: Failure and Fix
- Failure: An earlier, separate attempt at Bhili data collection (before EkStep's involvement) gathered clean, studio-style audio without a specific deployment in mind and without a hard deadline. That data performed poorly once tested against real conditions.
- Fix: Once the effort was tied to MahaVISTAAR, sampling shifted deliberately toward spontaneous, conversational speech, including a meaningful share captured at 8kHz phone-call quality — matched to how a rural user actually reaches the service, by voice call, not through a clean microphone.
- Insight: A model trained only on clean, studio-style audio from careful readers fails the moment it meets a real, noisy phone call — telephony-grade sampling has to be designed in from session one, not bolted on once the first version underperforms.
- What this looked like here: The district's own field studio still recorded under real constraints — one engineer's account of the process describes losing an entire day's recording batch to background noise, after which the studio adopted a standing rule of always producing a rough draft, a rough-final, and a final pass, and re-testing the full setup before any new recording block began.
- Condition — applies when: The end deployment is a voice channel real users will reach by phone, especially over variable-quality rural connections.
- Condition — fails when: The deployment is a controlled, high-bandwidth channel where studio-quality audio genuinely reflects real usage conditions.

**3. Fine-tune an existing model from a related, higher-resource language rather than building from zero**
- Dimension: Solution
- Stage: Define
- Type: Tactical Decision
- Decision: Build Dehwali Bhili's ASR/NMT/TTS stack by fine-tuning an existing Marathi model rather than training new architecture from scratch.
- Alternative considered: An earlier working assumption budgeted for only a translation (NMT) and text-to-speech (TTS) model, leaving out a full speech-recognition (ASR) component.
- Why: A technical reviewer insisted the effort "will not have anything that's not a full model" — meaning ASR had to be included for the system to be genuinely usable by voice, not just text.
- What this looked like here: Adding the ASR component raised the project's model-training cost estimate by roughly 2.5×, which briefly stalled budget approval until the data-collection partner (Karya) agreed to help absorb the difference because, in the district collector's account, "if there's extra money, we'll pitch in — it's important that it be done."
- Condition — applies when: A genuinely low-resource language has a linguistically related, higher-resource neighbour language with existing model infrastructure to bootstrap from.
- Condition — fails when: No related higher-resource language model exists to fine-tune from, or the target language's structure diverges too far from any available base model.

## Institution

**4. Anchor the effort to one personally-invested administrative champion before any technical work begins**
- Dimension: Institution
- Stage: Explore
- Type: Strategic Decision
- Decision: Let the effort be personally driven and coordinated by the District Collector, rather than delegated to a technical team or vendor.
- Alternative considered: None documented — every account of the project's origin, from the district side and from EkStep independently, converges on the collector's direct, hands-on involvement as the starting condition, not an option weighed against alternatives.
- Why: District-level administrative authority was needed to converge multiple line departments (agriculture, education, health, tribal welfare) and unlock delegated financial powers that no single department could access on its own.
- What this looked like here: The collector described her own stake directly: prior tribal-area postings had already shown her that "when I speak in their language ... suddenly you see a different [dynamic] — people are listening in their own language." She personally chaired the stakeholder meeting that decided which language to prioritise, personally addressed a 150-person community meeting to answer "why are we doing this," and remained hands-on enough to say the district's biggest continuing frustration is present tense, not resolved.
- Condition — applies when: The deployment needs to converge multiple government departments and community trust simultaneously, and no single technical team can unlock either alone.
- Condition — fails when: The effort sits entirely within one department's mandate and doesn't require cross-department data or community mobilisation.

**5. Run a three-tier quality structure — contributors, checkers, validators — in parallel from day one, staffed through local administration**
- Dimension: Institution
- Stage: Define
- Also relevant at: Pilot
- Type: Toolkit Asset
- Toolkit asset: A standing three-layer structure — field contributors and participants at the base, checkers/reviewers in the middle, subject-matter validators and linguistic experts at the top — with all three layers working simultaneously rather than validation happening only after collection finishes.
- Purpose: Catches quality problems (mixed-dialect speech, contributors who don't actually know the language well, inconsistent translations) while collection is still happening, instead of discovering them in a finished dataset.
- Reusable as-is: The tier structure itself, plus the recruitment principle behind it — contributors were sourced through local government departments (agriculture, education, health, revenue), not through an external vendor's hiring pipeline, because the administration already knew who was fluent, literate, and trusted locally. One field example: the taluka's own agriculture assistant officer became the single named validator for the entire district's data, personally building a roughly 3,000-word glossary and catching cases where a recorded "Bhili" speaker was actually mixing in Marathi or a neighbouring dialect (Mavchi) closely enough to need exclusion from the dataset.
- Condition — applies when: The language has meaningful dialect variation, and credible, trusted contributors are more easily found through existing local institutions than through an open call.
- Condition — fails when: No local administrative network already touches speakers of the target language, or the language has no meaningful internal dialect variation to validate against.

**6. Scope the live assistant to answer only what the institution is prepared to stand behind**
- Dimension: Institution
- Stage: Pilot
- Type: Strategic Decision
- Decision: Limit the deployed helpline's answers strictly to farming-related questions, explicitly declining market-rate, scheme, or other out-of-scope queries rather than attempting a general-purpose answer.
- Alternative considered: Answering broadly across whatever the caller asked, using general capability rather than a scoped mandate.
- Why: A government-branded voice service speaks in the department's name — every answer it gives is one the department has to be able to stand behind, so scope has to match what's actually been validated, not what the model happens to be able to generate.
- What this looked like here: In a live field demonstration, a farmer asked the helpline about a cotton pest and a scheme question in the same call; the system answered the farming question directly and stated plainly, "I will answer only farming-related questions," declining the scheme question outright rather than guessing at it. A separate live test showed the same discipline when asked for a same-day mandi price the system did not have current data for: it said the information wasn't available, rather than approximating an answer.
- Condition — applies when: The deployment speaks with institutional authority (a government brand, a named department) and answering wrongly carries more cost than answering narrowly.
- Condition — fails when: The deployment is explicitly framed as general-purpose or experimental, where users expect and tolerate broader, less certain answers.

## Ecosystem

**7. Don't let parallel efforts on the same language run in isolation from each other**
- Dimension: Ecosystem
- Stage: Define
- Type: Failure and Fix
- Failure: The district's own Bhili data-collection effort with Karya had already been running for some time, entirely independent of the national voice-AI model-building ecosystem (AI4Bharat, Bhashini) — a separate team was simultaneously building an unrelated agriculture advisory bot and only discovered the Nandurbar effort by chance while working with the same state department.
- Fix: Once discovered, EkStep connected the district's data-collection track to the model-building side, bringing AI4Bharat/IIT Madras (six years and 10,000+ hours of prior language-model experience), Bhashini (national hosting and GPU access), Voicera (open-source voice-stack and telephony-integration expertise), and the state agriculture department's deployment channel into a single coordinated effort rather than two disconnected ones.
- Insight: A capable, well-intentioned local effort can still fail to produce a usable model simply because nobody who could build one knew it existed — discovery, not capability, was the actual constraint.
- Condition — applies when: Multiple institutions might plausibly already be working on pieces of the same low-resource-language problem without visibility into each other.
- Condition — fails when: A single institution already controls both the data-collection and model-building capability end to end.

**8. Publish the replication steps as an explicit handbook for the next adopter, not an internal report**
- Dimension: Ecosystem
- Stage: Scale
- Type: Playbook
- Playbook: The district's own published four-step sequence for another district or language to follow — (1) Assess Needs: a local assessment of linguistic and agricultural priorities; (2) Build Partnerships: engage local NGOs, cooperatives, and the agriculture department; (3) Develop Content & Tools: adapt advisory content into the local language using voice-based tools; (4) Deploy & Train: launch the platform and train field staff and local resource persons.
- Note: The handbook itself names what not to rush ahead of validation — quality over speed, and validation and use-case testing before wider expansion — a common failure mode being treating the four steps as a race rather than a gate at each stage.
- Condition — applies when: The next adopter has, or can build, the same kind of convening authority (a district-level or equivalent administrative anchor) this playbook assumes at step 2.
- Condition — fails when: No equivalent local administrative convening authority exists to execute steps 2 and 4 — the playbook's steps assume that authority is already in place, not that it needs to be created from nothing.

# 4. Toolkits and Playbooks

| # | Asset | Type | Reuse condition |
|---|---|---|---|
| 5 | Three-tier quality structure (contributor → checker → validator, run in parallel, staffed via local administration) | Toolkit Asset | Applies where local government departments already have credible, trusted speakers of the target language on staff. |
| 8 | Four-step district replication handbook (Assess Needs → Build Partnerships → Develop Content & Tools → Deploy & Train) | Playbook | Applies where a district or equivalent administrative body can convene departments and community trust; fails without an equivalent convening authority. |

# 6. Retrieval Guide

*"How do I get people to trust a government-branded voice AI enough to use it?"* → Unit 1, Unit 4, Unit 6

*"Our first data collection didn't produce a usable model — why?"* → Unit 2

*"Should we train our own model from scratch for a low-resource language?"* → Unit 3

*"Who needs to personally own this before we start?"* → Unit 4

*"How do we make sure our contributors are actually fluent, and catch it when they're not?"* → Unit 5

*"Should our AI assistant try to answer anything a user asks?"* → Unit 6

*"We think another team might already be working on this — does it matter?"* → Unit 7

*"We want to expand to another district or language using what worked here — where do we start?"* → Unit 8

*"What did a real user's first live call with the system actually look like?"* → Unit 6 (field-demonstration evidence), Gap 1

---

## Source Trace

*Contributor-only — not surfaced to adopters.*

| Source file | Covers | Notes |
|---|---|---|
| Otter Summary_Bhili.pdf / Otter_Bhili_transcript.pdf (interview with Santosh Kevlani, EkStep, 22 Jul 2026) | Section 1 (scale, cost, dates); Section 2 (build effort, cost anchor); Units 3, 7; sustainability and evaluation-approach material in Gaps 1, 3, 4 | Primary source for programme-level decisions, cost, and sustainability framing. Summary PDF confirms the transcript's content, doesn't add beyond it. |
| NANDURBAR TRIP — Transcriptions.pdf, Interview 1 (Dr. Mitali Sethi, District Collector) | Units 1, 4; Section 1 population/summary framing | Primary source for the champion narrative and the "digital imagination" framing quote. |
| NANDURBAR TRIP — Transcriptions.pdf, Interview 2 (Jaywant, Radio Vikas Bharati) | Unit 2 (studio recording/QA process detail) | Primary source for the audio-production side of Unit 2. |
| NANDURBAR TRIP — Transcriptions.pdf, Interviews 3 & 4 (farmers Ravi and Govan, live helpline field tests) | Unit 6; Gap 1, Gap 7 | Primary source for the only direct field evidence of the live system's real-user behaviour, including the refusal-design demonstration and the unavailable-mandi-rate response. |
| NANDURBAR TRIP — Transcriptions.pdf, Interview 5 (Agriculture extension officer) | Gap 6 (feedback-loop absence); background for Section 2 grid notes | Confirms only — describes existing field-advisory workflow, not model-specific new information. |
| NANDURBAR TRIP — Transcriptions.pdf, Interview 6 (Santosh, Karya contributor) | Section 2 (per-task/per-word compensation figures); Unit 5 (contributor-side detail) | Primary source for the specific compensation numbers cited in Section 2. |
| NANDURBAR TRIP — Transcriptions.pdf, Interview 7 (Raveeshankar, Taluka Agriculture Officer) | Unit 5 (recruitment and validator detail); Gap 5 (contributor attrition) | Primary source for the local-administration-led recruitment account and the 22–25 → 17–18 contributor attrition figure. |
| NANDURBAR TRIP — Transcriptions.pdf, Interview 8 (Tunsidas "Tike," lead validator) | Unit 5 (glossary, validation detail, dialect-mixing exclusion) | Primary source for the named validator example and the ~3,000-word glossary figure. |
| Astitva Booklet.pdf | Unit 8; Section 1 (partner roles, "transitioned to state" institutionalisation); Section 2 grid Ecosystem/Scale note | Primary source for the published four-step replication handbook and the district-to-state institutionalisation framing. |
| Bhili_Interview Questions (July 22nd)_.docx | Cross-checked against Units 1, 3, 4, 7, 8; Gaps 1–7 (used as the open-questions list, Tab 2) | Confirms the shape of the EkStep interview above; its own "Questions to close information gaps" tab is the direct source for this document's Gaps list. |
| Executive Summary/Bhili_Executive_Summary.docx | Confirms Units 2, 3, 7, 8 and Section 1/2 figures | An earlier synthesis of the same underlying interviews and booklet — confirms, doesn't add beyond what the primary sources above already establish. |
| Extended Pathway/Bhili pathway v1.docx | Confirms overall structure and framing of Units 3, 4, 7, 8; superseded by this document as the pathway's live version | An earlier full draft of this same pathway, produced before the Nandurbar field interviews existed. Superseded — every claim it makes is independently re-sourced above from primary interviews rather than carried over from this draft directly. |
| Low Resource Language AI Map Draft 1.1.docx/.pdf | Not used | General landscape document, not specific to the Bhili deployment — nothing from it made it into this document. |
