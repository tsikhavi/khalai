'use client';

import Link from 'next/link';
import {RevealSection, RevealChild} from '@/components/studio/RevealSection';

export function MpesaCTA({
  title,
  body,
  primaryLabel,
  secondaryLabel,
  locale,
}: {
  title: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
  locale: string;
}) {
  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.3}
      className="border-t border-neutral-200 bg-(--paper)/60 px-6 py-32 dark:border-neutral-800 dark:bg-neutral-950/60">
      <div className="mx-auto max-w-3xl text-center">
        <RevealChild
          as="h2"
          className="text-4xl font-black tracking-tight md:text-6xl">
          {title}
        </RevealChild>
        <RevealChild
          as="p"
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          {body}
        </RevealChild>
        <RevealChild className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href={`/${locale}/start`}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-sm font-medium text-white transition-transform hover:scale-[1.02] dark:bg-neutral-100 dark:text-neutral-900">
            {primaryLabel} →
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-8 py-4 text-sm font-medium text-neutral-700 transition-colors hover:border-(--accent) hover:text-(--accent) dark:border-neutral-700 dark:text-neutral-300">
            {secondaryLabel}
          </Link>
        </RevealChild>
      </div>
    </RevealSection>
  );
}
