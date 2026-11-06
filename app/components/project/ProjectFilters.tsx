'use client';

import {useRouter, usePathname, useSearchParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {useEffect, useRef, useState, useTransition} from 'react';
import clsx from 'clsx';
import type {ProjectCategory} from '@/lib/types/project';
import {RevealSection, RevealChild} from '../studio/RevealSection';

const CATEGORIES: (ProjectCategory | 'all')[] = [
  'all',
  'fullstack',
  'frontend',
  'ai',
  'seo',
  'aieo',
];

export function ProjectFilters({
  category,
  search,
}: {
  category: ProjectCategory | 'all';
  search: string;
}) {
  const t = useTranslations('Projects');
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParams = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    next.delete('page');
    Object.entries(patch).forEach(([k, v]) => {
      if (v === null || v === '') next.delete(k);
      else next.set(k, v);
    });
    startTransition(() => {
      router.push(`${pathname}?${next.toString()}`);
    });
  };

  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.3}
      className="mx-auto max-w-6xl px-6 pb-10">
      <RevealChild>
        <div
          className={clsx(
            'flex flex-wrap justify-center gap-2 transition-opacity',
            isPending && 'opacity-60'
          )}>
          {CATEGORIES.map((cat) => {
            const active = cat === category;
            return (
              <button
                key={cat}
                onClick={() =>
                  updateParams({category: cat === 'all' ? null : cat})
                }
                className={clsx(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-accent text-white shadow'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-accent/10 hover:text-accent dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-accent/20 dark:hover:text-accent'
                )}
                aria-pressed={active}>
                {t(`categories.${cat}`)}
              </button>
            );
          })}
        </div>
      </RevealChild>

      <RevealChild className="mt-6">
        <SearchBox
          key={search}
          initial={search}
          onCommit={(value) => updateParams({q: value.trim() || null})}
          placeholder={t('searchPlaceholder')}
          submitLabel={t('search')}
        />
      </RevealChild>
    </RevealSection>
  );
}

function SearchBox({
  initial,
  onCommit,
  placeholder,
  submitLabel,
  debounceMs = 350,
}: {
  initial: string;
  onCommit: (value: string) => void;
  placeholder: string;
  submitLabel: string;
  debounceMs?: number;
}) {
  const [q, setQ] = useState(initial);

  // Keep the latest callback in a ref, but only mutate it inside an effect.
  const onCommitRef = useRef(onCommit);
  useEffect(() => {
    onCommitRef.current = onCommit;
  }, [onCommit]);

  useEffect(() => {
    if (q === initial) return;
    const id = setTimeout(() => onCommitRef.current(q), debounceMs);
    return () => clearTimeout(id);
  }, [q, initial, debounceMs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCommit(q);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-md items-center gap-2">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-accent focus:ring-1 focus:ring-accent dark:border-neutral-700 dark:bg-neutral-900 dark:placeholder:text-neutral-500"
        aria-label={placeholder}
      />
      <button
        type="submit"
        className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90">
        {submitLabel}
      </button>
    </form>
  );
}
