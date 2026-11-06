import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import Link from 'next/link';

import {LoginForm} from '@/components/ui/login-form';
import {AuthShell} from '@/components/studio/auth/AuthShell';
import {AuthHero} from '@/components/studio/auth/AuthHero';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Auth'});
  return {
    title: t('login.metaTitle'),
    description: t('login.metaDescription'),
  };
}

export default async function LoginPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Auth');

  return (
    <AuthShell>
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900 md:grid-cols-2">
        <div className="p-8 md:p-10">
          <LoginForm
            locale={locale}
            labels={{
              title: t('login.title'),
              subtitle: t('login.subtitle'),
              identifier: t('login.identifier'),
              identifierPlaceholder: t('login.identifierPlaceholder'),
              password: t('login.password'),
              forgotPassword: t('login.forgotPassword'),
              signIn: t('login.signIn'),
              signingIn: t('login.signingIn'),
              orContinue: t('login.orContinue'),
              noAccount: t('login.noAccount'),
              signUp: t('login.signUp'),
              oauthApple: t('login.oauthApple'),
              oauthGoogle: t('login.oauthGoogle'),
              oauthMeta: t('login.oauthMeta'),
              validationError: t('login.validationError'),
              welcomeBack: t('login.welcomeBack'),
              loginFailed: t('login.loginFailed'),
              showPassword: t('login.showPassword'),
              hidePassword: t('login.hidePassword'),
            }}
          />
        </div>

        <AuthHero
          eyebrow={t('hero.eyebrow')}
          title={t('hero.title')}
          body={t('hero.body')}
          footer={t('hero.footer')}
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
