'use server';

import {cookies} from 'next/headers';
import {revalidatePath} from 'next/cache';
import type {ProjectCategory} from '@/lib/types/project';

const API_BASE = process.env.API_URL ?? 'http://localhost:4000/api';

async function authHeaders() {
  const token = (await cookies()).get('access_token')?.value;
  if (!token) throw new Error('Not authenticated');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export interface ProjectInput {
  slug: string;
  title: string;
  description: string;
  content?: string;
  category: ProjectCategory;
  tags?: string[];
  thumbnail?: string;
  url?: string;
  repo?: string;
  featured?: boolean;
  published?: boolean;
  year?: number;
  order?: number;
}

export async function createProject(input: ProjectInput) {
  const res = await fetch(`${API_BASE}/admin/projects`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `Create failed (${res.status})`);
  }

  revalidatePath('/[locale]/admin/projects', 'page');
  revalidatePath('/[locale]/projects', 'page');
  return res.json();
}

export async function updateProject(id: string, input: Partial<ProjectInput>) {
  const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
    method: 'PATCH',
    headers: await authHeaders(),
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `Update failed (${res.status})`);
  }

  revalidatePath('/[locale]/admin/projects', 'page');
  revalidatePath('/[locale]/projects', 'page');
  return res.json();
}

export async function deleteProject(id: string) {
  const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
    method: 'DELETE',
    headers: await authHeaders(),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `Delete failed (${res.status})`);
  }

  revalidatePath('/[locale]/admin/projects', 'page');
  revalidatePath('/[locale]/projects', 'page');
}

export async function fetchAdminProjects(params: {
  page?: number;
  pageSize?: number;
  category?: string;
  q?: string;
}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '' && v !== null) search.set(k, String(v));
  });

  const res = await fetch(`${API_BASE}/admin/projects?${search}`, {
    headers: await authHeaders(),
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);
  return res.json();
}
