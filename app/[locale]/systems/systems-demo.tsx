'use client';

import {useEffect, useRef, useState} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import styles from './systems.module.css';

type Sections = {
  kicker: string;
  title: string;
  body: string;

  request: {
    title: string;
    body: string;
    steps: {label: string; hint: string}[];
  };
  database: {
    title: string;
    body: string;
    rows: {label: string; value: string}[];
  };
  integration: {
    title: string;
    body: string;
    systems: {name: string; role: string}[];
  };
  queue: {title: string; body: string; jobs: string[]};
  loadBalancing: {title: string; body: string; servers: string[]};
  devops: {
    title: string;
    body: string;
    stages: {name: string; hint: string}[];
  };
  monitoring: {
    title: string;
    body: string;
    metrics: {
      label: string;
      value: string;
      status: 'healthy' | 'warn' | 'critical';
    }[];
  };
  fintech: {
    title: string;
    body: string;
    features: {name: string; hint: string}[];
  };
  agrotech: {
    title: string;
    body: string;
    layers: {name: string; hint: string}[];
  };
  cta: {title: string; body: string; contact: string};
};

export default function SystemsDemo({sections}: {sections: Sections}) {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-32 pt-20 md:px-16">
      <Hero
        kicker={sections.kicker}
        title={sections.title}
        body={sections.body}
      />

      {/* ── Chapter 1 · Foundations ────────────────────── */}
      <ChapterDivider label="01 · Foundations" />
      <div className="mt-12 space-y-32 md:mt-16 md:space-y-40">
        <RequestFlow data={sections.request} />
        <Database data={sections.database} />
      </div>

      {/* ── Chapter 2 · Integration ─────────────────────── */}
      <ChapterDivider label="02 · Integration" />
      <div className="mt-12 space-y-28 md:mt-16 md:space-y-36">
        <IntegrationHub data={sections.integration} />
        <Queue data={sections.queue} />
      </div>

      {/* ── Chapter 3 · Infrastructure ──────────────────── */}
      <ChapterDivider label="03 · Infrastructure" />
      <div className="mt-12 space-y-28 md:mt-16 md:space-y-36">
        <LoadBalancing data={sections.loadBalancing} />
        <DevOps data={sections.devops} />
        <Monitoring data={sections.monitoring} />
      </div>

      {/* ── Chapter 4 · Industry ────────────────────────── */}
      <ChapterDivider label="04 · Industry" />
      <div className="mt-12 space-y-32 md:mt-16 md:space-y-40">
        <Fintech data={sections.fintech} />
        <Agrotech data={sections.agrotech} />
      </div>

      {/* ── Closing ─────────────────────────────────────── */}
      <ChapterDivider label="05 · Talk" />
      <div className="mt-12 md:mt-16">
        <CTA {...sections.cta} />
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
   HERO
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
      <motion.h1
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.8, ease: [0.22, 1, 0.36, 1]}}
        className="mt-4 font-serif text-5xl leading-[1.05] md:text-7xl">
        {title}
      </motion.h1>
      <motion.p
        initial={{opacity: 0, y: 16}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.2, duration: 0.8}}
        className="mt-5 text-lg leading-relaxed text-foreground/70">
        {body}
      </motion.p>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════
   01. REQUEST FLOW — what happens when someone taps a button
   ═══════════════════════════════════════════════════════════════ */

function RequestFlow({data}: {data: Sections['request']}) {
  return (
    <section>
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start md:gap-12">
        <div>
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
            01 · Request flow
          </p>
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">
            {data.title}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/70 md:text-base">
            {data.body}
          </p>
        </div>
      </div>

      {/* Pipeline */}
      <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {data.steps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{
              delay: i * 0.12,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative rounded-xl border border-foreground/10 bg-foreground/2 p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-laurel-700 dark:text-laurel-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={styles.pulseDot}
                aria-hidden
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-foreground">
              {step.label}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/60">
              {step.hint}
            </p>

            {/* Arrow → next, hidden on last */}
            {i < data.steps.length - 1 && (
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-foreground/20 md:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   02. DATABASE — the file cabinet of the business
   ═══════════════════════════════════════════════════════════════ */

function Database({data}: {data: Sections['database']}) {
  return (
    <section>
      <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        02 · Database
      </p>
      <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
        <div>
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">
            {data.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70 md:text-base">
            {data.body}
          </p>
        </div>

        {/* Animated table */}
        <div className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/2">
          <div className="flex border-b border-foreground/10 px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-foreground/50">
            <span className="flex-1">Field</span>
            <span className="flex-1 text-right">Value</span>
          </div>
          {data.rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{opacity: 0, x: -12}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true, amount: 0.6}}
              transition={{delay: i * 0.08, duration: 0.5}}
              className="flex border-b border-foreground/5 px-4 py-2.5 font-mono text-xs last:border-0">
              <span className="flex-1 text-laurel-700 dark:text-laurel-300">
                {row.label}
              </span>
              <span className="flex-1 text-right text-foreground/80">
                {row.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   03. INTEGRATION — how the studio talks to banks, farms, ERPs
   ═══════════════════════════════════════════════════════════════ */

function IntegrationHub({data}: {data: Sections['integration']}) {
  return (
    <section>
      <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        03 · Integration hub
      </p>
      <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
        <div>
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">
            {data.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70 md:text-base">
            {data.body}
          </p>
        </div>

        {/* Radial diagram */}
        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <svg
            viewBox="0 0 400 400"
            className="h-full w-full">
            {/* Center */}
            <circle
              cx="200"
              cy="200"
              r="52"
              className="fill-laurel-500/15"
            />
            <circle
              cx="200"
              cy="200"
              r="52"
              className="stroke-laurel-500"
              strokeWidth="1.5"
              fill="none"
            />
            <text
              x="200"
              y="200"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-current text-sm font-semibold text-foreground">
              Core
            </text>

            {/* Satellites */}
            {data.systems.map((sys, i) => {
              const angle =
                (i / data.systems.length) * Math.PI * 2 - Math.PI / 2;
              const r = 140;
              const cx = 200 + Math.cos(angle) * r;
              const cy = 200 + Math.sin(angle) * r;

              return (
                <g key={sys.name}>
                  <motion.line
                    x1="200"
                    y1="200"
                    x2={cx}
                    y2={cy}
                    stroke="currentColor"
                    className="text-laurel-500"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{pathLength: 0, opacity: 0}}
                    whileInView={{pathLength: 1, opacity: 0.5}}
                    viewport={{once: true}}
                    transition={{
                      delay: 0.2 + i * 0.1,
                      duration: 0.6,
                    }}
                  />
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r="34"
                    className="fill-foreground/5 stroke-foreground/15"
                    strokeWidth="1"
                    initial={{scale: 0, opacity: 0}}
                    whileInView={{scale: 1, opacity: 1}}
                    viewport={{once: true}}
                    transition={{
                      delay: 0.3 + i * 0.1,
                      duration: 0.5,
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    }}
                    style={{transformOrigin: `${cx}px ${cy}px`}}
                  />
                  <text
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-current text-[10px] font-medium text-foreground">
                    {sys.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* System list */}
      <ul className="mt-8 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {data.systems.map((sys, i) => (
          <motion.li
            key={sys.name}
            initial={{opacity: 0, y: 8}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{delay: i * 0.05, duration: 0.4}}
            className="rounded-lg border border-foreground/10 p-3 text-xs">
            <p className="font-medium text-foreground">{sys.name}</p>
            <p className="mt-0.5 text-foreground/60">{sys.role}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   04. QUEUE — background jobs don't block the customer
   ═══════════════════════════════════════════════════════════════ */

function Queue({data}: {data: Sections['queue']}) {
  return (
    <section>
      <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        04 · Queue
      </p>
      <h2 className="font-serif text-3xl leading-tight md:text-4xl">
        {data.title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/70 md:text-base">
        {data.body}
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border border-foreground/10 bg-foreground/2">
        <div className="flex items-center gap-2 border-b border-foreground/10 px-4 py-2 text-[10px] uppercase tracking-wider text-foreground/50">
          <span
            className={styles.pulseDot}
            aria-hidden
          />
          <span>Processing queue</span>
        </div>
        <div className="space-y-2 p-3">
          {data.jobs.map((job, i) => (
            <motion.div
              key={job}
              initial={{opacity: 0, x: -30}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true, amount: 0.6}}
              transition={{delay: i * 0.1, duration: 0.5}}
              className="flex items-center gap-3 rounded-lg border border-foreground/5 bg-background px-3 py-2.5 text-xs">
              <span
                className={`${styles.pulseDot} ${styles.delaySlide}`}
                style={{animationDelay: `${i * 0.3}s`}}
                aria-hidden
              />
              <span className="flex-1 font-mono text-foreground/80">{job}</span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/40">
                queued
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   05. LOAD BALANCING — one line in, many hands working
   ═══════════════════════════════════════════════════════════════ */

function LoadBalancing({data}: {data: Sections['loadBalancing']}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % data.servers.length);
    }, 900);
    return () => clearInterval(id);
  }, [data.servers.length]);

  return (
    <section>
      <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        05 · Load balancing
      </p>
      <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
        <div>
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">
            {data.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70 md:text-base">
            {data.body}
          </p>
        </div>

        <div className="rounded-xl border border-foreground/10 bg-foreground/2 p-6">
          {/* Incoming */}
          <div className="mb-6 flex items-center justify-center">
            <div className="rounded-full border border-foreground/20 px-4 py-2 text-xs font-medium">
              Incoming requests
            </div>
          </div>

          {/* Balancer */}
          <div className="mb-6 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-foreground/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5">
              <path
                d="M12 5v14M5 12h14"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Servers */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {data.servers.map((server, i) => (
              <motion.div
                key={server}
                animate={{
                  scale: active === i ? 1.05 : 1,
                  borderColor:
                    active === i ? 'rgb(21 255 0 / 0.6)' : 'rgb(0 0 0 / 0.1)',
                }}
                transition={{duration: 0.3}}
                className="flex flex-col items-center justify-center rounded-lg border bg-background px-3 py-4 text-center">
                <span
                  className={styles.pulseDot}
                  aria-hidden
                />
                <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-foreground/60">
                  {server}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="mt-4 text-center text-[10px] uppercase tracking-[0.2em] text-foreground/40">
            Round robin
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   06. DEVOPS — commit to production, safely
   ═══════════════════════════════════════════════════════════════ */

function DevOps({data}: {data: Sections['devops']}) {
  return (
    <section>
      <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        06 · DevOps
      </p>
      <h2 className="font-serif text-3xl leading-tight md:text-4xl">
        {data.title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/70 md:text-base">
        {data.body}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {data.stages.map((stage, i) => (
          <motion.div
            key={stage.name}
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{
              delay: i * 0.1,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative rounded-xl border border-foreground/10 bg-foreground/2 p-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-laurel-700 dark:text-laurel-300">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="mt-2 text-sm font-semibold text-foreground">
              {stage.name}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/60">
              {stage.hint}
            </p>
            {i < data.stages.length - 1 && (
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-foreground/20 lg:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   07. MONITORING — the studio sees problems before you do
   ═══════════════════════════════════════════════════════════════ */

function Monitoring({data}: {data: Sections['monitoring']}) {
  const statusClasses: Record<
    'healthy' | 'warn' | 'critical',
    {dot: string; bg: string; text: string; label: string}
  > = {
    healthy: {
      dot: 'bg-laurel-500',
      bg: 'bg-laurel-500/10',
      text: 'text-laurel-700 dark:text-laurel-300',
      label: 'Healthy',
    },
    warn: {
      dot: 'bg-amber-500',
      bg: 'bg-amber-500/10',
      text: 'text-amber-700 dark:text-amber-400',
      label: 'Watching',
    },
    critical: {
      dot: 'bg-secondary',
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      label: 'Attention',
    },
  };

  return (
    <section>
      <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        07 · Monitoring
      </p>
      <h2 className="font-serif text-3xl leading-tight md:text-4xl">
        {data.title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/70 md:text-base">
        {data.body}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {data.metrics.map((metric, i) => {
          const s = statusClasses[metric.status];
          return (
            <motion.div
              key={metric.label}
              initial={{opacity: 0, y: 12}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.4}}
              transition={{delay: i * 0.08, duration: 0.5}}
              className="rounded-xl border border-foreground/10 bg-foreground/2 p-4">
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                <span
                  className={`text-[10px] font-medium uppercase tracking-wider ${s.text}`}>
                  {s.label}
                </span>
              </div>
              <p className="mt-3 text-2xl font-semibold tabular-nums text-foreground">
                {metric.value}
              </p>
              <p className="mt-0.5 text-xs text-foreground/60">
                {metric.label}
              </p>
              <div className={`mt-3 h-1 overflow-hidden rounded-full ${s.bg}`}>
                <motion.div
                  animate={{x: ['-100%', '100%']}}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
                  }}
                  className={`h-full w-1/2 ${s.dot}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   08. FINTECH — money needs rails that never falter
   ═══════════════════════════════════════════════════════════════ */

function Fintech({data}: {data: Sections['fintech']}) {
  return (
    <section>
      <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        08 · Fintech
      </p>
      <h2 className="font-serif text-3xl leading-tight md:text-4xl">
        {data.title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/70 md:text-base">
        {data.body}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.features.map((feature, i) => (
          <motion.div
            key={feature.name}
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{
              delay: i * 0.08,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-xl border border-foreground/10 bg-foreground/2 p-5">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-laurel-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12l2 2 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm font-semibold text-foreground">
                {feature.name}
              </p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-foreground/60">
              {feature.hint}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   09. AGROTECH — the chain from soil to shelf, made visible
   ═══════════════════════════════════════════════════════════════ */

function Agrotech({data}: {data: Sections['agrotech']}) {
  return (
    <section>
      <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        09 · Agrotech
      </p>
      <h2 className="font-serif text-3xl leading-tight md:text-4xl">
        {data.title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/70 md:text-base">
        {data.body}
      </p>

      <div className="mt-8 space-y-2">
        {data.layers.map((layer, i) => (
          <motion.div
            key={layer.name}
            initial={{opacity: 0, x: -20}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{
              delay: i * 0.1,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-1 rounded-xl border border-foreground/10 bg-foreground/2 p-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-3 sm:w-48 sm:shrink-0">
              <span
                className="h-2 w-2 rounded-full bg-laurel-500"
                style={{opacity: 1 - i * 0.08}}
                aria-hidden
              />
              <p className="text-sm font-semibold text-foreground">
                {layer.name}
              </p>
            </div>
            <p className="text-xs leading-relaxed text-foreground/60">
              {layer.hint}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CTA — talk to the studio
   ═══════════════════════════════════════════════════════════════ */

function CTA({
  title,
  body,
  contact,
}: {
  title: string;
  body: string;
  contact: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.4'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <section
      ref={ref}
      className="rounded-2xl border border-laurel-500/30 bg-laurel-500/5 p-10 text-center">
      <motion.div style={{opacity, y}}>
        <h2 className="font-serif text-3xl leading-tight md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-foreground/70">
          {body}
        </p>
        <a
          href="mailto:hello@khalai.studio"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-laurel-700 px-5 text-sm font-medium text-white transition-colors hover:bg-laurel-800 dark:bg-laurel-500 dark:text-black dark:hover:bg-laurel-400">
          {contact}
        </a>
      </motion.div>
    </section>
  );
}
