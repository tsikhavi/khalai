'use client';

import Image from 'next/image';
import {useCallback, useEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import Link from 'next/link';
import {useLocale} from 'next-intl';
import styles from '../ProcessSection.module.css';

const PROJECTS = [
  {
    slug: 'khalai-brand',
    title: 'Khalai Brand System',
    src: '/images/projects/mavuno.jpg',
    href: 'khalai-brand',
  },
  {
    slug: 'mavuno',
    title: 'Mavuno',
    src: '/images/projects/mavuno.jpg',
    href: 'acme-commerce',
  },
  {
    slug: 'chama-ledger',
    title: 'Chama',
    src: '/images/projects/chama.jpg',
    href: 'chama-ledger',
  },
  {
    slug: 'sokoni-app',
    title: 'Sokoni',
    src: '/images/projects/sokoni.jpg',
    href: 'sokoni',
  },
];

const HINT_KEY = 'process-projects-hint-dismissed';

// Card widths — keep in sync with the classNames below
const CARD_W = 520;
const CARD_W_SM = 320;
const GAP = 24;

// Triple buffer + visible index constants (module scope: no hook deps)
const TRIPLED = [...PROJECTS, ...PROJECTS, ...PROJECTS];
const VISIBLE_START = PROJECTS.length;

export default function ProjectsSection({
  data,
  onCursor,
}: {
  data: {
    kicker: string;
    title: string;
    body: string;
    view: string;
    continue: string;
  };
  onCursor: (s: 'idle' | 'view' | 'continue') => void;
}) {
  const bandRef = useRef<HTMLDivElement>(null);
  const isResettingRef = useRef(false);
  const bandFocusedRef = useRef(false);

  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  // Lazy initializer — reads localStorage once, no effect, no setState
  const [showHint, setShowHint] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(HINT_KEY) !== '1';
  });

  const locale = useLocale();

  const dismissHint = () => {
    if (!showHint) return;
    setShowHint(false);
    localStorage.setItem(HINT_KEY, '1');
  };

  /* ── Custom cursor toggle while band is on screen ── */
  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        document.body.dataset.customCursor = entry.isIntersecting
          ? 'true'
          : 'false';
        if (!entry.isIntersecting) onCursor('idle');
      },
      {threshold: 0.3}
    );
    io.observe(el);
    return () => {
      io.disconnect();
      document.body.dataset.customCursor = 'false';
    };
  }, [onCursor]);

  /* ── Center the middle copy on mount ── */
  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    const cardWidth = window.matchMedia('(min-width: 768px)').matches
      ? CARD_W
      : CARD_W_SM;
    band.scrollLeft = VISIBLE_START * (cardWidth + GAP);
  }, []);

  /* ── Scroll handler (memoized) ── */
  const handleScroll = useCallback(() => {
    const band = bandRef.current;
    if (!band || isResettingRef.current) return;

    const cards = Array.from(band.querySelectorAll<HTMLElement>('[data-card]'));
    if (cards.length === 0) return;

    const center = band.scrollLeft + band.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const mid = c.offsetLeft + c.clientWidth / 2;
      const dist = Math.abs(mid - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });

    setActive(((best % PROJECTS.length) + PROJECTS.length) % PROJECTS.length);

    // Progress within the middle copy
    const cardsPerCopy = PROJECTS.length;
    const perCardWidth = cards[0].clientWidth + GAP;
    const totalCopyWidth = cardsPerCopy * perCardWidth;
    const relativeScroll = band.scrollLeft - VISIBLE_START * perCardWidth;
    const progressInCopy = Math.max(
      0,
      Math.min(1, (relativeScroll % totalCopyWidth) / totalCopyWidth)
    );
    setProgress(progressInCopy);

    // Infinite wrap: hop to the middle copy when we approach an edge
    const threshold = perCardWidth * 1.5;
    const maxScroll = band.scrollWidth - band.clientWidth;
    const firstCopyStart = VISIBLE_START * perCardWidth;
    const lastCopyEnd = maxScroll - cardsPerCopy * perCardWidth + threshold;

    if (band.scrollLeft < firstCopyStart - threshold) {
      isResettingRef.current = true;
      band.scrollLeft += totalCopyWidth;
      requestAnimationFrame(() => {
        isResettingRef.current = false;
      });
    } else if (band.scrollLeft > lastCopyEnd) {
      isResettingRef.current = true;
      band.scrollLeft -= totalCopyWidth;
      requestAnimationFrame(() => {
        isResettingRef.current = false;
      });
    }
  }, []);

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;
    band.addEventListener('scroll', handleScroll, {passive: true});
    return () => band.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ── Wheel → horizontal bridge (only while band is focused) ── */
  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    const onWheel = (e: WheelEvent) => {
      if (!bandFocusedRef.current) return;
      e.preventDefault();
      const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      const clamped = Math.max(-200, Math.min(200, delta * 1.2));
      band.scrollLeft += clamped;
    };

    band.addEventListener('wheel', onWheel, {passive: false});
    return () => band.removeEventListener('wheel', onWheel);
  }, []);

  /* ── Keyboard ── */
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const band = bandRef.current;
    if (!band) return;
    const card = band.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.clientWidth + GAP : 400;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      dismissHint();
      band.scrollBy({left: step, behavior: 'smooth'});
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      dismissHint();
      band.scrollBy({left: -step, behavior: 'smooth'});
    }
  };

  return (
    <section className="relative">
      <header className="mx-auto max-w-6xl px-6 md:px-16">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          {data.kicker}
        </p>
        <h2 className="mt-3 font-serif text-5xl leading-tight md:text-7xl">
          {data.title}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed opacity-70">
          {data.body}
        </p>

        {showHint && (
          <motion.div
            initial={{opacity: 0, y: 6}}
            animate={{opacity: 1, y: 0}}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs text-accent">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Swipe, drag, or use ← → keys
            <button
              onClick={dismissHint}
              className="ml-1 rounded-full p-0.5 text-accent/60 hover:text-accent"
              aria-label="Dismiss hint">
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </header>

      {/* Infinite scroll band */}
      <div className="relative">
        <div
          ref={bandRef}
          data-hband
          tabIndex={0}
          role="region"
          aria-label={data.title}
          onKeyDown={onKeyDown}
          onFocus={() => {
            bandFocusedRef.current = true;
          }}
          onBlur={() => {
            bandFocusedRef.current = false;
          }}
          onMouseEnter={() => {
            onCursor('view');
            dismissHint();
          }}
          onMouseLeave={() => onCursor('idle')}
          className="scrollbar-none mt-10 flex gap-6 overflow-x-auto overflow-y-hidden px-6 pb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:px-16 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{
            scrollSnapType: 'x mandatory',
            touchAction: 'pan-x',
            overscrollBehaviorX: 'contain',
          }}>
          {TRIPLED.map((p, i) => {
            const logicalIndex = i % PROJECTS.length;
            const isActive = logicalIndex === active;
            const isCenterCopy =
              i >= PROJECTS.length && i < PROJECTS.length * 2;

            return (
              <Link
                key={`${p.slug}-${i}`}
                href={`/${locale}/projects/${p.href}`}
                data-card
                tabIndex={isCenterCopy ? 0 : -1}
                aria-hidden={!isCenterCopy}
                className="group relative block w-[80vw] shrink-0 snap-center focus:outline-none md:w-130"
                style={{scrollSnapAlign: 'center'}}
                onMouseEnter={() => onCursor('view')}
                onMouseLeave={() => onCursor(isActive ? 'continue' : 'idle')}
                onFocus={() => onCursor('view')}
                onBlur={() => onCursor('idle')}
                aria-label={`${p.title} — ${data.view}`}>
                <div
                  className={`relative aspect-4/3 overflow-hidden rounded-2xl border transition-all duration-500 ${
                    isActive
                      ? 'border-accent/40 shadow-2xl'
                      : 'border-neutral-200 dark:border-neutral-800'
                  } ${styles.imageMask}`}>
                  <Image
                    src={p.src}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 520px, 80vw"
                    className={`object-cover transition-all duration-700 ${
                      isActive
                        ? 'grayscale-0 scale-100 opacity-100'
                        : 'grayscale scale-95 opacity-70'
                    }`}
                  />

                  <div
                    className={`pointer-events-none absolute inset-0 flex items-end p-6 transition-opacity duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <div className="rounded-full bg-black/60 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white backdrop-blur">
                      {data.view} →
                    </div>
                  </div>

                  <motion.div
                    className="pointer-events-none absolute right-4 top-4 h-2 w-2 rounded-full bg-accent"
                    animate={
                      isActive
                        ? {scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6]}
                        : {scale: 1, opacity: 0.3}
                    }
                    transition={
                      isActive
                        ? {duration: 1.8, repeat: Infinity}
                        : {duration: 0.3}
                    }
                  />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <p
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-accent'
                        : 'text-neutral-700 dark:text-neutral-300'
                    }`}>
                    {p.title}
                  </p>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                    {String(logicalIndex + 1).padStart(2, '0')} /{' '}
                    {String(PROJECTS.length).padStart(2, '0')}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-neutral-50 to-transparent dark:from-neutral-950 md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-neutral-50 to-transparent dark:from-neutral-950 md:w-24" />
      </div>

      {/* Progress + counter */}
      <div className="mx-auto mt-4 max-w-6xl px-6 md:px-16">
        <div className="flex items-center gap-4">
          <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-200"
              style={{width: `${progress * 100}%`}}
            />
          </div>
          <span className="text-xs tabular-nums text-neutral-500">
            {String(active + 1).padStart(2, '0')} /{' '}
            {String(PROJECTS.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
