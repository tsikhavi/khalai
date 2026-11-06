'use server';

import {revalidatePath} from 'next/cache';
import {apiFetch} from '@/lib/api-server';
import type {
  Transaction,
  Subscription,
  PayoutMethod,
  Payout,
  CreatePaymentInput,
  CreatePaymentResult,
  CreateSubscriptionInput,
  AddPayoutMethodInput,
  InitiatePayoutInput,
} from '@/lib/types/payments';

// ─── Payments ─────────────────────────────────────────────

export async function createPaymentAction(
  input: CreatePaymentInput
): Promise<CreatePaymentResult> {
  const idempotencyKey = crypto.randomUUID();

  const res = await apiFetch<CreatePaymentResult>('/api/payments', {
    method: 'POST',
    json: {...input, idempotencyKey},
  });

  revalidatePath('/dashboard/payments');
  return res;
}

export async function listPaymentsAction(
  status?: string
): Promise<Transaction[]> {
  const qs = status ? `?status=${encodeURIComponent(status)}` : '';
  return apiFetch<Transaction[]>(`/api/payments${qs}`);
}

export async function getPaymentAction(id: string): Promise<Transaction> {
  return apiFetch<Transaction>(`/api/payments/${encodeURIComponent(id)}`);
}

// ─── Subscriptions ────────────────────────────────────────

export async function createSubscriptionAction(
  input: CreateSubscriptionInput
): Promise<Subscription> {
  const idempotencyKey = crypto.randomUUID();

  const res = await apiFetch<Subscription>('/api/subscriptions', {
    method: 'POST',
    json: {...input, idempotencyKey},
  });

  revalidatePath('/dashboard/payments/subscriptions');
  return res;
}

export async function cancelSubscriptionAction(
  id: string
): Promise<Subscription> {
  const res = await apiFetch<Subscription>(
    `/api/subscriptions/${encodeURIComponent(id)}`,
    {method: 'DELETE'}
  );

  revalidatePath('/dashboard/payments/subscriptions');
  return res;
}

// ─── Payouts ──────────────────────────────────────────────

export async function addPayoutMethodAction(
  input: AddPayoutMethodInput
): Promise<PayoutMethod> {
  const res = await apiFetch<PayoutMethod>('/api/payouts/methods', {
    method: 'POST',
    json: input,
  });

  revalidatePath('/dashboard/payments/payouts');
  return res;
}

export async function initiatePayoutAction(
  input: InitiatePayoutInput
): Promise<Payout> {
  const res = await apiFetch<Payout>('/api/payouts', {
    method: 'POST',
    json: input,
  });

  revalidatePath('/dashboard/payments/payouts');
  return res;
}
