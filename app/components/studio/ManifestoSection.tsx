'use client';

import {useTranslations} from 'next-intl';
import {RevealSection, RevealChild} from './RevealSection';

const STEPS = [
  'line',
  'grid',
  'layout',
  'typeface',
  'colour',
  'codeLine',
] as const;

export function ManifestoSection() {
  const t = useTranslations('Studio.manifesto');

  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.1}
      className="bg-[linear-gradient(to_bottom,var(--paper)_0%,#faf7f0_20%,#f0ebe0_50%,#faf7f0_80%,var(--paper)_100%)] py-20 dark:bg-[linear-gradient(to_bottom,#0a0a0a_0%,#171717_20%,#262626_50%,#171717_80%,#0a0a0a_100%)]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12">
          <RevealChild>
            <p className="text-sm tracking-widest text-neutral-500 uppercase">
              {t('eyebrow')}
            </p>
          </RevealChild>
          <RevealChild
            as="h2"
            className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            {t('title')}
          </RevealChild>
        </div>

        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {STEPS.map((key) => (
            <RevealChild key={key}>
              <div className="border-t border-neutral-200 pt-4 dark:border-neutral-800">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
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
