'use client';

import {motion} from 'framer-motion';

export default function LostScene({label}: {label: string}) {
  return (
    <motion.svg
      viewBox="0 0 600 600"
      role="img"
      aria-label={label}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.6}}
      className="mx-auto w-full max-w-md">
      {/* ── Night sky ──────────────────────────────────── */}
      <rect
        width="600"
        height="600"
        rx="24"
        className="fill-laurel-100/40 dark:fill-laurel-950/60"
      />

      {/* Stars */}
      {[
        [80, 60, 0],
        [180, 40, 1.2],
        [320, 80, 0.4],
        [500, 70, 0.8],
        [540, 180, 1.6],
        [60, 200, 2.0],
        [420, 130, 0.2],
        [280, 140, 1.4],
      ].map(([cx, cy, delay], i) => (
        <motion.circle
          key={`star-${i}`}
          cx={cx}
          cy={cy}
          r={2}
          className="fill-foreground/60"
          animate={{opacity: [0.2, 1, 0.2]}}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Moon */}
      <motion.circle
        cx="480"
        cy="120"
        r="38"
        className="fill-foreground/15"
        animate={{y: [0, -3, 0]}}
        transition={{duration: 6, repeat: Infinity, ease: 'easeInOut'}}
      />
      <motion.circle
        cx="468"
        cy="110"
        r="30"
        className="fill-laurel-100/80 dark:fill-laurel-900/80"
        animate={{y: [0, -3, 0]}}
        transition={{duration: 6, repeat: Infinity, ease: 'easeInOut'}}
      />

      {/* ── Market stalls ──────────────────────────────── */}
      {[
        {x: 40, w: 90, h: 60, delay: 0},
        {x: 150, w: 110, h: 80, delay: 0.1},
        {x: 280, w: 90, h: 70, delay: 0.2},
        {x: 390, w: 120, h: 90, delay: 0.3},
        {x: 520, w: 60, h: 50, delay: 0.4},
      ].map((s, i) => (
        <motion.g
          key={`stall-${i}`}
          initial={{y: 20, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{duration: 0.6, delay: 0.3 + s.delay * 0.5}}>
          <rect
            x={s.x}
            y={360 - s.h}
            width={s.w}
            height={s.h}
            className="fill-foreground/10"
            rx="3"
          />
          <rect
            x={s.x + 12}
            y={360 - s.h + 14}
            width={s.w - 24}
            height="18"
            className="fill-laurel-500/60"
            rx="2"
          />
          <rect
            x={s.x + s.w / 2 - 8}
            y={360 - 30}
            width="16"
            height="30"
            className="fill-foreground/20"
            rx="1"
          />
        </motion.g>
      ))}

      {/* Ground */}
      <line
        x1="0"
        y1="360"
        x2="600"
        y2="360"
        className="stroke-foreground/20"
        strokeWidth="1"
        strokeDasharray="4 6"
      />

      {/* Ground reflection wash */}
      <rect
        y="360"
        width="600"
        height="240"
        className="fill-foreground/2"
      />

      {/* ── Lost character ──────────────────────────── */}
      <motion.g
        initial={{x: -40, opacity: 0}}
        animate={{x: 0, opacity: 1}}
        transition={{duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1]}}>
        <motion.g
          animate={{y: [0, -2, 0]}}
          transition={{duration: 1.4, repeat: Infinity, ease: 'easeInOut'}}>
          {/* Body */}
          <rect
            x="270"
            y="410"
            width="60"
            height="90"
            rx="28"
            className="fill-laurel-700 dark:fill-laurel-400"
          />

          {/* Head */}
          <circle
            cx="300"
            cy="395"
            r="32"
            className="fill-foreground"
          />

          {/* Eyes */}
          <motion.g
            animate={{scaleY: [1, 1, 0.1, 1]}}
            transition={{
              duration: 4,
              times: [0, 0.9, 0.95, 1],
              repeat: Infinity,
            }}
            style={{transformOrigin: '300px 393px'}}>
            <circle
              cx="288"
              cy="393"
              r="4"
              className="fill-laurel-100"
            />
            <circle
              cx="312"
              cy="393"
              r="4"
              className="fill-laurel-100"
            />
          </motion.g>

          {/* Mouth — breathing, not morphing */}
          <motion.path
            d="M 292 406 Q 300 412 308 406"
            className="stroke-laurel-100"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            animate={{scaleY: [1, 1.3, 1]}}
            transition={{duration: 3, repeat: Infinity, ease: 'easeInOut'}}
            style={{transformOrigin: '300px 406px'}}
          />

          {/* Arms */}
          <motion.line
            x1="270"
            y1="440"
            x2="240"
            y2="470"
            className="stroke-foreground"
            strokeWidth="6"
            strokeLinecap="round"
            animate={{rotate: [0, -6, 0]}}
            transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
            style={{transformOrigin: '270px 440px'}}
          />
          <motion.line
            x1="330"
            y1="440"
            x2="360"
            y2="470"
            className="stroke-foreground"
            strokeWidth="6"
            strokeLinecap="round"
            animate={{rotate: [0, 6, 0]}}
            transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
            style={{transformOrigin: '330px 440px'}}
          />

          {/* Legs */}
          <line
            x1="285"
            y1="500"
            x2="285"
            y2="540"
            className="stroke-foreground"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <line
            x1="315"
            y1="500"
            x2="315"
            y2="540"
            className="stroke-foreground"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </motion.g>
      </motion.g>

      {/* ── Broken compass ──────────────────────────── */}
      <motion.g
        initial={{opacity: 0, scale: 0}}
        animate={{opacity: 1, scale: 1}}
        transition={{
          delay: 1.6,
          duration: 0.4,
          type: 'spring',
          stiffness: 260,
        }}
        style={{transformOrigin: '240px 460px'}}>
        <circle
          cx="240"
          cy="460"
          r="12"
          className="fill-background stroke-laurel-500"
          strokeWidth="2"
        />
        <motion.path
          d="M 240 452 L 243 464 L 237 464 Z"
          className="fill-secondary"
          animate={{rotate: [0, 180, 360, 180, 0]}}
          transition={{duration: 4, repeat: Infinity, ease: 'easeInOut'}}
          style={{transformOrigin: '240px 460px'}}
        />
      </motion.g>

      {/* ── Floating question marks ──────────────────── */}
      {[0, 1, 2].map((i) => (
        <motion.text
          key={`q-${i}`}
          x={340 + i * 20}
          y={380}
          className="fill-foreground/30 text-2xl font-serif"
          animate={{y: [380, 340, 300], opacity: [0, 0.7, 0]}}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: 'easeOut',
          }}>
          ?
        </motion.text>
      ))}

      {/* ── Fireflies ────────────────────────────────── */}
      {[
        [140, 320, 0],
        [420, 340, 1.4],
        [520, 280, 0.6],
        [90, 260, 2.2],
        [340, 260, 1.8],
      ].map(([cx, cy, delay], i) => (
        <motion.circle
          key={`fly-${i}`}
          cx={cx}
          cy={cy}
          r={2.5}
          className="fill-laurel-500"
          animate={{y: [0, -20, 0], x: [0, 10, 0], opacity: [0.3, 1, 0.3]}}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.svg>
  );
}
