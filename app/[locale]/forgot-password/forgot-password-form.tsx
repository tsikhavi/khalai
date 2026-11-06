'use client';

import {useState, FormEvent, useTransition} from 'react';
import Link from 'next/link';
import {useAlert} from '@/components/ui/alert';
import {requestPasswordResetAction} from '@/lib/actions/auth';
import {cn} from '@/lib/utils';

type Labels = {
  title: string;
  subtitle: string;
  email: string;
  emailPlaceholder: string;
  send: string;
  sending: string;
  backToLogin: string;
  checkTitle: string;
  checkBody: string;
  tryAgain: string;
  errorGeneric: string;
};

const fieldClass =
  'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none transition-colors ' +
  'placeholder:text-neutral-400 ' +
  'focus:border-(--accent) focus:ring-1 focus:ring-(--accent) ' +
  'disabled:cursor-not-allowed disabled:opacity-60 ' +
  'dark:border-neutral-700 dark:bg-neutral-950 dark:placeholder:text-neutral-500';

export function ForgotPasswordForm({
  locale,
  labels,
}: {
  locale: string;
  labels: Labels;
}) {
  const {error: showError} = useAlert();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;

    setError(null);
    start(async () => {
      try {
        await requestPasswordResetAction(email);
        setDone(true);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : labels.errorGeneric;
        setError(message);
        showError(message);
      }
    });
  };

  // ─── Success state ──────────────────────────────────────
  if (done) {
    return (
      <div className="space-y-6 text-center md:text-start">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--accent)/10 text-(--accent) md:mx-0">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden>
            <path d="M3 8l9 6 9-6M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            {labels.checkTitle}
          </h1>
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {labels.checkBody}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setEmail('');
            }}
            className="text-sm text-(--accent) underline-offset-4 hover:underline">
            {labels.tryAgain}
          </button>
          <Link
            href={`/${locale}/login`}
            className="text-sm text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline dark:hover:text-neutral-100">
            ← {labels.backToLogin}
          </Link>
        </div>
      </div>
    );
  }

  // ─── Form state ─────────────────────────────────────────
  return (
    <form
      onSubmit={submit}
      noValidate
      className="space-y-5">
      <header className="space-y-1.5 text-center md:text-start">
        <h1 className="text-2xl font-semibold tracking-tight">
          {labels.title}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {labels.subtitle}
        </p>
      </header>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium">
          {labels.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          disabled={pending}
          placeholder={labels.emailPlaceholder}
          aria-invalid={!!error}
          className={cn(fieldClass, error && 'border-red-500')}
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || !email.trim()}
        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-(--accent) px-6 text-sm font-medium text-white transition-colors hover:bg-(--accent)/90 disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? labels.sending : labels.send}
      </button>

      <p className="pt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
        <Link
          href={`/${locale}/login`}
          className="font-medium text-(--accent) underline-offset-4 hover:underline">
          ← {labels.backToLogin}
        </Link>
      </p>
    </form>
  );
}
