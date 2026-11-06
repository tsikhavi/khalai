'use client';

import {motion, useScroll, useSpring} from 'motion/react';
import {useRef} from 'react';
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import type {PostMeta} from '@/lib/content/posts';
import {PostLanguageSwitcher} from './PostLanguageSwitcher';

export function BlogPostLayout({
  meta,
  locale,
  children,
}: {
  meta: PostMeta;
  locale: string;
  children: React.ReactNode;
}) {
  const t = useTranslations('Blog');
  const isFallback = meta.locale !== locale;

  const ref = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <article
      ref={ref}
      className="relative">
      <motion.div
        aria-hidden
        style={{scaleX}}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
      />

      <div className="mx-auto max-w-3xl px-6 pt-24 pb-16 text-center">
        <Link
          href={`/${locale}/blog`}
          className="text-xs tracking-widest text-neutral-500 uppercase hover:text-accent">
          {t('backToJournal')}
        </Link>

        {isFallback && (
          <div className="mx-auto mt-6 max-w-md rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
            {t('availableInEnglishOnly')}{' '}
            <Link
              href={`/en/blog/${meta.slug}`}
              className="underline">
              {t('readOriginal')}
            </Link>
          </div>
        )}

        <p className="mt-8 text-xs tracking-widest text-neutral-500 uppercase">
          {meta.category} · {meta.readingTime}
        </p>

        <h1 className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight md:text-5xl">
          {meta.title}
        </h1>

        <p className="mt-6 text-sm text-neutral-500">{meta.formattedDate}</p>

        <PostLanguageSwitcher
          slug={meta.slug}
          translations={meta.translations}
          currentLocale={locale}
        />
      </div>

      <div className="mx-auto max-w-2xl px-6 pb-24">
        <div className="prose prose-neutral dark:prose-invert prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>
      </div>
    </article>
  );
}
