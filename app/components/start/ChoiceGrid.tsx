'use client';

import {cn} from '@/lib/utils';
import type {Option} from '@/[locale]/start/steps';

type GridProps = {
  multiple: boolean;
  options?: Option[];
  groups?: {label: string; options: Option[]}[];
  value: string[] | string | undefined;
  onChange: (next: string[] | string) => void;
  error?: string;
};

export function ChoiceGrid({
  multiple,
  options,
  groups,
  value,
  onChange,
  error,
}: GridProps) {
  const selected = Array.isArray(value) ? value : value ? [value] : [];

  const toggle = (v: string) => {
    if (multiple) {
      const set = new Set(selected);
      if (set.has(v)) {
        set.delete(v);
      } else {
        set.add(v);
      }
      onChange(Array.from(set));
    } else {
      onChange(v);
    }
  };

  const renderGroup = (label: string | undefined, opts: Option[]) => (
    <div key={label ?? '_'}>
      {label && (
        <p className="mb-2 mt-6 text-xs font-medium uppercase tracking-wider text-gray-400 first:mt-0">
          {label}
        </p>
      )}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {opts.map((opt) => {
          const isOn = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              aria-pressed={isOn}
              className={cn(
                'group relative flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all',
                'hover:border-gray-400 dark:hover:border-gray-500',
                isOn
                  ? 'border-gray-900 bg-gray-900/3 dark:border-gray-100 dark:bg-gray-100/6'
                  : 'border-gray-200 dark:border-gray-800'
              )}>
              <span
                aria-hidden
                className={cn(
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border transition-colors',
                  multiple ? 'rounded' : 'rounded-full',
                  isOn
                    ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                    : 'border-gray-300 dark:border-gray-600'
                )}>
                {isOn && (
                  <svg
                    viewBox="0 0 16 16"
                    className="h-2.5 w-2.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M3 8.5l3 3 7-7" />
                  </svg>
                )}
              </span>

              <span className="min-w-0">
                <span className="block text-sm font-medium leading-snug">
                  {opt.label}
                </span>
                {opt.hint && (
                  <span className="mt-0.5 block text-xs leading-snug text-gray-500">
                    {opt.hint}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div>
      {groups
        ? groups.map((g) => renderGroup(g.label, g.options))
        : renderGroup(undefined, options ?? [])}

      {error && (
        <p className="mt-3 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
