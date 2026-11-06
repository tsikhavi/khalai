import {notFound, redirect} from 'next/navigation';
import Link from 'next/link';
import {apiFetch} from '@/lib/api-server';
import {getCurrentUser} from '@/lib/auth';
import {markThreadRead} from '@/lib/actions/inbox';
import ReplyForm from './reply-form';
import AttachmentNotice from './attachment-notice';
import {getLocale} from 'next-intl/server';

type Message = {
  id: string;
  fromAdmin: boolean;
  body: string;
  readAt: string | null;
  createdAt: string;
};

type ThreadDetail = {
  id: string;
  subject: string;
  name: string;
  email: string;
  status: 'open' | 'replied' | 'closed';
  createdAt: string;
  messages: Message[];
};

export default async function UserThreadPage({
  params,
}: {
  params: Promise<{id: string}>;
}) {
  const {id} = await params;
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const locale = await getLocale();

  let thread: ThreadDetail;
  try {
    thread = await apiFetch<ThreadDetail>(`/api/contact/mine/${id}`, {
      cache: 'no-store',
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : '';
    if (/not found|404|forbidden|403/i.test(msg)) notFound();
    throw err;
  }

  await markThreadRead(thread.id);

  const closed = thread.status === 'closed';

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href={`/${locale}/dashboard/messages`}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
        ← Back to messages
      </Link>

      <header className="rounded-lg border bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-base font-semibold">{thread.subject}</h1>
            <p className="mt-1 text-xs text-gray-400">
              Started {new Date(thread.createdAt).toLocaleString()}
            </p>
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
              closed
                ? 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
            }`}>
            {thread.status}
          </span>
        </div>
      </header>

      <div className="space-y-3">
        {thread.messages.map((m) => (
          <article
            key={m.id}
            className={`rounded-lg border p-4 text-sm ${
              m.fromAdmin
                ? 'mr-8 border-green-200 bg-green-50 dark:border-green-500/20 dark:bg-green-500/10'
                : 'ml-8 border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'
            }`}>
            <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
              <span className="font-medium">
                {m.fromAdmin ? 'Support' : 'You'}
              </span>
              <time dateTime={m.createdAt}>
                {new Date(m.createdAt).toLocaleString()}
              </time>
            </div>
            <p className="whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-neutral-200">
              {m.body}
            </p>
          </article>
        ))}
      </div>

      {closed ? (
        <div className="rounded-lg border bg-neutral-50 p-4 text-center text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
          This thread is closed. Reply by{' '}
          <a
            href="mailto:hello@khalai.studio"
            className="underline">
            email
          </a>{' '}
          or open a new thread from{' '}
          <Link
            href={`/${locale}/contact`}
            className="underline">
            Contact
          </Link>
          .
        </div>
      ) : (
        <>
          <ReplyForm threadId={thread.id} />
          <AttachmentNotice threadId={thread.id} />
        </>
      )}
    </div>
  );
}
