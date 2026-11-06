import type { useTranslations } from 'next-intl';

export type CostLine = { label: string; value: string };

export type Service = {
  slug: string;
  plain: string;
  short: string;
  detail: string;
  time: string;
  costSme: string;
  costBrand: string;
  breakdown: CostLine[];
  brands: { name: string; note: string }[];
  example: {
    kind: 'video' | 'photo';
    src: string;
    caption: string;
  };
  opportunities?: {
    title: string;
    rows: {
      item: string;
      status: 'missing' | 'weak' | 'present';
      note: string;
    }[];
  };
};

/**
 * Service slugs in display order.
 * The actual content lives in `messages/<locale>.json` under `Marketing.services.*`.
 */
export const SERVICE_SLUGS = [
  'seo',
  'smm',
  'aieo',
  'scraping',
  'localisation',
  'ads',
  'leads',
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

/**
 * Static assets that don't need translation (image/video paths).
 * Everything else (plain, detail, cost, etc.) is translated.
 */
const ASSETS: Record<ServiceSlug, { kind: 'video' | 'photo'; src: string }> = {
  seo: { kind: 'photo', src: '/images/examples/seo-report.png' },
  smm: { kind: 'video', src: '/videos/examples/smm-launch.mp4' },
  aieo: { kind: 'photo', src: '/images/examples/aieo-answer.png' },
  scraping: { kind: 'photo', src: '/images/examples/scraping-dashboard.png' },
  localisation: {
    kind: 'photo',
    src: '/images/examples/localisation-split.png',
  },
  ads: { kind: 'photo', src: '/images/examples/ads-creative.png' },
  leads: { kind: 'photo', src: '/images/examples/leads-dashboard.png' },
};

type Translator = ReturnType<typeof useTranslations>;

/**
 * Builds the `SERVICES` array from the current translation context.
 *
 * Call with `useTranslations('Marketing')` in a component,
 * or `await getTranslations('Marketing')` in a server component.
 */
export function buildServices(t: Translator): Service[] {
  return SERVICE_SLUGS.map((slug) => {
    const key = `services.${slug}` as const;

    const service: Service = {
      slug,
      plain: t(`${key}.plain`),
      short: t(`${key}.short`),
      detail: t(`${key}.detail`),
      time: t(`${key}.time`),
      costSme: t(`${key}.costSme`),
      costBrand: t(`${key}.costBrand`),
      breakdown: t.raw(`${key}.breakdown`) as CostLine[],
      brands: t.raw(`${key}.brands`) as { name: string; note: string }[],
      example: {
        ...ASSETS[slug],
        caption: t(`${key}.example.caption`),
      },
    };

    // Opportunities exist only on the SEO service
    if (slug === 'seo') {
      const opportunities = t.raw(`${key}.opportunities`) as
        | Service['opportunities']
        | undefined;
      if (opportunities) {
        service.opportunities = opportunities;
      }
    }

    return service;
  });
}

/**
 * Single-service helper. Same shape as before, but reads from translations.
 */
export function getServiceFromT(t: Translator, slug: string): Service | undefined {
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) return undefined;
  const key = `services.${slug}` as const;

  const service: Service = {
    slug,
    plain: t(`${key}.plain`),
    short: t(`${key}.short`),
    detail: t(`${key}.detail`),
    time: t(`${key}.time`),
    costSme: t(`${key}.costSme`),
    costBrand: t(`${key}.costBrand`),
    breakdown: t.raw(`${key}.breakdown`) as CostLine[],
    brands: t.raw(`${key}.brands`) as { name: string; note: string }[],
    example: {
      ...ASSETS[slug as ServiceSlug],
      caption: t(`${key}.example.caption`),
    },
  };

  if (slug === 'seo') {
    const opportunities = t.raw(`${key}.opportunities`) as
      | Service['opportunities']
      | undefined;
    if (opportunities) {
      service.opportunities = opportunities;
    }
  }

  return service;
}