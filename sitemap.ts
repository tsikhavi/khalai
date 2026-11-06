import type {MetadataRoute} from 'next';
import {locales} from './i18n/config';
import {loadAllReports} from '@/lib/reports-list';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://khalai.studio';

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

/**
 * Static routes. Order matters only for readability.
 * `path` is the locale-less path — locale prefix is added per entry below.
 */
const STATIC_ROUTES: Route[] = [
  // Public marketing
  {path: '', changeFrequency: 'monthly', priority: 1.0}, // home
  {path: '/contact', changeFrequency: 'yearly', priority: 0.7},
  {path: '/start', changeFrequency: 'monthly', priority: 0.8}, // projects index
  {path: '/creativity', changeFrequency: 'monthly', priority: 0.9}, // the creativity stage
  {path: '/process', changeFrequency: 'monthly', priority: 0.8}, // the process page
  {path: '/horizontal', changeFrequency: 'yearly', priority: 0.5}, // experimental
  {path: '/blog', changeFrequency: 'weekly', priority: 0.8},

  // Legal
  {path: '/terms', changeFrequency: 'yearly', priority: 0.3},
  {path: '/privacy', changeFrequency: 'yearly', priority: 0.3},

  // Dashboard (still indexable if public-ish; drop if auth-gated)
  {path: '/dashboard', changeFrequency: 'daily', priority: 0.6},
  {path: '/dashboard/activity', changeFrequency: 'daily', priority: 0.5},
  {path: '/dashboard/reports', changeFrequency: 'weekly', priority: 0.5},
  {path: '/dashboard/payments', changeFrequency: 'monthly', priority: 0.5},
  {path: '/dashboard/messages', changeFrequency: 'daily', priority: 0.5},
  {path: '/dashboard/settings', changeFrequency: 'yearly', priority: 0.2},
];

/**
 * Build the full list of URLs, one per locale, each with
 * hreflang alternates pointing at every other locale.
 */
function entriesForPath(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number,
  lastModified?: Date
): MetadataRoute.Sitemap {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[locale] = `${BASE_URL}/${locale}${path}`;
  }

  return locales.map((locale) => ({
    url: `${BASE_URL}/${locale}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: alternates,
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── Static routes ────────────────────────────────────────
  const staticEntries = STATIC_ROUTES.flatMap((r) =>
    entriesForPath(r.path, r.changeFrequency, r.priority, now)
  );

  // ── Dynamic project reports ──────────────────────────────
  let reportEntries: MetadataRoute.Sitemap = [];
  try {
    const reports = await loadAllReports();
    reportEntries = reports.flatMap((r) =>
      entriesForPath(`/dashboard/reports/${r.slug}`, 'weekly', 0.6, new Date())
    );
  } catch {
    // If report loading fails (e.g. no content dir), skip silently
  }

  // ── Dynamic project detail pages ─────────────────────────
  const PROJECT_SLUGS = ['khalai-brand', 'mavuno', 'chama-ledger', 'sokoni'];
  const projectEntries = PROJECT_SLUGS.flatMap((slug) =>
    entriesForPath(`/projects/${slug}`, 'monthly', 0.7, now)
  );

  return [...staticEntries, ...reportEntries, ...projectEntries];
}
