import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

export async function loadAllReports() {
  const dir = path.join(process.cwd(), 'content', 'reports');
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.md'));
  const out = [];
  for (const f of files) {
    const raw = await fs.readFile(path.join(dir, f), 'utf-8');
    const {data} = matter(raw);
    out.push({
      slug: f.replace(/\.md$/, ''),
      title: data.title,
      client: data.client,
      progress: Number(data.progress ?? 0),
      status: data.status,
    });
  }
  return out;
}
