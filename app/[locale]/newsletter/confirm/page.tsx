import Link from 'next/link';
import {apiFetch} from '@/lib/api-server';

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{token?: string}>;
}) {
  const {token} = await searchParams;

  if (!token) {
    return (
      <main className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Missing token</h1>
        <p className="mt-3 text-sm text-gray-500">
          The confirmation link is invalid.
        </p>
      </main>
    );
  }

  let ok = false;
  let error: string | null = null;
  try {
    await apiFetch(
      `/api/newsletter/confirm?token=${encodeURIComponent(token)}`
    );
    ok = true;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Confirmation failed';
  }

  return (
    <main className="mx-auto max-w-md px-6 py-24 text-center">
      {ok ? (
        <>
          <h1 className="text-2xl font-semibold">You&apos;re subscribed 🎉</h1>
          <p className="mt-3 text-sm text-gray-500">
            Thanks for confirming. We&apos;ll be in touch soon.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800">
            Back to home
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">Confirmation failed</h1>
          <p className="mt-3 text-sm text-red-500">{error}</p>
        </>
      )}
    </main>
  );
}
