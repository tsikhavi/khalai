// frontend/app/(dashboard)/admin/inbox/loading.tsx
export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
      <div className="overflow-hidden rounded-lg border bg-white">
        {Array.from({length: 6}).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-t px-4 py-4 first:border-t-0">
            <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
            <div className="h-4 flex-1 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
