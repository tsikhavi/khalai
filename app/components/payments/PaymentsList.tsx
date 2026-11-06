'use client';

import Link from 'next/link';
import {cn} from '@/lib/utils';
import type {
  PaymentStatus,
  PaymentProvider,
  Transaction,
} from '@/lib/types/payments';

const statusStyles: Record<PaymentStatus, string> = {
  PENDING: '…',
  PROCESSING: '…',
  SUCCEEDED: '…',
  FAILED: '…',
  REFUNDED: '…',
  CANCELLED: '…',
};

const providerLabels: Record<PaymentProvider, string> = {
  MPESA: 'M-Pesa',
  STRIPE: 'Card',
  PAYPAL: 'PayPal',
  CRYPTO: 'Crypto',
};

type PaymentsLabels = {
  newPayment: string;
  subscriptions: string;
  payouts: string;
  empty: string;
  viewReceipt: string;
  columns: {
    id: string;
    date: string;
    description: string;
    provider: string;
    amount: string;
    status: string;
    receipt: string;
  };
};

export function PaymentsList({
  transactions,
  locale,
  labels,
}: {
  transactions: Transaction[];
  locale: string;
  labels: PaymentsLabels;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/${locale}/dashboard/payments/new`}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent/90">
          {labels.newPayment} →
        </Link>
        <Link
          href={`/${locale}/dashboard/payments/subscriptions`}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-200 px-5 text-sm font-medium text-neutral-700 transition-colors hover:border-accent hover:text-accent dark:border-neutral-800 dark:text-neutral-300">
          {labels.subscriptions}
        </Link>
        <Link
          href={`/${locale}/dashboard/payments/payouts`}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-200 px-5 text-sm font-medium text-neutral-700 transition-colors hover:border-accent hover:text-accent dark:border-neutral-800 dark:text-neutral-300">
          {labels.payouts}
        </Link>
      </div>

      {transactions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 p-12 text-center text-sm text-neutral-500 dark:border-neutral-700">
          {labels.empty}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-xs tracking-wider text-neutral-500 uppercase dark:bg-neutral-950">
              <tr>
                <th className="px-4 py-3">{labels.columns.date}</th>
                <th className="px-4 py-3">{labels.columns.description}</th>
                <th className="px-4 py-3">{labels.columns.provider}</th>
                <th className="px-4 py-3">{labels.columns.amount}</th>
                <th className="px-4 py-3">{labels.columns.status}</th>
                <th className="px-4 py-3 text-end"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t.id}
                  className="border-t border-neutral-100 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-950/40">
                  <td className="whitespace-nowrap px-4 py-3 text-neutral-500">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-medium">{t.description}</td>
                  <td className="px-4 py-3">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {providerLabels[t.provider]}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold tabular-nums">
                    {t.currency} {(t.amount / 100).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase',
                        statusStyles[t.status]
                      )}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <Link
                      href={`/${locale}/dashboard/payments/${t.id}`}
                      className="text-sm text-accent underline-offset-4 hover:underline">
                      {labels.viewReceipt}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
