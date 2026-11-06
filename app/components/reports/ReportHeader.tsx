import type {Report} from '@/lib/reports';

export default function ReportHeader({report}: {report: Report}) {
  return (
    <header className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
            {report.client}
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            {report.title}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {report.start} → {report.target} · Phase: {report.phase} · Owner:{' '}
            {report.owner}
          </p>
        </div>
        <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent">
          {report.status.replace('-', ' ')}
        </span>
      </div>
    </header>
  );
}
