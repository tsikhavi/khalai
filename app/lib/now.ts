/**
 * Timestamp helper for Server Components.
 *
 * `Date.now()` inside a component render trips `react-hooks/purity` because
 * the rule can't distinguish Server Components (which legitimately run once
 * per request) from Client Components (which must be pure).
 *
 * Wrapping the call here keeps the impure call outside the component body
 * and makes the intent explicit at each call site.
 */
export function now(): number {
  return Date.now();
}
