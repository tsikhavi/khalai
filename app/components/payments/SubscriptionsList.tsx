'use client';

import Link from 'next/link';
import {useState, useTransition} from 'react';
import {useTranslations} from 'next-intl';
import {useAlert} from '@/components/ui/alert';
import {cancelSubscriptionAction} from '@/lib/actions/payments';
import {cn} from '@/lib/utils';

type SubscriptionStatus =
  'TRIALING' | 'ACTIVE' | 'PAST_DUE' | 'CANCELLED' | 'EXPIRED';

type Subscription = {
  id: string;
  planId: string;
  planName: string;
  provider: 'MPESA' | 'STRIPE' | 'PAYPAL' | 'CRYPTO';
  status: SubscriptionStatus;
  amount: number;
  currency: string;
  interval: 'month' | 'year';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  cancelledAt: string | null;
  createdAt: string;
};

const statusStyles: Record<SubscriptionStatus, string> = {
  TRIALING:
    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900',
  ACTIVE:
    'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900',
  PAST_DUE:
    'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900',
  CANCELLED:
    'bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700',
  EXPIRED:
    'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900',
};

const providerLabels: Record<Subscription['provider'], string> = {
  MPESA: 'M-Pesa',
  STRIPE: 'Card',
  PAYPAL: 'PayPal',
  CRYPTO: 'Crypto',
};

type SubscriptionsLabels = {
  empty: string;
  cancel: string;
  cancelled: string;
};

export function SubscriptionsList({
  subscriptions,
  locale,
}: {
  subscriptions: Subscription[];
  locale: string;
  labels: SubscriptionsLabels;
}) {
  const t = useTranslations('Payments');

  if (subscriptions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 p-12 text-center dark:border-neutral-700">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-xl">
          ⏱
        </div>
        <p className="text-sm text-neutral-500">{t('empty')}</p>
        <Link
          href={`/${locale}/dashboard/payments/new`}
          className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent/90">
          {t('newPayment')}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {subscriptions.map((sub) => (
        <SubscriptionRow
          key={sub.id}
          subscription={sub}
        />
      ))}
    </div>
  );
}

function SubscriptionRow({subscription}: {subscription: Subscription}) {
  const t = useTranslations('Payments');
  const {success, error: showError} = useAlert();
  const [pending, start] = useTransition();
  const [confirming, setConfirming] = useState(false);

  const cancel = () => {
    start(async () => {
      try {
        await cancelSubscriptionAction(subscription.id);
        success(t('messages.cancelled'));
      } catch (err) {
        showError(err instanceof Error ? err.message : t('errors.generic'));
      } finally {
        setConfirming(false);
      }
    });
  };

  const periodEnd = new Date(subscription.currentPeriodEnd);
  const cancellable =
    !subscription.cancelAtPeriodEnd &&
    (subscription.status === 'ACTIVE' || subscription.status === 'TRIALING');

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold tracking-tight">
              {subscription.planName}
            </h3>
            <span
              className={cn(
                'inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase',
                statusStyles[subscription.status]
              )}>
              {subscription.status}
            </span>
          </div>
          <p className="mt-1 text-sm text-neutral-500">
            {providerLabels[subscription.provider]} · {subscription.currency}{' '}
            {(subscription.amount / 100).toLocaleString()} /{' '}
            {subscription.interval === 'month' ? 'mo' : 'yr'}
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            {subscription.cancelAtPeriodEnd
              ? `${t('subscriptionsPage.cancelAtEnd')} ${periodEnd.toLocaleDateString()}`
              : `${t('subscriptionsPage.renewsOn')} ${periodEnd.toLocaleDateString()}`}
          </p>
        </div>

        {cancellable && (
          <div className="flex shrink-0 items-center gap-2">
            {!confirming ? (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                className="text-sm text-red-600 underline-offset-4 hover:underline dark:text-red-400">
                {t('actions.cancel')}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={cancel}
                  disabled={pending}
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-60">
                  {pending
                    ? t('actions.cancelling')
                    : t('actions.confirmCancel')}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  disabled={pending}
                  className="text-sm text-neutral-500 underline-offset-4 hover:underline disabled:opacity-60">
                  {t('actions.keep')}
                </button>
              </>
            )}
          </div>
        )}

        {subscription.cancelAtPeriodEnd && (
          <span className="shrink-0 text-xs text-neutral-500">
            {t('subscriptionsPage.cancelled')}
          </span>
        )}
      </div>
    </div>
  );
}
