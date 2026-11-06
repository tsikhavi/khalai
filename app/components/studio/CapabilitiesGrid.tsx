'use client';

import {useTranslations} from 'next-intl';
import {RevealSection, RevealChild} from './RevealSection';
import {Lens} from './LensToggle';

export function CapabilitiesGrid({
  capabilities,
}: {
  capabilities: {key: string; icon: string}[];
}) {
  const t = useTranslations('Studio.capabilities');

  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.1}
      className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-250">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <RevealChild>
            <p className="text-sm tracking-widest text-neutral-500 uppercase">
              {t('eyebrow')}
            </p>
          </RevealChild>
          <RevealChild
            as="h2"
            className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            {t('titleWords.prefix')}{' '}
            <Lens
              reveal={
                <span className="text-accent">{t('titleWords.lens')}</span>
              }>
              {t('titleWords.lens')}
            </Lens>{' '}
            {t('titleWords.suffix')}
          </RevealChild>
          <RevealChild
            as="p"
            className="mt-3 text-neutral-600 dark:text-neutral-300">
            {t('subtitle')}
          </RevealChild>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <RevealChild key={cap.key}>
              <article className="group h-full rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-2xl dark:bg-neutral-800">
                  {cap.icon}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {t(`${cap.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {t(`${cap.key}.body`)}
                </p>
              </article>
            </RevealChild>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
