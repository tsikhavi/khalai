'use client';

import {RevealSection, RevealChild} from '@/components/studio/RevealSection';
import type {Project} from '@/lib/types/project';

export function ProjectDetailBody({project}: {project: Project}) {
  const tags = project.tags ?? [];
  const content = project.content ?? '';

  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.1}
      className="mx-auto max-w-3xl px-6 py-16">
      {tags.length > 0 && (
        <RevealChild>
          <ul className="mb-12 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-neutral-200 bg-(--paper)/40 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
                #{tag}
              </li>
            ))}
          </ul>
        </RevealChild>
      )}

      {content && (
        <RevealChild>
          <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
            <div dangerouslySetInnerHTML={{__html: content}} />
          </div>
        </RevealChild>
      )}
    </RevealSection>
  );
}
