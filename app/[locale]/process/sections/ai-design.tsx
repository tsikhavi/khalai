'use client';

import {motion} from 'framer-motion';

const STAGES = [
  {label: 'Sketch', cx: 70, cy: 150, shape: 'rough'},
  {label: 'Vector', cx: 200, cy: 150, shape: 'clean'},
  {label: 'Product', cx: 330, cy: 150, shape: 'screen'},
];

export default function AiDesignSection({
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
          viewBox="0 0 400 300"
          className="w-full max-w-md">
          {STAGES.map((s, i) => (
            <motion.g
              key={s.label}
              initial={{opacity: 0, scale: 0.6}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{
                delay: i * 0.25,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{transformOrigin: `${s.cx}px ${s.cy}px`}}>
              {s.shape === 'rough' && (
                <path
                  d={`M ${s.cx - 30} ${s.cy - 20} L ${s.cx + 30} ${s.cy - 25} L ${s.cx + 28} ${s.cy + 22} L ${s.cx - 32} ${s.cy + 20} Z`}
                  fill="none"
                  stroke="#059f00"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              )}
              {s.shape === 'clean' && (
                <rect
                  x={s.cx - 30}
                  y={s.cy - 22}
                  width="60"
                  height="44"
                  rx="4"
                  fill="none"
                  stroke="#0ad300"
                  strokeWidth="2"
                />
              )}
              {s.shape === 'screen' && (
                <g>
                  <rect
                    x={s.cx - 34}
                    y={s.cy - 24}
                    width="68"
                    height="48"
                    rx="6"
                    fill="#11ff0010"
                    stroke="#11ff00"
                    strokeWidth="2"
                  />
                  <rect
                    x={s.cx - 26}
                    y={s.cy - 14}
                    width="24"
                    height="4"
                    rx="2"
                    fill="#11ff00"
                    opacity="0.6"
                  />
                  <rect
                    x={s.cx - 26}
                    y={s.cy - 4}
                    width="40"
                    height="4"
                    rx="2"
                    fill="#11ff00"
                    opacity="0.3"
                  />
                </g>
              )}
              <text
                x={s.cx}
                y={s.cy + 50}
                textAnchor="middle"
                className="fill-current text-[11px] font-medium"
                opacity="0.7">
                {s.label}
              </text>
            </motion.g>
          ))}

          {/* Connecting arrows */}
          {[0, 1].map((i) => (
            <motion.line
              key={i}
              x1={STAGES[i].cx + 40}
              y1={STAGES[i].cy}
              x2={STAGES[i + 1].cx - 40}
              y2={STAGES[i + 1].cy}
              stroke="#059f00"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.4"
              initial={{pathLength: 0}}
              whileInView={{pathLength: 1}}
              viewport={{once: true}}
              transition={{delay: 0.5 + i * 0.25, duration: 0.5}}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
