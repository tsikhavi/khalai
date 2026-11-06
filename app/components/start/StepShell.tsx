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
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <div
            className="h-full bg-gray-900 transition-[width] duration-300 dark:bg-gray-100"
            style={{width: `${((index + 1) / total) * 100}%`}}
          />
        </div>
        <span className="shrink-0 text-xs tabular-nums text-gray-500">
          {index + 1} / {total}
        </span>
      </div>

      {/* Header */}
      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
        {title}
      </p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight">{question}</h2>
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}

      {/* Body */}
      <div className="mt-6">{children}</div>

      {/* Nav */}
      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={!onBack}
          className={cn(
            'text-sm text-gray-500 transition-colors hover:text-gray-900',
            'disabled:pointer-events-none disabled:opacity-0',
            'dark:hover:text-gray-100'
          )}>
          ← Back
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled || loading}
          className={cn(
            'laser-btn group relative inline-flex items-center justify-center',
            'rounded-full px-5 py-2.5 text-sm font-medium text-white',
            'transition-transform hover:scale-[1.02] active:scale-[0.99]',
            'disabled:pointer-events-none disabled:opacity-50'
          )}>
          <span
            aria-hidden
            className="laser-ring"
          />
          <span className="relative z-10 rounded-full bg-gray-900 px-3 py-1 dark:bg-black">
            {loading ? 'Sending…' : nextLabel}
          </span>
        </button>
      </div>
    </div>
  );
}
