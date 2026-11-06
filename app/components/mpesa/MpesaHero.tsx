'use client';

import Link from 'next/link';
import {motion} from 'motion/react';
import {Lens} from '@/components/studio/LensToggle';

export function MpesaHero({
  eyebrow,
  titleLens,
  subtitle,
  primaryLabel,
  secondaryLabel,
  locale,
}: {
  eyebrow: string;
  titleLens: string;
  subtitle: string;
  primaryLabel: string;
  secondaryLabel: string;
  locale: string;
}) {
  const parts = titleLens.split('|');

  return (
    <section className="relative isolate overflow-hidden px-6 pt-32 pb-24 md:pt-10 md:pb-32">
      {/* Accent glow behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 20%, color-mix(in srgb, varaccent 12%, transparent), transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
          className="mb-8 text-sm tracking-widest text-accent uppercase">
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{opacity: 0, y: 24}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1]}}
          className="text-2xl leading-[1.02] font-black tracking-tighter text-neutral-900 sm:text-6xl md:text-8xl dark:text-neutral-100">
          {parts.map((part, i) =>
            i === 1 ? (
              <Lens
                key={i}
                reveal={<span className="text-accent">{part}</span>}>
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

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1]}}
          className="mt-12 flex flex-wrap justify-center gap-3">
          <Link
            href={`/${locale}/start`}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] dark:bg-neutral-100 dark:text-neutral-900">
            {primaryLabel}
            <span aria-hidden>→</span>
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-7 py-3.5 text-sm font-medium text-neutral-700 transition-colors hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-neutral-300">
            {secondaryLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
