import {getTranslations, setRequestLocale} from 'next-intl/server';
import {apiFetch} from '@/lib/api-server';
import {getCurrentUser} from '@/lib/auth';
import {redirect} from 'next/navigation';
import {PaymentsList} from '@/components/payments/PaymentsList';
import type {Transaction} from '@/lib/types/payments';

type Props = {params: Promise<{locale: string}>};

export default async function PaymentsPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);

  const transactions = await apiFetch<Transaction[]>('/api/payments');
  const t = await getTranslations('Payments');

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">{t('title')}</h1>
        <p className="mt-1 text-sm text-neutral-500">{t('subtitle')}</p>
      </header>
      <PaymentsList
        transactions={transactions}
        locale={locale}
        labels={{
          empty: t('empty'),
          newPayment: t('newPayment'),
          subscriptions: t('subscriptions'),
          payouts: t('payoutsTitle'),
          columns: {
            id: t('columns.id'),
            date: t('columns.date'),
            description: t('columns.description'),
            provider: t('columns.provider'),
            amount: t('columns.amount'),
            status: t('columns.status'),
            receipt: t('columns.receipt'),
          },
          viewReceipt: t('viewReceipt'),
        }}
      />
    </div>
  );
}
