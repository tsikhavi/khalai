import type {Receipt} from '@/lib/types/payments';

type ReceiptLabels = {
  receipt: string;
  issued: string;
  download: string;
};

export function ReceiptCard({
  receipt,
  labels,
}: {
  receipt: Receipt;
  labels: ReceiptLabels;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-(--paper)/60 p-6 dark:border-neutral-800 dark:bg-neutral-950/40">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-widest text-neutral-500 uppercase">
            {labels.receipt}
          </p>
          <p className="mt-1 font-mono text-lg font-bold">{receipt.number}</p>
          <p className="mt-1 text-xs text-neutral-500">
            {labels.issued} {new Date(receipt.createdAt).toLocaleDateString()}
          </p>
        </div>
        {receipt.pdfUrl && (
          <a
            href={receipt.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent underline-offset-4 hover:underline">
            {labels.download}
          </a>
        )}
      </div>
    </div>
  );
}
