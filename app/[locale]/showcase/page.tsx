import Link from 'next/link';
import {getTranslations, getLocale} from 'next-intl/server';

const EXPERIENCES = [
  {
    slug: 'creativity',
    href: '/creativity',
    accent: '#c8ff01',
    preview: 'radial-gradient(circle at 30% 40%, #c8ff0130, transparent 60%)',
  },
  {
    slug: 'horizontal',
    href: '/horizontal',
    accent: '#15ff00',
    preview: 'linear-gradient(135deg, #15ff0020 0%, transparent 60%)',
  },
  {
    slug: 'typography',
    href: '/typography',
    accent: '#c9613f',
    preview: 'radial-gradient(circle at 70% 40%, #c9613f30, transparent 65%)',
  },
  {
    slug: 'systems',
    href: '/systems',
    accent: '#0ad300',
    preview: 'radial-gradient(circle at 50% 60%, #0ad30030, transparent 65%)',
  },
  {
    slug: 'music',
    href: '/music',
    accent: '#533483',
    preview: 'radial-gradient(circle at 40% 50%, #53348340, transparent 65%)',
  },
  {
    slug: 'photography',
    href: '/photography',
    accent: '#c9613f',
    preview: 'radial-gradient(circle at 60% 40%, #c9613f28, transparent 65%)',
  },
  {
    slug: 'kitchen',
    href: '/kitchen',
    accent: '#0ad300',
    preview: 'radial-gradient(circle at 30% 60%, #0ad30028, transparent 65%)',
  },
];

export default async function ShowcasePage() {
  const t = await getTranslations('Showcase');
  const locale = await getLocale();

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 md:px-16">
      <header className="max-w-2xl">
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

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {EXPERIENCES.map((exp, i) => (
          <Link
            key={exp.slug}
            href={`/${locale}${exp.href}`}
            className="group relative overflow-hidden rounded-2xl border border-foreground/10 p-8 transition-all hover:-translate-y-1 hover:border-laurel-500/40 hover:shadow-xl">
            {/* Accent glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-60 transition-opacity group-hover:opacity-100"
              style={{background: exp.preview}}
            />

            <div className="relative">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: `${exp.accent}20`,
                  color: exp.accent,
                }}>
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{backgroundColor: exp.accent}}
                />
                {String(i + 1).padStart(2, '0')}
              </span>

              <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                {t(`experiences.${exp.slug}.title`)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {t(`experiences.${exp.slug}.body`)}
              </p>

              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-laurel-700 dark:text-laurel-300">
                {t('open')} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
