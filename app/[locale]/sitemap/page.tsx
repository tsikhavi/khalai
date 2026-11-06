// app/[locale]/sitemap/page.tsx
import Link from 'next/link';
import {getLocale} from 'next-intl/server';

const SECTIONS = [
  {
    title: 'Studio',
    links: [
      {href: '/', label: 'Home'},
      {href: '/contact', label: 'Contact'},
      {href: '/start', label: 'Projects'},
      {href: '/process', label: 'Process'},
      {href: '/creativity', label: 'Creativity'},
    ],
  },
  {
    title: 'Account',
    links: [
      {href: '/dashboard', label: 'Dashboard'},
      {href: '/dashboard/reports', label: 'Reports'},
      {href: '/dashboard/messages', label: 'Messages'},
      {href: '/dashboard/payments', label: 'Payments'},
    ],
  },
  {
    title: 'Legal',
    links: [
      {href: '/terms', label: 'Terms'},
      {href: '/privacy', label: 'Privacy'},
    ],
  },
];

export default async function SitemapPage() {
  const locale = await getLocale();

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Sitemap</h1>
      <div className="mt-10 space-y-10">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-xs uppercase tracking-[0.3em] text-foreground/50">
              {section.title}
            </h2>
            <ul className="mt-4 space-y-2">
              {section.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={`/${locale}${l.href}`}
                    className="text-foreground underline-offset-4 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
