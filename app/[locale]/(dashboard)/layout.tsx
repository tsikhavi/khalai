import {loadAllReports} from '@/lib/reports-list';
import DashboardShell from './dashboard-shell';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const reports = await loadAllReports();
  const reportTitles = Object.fromEntries(
    reports.map((r) => [r.slug, r.title])
  );

  return (
    <DashboardShell reportTitles={reportTitles}>{children}</DashboardShell>
  );
}
