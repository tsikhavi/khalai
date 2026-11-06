export default function Loading() {
  return (
    <div
      role="status"
      className="max-w-sm animate-pulse">
      <div className="h-2.5 bg-neutral-quaternary rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-neutral-quaternary rounded-full max-w-90 mb-2.5"></div>
      <div className="h-2 bg-neutral-quaternary rounded-full mb-2.5"></div>
      <div className="h-2 bg-neutral-quaternary rounded-full max-w-82.5 mb-2.5"></div>
      <div className="h-2 bg-neutral-quaternary rounded-full max-w-75 mb-2.5"></div>
      <div className="h-2 bg-neutral-quaternary rounded-full max-w-90"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
