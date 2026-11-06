'use client';

import {useTranslations} from 'next-intl';
import {RevealSection, RevealChild} from './RevealSection';

const SERVICES = [
  'websites',
  'shops',
  'software',
  'brand',
  'photography',
  'hosting',
] as const;

export function ServicesGrid() {
  const t = useTranslations('Studio.services');

  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.1}
      className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12">
          <RevealChild>
            <p className="text-sm tracking-widest text-neutral-500 uppercase">
              {t('eyebrow')}
            </p>
          </RevealChild>
          <RevealChild
            as="h2"
            className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {t('title')}
          </RevealChild>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((key) => (
            <RevealChild key={key}>
              <div className="group h-full rounded-lg border border-neutral-200 p-6 transition-colors hover:border-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-100">
                <div className="mb-4 h-1 w-10 bg-accent transition-all group-hover:w-16" />
                <h3 className="text-lg font-semibold">{t(`${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {t(`${key}.body`)}
                </p>
              </div>
            </RevealChild>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
