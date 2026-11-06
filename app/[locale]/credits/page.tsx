//import {getTranslations} from 'next-intl/server';
import Link from 'next/link';
import {PHOTO_CREDITS} from '@/lib/credits';

export const metadata = {
  title: 'Photo Credits — Khalai Studio',
  description: 'Attribution for photography sourced from Unsplash.',
};

export default async function CreditsPage() {
  //const t = await getTranslations('Credits');

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 md:px-16">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-laurel-700 dark:text-laurel-300">
          Credits
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
          Photography credits.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/70">
          Some of the photographs on this site were sourced from Unsplash. They
          are free to use under the Unsplash License, but we credit the
          photographers anyway — because they gifted their work for free.
        </p>
      </header>

      <section className="mt-16">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/50">
          Photographers
        </h2>

        <ul className="mt-6 divide-y divide-foreground/10 border-y border-foreground/10">
          {PHOTO_CREDITS.map((credit, i) => (
            <li
              key={i}
              className="py-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <a
                  href={`${credit.profileUrl}?utm_source=khalai_studio&utm_medium=referral`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground underline-offset-4 hover:text-laurel-700 hover:underline dark:hover:text-laurel-300">
                  {credit.photographer}
                </a>
                <span className="text-xs text-foreground/50">
                  {credit.usedOn}
                </span>
              </div>
              <a
                href={`${credit.imageUrl}?utm_source=khalai_studio&utm_medium=referral`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-xs text-foreground/40 hover:text-foreground/60">
                View original →
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-xl border border-foreground/10 bg-foreground/2 p-6">
        <p className="text-sm leading-relaxed text-foreground/70">
          All photographs are used under the{' '}
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground">
            Unsplash License
          </a>
          , which permits free commercial and non-commercial use without
          attribution. We provide credit here as a gesture of thanks.
        </p>
        <p className="mt-3 text-xs text-foreground/40">
          If you are a photographer and would like an image removed, email{' '}
          <a
            href="mailto:hello@khalai.studio"
            className="underline">
            hello@khalai.studio
          </a>
          .
        </p>
      </section>

      <div className="mt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-laurel-700 hover:underline dark:text-laurel-300">
          ← Back to the studio
        </Link>
      </div>
    </main>
  );
}
