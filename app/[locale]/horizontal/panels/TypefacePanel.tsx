'use client';

import {PanelProps} from './types';

export default function TypefacePanel({state, accent}: PanelProps) {
  const active = state === 'active' || state === 'entering';

  return (
    <div
      className="w-full max-w-md flex flex-col items-start gap-2 text-left font-serif"
      style={{color: accent}}>
      {[
        {
          cls: 'text-7xl md:text-8xl leading-none tracking-tight',
          delay: 0,
          text: 'Aa',
        },
        {
          cls: 'text-2xl md:text-3xl tracking-wide opacity-70',
          delay: 0.3,
          text: 'Type is attitude.',
        },
        {
          cls: 'text-base md:text-lg opacity-50',
          delay: 0.6,
          text: 'Size, width, line breaks — tuned to every line.',
        },
      ].map((line, i) => (
        <span
          key={i}
          className={line.cls}
          style={{
            clipPath: active ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
            transition: `clip-path 1s cubic-bezier(.6,.1,.3,1) ${line.delay}s`,
          }}>
          {line.text}
        </span>
      ))}
    </div>
  );
}
