'use client';

import {RevealSection, RevealChild} from '../studio//RevealSection';

export function AboutStats({
  stats,
}: {
  stats: {key: string; value: string; label: string}[];
}) {
  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.3}
      className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <RevealChild
          as="p"
          className="mb-10 text-sm tracking-widest text-neutral-500 uppercase">
          By the numbers
        </RevealChild>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map(({key, value, label}) => (
            <RevealChild key={key}>
              <div className="text-center">
                <div className="text-3xl font-extrabold tracking-tight text-accent">
                  {value}
                </div>
                <div className="mt-1 text-xs tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
                  {label}
                </div>
              </div>
            </RevealChild>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
