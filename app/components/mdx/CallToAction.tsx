'use client';

import Link from 'next/link';
import {useLocale} from 'next-intl';

export function CallToAction({
  href,
  title,
  body,
  label,
}: {
  href: string;
  title: string;
  body: string;
  label: string;
}) {
  const locale = useLocale();

  // Prefix internal links with the current locale.
  // External links (starting with http) are left untouched.
  const isExternal = /^https?:\/\//i.test(href);
  const finalHref = isExternal
    ? href
    : `/${locale}${href.startsWith('/') ? href : '/' + href}`;

  return (
    <Link
      href={finalHref}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group my-8 flex items-center gap-4 rounded-2xl border border-neutral-200 bg-(--paper)/40 p-6 transition-all hover:-translate-y-0.5 hover:border-(--accent) hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950/40">
      <div className="min-w-0 flex-1">
        <p className="text-xs tracking-widest text-neutral-500 uppercase">
          {label}
        </p>
        <p className="mt-2 text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {title}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {body}
        </p>
      </div>
    </Link>
  );
}
