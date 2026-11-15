'use client';

import {cn} from '@/lib/utils';

export function StepShell({
  index,
  total,
  title,
  question,
  hint,
  onBack,
  onNext,
  nextLabel = 'Continue',
  nextDisabled,
  loading,
  children,
}: {
  index: number;
  total: number;
  title: string;
  question: string;
  hint?: string;
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-xl">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
          <div
            className="h-full bg-neutral-900 transition-[width] duration-300 dark:bg-neutral-100"
            style={{width: `${((index + 1) / total) * 100}%`}}
          />
        </div>
        <span className="shrink-0 text-xs tabular-nums text-neutral-500">
          {index + 1} / {total}
        </span>
      </div>

      {/* Header */}
      <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
        {title}
      </p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight">{question}</h2>
      {hint && <p className="mt-2 text-sm text-neutral-500">{hint}</p>}

      {/* Body */}
      <div className="mt-6">{children}</div>

      {/* Nav */}
      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={!onBack}
          className={cn(
            'text-sm text-neutral-500 transition-colors hover:text-neutral-900',
            'disabled:pointer-events-none disabled:opacity-0',
            'dark:hover:text-neutral-100'
          )}>
          ← Back
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled || loading}
          className={cn(
            'laser-btn group hover:cursor-pointer relative inline-flex items-center justify-center',
            'rounded-full p-5 text-sm font-medium text-neutral-900 dark:text-neutral-200 ',
            'transition-transform hover:scale-[1.02] active:scale-[0.99]',
            'disabled:pointer-events-none disabled:opacity-50'
          )}>
          <span
            aria-hidden
            className="laser-ring"
          />
          <span className="relative z-10 rounded-full bg-neutral-300 px-3 py-1 dark:bg-neutral-800">
            {loading ? 'Sending…' : nextLabel}
          </span>
        </button>
      </div>
    </div>
  );
}
