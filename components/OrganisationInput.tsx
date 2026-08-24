'use client';

import { useEffect, useRef, useState } from 'react';

interface Org {
  id: string;
  name: string;
  canonical_role: string | null;
  url: string | null;
}

interface Props {
  value: string;
  onChange: (name: string, canonicalRole?: string, url?: string) => void;
  placeholder?: string;
  label?: string;
}

export default function OrganisationInput({ value, onChange, placeholder = 'Start typing…', label = 'Organisation' }: Props) {
  const [query, setQuery] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const [results, setResults] = useState<Org[]>([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync local query with the controlled `value` prop when it changes
  // externally (e.g. a form reset) — done during render, not in an effect,
  // per React's "adjusting state when a prop changes" pattern, so it doesn't
  // trigger an extra render pass.
  if (value !== prevValue) {
    setPrevValue(value);
    setQuery(value);
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      try {
        const res = await fetch(`/api/organisations?q=${encodeURIComponent(query)}`);
        if (res.ok) setResults(await res.json());
      } catch {
        setResults([]);
      }
    }, 250);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function handleSelect(org: Org) {
    setQuery(org.name);
    setOpen(false);
    onChange(org.name, org.canonical_role ?? undefined, org.url ?? undefined);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setQuery(v);
    setOpen(true);
    onChange(v);
  }

  return (
    <div ref={containerRef} className="relative">
      <label className="mb-1 block text-xs font-medium text-ink-soft">{label}</label>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm text-navy placeholder-ink-soft/50 outline-none focus:border-coral focus:ring-1 focus:ring-coral/30"
      />
      {open && results.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full overflow-auto rounded-lg border border-navy/10 bg-white shadow-md">
          {results.map((org) => (
            <li key={org.id}>
              <button
                type="button"
                className="flex w-full flex-col px-3 py-2 text-left text-sm hover:bg-navy/5"
                onClick={() => handleSelect(org)}
              >
                <span className="font-medium text-navy">{org.name}</span>
                {org.canonical_role && (
                  <span className="text-xs text-ink-soft">{org.canonical_role}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
