import { DIMENSIONS, DIMENSION_COLORS, STAGES, cellKey, type GridState } from '@/lib/dimensions';

interface Props {
  grid: GridState;
}

// The full 4×4 grid, styled after 100pathways.com's own dimension × stage
// table (colored accent bar + dimension name, stage names as column
// headers). Each cell shows what's actually been established for this
// adoption (the note), not the framework's core question. Bound directly to
// live conversation.grid, which updates every turn via the <grid_update>
// contract (see lib/system-prompts.ts) — but only on turns that actually
// engaged a specific pathway, so a run of generic questions leaves it
// exactly as it was rather than filling in with something thin. Opened on
// demand from AdoptionWorkspace's "Grid" header button, in a modal with room
// to actually read a note — not shown inline or on hover.
export default function HeatmapGrid({ grid }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-navy/10 bg-white">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-navy/10">
            <th className="w-28 px-3 py-3 text-left" />
            {STAGES.map((s) => (
              <th
                key={s}
                className="px-3 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-navy"
              >
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DIMENSIONS.map((d) => (
            <tr key={d.code} className="border-b border-navy/10 last:border-b-0">
              <td className="px-3 py-3 align-top" style={{ borderLeft: `4px solid ${DIMENSION_COLORS[d.code]}` }}>
                <span className="font-serif text-base italic" style={{ color: DIMENSION_COLORS[d.code] }}>
                  {d.name}
                </span>
              </td>
              {STAGES.map((s) => {
                const cell = grid[cellKey(d.code, s)];
                const hasContent = Boolean(cell?.note);
                return (
                  <td
                    key={s}
                    className="max-w-[220px] px-3 py-3 align-top text-sm leading-relaxed"
                    style={{ background: hasContent ? `${DIMENSION_COLORS[d.code]}0d` : undefined }}
                    // A defensive safety net alongside the prompt's own
                    // note-brevity instruction — if a note ever runs long
                    // anyway, the full text is still one hover away rather
                    // than silently blowing out the row height.
                    title={cell?.note || undefined}
                  >
                    {hasContent ? (
                      <span className="line-clamp-4 text-ink">{cell!.note}</span>
                    ) : (
                      <span className="text-ink-soft/60 italic">Not yet discussed</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
