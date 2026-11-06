import type {Phase} from '@/lib/reports';

const DOT = {
  done: 'bg-accent',
  'in-progress': 'bg-accent/40 ring-2 ring-accent/40 animate-pulse',
  pending: 'bg-neutral-300 dark:bg-neutral-700',
};

export default function Timeline({phases}: {phases: Phase[]}) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold tracking-tight">
        The path so far
      </h2>
      <ol className="relative space-y-6 border-s border-neutral-200 ps-6 dark:border-neutral-800">
        {phases.map((p) => (
          <li
            key={p.name}
            className="relative">
            <span
              className={`absolute -inset-s-7.75 top-1.5 inline-block h-3 w-3 rounded-full ${DOT[p.status]}`}
            />
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-sm font-semibold tracking-tight">{p.name}</h3>
              <span className="text-[10px] uppercase tracking-wider text-neutral-500">
                {p.status.replace('-', ' ')}
              </span>
              {p.completed && (
                <span className="text-xs text-neutral-500">
                  · completed {p.completed}
                </span>
              )}
              {p.started && !p.completed && (
                <span className="text-xs text-neutral-500">
                  · started {p.started}
                </span>
              )}
              {p.target && !p.completed && (
                <span className="text-xs text-neutral-500">
                  · target {p.target}
                </span>
              )}
            </div>

            <div
              className="prose prose-sm prose-neutral mt-2 max-w-none text-neutral-600 dark:prose-invert dark:text-neutral-400"
              dangerouslySetInnerHTML={{__html: p.bodyHtml}}
            />

            {p.tasks.length > 0 && (
              <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                {p.tasks.map((t) => (
                  <li
                    key={t.label}
                    className="flex items-center gap-2 text-sm">
                    <span
                      className={`inline-flex h-4 w-4 items-center justify-center rounded border ${
                        t.done
                          ? 'border-accent bg-accent text-white'
                          : 'border-neutral-300 dark:border-neutral-700'
                      }`}>
                      {t.done && (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3">
                          <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span
                      className={t.done ? 'text-neutral-500 line-through' : ''}>
                      {t.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
