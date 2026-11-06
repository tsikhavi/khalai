'use client';

import {motion, useInView} from 'motion/react';
import {useRef} from 'react';
import {RevealSection, RevealChild} from '@/components/studio/RevealSection';

const CODE_LINES = [
  '<Card>',
  '  <Card.Header>',
  '    <Eyebrow>Capabilities</Eyebrow>',
  '    <Heading>Everything from design to deployment.</Heading>',
  '  </Card.Header>',
  '  <Card.Body>',
  '    <Grid cols={12} gap={6}>',
  '      {capabilities.map((cap) => (',
  '        <Tile key={cap.key} {...cap} />',
  '      ))}',
  '    </Grid>',
  '  </Card.Body>',
  '</Card>',
];

export function MethodCode({
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
          className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950 dark:border-neutral-800">
          <div className="flex items-center gap-1.5 border-b border-neutral-800 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
            <span className="ms-3 text-xs text-neutral-500">
              components/Capabilities.tsx
            </span>
          </div>

          <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed">
            <code>
              {CODE_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{opacity: 0, x: -12}}
                  animate={{opacity: inView ? 1 : 0, x: inView ? 0 : -12}}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-neutral-300">
                  <span className="me-4 select-none text-neutral-600 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {line}
                </motion.div>
              ))}
            </code>
          </pre>
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
