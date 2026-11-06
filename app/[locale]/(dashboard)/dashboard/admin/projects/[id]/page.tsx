import {notFound} from 'next/navigation';
import Link from 'next/link';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {cookies} from 'next/headers';
import {ProjectForm} from '@/components/admin/ProjectForm';
import type {Project} from '@/lib/types/project';

type Props = {params: Promise<{locale: string; id: string}>};

async function fetchProjectById(
  id: string,
  token: string
): Promise<Project | null> {
  const API_BASE = process.env.API_URL ?? 'http://localhost:4000/api';
  const res = await fetch(`${API_BASE}/admin/projects?pageSize=200`, {
    headers: {Authorization: `Bearer ${token}`},
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.items.find((p: Project & {id: string}) => p.id === id) ?? null;
}

export default async function EditProjectPage({params}: Props) {
  const {locale, id} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('AdminProjects');

  const token = (await cookies()).get('access_token')?.value;
  if (!token) notFound();

  const project = await fetchProjectById(id, token);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href={`/${locale}/admin/projects`}
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-green-600 transition-colors">
        ← {t('backToList')}
      </Link>
      <h1 className="mt-4 mb-8 text-3xl font-extrabold text-neutral-900 dark:text-white">
        {t('editTitle')}: {project.title}
      </h1>
      <ProjectForm
        locale={locale}
        initial={project as Project & {id: string}}
      />
    </div>
  );
}
