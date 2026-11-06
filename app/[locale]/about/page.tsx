import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';

import {AboutHero} from '@/components/about/AboutHero';
import {AboutStory} from '@/components/about/AboutStory';
import {AboutValues} from '@/components/about/AboutValues';
import {AboutStats} from '@/components/about/AboutStats';
import {AboutMethod} from '@/components/about/AboutMethod';
import {AboutCTA} from '@/components/about/AboutCTA';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'About'});
  return {
    title: t('title'),
    description: t('subtitle'),
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      type: 'website',
    },
  };
}

export default async function AboutPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('About');

  const values = ['craft', 'clarity', 'care', 'candour'] as const;

  const stats = [
    {key: 'years', value: '6'},
    {key: 'projects', value: '40+'},
    {key: 'clients', value: '18'},
    {key: 'countries', value: '3'},
  ] as const;

  const method = ['line', 'grid', 'type', 'colour', 'code'] as const;

  return (
    <>
      <AboutHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        locationLine={t('locationLine')}
      />

      <AboutStory
        storyTitle={t('storyTitle')}
        story={t('story')}
        introTitle={t('introTitle')}
        intro={t('intro')}
        signature={t('signature')}
      />

      <AboutValues
        heading={t('valuesTitle')}
        items={values.map((key) => ({
          key,
          title: t(`values.${key}.title`),
          body: t(`values.${key}.body`),
        }))}
      />

      <AboutMethod
        heading={t('method.title')}
        body={t('method.body')}
        steps={method.map((key) => ({
          key,
          title: t(`method.steps.${key}.title`),
          body: t(`method.steps.${key}.body`),
        }))}
      />

      <AboutStats
        stats={stats.map(({key, value}) => ({
          key,
          value,
          label: t(`stats.${key}`),
        }))}
      />

      <AboutCTA
        title={t('cta.title')}
        body={t('cta.body')}
        primaryLabel={t('cta.primary')}
        secondaryLabel={t('cta.secondary')}
        locale={locale}
      />
    </>
  );
}
