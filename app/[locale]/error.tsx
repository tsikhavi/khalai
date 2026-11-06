'use client';

import {useEffect} from 'react';
import {useTranslations} from 'next-intl';
import Link from 'next/link';
import {useLocale} from 'next-intl';
import {motion} from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  const t = useTranslations('Errors');
  const locale = useLocale();

  useEffect(() => {
    // Log to console so it's visible in dev; in prod this could post to a
    // monitoring endpoint if you add one later.
    console.error('[error.tsx]', error.message, error.digest);
  }, [error]);

  return (
    <main className="relative flex overflow-scroll items-center justify-center px-6 py-24">
      <div className="w-full max-w-xl">
        <motion.p
          initial={{opacity: 0, y: 8}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.4}}
          className="text-xs uppercase tracking-[0.3em] text-laurel-700 dark:text-laurel-300">
          {t('eyebrow')}
        </motion.p>

        <motion.h1
          initial={{opacity: 0, y: 16}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.05}}
          className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.6, delay: 0.15}}
          className="mt-4 text-base leading-relaxed text-foreground/70">
          {t('body')}
        </motion.p>

        {/* Primary recovery */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={reset}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-laurel-700 px-5 text-sm font-medium text-white transition-colors hover:bg-laurel-800 dark:bg-laurel-500 dark:text-black dark:hover:bg-laurel-400">
            {t('retry')}
          </button>
          <Link
            href={`/${locale}`}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-foreground/20 px-5 text-sm font-medium transition-colors hover:border-foreground/40">
            {t('home')}
          </Link>
        </div>

        {/* Contact fallback */}
        <div className="mt-10 rounded-xl border border-foreground/10 bg-foreground/2 p-5">
          <p className="text-sm font-medium">{t('stillBrokenTitle')}</p>
          <p className="mt-1 text-xs leading-relaxed text-foreground/60">
            {t('stillBrokenBody')}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="mailto:hello@khalai.studio"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-laurel-700 underline-offset-2 hover:underline dark:text-laurel-300">
              hello@khalai.studio
            </a>
            <span className="text-foreground/20">·</span>
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-laurel-700 underline-offset-2 hover:underline dark:text-laurel-300">
              WhatsApp
            </a>
          </div>
        </div>

        {/* Navigate elsewhere */}
        <div className="mt-10 border-t border-foreground/10 pt-6">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">
            {t('orExplore')}
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              {href: '/studio', label: t('nav.studio')},
              {href: '/projects', label: t('nav.projects')},
              {href: '/pricing', label: t('nav.pricing')},
              {href: '/marketing', label: t('nav.marketing')},
              {href: '/blog', label: t('nav.blog')},
              {href: '/contact', label: t('nav.contact')},
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${locale}${item.href}`}
                  className="text-sm text-foreground/70 transition-colors hover:text-foreground">
                  {item.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {error.digest && (
          <p className="mt-8 font-mono text-[10px] text-foreground/30">
            ref: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
