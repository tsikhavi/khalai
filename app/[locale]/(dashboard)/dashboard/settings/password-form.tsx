'use client';

import {useState, useTransition} from 'react';
import {changePassword} from '@/lib/actions/settings';

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDone(false);

    if (newPassword !== confirm) {
      setError('New password and confirmation do not match');
      return;
    }

    startTransition(async () => {
      try {
        await changePassword({currentPassword, newPassword});
        setCurrentPassword('');
        setNewPassword('');
        setConfirm('');
        setDone(true);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to change password'
        );
      }
    });
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4">
      <Field
        label="Current password"
        htmlFor="currentPassword">
        <input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          autoComplete="current-password"
          required
          className={inputCls}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="New password"
          htmlFor="newPassword">
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            required
            minLength={8}
            className={inputCls}
          />
        </Field>
        <Field
          label="Confirm new password"
          htmlFor="confirm">
          <input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            required
            minLength={8}
            className={inputCls}
          />
        </Field>
      </div>

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </p>
      )}
      {done && (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
          Password updated.
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending || !currentPassword || !newPassword || !confirm}
          className="inline-flex h-9 items-center justify-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white">
          {pending ? 'Updating…' : 'Update password'}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  'w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-400 dark:focus:ring-neutral-400';

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
        {label}
      </label>
      {children}
    </div>
  );
}
