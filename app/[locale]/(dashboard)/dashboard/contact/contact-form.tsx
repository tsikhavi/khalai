'use client';

import {useState, FormEvent} from 'react';
import {submitContact} from '@/lib/actions/contact';

const input =
  'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-900';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    acceptedTerms: false,
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({...p, [e.target.name]: e.target.value}));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await submitContact(form); // ← this looks like a function call,
      //   but it's actually a POST request
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="mt-6 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-800">
        Thanks — your message has been sent.
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 space-y-4"
      noValidate>
      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          className={input}
          disabled={loading}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          className={input}
          disabled={loading}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Subject</label>
        <input
          name="subject"
          value={form.subject}
          onChange={onChange}
          className={input}
          disabled={loading}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Message</label>
        <textarea
          name="message"
          rows={6}
          value={form.message}
          onChange={onChange}
          className={input}
          disabled={loading}
          required
        />
      </div>

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
      <label className="flex cursor-pointer items-start gap-2">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          disabled={loading}
        />
        <span className="text-xs">I agree to the Terms and Privacy Policy</span>
      </label>

      <button
        type="submit"
        disabled={loading || !acceptedTerms}

        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60">
        {loading ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
