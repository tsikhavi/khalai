'use client';

import Image from 'next/image';
import {Lens} from '../LensToggle';

export function AuthHero({
  eyebrow,
  title,
  body,
  footer,
}: {
  eyebrow: string;
  title: string;
  body: string;
  footer: string;
}) {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-(--paper) p-10 dark:bg-neutral-950 md:flex">
      {/* Logo */}
      <div>
        <Image
          src="/images/logo-r.png"
          alt="Khalai"
          width={120}
          height={120}
          priority
          className="h-12 w-auto"
        />
      </div>

      {/* Editorial content */}
      <div className="space-y-4">
        <p className="text-xs tracking-widest text-neutral-500 uppercase">
          {eyebrow}
        </p>
        <h2 className="text-2xl leading-tight font-semibold tracking-tight">
          <Lens reveal={<span className="text-accent">{title}</span>}>
            {title}
          </Lens>
        </h2>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {body}
        </p>
      </div>

      {/* Footer */}
      <p className="text-xs text-neutral-500">{footer}</p>

      {/* Decorative grid lines — echoes the "measured" ethos */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-8 -bottom-8 h-40 w-40 text-(--accent)/10"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth={0.5}>
        {Array.from({length: 10}).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 10}
            x2="100"
            y2={i * 10}
          />
        ))}
        {Array.from({length: 10}).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 10}
            y1="0"
            x2={i * 10}
            y2="100"
          />
        ))}
      </svg>
    </div>
  );
}
