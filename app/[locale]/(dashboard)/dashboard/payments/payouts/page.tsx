import {getTranslations, setRequestLocale} from 'next-intl/server';
import {apiFetch} from '@/lib/api-server';
import {getCurrentUser} from '@/lib/auth';
import {redirect} from 'next/navigation';
import {PayoutsPanel} from '@/components/payments/PayoutsPanel';
import type {Payout, PayoutMethod} from '@/lib/types/payments';

type Props = {params: Promise<{locale: string}>};

export default async function PayoutsPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);

  const [methods, payouts] = await Promise.all([
    apiFetch<PayoutMethod[]>('/api/payouts/methods'),
    apiFetch<Payout[]>('/api/payouts'),
  ]);
  const t = await getTranslations('Payments');

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('payoutsTitle')}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">{t('payoutsSubtitle')}</p>
      </header>
      <PayoutsPanel
        methods={methods}
        payouts={payouts}
      />
    </div>
  );
}
