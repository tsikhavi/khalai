'use client';

import {motion} from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import type {PostMeta} from '@/lib/content/posts';

export function PostCard({
  post,
  index = 0,
  locale = 'en',
}: {
  post: PostMeta;
  index?: number;
  locale?: string;
}) {
  return (
    <motion.article
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-80px'}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}>
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="group block">
        <div className="relative aspect-16/10 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
          {post.cover && (
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          )}
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-xs tracking-widest text-neutral-500 uppercase">
            {post.category} · {post.readingTime}
          </p>
          <h3 className="text-xl font-semibold tracking-tight text-neutral-900 transition-colors group-hover:text-accent dark:text-neutral-100">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
