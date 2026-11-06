'use client';

import {useEffect, useRef, useState} from 'react';
import {
  motion,
  useScroll,
  //useTransform,
  //useMotionValueEvent,
  useInView,
} from 'motion/react';
import {
  RevealBlock,
  RotateBlock,
  DrawBlock,
  TypeBlock,
  DriftBlockA,
  DriftBlockB,
} from './creativity/animations';

const COLORS = {
  block1: '#059f00',
  block2: '#006600',
  block3: '#0ad300',
  block4: '#11ff00',
  block5: '#15ff00',
  block6: '#059f00',
} as const;

type BlockProps = {
  id: string;
  label: string;
  color: string;
  children: (
    progress: ReturnType<typeof useScroll>['scrollYProgress']
  ) => React.ReactNode;
};

function StageBlock({id, label, color, children}: BlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  return (
    <section
      ref={ref}
      id={id}
      className="relative h-[150vh] scroll-mt-32"
      aria-label={label}>
      <div
        className="sticky top-20 flex h-screen items-center justify-center overflow-hidden px-6 md:px-0"
        style={{
          background: `radial-gradient(60% 50% at 50% 50%, ${color}10, transparent 70%)`,
        }}>
        {children(scrollYProgress)}
      </div>
    </section>
  );
}

function GlitchHeading({children}: {children: React.ReactNode}) {
  return (
    <motion.h2
      className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] md:text-5xl"
      animate={{
        textShadow: [
          '2px 0 #c9613f, -2px 0 #0ad300',
          '-2px 0 #c9613f, 2px 0 #0ad300',
          '2px 0 #c9613f, -2px 0 #0ad300',
          'none',
          'none',
          'none',
          '2px 0 #c9613f, -2px 0 #0ad300',
          'none',
        ],
        x: [0, -2, 2, -1, 0, 0, 2, 0],
      }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        times: [0, 0.02, 0.04, 0.06, 0.3, 0.7, 0.85, 1],
        ease: 'easeInOut',
      }}>
      {children}
    </motion.h2>
  );
}

/**
 * Closing paragraph — types itself as the user scrolls near the end.
 * Key words are coloured from the palette.
 */

function TypedClosing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {amount: 0.3, once: false});

  const segments = [
    {text: 'The ', color: undefined},
    {text: 'method', color: 'var(--color-primary)'},
    {
      text: ' is the same on every project. What changes is the ',
      color: undefined,
    },
    {text: 'content', color: 'var(--color-secondary)'},
    {text: ', the constraints, and the length of the ', color: undefined},
    {text: 'scroll', color: 'var(--color-accent)'},
    {text: '.', color: undefined},
  ];

  const fullLength = segments.reduce((sum, s) => sum + s.text.length, 0);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    // Defer all setState calls out of the effect body.
    // The zero-delay timer ensures React has finished the current
    // render cycle before we start updating state.
    const start = setTimeout(() => {
      if (cancelled) return;

      if (!inView) {
        // Reset when the paragraph leaves the viewport
        setVisible(0);
        return;
      }

      // Start typing from the beginning on entry
      setVisible(0);
      let i = 0;

      intervalId = setInterval(() => {
        i++;
        setVisible(i);
        if (i >= fullLength && intervalId) {
          clearInterval(intervalId);
        }
      }, 35);
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(start);
      if (intervalId) clearInterval(intervalId);
    };
  }, [inView, fullLength]);

  const done = visible >= fullLength;

  let cursor = 0;
  return (
    <div
      ref={ref}
      className="mx-auto max-w-5xl px-6 py-16 md:px-16">
      <p className="max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
        {segments.map((seg, i) => {
          const start = cursor;
          const end = cursor + seg.text.length;
          cursor = end;

          // Skip segments entirely beyond the visible count
          if (start >= visible) return null;

          // Partial reveal for the segment we're currently typing
          const visibleChars = Math.min(seg.text.length, visible - start);
          const visibleText = seg.text.slice(0, visibleChars);

          return (
            <span
              key={i}
              style={seg.color ? {color: seg.color} : undefined}>
              {visibleText}
            </span>
          );
        })}

        {/* Blinking cursor — pulses while typing, dims when done */}
        <span
          className={`inline-block w-[0.55ch] align-baseline ${
            done ? 'bg-foreground/30' : 'animate-pulse bg-foreground'
          }`}
          style={{
            height: '1em',
            transform: 'translateY(0.15em)',
          }}
          aria-hidden
        />
      </p>
    </div>
  );
}

export function LandingStage() {
  return (
    <div className="relative bg-inherit">
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-8">
        <GlitchHeading>Six steps, in this order, every time.</GlitchHeading>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/70">
          Scroll through the sequence — each chapter is the argument for the
          next one. Guides first, then grid, layout, type, colour, and finally
          code. Nothing skipped, nothing invented.
        </p>
      </div>

      {/* 01 · Reveal */}
      <StageBlock
        id="stage-reveal"
        label="Chapter 01 — Lines first"
        color={COLORS.block1}>
        {(progress) => (
          <RevealBlock
            progress={progress}
            color={COLORS.block1}
          />
        )}
      </StageBlock>

      {/* 02 · Rotate */}
      <StageBlock
        id="stage-rotate"
        label="Chapter 02 — A grid to hold it"
        color={COLORS.block2}>
        {(progress) => (
          <RotateBlock
            progress={progress}
            color={COLORS.block2}
          />
        )}
      </StageBlock>

      {/* 03 · Draw */}
      <StageBlock
        id="stage-draw"
        label="Chapter 03 — A layout"
        color={COLORS.block3}>
        {(progress) => (
          <DrawBlock
            progress={progress}
            color={COLORS.block3}
          />
        )}
      </StageBlock>

      {/* 04 · Type */}
      <StageBlock
        id="stage-type"
        label="Chapter 04 — Type, chosen for the job"
        color={COLORS.block4}>
        {(progress) => (
          <TypeBlock
            progress={progress}
            color={COLORS.block4}
          />
        )}
      </StageBlock>

      {/* 05 · Drift A */}
      <StageBlock
        id="stage-drift-a"
        label="Chapter 05 — One colour that earns its place"
        color={COLORS.block5}>
        {(progress) => (
          <DriftBlockA
            progress={progress}
            color={COLORS.block5}
          />
        )}
      </StageBlock>

      {/* 06 · Drift B */}
      <StageBlock
        id="stage-drift-b"
        label="Chapter 06 — Hand-written code"
        color={COLORS.block6}>
        {(progress) => (
          <DriftBlockB
            progress={progress}
            color={COLORS.block6}
          />
        )}
      </StageBlock>

      <TypedClosing />
    </div>
  );
}
