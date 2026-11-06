import {getTranslations, setRequestLocale} from 'next-intl/server';
import {apiFetch} from '@/lib/api-server';
import {getCurrentUser} from '@/lib/auth';
import {redirect} from 'next/navigation';
import {SubscriptionsList} from '@/components/payments/SubscriptionsList';
import type {Subscription} from '@/lib/types/payments';

type Props = {params: Promise<{locale: string}>};

export default async function SubscriptionsPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);

  const subs = await apiFetch<Subscription[]>('/api/subscriptions');
  const t = await getTranslations('Payments');

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('subscriptionsTitle')}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {t('subscriptionsSubtitle')}
        </p>
      </header>
      <SubscriptionsList
        subscriptions={subs}
        locale={locale}
        labels={{
          empty: t('empty'),
          cancel: t('actions.cancel'),
          cancelled: t('messages.cancelled'),
        }}
      />
    </div>
  );
}
