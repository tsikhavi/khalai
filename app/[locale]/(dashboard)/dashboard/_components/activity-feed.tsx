'use client';

import {motion} from 'framer-motion';

type Event = {at: string; kind: 'thread' | 'message' | 'reply'; text: string};

export default function ActivityFeed({events}: {events: Event[]}) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <header className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Recent activity
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Latest movement on your account.
        </p>
      </header>

      {events.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          No activity yet. Send a message to get started.
        </p>
      ) : (
        <ol className="space-y-3">
          {events.map((e, i) => (
            <motion.li
              key={i}
              initial={{opacity: 0, x: -8}}
              animate={{opacity: 1, x: 0}}
              transition={{delay: i * 0.05, duration: 0.4}}
              className="flex items-start gap-3">
              <span
                className={`mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full ${
                  e.kind === 'reply'
                    ? 'bg-emerald-500'
                    : e.kind === 'thread'
                      ? 'bg-accent'
                      : 'bg-neutral-400'
                }`}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-neutral-800 dark:text-neutral-200">
                  {e.text}
                </p>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">
                  {relative(e.at)}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      )}
    </section>
  );
}

function relative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}
