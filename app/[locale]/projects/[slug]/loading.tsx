export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="h-4 w-32 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      <div className="mt-6 h-6 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      <div className="mt-4 h-12 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      <div className="mt-4 h-5 w-full rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      <div className="mt-8 h-10 w-40 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      <div className="mt-10 aspect-video rounded-2xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
    </div>
  );
}
