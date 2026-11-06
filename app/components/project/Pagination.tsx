'use client';

import {useRouter, usePathname, useSearchParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {useTransition} from 'react';
import clsx from 'clsx';
import type {ProjectCategory} from '@/lib/types/project';

export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
  category: ProjectCategory | 'all';
  search: string;
}) {
  const t = useTranslations('Projects');
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const next = new URLSearchParams(params.toString());
    if (page === 1) next.delete('page');
    else next.set('page', String(page));
    startTransition(() => router.push(`${pathname}?${next.toString()}`));
  };

  const pages = pageWindow(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className={clsx(
        'mt-12 flex items-center justify-center gap-1 transition-opacity',
        isPending && 'opacity-60'
      )}>
      <PageButton
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        label={t('prev')}
      />

      {pages.map((p, i) =>
        p === '…' ? (
          <span
            key={`gap-${i}`}
            className="px-2 text-neutral-400">
            …
          </span>
        ) : (
          <PageButton
            key={p}
            onClick={() => goTo(p)}
            active={p === currentPage}
            label={String(p)}
            aria-current={p === currentPage ? 'page' : undefined}
          />
        )
      )}

      <PageButton
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        label={t('next')}
      />
    </nav>
  );
}

function PageButton({
  onClick,
  disabled,
  active,
  label,
  ...rest
}: {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  label: string;
  'aria-current'?: 'page' | undefined;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...rest}
      className={clsx(
        'h-9 min-w-9 rounded-md px-3 text-sm font-medium transition-colors',
        active
          ? 'bg-accent text-white shadow'
          : 'bg-neutral-100 text-neutral-700 hover:bg-accent/10 hover:text-accent dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-(--accent)/20 dark:hover:text-accent',
        disabled &&
          'cursor-not-allowed opacity-40 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200'
      )}>
      {label}
    </button>
  );
}

function pageWindow(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({length: total}, (_, i) => i + 1);
  const pages: (number | '…')[] = [1];
  if (current > 3) pages.push('…');
  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  ) {
    pages.push(i);
  }
  if (current < total - 2) pages.push('…');
  pages.push(total);
  return pages;
}
