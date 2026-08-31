---
type: Pathway
title: Blue Dots — Local Job, Talent, and Service Discovery
description: Open voice-AI discovery infrastructure making local jobs, talent, and services findable within a district, modelled on what UPI did for payments — from two district deployments and the open questions the next one still needs answered.
tags: [Voice AI, Livelihoods, Digital Public Goods]
sector: Livelihoods
stage: Scale
timestamp: 2026-08-31
contributor: EkStep Foundation
---

# 0. Reading Guide

This pathway has two contributors with two different jobs. Tushar's material — a full narrative pathway document, executive summary, and interview — is the primary source for everything below: it documents Dharwad (the pioneer district) and Ghaziabad (the second, four months instead of ten). Gaurav Gupta, Chief Growth Officer at EkStep Foundation and Lead Architect of the Blue Dots initiative, contributed a distinct, second thing: a list of the specific questions this pathway does not yet answer — state-level ownership handover, verification maturity, and expansion beyond jobs into other "Dots" initiatives. Rather than guess at answers neither source material actually gives, those questions are carried through as this document's own Gaps section — this is what an honest second contribution looks like when the answers aren't there yet.

Reusable value concentrates in Section 3's architecture units (the open-rails and DPG decisions are the most consequential and hardest-to-reverse choices in this pathway) and in Section 4's toolkit table.

# 1. Pathway Identity

| Field | Value |
|---|---|
| Deployment name | Blue Dots — open voice-AI discovery infrastructure for local jobs, talent, and services |
| Sector | Livelihoods (piloted; the team is already testing the same local-discovery frame for tourism, local services, and agriculture) |
| Geography | Dharwad, Karnataka (pioneer district, 2024); Ghaziabad, Uttar Pradesh (second district); scaling now underway across multiple districts in Uttar Pradesh and Karnataka |
| Population served | Job seekers and citizens — especially women re-entering work, persons with disabilities, first-generation graduates, and daily-wage workers — SMBs and service providers, local ecosystem aggregators (ITIs, MSME associations, NGOs), district administrations, and private innovators |
| Stage reached | Scale (multi-district rollout underway), though individual verification and the expansion beyond jobs remain open per Gaps below |
| Contributing organisation(s) | EkStep Foundation; Dharwad and Ghaziabad district administrations; local aggregators (ITIs, MSME associations) |
| Key dates | Dharwad: 2024, pioneer deployment, ~10 months to a self-sustaining ecosystem. Ghaziabad: second district, ~4 months. As of July 2026. |
| Summary | Shared, open digital rails — explicitly modelled on UPI — that make local jobs, talent, and services visible to each other within a district via a 2–3 minute voice call, built as reusable Digital Public Goods rather than a platform any one organisation owns. |
| Scale/impact achieved (as of Jul 2026) | Ghaziabad: fewer than 10% of the district's SMBs surfaced on the shared map made 10,000+ local job openings visible in under 60 days. Dharwad: one MSME association onboarded 300+ employers in two weeks; one ITI onboarded 500+ seekers in the same window. |

# 2. Effort Details

**Cost anchor (as of Jul 2026).** Discovery cost drops from ₹500+ per field-survey interaction to ₹10 per voice interaction. A conservative 5% workforce-participation gain in one district is estimated at ₹1,050 crore in additional annual GDP; scaled across India's top 100 progressive districts, ₹87,500 crore annually — order-of-magnitude anchors, not precise benchmarks. Telephony cost specifically fell from roughly ₹6/minute to ₹1/minute over the course of the rollout; the specific cost-optimisation flow behind that reduction is not documented in the source material reviewed.

**Build effort.** Dharwad: 10 months from decision to a self-sustaining ecosystem, built while the playbook itself was being written — no prior pathway to draw on. Ghaziabad: 4 months, drawing directly on Dharwad's documented experience. A new district today can configure the DPGs in about two weeks once the required information is collated — technology setup is rarely the constraint; district readiness is.

**Downstream adoptions.** Scale-up now underway across multiple districts in Uttar Pradesh and Karnataka. The team is testing the same underlying local-discovery frame for non-livelihoods use cases (tourism, local services, agriculture) and other "Dots" initiatives beyond jobs (see Gap 3).

## The 4×4 Coverage Grid

| | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| **Persona** | ●●● (Unit 1) | ●● (Unit 5) | ●● (Unit 6) | ● |
| **Solution** | ●● (Unit 2) | ●●● (Units 3, 4) | ● | ● |
| **Institution** | ● | ●● (Unit 7) | ● | ● |
| **Ecosystem** | ○ | ● | ●● (Unit 8) | ● |

## Gaps

*Contributed directly by Gaurav Gupta, Chief Growth Officer & Lead Architect — surfaced as open questions this pathway does not yet answer, rather than guessed at.*

1. What was reused from Dharwad when implementing Ghaziabad — technology, process, people, or partnerships — versus what had to be locally adapted, and which of those elements generalise to a third district? *(Solution/Define)*
2. How does responsibility for a Blue Dots deployment actually transition from the initial implementation team to state or district institutions, and what specifically gets handed over? *(Institution/Scale)*
3. How much of the Blue Dots approach has carried over into "Orange" or "Purple" Dots initiatives in other sectors, and what has that taught the team about adapting the model beyond jobs? *(Ecosystem/Scale)*
4. How is a Blue Dots connection actually verified to have led to a useful outcome — an interview, a placement, a service delivered — rather than just a connection made? *(Persona/Pilot)*
5. What are the biggest remaining barriers to making a new district deployment faster and more implementation-light than the current ~2-week configuration process? *(Solution/Scale)*
6. Which parts of the user journey are handled by AI today, and where does human intervention remain essential? *(Solution/Pilot)*

# 3. Micro-Innovations

## Persona

**1. Name the paradox of proximity precisely — what already exists but cannot find its match**
- Dimension: Persona
- Stage: Explore
- Type: Strategic Decision
- Decision: Define the discovery gap precisely — not "job seekers need help," but a specific person and a specific match sitting nearby, unseen: a commerce graduate in Ghaziabad being pushed to migrate to Delhi, two kilometres from a manufacturing firm that needed exactly her profile.
- Why: The discovery gap does not fall evenly — it falls hardest on people with the fewest networks: women re-entering the workforce, persons with disabilities, first-generation graduates, and daily-wage workers who find work only through whoever happens to know them. Districts contribute roughly 80% of the country's jobs, and the same failure recurs in white-collar work, not just blue-collar.
- Condition — applies when: A district or local economy genuinely has both unmet supply and unmet demand that already exist but cannot find each other.
- Condition — fails when: The problem is a genuine shortage — new demand or supply needs to be created, not merely surfaced.

**5. Build trust in three layers, starting with people, not the AI**
- Dimension: Persona
- Stage: Define
- Type: Playbook
- Playbook: Institutional layer first — a joint facilitation centre convened by the district CEO or Collector, bringing siloed departments (skilling, labour, MSME, livelihoods) under one roof. Aggregator layer second — trusted local institutions (ITIs, colleges, MSME associations) who onboard their own constituents en masse, lending a physical trust a voice call alone cannot. Individual layer third — identity, education, experience, and skill verification, staged in over time rather than required all at once.
- Note: Verification proofs mostly still sit outside the ecosystem as paper certificates today; the framework is designed to bring these in as verified credentials over time, but the fuller layer is not yet fully public (see Gap 4).
- Condition — applies when: Building a voice-based system that asks citizens and businesses to share information, where no single existing institution already holds full trust with both sides.

**6. Dialect adaptation has to be redone district by district, even within one state language**
- Dimension: Persona
- Stage: Pilot
- Type: Failure and Fix
- Failure: A model that worked well in one district's version of a state language still underperformed engagement targets in a neighbouring one — the Kannada spoken in Dharwad is faster and carries nuances not present in Bangalore Kannada.
- Fix: A local glossary and vocabulary specific to each district, with conversation design tuned to match local pace, politeness conventions, and catchphrases — engagement rose as a direct, measured result of this local tuning.
- Insight: A single state-language model is not the same as a single dialect model — assuming otherwise costs engagement that a district-specific glossary and tone-matching pass recovers.
- Condition — applies when: Deploying the same nominal language across multiple districts or regions within one state.

## Solution

**2. Meet the behaviour people already have — don't ask them to adopt a new one**
- Dimension: Solution
- Stage: Explore
- Type: Strategic Decision
- Decision: Choose voice AI specifically because it required no new behaviour from either job seekers or employers, rather than building a platform that assumed resumes and portal postings.
- Why: A field visit to an ITI in Dharwad, during the very first pilots, found four out of five people had no resume, and the one who did had copy-pasted a template with inaccurate information. Employers — small, market-driven SMBs — weren't posting vacancies on portals either; they advertised on posters, poles, trees, and behind auto-rickshaws, or through informal staffing and placement agencies that took a cut. That first-principles field visit — not a market study — is what redirected the team away from a resume-and-portal model before any of it was built.
- Condition — applies when: The target population's actual existing behaviour can be identified concretely, and a channel exists that meets it without requiring a new one to be learned.

**3. Build open shared rails, not a platform any one organisation owns**
- Dimension: Solution
- Stage: Define
- Type: Strategic Decision
- Decision: Build an open discovery protocol — explicitly modelled on what UPI did for payments — that any government department, SMB, or social-sector organisation can plug into, rather than a smartphone app or proprietary marketplace any single organisation would control.
- Alternative considered: A national platform (reaches too few — assumes digital fluency) or continued physical mobilisation (reaches the long tail but costs over ₹500/interaction and cannot scale).
- Why: This is named explicitly as the single most consequential decision in the pathway, and the hardest to reverse later — once rails operate as shared public infrastructure, reversing to a closed platform undoes the trust the ecosystem was built on.
- Condition — applies when: Multiple independent actors (government, SMBs, social-sector organisations) all need to participate without any one of them owning the shared infrastructure.

**4. Assemble reusable Digital Public Goods, not a single closed application**
- Dimension: Solution
- Stage: Define
- Type: Strategic Decision
- Decision: Build seven foundational, unbundled building blocks (Knowledge Engine, Memory Layer, Trust Layer, Agent Core, Action Gateway, Reach Layer, Learning Layer), with purpose-built DPGs on top — the Signal DPG (structures each voice interaction into a location-anchored Blue Dot and manages matching), the Aggregator DPG (lets institutions onboard participants at scale), and the Facilitator DPG (gives district administrations visibility into the supply-demand gap).
- Why: A solution treated as configurable building blocks — roughly 80% complete, adaptable per use case — is what let Ghaziabad move in four months instead of Dharwad's ten. The same block-based approach is now applied to how the underlying AI agents are built, so deployment, models, and instructions can each be swapped independently.
- Condition — applies when: The infrastructure is intended for reuse across districts, sectors, or use cases, not a single fixed deployment.

## Institution

**7. Name a District Champion and a State Sponsor before activation, not during**
- Dimension: Institution
- Stage: Define
- Type: Strategic Decision
- Decision: Secure a named District Champion (typically a Chief Development Officer or District Collector) who frames the problem as a local discovery failure and convenes the first aggregators, plus a State Sponsor (Mission Director or Secretary) who provides political cover, budget sanction, and links to state-level systems — both before activation, not assembled reactively once the system is live.
- Why: Without these two named roles, aggregators have no reason to commit and the map has no path to going live — day-to-day accountability then sits with a District Facilitation Team of six to eight people, anchored by the district administration, whose explicit job is keeping the discovery rhythm alive weekly.
- Condition — applies when: The deployment depends on convening multiple existing institutions (departments, aggregators) that have no independent reason to coordinate with each other otherwise.

## Ecosystem

**8. What breaks first is density and freshness, not the technology**
- Dimension: Ecosystem
- Stage: Pilot
- Type: Failure and Fix
- Failure: In both Dharwad and Ghaziabad, the first real failure mode was not technical — without active maintenance, Blue Dots went stale, both sides lost confidence, and discovery reverted to the old, invisible patterns the system was meant to replace.
- Fix: A dedicated facilitation team whose explicit mandate is maintaining that rhythm, given live intelligence — showing where density is stalling and which aggregators need follow-up — in place of the static, months-old reports district administrations relied on before.
- Insight: Any newly launched voice agent needs to be run like a daily campaign for its first three to four months, with continuous iteration on pronunciation, comprehension errors, and sparse or vague user responses (many generic-degree seekers answer "any job," which breaks matching unless users are profiled further before matches are surfaced).
- Condition — applies when: The system depends on two-sided participation (seekers and providers, or any other matched pair) that decays without active maintenance.

# 4. Toolkits and Playbooks

| # | Asset | Type | Reuse condition |
|---|---|---|---|
| 5 | Three-layer trust-building sequence (institutional convening → aggregator onboarding → staged individual verification) | Playbook | Applies to any voice-based system asking citizens or businesses to share information where no single institution already holds full trust with both sides. |
| — | Seven-block DPG architecture (Knowledge/Memory/Trust/Agent/Action/Reach/Learning layers) plus Signal, Aggregator, and Facilitator DPGs | Toolkit Asset | Open-source, model- and speech-provider-agnostic; applies to any district or sector attempting local supply-demand discovery, not only jobs. |
| — | 4×4 grid-mapped interview questionnaire | Toolkit Asset | The question set used to run this pathway's own interviews, sequenced broad-to-specific across Persona, Solution, Institution, and Ecosystem — reusable for any future pathway interview. |

# 6. Retrieval Guide

*"How do I know if my district's problem is really 'local discovery' and not a genuine shortage?"* → Unit 1

*"Should we build a new app, or use a channel people already use?"* → Unit 2

*"Should our platform be owned by us, or shared open infrastructure?"* → Unit 3

*"Should we build one closed product or reusable components?"* → Unit 4

*"How do we build trust for a new voice-based civic service?"* → Unit 5

*"Our model works in one district but not the next one over"* → Unit 6

*"Who needs to be lined up before we activate?"* → Unit 7

*"Our map/database is going stale after launch"* → Unit 8

---

## Source Trace

*Contributor-only — not surfaced to adopters.*

| Source file | Covers | Notes |
|---|---|---|
| V1 Blue_Dots_AI_Diffusion_Pathway_.docx (Tushar, full narrative pathway document, dated 26 Jul 2026) | Section 1 (identity, scale, dates); Section 2 (cost anchor, build effort); Units 1–8 | Primary source — a complete, near-publication-ready narrative pathway document. |
| Blue_Dots_AI_Executive_Summary.docx (Tushar) | Confirms Section 1/2 figures and Units 1, 3, 4, 5, 8 | An earlier condensed synthesis of the same underlying material — confirms, doesn't add beyond the full pathway document. |
| BlueDots Diffusion Pathways Questions.docx (Gaurav Gupta, Chief Growth Officer & Lead Architect) | Gaps 1–6 in full | Primary source for this document's Gaps section — an open, unanswered question list from a second named contributor, carried through as genuine gaps rather than answered speculatively. |
| Otter recording_BlueDots.pdf (follow-up interview, 23 Jul 2026) / tushar_questions.txt "Information Gaps" answers | Confirms Units 1, 2, 3, 4, 5, 7; adds the origin-story detail in Unit 1 and the March 2025 first-agent build date | A second, later interview pass — read in full. Mostly confirms the full pathway document point-for-point (same UPI analogy, same Dharwad ITI statistic, same DPG/trust-layer language), rather than adding material beyond it; treated as corroboration, not a new primary source. |
| Responses.pdf | Confirms Section 1/2 and Units 1, 3, 4, 5, 8 | A clean-text duplicate of the Blue_Dots_AI_Executive_Summary.docx content — read in full, adds nothing beyond what that file already established. |
| BlueDots Brief_.pdf | Not separately read | Background brief; content already reflected in the full pathway document. |
