'use client';

import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  // Simulated progress: quick to 70%, then decelerates
  useEffect(() => {
    const start = Date.now();
    const duration = 2400; // ms — expected max load time

    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      // Exponential deceleration — fast start, slows toward 90%
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const next = Math.min(eased * 90, 90); // cap at 90% until done
      setProgress(next);
    }, 16);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background text-foreground">
      {/* Ambient background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-laurel-500)/0.06,transparent_60%)]"
      />

      {/* Wordmark — draws in from left to right */}
      <div className="relative">
        <svg
          viewBox="0 0 420 120"
          className="w-[min(80vw,420px)] h-auto"
          fill="none">
          {/* KHALAI — letter paths drawn with stroke animation */}
          <g
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-laurel-700 dark:text-laurel-300">
            {/* K */}
            <motion.path
              d="M 20 20 L 20 100 M 20 60 L 55 20 M 20 60 L 55 100"
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{duration: 1.2, ease: [0.6, 0.05, 0.3, 1]}}
            />
            {/* H */}
            <motion.path
              d="M 75 20 L 75 100 M 75 60 L 110 60 M 110 20 L 110 100"
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{
                duration: 1.2,
                delay: 0.15,
                ease: [0.6, 0.05, 0.3, 1],
              }}
            />
            {/* A */}
            <motion.path
              d="M 130 100 L 148 20 L 166 100 M 137 72 L 159 72"
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.6, 0.05, 0.3, 1],
              }}
            />
            {/* L */}
            <motion.path
              d="M 186 20 L 186 100 L 218 100"
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{
                duration: 1.2,
                delay: 0.45,
                ease: [0.6, 0.05, 0.3, 1],
              }}
            />
            {/* A */}
            <motion.path
              d="M 240 100 L 258 20 L 276 100 M 247 72 L 269 72"
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{
                duration: 1.2,
                delay: 0.6,
                ease: [0.6, 0.05, 0.3, 1],
              }}
            />
            {/* I */}
            <motion.path
              d="M 296 20 L 296 100"
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{
                duration: 1.2,
                delay: 0.75,
                ease: [0.6, 0.05, 0.3, 1],
              }}
            />
          </g>

          {/* STUDIO — small caps below */}
          <motion.g
            initial={{opacity: 0, y: 4}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 1.0, ease: 'easeOut'}}>
            <text
              x="296"
              y="116"
              textAnchor="end"
              className="fill-foreground/40 font-sans text-[10px] uppercase tracking-[0.4em]">
              Studio
            </text>
          </motion.g>
        </svg>
      </div>

      {/* Progress bar */}
      <div className="mt-12 w-[min(80vw,420px)]">
        <div className="h-px w-full overflow-hidden rounded-full bg-foreground/10">
          <motion.div
            className="h-full bg-laurel-500"
            style={{width: `${progress}%`}}
            transition={{ease: 'linear'}}
          />
        </div>

        {/* Loading label + percentage */}
        <div className="mt-4 flex items-center justify-between">
          <motion.p
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.4, delay: 1.4}}
            className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">
            Loading
          </motion.p>
          <motion.p
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.4, delay: 1.4}}
            className="font-mono text-[10px] tabular-nums text-foreground/40">
            {Math.round(progress)}%
          </motion.p>
        </div>
      </div>

      {/* Bottom tagline */}
      <motion.p
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.6, delay: 1.6}}
        className="absolute bottom-8 text-[10px] uppercase tracking-[0.3em] text-foreground/30">
        Design &amp; code · Nairobi
      </motion.p>
    </div>
  );
}
