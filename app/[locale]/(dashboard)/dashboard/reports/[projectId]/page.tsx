import {loadReport} from '@/lib/reports';
import ReportHeader from '@/components/reports/ReportHeader';
import Timeline from '@/components/reports/Timeline';
import ProgressRing from '@/components/reports/ProgressRing';
import PhaseBar from '@/components/reports/PhaseBar';
import ActivityChart from '@/components/reports/ActivityChart';

export default async function ProjectReport({
  params,
}: {
  params: Promise<{projectId: string}>;
}) {
  const {projectId} = await params;
  const report = await loadReport(projectId);

  return (
    <div className="space-y-8">
      <ReportHeader report={report} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <ProgressRing value={report.progress} />
          <PhaseBar phases={report.phases} />
        </div>
        <div className="lg:col-span-2">
          <ActivityChart metrics={report.metrics} />
        </div>
      </div>

      <Timeline phases={report.phases} />

      <section
        className="prose prose-neutral max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{__html: report.introHtml}}
      />
    </div>
  );
}
