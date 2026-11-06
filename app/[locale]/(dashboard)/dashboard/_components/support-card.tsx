export default function SupportCard() {
  const whatsapp =
    'https://wa.me/254700000000?text=' +
    encodeURIComponent('Hi, I have a question about my project');

  return (
    <section className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-900/60">
      <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        Need something?
      </h2>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        Reply to a thread, or send files via WhatsApp or email.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-green-600/30 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-400">
          WhatsApp
        </a>
        <a
          href="mailto:hello@khalai.studio"
          className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
          Email
        </a>
      </div>
    </section>
  );
}
