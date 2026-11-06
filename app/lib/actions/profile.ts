'use server';

import {revalidatePath} from 'next/cache';
import {apiFetch} from '@/lib/api-server';

export async function updateProfileAction(input: {
  name: string;
  phone?: string;
  age: number;
  bio?: string;
}) {
  const name = input.name.trim();
  if (!name) throw new Error('Name is required.');
  if (name.length < 2) throw new Error('Name is too short.');

  if (input.phone && !/^\+?[\d\s\-()]{7,20}$/.test(input.phone)) {
    throw new Error('Invalid phone number.');
  }

  if (!Number.isFinite(input.age) || input.age < 18 || input.age > 150) {
    throw new Error('Invalid age.');
  }

  if (input.bio && input.bio.length > 500) {
    throw new Error('Bio is too long.');
  }

  await apiFetch('/api/users/me', {
    method: 'PATCH',
    json: {
      name,
      phone: input.phone || undefined,
      age: input.age,
      bio: input.bio || undefined,
    },
  });

  revalidatePath('/dashboard/profile');
  revalidatePath('/dashboard');

  return {ok: true};
}
