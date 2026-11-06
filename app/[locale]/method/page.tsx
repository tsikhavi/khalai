import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import {MethodPage} from './method-page';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Method'});

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      type: 'article',
    },
    alternates: {
      languages: {
        en: '/en/method',
        sw: '/sw/method',
        es: '/es/method',
        fr: '/fr/method',
        ar: '/ar/method',
        ru: '/ru/method',
      },
    },
  };
}

export default async function Page({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <MethodPage locale={locale} />;
}
