'use client';

import {motion} from 'motion/react';
import {Lens} from '../studio/LensToggle';

export function ContactHero({
  eyebrow,
  title,
  subtitle,
  locationLine,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  locationLine: string;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-24 pb-12 md:pt-32 md:pb-16">
      <motion.p
        initial={{opacity: 0, y: 12}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
        className="mb-6 text-sm tracking-widest text-neutral-500 uppercase">
        {eyebrow}
      </motion.p>

      <motion.h1
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1]}}
        className="max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-neutral-900 md:text-6xl dark:text-neutral-100">
        {title.includes('talk') ? (
          <>
            Let&apos;s{' '}
            <Lens reveal={<span className="text-accent">talk</span>}>talk</Lens>
            .
          </>
        ) : (
          title
        )}
      </motion.h1>

      <motion.p
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1]}}
        className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
        {subtitle}
      </motion.p>

      <motion.p
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.7, delay: 0.35}}
        className="mt-8 text-xs tracking-widest text-neutral-500 uppercase">
        {locationLine}
      </motion.p>
    </section>
  );
}
