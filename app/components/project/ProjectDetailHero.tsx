'use client';

import Link from 'next/link';
import Image from 'next/image';
import {motion} from 'motion/react';
import type {Project} from '@/lib/types/project';

export function ProjectDetailHero({
  project,
  locale,
  labels,
}: {
  project: Project;
  locale: string;
  labels: {
    back: string;
    category: string;
    visitLive: string;
    viewCode: string;
  };
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-24 pb-12 md:pt-32">
      <motion.div
        initial={{opacity: 0, y: 12}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5, ease: [0.22, 1, 0.36, 1]}}>
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-(--accent) dark:text-neutral-400">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {labels.back}
        </Link>
      </motion.div>

      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1]}}
        className="mt-8 flex items-center gap-3">
        <span className="rounded-full border border-(--accent)/30 bg-(--accent)/10 px-3 py-1 text-xs font-semibold tracking-widest text-(--accent) uppercase">
          {labels.category}
        </span>
        {project.year && (
          <span className="text-sm text-neutral-500">{project.year}</span>
        )}
      </motion.div>

      <motion.h1
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1]}}
        className="mt-4 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">
        {project.title}
      </motion.h1>

      <motion.p
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1]}}
        className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
        {project.description}
      </motion.p>

      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1]}}
        className="mt-8 flex flex-wrap gap-3">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-(--accent) px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-(--accent)/90">
            {labels.visitLive}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:border-(--accent) hover:text-(--accent) dark:border-neutral-700 dark:text-neutral-200">
            {labels.viewCode}
          </a>
        )}
      </motion.div>

      {project.thumbnail && (
        <motion.div
          initial={{opacity: 0, y: 30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1]}}
          className="relative mt-12 aspect-video overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </motion.div>
      )}
    </section>
  );
}
