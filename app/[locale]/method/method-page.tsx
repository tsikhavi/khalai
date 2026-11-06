'use client';

import {useTranslations} from 'next-intl';
import {MethodHero} from '@/components/method/MethodHero';
import {MethodSteps} from '@/components/method/MethodSteps';
import {MethodGrid} from '@/components/method/MethodGrid';
import {MethodType} from '@/components/method/MethodType';
import {MethodColour} from '@/components/method/MethodColour';
import {MethodCode} from '@/components/method/MethodCode';
import {MethodCTA} from '@/components/method/MethodCTA';
import {MethodCards} from '@/components/method/MethodCard';

export function MethodPage({locale}: {locale: string}) {
  const t = useTranslations('Method');

  const steps = [
    {
      num: '01',
      key: 'lines',
      title: t('steps.lines.title'),
      body: t('steps.lines.body'),
    },
    {
      num: '02',
      key: 'grid',
      title: t('steps.grid.title'),
      body: t('steps.grid.body'),
    },
    {
      num: '03',
      key: 'type',
      title: t('steps.type.title'),
      body: t('steps.type.body'),
    },
    {
      num: '04',
      key: 'colour',
      title: t('steps.colour.title'),
      body: t('steps.colour.body'),
    },
    {
      num: '05',
      key: 'code',
      title: t('steps.code.title'),
      body: t('steps.code.body'),
    },
  ];

  const cards = [
    {
      key: 'guides',
      title: t('cards.items.guides.title'),
      body: t('cards.items.guides.body'),
    },
    {
      key: 'grid',
      title: t('cards.items.grid.title'),
      body: t('cards.items.grid.body'),
    },
    {
      key: 'restraint',
      title: t('cards.items.restraint.title'),
      body: t('cards.items.restraint.body'),
    },
    {
      key: 'ownership',
      title: t('cards.items.ownership.title'),
      body: t('cards.items.ownership.body'),
    },
  ];

  return (
    <main className="overflow-x-clip">
      <MethodHero
        eyebrow={t('hero.eyebrow')}
        titleLens={t('hero.titleLens')}
        subtitle={t('hero.subtitle')}
        scrollHint={t('hero.scrollHint')}
      />

      <MethodSteps
        eyebrow={t('steps.eyebrow')}
        title={t('steps.title')}
        steps={steps}
      />

      <MethodCards
        eyebrow={t('cards.eyebrow')}
        title={t('cards.title')}
        cards={cards}
      />

      <MethodGrid
        eyebrow={t('grid.eyebrow')}
        title={t('grid.title')}
        body={t('grid.body')}
        caption={t('grid.caption')}
      />

      <MethodType
        eyebrow={t('type.eyebrow')}
        title={t('type.title')}
        body={t('type.body')}
        caption={t('type.caption')}
      />

      <MethodColour
        eyebrow={t('colour.eyebrow')}
        title={t('colour.title')}
        body={t('colour.body')}
        caption={t('colour.caption')}
        paperLabel={t('colour.paper')}
        inkLabel={t('colour.ink')}
        accentLabel={t('colour.accent')}
      />

      <MethodCode
        eyebrow={t('code.eyebrow')}
        title={t('code.title')}
        body={t('code.body')}
        caption={t('code.caption')}
      />

      <MethodCTA
        title={t('cta.title')}
        body={t('cta.body')}
        primaryLabel={t('cta.primary')}
        secondaryLabel={t('cta.secondary')}
        locale={locale}
      />
    </main>
  );
}
