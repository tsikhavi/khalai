import {getTranslations, setRequestLocale} from 'next-intl/server';
import {NewPaymentForm} from '@/components/payments/NewPaymentForm';

type Props = {params: Promise<{locale: string}>};

export default async function NewPaymentPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Payments');

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('newPaymentTitle')}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {t('newPaymentSubtitle')}
        </p>
      </header>
      <NewPaymentForm
        locale={locale}
        labels={{
          amount: t('fields.amount'),
          description: t('fields.description'),
          phone: t('fields.mpesaPhone'),
          phonePlaceholder: t('placeholders.phone'),
          submit: t('actions.pay'),
          submitting: t('actions.paying'),
          success: t('messages.initiated'),
          errorGeneric: t('errors.generic'),
          providers: {
            MPESA: t('providers.mpesa'),
            STRIPE: t('providers.card'),
            PAYPAL: t('providers.paypal'),
            CRYPTO: t('providers.crypto'),
          },
          comingSoon: t('messages.comingSoon'),
        }}
      />
    </div>
  );
}
