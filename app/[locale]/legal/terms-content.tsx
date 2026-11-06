import Link from 'next/link';
import {MDXRemote} from 'next-mdx-remote/rsc';
import {getTranslations} from 'next-intl/server';

export async function TermsContent({
  locale,
  source,
}: {
  locale: string;
  source: string;
}) {
  const t = await getTranslations({locale, namespace: 'Legal'});

  return (
    <>
      <header className="mb-12">
        <p className="text-sm tracking-widest text-neutral-500 uppercase">
          {t('terms.title')}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          {t('terms.title')}
        </h1>
        <p className="mt-4 text-sm text-neutral-500">
          {t('terms.lastUpdated')}
        </p>
      </header>

      <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
        <MDXRemote source={source} />
      </article>

      <footer className="mt-16 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <Link
          href={`/${locale}/privacy`}
          className="text-sm text-accent underline-offset-4 hover:underline">
          {t('privacyLink')} →
        </Link>
      </footer>
    </>
  );
}
