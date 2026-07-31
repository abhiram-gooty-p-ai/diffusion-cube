---
type: Pathway
title: Data DHARA
description: A horizontal data-unlock pathway turning fragmented, siloed government records into coordinated, machine-readable systems — illustrated through Nivesh Suvidha (Invest UP) and three sibling deployments.
tags: [Data Infrastructure, Governance]
stage: Define
timestamp: 2026-07-31
---

# Section 0 — Overview

Data DHARA is a horizontal enabler pathway, not a single deployment:
each implementation solves a local use case while generating reusable
technical assets and non-technical know-how that lowers cost and
uncertainty for every subsequent adopter. Across every use case
touched — vital statistics, investment promotion, exports — the
authoritative data already exists but is stale, siloed, un-linkable, or
trapped in PDFs. For an AI pipeline, a PDF is not data — it's a picture
of data. The pathway treats that as an institutional-alignment and
process-redesign problem that data insights can power, not a data-
absence problem.

**Four sibling pathways have emerged from pilots:**

| Pathway | Issue | Reusable asset |
|---|---|---|
| Delhi vital statistics → health outcomes | Vital-statistics data locked inside departmental PDFs, not linkable across health/nutrition/education systems | Cross-department linkage playbook + data harmonisation/linkage toolkit + AI-readiness dataset score |
| Invest UP — Nivesh Mitra / **Nivesh Suvidha** | Investment policy intelligence fragmented across 45 UP departments; ~15,000 investor queries backlogged | Document taxonomy, metadata schema, and a chatbot answering policy/scheme/land questions with traceability to source documents |
| Invest UP — UPSIDA | Manual, hard-to-audit land-allotment scoring across 43 investor-facing services | 7 reusable use-case categories (verification, eligibility scoring, policy intelligence, calculation, decision support, certificate generation, incentive assessment) |
| Data for exports (first-time MSME exporters) | Trade, registry, and compliance data fragmented, English-only, and priced for large exporters only | Schema-normalised, multilingual trade/registry datasets for the long tail of MSME exporters |

This pathway focuses primarily on **Nivesh Suvidha** (Invest UP), the
sub-pathway with the most detailed source material, with the other
three cited where they add a distinct, well-evidenced lesson.

**Where this pathway doesn't apply.** Weakest where an institution has
no willingness to name a nodal owner for data, or where the underlying
data genuinely doesn't exist yet (rather than existing but being
fragmented, siloed, or PDF-locked).

# Section 1 — Pathway identity

| Field | Value |
|---|---|
| Scale achieved | Nivesh Suvidha's first pilot cohort was 20 Udyami Mitras (as of ~March 2026), drawn from a base of Udyami Mitras across 75 districts, covering document/policy material from 26 Nivesh Mitra issuing departments; investment-policy fragmentation spans 45 UP departments (context, not deployment scale) |
| Cost anchor | Not documented in the source as an absolute figure. The two named cost drivers are cloud cost and LLM (Claude credit) usage, with LLM usage the one that rose unexpectedly during the pilot (Unit 17) |
| Build effort | MoU signed November 2025 → SOW January 2026 → live pilot with 20 Udyami Mitras around March 2026 — roughly 3–4 months from MoU to pilot |
| Known downstream adopters | Not documented as sequential/downstream adoption. Three sibling pathways (Delhi vital statistics, Invest UP – UPSIDA, MSME export data) sit alongside Nivesh Suvidha as parallel deployments sharing the same institutional-alignment thesis; Blue Dots and CEEW Climate Intelligence are named as related pathways sharing the same diagnosis |
| Scope / does not transfer when | Weakest where an institution has no willingness to name a nodal owner for data, or where the underlying data genuinely doesn't exist yet — rather than existing but being fragmented, siloed, or PDF-locked |

# Section 2 — Coverage grid and gaps

| Dimension | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| Persona | ●● | ○ | ○ | ● |
| Solution | ●● | ● | ●● | ● |
| Institution | ● | ●●● | ●●● | ● |
| Ecosystem | ● | ● | ● | ● |

**Open questions**

- Persona/Define has no single, must-answer critical use case named for Nivesh Suvidha's pilot scope — Unit 2 documents demand validation (a query backlog) but not one defining question the way this stage calls for.
- Persona/Pilot has no persona-side failure taxonomy (scope vs. quality vs. experience) documented for Nivesh Suvidha — the only Pilot-stage frontline-user content (Unit 15) addresses onboarding/training, not failure classification.
- Institution/Explore names the structural gap (no nodal officer, CEO-dependency — Unit 10) but doesn't name an individual champion with a personal stake in the deployment's success.
- Institution/Scale names the capacity gap (Unit 19) but doesn't state a budget line, named operational owner, or review cadence for Nivesh Suvidha itself at scale.
- Ecosystem/Explore documents a convening event (Unit 20) but not a precedent-deployment or transfer analysis — what else had been tried, what transferred — specific to Nivesh Suvidha.
- Solution/Scale names four reusable toolkits (Unit 9) but doesn't document an unbundling trigger or a formal data-SLA map at scale for Nivesh Suvidha.

# Section 3 — Micro-innovations

## Persona

**1. Diagnose fragmented-data problems as institutional-alignment problems, not data-absence problems**
- Dimension: Persona
- Stage: Explore
- Type: Strategic Decision
- Decision: Across every use case touched (vital statistics, investment promotion, exports), treat the underlying blocker as institutional alignment, process redesign, and coordination — not the absence of data — because in each case the authoritative data already exists but is stale, siloed, un-linkable, or trapped in PDFs.
- Alternative considered: Treating the barrier as a data-availability or technology problem to be solved primarily with pipelines and APIs.
- Condition — applies when: The underlying data exists but is fragmented, siloed, or PDF-locked, and no institution has yet been willing to name a nodal owner for it.
- Condition — fails when: The underlying data genuinely doesn't exist yet, rather than existing but unlinked.
- Before → After: Not documented in the source as a single before/after moment; the reframing is presented as the pathway's founding thesis, generating four sibling deployments each built around institutional-pathway work rather than data pipelines alone.

**2. Scope the build around two named personas, validated by real backlog demand**
- Dimension: Persona
- Stage: Explore
- Type: Strategic Decision
- Decision: Scope Nivesh Suvidha around two named personas — investors setting up business in UP, and Udyami Mitras (investment facilitation officers/account managers) — and validate the need with hard demand evidence (a backlog of roughly 15,000 investor queries) rather than an assumed need, since Udyami Mitras' actual job is support and speed and fragmentation was directly undermining it.
- Alternative considered: Not documented in the source.
- Condition — applies when: A frontline facilitation role exists whose job function is measurably undermined by fragmented information, and query-volume evidence is available to confirm it.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source as a quantified before/after; the ~15,000-query backlog is presented as the evidence justifying the build, in place of an assumed need.

**3. Target investor agency, not helpline dependency, as the scale-stage success measure**
- Dimension: Persona
- Stage: Scale
- Type: Strategic Decision
- Decision: Define success at scale as investors becoming more capable of navigating the investment process themselves, not more dependent on a helpline-style AI tool.
- Alternative considered: Not documented in the source.
- Condition — applies when: Not documented in the source.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source — stated as a design intent, not a measured outcome.

## Solution

**4. Twelve-field document schema for unstructured government policy material**
- Dimension: Solution
- Stage: Explore
- Type: Toolkit Asset
- Toolkit asset: A document/metadata schema with twelve fields — title, summary, text, category, sub-category, document type, tags, policy year, issuing department, fee, timelines, approval phase — built specifically because raw circulars, manuals, GOs, and hidden URLs aren't usable by AI as-is.
- Reusable as-is: Any adopter facing an unstructured corpus of government circulars, manuals, or GOs can lift this field set directly to normalize documents before AI use.
- Condition — applies when: The source material is unstructured administrative/policy documents rather than already-structured records.

**5. Seven-category taxonomy for triaging AI-fit government services**
- Dimension: Solution
- Stage: Explore
- Type: Toolkit Asset
- Origin deployment: Invest UP – UPSIDA (a sibling deployment within Data DHARA, not Nivesh Suvidha)
- Toolkit asset: A seven-category taxonomy for classifying which of many manual, investor-facing services are AI-amenable — verification, eligibility scoring, policy intelligence, calculation, decision support, certificate generation, and incentive assessment — developed against UPSIDA's 43 manual, hard-to-audit land-allotment scoring services.
- Reusable as-is: The seven categories themselves, as a triage checklist for any institution with a large number of manual scoring/verification services deciding where to start.
- Condition — applies when: An institution has dozens of manual, investor- or citizen-facing services and needs to prioritize which are AI-amenable.

**6. Build fast on rented cloud, then migrate to the institution's own infrastructure**
- Dimension: Solution
- Stage: Define
- Type: Strategic Decision
- Decision: Use AWS during the build phase for speed, then migrate to a hybrid architecture hosted on InvestUP's own cloud infrastructure with full data/code ownership sitting with InvestUP; keep the foundation layer cloud-agnostic and open-source, separable from the vendor's instance.
- Alternative considered: Not documented in the source (implicitly, remaining on vendor-managed cloud infrastructure long-term).
- Condition — applies when: The institution needs long-term data/code ownership and wants to avoid vendor lock-in, but needs build velocity in the short term.
- Condition — fails when: Not documented in the source.
- Before → After: Before, the system was built and run on AWS for speed; after, it migrated to InvestUP's own cloud infrastructure with full ownership, while the foundation layer stayed cloud-agnostic and separable from the vendor's instance.

**7. Use public-data status to keep vendor access operational-only and outputs traceable**
- Dimension: Solution
- Stage: Pilot
- Type: Strategic Decision
- Decision: Because all data used is publicly available and owned by InvestUP (no sensitive or confidential data involved), skip formal data-access approval, keep the vendor's access strictly operational and revocable, and keep every AI output traceable to a specific policy version.
- Alternative considered: Not documented in the source.
- Condition — applies when: The underlying corpus is genuinely public government policy/administrative material.
- Condition — fails when: Sensitive or confidential data is involved, which would require formal data-access approval instead.
- Before → After: Not documented in the source.

**8. Seven-stage pipeline to unlock siloed government datasets in place**
- Dimension: Solution
- Stage: Pilot
- Type: Playbook
- Origin deployment: Delhi vital-statistics pathway (a sibling deployment within Data DHARA, not Nivesh Suvidha)
- Playbook: Move a department's data through seven gated stages — (1) dataset inventory, (2) metadata tagging, (3) schema transformation, (4) dissemination-ready datasets, (5) API access, (6) discoverable catalogue, (7) agent/MCP access — with the whole pipeline runnable inside the department's own infrastructure throughout.
- Note: Not documented in the source (no stated common failure mode for skipping stages).
- Condition — applies when: A government department's data exists but is fragmented, siloed, or locked in departmental PDFs, and the department wants to preserve its own hosting/control throughout.
- Before → After: Not documented in the source.

**9. Four reusable technical toolkits named coming out of the build**
- Dimension: Solution
- Stage: Scale
- Type: Toolkit Asset
- Toolkit asset: Four named reusable components — a structured, machine-readable government policy/GO knowledge repository; a purpose-built investor UI toolkit; an open-source code repository deployable by any state or agency; and a telemetry/usage-analytics framework.
- Reusable as-is: Each is named explicitly as reusable across deployments and states, independent of any one institution's instance.
- Condition — applies when: Not documented in the source beyond the general reusable-across-deployments framing.

## Institution

**10. No named nodal officer left data-sourcing momentum dependent on one person**
- Dimension: Institution
- Stage: Explore
- Also relevant at: Pilot
- Type: Failure and Fix
- Failure: No single nodal officer was appointed for data sourcing at the outset, and there was no internal digital-transformation leadership; decisions and momentum depended entirely on the CEO.
- Fix: For the next use case, request a designated nodal officer (SME) upfront (see Unit 14).
- Insight: A project whose momentum depends entirely on one senior sponsor has a fragile foundation, even when that sponsor is fully engaged.
- Condition — applies when: A government AI deployment has an engaged senior sponsor but no separately named data-sourcing owner.

**11. Name Invest UP as nodal institution with the CEO as sign-off authority**
- Dimension: Institution
- Stage: Define
- Type: Strategic Decision
- Decision: Formalize Invest UP (under UP's Infrastructure & Industrial Development Department) as the nodal institution, with the Invest UP CEO as the named sign-off authority for budget and project.
- Alternative considered: Not documented in the source.
- Condition — applies when: A government AI deployment needs a single, unambiguous decision-rights holder before build begins.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**12. Engage leadership in person around the broader vision, not as a technical pitch**
- Dimension: Institution
- Stage: Define
- Type: Strategic Decision
- Decision: Build velocity through in-person engagement with the Invest UP CEO as central decision-maker, framed around gaining confidence in the broader vision rather than positioning the work as a standalone technical deliverable.
- Alternative considered: Positioning the engagement primarily as a technical deliverable/procurement.
- Condition — applies when: A single senior decision-maker's confidence and continued engagement determines whether the project keeps moving.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source as a quantified before/after; this approach is presented as the source of engagement velocity (MoU in November 2025 to a live pilot by roughly March 2026).

**13. Build iteratively against discovered gaps rather than waiting for a complete repository**
- Dimension: Institution
- Stage: Define
- Type: Tactical Decision
- Decision: Build iteratively as deployment reveals gaps, rather than waiting for a complete, centralised policy repository before starting.
- Alternative considered: Waiting for a complete centralised policy repository before launching.
- Condition — applies when: The full underlying document set can't realistically be centralised and cleaned before the institution needs to see progress.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**14. Three-step readiness sequence for the next use case**
- Dimension: Institution
- Stage: Pilot
- Type: Playbook
- Playbook: Before starting the next use case — (1) request a designated nodal officer (SME) upfront; (2) identify all data/access requirements and get owner timeline commitments before work begins; (3) invest in in-person engagement with both the working team and the CEO early, not only at signing and the final demo.
- Note: Skipping step (1) recreates the single-sponsor fragility seen in Nivesh Suvidha's own Explore stage (Unit 10).
- Condition — applies when: Scoping a new government use case or department engagement.
- Before → After: Not documented in the source — this is forward-looking guidance, not yet re-tested on a subsequent use case in this source.

**15. Let use itself be the training for frontline officers**
- Dimension: Institution
- Stage: Pilot
- Type: Tactical Decision
- Decision: Give the 20 Udyami Mitras in the first pilot cohort access without formal training beforehand, letting query complexity build naturally — simple policy questions, then scheme eligibility, then routing support, then subsidy calculations.
- Alternative considered: Not documented in the source (implicitly, a formal training program before access).
- Condition — applies when: The user base is already a professionally qualified, domain-expert group (here, facilitation officers already familiar with the subject matter).
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source as a stated prior assumption; the pilot cohort's complexity was absorbed incrementally without formal training being put in place first.

**16. Keep the AI advisory-only; judgment and accountability stay with human officers**
- Dimension: Institution
- Stage: Pilot
- Type: Strategic Decision
- Decision: Design the system so it surfaces information and options only; policy interpretation, scheme eligibility, land-allotment approvals, and investor routing all remain decisions made by human officers.
- Alternative considered: Not documented in the source.
- Condition — applies when: Decisions carry regulatory, legal, or public accountability weight.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**17. LLM usage costs rose unexpectedly during the pilot**
- Dimension: Institution
- Stage: Pilot
- Type: Failure and Fix
- Failure: Of the two named cost drivers (cloud cost and LLM/Claude credit usage), LLM usage is where costs unexpectedly increased during the pilot.
- Fix: Put infrastructure/LLM usage tracking in place for steady state, and make an explicit self-hosted-vs-subscription LLM decision rather than letting usage run untracked (see Unit 18).
- Insight: Token/usage-based LLM costs need active monitoring once a pilot is live — they don't behave like a fixed line item the way cloud infrastructure cost does.
- Condition — applies when: A live system's LLM usage isn't being actively tracked against a budget.

**18. Five-item steady-state operating checklist**
- Dimension: Institution
- Stage: Pilot
- Also relevant at: Scale
- Type: Toolkit Asset
- Toolkit asset: A five-item checklist for what steady-state (post-pilot) operation requires — infrastructure/LLM usage tracking, a process to self-update the knowledge repository, an explicit self-hosted-vs-subscription LLM decision, continuous feedback collection, and continuous enhancement of the knowledge repository.
- Reusable as-is: The five items themselves, as a direct checklist for any adopter planning the transition from pilot to sustained operation.
- Condition — applies when: Transitioning a pilot toward continuous, sustained operation.

**19. Without deliberate capacity building, institutions stay dependent on vendors**
- Dimension: Institution
- Stage: Scale
- Type: Failure and Fix
- Failure: Building and sustaining an AI system requires capabilities most government institutions don't yet have — data management, prompt engineering, system maintenance — and, named explicitly, the lack of internal digital-transformation leadership (no Chief Digital Officer/Chief Data Officer) means no one owns the AI agenda institutionally at scale.
- Fix: Budget explicitly for the capacity-building gap alongside the technical build.
- Insight: Without deliberate capacity building, institutions stay dependent on external vendors indefinitely, with no path to self-sufficiency.
- Condition — applies when: Planning to scale a deployment beyond the founding project team.

## Ecosystem

**20. Convene institution, frontline staff, and ecosystem players together, facilitated by a neutral party**
- Dimension: Ecosystem
- Stage: Explore
- Type: Strategic Decision
- Decision: Bring Invest UP leadership, the Udyami Mitra team, and market/ecosystem players together in one room (an August 2025 workshop at EkStep's Bangalore office, where EkStep presented its Data & AI Readiness project) so teams could share operational challenges directly, rather than starting from separate bilateral conversations.
- Alternative considered: Not documented in the source.
- Condition — applies when: Multiple organisationally distinct actors (institution, funder/convener, technical partners) need a shared starting understanding before an engagement is scoped, and a neutral convener is available.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source as a quantified change; the workshop is presented as the originating event that led to the engagement being scoped.

**21. Name six distinct ecosystem roles before building**
- Dimension: Ecosystem
- Stage: Define
- Type: Strategic Decision
- Decision: Name and fix six distinct roles before build work began — Invest UP (nodal institution, supplies/validates data), Kenpath Technologies (vendor, builds/maintains the tools, pipeline, chatbot, telemetry), EkStep/People+AI (AI expertise, owns the reusable layer), Anthropic (model supplier), the 26 Nivesh Mitra issuing departments (indirect contributors via their process-flow documents), and Udyami Mitras across 75 districts (front-line users).
- Alternative considered: Not documented in the source.
- Condition — applies when: Multiple organisationally distinct actors are each required to build the same product.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**22. Coordination burden fell entirely on the neutral convener**
- Dimension: Ecosystem
- Stage: Pilot
- Type: Failure and Fix
- Failure: Coordinating across the institution, vendor, and ecosystem partners required significant orchestration effort from a neutral organisation (EkStep); the absence of a single nodal officer meant sourcing required chasing multiple stakeholders, and coordination between the institutional team and the vendor team needed more deliberate structure than was initially in place.
- Fix: Name a nodal officer upfront and define the coordination structure between institution and vendor before work begins (same fix as Unit 14).
- Insight: Cross-actor coordination needs a named structure, not a well-meaning neutral convener absorbing the gap.
- Condition — applies when: Three or more organisationally distinct actors (institution, vendor, neutral convener) must coordinate delivery together.

**23. Package every engagement as a technical toolkit plus the institutional mechanisms that make it land**
- Dimension: Ecosystem
- Stage: Scale
- Type: Strategic Decision
- Decision: Treat every engagement as two paired deliverables — a reusable technical toolkit, and the non-technical mechanisms (institutional anchoring, coordination, playbook) that make it land — with the second component carrying roughly 70% of the value.
- Alternative considered: Not documented in the source.
- Condition — applies when: Handing a deployment's lessons on to a new adopter or a new use case.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

# Section 4 — Toolkits and playbooks

| Unit | Type | Reuse condition |
|---|---|---|
| Unit 4 — Twelve-field document schema | Toolkit Asset | Lift directly to normalize an unstructured corpus of circulars, manuals, or GOs before AI use |
| Unit 5 — Seven-category AI-fit taxonomy (UPSIDA) | Toolkit Asset | Use to triage which of many manual scoring/verification services to tackle first |
| Unit 8 — Seven-stage data-unlock pipeline (Delhi) | Playbook | Use when a department's data exists but is fragmented, siloed, or PDF-locked and hosting must stay in-department |
| Unit 9 — Four named reusable technical toolkits | Toolkit Asset | Lift the named components for a comparable investor-facing deployment |
| Unit 14 — Three-step next-use-case readiness sequence | Playbook | Run before scoping any new government use case or department engagement |
| Unit 18 — Five-item steady-state operating checklist | Toolkit Asset | Use when transitioning a pilot to sustained operation |

# Section 5 — Problem→solution patterns

| Problem | Root cause | Solution | Result | Condition |
|---|---|---|---|---|
| No one owned data-sourcing coordination; project momentum depended entirely on the CEO | No nodal officer appointed at the outset; no internal digital-transformation leadership | Request a designated nodal officer/SME upfront for the next use case; get owner timeline commitments before work begins (Unit 14) | Not documented in the source — guidance is forward-looking, not yet re-tested | Applies when a new government use case or department is being scoped |
| LLM (Claude credit) usage costs rose unexpectedly during the pilot | Token/usage-based LLM costs weren't tracked proactively | Institute infrastructure/LLM usage tracking; make an explicit self-hosted-vs-subscription LLM decision (Unit 18) | Not documented in the source — specified as a steady-state requirement, outcome not yet reported | Applies once a pilot moves toward continuous/steady-state operation |
| Institutions can't sustain the system without the original vendor/consultant team | No internal data-management, prompt-engineering, or system-maintenance capability; a capacity-building gap for 0-to-1 deployment | Budget explicitly for capacity building alongside the technical build | Not documented in the source | Applies when planning to scale beyond the founding project team |
| Coordination between institution and vendor fell entirely on a neutral third party | Absence of a named nodal officer meant sourcing required chasing multiple stakeholders; no deliberate coordination structure | Name a nodal officer upfront and define the coordination structure before work begins (same fix as Unit 14) | Not documented in the source | Applies when three or more organisationally distinct actors must coordinate delivery |

# Section 6 — Retrieval guide

- *"How do we know if our 'data problem' is actually an institutional problem?"* → Unit 1
- *"How do we validate real demand before we build, instead of assuming it?"* → Unit 2
- *"What should our success metric be for investors — fewer helpline calls, or something else?"* → Unit 3
- *"What does a usable metadata schema look like for unstructured circulars, GOs, and manuals?"* → Unit 4
- *"How do we tell which of our manual scoring/verification services are actually AI-fit?"* → Unit 5
- *"Should we build on a vendor's cloud or our own, and when do we migrate?"* → Unit 6
- *"Do we need formal data-access approval before we start?"* → Unit 7
- *"How do we unlock siloed government datasets without giving up hosting control?"* → Unit 8
- *"What reusable technical assets should we expect out the other side of a deployment like this?"* → Unit 9, Unit 23
- *"How much should this depend on one senior sponsor?"* → Unit 10, Unit 14
- *"Who should formally own budget and project sign-off?"* → Unit 11
- *"How do we get institutional leadership actually engaged, not just at signing and demo?"* → Unit 12
- *"Should we wait for a complete data repository before piloting?"* → Unit 13
- *"What should we do differently before starting our next use case?"* → Unit 14
- *"Do frontline staff need formal training before they get access?"* → Unit 15
- *"Who's accountable when the AI gets something wrong?"* → Unit 16
- *"Our LLM costs are rising unexpectedly — what should we track?"* → Unit 17, Unit 18
- *"What do we need in place to run this sustainably after the pilot ends?"* → Unit 18
- *"Institutions keep telling us they'll build capacity later — how big a risk is that?"* → Unit 19
- *"Who needs to be in the room before we even scope this?"* → Unit 20
- *"How do we map out all the partners this will actually require?"* → Unit 21
- *"Coordination between our team and the vendor is falling apart — is that normal?"* → Unit 22
- *"What's actually worth handing to the next adopter, and under what conditions?"* → Unit 23

---

## Provenance appendix

*Contributor-facing only — not surfaced in any adopter-facing response.*

| Source file | Covers | Notes |
|---|---|---|
| `data-dhara.md` (prior library version, as of 2026-05-01) | Section 1 (all identity fields), Section 2 (grid counts and all six open questions), Section 3 (Units 1–23, all four dimensions), Section 4 (all six rows), Section 5 (all four rows), Section 6 (all retrieval entries) | Reclassification of an existing corpus entry from the prior 7-category framework (Problem, Persona, Technology, Institution, Ecosystem, Workforce, Operating Model) into the 4-dimension framework — not fresh raw-material synthesis. All facts, figures, and quotes are drawn entirely from this prior version. That prior version itself cites two underlying raw files (a Data Unlock Project Thesis PDF and a Six Shifts interview-response PDF) which were not independently reviewed for this reclassification. |
