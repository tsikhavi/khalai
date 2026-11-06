'use client';

import {motion, MotionValue, useTransform} from 'motion/react';

/**
 * A snake-like SVG that rides the right edge of the viewport.
 * It draws itself downward as `progress` goes 0 → 1, arriving at
 * the target position when the last block (block 6) completes.
 */
export function Snake({
  progress,
  color = '#c8ff01',
  width = 140,
}: {
  progress: MotionValue<number>;
  color?: string;
  width?: number;
}) {
  // The snake body is a single path; we draw it via strokeDasharray
  // so it "grows" downward as the user scrolls.
  const drawProgress = useTransform(progress, [0, 0.92], [0, 1], {
    clamp: true,
  });

  // Subtle undulation: the whole snake sways left/right a touch.
  const sway = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 6, -4, 5, 0]
  );

  // Head scale bumps slightly as it "bites" at the end.
  const headScale = useTransform(progress, [0.9, 0.95, 1], [1, 1.35, 1]);

  // Fade the snake out after the thank-you card appears.
  const opacity = useTransform(progress, [0.98, 1], [1, 0.7]);

  // The path is authored to fill a 0..1000 vertical space.
  // Each curve is a sine-like segment; end lands at y=1000.
  const path = `
    M 70 0
    C 110 90,  20 160,  60 250
    C 105 340, 15 400,  70 490
    C 120 580, 25 640,  65 730
    C 110 820, 20 880,  70 1000
  `;

  return (
    <motion.div
      aria-hidden
      style={{x: sway, opacity}}
      className="pointer-events-none fixed top-0 right-0 z-30 hidden h-screen md:block">
      <svg
        viewBox="0 0 140 1000"
        preserveAspectRatio="none"
        width={width}
        height="100%"
        className="h-full">
        {/* Darker outline for depth */}
        <motion.path
          d={path}
          fill="none"
          stroke="#00000022"
          strokeWidth={18}
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: useTransform(drawProgress, (v) => `${v} 1`),
            transform: 'translate(3px, 0)',
          }}
        />

        {/* Main body */}
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={12}
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: useTransform(drawProgress, (v) => `${v} 1`),
          }}
        />

        {/* Highlight line for a wet, glossy sheen */}
        <motion.path
          d={path}
          fill="none"
          stroke="#ffffff66"
          strokeWidth={3}
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: useTransform(drawProgress, (v) => `${v} 1`),
            transform: 'translate(-2px, -2px)',
          }}
        />

        {/* Scales — small ticks along the body */}
        <motion.g
          style={{
            opacity: useTransform(drawProgress, [0, 0.6, 1], [0, 0.5, 0.5]),
          }}>
          {Array.from({length: 24}).map((_, i) => {
            const y = 40 + i * 40;
            const offset = i % 2 === 0 ? 0 : 24;
            return (
              <ellipse
                key={i}
                cx={70 + offset}
                cy={y}
                rx={6}
                ry={3}
                fill="#ffffff22"
              />
            );
          })}
        </motion.g>

        {/* Head — a rounded blob that scales at the end */}
        <motion.g
          style={{
            scale: headScale,
            originX: '70px',
            originY: '990px',
          }}>
          <circle
            cx={70}
            cy={990}
            r={22}
            fill={color}
          />
          <circle
            cx={70}
            cy={990}
            r={22}
            fill="url(#snakeHeadGrad)"
          />
          {/* Eyes */}
          <circle
            cx={62}
            cy={984}
            r={3}
            fill="#111"
          />
          <circle
            cx={78}
            cy={984}
            r={3}
            fill="#111"
          />
          {/* Tongue */}
          <path
            d="M 70 1005 l 0 12 l -4 6 M 70 1017 l 4 6"
            stroke="#d94f4f"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>

        <defs>
          <radialGradient
            id="snakeHeadGrad"
            cx="0.4"
            cy="0.3"
            r="0.8">
            <stop
              offset="0%"
              stopColor="#ffffff55"
            />
            <stop
              offset="100%"
              stopColor="#00000000"
            />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
