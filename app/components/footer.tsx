'use client';

import Link from 'next/link';
import {motion} from 'motion/react';
import {useLocale, useTranslations} from 'next-intl';
import {useAuth} from '@/providers/AuthProvider';
import {GitHubIcon, ContactUs} from '@/components/ui/ThemeIcon';
import {InboxIcon} from '@/components/icons';
import {siteConfig} from '@/lib/content/config';
import {NewsletterSubscribe} from './ui/NewsletterSubscribe';

const socials = [
  {
    label: 'GitHub',
    href: siteConfig.social.github,
    icon: GitHubIcon,
    external: true,
  },
  {label: 'X', href: siteConfig.social.twitter, icon: XIcon, external: true},
  {
    label: 'WhatsApp',
    href: `https://wa.me/${siteConfig.whatsapp}`,
    icon: InboxIcon,
    external: true,
  },
  {
    label: 'Email',
    href: `mailto:${siteConfig.email}`,
    icon: ContactUs,
    external: false,
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const locale = useLocale();
  const {user} = useAuth() as {
    user?: {email?: string; name?: string} | null;
  };
  const tLegal = useTranslations('Legal');
  const tNav = useTranslations('Nav');
  const tSite = useTranslations('Site');
  const tFooter = useTranslations('Studio.footer');

  return (
    <motion.footer
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      viewport={{once: true, margin: '-50px'}}
      transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
      className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              href={`/${locale}`}
              className="text-base font-semibold tracking-tight transition-colors hover:text-accent">
              {siteConfig.name}
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {tSite('tagline')}
            </p>
          </div>

          <div className="py-0">
            <NewsletterSubscribe
              source="landing-footer"
              variant="cyan"
              user={user ? {email: user.email!, name: user.name} : null}
            />
          </div>

          <nav aria-label="Social links">
            <ul className="flex items-center gap-1">
              {socials.map(({label, href, icon: Icon, external}) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    title={label}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-accent dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-accent">
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 h-px w-full bg-neutral-200 dark:bg-neutral-800" />

        <div className="mt-6 flex flex-col items-start justify-between gap-4 text-xs text-neutral-500 sm:flex-row sm:items-center">
          <p>
            {tFooter('copyright', {
              year: String(year),
              name: siteConfig.name,
              location: tSite('location'),
            })}
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link
                href={`/${locale}/blog`}
                className="underline-offset-4 transition-colors hover:text-accent hover:underline">
                {tNav('blog')}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/start`}
                className="underline-offset-4 transition-colors hover:text-accent hover:underline">
                {tNav('projects')}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/contact`}
                className="underline-offset-4 transition-colors hover:text-accent hover:underline">
                {tNav('contact')}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/credits`}
                className="underline-offset-4 transition-colors hover:text-accent hover:underline">
                Photo credits
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/terms`}
                className="underline-offset-4 transition-colors hover:text-accent hover:underline">
                {tLegal('termsLink')}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/privacy`}
                className="underline-offset-4 transition-colors hover:text-accent hover:underline">
                {tLegal('privacyLink')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </motion.footer>
  );
}

function XIcon({className}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
