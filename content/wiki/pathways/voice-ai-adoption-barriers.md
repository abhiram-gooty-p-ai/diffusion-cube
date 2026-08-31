---
type: Pathway
title: Voice AI Adoption Barriers
description: Why voice AI pilots stall even when price and vendor access are no longer the obstacle — a synthesis of 40+ organisations, two subsidised EkStep programmes, and four named deployments (Ambak, Pradical Works, CIVIS, Karnataka AI Department) that did make it through.
tags: [Voice AI, Cross-Sector, Adoption]
sector: Cross-Sector
stage: Define
timestamp: 2026-08-31
contributor: EkStep Foundation / People+AI
---

# 0. Reading Guide

This pathway is different in kind from most others in this corpus: it is not about how to build a voice AI deployment, but about why organisations that already have funded access to vendors and subsidised pricing still don't get from "interested" to "live." It draws on 40+ deep-dive conversations, a 16+-respondent survey across six sectors, and two structured EkStep programmes — Listen at Scale (Sarvam, 20 organisations, Jan–Feb 2026) and Impact at Scale (three vendors, 85 organisations, Apr–Jul 2026) — both of which subsidised the two most commonly assumed obstacles, cost and vendor access, and found uptake stayed low regardless. Four organisations that did get to a working deployment (Ambak, Pradical Works, CIVIS, Karnataka AI Department) anchor the "what it looks like when it works" half of this pathway; a longer list of named organisations that stalled (Sesame Workshop India, Digital Labour Chowk, Randstad India, Sustainable Living Lab, Haqdarshak, Rite Water, and others) anchor the "what it looks like when it doesn't" half.

The interview behind this pathway drew its own distinction worth stating plainly: the Voice AI for Inclusion pathway in this corpus is an *implementation* pathway — how to build once a deployment has decided to go ahead. This one is an *ecosystem* pathway — how an organisation gets to that decision, and what stops most from getting there at all. Read this pathway before choosing a vendor or writing a first script; read Voice AI for Inclusion once the decision to build is already made. Reusable value concentrates in Section 3's use-case-definition, vendor-evaluation, and QA units, and in Section 4's toolkit table — the vendor-scoring rubric, use-case complexity ladder, and two-phase QA process are built to be picked up directly.

# 1. Pathway Identity

| Field | Value |
|---|---|
| Deployment name | Voice AI Adoption Barriers — a cross-organisation synthesis on why voice AI pilots stall, not a single deployment |
| Sector | Cross-Sector (HR & Hiring, Education, Health, Agriculture, Governance, and others) |
| Geography | India |
| Population served | Not end beneficiaries directly — this pathway's unit of analysis is the *adopting organisation* itself: NGOs, social enterprises, EdTech providers, and government bodies attempting to bring voice AI into their own operations |
| Stage reached | Explore through Scale across the 40+ organisations surveyed — the synthesis itself is a Define-stage diagnostic, meant to be read before an organisation commits to a vendor |
| Contributing organisation(s) | EkStep Foundation / People+AI (Voice AI Ecosystem team); informed directly by Ambak, Pradical Works, CIVIS, Karnataka AI Department, and 40+ other organisations reached through the Listen at Scale and Impact at Scale programmes |
| Key dates | Listen at Scale: Jan–Feb 2026 (1 month). Impact at Scale: Apr–Jul 2026 (3 months). Source material dated Jul 2026. |
| Summary | Two subsidised EkStep programmes gave 105 organisations cheap, easy access to voice AI vendors — and most still didn't deploy. What separated the small number that did from the majority that didn't was not technology or price, but six organisational-readiness workstreams most organisations skip without realising it. |
| Scale/impact achieved (as of Jul 2026) | Across the two programmes: 100 applicants → 20 selected (Listen at Scale); 85 applicants → 75 selected (Impact at Scale). Utilisation was sharply lopsided — the top 5 organisations in Listen at Scale generated 86% of credits used, and roughly 30 of the 75 selected Impact at Scale organisations did not go ahead with any vendor at all. |

# 2. Effort Details

**Cost anchor (as of Jul 2026).** Not the binding constraint this synthesis set out to test — that is itself the finding. Listen at Scale gave organisations access to roughly 100,000 free voice AI minutes each via Sarvam; Impact at Scale subsidised pricing to ₹1/minute against a market rate several times higher. Both removed price as an obstacle for the length of the programme, and uptake stayed low regardless — evidence against the hypothesis that cost is what's holding adoption back, tested directly rather than assumed.

**Build effort.** Not a single build — a synthesis across dozens. The recurring finding across organisations that did succeed: closing the gap between "the vendor works in a demo" and "the deployment works for us" reliably took three to four months of continuous, in-house iteration — a period this pathway's source material calls out explicitly as not outsourceable to the vendor or a one-time testing exercise.

**Downstream framing.** This pathway exists to be read *before* Voice AI for Inclusion or a single-deployment pathway in this corpus — its purpose is to help an organisation get past exactly the readiness gap most of the 40+ organisations synthesised here did not close, rather than to document one organisation's own build.

## The 4×4 Coverage Grid

| | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| **Persona** | ●●● (Unit 1) | ● | ○ | ○ |
| **Solution** | ●● (Unit 2) | ●●● (Units 3, 4) | ●●● (Units 5, 6) | ● |
| **Institution** | ● | ● | ●● (Unit 7) | ● |
| **Ecosystem** | ● | ○ | ○ | ●●● (Unit 8) |

## Gaps

1. No confirmed breakdown of the "three to four months of daily iteration" QA phase into person-hours or team size — the finding recurs across organisations but is not quantified into a staffing plan. *(Solution/Pilot)*
2. No documented reason, organisation by organisation, for why roughly 30 of the 75 selected Impact at Scale organisations never went ahead with a vendor — only that organisational readiness emerged as the dominant pattern across the cohort as a whole, not a per-organisation breakdown of which readiness gap applied where. *(Institution/Explore)*
3. The Karnataka AI Department pilot's core institutional gap — no path to continue voice AI spend once its grant ended, because government procurement cannot move at grant speed — is named directly in the source material as unresolved, not solved. *(Institution/Scale)*
4. Whether the "organisational readiness is roughly 70% of the effort" split is a measured result or the interviewee's own working estimate is not stated precisely — carried through here as a strong practitioner judgment, not a quantified finding. *(Institution/Explore)*
5. No documented account of behavioural (as opposed to technical or financial) resistance to adoption — the source material raises this as a real, unresolved open question (an organisation may know the ROI case and still not act, for reasons the interview does not claim to have identified) rather than answering it. *(Persona/Explore)*

# 3. Micro-Innovations

## Persona

**1. Name one accountable owner inside the organisation before selecting a vendor**
- Dimension: Persona
- Stage: Explore
- Type: Strategic Decision
- Decision: Identify a single person within the adopting organisation who is accountable for the voice AI deployment's success or failure, before any vendor conversation begins — not a committee, not "the tech team" generically, one named person.
- Why: Every organisation in this synthesis that reached a working deployment had this role filled early; where it was missing, initial enthusiasm reliably stalled once the vendor demo phase ended and the harder, ongoing work began.
- What this looked like here: Ambak's own framing of what closing their qualification-accuracy gap actually took: "You need one dedicated, smart resource who can monitor calls and run QA day in and day out. That's the real cost" — not a one-time technology cost, a standing role.
- Condition — applies when: An organisation is past the "should we try voice AI" stage and genuinely committing resources to a deployment.
- Condition — fails when: A very early, low-stakes exploratory test where formalising ownership this early would be premature.

## Solution

**2. Define the use case and its success metric before touching a vendor**
- Dimension: Solution
- Stage: Explore
- Type: Strategic Decision
- Decision: Write down the specific problem, the specific user, and what success looks like in measurable terms — before evaluating any vendor, and independently of what any vendor's demo can do.
- Alternative considered: Joining a subsidised programme or piloting a vendor first, on the assumption the right use case will become clear along the way.
- Why: Sesame Workshop India joined a subsidised programme without a defined problem to solve — their actual bottleneck (reminding field workers to upload data) turned out not to need voice AI at all; an SMS reminder would have worked. The inverse held for Pradical Works, who defined connect rate, talk-time distribution, and lead conversion as success metrics before a single call was made, and whose resulting pilot data was measurably cleaner than every other pilot in this dataset as a direct result.
- Condition — applies when: An organisation has vendor access or funding available and is tempted to start there.
- Condition — fails when: The use case is already sharply defined and this step would just be paperwork repeating known facts.

**3. Score vendors against your own use case and language, not their demo or a referral**
- Dimension: Solution
- Stage: Define
- Type: Playbook
- Playbook: Evaluate vendors on a weighted scorecard covering ease of adoption and integration (default weight 15%, owned by IT/Engineering/Ops — weight higher for lean tech teams), conversation quality (30%, owned by IT/Engineering — sub-1500ms latency, accuracy, TTS naturalness, blind listening tests on your own use case), domain knowledge and operational support (30%, owned by Ops/CX — reliability at scale, SLAs, dashboards, vendor track record), compliance and data protection (10%, owned by Legal — weight higher for regulated or government use cases), and pricing/commercials (20%, owned by Finance — transparent pricing, ROI versus current process, fully loaded cost).
- Note: A vendor with superior raw conversation quality can still lose on total score to a vendor with weaker technology but stronger domain experience and operational support — in one sample scoring exercise, a technically stronger vendor (5/5 on conversation quality but 2/5 on domain/ops support) scored 3.2 overall against a technically weaker vendor's 3.6, because domain experience and support carry equal formal weight to raw model quality. Two organisations skipped this discipline and paid for it directly: Digital Labour Chowk chose a vendor for its analytics dashboard and discovered only after deployment that it couldn't handle the dialects of the workers it needed to reach; Haqdarshak chose a vendor based on responsiveness during the discovery call, without ever running an accuracy test on the Hindi-English-Marathi code-switching its real users actually speak.
- Condition — applies when: Selecting a vendor for any deployment expected to run past a short demo.
- Condition — fails when: The use case is trivial enough (Level 0 or 1, see Unit 4) that vendor differentiation barely matters.

**4. Size the build to what the use case actually needs, not to the ambition behind it**
- Dimension: Solution
- Stage: Define
- Type: Playbook
- Playbook: Place the use case on a five-level complexity ladder before committing to a stack: Level 0, static information dissemination (one-way pre-recorded broadcast — voter-awareness calls, vaccination alerts; telephony + IVR + pre-recorded audio; build time a few days); Level 1, basic feedback collection (simple outbound, yes/no or numeric, no verification — "press 1 if ration received"; telephony + IVR + basic ASR + a response database; about a week); Level 2, enhanced feedback with verification (inbound and outbound, quantitative plus short qualitative, data cross-checked against records; streaming STT/TTS + database + analytics; a few weeks); Level 3, conversational intelligence with analytics (context-aware, sentiment and trend analysis, multichannel; streaming STT + LLM + TTS, turn-taking, multichannel CRM; one to three months); Level 4, integrated workflow automation (calls trigger real backend actions and escalations; everything in Level 3 plus tool-calling, API integration, and human handoff; three to six-plus months).
- Note: Level 0 and Level 1 use cases may not need a voice AI solution at all — the ladder's first job is as a filter, not just a sizing guide, before any vendor conversation starts.
- Condition — applies when: Scoping any new use case before choosing a stack or a vendor tier.
- Condition — fails when: The use case is already clearly Level 3 or 4 and well understood — the ladder adds little at that point.

**5. Low outbound connect rates are usually an operations problem, not a model problem**
- Dimension: Solution
- Stage: Pilot
- Type: Failure and Fix
- Failure: Randstad India found 60–70% of outbound calls went unanswered — not because the conversation itself failed, but because of TrueCaller spam-flagging and the absence of telecom number whitelisting, an operational ceiling no amount of model improvement could fix.
- Fix: Rotate the outbound number series as soon as it gets spam-flagged rather than waiting it out; call at the time of day the target population actually answers — a government agriculture survey found pickup rates jumped from roughly 30–35% to 60–70% simply by shifting all outbound calls to a 7–8am window, once farmer call-answering patterns were actually observed rather than assumed; trigger two to three attempts per contact at spaced intervals rather than a single try; and where feasible, precede the call with an SMS naming the expected caller, which independently raises pickup because the recipient is no longer answering a fully unknown number.
- Insight: A call that never gets answered produces the same failure signal as a call that goes badly — but the diagnosis and the fix are completely different, and conflating the two sends teams chasing a model or script problem that doesn't exist.
- Condition — applies when: Outbound connect rate is low and the conversation itself, once answered, performs reasonably well.
- Condition — fails when: Calls are being answered at a normal rate and still failing — that points to conversation design or model quality instead (see Unit 3).

**6. Run QA in two passes — a fast scan for everyone, a deep audit for the flagged few**
- Dimension: Solution
- Stage: Pilot
- Type: Playbook
- Playbook: Phase 1, a quick scan — one to two minutes per call, across a large batch (50–100 calls at once), looking only for obvious red flags (missing consent, policy or bias issues, silence or dropouts, complete conversational breakdown), scored as a simple pass/fail and mostly automatable. Phase 2, a deep audit — as long as it takes, on only the roughly 10–20% of calls flagged as risky plus a handful of good calls for comparison, tracing exactly what broke across the ASR, LLM, and TTS pipeline, each issue rated critical, major, or minor, rolling up to a 1–5 call score that stays comparable across model updates, languages, and configurations.
- Note: Without this discipline, errors compound silently — Randstad India's own best practice was one to two hours a day of a small team manually auditing call transcripts, specifically to catch flow failures and skipped steps before they scaled into a much larger problem; skipping this is also what let bad data through undetected on more than one pilot in this dataset, with mistagged fields and incorrect entries flowing into production databases before anyone was systematically checking.
- Condition — applies when: Any voice AI system is live and generating a call volume too large to review call-by-call in full depth.
- Condition — fails when: Call volume is small enough that full manual review of every call is still practical — the two-phase split adds process without saving effort at that scale.

## Institution

**7. Integration failures get blamed on the AI when they're really the plumbing**
- Dimension: Institution
- Stage: Pilot
- Type: Failure and Fix
- Failure: Sustainable Living Lab never received a promised web SDK from their vendor and lost 40 days building a manual workaround — a failure that had nothing to do with the AI's conversation quality but stalled the pilot as completely as a bad model would have. Rite Water, piloting a vendor, could not reach a go/no-go decision at all because a promised WhatsApp follow-up integration was never completed, leaving the full user journey untested regardless of how well the voice component itself performed.
- Fix: Treat integration deliverables (SDKs, webhook handoffs, CRM or WhatsApp connections) as a named, dated commitment in the vendor relationship from day one, not an assumed byproduct of "the vendor being good" — and track it separately from conversation-quality QA, since the two fail independently and get confused with each other by default.
- Insight: When a pilot stalls, the instinct is to diagnose the model. In a meaningful share of the organisations synthesised here, the actual blocker was integration plumbing the vendor had not delivered — a different failure with a different owner and a different fix.
- Condition — applies when: The use case depends on the voice system connecting to another system (CRM, WhatsApp, a backend database) beyond the call itself.
- Condition — fails when: The use case is self-contained within the call — no external system dependency to fail.

## Ecosystem

**8. Subsidising price and vendor access does not convert interest into adoption — organisational readiness does**
- Dimension: Ecosystem
- Stage: Scale
- Type: Strategic Decision
- Decision: Treat "organisations say they're interested" and "organisations are ready to adopt" as two different populations requiring two different kinds of support, rather than assuming cheaper pricing and easier vendor access will convert one into the other.
- Why: Two EkStep programmes tested this directly by removing price and vendor-access friction for 105 organisations combined — and uptake stayed sharply lopsided regardless (86% of Listen at Scale's usage came from just 5 organisations; roughly 30 of 75 selected Impact at Scale organisations never went ahead with any vendor). The synthesis's own five-tier funnel — deployed across the organisation, pilot in progress, actively exploring, aware but not exploring, not aware — showed most organisations sitting well below "pilot in progress," and the two lower tiers are likely undercounted in this data, since the survey and interviews self-selected for organisations already aware of or exploring voice AI.
- What this looked like here: The synthesis matches two different interventions to two different funnel positions rather than one blanket answer — capacity-building and structured mentorship for organisations already piloting or actively exploring (the "over the hill" problem Units 1–7 address), versus lighter-touch awareness programmes for organisations that have simply never been exposed to the technology, on the reasoning that a taste of it may be what moves them into the exploring tier at all. Change management belongs in this same ecosystem-level category, not treated as a separate afterthought: Tryzent anticipated teacher resistance to a classroom voice AI tool and pre-emptively reframed the product — not as a replacement for the teacher, but as a way of surfacing which concepts students were struggling with — a positioning choice that addressed adoption resistance no amount of technical capability alone would have solved.
- Condition — applies when: Designing or evaluating a programme meant to accelerate voice AI adoption across many organisations, not building a single deployment.
- Condition — fails when: The audience is a single, already-committed organisation — the funnel-segmentation logic doesn't apply to an audience of one.

# 4. Toolkits and Playbooks

| # | Asset | Type | Reuse condition |
|---|---|---|---|
| 3 | Weighted vendor-scoring rubric (ease of adoption, conversation quality, domain knowledge, compliance, pricing) | Toolkit Asset | Applies to any organisation evaluating multiple voice AI vendors; default weights are a starting point, adjust per organisational context (lean tech teams weight ease-of-adoption higher; regulated or government use cases weight compliance higher). |
| 4 | Use-case complexity ladder (Level 0–4, with matched tech stack and build-time estimate per level) | Toolkit Asset | Applies at the scoping stage, before vendor selection; explicitly flags that Level 0–1 use cases may not need voice AI at all. |
| 6 | Two-phase QA process (quick scan + deep audit) | Playbook | Applies to any live voice AI deployment with call volume too large for full manual review; not needed at very small scale. |
| — | Conversation-design pattern library (opening, clarification, confirmation, handoff, error recovery, closing — each with a worked example line) | Toolkit Asset | Applies when scripting or revising a voice AI conversation flow, independent of vendor or use-case level. |
| — | Three-month structured pilot timeline (pre-pilot weeks 1–4: define + baseline; pilot weeks 5–9: build + QA; post-pilot weeks 10–12: compare to baseline, go/no-go) | Toolkit Asset | Applies to any organisation running a first voice AI pilot and wanting a paced, dated structure rather than an open-ended trial. |

# 6. Retrieval Guide

*"We have a vendor and a budget but no one seems to own this internally"* → Unit 1

*"Should we just start piloting and figure out the use case as we go?"* → Unit 2

*"How do we choose between voice AI vendors?"* → Unit 3

*"Do we even need voice AI for this, or is it overkill?"* → Unit 4

*"Our outbound calls aren't getting picked up"* → Unit 5

*"How do we catch quality problems before they scale?"* → Unit 6

*"Our pilot is stalled and we're not sure if it's the AI"* → Unit 7

*"We got cheap vendor access and still aren't deploying — why?"* → Unit 8

---

## Source Trace

*Contributor-only — not surfaced to adopters.*

| Source file | Covers | Notes |
|---|---|---|
| Voice AI GTM Deck v14.pdf — "Voice AI in India: Adoption Barriers & Organizational Toolkit," EkStep Foundation / People+AI, Jul 2026 | Section 1 (identity, programme scale, sample composition); Section 2 (cost anchor, three-to-four-month build-effort finding); Units 1–8 in full; Section 4 toolkit table | Primary source — a complete, near-publication-ready deck covering market landscape, the two subsidised programmes and their uptake data, the six-workstream organisational-readiness framework, the vendor-scoring rubric, the use-case ladder, the conversation-design and QA playbooks, the three-month rollout timeline, and four full named case studies (Ambak, Pradical Works, CIVIS, Karnataka AI Department), each read in full including all named-organisation examples (Sesame Workshop India, Digital Labour Chowk, Randstad India, Sustainable Living Lab, Haqdarshak, Rite Water, Kommon School, E-Vidyaloka, Ambak, 4Lunches, Tryzent). |
| manmath_summary.txt ("Interview Insights Summary" — 17 transferable insights) | Confirms Units 1, 2, 3, 6, 7, 8 | An earlier condensed synthesis of the same underlying material; confirms rather than adds beyond the deck and the interview below. |
| manmath_questions.txt (interview question guide) | Background only | Structured question list behind the interview below; content already reflected in the interview transcript and the deck. |
| Harshal __ Manmath _ Voice AI Pathway (Otter transcript, interview with Manmath Goel, EkStep Foundation / People+AI 3-month fellow, interviewed by Harshal Kumar, People+AI research associate, 17 Jul 2026) | Section 0 (the "implementation pathway" vs "ecosystem pathway" distinction, attributed to this conversation); Unit 5 (Karnataka farmer call-timing specifics); Unit 6 (false-data/mistagged-field QA finding); Gaps 4, 5 | Read in full. Largely process conversation confirming the deck is the primary artifact rather than adding independent substantive findings — but it is the source for the explicit implementation-vs-ecosystem pathway framing in Section 0, the specific 7–8am call-timing detail behind Unit 5, and Manmath Goel's own hedge that the "70% organisational readiness" figure is his working estimate from the interviews rather than a measured statistic, carried through as Gap 4. |
