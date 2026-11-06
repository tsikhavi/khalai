'use client';

import {motion, useInView} from 'motion/react';
import {useRef} from 'react';
import {RevealSection, RevealChild} from '@/components/studio/RevealSection';

export function MethodColour({
  eyebrow,
  title,
  body,
  caption,
  paperLabel,
  inkLabel,
  accentLabel,
}: {
  eyebrow: string;
  title: string;
  body: string;
  caption: string;
  paperLabel: string;
  inkLabel: string;
  accentLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: false, amount: 0.4});

  const swatches = [
    {
      key: 'paper',
      label: paperLabel,
      bg: 'bg-(--paper)',
      fg: 'text-neutral-900',
      delay: 0,
    },
    {
      key: 'ink',
      label: inkLabel,
      bg: 'bg-neutral-900',
      fg: 'text-white',
      delay: 0.15,
    },
    {
      key: 'accent',
      label: accentLabel,
      bg: 'bg-(--accent)',
      fg: 'text-white',
      delay: 0.3,
    },
  ];

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

        <div
          ref={ref}
          className="grid grid-cols-3 gap-6">
          {swatches.map((s) => (
            <motion.div
              key={s.key}
              initial={{opacity: 0, scale: 0.9}}
              animate={{opacity: inView ? 1 : 0, scale: inView ? 1 : 0.9}}
              transition={{
                duration: 0.6,
                delay: s.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`aspect-square rounded-2xl ${s.bg} ${s.fg} flex items-end p-6 shadow-inner`}>
              <div>
                <div className="text-xs tracking-widest uppercase opacity-70">
                  {s.label}
                </div>
                <motion.div
                  animate={
                    s.key === 'accent' && inView ? {scale: [1, 1.15, 1]} : {}
                  }
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="mt-2 h-2 w-2 rounded-full bg-current"
                />
              </div>
            </motion.div>
          ))}
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
