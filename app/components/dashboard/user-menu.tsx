'use client';

import {useEffect, useRef, useState, useTransition} from 'react';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {useAuth} from '@/providers/AuthProvider';
import {logoutAction} from '@/lib/actions/auth';

export function UserMenu() {
  const t = useTranslations('Dashboard.userMenu');
  const locale = useLocale();
  const {user} = useAuth() as {
    user?: {name?: string; email?: string; role?: string} | null;
  };
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onClick);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  const initials = (user?.name ?? 'U')
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const isAdmin = user?.role === 'ADMIN';

  return (
    <div
      ref={ref}
      className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700 transition-colors hover:bg-accent/15 hover:text-accent dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-accent/20 dark:hover:text-accent">
        {initials}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute inset-e-0 mt-2 w-56 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
          {/* Identity */}
          <div className="px-3 py-2.5">
            <div className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {user?.name ?? t('guest')}
            </div>
            <div className="truncate text-xs text-neutral-500">
              {user?.email ?? ''}
            </div>
          </div>

          <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

          {/* Navigation */}
          <div className="p-1">
            <MenuLink href={`/${locale}/dashboard/`}>{t('profile')}</MenuLink>
            <MenuLink href={`/${locale}/dashboard/settings`}>
              {t('settings')}
            </MenuLink>
            <MenuLink
              href={isAdmin ? `/${locale}/admin/inbox` : `/${locale}/messages`}>
              {isAdmin ? t('adminInbox') : t('myMessages')}
            </MenuLink>
          </div>

          <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

          {/* Logout */}
          <div className="p-1">
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              disabled={isPending}
              className="flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-400 dark:hover:bg-red-950/40">
              {isPending ? (
                <>
                  <span className="spinner spinner-sm" />
                  {t('loggingOut')}
                </>
              ) : (
                t('logout')
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({href, children}: {href: string; children: React.ReactNode}) {
  return (
    <Link
      href={href}
      role="menuitem"
      className="block rounded-md px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-accent/10 hover:text-accent dark:text-neutral-300">
      {children}
    </Link>
  );
}
