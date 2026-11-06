'use client';

import {useCallback, useSyncExternalStore} from 'react';
import {
  CookieChoice,
  readConsent,
  writeConsent,
  clearConsent,
} from '@/lib/cookies';

const CHANGE_EVENT = 'cookie-consent-change';

/* ────────────────────────────────────────────────────────────────
   Snapshot cache
   ────────────────────────────────────────────────────────────────
   `useSyncExternalStore` compares snapshots by reference (Object.is).
   If `getSnapshot` returns a fresh object on every call, React treats
   it as "the store changed every render" → infinite loop.

   We key the cache by the raw cookie string. Same cookie → same
   object reference. Only when the string actually changes do we
   parse and create a new object.
*/
let _rawCache = '';
let _snapshotCache: CookieChoice | null = null;
let _snapshotInitialized = false;

function getRawCookieString(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/(?:^|;\s*)khalai-consent=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : '';
}

function getSnapshot(): CookieChoice | null {
  const raw = getRawCookieString();

  // Same underlying cookie → return the cached object reference.
  if (_snapshotInitialized && raw === _rawCache) {
    return _snapshotCache;
  }

  _rawCache = raw;
  _snapshotCache = raw ? readConsent() : null;
  _snapshotInitialized = true;
  return _snapshotCache;
}

function getServerSnapshot(): CookieChoice | null {
  return null;
}

/* ────────────────────────────────────────────────────────────────
   Subscription + notify
   ──────────────────────────────────────────────────────────────── */

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

function notifyChange() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/* ────────────────────────────────────────────────────────────────
   Hook
   ──────────────────────────────────────────────────────────────── */

export function useCookieConsent() {
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const ready = true;

  const acceptAll = useCallback(() => {
    writeConsent({analytics: true, marketing: true});
    notifyChange();
  }, []);

  const acceptEssential = useCallback(() => {
    writeConsent({analytics: false, marketing: false});
    notifyChange();
  }, []);

  const savePreferences = useCallback(
    (prefs: {analytics: boolean; marketing: boolean}) => {
      writeConsent(prefs);
      notifyChange();
    },
    []
  );

  const reset = useCallback(() => {
    clearConsent();
    notifyChange();
  }, []);

  return {
    ready,
    consent,
    needsDecision: consent === null,
    acceptAll,
    acceptEssential,
    savePreferences,
    reset,
  };
}
