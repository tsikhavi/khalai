'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {InboxIcon} from '@/components/icons';
import {useAuth} from '@/providers/AuthProvider';

const POLL_INTERVAL = 30_000; // 30s

export function NotificationBell() {
  const {user} = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) return; // nothing to poll — no setState here

    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch('/api/notifications', {cache: 'no-store'});
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && typeof data?.count === 'number') {
          setCount(data.count);
        }
      } catch {
        /* ignore */
      }
    };

    load();
    const id = setInterval(load, POLL_INTERVAL);

    const onFocus = () => load();
    window.addEventListener('focus', onFocus);

    return () => {
      cancelled = true;
      clearInterval(id);
      window.removeEventListener('focus', onFocus);
    };
  }, [user]);

  // Derive the *displayed* count from auth state. When the user logs out,
  // this is 0 immediately without needing setCount(0) in the effect.
  const displayCount = user ? count : 0;

  const isAdmin = user?.role === 'ADMIN';
  const href = isAdmin ? '/dashboard/admin/inbox' : '/messages';
  const label = isAdmin ? 'Open inbox' : 'Open messages';

  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100">
      <InboxIcon className="h-4 w-4" />
      {displayCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold text-white">
          {displayCount > 99 ? '99+' : displayCount}
        </span>
      )}
    </Link>
  );
}
