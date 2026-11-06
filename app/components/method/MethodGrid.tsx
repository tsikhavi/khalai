'use client';

import {motion, useInView} from 'motion/react';
import {useRef} from 'react';
import {RevealSection, RevealChild} from '@/components/studio/RevealSection';

export function MethodGrid({
  eyebrow,
  title,
  body,
  caption,
}: {
  eyebrow: string;
  title: string;
  body: string;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: false, amount: 0.3});

  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.1}
      className="border-y border-neutral-200 bg-(--paper)/40 px-6 py-24 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <RevealChild>
            <p className="text-sm tracking-widest text-neutral-500 uppercase">
              {eyebrow}
            </p>
          </RevealChild>
          <RevealChild
            as="h2"
            className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
            {title}
          </RevealChild>
          <RevealChild
            as="p"
            className="mt-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {body}
          </RevealChild>
        </div>

        {/* Live grid */}
        <div
          ref={ref}
          className="relative">
          {/* The 12-column scaffold */}
          <div className="grid grid-cols-12 gap-4">
            {Array.from({length: 12}).map((_, i) => (
              <motion.div
                key={i}
                initial={{scaleY: 0}}
                animate={{scaleY: inView ? 1 : 0}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-64 origin-top rounded-sm bg-(--accent)/8"
              />
            ))}
          </div>

          {/* Sample content aligned to the grid */}
          <div className="pointer-events-none absolute inset-0 grid grid-cols-12 gap-4">
            {/* Hero block spans 7 columns */}
            <motion.div
              initial={{opacity: 0, y: 12}}
              animate={{opacity: inView ? 1 : 0, y: inView ? 0 : 12}}
              transition={{duration: 0.6, delay: 0.6}}
              className="col-span-7 self-start rounded-md border border-(--accent)/40 bg-white/80 p-4 text-xs font-medium text-neutral-700 backdrop-blur-sm dark:bg-neutral-900/80 dark:text-neutral-300">
              Hero · cols 1–7
            </motion.div>

            {/* Sidebar spans 4 columns, offset 1 from the end */}
            <motion.div
              initial={{opacity: 0, y: 12}}
              animate={{opacity: inView ? 1 : 0, y: inView ? 0 : 12}}
              transition={{duration: 0.6, delay: 0.7}}
              className="col-span-4 col-start-9 self-start rounded-md border border-(--accent)/40 bg-white/80 p-4 text-xs font-medium text-neutral-700 backdrop-blur-sm dark:bg-neutral-900/80 dark:text-neutral-300">
              Sidebar · cols 9–12
            </motion.div>

            {/* Content row spans 10 columns, centered */}
            <motion.div
              initial={{opacity: 0, y: 12}}
              animate={{opacity: inView ? 1 : 0, y: inView ? 0 : 12}}
              transition={{duration: 0.6, delay: 0.9}}
              className="col-span-10 col-start-2 self-end rounded-md border border-(--accent)/40 bg-white/80 p-4 text-xs font-medium text-neutral-700 backdrop-blur-sm dark:bg-neutral-900/80 dark:text-neutral-300">
              Content · cols 2–11
            </motion.div>
          </div>
        </div>

        <RevealChild
          as="p"
          className="mx-auto mt-10 max-w-xl text-center text-sm text-neutral-500">
          {caption}
        </RevealChild>
      </div>
    </RevealSection>
  );
}
