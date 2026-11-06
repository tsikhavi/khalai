'use client';

import {useEffect, type RefObject} from 'react';

/**
 * Calls `handler` when the user clicks/touches outside `ref`.
 *
 * The ref is only read inside the effect's event listener — never during
 * render — so this is safe with React's strict ref rules.
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
