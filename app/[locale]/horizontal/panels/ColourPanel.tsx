'use client';

import {PanelProps} from './types';

const SWATCHES = [
  {name: 'Paper', color: '#f4efe6'},
  {name: 'Ink', color: '#1a1a2e'},
  {name: 'Terracotta', color: '#c9613f'},
];

export default function ColourPanel({state}: PanelProps) {
  const active = state === 'active' || state === 'entering';

  return (
    <div className="flex items-end gap-4 md:gap-6">
      {SWATCHES.map((s, i) => (
        <div
          key={s.name}
          className="flex flex-col items-center gap-3">
          <div
            className="w-20 h-20 md:w-28 md:h-28 rounded-full"
            style={{
              backgroundColor: s.color,
              boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
              opacity: active ? 1 : 0,
              transform: active ? 'scale(1)' : 'scale(0)',
              transition: `all .7s cubic-bezier(.6,.1,.3,1) ${i * 0.15}s`,
            }}
          />
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{
              opacity: active ? 0.6 : 0,
              transition: `opacity .5s ease ${0.5 + i * 0.15}s`,
            }}>
            {s.name}
          </span>
        </div>
      ))}
    </div>
  );
}
