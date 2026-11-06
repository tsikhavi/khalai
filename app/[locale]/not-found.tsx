import Link from 'next/link';
import {getLocale, getTranslations} from 'next-intl/server';
import LostScene from '@/components/illustrations/lost-scene';

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations('NotFound');

  return (
    <main className="relative min-h-[90vh] overflow-hidden px-6 py-20 md:px-16">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,var(--color-laurel-500)/0.08,transparent_65%)]"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-12 md:flex-row md:items-start md:gap-16 md:pt-12">
        {/* SVG scene */}
        <div className="shrink-0 md:w-1/2">
          <LostScene label={t('svgAria')} />
        </div>

        {/* Copy and actions */}
        <div className="flex-1 text-center md:pt-8 md:text-left">
          <p className="text-xs uppercase tracking-[0.3em] text-laurel-700 dark:text-laurel-300">
            {t('eyebrow')}
          </p>

          <h1 className="mt-4 font-serif text-5xl leading-[1.02] md:text-6xl">
            {t('title')}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-foreground/70">
            {t('body')}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link
              href={`/${locale}`}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-laurel-700 px-5 text-sm font-medium text-white transition-colors hover:bg-laurel-800 dark:bg-laurel-500 dark:text-black dark:hover:bg-laurel-400">
              {t('home')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-foreground/20 px-5 text-sm font-medium transition-colors hover:border-foreground/40">
              {t('contact')}
            </Link>
          </div>

          {/* Navigate elsewhere */}
          <div className="mt-10 border-t border-foreground/10 pt-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">
              {t('orExplore')}
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {[
                {href: '/studio', label: t('nav.studio')},
                {href: '/projects', label: t('nav.projects')},
                {href: '/pricing', label: t('nav.pricing')},
                {href: '/blog', label: t('nav.blog')},
                {href: '/marketing', label: t('nav.marketing')},
                {href: '/showcase', label: t('nav.experiences')},
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-foreground/70 transition-colors hover:text-foreground">
                    {item.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-xs text-foreground/40">{t('hint')}</p>
        </div>
      </div>
    </main>
  );
}
