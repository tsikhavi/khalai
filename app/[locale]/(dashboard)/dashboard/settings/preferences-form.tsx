'use client';

import {useState, useTransition} from 'react';
import {updatePreferences, type Preferences} from '@/lib/actions/settings';

const ITEMS: {key: keyof Preferences; title: string; description: string}[] = [
  {
    key: 'productUpdates',
    title: 'Product updates',
    description: 'New features and improvements to Khalai Studio.',
  },
  {
    key: 'projectActivity',
    title: 'Project activity',
    description: 'Progress updates, phase changes, and delivery notes.',
  },
  {
    key: 'invoiceReceipts',
    title: 'Invoices and receipts',
    description: 'Billing events and payment confirmations.',
  },
  {
    key: 'marketing',
    title: 'Marketing',
    description: 'Occasional stories, case studies, and event invites.',
  },
];

export default function PreferencesForm({initial}: {initial: Preferences}) {
  const [prefs, setPrefs] = useState<Preferences>(initial);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  const toggle = (key: keyof Preferences) => {
    const next = {...prefs, [key]: !prefs[key]};
    setPrefs(next);
    setError(null);
    setSaved(false);
    startTransition(async () => {
      try {
        await updatePreferences(next);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (err) {
        setPrefs(prefs); // revert
        setError(err instanceof Error ? err.message : 'Failed to save');
      }
    });
  };

  return (
    <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
      {ITEMS.map((item) => (
        <div
          key={item.key}
          className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
          <div className="min-w-0">
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {item.title}
            </p>
            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
              {item.description}
            </p>
          </div>
          <Switch
            checked={prefs[item.key]}
            onChange={() => toggle(item.key)}
            disabled={pending}
            label={item.title}
          />
        </div>
      ))}
      {error && (
        <p className="pt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {saved && (
        <p className="pt-3 text-xs text-emerald-600 dark:text-emerald-400">
          Saved
        </p>
      )}
    </div>
  );
}

function Switch({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? 'bg-accent' : 'bg-neutral-300 dark:bg-neutral-700'
      } disabled:cursor-not-allowed disabled:opacity-50`}>
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}
