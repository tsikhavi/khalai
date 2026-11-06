'use client';

import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {SidebarNav} from './sidebar';
import {MenuIcon, CloseIcon} from '@/components/icons';

export function MobileSidebar() {
  const pathname = usePathname();
  // Remounts the inner component on route change → open resets to false.
  return <Drawer key={pathname} />;
}

function Drawer() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md hover:bg-gray-100 md:hidden">
        <MenuIcon className="h-5 w-5" />
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-58 w-64 transform bg-white dark:bg-neutral-900 shadow-lg transition-transform duration-200 md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true">
        <div className="flex h-14 items-center justify-between border-b px-3">
          <span className="text-sm font-semibold">Khalai</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto py-2">
          <SidebarNav collapsed={false} />
        </div>
      </aside>
    </>
  );
}
