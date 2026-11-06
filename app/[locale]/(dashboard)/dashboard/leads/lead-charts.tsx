'use client';

export default function LeadCharts({
  serviceStats,
  sourceStats,
  daily,
}: {
  serviceStats: {key: string; count: number}[];
  sourceStats: {key: string; count: number}[];
  daily: {day: string; count: number}[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Daily trend */}
      <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Last 14 days
        </h2>
        <DailyBars data={daily} />
      </section>

      {/* Service breakdown */}
      <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          By service
        </h2>
        <HorizontalBars
          data={serviceStats}
          emptyLabel="No service data"
        />
      </section>

      {/* Source breakdown */}
      <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 lg:col-span-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          By source
        </h2>
        <HorizontalBars
          data={sourceStats}
          emptyLabel="No source data"
        />
      </section>
    </div>
  );
}

function DailyBars({data}: {data: {day: string; count: number}[]}) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="mt-4 flex h-40 items-end gap-1.5">
      {data.map((d) => (
        <div
          key={d.day}
          className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-t bg-laurel-500/80 transition-colors hover:bg-laurel-500"
            style={{
              height: `${(d.count / max) * 100}%`,
              minHeight: 2,
            }}
            title={`${d.day}: ${d.count}`}
          />
          <span className="text-[9px] text-neutral-400 dark:text-neutral-500">
            {new Date(d.day).toLocaleDateString(undefined, {
              month: 'short',
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
  emptyLabel,
}: {
  data: {key: string; count: number}[];
  emptyLabel: string;
}) {
  if (data.length === 0) {
    return (
      <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
        {emptyLabel}
      </p>
    );
  }
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <ul className="mt-4 space-y-2">
      {data.map((d) => (
        <li key={d.key}>
          <div className="flex items-baseline justify-between gap-4 text-sm">
            <span className="truncate capitalize text-neutral-800 dark:text-neutral-200">
              {d.key}
            </span>
            <span className="shrink-0 tabular-nums text-neutral-500 dark:text-neutral-400">
              {d.count}
            </span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className="h-full rounded-full bg-laurel-500"
              style={{width: `${(d.count / max) * 100}%`}}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
