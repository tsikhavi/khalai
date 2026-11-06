'use server';

import {revalidatePath} from 'next/cache';
import {apiFetch} from '@/lib/api-server';

type SubmitInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  service?: string;
  source?: string;
  referrer?: string;
  pageUrl?: string;
  acceptedTerms: boolean;
};

type Status = 'open' | 'replied' | 'closed';

export async function submitContact(input: SubmitInput) {
  if (input.acceptedTerms !== true) {
    throw new Error('You must accept the Terms and Privacy Policy');
  }
  const payload = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    subject: input.subject.trim(),
    message: input.message.trim(),
    service: input.service?.trim() || null,
    source: input.source?.trim() || null,
    referrer: input.referrer?.trim() || null,
    pageUrl: input.pageUrl?.trim() || null,
    acceptedTermsAt: new Date().toISOString(),
    acceptedTermsVersion: '2026-10-24',
  };

  if (!payload.name || !payload.email || !payload.subject || !payload.message) {
    throw new Error('All fields are required');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    throw new Error('Invalid email');
  }
  if (payload.message.length > 5000) {
    throw new Error('Message too long');
  }

  await apiFetch('/api/contact', {method: 'POST', json: payload});
  return {ok: true};
}

export async function replyToThread(threadId: string, body: string) {
  const text = body.trim();
  if (!text) throw new Error('Reply cannot be empty');
  if (text.length > 4000) throw new Error('Reply too long (max 4000)');

  // ── fix 1: keep the /api prefix consistent
  await apiFetch(`/api/admin/inbox/${threadId}/reply`, {
    method: 'POST',
    json: {body: text},
  });

  // ── revalidate both the list and the detail (locale-agnostic base paths)
  revalidatePath('/admin/inbox');
  revalidatePath(`/admin/inbox/${threadId}`);
}

export async function setThreadStatus(threadId: string, status: Status) {
  if (!['open', 'replied', 'closed'].includes(status)) {
    throw new Error('Invalid status');
  }

  // ── fix 1 (same as above): restore /api prefix
  await apiFetch(`/api/admin/inbox/${threadId}/status`, {
    method: 'PATCH',
    json: {status},
  });

  revalidatePath('/dashboard/admin/inbox');
  revalidatePath(`/dashboard/admin/inbox/${threadId}`);
}
