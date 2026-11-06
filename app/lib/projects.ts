import 'server-only';
import {apiFetch} from '@/lib/api-server';
import type {
  Project,
  ProjectCategory,
  ProjectsResponse,
} from '@/lib/types/project';

const API_URL =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:4000';

export interface FetchProjectsParams {
  page?: number;
  pageSize?: number;
  category?: ProjectCategory | 'all';
  search?: string;
}

export async function fetchProjects({
  page = 1,
  pageSize = 9,
  category = 'all',
  search = '',
}: FetchProjectsParams = {}): Promise<ProjectsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });
  if (category !== 'all') params.set('category', category);
  if (search) params.set('q', search);

  const res = await apiFetch<ProjectsResponse>(
    `/api/projects?${params.toString()}` // 👈 /api prefix
  );

  // Defensive: if the backend ever returns a bare array, wrap it.
  if (Array.isArray(res)) {
    return {
      items: res as Project[],
      total: res.length,
      page: 1,
      pageSize: res.length,
      totalPages: 1,
    };
  }

  return res;
}

export async function fetchProjectBySlug(
  slug: string
): Promise<Project | null> {
  try {
    return await apiFetch<Project>(
      `/api/projects/${encodeURIComponent(slug)}` // 👈 /api prefix
    );
  } catch {
    return null;
  }
}

/**
 * Build-time-safe. Uses plain fetch — no cookies, no request context.
 * Only works if /api/projects is public (no auth required).
 */
export async function fetchAllProjectSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/projects?pageSize=1000`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];

    const data = (await res.json()) as ProjectsResponse;
    return data.items.map((p) => p.slug);
  } catch {
    return [];
  }
}
