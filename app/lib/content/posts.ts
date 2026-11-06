import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/* ==================================================================
   Types
   ================================================================== */

export type PostFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  cover: string;
  draft?: boolean;
  featured?: boolean;
  tags?: string[];
  /** Optional — if set, overrides the locale inferred from the filename */
  locale?: string;
  /** Optional — points to the canonical version of a translation */
  translationOf?: string;
};

export type PostMeta = {
  slug: string;
  locale: string;
  title: string;
  excerpt: string;
  date: string;
  formattedDate: string;
  category: string;
  cover: string;
  readingTime: string;
  readingMinutes: number;
  wordCount: number;
  tags: string[];
  featured: boolean;
  draft: boolean;
  /** Slugs that exist in other locales for this post */
  translations: Record<string, string>;
};

export type Post = PostMeta & {
  content: string;
};

/* ==================================================================
   Config
   ================================================================== */

const CONTENT_DIR = path.join(process.cwd(), 'content', 'journal');
const WORDS_PER_MINUTE = 220;
const DEFAULT_LOCALE = 'en';

const includeDraftsDefault = process.env.NODE_ENV === 'development';

/* ==================================================================
   Internal helpers
   ================================================================== */

function isMdxFile(name: string): boolean {
  return name.endsWith('.mdx') || name.endsWith('.md');
}

/**
 * Parse a filename into { baseSlug, locale }.
 *   hello.mdx          → { baseSlug: 'hello', locale: 'en' }
 *   hello.sw.mdx       → { baseSlug: 'hello', locale: 'sw' }
 *   hello.en.mdx       → { baseSlug: 'hello', locale: 'en' }
 */
function parseFilename(filename: string): {
  baseSlug: string;
  locale: string;
} {
  const withoutExt = filename.replace(/\.mdx?$/, '');
  const parts = withoutExt.split('.');

  // Only treat the trailing segment as a locale if it looks like one
  // (2–5 letters, lowercase). Prevents `my.post.mdx` from parsing as locale "post".
  if (parts.length > 1) {
    const last = parts[parts.length - 1];
    if (/^[a-z]{2}(-[a-z]{2,4})?$/i.test(last)) {
      return {
        baseSlug: parts.slice(0, -1).join('.'),
        locale: last.toLowerCase(),
      };
    }
  }
  return {baseSlug: withoutExt, locale: DEFAULT_LOCALE};
}

function calculateReadingStats(content: string) {
  const prose = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/[#>*_~\-]+/g, '');

  const wordCount = prose.trim().split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
  return {
    wordCount,
    readingMinutes,
    readingTime: `${readingMinutes} min read`,
  };
}

function formatDate(iso: string, locale: string): string {
  try {
    return new Date(iso).toLocaleDateString(
      locale === 'en' ? 'en-KE' : locale,
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );
  } catch {
    return new Date(iso).toLocaleDateString('en-KE');
  }
}

function normalizeFrontmatter(
  slug: string,
  data: Record<string, unknown>,
  inferredLocale: string
): PostFrontmatter {
  const required = ['title', 'excerpt', 'date', 'cover'];
  for (const key of required) {
    if (!data[key]) {
      throw new Error(
        `[posts] Missing "${key}" in frontmatter of content/journal/${slug}.mdx`
      );
    }
  }
  return {
    title: String(data.title),
    excerpt: String(data.excerpt),
    date: String(data.date),
    category: data.category ? String(data.category) : 'Journal',
    cover: String(data.cover),
    draft: Boolean(data.draft),
    featured: Boolean(data.featured),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    locale: data.locale ? String(data.locale) : inferredLocale,
    translationOf: data.translationOf ? String(data.translationOf) : undefined,
  };
}

/* ==================================================================
   Index
   ================================================================== */

type ContentIndex = Map<string, Map<string, string>>;

let _indexCache: ContentIndex | null = null;
const IS_DEV = process.env.NODE_ENV === 'development';

function buildIndex(): ContentIndex {
  if (!fs.existsSync(CONTENT_DIR)) return new Map();

  const files = fs.readdirSync(CONTENT_DIR).filter(isMdxFile);
  const index: ContentIndex = new Map();

  for (const filename of files) {
    const {baseSlug, locale} = parseFilename(filename);
    if (!index.has(baseSlug)) index.set(baseSlug, new Map());
    index.get(baseSlug)!.set(locale, filename);
  }

  return index;
}

function getIndex(): ContentIndex {
  // In production, cache the index once — the filesystem doesn't
  // change while the server is running.
  // In development, rebuild on every call so newly-added .mdx files
  // (e.g. translations) are picked up immediately.
  if (IS_DEV) return buildIndex();
  if (!_indexCache) _indexCache = buildIndex();
  return _indexCache;
}

export function resetPostIndex(): void {
  _indexCache = null;
}

/* ==================================================================
   Read
   ================================================================== */

function readFileAt(
  baseSlug: string,
  locale: string,
  index: ContentIndex
): Post | null {
  const localeMap = index.get(baseSlug);
  if (!localeMap) return null;

  // Fallback chain: exact locale → default locale → any locale
  const filename =
    localeMap.get(locale) ??
    localeMap.get(DEFAULT_LOCALE) ??
    Array.from(localeMap.values())[0];

  if (!filename) return null;

  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const {data, content} = matter(raw);

  const {locale: inferredLocale} = parseFilename(filename);
  const fm = normalizeFrontmatter(baseSlug, data, inferredLocale);
  const stats = calculateReadingStats(content);

  // Build the translations map: locale → slug (the slug is the same as
  // baseSlug here; if you want per-locale slugs, use a frontmatter field).
  const translations: Record<string, string> = {};
  for (const [loc] of localeMap) translations[loc] = baseSlug;
  {
    /**
  
  console.log(
  '[posts] localeMap keys:',
  JSON.stringify(Array.from(localeMap.keys())),
  'requested:',
  JSON.stringify(locale),
  'match:',
  localeMap.has(locale),
)

  console.log(
  '[posts] readFileAt(%s, %s) → file=%s, locales=%s',
  baseSlug,
  locale,
  filename,
  Array.from(localeMap.keys()).join(','),
)
 */
  }
  return {
    slug: baseSlug,
    locale: fm.locale ?? inferredLocale,
    title: fm.title,
    excerpt: fm.excerpt,
    date: fm.date,
    formattedDate: formatDate(fm.date, fm.locale ?? inferredLocale),
    category: fm.category,
    cover: fm.cover,
    tags: fm.tags ?? [],
    featured: fm.featured ?? false,
    draft: fm.draft ?? false,
    translations,
    content,
    ...stats,
  };
}

/* ==================================================================
   Public API
   ================================================================== */

type ListOpts = {
  includeDrafts?: boolean;
  locale?: string;
};

/**
 * All posts, sorted newest-first, for a given locale.
 * Falls back to English for posts that don't have a translation.
 */
export function getAllPosts(opts?: ListOpts): Post[] {
  const includeDrafts = opts?.includeDrafts ?? includeDraftsDefault;
  const locale = opts?.locale ?? DEFAULT_LOCALE;
  const index = getIndex();

  const posts: Post[] = [];
  for (const baseSlug of index.keys()) {
    const post = readFileAt(baseSlug, locale, index);
    if (!post) continue;
    if (post.draft && !includeDrafts) continue;
    posts.push(post);
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostsMeta(opts?: ListOpts): PostMeta[] {
  return getAllPosts(opts).map(({content: _content, ...meta}) => meta);
}

export function getAllPostSlugs(opts?: ListOpts): string[] {
  return getAllPosts(opts).map((p) => p.slug);
}

export function getPostBySlug(slug: string, opts?: ListOpts): Post | null {
  const includeDrafts = opts?.includeDrafts ?? includeDraftsDefault;
  const locale = opts?.locale ?? DEFAULT_LOCALE;
  const post = readFileAt(slug, locale, getIndex());
  if (!post) return null;
  if (post.draft && !includeDrafts) return null;
  return post;
}

export function getLatestPost(opts?: ListOpts): Post | null {
  return getAllPosts(opts)[0] ?? null;
}

export function getFeaturedPost(opts?: ListOpts): Post | null {
  return getAllPosts(opts).find((p) => p.featured) ?? null;
}

export function getAllCategories(opts?: ListOpts): string[] {
  const set = new Set(getAllPosts(opts).map((p) => p.category));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function getAllTags(opts?: ListOpts): string[] {
  const set = new Set<string>();
  for (const p of getAllPosts(opts)) for (const t of p.tags) set.add(t);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function getPostsByCategory(category: string, opts?: ListOpts): Post[] {
  return getAllPosts(opts).filter((p) => p.category === category);
}

export function getRelatedPosts(
  slug: string,
  limit = 3,
  opts?: ListOpts
): Post[] {
  const all = getAllPosts(opts);
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];

  const overlap = (a: Post, b: Post) =>
    a.tags.filter((t) => b.tags.includes(t)).length;

  const sameCategory = all.filter(
    (p) => p.slug !== slug && p.category === current.category
  );
  const sameTags = all
    .filter(
      (p) =>
        p.slug !== slug &&
        p.category !== current.category &&
        overlap(p, current) > 0
    )
    .sort((a, b) => overlap(b, current) - overlap(a, current));

  return [...sameCategory, ...sameTags].slice(0, limit);
}

export function getPaginatedPosts(page = 1, perPage = 9, opts?: ListOpts) {
  const all = getAllPostsMeta(opts);
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  const posts = all.slice(start, start + perPage);

  return {
    posts,
    page: safePage,
    perPage,
    totalPages,
    total,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  };
}

export function searchPosts(query: string, opts?: ListOpts): PostMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return getAllPosts(opts)
    .filter((p) => {
      const haystack = [p.title, p.excerpt, p.category, ...p.tags, p.content]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    })
    .map(({content: _content, ...meta}) => meta);
}

export function getAdjacentPosts(slug: string, opts?: ListOpts) {
  const all = getAllPosts(opts);
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return {prev: null, next: null};

  const newer = idx > 0 ? all[idx - 1] : null;
  const older = idx < all.length - 1 ? all[idx + 1] : null;

  return {
    prev: newer ? stripContent(newer) : null,
    next: older ? stripContent(older) : null,
  };
}

function stripContent(post: Post): PostMeta {
  const {content: _content, ...meta} = post;
  return meta;
}

export function getTotalReadingMinutes(opts?: ListOpts): number {
  return getAllPosts(opts).reduce((sum, p) => sum + p.readingMinutes, 0);
}

/** All locales that have at least one post. */
export function getAvailableLocales(): string[] {
  const index = getIndex();
  const set = new Set<string>();
  for (const localeMap of index.values()) {
    for (const loc of localeMap.keys()) set.add(loc);
  }
  return Array.from(set).sort();
}
