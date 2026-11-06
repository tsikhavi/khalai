import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) return null;

  const res = await fetch(`${process.env.API_URL}/api/users/me`, {
    headers: {Authorization: `Bearer ${token}`},
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}
