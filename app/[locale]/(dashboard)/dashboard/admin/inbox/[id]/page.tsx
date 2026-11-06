import {notFound, redirect} from 'next/navigation';
import Link from 'next/link';
import {apiFetch} from '@/lib/api-server';
import {getCurrentUser} from '@/lib/auth';
import {ThreadView} from './thread-view';
import {getLocale} from 'next-intl/server';

export type Message = {
  id: string;
  fromAdmin: boolean;
  body: string;
  createdAt: string;
};

export type ThreadDetail = {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: 'open' | 'replied' | 'closed';
  createdAt: string;
  updatedAt: string;
  messages: Message[];

  // ── tracking (all nullable) ─────────────────────
  service: string | null;
  source: string | null;
  referrer: string | null;
  pageUrl: string | null;
};

export default async function ThreadPage({
  params,
}: {
  params: Promise<{id: string}>;
}) {
  const {id} = await params;
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/dashboard');

  const locale = await getLocale();

  let thread: ThreadDetail;
  try {
    thread = await apiFetch<ThreadDetail>(`/api/admin/inbox/${id}`, {
      cache: 'no-store',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : '';
    if (/not found|404/i.test(message)) notFound();
    throw err;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href={`/${locale}/dashboard/admin/inbox/`}
        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
        ← Back to inbox
      </Link>

      <ThreadView thread={thread} />
    </div>
  );
}
