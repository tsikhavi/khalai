'use client';

import Link from 'next/link';
import {useTranslations} from 'next-intl';

const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  sw: 'Kiswahili',
  es: 'Español',
  fr: 'Français',
  ar: 'العربية',
  ru: 'Русский',
};

export function PostLanguageSwitcher({
  slug,
  translations,
  currentLocale,
}: {
  slug: string;
  translations: Record<string, string>;
  currentLocale: string;
}) {
  const t = useTranslations('Blog');
  const available = Object.keys(translations).filter(
    (l) => l !== currentLocale
  );
  if (available.length === 0) return null;

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs">
      <span className="text-neutral-500">{t('alsoAvailableIn')}</span>
      {available.map((loc) => (
        <Link
          key={loc}
          href={`/${loc}/blog/${slug}`}
          className="text-accent underline-offset-4 hover:underline">
          {LOCALE_NAMES[loc] ?? loc}
        </Link>
      ))}
    </div>
  );
}
