'use client';

import {motion} from 'motion/react';

export function AuthShell({children}: {children: React.ReactNode}) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center px-6 py-0">
      {/* Soft accent glow behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            'radial-gradient(60% 40% at 50% 0%, var(--accent) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{opacity: 0, y: 24}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
        className="flex w-full flex-col items-center">
        {children}
      </motion.div>
    </div>
  );
}
