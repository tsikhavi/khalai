'use client';

import {motion, MotionValue, useTransform} from 'motion/react';

export function ChapterMark({
  progress,
  labels,
}: {
  progress: MotionValue<number>;
  labels: readonly string[];
}) {
  // Each label is visible during its slice, fading at the boundaries.
  const p1 = useTransform(progress, [0.0, 0.13, 0.15, 0.17], [1, 1, 0.5, 0], {
    clamp: true,
  });
  const p2 = useTransform(progress, [0.15, 0.17, 0.3, 0.32], [0, 1, 1, 0], {
    clamp: true,
  });
  const p3 = useTransform(progress, [0.32, 0.34, 0.47, 0.49], [0, 1, 1, 0], {
    clamp: true,
  });
  const p4 = useTransform(progress, [0.49, 0.51, 0.64, 0.66], [0, 1, 1, 0], {
    clamp: true,
  });
  const p5 = useTransform(progress, [0.66, 0.68, 0.81, 0.83], [0, 1, 1, 0], {
    clamp: true,
  });
  const p6 = useTransform(progress, [0.83, 0.85, 1.0, 1.0], [0, 1, 1, 1], {
    clamp: true,
  });

  const opacities = [p1, p2, p3, p4, p5, p6];

  return (
    <div className="pointer-events-none fixed top-6 left-1/2 z-40 hidden -translate-x-1/2 md:top-20 md:block">
      <div className="relative h-6 w-48 text-center">
        {labels.map((label, i) => (
          <motion.span
            key={label}
            style={{opacity: opacities[i]}}
            className="absolute inset-0 text-[10px] font-semibold tracking-[0.35em] text-neutral-500 uppercase">
            {String(i + 1).padStart(2, '0')} · {label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
