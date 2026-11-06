'use client';

import {motion} from 'framer-motion';

const TYPES = [
  {
    name: 'Technical SEO',
    body: 'Crawlability, sitemaps, structured data, Core Web Vitals.',
    accent: '#059f00',
    icon: (
      <path
        d="M4 6h16M4 12h10M4 18h14M16 6l4 3-4 3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: 'On-page SEO',
    body: 'Titles, headings, internal links, semantic HTML.',
    accent: '#006600',
    icon: (
      <path
        d="M7 4v16M17 4v16M7 12h10"
        strokeLinecap="round"
      />
    ),
  },
  {
    name: 'Content SEO',
    body: 'Editorial calendars, keyword mapping, briefs that rank.',
    accent: '#0ad300',
    icon: (
      <path
        d="M4 5h16v14H4zM8 9h8M8 13h6M8 17h4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: 'Local SEO',
    body: 'Google Business Profile, NAP consistency, local schema.',
    accent: '#11ff00',
    icon: (
      <path
        d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: 'International SEO',
    body: 'hreflang, localized metadata, per-locale sitemaps.',
    accent: '#15ff00',
    icon: (
      <path
        d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: 'Analytics & tracking',
    body: 'GA4, Search Console, event tracking, monthly reporting.',
    accent: '#059f00',
    icon: (
      <path
        d="M5 20V10M12 20V4M19 20v-7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function SeoSection({
  data,
}: {
  data: {kicker: string; title: string; body: string};
}) {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
      <motion.div
        initial={{opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.4}}
        transition={{duration: 0.6}}>
        <p className="text-xs uppercase tracking-[0.3em] text-laurel-700 dark:text-laurel-300">
          {data.kicker}
        </p>
        <h2 className="mt-3 font-serif text-5xl leading-tight md:text-7xl">
          {data.title}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/70">
          {data.body}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {TYPES.map((type, i) => (
          <motion.div
            key={type.name}
            initial={{opacity: 0, y: 20, scale: 0.95}}
            whileInView={{opacity: 1, y: 0, scale: 1}}
            viewport={{once: true}}
            transition={{
              delay: i * 0.08,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-xl border border-foreground/10 p-4 transition-colors hover:border-laurel-500/40"
            style={{backgroundColor: `${type.accent}08`}}>
            <div
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg"
              style={{backgroundColor: `${type.accent}20`, color: type.accent}}>
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8">
                {type.icon}
              </svg>
            </div>
            <p className="text-sm font-semibold leading-snug">{type.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/60">
              {type.body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
