'use client';

import {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {useLocale} from 'next-intl';

type Sections = {
  kicker: string;
  title: string;
  body: string;
  hero: {order: string; menu: string};
  howItWorks: {
    title: string;
    body: string;
    steps: {title: string; body: string}[];
  };
  menu: {
    title: string;
    body: string;
    categories: Record<string, string>;
    viewFull: string;
  };
  payment: {
    title: string;
    body: string;
    steps: string[];
    note: string;
  };
  delivery: {
    title: string;
    body: string;
    partners: {name: string; note: string}[];
    radius: string;
  };
  subscriptions: {
    title: string;
    body: string;
    tiers: {name: string; price: string; body: string}[];
    cta: string;
  };
  faq: {
    title: string;
    items: {q: string; a: string}[];
  };
  cta: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
  };
};

export default function KitchenDemo({sections}: {sections: Sections}) {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-32 pt-20 md:px-16">
      <Hero
        kicker={sections.kicker}
        title={sections.title}
        body={sections.body}
        orderLabel={sections.hero.order}
        menuLabel={sections.hero.menu}
      />

      <ChapterDivider label="01 · How it works" />
      <HowItWorks data={sections.howItWorks} />

      <ChapterDivider label="02 · Menu" />
      <Menu data={sections.menu} />

      <ChapterDivider label="03 · Payment" />
      <Payment data={sections.payment} />

      <ChapterDivider label="04 · Delivery" />
      <Delivery data={sections.delivery} />

      <ChapterDivider label="05 · Subscriptions" />
      <Subscriptions data={sections.subscriptions} />

      <ChapterDivider label="06 · FAQ" />
      <FAQ data={sections.faq} />

      <ChapterDivider label="07 · Order" />
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
  orderLabel,
  menuLabel,
}: {
  kicker: string;
  title: string;
  body: string;
  orderLabel: string;
  menuLabel: string;
}) {
  const locale = useLocale();

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

      <motion.div
        initial={{opacity: 0, y: 16}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.4, duration: 0.6}}
        className="mt-8 flex flex-wrap gap-3">
        <a
          href="https://wa.me/254700000000?text=Hi%2C%20I%27d%20like%20to%20order"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-laurel-700 px-5 text-sm font-medium text-white hover:bg-laurel-800 dark:bg-laurel-500 dark:text-black dark:hover:bg-laurel-400">
          {orderLabel}
        </a>
        <a
          href={`/${locale}/kitchen#menu`}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-foreground/20 px-5 text-sm font-medium transition-colors hover:border-foreground/40">
          {menuLabel}
        </a>
      </motion.div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════
   01. HOW IT WORKS — four-step flow with connecting arrows
   ═══════════════════════════════════════════════════════════════ */

function HowItWorks({data}: {data: Sections['howItWorks']}) {
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

      <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {data.steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{
              delay: i * 0.1,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative rounded-xl border border-foreground/10 bg-foreground/2 p-5">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-laurel-700 dark:text-laurel-300">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="mt-3 text-sm font-semibold">{step.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/60">
              {step.body}
            </p>

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
   02. MENU — category tabs + dish grid
   ═══════════════════════════════════════════════════════════════ */

const DISHES = [
  {
    id: 'nyama-choma-bowl',
    name: 'Nyama choma bowl',
    category: 'mains',
    price: 'KES 950',
    image: '/images/kitchen/nyama-choma.jpg',
  },
  {
    id: 'kuku-wa-mchuzi',
    name: 'Kuku wa mchuzi',
    category: 'mains',
    price: 'KES 780',
    image: '/images/kitchen/kuku-wa-mchuzi.jpg',
  },
  {
    id: 'pilau-ndogo',
    name: 'Pilau ndogo',
    category: 'mains',
    price: 'KES 620',
    image: '/images/kitchen/pilau.jpg',
  },
  {
    id: 'sukuma-bowl',
    name: 'Sukuma & ugali bowl',
    category: 'bowls',
    price: 'KES 550',
    image: '/images/kitchen/ugali-sukuma.jpg',
  },
  {
    id: 'kale-quinoa',
    name: 'Kale & quinoa bowl',
    category: 'bowls',
    price: 'KES 720',
    image: '/images/kitchen/kale-quinoa.jpg',
  },
  {
    id: 'chapati',
    name: 'Chapati (2pc)',
    category: 'sides',
    price: 'KES 180',
    image: '/images/kitchen/chapati.jpg',
  },
  {
    id: 'kachumbari',
    name: 'Kachumbari',
    category: 'sides',
    price: 'KES 200',
    image: '/images/kitchen/kachumbari.jpg',
  },
  {
    id: 'passion',
    name: 'Passion juice',
    category: 'drinks',
    price: 'KES 250',
    image: '/images/kitchen/passion.jpg',
  },
];

function Menu({data}: {data: Sections['menu']}) {
  const locale = useLocale();
  const [active, setActive] = useState('all');

  const filtered = DISHES.filter(
    (d) => active === 'all' || d.category === active
  );

  return (
    <section
      id="menu"
      className="mt-12 scroll-mt-24">
      <div className="max-w-2xl">
        <h2 className="font-serif text-3xl leading-tight md:text-4xl">
          {data.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/70 md:text-base">
          {data.body}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {[
          {key: 'all', label: 'All'},
          {key: 'mains', label: data.categories.mains},
          {key: 'bowls', label: data.categories.bowls},
          {key: 'sides', label: data.categories.sides},
          {key: 'drinks', label: data.categories.drinks},
        ].map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActive(cat.key)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              active === cat.key
                ? 'bg-foreground text-background'
                : 'border border-foreground/15 text-foreground/60 hover:border-foreground/30 hover:text-foreground'
            }`}>
            {cat.label}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {filtered.map((dish, i) => (
          <motion.li
            key={dish.id}
            layout
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            transition={{delay: i * 0.04, duration: 0.4}}
            className="overflow-hidden rounded-xl border border-foreground/10">
            <div className="relative aspect-square overflow-hidden bg-foreground/5">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-3">
              <p className="text-xs font-medium">{dish.name}</p>
              <p className="mt-0.5 text-xs text-foreground/60">{dish.price}</p>
            </div>
          </motion.li>
        ))}
      </ul>

      <Link
        href={`/${locale}/kitchen/menu`}
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-laurel-700 hover:underline dark:text-laurel-300">
        {data.viewFull} →
      </Link>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   03. PAYMENT — M-Pesa flow with animated steps
   ═══════════════════════════════════════════════════════════════ */

function Payment({data}: {data: Sections['payment']}) {
  return (
    <section className="mt-12">
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div>
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">
            {data.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70 md:text-base">
            {data.body}
          </p>
        </div>

        <ol className="space-y-2">
          {data.steps.map((step, i) => (
            <motion.li
              key={i}
              initial={{opacity: 0, x: 12}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true, amount: 0.4}}
              transition={{delay: i * 0.08, duration: 0.5}}
              className="flex items-center gap-3 rounded-lg border border-foreground/10 px-4 py-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-laurel-500/15 text-[10px] font-semibold text-laurel-700 dark:text-laurel-300">
                {i + 1}
              </span>
              <span className="text-sm text-foreground/80">{step}</span>
            </motion.li>
          ))}
        </ol>
      </div>

      <p className="mt-6 text-xs text-foreground/50">{data.note}</p>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   04. DELIVERY — partner grid + radius note
   ═══════════════════════════════════════════════════════════════ */

function Delivery({data}: {data: Sections['delivery']}) {
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

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {data.partners.map((p, i) => (
          <motion.li
            key={i}
            initial={{opacity: 0, y: 12}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{delay: i * 0.06, duration: 0.5}}
            className="rounded-xl border border-foreground/10 p-4">
            <p className="text-sm font-medium">{p.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/60">
              {p.note}
            </p>
          </motion.li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-foreground/50">{data.radius}</p>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   05. SUBSCRIPTIONS — pricing tiers
   ═══════════════════════════════════════════════════════════════ */

function Subscriptions({data}: {data: Sections['subscriptions']}) {
  const locale = useLocale();

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
        {data.tiers.map((tier, i) => (
          <motion.li
            key={i}
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{delay: i * 0.08, duration: 0.5}}
            className="rounded-xl border border-foreground/10 p-5">
            <p className="text-sm font-semibold">{tier.name}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-laurel-700 dark:text-laurel-300">
              {tier.price}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-foreground/60">
              {tier.body}
            </p>
          </motion.li>
        ))}
      </ul>

      <Link
        href={`/${locale}/contact?service=kitchen-subscription`}
        className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-laurel-700 px-4 text-sm font-medium text-white hover:bg-laurel-800 dark:bg-laurel-500 dark:text-black dark:hover:bg-laurel-400">
        {data.cta}
      </Link>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   06. FAQ — accordion
   ═══════════════════════════════════════════════════════════════ */

function FAQ({data}: {data: Sections['faq']}) {
  return (
    <section className="mt-12">
      <h2 className="font-serif text-3xl leading-tight md:text-4xl">
        {data.title}
      </h2>

      <div className="mt-6 divide-y divide-foreground/10">
        {data.items.map((item, i) => (
          <details
            key={i}
            className="group py-4">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-medium">
              {item.q}
              <span className="transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   07. CTA
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
        <a
          href="https://wa.me/254700000000?text=Hi%2C%20I%27d%20like%20to%20order"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-laurel-700 px-5 text-sm font-medium text-white hover:bg-laurel-800 dark:bg-laurel-500 dark:text-black dark:hover:bg-laurel-400">
          {primary}
        </a>
        <a
          href={`/${locale}/kitchen#menu`}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-foreground/20 px-5 text-sm font-medium transition-colors hover:border-foreground/40">
          {secondary}
        </a>
      </div>
    </section>
  );
}
