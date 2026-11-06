'use client';

import {useState} from 'react';
import {cn} from '@/lib/utils';

export function PasswordInput({
  id,
  name,
  value,
  onChange,
  disabled,
  autoComplete = 'current-password',
  ariaInvalid,
  className,
  showLabel = 'Show password',
  hideLabel = 'Hide password',
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
  ariaInvalid?: boolean;
  className?: string;
  showLabel?: string;
  hideLabel?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={visible ? 'text' : 'password'}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        className={cn(
          'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 pe-11 text-sm outline-none transition-colors',
          'placeholder:text-neutral-400',
          'focus:border-accent focus:ring-1 focus:ring-accent',
          'disabled:cursor-not-allowed disabled:opacity-60',
          'dark:border-neutral-700 dark:bg-neutral-950 dark:placeholder:text-neutral-500',
          ariaInvalid && 'border-red-500',
          className
        )}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        disabled={disabled}
        aria-label={visible ? hideLabel : showLabel}
        aria-pressed={visible}
        tabIndex={-1}
        className="absolute inset-e-1.5 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 transition-colors hover:text-accent disabled:opacity-60">
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle
        cx="12"
        cy="12"
        r="3"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden>
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6a2 2 0 0 0 2.83 2.83" />
      <path d="M9.9 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a17.7 17.7 0 0 1-3.1 4.1M6.6 6.6A17.2 17.2 0 0 0 2 12s3.5 7 10 7c1.1 0 2.1-.2 3.1-.5" />
    </svg>
  );
}
