import Link from 'next/link';
import {redirect} from 'next/navigation';
import {apiFetch} from '@/lib/api-server';
import {getCurrentUser} from '@/lib/auth';
import {getLocale} from 'next-intl/server';

type Thread = {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: 'open' | 'replied' | 'closed';
  createdAt: string;
  updatedAt: string;
  _count: {messages: number};
};

export const metadata = {title: 'Inbox'};

export default async function InboxPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/dashboard');

  const locale = await getLocale();

  const threads = await apiFetch<Thread[]>('/api/admin/inbox', {
    cache: 'no-store',
  });
  const openCount = threads.filter((t) => t.status === 'open').length;

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Inbox
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {threads.length} thread{threads.length === 1 ? '' : 's'}
            {openCount > 0 && ` · ${openCount} open`}
          </p>
        </div>
      </header>

      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-400">
            <tr>
              <th className="px-4 py-2 font-medium">From</th>
              <th className="px-4 py-2 font-medium">Subject</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {threads.map((t) => (
              <tr
                key={t.id}
                className="border-t border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50">
                <td className="px-4 py-3 align-top">
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">
                    {t.name}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {t.email}
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <Link
                    href={`/${locale}/dashboard/admin/inbox/${t.id}`}
                    className="font-medium text-neutral-900 hover:underline dark:text-neutral-100">
                    {t.subject}
                  </Link>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {t._count.messages} message
                    {t._count.messages === 1 ? '' : 's'}
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <StatusBadge status={t.status} />
                </td>
                <td className="px-4 py-3 align-top text-xs text-neutral-500 dark:text-neutral-400">
                  {formatDate(t.updatedAt)}
                </td>
              </tr>
            ))}
            {threads.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  No messages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({status}: {status: Thread['status']}) {
  const styles: Record<Thread['status'], string> = {
    open: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30',
    replied:
      'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/30',
    closed:
      'bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700',
  };
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() === now.getFullYear() ? undefined : 'numeric',
  });
}
