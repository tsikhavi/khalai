import {getTranslations} from 'next-intl/server';
import SystemsDemo from './systems-demo';
import {ShowcaseSwitcher} from '@/components/showcase/switcher';

export default async function SystemsPage() {
  const t = await getTranslations('Systems');

  const sections = {
    kicker: t('kicker'),
    title: t('title'),
    body: t('body'),

    // Chapter 1 — Foundations
    request: {
      title: t('request.title'),
      body: t('request.body'),
      steps: t.raw('request.steps') as {
        label: string;
        hint: string;
      }[],
    },
    database: {
      title: t('database.title'),
      body: t('database.body'),
      rows: t.raw('database.rows') as {
        label: string;
        value: string;
      }[],
    },

    // Chapter 2 — Integration
    integration: {
      title: t('integration.title'),
      body: t('integration.body'), // ← was t('bodyIntegrations')
      systems: t.raw('integration.systems') as {
        name: string;
        role: string;
      }[],
    },
    queue: {
      title: t('queue.title'),
      body: t('queue.body'),
      jobs: t.raw('queue.jobs') as string[],
    },

    // Chapter 3 — Infrastructure
    loadBalancing: {
      title: t('loadBalancing.title'),
      body: t('loadBalancing.body'),
      servers: t.raw('loadBalancing.servers') as string[],
    },
    devops: {
      title: t('devops.title'),
      body: t('devops.body'),
      stages: t.raw('devops.stages') as {
        name: string;
        hint: string;
      }[],
    },
    monitoring: {
      title: t('monitoring.title'),
      body: t('monitoring.body'),
      metrics: t.raw('monitoring.metrics') as {
        label: string;
        value: string;
        status: 'healthy' | 'warn' | 'critical';
      }[],
    },

    // Chapter 4 — Industry
    fintech: {
      title: t('fintech.title'),
      body: t('fintech.body'),
      features: t.raw('fintech.features') as {
        name: string;
        hint: string;
      }[],
    },
    agrotech: {
      title: t('agrotech.title'),
      body: t('agrotech.body'),
      layers: t.raw('agrotech.layers') as {
        name: string;
        hint: string;
      }[],
    },

    cta: {
      title: t('cta.title'),
      body: t('cta.body'),
      contact: t('cta.contact'),
    },
  };

  return (
    <>
      <SystemsDemo sections={sections} />
      <ShowcaseSwitcher />
    </>
  );
}
