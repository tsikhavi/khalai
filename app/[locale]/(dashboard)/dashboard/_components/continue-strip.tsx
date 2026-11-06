'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import type {Report} from '@/lib/reports';

type Thread = {
  id: string;
  subject: string;
  messages: Array<{fromAdmin: boolean; body: string; readAt: string | null}>;
};

export default function ContinueStrip({
  activeReport,
  unreadThread,
  locale,
}: {
  activeReport: Report | null;
  unreadThread: Thread | null;
  locale: string;
}) {
  const hasAnything = activeReport || unreadThread;
  if (!hasAnything) return null;

  return (
    <section>
      <header className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Continue where you left off
        </h2>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {activeReport && (
          <motion.div
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: [0.22, 1, 0.36, 1]}}>
            <Link
              href={`/${locale}/dashboard/reports/${activeReport.slug}`}
              className="group block rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                    Active project
                  </p>
                  <h3 className="mt-1 truncate text-base font-semibold text-neutral-900 group-hover:text-accent dark:text-neutral-100">
                    {activeReport.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {activeReport.phase} · {activeReport.progress}%
                  </p>
                </div>

                <ProgressRing value={activeReport.progress} />
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{width: 0}}
                  animate={{width: `${activeReport.progress}%`}}
                  transition={{duration: 1.2, ease: [0.22, 1, 0.36, 1]}}
                />
              </div>
            </Link>
          </motion.div>
        )}

        {unreadThread && (
          <motion.div
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1]}}>
            <Link
              href={`/${locale}/dashboard/messages/${unreadThread.id}`}
              className="group block rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-emerald-500/20 dark:bg-emerald-500/5">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                Waiting for your reply
              </p>
              <h3 className="mt-1 truncate text-base font-semibold text-neutral-900 group-hover:text-emerald-700 dark:text-neutral-100 dark:group-hover:text-emerald-400">
                {unreadThread.subject}
              </h3>
              {unreadThread.messages.length > 0 && (
                <p className="mt-1 truncate text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="font-medium">Support: </span>
                  {unreadThread.messages[unreadThread.messages.length - 1].body}
                </p>
              )}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProgressRing({value}: {value: number}) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg
        viewBox="0 0 56 56"
        className="h-14 w-14 -rotate-90">
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          strokeWidth="4"
          className="stroke-neutral-200 dark:stroke-neutral-800"
        />
        <motion.circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          stroke="#c9613f"
          strokeDasharray={c}
          initial={{strokeDashoffset: c}}
          animate={{strokeDashoffset: c - (value / 100) * c}}
          transition={{duration: 1.2, ease: [0.22, 1, 0.36, 1]}}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
        {value}%
      </span>
    </div>
  );
}
