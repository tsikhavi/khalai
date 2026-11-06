'use client';

import {useEffect, useRef, useState} from 'react';

/**
 * Given the index of the active section and this panel's own index,
 * returns a state that transitions: idle -> entering -> active -> exiting -> idle.
 */
export function usePanelAnimation(activeIndex: number, myIndex: number) {
  const [state, setState] = useState<
    'entering' | 'active' | 'exiting' | 'idle'
  >('idle');
  const prevActive = useRef<number>(activeIndex);

  useEffect(() => {
    const wasMine = prevActive.current === myIndex;
    const isMine = activeIndex === myIndex;

    if (isMine && !wasMine) {
      setState('entering');
      const t = setTimeout(() => setState('active'), 900);
      prevActive.current = activeIndex;
      return () => clearTimeout(t);
    }

    if (!isMine && wasMine) {
      setState('exiting');
      const t = setTimeout(() => setState('idle'), 700);
      prevActive.current = activeIndex;
      return () => clearTimeout(t);
    }

    prevActive.current = activeIndex;
  }, [activeIndex, myIndex]);

  return state;
}

/** Convenience: returns className string based on state. */
export function animClass(state: string, map: Record<string, string>) {
  return map[state] ?? '';
}
