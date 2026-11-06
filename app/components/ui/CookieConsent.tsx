'use client';

import {useState} from 'react';
import Link from 'next/link';
import {motion, AnimatePresence, useReducedMotion} from 'motion/react';
import {useTranslations} from 'next-intl';
import {useCookieConsent} from '@/hooks/useCookieConsent';
import {cn} from '@/lib/utils';

export function CookieConsent({locale}: {locale: string}) {
  const t = useTranslations('Cookies');
  const prefersReduced = useReducedMotion();
  const {ready, needsDecision, savePreferences, acceptEssential} =
    useCookieConsent();

  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Don't render until we've read the cookie — avoids a flash
  if (!ready || !needsDecision) return null;

  const containerVariants = prefersReduced
    ? {hidden: {opacity: 0}, visible: {opacity: 1}}
    : {
        hidden: {opacity: 0, y: 24},
        visible: {opacity: 1, y: 0},
      };

  return (
    <AnimatePresence>
      <motion.div
        key="cookie-consent"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{duration: 0.35, ease: [0.22, 1, 0.36, 1]}}
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-body"
        className={cn(
          'fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl',
          'rounded-2xl border border-neutral-200 bg-white/95 shadow-2xl backdrop-blur',
          'dark:border-neutral-800 dark:bg-neutral-900/95'
        )}>
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            {/* Icon */}
            <div
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--accent)/10 text-accent">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                />
                <circle
                  cx="9"
                  cy="10"
                  r="1"
                  fill="currentColor"
                />
                <circle
                  cx="15"
                  cy="10"
                  r="1"
                  fill="currentColor"
                />
                <circle
                  cx="9"
                  cy="15"
                  r="1"
                  fill="currentColor"
                />
                <circle
                  cx="15"
                  cy="15"
                  r="1"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <h2
                id="cookie-consent-title"
                className="text-sm font-semibold tracking-tight">
                {t('title')}
              </h2>
              <p
                id="cookie-consent-body"
                className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {t('body')}{' '}
                <Link
                  href={`/${locale}/privacy`}
                  className="text-accent underline-offset-4 hover:underline">
                  {t('privacyLink')}
                </Link>
                .
              </p>

              {/* Expandable details */}
              <AnimatePresence initial={false}>
                {showDetails && (
                  <motion.div
                    key="details"
                    initial={{height: 0, opacity: 0}}
                    animate={{height: 'auto', opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    transition={{duration: 0.25, ease: [0.22, 1, 0.36, 1]}}
                    className="overflow-hidden">
                    <div className="mt-4 space-y-3 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                      {/* Essential — always on */}
                      <ConsentRow
                        title={t('essential.title')}
                        body={t('essential.body')}
                        checked
                        disabled
                        onChange={() => {}}
                      />

                      {/* Analytics */}
                      <ConsentRow
                        title={t('analytics.title')}
                        body={t('analytics.body')}
                        checked={analytics}
                        onChange={setAnalytics}
                      />

                      {/* Marketing */}
                      <ConsentRow
                        title={t('marketing.title')}
                        body={t('marketing.body')}
                        checked={marketing}
                        onChange={setMarketing}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => savePreferences({analytics, marketing})}
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-(--accent)/90">
                  {showDetails ? t('savePreferences') : t('acceptAll')}
                </button>

                <button
                  type="button"
                  onClick={acceptEssential}
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition-colors hover:border-accent hover:text-accent dark:border-neutral-800 dark:text-neutral-300">
                  {t('rejectNonEssential')}
                </button>

                <button
                  type="button"
                  onClick={() => setShowDetails((v) => !v)}
                  aria-expanded={showDetails}
                  className="ms-auto text-xs text-neutral-500 underline-offset-4 hover:text-accent hover:underline">
                  {showDetails ? t('hideDetails') : t('customize')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ConsentRow({
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
  onChange: (next: boolean) => void;
}) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3',
        disabled && 'cursor-not-allowed opacity-60'
      )}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-300 accent-accent dark:border-neutral-700"
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium">{title}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
          {body}
        </span>
      </span>
    </label>
  );
}
