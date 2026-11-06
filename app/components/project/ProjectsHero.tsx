'use client';

import {motion} from 'motion/react';
import {Lens} from '../studio/LensToggle';

export function ProjectsHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative mx-auto max-w-5xl px-6 pt-24 pb-16 md:pt-32 md:pb-20">
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
        className="max-w-4xl text-5xl leading-[1.05] font-semibold tracking-tight text-neutral-900 md:text-7xl dark:text-neutral-100">
        <Lens
          reveal={
            <span className="text-(--accent)">{title.split(' ')[0]}</span>
          }>
          {title.split(' ')[0]}
        </Lens>{' '}
        {title.split(' ').slice(1).join(' ')}
      </motion.h1>

      <motion.p
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1]}}
        className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
        {subtitle}
      </motion.p>
    </section>
  );
}
