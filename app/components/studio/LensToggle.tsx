'use client';

import {createContext, useContext, useEffect, useState, ReactNode} from 'react';

/* ==================================================================
   Context
   ================================================================== */

type LensContextValue = {
  /** True when the reveal layer is active */
  active: boolean;
  /** Flip the reveal layer on/off */
  toggle: () => void;
  /** Force a specific state (used by keyboard shortcut + button) */
  setActive: (next: boolean) => void;
};

/**
 * Null default so a missing <LensProvider> throws with a helpful message
 * instead of silently no-op'ing. If you see the error in the browser,
 * wrap your layout with <LensProvider>.
 */
const LensContext = createContext<LensContextValue | null>(null);

export function useLens(): LensContextValue {
  const ctx = useContext(LensContext);
  if (!ctx) {
    throw new Error(
      'useLens() must be used inside <LensProvider>. ' +
        'Wrap your layout with <LensProvider> — see app/[locale]/layout.tsx.'
    );
  }
  return ctx;
}

/* ==================================================================
   Provider
   ================================================================== */

export function LensProvider({children}: {children: ReactNode}) {
  const [active, setActive] = useState(false);
  //const providerId = useId();

  // Spacebar toggles — ignored while the user is typing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isTypingTarget(e.target)) {
        e.preventDefault();
        setActive((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <LensContext.Provider
      value={{
        active,
        toggle: () => setActive((v) => !v),
        setActive,
      }}>
      {children}
    </LensContext.Provider>
  );
}

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  return (
    el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable
  );
}

/* ==================================================================
   <Lens> — reveal a hidden message when active
   ================================================================== */

export function Lens({
  children,
  reveal,
  className,
}: {
  children: ReactNode;
  /** The content shown when the lens is on */
  reveal: ReactNode;
  /** Optional wrapper classes */
  className?: string;
}) {
  const {active} = useLens();

  return (
    <span
      className={
        'relative inline-block transition-colors ' + (className ?? '')
      }>
      {/* Base layer — visible when lens is off */}
      <span
        aria-hidden={active}
        className={`transition-opacity duration-200 ${
          active ? 'opacity-0' : 'opacity-100'
        }`}>
        {children}
      </span>

      {/* Reveal layer — absolute, sits on top when active */}
      <span
        aria-hidden={!active}
        className={`absolute inset-0 transition-opacity duration-200 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}>
        {reveal}
      </span>
    </span>
  );
}

/* ==================================================================
   <LensHint> — floating toggle button
   ================================================================== */

export function LensHint({
  hintIdle = 'Hold space',
  hintActive = 'Lens on',
}: {
  hintIdle?: string;
  hintActive?: string;
}) {
  const {active, toggle} = useLens();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      aria-label={active ? 'Disable lens' : 'Enable lens'}
      className="fixed right-4 bottom-4 z-40 rounded-full border border-neutral-300 bg-white/90 px-3 py-1.5 text-xs text-neutral-700 shadow-lg backdrop-blur transition-colors hover:bg-white dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-200">
      <span
        className={`mr-1.5 inline-block h-2 w-2 rounded-full transition-colors ${
          active ? 'bg-accent' : 'bg-neutral-400 dark:bg-neutral-600'
        }`}
      />
      {active ? hintActive : hintIdle}
    </button>
  );
}
