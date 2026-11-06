'use client';

import {RevealSection, RevealChild} from '@/components/studio/RevealSection';

export function MpesaAnatomy({
  eyebrow,
  title,
  subtitle,
  rows,
  goodLabel,
  badLabel,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  rows: {key: string; label: string; value: string}[];
  goodLabel: string;
  badLabel: string;
}) {
  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.1}
      className="border-y border-neutral-200 bg-(--paper)/40 px-6 py-24 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <RevealChild>
            <p className="text-sm tracking-widest text-neutral-500 uppercase">
              {eyebrow}
            </p>
          </RevealChild>
          <RevealChild
            as="h2"
            className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
            {title}
          </RevealChild>
          <RevealChild
            as="p"
            className="mt-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </RevealChild>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <div className="grid grid-cols-[8rem_1fr] border-b border-neutral-200 bg-neutral-50 px-5 py-3 text-xs font-semibold tracking-widest text-neutral-500 uppercase dark:border-neutral-800 dark:bg-neutral-950 md:grid-cols-[12rem_1fr]">
            <span>{badLabel}</span>
            <span>{goodLabel}</span>
          </div>
          {rows.map((row, i) => (
            <RevealChild key={row.key}>
              <div
                className={`grid grid-cols-[8rem_1fr] items-start gap-6 px-5 py-6 md:grid-cols-[12rem_1fr] md:gap-12 ${
                  i > 0
                    ? 'border-t border-neutral-200 dark:border-neutral-800'
                    : ''
                }`}>
                <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                  {row.label}
                </span>
                <span className="text-base leading-relaxed text-neutral-800 dark:text-neutral-200">
                  {row.value}
                </span>
              </div>
            </RevealChild>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
