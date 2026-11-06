import Link from 'next/link';
import {loadAllReports} from '@/lib/reports-list'; // small helper below
import {getLocale} from 'next-intl/server';

export default async function ReportsIndex() {
  const locale = await getLocale();
  const reports = await loadAllReports();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
        <p className="text-sm text-neutral-500">
          Live progress on every project you have with us.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/${locale}/dashboard/reports/${r.slug}`}
              className="block rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
              <div className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                {r.client}
              </div>
              <div className="mt-2 text-lg font-semibold tracking-tight">
                {r.title}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{width: `${r.progress}%`}}
                  />
                </div>
                <span className="text-xs font-medium tabular-nums">
                  {r.progress}%
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
