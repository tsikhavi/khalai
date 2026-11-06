'use client';

import {RevealSection, RevealChild} from '../studio//RevealSection';
import {StartProjectButton} from '@/components/StartProjectButton';

export function AboutCTA({
  title,
  body,
  primaryLabel,
  secondaryLabel,
  locale,
}: {
  title: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
  locale: string;
}) {
  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.25}
      className="border-t border-neutral-200 bg-(--paper)/50 py-24 dark:border-neutral-800 dark:bg-neutral-950/50">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealChild
          as="h2"
          className="text-3xl font-semibold tracking-tight md:text-5xl">
          {title}
        </RevealChild>

        <RevealChild
          as="p"
          className="mx-auto mt-6 max-w-xl text-neutral-600 dark:text-neutral-400">
          {body}
        </RevealChild>

        <RevealChild className="mt-10 flex flex-wrap justify-center gap-3">
          <StartProjectButton
            variant="laser"
            href={`/${locale}/start`}>
            {primaryLabel}
          </StartProjectButton>

          <StartProjectButton
            variant="cyan"
            href={`/${locale}/projects`}>
            {secondaryLabel}
          </StartProjectButton>
        </RevealChild>
      </div>
    </RevealSection>
  );
}
