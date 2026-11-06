'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const Ctx = createContext<{
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (t: Theme) => void;
}>({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => {},
});

export function useTheme() {
  return useContext(Ctx);
}

/* ────────────────────────────────────────────────────────────────
   Subscribe to the OS dark-mode preference
   ──────────────────────────────────────────────────────────────── */

const MEDIA_QUERY = '(prefers-color-scheme: dark)';

function subscribeToSystemTheme(callback: () => void) {
  const mq = window.matchMedia(MEDIA_QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getSystemThemeSnapshot(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light';
}

function getServerSystemThemeSnapshot(): ResolvedTheme {
  return 'light';
}

/* ────────────────────────────────────────────────────────────────
   Subscribe to the stored theme (localStorage)
   ──────────────────────────────────────────────────────────────── */

const THEME_KEY = 'theme';
const THEME_CHANGE_EVENT = 'theme-change';

function subscribeToStoredTheme(callback: () => void) {
  // storage event fires cross-tab; custom event fires same-tab
  window.addEventListener('storage', callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

function getStoredThemeSnapshot(): Theme {
  if (typeof window === 'undefined') return 'system';
  const v = localStorage.getItem(THEME_KEY);
  if (v === 'light' || v === 'dark' || v === 'system') return v;
  return 'system';
}

function getServerStoredThemeSnapshot(): Theme {
  return 'system';
}

/* ────────────────────────────────────────────────────────────────
   Provider
   ──────────────────────────────────────────────────────────────── */

export function ThemeProvider({children}: {children: React.ReactNode}) {
  // Read localStorage as an external store. No effect, no setState.
  const theme = useSyncExternalStore(
    subscribeToStoredTheme,
    getStoredThemeSnapshot,
    getServerStoredThemeSnapshot
  );

  // Read OS preference as an external store. Also no effect.
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    getServerSystemThemeSnapshot
  );

  // Derive the resolved theme during render — pure function of state above.
  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;

  // Apply the resolved theme to the DOM. This is an effect that only
  // touches external systems (documentElement), never React state.
  // No setState call → no lint error, no extra render.
  useApplyTheme(resolvedTheme);

  // setTheme updates the external store, which notifies subscribers,
  // which re-runs useSyncExternalStore, which re-renders this component.
  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(THEME_KEY, next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const value = useMemo(
    () => ({theme, resolvedTheme, setTheme}),
    [theme, resolvedTheme, setTheme]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/* ────────────────────────────────────────────────────────────────
   DOM sync — external system only, no React state
   ──────────────────────────────────────────────────────────────── */

import {useEffect} from 'react';

function useApplyTheme(resolved: ResolvedTheme) {
  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolved === 'dark');
    document.documentElement.style.colorScheme = resolved;
  }, [resolved]);
}
