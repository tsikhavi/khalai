// lib/api-server.ts
import 'server-only';
import {cookies} from 'next/headers';

function getApiUrl(): string {
  const url = process.env.API_URL;
  if (!url) {
    throw new Error('API_URL is not set');
  }
  return url;
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit & {json?: unknown} = {}
): Promise<T> {
  const apiUrl = getApiUrl();

  const jar = await cookies();
  const token = jar.get('access_token')?.value;

  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');
  if (init.json !== undefined) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Cookie', `access_token=${token}`);

  const res = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers,
    body: init.json !== undefined ? JSON.stringify(init.json) : init.body,
    cache: 'no-store',
  });

  const text = await res.text();
  const data = text ? safeJson(text) : null;

  if (!res.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}