'use client';

import {useState, type FormEvent, useTransition} from 'react';
import {useTranslations} from 'next-intl';
import {useAlert} from '@/components/ui/alert';
import {
  addPayoutMethodAction,
  initiatePayoutAction,
} from '@/lib/actions/payments';
import {cn} from '@/lib/utils';
import type {
  Payout,
  PayoutMethod,
  PaymentProvider as Provider,
} from '@/lib/types/payments';

const providerLabels: Record<Provider, string> = {
  MPESA: 'M-Pesa',
  STRIPE: 'Card',
  PAYPAL: 'PayPal',
  CRYPTO: 'Crypto',
};

const destinationPlaceholders: Record<Provider, string> = {
  MPESA: '+254 700 000 000',
  STRIPE: 'Card (uses Stripe account)',
  PAYPAL: 'you@example.com',
  CRYPTO: '0x…',
};

const payoutStatusStyles: Record<Payout['status'], string> = {
  PENDING:
    'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900',
  PROCESSING:
    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900',
  PAID: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900',
  FAILED:
    'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900',
};

const fieldClass =
  'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none transition-colors ' +
  'placeholder:text-neutral-400 focus:border-accent focus:ring-1 focus:ring-accent ' +
  'disabled:cursor-not-allowed disabled:opacity-60 ' +
  'dark:border-neutral-700 dark:bg-neutral-950 dark:placeholder:text-neutral-500';

export function PayoutsPanel({
  methods,
  payouts,
}: {
  methods: PayoutMethod[];
  payouts: Payout[];
}) {
  const t = useTranslations('Payments');
  const [tab, setTab] = useState<'methods' | 'history'>('methods');

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1 dark:border-neutral-800 dark:bg-neutral-900">
        <TabButton
          active={tab === 'methods'}
          onClick={() => setTab('methods')}>
          {t('payouts.methods')}
        </TabButton>
        <TabButton
          active={tab === 'history'}
          onClick={() => setTab('history')}>
          {t('payouts.history')}
        </TabButton>
      </div>

      {tab === 'methods' ? (
        <MethodsTab methods={methods} />
      ) : (
        <HistoryTab payouts={payouts} />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Tabs
   ──────────────────────────────────────────────────────────────── */

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
          : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
      )}>
      {children}
    </button>
  );
}

/* ────────────────────────────────────────────────────────────────
   Methods tab
   ──────────────────────────────────────────────────────────────── */

function MethodsTab({methods}: {methods: PayoutMethod[]}) {
  const t = useTranslations('Payments');
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-4">
      {methods.length === 0 && !adding ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 p-12 text-center dark:border-neutral-700">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-xl">
            💸
          </div>
          <p className="text-sm text-neutral-500">{t('payouts.noMethods')}</p>
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent/90">
            {t('payouts.addMethod')}
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {methods.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                      {providerLabels[m.provider]}
                    </span>
                    {m.isDefault && (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-accent uppercase">
                        {t('payouts.default')}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate font-mono text-sm">
                    {m.destination}
                  </p>
                  {m.label && (
                    <p className="text-xs text-neutral-500">{m.label}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {!adding && (
            <button
              type="button"
              onClick={() => setAdding(true)}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition-colors hover:border-accent hover:text-accent dark:border-neutral-800 dark:text-neutral-300">
              + {t('payouts.addMethod')}
            </button>
          )}
        </>
      )}

      {adding && (
        <AddMethodForm
          onDone={() => setAdding(false)}
          onCancel={() => setAdding(false)}
        />
      )}

      {methods.length > 0 && (
        <div className="border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <InitiatePayoutForm methods={methods} />
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Add payout method form
   ──────────────────────────────────────────────────────────────── */

function AddMethodForm({
  onDone,
  onCancel,
}: {
  onDone: () => void;
  onCancel: () => void;
}) {
  const t = useTranslations('Payments');
  const {success, error: showError} = useAlert();
  const [pending, start] = useTransition();
  const [provider, setProvider] = useState<Provider>('PAYPAL');
  const [destination, setDestination] = useState('');
  const [label, setLabel] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    start(async () => {
      try {
        await addPayoutMethodAction({
          provider,
          destination: destination.trim(),
          label: label.trim() || undefined,
        });
        success(t('payouts.methodAdded'));
        onDone();
      } catch (err) {
        showError(err instanceof Error ? err.message : t('errors.generic'));
      }
    });
  };

  const providerOptions: Provider[] = ['PAYPAL', 'CRYPTO', 'MPESA', 'STRIPE'];

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-2xl border border-neutral-200 bg-(--paper)/40 p-5 dark:border-neutral-800 dark:bg-neutral-950/40">
      <div>
        <label className="mb-1.5 block text-sm font-medium">
          {t('payouts.provider')}
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {providerOptions.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setProvider(p)}
              className={cn(
                'rounded-lg border p-2 text-xs font-medium transition-colors',
                provider === p
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-neutral-200 text-neutral-600 hover:border-neutral-300 dark:border-neutral-800 dark:text-neutral-400'
              )}>
              {providerLabels[p]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          {provider === 'PAYPAL'
            ? t('payouts.paypalEmail')
            : provider === 'CRYPTO'
              ? t('payouts.walletAddress')
              : t('payouts.phoneNumber')}
        </label>
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder={destinationPlaceholders[provider]}
          disabled={pending}
          className={fieldClass}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          {t('payouts.label')}{' '}
          <span className="text-neutral-400">({t('payouts.optional')})</span>
        </label>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. Personal"
          disabled={pending}
          className={fieldClass}
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={pending}
          className="text-sm text-neutral-500 underline-offset-4 hover:underline disabled:opacity-60">
          {t('actions.cancel')}
        </button>
        <button
          type="submit"
          disabled={pending || !destination.trim()}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-60">
          {pending ? t('actions.saving') : t('payouts.addMethod')}
        </button>
      </div>
    </form>
  );
}

/* ────────────────────────────────────────────────────────────────
   Initiate payout form
   ──────────────────────────────────────────────────────────────── */

function InitiatePayoutForm({methods}: {methods: PayoutMethod[]}) {
  const t = useTranslations('Payments');
  const {success, error: showError} = useAlert();
  const [pending, start] = useTransition();
  const [payoutMethodId, setPayoutMethodId] = useState(methods[0]?.id ?? '');
  const [amount, setAmount] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const n = parseFloat(amount);
    if (!n || n <= 0) {
      showError(t('errors.amountInvalid'));
      return;
    }

    start(async () => {
      try {
        await initiatePayoutAction({
          payoutMethodId,
          amount: Math.round(n * 100),
          currency: 'KES',
        });
        success(t('messages.payoutInitiated'));
        setAmount('');
      } catch (err) {
        showError(err instanceof Error ? err.message : t('errors.generic'));
      }
    });
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4">
      <h3 className="text-sm font-semibold tracking-widest text-neutral-500 uppercase">
        {t('payouts.requestPayout')}
      </h3>

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          {t('payouts.to')}
        </label>
        <select
          value={payoutMethodId}
          onChange={(e) => setPayoutMethodId(e.target.value)}
          disabled={pending}
          className={fieldClass}>
          {methods.map((m) => (
            <option
              key={m.id}
              value={m.id}>
              {providerLabels[m.provider]} — {m.destination}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          {t('fields.amount')} (KES)
        </label>
        <input
          type="number"
          min="1"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="5000"
          disabled={pending}
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={pending || !amount.trim()}
        className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-60">
        {pending ? t('actions.sending') : t('payouts.requestPayout')}
      </button>
    </form>
  );
}

/* ────────────────────────────────────────────────────────────────
   History tab
   ──────────────────────────────────────────────────────────────── */

function HistoryTab({payouts}: {payouts: Payout[]}) {
  const t = useTranslations('Payments');

  if (payouts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 p-12 text-center text-sm text-neutral-500 dark:border-neutral-700">
        {t('empty')}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <table className="w-full text-sm">
        <thead className="bg-neutral-50 text-left text-xs tracking-wider text-neutral-500 uppercase dark:bg-neutral-950">
          <tr>
            <th className="px-4 py-3">{t('columns.date')}</th>
            <th className="px-4 py-3">{t('payouts.to')}</th>
            <th className="px-4 py-3">{t('columns.amount')}</th>
            <th className="px-4 py-3">{t('columns.status')}</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map((p) => (
            <tr
              key={p.id}
              className="border-t border-neutral-100 dark:border-neutral-800">
              <td className="whitespace-nowrap px-4 py-3 text-neutral-500">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                {p.payoutMethod ? (
                  <>
                    <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                      {providerLabels[p.payoutMethod.provider]}
                    </span>
                    <div className="truncate font-mono text-xs text-neutral-500">
                      {p.payoutMethod.destination}
                    </div>
                  </>
                ) : (
                  <span className="text-xs text-neutral-400 italic">
                    {t('payouts.methodRemoved')}
                  </span>
                )}
              </td>
              <td className="px-4 py-3 font-semibold tabular-nums">
                {p.currency} {(p.amount / 100).toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    'inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase',
                    payoutStatusStyles[p.status]
                  )}>
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
