'use client';

import {useRef} from 'react';
import {useScroll} from 'motion/react';
import {
  RevealBlock,
  RotateBlock,
  DrawBlock,
  TypeBlock,
  DriftBlockA,
  DriftBlockB,
} from '../../[locale]/creativity/animations';

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
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={ref}
      id={id}
      className="relative h-[150vh] scroll-mt-24"
      aria-label={label}>
      <div
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 md:px-16"
        style={{
          background: `radial-gradient(60% 50% at 50% 50%, ${color}10, transparent 70%)`,
        }}>
        {children(scrollYProgress)}
      </div>
    </section>
  );
}

export function LandingStage() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-16">
        <p className="text-xs uppercase tracking-[0.3em] text-laurel-700 dark:text-laurel-300">
          From a line to a button
        </p>
        <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] md:text-5xl">
          Six steps, in this order, every time.
        </h2>
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

      <div className="mx-auto max-w-5xl px-6 py-16 md:px-16">
        <p className="max-w-xl text-base leading-relaxed text-foreground/70">
          The method is the same on every project. What changes is the content,
          the constraints, and the length of the scroll.
        </p>
      </div>
    </div>
  );
}
