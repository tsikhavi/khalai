'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useLocale, useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {cn} from '@/lib/utils';
import {
  LayoutIcon,
  UsersIcon,
  ChartIcon,
  FileIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InboxIcon,
  Payment,
} from '@/components/icons';
import {useAuth} from '@/providers/AuthProvider';
import ThemeChanger from '../ui/ThemeChanger';

type NavKey =
  | 'dashboard'
  | 'activity'
  | 'reports'
  | 'payments'
  | 'messages'
  | 'settings'
  | 'users'
  | 'adminInbox'
  | 'leads';

type NavItem = {
  key: NavKey;
  path: string;
  Icon: typeof LayoutIcon;
  adminOnly?: boolean;
};

const NAV: NavItem[] = [
  {key: 'dashboard', path: '/dashboard', Icon: LayoutIcon},
  {key: 'activity', path: '/dashboard/activity', Icon: ChartIcon},
  {key: 'reports', path: '/dashboard/reports', Icon: FileIcon},
  {key: 'payments', path: '/dashboard/payments', Icon: Payment},
  {key: 'messages', path: '/dashboard/messages', Icon: InboxIcon},
  {key: 'settings', path: '/dashboard/settings', Icon: SettingsIcon},
  // ── admin only ──
  {key: 'leads', path: '/dashboard/leads', Icon: ChartIcon, adminOnly: true},
  {key: 'users', path: '/dashboard/users', Icon: UsersIcon, adminOnly: true},
  {
    key: 'adminInbox',
    path: '/dashboard/admin/inbox',
    Icon: InboxIcon,
    adminOnly: true,
  },
];

export function SidebarNav({collapsed}: {collapsed: boolean}) {
  const t = useTranslations('Dashboard.nav');
  const locale = useLocale();
  const pathname = usePathname();
  const {user} = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const items = NAV.filter((item) => !item.adminOnly || isAdmin);

  return (
    <nav className="flex flex-col gap-0.5 bg-neutral-50 px-2 py-3 dark:bg-neutral-900">
      {items.map(({key, path, Icon}) => {
        const pathWithoutLocale = pathname.replace(
          new RegExp(`^/${locale}(?=/|$)`),
          ''
        );
        const isDashboardRoot = path === '/dashboard';

        const active = isDashboardRoot
          ? pathWithoutLocale === path
          : pathWithoutLocale === path ||
            pathWithoutLocale.startsWith(path + '/');

        return (
          <Link
            key={path}
            href={`/${locale}${path}`}
            title={collapsed ? t(key) : undefined}
            className={cn(
              'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              'hover:bg-accent/10 hover:text-accent',
              active
                ? 'bg-accent/10 text-accent'
                : 'text-neutral-600 dark:text-neutral-400',
              collapsed && 'justify-center px-2'
            )}
            aria-current={active ? 'page' : undefined}>
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="truncate">{t(key)}</span>}
            {active && !collapsed && (
              <motion.span
                layoutId="sidebar-active"
                className="ms-auto h-1.5 w-1.5 rounded-full bg-accent"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations('Dashboard');

  return (
    <aside
      className={cn(
        'hidden md:flex md:flex-col border-r bg-white h-screen dark:bg-neutral-900 transition-[width] duration-200',
        'border-neutral-200 dark:border-neutral-800',
        collapsed ? 'w-20' : 'w-64'
      )}>
      <div
        className={cn(
          'flex h-14 items-center border-b border-neutral-200 px-3 dark:border-neutral-800',
          collapsed ? 'justify-center' : 'justify-between'
        )}>
        {!collapsed && (
          <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            {t('brand')}
          </span>
        )}
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? t('sidebar.expand') : t('sidebar.collapse')}
          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
          {collapsed ? (
            <ChevronRightIcon className="h-4 w-4" />
          ) : (
            <ChevronLeftIcon className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <SidebarNav collapsed={collapsed} />
      </div>

      <div className="border-t border-neutral-200 p-3 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-500">
        {!collapsed ? (
          <div className="flex items-center justify-between">
            <span className="truncate">{t('footer')}</span>
            <motion.div
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}>
              <ThemeChanger />
            </motion.div>
          </div>
        ) : (
          <motion.div
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="flex justify-center">
            <ThemeChanger />
          </motion.div>
        )}
      </div>
    </aside>
  );
}
