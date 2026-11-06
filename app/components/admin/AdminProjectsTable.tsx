'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useState, useTransition} from 'react';
import {useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';
import clsx from 'clsx';
import {deleteProject} from '@/lib/actions/admin-projects';
import type {Project} from '@/lib/types/project';

export function AdminProjectsTable({
  items,
  locale,
  page,
  totalPages,
  category,
  q,
}: {
  items: Project[];
  locale: string;
  page: number;
  totalPages: number;
  category: string;
  q: string;
}) {
  const t = useTranslations('AdminProjects');
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDelete = async (id: string) => {
    setError(null);
    setBusyId(id);
    try {
      await deleteProject(id);
      setConfirmId(null);
      startTransition(() => router.refresh());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setBusyId(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-16 text-center text-neutral-500">
        {t('empty')}
      </div>
    );
  }

  return (
    <div className={clsx('space-y-4', (pending || busyId) && 'opacity-70')}>
      {error && (
        <p className="rounded-md bg-red-50 dark:bg-red-900/30 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-950 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-3">{t('columns.project')}</th>
              <th className="hidden md:table-cell px-4 py-3">
                {t('columns.category')}
              </th>
              <th className="hidden md:table-cell px-4 py-3">
                {t('columns.status')}
              </th>
              <th className="hidden lg:table-cell px-4 py-3">
                {t('columns.updated')}
              </th>
              <th className="px-4 py-3 text-right">{t('columns.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {items.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-16 overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-800 shrink-0">
                      {p.thumbnail ? (
                        <Image
                          src={p.thumbnail}
                          alt={p.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-neutral-900 dark:text-white truncate">
                        {p.title}
                      </div>
                      <code className="text-[11px] text-neutral-500">
                        /{p.slug}
                      </code>
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell px-4 py-3">
                  <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-[11px] uppercase tracking-wide">
                    {p.category}
                  </span>
                </td>
                <td className="hidden md:table-cell px-4 py-3">
                  {p.published ? (
                    <span className="text-green-600 dark:text-green-400">
                      ● {t('published')}
                    </span>
                  ) : (
                    <span className="text-amber-600 dark:text-amber-400">
                      ● {t('draft')}
                    </span>
                  )}
                </td>

                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center gap-2">
                    <Link
                      href={`/${locale}/projects/${p.slug}`}
                      target="_blank"
                      className="rounded-md p-1.5 text-neutral-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                      aria-label={t('view')}>
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </Link>
                    <Link
                      href={`/${locale}/admin/projects/${p.id}/edit`}
                      className="rounded-md p-1.5 text-neutral-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                      aria-label={t('edit')}>
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => setConfirmId(p.id)}
                      disabled={busyId === p.id}
                      className="rounded-md p-1.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors disabled:opacity-40"
                      aria-label={t('delete')}>
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({length: totalPages}, (_, i) => i + 1).map((n) => {
            const search = new URLSearchParams();
            if (n > 1) search.set('page', String(n));
            if (category) search.set('category', category);
            if (q) search.set('q', q);
            return (
              <Link
                key={n}
                href={`?${search.toString()}`}
                className={clsx(
                  'rounded-md px-3 py-1.5 text-sm transition-colors',
                  n === page
                    ? 'bg-green-500 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-green-100 dark:hover:bg-green-900/40'
                )}>
                {n}
              </Link>
            );
          })}
        </div>
      )}

      {/* Confirm delete */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {t('confirmDeleteTitle')}
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {t('confirmDeleteBody')}
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setConfirmId(null)}
                className="rounded-md px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                {t('cancel')}
              </button>
              <button
                onClick={() => onDelete(confirmId)}
                disabled={busyId === confirmId}
                className="rounded-md bg-red-500 hover:bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">
                {busyId === confirmId ? t('deleting') : t('delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
