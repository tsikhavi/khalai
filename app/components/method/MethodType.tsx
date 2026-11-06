'use client';

import {motion, useInView} from 'motion/react';
import {useRef} from 'react';
import {RevealSection, RevealChild} from '@/components/studio/RevealSection';

const SCALE = [
  {
    size: 'text-6xl md:text-7xl',
    label: 'Display',
    weight: 'font-black',
    text: 'Khalai',
  },
  {
    size: 'text-4xl md:text-5xl',
    label: 'Headline',
    weight: 'font-bold',
    text: 'Design and code.',
  },
  {
    size: 'text-2xl md:text-3xl',
    label: 'Subhead',
    weight: 'font-semibold',
    text: 'One person, both sides.',
  },
  {
    size: 'text-lg md:text-xl',
    label: 'Body lead',
    weight: 'font-normal',
    text: 'Written by hand, read by people.',
  },
  {
    size: 'text-sm',
    label: 'Body',
    weight: 'font-normal',
    text: 'The smaller paragraphs that carry the argument.',
  },
  {
    size: 'text-xs tracking-widest uppercase',
    label: 'Label',
    weight: 'font-medium',
    text: 'Nairobi · Kenya',
  },
];

export function MethodType({
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
      className="px-6 py-24">
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
          className="space-y-10 border-t border-neutral-200 pt-10 dark:border-neutral-800">
          {SCALE.map((row, i) => (
            <div
              key={row.label}
              className="grid grid-cols-[6rem_1fr] items-baseline gap-6 md:gap-12">
              <span className="text-xs tracking-widest text-neutral-500 uppercase">
                {row.label}
              </span>
              <motion.p
                initial={{opacity: 0, x: -20}}
                animate={{opacity: inView ? 1 : 0, x: inView ? 0 : -20}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`${row.size} ${row.weight} leading-tight tracking-tight text-neutral-900 dark:text-neutral-100`}>
                {row.text}
              </motion.p>
            </div>
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
