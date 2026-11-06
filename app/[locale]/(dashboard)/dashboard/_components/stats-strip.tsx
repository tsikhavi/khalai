'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {cn} from '@/lib/utils';

type Props = {
  activeProjects: number;
  overallProgress: number;
  unreadMessages: number;
  balance: number;
  isAdmin: boolean;
  locale: string;
};

export default function StatsStrip(props: Props) {
  const {isAdmin, locale} = props;

  const stats = isAdmin
    ? [
        {
          label: 'Revenue',
          value: props.overallProgress, // TODO: swap in real revenue when endpoint exists
          prefix: '$',
          hint: 'this month',
          href: `/${locale}/dashboard/analytics`,
          tint: 'from-[#c9613f]/15 to-transparent',
        },
        {
          label: 'Active projects',
          value: props.activeProjects,
          hint: 'in progress',
          href: `/${locale}/dashboard/reports`,
          tint: 'from-[#533483]/15 to-transparent',
        },
        {
          label: 'Unread messages',
          value: props.unreadMessages,
          hint: 'need attention',
          href: `/${locale}/dashboard/admin/inbox`,
          tint: 'from-[#0f3460]/15 to-transparent',
        },
        {
          label: 'Balance',
          value: props.balance,
          prefix: '$',
          hint: 'outstanding',
          href: `/${locale}/dashboard/payments`,
          tint: 'from-[#1a1a2e]/15 to-transparent',
        },
      ]
    : [
        {
          label: 'Active projects',
          value: props.activeProjects,
          hint: 'in progress',
          href: `/${locale}/dashboard/reports`,
          tint: 'from-[#c9613f]/15 to-transparent',
        },
        {
          label: 'Overall progress',
          value: props.overallProgress,
          suffix: '%',
          hint: 'across projects',
          href: `/${locale}/dashboard/reports`,
          tint: 'from-[#533483]/15 to-transparent',
        },
        {
          label: 'Unread messages',
          value: props.unreadMessages,
          hint: props.unreadMessages > 0 ? 'needs your reply' : 'all caught up',
          href: `/${locale}/dashboard/messages`,
          tint: 'from-[#0f3460]/15 to-transparent',
        },
        {
          label: 'Balance',
          value: props.balance,
          prefix: '$',
          hint: props.balance === 0 ? 'all clear' : 'outstanding',
          href: `/${locale}/dashboard/payments`,
          tint: 'from-[#1a1a2e]/15 to-transparent',
        },
      ];

  return (
    <section>
      <header className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {isAdmin ? 'Studio overview' : 'Overview'}
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {isAdmin ? 'Live studio health.' : 'A quick read on your projects.'}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{y: -3}}>
            <Link
              href={s.href}
              className="group relative block overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
              <div
                className={cn(
                  'pointer-events-none absolute inset-0 bg-linear-to-br opacity-60',
                  s.tint
                )}
              />

              <motion.span
                className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-accent"
                animate={{opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1]}}
                transition={{duration: 2.2, repeat: Infinity, delay: i * 0.2}}
              />

              <div className="relative">
                <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {s.label}
                </div>
                <div className="mt-2 text-2xl font-bold tracking-tight tabular-nums text-neutral-900 dark:text-neutral-100">
                  {s.prefix}
                  {s.value.toLocaleString()}
                  {s.suffix}
                </div>
                <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  {s.hint}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
