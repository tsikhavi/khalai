'use client';

import Link from 'next/link';
import {cn} from '@/lib/utils';
import {ReceiptCard} from './ReceiptCard';
import type {Transaction} from '@/lib/types/payments';

type PaymentDetailLabels = {
  back: string;
  status: string;
  pending: string;
  failed: string;
  receipt: string;
  issued: string;
  download: string;
  title: string;
  receiptNumber: string;
};

export function PaymentDetail({
  transaction,
  locale,
  labels,
}: {
  transaction: Transaction;
  locale: string;
  labels: PaymentDetailLabels;
}) {
  return (
    <div className="space-y-6">
      <Link
        href={`/${locale}/dashboard/payments`}
        className="text-sm text-neutral-500 underline-offset-4 hover:underline">
        ← {labels.back}
      </Link>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="space-y-3 text-sm">
          <Row
            label={labels.status}
            value={transaction.status}
          />
          <Row
            label="Amount"
            value={`${transaction.currency} ${(transaction.amount / 100).toLocaleString()}`}
          />
          <Row
            label="Description"
            value={transaction.description}
          />
          {transaction.mpesaReceipt && (
            <Row
              label="M-Pesa receipt"
              value={transaction.mpesaReceipt}
              mono
            />
          )}
        </div>
      </div>

      {transaction.receipt && (
        <ReceiptCard
          receipt={transaction.receipt}
          labels={labels}
        />
      )}

      {transaction.status === 'PENDING' && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
          {labels.pending}
        </p>
      )}
      {transaction.status === 'FAILED' && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {labels.failed}
        </p>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-2 last:border-b-0 dark:border-neutral-800">
      <span className="text-neutral-500">{label}</span>
      <span className={cn('text-end font-medium', mono && 'font-mono text-xs')}>
        {value}
      </span>
    </div>
  );
}
