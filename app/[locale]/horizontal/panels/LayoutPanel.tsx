'use client';

import {PanelProps} from './types';

const BLOCKS = [
  {x: 40, y: 40, w: 320, h: 32, d: 0},
  {x: 40, y: 90, w: 200, h: 24, d: 0.15},
  {x: 40, y: 130, w: 320, h: 120, d: 0.3},
  {x: 40, y: 270, w: 100, h: 36, d: 0.45},
];

export default function LayoutPanel({state, accent}: PanelProps) {
  const active = state === 'active' || state === 'entering';

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full max-w-md h-auto"
      style={{color: accent}}>
      {BLOCKS.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          fill="currentColor"
          style={{
            opacity: active ? (i === 3 ? 1 : 0.2) : 0,
            transform: active ? 'translateY(0)' : 'translateY(10px)',
            transformOrigin: 'center',
            transition: `all .7s cubic-bezier(.6,.1,.3,1) ${b.d}s`,
          }}
        />
      ))}
    </svg>
  );
}
