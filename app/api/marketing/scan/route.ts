import {NextRequest, NextResponse} from 'next/server';

type Check = {
  item: string;
  status: 'missing' | 'weak' | 'present';
  note: string;
};

export async function POST(req: NextRequest) {
  let url: string;
  try {
    const body = (await req.json()) as {url?: string};
    url = (body.url ?? '').trim();
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    new URL(url); // validate
  } catch {
    return NextResponse.json({error: 'Invalid URL.'}, {status: 400});
  }

  let html: string;
  let finalUrl: string;
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: {'User-Agent': 'KhalaiSEOBot/1.0 (+https://khalai.studio)'},
      signal: AbortSignal.timeout(10_000),
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Upstream returned ${res.status}`);
    html = await res.text();
    finalUrl = res.url;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Could not fetch URL.';
    return NextResponse.json({error: msg}, {status: 502});
  }

  const checks: Check[] = [];

  /* ── Title ───────────────────────────────────── */
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? '';
  checks.push({
    item: 'Page title',
    status: !title
      ? 'missing'
      : title.length < 20 || title.length > 65
        ? 'weak'
        : 'present',
    note: !title
      ? 'No <title> found. Google has nothing to show.'
      : `"${title.slice(0, 60)}${title.length > 60 ? '…' : ''}" (${title.length} chars). Ideal: 50–60.`,
  });

  /* ── Meta description ────────────────────────── */
  const metaDesc =
    html
      .match(
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
      )?.[1]
      ?.trim() ?? '';
  checks.push({
    item: 'Meta description',
    status: !metaDesc
      ? 'missing'
      : metaDesc.length < 60 || metaDesc.length > 160
        ? 'weak'
        : 'present',
    note: !metaDesc
      ? 'No meta description. Google writes its own snippet.'
      : `${metaDesc.length} chars. Ideal: 120–160.`,
  });

  /* ── H1 ──────────────────────────────────────── */
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, '').trim()
  );
  checks.push({
    item: 'H1 heading',
    status: h1s.length === 0 ? 'missing' : h1s.length > 1 ? 'weak' : 'present',
    note:
      h1s.length === 0
        ? 'No <h1> — search engines cannot see the main heading.'
        : h1s.length > 1
          ? `${h1s.length} <h1> tags. There should be one.`
          : `"${h1s[0]?.slice(0, 50)}"`,
  });

  /* ── Image alt text ──────────────────────────── */
  const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const imgNoAlt = imgTags.filter((t) => !/\balt=/.test(t));
  checks.push({
    item: 'Image alt text',
    status:
      imgTags.length === 0
        ? 'present'
        : imgNoAlt.length === 0
          ? 'present'
          : imgNoAlt.length / imgTags.length > 0.5
            ? 'missing'
            : 'weak',
    note:
      imgTags.length === 0
        ? 'No images found.'
        : `${imgNoAlt.length}/${imgTags.length} images missing alt text.`,
  });

  /* ── Open Graph ──────────────────────────────── */
  const hasOg = /property=["']og:title["']/i.test(html);
  checks.push({
    item: 'Open Graph tags',
    status: hasOg ? 'present' : 'missing',
    note: hasOg
      ? 'Social previews will render properly.'
      : 'Links shared on WhatsApp, LinkedIn, X will look bare.',
  });

  /* ── Structured data ─────────────────────────── */
  const hasSchema = /application\/ld\+json/i.test(html);
  checks.push({
    item: 'Structured data (schema.org)',
    status: hasSchema ? 'present' : 'missing',
    note: hasSchema
      ? 'Rich results are possible.'
      : 'No schema. Google cannot show ratings, prices, or FAQs in search.',
  });

  /* ── Canonical ──────────────────────────────── */
  const hasCanonical = /rel=["']canonical["']/i.test(html);
  checks.push({
    item: 'Canonical URL',
    status: hasCanonical ? 'present' : 'weak',
    note: hasCanonical
      ? 'Duplicate content signals handled.'
      : 'No canonical. Risk of duplicate-content issues.',
  });

  /* ── Sitemap hint ────────────────────────────── */
  let sitemapOk = false;
  try {
    const base = new URL(finalUrl);
    const sitemapRes = await fetch(`${base.origin}/sitemap.xml`, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5_000),
      cache: 'no-store',
    });
    sitemapOk = sitemapRes.ok;
  } catch {
    sitemapOk = false;
  }
  checks.push({
    item: 'Sitemap.xml',
    status: sitemapOk ? 'present' : 'missing',
    note: sitemapOk
      ? 'Found — crawlers have a map.'
      : 'No sitemap.xml. Google has to guess what to crawl.',
  });

  /* ── Language tag ────────────────────────────── */
  const lang = html.match(/<html[^>]+lang=["']([^"']+)["']/i)?.[1];
  checks.push({
    item: 'Language tag',
    status: lang ? 'present' : 'weak',
    note: lang ? `Declared as "${lang}".` : 'No lang attribute on <html>.',
  });

  return NextResponse.json({checks});
}
