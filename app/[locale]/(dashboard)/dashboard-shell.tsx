'use client';

import {useCallback, useSyncExternalStore} from 'react';
import {Sidebar} from '@/components/dashboard/sidebar';
import {Header} from '@/components/dashboard/header';

const STORAGE_KEY = 'sidebar-collapsed';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('sidebar-collapsed-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('sidebar-collapsed-change', callback);
  };
}

const getServerSnapshot = () => false;

const getSnapshot = () =>
  typeof window === 'undefined'
    ? false
    : localStorage.getItem(STORAGE_KEY) === 'true';

function setCollapsed(next: boolean) {
  localStorage.setItem(STORAGE_KEY, String(next));
  window.dispatchEvent(new Event('sidebar-collapsed-change'));
}

export default function DashboardShell({
  children,
  reportTitles,
}: {
  children: React.ReactNode;
  reportTitles?: Record<string, string>;
}) {
  const collapsed = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const toggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  return (
    <div className="flex h-full w-full  overflow-y-scroll bg-neutral-50 dark:bg-neutral-950/90">
      <Sidebar
        collapsed={collapsed}
        onToggle={toggle}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header reportTitles={reportTitles} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
