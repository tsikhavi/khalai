'use client';

import {useState, type FormEvent, useTransition} from 'react';
import {useRouter} from 'next/navigation';
import {useAlert} from '@/components/ui/alert';
import {createPaymentAction} from '@/lib/actions/payments';
import {cn} from '@/lib/utils';
import type {PaymentProvider} from '@/lib/types/payments';

type NewPaymentLabels = {
  providers: Record<PaymentProvider, string>;
  comingSoon: string;
  amount: string;
  description: string;
  phone: string;
  phonePlaceholder: string;
  submit: string;
  submitting: string;
  success: string;
  errorGeneric: string;
};

const fieldClass =
  'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none ' +
  'focus:border-accent focus:ring-1 focus:ring-accent ' +
  'dark:border-neutral-700 dark:bg-neutral-950';

export function NewPaymentForm({
  locale,
  labels,
}: {
  locale: string;
  labels: NewPaymentLabels;
}) {
  const router = useRouter();
  const {success, error: showError} = useAlert();
  const [provider, setProvider] = useState<PaymentProvider>('MPESA');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [pending, start] = useTransition();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const n = parseFloat(amount);
    if (!n || n <= 0) {
      showError('Enter a valid amount');
      return;
    }
    if (!description.trim()) {
      showError('Description is required');
      return;
    }
    if (provider === 'MPESA' && !phone.trim()) {
      showError('Phone is required for M-Pesa');
      return;
    }

    start(async () => {
      try {
        const res = await createPaymentAction({
          provider,
          amount: Math.round(n * 100),
          description: description.trim(),
          mpesaPhone: provider === 'MPESA' ? phone.trim() : undefined,
        });
        success(labels.success);
        router.push(`/${locale}/dashboard/payments/${res.id}`);
      } catch (err) {
        showError(err instanceof Error ? err.message : labels.errorGeneric);
      }
    });
  };

  const providers: {key: PaymentProvider; disabled?: boolean}[] = [
    {key: 'MPESA'},
    {key: 'STRIPE', disabled: true},
    {key: 'PAYPAL', disabled: true},
    {key: 'CRYPTO', disabled: true},
  ];

  return (
    <form
      onSubmit={submit}
      className="space-y-6">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {providers.map((p) => (
          <button
            key={p.key}
            type="button"
            disabled={p.disabled}
            onClick={() => setProvider(p.key)}
            className={cn(
              'flex flex-col items-start gap-1 rounded-xl border p-3 text-start text-sm transition-colors',
              provider === p.key
                ? 'border-accent bg-accent/10'
                : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-800',
              p.disabled && 'cursor-not-allowed opacity-50'
            )}>
            <span className="font-semibold">{labels.providers[p.key]}</span>
            {p.disabled && (
              <span className="text-[10px] tracking-widest text-neutral-400 uppercase">
                {labels.comingSoon}
              </span>
            )}
          </button>
        ))}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          {labels.amount} (KES)
        </label>
        <input
          type="number"
          min="1"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={fieldClass}
          placeholder="2500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          {labels.description}
        </label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={fieldClass}
          placeholder="Pro plan — one month"
        />
      </div>

      {provider === 'MPESA' && (
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            {labels.phone}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClass}
            placeholder={labels.phonePlaceholder}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-60">
        {pending ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
