'use client';

import {useState} from 'react';

export default function ExportButton({
  serviceFilter,
  sourceFilter,
}: {
  serviceFilter?: string;
  sourceFilter?: string;
}) {
  const [pending, setPending] = useState(false);

  const download = () => {
    setPending(true);
    const params = new URLSearchParams();
    if (serviceFilter) params.set('service', serviceFilter);
    if (sourceFilter) params.set('source', sourceFilter);

    const url = `/api/admin/leads/export${
      params.toString() ? `?${params.toString()}` : ''
    }`;

    // Trigger browser download via temporary anchor
    const a = document.createElement('a');
    a.href = url;
    a.download = ''; // filename comes from Content-Disposition
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Reset pending after a short delay — the browser handles the actual download
    setTimeout(() => setPending(false), 800);
  };

  return (
    <button
      onClick={download}
      disabled={pending}
      className="inline-flex h-9 items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-60 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800">
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2">
        <path
          d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {pending ? 'Preparing…' : 'Export CSV'}
    </button>
  );
}
