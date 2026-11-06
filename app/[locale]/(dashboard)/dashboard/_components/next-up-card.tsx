'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import type {Report} from '@/lib/reports';

export default function NextUpCard({
  report,
  locale,
}: {
  report: Report;
  locale: string;
}) {
  const activePhase = report.phases.find((p) => p.status === 'in-progress');
  const nextTask = activePhase?.tasks.find((t) => !t.done);
  const target = activePhase?.target;

  if (!activePhase) return null;

  return (
    <motion.section
      initial={{opacity: 0, y: 12}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1]}}
      className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            What&apos;s next
          </p>
          <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
            <span className="text-accent">{activePhase.name}</span> phase —{' '}
            {nextTask ? (
              <>
                next up: <span className="font-semibold">{nextTask.label}</span>
              </>
            ) : (
              'finalising this phase'
            )}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            {target && <span>Target: {target}</span>}
            <span>·</span>
            <span>
              {activePhase.tasks.filter((t) => t.done).length}/
              {activePhase.tasks.length} tasks done
            </span>
          </div>
        </div>

        <Link
          href={`/${locale}/dashboard/reports/${report.slug}#phases`}
          className="text-sm font-medium text-accent hover:underline">
          See all tasks →
        </Link>
      </div>

      {/* Compact phase timeline */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {report.phases.map((p) => {
          const style =
            p.status === 'done'
              ? 'bg-accent text-white'
              : p.status === 'in-progress'
                ? 'bg-accent/20 text-accent ring-1 ring-accent/40'
                : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400';
          return (
            <span
              key={p.name}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${style}`}>
              {p.name}
              {p.status === 'done' && ' ✓'}
              {p.status === 'in-progress' && ' ◐'}
            </span>
          );
        })}
      </div>
    </motion.section>
  );
}
