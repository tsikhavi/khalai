'use client';

import {RevealSection, RevealChild} from '../studio//RevealSection';

export function AboutValues({
  heading,
  items,
}: {
  heading: string;
  items: {key: string; title: string; body: string}[];
}) {
  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.1}
      className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <RevealChild
          as="h2"
          className="mb-10 text-3xl font-semibold tracking-tight md:text-4xl">
          {heading}
        </RevealChild>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({key, title, body}) => (
            <RevealChild key={key}>
              <div className="h-full rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-accent dark:border-neutral-800 dark:bg-neutral-900">
                <div className="mb-4 h-1 w-8 bg-accent" />
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {body}
                </p>
              </div>
            </RevealChild>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
