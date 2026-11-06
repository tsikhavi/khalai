'use client';

import {useState, useTransition} from 'react';
import {useTranslations} from 'next-intl';
import {cn} from '@/lib/utils';
import {subscribeAction} from '@/lib/actions/subscribe';

type Status = 'idle' | 'success' | 'error';

export function NewsletterSubscribe({
  user,
  source = 'web',
  placeholder,
  ctaLabel,
  variant = 'cyan',
  className,
}: {
  /** If present, the email is pre-filled and locked */
  user?: {email: string; name?: string} | null;
  source?: string;
  /** Optional override — falls back to translated default */
  placeholder?: string;
  /** Optional override — falls back to translated default */
  ctaLabel?: string;
  /** 'cyan' (single sweep) or 'laser' (multi-color beam) */
  variant?: 'cyan' | 'laser';
  className?: string;
}) {
  const t = useTranslations('Newsletter');
  const [email, setEmail] = useState(user?.email ?? '');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const locked = !!user?.email;
  const displayName = user?.name ?? user?.email ?? '';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;

    setStatus('idle');
    setMessage(null);

    startTransition(async () => {
      try {
        const res = await subscribeAction({
          email,
          source,
          website: honeypot,
        });
        setStatus('success');
        setMessage(res.autoConfirmed ? t('subscribed') : t('checkInbox'));
        if (!locked) setEmail('');
      } catch (err) {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : t('errorGeneric'));
      }
    });
  };

  return (
    <div className={cn('mx-auto w-full max-w-lg', className)}>
      <form onSubmit={submit}>
        <div
          className="laser-btn group relative flex w-full items-center overflow-hidden rounded-xl p-[1.5px]"
          data-variant={variant}>
          <span
            aria-hidden
            className="laser-ring"
          />

          <div className="relative z-10 flex w-full rounded-[0.6rem] bg-neutral-50 p-2 dark:bg-neutral-900">
            {/* Honeypot — invisible to users, catches naive bots */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
              aria-hidden="true"
            />

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder ?? t('placeholder')}
              disabled={pending || locked}
              readOnly={locked}
              autoComplete="email"
              inputMode="email"
              aria-label={t('emailAriaLabel')}
              aria-invalid={status === 'error'}
              className={cn(
                'me-2 inline-block h-full flex-1 rounded-lg bg-transparent px-3 py-3 text-sm',
                'text-neutral-900 placeholder:text-neutral-500',
                'dark:text-neutral-200 dark:placeholder:text-neutral-500',
                'focus:outline-none focus:ring-1 focus:ring-accent',
                'disabled:cursor-not-allowed disabled:opacity-60',
                status === 'error' && 'ring-1 ring-red-500'
              )}
            />

            {locked && (
              <span className="absolute -top-1 inset-s-3 rounded bg-neutral-100 px-1.5 text-[10px] tracking-wider text-accent uppercase dark:bg-neutral-950">
                {t('signedInAs', {name: displayName})}
              </span>
            )}

            <button
              type="submit"
              disabled={pending}
              className={cn(
                'relative z-10 block shrink-0 rounded-lg border border-neutral-800',
                'bg-neutral-900 px-6 py-3 text-center text-sm font-medium text-neutral-50',
                'shadow-2xl transition-colors duration-200',
                'hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60'
              )}>
              {pending ? t('sending') : (ctaLabel ?? t('subscribe'))}
            </button>
          </div>
        </div>
      </form>

      {locked && (
        <p className="mt-2 text-center text-[11px] text-neutral-500">
          {t('signedInAs', {name: displayName})}
        </p>
      )}

      {message && (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            'mt-3 text-center text-xs',
            status === 'success' && 'text-emerald-500 dark:text-emerald-400',
            status === 'error' && 'text-red-500 dark:text-red-400'
          )}>
          {message}
        </p>
      )}
    </div>
  );
}
