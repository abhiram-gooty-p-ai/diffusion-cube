---
type: Pathway
title: Voice AI for Inclusion
description: A cross-deployment synthesis of what MahaVISTAAR, Bharat Vistaar, Amul/Sarlaben, Jal Jeevan Mission Assam, the Bhili effort, Lend A Hand, and the India–Africa exchange learned in common about reaching people digital services routinely miss.
tags: [Voice AI, Cross-Sector, Synthesis]
sector: Cross-Sector
stage: Scale
timestamp: 2026-08-31
contributor: EkStep Foundation
---

# 0. Reading Guide

This pathway is different in kind from the others in this corpus — it is not one deployment, but a synthesis across several (MahaVISTAAR, Bharat Vistaar, Amul/Sarlaben, Jal Jeevan Mission Assam, the Bhili language effort, Lend A Hand, and the India–Africa exchange with Crane AI Labs), drawn from a structured interview with EkStep Foundation's Lead for Voice and Language AI. Where a single-deployment pathway in this corpus documents what one team decided, this one documents what recurred across several teams making similar decisions independently — which is itself a stronger signal that a given lesson generalises.

Read this pathway when the question is "is voice AI even the right channel, and what should I watch for regardless of which specific deployment I most resemble" — read MahaVISTAAR or Bhili instead when the question is about one specific deployment's own detail. Reusable value concentrates in Section 3's architecture and institutionalisation units, and Annexure 3 of the source material (not reproduced here as file content, since it references external documents rather than pathway units) points to the same external resources — an RFP telephony spec, a government Voice AI RFP template, and the Voicera GitHub repository — surfaced under "External resources" in this corpus's Navigate flow when relevant.

# 1. Pathway Identity

| Field | Value |
|---|---|
| Deployment name | Voice AI for Inclusion — a cross-deployment synthesis, not a single deployment |
| Sector | Cross-Sector (agriculture, water services, dairy, skilling/livelihoods) |
| Geography | India (Maharashtra, Assam, Gujarat) plus the India–Africa exchange |
| Population served | Female farmers, feature-phone users, Indic-language speakers, migrant labourers, rural households — populations excluded by literacy, language, device access, or connectivity from existing digital service channels |
| Stage reached | Scale — synthesised from deployments spanning Explore through Scale, with the most-repeated pattern (MahaVISTAAR → Ethiopia ATI → Amul/Sarlaben) itself demonstrating compounding speed at Scale |
| Contributing organisation(s) | EkStep Foundation (synthesis); source deployments: Department of Agriculture Government of Maharashtra, Jal Jeevan Mission Assam, Amul/Sarlaben, Lend A Hand, Crane AI Labs |
| Key dates | As of July 2026 |
| Summary | What recurred across seven voice-AI deployments serving digitally excluded populations — not what one team built, but what several teams, working independently, learned in common about channel choice, architecture, model selection, governance, and sustaining a service after launch. |
| Scale/impact achieved (as of mid-2026) | MahaVISTAAR: 342K+ unique users, 1.67M+ questions answered, 17 lakh farmers/day via proactive alerts. Amul/Sarlaben: 3.6M farmers, launched in 3 weeks. Compression across the pattern: 9 months (MahaVISTAAR, built from scratch) → 3 months (Ethiopia ATI) → 3 weeks (Amul/Sarlaben). |

# 2. Effort Details

**Cost anchor (as of Jul 2026).** ~$250K setup, ~$250K/year at MahaVISTAAR's scale — an order-of-magnitude anchor across the pattern, not a single deployment's precise figure. Per-minute telephony cost across the deployments synthesised here runs roughly ₹0.5–1.5/minute on an open self-hosted stack once earned at scale, ₹2.5–4.5/minute on a fully managed commercial platform (the realistic starting point for most adopters), and above ₹6/minute for a human-only call centre by comparison. Two variables move the bill more than the per-minute rate: call duration and concurrency — the number of languages supported barely moves it.

**Build effort.** Varies by deployment, but the compression pattern itself is the finding: 9 months (MahaVISTAAR, built from scratch, no prior pathway to draw on) → 3 months (Ethiopia's ATI, drawing on MahaVISTAAR's architecture) → 3 weeks (Amul/Sarlaben, drawing on two full cycles of shared learning).

**Downstream adoptions.** This pathway is itself downstream of MahaVISTAAR, Jal Jeevan Mission Assam, and the others it synthesises — its purpose is to be the thing a next, not-yet-started deployment reads before choosing an architecture, not a record of what any one deployment did.

## The 4×4 Coverage Grid

| | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| **Persona** | ●●● (Unit 1) | ● | ●● (Unit 7) | ● |
| **Solution** | ●● (Unit 2) | ●●● (Units 3, 4) | ● | ● |
| **Institution** | ● | ●● (Unit 6) | ●● (Unit 5) | ● |
| **Ecosystem** | ○ | ● | ● | ●● (Unit 8) |

## Gaps

1. No single, precise per-deployment cost breakdown is given for most of the seven source deployments — the per-minute figures are a synthesised range across them, not a confirmed number for any one. *(Solution/Explore)*
2. No documented method for confirming, rather than inferring, that a given deployment has genuinely reached the workforce-capability outcome described in Unit 5, versus dependency — the interview names the marker (who does daily QA) but not a scoring method. *(Institution/Pilot)*
3. The India–Africa reverse-technology-transfer claim referenced in this pathway's own source material is explicitly unverified at the time of writing — carried through here as a direction worth testing, not a settled fact (see the African Voice AI pathway in this corpus for the fuller, appropriately-hedged treatment). *(Ecosystem/Scale)*
4. No consolidated, single list of which of the seven source deployments have published their own reusable toolkits versus which remain internal-only. *(Ecosystem/Scale)*

# 3. Micro-Innovations

## Persona

**1. Name the excluded person precisely, not the demographic**
- Dimension: Persona
- Stage: Explore
- Type: Strategic Decision
- Decision: Define the excluded user precisely enough to name the person and the specific constraint — not "farmers," but "women farmers in remote districts who rely on small trust circles and cannot easily visit an agriculture office"; not "youth," but "interns across dispersed locations from whom fortnightly feedback is needed but two human callers cannot keep up."
- Why: The sharper the user and problem, the easier every downstream decision becomes — channel, model, data, workflow, language, testing.
- What this looked like here: Across the deployments synthesised here, this precision was sometimes itself a multi-round process requiring several stakeholder discussions before it converged — worth treating as an explicit, resourced first milestone rather than a formality to skip.
- Condition — applies when: A population genuinely exists that is excluded by language, literacy, device access, trust, or connectivity — the claim this pathway makes is specific to access problems, not automation or internal-efficiency use cases.

**7. A prototype clears two bars before it's ready for a real pilot — one technical, one human**
- Dimension: Persona
- Stage: Pilot
- Type: Playbook
- Playbook: Before committing from prototype to pilot, confirm (1) the technical bar — it runs on a real phone call, understands the actual dialects of the target users (tested with native speakers, not a generic benchmark), and replies in under roughly two seconds; and (2) the human bar — the person being called has a genuine reason to stay on the line, evidenced by a real connect rate and a few unprompted, genuine conversations, not clean demo calls.
- Note: The second bar is the one teams most often skip. Cold outbound calling fails where opted-in advisory or reminders succeed — a technically working prototype can still fail at pilot if nobody has a reason to answer it. Also confirm operationally that someone inside the organisation owns it, the knowledge base is real content rather than placeholder data, and success metrics (connect rate, talk time, conversion) were fixed before the first live call went out. On the technical bar specifically, lab metrics (word error rate, latency, noise cancellation) are useful as a rejection filter but not as the real pass/fail signal — the deployments in this synthesis converged on the same practical test instead: does the population the system is meant to serve actually say, unprompted, that it understood them and didn't sound robotic. A model that clears every lab benchmark but fails that plainer test isn't ready, and a model that clears the plainer test is usually good enough even with mediocre lab numbers.
- Condition — applies when: Moving any voice deployment from a working demo to a real-user pilot.
- Condition — fails when: The use case is a simple broadcast or yes/no poll — SMS or IVR is cheaper and this two-bar test is unnecessary overhead.

## Solution

**2. Price against the platform you'll actually start on, not the floor you haven't earned yet**
- Dimension: Solution
- Stage: Explore
- Type: Strategic Decision
- Decision: Estimate voice-AI cost at the exploration stage by multiplying calls per month × minutes per call × the per-minute rate of the managed platform a first deployment will actually start on (roughly ₹2.5–4.5/minute) — not the open-source, self-hosted rate (₹0.5–1.5/minute) that a deployment earns only after real scale and its own migration work.
- Alternative considered: Budgeting against the open-source floor from the outset, assuming it's achievable immediately.
- Why: Cost is no longer the primary obstacle to voice AI adoption — but budgeting against a rate a deployment hasn't earned yet produces a plan that looks cheaper than it will actually be in the phase that matters, the first one.
- What this looked like here: The number of languages a deployment supports barely moves the bill; call duration and concurrency move it far more — and first-time adopters reliably under-provision for the parts that aren't AI at all: content, data, and system integration. Not every use case needs a large dataset or complex build to be worth costing out: a water-supply feedback line in Assam needed nothing more than a phone number list and five yes/no questions (did water arrive, on schedule, in sufficient quantity, adequate quality, are you satisfied) to surface exactly where a 55-litres-per-person mandate was actually being met — the cost and build effort should scale with the use case's real complexity, not a default assumption that voice AI always requires rich data infrastructure.
- Condition — applies when: Estimating cost before any pilot has run.

**3. Shortlist and test multiple vendors in parallel during the pilot**
- Dimension: Solution
- Stage: Define
- Type: Playbook
- Playbook: Run more than one voice-AI vendor in parallel during the pilot phase wherever feasible, rather than committing to one vendor before real comparative data exists.
- Note: This shows real comparison under similar conditions, reveals which vendor adapts fastest to feedback, creates competitive pressure on cost and quality, and reduces the risk of being stuck mid-way. Because voice AI is usually priced by usage, splitting call volume across providers during a pilot may not meaningfully increase total cost relative to the lock-in risk it removes — one deployment in this synthesis measured the premium at roughly 2–5% over a single-vendor commitment. In government procurement specifically, where single-vendor empanelment can make formal multi-vendor testing difficult, a closed sandbox test ahead of formal procurement is the pattern several of the source deployments used instead. For teams starting from zero with limited in-house capability, the easier on-ramp is a single bundled end-to-end provider (India's ecosystem has dozens active in Indic languages); vendor unbundling — telephony, speech, and language model procured and evaluated separately — is the move to make once a deployment has moved past pilot and wants more control, not the starting point.
- Condition — applies when: A pilot is genuinely still deciding on a long-term vendor, and usage-based pricing makes parallel testing affordable.
- Condition — fails when: Procurement rules make any parallel testing genuinely infeasible even in a sandbox, or the vendor decision is already fixed by an existing institutional relationship.

**4. Invest in open orchestration as shared infrastructure, not just in better models**
- Dimension: Solution
- Stage: Define
- Type: Strategic Decision
- Decision: Treat the orchestration layer — the piece connecting ASR, LLM, and TTS to telephony, accountable data sources, moderation, and analytics — as its own investment, distinct from and as important as model selection.
- Why: The gap that kept recurring across these deployments was not the absence of capable language models — it was the absence of an orchestration layer able to connect them into something deployable and maintainable. Models alone do not create adoption; a piece can work perfectly in a demo while the whole never becomes a working service without this layer.
- What this looked like here: This is the gap Voicera (an open-source orchestration platform designed for open Indic voice models, connecting to telephony via WebSocket APIs, deployable through infrastructure like Bhashini) was built to close — model-agnostic, language-agnostic, and telephony-provider-agnostic by design. WebSocket APIs were found more practical for Indian telephony conditions than WebRTC, which some global guidance recommends by default — match infrastructure to local network realities, not external best practice alone.
- Condition — applies when: Multiple capable models already exist for the target language but no deployable system has emerged from them.

## Institution

**5. The clearest sign of genuine institutionalisation is who does the daily quality checks**
- Dimension: Institution
- Stage: Pilot
- Type: Strategic Decision
- Decision: Track whether one person inside the deploying organisation — not at the vendor — listens to real calls daily and fixes the script, as the clearest marker of whether a deployment is becoming institutionalised versus staying vendor-dependent.
- Why: Every deployment in this synthesis that worked had this internal role; where it was missing, the pilot usually stalled. Dependency sets in when an organisation picks a vendor from a demo and dashboard, then discovers only after launch that the system can't handle its own users' dialects — because nobody inside was positioned to judge what they'd bought.
- What this looked like here: MahaVISTAAR is the clearest positive case — it is wired into the state's own systems (AgriStack, MahaDBT, PoCRA), so switching it off would break a working government process, not just close a helpline; and when the department moved its LLM from commercial GPT-4.1 to a fine-tuned open model, cutting inference cost roughly 180×, it needed no vendor sign-off and no rebuild, because the department itself controlled the stack. The pattern holds at the individual level too — MahaVISTAAR's own Additional Chief Secretary and Pocra Programme Director tested the live bot themselves at odd hours, past midnight more than once, rather than relying solely on vendor or field reports; the Bhili low-resource-language effort had the same marker in the Nandurbar District Collector, who convened and stayed personally invested in the effort from its start.
- Condition — applies when: Assessing whether a deployment has genuinely absorbed a voice-AI system versus still depending on its original vendor or founding team.

**6. Design for refusal, not just for response**
- Dimension: Institution
- Stage: Define
- Type: Strategic Decision
- Decision: Build a safety and stress-test bank before public launch, covering in-scope questions, out-of-scope questions, sensitive and distress scenarios, abuse or harassment, complaints about officials or policy, jailbreak attempts, and questions needing human escalation.
- Why: A voice agent backed by an institution is experienced as that institution — a wrong answer, silence, or a mishandled sensitive question is read as the institution failing the caller, not as a model error. This is not a marginal edge case; several deployments reported it as central, particularly where the system used a female voice and drew inappropriate conversation attempts.
- What this looked like here: Institutional testing moved through graded, widening stages — the builder team, then a small institutional group, then a wider institutional group across geographies and accents, then a limited public rollout — with the institution's own staff kept in the loop throughout rather than the testing fully outsourced to a vendor.
- Condition — applies when: The deployment is institutionally branded and public-facing.

## Ecosystem

**8. Voice opens the door — the service may need other channels to complete the journey**
- Dimension: Ecosystem
- Stage: Scale
- Type: Strategic Decision
- Decision: Design voice as part of a multichannel service, not as a full replacement for every other channel a user might need.
- Why: Several deployments in this synthesis initially romanticised voice as sufficient on its own, and discovered later that some users needed to send images, some preferred text in noisy environments, and some needed a human escalation route a bot could not provide.
- Condition — applies when: The use case may eventually require image sharing, text-based interaction in noisy environments, or human escalation for complex cases.
- Condition — fails when: The use case is genuinely voice-complete — a simple, structured, repeatable interaction with no foreseeable need for another modality.

# 4. Toolkits and Playbooks

| # | Asset | Type | Reuse condition |
|---|---|---|---|
| 3 | Parallel multi-vendor pilot testing (including the government sandbox pattern) | Playbook | Applies wherever usage-based pricing makes parallel testing affordable, or a sandbox can substitute for formal multi-vendor empanelment. |
| 7 | Two-bar prototype-to-pilot readiness test (technical + human "reason to stay on the line") | Playbook | Applies before moving any voice deployment from demo to real-user pilot; does not apply to simple broadcast/poll use cases better served by SMS or IVR. |
| — | Voicera — open-source, model-agnostic, telephony-provider-agnostic orchestration platform | Toolkit Asset | Applies to any Indic-language voice deployment needing an orchestration layer rather than a single vendor's closed stack. See `content/resources.md` for repository and documentation links. |

# 6. Retrieval Guide

*"How do I define who this is actually for?"* → Unit 1

*"Is my prototype actually ready to move to a real pilot?"* → Unit 7

*"How much should I budget before running a pilot?"* → Unit 2

*"Should we commit to one vendor now, or test several?"* → Unit 3

*"We have good models but no working system"* → Unit 4

*"How do we know if this deployment has become genuinely institutionalised?"* → Unit 5

*"How do we handle out-of-scope or sensitive questions?"* → Unit 6

*"Should voice be our only channel?"* → Unit 8

---

## Source Trace

*Contributor-only — not surfaced to adopters.*

| Source file | Covers | Notes |
|---|---|---|
| 1. Voice AI - Diffusion Pathway - V4.docx (full narrative pathway + executive summary, dated 26 Jul 2026) | Section 1 (identity, scale, dates); Section 2 (cost anchor, downstream framing); Units 1, 3, 4, 6, 8; Gaps 3, 4 | Primary source — a complete narrative synthesis document, including its own condensed executive summary appended within the same file. |
| Information gaps - Voice AI.docx | Units 2, 5, 7; Gaps 1, 2 | Primary source for the cost-range figures, the institutionalisation/workforce-outcome marker, and the two-bar prototype-readiness test — answers to a structured follow-up interview, richer and more specific than the main pathway document on these three points. |
| Santosh Interview Transcript - AI Diffusion.docx / Transcript 2.pdf / Voice Pathway Transcript (1).pdf | Enriches Units 2, 3, 5, 7 (Jal Jeevan Mission Assam example, vendor-unbundling sequencing, named institutional champions, the lab-metric-vs-citizen-acceptance evaluation approach) | Read in full — the raw interview underlying the V4 pathway document and info-gaps answers above. The three files are the same interview captured three times (one clean Otter transcript, two lower-quality OCR duplicates of very similar content); read as one source. Confirms the synthesised documents point-for-point and adds direct texture — named champions, vendor names (Sarvam, Gnani, Korover, Bolna for full-stack; Plivo, Ubona, Exotel for telephony), and the WER/latency-vs-real-usage distinction — not present in the synthesis at this level of specificity. |
| Questions for Santosh.docx | Background only | Interview question guide; content already reflected in the documents above. |
