'use client';
import Link from 'next/link';
import {useLocale} from 'next-intl';
import type {ComponentProps} from 'react';

export function LocaleLink({href, ...props}: ComponentProps<typeof Link>) {
  const locale = useLocale();
  const path =
    typeof href === 'string'
      ? href
      : ((href as {pathname?: string}).pathname ?? '');
  const localized = path.startsWith('/')
    ? `/${locale}${path === '/' ? '' : path}`
    : href;
  return (
    <Link
      href={localized}
      {...props}
    />
  );
}
