'use client';

import {useState} from 'react';
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import {useCookieConsent} from '@/hooks/useCookieConsent';
import {cn} from '@/lib/utils';

export default function CookiesPage() {
  const t = useTranslations('Cookies');
  const {consent, ready, savePreferences, acceptAll, acceptEssential} =
    useCookieConsent();

  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);
  const [saved, setSaved] = useState(false);

  const save = () => {
    savePreferences({analytics, marketing});
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!ready) return null;

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <header className="mb-12">
        <p className="text-sm tracking-widest text-neutral-500 uppercase">
          {t('title')}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          {t('title')}
        </h1>
        <p className="mt-4 text-sm text-neutral-500">
          {t('body')}{' '}
          <Link
            href="../privacy"
            className="text-accent underline-offset-4 hover:underline">
            {t('privacyLink')}
          </Link>
          .
        </p>
      </header>

      <div className="space-y-6">
        <PrefRow
          title={t('essential.title')}
          body={t('essential.body')}
          checked
          disabled
        />
        <PrefRow
          title={t('analytics.title')}
          body={t('analytics.body')}
          checked={analytics}
          onChange={setAnalytics}
        />
        <PrefRow
          title={t('marketing.title')}
          body={t('marketing.body')}
          checked={marketing}
          onChange={setMarketing}
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={save}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-(--accent)/90">
          {t('savePreferences')}
        </button>
        <button
          type="button"
          onClick={acceptAll}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-200 px-5 text-sm font-medium text-neutral-700 transition-colors hover:border-accent hover:text-accent dark:border-neutral-800 dark:text-neutral-300">
          {t('acceptAll')}
        </button>
        <button
          type="button"
          onClick={acceptEssential}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-200 px-5 text-sm font-medium text-neutral-700 transition-colors hover:border-accent hover:text-accent dark:border-neutral-800 dark:text-neutral-300">
          {t('rejectNonEssential')}
        </button>
        {saved && <span className="text-sm text-accent">✓</span>}
      </div>
    </main>
  );
}

function PrefRow({
  title,
  body,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800',
        disabled && 'cursor-not-allowed opacity-60'
      )}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-300 accent-accent dark:border-neutral-700"
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium">{title}</span>
        <span className="mt-1 block text-sm text-neutral-600 dark:text-neutral-400">
          {body}
        </span>
      </span>
    </label>
  );
}
