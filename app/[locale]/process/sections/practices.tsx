'use client';

import {motion} from 'framer-motion';

const NODES = [
  {x: 60, y: 150, label: 'Commit'},
  {x: 160, y: 150, label: 'Lint'},
  {x: 260, y: 150, label: 'Test'},
  {x: 360, y: 150, label: 'Preview'},
  {x: 200, y: 260, label: 'Deploy'},
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
];

export default function PracticesSection({
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
        transition={{duration: 0.6}}
        className="order-2 md:order-1">
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
        className="order-1 flex justify-center md:order-2">
        <svg
          viewBox="0 0 420 340"
          className="w-full max-w-md">
          {EDGES.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke="#059f00"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{pathLength: 0, opacity: 0}}
              whileInView={{pathLength: 1, opacity: 0.5}}
              viewport={{once: true}}
              transition={{delay: 0.4 + i * 0.15, duration: 0.6}}
            />
          ))}

          {NODES.map((n, i) => (
            <motion.g
              key={n.label}
              initial={{opacity: 0, scale: 0.4}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{transformOrigin: `${n.x}px ${n.y}px`}}>
              <circle
                cx={n.x}
                cy={n.y}
                r="26"
                fill="#059f0015"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r="5"
                fill="#059f00"
              />
              <text
                x={n.x}
                y={n.y + 44}
                textAnchor="middle"
                className="fill-current text-[11px] font-medium"
                opacity="0.8">
                {n.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
