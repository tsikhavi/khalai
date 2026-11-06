'use client';

import {RevealSection, RevealChild} from '../studio//RevealSection';
import {Lens} from '../studio//LensToggle';

export function AboutStory({
  storyTitle,
  story,
  introTitle,
  intro,
  signature,
}: {
  storyTitle: string;
  story: string;
  introTitle: string;
  intro: string;
  signature: string;
}) {
  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.15}
      className="border-y border-neutral-200 bg-(--paper)/40 py-20 dark:border-neutral-800 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-10 md:grid-cols-2">
          {/* The story — longer form */}
          <RevealChild className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              {storyTitle}
            </h2>
            <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              {story}
            </p>
          </RevealChild>

          {/* The intro — shorter, more personal */}
          <RevealChild className="space-y-6 self-center">
            <h2 className="text-sm tracking-widest text-neutral-500 uppercase">
              {introTitle}
            </h2>
            <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
              {intro}
            </p>
            <p className="text-sm italic text-neutral-500">
              —{' '}
              <Lens reveal={<span className="text-accent">{signature}</span>}>
                {signature}
              </Lens>
            </p>
          </RevealChild>
        </div>
      </div>
    </RevealSection>
  );
}
