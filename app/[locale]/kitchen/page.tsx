import {getTranslations} from 'next-intl/server';
import KitchenDemo from './kitchen-demo';
import {ShowcaseSwitcher} from '@/components/showcase/switcher';

export default async function KitchenPage() {
  const t = await getTranslations('Kitchen');

  const sections = {
    kicker: t('kicker'),
    title: t('title'),
    body: t('body'),
    hero: {order: t('hero.order'), menu: t('hero.menu')},
    howItWorks: {
      title: t('howItWorks.title'),
      body: t('howItWorks.body'),
      steps: t.raw('howItWorks.steps') as {
        title: string;
        body: string;
      }[],
    },
    menu: {
      title: t('menu.title'),
      body: t('menu.body'),
      categories: t.raw('menu.categories') as Record<string, string>,
      viewFull: t('menu.viewFull'),
    },
    payment: {
      title: t('payment.title'),
      body: t('payment.body'),
      steps: t.raw('payment.steps') as string[],
      note: t('payment.note'),
    },
    delivery: {
      title: t('delivery.title'),
      body: t('delivery.body'),
      partners: t.raw('delivery.partners') as {name: string; note: string}[],
      radius: t('delivery.radius'),
    },
    subscriptions: {
      title: t('subscriptions.title'),
      body: t('subscriptions.body'),
      tiers: t.raw('subscriptions.tiers') as {
        name: string;
        price: string;
        body: string;
      }[],
      cta: t('subscriptions.cta'),
    },
    faq: {
      title: t('faq.title'),
      items: t.raw('faq.items') as {q: string; a: string}[],
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
      <KitchenDemo sections={sections} />
      <ShowcaseSwitcher />
    </>
  );
}
