'use client';

import {RevealSection, RevealChild} from '@/components/studio/RevealSection';

export function MpesaWhy({
  eyebrow,
  title,
  subtitle,
  points,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  points: {key: string; title: string; body: string}[];
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

        <div className="grid gap-8 md:grid-cols-3">
          {points.map((p, i) => (
            <RevealChild key={p.key}>
              <div className="h-full">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {p.body}
                </p>
              </div>
            </RevealChild>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
