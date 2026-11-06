export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="mx-auto h-12 w-64 rounded-md bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        <div className="mx-auto mt-4 h-5 w-96 max-w-full rounded-md bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      </div>

      <div className="mb-8 flex gap-2 justify-center">
        {Array.from({length: 6}).map((_, i) => (
          <div
            key={i}
            className="h-9 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse"
          />
        ))}
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({length: 6}).map((_, i) => (
          <li key={i}>
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <div className="aspect-video bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                <div className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                <div className="h-6 w-20 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
