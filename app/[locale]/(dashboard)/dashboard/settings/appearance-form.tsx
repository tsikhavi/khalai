'use client';

import {useCallback, useEffect, useSyncExternalStore} from 'react';

type Theme = 'light' | 'dark' | 'system';
const KEY = 'theme';
const THEME_EVENT = 'theme-change';

// ── External store ──────────────────────────────────────────

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) callback();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

const getServerSnapshot = (): Theme => 'system';

const getSnapshot = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  const saved = window.localStorage.getItem(KEY);
  return saved === 'light' || saved === 'dark' || saved === 'system'
    ? saved
    : 'system';
};

function applyToDom(next: Theme) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = next === 'dark' || (next === 'system' && prefersDark);
  root.classList.toggle('dark', isDark);
}

function setStoredTheme(next: Theme) {
  window.localStorage.setItem(KEY, next);
  applyToDom(next);
  window.dispatchEvent(new Event(THEME_EVENT));
}

// ── Component ────────────────────────────────────────────────

export default function AppearanceForm() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Sync the DOM to the saved theme once on mount.
  // This is an "update external system" effect — no setState, no lint error.
  useEffect(() => {
    applyToDom(getSnapshot());
  }, []);

  const apply = useCallback((next: Theme) => {
    setStoredTheme(next);
  }, []);

  const options: {key: Theme; label: string; description: string}[] = [
    {key: 'light', label: 'Light', description: 'Always light'},
    {key: 'dark', label: 'Dark', description: 'Always dark'},
    {key: 'system', label: 'System', description: 'Match your OS'},
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {options.map((opt) => {
        const active = theme === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => apply(opt.key)}
            className={`group rounded-xl border p-4 text-left transition-all ${
              active
                ? 'border-accent bg-accent/5 ring-1 ring-accent/30'
                : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700'
            }`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {opt.label}
              </span>
              {active && (
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-2.5 w-2.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3">
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {opt.description}
            </p>
            <div
              aria-hidden
              className={`mt-3 h-16 rounded-md border ${
                opt.key === 'dark'
                  ? 'border-neutral-700 bg-neutral-900'
                  : opt.key === 'light'
                    ? 'border-neutral-200 bg-neutral-50'
                    : 'border-neutral-200 bg-linear-to-r from-neutral-50 to-neutral-900 dark:from-neutral-50 dark:to-neutral-900'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
