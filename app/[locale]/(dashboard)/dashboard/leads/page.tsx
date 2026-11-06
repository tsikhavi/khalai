import {redirect} from 'next/navigation';
import {headers} from 'next/headers';
import Link from 'next/link';
import {getCurrentUser} from '@/lib/auth';
import {apiFetch} from '@/lib/api-server';
import {getLocale} from 'next-intl/server';
import {now as getNow} from '@/lib/now';
import LeadCharts from './lead-charts';
import LeadTable from './lead-table';
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

export const metadata = {title: 'Leads'};

export default async function LeadsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/dashboard');

  const locale = await getLocale();

  // Stable "now" via request header (matches the pattern used in activity/page.tsx)
  const hdrs = await headers();
  const headerDate = Number(hdrs.get('date'));
  const now =
    Number.isFinite(headerDate) && headerDate > 0 ? headerDate : getNow();

  const leads = await apiFetch<Lead[]>('/api/admin/leads', {
    cache: 'no-store',
  }).catch(() => [] as Lead[]);

  // ── aggregate by service ────────────────────────────
  const byService = new Map<string, number>();
  const bySource = new Map<string, number>();
  const byDay = new Map<string, number>();

  for (const lead of leads) {
    const svc = lead.service ?? 'direct';
    byService.set(svc, (byService.get(svc) ?? 0) + 1);

    const src = lead.source ?? 'direct';
    bySource.set(src, (bySource.get(src) ?? 0) + 1);

    const day = new Date(lead.createdAt).toISOString().slice(0, 10);
    byDay.set(day, (byDay.get(day) ?? 0) + 1);
  }

  const serviceStats = [...byService.entries()]
    .map(([key, count]) => ({key, count}))
    .sort((a, b) => b.count - a.count);

  const sourceStats = [...bySource.entries()]
    .map(([key, count]) => ({key, count}))
    .sort((a, b) => b.count - a.count);

  // last 14 days, filled in so missing days show zero
  const last14: {day: string; count: number}[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now - i * 86_400_000).toISOString().slice(0, 10);
    last14.push({day: d, count: byDay.get(d) ?? 0});
  }

  const total = leads.length;
  const openCount = leads.filter((l) => l.status === 'open').length;
  const tracked = leads.filter((l) => l.service).length;
  const trackedRate = total > 0 ? Math.round((tracked / total) * 100) : 0;

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Leads
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {total} total · {openCount} open · {trackedRate}% with source
            tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ExportButton />
          <Link
            href={`/${locale}/dashboard/admin/inbox`}
            className="text-sm text-laurel-700 hover:underline dark:text-laurel-300">
            Open inbox →
          </Link>
        </div>
      </header>

      {/* Stat strip */}
      <div className="grid gap-4 md:grid-cols-4">
        <Stat
          label="Total leads"
          value={String(total)}
        />
        <Stat
          label="Open"
          value={String(openCount)}
        />
        <Stat
          label="Top service"
          value={serviceStats[0]?.key ?? '—'}
          hint={serviceStats[0] ? `${serviceStats[0].count} leads` : 'no data'}
        />
        <Stat
          label="Top source"
          value={sourceStats[0]?.key ?? '—'}
          hint={sourceStats[0] ? `${sourceStats[0].count} leads` : 'no data'}
        />
      </div>

      {/* Charts */}
      <LeadCharts
        serviceStats={serviceStats}
        sourceStats={sourceStats}
        daily={last14}
      />

      {/* Table */}
      <LeadTable
        leads={leads}
        labels={{
          when: 'When',
          name: 'Name',
          subject: 'Subject',
          service: 'Service',
          source: 'Source',
          status: 'Status',
          empty: 'No leads yet.',
        }}
      />
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
          {hint}
        </p>
      )}
    </div>
  );
}
