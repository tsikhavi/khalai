'use client';

import {useRef, useState, useTransition, useEffect} from 'react';
import {sendUserReply} from '@/lib/actions/inbox';

export default function ReplyForm({threadId}: {threadId: string}) {
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLTextAreaElement>(null);

  // auto-grow textarea
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 220) + 'px';
  }, [body]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const text = body.trim();
    if (!text) return;

    startTransition(async () => {
      const result = await sendUserReply(threadId, text);
      if (result.ok) {
        setBody('');
      } else {
        setError(result.error);
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
      <label
        htmlFor="reply"
        className="sr-only">
        Reply
      </label>
      <textarea
        ref={ref}
        id="reply"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleSubmit(e);
        }}
        placeholder="Write a reply… (Cmd/Ctrl + Enter to send)"
        rows={3}
        disabled={isPending}
        className="w-full resize-none rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm leading-relaxed outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-950"
      />

      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-[11px] text-neutral-500">{body.length}/4000</span>
        <div className="flex items-center gap-2">
          {error && (
            <span className="text-[11px] text-red-600 dark:text-red-400">
              {error}
            </span>
          )}
          <button
            type="submit"
            disabled={isPending || !body.trim()}
            className="rounded-md bg-accent px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
            {isPending ? 'Sending…' : 'Send reply'}
          </button>
        </div>
      </div>
    </form>
  );
}
