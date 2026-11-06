'use client';

import { useTranslations } from 'next-intl';

type DailyPoint = { day: string; count: number };
type CategoryPoint = { key: string; count: number };

type SampleRow = {
  name: string;
  email: string;
  subject: string;
  service: string;
  source: string;
  when: string;
  status: 'open' | 'replied';
};

export default function LeadsPreview() {
  const t = useTranslations('Marketing.leadsPreview');

  // Sample data lives in the translation file so each locale can localise it
  const daily = t.raw('sample.daily') as DailyPoint[];
  const byService = t.raw('sample.byService') as CategoryPoint[];
  const bySource = t.raw('sample.bySource') as CategoryPoint[];
  const rows = t.raw('sample.rows') as SampleRow[];

  // Stat strip values are derived from the sample data
  const total = daily.reduce((sum, d) => sum + d.count, 0);
  const openCount = rows.filter((r) => r.status === 'open').length;
  const topService = byService[0]?.key ?? '—';
  const topSource = bySource[0]?.key ?? '—';

  return (
    <div className="mt-6 space-y-6">
      {/* Sample banner */}
      <div className="flex items-center gap-2 rounded-lg border border-laurel-500/30 bg-laurel-500/5 px-3 py-2 text-xs text-laurel-700 dark:text-laurel-300">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-laurel-500" />
        {t('banner')}
      </div>

      {/* Stat strip */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: t('stats.total'), value: String(total) },
          { label: t('stats.open'), value: String(openCount) },
          {
            label: t('stats.topService'),
            value: t(`sample.services.${topService}`),
          },
          {
            label: t('stats.topSource'),
            value: t(`sample.sources.${topSource}`),
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-foreground/10 p-4"
          >
            <p className="text-[10px] uppercase tracking-wider text-foreground/50">
              {s.label}
            </p>
            <p className="mt-1.5 text-xl font-semibold tabular-nums capitalize">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title={t('charts.daily')}>
          <DailyBars data={daily} />
        </ChartCard>
        <ChartCard title={t('charts.byService')}>
          <HorizontalBars
            data={byService}
            labelFn={(key) => t(`sample.services.${key}`)}
          />
        </ChartCard>
        <ChartCard title={t('charts.bySource')} className="lg:col-span-2">
          <HorizontalBars
            data={bySource}
            labelFn={(key) => t(`sample.sources.${key}`)}
          />
        </ChartCard>
      </div>

      {/* Table preview */}
      <div className="overflow-hidden rounded-xl border border-foreground/10">
        <table className="w-full text-sm">
          <thead className="bg-foreground/5 text-left text-[10px] uppercase tracking-wider text-foreground/50">
            <tr>
              <th className="px-4 py-2 font-medium">{t('table.when')}</th>
              <th className="px-4 py-2 font-medium">{t('table.name')}</th>
              <th className="px-4 py-2 font-medium">{t('table.subject')}</th>
              <th className="px-4 py-2 font-medium">{t('table.service')}</th>
              <th className="px-4 py-2 font-medium">{t('table.source')}</th>
              <th className="px-4 py-2 font-medium">{t('table.status')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.email} className="border-t border-foreground/5">
                <td className="px-4 py-3 text-xs text-foreground/50">
                  {new Date(r.when).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-foreground/50">{r.email}</div>
                </td>
                <td className="px-4 py-3">{r.subject}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-laurel-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-laurel-700 dark:text-laurel-300">
                    {t(`sample.services.${r.service}`)}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-foreground/60">
                  {t(`sample.sources.${r.source}`)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize ${
                      r.status === 'open'
                        ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400'
                        : 'border-green-200 bg-green-50 text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-400'
                    }`}
                  >
                    {t(`statuses.${r.status}`)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CSV hint */}
      <div className="rounded-xl border border-dashed border-foreground/20 p-4 text-sm text-foreground/70">
        <p className="font-medium">+ {t('csv.title')}</p>
        <p className="mt-1 text-xs text-foreground/60">{t('csv.body')}</p>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-xl border border-foreground/10 p-5 ${className ?? ''}`}
    >
      <h3 className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function DailyBars({ data }: { data: DailyPoint[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex h-32 items-end gap-1">
      {data.map((d) => (
        <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-t bg-laurel-500/80"
            style={{ height: `${(d.count / max) * 100}%`, minHeight: 2 }}
          />
          <span className="text-[8px] text-foreground/40">
            {new Date(d.day).toLocaleDateString(undefined, {
              day: 'numeric',
            })}
          </span>
        </div>
      ))}
    </div>
  );
}

function HorizontalBars({
  data,
  labelFn,
}: {
  data: CategoryPoint[];
  labelFn: (key: string) => string;
}) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <ul className="space-y-2">
      {data.map((d) => (
        <li key={d.key}>
          <div className="flex items-baseline justify-between gap-3 text-xs">
            <span className="truncate capitalize text-foreground/80">
              {labelFn(d.key)}
            </span>
            <span className="shrink-0 tabular-nums text-foreground/50">
              {d.count}
            </span>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full rounded-full bg-laurel-500"
              style={{ width: `${(d.count / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}