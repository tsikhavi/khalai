import Link from 'next/link';
import {getTranslations, getLocale} from 'next-intl/server';
import { buildServices } from '@/lib/marketing-services';

type FundingTier = {
  name: string;
  range: string;
  body: string;
  includes: string[];
};

export default async function MarketingPage() {
  const t = await getTranslations('Marketing');
  const locale = await getLocale();
  const services = buildServices(t);

  /* ── Platform timelines: organic vs paid ───────────────── */
  const platforms = [
    {
      name: 'Google Search',
      organic: t('platforms.google.organic'),
      paid: t('platforms.google.paid'),
      note: t('platforms.google.note'),
    },
    {
      name: 'TikTok',
      organic: t('platforms.tiktok.organic'),
      paid: t('platforms.tiktok.paid'),
      note: t('platforms.tiktok.note'),
    },
    {
      name: 'YouTube',
      organic: t('platforms.youtube.organic'),
      paid: t('platforms.youtube.paid'),
      note: t('platforms.youtube.note'),
    },
    {
      name: 'Facebook / Instagram',
      organic: t('platforms.meta.organic'),
      paid: t('platforms.meta.paid'),
      note: t('platforms.meta.note'),
    },
    {
      name: 'X (Twitter)',
      organic: t('platforms.x.organic'),
      paid: t('platforms.x.paid'),
      note: t('platforms.x.note'),
    },
    {
      name: 'Firefox / Browser extensions',
      organic: t('platforms.firefox.organic'),
      paid: t('platforms.firefox.paid'),
      note: t('platforms.firefox.note'),
    },
    {
      name: 'Local / Maps',
      organic: t('platforms.local.organic'),
      paid: t('platforms.local.paid'),
      note: t('platforms.local.note'),
    },
  ];

  /* ── Funding tracks ────────────────────────────────────── */
  const fundingSme = (['test', 'grow', 'scale'] as const).map((key) => ({
    key,
    ...(t.raw(`fundingSme.${key}`) as FundingTier),
  }));

  const fundingBrand = (['test', 'grow', 'scale'] as const).map((key) => ({
    key,
    ...(t.raw(`fundingBrand.${key}`) as FundingTier),
  }));

  const customSme = t.raw('fundingSme.custom') as {title: string; body: string};
  const customBrand = t.raw('fundingBrand.custom') as {
    title: string;
    body: string;
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 md:px-16">
      {/* ── Hero ────────────────────────────────────────── */}
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-laurel-700 dark:text-laurel-300">
          {t('kicker')}
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] md:text-7xl">
          {t('title')}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/70">
          {t('body')}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-laurel-700 px-5 text-sm font-medium text-white hover:bg-laurel-800 dark:bg-laurel-500 dark:text-black dark:hover:bg-laurel-400">
            {t('cta.talk')}
          </Link>
          <a
            href="#what-we-do"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-foreground/20 px-5 text-sm font-medium hover:border-foreground/40">
            {t('cta.read')}
          </a>
        </div>

        <p className="mt-4 text-xs text-foreground/50">{t('noJargon')}</p>
      </header>

      {/* ── Services ────────────────────────────────────── */}
      <section
        id="what-we-do"
        className="mt-24 scroll-mt-24">
        <h2 className="font-serif text-3xl md:text-4xl">
          {t('services.title')}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/60">
          {t('services.subtitle')}
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
          <ServiceCard
            key={service.slug}
            service={service}
            locale={locale}
            timeLabel={t('services.timeLabel')}
            breakdownLabel={t('services.breakdownLabel')}
            viewLabel={t('services.view')}
          />
        ))}
        </div>
      </section>

      {/* ── Platform timelines ──────────────────────────── */}
      <section className="mt-24">
        <h2 className="font-serif text-3xl md:text-4xl">
          {t('platforms.title')}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/60">
          {t('platforms.subtitle')}
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-175 text-sm">
            <thead>
              <tr className="border-b border-foreground/10 text-left">
                <th className="py-3 pr-4 font-medium text-foreground/60">
                  {t('platforms.col.platform')}
                </th>
                <th className="py-3 pr-4 font-medium text-foreground/60">
                  {t('platforms.col.organic')}
                </th>
                <th className="py-3 pr-4 font-medium text-foreground/60">
                  {t('platforms.col.paid')}
                </th>
                <th className="py-3 pr-4 font-medium text-foreground/60">
                  {t('platforms.col.note')}
                </th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((p) => (
                <tr
                  key={p.name}
                  className="border-b border-foreground/5 last:border-0">
                  <td className="py-3 pr-4 font-medium">{p.name}</td>
                  <td className="py-3 pr-4 text-foreground/80">{p.organic}</td>
                  <td className="py-3 pr-4 text-foreground/80">{p.paid}</td>
                  <td className="py-3 pr-4 text-xs text-foreground/60">
                    {p.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-foreground/50">
          {t('platforms.footnote')}
        </p>
      </section>

      {/* ── Funding tracks ──────────────────────────────── */}
      <section className="mt-24">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl">
            {t('tracks.title')}
          </h2>
          <p className="mt-2 text-sm text-foreground/60">
            {t('tracks.subtitle')}
          </p>
        </div>

        {/* Track selector */}
        <div className="mt-8 flex flex-wrap gap-2 rounded-full border border-foreground/10 p-1 md:inline-flex">
          <a
            href="#funding-sme"
            className="rounded-full bg-laurel-700 px-4 py-1.5 text-sm font-medium text-white dark:bg-laurel-500 dark:text-black">
            {t('tracks.selector.sme')}
          </a>
          <a
            href="#funding-brand"
            className="rounded-full px-4 py-1.5 text-sm font-medium text-foreground/70 hover:bg-foreground/5">
            {t('tracks.selector.brand')}
          </a>
        </div>

        {/* ── SME funding ──────────────────────────── */}
        <div
          id="funding-sme"
          className="mt-12 scroll-mt-24">
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold">{t('fundingSme.title')}</h3>
            <p className="mt-1 text-sm text-foreground/60">
              {t('fundingSme.subtitle')}
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {fundingSme.map((f) => (
              <div
                key={f.key}
                className="rounded-xl border border-foreground/10 p-6">
                <h4 className="text-base font-semibold">{f.name}</h4>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-laurel-700 dark:text-laurel-300">
                  {f.range}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {f.body}
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-foreground/60">
                  {f.includes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2">
                      <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-laurel-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-foreground/20 p-6">
            <h4 className="text-sm font-semibold">{customSme.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              {customSme.body}
            </p>
          </div>
        </div>

        {/* ── Brand funding ────────────────────────── */}
        <div
          id="funding-brand"
          className="mt-16 scroll-mt-24">
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold">{t('fundingBrand.title')}</h3>
            <p className="mt-1 text-sm text-foreground/60">
              {t('fundingBrand.subtitle')}
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {fundingBrand.map((f) => (
              <div
                key={f.key}
                className="rounded-xl border border-foreground/10 p-6">
                <h4 className="text-base font-semibold">{f.name}</h4>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-laurel-700 dark:text-laurel-300">
                  {f.range}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {f.body}
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-foreground/60">
                  {f.includes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2">
                      <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-laurel-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-foreground/20 p-6">
            <h4 className="text-sm font-semibold">{customBrand.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              {customBrand.body}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="mt-24 rounded-2xl border border-laurel-500/30 bg-laurel-500/5 p-10 text-center">
        <h2 className="font-serif text-3xl md:text-4xl">{t('cta.title')}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-foreground/70">
          {t('cta.body')}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-laurel-700 px-5 text-sm font-medium text-white hover:bg-laurel-800 dark:bg-laurel-500 dark:text-black dark:hover:bg-laurel-400">
            {t('cta.contact')}
          </Link>
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-foreground/20 px-5 text-sm font-medium hover:border-foreground/40">
            {t('cta.whatsapp')}
          </a>
        </div>
      </section>
    </main>
  );
}

function ServiceCard({
  service,
  locale,
  timeLabel,
  breakdownLabel,
  viewLabel,
}: {
  service: {
    slug: string;
    plain: string;
    detail: string;
    time: string;
    costSme: string;
    costBrand: string;
    breakdown: {label: string; value: string}[];
  };
  locale: string;
  timeLabel: string;
  breakdownLabel: string;
  viewLabel: string;
}) {
  return (
    <Link
      href={`/${locale}/marketing/${service.slug}`}
      className="group relative block overflow-hidden rounded-xl border border-foreground/10 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-laurel-500/40 hover:shadow-lg">
      <h3 className="text-base font-semibold">{service.plain}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">
        {service.detail}
      </p>

      <dl className="mt-4 space-y-2 text-xs">
        <div>
          <dt className="text-[10px] font-medium uppercase tracking-[0.15em] text-foreground/50">
            {timeLabel}
          </dt>
          <dd className="mt-0.5 text-foreground/80">{service.time}</dd>
        </div>
        <div className="grid gap-1 border-t border-foreground/10 pt-2">
          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-foreground/50">SME</dt>
            <dd className="text-right font-medium text-foreground/80">
              {service.costSme}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-foreground/50">Brand</dt>
            <dd className="text-right font-medium text-foreground/80">
              {service.costBrand}
            </dd>
          </div>
        </div>
      </dl>

      {/* Hover: cost breakdown overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-background/95 p-6 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-laurel-700 dark:text-laurel-300">
          {breakdownLabel}
        </p>
        <ul className="mt-3 space-y-1.5 text-xs">
          {service.breakdown.map((line, i) => (
            <li
              key={i}
              className="flex items-baseline justify-between gap-3 border-b border-foreground/5 pb-1 last:border-0">
              <span className="text-foreground/60">{line.label}</span>
              <span className="text-right font-medium text-foreground/90">
                {line.value}
              </span>
            </li>
          ))}
        </ul>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-laurel-700 dark:text-laurel-300">
          {viewLabel} →
        </span>
      </div>
    </Link>
  );
}
