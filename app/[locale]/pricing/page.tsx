import Link from 'next/link';
import {getTranslations, getLocale} from 'next-intl/server';

export default async function PricingPage() {
  const t = await getTranslations('Pricing');
  const locale = await getLocale();

  /* ── Starter / SME track ───────────────────────────────── */
  const starterTiers = [
    {
      key: 'launch',
      name: t('starter.launch.name'),
      price: t('starter.launch.price'),
      usd: t('starter.launch.usd'),
      cadence: t('starter.launch.cadence'),
      description: t('starter.launch.description'),
      features: t.raw('starter.launch.features') as string[],
      notIncluded: t.raw('starter.launch.notIncluded') as string[],
      cta: t('starter.launch.cta'),
      highlight: false,
    },
    {
      key: 'grow',
      name: t('starter.grow.name'),
      price: t('starter.grow.price'),
      usd: t('starter.grow.usd'),
      cadence: t('starter.grow.cadence'),
      description: t('starter.grow.description'),
      features: t.raw('starter.grow.features') as string[],
      notIncluded: [],
      cta: t('starter.grow.cta'),
      highlight: true,
    },
    {
      key: 'care',
      name: t('starter.care.name'),
      price: t('starter.care.price'),
      usd: t('starter.care.usd'),
      cadence: t('starter.care.cadence'),
      description: t('starter.care.description'),
      features: t.raw('starter.care.features') as string[],
      notIncluded: [],
      cta: t('starter.care.cta'),
      highlight: false,
    },
  ];

  /* ── Studio / Brand track ──────────────────────────────── */
  const studioTiers = [
    {
      key: 'brand',
      name: t('studio.brand.name'),
      price: t('studio.brand.price'),
      cadence: t('studio.brand.cadence'),
      description: t('studio.brand.description'),
      features: t.raw('studio.brand.features') as string[],
      cta: t('studio.brand.cta'),
      highlight: false,
    },
    {
      key: 'custom',
      name: t('studio.custom.name'),
      price: t('studio.custom.price'),
      cadence: t('studio.custom.cadence'),
      description: t('studio.custom.description'),
      features: t.raw('studio.custom.features') as string[],
      cta: t('studio.custom.cta'),
      highlight: true,
    },
    {
      key: 'partner',
      name: t('studio.partner.name'),
      price: t('studio.partner.price'),
      cadence: t('studio.partner.cadence'),
      description: t('studio.partner.description'),
      features: t.raw('studio.partner.features') as string[],
      cta: t('studio.partner.cta'),
      highlight: false,
    },
  ];

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
      </header>

      {/* ── Two-track selector ──────────────────────────── */}
      <div className="mt-10 flex flex-wrap gap-2 rounded-full border border-foreground/10 p-1 md:inline-flex">
        <a
          href="#starter"
          className="rounded-full bg-laurel-700 px-4 py-1.5 text-sm font-medium text-white dark:bg-laurel-500 dark:text-black">
          {t('trackSelector.starter')}
        </a>
        <a
          href="#studio"
          className="rounded-full px-4 py-1.5 text-sm font-medium text-foreground/70 hover:bg-foreground/5">
          {t('trackSelector.studio')}
        </a>
      </div>

      {/* ═════════════════════════════════════════════════
          STARTER TRACK — SMEs, freelancers, side-hustles
         ═════════════════════════════════════════════════ */}
      <section
        id="starter"
        className="mt-20 scroll-mt-24">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl">
            {t('starter.title')}
          </h2>
          <p className="mt-2 text-sm text-foreground/60">
            {t('starter.subtitle')}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {starterTiers.map((tier) => (
            <div
              key={tier.key}
              className={`relative rounded-2xl border p-6 ${
                tier.highlight
                  ? 'border-laurel-500/40 bg-laurel-500/5 ring-1 ring-laurel-500/20'
                  : 'border-foreground/10'
              }`}>
              {tier.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-laurel-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-black">
                  {t('mostChosen')}
                </span>
              )}

              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-foreground/60">
                {tier.description}
              </p>

              <div className="mt-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-sm text-foreground/60">
                    {tier.cadence}
                  </span>
                </div>
                {tier.usd && (
                  <p className="mt-1 text-xs text-foreground/50">{tier.usd}</p>
                )}
              </div>

              <ul className="mt-6 space-y-2">
                {tier.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-laurel-500/15 text-laurel-700 dark:text-laurel-300">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-2.5 w-2.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3">
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
                {tier.notIncluded.length > 0 && (
                  <>
                    <li className="pt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                      {t('notIncluded')}
                    </li>
                    {tier.notIncluded.map((f, j) => (
                      <li
                        key={`x-${j}`}
                        className="flex items-start gap-2 text-sm">
                        <span className="mt-1 h-4 w-4 shrink-0 text-center text-foreground/30">
                          —
                        </span>
                        <span className="text-foreground/50">{f}</span>
                      </li>
                    ))}
                  </>
                )}
              </ul>

              <Link
                href={`/${locale}/contact`}
                className={`mt-8 flex h-11 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  tier.highlight
                    ? 'bg-laurel-700 text-white hover:bg-laurel-800 dark:bg-laurel-500 dark:text-black dark:hover:bg-laurel-400'
                    : 'border border-foreground/20 hover:border-foreground/40'
                }`}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Honest note about the cheap tier */}
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-foreground/50">
          {t('starter.note')}
        </p>
      </section>

      {/* ═════════════════════════════════════════════════
          STUDIO TRACK — funded startups, established brands
         ═════════════════════════════════════════════════ */}
      <section
        id="studio"
        className="mt-24 scroll-mt-24">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl">
            {t('studio.title')}
          </h2>
          <p className="mt-2 text-sm text-foreground/60">
            {t('studio.subtitle')}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {studioTiers.map((tier) => (
            <div
              key={tier.key}
              className={`relative rounded-2xl border p-6 ${
                tier.highlight
                  ? 'border-laurel-500/40 bg-laurel-500/5 ring-1 ring-laurel-500/20'
                  : 'border-foreground/10'
              }`}>
              {tier.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-laurel-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-black">
                  {t('mostChosen')}
                </span>
              )}

              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-foreground/60">
                {tier.description}
              </p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight">
                  {tier.price}
                </span>
                <span className="text-sm text-foreground/60">
                  {tier.cadence}
                </span>
              </div>

              <ul className="mt-6 space-y-2">
                {tier.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-laurel-500/15 text-laurel-700 dark:text-laurel-300">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-2.5 w-2.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3">
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/${locale}/contact`}
                className={`mt-8 flex h-11 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  tier.highlight
                    ? 'bg-laurel-700 text-white hover:bg-laurel-800 dark:bg-laurel-500 dark:text-black dark:hover:bg-laurel-400'
                    : 'border border-foreground/20 hover:border-foreground/40'
                }`}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Upgrade path ───────────────────────────────── */}
      <section className="mt-24 rounded-2xl border border-foreground/10 p-8 md:p-10">
        <h2 className="font-serif text-2xl md:text-3xl">
          {t('upgrade.title')}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/70">
          {t('upgrade.body')}
        </p>

        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {t
            .raw('upgrade.steps')
            .map((step: {title: string; body: string}, i: number) => (
              <li
                key={i}
                className="rounded-xl border border-foreground/10 p-5">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-laurel-500/15 text-xs font-semibold text-laurel-700 dark:text-laurel-300">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-sm font-semibold">{step.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-foreground/60">
                  {step.body}
                </p>
              </li>
            ))}
        </ol>
      </section>

      {/* ── FAQ ────────────────────────────────────────── */}
      <section className="mt-24 max-w-3xl">
        <h2 className="font-serif text-3xl md:text-4xl">{t('faq.title')}</h2>

        <div className="mt-8 divide-y divide-foreground/10">
          {t.raw('faq.items').map((item: {q: string; a: string}, i: number) => (
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

      {/* ── CTA ────────────────────────────────────────── */}
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
