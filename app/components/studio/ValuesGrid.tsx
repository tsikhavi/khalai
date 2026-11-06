'use client';

import {useTranslations} from 'next-intl';
import {RevealSection, RevealChild} from './RevealSection';
import {Lens} from './LensToggle';

export function ValuesGrid({values}: {values: {key: string; icon: string}[]}) {
  const t = useTranslations('Studio.values');

  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.1}
      className="px-06 py-20 sm:py-24">
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
            {t('title.prefix')}{' '}
            <Lens
              reveal={<span className="text-accent">{t('title.lens')}</span>}>
              {t('title.lens')}
            </Lens>{' '}
            {t('title.suffix')}
          </RevealChild>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <RevealChild key={v.key}>
              <div className="h-full rounded-2xl border border-neutral-200 bg-white p-6 text-center transition-colors hover:border-accent dark:border-neutral-800 dark:bg-neutral-900">
                <div className="text-3xl">{v.icon}</div>
                <h3 className="mt-3 text-base font-bold text-neutral-900 dark:text-white">
                  {t(`${v.key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {t(`${v.key}.body`)}
                </p>
              </div>
            </RevealChild>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
