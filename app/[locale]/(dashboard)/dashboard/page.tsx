import {redirect} from 'next/navigation';
import {getCurrentUser} from '@/lib/auth';
import {apiFetch} from '@/lib/api-server';
import {getLocale} from 'next-intl/server';
import {loadAllReports} from '@/lib/reports-list';
import {loadReport} from '@/lib/reports';
import StatsStrip from './_components/stats-strip';
import ContinueStrip from './_components/continue-strip';
import ActivityFeed from './_components/activity-feed';
import QuickActions from './_components/quick-actions';
import SupportCard from './_components/support-card';
import RouteCards from './_components/route-cards';
import NextUpCard from './_components/next-up-card';

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

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const locale = await getLocale();

  // Fetch everything in parallel
  const [threads, reportSummaries] = await Promise.all([
    apiFetch<Thread[]>('/api/contact/mine', {cache: 'no-store'}).catch(
      () => []
    ),
    loadAllReports().catch(() => []),
  ]);

  // Load the *active* report in full (need phases for timeline + next-up)
  const activeSummary = reportSummaries
    .filter((r) => r.status !== 'complete' && r.status !== 'closed')
    .sort((a, b) => b.progress - a.progress)[0];

  const activeReport = activeSummary
    ? await loadReport(activeSummary.slug).catch(() => null)
    : null;

  // Derive everything the page needs
  const unreadThreads = threads.filter((t) =>
    t.messages.some((m) => m.fromAdmin && !m.readAt)
  );
  const unreadCount = unreadThreads.reduce(
    (a, t) => a + t.messages.filter((m) => m.fromAdmin && !m.readAt).length,
    0
  );
  const activeCount = reportSummaries.filter(
    (r) => r.status !== 'complete' && r.status !== 'closed'
  ).length;
  const avgProgress =
    reportSummaries.length > 0
      ? Math.round(
          reportSummaries.reduce((a, r) => a + r.progress, 0) /
            reportSummaries.length
        )
      : 0;

  // Payments (best effort — skip if endpoint missing)
  let balance = 0;
  try {
    const payments = await apiFetch<Array<{amount: number; status: string}>>(
      '/api/payments/mine',
      {cache: 'no-store'}
    );
    balance = payments
      .filter((p) => p.status === 'pending' || p.status === 'overdue')
      .reduce((a, p) => a + p.amount, 0);
  } catch {
    // ignore — dashboard still renders
  }

  // Recent activity feed events (last 6)
  type Event = {at: string; kind: 'thread' | 'message' | 'reply'; text: string};
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
    .slice(0, 6);

  return (
    <div className="space-y-10">
      <StatsStrip
        activeProjects={activeCount}
        overallProgress={avgProgress}
        unreadMessages={unreadCount}
        balance={balance}
        isAdmin={user.role === 'ADMIN'}
        locale={locale}
      />

      <ContinueStrip
        activeReport={activeReport}
        unreadThread={unreadThreads[0] ?? null}
        locale={locale}
      />

      {activeReport && (
        <NextUpCard
          report={activeReport}
          locale={locale}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <ActivityFeed events={recent} />
        <div className="space-y-6">
          <QuickActions locale={locale} />
          <SupportCard />
        </div>
      </div>

      <RouteCards
        isAdmin={user.role === 'ADMIN'}
        activeProjectSlug={activeSummary?.slug ?? null}
        locale={locale}
      />
    </div>
  );
}
