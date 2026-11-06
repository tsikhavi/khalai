export type CookieChoice = {
  /** ISO timestamp of when the choice was made */
  decidedAt: string;
  /** Version of the policy the user agreed to */
  version: string;
  /** Functional/essential cookies (always true) */
  essential: true;
  /** Analytics cookies (opt-in) */
  analytics: boolean;
  /** Marketing cookies (opt-in) */
  marketing: boolean;
};

const COOKIE_NAME = 'khalai-consent';
const POLICY_VERSION = '2026-10-15';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function readConsent(): CookieChoice | null {
  if (typeof document === 'undefined') return null;
  const raw = document.cookie
    .split('; ')
    .find((row) => row.startsWith(COOKIE_NAME + '='))
    ?.split('=')[1];
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as CookieChoice;
    // Invalidate if the policy version changed
    if (parsed.version !== POLICY_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(
  choice: Omit<CookieChoice, 'decidedAt' | 'version' | 'essential'>
) {
  if (typeof document === 'undefined') return;
  const payload: CookieChoice = {
    decidedAt: new Date().toISOString(),
    version: POLICY_VERSION,
    essential: true,
    ...choice,
  };
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(payload))}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
}

export function clearConsent() {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
}

/** Cookie name that next-intl's middleware reads to pick the active locale. */
const LOCALE_COOKIE = 'NEXT_LOCALE';

/**
 * Persist the user's chosen locale so next-intl's middleware honours it
 * on subsequent visits (before the URL prefix is parsed).
 */
export function persistLocale(next: string): void {
  if (typeof document === 'undefined') return;
  // `document.cookie` is a property setter, not a mutation of `document`.
  // react-hooks/immutability does not model setters and flags it as a write
  // to a value defined outside the component; that diagnostic is a false
  // positive for cookie assignment.

  document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
}

export const CONSENT_POLICY_VERSION = POLICY_VERSION;
