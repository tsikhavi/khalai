import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import {remark} from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

export type PhaseStatus = 'done' | 'in-progress' | 'pending';

export type Phase = {
  name: string;
  status: PhaseStatus;
  bodyHtml: string;
  tasks: {label: string; done: boolean}[];
  completed?: string;
  started?: string;
  target?: string;
};

export type Report = {
  slug: string;
  title: string;
  client: string;
  start: string;
  target: string;
  status: string;
  progress: number;
  phase: string;
  owner: string;
  introHtml: string;
  phases: Phase[];
  metrics: {label: string; value: number}[];
};

const REPORTS_DIR = path.join(process.cwd(), 'content', 'reports');

// ─── helper ───────────────────────────────────────────────────
function toDateString(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10); // "2025-09-01"
  return String(v ?? '');
}

export async function loadReport(slug: string): Promise<Report> {
  const raw = await fs.readFile(path.join(REPORTS_DIR, `${slug}.md`), 'utf-8');
  const {data, content} = matter(raw);

  const sections = content.split(/^## /m).filter(Boolean);
  const introMarkdown = sections[0]?.startsWith('Phases')
    ? ''
    : (content.split(/^## /m)[0] ?? '');

  const phasesSection = sections.find((s) => s.startsWith('Phases'));
  const metricsSection = sections.find((s) => s.startsWith('Metrics'));

  const phases = phasesSection ? await parsePhases(phasesSection) : [];
  const metrics = metricsSection ? parseMetrics(metricsSection) : [];

  const introHtml = String(
    await remark().use(remarkGfm).use(remarkHtml).process(introMarkdown)
  );

  // ─── date coercion applied here ─────────────────────────────
  return {
    slug,
    title: data.title as string,
    client: data.client as string,
    start: toDateString(data.start),
    target: toDateString(data.target),
    status: data.status as string,
    progress: Number(data.progress ?? 0),
    phase: data.phase as string,
    owner: data.owner as string,
    introHtml,
    phases,
    metrics,
  };
}

async function parsePhases(section: string): Promise<Phase[]> {
  const blocks = section.split(/^### /m).slice(1);
  const out: Phase[] = [];

  for (const block of blocks) {
    const [heading, ...rest] = block.split('\n');
    const [name, rawStatus] = heading.split('—').map((s) => s.trim());
    const status: PhaseStatus =
      rawStatus === 'done'
        ? 'done'
        : rawStatus === 'in-progress'
          ? 'in-progress'
          : 'pending';

    const body = rest.join('\n');
    const tasks = Array.from(body.matchAll(/^- \[(x| )\] (.+)$/gm)).map(
      (m) => ({
        label: m[2].trim(),
        done: m[1] === 'x',
      })
    );

    const completed = body.match(/^completed:\s*(.+)$/m)?.[1]?.trim();
    const started = body.match(/^started:\s*(.+)$/m)?.[1]?.trim();
    const target = body.match(/^target:\s*(.+)$/m)?.[1]?.trim();

    const cleanBody = body
      .split('\n')
      .filter((l) => !/^(completed|started|target):/i.test(l.trim()))
      .join('\n');

    const bodyHtml = String(
      await remark().use(remarkGfm).use(remarkHtml).process(cleanBody)
    );

    out.push({name, status, bodyHtml, tasks, completed, started, target});
  }
  return out;
}

function parseMetrics(section: string): {label: string; value: number}[] {
  const rows = Array.from(
    section.matchAll(/^\|\s*([A-Za-z0-9 ]+)\s*\|\s*(\d+)\s*\|$/gm)
  );
  return rows
    .filter((m) => !/^-+$/.test(m[1]) && m[1].trim() !== 'Week')
    .map((m) => ({label: m[1].trim(), value: Number(m[2])}));
}
