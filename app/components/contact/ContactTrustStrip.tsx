'use client';

import {RevealSection, RevealChild} from '../studio/RevealSection';

export function ContactTrustStrip({items}: {items: string[]}) {
  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.3}
      className="border-y border-neutral-200 bg-(--paper)/40 py-6 dark:border-neutral-800 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-4 text-xs tracking-widest text-neutral-600 uppercase sm:grid-cols-4 dark:text-neutral-400">
          {items.map((item) => (
            <RevealChild key={item}>
              <div className="flex items-center gap-2">
                <span className="inline-block h-1 w-1 rounded-full bg-accent" />
                {item}
              </div>
            </RevealChild>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
