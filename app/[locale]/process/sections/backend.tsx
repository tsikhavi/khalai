'use client';

import {motion} from 'framer-motion';

const LAYERS = [
  {y: 80, label: 'HTTP'},
  {y: 140, label: 'Services'},
  {y: 200, label: 'Jobs'},
  {y: 260, label: 'Schema'},
  {y: 320, label: 'Storage'},
];

export default function BackendSection({
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
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          {data.kicker}
        </p>
        <h2 className="mt-3 font-serif text-5xl leading-tight md:text-7xl">
          {data.title}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed opacity-70">
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
          viewBox="0 0 400 400"
          className="w-full max-w-md">
          {LAYERS.map((l, i) => (
            <motion.g
              key={l.label}
              initial={{opacity: 0, x: -20}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{
                delay: i * 0.12,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}>
              {/* Layer plate */}
              <motion.rect
                x="60"
                y={l.y}
                width="280"
                height="40"
                rx="6"
                fill="#c9613f"
                initial={{opacity: 0.05}}
                whileInView={{opacity: 0.15 + i * 0.05}}
                viewport={{once: true}}
                transition={{delay: i * 0.12, duration: 0.6}}
              />
              <rect
                x="60"
                y={l.y}
                width="280"
                height="40"
                rx="6"
                fill="none"
                stroke="#c9613f"
                strokeWidth="1"
              />
              <text
                x="80"
                y={l.y + 25}
                className="fill-current text-xs font-mono tracking-wider"
                opacity="0.7">
                {l.label}
              </text>
            </motion.g>
          ))}

          {/* Animated vertical connector */}
          <motion.line
            x1="200"
            y1="60"
            x2="200"
            y2="360"
            stroke="#c9613f"
            strokeWidth="1"
            strokeDasharray="4 6"
            initial={{pathLength: 0, opacity: 0}}
            whileInView={{pathLength: 1, opacity: 0.4}}
            viewport={{once: true}}
            transition={{duration: 1.4, ease: [0.22, 1, 0.36, 1]}}
          />
        </svg>
      </motion.div>
    </div>
  );
}
