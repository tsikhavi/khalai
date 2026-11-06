'use client';

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {AnimatePresence, motion} from 'motion/react';

export type MpesaVisualKey =
  | 'hero'
  | 'why'
  | 'principles'
  | 'anatomy'
  | 'partners'
  | 'future'
  | 'proof'
  | 'cta';

type Visual = {
  key: MpesaVisualKey;
  src: string;
  alt: string;
  caption: string;
};

const VISUALS: Visual[] = [
  {
    key: 'hero',
    src: '/images/logo-r.png',
    alt: 'A phone showing an M-Pesa payment prompt',
    caption: 'The payment prompt your user will see.',
  },
  {
    key: 'why',
    src: '/images/logo-r.png',
    alt: 'Hand holding phone with M-Pesa menu open',
    caption: 'M-Pesa is already in their hands.',
  },
  {
    key: 'principles',
    src: '/images/logo-r.png',
    alt: 'Wireframe sketches of a checkout flow',
    caption: 'The happy path, drawn before any code.',
  },
  {
    key: 'anatomy',
    src: '/images/logo-r.png',
    alt: 'A checkout screen with copy labelled at each step',
    caption: 'Every sentence earns its place.',
  },
  {
    key: 'partners',
    src: '/images/logo-r.png',
    alt: 'Global payment network diagram',
    caption: 'Local first. Global when it earns it.',
  },
  {
    key: 'future',
    src: '/images/logo-r.png',
    alt: 'Abstract rendering of future payment interfaces',
    caption: 'What the next five years look like.',
  },
  {
    key: 'proof',
    src: '/images/logo-r.png',
    alt: 'Analytics dashboard showing checkout metrics',
    caption: 'The numbers, in production.',
  },
  {
    key: 'cta',
    src: '/images/logo-r.png',
    alt: 'A quiet desk with a notebook',
    caption: 'Every project starts with a conversation.',
  },
];

export function MpesaVisualPanel({active}: {active: MpesaVisualKey}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [observedActive, setObservedActive] = useState<MpesaVisualKey>(active);
  const [visible, setVisible] = useState(true);

  // Merge hover-driven `active` with scroll-driven `observedActive`.
  // Hover wins while it lasts — this is why onMouseLeave isn't strictly needed.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Observe the sibling sections. The closest one to the viewport center wins.
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-visual]')
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        const key = best.target.getAttribute('data-visual') as MpesaVisualKey;
        if (key) setObservedActive(key);
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  // Hide the panel once the CTA section is fully scrolled past
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {threshold: 0.1}
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Hover override > scroll observation
  const effectiveKey = active ?? observedActive;
  const visual = VISUALS.find((v) => v.key === effectiveKey) ?? VISUALS[0];

  return (
    <div
      ref={containerRef}
      className="sticky top-24"
      style={{opacity: visible ? 1 : 0, transition: 'opacity 0.3s'}}>
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
        <AnimatePresence
          mode="wait"
          initial={false}>
          <motion.div
            key={visual.key}
            initial={{opacity: 0, scale: 1.02}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.98}}
            transition={{duration: 0.45, ease: [0.22, 1, 0.36, 1]}}
            className="absolute inset-0">
            <Image
              src={visual.src}
              alt={visual.alt}
              fill
              sizes="(max-width: 768px) 0px, (max-width: 1024px) 360px, 420px"
              className="object-cover"
              priority={visual.key === 'hero'}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient veil so the caption stays legible over any image */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/70 to-transparent"
        />

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <AnimatePresence
            mode="wait"
            initial={false}>
            <motion.p
              key={visual.caption}
              initial={{opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
              className="text-sm leading-snug text-white/90">
              {visual.caption}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Key index in the top-right corner */}
        <div className="absolute inset-e-4 top-4 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium tracking-widest text-white/80 uppercase backdrop-blur-sm">
          {String(VISUALS.findIndex((v) => v.key === visual.key) + 1).padStart(
            2,
            '0'
          )}{' '}
          / {String(VISUALS.length).padStart(2, '0')}
        </div>
      </div>

      {/* Progress dots — one per section, click to jump */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {VISUALS.map((v) => (
          <button
            key={v.key}
            type="button"
            onClick={() => {
              const target = document.querySelector(`[data-visual="${v.key}"]`);
              target?.scrollIntoView({behavior: 'smooth', block: 'start'});
            }}
            aria-label={v.alt}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              v.key === visual.key
                ? 'w-8 bg-accent'
                : 'w-1.5 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
