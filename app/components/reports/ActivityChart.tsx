'use client';

import {motion} from 'framer-motion';

export default function ActivityChart({
  metrics,
}: {
  metrics: {label: string; value: number}[];
}) {
  const W = 520;
  const H = 220;
  const pad = 28;

  const max = Math.max(...metrics.map((m) => m.value), 100);
  const stepX = (W - pad * 2) / Math.max(metrics.length - 1, 1);

  const points = metrics.map((m, i) => {
    const x = pad + i * stepX;
    const y = H - pad - (m.value / max) * (H - pad * 2);
    return {x, y, ...m};
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`)
    .join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].x},${H - pad} L${points[0].x},${H - pad} Z`;

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Progress over time
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Cumulative completion, weekly.
          </p>
        </div>
        <span className="rounded-full bg-accent/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-accent">
          Live
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full">
        {/* gridlines */}
        {[0, 25, 50, 75, 100].map((p) => {
          const y = H - pad - (p / 100) * (H - pad * 2);
          return (
            <g key={p}>
              <line
                x1={pad}
                x2={W - pad}
                y1={y}
                y2={y}
                className="stroke-neutral-200 dark:stroke-neutral-800"
                strokeWidth="1"
              />
              <text
                x={pad - 6}
                y={y + 4}
                textAnchor="end"
                className="fill-neutral-400 text-[9px]">
                {p}
              </text>
            </g>
          );
        })}

        {/* area */}
        <motion.path
          d={areaPath}
          fill="url(#grad)"
          initial={{opacity: 0}}
          animate={{opacity: 0.25}}
          transition={{duration: 1}}
        />
        <defs>
          <linearGradient
            id="grad"
            x1="0"
            y1="0"
            x2="0"
            y2="1">
            <stop
              offset="0%"
              stopColor="#c9613f"
            />
            <stop
              offset="100%"
              stopColor="#c9613f"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="#c9613f"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{pathLength: 0}}
          animate={{pathLength: 1}}
          transition={{duration: 1.4, ease: [0.22, 1, 0.36, 1]}}
        />

        {/* points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="#c9613f"
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{
              delay: 0.4 + i * 0.08,
              type: 'spring',
              stiffness: 260,
              damping: 18,
            }}
          />
        ))}

        {/* x labels */}
        {points.map((p, i) => (
          <text
            key={`x${i}`}
            x={p.x}
            y={H - 8}
            textAnchor="middle"
            className="fill-neutral-400 text-[9px]">
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
