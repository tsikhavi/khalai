'use client';

import {useState, FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';
import clsx from 'clsx';
import {
  createProject,
  updateProject,
  type ProjectInput,
} from '@/lib/actions/admin-projects';
import type {Project, ProjectCategory} from '@/lib/types/project';

const CATEGORIES: ProjectCategory[] = [
  'fullstack',
  'frontend',
  'ai',
  'seo',
  'aieo',
];

const input =
  'w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-green-500';

export function ProjectForm({
  locale,
  initial,
}: {
  locale: string;
  initial?: Project & {id: string};
}) {
  const t = useTranslations('AdminProjects');
  const router = useRouter();
  const isEdit = !!initial;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectInput>({
    slug: initial?.slug ?? '',
    title: initial?.title ?? '',
    description: initial?.description ?? '',
    content: initial?.content ?? '',
    category: initial?.category ?? 'fullstack',
    tags: initial?.tags ?? [],
    thumbnail: initial?.thumbnail ?? '',
    url: initial?.url ?? '',
    repo: initial?.repo ?? '',
    featured: initial?.featured ?? false,
    published: initial?.published ?? true,
    year: initial?.year ?? new Date().getFullYear(),
    order: initial?.order ?? 0,
  });

  const [tagsInput, setTagsInput] = useState((initial?.tags ?? []).join(', '));

  const set = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) =>
    setForm((p) => ({...p, [key]: value}));

  const autoSlug = (title: string) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload: ProjectInput = {
      ...form,
      tags: tagsInput
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
      thumbnail: form.thumbnail || undefined,
      url: form.url || undefined,
      repo: form.repo || undefined,
      content: form.content || undefined,
    };

    try {
      if (isEdit) {
        await updateProject(initial!.id, payload);
      } else {
        await createProject(payload);
      }
      router.push(`/${locale}/admin/projects`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-3xl space-y-6">
      {error && (
        <p className="rounded-md bg-red-50 dark:bg-red-900/30 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      )}

      {/* Title + slug */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            {t('fields.title')}
          </label>
          <input
            value={form.title}
            onChange={(e) => {
              set('title', e.target.value);
              if (!isEdit && !form.slug) set('slug', autoSlug(e.target.value));
            }}
            required
            className={input}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            {t('fields.slug')}
          </label>
          <input
            value={form.slug}
            onChange={(e) => set('slug', autoSlug(e.target.value))}
            required
            className={input}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          {t('fields.description')}
        </label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          required
          className={clsx(input, 'resize-none')}
        />
      </div>

      {/* Long content */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          {t('fields.content')}
        </label>
        <textarea
          rows={6}
          value={form.content}
          onChange={(e) => set('content', e.target.value)}
          className={clsx(input, 'resize-y font-mono text-xs')}
          placeholder="Markdown or HTML body for the detail page"
        />
      </div>

      {/* Category + year */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">
            {t('fields.category')}
          </label>
          <select
            value={form.category}
            onChange={(e) => set('category', e.target.value as ProjectCategory)}
            className={input}>
            {CATEGORIES.map((c) => (
              <option
                key={c}
                value={c}>
                {t(`categories.${c}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            {t('fields.year')}
          </label>
          <input
            type="number"
            value={form.year ?? ''}
            onChange={(e) =>
              set('year', e.target.value ? Number(e.target.value) : undefined)
            }
            className={input}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            {t('fields.order')}
          </label>
          <input
            type="number"
            value={form.order ?? 0}
            onChange={(e) => set('order', Number(e.target.value))}
            className={input}
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          {t('fields.tags')}
        </label>
        <input
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="react, tailwind, nestjs, postgres"
          className={input}
        />
        <p className="mt-1 text-xs text-neutral-500">{t('fields.tagsHint')}</p>
      </div>

      {/* URLs */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">
            {t('fields.thumbnail')}
          </label>
          <input
            value={form.thumbnail}
            onChange={(e) => set('thumbnail', e.target.value)}
            className={input}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            {t('fields.url')}
          </label>
          <input
            value={form.url}
            onChange={(e) => set('url', e.target.value)}
            className={input}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            {t('fields.repo')}
          </label>
          <input
            value={form.repo}
            onChange={(e) => set('repo', e.target.value)}
            className={input}
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-6">
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={!!form.featured}
            onChange={(e) => set('featured', e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 text-green-500 focus:ring-green-500"
          />
          {t('fields.featured')}
        </label>
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={!!form.published}
            onChange={(e) => set('published', e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 text-green-500 focus:ring-green-500"
          />
          {t('fields.published')}
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push(`/${locale}/admin/projects`)}
          className="rounded-md px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800">
          {t('cancel')}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-green-500 hover:bg-green-600 px-6 py-2 text-sm font-medium text-white disabled:opacity-60">
          {loading
            ? t('saving')
            : isEdit
              ? t('saveChanges')
              : t('createProject')}
        </button>
      </div>
    </form>
  );
}
