'use client';

import {PanelProps} from './types';

const LINES = [
  '<section class="grid">',
  '  <h1>Hello</h1>',
  '  <p>World</p>',
  '</section>',
];

const WORD = 'Khalai';

export default function CodePanel({state, accent}: PanelProps) {
  const active = state === 'active' || state === 'entering';
  const settled = state === 'active';

  return (
    <div
      className="w-full max-w-md flex flex-col items-start gap-8"
      style={{color: accent}}>
      {/* ── Animated KHALAI wordmark ── */}
      <div className="relative">
        <div
          className="flex items-baseline font-serif leading-none tracking-tight"
          style={{fontSize: 'clamp(3rem, 9vw, 5.5rem)'}}
          aria-label="Khalai">
          {WORD.split('').map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                opacity: active ? 1 : 0,
                transform: active
                  ? 'translateY(0) rotate(0deg)'
                  : 'translateY(28px) rotate(-6deg)',
                transition: `all .9s cubic-bezier(.22,1,.36,1) ${0.15 + i * 0.08}s`,
                // Shimmer once settled
                backgroundImage: settled
                  ? 'linear-gradient(100deg, currentColor 40%, #ffffff 50%, currentColor 60%)'
                  : 'none',
                backgroundSize: '250% 100%',
                backgroundPosition: settled ? '-150% 0' : '150% 0',
                WebkitBackgroundClip: settled ? 'text' : 'unset',
                backgroundClip: settled ? 'text' : 'unset',
                WebkitTextFillColor: settled ? 'transparent' : 'currentColor',
                animation: settled ? 'shimmer 2.4s ease-out 1' : 'none',
              }}>
              {char}
            </span>
          ))}
        </div>

        {/* Underline draws across */}
        <div
          className="mt-3 h-0.5 origin-left"
          style={{
            backgroundColor: accent,
            transform: active ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 1.1s cubic-bezier(.6,.1,.3,1) .75s',
          }}
        />

        {/* Little tagline fades in below */}
        <div
          className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.35em] opacity-0"
          style={{
            opacity: active ? 0.5 : 0,
            transition: 'opacity .8s ease 1.4s',
          }}>
          Design &amp; build
        </div>
      </div>

      {/* ── Code snippet below (smaller now) ── */}
      <pre className="text-left font-mono text-xs md:text-sm leading-relaxed w-full opacity-70">
        {LINES.map((l, i) => (
          <div
            key={i}
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'translateX(0)' : 'translateX(-12px)',
              transition: `all .5s cubic-bezier(.6,.1,.3,1) ${0.6 + i * 0.12}s`,
            }}>
            <span className="opacity-40 select-none mr-4">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>{l}</span>
          </div>
        ))}
        <div
          style={{
            opacity: active ? 1 : 0,
            transition: 'opacity .3s ease 1.4s',
          }}>
          <span className="opacity-40 select-none mr-4">05</span>
          <span className="inline-block w-2 h-4 bg-current align-middle animate-pulse" />
        </div>
      </pre>

      {/* Keyframes for the shimmer (scoped via inline style tag) */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 150% 0;
          }
          100% {
            background-position: -150% 0;
          }
        }
      `}</style>
    </div>
  );
}
