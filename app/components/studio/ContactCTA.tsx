'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {RevealSection, RevealChild} from './RevealSection';
import {siteConfig} from '@/lib/content/config';

export function ContactCTA() {
  const t = useTranslations('Studio.contactCta');
  const locale = useLocale();

  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.25}
      className=" bg-(--paper)/50 py-24  dark:bg-neutral-950/50">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealChild
          as="h2"
          className="text-3xl font-semibold tracking-tight md:text-5xl">
          {t('title')}
        </RevealChild>

        <RevealChild
          as="p"
          className="mx-auto mt-6 max-w-xl text-neutral-600 dark:text-neutral-400">
          {t('body')}
        </RevealChild>

        <RevealChild className="mt-10">
          <Link
            href={`/${locale}/start`}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-sm font-medium text-white transition-transform hover:scale-[1.02] dark:bg-neutral-100 dark:text-neutral-900">
            {t('primary')} →
          </Link>
        </RevealChild>

        <RevealChild
          as="p"
          className="mt-8 text-xs text-neutral-500">
          {t('location')} · {siteConfig.email}
        </RevealChild>
      </div>
    </RevealSection>
  );
}
