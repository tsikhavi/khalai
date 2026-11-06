import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import Link from 'next/link';

import {ForgotPasswordForm} from './forgot-password-form';
import {AuthShell} from '@/components/studio/auth/AuthShell';
import {AuthHero} from '@/components/studio/auth/AuthHero';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Auth'});
  return {
    title: t('forgot.metaTitle'),
    description: t('forgot.metaDescription'),
  };
}

export default async function ForgotPasswordPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Auth');

  return (
    <AuthShell>
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900 md:grid-cols-2">
        <div className="p-8 md:p-10">
          <ForgotPasswordForm
            locale={locale}
            labels={{
              title: t('forgot.title'),
              subtitle: t('forgot.subtitle'),
              email: t('forgot.email'),
              emailPlaceholder: t('forgot.emailPlaceholder'),
              send: t('forgot.send'),
              sending: t('forgot.sending'),
              backToLogin: t('forgot.backToLogin'),
              checkTitle: t('forgot.checkTitle'),
              checkBody: t('forgot.checkBody'),
              tryAgain: t('forgot.tryAgain'),
              errorGeneric: t('forgot.errorGeneric'),
            }}
          />
        </div>

        <AuthHero
          eyebrow={t('hero.forgotEyebrow')}
          title={t('hero.forgotTitle')}
          body={t('hero.forgotBody')}
          footer={t('hero.forgotFooter')}
        />
      </div>

      <p className="mt-8 text-center text-xs text-neutral-500">
        {t('legal')}{' '}
        <Link
          href={`/${locale}/contact`}
          className="underline hover:text-accent">
          {t('support')}
        </Link>
      </p>
    </AuthShell>
  );
}
