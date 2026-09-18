---
title: AxL — AI for Foundational Literacy and Numeracy
description: How EkStep Foundation's misconception-based adaptive learning system personalises foundational reading and math practice for struggling students across 18,000+ government schools in India
stage: Scale
sector: Education
location: India (Telangana, Karnataka, Delhi, Sikkim, Assam, 10+ states)
tags: [Foundational Learning, EdTech, Adaptive Practice, Public School Systems]
---

# AxL — AI for Foundational Literacy and Numeracy

## Section 0 — Reading Guide

This pathway documents how EkStep Foundation built and scaled AxL — a system that continuously asks *what should this specific learner practise next* — across 18,000+ government schools in India. The system comprises ALL (Assisted Language Learning for foundational reading), AML (Assisted Math Learning for foundational numeracy), and the AxL Companion for teachers.

The pathway is most useful to:
- **State education departments and SCERT/NCERT stakeholders** evaluating a diagnose-personalise-practise system for foundational learning gaps in their own context.
- **Technology teams** deciding what to build versus integrate versus reuse in an adaptive learning system, particularly around speech, telemetry, and skill-progression modelling.
- **Implementation partners and school leaders** who need to understand the deployment sequence, teacher workflow, and what the first weeks in a school actually look like.

**Where reusable value concentrates:** Units 2, 3, 4, and 7 cover the most transferable decisions — the proficiency-first personalisation architecture, the misconception taxonomy data strategy, the connectivity-aware batching design, and the structured mathematics domain argument. Units 8 and 9 cover the institutional handover model and the deployment sequence respectively. Unit 6 covers the most important failure-and-fix: the smallest unit of failure in educational AI is the learner interaction, not the model call.

**How to navigate:** Use the Section 2 coverage grid to find where knowledge is dense and where gaps remain. Use Section 6 to search by question. Unit numbers are consistent across all sections.

---

## Section 1 — Pathway Identity

| Field | Detail |
|---|---|
| **Deployment name** | AxL (Assisted Language and Math Learning) — comprising ALL, AML, and the AxL Companion |
| **Sector** | Education — Foundational Literacy and Numeracy |
| **Geography** | India; active state-led deployments in Telangana, Karnataka (Kalika Deepa programme), and Delhi; broader footprint across Sikkim, Assam, and 10+ states total |
| **Population served** | Children in grades 3–8 in public-school systems who are below grade-level proficiency in foundational reading or numeracy, particularly those in heterogeneous classrooms where grade-based instruction cannot reach them |
| **Stage reached** | Scale |
| **Contributing organisation** | EkStep Foundation |
| **Key partners** | AI4Bharat (Dhruva infrastructure); IISc Centre for Neuroscience (learning-task design); Bodhan.ai (FLN AI research and scale, Government of India AI CoE for Education) |
| **Key dates** | AML interview conducted September 2026; AxL for WB deck dated July 2026; Bodhan.ai partnership noted as established 2025–2026 |
| **Two-sentence summary** | AxL is EkStep Foundation's AI-powered foundational literacy and numeracy programme, active across 18,000+ schools in 10+ states, built around one repeating loop: Measure → Diagnose → Personalise → Practise → Assess → Adapt → Intervene. Its central AI question — asked fresh for every learner, every session — is: *what should this specific learner practise next?* |
| **Scale achieved** | 18,000+ schools across 10+ states (as of July 2026); ~70% of children flagged as lagging behind across 1,400 schools showed improvement after 8–10 sessions; AML entry-to-exit diagnostic scores improved from ~29% to ~52%; teacher/headmaster survey of 617 respondents reported average improvement of 5+ behavioural traits per student; 20 million+ question-answer pairs collected |
| **Cost anchor** | Under ₹10 per child per year (running cost, AML; as of September 2026), excluding fixed product development cost borne by EkStep. No equivalent figure documented for ALL. |
| **Build effort** | Three years from inception to current scale (as of September 2026); team size and partner count not documented in the source |
| **Known downstream adopters / reuse** | Not documented in the source |
| **Scope — applies when** | Children in public-school systems are several learning levels apart within the same classroom; classroom instruction is organised by grade/curriculum rather than demonstrated proficiency; teachers cannot realistically provide continuous one-to-one diagnosis; schools have functioning computer labs with internet access |
| **Does not transfer when** | Learners are already grouped by demonstrated ability; the underlying content gap is not foundational literacy or numeracy; schools lack functioning computer labs or internet connectivity; no state-level leadership buy-in exists |

---

## Section 2 — Coverage Grid and Gaps

### Coverage map

| | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| **Persona** | ●● | ●● | ●● | ● |
| **Solution** | ●● | ●● | ●● | ●● |
| **Institution** | ●● | ●● | ● | ●● |
| **Ecosystem** | ● | ●● | ● | ● |

●●● = dense · ●● = covered · ● = thin · ○ = absent

### Gaps

1. **Ecosystem × Explore — precedent and alternative landscape (relates to Units 1, 11):** The sources establish what AxL is and why EkStep built it, but do not document what other approaches were evaluated or attempted before AxL, or which precedent deployments the team examined. A new adopter cannot determine what distinguishes AxL's approach from existing EdTech alternatives they may already know.

2. **Institution × Pilot — first public failure and institutional response (relates to Unit 6):** The sources describe what broke technically and pedagogically in early deployments, but do not document a specific instance of a public-facing failure, who owned it, and what the institutional response was. The insight form this cell requires — *first public failure + institutional response (own vs. disown)* — is not addressed.

3. **Persona × Scale — new user segments appearing beyond the original design (relates to Unit 5):** The Delhi CM SHRI finding (Unit 9) reveals schools adapting the programme in unexpected ways, but the sources do not document whether new learner populations, for example older students, different languages, or students with specific learning needs, have appeared at scale that the original design did not anticipate, or what design changes those required.

4. **Ecosystem × Pilot — partner underperformance and contingency (relates to Unit 11):** The sources name ecosystem partners but do not document whether any partner underperformed during the pilot phase, whether alternatives were considered, or what contingency exists if a key partner (e.g. ASR provider, infrastructure partner) exits or changes terms.

5. **Ecosystem × Scale — FLN DPI and transferability conditions (relates to Unit 12):** The FLN DPI effort with Bodhan.ai is described as early-stage, with two governing principles (minimal and interoperable), but what a future adopter would need to do differently to contribute to or draw from that infrastructure — versus building separately — is not documented.

6. **Solution × Pilot — ASR failure taxonomy for ALL specifically (relates to Unit 6):** The sources describe what broke in reading (ASR, noise, microphone variation, pronunciation) but do not provide the equivalent of AML's misconception-error taxonomy for reading — specifically, how ASR errors were classified, which were recoverable by design change versus model improvement, and what the threshold was for switching to non-ASR pathways.

7. **Institution × Pilot — content authority and approval process (relates to Unit 8):** Who approves what the system is permitted to say or recommend at the pilot stage — specifically, which SCERT/NCERT role has sign-off authority on the misconception taxonomy and question content — is not documented beyond a general statement that state instances can be customised.

8. **Ecosystem × Explore — AI4Bharat / IISc / Bodhan.ai relationship (relates to Unit 11):** The sources name three distinct technical and research partners but do not explain how their roles are divided or how overlaps are managed. A new adopter cannot replicate the partner architecture without knowing which capability each partner actually supplies.

---

## Section 3 — Micro-innovations

### Persona

**1. Define the problem as heterogeneity, not content scarcity**

- `Dimension: Persona`
- `Stage: Explore`
- `Type: Strategic Decision`

- **Decision:** Frame the foundational learning problem as continuous, unaddressed heterogeneity within the same classroom — not as a shortage of content, devices, or teachers — before deciding whether AI is the right intervention.
- **Alternative considered:** Treating the gap as a content or device problem and addressing it through more digital worksheets, additional teaching hours, or device procurement.
- **Why:** Schools already had teachers, textbooks, worksheets, and large libraries of digital content when AxL was designed. The problem was that children in the same classroom could be several learning levels apart, and the system had no continuous ability to identify those differences and respond individually. Framing the problem correctly determined both what to build and what not to build.
- **What this looked like here:** ASER data showed only ~1/3 of grade 3 children could perform basic two-digit subtraction with borrowing, and only ~50% of grade 8 students could answer basic math questions. These were not content availability statistics — they were proficiency heterogeneity statistics. That framing drove the decision to build a personalisation system rather than a content library.
- **Condition — applies when:** The school system already has teachers, curriculum, and digital content; the limiting factor is the system's inability to continuously identify *which* content or skill each specific learner needs next.

---

**2. Personalise on demonstrated proficiency, not grade**

- `Dimension: Persona`
- `Stage: Define`
- `Also relevant at: Explore, Scale`
- `Type: Strategic Decision`

- **Decision:** Personalise the learning pathway based on each learner's demonstrated proficiency — what they can actually do — rather than their administrative grade, age, or a fixed curriculum sequence.
- **Alternative considered:** Three alternatives were explicitly evaluated: (a) digitising the curriculum so every learner follows the same sequence; (b) allowing learners or teachers to freely select content; (c) using simple completion rules — finish a set and move forward.
- **Why:** Each of the three alternatives reproduces the core limitation of grade-based classroom instruction: it assumes learners are at a similar level, treats completion as learning, and cannot identify or respond to specific gaps. Proficiency-based personalisation is the only approach that asks the right AI question — *what should this specific learner practise next?* — fresh for every learner in every session.
- **What this looked like here:** AxL builds learner discovery and assessment, proficiency and milestone models, recommendation logic, adaptive practice, continuous telemetry, reassessment, and longitudinal analytics — all in service of that one question. A student still struggling with one-digit addition is not served three-digit multiplication questions, regardless of their grade.
- **Condition — applies when:** Learners within the same classroom are meaningfully different in actual proficiency; the delivery system can maintain a persistent learner model across sessions; teachers cannot provide continuous one-to-one diagnosis.

---

**3. Design teacher workflow as a constraint, not a feature**

- `Dimension: Persona`
- `Stage: Define`
- `Also relevant at: Pilot, Scale`
- `Type: Strategic Decision`

- **Decision:** Treat any requirement for additional teacher effort as a design failure to be removed, not a cost to be minimised — and design the teacher's role to be structurally minimal: identify eligible students (with the headmaster), find a timetable period, and get students to the lab. No teaching required; no change to classroom practice required.
- **Alternative considered:** Designing an intervention that depends on teachers actively facilitating or scaffolding sessions in the lab, or changing how they teach in their regular classroom.
- **Why:** Teachers' actual responsibility lists extend well beyond math or reading — midday meal schemes, vitamin and iron supplementation tracking, and general student well-being all compete for the same time. Any intervention that places new cognitive or time demands on teachers is likely to fail in adoption, regardless of its technical quality. Additionally, the pedagogical problem — a student who cannot manage one-digit addition cannot be taught three-digit multiplication by explanation — means teacher presence in the lab does not substitute for personalised, step-level practice.
- **What this looked like here:** The AML design requires that any adult in the school system can be present in the lab — not the teacher specifically. No teaching is required. The byproduct is that removing 10–20 struggling students leaves a more homogeneous remaining class, which is easier for the teacher to manage and reduces a psychological burden they already carry.
- **Condition — applies when:** Teachers are already managing large, multi-grade, multi-level classrooms with competing administrative responsibilities; the intervention is targeted at students whose learning gap is too large for in-class support to bridge.

---

**4. Reintegration into the classroom as the measured outcome, not test scores alone**

- `Dimension: Persona`
- `Stage: Pilot`
- `Type: Strategic Decision`

- **Decision:** Measure behavioural change — attendance, confidence, active classroom participation, willingness to attempt questions — as a primary outcome alongside diagnostic score improvement, rather than treating test performance as the sole success indicator.
- **Alternative considered:** Measuring success purely through pre- and post-diagnostic score changes.
- **Why:** The most significant early signal from AML was not diagnostic score improvement alone but behavioural reintegration: students who had previously been passive or absent began attending more regularly, answering questions in class, and expressing confidence. A student who goes from avoiding problems to voluntarily attempting them has undergone a change that diagnostic scores undercount, and that change is the mechanism through which sustained learning improvement becomes possible.
- **What this looked like here:** A teacher survey of 617 respondents reported an average improvement of 5+ behavioural traits per student, including attendance, effort, and time on task. The survey was explicitly noted as unbiased — respondents also flagged real infrastructure and connectivity problems. Students completing 1,000+ questions in a year — versus roughly 400–500 questions in a typical NCERT textbook across three years — provided the volume of successful repetition that built the confidence driving behavioural change.
- **Condition — applies when:** The target population includes students who have effectively disengaged from classroom learning; the programme provides sufficient successful repetitions at the right difficulty level to rebuild confidence before academic outcomes are visible in formal assessments.

---

### Solution

**5. Build the misconception taxonomy before building the product**

- `Dimension: Solution`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** Before building any digital product, invest in understanding and mapping the specific error patterns and misconceptions that learners make, through pen-and-paper data collection at scale — and use that taxonomy as the foundational data architecture that all subsequent AI personalisation is built on.
- **Alternative considered:** Beginning with a digital product and collecting error data through product telemetry once deployed.
- **Why:** Error data from a deployed digital product tells you what answer a student gave; it does not show you the intermediate steps, the visible working, or the reasoning. Pen-and-paper responses revealed actual thinking — students doing stick counting, placing digits in the wrong column — at a level of granularity that confirmed the taxonomy was real, not a model artefact. Starting with this data meant the AI system was built around a validated understanding of misconceptions, not a hypothesis about them.
- **What this looked like here:** Roughly 2–3 million pen-and-paper responses were scanned and analysed before any state deployment. That data identified systematic errors — for 27+14, common wrong answers include 311 (carry treated as a digit in the middle) and 31 (carry dropped entirely) — each mapping to a specific misconception with two identifiable parts: which skill is involved and which specific incorrect execution produced the answer. AML now holds 20 million+ question-answer pairs.
- **Condition — applies when:** The domain is structured enough that a finite, mappable set of misconceptions exists; the target learner population is accessible for pre-product data collection; the deploying organisation can invest in data infrastructure before the product generates its own.

---

**6. The smallest unit of failure is the learner interaction, not the model call**

- `Dimension: Solution`
- `Stage: Pilot`
- `Also relevant at: Scale`
- `Type: Failure and Fix`

- **Failure:** Early deployments revealed that technically correct model outputs — ASR correctly transcribing a reading response, a recommendation engine returning an appropriate next task — did not guarantee that the learner received a useful intervention. Conversely, incorrect or incomplete model outputs embedded inside a strong instructional feedback loop sometimes still produced learning value. Evaluating the AI system at the model level missed the actual failure unit.
- **Fix:** Shifted the governance and monitoring frame from model-level accuracy metrics (ASR recognition rate, recommendation similarity score, task completion rate) to learner-interaction-level outcomes: did this specific learner, in this specific session, receive a useful intervention? Built telemetry and analytics to track learner state change, not just model performance.
- **Insight:** AI quality in educational systems cannot exceed the quality of the learning measurement architecture surrounding it. A weak model inside a strong instructional feedback loop can create substantial learning value. A well-performing model inside a poorly designed feedback loop produces activity, not learning.
- **Condition — applies when:** The AI system involves multiple interacting components (ASR, recommendation, content, scaffolding); model-level metrics are already being tracked; the question is whether the *combination* is creating learning value for specific learners.

---

**7. Batch API calls to survive intermittent connectivity — and run on CPUs**

- `Dimension: Solution`
- `Stage: Define`
- `Also relevant at: Scale`
- `Type: Tactical Decision`

- **Decision:** Group 10–20 questions into a question set and make a single API call only when the set is complete, rather than calling the API after every question. Run nearly all compute on CPUs, with GPU calls limited to a small subset of operations. Deliver via PWA/web to handle heterogeneous school hardware without installation complexity.
- **Alternative considered:** Cloud-first, always-connected architecture with per-question API calls and GPU-based inference.
- **Why:** Public-school computer labs in India frequently have intermittent connectivity, not absent connectivity — meaning a connection exists at session start and at various points through a session, but cannot be assumed to be continuous. Batching makes the product usable through that pattern rather than dependent on sustained connection. CPU-first architecture keeps scaling costs low and avoids GPU availability constraints at state scale. PWA distribution eliminates installation and upgrade complexity on diverse, often ageing hardware.
- **What this looked like here:** AML's architecture means a student can complete an entire session if connectivity exists at session start and when moving between question sets — typically once or twice per session. Running costs are under ₹10 per child per year, a figure directly enabled by the CPU-first and batching decisions.
- **Before → After:** Before: per-question API calls would fail or stall every time connectivity dropped, interrupting sessions and raising server costs. After: sessions complete through realistic intermittent connectivity patterns; cost remains under ₹10/child/year at scale.
- **Condition — applies when:** Deployment environment has intermittent rather than continuous internet; devices are heterogeneous and often ageing; cost-per-interaction must remain viable at millions of learners.

---

**8. Treat the learner-data architecture as harder to recover from than any model**

- `Dimension: Solution`
- `Stage: Define`
- `Also relevant at: Scale`
- `Type: Strategic Decision`

- **Decision:** Invest in the competency structure, skill graph, prerequisite mapping, and telemetry schema before optimising any AI model — on the principle that a poorly designed learner-data architecture is much harder to recover from than a suboptimal model.
- **Alternative considered:** Focusing early investment on model accuracy (ASR recognition rate, recommendation algorithm quality) and treating the underlying competency structure as something that can be corrected later.
- **Why:** ASR engines and recommendation algorithms can eventually be replaced as better options emerge. A badly designed competency structure — one that misrepresents prerequisite relationships, or that cannot distinguish mastery from task completion — corrupts all subsequent learner modelling. Correcting it retrospectively requires either discarding historical learner data or reprocessing it against a new schema, both of which are costly and disruptive at scale.
- **What this looked like here:** AxL's misconception taxonomy and skill graph for AML were built from 2–3 million pen-and-paper responses and substantial academic research before any product was deployed. The architecture explicitly distinguishes level (which grade-equivalent concept) from step (which specific operation within a multi-step problem) — a distinction that makes PARS (Practice at the Right Step) possible.
- **Condition — applies when:** The AI system maintains persistent learner models across sessions; multiple models or components will be updated over time; the deployment is intended to run for years across millions of learners.

---

### Institution

**9. The deployment sequence is fixed and largely non-compressible**

- `Dimension: Institution`
- `Stage: Define`
- `Also relevant at: Pilot`
- `Type: Playbook`

- **Playbook:** The AxL/AML deployment sequence for each new state runs in this order, and each step must be substantially complete before the next begins:
  1. Secure named leadership buy-in — education minister, education secretary, or SCERT director, whichever role sits over school leadership in that state. This is a prerequisite for everything; the programme is driven by state leadership, not by the implementing organisation.
  2. Conduct infrastructure assessment — tied to the school's UDISE score plus additional surveys covering computer lab availability, computer count, and internet connectivity. This determines which schools can be included.
  3. In parallel with step 2: state leadership decides the programme's own name and where it sits within the state's broader configuration. An MOU is signed.
  4. Train the trainers — state trainers are trained in batches of thousands; those trainers then train teachers on the ground. Refreshed annually, with in-between refreshers. Nothing teacher-facing begins before this step.
  5. Teachers select participating students — through one of three approaches: existing state-defined student groupings, teacher judgement, or a diagnostic baseline. A timetable period is allocated.
  6. Sessions begin. The first one to two weeks involve substantial troubleshooting — mostly connectivity and ageing hardware, not the product. EkStep team members provide WhatsApp and phone support, including personal numbers. Usage stabilises after this period.
- **Note:** Compressing or reordering this sequence creates predictable failure modes: without leadership buy-in, timetable allocation does not happen; without infrastructure assessment, the wrong schools are included; without train-the-trainer, teachers cannot run sessions; without student selection, struggling students are not reached.
- **Condition — applies when:** Deploying in a new Indian state government context with an existing school system and computer lab infrastructure. Steps 1–3 may look different in non-government or international contexts.
- **Before → After:** Before this sequence was formalised (based on Delhi observation): rigid weekly-period mandates were issued, which schools found difficult to execute consistently. After: flexible cumulative-hours targets (8 hours by Diwali, 8 more by session end) replaced the fixed mandate, and usage improved.

---

**10. Ownership transfers fully to the state; plan for a narrow ongoing role**

- `Dimension: Institution`
- `Stage: Scale`
- `Type: Strategic Decision`

- **Decision:** Design the post-deployment operating model so that the state education department has complete ownership of programme implementation, with EkStep's ongoing role narrowed to two functions: continuing to train the trainers, and continuing to provide troubleshooting support.
- **Alternative considered:** Retaining operational co-ownership or requiring ongoing EkStep involvement in programme management after deployment.
- **Why:** State education departments have the mandate, the field structure (BEO/DEO/HM/teacher chain), and the government legitimacy to run this at scale. A model that requires continued external operational involvement does not institutionalise; it remains a project. The state hierarchy — leadership running weekly or fortnightly review meetings, BEO/DEO going into the field, HMs ensuring lab readiness, teachers getting students to the lab — is already the right structure for ongoing accountability. EkStep's comparative advantage is product development and training, not operational management.
- **What this looked like here:** Different states give the programme their own names. EkStep does not manage implementation; the entire programme is the state's. EkStep continues training and troubleshooting. The long-term sustainability path is for PII-bearing services to move to state-hosted infrastructure over time, reducing even the hosting dependency.
- **Condition — applies when:** The deploying organisation is a non-government foundation working within a government school system; the government system has an existing field hierarchy capable of running programme implementation; the product is mature enough that ongoing product development is separable from day-to-day operational management.

---

### Ecosystem

**11. No single organisation can supply every needed capability**

- `Dimension: Ecosystem`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** Identify from the outset which capabilities the deploying organisation cannot supply internally — pedagogy validation, specialised language technology, independent outcome measurement, field implementation, and government legitimacy — and name a partner for each before building begins.
- **Alternative considered:** Attempting to build all required capabilities internally, or beginning deployment without named partners for critical dependencies.
- **Why:** Reading AI specifically requires specialised ASR and Indic-language capabilities that benefit from broader ecosystem innovation and cannot be built cost-effectively by a single foundation. Independent research and measurement are required because internal application progression is insufficient evidence of real-world impact. Government participation is required for scale, legitimacy, and institutionalisation that no non-government organisation can substitute. Implementation partners provide the training, local support, field troubleshooting, and sustained school relationships that deployment at thousands of schools requires.
- **What this looked like here:** AxL was built in collaboration with AI4Bharat (Dhruva infrastructure), IISc Centre for Neuroscience (learning-task design), and Bodhan.ai (FLN AI research and scale). Government systems across 10+ states provide the deployment environment and, post-deployment, the ownership structure. How the roles of AI4Bharat, IISc, and Bodhan.ai are precisely divided is not fully documented in available sources.
- **Condition — applies when:** The deployment requires specialised language technology (particularly for low-resource Indian languages), independent outcome validation, and deployment at government school scale.

---

**12. Separate the learner's identity from the learner's data**

- `Dimension: Ecosystem`
- `Stage: Define`
- `Also relevant at: Scale`
- `Type: Strategic Decision`

- **Decision:** Design the system so that personalisation never depends on a child's name or other directly identifying information. Represent learners through virtual or pseudonymous identifiers; attach all telemetry, assessment responses, and progression data to those identifiers rather than to the child's identity. Restrict access to any sensitive or identifiable data through role-based controls. Plan from the outset for PII-bearing services to be hosted by state governments, not retained indefinitely by EkStep.
- **Alternative considered:** Using student identity (name, enrollment ID, or other direct identifiers) as the key for the learner model, with EkStep retaining hosting of all services.
- **Why:** The personalisation system does not require a child's name to function; it requires a persistent learner model. Separating identity from learning data allows AxL to build rich longitudinal learner profiles without making PII a dependency of the AI system, which both reduces privacy risk and enables the planned handover of PII-hosting to state governments — making long-term sustainability less dependent on EkStep's own infrastructure budget.
- **What this looked like here:** States are expected to host services containing personally identifiable information themselves. EkStep assists with configuration and provides engineering bandwidth to set up that hosting, but does not retain custody of PII long-term.
- **Condition — applies when:** The deployment involves children's data in a government school context; long-term sustainability requires reducing dependency on the founding organisation's infrastructure; multiple state government partners each require data sovereignty over their own learners.

---

## Section 4 — Toolkits and Playbooks

| Unit | Asset / Playbook | Reuse condition |
|---|---|---|
| Unit 9 | State deployment sequence playbook (6-stage gated process: leadership buy-in → infrastructure assessment → MOU → train-the-trainer → student selection → sessions + troubleshooting) | Applies when deploying in an Indian state government school context with existing computer lab infrastructure; steps 1–3 may require adaptation in non-government or international contexts |
| Unit 5 | Pen-and-paper misconception data collection approach (scan handwritten responses to map error patterns before product exists) | Applies when the domain is structured enough that a finite misconception taxonomy exists; requires access to the target learner population before digital product deployment |
| Unit 7 | Connectivity-aware batching architecture (group 10–20 questions per API call; CPU-first compute; PWA distribution) | Applies when deployment environment has intermittent rather than continuous internet and heterogeneous, often ageing, school hardware |
| Unit 12 | Pseudonymous identifier data architecture (separate learner identity from learner model; plan state-hosting handover for PII services from day one) | Applies when deployment involves children's data in a government context and long-term sustainability requires reducing founding organisation's hosting dependency |

---

## Section 5 — Problem→Solution Patterns

*Omitted — Failure-and-Fix units in Section 3 cover this material in full.*

---

## Section 6 — Retrieval Guide

*"How do I explain to a state government why they need this before any AI exists?"* → Unit 1, Unit 2

*"What is the right way to frame what this product actually does?"* → Unit 1, Unit 2

*"We're trying to decide what to build versus reuse versus integrate — where do we start?"* → Unit 8, Unit 11

*"What broke first when we went live in schools?"* → Unit 6, Unit 9

*"How do I make sure teachers don't reject this?"* → Unit 3, Unit 9

*"How do we handle the fact that our schools have terrible internet?"* → Unit 7

*"What data do I need before I build anything?"* → Unit 5, Unit 8

*"How do we measure whether the AI is actually working?"* → Unit 4, Unit 6

*"Who owns this after we deploy, and what does that look like?"* → Unit 10

*"How do we protect children's data while still building a useful learner model?"* → Unit 12

*"What partners do we need, and which capabilities can't we build ourselves?"* → Unit 11

*"What is the sequence of steps to deploy in a new state?"* → Unit 9

*"Why is personalising on grade a mistake?"* → Unit 2

*"How do I convince a sceptical state secretary to commit?"* → Unit 9, Unit 10

*"What makes foundational math specifically tractable for AI?"* → Unit 5, Unit 8

*"How do we keep costs low at a million learners?"* → Unit 7, Unit 10

*"What counts as success — usage, or something else?"* → Unit 4, Unit 6

*"How do we design the system to survive a leadership change at the state level?"* → Unit 10

*"What does the teacher actually do, and what are they explicitly not asked to do?"* → Unit 3, Unit 9

*"Should we build ASR ourselves or integrate it?"* → Unit 8, Unit 11

---

---

## Source Trace Appendix

*Contributor-facing only — not surfaced in any adopter-facing response.*

| Source file | Covers | Notes |
|---|---|---|
| AML Diffusion Pathway — Interview Questions (1).docx (September 2026) | Pathway Identity (scale, cost anchor, geography, evidence figures, partner names); Units 1–12 (problem framing, misconception taxonomy, deployment sequence, teacher workflow, cost, evaluation, student selection, state ownership, replication); Section 2 gaps (infrastructure, teacher effort, state ownership) | Primary source for all AML-specific operational detail: deployment sequence, cost figures, student selection approaches, teacher workflow, misconception data strategy, troubleshooting model, evidence figures. Varun Garg, AML Team, EkStep Foundation. |
| AML Pathway Full Audio_summary (1).txt (September 02, 2026) | Pathway Identity (scale, cost, evidence); Units 1, 3, 7, 9, 10 (deployment prerequisites, teacher design, API batching, deployment sequence, state ownership) | AI-generated summary of the same session as the transcript below. Confirms content from the interview questions document; does not add independently sourced facts. Treated as confirms-only relative to the interview questions document. |
| AML Pathway Full Audio_transcript.txt (September 02, 2026) | Pathway Identity (scale, evidence figures, partner names); Units 1–12 across all dimensions | Full transcript of the Varun Garg interview. Primary source; the interview questions document is a cleaned version of this material. Where the two conflict on a figure, the interview questions document (cleaned version) is treated as authoritative. |
| AxL AI Diffusion Pathway (2) (1).pdf (undated; content references September 2026 as-of date) | Pathway Identity (all fields); Section 1 (problem framing, policy backdrop, Jagadish Babu quotes); Section 2 (ALL/AML architecture, architectural principles); Section 3 (institution, ecosystem, workforce, operating model); Units 1–12 across all dimensions; Section 2 gaps list | Primary source for AxL-level (ALL + AML + Companion) framing, architectural principles, governance model, ecosystem partners, workforce design, operating model, and the FLN DPI / Bodhan.ai account. Also the source for Jagadish Babu's framing of DPI and FLN policy backdrop. |
| AXL_Diffusion_Pathway (1).docx (as of September 2026) | Pathway Identity (Deployment at a Glance, evidence, cost, partners, scope); Section 0 (reading guide framing); Sections 1–6 (all dimensions and stages); Units 1–12; Section 2 gaps | Primary narrative pathway document. Synthesises AML interview, AxL master architecture document, WB deck, and Jagadish Babu interview. The "Note on Sources" within this document explicitly flags that most concrete operational detail is from the AML side and should be treated as illustrative for ALL. |
| AXL_for WB_July 2026 (3).pptx (July 2026) | Pathway Identity (scale — 18,000+ schools, 10+ states; evidence — 70% improvement figure; partners — IISc, Bodhan.ai; device/headset specs); Unit 3 (teacher augmentation framing); Unit 11 (partner architecture) | Primary source for scale figures and the IISc/Bodhan.ai partner framing. Headset specification slide (Section 4 candidate — not included as a unit because it is procurement guidance rather than a transferable decision). |
| AXL_Solution_Brief (2).docx (undated; references July 2026 deck) | Pathway Identity (scale, partners, evidence); Section 2 gaps list | Secondary source; synthesises the WB deck and axl.ekstep.org. Gaps list in the Solution Brief was used to cross-check Section 2 of this pathway. Confirms-only relative to the primary sources above, with the exception of the explicit gaps list which informed Section 2 gap framing. |

## Reusable resources

- [AML Diffusion Pathway — Interview Questions (1).docx](https://cube.100pathways.com/resources/f51f9d02-a57b-40f0-af62-c514eb7c052d)
- [AML Pathway Full Audio_summary (1).txt](https://cube.100pathways.com/resources/14645919-3fac-4942-9d3a-c498edcc29cd)
- [AML Pathway Full Audio_transcript.txt](https://cube.100pathways.com/resources/6eebc39f-dfab-4e1c-8b77-2bd64255e50c)
- [AxL AI Diffusion Pathway (2) (1).pdf](https://cube.100pathways.com/resources/69faa806-c263-4a3f-bdf3-e1d17ca091cc)
- [AXL_Diffusion_Pathway (1).docx](https://cube.100pathways.com/resources/112ff648-6c1b-409b-8004-77f029ae520f)
- [AXL_Solution_Brief (2).docx](https://cube.100pathways.com/resources/c24e8ab8-d4e8-42f2-a147-7d4f2621b2c8)
- [AXL_for WB_July 2026 (3).pptx](https://cube.100pathways.com/resources/40496472-f643-4c9c-b1ff-e9350968d6d3)
