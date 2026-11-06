'use client';

import {useTranslations} from 'next-intl';

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  const t = useTranslations('Projects');

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
        {t('errorTitle')}
      </h2>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        {error.message || t('errorBody')}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-neutral-900 dark:bg-white dark:text-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors">
        {t('retry')}
      </button>
    </div>
  );
}
