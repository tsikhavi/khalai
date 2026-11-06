import {Suspense} from 'react';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';

import {fetchProjects} from '@/lib/projects';
import type {ProjectCategory} from '@/lib/types/project';

import {ProjectsHero} from '@/components/project/ProjectsHero';
import {ProjectFilters} from '@/components/project/ProjectFilters';
import {
  ProjectCard,
  ProjectCardSkeleton,
} from '@/components/project/ProjectCard';
import {Pagination} from '@/components/project/Pagination';
import {ContactCTA} from '@/components/contact/ContactCTA';

type Props = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{
    page?: string;
    category?: string;
    q?: string;
  }>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Projects'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      type: 'website',
    },
  };
}

const VALID_CATEGORIES: ProjectCategory[] = [
  'fullstack',
  'frontend',
  'ai',
  'seo',
  'aieo',
];

export default async function ProjectsPage({params, searchParams}: Props) {
  const {locale} = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const page = Math.max(1, Number(sp.page) || 1);
  const category = (VALID_CATEGORIES as string[]).includes(sp.category ?? '')
    ? (sp.category as ProjectCategory)
    : ('all' as const);
  const search = (sp.q ?? '').trim();

  const t = await getTranslations('Projects');

  return (
    <>
      <ProjectsHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <ProjectFilters
        category={category}
        search={search}
      />

      <Suspense
        key={`${page}-${category}-${search}`}
        fallback={<ProjectsGridSkeleton />}>
        <ProjectsGrid
          page={page}
          category={category}
          search={search}
          locale={locale}
        />
      </Suspense>

      <ContactCTA
        title={t('cta.title')}
        body={t('cta.body')}
        primaryLabel={t('cta.primary')}
        secondaryLabel={t('cta.secondary')}
        locale={locale}
      />
    </>
  );
}

async function ProjectsGrid({
  page,
  category,
  search,
  locale,
}: {
  page: number;
  category: ProjectCategory | 'all';
  search: string;
  locale: string;
}) {
  const t = await getTranslations('Projects');
  const data = await fetchProjects({page, pageSize: 9, category, search});

  if (data.items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-paper text-2xl">
          🔍
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">{t('empty')}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-8">
      <ul
        role="list"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((project, i) => (
          <li key={project.id}>
            <ProjectCard
              project={project}
              locale={locale}
              index={i}
            />
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={data.page}
        totalPages={data.totalPages}
        category={category}
        search={search}
      />
    </div>
  );
}

function ProjectsGridSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-8">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({length: 6}).map((_, i) => (
          <li key={i}>
            <ProjectCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
