import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getTranslations, getLocale} from 'next-intl/server';
import { getServiceFromT, SERVICE_SLUGS } from '@/lib/marketing-services';
import OpportunityScanner from './opportunity-scanner';
import LeadsPreview from './leads-preview';

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
    const { slug } = await params;

const t = await getTranslations('Marketing.serviceDetail');
  const tService = await getTranslations('Marketing');

const service = getServiceFromT(tService, slug);
if (!service) notFound();

  const locale = await getLocale();

  return (
    <main className="mx-auto max-w-5xl px-6 py-20 md:px-16">
      {/* Breadcrumb */}
      <Link
        href={`/${locale}/marketing`}
        className="inline-flex items-center gap-1 text-sm text-foreground/50 hover:text-foreground">
        ← {t('back')}
      </Link>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-laurel-700 dark:text-laurel-300">
          {service.short}
        </p>
        <h1 className="mt-3 font-serif text-5xl leading-[1.05] md:text-6xl">
          {service.plain}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/70">
          {service.detail}
        </p>
      </header>

      {/* Quick facts */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-foreground/10 p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/50">
            {t('time')}
          </p>
          <p className="mt-2 text-sm font-medium">{service.time}</p>
        </div>
        <div className="rounded-xl border border-foreground/10 p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/50">
            {t('sme')}
          </p>
          <p className="mt-2 text-sm font-medium">{service.costSme}</p>
        </div>
        <div className="rounded-xl border border-foreground/10 p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/50">
            {t('brand')}
          </p>
          <p className="mt-2 text-sm font-medium">{service.costBrand}</p>
        </div>
      </div>

      {/* Cost breakdown */}
      <section className="mt-16">
        <h2 className="font-serif text-2xl md:text-3xl">
          {t('breakdownTitle')}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/60">
          {t('breakdownBody')}
        </p>
        <ul className="mt-6 divide-y divide-foreground/10 overflow-hidden rounded-xl border border-foreground/10">
          {service.breakdown.map((line, i) => (
            <li
              key={i}
              className="flex items-baseline justify-between gap-4 px-5 py-3 text-sm">
              <span className="text-foreground/70">{line.label}</span>
              <span className="text-right font-medium text-foreground/90">
                {line.value}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Live preview for the leads service */}
      {service.slug === 'leads' && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl md:text-3xl">
            {t('exampleTitle')}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-foreground/60">
            {t('exampleBody')}
          </p>

          <LeadsPreview />
        </section>
      )}

      {/* Standard example (photo/video) — skipped for leads */}
      {service.slug !== 'leads' && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl md:text-3xl">
            {t('exampleTitle')}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-foreground/60">
            {t('exampleBody')}
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-foreground/10">
            {service.example.kind === 'video' ? (
              <video
                className="aspect-video w-full bg-foreground/5"
                controls
                preload="metadata"
                src={service.example.src}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={service.example.src}
                alt={service.example.caption}
                className="w-full bg-foreground/5"
              />
            )}
            <p className="border-t border-foreground/10 px-5 py-3 text-xs text-foreground/60">
              {service.example.caption}
            </p>
          </div>
        </section>
      )}

      {/* Brand examples */}
      <section className="mt-16">
        <h2 className="font-serif text-2xl md:text-3xl">{t('brandsTitle')}</h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/60">
          {t('brandsBody')}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {service.brands.map((brand) => (
            <div
              key={brand.name}
              className="rounded-xl border border-foreground/10 p-5">
              <p className="text-sm font-semibold">{brand.name}</p>
              <p className="mt-1 text-sm text-foreground/70">{brand.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Missed opportunities — SEO gets a live scanner */}
      {service.opportunities && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl md:text-3xl">
            {service.opportunities.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-foreground/60">
            {t('opportunitiesBody')}
          </p>

          {/* Live scanner — type a URL, get a real check */}
          <OpportunityScanner
            labels={{
              inputPlaceholder: t('scanner.placeholder'),
              inputButton: t('scanner.button'),
              inputHelper: t('scanner.helper'),
              statusMissing: t('scanner.status.missing'),
              statusWeak: t('scanner.status.weak'),
              statusPresent: t('scanner.status.present'),
              resultsTitle: t('scanner.resultsTitle'),
              errorGeneric: t('scanner.error'),
            }}
          />

          {/* Sample results for readers who don't scan */}
          <div className="mt-8 rounded-xl border border-foreground/10 p-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/50">
              {t('sampleLabel')}
            </p>
            <ul className="mt-4 divide-y divide-foreground/10">
              {service.opportunities.rows.map((row, i) => (
                <li
                  key={i}
                  className="flex flex-wrap items-baseline justify-between gap-2 py-3 text-sm">
                  <div className="flex-1">
                    <span className="font-medium">{row.item}</span>
                    <span className="ml-2 text-xs text-foreground/50">
                      {row.note}
                    </span>
                  </div>
                  <StatusPill status={row.status} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-20 rounded-2xl border border-laurel-500/30 bg-laurel-500/5 p-10 text-center">
        <h2 className="font-serif text-2xl md:text-3xl">{t('cta.title')}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-foreground/70">
          {t('cta.body')}
        </p>
        <Link
          href={`/${locale}/contact?service=${service.slug}`}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-laurel-700 px-5 text-sm font-medium text-white hover:bg-laurel-800 dark:bg-laurel-500 dark:text-black dark:hover:bg-laurel-400">
          {t('cta.button')}
        </Link>
      </section>
    </main>
  );
}

function StatusPill({status}: {status: 'missing' | 'weak' | 'present'}) {
  const cls =
    status === 'missing'
      ? 'bg-secondary/15 text-secondary'
      : status === 'weak'
        ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
        : 'bg-laurel-500/15 text-laurel-700 dark:text-laurel-300';
  const label =
    status === 'missing' ? 'Missing' : status === 'weak' ? 'Weak' : 'OK';
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${cls}`}>
      {label}
    </span>
  );
}
