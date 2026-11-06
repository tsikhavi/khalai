'use client';

import Link from 'next/link';
import {useLocale} from 'next-intl';
import {useMemo, useState} from 'react';
import ExportButton from './export-button';

type Lead = {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: 'open' | 'replied' | 'closed';
  createdAt: string;
  service: string | null;
  source: string | null;
  referrer: string | null;
  pageUrl: string | null;
};

type Labels = {
  when: string;
  name: string;
  subject: string;
  service: string;
  source: string;
  status: string;
  empty: string;
};

export default function LeadTable({
  leads,
  labels,
}: {
  leads: Lead[];
  labels: Labels;
}) {
  const locale = useLocale();
  const [filter, setFilter] = useState<string>('all');

  const services = useMemo(() => {
    const set = new Set<string>();
    for (const l of leads) if (l.service) set.add(l.service);
    return [...set].sort();
  }, [leads]);

  const filtered = useMemo(() => {
    if (filter === 'all') return leads;
    return leads.filter((l) => (l.service ?? 'direct') === filter);
  }, [leads, filter]);

  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-10 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
        {labels.empty}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        <FilterPill
          active={filter === 'all'}
          onClick={() => setFilter('all')}
          label="All"
        />
        {filter !== 'all' && (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-neutral-200 bg-neutral-50/50 px-3 py-2 text-xs dark:border-neutral-800 dark:bg-neutral-900/40">
            <span className="text-neutral-600 dark:text-neutral-400">
              Showing {filtered.length} lead{filtered.length === 1 ? '' : 's'}{' '}
              from <strong className="capitalize">{filter}</strong>
            </span>
            <ExportButton serviceFilter={filter} />
          </div>
        )}
        {services.map((svc) => (
          <FilterPill
            key={svc}
            active={filter === svc}
            onClick={() => setFilter(svc)}
            label={svc}
          />
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-2 font-medium">{labels.when}</th>
              <th className="px-4 py-2 font-medium">{labels.name}</th>
              <th className="px-4 py-2 font-medium">{labels.subject}</th>
              <th className="px-4 py-2 font-medium">{labels.service}</th>
              <th className="px-4 py-2 font-medium">{labels.source}</th>
              <th className="px-4 py-2 font-medium">{labels.status}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr
                key={lead.id}
                className="border-t border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50">
                <td className="px-4 py-3 align-top text-xs text-neutral-500 dark:text-neutral-400">
                  {new Date(lead.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">
                    {lead.name}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {lead.email}
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <Link
                    href={`/${locale}/dashboard/admin/inbox/${lead.id}`}
                    className="font-medium text-neutral-900 hover:underline dark:text-neutral-100">
                    {lead.subject}
                  </Link>
                </td>
                <td className="px-4 py-3 align-top">
                  {lead.service ? (
                    <span className="rounded-full bg-laurel-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-laurel-700 dark:text-laurel-300">
                      {lead.service}
                    </span>
                  ) : (
                    <span className="text-xs text-neutral-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 align-top">
                  {lead.source ? (
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">
                      {lead.source}
                    </span>
                  ) : (
                    <span className="text-xs text-neutral-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 align-top">
                  <StatusPill status={lead.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
        active
          ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
          : 'border border-neutral-200 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800'
      }`}>
      {label}
    </button>
  );
}

function StatusPill({status}: {status: Lead['status']}) {
  const styles: Record<Lead['status'], string> = {
    open: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30',
    replied:
      'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/30',
    closed:
      'bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700',
  };
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}
