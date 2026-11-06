'use client';

import {RevealSection, RevealChild} from '@/components/studio/RevealSection';

export function MpesaPrinciples({
  eyebrow,
  title,
  steps,
}: {
  eyebrow: string;
  title: string;
  steps: {key: string; num: string; title: string; body: string}[];
}) {
  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.1}
      className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 max-w-2xl">
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
        </div>

        <ol className="space-y-12">
          {steps.map((s) => (
            <RevealChild key={s.key}>
              <li className="grid grid-cols-[auto_1fr] gap-6 border-t border-neutral-200 pt-8 dark:border-neutral-800 md:grid-cols-[6rem_1fr] md:gap-12">
                <span className="font-mono text-4xl font-black text-(--accent) tabular-nums md:text-6xl">
                  {s.num}
                </span>
                <div className="max-w-2xl">
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {s.body}
                  </p>
                </div>
              </li>
            </RevealChild>
          ))}
        </ol>
      </div>
    </RevealSection>
  );
}
