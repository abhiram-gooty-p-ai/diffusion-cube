import Link from 'next/link';
import { listWikiPathways } from '@/lib/wiki-content';

export default async function WikiIndexPage() {
  const pathways = await listWikiPathways();

  const categories = Array.from(new Set(pathways.map((p) => p.category)));

  return (
    <div className="flex-1 overflow-y-auto bg-paper p-4 sm:p-8">
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral">Pathway Library</p>
        <h1 className="mt-1 font-display text-2xl font-medium tracking-tight text-navy">The Wiki</h1>
        <p className="mt-1 max-w-xl text-sm text-ink-soft">
          The real AI deployments this companion draws on — the same corpus grounding every conversation, available
          to read on your own.
        </p>
      </div>

      {pathways.length === 0 ? (
        <p className="text-sm text-ink-soft">No pathways found.</p>
      ) : (
        categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft">{category}</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {pathways
                .filter((p) => p.category === category)
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={`/wiki/${p.slug}`}
                    className="flex flex-col gap-1.5 rounded-2xl border border-navy/10 bg-white p-5 transition hover:border-coral/50 hover:shadow-sm"
                  >
                    <div className="font-display font-medium text-navy">{p.title}</div>
                    <p className="text-sm leading-relaxed text-ink-soft">{p.description}</p>
                  </Link>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
