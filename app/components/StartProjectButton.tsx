'use client';

import Link from 'next/link';
import {cn} from '@/lib/utils';

export function StartProjectButton({
  href = '/start',
  children = 'Start a project',
  className,
  variant = 'cyan',
}: {
  href?: string;
  children?: React.ReactNode;
  className?: string;
  /** cyan = single-color sweep (like the reference), laser = multi-color beam */
  variant?: 'cyan' | 'laser' | 'orange';
}) {
  return (
    <Link
      href={href}
      className={cn(
        'laser-btn group relative inline-flex items-center justify-center',
        'rounded-xl p-[2.5px] text-sm font-medium',
        'transition-transform hover:scale-[1.02] active:scale-[0.99]',
        className
      )}
      data-variant={variant}>
      {/* Rotating gradient ring */}
      <span
        aria-hidden
        className="laser-ring"
      />

      {/* Inner face */}
      <span
        className={cn(
          'relative z-10 flex items-center justify-center rounded-[0.6rem]',
          'bg-neutral-900 px-6 py-3 dark:text-neutral-100 text-neutral-900',
          'transition-colors duration-200',
          'group-hover:bg-neutral-100',
          'bg-neutral-50 dark:bg-neutral-950 dark:group-hover:bg-neutral-900'
        )}>
        {children}
      </span>
    </Link>
  );
}
