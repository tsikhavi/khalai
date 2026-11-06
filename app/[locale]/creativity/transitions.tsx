'use client';

import {motion, MotionValue, useTransform} from 'motion/react';

const COLORS = ['#c8531c', '#1a4f5c', '#8a6a3b', '#7c3aed'] as const;

export function TransitionOverlay({progress}: {progress: MotionValue<number>}) {
  /* ─── Boundary 1→2 : horizontal sweep ─── */
  const sweep1 = useTransform(progress, [0.235, 0.265], [0, 1], {clamp: true});
  const opacity1 = useTransform(
    progress,
    [0.23, 0.245, 0.255, 0.27],
    [0, 1, 1, 0],
    {clamp: true}
  );

  /* ─── Boundary 2→3 : vertical sweep ─── */
  const sweep2 = useTransform(progress, [0.485, 0.515], [0, 1], {clamp: true});
  const opacity2 = useTransform(
    progress,
    [0.48, 0.495, 0.505, 0.52],
    [0, 1, 1, 0],
    {clamp: true}
  );

  /* ─── Boundary 3→4 : diagonal sweep ─── */
  const sweep3 = useTransform(progress, [0.735, 0.765], [0, 1], {clamp: true});
  const opacity3 = useTransform(
    progress,
    [0.73, 0.745, 0.755, 0.77],
    [0, 1, 1, 0],
    {clamp: true}
  );

  /* Diagonal transform pulled out of JSX */
  const diagonalTranslate = useTransform(
    sweep3,
    [0, 1],
    ['translate(-40%, 40%)', 'translate(40%, -40%)']
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {/* Boundary 1→2 — horizontal line across the middle */}
      <motion.div
        style={{opacity: opacity1, scaleX: sweep1}}
        className="absolute top-1/2 left-0 h-px w-full origin-left">
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${COLORS[0]}, ${COLORS[1]}, transparent)`,
            boxShadow: `0 0 14px ${COLORS[0]}80`,
          }}
        />
      </motion.div>

      {/* Boundary 2→3 — vertical line down the center */}
      <motion.div
        style={{opacity: opacity2, scaleY: sweep2}}
        className="absolute top-0 left-1/2 h-full w-px origin-top">
        <div
          className="h-full w-px"
          style={{
            background: `linear-gradient(180deg, transparent, ${COLORS[1]}, ${COLORS[2]}, transparent)`,
            boxShadow: `0 0 14px ${COLORS[1]}80`,
          }}
        />
      </motion.div>

      {/* Boundary 3→4 — diagonal sweep */}
      <motion.div
        style={{opacity: opacity3}}
        className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{scaleX: sweep3, x: diagonalTranslate}}
          className="h-px w-[160%] origin-left -rotate-45">
          <div
            className="h-px w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS[2]}, ${COLORS[3]}, transparent)`,
              boxShadow: `0 0 14px ${COLORS[3]}80`,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
