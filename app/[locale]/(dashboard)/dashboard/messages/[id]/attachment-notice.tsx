import {WhatsAppIcon, InboxIcon} from '@/components/ui/ThemeIcon'; // adjust imports to your icon set

export default function AttachmentNotice({threadId}: {threadId: string}) {
  const subject = encodeURIComponent(
    `Files for thread #${threadId.slice(0, 8)}`
  );
  const mailto = `mailto:hello@khalai.studio?subject=${subject}`;
  const whatsapp =
    'https://wa.me/254700000000?text=' +
    encodeURIComponent(
      `Hi, I want to share files about thread #${threadId.slice(0, 8)}`
    );

  return (
    <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-4 text-sm dark:border-neutral-700 dark:bg-neutral-900/60">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <path
              d="M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            Need to send files?
          </p>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            Images, PDFs, screenshots, and other attachments aren&apos;t
            supported in this thread. Send them through one of the channels
            below and mention{' '}
            <span className="font-medium">thread #{threadId.slice(0, 8)}</span>{' '}
            so we attach them to this conversation.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-green-600/30 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-100 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-400">
              <WhatsAppIcon className="h-3.5 w-3.5" />
              WhatsApp
            </a>
            <a
              href={mailto}
              className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
              <InboxIcon className="h-3.5 w-3.5" />
              Email hello@khalai.studio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
