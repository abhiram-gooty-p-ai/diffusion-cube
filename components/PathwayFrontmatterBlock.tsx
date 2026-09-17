import type { PathwayFrontmatter } from '@/lib/strip-frontmatter';

export default function PathwayFrontmatterBlock({ fm }: { fm: PathwayFrontmatter }) {
  const meta = [fm.stage, fm.sector, fm.location].filter(Boolean).join(' · ');
  return (
    <div className="mb-6 rounded-xl border border-navy/10 bg-white px-5 py-4">
      {fm.title && (
        <h3 className="font-display text-base font-medium text-navy">{fm.title}</h3>
      )}
      {meta && (
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft">{meta}</p>
      )}
      {fm.description && (
        <p className="mt-2 text-sm leading-relaxed text-ink">{fm.description}</p>
      )}
      {fm.tags && fm.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {fm.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-navy/15 px-2.5 py-0.5 text-[11px] text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
