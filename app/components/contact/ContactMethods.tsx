'use client';

import {RevealSection, RevealChild} from '../studio/RevealSection';

type Method = {
  key: string;
  icon: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  external: boolean;
};

export function ContactMethods({
  heading,
  subtitle,
  methods,
}: {
  heading: string;
  subtitle: string;
  methods: Method[];
}) {
  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.1}
      className="border-y border-neutral-200 bg-(--paper)/40 py-20 dark:border-neutral-800 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 max-w-2xl">
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {methods.map((m) => (
            <RevealChild key={m.key}>
              <a
                href={m.href}
                target={m.external ? '_blank' : undefined}
                rel={m.external ? 'noopener noreferrer' : undefined}
                className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-xl dark:bg-neutral-800">
                  {m.icon}
                </div>
                <h3 className="text-base font-semibold">{m.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {m.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  {m.cta}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </RevealChild>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
