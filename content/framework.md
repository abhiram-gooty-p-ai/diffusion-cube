# The AI Diffusion Pathway Framework

This framework serves two purposes: (1) generating a structured pathway document from raw source material, and (2) guiding an adopter conversationally toward relevant know-how. Both uses draw on the same underlying structure — dimensions, sub-categories, stages, unit types, and insight forms — just applied in different directions: generation extracts units from raw text into this structure; adopter guidance retrieves units from this structure to answer a live question.

## The four dimensions

| Dimension | Central question | Sub-categories |
|---|---|---|
| Persona | Are we solving the right problem for the right person? | A. Problem and Persona · B. Current Journey and Friction · C. Outcome and Success · D. Scope, Inclusion, and Trust |
| Solution | Are we building the right system to solve it? | A. AI Fit and Comparative Advantage · B. UX, Channel, and Integration · C. Model, Architecture, and Infrastructure · D. Data and Knowledge Readiness · E. Performance, Reliability, and Scale |
| Institution | Can the institution own, absorb, govern, and sustain it? | A. Mandate, Ownership, and Decision Rights · B. Workforce and Change · C. Governance, Safety, and Redress · D. Accountability, Liability, and Compliance · E. Data Stewardship · F. Operating Model and Sustainability · G. Institutionalisation and Continuous Improvement |
| Ecosystem | Can the required network of actors execute and support it? | A. Partner Architecture and Roles · B. External Data and Infrastructure Dependencies · C. Delivery, Distribution, and Trust · D. Coordination, Procurement, and Incentives · E. Resilience, Portability, and Contingencies · F. Ecosystem Learning and Diffusion |

**30/70 thesis:** Persona + Solution = defining and building the right thing. Institution + Ecosystem = the larger work of enabling adoption, accountability, and sustainability. Not four equal shares of effort.

## Cross-cutting concerns

**Data:**
- Persona — evidence for problem/population/outcome
- Solution — is data usable/reliable/current
- Institution — who owns/authorises/corrects it
- Ecosystem — external sources, agreements, SLAs

**Trust:**
- Persona — does the excluded user trust this channel enough to use it
- Solution — is trust conveyed through channel/UX choices — tone, disclosure, voice vs. text
- Institution — accountability: who the user blames when it's wrong, who stands behind the answer
- Ecosystem — trust in delivery partners and distribution channels, independent of the institution itself

## The four adopter stages

| Stage | Central question | Done when... |
|---|---|---|
| Explore | Is AI appropriate, and what would it take? | Precise excluded-user definition. Honest comparison with alternatives. Order-of-magnitude cost sense. |
| Define | What must be true before building? | Named data owners. Named mandate holder. Architecture posture chosen. Safety boundaries designed. |
| Pilot | What breaks with real users and real institutional conditions? | Failure taxonomy. Named institutional response to first public failure. Real cost-per-interaction data. |
| Scale | Can the institution own, sustain, and continuously improve it? | Budget line. Named operational owner. Monitoring mechanism. Operating model written down. |

## The five unit types

| Type | Definition | What makes it reusable |
|---|---|---|
| Strategic Decision | A framing, governance, or design decision that shaped what got built. Usually invisible in the final product. | The condition tag — when does this apply, when doesn't it? |
| Tactical Decision | A stack, sequence, cost, or implementation decision specific enough to reuse. | A before→after: what changed because of this decision. |
| Failure and Fix | Something that broke, the fix, and what the fix revealed about the system. | The fix reveals the structural insight — not the failure alone. |
| Playbook | A genuine multi-step, gated sequence for a recurring situation. | Actionable: "if X, do Y before Z." |
| Toolkit Asset | A reusable technical component, template, or governance artefact. | Another adopter can lift and adapt it without rebuilding. |

**Tag every unit:** Dimension + Sub-category + Stage + Type + Condition tag.

## The question bank — insight forms per dimension × stage

This is the classification standard when extracting units from raw material (does this content satisfy this cell's insight form?), and the retrieval logic when responding to a live adopter (what corpus units are relevant to what they raised?).

### EXPLORE — Is AI the right answer, and what would it take?

| Dimension | Core question | Listening for | Insight form | Corpus example |
|---|---|---|---|---|
| Persona | Who specifically is excluded from this service today — and what do they do instead? | The workaround is the data. It reveals the real replacement baseline. | Excluded user + named barrier + current workaround | MahaVISTAAR: women farmers receiving contradictory advice from fertiliser sellers. No trusted official source in their language. |
| Solution | What channel or system are you replacing, what does it fail at, and is AI actually the right tool for that failure? | Two human callers, paper forms, nothing — plus honest reasoning on AI-fit vs simpler fixes. | Current channel + failure mode + AI-fit justification | Lend A Hand: two human callers couldn't collect fortnightly feedback from thousands of dispersed interns. |
| Institution | Who inside the institution has to personally want this to work — and do they know yet? | Not procurement sign-off. The person whose professional stake is tied to success. | Named champion + their specific stake | MahaVISTAAR: Commissioner-level ownership required before any department would authorise data connections. |
| Ecosystem | Who else has tried to solve this for this population, and what happened? | Precedent deployments, failed attempts, adjacent tools. Who do they trust as a reference peer? | Named precedent + what transferred + what didn't | Ethiopia ATI drew on MahaVISTAAR: 9 months → 3 months. Architecture transferred. Farmer-trust mechanics needed local adaptation. |

### DEFINE — What are the irreversible decisions?

| Dimension | Core question | Listening for | Insight form | Corpus example |
|---|---|---|---|---|
| Persona | What is the one question a user will ask that this system must answer, or the pilot fails? | Forces scope to its minimum. Shapes data model, prompt design, safety boundaries. | Single critical use case + binary success definition | MahaVISTAAR: "What should I spray this week in my village?" Required live mandi data, weather API, pest calendar, conversational Marathi. |
| Solution | Which architecture choices, if wrong, would take six months to undo — and is every data source named, with an accountable owner for each? | Residency, vendor lock-in, sovereignty, orchestration ownership. Not "government data" — ICAR, IMD, APMC, named humans. | Irreversible decisions list + data source registry (source × owner × cadence × accountability) | MahaVISTAAR: four named data owners before launch, each connected via API — AI layer consumes but doesn't own the data. |
| Institution | Who approves what the system says, have they agreed to own that, and what testing/timeline has the institution committed to before real users? | Content authority, not technical sign-off. Staged testing with named gate criteria. | Content authority + approval process + testing progression | Voice AI: the bot speaks in the department's name. The department must own every answer — including wrong ones. |
| Ecosystem | Which parts can you not build yourselves — and do you have a named partner for each? | Data owners, language models, telephony partners, integrators, field networks. Unnamed dependencies are unmanaged risk. | Dependency map: component × build-or-source × named partner | Bhili: eight distinct ecosystem roles, all named before model work. Project stalled when the linguist role was unnamed for three months. |

### PILOT — Live with real users. What's breaking?

| Dimension | Core question | Listening for | Insight form | Corpus example |
|---|---|---|---|---|
| Persona | Which user interactions are failing — is that a scope problem or a quality problem? | Scope = outside mandate. Quality = mandate questions answered badly. Different fixes. | Failure taxonomy: scope vs quality vs experience | Voice AI: out-of-mandate answers = institutional boundary crossing. Required explicit refusal design, not better prompting. |
| Solution | Which component is causing the most pain, is it replaceable, and which data source is going stale or wrong? | Bundled-vs-unbundled plays out here. Data quality failures at Pilot look like AI failures to users. | Component failure + replaceability + data quality issue + owner response time | MahaVISTAAR: mandi price 48hr lag caused wrong harvest-timing advice. Fix: governance call with APMC to 6-hr cadence — not a technical fix. |
| Institution | What has the institution seen fail publicly — and did they own it or disown it? | How the institution responds to the first failure is the strongest signal about whether this scales. | First public failure + institutional response (own vs disown) | Voice AI: bot answered outside mandate. Department tightened refusal boundaries — didn't shut down. Ownership held. |
| Ecosystem | Which partner is underperforming — and do you have an alternative? | Mid-pilot switching is painful but possible. Post-scale switching requires a rebuild. | Partner performance log + contingency plan | Voice AI: parallel vendor testing recommended precisely because mid-pilot switching is possible. |

### SCALE — Expanding to population. Can the institution own this without the founding team?

| Dimension | Core question | Listening for | Insight form | Corpus example |
|---|---|---|---|---|
| Persona | Are new user segments arriving that the pilot wasn't designed for? | Scale reveals "the user" was multiple users — feature phone vs smartphone, dialect A vs B. | User segment expansion map + design change required per segment | Voice AI: multilingual demand discovered post-launch. Retrofit significantly harder than designing for it. Preventable. |
| Solution | Which components are you now unbundling, what triggered it — and which data sources are breaking under scale, do formal SLAs exist? | Cost/control arguments become concrete numbers at scale. | Unbundling decision (component × trigger × gain) + data SLA map | Bharat-VISTAAR: required formal data SLAs with 12 state agriculture departments. Each became an accountable node. |
| Institution | Has the institution absorbed this — budget line, named owner, review cadence — and does the system leave people more capable or more dependent? | Absorption vs "still the project team's problem." Workforce agency outcome. | Absorption indicators (budget + owner + review cadence) + agency outcome (capability vs dependency) | Voice AI: shift from "project" to "service" is the signal. Departmental adoption requires owning voice as a service. |
| Ecosystem | What from your deployment could the next adopter reuse — with what conditions? | Not "we did X." "X works when Y is true, fails when Z is true." | Transferable unit + condition tag (applies when / fails when) | MahaVISTAAR → Ethiopia ATI: architecture and trust-framing transferred. Specific data partnerships didn't — condition: government credibility as trust mechanism. |

## Stage-weighting of sub-categories

Primary = directly relevant at this stage. Secondary = relevant only if the adopter's situation surfaces it. Dormant = not typically relevant; engage only if the adopter raises it unprompted.

### Persona

| Sub-category | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| A. Problem and Persona | Primary | Secondary | Dormant | Secondary |
| B. Current Journey and Friction | Primary | Secondary | Dormant | Dormant |
| C. Outcome and Success | Secondary | Primary | Primary | Primary |
| D. Scope, Inclusion, and Trust | Secondary | Primary | Primary | Primary |

### Solution

| Sub-category | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| A. AI Fit and Comparative Advantage | Primary | Secondary | Dormant | Dormant |
| B. UX, Channel, and Integration | Secondary | Primary | Primary | Secondary |
| C. Model, Architecture, and Infrastructure | Secondary | Primary | Primary | Primary |
| D. Data and Knowledge Readiness | Secondary | Primary | Primary | Primary |
| E. Performance, Reliability, and Scale | Dormant | Secondary | Primary | Primary |

### Institution

| Sub-category | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| A. Mandate, Ownership, and Decision Rights | Primary | Primary | Secondary | Secondary |
| B. Workforce and Change | Secondary | Primary | Primary | Primary |
| C. Governance, Safety, and Redress | Dormant | Primary | Primary | Secondary |
| D. Accountability, Liability, and Compliance | Dormant | Secondary | Secondary | Primary |
| E. Data Stewardship | Dormant | Primary | Secondary | Primary |
| F. Operating Model and Sustainability | Secondary | Primary | Secondary | Primary |
| G. Institutionalisation and Continuous Improvement | Dormant | Dormant | Secondary | Primary |

### Ecosystem

| Sub-category | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| A. Partner Architecture and Roles | Secondary | Primary | Secondary | Secondary |
| B. External Data and Infrastructure Dependencies | Secondary | Primary | Secondary | Primary |
| C. Delivery, Distribution, and Trust | Dormant | Secondary | Secondary | Secondary |
| D. Coordination, Procurement, and Incentives | Dormant | Secondary | Secondary | Secondary |
| E. Resilience, Portability, and Contingencies | Dormant | Dormant | Primary | Primary |
| F. Ecosystem Learning and Diffusion | Dormant | Dormant | Secondary | Primary |

## Extraction discipline (applies to reading uploaded documents too)

- **Tag every unit**: Dimension + Sub-category + Stage + Type + Condition tag. No untagged units.
- **Write the before→after**: every tactical/strategic unit needs an outcome statement. Without it, it's a lesson, not a finding.
- **Name the failure specifically**: "it didn't work" is not a unit. Name the failure, the fix, and the threshold or insight the fix revealed.
- **Flag the gaps**: check against Primary sub-categories per stage, not raw cell density — a filled cell can still miss its stage's real concern.
- **Don't fabricate**: if a before→after, a named individual, or a condition isn't in the source, write "Not documented in the source" rather than inventing it.

**The synthesis test:** could someone who never saw the raw material make a different decision because of this unit? If yes, it's a real unit. If it just describes what happened, it isn't.
