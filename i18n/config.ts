export const locales = ['en', 'sw', 'fr', 'es', 'ar', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<
  Locale,
  {label: string; flag: string; dir: 'ltr' | 'rtl'}
> = {
  en: {label: 'English', flag: '🇬🇧', dir: 'ltr'},
  sw: {label: 'Kiswahili', flag: '🇰🇪', dir: 'ltr'},
  fr: {label: 'Français', flag: '🇫🇷', dir: 'ltr'},
  es: {label: 'Español', flag: '🇪🇸', dir: 'ltr'},
  ar: {label: 'العربية', flag: '🇸🇦', dir: 'rtl'},
  ru: {label: 'Русский', flag: '🇷🇺', dir: 'ltr'},
};

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === 'string' && (locales as readonly string[]).includes(value)
  );
}
