'use server';

import {revalidatePath} from 'next/cache';
import {apiFetch} from '@/lib/api-server';

export async function markThreadRead(threadId: string) {
  try {
    await apiFetch(`/contact/mine/${threadId}/read`, {method: 'POST'});
    revalidatePath('/messages');
    revalidatePath(`/messages/${threadId}`);
  } catch {
    // Best-effort
  }
}

export async function fetchUnreadCount(): Promise<number> {
  try {
    const data = await apiFetch<{count: number}>('/contact/mine/unread', {
      cache: 'no-store',
    });
    return data.count;
  } catch {
    return 0;
  }
}

// ─── new ────────────────────────────────────────────────────
export async function sendUserReply(threadId: string, body: string) {
  const trimmed = body.trim();
  if (!trimmed) return {ok: false as const, error: 'Message is empty.'};
  if (trimmed.length > 4000)
    return {ok: false as const, error: 'Message is too long (max 4000 chars).'};

  try {
    await apiFetch(`/contact/mine/${threadId}/reply`, {
      method: 'POST',
      json: {body: trimmed},
    });
    revalidatePath(`/messages/${threadId}`);
    revalidatePath('/messages');
    return {ok: true as const};
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Could not send reply.';
    return {ok: false as const, error: msg};
  }
}
