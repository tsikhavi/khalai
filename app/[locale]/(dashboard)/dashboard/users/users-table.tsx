'use client';

import {useMemo, useState, useTransition} from 'react';
import {useRouter} from 'next/navigation';
import {motion, AnimatePresence} from 'framer-motion';
import {
  updateUserRole,
  updateUserActive,
  deleteUser,
} from '@/lib/actions/users';
import type {UserRow} from './page';

export default function UsersTable({
  users,
  currentUserId,
}: {
  users: UserRow[];
  currentUserId: number;
}) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'USER' | 'ADMIN'>('all');
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all');
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<UserRow | null>(null);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (roleFilter !== 'all' && u.role !== roleFilter) return false;
      if (activeFilter === 'active' && !u.isActive) return false;
      if (activeFilter === 'inactive' && u.isActive) return false;
      if (q) {
        const needle = q.toLowerCase();
        const hay = `${u.name} ${u.email} ${u.phone ?? ''}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [users, q, roleFilter, activeFilter]);

  const toggleRole = (u: UserRow) => {
    setError(null);
    startTransition(async () => {
      try {
        await updateUserRole(u.id, u.role === 'ADMIN' ? 'USER' : 'ADMIN');
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update role');
      }
    });
  };

  const toggleActive = (u: UserRow) => {
    setError(null);
    startTransition(async () => {
      try {
        await updateUserActive(u.id, !u.isActive);
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to update status'
        );
      }
    });
  };

  const remove = (u: UserRow) => {
    setError(null);
    startTransition(async () => {
      try {
        await deleteUser(u.id);
        setConfirmDelete(null);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete user');
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, phone…"
          className="h-9 w-full flex-1 rounded-lg border border-neutral-200 bg-white px-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:border-neutral-400 dark:focus:ring-neutral-400 sm:max-w-xs"
        />

        <div className="flex gap-1 rounded-full border border-neutral-200 p-1 dark:border-neutral-800">
          {(['all', 'USER', 'ADMIN'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                roleFilter === r
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
              }`}>
              {r === 'all' ? 'All roles' : r}
            </button>
          ))}
        </div>

        <div className="flex gap-1 rounded-full border border-neutral-200 p-1 dark:border-neutral-800">
          {(['all', 'active', 'inactive'] as const).map((a) => (
            <button
              key={a}
              onClick={() => setActiveFilter(a)}
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                activeFilter === a
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
              }`}>
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-2 font-medium">User</th>
              <th className="px-4 py-2 font-medium">Role</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Activity</th>
              <th className="px-4 py-2 font-medium">Joined</th>
              <th className="px-4 py-2 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => {
              const isSelf = u.id === currentUserId;
              return (
                <tr
                  key={u.id}
                  className="border-t border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50">
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-laurel-500/15 text-xs font-semibold text-laurel-700 dark:text-laurel-300">
                        {u.name.slice(0, 1).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-medium text-neutral-900 dark:text-neutral-100">
                            {u.name}
                          </span>
                          {isSelf && (
                            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                              you
                            </span>
                          )}
                        </div>
                        <div className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                          {u.email}
                          {u.phone && ` · ${u.phone}`}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 align-top">
                    <RolePill role={u.role} />
                  </td>

                  <td className="px-4 py-3 align-top">
                    <ActivePill active={u.isActive} />
                  </td>

                  <td className="px-4 py-3 align-top text-xs text-neutral-500 dark:text-neutral-400">
                    {u._count ? (
                      <>
                        {u._count.contactThreads} thread
                        {u._count.contactThreads === 1 ? '' : 's'} ·{' '}
                        {u._count.transactions} txn
                        {u._count.transactions === 1 ? '' : 's'}
                      </>
                    ) : (
                      <span className="text-neutral-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-neutral-500 dark:text-neutral-400">
                    {new Date(u.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>

                  <td className="px-4 py-3 align-top text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => toggleRole(u)}
                        disabled={pending || isSelf}
                        title={
                          isSelf
                            ? "Can't change your own role"
                            : u.role === 'ADMIN'
                              ? 'Demote to user'
                              : 'Promote to admin'
                        }
                        className="rounded-md border border-neutral-200 px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
                        {u.role === 'ADMIN' ? 'Demote' : 'Promote'}
                      </button>
                      <button
                        onClick={() => toggleActive(u)}
                        disabled={pending || isSelf}
                        title={
                          isSelf
                            ? "Can't deactivate yourself"
                            : u.isActive
                              ? 'Deactivate'
                              : 'Reactivate'
                        }
                        className="rounded-md border border-neutral-200 px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
                        {u.isActive ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => setConfirmDelete(u)}
                        disabled={pending || isSelf}
                        title={isSelf ? "Can't delete yourself" : 'Delete user'}
                        className="rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  No users match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation dialog */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setConfirmDelete(null)}>
            <motion.div
              initial={{scale: 0.95, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              exit={{scale: 0.95, opacity: 0}}
              transition={{duration: 0.15}}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                Delete this user?
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                <strong>{confirmDelete.name}</strong> ({confirmDelete.email})
                will be permanently deleted. This also removes their messages,
                transactions, and subscriptions. This cannot be undone.
              </p>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={() => setConfirmDelete(null)}
                  disabled={pending}
                  className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
                  Cancel
                </button>
                <button
                  onClick={() => remove(confirmDelete)}
                  disabled={pending}
                  className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60">
                  {pending ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RolePill({role}: {role: 'USER' | 'ADMIN'}) {
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
        role === 'ADMIN'
          ? 'border-laurel-500/30 bg-laurel-500/15 text-laurel-700 dark:text-laurel-300'
          : 'border-neutral-200 bg-neutral-100 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
      }`}>
      {role}
    </span>
  );
}

function ActivePill({active}: {active: boolean}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${
        active
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400'
          : 'border-neutral-200 bg-neutral-100 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-500'
      }`}>
      <span
        className={`h-1 w-1 rounded-full ${
          active ? 'bg-emerald-500' : 'bg-neutral-400'
        }`}
      />
      {active ? 'Active' : 'Inactive'}
    </span>
  );
}
