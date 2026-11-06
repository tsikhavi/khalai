import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import Link from 'next/link';

import {RegisterForm} from '@/components/ui/register-form';
import {AuthShell} from '@/components/studio/auth/AuthShell';
import {AuthHero} from '@/components/studio/auth/AuthHero';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Auth'});
  return {
    title: t('register.metaTitle'),
    description: t('register.metaDescription'),
  };
}

export default async function RegisterPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Auth');

  return (
    <AuthShell>
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900 md:grid-cols-2">
        <div className="p-8 md:p-10">
          <RegisterForm
            locale={locale}
            labels={{
              title: t('register.title'),
              subtitle: t('register.subtitle'),
              name: t('register.name'),
              email: t('register.email'),
              phone: t('register.phone'),
              phoneOptional: t('register.phoneOptional'),
              age: t('register.age'),
              bio: t('register.bio'),
              bioOptional: t('register.bioOptional'),
              password: t('register.password'),
              confirmPassword: t('register.confirmPassword'),
              passwordHint: t('register.passwordHint'),
              createAccount: t('register.createAccount'),
              creatingAccount: t('register.creatingAccount'),
              orContinue: t('register.orContinue'),
              haveAccount: t('register.haveAccount'),
              signIn: t('register.signIn'),
              oauthApple: t('register.oauthApple'),
              oauthGoogle: t('register.oauthGoogle'),
              oauthMeta: t('register.oauthMeta'),
              validationError: t('register.validationError'),
              welcome: t('register.welcome'),
              registrationFailed: t('register.registrationFailed'),
              creatingNotice: t('register.creatingNotice'),
              stepOfPrefix: t('register.stepOfPrefix'),
              stepOfSeparator: t('register.stepOfSeparator'),
              back: t('register.back'),
              continue: t('register.continue'),
              review: t('register.review'),
              edit: t('register.edit'),
              showPassword: t('register.showPassword'),
              hidePassword: t('register.hidePassword'),
              acceptTermsPrefix: t('register.acceptTermsPrefix'),
              acceptTermsLink: t('register.acceptTermsLink'),
              acceptTermsAnd: t('register.acceptTermsAnd'),
              acceptPrivacyLink: t('register.acceptPrivacyLink'),
              acceptTermsError: t('register.acceptTermsError'),
            }}
          />
        </div>

        <AuthHero
          eyebrow={t('hero.registerEyebrow')}
          title={t('hero.registerTitle')}
          body={t('hero.registerBody')}
          footer={t('hero.registerFooter')}
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
