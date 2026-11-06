import {redirect} from 'next/navigation';
import Link from 'next/link';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {cookies} from 'next/headers';
import {fetchAdminProjects} from '@/lib/actions/admin-projects';
import {AdminProjectsTable} from '@/components/admin//AdminProjectsTable';
import {AdminProjectsToolbar} from '@/components/admin/AdminProjectsToolbar';

type Props = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{page?: string; q?: string; category?: string}>;
};

export default async function AdminProjectsPage({params, searchParams}: Props) {
  const {locale} = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const token = (await cookies()).get('access_token')?.value;
  if (!token) redirect(`/${locale}/login?next=/${locale}/admin/projects`);

  const t = await getTranslations('AdminProjects');

  const page = Math.max(1, Number(sp.page) || 1);
  const q = sp.q ?? '';
  const category = sp.category ?? '';

  const data = await fetchAdminProjects({page, pageSize: 20, q, category});

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {t('subtitle', {count: data.total})}
          </p>
        </div>
        <Link
          href={`/${locale}/admin/projects/new`}
          className="inline-flex items-center gap-2 rounded-full bg-green-500 hover:bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          {t('newProject')}
        </Link>
      </header>

      <AdminProjectsToolbar
        category={category}
        search={q}
      />

      <AdminProjectsTable
        items={data.items}
        locale={locale}
        page={data.page}
        totalPages={data.totalPages}
        category={category}
        q={q}
      />
    </div>
  );
}
