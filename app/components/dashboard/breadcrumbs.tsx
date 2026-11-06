'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useLocale, useTranslations} from 'next-intl';
import {ChevronRightIcon} from '@/components/icons';
import {cn} from '@/lib/utils';

function humanizeSegment(segment: string): string {
  if (/^[a-z0-9]{20,}$/i.test(segment)) {
    return segment.slice(0, 6) + '…';
  }
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Breadcrumbs({
  className,
  reportTitles,
}: {
  className?: string;
  /** slug -> human title, e.g. { "khalai-brand": "Khalai Brand System" } */
  reportTitles?: Record<string, string>;
}) {
  const t = useTranslations('Dashboard.breadcrumbs');
  const tNav = useTranslations('Dashboard.nav');
  const locale = useLocale();
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(
    new RegExp(`^/${locale}(?=/|$)`),
    ''
  );
  const segments = pathWithoutLocale.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments
    .map((segment, i) => {
      const href = `/${locale}/${segments.slice(0, i + 1).join('/')}`;
      const label = resolveLabel(segment, tNav, t, reportTitles);
      return {label, href, isLast: i === segments.length - 1};
    })
    .filter((c) => c.label !== null) as {
    label: string;
    href: string;
    isLast: boolean;
  }[];

  return (
    <nav
      aria-label={t('ariaLabel')}
      className={cn('min-w-0', className)}>
      <ol className="flex items-center gap-1 overflow-hidden text-sm">
        {crumbs.map((crumb, i) => (
          <li
            key={crumb.href}
            className="flex items-center gap-1 whitespace-nowrap">
            {i > 0 && (
              <ChevronRightIcon className="h-3 w-3 shrink-0 text-neutral-400" />
            )}
            {crumb.isLast ? (
              <span
                aria-current="page"
                className="truncate font-medium text-neutral-900 dark:text-neutral-100">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="truncate text-neutral-500 transition-colors hover:text-accent">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function resolveLabel(
  segment: string,
  tNav: ReturnType<typeof useTranslations>,
  t: ReturnType<typeof useTranslations>,
  reportTitles?: Record<string, string>
): string | null {
  // 1. Real report slug from server — highest priority for dynamic segments
  if (reportTitles && reportTitles[segment]) {
    return reportTitles[segment];
  }

  // 2. Known nav key
  const navKey = mapSegmentToNavKey(segment);
  if (navKey && tNav.has(navKey)) {
    return tNav(navKey);
  }

  // 3. Breadcrumbs namespace — t.has() avoids the MISSING_MESSAGE log
  if (t.has(segment)) {
    return t(segment);
  }

  // 4. Humanize the segment as a last resort
  return humanizeSegment(segment);
}

function mapSegmentToNavKey(segment: string): string | null {
  const map: Record<string, string> = {
    dashboard: 'dashboard',
    analytics: 'analytics',
    users: 'users',
    reports: 'reports',
    messages: 'messages',
    settings: 'settings',
    profile: 'profile',
  };
  return map[segment] ?? null;
}
