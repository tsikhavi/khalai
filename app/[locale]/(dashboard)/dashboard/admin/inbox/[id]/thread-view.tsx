'use client';

import {useRef, useEffect, useState, useTransition} from 'react';
import {useRouter} from 'next/navigation';
import {replyToThread, setThreadStatus} from '@/lib/actions/contact';
import type {ThreadDetail} from './page';

export function ThreadView({thread}: {thread: ThreadDetail}) {
  const [reply, setReply] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 240) + 'px';
  }, [reply]);

  const closed = thread.status === 'closed';

  const send = () => {
    const body = reply.trim();
    if (!body || pending || closed) return;

    setError(null);
    startTransition(async () => {
      try {
        await replyToThread(thread.id, body);
        setReply('');
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to send reply.');
      }
    });
  };

  const changeStatus = (status: ThreadDetail['status']) => {
    if (pending || status === thread.status) return;
    setError(null);
    startTransition(async () => {
      try {
        await setThreadStatus(thread.id, status);
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to update status.'
        );
      }
    });
  };

  const hasTracking = thread.service || thread.source || thread.referrer;

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────── */}
      <header className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {thread.subject}
            </h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {thread.name} &lt;{thread.email}&gt;
            </p>
            <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
              Started {new Date(thread.createdAt).toLocaleString()}
            </p>
          </div>
          <StatusControl
            current={thread.status}
            disabled={pending}
            onChange={changeStatus}
          />
        </div>

        {/* ── Tracking badges ───────────────────────── */}
        {hasTracking && (
          <div className="flex flex-wrap items-center gap-2 border-t border-neutral-200 pt-3 dark:border-neutral-800">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
              Source
            </span>

            {thread.service && (
              <span className="inline-flex items-center gap-1 rounded-full bg-laurel-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-laurel-700 dark:text-laurel-300">
                <span className="h-1 w-1 rounded-full bg-laurel-500" />
                {thread.service}
              </span>
            )}

            {thread.source && (
              <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-2 py-0.5 text-[10px] font-medium text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
                {thread.source}
              </span>
            )}

            {thread.referrer && (
              <a
                href={thread.referrer}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] text-neutral-500 underline-offset-2 hover:text-accent hover:underline dark:text-neutral-400"
                title={thread.referrer}>
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                referrer
              </a>
            )}
          </div>
        )}
      </header>

      {/* ── Messages ───────────────────────────────── */}
      <div className="space-y-3">
        {thread.messages.map((m) => (
          <article
            key={m.id}
            className={`rounded-lg border p-4 text-sm ${
              m.fromAdmin
                ? 'ml-8 border-green-200 bg-green-50 dark:border-green-500/20 dark:bg-green-500/10'
                : 'mr-8 border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'
            }`}>
            <div className="mb-2 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <span className="font-medium">
                {m.fromAdmin ? 'You (admin)' : thread.name}
              </span>
              <time dateTime={m.createdAt}>
                {new Date(m.createdAt).toLocaleString()}
              </time>
            </div>
            <p className="whitespace-pre-wrap leading-relaxed text-neutral-800 dark:text-neutral-200">
              {m.body}
            </p>
          </article>
        ))}
      </div>

      {/* ── Reply box ──────────────────────────────── */}
      <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        {closed ? (
          <div className="rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-4 text-center text-sm text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800/50 dark:text-neutral-400">
            This thread is closed. Re-open it with the status pill above to
            reply.
          </div>
        ) : (
          <>
            <label
              htmlFor="reply"
              className="mb-2 block text-sm font-medium text-neutral-900 dark:text-neutral-100">
              Reply
            </label>
            <textarea
              ref={taRef}
              id="reply"
              rows={4}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') send();
              }}
              placeholder="Type your reply… (Cmd/Ctrl + Enter to send)"
              disabled={pending}
              className="w-full resize-none rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-400 dark:focus:ring-neutral-400"
            />

            {error && (
              <p className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
                {error}
              </p>
            )}

            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-neutral-400 dark:text-neutral-500">
                {pending ? 'Sending…' : `${reply.length}/4000`}
              </span>
              <button
                type="button"
                onClick={send}
                disabled={pending || !reply.trim()}
                className="inline-flex h-9 items-center justify-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white">
                {pending ? 'Sending…' : 'Send reply'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatusControl({
  current,
  disabled,
  onChange,
}: {
  current: ThreadDetail['status'];
  disabled: boolean;
  onChange: (s: ThreadDetail['status']) => void;
}) {
  const options: ThreadDetail['status'][] = ['open', 'replied', 'closed'];

  return (
    <div className="flex shrink-0 gap-1 rounded-full border border-neutral-200 bg-neutral-50 p-1 dark:border-neutral-700 dark:bg-neutral-800">
      {options.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          disabled={disabled || current === s}
          className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
            current === s
              ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
              : 'text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700'
          } disabled:cursor-not-allowed`}>
          {s}
        </button>
      ))}
    </div>
  );
}
