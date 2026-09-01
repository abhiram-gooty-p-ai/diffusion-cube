// Card-tile data for /explore (the Diffusion Library), ported verbatim from
// the standalone Diffusion Library app's app/lib/pathways.ts. This is a
// fully separate entity from the Analyse corpus (content/wiki/pathways/) —
// same brand tokens, deliberately different content, tone, and pathway set.
// Kept as static data (not fetched) exactly like the original: this file
// only carries what the card needs to display; the chat backend reads the
// full pathway document from content/library-wiki/pathways/<id>.md (see
// lib/library-wiki-loader.ts).
export type Stage = 'Explore' | 'Define' | 'Pilot' | 'Scale';

export type Accent = 'coral' | 'yellow' | 'blue' | 'navy';

export type LibraryPathway = {
  /** Matches the filename (minus .md) under content/library-wiki/pathways/. */
  id: string;
  title: string;
  location: string;
  category: string;
  stage: Stage;
  accent: Accent;
  /** Short, impact-driven hook shown on the tile — not the full context. */
  hook: string;
  tags: string[];
};

export const libraryPathways: LibraryPathway[] = [
  {
    id: 'mahavistaar',
    title: 'Voice AI for Farmer Advisory — Maharashtra',
    location: 'Maharashtra, India',
    category: 'Voice AI · Agriculture',
    stage: 'Scale',
    accent: 'coral',
    hook: '342,000 farmers dial one number — and now get an answer 180x cheaper than it cost a year ago.',
    tags: ['Voice AI', 'Agriculture', 'Government'],
  },
  {
    id: 'bhili-language-enablement',
    title: 'Voice AI for Tribal Language Inclusion — Nandurbar',
    location: 'Nandurbar, Maharashtra',
    category: 'Voice AI · Language Inclusion',
    stage: 'Pilot',
    accent: 'yellow',
    hook: 'A tribal language with zero digital footprint learned to talk back to its own speakers — in about 100 days.',
    tags: ['Voice AI', 'Language', 'Tribal Inclusion'],
  },
  {
    id: 'blue-dots',
    title: 'AI for Hyperlocal Job Discovery — National',
    location: 'Ghaziabad district, India',
    category: 'AI · Local Economy',
    stage: 'Scale',
    accent: 'blue',
    hook: '₹500 to find a job the old way. ₹10 and a 3-minute phone call the new way.',
    tags: ['Livelihoods', 'Discovery', 'District Economy'],
  },
  {
    id: 'ceew-climate-intelligence',
    title: 'AI for Public Health Early-Warning — National',
    location: 'National, India',
    category: 'AI · Public Decision-Making',
    stage: 'Pilot',
    accent: 'navy',
    hook: 'An early-warning system that forecasts dengue outbreaks weeks before the first case shows up.',
    tags: ['Climate', 'Public Health', 'Policy'],
  },
  {
    id: 'data-dhara',
    title: 'AI for Government Data Interoperability — National',
    location: 'Nivesh Suvidha',
    category: 'AI · Government Data Infrastructure',
    stage: 'Define',
    accent: 'coral',
    hook: "A PDF is not data — it's a picture of data. This pathway teaches government records to talk to each other.",
    tags: ['Data Infrastructure', 'Governance'],
  },
  {
    id: 'voice-ai-for-inclusion',
    title: 'Voice AI — Cross-Deployment Synthesis — Multi-Geography',
    location: 'Cross-deployment synthesis',
    category: 'Voice AI · Horizontal',
    stage: 'Scale',
    accent: 'yellow',
    hook: "9 months to build the first voice deployment. 3 weeks for the fifth. That's what a pathway buys you.",
    tags: ['Voice AI', 'Inclusion', 'Cross-deployment'],
  },
  {
    id: 'voice-ai-adoption-barriers',
    title: 'Voice AI Adoption Barriers — Organizational Readiness',
    location: 'Organizational readiness',
    category: 'Voice AI · Adoption Research',
    stage: 'Explore',
    accent: 'blue',
    hook: "EkStep gave away Voice AI for free. Most organizations still didn't build anything. Here's why.",
    tags: ['Voice AI', 'Organizational Readiness'],
  },
];

export const libraryStages: Stage[] = ['Explore', 'Define', 'Pilot', 'Scale'];
