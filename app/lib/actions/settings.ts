'use server';

import {revalidatePath} from 'next/cache';
import {apiFetch} from '@/lib/api-server';

// ── Profile ───────────────────────────────────────────────────
export async function updateProfile(input: {
  name?: string;
  email?: string;
  phone?: string;
  bio?: string;
}) {
  const payload: Record<string, string> = {};
  if (input.name?.trim()) payload.name = input.name.trim();
  if (input.email?.trim()) {
    const email = input.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email');
    }
    payload.email = email;
  }
  if (input.phone?.trim()) payload.phone = input.phone.trim();
  if (input.bio !== undefined) payload.bio = input.bio.trim();

  if (Object.keys(payload).length === 0) {
    throw new Error('Nothing to update');
  }

  await apiFetch('/api/users/me', {method: 'PATCH', json: payload});
  revalidatePath('/dashboard/settings');
}

// ── Password ──────────────────────────────────────────────────
export async function changePassword(input: {
  currentPassword: string;
  newPassword: string;
}) {
  if (!input.currentPassword) throw new Error('Current password required');
  if (input.newPassword.length < 8) {
    throw new Error('New password must be at least 8 characters');
  }
  if (input.currentPassword === input.newPassword) {
    throw new Error('New password must differ from current');
  }

  await apiFetch('/api/users/me/password', {
    method: 'POST',
    json: {
      currentPassword: input.currentPassword,
      newPassword: input.newPassword,
    },
  });
}

// ── Preferences ───────────────────────────────────────────────
export type Preferences = {
  productUpdates: boolean;
  projectActivity: boolean;
  invoiceReceipts: boolean;
  marketing: boolean;
};

export async function updatePreferences(prefs: Preferences) {
  await apiFetch('/api/users/me/preferences', {
    method: 'PATCH',
    json: prefs,
  });
  revalidatePath('/dashboard/settings');
}
