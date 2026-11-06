import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';

import {BlogIndex} from '@/components/studio/BlogIndex';
import {getAllPosts} from '@/lib/content/posts';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Blog'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function BlogPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const posts = getAllPosts({locale}).map(({content, ...meta}) => meta);

  return (
    <BlogIndex
      posts={posts}
      locale={locale}
    />
  );
}
