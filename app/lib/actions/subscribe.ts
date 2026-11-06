'use server';

import {apiFetch} from '@/lib/api-server';

interface SubscribeResponse {
  ok: boolean;
  alreadySubscribed?: boolean;
  autoConfirmed?: boolean;
}

interface SubscribeResult {
  ok: boolean;
  autoConfirmed: boolean;
}

export async function subscribeAction(input: {
  email: string;
  source?: string;
  website?: string;
}): Promise<SubscribeResult> {
  const email = input.email.trim().toLowerCase();

  if (!email) throw new Error('Email is required.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Enter a valid email address.');
  }

  const res = await apiFetch<SubscribeResponse>('/api/newsletter/subscribe', {
    method: 'POST',
    json: {
      email,
      source: input.source ?? 'web',
      website: input.website,
    },
  });

  return {
    ok: true,
    autoConfirmed: !!res.autoConfirmed,
  };
}
