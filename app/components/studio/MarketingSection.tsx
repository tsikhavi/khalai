'use client';

import Link from 'next/link';
import {motion} from 'motion/react';
import {useLocale, useTranslations} from 'next-intl';
import {useRef} from 'react';
import { buildServices } from '@/lib/marketing-services';

export function MarketingSection() {
  const t = useTranslations('Marketing');
  const services = buildServices(t);
  const locale = useLocale();

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-20">
      {/* ── Header ────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 md:px-16">
        <p className="text-xs uppercase tracking-[0.3em] text-laurel-700 dark:text-laurel-300">
          {t('kicker')}
        </p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl font-serif text-4xl leading-[1.05] md:text-5xl">
            {t('title')}
          </h2>
          <Link
            href={`/${locale}/marketing`}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-laurel-700 underline-offset-4 hover:underline dark:text-laurel-300">
            See all services →
          </Link>
        </div>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/70">
          {t('body')}
        </p>
      </div>

      {/* ── Horizontal carousel ───────────────────── */}
      <div className="mt-12 overflow-hidden">
        <div
          ref={containerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollPaddingLeft: '1.5rem',
            scrollPaddingRight: '1.5rem',
          }}>
          {/* Padding on first and last cards via wrapper */}
          <div
            className="shrink-0 pl-6 md:pl-16"
            aria-hidden
          />
  {services.map((service) => (
            <motion.div
              key={service.slug}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.3}}
              transition={{
                delay: 0.05,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-80 shrink-0 snap-start md:w-96">
              <ServiceCard
                service={service}
                locale={locale}
                timeLabel={t('services.timeLabel')}
                breakdownLabel={t('services.breakdownLabel')}
                viewLabel={t('services.view')}
              />
            </motion.div>
          ))}
          <div
            className="shrink-0 pr-6 md:pr-16"
            aria-hidden
          />
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────── */}
      <div className="mx-auto mt-12 max-w-5xl px-6 md:px-16">
        <div className="rounded-2xl border border-laurel-500/30 bg-laurel-500/5 p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="font-serif text-2xl leading-tight md:text-3xl">
                {t('cta.title')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                {t('cta.body')}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-laurel-700 px-5 text-sm font-medium text-white transition-colors hover:bg-laurel-800 dark:bg-laurel-500 dark:text-black dark:hover:bg-laurel-400">
                {t('cta.contact')}
              </Link>
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-foreground/20 px-5 text-sm font-medium transition-colors hover:border-foreground/40">
                {t('cta.whatsapp')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
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
      className="group relative block h-full overflow-hidden rounded-xl border border-foreground/10 bg-background p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-laurel-500/40 hover:shadow-lg">
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
