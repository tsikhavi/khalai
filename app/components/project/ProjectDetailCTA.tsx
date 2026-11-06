'use client';

import {RevealSection, RevealChild} from '../studio/RevealSection';
import {StartProjectButton} from '@/components/StartProjectButton';

export function ProjectDetailCTA({
  title,
  body,
  primaryLabel,
  locale,
}: {
  title: string;
  body: string;
  primaryLabel: string;
  locale: string;
}) {
  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.25}
      className="border-t border-neutral-200 bg-(--paper)/50 py-20 dark:border-neutral-800 dark:bg-neutral-950/50">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealChild
          as="h2"
          className="text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </RevealChild>
        <RevealChild
          as="p"
          className="mx-auto mt-4 max-w-xl text-neutral-600 dark:text-neutral-400">
          {body}
        </RevealChild>
        <RevealChild className="mt-8">
          <StartProjectButton
            variant="orange"
            href={`/${locale}/start`}>
            {primaryLabel}
          </StartProjectButton>
        </RevealChild>
      </div>
    </RevealSection>
  );
}
