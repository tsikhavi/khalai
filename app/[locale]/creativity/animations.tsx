'use client';

import {useState} from 'react';
import {
  motion,
  MotionValue,
  useTransform,
  useMotionValueEvent,
} from 'motion/react';
import Image from 'next/image';

/* ────────────────────────────────────────────────────────────────
   Shared chapter card
   ──────────────────────────────────────────────────────────────── */

type ChapterCopy = {
  index: string;
  title: string;
  body: string;
  meta?: string;
};

function ChapterCard({
  copy,
  progress,
  align = 'left',
}: {
  copy: ChapterCopy;
  progress: MotionValue<number>;
  align?: 'left' | 'right';
}) {
  const opacity = useTransform(
    progress,
    [0.1, 0.28, 0.82, 0.94],
    [0, 1, 1, 0],
    {clamp: true}
  );
  const y = useTransform(progress, [0.1, 0.3], [24, 0], {clamp: true});
  const rule = useTransform(progress, [0.15, 0.45], [0, 1], {clamp: true});

  return (
    <motion.div
      style={{opacity, y}}
      className={`pointer-events-none absolute top-1/2 hidden max-w-xs -translate-y-1/2 lg:block ${
        align === 'right' ? 'right-16 text-right' : 'left-16 text-left'
      }`}>
      <div
        className={`flex items-center gap-3 ${
          align === 'right' ? 'justify-end' : 'justify-start'
        }`}>
        <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-laurel-700 dark:text-laurel-300">
          {copy.index}
        </span>
        <motion.span
          aria-hidden
          style={{scaleX: rule}}
          className={`h-px w-10 bg-laurel-500 ${
            align === 'right' ? 'origin-right' : 'origin-left'
          }`}
        />
      </div>
      <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight text-foreground">
        {copy.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-foreground/70">
        {copy.body}
      </p>
      {copy.meta && (
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/50">
          {copy.meta}
        </p>
      )}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Block 1 — Reveal
   ──────────────────────────────────────────────────────────────── */

const COPY_1: ChapterCopy = {
  index: '01',
  title: 'Lines first.',
  body: 'Before anything is styled, I lay out the guides. Where content sits, where whitespace sits. The skeleton is decided on paper.',
  meta: 'Structure · Whitespace · Intent',
};

export function RevealBlock({
  progress,
  color,
}: {
  progress: MotionValue<number>;
  color: string;
}) {
  const opacity = useTransform(progress, [0, 0.12, 0.86, 1], [0, 1, 1, 0], {
    clamp: true,
  });
  const y = useTransform(progress, [0, 0.12, 0.86, 1], [24, 0, 0, -48], {
    clamp: true,
  });
  const scale = useTransform(progress, [0, 0.12, 0.86, 1], [0.98, 1, 1, 0.9], {
    clamp: true,
  });
  const filter = useTransform(progress, [0.86, 1], ['blur(0px)', 'blur(8px)'], {
    clamp: true,
  });

  const clipPath = useTransform(
    progress,
    [0.05, 0.55],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
    {clamp: true}
  );
  const subtitleOpacity = useTransform(progress, [0.4, 0.7], [0, 1], {
    clamp: true,
  });
  const subtitleY = useTransform(progress, [0.4, 0.7], [16, 0], {
    clamp: true,
  });

  const guide1 = useTransform(progress, [0.05, 0.4], [0, 1], {clamp: true});
  const guide2 = useTransform(progress, [0.12, 0.5], [0, 1], {clamp: true});

  return (
    <>
      {/* Baseline guides */}
      <motion.div
        aria-hidden
        style={{scaleY: guide1}}
        className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px origin-top -translate-x-1/2 bg-laurel-700/20 md:block dark:bg-laurel-300/20"
      />
      <motion.div
        aria-hidden
        style={{scaleX: guide2}}
        className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-full origin-left bg-laurel-700/20 md:block dark:bg-laurel-300/20"
      />

      <motion.div
        style={{opacity, y, scale, filter}}
        className="text-center">
        <motion.h2
          style={{clipPath, color}}
          className="text-[18vw] leading-none font-black tracking-tighter md:text-[14vw]">
          Khalai
        </motion.h2>
        <motion.p
          style={{opacity: subtitleOpacity, y: subtitleY}}
          className="mt-8 text-base text-foreground/70 md:text-lg">
          Design and code, from one person, in Nairobi.
        </motion.p>
      </motion.div>

      <ChapterCard
        copy={COPY_1}
        progress={progress}
        align="left"
      />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────
   Block 2 — Rotate
   ──────────────────────────────────────────────────────────────── */

const COPY_2: ChapterCopy = {
  index: '02',
  title: 'A grid to hold it.',
  body: 'Columns, gaps, a container width. The grid is the reason the site feels calm at every screen size.',
  meta: '8pt rhythm · Fluid container',
};

export function RotateBlock({
  progress,
  color,
}: {
  progress: MotionValue<number>;
  color: string;
}) {
  const opacity = useTransform(progress, [0, 0.12, 0.86, 1], [0, 1, 1, 0], {
    clamp: true,
  });
  const rotate = useTransform(progress, [0, 0.15, 0.85, 1], [-12, 0, 0, 15], {
    clamp: true,
  });
  const scale = useTransform(progress, [0, 0.15, 0.85, 1], [0.75, 1, 1, 1.15], {
    clamp: true,
  });
  const filter = useTransform(progress, [0.86, 1], ['blur(0px)', 'blur(8px)'], {
    clamp: true,
  });

  const gridOpacity = useTransform(progress, [0.1, 0.5], [0, 0.4], {
    clamp: true,
  });

  return (
    <>
      <motion.div
        aria-hidden
        style={{opacity: gridOpacity}}
        className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--color-laurel-700)_12%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--color-laurel-700)_12%,transparent)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </motion.div>

      <motion.div style={{opacity, rotate, scale, filter}}>
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {Array.from({length: 9}).map((_, i) => (
            <Tile
              key={i}
              progress={progress}
              index={i}
              color={color}
            />
          ))}
        </div>
      </motion.div>

      <ChapterCard
        copy={COPY_2}
        progress={progress}
        align="left"
      />
    </>
  );
}

function Tile({
  progress,
  index,
  color,
}: {
  progress: MotionValue<number>;
  index: number;
  color: string;
}) {
  const start = index * 0.07;
  const end = Math.min(start + 0.4, 0.75);
  const tileRotate = useTransform(progress, [start, end], [0, 90], {
    clamp: true,
  });
  const tileScale = useTransform(progress, [start, end], [0.5, 1], {
    clamp: true,
  });
  const tileOpacity = useTransform(progress, [start, end], [0.15, 1], {
    clamp: true,
  });
  const radius = useTransform(progress, [start, end], ['4px', '16px'], {
    clamp: true,
  });

  return (
    <motion.div
      style={{
        rotate: tileRotate,
        scale: tileScale,
        opacity: tileOpacity,
        borderRadius: radius,
        backgroundColor: color,
      }}
      className="h-16 w-16 md:h-24 md:w-24"
    />
  );
}

/* ────────────────────────────────────────────────────────────────
   Block 3 — Draw
   ──────────────────────────────────────────────────────────────── */

const COPY_3: ChapterCopy = {
  index: '03',
  title: 'Type, chosen for the job.',
  body: 'One typeface, maybe two. Sizes and line breaks tuned line-by-line. Type is the tone of voice.',
  meta: 'Inter · Tuned rhythm',
};

const WAVE_VERTICES = [
  {x: 40, y: 100},
  {x: 140, y: 40},
  {x: 240, y: 160},
  {x: 340, y: 40},
  {x: 440, y: 160},
  {x: 540, y: 100},
];

const TYPE_LINE = 'AaBbCc — 0123 · Nairobi';

export function DrawBlock({
  progress,
  color,
}: {
  progress: MotionValue<number>;
  color: string;
}) {
  const opacity = useTransform(progress, [0, 0.12, 0.86, 1], [0, 1, 1, 0], {
    clamp: true,
  });
  const x = useTransform(progress, [0, 0.15, 0.85, 1], [-100, 0, 0, 120], {
    clamp: true,
  });
  const scale = useTransform(progress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.9], {
    clamp: true,
  });

  const lineLength = useTransform(progress, [0.1, 0.7], [0, 1], {
    clamp: true,
  });

  const sansOpacity = useTransform(
    progress,
    [0.2, 0.4, 0.6, 0.8],
    [0, 1, 1, 0],
    {clamp: true}
  );
  const serifOpacity = useTransform(
    progress,
    [0.2, 0.4, 0.6, 0.8],
    [1, 0, 0, 1],
    {clamp: true}
  );

  const d = `M ${WAVE_VERTICES.map((v) => `${v.x} ${v.y}`).join(' L ')}`;

  return (
    <>
      <motion.div
        style={{opacity, x, scale}}
        className="w-full max-w-2xl px-4">
        <svg
          viewBox="0 0 580 200"
          className="w-full overflow-visible">
          <motion.path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            style={{
              strokeDasharray: useTransform(lineLength, (v) => `${v} 1`),
            }}
          />
          {WAVE_VERTICES.map((v, i) => (
            <WaveDot
              key={i}
              progress={progress}
              index={i}
              x={v.x}
              y={v.y}
              color={color}
            />
          ))}
        </svg>

        <div className="relative mt-8 h-10 md:mt-10">
          <motion.span
            style={{opacity: sansOpacity}}
            className="absolute inset-0 text-center text-lg font-semibold tracking-tight text-foreground md:text-2xl">
            {TYPE_LINE}
          </motion.span>
          <motion.span
            style={{opacity: serifOpacity}}
            className="absolute inset-0 text-center font-serif text-lg italic tracking-tight text-foreground md:text-2xl">
            {TYPE_LINE}
          </motion.span>
        </div>
      </motion.div>

      <ChapterCard
        copy={COPY_3}
        progress={progress}
        align="left"
      />
    </>
  );
}

function WaveDot({
  progress,
  index,
  x,
  y,
  color,
}: {
  progress: MotionValue<number>;
  index: number;
  x: number;
  y: number;
  color: string;
}) {
  const start = 0.1 + index * 0.1;
  const end = start + 0.15;
  const r = useTransform(progress, [start, end], [0, 6], {clamp: true});
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={r}
      fill={color}
    />
  );
}

/* ────────────────────────────────────────────────────────────────
   Block 4 — Type
   ──────────────────────────────────────────────────────────────── */

const COPY_4: ChapterCopy = {
  index: '04',
  title: 'One colour that earns its place.',
  body: "Paper, ink, one accent. In Khalai's case, a terracotta borrowed from Kenyan sunsets. It appears rarely and means something each time.",
  meta: 'Paper · Ink · Terracotta #C8531C',
};

const SENTENCE = 'We build by hand, for the long run.';

export function TypeBlock({
  progress,
  color,
}: {
  progress: MotionValue<number>;
  color: string;
}) {
  const opacity = useTransform(progress, [0, 0.12, 0.9, 1], [0, 1, 1, 0], {
    clamp: true,
  });
  const y = useTransform(progress, [0, 0.15, 0.9, 1], [60, 0, 0, -80], {
    clamp: true,
  });
  const scale = useTransform(progress, [0, 0.15, 0.9, 1], [0.95, 1, 1, 0.9], {
    clamp: true,
  });

  const [count, setCount] = useState(0);
  const charCount = useTransform(progress, [0.15, 0.8], [0, SENTENCE.length], {
    clamp: true,
  });

  useMotionValueEvent(charCount, 'change', (v) => {
    setCount(Math.round(v));
  });

  const swatchScale = useTransform(progress, [0.2, 0.5], [0, 1], {
    clamp: true,
  });

  return (
    <>
      <motion.div
        style={{opacity, y, scale}}
        className="max-w-2xl px-6 text-center">
        <p
          className="text-2xl leading-tight font-semibold tracking-tight md:text-5xl"
          style={{color}}>
          {SENTENCE.slice(0, count)}
          <motion.span
            animate={{opacity: [1, 1, 0, 0]}}
            transition={{
              duration: 1,
              repeat: Infinity,
              times: [0, 0.5, 0.5, 1],
            }}
            className="ml-1 inline-block h-[1em] w-0.75 translate-y-[0.15em] bg-current"
            aria-hidden
          />
        </p>

        <motion.div
          aria-hidden
          style={{scaleX: swatchScale}}
          className="mx-auto mt-10 flex h-6 w-40 origin-left overflow-hidden rounded-full md:mt-14">
          <div className="h-full flex-1 bg-laurel-950" />
          <div className="h-full flex-1 bg-paper" />
          <div
            className="h-full flex-1"
            style={{backgroundColor: color}}
          />
        </motion.div>
        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/50">
          Ink · Paper · Terracotta
        </p>
      </motion.div>

      <ChapterCard
        copy={COPY_4}
        progress={progress}
        align="left"
      />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────
   Block 5 — Drift (with scroll-driven Editor)
   ──────────────────────────────────────────────────────────────── */

const COPY_5_CODE = `// editorial.tsx
import { Hero, Marquee, Footer } from '@/components';

export default function Page() {
  return (
    <main className="prose prose-neutral">
      <Hero
        eyebrow="Khalai Studio"
        title="Design and code, from one person."
        body="Made by hand, for the long run."
      />
      <Marquee items={projects} />
      <Footer year={2026} city="Nairobi" />
    </main>
  );
}`;

/**
 * Minimal tokenizer for the editor panel.
 * Covers comments, strings, keywords, JSX tags, numbers, punctuation.
 * Same approach as the typography page's "14 · Editor".
 */
type Token = {
  start: number;
  end: number;
  className: string;
};

function tokenize(src: string): Token[] {
  const tokens: Token[] = [];

  const patterns: {re: RegExp; className: string}[] = [
    {re: /\/\/[^\n]*/y, className: 'text-foreground/40 italic'},
    {
      re: /"(?:\\.|[^"\\])*"/y,
      className: 'text-laurel-700 dark:text-laurel-300',
    },
    {
      re: /'(?:\\.|[^'\\])*'/y,
      className: 'text-laurel-700 dark:text-laurel-300',
    },
    {
      re: /`(?:\\.|[^`\\])*`/y,
      className: 'text-laurel-700 dark:text-laurel-300',
    },
    {
      re: /\b(?:import|from|export|default|function|return|const|let|var|if|else|new|class|extends|async|await|type|interface)\b/y,
      className: 'text-secondary',
    },
    {re: /<\/?[A-Z][A-Za-z0-9.]*/y, className: 'text-laurel-500'},
    {
      re: /\b\d+(?:\.\d+)?\b/y,
      className: 'text-laurel-600 dark:text-laurel-400',
    },
    {re: /[{}()[\]<>:=;,./]/y, className: 'text-foreground/50'},
  ];

  let i = 0;
  while (i < src.length) {
    let matched = false;

    for (const {re, className} of patterns) {
      re.lastIndex = i;
      const m = re.exec(src);
      if (m && m.index === i) {
        const text = m[0];
        tokens.push({start: i, end: i + text.length, className});
        i += text.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      const start = i;
      i++;
      while (i < src.length) {
        const next = patterns.some(({re}) => {
          re.lastIndex = i;
          const m = re.exec(src);
          return m && m.index === i;
        });
        if (next) break;
        i++;
      }
      tokens.push({start, end: i, className: ''});
    }
  }

  return tokens;
}

export function DriftBlockA({
  progress,
  color,
}: {
  progress: MotionValue<number>;
  color: string;
}) {
  const x = useTransform(progress, [0, 1], ['38vw', '-38vw']);
  const y = useTransform(progress, [0, 1], ['38vh', '-38vh']);
  const rotate = useTransform(progress, [0, 1], [18, -18]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.85, 1.05, 0.85]);
  const glow = useTransform(progress, [0, 0.5, 1], [0.15, 0.45, 0.15]);

  const contentY = useTransform(progress, [0, 1], ['10vh', '-10vh']);
  const contentOpacity = useTransform(
    progress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );
  const headingBlur = useTransform(
    progress,
    [0, 0.15],
    ['blur(6px)', 'blur(0px)']
  );

  /* ── Editor reveal driven by the same progress ── */
  const totalChars = COPY_5_CODE.length;
  const visibleCharsMotion = useTransform(progress, (v) => {
    // Delay the start until the panel is visible, finish at 85%.
    const clamped = Math.max(0, Math.min(1, (v - 0.15) / 0.7));
    return Math.round(clamped * totalChars);
  });

  const [visibleChars, setVisibleChars] = useState(0);
  useMotionValueEvent(visibleCharsMotion, 'change', (v) => {
    setVisibleChars(v);
  });

  const tokens = tokenize(COPY_5_CODE);
  const doneTyping = visibleChars >= totalChars;

  const codeY = useTransform(progress, [0, 1], ['6vh', '-6vh']);

  return (
    <div className="relative flex h-full w-full items-center justify-center text-foreground">
      {/* Drifting glow */}
      <motion.div
        style={{
          x,
          y,
          opacity: glow,
          background: `radial-gradient(circle, ${color}80 0%, transparent 60%)`,
        }}
        className="pointer-events-none absolute h-105 w-full blur-3xl"
      />

      {/* Drifting logo */}
      <motion.div
        style={{x, y, rotate, scale}}
        className="relative z-10">
        <Image
          src="/images/logo-r.png"
          alt="Khalai Studio"
          width={80}
          height={80}
          priority={false}
          className="h-20 select-none drop-shadow-2xl"
        />
      </motion.div>

      {/* Left column — chapter copy */}
      <motion.div
        style={{y: contentY, opacity: contentOpacity}}
        className="absolute left-0 top-1/2 z-20 max-w-sm -translate-y-1/2 px-6 text-left md:left-16 md:px-0">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-laurel-700 dark:text-laurel-300">
            05
          </span>
          <span
            aria-hidden
            className="h-px w-10 bg-laurel-500/60"
          />
        </div>
        <motion.h3
          style={{filter: headingBlur}}
          className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-foreground md:text-4xl">
          Hand-written code.
        </motion.h3>
        <p className="mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">
          What I draw, I build. No page builders, no plugin stacks. Readable
          code that compiles in five years and does not need an upgrade.
        </p>
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/50">
          Next.js · TypeScript · CSS
        </p>
      </motion.div>

      {/* Right column — Editor (scroll-driven) */}
      <motion.div
        style={{y: codeY, opacity: contentOpacity}}
        className="absolute right-6 top-1/2 hidden w-116 -translate-y-1/2 md:right-16 md:block">
        <div className="overflow-hidden rounded-xl bg-foreground/5 ring-1 ring-foreground/10 backdrop-blur">
          {/* Chrome */}
          <div className="flex items-center gap-2 border-b border-foreground/10 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-secondary/70" />
            <span className="h-2 w-2 rounded-full bg-laurel-500/70" />
            <span className="h-2 w-2 rounded-full bg-laurel-700/70" />
            <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-foreground/50">
              editorial.tsx
            </span>
            <span className="ml-auto font-mono text-[10px] tabular-nums text-foreground/30">
              {Math.min(visibleChars, totalChars)} / {totalChars}
            </span>
          </div>

          {/* Code with line numbers */}
          <div className="flex max-h-80 overflow-hidden">
            <div className="select-none border-r border-foreground/5 px-3 py-3 text-right font-mono text-[10px] leading-relaxed text-foreground/25">
              {COPY_5_CODE.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <pre className="flex-1 overflow-x-auto px-3 py-3 font-mono text-[11px] leading-relaxed text-foreground">
              <code>
                {tokens.map((tok, i) => {
                  if (tok.start >= visibleChars) return null;
                  const sliceEnd = Math.min(tok.end, visibleChars);
                  const visibleText = COPY_5_CODE.slice(tok.start, sliceEnd);
                  return (
                    <span
                      key={i}
                      className={tok.className}>
                      {visibleText}
                    </span>
                  );
                })}

                {/* Blinking cursor */}
                <span
                  className={`inline-block w-[0.55ch] bg-foreground align-baseline ${
                    doneTyping ? 'animate-pulse' : ''
                  }`}
                  style={{height: '1.1em', transform: 'translateY(0.15em)'}}
                  aria-hidden
                />
              </code>
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Block 6 — Return (two-column, water surface panel)
   ──────────────────────────────────────────────────────────────── */

export function DriftBlockB({
  progress,
  color,
}: {
  progress: MotionValue<number>;
  color: string;
}) {
  const x = useTransform(progress, [0, 1], ['-38vw', '38vw']);
  const y = useTransform(progress, [0, 1], ['-38vh', '38vh']);
  const rotate = useTransform(progress, [0, 1], [-18, 18]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.85, 1.05, 0.85]);
  const glow = useTransform(progress, [0, 0.5, 1], [0.15, 0.45, 0.15]);

  const contentY = useTransform(progress, [0, 1], ['10vh', '-10vh']);
  const contentOpacity = useTransform(
    progress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );
  const headingBlur = useTransform(
    progress,
    [0, 0.15],
    ['blur(6px)', 'blur(0px)']
  );

  /* ── Right panel reveal ── */
  const panelOpacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const panelY = useTransform(progress, [0, 1], ['6vh', '-6vh']);

  /* ── Water waves ── */
  const waveShift = useTransform(progress, [0, 1], [0, 200]);
  const waveShift2 = useTransform(progress, [0, 1], [0, -160]);
  const waveShift3 = useTransform(progress, [0, 1], [0, 280]);
  const waveAmplitude = useTransform(progress, [0, 0.5, 1], [4, 12, 6]);

  /* ── Ripples ── */
  const rippleScale = useTransform(progress, [0.35, 0.9], [0.2, 3.5]);
  const rippleOpacity = useTransform(progress, [0.35, 0.45, 0.9], [0, 0.6, 0]);
  const ripple2Scale = useTransform(progress, [0.45, 1], [0.2, 2.8]);
  const ripple2Opacity = useTransform(progress, [0.45, 0.55, 1], [0, 0.35, 0]);
  const ripple3Scale = useTransform(progress, [0.55, 1], [0.2, 2.2]);
  const ripple3Opacity = useTransform(progress, [0.55, 0.65, 1], [0, 0.2, 0]);

  const waterLineY = '55%';

  return (
    <div className="relative flex h-full w-full items-center justify-center text-foreground">
      {/* Drifting glow */}
      <motion.div
        style={{
          x,
          y,
          opacity: glow,
          background: `radial-gradient(circle, ${color}80 0%, transparent 60%)`,
        }}
        className="pointer-events-none absolute h-105 w-105 blur-3xl"
      />

      {/* Drifting logo */}
      <motion.div
        style={{x, y, rotate, scale}}
        className="relative z-10">
        <Image
          src="/images/logo-r.png"
          alt="Khalai Studio"
          width={80}
          height={80}
          className="h-20 select-none drop-shadow-2xl"
        />
      </motion.div>

      {/* Left column — chapter copy */}
      <motion.div
        style={{y: contentY, opacity: contentOpacity}}
        className="absolute left-0 top-1/2 z-20 max-w-sm -translate-y-1/2 px-6 text-left md:left-16 md:px-0">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-laurel-700 dark:text-laurel-300">
            06
          </span>
          <span
            aria-hidden
            className="h-px w-10 bg-laurel-500/60"
          />
        </div>
        <motion.h3
          style={{filter: headingBlur, color}}
          className="mt-5 text-2xl font-semibold leading-snug tracking-tight md:text-4xl">
          The site is the work.
        </motion.h3>
        <p className="mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">
          Every project is its own artefact — a small, honest statement about
          what a website can be when it is made by hand.
        </p>
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/50">
          Khalai Studio · Nairobi
        </p>
      </motion.div>

      {/* Right column — water surface panel */}
      <motion.div
        style={{y: panelY, opacity: panelOpacity}}
        className="absolute right-6 top-1/2 hidden w-96 -translate-y-1/2 md:right-16 md:block">
        <div className="overflow-hidden rounded-xl bg-foreground/5 ring-1 ring-foreground/10 backdrop-blur">
          {/* Content — water surface */}
          <div className="relative flex h-96 flex-col items-center justify-center overflow-hidden">
            {/* Above water — wordmark */}
            <div className="relative z-20 -mb-8 flex flex-col items-center">
              <p
                className="font-serif text-3xl leading-tight font-semibold tracking-tight"
                style={{color}}>
                Khalai
                <span className="text-foreground/40"> Studio</span>
              </p>
              <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.35em] text-foreground/50">
                Nairobi · Kenya
              </p>
            </div>

            {/* Water surface SVG */}
            <svg
              viewBox="0 0 400 240"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              aria-hidden>
              <defs>
                <linearGradient
                  id="waterGrad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1">
                  <stop
                    offset="0%"
                    stopColor={color}
                    stopOpacity="0.04"
                  />
                  <stop
                    offset="100%"
                    stopColor={color}
                    stopOpacity="0.12"
                  />
                </linearGradient>
                <linearGradient
                  id="waveGrad1"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0">
                  <stop
                    offset="0%"
                    stopColor={color}
                    stopOpacity="0"
                  />
                  <stop
                    offset="50%"
                    stopColor={color}
                    stopOpacity="0.6"
                  />
                  <stop
                    offset="100%"
                    stopColor={color}
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              {/* Water body fill below the line */}
              <motion.rect
                x="0"
                y="132"
                width="400"
                height="120"
                fill="url(#waterGrad)"
                style={{opacity: panelOpacity}}
              />

              {/* Wave 1 — back */}
              <motion.path
                d="M 0 132 Q 50 128 100 132 T 200 132 T 300 132 T 400 132"
                fill="none"
                stroke="url(#waveGrad1)"
                strokeWidth="1.5"
                style={{x: waveShift}}
              />

              {/* Wave 2 — mid */}
              <motion.path
                d="M 0 136 Q 50 132 100 136 T 200 136 T 300 136 T 400 136"
                fill="none"
                stroke="url(#waveGrad1)"
                strokeWidth="1"
                opacity="0.7"
                style={{x: waveShift2}}
              />

              {/* Wave 3 — front */}
              <motion.path
                d="M 0 140 Q 50 136 100 140 T 200 140 T 300 140 T 400 140"
                fill="none"
                stroke="url(#waveGrad1)"
                strokeWidth="0.8"
                opacity="0.4"
                style={{x: waveShift3}}
              />

              {/* Amplitude-driven secondary waves (top edge wobble) */}
              <motion.path
                d="M 0 132 Q 30 128 60 132 T 120 132 T 180 132 T 240 132 T 300 132 T 360 132 T 400 132"
                fill="none"
                stroke={color}
                strokeOpacity="0.35"
                strokeWidth="0.8"
                style={{y: waveAmplitude}}
              />
            </svg>

            {/* Waterline */}
            <div
              className="pointer-events-none absolute left-0 right-0 z-10 h-px"
              style={{top: waterLineY}}
              aria-hidden>
              <div
                className="h-px w-full"
                style={{
                  background: `linear-gradient(to right, transparent, ${color}60, transparent)`,
                }}
              />
            </div>

            {/* Ripples */}
            <motion.div
              aria-hidden
              style={{
                scale: rippleScale,
                opacity: rippleOpacity,
                top: waterLineY,
              }}
              className="pointer-events-none absolute left-1/2 z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-laurel-500/50"
            />
            <motion.div
              aria-hidden
              style={{
                scale: ripple2Scale,
                opacity: ripple2Opacity,
                top: waterLineY,
              }}
              className="pointer-events-none absolute left-1/2 z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-laurel-500/30"
            />
            <motion.div
              aria-hidden
              style={{
                scale: ripple3Scale,
                opacity: ripple3Opacity,
                top: waterLineY,
              }}
              className="pointer-events-none absolute left-1/2 z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-laurel-500/20"
            />

            {/* Below water — reflective wordmark */}
            <div
              className="absolute bottom-10 left-1/2 z-0 -translate-x-1/2 select-none text-center"
              aria-hidden
              style={{
                opacity: 0.15,
                transform: 'translateX(-50%) scaleY(-1)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 0%, black 100%)',
                maskImage:
                  'linear-gradient(to bottom, transparent 0%, black 100%)',
              }}>
              <p
                className="font-serif text-3xl leading-tight font-semibold tracking-tight"
                style={{color}}>
                Khalai Studio
              </p>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-4 left-0 right-0 z-20 text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/40">
                Made by hand
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
