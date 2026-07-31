import AdoptionWorkspace from '@/components/AdoptionWorkspace';

// The landing IS the companion: greet, and let the user start by uploading
// documents or just talking. Any approved user gets in — approval is the
// only gate now (see (app)/layout.tsx).
export default function HomePage() {
  return <AdoptionWorkspace initial={null} />;
}
