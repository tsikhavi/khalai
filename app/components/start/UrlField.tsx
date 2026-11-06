'use client';

import {cn} from '@/lib/utils';

export function UrlField({
  value,
  error,
  onChange,
  onBlur,
}: {
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
}) {
  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
          https://
        </span>
        <input
          type="url"
          inputMode="url"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          value={value.replace(/^https?:\/\//i, '')}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder="example.co.ke"
          className={cn(
            'w-full rounded-lg border bg-transparent py-2 pl-18 pr-3 text-sm outline-none transition-colors',
            'border-gray-300 focus:border-gray-900 dark:border-gray-700 dark:focus:border-gray-100',
            error && 'border-red-500'
          )}
        />
      </div>
      {error ? (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      ) : (
        <p className="mt-1 text-xs text-gray-400">
          Leave blank if you don&apos;t have one yet.
        </p>
      )}
    </div>
  );
}
