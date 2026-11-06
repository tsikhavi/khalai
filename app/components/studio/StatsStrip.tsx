'use client';

import {useTranslations} from 'next-intl';
import {RevealSection, RevealChild} from './RevealSection';

export function StatsStrip({stats}: {stats: {key: string; value: string}[]}) {
  const t = useTranslations('Studio.stats');

  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.3}
      className=" bg-(--paper)/40 py-10 backdrop-blur dark:bg-neutral-950/40">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map(({key, value}) => (
            <RevealChild key={key}>
              <div className="text-center">
                <div className="text-3xl font-extrabold tracking-tight text-accent">
                  {value}
                </div>
                <div className="mt-1 text-xs tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
                  {t(key)}
                </div>
              </div>
            </RevealChild>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
