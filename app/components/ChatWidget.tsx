'use client';

import {useState, useRef, useEffect, FormEvent} from 'react';
import {motion, AnimatePresence, type Variants} from 'framer-motion';
import clsx from 'clsx';
import {submitContact} from '@/lib/actions/contact';
import {WhatsAppIcon} from '@/components/ui/ThemeIcon';
import Link from 'next/link';

/* ------------------------------- Config ------------------------------ */
const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(
  /[^\d]/g,
  ''
); // strip "+", spaces, dashes

const WHATSAPP_MESSAGE =
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ??
  "Hi! I'd like to chat about a project.";

const WHATSAPP_ENABLED = WHATSAPP_NUMBER.length > 0;
/* --------------------------- Animation variants ---------------------- */
const panelVariants: Variants = {
  hidden: {opacity: 0, y: 20, scale: 0.96},
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {duration: 0.22, ease: 'easeOut'},
  },
  exit: {opacity: 0, y: 20, scale: 0.96, transition: {duration: 0.16}},
};

const bubbleVariants: Variants = {
  hidden: {opacity: 0, y: 8},
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {delay: 0.05 * i, duration: 0.25},
  }),
};

/* ------------------------------- Types ------------------------------- */
type Message = {id: string; from: 'bot' | 'user'; text: string};
type Stage = 'chat' | 'form' | 'done';

const quickReplies = [
  "I'd like to start a project",
  'I need support',
  'Pricing question',
  'Something else',
] as const;

/* ----------------------------- Component ----------------------------- */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>('chat');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {id: '0', from: 'bot', text: "Hi 👋 I'm Khalai Assistant."},
    {
      id: '1',
      from: 'bot',
      text: 'Are you looking to start a project or get support?',
    },
  ]);
  const [input, setInput] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to newest message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, stage]);

  const pushMessage = (from: 'bot' | 'user', text: string) =>
    setMessages((prev) => [...prev, {id: crypto.randomUUID(), from, text}]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    pushMessage('user', text);
    setInput('');

    // Simulated bot reply → prompts the form
    setTimeout(() => {
      pushMessage(
        'bot',
        "Thanks! I'll pass this to the team. If you'd like a reply, drop your email below — otherwise reach us instantly on WhatsApp."
      );
      setStage('form');
    }, 400);
  };

  const handleQuickReply = (text: string) => {
    pushMessage('user', text);
    setTimeout(() => {
      pushMessage(
        'bot',
        "Got it. Leave your email and message below and we'll reply within 24h."
      );
      setStage('form');
    }, 350);
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        subject: form.subject || 'Chat widget enquiry',
        message: form.message,
        acceptedTerms,
      });
      setStage('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  //const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <>
      {/* ----------------------------- Panel ----------------------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-label="Chat with us"
            className={clsx(
              'fixed z-60 bottom-24 right-4 sm:right-6',
              'w-[calc(100vw-2rem)] sm:w-95 max-h-[70vh]',
              'flex flex-col overflow-hidden rounded-2xl shadow-2xl',
              'border border-green-200 dark:border-neutral-700',
              'bg-white dark:bg-neutral-900'
            )}>
            {/* Header */}
            <div className="flex items-center gap-2 bg-linear-to-r from-neutral-500 to-neutral-400 px-4 py-3 text-white">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                K
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold leading-tight">
                  Khalai Support
                </div>
                <div className="text-[11px] opacity-90 leading-tight">
                  Typically replies in minutes
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1 hover:bg-white/20 transition-colors"
                aria-label="Close chat">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-neutral-50 dark:bg-neutral-950">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  custom={0}
                  variants={bubbleVariants}
                  initial="hidden"
                  animate="visible"
                  className={clsx(
                    'flex',
                    m.from === 'user' ? 'justify-end' : 'justify-start'
                  )}>
                  <div
                    className={clsx(
                      'max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed',
                      m.from === 'user'
                        ? 'bg-green-500 text-white rounded-br-sm'
                        : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-bl-sm border border-neutral-200 dark:border-neutral-700'
                    )}>
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {/* Quick replies */}
              {stage === 'chat' && messages.length <= 2 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {quickReplies.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => handleQuickReply(qr)}
                      className="rounded-full border border-green-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-green-50 dark:hover:bg-neutral-700 transition-colors">
                      {qr}
                    </button>
                  ))}
                </div>
              )}

              {/* Contact form */}
              {stage === 'form' && (
                <form
                  onSubmit={handleSubmitForm}
                  className="mt-2 space-y-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-3">
                  <input
                    type="email"
                    required
                    placeholder="Your email *"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({...p, email: e.target.value}))
                    }
                    disabled={loading}
                    className="w-full rounded-md border border-neutral-300 dark:border-neutral-600 bg-transparent px-3 py-2 text-sm outline-none focus:border-green-500"
                  />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({...p, name: e.target.value}))
                    }
                    disabled={loading}
                    className="w-full rounded-md border border-neutral-300 dark:border-neutral-600 bg-transparent px-3 py-2 text-sm outline-none focus:border-green-500"
                  />
                  <textarea
                    required
                    rows={3}
                    placeholder="Message *"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({...p, message: e.target.value}))
                    }
                    disabled={loading}
                    className="w-full rounded-md border border-neutral-300 dark:border-neutral-600 bg-transparent px-3 py-2 text-sm outline-none focus:border-green-500 resize-none"
                  />
                  {error && (
                    <p className="rounded-md bg-red-50 dark:bg-red-900/30 px-2 py-1 text-xs text-red-700 dark:text-red-300">
                      {error}
                    </p>
                  )}
                  <label className="flex cursor-pointer items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      disabled={loading}
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-neutral-300 accent-green-600 dark:border-neutral-600"
                    />
                    <span className="text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                      I agree to the{' '}
                      <Link
                        href="/en/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-green-600">
                        Terms
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="/en/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-green-600">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  <button
                    type="submit"
                    disabled={loading || !acceptedTerms}
                    className="w-full rounded-md bg-neutral-900 dark:bg-white dark:text-neutral-900 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:hover:bg-neutral-100 disabled:opacity-60">
                    {loading ? 'Sending…' : 'Send message'}
                  </button>
                </form>
              )}

              {/* Success */}
              {stage === 'done' && (
                <motion.div
                  initial={{opacity: 0, scale: 0.95}}
                  animate={{opacity: 1, scale: 1}}
                  className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 p-3 text-sm text-green-800 dark:text-green-300">
                  Thanks! Your message is on its way. We&apos;ll reply to{' '}
                  <strong>{form.email || 'your email'}</strong> shortly.
                </motion.div>
              )}
            </div>

            {/* Footer: input OR whatsapp shortcut */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 px-3 py-3 bg-white dark:bg-neutral-900">
              {stage === 'chat' && (
                <form
                  onSubmit={handleSend}
                  className="flex items-center gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message…"
                    className="flex-1 rounded-full border border-neutral-300 dark:border-neutral-600 bg-transparent px-3 py-2 text-sm outline-none focus:border-green-500"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-green-500 hover:bg-green-600 text-white p-2 transition-colors"
                    aria-label="Send">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6-6m6 6l-6 6"
                      />
                    </svg>
                  </button>
                </form>
              )}

              {/* WhatsApp shortcut — always visible */}
              {WHATSAPP_ENABLED && (
                <Link
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1fb955] text-white py-2 text-sm font-medium transition-colors">
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------ FAB ------------------------------ */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.92}}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        className={clsx(
          'fixed z-61 bottom-16 right-4 sm:right-6',
          'h-14 w-14 rounded-full shadow-xl',
          'bg-linear-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500',
          'text-white flex items-center justify-center transition-colors'
        )}>
        <AnimatePresence
          mode="wait"
          initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{rotate: -90, opacity: 0}}
              animate={{rotate: 0, opacity: 1}}
              exit={{rotate: 90, opacity: 0}}
              transition={{duration: 0.15}}
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{rotate: 90, opacity: 0}}
              animate={{rotate: 0, opacity: 1}}
              exit={{rotate: -90, opacity: 0}}
              transition={{duration: 0.15}}
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72A7.98 7.98 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
