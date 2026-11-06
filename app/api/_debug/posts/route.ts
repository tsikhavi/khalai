import {NextResponse} from 'next/server';
import {getAllPosts} from '@/lib/content/posts';

export async function GET() {
  const locales = ['en', 'sw', 'es', 'fr', 'ru', 'ar'];
  const result: Record<string, Record<string, string[]>> = {};

  for (const locale of locales) {
    result[locale] = {};
    for (const post of getAllPosts({locale})) {
      result[locale][post.slug] = Object.keys(post.translations);
    }
  }

  return NextResponse.json(result);
}
