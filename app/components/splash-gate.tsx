'use client';

import { useEffect, useState } from 'react';
import Loading from '@/[locale]/loading';

/**
 * Reusable splash overlay. Renders the branded loading screen in a
 * full-viewport portal-like wrapper.
 *
 * Used in two places:
 *   1. `<SplashGate>` — first-visit session splash
 *   2. Navbar — plays while the locale is switching
 */
export function SplashOverlay() {
  return (
    <div className="fixed inset-0 z-100">
      <Loading />
    </div>
  );
}

export function SplashGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('khalai-splash-seen');

    if (seen) {
      const t = setTimeout(() => setReady(true), 0);
      return () => clearTimeout(t);
    }

    sessionStorage.setItem('khalai-splash-seen', '1');

    const t = setTimeout(() => setReady(true), 2400);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return <SplashOverlay />;
  return <>{children}</>;
}