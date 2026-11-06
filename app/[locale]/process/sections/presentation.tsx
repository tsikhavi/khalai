'use client';

import {motion} from 'framer-motion';

const LAYERS = [
  {title: 'Rhythm', body: 'Baseline, spacing, scale', y: 40, delay: 0},
  {title: 'Hierarchy', body: 'Title → body → meta', y: 110, delay: 0.15},
  {title: 'Texture', body: 'Paper, grain, contrast', y: 180, delay: 0.3},
];

export default function PresentationSection({
  data,
}: {
  data: {kicker: string; title: string; body: string};
}) {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
      <motion.div
        initial={{opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.4}}
        transition={{duration: 0.6}}>
        <p className="text-xs uppercase tracking-[0.3em] text-laurel-700 dark:text-laurel-300">
          {data.kicker}
        </p>
        <h2 className="mt-3 font-serif text-5xl leading-tight md:text-7xl">
          {data.title}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/70">
          {data.body}
        </p>
      </motion.div>

      <motion.div
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true, amount: 0.4}}
        transition={{duration: 0.8, delay: 0.2}}
        className="flex justify-center">
        <svg
          viewBox="0 0 400 300"
          className="w-full max-w-md">
          {LAYERS.map((layer, i) => (
            <motion.g
              key={layer.title}
              initial={{opacity: 0, x: -30}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{
                delay: layer.delay,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}>
              <rect
                x="40"
                y={layer.y}
                width="320"
                height="56"
                rx="8"
                fill="none"
                stroke="#059f00"
                strokeWidth="1.5"
              />
              <rect
                x="40"
                y={layer.y}
                width="320"
                height="56"
                rx="8"
                fill="#059f00"
                opacity={0.04 + i * 0.04}
              />
              <text
                x="60"
                y={layer.y + 26}
                className="fill-current text-sm font-semibold">
                {layer.title}
              </text>
              <text
                x="60"
                y={layer.y + 44}
                className="fill-current text-[11px]"
                opacity="0.6">
                {layer.body}
              </text>
            </motion.g>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
