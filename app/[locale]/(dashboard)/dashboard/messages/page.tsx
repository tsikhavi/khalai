import Link from 'next/link';
import {redirect} from 'next/navigation';
import {apiFetch} from '@/lib/api-server';
import {getCurrentUser} from '@/lib/auth';
import {getLocale} from 'next-intl/server';

type Thread = {
  id: string;
  subject: string;
  status: 'open' | 'replied' | 'closed';
  updatedAt: string;
  createdAt: string;
  messages: Array<{
    id: string;
    fromAdmin: boolean;
    body: string;
    readAt: string | null;
    createdAt: string;
  }>;
};

export const metadata = {title: 'Messages'};

export default async function MessagesPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const locale = await getLocale();

  const threads = await apiFetch<Thread[]>('/api/contact/mine', {
    cache: 'no-store',
  });

  const unreadTotal = threads.reduce(
    (acc, t) => acc + t.messages.filter((m) => m.fromAdmin && !m.readAt).length,
    0
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-lg font-semibold">Messages</h1>
        <p className="text-sm text-gray-500">
          {threads.length} conversation{threads.length === 1 ? '' : 's'}
          {unreadTotal > 0 && (
            <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              {unreadTotal} new
            </span>
          )}
        </p>
      </header>

      {threads.length === 0 ? (
        <div className="rounded-lg border bg-white p-12 text-center text-sm text-gray-500">
          You haven&apos;t sent any messages yet.{' '}
          <Link
            href={`/${locale}/contact`}
            className="underline">
            Contact us
          </Link>
          .
        </div>
      ) : (
        <ul className="divide-y overflow-hidden rounded-lg border bg-white">
          {threads.map((t) => {
            const lastMessage = t.messages[t.messages.length - 1];
            const unread = t.messages.filter(
              (m) => m.fromAdmin && !m.readAt
            ).length;

            return (
              <li key={t.id}>
                <Link
                  href={`/${locale}/dashboard/messages/${t.id}`}
                  className="block px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium">
                          {t.subject}
                        </span>
                        {unread > 0 && (
                          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-semibold text-white">
                            {unread}
                          </span>
                        )}
                      </div>
                      {lastMessage && (
                        <p className="mt-1 truncate text-sm text-gray-500">
                          <span className="font-medium">
                            {lastMessage.fromAdmin ? 'Support: ' : 'You: '}
                          </span>
                          {lastMessage.body}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 text-xs text-gray-400">
                      {formatRelative(t.updatedAt)}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function formatRelative(iso: string) {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString(undefined, {month: 'short', day: 'numeric'});
}
