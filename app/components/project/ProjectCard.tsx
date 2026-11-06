'use client';

import Link from 'next/link';
import Image from 'next/image';
import {motion} from 'motion/react';
import {useTranslations} from 'next-intl';
import type {Project} from '@/lib/types/project';
import {cn} from '@/lib/utils';

const categoryStyles: Record<Project['category'], string> = {
  fullstack:
    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900',
  frontend:
    'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900',
  ai: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900',
  seo: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900',
  aieo: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900',
};

export function ProjectCard({
  project,
  locale,
  index = 0,
}: {
  project: Project;
  locale: string;
  index?: number;
}) {
  const t = useTranslations('Projects');
  const detailHref = `/${locale}/projects/${project.slug}`;

  return (
    <motion.article
      initial={{opacity: 0, y: 24}}
      whileInView={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: -24}}
      viewport={{once: false, amount: 0.15}}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full">
      <Link
        href={detailHref}
        className="group block h-full">
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-400">
                {t('noImage')}
              </div>
            )}
            {project.featured && (
              <span className="absolute top-3 inset-e-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
                {t('featured')}
              </span>
            )}
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col gap-3 p-5">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase',
                  categoryStyles[project.category]
                )}>
                {t(`categories.${project.category}`)}
              </span>
              {project.year && (
                <span className="text-xs text-neutral-400">{project.year}</span>
              )}
            </div>

            <h3 className="text-lg font-bold text-neutral-900 transition-colors group-hover:text-accent dark:text-white">
              {project.title}
            </h3>

            <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {project.description}
            </p>

            {project.tags.length > 0 && (
              <ul className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.slice(0, 4).map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    #{tag}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto flex items-center gap-2 pt-2 text-sm font-medium text-accent">
              {t('viewProject')}
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </article>
      </Link>
    </motion.article>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="aspect-video animate-pulse bg-neutral-200 dark:bg-neutral-800" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-20 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
}
