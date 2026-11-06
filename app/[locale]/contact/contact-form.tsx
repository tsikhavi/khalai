'use client';

import {useState, FormEvent, useTransition} from 'react';
import {submitContact} from '@/lib/actions/contact';
import {FieldError} from '@/components/ui/field-error';
import {cn} from '@/lib/utils';
import {RevealSection, RevealChild} from '@/components/studio/RevealSection';
import Link from 'next/link';
import {useLocale} from 'next-intl';

type Labels = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  successBody: string;
  errorGeneric: string;
  optional: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  companyPlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  acceptTermsPrefix: string;
  acceptTermsLink: string;
  acceptTermsAnd: string;
  acceptPrivacyLink: string;
  acceptTermsError: string;
  formFootnote: string;
};

const fieldClass =
  'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none transition-colors ' +
  'placeholder:text-neutral-400 ' +
  'focus:border-(--accent) focus:ring-1 focus:ring-(--accent) ' +
  'disabled:cursor-not-allowed disabled:opacity-60 ' +
  'dark:border-neutral-700 dark:bg-neutral-900 dark:placeholder:text-neutral-500';

export function ContactForm({
  labels,
  defaultSubject = '',
  service = null,
  source = null,
}: {
  labels: Labels;
  defaultSubject?: string;
  service?: string | null;
  source?: string | null;
}) {
  const locale = useLocale();

  const [pending, start] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    subject: defaultSubject,
    message: '',
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((p) => ({...p, [e.target.name]: e.target.value}));
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => {
        const next = {...prev};
        delete next[e.target.name];
        return next;
      });
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = 'Required';
    if (!form.email.trim()) errors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Invalid email';
    }
    if (!form.subject.trim()) errors.subject = 'Required';
    if (!form.message.trim()) errors.message = 'Required';
    else if (form.message.trim().length < 10) {
      errors.message = 'A little more detail, please';
    }
    if (!acceptedTerms) errors.acceptedTerms = labels.acceptTermsError;
    return errors;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    start(async () => {
      try {
        await submitContact({
          name: form.name,
          email: form.email,
          subject: form.subject,
          acceptedTerms,
          message: form.company
            ? `Company: ${form.company}\n\n${form.message}`
            : form.message,
          service: service ?? undefined,
          source: source ?? undefined,
          referrer:
            typeof document !== 'undefined'
              ? document.referrer || undefined
              : undefined,
          pageUrl:
            typeof window !== 'undefined' ? window.location.href : undefined,
        });
        setDone(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : labels.errorGeneric);
      }
    });
  };

  if (done) {
    return (
      <RevealSection
        as="section"
        direction="up"
        amount={0.2}
        className="py-16">
        <div className="mx-auto max-w-xl px-6 text-center">
          <RevealChild>
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-(--accent)/10 text-accent">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </RevealChild>
          <RevealChild
            as="h2"
            className="text-2xl font-semibold tracking-tight">
            {labels.success}
          </RevealChild>
          <RevealChild
            as="p"
            className="mt-3 text-neutral-600 dark:text-neutral-400">
            {labels.successBody}
          </RevealChild>
        </div>
      </RevealSection>
    );
  }

  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.1}
      className="py-16">
      <div className="mx-auto max-w-xl px-6">
        <form
          onSubmit={onSubmit}
          className="space-y-5"
          noValidate>
          {/* ── Name ────────────────────────────────────── */}
          <RevealChild>
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium">
                {labels.name}
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={onChange}
                disabled={pending}
                placeholder={labels.namePlaceholder}
                aria-invalid={!!fieldErrors.name}
                autoComplete="name"
                className={cn(fieldClass, fieldErrors.name && 'border-red-500')}
              />
              <FieldError error={fieldErrors.name} />
            </div>
          </RevealChild>

          {/* ── Email ───────────────────────────────────── */}
          <RevealChild>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium">
                {labels.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                disabled={pending}
                placeholder={labels.emailPlaceholder}
                aria-invalid={!!fieldErrors.email}
                autoComplete="email"
                inputMode="email"
                className={cn(
                  fieldClass,
                  fieldErrors.email && 'border-red-500'
                )}
              />
              <FieldError error={fieldErrors.email} />
            </div>
          </RevealChild>

          {/* ── Company (optional) ──────────────────────── */}
          <RevealChild>
            <div>
              <label
                htmlFor="company"
                className="mb-1.5 block text-sm font-medium">
                {labels.company}{' '}
                <span className="text-neutral-400">({labels.optional})</span>
              </label>
              <input
                id="company"
                name="company"
                value={form.company}
                onChange={onChange}
                disabled={pending}
                placeholder={labels.companyPlaceholder}
                autoComplete="organization"
                className={fieldClass}
              />
            </div>
          </RevealChild>

          {/* ── Subject ─────────────────────────────────── */}
          <RevealChild>
            <div>
              <label
                htmlFor="subject"
                className="mb-1.5 block text-sm font-medium">
                {labels.subject}
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={onChange}
                disabled={pending}
                placeholder={labels.subjectPlaceholder}
                aria-invalid={!!fieldErrors.subject}
                className={cn(
                  fieldClass,
                  fieldErrors.subject && 'border-red-500'
                )}
              />
              <FieldError error={fieldErrors.subject} />
            </div>
          </RevealChild>

          {/* ── Message ─────────────────────────────────── */}
          <RevealChild>
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium">
                {labels.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={form.message}
                onChange={onChange}
                disabled={pending}
                placeholder={labels.messagePlaceholder}
                aria-invalid={!!fieldErrors.message}
                className={cn(
                  fieldClass,
                  'resize-y',
                  fieldErrors.message && 'border-red-500'
                )}
              />
              <FieldError error={fieldErrors.message} />
            </div>
          </RevealChild>

          {/* ── Terms acceptance ────────────────────────── */}
          <RevealChild>
            <div>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.checked);
                    if (fieldErrors.acceptedTerms) {
                      setFieldErrors((prev) => {
                        const next = {...prev};
                        delete next.acceptedTerms;
                        return next;
                      });
                    }
                  }}
                  disabled={pending}
                  aria-invalid={!!fieldErrors.acceptedTerms}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-300 accent-accent dark:border-neutral-700"
                />
                <span className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {labels.acceptTermsPrefix}{' '}
                  <Link
                    href={`/${locale}/terms`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-accent">
                    {labels.acceptTermsLink}
                  </Link>{' '}
                  {labels.acceptTermsAnd}{' '}
                  <Link
                    href={`/${locale}/privacy`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-accent">
                    {labels.acceptPrivacyLink}
                  </Link>
                  .
                </span>
              </label>
              <FieldError error={fieldErrors.acceptedTerms} />
            </div>
          </RevealChild>

          {/* ── Footnote ────────────────────────────────── */}
          <RevealChild>
            <p className="text-[11px] leading-relaxed text-neutral-500">
              {labels.formFootnote}
            </p>
          </RevealChild>

          {/* ── Submit error ────────────────────────────── */}
          {error && (
            <RevealChild>
              <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
                {error}
              </p>
            </RevealChild>
          )}

          {/* ── Submit ──────────────────────────────────── */}
          <RevealChild>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-(--accent)/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
              {pending ? labels.sending : labels.send}
            </button>
          </RevealChild>
        </form>
      </div>
    </RevealSection>
  );
}
