'use client';

import {useRef, useState} from 'react';
import {useMotionValueEvent, useScroll} from 'motion/react';
import {ProgressClock} from './progress-clock';
import {ChapterMark} from './chapter-mark';
import {TransitionOverlay} from './transitions';
import {
  RevealBlock,
  RotateBlock,
  DrawBlock,
  TypeBlock,
  DriftBlockA,
  DriftBlockB,
} from './animations';
import {Snake} from './snake';
import {ThankYouCard} from '@/components/thank-you-card';

/**
 * Chapter colors drawn from the Japanese-laurel palette
 * (see globals.css → --color-laurel-*).
 *
 * 01 Reveal  — laurel-700 (grounded, ink-like)
 * 02 Rotate  — laurel-900 (deep, structural)
 * 03 Draw    — laurel-600 (brighter, mid-process)
 * 04 Type    — laurel-500 (peak saturation)
 * 05 Drift   — laurel-400 (energetic, almost glowing)
 * 06 Return  — laurel-700 (settles back to ink)
 *
 * The ramp 700 → 900 → 600 → 500 → 400 → 700 gives a
 * "settle · deepen · rise · peak · glow · settle" arc.
 */
const COLORS = {
  block1: '#059f00', // laurel-700
  block2: '#006600', // laurel-900
  block3: '#0ad300', // laurel-600
  block4: '#11ff00', // laurel-500
  block5: '#15ff00', // laurel-400
  block6: '#059f00', // laurel-700
} as const;

const CHAPTER_LABELS = [
  'Reveal',
  'Rotate',
  'Draw',
  'Type',
  'Drift',
  'Return',
] as const;

export function CreativityStage() {
  const {scrollYProgress: overallProgress} = useScroll();

  const [showThanks, setShowThanks] = useState(false);
  useMotionValueEvent(overallProgress, 'change', (v) => {
    setShowThanks(v >= 0.98);
  });

  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);
  const block4Ref = useRef<HTMLDivElement>(null);
  const block5Ref = useRef<HTMLDivElement>(null);
  const block6Ref = useRef<HTMLDivElement>(null);

  const {scrollYProgress: block1Progress} = useScroll({
    target: block1Ref,
    offset: ['start start', 'end end'],
  });
  const {scrollYProgress: block2Progress} = useScroll({
    target: block2Ref,
    offset: ['start start', 'end end'],
  });
  const {scrollYProgress: block3Progress} = useScroll({
    target: block3Ref,
    offset: ['start start', 'end end'],
  });
  const {scrollYProgress: block4Progress} = useScroll({
    target: block4Ref,
    offset: ['start start', 'end end'],
  });
  const {scrollYProgress: block5Progress} = useScroll({
    target: block5Ref,
    offset: ['start start', 'end end'],
  });
  const {scrollYProgress: block6Progress} = useScroll({
    target: block6Ref,
    offset: ['start start', 'end end'],
  });

  return (
    <div className="relative">
      {/* Fixed clock — desktop, left center */}
      <div className="fixed bottom-8 left-6 z-40 hidden -translate-y-1/2 md:block">
        <ProgressClock
          progress={overallProgress}
          size={140}
        />
      </div>
      {/* Fixed clock — mobile, top right */}
      <div className="fixed bottom-1/2 left-4 z-40 md:hidden">
        <ProgressClock
          progress={overallProgress}
          size={56}
        />
      </div>

      {/* Chapter label */}
      <ChapterMark
        progress={overallProgress}
        labels={CHAPTER_LABELS}
      />

      <Snake
        progress={overallProgress}
        color={COLORS.block6}
      />

      {/* Boundary sweeps */}
      <TransitionOverlay progress={overallProgress} />

      {/* ─── Block 1 · Reveal · laurel-700 ─────────────────── */}
      <section
        ref={block1Ref}
        className="relative h-[280vh]">
        <div
          className="sticky top-0 flex h-screen items-center justify-center px-6 md:pl-48"
          style={{
            background: `radial-gradient(60% 50% at 50% 50%, ${COLORS.block1}10, transparent 70%)`,
          }}>
          <RevealBlock
            progress={block1Progress}
            color={COLORS.block1}
          />
        </div>
      </section>

      {/* ─── Block 2 · Rotate · laurel-900 ─────────────────── */}
      <section
        ref={block2Ref}
        className="relative h-[280vh]">
        <div
          className="sticky top-0 flex h-screen items-center justify-center px-6 md:pl-48"
          style={{
            background: `radial-gradient(60% 50% at 50% 50%, ${COLORS.block2}10, transparent 70%)`,
          }}>
          <RotateBlock
            progress={block2Progress}
            color={COLORS.block2}
          />
        </div>
      </section>

      {/* ─── Block 3 · Draw · laurel-600 ───────────────────── */}
      <section
        ref={block3Ref}
        className="relative h-[280vh]">
        <div
          className="sticky top-0 flex h-screen items-center justify-center px-6 md:pl-48"
          style={{
            background: `radial-gradient(60% 50% at 50% 50%, ${COLORS.block3}10, transparent 70%)`,
          }}>
          <DrawBlock
            progress={block3Progress}
            color={COLORS.block3}
          />
        </div>
      </section>

      {/* ─── Block 4 · Type · laurel-500 ───────────────────── */}
      <section
        ref={block4Ref}
        className="relative h-[280vh]">
        <div
          className="sticky top-0 flex h-screen items-center justify-center px-6 md:pl-48"
          style={{
            background: `radial-gradient(60% 50% at 50% 50%, ${COLORS.block4}10, transparent 70%)`,
          }}>
          <TypeBlock
            progress={block4Progress}
            color={COLORS.block4}
          />
        </div>
      </section>

      {/* ─── Block 5 · Drift · laurel-400 (peak) ───────────── */}
      <section
        ref={block5Ref}
        className="relative h-[280vh]">
        <div
          className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 md:pl-48"
          style={{
            background: `radial-gradient(60% 50% at 50% 50%, ${COLORS.block5}20, transparent 70%)`,
          }}>
          <DriftBlockA
            progress={block5Progress}
            color={COLORS.block5}
          />
        </div>
      </section>

      {/* ─── Block 6 · Return · laurel-700 (settle) ────────── */}
      <section
        ref={block6Ref}
        className="relative h-[300vh]">
        <div
          className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 md:pl-48 md:pr-40"
          style={{
            background: `radial-gradient(60% 50% at 50% 50%, ${COLORS.block6}15, transparent 70%)`,
          }}>
          <DriftBlockB
            progress={block6Progress}
            color={COLORS.block6}
          />
        </div>
      </section>

      {/* Thank-you card, driven by overall progress */}
      <ThankYouCard
        open={showThanks}
        onClose={() => setShowThanks(false)}
      />
    </div>
  );
}
