'use client';

import {useState, FormEvent} from 'react';
import Link from 'next/link';
import {useAuth} from '@/providers/AuthProvider';
import {useAlert} from '@/components/ui/alert';
import {validateLoginForm, FieldErrors} from '@/lib/validation';
import {isRedirectError} from '@/lib/next-redirect';
import {cn} from '@/lib/utils';

import {FieldError} from '@/components/ui/field-error';
import {AppleIcon, GoogleIcon, MetaIcon} from '@/components/ui/ThemeIcon';
import {PasswordInput} from './PasswordInput';

type Labels = {
  title: string;
  subtitle: string;
  identifier: string;
  identifierPlaceholder: string;
  password: string;
  forgotPassword: string;
  signIn: string;
  signingIn: string;
  orContinue: string;
  noAccount: string;
  signUp: string;
  oauthApple: string;
  oauthGoogle: string;
  oauthMeta: string;
  validationError: string;
  welcomeBack: string;
  loginFailed: string;
  showPassword: string;
  hidePassword: string;
};

const fieldClass =
  'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none transition-colors ' +
  'placeholder:text-neutral-400 ' +
  'focus:border-(--accent) focus:ring-1 focus:ring-(--accent) ' +
  'disabled:cursor-not-allowed disabled:opacity-60 ' +
  'dark:border-neutral-700 dark:bg-neutral-950 dark:placeholder:text-neutral-500';

export function LoginForm({locale, labels}: {locale: string; labels: Labels}) {
  const {login} = useAuth();
  const {success, error: showError, warning} = useAlert();

  const [form, setForm] = useState({identifier: '', password: ''});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      warning(
        `${labels.validationError} (${Object.keys(validationErrors).length})`
      );
      return;
    }

    setIsLoading(true);
    try {
      await login(form);
      success(labels.welcomeBack);
    } catch (err) {
      if (isRedirectError(err)) throw err;
      const message = err instanceof Error ? err.message : labels.loginFailed;
      showError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5">
      <header className="space-y-1.5 text-center md:text-start">
        <h1 className="text-2xl font-semibold tracking-tight">
          {labels.title}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {labels.subtitle}
        </p>
      </header>

      <div>
        <label
          htmlFor="identifier"
          className="mb-1.5 block text-sm font-medium">
          {labels.identifier}
        </label>
        <input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          value={form.identifier}
          onChange={handleChange}
          disabled={isLoading}
          placeholder={labels.identifierPlaceholder}
          aria-invalid={!!errors.identifier}
          className={cn(fieldClass, errors.identifier && 'border-red-500')}
        />
        <FieldError error={errors.identifier} />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium">
            {labels.password}
          </label>
          <Link
            href={`/${locale}/forgot-password`}
            className="text-xs text-neutral-500 underline-offset-4 hover:text-accent hover:underline">
            {labels.forgotPassword}
          </Link>
        </div>

        <PasswordInput
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          disabled={isLoading}
          ariaInvalid={!!errors.password}
          autoComplete="current-password"
          showLabel={labels.showPassword}
          hideLabel={labels.hidePassword}
        />
        <FieldError error={errors.password} />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white dark:text-neutral-700 transition-colors hover:bg-accent/90 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60">
        {isLoading ? labels.signingIn : labels.signIn}
      </button>

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
          disabled={isLoading}>
          <AppleIcon className="h-5 w-5" />
        </OAuthButton>
        <OAuthButton
          label={labels.oauthGoogle}
          disabled={isLoading}>
          <GoogleIcon className="h-5 w-5" />
        </OAuthButton>
        <OAuthButton
          label={labels.oauthMeta}
          disabled={isLoading}>
          <MetaIcon className="h-5 w-5" />
        </OAuthButton>
      </div>

      <p className="pt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
        {labels.noAccount}{' '}
        <Link
          href={`/${locale}/register`}
          className="font-medium text-accent underline-offset-4 hover:underline">
          {labels.signUp}
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
