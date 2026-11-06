import {notFound, redirect} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {apiFetch} from '@/lib/api-server';
import {getCurrentUser} from '@/lib/auth';
import {PaymentDetail} from '@/components/payments/PaymentDetail';
import type {Transaction} from '@/lib/types/payments';

type Props = {params: Promise<{locale: string; id: string}>};

export default async function PaymentDetailPage({params}: Props) {
  const {locale, id} = await params;
  setRequestLocale(locale);
  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);

  let transaction: Transaction;
  try {
    transaction = await apiFetch<Transaction>(`/api/payments/${id}`);
  } catch {
    notFound();
  }

  const t = await getTranslations('Payments');

  return (
    <div className="mx-auto max-w-2xl">
      <PaymentDetail
        transaction={transaction}
        locale={locale}
        labels={{
          title: t('detail.title'),
          back: t('detail.back'),
          status: t('columns.status'),
          receipt: t('receipt.title'),
          receiptNumber: t('receipt.number'),
          issued: t('receipt.issued'),
          download: t('receipt.download'),
          pending: t('detail.pending'),
          failed: t('detail.failed'),
        }}
      />
    </div>
  );
}
