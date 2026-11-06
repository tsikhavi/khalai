'use client';

import {useMemo, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {motion, AnimatePresence} from 'framer-motion';
import {useLocale} from 'next-intl';

type Sections = {
  kicker: string;
  title: string;
  body: string;
  hero: {scroll: string};
  filters: {all: string; editorial: string; safari: string; nature: string};
  gallery: {title: string; body: string; view: string; empty: string};
  series: {
    title: string;
    body: string;
    commissions: string;
    exhibitions: string;
    print: string;
  };
  process: {
    title: string;
    body: string;
    steps: {title: string; body: string}[];
  };
  services: {
    title: string;
    body: string;
    items: {title: string; body: string}[];
  };
  cta: {title: string; body: string; primary: string; secondary: string};
};

type Photo = {
  id: string;
  src: string;
  alt: string;
  category: 'editorial' | 'safari' | 'nature';
  location: string;
  year: string;
  span: 'tall' | 'wide' | 'square';
};

const PHOTOS: Photo[] = [
  {
    id: 'mara-lion',
    src: '/images/photography/mara-lion.jpg',
    alt: 'A lion at dawn in the Masai Mara',
    category: 'safari',
    location: 'Masai Mara',
    year: '2026',
    span: 'wide',
  },
  {
    id: 'editorial-portrait-1',
    src: '/images/photography/editorial-portrait-1.jpg',
    alt: 'Studio portrait, natural light',
    category: 'editorial',
    location: 'Nairobi',
    year: '2026',
    span: 'tall',
  },
  {
    id: 'amboseli-elephants',
    src: '/images/photography/amboseli-elephants.jpg',
    alt: 'Elephant family at Amboseli',
    category: 'safari',
    location: 'Amboseli',
    year: '2025',
    span: 'square',
  },
  {
    id: 'tsavo-dusk',
    src: '/images/photography/tsavo-dusk.jpg',
    alt: 'Dusk over Tsavo',
    category: 'nature',
    location: 'Tsavo',
    year: '2025',
    span: 'wide',
  },
  {
    id: 'editorial-fashion-1',
    src: '/images/photography/editorial-fashion-1.jpg',
    alt: 'Fashion editorial, Nairobi rooftop',
    category: 'editorial',
    location: 'Nairobi',
    year: '2026',
    span: 'tall',
  },
  {
    id: 'coast-palms',
    src: '/images/photography/coast-palms.jpg',
    alt: 'Palm shadows at the Kenyan coast',
    category: 'nature',
    location: 'Malindi',
    year: '2025',
    span: 'square',
  },
];

export default function PhotographyDemo({sections}: {sections: Sections}) {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-32 pt-20 md:px-16">
      <Hero
        kicker={sections.kicker}
        title={sections.title}
        body={sections.body}
        scrollHint={sections.hero.scroll}
      />

      <ChapterDivider label="01 · Gallery" />
      <Gallery
        data={sections.gallery}
        filters={sections.filters}
      />

      <ChapterDivider label="02 · Series" />
      <Series data={sections.series} />

      <ChapterDivider label="03 · Process" />
      <Process data={sections.process} />

      <ChapterDivider label="04 · Services" />
      <Services data={sections.services} />

      <ChapterDivider label="05 · Talk" />
      <CTA {...sections.cta} />
    </main>
  );
}

function ChapterDivider({label}: {label: string}) {
  return (
    <div className="mt-24 flex items-center gap-4 md:mt-32">
      <span className="h-px flex-1 bg-foreground/10" />
      <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/40">
        {label}
      </span>
      <span className="h-px flex-1 bg-foreground/10" />
    </div>
  );
}

function Hero({
  kicker,
  title,
  body,
  scrollHint,
}: {
  kicker: string;
  title: string;
  body: string;
  scrollHint: string;
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
      <motion.p
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.6, duration: 0.6}}
        className="mt-8 text-[10px] uppercase tracking-[0.3em] text-foreground/40">
        {scrollHint}
      </motion.p>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GALLERY — grayscale → colour, hover pop, clip reveal
   ═══════════════════════════════════════════════════════════════ */

function Gallery({
  data,
  filters,
}: {
  data: Sections['gallery'];
  filters: Sections['filters'];
}) {
  const locale = useLocale();
  const [active, setActive] = useState<
    'all' | 'editorial' | 'safari' | 'nature'
  >('all');

  const filtered = useMemo(
    () =>
      active === 'all' ? PHOTOS : PHOTOS.filter((p) => p.category === active),
    [active]
  );

  const filterList: {key: typeof active; label: string}[] = [
    {key: 'all', label: filters.all},
    {key: 'editorial', label: filters.editorial},
    {key: 'safari', label: filters.safari},
    {key: 'nature', label: filters.nature},
  ];

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

      {/* Filter tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {filterList.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActive(f.key)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              active === f.key
                ? 'bg-foreground text-background'
                : 'border border-foreground/15 text-foreground/60 hover:border-foreground/30 hover:text-foreground'
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Masonry-ish grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.id}
              layout
              initial={{opacity: 0, scale: 0.94, clipPath: 'inset(0 0 100% 0)'}}
              animate={{opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)'}}
              exit={{opacity: 0, scale: 0.94}}
              transition={{
                duration: 0.55,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={
                photo.span === 'tall'
                  ? 'sm:row-span-2'
                  : photo.span === 'wide'
                    ? 'sm:col-span-2'
                    : ''
              }>
              <Link
                href={`/${locale}/photography/${photo.id}`}
                className="group relative block overflow-hidden rounded-xl">
                <div
                  className={
                    photo.span === 'tall'
                      ? 'aspect-2/3'
                      : photo.span === 'wide'
                        ? 'aspect-video'
                        : 'aspect-square'
                  }>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>

                {/* Gradient overlay for legibility */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Meta */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                    {photo.category} · {photo.location} · {photo.year}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {data.view} →
                  </p>
                </div>

                {/* Corner pulse */}
                <span className="pointer-events-none absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-laurel-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-foreground/50">
          {data.empty}
        </p>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERIES — three kinds of engagement
   ═══════════════════════════════════════════════════════════════ */

function Series({data}: {data: Sections['series']}) {
  const items = [
    {
      title: data.commissions,
      body: 'Editorial, safari, and brand commissions from one to five days.',
    },
    {
      title: data.exhibitions,
      body: 'Group and solo shows in Nairobi and abroad. Prints available.',
    },
    {
      title: data.print,
      body: 'Signed, editioned prints on archival paper. Framed on request.',
    },
  ];

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

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{
              delay: i * 0.1,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
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

function Process({data}: {data: Sections['process']}) {
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
            initial={{opacity: 0, x: -12}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{delay: i * 0.06, duration: 0.5}}
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
    </section>
  );
}

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
          href={`/${locale}/contact?service=photography`}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-laurel-700 px-5 text-sm font-medium text-white transition-colors hover:bg-laurel-800 dark:bg-laurel-500 dark:text-black dark:hover:bg-laurel-400">
          {primary}
        </Link>
        <a
          href={`/${locale}/photography#gallery`}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-foreground/20 px-5 text-sm font-medium transition-colors hover:border-foreground/40">
          {secondary}
        </a>
      </div>
    </section>
  );
}
