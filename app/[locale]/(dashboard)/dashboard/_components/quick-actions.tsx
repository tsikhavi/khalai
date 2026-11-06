'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {InboxIcon, FileIcon, Payment, SettingsIcon} from '@/components/icons';

export default function QuickActions({locale}: {locale: string}) {
  const actions = [
    {href: `/${locale}/dashboard/messages`, label: 'Message', Icon: InboxIcon},
    {href: `/${locale}/dashboard/reports`, label: 'Reports', Icon: FileIcon},
    {href: `/${locale}/dashboard/payments`, label: 'Pay', Icon: Payment},
    {
      href: `/${locale}/dashboard/settings`,
      label: 'Settings',
      Icon: SettingsIcon,
    },
  ];

  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <h2 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Quick actions
      </h2>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((a, i) => (
          <motion.div
            key={a.href}
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            transition={{delay: i * 0.06, duration: 0.4}}
            whileHover={{y: -2}}>
            <Link
              href={a.href}
              className="flex flex-col items-center gap-2 rounded-lg p-3 text-center transition-colors hover:bg-accent/10">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                <a.Icon className="h-4 w-4" />
              </span>
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                {a.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
