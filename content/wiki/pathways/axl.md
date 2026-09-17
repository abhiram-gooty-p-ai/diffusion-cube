---
title: AxL — Adaptive Foundational Learning
description: A proficiency-driven personalized learning system that continuously identifies foundational literacy and numeracy gaps and determines each learner's next learning experience across public-school systems in India.
stage: Scale
sector: Education
location: India
tags: [Foundational Learning, Adaptive Personalization, Voice AI, EdTech]
---

# AxL — Adaptive Foundational Learning

## Section 0 — Reading guide

This document is written for the next adopter — an organisation considering whether and how to build a personalized foundational learning system for public-school children. It is not a record of what AxL built. It is a marked trail: what decisions shaped the system, which alternatives were considered, what broke in real schools, and under what conditions a given choice applies.

The document is organised across four dimensions — Persona, Solution, Institution, and Ecosystem — each traced through four stages: Explore, Define, Pilot, and Scale. The coverage grid in Section 2 shows where knowledge is dense and where gaps remain. Section 3 contains the core reusable units, each tagged by dimension, stage, and type. Section 6 maps realistic adopter questions to the relevant units.

Where knowledge is densest: Solution/Define and Solution/Explore. The architectural and data decisions made early in AxL's journey are the most transferable elements. Persona/Pilot and Ecosystem/Pilot are the thinnest areas; gaps are noted.

The most important reusable insight runs across every section: AI quality in foundational learning cannot exceed the quality of the learning measurement system surrounding it.

---

## Section 1 — Pathway identity

| Field | Detail |
|---|---|
| Deployment name | AxL — Adaptive Foundational Learning (comprising ALL — Adaptive Language Learning; AML — Adaptive Math Learning; and the AxL Companion) |
| Sector | Education |
| Geography | India (public-school systems) |
| Population served | Children in public-school systems with heterogeneous foundational literacy and numeracy proficiency; teachers unable to provide continuous one-to-one diagnosis |
| Stage reached | Scale |
| Key dates | Not documented in the source |
| Summary | AxL continuously measures learner proficiency, diagnoses foundational gaps, and determines the next learning experience for each child — across both reading and numeracy — rather than delivering the same content to every learner. It operates across multiple languages, devices, and school environments, with a parallel teacher-facing companion that surfaces where human intervention is most valuable. |
| Scale / impact achieved | Rolled out across 3 states with approximately 30,000 schools (as of September 2026) |
| Cost anchor | Not documented in the source |
| Build effort | Initial development took 9 months |
| Known downstream adopters | Not documented in the source |
| Scope | Foundational literacy and numeracy personalization for public-school children; teacher visibility into learner state and progress. Does not transfer unchanged across languages (reading progressions vary; Indic languages require language-specific pathways); ASR performance differs by language and learner age; numeracy pathways depend on local curriculum, representation, and pedagogical conventions; mastery thresholds require validation per context; AI recommendations require sufficient historical evidence before they are reliable. |

---

## Section 2 — Coverage grid and gaps

| | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| **Persona** | ●●● | ●● | ○ | ○ |
| **Solution** | ●●● | ●●● | ●● | ●● |
| **Institution** | ●● | ●● | ● | ○ |
| **Ecosystem** | ● | ●● | ○ | ●● |

**Coverage notes**

Dense cells (●●●): Persona/Explore captures the excluded learner precisely — grade-enrolled but proficiency-mismatched, with no mechanism for continuous individual diagnosis. Solution/Explore and Solution/Define are the richest cells: the personalisation-first architectural decision, thin-frontend/strong-backend posture, connectivity-aware design, modular services, and the primacy of the learner data architecture over the model are all well-documented.

**Gaps — open questions this pathway does not yet answer**

1. **Persona/Pilot — Which user interactions failed, and was that a scope or quality problem?** The source documents that teacher adoption varied between schools and that learner behaviour differed from expectations, but does not provide a failure taxonomy distinguishing scope failures (questions outside the system's mandate) from quality failures (mandate questions answered badly). Related to Unit 7. Without this, a new adopter cannot tell whether pilot problems call for narrowing scope or improving the model.

2. **Persona/Scale — Are new user segments arriving that the pilot was not designed for?** The source notes that scale exposed device diversity, multilingual demands, and different learner starting points, but does not document whether new population segments (e.g. out-of-school children, learners with disabilities, adult learners) emerged and required design changes. A new adopter scaling to a second state or language group needs this.

3. **Institution/Pilot — How did the institution respond to the first public failure?** The source states that teacher adoption differed between schools and that pilot assumptions broke in real environments, but does not document a specific first public failure and the institutional response to it. This is the strongest signal about whether a deployment will scale — and it is currently absent. Related to Unit 8.

4. **Institution/Scale — Has the solution been absorbed into permanent institutional operation?** The source describes what scale demands (monitoring, support, model operations, teacher onboarding) but does not confirm whether AxL has a named operational owner, a recurring budget line, and a governance review cadence independent of the founding team. Related to Unit 6.

5. **Ecosystem/Pilot — Which partner underperformed, and was there a contingency?** The source names the ecosystem roles required (ASR providers, literacy/numeracy experts, implementation partners, government systems) but does not document mid-pilot partner performance issues or contingency arrangements. A new adopter needs to know which dependency is most likely to fail in a live school environment.

6. **Ecosystem/Explore — Who else had tried to solve this for this population, and what transferred?** The source does not document precedent deployments, failed alternatives, or adjacent tools that were examined before AxL began. A new adopter starting today would benefit from knowing what reference cases AxL drew on.

---

## Section 3 — Micro-innovations

### Persona

**1. Start with the specific excluded learner, not the average classroom**
- Dimension: Persona
- Stage: Explore
- Type: Strategic Decision
- **Decision:** Define the target user as the child enrolled in a grade whose actual proficiency does not match that grade — not the average learner the curriculum was designed for. The problem to solve is continuous individual diagnosis and response, not content delivery.
- **Alternative considered:** Treat the classroom as the unit of intervention; improve content quality or quantity for all learners together.
- **Why:** Classroom-level content improvement, however high quality, cannot respond to a learner who is two levels behind or two levels ahead. The workaround — teachers attempting one-to-one diagnosis without tools — is the evidence that the real bottleneck is individual identification, not content volume.
- **What this looked like here:** A Grade 3 classroom in a public school could contain learners ranging from letter-recognition difficulty through to independent paragraph reading. The same heterogeneity held in numeracy, from number recognition to complex operations. The system was designed around that full range, not around the curriculum midpoint.
- **Condition — applies when:** Public-school systems where grade-based progression is administrative rather than proficiency-based; classrooms with significant within-grade learning-level variance; teachers without time or tools for continuous individual assessment.

---

**2. Name the decision AI is actually making — before designing the system**
- Dimension: Persona
- Stage: Define
- Type: Strategic Decision
- **Decision:** Before any architecture work, name the specific decision the AI must improve: *What should this learner practise next?* Not "improve learning outcomes" — the specific branching decision that changes based on individual learner evidence.
- **Alternative considered:** Begin with AI capability selection (which model, which modality) and work backward to the use case.
- **Why:** If the decision is unclear, the AI value proposition is unclear. Naming the decision first constrains and focuses every subsequent architecture, data, and governance choice. It also makes evaluation tractable: did the system make a better decision than the alternative?
- **What this looked like here:** For reading: should this learner work on phonological awareness, decoding, word recognition, or fluency? For numeracy: does this learner need reinforcement in number sense, place value, operations, or a prerequisite concept? These were the actual branching decisions the system was built to make.
- **Condition — applies when:** Any AI-in-education deployment where the temptation is to select a model before defining what it is deciding. Particularly important when multiple AI components (ASR, recommendation, assessment) are involved and each team risks optimising its own component metric rather than the outcome decision.

---

### Solution

**3. Proficiency-based personalization: the irreversible architectural commitment**
- Dimension: Solution
- Stage: Explore
- Type: Strategic Decision
- **Decision:** Personalise around demonstrated learner proficiency — not grade, age, or a fixed curriculum sequence. Every subsequent architecture decision follows from this.
- **Alternative considered:** Three alternatives were explicitly considered: (1) digitise the curriculum and give every learner the same sequence; (2) allow learners or teachers to freely select content; (3) use simple completion rules — finish a set of tasks and move forward.
- **Why:** The first three alternatives reproduce the core failure of the existing system: they do not continuously use learner evidence to determine the appropriate next experience. Only the proficiency-based approach creates a feedback loop between what the learner can do and what the system offers next.
- **What this looked like here:** Choosing this approach drove the full architecture: learner discovery and assessment, proficiency and milestone models, recommendation logic, adaptive practice, continuous telemetry, reassessment, and longitudinal learning analytics. None of those components would have been necessary under the alternatives.
- **Condition — applies when:** Any foundational learning deployment where within-grade proficiency variance is high. Fails to transfer where curriculum sequence is mandated by a government partner who cannot accept out-of-grade content delivery, or where learner identity and session continuity cannot be maintained.

---

**4. The learner data architecture is harder to replace than the model**
- Dimension: Solution
- Stage: Define
- Also relevant at: Scale
- Type: Strategic Decision
- **Decision:** Treat the learner model and data architecture — competency structures, milestone definitions, proficiency measures, telemetry schema — as the hardest-to-replace component. AI models (ASR engines, recommendation algorithms) are modular and eventually replaceable. Badly designed competency structures or poor historical learning data are not.
- **Alternative considered:** Prioritise model accuracy and sophistication; treat data infrastructure as a secondary concern to be refined later.
- **Why:** A model can be swapped. A five-year longitudinal learner dataset built on a poorly defined proficiency construct cannot be recovered. The architecture should reflect this asymmetry: invest early in rigorous definitions of baseline, proficiency, skill, milestone, progression, fluency, automaticity, and mastery — before optimising the model sitting on top.
- **What this looked like here:** AxL progressively moved from usage analytics to learning analytics, which required establishing rigorous shared definitions across literacy and numeracy teams. The question the team had to answer was not "how accurate is the AI?" but "where did the learner start, what specific skill was weak, what intervention did they receive, and what changed afterward?"
- **Condition — applies when:** Any multi-year AI-in-education deployment where longitudinal learner evidence is central. Particularly important when multiple teams (ASR, recommendation, pedagogy, research) each produce signals that must be interpreted together. Fails to transfer where the deployment is short-term and longitudinal data is not the primary asset.

---

**5. Connectivity-aware architecture as a first-class requirement, not an optimisation**
- Dimension: Solution
- Stage: Define
- Type: Strategic Decision
- **Decision:** Design for connectivity failure from the beginning: caching, asynchronous telemetry, and degraded-mode learning experiences are architectural requirements, not later additions.
- **Alternative considered:** Build for connected operation first; address connectivity failures if and when they occur in the field.
- **Why:** Public-school AI cannot assume uninterrupted connectivity. Building connected-first and patching later produces fragile systems that fail unpredictably in the environments where they are most needed. The cost of retrofitting connectivity-aware design after the fact substantially exceeds the cost of building it in from the start.
- **What this looked like here:** The thin-frontend / stronger-backend posture, web/PWA distribution, and modular service architecture were all chosen partly in response to the reality of heterogeneous school devices and unreliable connectivity. Assessment, recommendation, learning pathways, telemetry, and analytics were designed to evolve independently so that one component's connectivity failure does not cascade.
- **Condition — applies when:** Any public-system AI deployment in environments where connectivity is variable, device quality is heterogeneous, or both. The specific degraded-mode design will vary by use case, but the principle — build for the worst credible operating environment, not the average — applies broadly.

---

**6. ASR failure taxonomy: model error vs. learner error vs. environment error**
- Dimension: Solution
- Stage: Pilot
- Type: Failure and Fix
- **Failure:** In early reading pilots, ASR disagreement was initially treated as a learner reading error. Classroom noise, microphone variation, and Indic-language ASR quality differences meant the system was misclassifying environmental and model failures as learner pronunciation or decoding errors — and responding with interventions the learner did not need.
- **Fix:** AxL developed richer fluency measures, separated assessment from supported practice, and built ASR performance analysis to distinguish model error from genuine learner error. Non-ASR intervention pathways were introduced where ASR reliability was insufficient.
- **Insight:** ASR disagreement is a three-way signal: it could mean the learner made an error, the model failed, or the environment interfered. A system that treats all three as the same signal will generate systematically wrong interventions. The fix requires both technical (ASR performance tracking) and pedagogical (alternative evidence pathways) responses.
- **Condition — applies when:** Any oral reading or speech-based assessment deployment in real classroom environments — particularly with young learners, Indic languages, shared devices, or variable microphone quality. The same three-way decomposition applies to any AI assessment where model error and learner error can be conflated.

---

**7. The smallest meaningful failure unit is the learner interaction, not the model call**
- Dimension: Solution
- Stage: Pilot
- Also relevant at: Scale
- Type: Strategic Decision
- **Decision:** Evaluate AI performance at the level of the learner interaction — did the learner receive a useful intervention? — not at the level of the model call — did the model return a technically correct output?
- **Alternative considered:** Use model-level metrics (ASR accuracy, recommendation similarity scores, completion rates) as the primary quality signal.
- **Why:** A model can perform correctly while the learner receives no useful intervention. Conversely, a modest AI model embedded inside a strong instructional feedback loop can create substantial learning value. Component metrics are necessary but not sufficient; the accountable question is whether the learner is improving.
- **What this looked like here:** An ASR team could achieve strong recognition accuracy; a recommendation engine could achieve technically good similarity scores; a numeracy activity could achieve high completion. None of those independently established learning impact. Governance was structured to keep the accountable question at the learner outcome level, not the component level.
- **Condition — applies when:** Any AI-in-education system with multiple AI components, each with its own technical performance metric. Particularly important when different teams own different components and there is a risk of each team optimising its own metric in isolation.

---

**8. AI + deterministic pedagogy: not every decision needs machine learning**
- Dimension: Solution
- Stage: Scale
- Type: Strategic Decision
- **Decision:** Build reliable systems by combining pedagogical rules, learner evidence, statistical models, and AI — rather than treating machine learning as the appropriate mechanism for every decision.
- **Alternative considered:** Apply machine learning broadly across all personalization and progression decisions; treat deterministic rules as a temporary scaffold to be replaced.
- **Why:** Deterministic pedagogical rules — for example, prerequisite-aware progression — are more transparent, more auditable, and more stable than learned models for decisions where the correct logic is already well understood. Machine learning adds value where the decision space is too large or too context-dependent for rules to cover. Conflating the two wastes model capacity on solved problems and introduces unnecessary opacity.
- **What this looked like here:** Prerequisite-aware progression in numeracy (a learner should not continuously receive harder material when the underlying prerequisite remains weak) was implemented as a deterministic rule, not a learned model. Machine learning was applied where individual learner evidence needed to be weighed across a large content space.
- **Condition — applies when:** Any foundational learning system where the pedagogical progression is well-understood and validated by domain experts. The boundary between rules and ML will shift as evidence accumulates, but the principle — use the simplest reliable mechanism for each decision — applies throughout.

---

### Institution

**9. End-to-end learner outcome ownership across all internal teams**
- Dimension: Institution
- Stage: Explore
- Type: Strategic Decision
- **Decision:** Establish a single accountable question — *Is the learner improving?* — that spans all internal teams (product, technology, pedagogy, research, data science, implementation), rather than allowing each team to treat its own component metric as the measure of success.
- **Alternative considered:** Each team owns its own component metric; integration and learning outcomes are a separate function's responsibility.
- **Why:** Without end-to-end ownership, technically successful components can coexist with zero learning impact. An ASR team, a recommendation team, and a content team can each claim success while the learner receives no useful intervention. Governance must hold the composite question, not the component questions.
- **What this looked like here:** Governance spanned learning metrics, pedagogy, product decisions, model quality, release quality, security and VAPT, data governance, evidence reviews, and implementation quality — not as separate workstreams but as facets of the same accountability question.
- **Condition — applies when:** Any multi-component AI system in education where different teams own different technical layers. The specific governance structure will vary, but the principle — name one accountable question and hold all teams to it — applies wherever component-level optimisation risk exists.

---

**10. Cross-functional governance: pedagogy, data, product, and government in one structure**
- Dimension: Institution
- Stage: Define
- Type: Strategic Decision
- **Decision:** Before building, establish governance that formally includes literacy and numeracy pedagogy experts, data science, product, implementation, and government counterparts — not as consultants but as co-owners of release and quality decisions.
- **Alternative considered:** Build the technical system first; bring pedagogy and government in at the integration and rollout stage.
- **Why:** The quality of AI recommendations cannot be separated from the validity of the underlying learning progression. If pedagogy experts are not co-owners of the competency and milestone structures from the start, those structures embed assumptions that are expensive to correct later. Government participation cannot be retrofitted at scale; it determines whether the deployment has legitimacy and institutional continuity.
- **What this looked like here:** AxL required coordinated ownership across product and technology, literacy and numeracy pedagogy, research, data science, implementation teams, school leadership, teachers, government systems, technology partners, and implementation partners. This was established as an operational requirement before deployment, not as a scaling aspiration.
- **Condition — applies when:** Any public-system AI deployment in education where government legitimacy, pedagogical validity, and longitudinal data are all required. Fails to transfer where the deployment is a self-contained private-sector product with no government dependency and no requirement for external pedagogical validation.

---

### Ecosystem

**11. Build–integrate–reuse: name every external dependency before building begins**
- Dimension: Ecosystem
- Stage: Define
- Type: Strategic Decision
- **Decision:** Follow a build–integrate–reuse approach: identify which capabilities will be built internally, which will be integrated from external partners, and which will be reused from existing infrastructure — before writing code.
- **Alternative considered:** Begin building internally; source external capabilities when internal gaps become apparent.
- **Why:** External dependencies that are unnamed at the start become unmanaged risk. ASR for Indic languages, literacy and numeracy domain expertise, implementation partner capacity, and government data integrations all require lead time, negotiation, and alignment that cannot be compressed once building has begun.
- **What this looked like here:** AxL required capabilities that no single organisation could provide alone: specialised speech and ASR capabilities for Indic languages, literacy and numeracy progression expertise validated by domain experts, implementation partners for training and local school support, and government systems for scale and legitimacy. Each of these was identified as an ecosystem dependency before the internal build scope was finalised.
- **Condition — applies when:** Any AI-in-education deployment involving speech, multiple languages, public-school access, or government legitimacy. The specific partner map will differ by geography, but the discipline of naming all external dependencies before building applies universally.

---

**12. Government participation is a scale and legitimacy dependency, not a distribution channel**
- Dimension: Ecosystem
- Stage: Scale
- Type: Strategic Decision
- **Decision:** Treat government participation as a structural requirement for scale and long-term institutionalisation — not merely as a route to reach more schools. Government systems provide legitimacy, integration with existing school infrastructure, and the institutional continuity that outlasts any individual project.
- **Alternative considered:** Scale through implementation partners and direct school relationships; engage government when the product is proven.
- **Why:** Scaling AI personalization to thousands of schools requires integration with the systems schools already use, trust from teachers and headmasters who answer to government, and an institutional owner who will sustain the service beyond the initial deployment team. These are not available through implementation partners alone — they require government as a co-owner, not a downstream recipient.
- **What this looked like here:** Government participation in AxL enabled scale, legitimacy, integration, and long-term institutionalisation across 3 states and approximately 30,000 schools. The distinction between government as a distribution channel and government as a structural co-owner was identified as one of the ecosystem lessons at scale.
- **Condition — applies when:** Any public-school AI deployment aiming for coverage beyond what a single implementation partner can reach; any deployment where teacher trust, headmaster buy-in, and curriculum alignment are required. Does not transfer to private-school or direct-to-consumer models where government legitimacy is not a dependency.

---

## Section 4 — Toolkits and playbooks

| Unit | Title | Type | One-line reuse condition |
|---|---|---|---|
| 3 | Proficiency-based personalization: the irreversible architectural commitment | Strategic Decision | Use when choosing among personalization approaches before any architecture work begins — particularly where grade-based progression is the incumbent default. |
| 4 | The learner data architecture is harder to replace than the model | Strategic Decision | Use when planning investment sequencing across model development and data infrastructure — especially in multi-year deployments where longitudinal learner data is the primary asset. |
| 5 | Connectivity-aware architecture as a first-class requirement | Strategic Decision | Use when designing for public-system environments with variable connectivity or heterogeneous devices — apply before, not after, the system architecture is set. |
| 6 | ASR failure taxonomy: model error vs. learner error vs. environment error | Failure and Fix | Use when building or evaluating any speech-based assessment in real classroom environments, particularly with young learners or Indic languages. |
| 7 | The smallest meaningful failure unit is the learner interaction | Strategic Decision | Use when establishing evaluation criteria across multi-component AI systems in education — prevents component teams from optimising metrics that do not connect to learner outcomes. |
| 9 | End-to-end learner outcome ownership across all internal teams | Strategic Decision | Use when designing internal governance for any multi-team AI-in-education deployment — set before pilot, not after component teams have established separate success metrics. |

---

## Section 6 — Retrieval guide

*"How do I define who this system is actually for?"* → Unit 1

*"We're debating whether to personalise by grade or by proficiency — what does the evidence say?"* → Unit 3

*"What's the single most important architectural decision we need to make before building?"* → Unit 3, Unit 4

*"How do we decide what to build ourselves versus buy or integrate?"* → Unit 11

*"Our ASR keeps flagging errors that don't seem like real learner errors — what's happening?"* → Unit 6

*"Each of our teams is hitting its own metrics but the learning outcomes aren't moving — why?"* → Unit 7, Unit 9

*"How do we structure governance across pedagogy, product, and technology teams?"* → Unit 9, Unit 10

*"We're about to scale — when should we bring government in?"* → Unit 12

*"Should every adaptive decision use machine learning, or are rules better for some things?"* → Unit 8

*"How do we make sure our data architecture can support the system in five years?"* → Unit 4

*"What's the right question to ask before selecting an AI model for learning?"* → Unit 2

*"Our pilot worked in one school but teacher adoption varied widely — what does that signal?"* → Unit 9, Unit 10

*"How do we design for schools with poor connectivity and old devices?"* → Unit 5

*"What breaks first when you move from pilot to scale in an education AI system?"* → Unit 7, Unit 5

*"How should we think about government as a partner rather than just a route to market?"* → Unit 12

---

---

## Source Trace appendix

*Contributor-facing only — not surfaced in any adopter-facing response.*

| Source file | Covers | Notes |
|---|---|---|
| AxL AI Diffusion Pathway (2).pdf, as of September 17, 2026 | Section 1 — all fields except scale/impact, cost anchor, build effort, and downstream adopters (not documented in source); Section 3 — Units 1–12 (all); Section 4 — full table; Section 6 — full retrieval guide; Section 2 — coverage grid and all gap statements | Primary source. Contributor's own account; not independently verified. All quantitative fields (scale, cost, effort) absent from source — recorded as "Not documented in the source" throughout. |
| Adoption Companion conversation, as of September 17, 2026 at 3:48 PM | Section 1 — Scale/impact achieved updated to 3 states, approximately 30,000 schools; YAML frontmatter — all fields confirmed; stage confirmed as Scale | Contributor's own account; not independently verified. Scale/impact field updated from "Not documented in the source" to contributor-confirmed figure. YAML frontmatter added per contributor instruction. |
| Adoption Companion conversation, as of September 17, 2026 at 4:55 PM | Section 1 — Build effort updated to "Initial development took 9 months" | Contributor's own account; not independently verified. Build effort field updated from "Not documented in the source" to contributor-confirmed figure. |