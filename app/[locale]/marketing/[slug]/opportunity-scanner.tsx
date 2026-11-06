'use client';

import {useState} from 'react';

type Check = {
  item: string;
  status: 'missing' | 'weak' | 'present';
  note: string;
};

type Labels = {
  inputPlaceholder: string;
  inputButton: string;
  inputHelper: string;
  statusMissing: string;
  statusWeak: string;
  statusPresent: string;
  resultsTitle: string;
  errorGeneric: string;
};

export default function OpportunityScanner({labels}: {labels: Labels}) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Check[] | null>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults(null);
    setLoading(true);

    try {
      const res = await fetch('/api/marketing/scan', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({url}),
      });
      if (!res.ok) {
        throw new Error(
          (await res.json().catch(() => ({}))).error ?? 'Scan failed'
        );
      }
      const data = (await res.json()) as {checks: Check[]};
      setResults(data.checks);
    } catch (err) {
      setError(err instanceof Error ? err.message : labels.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const pill = (status: Check['status']) => {
    const label =
      status === 'missing'
        ? labels.statusMissing
        : status === 'weak'
          ? labels.statusWeak
          : labels.statusPresent;
    const cls =
      status === 'missing'
        ? 'bg-secondary/15 text-secondary'
        : status === 'weak'
          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
          : 'bg-laurel-500/15 text-laurel-700 dark:text-laurel-300';
    return (
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${cls}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="mt-6 rounded-xl border border-laurel-500/30 bg-laurel-500/5 p-6">
      <form
        onSubmit={run}
        className="flex flex-col gap-3 sm:flex-row">
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={labels.inputPlaceholder}
          className="h-11 flex-1 rounded-lg border border-foreground/15 bg-background px-4 text-sm focus:border-laurel-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-11 rounded-lg bg-laurel-700 px-5 text-sm font-medium text-white hover:bg-laurel-800 disabled:opacity-60 dark:bg-laurel-500 dark:text-black dark:hover:bg-laurel-400">
          {loading ? '…' : labels.inputButton}
        </button>
      </form>
      <p className="mt-2 text-xs text-foreground/50">{labels.inputHelper}</p>

      {error && (
        <p className="mt-4 rounded-md border border-secondary/30 bg-secondary/10 px-3 py-2 text-sm text-secondary">
          {error}
        </p>
      )}

      {results && (
        <div className="mt-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/50">
            {labels.resultsTitle}
          </p>
          <ul className="mt-3 divide-y divide-foreground/10 rounded-lg border border-foreground/10 bg-background">
            {results.map((check, i) => (
              <li
                key={i}
                className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 text-sm">
                <div className="flex-1">
                  <span className="font-medium">{check.item}</span>
                  <span className="ml-2 text-xs text-foreground/50">
                    {check.note}
                  </span>
                </div>
                {pill(check.status)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
