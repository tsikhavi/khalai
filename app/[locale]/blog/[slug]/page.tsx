import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {MDXRemote} from 'next-mdx-remote/rsc';
import type {Metadata} from 'next';

import {BlogPostLayout} from '@/components/studio/BlogPostLayout';
import {PostCard} from '@/components/studio/PostCard';
import {CallToAction} from '@/components/mdx/CallToAction';
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from '@/lib/content/posts';

type Props = {params: Promise<{locale: string; slug: string}>};

export async function generateStaticParams() {
  return getAllPostSlugs({locale: 'en'}).map((slug) => ({slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const post = getPostBySlug(slug, {locale});
  if (!post) return {};

  return {
    title: `${post.title} · Khalai Studio`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.cover ? [{url: post.cover}] : undefined,
      type: 'article',
      publishedTime: post.date,
      locale: post.locale,
    },
    alternates: {
      languages: Object.fromEntries(
        Object.entries(post.translations).map(([loc]) => [
          loc,
          `/${loc}/blog/${slug}`,
        ])
      ),
    },
  };
}

// 👇 Component map — MDX resolves `<CallToAction>` against this
const mdxComponents = {
  CallToAction,
};

export default async function BlogPostPage({params}: Props) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(slug, {locale});
  if (!post) notFound();

  const {content, ...meta} = post;
  const related = getRelatedPosts(slug, 3, {locale}).map(
    ({content, ...m}) => m
  );

  const t = await getTranslations('Blog');

  return (
    <>
      <BlogPostLayout
        meta={meta}
        locale={locale}>
        <MDXRemote
          source={content}
          components={mdxComponents}
        />
      </BlogPostLayout>

      {related.length > 0 && (
        <section className="border-t border-neutral-200 py-20 dark:border-neutral-800">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-10 text-2xl font-semibold tracking-tight">
              {t('relatedTitle')}
            </h2>
            <div className="grid gap-10 md:grid-cols-3">
              {related.map((p, i) => (
                <PostCard
                  key={p.slug}
                  post={p}
                  index={i}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
