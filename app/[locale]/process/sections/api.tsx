'use client';

import {motion} from 'framer-motion';

const NODES = [
  {cx: 100, cy: 120, label: 'GET /projects', d: 0},
  {cx: 300, cy: 120, label: 'POST /messages', d: 0.15},
  {cx: 200, cy: 240, label: 'PATCH /reports', d: 0.3},
  {cx: 100, cy: 320, label: 'GET /me', d: 0.45},
  {cx: 300, cy: 320, label: 'POST /payments', d: 0.6},
];

export default function ApiSection({
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
        className="order-1 flex justify-center md:order-2">
        <svg
          viewBox="0 0 400 400"
          className="w-full max-w-md">
          {/* Connections */}
          {NODES.map((n, i) =>
            NODES.slice(i + 1).map((m, j) => (
              <motion.line
                key={`${i}-${j}`}
                x1={n.cx}
                y1={n.cy}
                x2={m.cx}
                y2={m.cy}
                stroke="#c9613f"
                strokeWidth="1"
                opacity="0.2"
                initial={{pathLength: 0}}
                whileInView={{pathLength: 1}}
                viewport={{once: true}}
                transition={{duration: 0.9, delay: 0.4 + (i + j) * 0.05}}
              />
            ))
          )}

          {/* Endpoint nodes */}
          {NODES.map((n) => (
            <motion.g
              key={n.label}
              initial={{opacity: 0, scale: 0.6}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{delay: n.d, duration: 0.5, ease: [0.22, 1, 0.36, 1]}}
              style={{transformOrigin: `${n.cx}px ${n.cy}px`}}>
              <circle
                cx={n.cx}
                cy={n.cy}
                r="10"
                fill="#c9613f"
                opacity="0.15"
              />
              <circle
                cx={n.cx}
                cy={n.cy}
                r="4"
                fill="#c9613f"
              />
              <text
                x={n.cx}
                y={n.cy - 16}
                textAnchor="middle"
                className="fill-current text-[9px] font-mono tracking-wider"
                opacity="0.7">
                {n.label}
              </text>
            </motion.g>
          ))}

          {/* Pulse */}
          <motion.circle
            cx="200"
            cy="240"
            r="14"
            fill="none"
            stroke="#c9613f"
            strokeWidth="1"
            animate={{r: [14, 30], opacity: [0.6, 0]}}
            transition={{duration: 1.8, repeat: Infinity}}
          />
        </svg>
      </motion.div>
    </div>
  );
}
