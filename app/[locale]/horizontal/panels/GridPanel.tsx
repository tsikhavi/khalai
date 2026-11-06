'use client';

import {PanelProps} from './types';

export default function GridPanel({state, accent}: PanelProps) {
  const active = state === 'active' || state === 'entering';

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full max-w-md h-auto"
      style={{color: accent}}>
      {Array.from({length: 5}).map((_, r) =>
        Array.from({length: 5}).map((_, c) => {
          const i = r * 5 + c;
          return (
            <rect
              key={`${r}-${c}`}
              x={40 + c * 64}
              y={40 + r * 64}
              width="56"
              height="56"
              fill="currentColor"
              style={{
                opacity: active ? 0.15 : 0,
                transition: `opacity .5s ease ${i * 0.03}s`,
              }}
            />
          );
        })
      )}
      {Array.from({length: 6}).map((_, i) => (
        <line
          key={`v${i}`}
          x1={40 + i * 64}
          y1="40"
          x2={40 + i * 64}
          y2="360"
          stroke="currentColor"
          strokeWidth="1"
          style={{
            opacity: active ? 0.35 : 0,
            transition: `opacity .6s ease ${i * 0.08}s`,
          }}
        />
      ))}
      {Array.from({length: 6}).map((_, i) => (
        <line
          key={`h${i}`}
          x1="40"
          y1={40 + i * 64}
          x2="360"
          y2={40 + i * 64}
          stroke="currentColor"
          strokeWidth="1"
          style={{
            opacity: active ? 0.35 : 0,
            transition: `opacity .6s ease ${i * 0.08}s`,
          }}
        />
      ))}
      <rect
        x={40 + 2 * 64}
        y={40 + 2 * 64}
        width="56"
        height="56"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? 'scale(1)' : 'scale(0.5)',
          transformOrigin: `${40 + 2 * 64 + 28}px ${40 + 2 * 64 + 28}px`,
          transition: 'all .6s cubic-bezier(.6,.1,.3,1) 1s',
        }}
      />
    </svg>
  );
}
