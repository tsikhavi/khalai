'use client';

import {motion} from 'framer-motion';

export default function FrontendSection({
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
          {/* Wireframe guides */}
          <g
            stroke="#c9613f"
            strokeWidth="1"
            strokeDasharray="3 5"
            opacity="0.35">
            <line
              x1="40"
              y1="80"
              x2="360"
              y2="80"
            />
            <line
              x1="40"
              y1="140"
              x2="360"
              y2="140"
            />
            <line
              x1="40"
              y1="220"
              x2="360"
              y2="220"
            />
            <line
              x1="40"
              y1="280"
              x2="360"
              y2="280"
            />
          </g>

          {/* Boxes draw in from top-left */}
          {[
            {x: 40, y: 40, w: 320, h: 30, d: 0},
            {x: 40, y: 100, w: 200, h: 30, d: 0.15},
            {x: 40, y: 160, w: 320, h: 40, d: 0.3},
            {x: 40, y: 240, w: 140, h: 30, d: 0.45},
            {x: 200, y: 240, w: 160, h: 30, d: 0.6},
          ].map((b, i) => (
            <motion.rect
              key={i}
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              fill="none"
              stroke="#c9613f"
              strokeWidth="1.5"
              rx="4"
              initial={{pathLength: 0, opacity: 0}}
              whileInView={{pathLength: 1, opacity: 1}}
              viewport={{once: true}}
              transition={{duration: 1, delay: b.d, ease: [0.22, 1, 0.36, 1]}}
            />
          ))}

          {/* One filled to show color arriving */}
          <motion.rect
            x="40"
            y="300"
            width="320"
            height="60"
            rx="8"
            fill="#c9613f"
            opacity="0.15"
            initial={{scaleX: 0}}
            whileInView={{scaleX: 1}}
            viewport={{once: true}}
            transition={{duration: 0.8, delay: 0.9}}
            style={{transformOrigin: 'left center'}}
          />

          {/* Label */}
          <motion.text
            x="200"
            y="335"
            textAnchor="middle"
            className="fill-current text-xs uppercase tracking-[0.2em]"
            initial={{opacity: 0}}
            whileInView={{opacity: 0.6}}
            viewport={{once: true}}
            transition={{delay: 1.4}}>
            components · state · motion
          </motion.text>
        </svg>
      </motion.div>
    </div>
  );
}
