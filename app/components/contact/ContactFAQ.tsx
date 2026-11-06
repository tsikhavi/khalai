'use client';

import {useState} from 'react';
import {RevealSection, RevealChild} from '../studio/RevealSection';

type FAQ = {key: string; q: string; a: string};

export function ContactFAQ({
  heading,
  subtitle,
  faqs,
}: {
  heading: string;
  subtitle: string;
  faqs: FAQ[];
}) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.1}
      className="py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <RevealChild
            as="h2"
            className="text-2xl font-semibold tracking-tight md:text-3xl">
            {heading}
          </RevealChild>
          <RevealChild
            as="p"
            className="mt-3 text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </RevealChild>
        </div>

        <dl className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {faqs.map((f) => {
            const isOpen = open === f.key;
            return (
              <RevealChild key={f.key}>
                <div className="py-5">
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : f.key)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 text-left text-base font-medium transition-colors hover:text-accent">
                      {f.q}
                      <span
                        className={`shrink-0 transition-transform ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                        aria-hidden>
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>
                  </dt>
                  <dd
                    className={`grid overflow-hidden text-sm text-neutral-600 transition-all duration-300 dark:text-neutral-400 ${
                      isOpen
                        ? 'mt-3 grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}>
                    <span className="overflow-hidden">{f.a}</span>
                  </dd>
                </div>
              </RevealChild>
            );
          })}
        </dl>
      </div>
    </RevealSection>
  );
}
