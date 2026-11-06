'use client';

import {motion, useInView} from 'motion/react';
import {useRef} from 'react';

type Card = {
  key: string;
  title: string;
  body: string;
};

type Corner = 'right' | 'top-right' | 'left' | 'top-left';

// One entry per card — maps index to a corner
const CORNERS: Corner[] = ['right', 'top-right', 'left', 'top-left'];

// Starting transform for each corner.
// The card starts offset (and slightly rotated) and lands at 0,0,0.
const START_OFFSETS: Record<Corner, {x: number; y: number; rotate: number}> = {
  right: {x: 140, y: 0, rotate: 3},
  'top-right': {x: 100, y: -100, rotate: 2},
  left: {x: -140, y: 0, rotate: -3},
  'top-left': {x: -100, y: -100, rotate: -2},
};

export function MethodCards({
  eyebrow,
  title,
  cards,
}: {
  eyebrow: string;
  title: string;
  cards: Card[];
}) {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p
            initial={{opacity: 0, y: 12}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: false, amount: 0.5}}
            transition={{duration: 0.5, ease: [0.22, 1, 0.36, 1]}}
            className="text-sm tracking-widest text-neutral-500 uppercase">
            {eyebrow}
          </motion.p>
          <motion.h2
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: false, amount: 0.5}}
            transition={{duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1]}}
            className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
            {title}
          </motion.h2>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <AnimatedCard
              key={card.key}
              card={card}
              corner={CORNERS[i % 4]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCard({card, corner}: {card: Card; corner: Corner}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: false, amount: 0.3});

  const offset = START_OFFSETS[corner];

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        rotate: offset.rotate,
      }}
      animate={
        inView
          ? {opacity: 1, x: 0, y: 0, rotate: 0}
          : {opacity: 0, x: offset.x, y: offset.y, rotate: offset.rotate}
      }
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{y: -4}}
      className="h-full">
      <article className="group relative flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-accent dark:border-neutral-800 dark:bg-neutral-900">
        {/* Corner indicator */}
        <span
          aria-hidden
          className="absolute inset-e-4 top-4 h-2 w-2 rounded-full bg-accent/30 transition-colors group-hover:bg-accent"
        />

        <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {card.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {card.body}
        </p>

        {/* Baseline accent line that grows on hover */}
        <span
          aria-hidden
          className="mt-6 h-px w-8 bg-accent transition-all duration-300 group-hover:w-16"
        />
      </article>
    </motion.div>
  );
}
