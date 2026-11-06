import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import {MpesaPage} from './mpesa-page';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Mpesa'});

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      type: 'website',
    },
    alternates: {
      languages: {
        en: '/en/mpesa',
        sw: '/sw/mpesa',
        es: '/es/mpesa',
        fr: '/fr/mpesa',
        ar: '/ar/mpesa',
        ru: '/ru/mpesa',
      },
    },
  };
}

export default async function Page({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <MpesaPage locale={locale} />;
}
