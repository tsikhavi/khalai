export type PaymentProvider = 'MPESA' | 'STRIPE' | 'PAYPAL' | 'CRYPTO';

export type PaymentStatus =
  'PENDING' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';

export type SubscriptionStatus =
  'TRIALING' | 'ACTIVE' | 'PAST_DUE' | 'CANCELLED' | 'EXPIRED';

export type PayoutStatus = 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED';

export type Receipt = {
  id: string;
  transactionId: string;
  number: string;
  pdfUrl: string | null;
  emailedAt: string | null;
  createdAt: string;
};

export type Transaction = {
  id: string;
  userId: number;
  provider: PaymentProvider;
  status: PaymentStatus;
  amount: number; // smallest unit (KES * 100)
  currency: string;
  description: string;
  idempotencyKey: string;
  providerRef: string | null;
  providerData: Record<string, unknown> | null;
  mpesaReceipt: string | null;
  mpesaPhone: string | null;
  failureReason: string | null;
  subscriptionId: string | null;
  refundedAt: string | null;
  settledAt: string | null;
  createdAt: string;
  updatedAt: string;
  receipt: Receipt | null;
};

export type Subscription = {
  id: string;
  userId: number;
  planId: string;
  planName: string;
  provider: PaymentProvider;
  status: SubscriptionStatus;
  amount: number;
  currency: string;
  interval: 'month' | 'year';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  transactions?: Transaction[];
};

export type PayoutMethod = {
  id: string;
  userId: number;
  provider: PaymentProvider;
  destination: string;
  label: string | null;
  isDefault: boolean;
  createdAt: string;
};

export type Payout = {
  id: string;
  userId: number;
  payoutMethodId: string;
  amount: number;
  currency: string;
  status: PayoutStatus;
  providerRef: string | null;
  failureReason: string | null;
  createdAt: string;
  updatedAt: string;
  payoutMethod?: PayoutMethod;
};

// ─── Server action inputs ─────────────────────────────────
export type CreatePaymentInput = {
  provider: PaymentProvider;
  amount: number;
  currency?: string;
  description: string;
  mpesaPhone?: string;
};

export type CreatePaymentResult = {
  id: string;
  status: 'PENDING' | 'PROCESSING';
  providerRef?: string;
};

export type CreateSubscriptionInput = {
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  interval: 'month' | 'year';
  provider: PaymentProvider;
  mpesaPhone?: string;
};

export type AddPayoutMethodInput = {
  provider: PaymentProvider;
  destination: string;
  label?: string;
};

export type InitiatePayoutInput = {
  payoutMethodId: string;
  amount: number;
  currency: string;
};
