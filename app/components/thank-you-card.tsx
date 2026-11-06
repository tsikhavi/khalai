'use client';

import {AnimatePresence, motion} from 'motion/react';

export function ThankYouCard({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.35}}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
          onClick={onClose}>
          <motion.div
            initial={{opacity: 0, y: 40, scale: 0.94}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 20, scale: 0.96}}
            transition={{type: 'spring', stiffness: 260, damping: 24}}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-neutral-950 p-8 text-center text-white shadow-2xl ring-1 ring-white/10">
            {/* Soft glow behind the card */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(60%_60%_at_50%_40%,rgba(74,144,164,0.35),transparent_70%)] blur-2xl" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">
              Khalai Studio
            </p>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
              Thank you for reaching the bottom of the page
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-white/70">
              You made it all the way through. Take what you saw and go build
              something worth the scroll.
            </p>

            <button
              type="button"
              onClick={() => {
                window.scrollTo({top: 0, behavior: 'smooth'});
                onClose();
              }}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 transition hover:bg-white/90 active:scale-[0.98]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
              Back to top
            </button>

            <button
              type="button"
              onClick={onClose}
              className="mt-3 block w-full text-xs text-white/40 hover:text-white/70">
              Dismiss
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
