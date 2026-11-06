'use client';

import {useMemo, useState} from 'react';
import {motion} from 'motion/react';
import {useTranslations} from 'next-intl';
import {PostCard} from './PostCard';
import type {PostMeta} from '@/lib/content/posts';

export function BlogIndex({
  posts,
  locale,
}: {
  posts: PostMeta[];
  locale: string;
}) {
  const t = useTranslations('Blog');

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, [posts]);

  const [active, setActive] = useState('All');

  const filtered = useMemo(() => {
    if (active === 'All') return posts;
    return posts.filter((p) => p.category === active);
  }, [active, posts]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <header className="mb-16 max-w-2xl">
        <p className="text-sm tracking-widest text-neutral-500 uppercase">
          {t('eyebrow')}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          {t('indexTitle')}
        </h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          {t('indexSubtitle')}
        </p>
      </header>

      <div className="mb-12 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              active === cat
                ? 'border-accent bg-accent text-white'
                : 'border-neutral-300 text-neutral-600 hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-neutral-400'
            }`}>
            {cat === 'All' ? t('all') : cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-neutral-500">{t('empty')}</p>
      ) : (
        <motion.div
          layout
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              layout
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}>
              <PostCard
                post={post}
                index={0}
                locale={locale}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
