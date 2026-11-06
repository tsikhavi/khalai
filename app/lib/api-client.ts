// lib/api-client.ts

// ─── Types (shared) ────────────────────────────────────
export type Role = 'USER' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  phone: string | null;
  name: string;
  age: number;
  bio: string | null;
  role: Role;
  isActive: boolean;
  birthDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  age: number;
  phone?: string;
  bio?: string;
}

export interface LoginData {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ─── Config ────────────────────────────────────────────
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

const TOKEN_KEY = 'token';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

async function request<T>(
  path: string,
  init: RequestInit & {json?: unknown} = {}
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');
  if (init.json !== undefined) headers.set('Content-Type', 'application/json');

  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    body: init.json !== undefined ? JSON.stringify(init.json) : init.body,
  });

  const text = await res.text();

  // `data` is `unknown` — we don't trust the shape until we've checked it.
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message =
      extractErrorMessage(data) ?? `Request failed with ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}

// Narrow `unknown` to a string message if the server returned one.
function extractErrorMessage(data: unknown): string | null {
  if (typeof data !== 'object' || data === null) return null;
  if (!('message' in data) && !('error' in data)) return null;

  const source = data as {message?: unknown; error?: unknown};
  const candidate = source.message ?? source.error;
  return typeof candidate === 'string' ? candidate : null;
}

// ─── API surface ───────────────────────────────────────
export const api = {
  register(data: RegisterData): Promise<AuthResponse> {
    return request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      json: data,
    });
  },

  login(data: LoginData): Promise<AuthResponse> {
    return request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      json: data,
    });
  },

  async logout(): Promise<void> {
    try {
      await request<void>('/api/auth/logout', {method: 'POST'});
    } finally {
      if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY);
    }
  },

  getMe(): Promise<User> {
    return request<User>('/api/auth/me');
  },
};
