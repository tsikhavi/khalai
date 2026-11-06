'use client';

import {useRef, useState, useTransition} from 'react';
import {updateProfile} from '@/lib/actions/settings';

type User = {
  id?: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  bio?: string | null;
  role?: string;
  image?: string | null;
};

export default function ProfileForm({user}: {user: User}) {
  const [name, setName] = useState(user.name ?? '');
  const [email, setEmail] = useState(user.email ?? '');
  const [phone, setPhone] = useState(user.phone ?? '');
  const [bio, setBio] = useState(user.bio ?? '');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const timeout = useRef<number | null>(null);

  const dirty =
    name !== (user.name ?? '') ||
    email !== (user.email ?? '') ||
    phone !== (user.phone ?? '') ||
    bio !== (user.bio ?? '');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    startTransition(async () => {
      try {
        await updateProfile({name, email, phone, bio});
        setSaved(true);
        if (timeout.current) window.clearTimeout(timeout.current);
        timeout.current = window.setTimeout(() => setSaved(false), 2500);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save');
      }
    });
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-5">
      {/* Avatar row */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-xl font-semibold text-accent">
          {(name || email || '?').slice(0, 1).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {name || 'Your name'}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {user.role?.toLowerCase() ?? 'member'} · {email}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Full name"
          htmlFor="name">
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            autoComplete="name"
            className={inputCls}
          />
        </Field>
        <Field
          label="Email"
          htmlFor="email">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            autoComplete="email"
            className={inputCls}
          />
        </Field>
        <Field
          label="Phone"
          htmlFor="phone">
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+254 700 000 000"
            autoComplete="tel"
            className={inputCls}
          />
        </Field>
        <Field
          label="Bio"
          htmlFor="bio"
          className="sm:col-span-2">
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="A short line about you"
            className={`${inputCls} resize-none`}
          />
        </Field>
      </div>

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="text-sm text-emerald-600 dark:text-emerald-400">
            Saved
          </span>
        )}
        <button
          type="submit"
          disabled={pending || !dirty}
          className="inline-flex h-9 items-center justify-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white">
          {pending ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  'w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-400 dark:focus:ring-neutral-400';

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
        {label}
      </label>
      {children}
    </div>
  );
}
