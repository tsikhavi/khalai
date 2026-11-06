'use client';

import {motion} from 'framer-motion';

export default function ProgressRing({value}: {value: number}) {
  const r = 54;
  const c = 2 * Math.PI * r;

  return (
    <div className="flex flex-col items-center rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <svg
        viewBox="0 0 140 140"
        className="h-32 w-32">
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          strokeWidth="10"
          className="stroke-neutral-200 dark:stroke-neutral-800"
        />
        <motion.circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          stroke="#c9613f"
          strokeDasharray={c}
          initial={{strokeDashoffset: c}}
          animate={{strokeDashoffset: c - (value / 100) * c}}
          transition={{duration: 1.2, ease: [0.22, 1, 0.36, 1]}}
          transform="rotate(-90 70 70)"
        />
        <text
          x="70"
          y="76"
          textAnchor="middle"
          className="fill-current text-lg font-semibold tabular-nums">
          {value}%
        </text>
      </svg>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
        Overall
      </p>
    </div>
  );
}
