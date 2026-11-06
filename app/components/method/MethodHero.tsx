'use client';

import {motion} from 'motion/react';
import {Lens} from '@/components/studio/LensToggle';

export function MethodHero({
  eyebrow,
  titleLens,
  subtitle,
  scrollHint,
}: {
  eyebrow: string;
  titleLens: string;
  subtitle: string;
  scrollHint: string;
}) {
  const parts = titleLens.split('|');

  // Vertical construction lines that draw themselves in
  return (
    <section className="relative isolate overflow-hidden px-6 pt-32 pb-24 md:pt-44 md:pb-32">
      {/* Geometric backdrop — thin vertical lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10">
        <div className="mx-auto h-full max-w-6xl">
          <svg
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
            className="h-full w-full">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
              const x = (i + 1) * (1200 / 13);
              return (
                <motion.line
                  key={i}
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={800}
                  stroke="currentColor"
                  strokeWidth={0.5}
                  opacity={0.08}
                  initial={{pathLength: 0}}
                  animate={{pathLength: 1}}
                  transition={{
                    duration: 1.2,
                    delay: 0.1 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              );
            })}
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
          className="mb-8 text-sm tracking-widest text-(--accent) uppercase">
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{opacity: 0, y: 24}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1]}}
          className="text-5xl leading-[1.02] font-black tracking-tighter text-neutral-900 sm:text-6xl md:text-8xl dark:text-neutral-100">
          {parts.map((part, i) =>
            i === 1 ? (
              <Lens
                key={i}
                reveal={<span className="text-(--accent)">{part}</span>}>
                {part}
              </Lens>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </motion.h1>

        <motion.p
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1]}}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl dark:text-neutral-400">
          {subtitle}
        </motion.p>

        <motion.p
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.7, delay: 0.6}}
          className="mt-16 text-xs tracking-widest text-neutral-500 uppercase">
          {scrollHint}
        </motion.p>
      </div>
    </section>
  );
}
