import {redirect} from 'next/navigation';
import Link from 'next/link';
import {headers} from 'next/headers';
import {apiFetch} from '@/lib/api-server';
import {getCurrentUser} from '@/lib/auth';
import {getLocale} from 'next-intl/server';
import {loadAllReports} from '@/lib/reports-list';
import {now as getNow} from '@/lib/now';

type Thread = {
  id: string;
  subject: string;
  status: 'open' | 'replied' | 'closed';
  createdAt: string;
  updatedAt: string;
  messages: Array<{
    id: string;
    fromAdmin: boolean;
    body: string;
    readAt: string | null;
    createdAt: string;
  }>;
};

export const metadata = {title: 'Activity'};

export default async function ActivityPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const locale = await getLocale();

  const [threads, reports] = await Promise.all([
    apiFetch<Thread[]>('/api/contact/mine', {cache: 'no-store'}).catch(
      () => []
    ),
    loadAllReports().catch(() => []),
  ]);

  // ── Stable "now" from the request Date header ───────────
  // headers() is request-scoped; the Date header is set by Next.js / the
  // proxy at the boundary of the request. Falls back to a wrapper helper
  // only when the header is missing (some proxies strip it).
  const hdrs = await headers();
  const headerDate = Number(hdrs.get('date'));
  const now =
    Number.isFinite(headerDate) && headerDate > 0 ? headerDate : getNow();

  // ── top-line metrics ─────────────────────────────────────
  const totalMessages = threads.reduce((a, t) => a + t.messages.length, 0);

  // avg reply time: for each admin message, find the preceding user message
  const replyDeltas: number[] = [];
  for (const t of threads) {
    for (let i = 0; i < t.messages.length; i++) {
      const m = t.messages[i];
      if (!m.fromAdmin) continue;
      for (let j = i - 1; j >= 0; j--) {
        if (!t.messages[j].fromAdmin) {
          replyDeltas.push(
            new Date(m.createdAt).getTime() -
              new Date(t.messages[j].createdAt).getTime()
          );
          break;
        }
      }
    }
  }
  const avgReplyMs =
    replyDeltas.length > 0
      ? replyDeltas.reduce((a, b) => a + b, 0) / replyDeltas.length
      : 0;
  const avgReplyLabel =
    avgReplyMs === 0
      ? '—'
      : avgReplyMs < 3_600_000
        ? `${Math.round(avgReplyMs / 60_000)}m`
        : avgReplyMs < 86_400_000
          ? `${Math.round(avgReplyMs / 3_600_000)}h`
          : `${Math.round(avgReplyMs / 86_400_000)}d`;

  const avgProgress =
    reports.length > 0
      ? Math.round(reports.reduce((a, r) => a + r.progress, 0) / reports.length)
      : 0;

  // ── recent activity feed ────────────────────────────────
  type Event = {at: string; kind: string; text: string};
  const events: Event[] = [];

  for (const t of threads) {
    events.push({
      at: t.createdAt,
      kind: 'thread',
      text: `You opened "${t.subject}"`,
    });
    for (const m of t.messages) {
      events.push({
        at: m.createdAt,
        kind: m.fromAdmin ? 'reply' : 'message',
        text: m.fromAdmin
          ? `Studio replied in "${t.subject}"`
          : `You sent a message in "${t.subject}"`,
      });
    }
  }

  const recent = events
    .sort((a, b) => +new Date(b.at) - +new Date(a.at))
    .slice(0, 8);

  const weeks = buildWeeks(events, now, 8);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Activity
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Your history with Khalai Studio — messages, replies, and project
          progress.
        </p>
      </header>

      {/* ── Top-line metrics ─────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Messages"
          value={String(totalMessages)}
          hint="total exchanged"
        />
        <Stat
          label="Avg reply"
          value={avgReplyLabel}
          hint="studio response time"
        />
        <Stat
          label="Progress"
          value={`${avgProgress}%`}
          hint="across projects"
        />
        <Stat
          label="Projects"
          value={String(reports.length)}
          hint="active"
        />
      </div>

      {/* ── Weekly message chart + recent feed ───────── */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Messages per week
          </h2>
          <BarChart data={weeks} />
        </section>

        <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Recent activity
          </h2>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
              No activity yet.
            </p>
          ) : (
            <ol className="mt-4 space-y-3">
              {recent.map((e, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm">
                  <span
                    className={`mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full ${
                      e.kind === 'reply'
                        ? 'bg-emerald-500'
                        : e.kind === 'thread'
                          ? 'bg-accent'
                          : 'bg-neutral-400'
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-neutral-800 dark:text-neutral-200">
                      {e.text}
                    </p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">
                      {relative(e.at, now)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>

      {/* ── Project progress ─────────────────────────── */}
      {reports.length > 0 && (
        <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Project progress
          </h2>
          <ul className="mt-4 space-y-3">
            {reports.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/${locale}/dashboard/reports/${r.slug}`}
                  className="group block">
                  <div className="flex items-center justify-between gap-4">
                    <span className="truncate text-sm font-medium text-neutral-900 group-hover:text-accent dark:text-neutral-100">
                      {r.title}
                    </span>
                    <span className="text-xs tabular-nums text-neutral-500 dark:text-neutral-400">
                      {r.progress}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                    <div
                      className="h-full rounded-full bg-accent transition-all"
                      style={{width: `${r.progress}%`}}
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

// ── Presentational components ─────────────────────────────────

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
        {value}
      </p>
      <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
        {hint}
      </p>
    </div>
  );
}

function BarChart({data}: {data: {label: string; count: number}[]}) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="mt-4 flex h-40 items-end gap-2">
      {data.map((d, i) => (
        <div
          key={i}
          className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-t bg-accent/80 transition-all hover:bg-accent"
            style={{height: `${(d.count / max) * 100}%`, minHeight: 4}}
            title={`${d.count} messages`}
          />
          <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Pure helpers ──────────────────────────────────────────────

function buildWeeks(
  events: {at: string; kind: string}[],
  now: number,
  n: number
) {
  const out: {label: string; count: number}[] = [];
  for (let w = n - 1; w >= 0; w--) {
    const start = now - (w + 1) * 7 * 86_400_000;
    const end = now - w * 7 * 86_400_000;
    const count = events.filter(
      (e) =>
        e.kind !== 'thread' && +new Date(e.at) >= start && +new Date(e.at) < end
    ).length;
    const label = new Date(end).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
    out.push({label, count});
  }
  return out;
}

function relative(iso: string, now: number) {
  const diff = now - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}
