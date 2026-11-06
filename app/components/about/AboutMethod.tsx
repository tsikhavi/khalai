'use client';

import {RevealSection, RevealChild} from '../studio//RevealSection';

export function AboutMethod({
  heading,
  body,
  steps,
}: {
  heading: string;
  body: string;
  steps: {key: string; title: string; body: string}[];
}) {
  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.1}
      className="border-y border-neutral-200 bg-(--paper)/40 py-20 dark:border-neutral-800 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 max-w-2xl">
          <RevealChild
            as="h2"
            className="text-3xl font-semibold tracking-tight md:text-4xl">
            {heading}
          </RevealChild>
          <RevealChild
            as="p"
            className="mt-4 text-neutral-600 dark:text-neutral-400">
            {body}
          </RevealChild>
        </div>

        <ol className="space-y-8">
          {steps.map((step, i) => (
            <RevealChild key={step.key}>
              <li className="grid grid-cols-[auto_1fr] gap-6 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                <span className="font-mono text-xs text-neutral-400 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {step.body}
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
