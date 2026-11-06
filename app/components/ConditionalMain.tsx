'use client';

import {usePathname} from 'next/navigation';
import {Footer} from './footer';

// Routes that take over the full viewport (no navbar offset, no footer)
const FULLSCREEN_SECTIONS = ['dashboard', 'horizontal'];

export function ConditionalMain({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const section = segments[1];

  const isFullscreen = FULLSCREEN_SECTIONS.includes(section);
  const needsPadding = !isFullscreen;

  return (
    <main className={`flex-1 ${needsPadding ? 'pt-20' : 'overflow-hidden'}`}>
      {children}
      {!isFullscreen && <Footer />}
    </main>
  );
}
