'use client';

import {PanelProps} from './types';

export default function LinePanel({state, accent}: PanelProps) {
  const active = state === 'active' || state === 'entering';

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full max-w-md h-auto"
      style={{color: accent}}>
      <g
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 6"
        style={{
          opacity: active ? 0.4 : 0,
          transition: 'opacity .7s ease',
        }}>
        <line
          x1="0"
          y1="120"
          x2="400"
          y2="120"
        />
        <line
          x1="0"
          y1="280"
          x2="400"
          y2="280"
        />
        <line
          x1="120"
          y1="0"
          x2="120"
          y2="400"
        />
        <line
          x1="280"
          y1="0"
          x2="280"
          y2="400"
        />
      </g>

      <line
        x1="40"
        y1="200"
        x2="360"
        y2="200"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          strokeDasharray: 320,
          strokeDashoffset: active ? 0 : 320,
          transition: 'stroke-dashoffset 1.2s cubic-bezier(.6,.1,.3,1)',
        }}
      />

      {[40, 120, 200, 280, 360].map((x, i) => (
        <line
          key={x}
          x1={x}
          y1="190"
          x2={x}
          y2="210"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{
            opacity: active ? 1 : 0,
            transition: `opacity .4s ease ${0.8 + i * 0.1}s`,
          }}
        />
      ))}

      <circle
        cx="40"
        cy="200"
        r="4"
        fill="currentColor"
        style={{
          transform: active ? 'scale(1)' : 'scale(0)',
          transformOrigin: '40px 200px',
          transition: 'transform .5s cubic-bezier(.6,.1,.3,1) 1s',
        }}
      />
    </svg>
  );
}
