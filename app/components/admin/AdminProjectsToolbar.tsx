'use client';

import {useRouter, usePathname, useSearchParams} from 'next/navigation';
import {useState, useTransition} from 'react';
import {useTranslations} from 'next-intl';
import clsx from 'clsx';

const CATEGORIES = [
  'all',
  'fullstack',
  'frontend',
  'ai',
  'seo',
  'aieo',
] as const;

export function AdminProjectsToolbar({
  category,
  search,
}: {
  category: string;
  search: string;
}) {
  const t = useTranslations('AdminProjects');
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [q, setQ] = useState(search);

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    next.delete('page');
    Object.entries(patch).forEach(([k, v]) => {
      if (v === null || v === '') next.delete(k);
      else next.set(k, v);
    });
    startTransition(() => router.push(`${pathname}?${next.toString()}`));
  };

  return (
    <div
      className={clsx(
        'mb-6 flex flex-wrap items-center gap-3',
        isPending && 'opacity-60'
      )}>
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => {
          const active = (cat === 'all' && !category) || cat === category;
          return (
            <button
              key={cat}
              onClick={() => update({category: cat === 'all' ? null : cat})}
              className={clsx(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                active
                  ? 'bg-green-500 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-green-100 dark:hover:bg-green-900/40'
              )}>
              {t(`categories.${cat}`)}
            </button>
          );
        })}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          update({q: q.trim() || null});
        }}
        className="ml-auto flex items-center gap-2">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-1.5 text-sm outline-none focus:border-green-500"
        />
      </form>
    </div>
  );
}
