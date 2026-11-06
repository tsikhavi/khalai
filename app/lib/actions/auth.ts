'use server';

import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

import {apiFetch} from '@/lib/api-server';

export async function requestPasswordResetAction(email: string) {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed) throw new Error('Email is required.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    throw new Error('Enter a valid email.');
  }

  await apiFetch('/auth/forgot-password', {
    method: 'POST',
    json: {email: trimmed},
  });

  return {ok: true};
}

export async function resetPasswordAction(token: string, password: string) {
  if (!token) throw new Error('Missing reset token.');
  if (!password) throw new Error('Password is required.');
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  await apiFetch('/auth/reset-password', {
    method: 'POST',
    json: {token, password},
  });

  return {ok: true};
}

export async function loginAction(formData: FormData) {
  const identifier = formData.get('identifier') as string;
  const password = formData.get('password') as string;

  const res = await fetch(`${process.env.API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({identifier, password}),
  });

  if (!res.ok) {
    const text = await res.text();
    let message = 'Invalid credentials';
    try {
      const data = JSON.parse(text);
      message = data.message || data.error || message;
    } catch {}
    throw new Error(message);
  }

  const data = await res.json();

  const cookieStore = await cookies();
  cookieStore.set('access_token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/dashboard');
}

export async function registerAction(formData: FormData) {
  const payload = {
    email: formData.get('email') as string,
    phone: (formData.get('phone') as string) || undefined,
    password: formData.get('password') as string,
    name: formData.get('name') as string,
    age: Number(formData.get('age')),
    bio: (formData.get('bio') as string) || undefined,
  };

  const res = await fetch(`${process.env.API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('[registerAction] status:', res.status);
    console.error('[registerAction] body:', text);

    let message = 'Registration failed';
    try {
      const data = JSON.parse(text);
      message = data.message || data.error || message;
    } catch {}

    throw new Error(message);
  }

  const data = await res.json();

  const cookieStore = await cookies();
  cookieStore.set('access_token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/dashboard');
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();

  // Clear the main auth cookie
  cookieStore.delete('access_token');

  // Clear any other auth-related cookies you might have
  cookieStore.delete('refresh_token');
  cookieStore.delete('session');

  cookieStore.set('access_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  // Invalidate cached data across the app
  revalidatePath('/', 'layout');

  // Redirect to login
  redirect('/login');
}
