'use client';

import {RevealSection, RevealChild} from '@/components/studio/RevealSection';

export function MpesaProof({
  eyebrow,
  title,
  subtitle,
  stats,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  stats: {key: string; value: string; label: string}[];
}) {
  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.2}
      className="px-6 py-24">
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

        <div className="grid gap-10 md:grid-cols-3">
          {stats.map((s) => (
            <RevealChild key={s.key}>
              <div className="border-t border-neutral-200 pt-6 text-center dark:border-neutral-800">
                <div className="text-5xl font-black tracking-tighter text-accent md:text-6xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs tracking-widest text-neutral-500 uppercase">
                  {s.label}
                </div>
              </div>
            </RevealChild>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
