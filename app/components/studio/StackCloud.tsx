'use client';

import {useTranslations} from 'next-intl';
import {RevealOnScroll, RevealItem} from './RevealOnScroll';

export function StackCloud({
  groups,
}: {
  groups: {group: string; items: string[]}[];
}) {
  const t = useTranslations('Studio.stack');

  return (
    <section className=" bg-(--paper)/40 px-0 py-16 backdrop-blur sm:py-20 md:py-24 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        {/* ── Header — center on md+, left on mobile ──── */}
        <RevealOnScroll className="mb-10 max-w-2xl text-left md:mx-auto md:mb-14 md:text-center">
          <RevealItem>
            <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase md:text-sm md:tracking-widest">
              {t('eyebrow')}
            </p>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
              {t('title')}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-3 text-sm text-neutral-600 sm:text-base dark:text-neutral-300">
              {t('subtitle')}
            </p>
          </RevealItem>
        </RevealOnScroll>

        {/* ── Grid — 1 col mobile, 2 col sm, 3 col lg ── */}
        <RevealOnScroll className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {groups.map(({group, items}) => (
            <RevealItem key={group}>
              <div>
                <h3 className="mb-2.5 text-[11px] font-bold tracking-[0.18em] text-accent uppercase sm:mb-3 sm:text-xs sm:tracking-widest">
                  {t(`groups.${group}`)}
                </h3>
                <ul className="flex flex-wrap gap-1.5 sm:gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-[11px] text-neutral-700 transition-colors hover:border-accent sm:px-2.5 sm:text-xs dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
