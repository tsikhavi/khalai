'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {motion} from 'framer-motion';
import {useLocale} from 'next-intl';

type Sections = {
  kicker: string;
  title: string;
  body: string;
  hero: {playAll: string; nowPlaying: string; paused: string};
  player: {
    ariaLabel: string;
    play: string;
    pause: string;
    next: string;
    prev: string;
    volume: string;
    mute: string;
    unmute: string;
    noTrack: string;
    unsupported: string;
  };
  credits: {
    title: string;
    body: string;
    columns: {year: string; project: string; network: string; role: string};
    rows: {year: string; project: string; network: string; role: string}[];
  };
  discography: {
    title: string;
    body: string;
    columns: {year: string; title: string; artist: string; role: string};
    rows: {year: string; title: string; artist: string; role: string}[];
  };
  process: {
    title: string;
    body: string;
    steps: {title: string; body: string}[];
  };
  equipment: {title: string; body: string};
  testimonials: {
    title: string;
    items: {quote: string; author: string; role: string}[];
  };
  services: {
    title: string;
    body: string;
    items: {title: string; body: string}[];
  };
  cta: {title: string; body: string; primary: string; secondary: string};
};

type Track = {
  id: string;
  title: string;
  network: string;
  year: string;
  src: string;
  durationHint: string;
};

const TRACKS: Track[] = [
  {
    id: 'ktn-nairobi-nights',
    title: 'Nairobi Nights — title theme',
    network: 'KTN',
    year: '2026',
    src: '/audio/ktn-nairobi-nights.mp3',
    durationHint: '0:42',
  },
  {
    id: 'citizen-market-show',
    title: 'The Market Show — score',
    network: 'Citizen TV',
    year: '2025',
    src: '/audio/citizen-market-show.mp3',
    durationHint: '1:08',
  },
  {
    id: 'maisha-ident',
    title: 'Kisumu Nights — station ident',
    network: 'Radio Maisha',
    year: '2024',
    src: '/audio/maisha-ident.mp3',
    durationHint: '0:18',
  },
];

export default function MusicDemo({sections}: {sections: Sections}) {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-32 pt-20 md:px-16">
      <Hero
        kicker={sections.kicker}
        title={sections.title}
        body={sections.body}
      />

      <PlayerSection
        tracks={TRACKS}
        labels={sections.player}
      />

      <ChapterDivider label="01 · Credits" />
      <Credits data={sections.credits} />

      <ChapterDivider label="02 · Discography" />
      <Discography data={sections.discography} />

      <ChapterDivider label="03 · Process" />
      <Process
        data={sections.process}
        equipment={sections.equipment}
      />

      <ChapterDivider label="04 · Testimonials" />
      <Testimonials data={sections.testimonials} />

      <ChapterDivider label="05 · Services" />
      <Services data={sections.services} />

      <ChapterDivider label="06 · Talk" />
      <CTA {...sections.cta} />
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
   AUDIO PLAYER — the core of the page
   ═══════════════════════════════════════════════════════════════ */

function PlayerSection({
  tracks,
  labels,
}: {
  tracks: Track[];
  labels: Sections['player'];
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  const active = tracks[activeIndex];

  // Load source when the active track changes; keep playing state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    // Restore progress to 0 on track change
    setProgress(0);
  }, [activeIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      void audio.play();
    }
  };

  const next = () => {
    setActiveIndex((i) => (i + 1) % tracks.length);
  };

  const prev = () => {
    setActiveIndex((i) => (i - 1 + tracks.length) % tracks.length);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setProgress(value);
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const v = Number(e.target.value);
    audio.volume = v;
    setVolume(v);
    if (v > 0 && muted) {
      audio.muted = false;
      setMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  // Format seconds → mm:ss
  const fmt = (s: number) => {
    if (!Number.isFinite(s) || s < 0) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <section
      aria-label={labels.ariaLabel}
      className="mt-16 rounded-2xl border border-foreground/10 bg-foreground/2 p-6 md:p-8">
      <audio
        ref={audioRef}
        src={active.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={next}>
        {labels.unsupported}
      </audio>

      {/* Now playing */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">
            {playing ? labels.pause : labels.play} · {active.year} ·{' '}
            {active.network}
          </p>
          <p className="mt-2 truncate font-serif text-2xl md:text-3xl">
            {active.title}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label={labels.prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 hover:border-foreground/30">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor">
              <path d="M6 5v14h2V5H6zm12 0l-9 7 9 7V5z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? labels.pause : labels.play}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-laurel-500 text-black transition-transform hover:scale-105">
            {playing ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor">
                <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 translate-x-px"
                fill="currentColor">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={next}
            aria-label={labels.next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 hover:border-foreground/30">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor">
              <path d="M16 5v14h2V5h-2zM6 5l9 7-9 7V5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6">
        <input
          type="range"
          min={0}
          max={Number.isFinite(duration) && duration > 0 ? duration : 0}
          step={0.1}
          value={progress}
          onChange={seek}
          aria-label="Seek"
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-foreground/15 accent-laurel-500"
          style={{
            background: `linear-gradient(to right, var(--color-laurel-500) 0%, var(--color-laurel-500) ${
              duration > 0 ? (progress / duration) * 100 : 0
            }%, rgba(255,255,255,0.15) ${
              duration > 0 ? (progress / duration) * 100 : 0
            }%, rgba(255,255,255,0.15) 100%)`,
          }}
        />
        <div className="mt-1 flex justify-between text-[10px] tabular-nums text-foreground/50">
          <span>{fmt(progress)}</span>
          <span>{fmt(duration || 0)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? labels.unmute : labels.mute}
          className="text-foreground/60 hover:text-foreground">
          {muted ? (
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path
                d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path
                d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={changeVolume}
          aria-label={labels.volume}
          className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-foreground/15 accent-laurel-500"
        />
      </div>

      {/* Playlist */}
      <ul className="mt-6 divide-y divide-foreground/10 rounded-lg border border-foreground/10">
        {tracks.map((track, i) => {
          const isActive = i === activeIndex;
          return (
            <li key={track.id}>
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                  isActive ? 'bg-laurel-500/10' : 'hover:bg-foreground/3'
                }`}>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] ${
                    isActive
                      ? 'bg-laurel-500 text-black'
                      : 'bg-foreground/10 text-foreground/60'
                  }`}>
                  {isActive ? (
                    playing ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3"
                        fill="currentColor">
                        <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3 translate-x-[0.5px]"
                        fill="currentColor">
                        <path d="M8 5v14l11-7L8 5z" />
                      </svg>
                    )
                  ) : (
                    i + 1
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm ${
                      isActive
                        ? 'font-medium text-foreground'
                        : 'text-foreground/80'
                    }`}>
                    {track.title}
                  </p>
                  <p className="truncate text-[11px] text-foreground/50">
                    {track.network} · {track.year}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] tabular-nums text-foreground/40">
                  {track.durationHint}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CREDITS
   ═══════════════════════════════════════════════════════════════ */

function Credits({data}: {data: Sections['credits']}) {
  return (
    <section className="mt-12">
      <div className="max-w-2xl">
        <h2 className="font-serif text-3xl leading-tight md:text-4xl">
          {data.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/70 md:text-base">
          {data.body}
        </p>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-foreground/10 text-left text-[10px] uppercase tracking-wider text-foreground/50">
              <th className="py-2 pr-4 font-medium">{data.columns.year}</th>
              <th className="py-2 pr-4 font-medium">{data.columns.project}</th>
              <th className="py-2 pr-4 font-medium">{data.columns.network}</th>
              <th className="py-2 pr-4 font-medium">{data.columns.role}</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-foreground/5 last:border-0">
                <td className="py-3 pr-4 font-mono text-xs tabular-nums text-foreground/50">
                  {row.year}
                </td>
                <td className="py-3 pr-4 font-medium">{row.project}</td>
                <td className="py-3 pr-4 text-foreground/70">{row.network}</td>
                <td className="py-3 pr-4 text-xs text-foreground/60">
                  {row.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DISCOGRAPHY
   ═══════════════════════════════════════════════════════════════ */

function Discography({data}: {data: Sections['discography']}) {
  return (
    <section className="mt-12">
      <div className="max-w-2xl">
        <h2 className="font-serif text-3xl leading-tight md:text-4xl">
          {data.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/70 md:text-base">
          {data.body}
        </p>
      </div>

      <ul className="mt-8 space-y-2">
        {data.rows.map((row, i) => (
          <motion.li
            key={i}
            initial={{opacity: 0, x: -12}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{
              delay: i * 0.06,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-1 rounded-lg border border-foreground/10 p-4 sm:flex-row sm:items-center sm:gap-6">
            <span className="font-mono text-xs tabular-nums text-foreground/50 sm:w-16">
              {row.year}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{row.title}</p>
              <p className="mt-0.5 text-xs text-foreground/60">{row.artist}</p>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-foreground/50">
              {row.role}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROCESS + EQUIPMENT
   ═══════════════════════════════════════════════════════════════ */

function Process({
  data,
  equipment,
}: {
  data: Sections['process'];
  equipment: Sections['equipment'];
}) {
  return (
    <section className="mt-12">
      <div className="max-w-2xl">
        <h2 className="font-serif text-3xl leading-tight md:text-4xl">
          {data.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/70 md:text-base">
          {data.body}
        </p>
      </div>

      <ol className="mt-8 space-y-3">
        {data.steps.map((step, i) => (
          <motion.li
            key={i}
            initial={{opacity: 0, y: 12}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{
              delay: i * 0.08,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex gap-4 rounded-lg border border-foreground/10 p-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-laurel-500/15 text-xs font-semibold text-laurel-700 dark:text-laurel-300">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <p className="text-sm font-medium">{step.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-foreground/60">
                {step.body}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>

      <div className="mt-10 rounded-xl border border-foreground/10 bg-foreground/2 p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50">
          {equipment.title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">
          {equipment.body}
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════════════════════════ */

function Testimonials({data}: {data: Sections['testimonials']}) {
  return (
    <section className="mt-12">
      <h2 className="font-serif text-3xl leading-tight md:text-4xl">
        {data.title}
      </h2>

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {data.items.map((item, i) => (
          <motion.li
            key={i}
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{
              delay: i * 0.1,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-xl border border-foreground/10 p-5">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-laurel-500"
              fill="currentColor">
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              “{item.quote}”
            </p>
            <div className="mt-4 border-t border-foreground/10 pt-3">
              <p className="text-xs font-medium">{item.author}</p>
              <p className="text-[11px] text-foreground/50">{item.role}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════════════════════════ */

function Services({data}: {data: Sections['services']}) {
  return (
    <section className="mt-12">
      <div className="max-w-2xl">
        <h2 className="font-serif text-3xl leading-tight md:text-4xl">
          {data.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/70 md:text-base">
          {data.body}
        </p>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((item, i) => (
          <motion.li
            key={i}
            initial={{opacity: 0, y: 12}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{delay: i * 0.05, duration: 0.5}}
            className="rounded-xl border border-foreground/10 p-5">
            <p className="text-sm font-medium">{item.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-foreground/60">
              {item.body}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════════════════════ */

function CTA({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: string;
  primary: string;
  secondary: string;
}) {
  const locale = useLocale();

  return (
    <section className="mt-12 rounded-2xl border border-laurel-500/30 bg-laurel-500/5 p-10 text-center">
      <h2 className="font-serif text-3xl leading-tight md:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-foreground/70">
        {body}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={`/${locale}/contact?service=music`}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-laurel-700 px-5 text-sm font-medium text-white transition-colors hover:bg-laurel-800 dark:bg-laurel-500 dark:text-black dark:hover:bg-laurel-400">
          {primary}
        </Link>
        <a
          href="https://wa.me/254700000000?text=Hi%2C%20I%27d%20like%20to%20talk%20about%20music"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-foreground/20 px-5 text-sm font-medium transition-colors hover:border-foreground/40">
          {secondary}
        </a>
      </div>
    </section>
  );
}
