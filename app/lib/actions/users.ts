'use server';

import {revalidatePath} from 'next/cache';
import {apiFetch} from '@/lib/api-server';

export async function updateUserRole(id: number, role: 'USER' | 'ADMIN') {
  await apiFetch(`/api/users/${id}/role`, {method: 'PATCH', json: {role}});
  revalidatePath('/dashboard/users');
}

export async function updateUserActive(id: number, isActive: boolean) {
  await apiFetch(`/api/users/${id}/active`, {
    method: 'PATCH',
    json: {isActive},
  });
  revalidatePath('/dashboard/users');
}

export async function deleteUser(id: number) {
  await apiFetch(`/api/users/${id}`, {method: 'DELETE'});
  revalidatePath('/dashboard/users');
}
