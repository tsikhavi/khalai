import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';

import {fetchProjectBySlug} from '@/lib/projects';
import {ProjectDetailHero} from '@/components/project/ProjectDetailHero';
import {ProjectDetailBody} from '@/components/project/ProjectDetailBody';
import {ProjectDetailCTA} from '@/components/project/ProjectDetailCTA';
import {ContactCTA} from '@/components/contact/ContactCTA';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

// Cache each rendered page for 60 seconds, then refresh in the background
export const revalidate = 60;

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Khalai`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.thumbnail ? [project.thumbnail] : undefined,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({params}: Props) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const project = await fetchProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations('Projects');

  return (
    <>
      <ProjectDetailHero
        project={project}
        locale={locale}
        labels={{
          back: t('categories.backToProjects'),
          category: t(`categories.${project.category}`),
          visitLive: t('categories.visitLive'),
          viewCode: t('categories.viewCode'),
        }}
      />

      <ProjectDetailBody project={project} />

      <ProjectDetailCTA
        title={t('detailCta.title')}
        body={t('detailCta.body')}
        primaryLabel={t('detailCta.primary')}
        locale={locale}
      />

      <ContactCTA
        title={t('cta.title')}
        body={t('cta.body')}
        primaryLabel={t('cta.contactUs')}
        secondaryLabel={t('cta.secondary')}
        locale={locale}
      />
    </>
  );
}
