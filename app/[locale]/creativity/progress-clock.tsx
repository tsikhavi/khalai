'use client';

import {motion, MotionValue, useTransform} from 'motion/react';

const SECTOR_COLORS = [
  '#c4ffbb', // 1
  '#4aff37', // 2
  '#11ff00', // 3
  '#059f00', // 4
  '#006600', // 5 (warm, in the orange family)
  '#141a13', // 6 (cool, sits well on light bg)
] as const;

export function ProgressClock({
  progress,
  size = 140,
}: {
  progress: MotionValue<number>;
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const stroke = Math.max(2, size * 0.05);

  // Six sectors, each 60° = 1/6 of progress
  const sectors = [
    useTransform(progress, [0 / 6, 1 / 6], [0, 1], {clamp: true}),
    useTransform(progress, [1 / 6, 2 / 6], [0, 1], {clamp: true}),
    useTransform(progress, [2 / 6, 3 / 6], [0, 1], {clamp: true}),
    useTransform(progress, [3 / 6, 4 / 6], [0, 1], {clamp: true}),
    useTransform(progress, [4 / 6, 5 / 6], [0, 1], {clamp: true}),
    useTransform(progress, [5 / 6, 6 / 6], [0, 1], {clamp: true}),
  ];
  const dashArrays = [
    useTransform(sectors[0], (v) => `${v} 1`),
    useTransform(sectors[1], (v) => `${v} 1`),
    useTransform(sectors[2], (v) => `${v} 1`),
    useTransform(sectors[3], (v) => `${v} 1`),
    useTransform(sectors[4], (v) => `${v} 1`),
    useTransform(sectors[5], (v) => `${v} 1`),
  ];

  const arc = (startDeg: number, endDeg: number) => {
    const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startDeg));
    const y1 = cy + r * Math.sin(toRad(startDeg));
    const x2 = cx + r * Math.cos(toRad(endDeg));
    const y2 = cy + r * Math.sin(toRad(endDeg));
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="progressbar"
      aria-label="Scroll progress"
      className="text-neutral-900 dark:text-neutral-100">
      {/* Background track */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke * 0.5}
        opacity={0.08}
      />

      {/* Six 60° arcs */}
      {sectors.map((s, i) => (
        <motion.path
          key={i}
          d={arc(i * 60, (i + 1) * 60)}
          fill="none"
          stroke={SECTOR_COLORS[i]}
          strokeWidth={stroke}
          strokeLinecap="round"
          pathLength={1}
          style={{strokeDasharray: dashArrays[i]}}
        />
      ))}

      {/* Tick marks every 60° */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
        const x1 = cx + (r - stroke * 1.2) * Math.cos(toRad(deg));
        const y1 = cy + (r - stroke * 1.2) * Math.sin(toRad(deg));
        const x2 = cx + (r + stroke * 1.2) * Math.cos(toRad(deg));
        const y2 = cy + (r + stroke * 1.2) * Math.sin(toRad(deg));
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth={1}
            opacity={0.25}
          />
        );
      })}

      <circle
        cx={cx}
        cy={cy}
        r={stroke * 0.4}
        fill="currentColor"
        opacity={0.4}
      />
    </svg>
  );
}
