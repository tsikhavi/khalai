'use client';

import {useMemo, useState, SubmitEvent, useTransition} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import Link from 'next/link';
import {useAuth} from '@/providers/AuthProvider';
import {useAlert} from '@/components/ui/alert';
import {validateRegisterForm, FieldErrors} from '@/lib/validation';
import {isRedirectError} from '@/lib/next-redirect';
import {cn} from '@/lib/utils';

import {FieldError} from '@/components/ui/field-error';
import {PasswordInput} from '@/components/ui/PasswordInput';
import {AppleIcon, GoogleIcon, MetaIcon} from '@/components/ui/ThemeIcon';

type Labels = {
  title: string;
  subtitle: string;
  name: string;
  email: string;
  phone: string;
  phoneOptional: string;
  age: string;
  bio: string;
  bioOptional: string;
  password: string;
  confirmPassword: string;
  passwordHint: string;
  showPassword: string;
  hidePassword: string;
  back: string;
  continue: string;
  createAccount: string;
  creatingAccount: string;
  orContinue: string;
  haveAccount: string;
  signIn: string;
  oauthApple: string;
  oauthGoogle: string;
  oauthMeta: string;
  validationError: string;
  welcome: string;
  registrationFailed: string;
  creatingNotice: string;
  stepOfPrefix: string;
  stepOfSeparator: string;
  review: string;
  edit: string;

  // ── clickwrap ──────────────────────────────────────
  acceptTermsPrefix: string;
  acceptTermsLink: string;
  acceptTermsAnd: string;
  acceptPrivacyLink: string;
  acceptTermsError: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  age: string;
  bio: string;
  password: string;
  confirmPassword: string;
};

type Step = {
  key: keyof FormState;
  question: string;
  placeholder?: string;
  hint?: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'password' | 'password-confirm';
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric';
  optional?: boolean;
  required?: boolean;
};

const fieldClass =
  'w-full rounded-lg border border-neutral-300 bg-white px-3 py-3 text-base outline-none transition-colors ' +
  'placeholder:text-neutral-400 ' +
  'focus:border-(--accent) focus:ring-1 focus:ring-(--accent) ' +
  'disabled:cursor-not-allowed disabled:opacity-60 ' +
  'dark:border-neutral-700 dark:bg-neutral-950 dark:placeholder:text-neutral-500';

export function RegisterForm({
  locale,
  labels,
}: {
  locale: string;
  labels: Labels;
}) {
  const {register} = useAuth();
  const {success, error: showError, warning, info} = useAlert();

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    age: '',
    bio: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, start] = useTransition();
  const [stepIndex, setStepIndex] = useState(0);
  const [reviewing, setReviewing] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // ─── Steps (excluding optional-by-default fields) ────────
  const steps: Step[] = useMemo(
    () => [
      {
        key: 'name',
        question: labels.name,
        placeholder: 'Jane Doe',
        type: 'text',
        autoComplete: 'name',
        required: true,
      },
      {
        key: 'email',
        question: labels.email,
        placeholder: 'jane@example.com',
        type: 'email',
        autoComplete: 'email',
        inputMode: 'email',
        required: true,
      },
      {
        key: 'phone',
        question: labels.phone,
        placeholder: '+254 700 000 000',
        type: 'tel',
        autoComplete: 'tel',
        inputMode: 'tel',
        optional: true,
      },
      {
        key: 'age',
        question: labels.age,
        placeholder: '25',
        type: 'number',
        inputMode: 'numeric',
        required: true,
      },
      {
        key: 'password',
        question: labels.password,
        hint: labels.passwordHint,
        type: 'password',
        autoComplete: 'new-password',
        required: true,
      },
      {
        key: 'confirmPassword',
        question: labels.confirmPassword,
        type: 'password-confirm',
        autoComplete: 'new-password',
        required: true,
      },
    ],
    [labels]
  );

  const total = steps.length;
  const step = steps[stepIndex];
  const isLast = stepIndex === total - 1;

  // ─── Per-step validation ────────────────────────────────
  const validateStep = (s: Step): FieldErrors => {
    const result = validateRegisterForm(form);
    const fieldError = result[s.key];
    const next: FieldErrors = {};
    if (fieldError) next[s.key] = fieldError;

    // Confirm password: validate against password
    if (
      s.type === 'password-confirm' &&
      form.password !== form.confirmPassword
    ) {
      next.confirmPassword = labels.confirmPassword + ' — mismatch';
    }
    return next;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
    if (errors[name]) {
      setErrors((prev) => {
        const next = {...prev};
        delete next[name];
        return next;
      });
    }
  };

  const next = () => {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    if (isLast) {
      setReviewing(true);
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const back = () => {
    setErrors({});
    if (reviewing) {
      setReviewing(false);
      return;
    }
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const skip = () => {
    if (!step.optional) return;
    setErrors({});
    if (isLast) setReviewing(true);
    else setStepIndex((i) => i + 1);
  };

  const submit = (e: SubmitEvent) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      warning(labels.validationError);
      setReviewing(false);
      const firstBad = steps.findIndex((s) => validationErrors[s.key]);
      if (firstBad >= 0) setStepIndex(firstBad);
      return;
    }

    // Clickwrap gate — server also enforces this
    if (!acceptedTerms) {
      warning(labels.acceptTermsError);
      return;
    }

    info(labels.creatingNotice);
    start(async () => {
      try {
        await register({
          email: form.email,
          phone: form.phone || undefined,
          password: form.password,
          name: form.name,
          age: parseInt(form.age, 10),
          bio: form.bio || undefined,
          acceptedTerms,
        });
        success(labels.welcome);
      } catch (err) {
        if (isRedirectError(err)) throw err;
        const message =
          err instanceof Error ? err.message : labels.registrationFailed;
        showError(message);
      }
    });
  };

  return (
    <form
      onSubmit={submit}
      noValidate
      className="space-y-6">
      <header className="space-y-1.5 text-center md:text-start">
        <h1 className="text-2xl font-semibold tracking-tight">
          {labels.title}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {labels.subtitle}
        </p>
      </header>

      {/* Progress dots */}
      {!reviewing && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-500">
            {labels.stepOfPrefix} {stepIndex + 1} {labels.stepOfSeparator}{' '}
            {total}
          </span>
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1.5 w-1.5 rounded-full transition-colors',
                  i < stepIndex && 'bg-accent',
                  i === stepIndex && 'w-4 bg-accent',
                  i > stepIndex && 'bg-neutral-300 dark:bg-neutral-700'
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* Animated body */}
      <div className="relative min-h-45">
        <AnimatePresence
          mode="wait"
          initial={false}>
          {reviewing ? (
            <motion.div
              key="review"
              initial={{opacity: 0, x: 24}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: -24}}
              transition={{duration: 0.25, ease: [0.22, 1, 0.36, 1]}}
              className="space-y-4">
              {/* Review list */}
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800">
                <dl className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {steps.map((s) => {
                    const value = form[s.key];
                    if (!value && s.optional) return null;
                    const display =
                      s.type === 'password' || s.type === 'password-confirm'
                        ? '••••••••'
                        : value;
                    return (
                      <div
                        key={s.key}
                        className="flex items-center gap-4 px-4 py-3 text-sm">
                        <dt className="w-28 shrink-0 text-neutral-500">
                          {s.question}
                        </dt>
                        <dd className="flex-1 truncate">{display}</dd>
                        <button
                          type="button"
                          onClick={() => {
                            setReviewing(false);
                            setStepIndex(
                              steps.findIndex((x) => x.key === s.key)
                            );
                          }}
                          className="shrink-0 text-xs text-accent dark:text-neutral-800 hover:cursor-pointer underline-offset-4 hover:underline">
                          {labels.edit}
                        </button>
                      </div>
                    );
                  })}
                </dl>
              </div>

              {/* Clickwrap — one checkbox, above the submit button */}
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  disabled={pending}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-300 accent-accent dark:border-neutral-700"
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

              <button
                type="submit"
                disabled={pending || !acceptedTerms}
                className="inline-flex h-11 w-full dark:text-neutral-800 hover:cursor-pointer items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60">
                {pending ? labels.creatingAccount : labels.createAccount}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={step.key}
              initial={{opacity: 0, x: 24}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: -24}}
              transition={{duration: 0.25, ease: [0.22, 1, 0.36, 1]}}
              className="space-y-3">
              <label
                htmlFor={step.key}
                className="block text-base font-medium">
                {step.question}
                {step.optional && (
                  <span className="ms-2 text-xs font-normal text-neutral-400">
                    ({labels.phoneOptional})
                  </span>
                )}
              </label>

              {step.type === 'password' || step.type === 'password-confirm' ? (
                <PasswordInput
                  id={step.key}
                  name={step.key}
                  value={form[step.key]}
                  onChange={handleChange}
                  disabled={pending}
                  autoComplete={step.autoComplete ?? 'new-password'}
                  ariaInvalid={!!errors[step.key]}
                  showLabel={labels.showPassword}
                  hideLabel={labels.hidePassword}
                />
              ) : (
                <input
                  id={step.key}
                  name={step.key}
                  type={step.type}
                  autoComplete={step.autoComplete}
                  inputMode={step.inputMode}
                  min={step.type === 'number' ? 18 : undefined}
                  max={step.type === 'number' ? 150 : undefined}
                  value={form[step.key]}
                  onChange={handleChange}
                  disabled={pending}
                  placeholder={step.placeholder}
                  aria-invalid={!!errors[step.key]}
                  className={cn(
                    fieldClass,
                    step.type === 'number' && 'max-w-32',
                    errors[step.key] && 'border-red-500'
                  )}
                />
              )}

              <FieldError error={errors[step.key]} />

              {step.hint && (
                <p className="text-xs text-neutral-500">{step.hint}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      {!reviewing && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={back}
            disabled={stepIndex === 0}
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-800 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-0 dark:hover:text-neutral-100">
            ← {labels.back}
          </button>

          <div className="flex items-center gap-3">
            {step.optional && (
              <button
                type="button"
                onClick={skip}
                className="text-sm text-neutral-500 hover:cursor-pointer underline-offset-4 hover:underline">
                Skip
              </button>
            )}
            <button
              type="button"
              onClick={next}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-white dark:text-neutral-800 hover:cursor-pointer transition-colors hover:bg-accent/90">
              {isLast ? labels.review : labels.continue}
            </button>
          </div>
        </div>
      )}

      {reviewing && (
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={back}
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 hover:cursor-pointer dark:hover:text-neutral-100">
            ← {labels.back}
          </button>
        </div>
      )}

      {/* OAuth — only on first step */}
      {!reviewing && stepIndex === 0 && (
        <>
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs tracking-wider text-neutral-500 uppercase dark:bg-neutral-900">
                {labels.orContinue}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <OAuthButton
              label={labels.oauthApple}
              disabled={pending}>
              <AppleIcon className="h-5 w-5" />
            </OAuthButton>
            <OAuthButton
              label={labels.oauthGoogle}
              disabled={pending}>
              <GoogleIcon className="h-5 w-5" />
            </OAuthButton>
            <OAuthButton
              label={labels.oauthMeta}
              disabled={pending}>
              <MetaIcon className="h-5 w-5" />
            </OAuthButton>
          </div>
        </>
      )}

      <p className="pt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
        {labels.haveAccount}{' '}
        <Link
          href={`/${locale}/login`}
          className="font-medium text-accent underline-offset-4 hover:underline">
          {labels.signIn}
        </Link>
      </p>
    </form>
  );
}

function OAuthButton({
  label,
  disabled,
  children,
}: {
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-200 bg-white transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-800 dark:bg-neutral-950">
      {children}
    </button>
  );
}
