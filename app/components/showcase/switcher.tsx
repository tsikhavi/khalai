'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useLocale, useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import {cn} from '@/lib/utils';

const EXPERIENCES = [
  {slug: 'creativity', path: '/creativity', accent: '#c8ff01'},
  {slug: 'horizontal', path: '/horizontal', accent: '#15ff00'},
  {slug: 'typography', path: '/typography', accent: '#c9613f'},
  {slug: 'systems', path: '/systems', accent: '#0ad300'},
  {slug: 'music', path: '/music', accent: '#533483'},
  {slug: 'photography', path: '/photography', accent: '#c9613f'},
  {slug: 'kitchen', path: '/kitchen', accent: '#0ad300'},
] as const;

type Theme = 'light' | 'dark' | 'system';
const THEME_KEY = 'theme';
const THEME_EVENT = 'theme-change';

function applyTheme(next: Theme) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = next === 'dark' || (next === 'system' && prefersDark);
  document.documentElement.classList.toggle('dark', isDark);
}

function readTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  const saved = window.localStorage.getItem(THEME_KEY);
  return saved === 'light' || saved === 'dark' || saved === 'system'
    ? saved
    : 'system';
}

function persistTheme(next: Theme) {
  window.localStorage.setItem(THEME_KEY, next);
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ShowcaseSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('Showcase');

  const [theme, setThemeState] = useState<Theme>('system');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hydrate = setTimeout(() => {
      setThemeState(readTheme());
      setHydrated(true);
    }, 0);

    const onChange = () => setThemeState(readTheme());
    window.addEventListener('storage', onChange);
    window.addEventListener(THEME_EVENT, onChange);

    return () => {
      clearTimeout(hydrate);
      window.removeEventListener('storage', onChange);
      window.removeEventListener(THEME_EVENT, onChange);
    };
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const next: Theme =
      theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    persistTheme(next);
    setThemeState(next);
  };

  const pathWithoutLocale = pathname.replace(
    new RegExp(`^/${locale}(?=/|$)`),
    ''
  );

  const active = EXPERIENCES.find(
    (e) =>
      pathWithoutLocale === e.path || pathWithoutLocale.startsWith(e.path + '/')
  );
  const activeAccent = active?.accent ?? '#c8ff01';

  const themeIcon = !hydrated ? (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8">
      <rect
        x="3"
        y="4"
        width="18"
        height="12"
        rx="2"
      />
      <path
        d="M8 20h8M12 16v4"
        strokeLinecap="round"
      />
    </svg>
  ) : theme === 'light' ? (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8">
      <circle
        cx="12"
        cy="12"
        r="4"
      />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        strokeLinecap="round"
      />
    </svg>
  ) : theme === 'dark' ? (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8">
      <rect
        x="3"
        y="4"
        width="18"
        height="12"
        rx="2"
      />
      <path
        d="M8 20h8M12 16v4"
        strokeLinecap="round"
      />
    </svg>
  );

  const themeLabel = !hydrated
    ? 'System'
    : theme === 'light'
      ? 'Light'
      : theme === 'dark'
        ? 'Dark'
        : 'System';

  return (
    <nav
      aria-label={t('switcherLabel')}
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-2 sm:px-4">
      <div className="pointer-events-auto flex w-full max-w-[calc(100vw-1rem)] items-center gap-1 overflow-x-auto rounded-full border border-foreground/10 bg-background/95 p-1.5 shadow-2xl backdrop-blur-md scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:w-auto sm:max-w-none dark:border-white/10">
        {/* Back to showcase — pinned left on mobile, inline on desktop */}
        <Link
          href={`/${locale}/showcase`}
          aria-label={t('backToShowcase')}
          title={t('backToShowcase')}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <path
              d="M15 18l-6-6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <div className="mx-1 h-5 w-px shrink-0 bg-foreground/10" />

        {/* Experience tabs — scroll horizontally below sm */}
        {EXPERIENCES.map((exp) => {
          const isActive =
            pathWithoutLocale === exp.path ||
            pathWithoutLocale.startsWith(exp.path + '/');

          return (
            <Link
              key={exp.slug}
              href={`/${locale}${exp.path}`}
              className={cn(
                'relative shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm',
                isActive
                  ? 'text-black'
                  : 'text-foreground/60 hover:text-foreground'
              )}>
              {isActive && (
                <motion.span
                  layoutId="showcase-switcher-active"
                  className="absolute inset-0 rounded-full"
                  style={{backgroundColor: activeAccent}}
                  transition={{type: 'spring', stiffness: 380, damping: 30}}
                />
              )}
              <span className="relative z-10">
                {t(`experiences.${exp.slug}.title`)}
              </span>
            </Link>
          );
        })}

        <div className="mx-1 h-5 w-px shrink-0 bg-foreground/10" />

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Theme: ${themeLabel}`}
          title={`Theme: ${themeLabel} (click to cycle)`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground">
          {themeIcon}
        </button>
      </div>
    </nav>
  );
}
