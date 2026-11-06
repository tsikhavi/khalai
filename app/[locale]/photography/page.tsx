import {getTranslations} from 'next-intl/server';
import PhotographyDemo from './photography-demo';
import {ShowcaseSwitcher} from '@/components/showcase/switcher';

export default async function PhotographyPage() {
  const t = await getTranslations('Photography');

  const sections = {
    kicker: t('kicker'),
    title: t('title'),
    body: t('body'),
    hero: {scroll: t('hero.scroll')},
    filters: {
      all: t('filters.all'),
      editorial: t('filters.editorial'),
      safari: t('filters.safari'),
      nature: t('filters.nature'),
    },
    gallery: {
      title: t('gallery.title'),
      body: t('gallery.body'),
      view: t('gallery.view'),
      empty: t('gallery.empty'),
    },
    series: {
      title: t('series.title'),
      body: t('series.body'),
      commissions: t('series.commissions'),
      exhibitions: t('series.exhibitions'),
      print: t('series.print'),
    },
    process: {
      title: t('process.title'),
      body: t('process.body'),
      steps: t.raw('process.steps') as {title: string; body: string}[],
    },
    services: {
      title: t('services.title'),
      body: t('services.body'),
      items: t.raw('services.items') as {title: string; body: string}[],
    },
    cta: {
      title: t('cta.title'),
      body: t('cta.body'),
      primary: t('cta.primary'),
      secondary: t('cta.secondary'),
    },
  };

  return (
    <>
      <PhotographyDemo sections={sections} />
      <ShowcaseSwitcher />
    </>
  );
}
