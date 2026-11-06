'use client';

import {RevealSection, RevealChild} from '@/components/studio/RevealSection';

export function MpesaPartners({
  eyebrow,
  title,
  subtitle,
  partners,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  partners: {key: string; name: string; body: string}[];
}) {
  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.1}
      className="py-24">
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
          <RevealChild
            as="p"
            className="mt-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </RevealChild>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {partners.map((p) => (
            <RevealChild key={p.key}>
              <div className="h-full rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-(--accent) dark:border-neutral-800 dark:bg-neutral-900">
                <div className="mb-4 inline-flex h-9 items-center rounded-md bg-(--accent)/10 px-3 text-xs font-bold tracking-widest text-(--accent) uppercase">
                  {p.name}
                </div>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
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
