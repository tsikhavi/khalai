import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import {getAllPosts} from '@/lib/content/posts';
import {PostCard} from './PostCard';

export async function JournalPreview({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'Studio.journalPreview'});
  const posts = getAllPosts({locale}).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className=" py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm tracking-widest text-neutral-500 uppercase">
              {t('eyebrow')}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              {t('title')}
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="hidden shrink-0 text-sm text-neutral-600 underline-offset-4 hover:underline md:inline dark:text-neutral-400">
            {t('allPosts')} →
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard
              key={post.slug}
              post={post}
              index={i}
              locale={locale}
            />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-400">
            {t('allPosts')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
