'use client';

import {motion} from 'framer-motion';
import type {Phase} from '@/lib/reports';

const COLORS = {
  done: '#c9613f',
  'in-progress': '#e8a58f',
  pending: '#e5e5e5',
};

export default function PhaseBar({phases}: {phases: Phase[]}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-500">
        Phases
      </p>
      <div className="flex gap-1 overflow-hidden rounded-full">
        {phases.map((p, i) => (
          <motion.div
            key={p.name}
            className="h-2 flex-1"
            initial={{scaleX: 0}}
            animate={{scaleX: 1}}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              backgroundColor: COLORS[p.status],
              transformOrigin: 'left',
              opacity: p.status === 'pending' ? 0.4 : 1,
            }}
          />
        ))}
      </div>
      <ul className="mt-4 space-y-1.5 text-xs">
        {phases.map((p) => (
          <li
            key={p.name}
            className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{backgroundColor: COLORS[p.status]}}
              />
              {p.name}
            </span>
            <span className="capitalize text-neutral-500">
              {p.status.replace('-', ' ')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
