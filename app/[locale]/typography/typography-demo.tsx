'use client';

import {useEffect, useRef, useState} from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from 'framer-motion';
import styles from './typography.module.css';

export type Sections = {
  kicker: string;
  title: string;
  body: string;

  // ── Chapter 1 · Arrival ───────────────────────────
  scrolly: {title: string; words: string[]};
  masked: {title: string; shimmer: string; image: string};

  // ── Chapter 2 · Reveal ────────────────────────────
  typewriter: {title: string; phrase: string};
  kinetic: {title: string; words: string[]};
  variable: {title: string; sample: string; hint: string};

  // ── Chapter 3 · Play ──────────────────────────────
  shadow: {title: string; sample: string};
  burst: {title: string; word: string; hint: string};
  glitch: {title: string; sample: string};
  splitFlap: {title: string; sample: string};
  magnetic: {title: string; sample: string};

  // ── Chapter 4 · Deform ────────────────────────────
  melt: {title: string; sample: string};
  spin: {title: string; sample: string};
  wave: {title: string; sample: string};
  slice: {title: string; sample: string};
  stretch: {title: string; sample: string};

  // ── Chapter 5 · Merge ─────────────────────────────
  join: {title: string; left: string; right: string};
  gooey: {title: string; phrase: string};
  reflection: {title: string; sample: string};
  outlineFill: {title: string; sample: string};

  // ── Chapter 6 · Ambient ───────────────────────────
  spotlight: {title: string; sample: string};
  stagger: {title: string; sample: string};
  bounce: {title: string; sample: string};
  inkBleed: {title: string; sample: string};
  zoomThrough: {title: string; sample: string};
  typeCycle: {title: string; phrases: string[]};
  colorFill: {title: string; sample: string};

  // ── Chapter 7 · Frame ─────────────────────────────
  frame: {title: string; caption: string; image: string};
  editor: {title: string; caption: string};
};

export default function TypographyDemo({sections}: {sections: Sections}) {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-32 pt-20 md:px-16">
      <Hero
        kicker={sections.kicker}
        title={sections.title}
        body={sections.body}
      />

      {/* ── Chapter 1 · Arrival ─────────────────────────── */}
      <ChapterDivider label="01 · Arrival" />
      <div className="mt-12 space-y-32 md:mt-16 md:space-y-40">
        <ScrollyText data={sections.scrolly} />
        <MaskedText data={sections.masked} />
      </div>

      {/* ── Chapter 2 · Reveal ──────────────────────────── */}
      <ChapterDivider label="02 · Reveal" />
      <div className="mt-12 space-y-24 md:mt-16 md:space-y-32">
        <Typewriter data={sections.typewriter} />
        <KineticMarquee data={sections.kinetic} />
        <VariableFont data={sections.variable} />
      </div>

      {/* ── Chapter 3 · Play ────────────────────────────── */}
      <ChapterDivider label="03 · Play" />
      <div className="mt-12 space-y-28 md:mt-16 md:space-y-36">
        <DancingShadow data={sections.shadow} />
        <LetterBurst data={sections.burst} />
        <GlitchText data={sections.glitch} />
        <SplitFlap data={sections.splitFlap} />
      </div>

      {/* ── Chapter 4 · Deform ──────────────────────────── */}
      <ChapterDivider label="04 · Deform" />
      <div className="mt-12 space-y-28 md:mt-16 md:space-y-36">
        <MeltingText data={sections.melt} />
        <Spin3D data={sections.spin} />
        <WavyText data={sections.wave} />
        <Slice data={sections.slice} />
        <Stretch data={sections.stretch} />
      </div>

      {/* ── Chapter 5 · Merge ───────────────────────────── */}
      <ChapterDivider label="05 · Merge" />
      <div className="mt-12 space-y-28 md:mt-16 md:space-y-36">
        <JoinText data={sections.join} />
        <GooeyMarquee data={sections.gooey} />
        <Reflection data={sections.reflection} />
      </div>

      {/* ── Chapter 6 · Ambient ─────────────────────────── */}
      <ChapterDivider label="06 · Ambient" />
      <div className="mt-12 space-y-24 md:mt-16 md:space-y-32">
        <Spotlight data={sections.spotlight} />
        <Stagger data={sections.stagger} />
        <Bounce data={sections.bounce} />
        <InkBleed data={sections.inkBleed} />
        <ZoomThrough data={sections.zoomThrough} />
        <TypeCycle data={sections.typeCycle} />
        <ColorFill data={sections.colorFill} />
      </div>

      {/* ── Chapter 7 · Frame ───────────────────────────── */}
      <ChapterDivider label="07 · Frame" />
      <div className="mt-12 space-y-32 md:mt-16 md:space-y-40">
        <FrameRotation data={sections.frame} />
        <EditorIllustration data={sections.editor} />
      </div>
    </main>
  );
}

function ChapterDivider({label}: {label: string}) {
  return (
    <div className="mt-32 flex items-center gap-4 md:mt-40">
      <span className="h-px flex-1 bg-foreground/10" />
      <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/40">
        {label}
      </span>
      <span className="h-px flex-1 bg-foreground/10" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO — letters flip up
   ═══════════════════════════════════════════════════════════════ */

function Hero({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <header className="max-w-3xl">
      <motion.p
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.6}}
        className="text-xs uppercase tracking-[0.3em] text-laurel-700 dark:text-laurel-300">
        {kicker}
      </motion.p>
      <h1 className="mt-4 font-serif text-6xl leading-[1.02] md:text-8xl">
        {Array.from(title).map((char, i) => (
          <motion.span
            key={i}
            initial={{opacity: 0, y: 40, rotateX: -90}}
            animate={{opacity: 1, y: 0, rotateX: 0}}
            transition={{
              delay: 0.2 + i * 0.03,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
            style={{transformOrigin: 'bottom'}}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </h1>
      <motion.p
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.8, duration: 0.8}}
        className="mt-5 text-lg leading-relaxed text-foreground/70">
        {body}
      </motion.p>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════
   1. SCROLL-DRIVEN TYPOGRAPHY
   Words scale and fade as you scroll through a tall section.
   ═══════════════════════════════════════════════════════════════ */

export function ScrollyText({data}: {data: Sections['scrolly']}) {
  const ref = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={ref}
      className="relative h-[220vh]">
      <div className="sticky top-1/2 -translate-y-1/2">
        <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
          01 · Scroll-driven
        </p>
        <div className="space-y-4">
          {data.words.map((word, i) => (
            <ScrollyWord
              key={word}
              word={word}
              progress={scrollYProgress}
              start={i / data.words.length}
              end={(i + 1) / data.words.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollyWord({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [0.1, 1, 1, 0.1]
  );
  const y = useTransform(progress, [start, end], [40, -40]);
  const x = useTransform(
    progress,
    [start, end],
    [i_(start) * 40, -i_(end) * 40]
  );

  return (
    <motion.p
      style={{opacity, y, x}}
      className="font-serif text-5xl leading-[1.05] md:text-7xl">
      {word}
    </motion.p>
  );
}

function i_(v: number) {
  return v; // helper so the transform above reads clearly
}

/* ═══════════════════════════════════════════════════════════════
   2. MASKED TEXT (shimmer + image mask)
   ═══════════════════════════════════════════════════════════════ */

export function MaskedText({data}: {data: Sections['masked']}) {
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        02 · Masked
      </p>

      <h3
        className={`font-serif text-6xl leading-[1.05] md:text-8xl ${styles.masked}`}>
        {data.shimmer}
      </h3>

      <h3
        className={`mt-10 font-serif text-6xl leading-[1.05] md:text-8xl ${styles.imageMasked}`}>
        {data.image}
      </h3>

      <p className="mt-4 text-sm text-foreground/50">{data.title}</p>
    </section>
  );
}

function Typewriter({data}: {data: Sections['typewriter']}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [text, setText] = useState('');
  const [started, setStarted] = useState(false);

  // Start (or restart) typing each time the section enters view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          setText('');
          let i = 0;
          const id = setInterval(() => {
            i++;
            setText(data.phrase.slice(0, i));
            if (i >= data.phrase.length) {
              clearInterval(id);
            }
          }, 70);
        } else if (!entry.isIntersecting && started) {
          // Reset when leaving so it can replay next time
          setStarted(false);
          setText('');
        }
      },
      {threshold: 0.4}
    );

    io.observe(el);
    return () => io.disconnect();
  }, [data.phrase, started]);

  const done = text.length >= data.phrase.length;

  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        03 · Typewriter
      </p>
      <p
        ref={ref}
        className="font-mono text-2xl text-foreground md:text-3xl">
        {text}
        {/* Cursor always visible — blinks while typing, stays solid when done */}
        <span
          className={`inline-block w-[0.55ch] bg-current align-baseline ${
            done ? '' : 'animate-pulse'
          }`}
          style={{height: '1.1em', transform: 'translateY(0.15em)'}}
          aria-hidden
        />
      </p>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. KINETIC TYPOGRAPHY LOOP (marquee)
   ═══════════════════════════════════════════════════════════════ */

function KineticMarquee({data}: {data: Sections['kinetic']}) {
  const line = [...data.words, ...data.words, ...data.words, ...data.words];
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        04 · Kinetic loop
      </p>
      <div className="overflow-hidden">
        <motion.div
          animate={{x: ['0%', '-50%']}}
          transition={{duration: 22, repeat: Infinity, ease: 'linear'}}
          className="flex shrink-0 gap-12 whitespace-nowrap">
          {line.map((word, i) => (
            <span
              key={i}
              className="font-serif text-5xl text-foreground/80 md:text-7xl">
              {word} <span className="text-laurel-500">·</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. VARIABLE FONT MANIPULATION (mouse-driven)
   Uses CSS variables to alter font-weight and letter-spacing.
   ═══════════════════════════════════════════════════════════════ */

function VariableFont({data}: {data: Sections['variable']}) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const smoothX = useSpring(x, {stiffness: 120, damping: 20});
  const smoothY = useSpring(y, {stiffness: 120, damping: 20});

  const [styles_, setStyles] = useState({w: 400, ls: 0});

  useEffect(() => {
    const unsubX = smoothX.on('change', (v) => {
      setStyles((prev) => ({...prev, w: 200 + Math.round(v * 700)}));
    });
    const unsubY = smoothY.on('change', (v) => {
      setStyles((prev) => ({...prev, ls: (v - 0.5) * 20}));
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [smoothX, smoothY]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        05 · Variable font
      </p>
      <div
        onMouseMove={onMove}
        onMouseLeave={() => {
          x.set(0.5);
          y.set(0.5);
        }}
        className="flex h-72 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/2">
        <span
          className="select-none font-sans text-4xl text-foreground md:text-6xl"
          style={{
            fontWeight: styles_.w,
            letterSpacing: `${styles_.ls}px`,
            transition: 'font-weight 0.15s linear',
          }}>
          {data.sample}
        </span>
      </div>
      <p className="mt-3 text-xs text-foreground/50">{data.hint}</p>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2 (duplicate). DANCING SHADOW
   ═══════════════════════════════════════════════════════════════ */

function DancingShadow({data}: {data: Sections['shadow']}) {
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        06 · Dancing shadow
      </p>
      <div className="flex justify-center py-12">
        <motion.span
          animate={{
            textShadow: [
              '4px 4px 0 #c9613f, 8px 8px 0 #c8ff01',
              '12px 6px 0 #c9613f, -4px 8px 0 #15ff00',
              '-6px 8px 0 #c9613f, 10px -4px 0 #c8ff01',
              '4px 4px 0 #c9613f, 8px 8px 0 #c8ff01',
            ],
          }}
          transition={{duration: 4, repeat: Infinity, ease: 'easeInOut'}}
          className="font-serif text-6xl text-foreground md:text-8xl">
          {data.sample}
        </motion.span>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPLOSIVE LETTER BURST ON HOVER
   ═══════════════════════════════════════════════════════════════ */

function LetterBurst({data}: {data: Sections['burst']}) {
  const letters = Array.from(data.word);
  // Deterministic pseudo-random: golden-angle spiral, seeded by index.
  // Same visual (scattered fan) but no runtime randomness — safe in render.
  const GOLDEN = 2.399963; // π * (3 - √5)

  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        07 · Letter burst · hover
      </p>
      <div className="flex h-56 items-center justify-center">
        <div className="flex cursor-pointer">
          {letters.map((char, i) => {
            const angle = i * GOLDEN;
            const dist = 70 + (i % 3) * 15; // 70, 85, 100 — deterministic variation
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist;
            const rotate = ((i * 37) % 120) - 60; // -60 → +60

            return (
              <motion.span
                key={i}
                whileHover={{
                  x: tx,
                  y: ty,
                  rotate,
                  scale: 1.4,
                  color: ['#c9613f', '#c8ff01', '#15ff00'][i % 3],
                }}
                transition={{type: 'spring', stiffness: 300, damping: 15}}
                className="inline-block font-serif text-6xl text-foreground md:text-8xl">
                {char}
              </motion.span>
            );
          })}
        </div>
      </div>
      <p className="text-xs text-foreground/50 text-center">{data.hint}</p>
    </section>
  );
}
/* ═══════════════════════════════════════════════════════════════
   MELTING TEXT
   ═══════════════════════════════════════════════════════════════ */

function MeltingText({data}: {data: Sections['melt']}) {
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        08 · Melting
      </p>
      <div className="flex h-64 items-center justify-center">
        <span
          className={`font-serif text-6xl md:text-8xl text-foreground ${styles.melt}`}>
          {data.sample}
        </span>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3D SPIN
   ═══════════════════════════════════════════════════════════════ */

function Spin3D({data}: {data: Sections['spin']}) {
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        09 · 3D spin
      </p>
      <div
        className="flex h-56 items-center justify-center"
        style={{perspective: 800}}>
        <span
          className={`font-serif text-6xl md:text-8xl text-laurel-700 dark:text-laurel-300 ${styles.spin3d}`}>
          {data.sample}
        </span>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WAVY TEXT
   ═══════════════════════════════════════════════════════════════ */

function WavyText({data}: {data: Sections['wave']}) {
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        10 · Wavy
      </p>
      <div className="flex h-56 items-center justify-center overflow-hidden">
        <span className="font-serif text-6xl md:text-8xl text-foreground">
          {Array.from(data.sample).map((char, i) => (
            <span
              key={i}
              className={styles.waveChar}
              style={{animationDelay: `${i * 0.08}s`}}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   JOIN TEXT (split words slide in and merge)
   ═══════════════════════════════════════════════════════════════ */

function JoinText({data}: {data: Sections['join']}) {
  const [joined, setJoined] = useState(false);

  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        11 · Join
      </p>
      <div
        onMouseEnter={() => setJoined(true)}
        onMouseLeave={() => setJoined(false)}
        className="flex h-56 items-center justify-center cursor-pointer overflow-hidden">
        <div className="relative flex items-center gap-2">
          <motion.span
            animate={{
              x: joined ? 0 : -180,
              opacity: joined ? 1 : 0.3,
            }}
            transition={{type: 'spring', stiffness: 220, damping: 22}}
            className="font-serif text-5xl md:text-7xl text-foreground">
            {data.left}
          </motion.span>

          <motion.span
            animate={{
              width: joined ? 0 : 24,
              opacity: joined ? 0 : 1,
            }}
            className="h-1 bg-laurel-500"
          />

          <motion.span
            animate={{
              x: joined ? 0 : 180,
              opacity: joined ? 1 : 0.3,
            }}
            transition={{type: 'spring', stiffness: 220, damping: 22}}
            className="font-serif text-5xl md:text-7xl text-laurel-700 dark:text-laurel-300">
            {data.right}
          </motion.span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GOOEY MARQUEE
   Text melts out of one wall and into the other via SVG filter.
   ═══════════════════════════════════════════════════════════════ */

function GooeyMarquee({data}: {data: Sections['gooey']}) {
  const phrase = data.phrase;
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        12 · Gooey marquee
      </p>

      {/* The SVG filter that creates the gooey effect */}
      <svg
        width="0"
        height="0"
        aria-hidden
        className="absolute">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="8"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="goo"
            />
            <feBlend
              in="SourceGraphic"
              in2="goo"
            />
          </filter>
        </defs>
      </svg>

      <div className={`relative overflow-hidden py-10 ${styles.gooey}`}>
        {/* Glowing walls */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-linear-to-r from-background via-background/90 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-linear-to-l from-background via-background/90 to-transparent z-10" />

        <motion.div
          animate={{x: ['0%', '-50%']}}
          transition={{duration: 14, repeat: Infinity, ease: 'linear'}}
          className="flex shrink-0 whitespace-nowrap">
          {[0, 1, 2, 3].map((g) => (
            <span
              key={g}
              className="mx-8 font-serif text-5xl md:text-7xl text-laurel-700 dark:text-laurel-300">
              {phrase} · {phrase} ·&nbsp;
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FRAME ROTATION — text orbits a picture frame
   ═══════════════════════════════════════════════════════════════ */

function FrameRotation({data}: {data: Sections['frame']}) {
  const [hovered, setHovered] = useState(false);

  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        13 · Frame rotation
      </p>

      <div className="flex justify-center py-12">
        <div
          className={styles.frame}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>
          {/* Rotating text ring */}
          <div className={styles.frameRotation}>
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full">
              <defs>
                <path
                  id="textcircle"
                  d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                />
              </defs>
              <text
                className="fill-current font-mono text-[6px] tracking-widest"
                style={{color: 'var(--color-laurel-500)'}}>
                <textPath href="#textcircle">
                  KHALAI · STUDIO · NAIROBI · TYPE IS ATTITUDE ·&nbsp;
                </textPath>
              </text>
            </svg>
          </div>

          {/* Center image */}
          <div className="absolute inset-8 overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-r.png"
              alt={data.caption}
              className={`h-full w-full object-cover transition-all duration-700 ${
                hovered
                  ? 'scale-110 grayscale-0 saturate-125'
                  : 'scale-100 grayscale'
              }`}
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-foreground/50 text-center">{data.caption}</p>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EDITOR ILLUSTRATION — animated skeleton of an editor
   ═══════════════════════════════════════════════════════════════ */

function EditorIllustration({data}: {data: Sections['editor']}) {
  const code = `// editorial.tsx
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

  // Simple token splitter — keywords, strings, JSX tags, punctuation.
  // Runs on the *full* code once, then we reveal it progressively.
  const tokens = tokenize(code);
  const totalChars = code.length;

  // Reveal progress 0 → 1 as the user scrolls through this section
  const ref = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.35'],
  });
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setVisibleChars(Math.round(v * totalChars));
    });
    return () => unsub();
  }, [scrollYProgress, totalChars]);

  const doneTyping = visibleChars >= totalChars;

  return (
    <section ref={ref}>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        14 · Editor
      </p>

      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/2">
        {/* Chrome */}
        <div className="flex items-center gap-2 border-b border-foreground/10 px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-secondary/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-laurel-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-laurel-700/70" />
          <span className="ml-3 font-mono text-[10px] text-foreground/40">
            editorial.tsx
          </span>
          <span className="ml-auto font-mono text-[10px] text-foreground/30">
            {Math.min(visibleChars, totalChars)} / {totalChars}
          </span>
        </div>

        {/* Code body with line numbers */}
        <div className="flex">
          <div className="select-none border-r border-foreground/5 px-3 py-5 text-right font-mono text-[11px] leading-relaxed text-foreground/25">
            {code.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          <pre className="flex-1 overflow-x-auto px-4 py-5 font-mono text-[12px] leading-relaxed text-foreground md:text-[13px]">
            <code>
              {tokens.map((tok, i) => {
                // Reveal tokens up to `visibleChars` — each token has a
                // pre-computed cumulative offset, so this stays O(n) per render.
                if (tok.start >= visibleChars) return null;
                const sliceEnd = Math.min(tok.end, visibleChars);
                const visibleText = code.slice(tok.start, sliceEnd);
                return (
                  <span
                    key={i}
                    className={tok.className}>
                    {visibleText}
                  </span>
                );
              })}

              {/* Blinking cursor sits after the last revealed character */}
              <span
                className={`inline-block w-[0.55ch] bg-foreground align-baseline ${
                  doneTyping ? 'animate-pulse' : ''
                }`}
                style={{
                  height: '1.1em',
                  transform: 'translateY(0.15em)',
                }}
                aria-hidden
              />
            </code>
          </pre>
        </div>
      </div>

      <p className="mt-4 text-xs text-foreground/50 text-center">
        {data.caption}
      </p>
    </section>
  );
}

/* ── Minimal syntax tokenizer ─────────────────────────────────
   Not a full parser — just enough to color:
   keywords, strings, comments, JSX tags, punctuation.
   Everything else falls through as plain foreground. */

type Token = {
  start: number; // inclusive offset in the source string
  end: number; // exclusive
  className: string;
};

function tokenize(src: string): Token[] {
  const tokens: Token[] = [];

  // Ordered list — first match at a position wins
  const patterns: {re: RegExp; className: string}[] = [
    // Comments
    {re: /\/\/[^\n]*/y, className: 'text-foreground/40 italic'},
    // Strings (double or single)
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
    // Keywords
    {
      re: /\b(?:import|from|export|default|function|return|const|let|var|if|else|new|class|extends|async|await|type|interface)\b/y,
      className: 'text-secondary',
    },
    // JSX tags + component names (capitalized identifiers)
    {re: /<\/?[A-Z][A-Za-z0-9.]*/y, className: 'text-laurel-500'},
    // Numbers
    {
      re: /\b\d+(?:\.\d+)?\b/y,
      className: 'text-laurel-600 dark:text-laurel-400',
    },
    // Punctuation
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
      // Plain character — advance by one, but batch consecutive plain
      // characters so the token list doesn't explode for long runs.
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

function GlitchText({data}: {data: {sample: string}}) {
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        15 · Glitch
      </p>
      <div className="flex h-56 items-center justify-center">
        <motion.span
          className="relative font-mono text-6xl md:text-8xl text-foreground"
          animate={{
            textShadow: [
              '2px 0 #c9613f, -2px 0 #15ff00',
              '-2px 0 #c9613f, 2px 0 #15ff00',
              '2px 0 #c9613f, -2px 0 #15ff00',
              'none',
              'none',
              '2px 0 #c9613f, -2px 0 #15ff00',
              'none',
            ],
            x: [0, -2, 2, -1, 0, 2, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            times: [0, 0.1, 0.2, 0.3, 0.6, 0.8, 1],
          }}>
          {data.sample}
        </motion.span>
      </div>
    </section>
  );
}

function SplitFlap({data}: {data: Sections['splitFlap']}) {
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        16 · Split-flap
      </p>
      <div className="flex h-56 items-center justify-center gap-1">
        {Array.from(data.sample).map((char, i) => (
          <motion.span
            key={i}
            animate={{rotateX: [90, 0]}}
            transition={{
              duration: 0.3,
              delay: i * 0.06,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="inline-block rounded bg-foreground/5 px-3 py-2 font-mono text-4xl text-foreground md:text-6xl"
            style={{transformOrigin: 'center', perspective: 400}}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function Spotlight({data}: {data: {sample: string}}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({x: -200, y: -200});

  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        18 · Spotlight
      </p>
      <div
        ref={ref}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPos({x: e.clientX - r.left, y: e.clientY - r.top});
        }}
        onMouseLeave={() => setPos({x: -200, y: -200})}
        className="flex h-56 items-center justify-center overflow-hidden">
        <span
          className="font-serif text-6xl text-foreground/10 md:text-8xl"
          style={{
            WebkitMaskImage: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, black 0%, transparent 100%)`,
            maskImage: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, black 0%, transparent 100%)`,
          }}>
          {data.sample}
        </span>
      </div>
    </section>
  );
}

function Stagger({data}: {data: {sample: string}}) {
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        19 · Stagger
      </p>
      <div className="flex h-56 items-center justify-center">
        {Array.from(data.sample).map((char, i) => (
          <motion.span
            key={i}
            initial={{opacity: 0, y: 20, rotate: -20}}
            whileInView={{opacity: 1, y: 0, rotate: 0}}
            viewport={{once: true}}
            transition={{
              delay: i * 0.06,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block font-serif text-6xl text-foreground md:text-8xl">
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function TypeCycle({data}: {data: Sections['typeCycle']}) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting'>(
    'typing'
  );

  useEffect(() => {
    const phrase = data.phrases[phraseIndex];

    if (phase === 'typing') {
      if (text.length < phrase.length) {
        const id = setTimeout(
          () => setText(phrase.slice(0, text.length + 1)),
          60
        );
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setPhase('holding'), 1500);
      return () => clearTimeout(id);
    }

    if (phase === 'holding') {
      const id = setTimeout(() => setPhase('deleting'), 100);
      return () => clearTimeout(id);
    }

    // phase === 'deleting'
    if (text.length > 0) {
      const id = setTimeout(() => setText(text.slice(0, -1)), 30);
      return () => clearTimeout(id);
    }

    // Nothing left to delete — advance to next phrase on the next tick.
    // Using setTimeout avoids setState synchronously inside the effect.
    const id = setTimeout(() => {
      setPhraseIndex((phraseIndex + 1) % data.phrases.length);
      setPhase('typing');
    }, 0);
    return () => clearTimeout(id);
  }, [text, phase, phraseIndex, data.phrases]);

  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        20 · Type cycle
      </p>
      <div className="flex h-56 items-center justify-center">
        <p className="font-mono text-3xl text-foreground md:text-4xl">
          {text}
          <span
            className="ml-1 inline-block w-[0.55ch] animate-pulse bg-current align-baseline"
            style={{height: '1em'}}
            aria-hidden
          />
        </p>
      </div>
    </section>
  );
}
function Bounce({data}: {data: {sample: string}}) {
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        21 · Bounce
      </p>
      <div className="flex h-56 items-end justify-center">
        {Array.from(data.sample).map((char, i) => (
          <motion.span
            key={i}
            initial={{y: -100, opacity: 0}}
            whileInView={{y: 0, opacity: 1}}
            viewport={{once: true}}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 12,
              delay: i * 0.08,
            }}
            className="inline-block font-serif text-6xl text-foreground md:text-8xl">
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function InkBleed({data}: {data: {sample: string}}) {
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        22 · Ink bleed
      </p>
      <div className="flex h-56 items-center justify-center">
        {Array.from(data.sample).map((char, i) => (
          <motion.span
            key={i}
            initial={{opacity: 0, filter: 'blur(20px)', scale: 1.3}}
            whileInView={{opacity: 1, filter: 'blur(0px)', scale: 1}}
            viewport={{once: true}}
            transition={{
              duration: 1.2,
              delay: i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block font-serif text-6xl text-foreground md:text-8xl">
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function ZoomThrough({data}: {data: {sample: string}}) {
  const [hovered, setHovered] = useState(false);
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        23 · Zoom-through
      </p>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex h-56 cursor-pointer items-center justify-center overflow-hidden">
        {Array.from(data.sample).map((char, i) => (
          <motion.span
            key={i}
            animate={{
              scale: hovered ? [1, 3, 1] : 1,
              opacity: hovered ? [1, 0, 1] : 1,
            }}
            transition={{
              duration: 0.9,
              delay: i * 0.05,
              times: [0, 0.5, 1],
            }}
            className="inline-block font-serif text-6xl text-foreground md:text-8xl">
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function Reflection({data}: {data: {sample: string}}) {
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        24 · Reflection
      </p>
      <div className="flex h-56 flex-col items-center justify-center">
        <p className="font-serif text-6xl text-foreground md:text-8xl">
          {data.sample}
        </p>
        <p
          aria-hidden
          className="select-none font-serif text-6xl text-foreground md:text-8xl"
          style={{
            transform: 'scaleY(-1)',
            opacity: 0.15,
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
            marginTop: '-1em',
          }}>
          {data.sample}
        </p>
      </div>
    </section>
  );
}

function Stretch({data}: {data: {sample: string}}) {
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        26 · Stretch
      </p>
      <div className="flex h-56 items-center justify-center">
        {Array.from(data.sample).map((char, i) => (
          <motion.span
            key={i}
            animate={{
              scaleX: [1, 1.6, 1],
              scaleY: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.08,
              ease: 'easeInOut',
            }}
            className="inline-block font-serif text-6xl text-foreground md:text-8xl"
            style={{transformOrigin: 'center'}}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function Slice({data}: {data: {sample: string}}) {
  return (
    <section>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        27 · Slice
      </p>
      <div className="flex h-56 items-center justify-center">
        {Array.from(data.sample).map((char, i) => (
          <span
            key={i}
            className="relative inline-block font-serif text-6xl text-foreground md:text-8xl">
            <span className="relative z-10">
              {char === ' ' ? '\u00A0' : char}
            </span>
            <motion.span
              className="absolute inset-x-0 top-1/2 z-0 h-[0.1em] -translate-y-1/2 bg-laurel-500"
              animate={{
                scaleY: [0, 15, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                repeatDelay: 2,
              }}
            />
          </span>
        ))}
      </div>
    </section>
  );
}

function ColorFill({data}: {data: {sample: string}}) {
  const ref = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.5'],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
  );

  return (
    <section ref={ref}>
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        28 · Scroll color fill
      </p>
      <div className="relative flex h-56 items-center justify-center">
        <span className="font-serif text-6xl text-foreground/15 md:text-8xl">
          {data.sample}
        </span>
        <motion.span
          style={{clipPath}}
          className="absolute font-serif text-6xl text-laurel-700 md:text-8xl dark:text-laurel-300">
          {data.sample}
        </motion.span>
      </div>
    </section>
  );
}
