'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {useRef} from 'react';
import {cn} from '@/lib/utils';
import {
  ChartIcon,
  FileIcon,
  SettingsIcon,
  InboxIcon,
  Payment,
  UsersIcon,
} from '@/components/icons';

type NavKey =
  | 'activity'
  | 'reports'
  | 'payments'
  | 'messages'
  | 'settings'
  | 'adminInbox'
  | 'users';

type RouteCard = {
  key: NavKey;
  path: string;
  Icon: typeof ChartIcon;
  blurb: string;
  accent: string;
  adminOnly?: boolean;
};

const BASE_CARDS: RouteCard[] = [
  {
    key: 'activity',
    path: '/dashboard/activity',
    Icon: ChartIcon,
    blurb: 'Your history with the studio.',
    accent: '#c9613f',
  },
  {
    key: 'reports',
    path: '/dashboard/reports',
    Icon: FileIcon,
    blurb: 'Project progress and reports.',
    accent: '#533483',
  },
  {
    key: 'payments',
    path: '/dashboard/payments',
    Icon: Payment,
    blurb: 'Invoices and receipts.',
    accent: '#0f3460',
  },
  {
    key: 'messages',
    path: '/dashboard/messages',
    Icon: InboxIcon,
    blurb: 'Threads and replies.',
    accent: '#c9613f',
  },
  {
    key: 'settings',
    path: '/dashboard/settings',
    Icon: SettingsIcon,
    blurb: 'Workspace preferences.',
    accent: '#533483',
  },
];

const ADMIN_CARDS: RouteCard[] = [
  {
    key: 'adminInbox',
    path: '/dashboard/admin/inbox',
    Icon: InboxIcon,
    blurb: 'Triage client messages.',
    accent: '#c9613f',
    adminOnly: true,
  },
  {
    key: 'users',
    path: '/dashboard/users',
    Icon: UsersIcon,
    blurb: 'People, roles, and access.',
    accent: '#1a1a2e',
    adminOnly: true,
  },
];

export default function RouteCards({
  isAdmin,
  locale,
}: {
  isAdmin: boolean;
  activeProjectSlug: string | null;
  locale: string;
}) {
  const cards: RouteCard[] = isAdmin
    ? [...BASE_CARDS, ...ADMIN_CARDS]
    : BASE_CARDS;

  return (
    <section>
      <header className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Jump back in
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Everything you manage, one click away.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <RouteCardItem
            key={card.path}
            card={card}
            index={i}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}

function RouteCardItem({
  card,
  index,
  locale,
}: {
  card: RouteCard;
  index: number;
  locale: string;
}) {
  const t = useTranslations('Dashboard.nav');
  const pathname = usePathname();
  const ref = useRef<HTMLAnchorElement>(null);

  const href = `/${locale}${card.path}`;
  const pathWithoutLocale = pathname.replace(
    new RegExp(`^/${locale}(?=/|$)`),
    ''
  );
  const active =
    pathWithoutLocale === card.path ||
    pathWithoutLocale.startsWith(card.path + '/');

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}>
      <Link
        ref={ref}
        href={href}
        onMouseMove={handleMove}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'group relative block overflow-hidden rounded-xl border bg-white p-5 transition-all duration-300',
          'hover:-translate-y-1 hover:shadow-lg',
          active
            ? 'border-accent/60 ring-1 ring-accent/30'
            : 'border-neutral-200 dark:border-neutral-800',
          'dark:bg-neutral-900'
        )}>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(220px circle at var(--x, 50%) var(--y, 50%), ${card.accent}22, transparent 70%)`,
          }}
        />
        <span
          aria-hidden
          className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{backgroundColor: card.accent}}
        />

        <div className="relative flex items-start gap-4">
          <motion.div
            whileHover={{rotate: -6, scale: 1.05}}
            transition={{type: 'spring', stiffness: 260, damping: 18}}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
            style={{backgroundColor: `${card.accent}1a`, color: card.accent}}>
            <card.Icon className="h-5 w-5" />
          </motion.div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                {t(card.key)}
              </h3>
              {active && (
                <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent">
                  Current
                </span>
              )}
            </div>
            <p className="mt-1 truncate text-xs text-neutral-500 dark:text-neutral-400">
              {card.blurb}
            </p>
          </div>

          <span className="mt-1 text-neutral-400 transition-colors group-hover:text-accent">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
