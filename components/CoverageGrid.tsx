'use client';

import { useState } from 'react';
import {
  DIMENSIONS,
  STAGES,
  DENSITY_SYMBOLS,
  cellKey,
  type CellDensity,
  type GridState,
} from '@/lib/dimensions';

// The user's standing rendered as the same 4 dimensions × 4 stages coverage
// grid the pathway documents themselves use (Section 2), in the same density
// notation (○ / ● / ●● / ●●●) — so a user's own adoption reads in the
// corpus's visual language. Strictly descriptive: a cell shows what's been
// established, never what to do next.
export default function CoverageGrid({ grid }: { grid: GridState }) {
  const [openCell, setOpenCell] = useState<string | null>(null);

  const open = openCell ? grid[openCell] : null;
  const openParts = openCell?.split(':');
  const openDimension = openParts ? DIMENSIONS.find((d) => d.code === openParts[0]) : null;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-28 pb-2 text-left font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft" />
              {STAGES.map((s) => (
                <th
                  key={s}
                  className="pb-2 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft"
                >
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DIMENSIONS.map((d) => (
              <tr key={d.code}>
                <td className="py-1 pr-2 font-display text-sm font-medium text-navy">{d.name}</td>
                {STAGES.map((s) => {
                  const key = cellKey(d.code, s);
                  const cell = grid[key];
                  const density = (cell?.density ?? 0) as CellDensity;
                  const isOpen = openCell === key;
                  return (
                    <td key={s} className="p-0.5">
                      <button
                        type="button"
                        onClick={() => setOpenCell(isOpen ? null : key)}
                        title={cell?.note || 'Nothing here yet'}
                        className={`flex h-9 w-full items-center justify-center rounded-lg border font-mono text-xs tracking-tight transition ${
                          isOpen
                            ? 'border-coral bg-coral-soft text-coral'
                            : density === 0
                              ? 'border-navy/10 bg-paper-dim text-ink-soft hover:border-navy/25'
                              : 'border-navy/15 bg-white text-navy hover:border-coral/60'
                        }`}
                      >
                        {DENSITY_SYMBOLS[density]}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openCell && openDimension && (
        <div className="mt-2 rounded-lg border border-navy/10 bg-white px-3 py-2 text-sm animate-fade-in">
          <span className="font-medium text-navy">
            {openDimension.name} · {openParts![1]}
          </span>{' '}
          <span className="text-ink-soft">{open?.note || 'Nothing established here yet.'}</span>
        </div>
      )}

      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft">
        ○ untouched · ● touched · ●● developing · ●●● dense
      </p>
    </div>
  );
}
