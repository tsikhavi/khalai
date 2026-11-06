import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import Link from 'next/link';
import {MDXRemote} from 'next-mdx-remote/rsc';

import {getLegalSource} from '@/lib/legal';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Legal'});
  return {
    title: t('terms.metaTitle'),
    description: t('terms.metaDescription'),
  };
}

export default async function TermsPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'Legal'});
  const source = getLegalSource('terms', locale);

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
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
    </main>
  );
}
