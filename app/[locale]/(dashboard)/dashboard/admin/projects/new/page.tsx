import Link from 'next/link';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ProjectForm} from '@/components/admin/ProjectForm';

type Props = {params: Promise<{locale: string}>};

export default async function NewProjectPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('AdminProjects');

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href={`/${locale}/admin/projects`}
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-green-600 transition-colors">
        ← {t('backToList')}
      </Link>
      <h1 className="mt-4 mb-8 text-3xl font-extrabold text-neutral-900 dark:text-white">
        {t('createTitle')}
      </h1>
      <ProjectForm locale={locale} />
    </div>
  );
}
