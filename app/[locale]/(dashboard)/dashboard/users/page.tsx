import {redirect} from 'next/navigation';
import {apiFetch} from '@/lib/api-server';
import {getCurrentUser} from '@/lib/auth';
import UsersTable from './users-table';

export const metadata = {title: 'Users'};

export type UserRow = {
  id: number;
  email: string;
  phone: string | null;
  name: string;
  role: 'USER' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
  _count?: {contactThreads: number; transactions: number}; // ← optional
};

export default async function UsersPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  if (user.role !== 'ADMIN') redirect('/dashboard');

  const users = await apiFetch<UserRow[]>('/api/users', {
    cache: 'no-store',
  }).catch((err) => {
    console.error('[users] fetch failed:', err);
    return [] as UserRow[];
  });

  const total = users.length;
  const admins = users.filter((u) => u.role === 'ADMIN').length;
  const inactive = users.filter((u) => !u.isActive).length;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Users
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {total} total · {admins} admin{admins === 1 ? '' : 's'} · {inactive}{' '}
            inactive
          </p>
        </div>
      </header>

      <UsersTable
        users={users}
        currentUserId={user.id}
      />
    </div>
  );
}
