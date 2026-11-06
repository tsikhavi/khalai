'use client';

import {RevealSection, RevealChild} from '@/components/studio/RevealSection';

export function MpesaFuture({
  eyebrow,
  title,
  subtitle,
  features,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  features: {key: string; title: string; body: string}[];
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

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((f, i) => (
            <RevealChild key={f.key}>
              <div className="grid grid-cols-[3rem_1fr] gap-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                <span className="font-mono text-2xl font-black text-(--accent) tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {f.body}
                  </p>
                </div>
              </div>
            </RevealChild>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
