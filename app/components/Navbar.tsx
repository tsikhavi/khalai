'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import clsx from 'clsx';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import ThemeChanger from './ui/ThemeChanger';
import { useAuth } from '@/providers/AuthProvider';
import { UserMenu } from '@/components/dashboard/user-menu';
import { locales, localeNames, type Locale } from '../../i18n/config';
import { persistLocale } from '@/lib/cookies';
import { SplashOverlay } from './splash-gate';

/* ---------------------------------- Types --------------------------------- */
type NavKey = 'home' | 'about' | 'blog' | 'projects' | 'contact' | 'market';
type ExperienceSlug =
  | 'creativity'
  | 'horizontal'
  | 'typography'
  | 'systems'
  | 'music'
  | 'photography'
  | 'kitchen';
type MarketingSlug =
  | 'seo'
  | 'smm'
  | 'aieo'
  | 'scraping'
  | 'localisation'
  | 'ads'
  | 'leads';
type UtilityKey =
  | 'contact'
  | 'pricing'
  | 'start'
  | 'support'
  | 'payments'
  | 'terms'
  | 'privacy';

/* ---------------------------------- Data ---------------------------------- */
const navItems: { key: NavKey; path: string }[] = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'blog', path: '/blog' },
  { key: 'projects', path: '/projects' },
  { key: 'contact', path: '/contact' },
  { key: 'market', path: '/marketing' },
];

const experiences: {
  slug: ExperienceSlug;
  path: string;
  accent: string;
  preview: string;
}[] = [
  {
    slug: 'creativity',
    path: '/creativity',
    accent: 'var(--color-laurel-300)',
    preview: '/images/previews/creativity.jpg',
  },
  {
    slug: 'horizontal',
    path: '/horizontal',
    accent: 'var(--color-laurel-400)',
    preview: '/images/previews/horizontal.jpg',
  },
  {
    slug: 'typography',
    path: '/typography',
    accent: 'var(--color-secondary)',
    preview: '/images/previews/typography.jpg',
  },
  {
    slug: 'systems',
    path: '/systems',
    accent: 'var(--color-laurel-600)',
    preview: '/images/previews/systems.jpg',
  },
  {
    slug: 'music',
    path: '/music',
    accent: 'var(--color-laurel-800)',
    preview: '/images/previews/music.jpg',
  },
  {
    slug: 'photography',
    path: '/photography',
    accent: 'var(--color-secondary)',
    preview: '/images/previews/photography.jpg',
  },
  {
    slug: 'kitchen',
    path: '/kitchen',
    accent: 'var(--color-laurel-600)',
    preview: '/images/previews/kitchen.jpg',
  },
];

const marketingItems: { slug: MarketingSlug; path: string }[] = [
  { slug: 'seo', path: '/marketing/seo' },
  { slug: 'smm', path: '/marketing/smm' },
  { slug: 'aieo', path: '/marketing/aieo' },
  { slug: 'scraping', path: '/marketing/scraping' },
  { slug: 'localisation', path: '/marketing/localisation' },
  { slug: 'ads', path: '/marketing/ads' },
  { slug: 'leads', path: '/marketing/leads' },
];

const utilityItems: { key: UtilityKey; path: string }[] = [
  { key: 'contact', path: '/contact' },
  { key: 'pricing', path: '/pricing' },
  { key: 'start', path: '/start' },
  { key: 'support', path: '/support' },
  { key: 'payments', path: '/payments' },
  { key: 'terms', path: '/terms' },
  { key: 'privacy', path: '/privacy' },
];

/* ------------------------------ Animation variants ------------------------ */
const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  exit: { opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.15 } },
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
};

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.25 },
  }),
};

const megaMenuVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
};

const megaColumnVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const megaLinkVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ------------------------------- Click outside ---------------------------- */
function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

/* -------------------------------- Component ------------------------------- */
const Navbar: React.FC = () => {
  const t = useTranslations('Nav');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoveredPreview, setHoveredPreview] = useState<string | null>(null);

  // ── language-switch splash ──
  const [langSwitching, setLangSwitching] = useState(false);
  const langSwitchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const targetLocaleRef = useRef<Locale | null>(null);

  const langRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);

  const closeLang = useCallback(() => setLangOpen(false), []);
  useClickOutside(langRef, closeLang);

  /* ------------------------- Scroll listener ----------------------------- */
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 8;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ------------------------- Mega: lock body scroll ---------------------- */
  useEffect(() => {
    if (!megaOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [megaOpen]);

  /* ------------------------- Mega: escape to close ----------------------- */
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [megaOpen]);

  /* ------------------------- Cleanup splash timer on unmount ------------- */
  useEffect(() => {
    return () => {
      if (langSwitchTimerRef.current) {
        clearTimeout(langSwitchTimerRef.current);
      }
    };
  }, []);

  /* ------------------------- Dismiss splash when locale matches ---------- */
  useEffect(() => {
    if (!langSwitching) return;
    if (!targetLocaleRef.current || locale !== targetLocaleRef.current) return;

    // The new locale and the new server tree commit together
    // (because we only call router.replace, not router.refresh),
    // so we can dismiss the splash immediately.
    setLangSwitching(false);
    targetLocaleRef.current = null;
    if (langSwitchTimerRef.current) {
      clearTimeout(langSwitchTimerRef.current);
      langSwitchTimerRef.current = null;
    }
  }, [locale, langSwitching]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleLang = () => setLangOpen((prev) => !prev);
  const toggleMega = () => setMegaOpen((prev) => !prev);

  /** Strip the leading locale segment:  /en/about  →  /about  */
  const pathWithoutLocale =
    pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/';

  const handleLanguageSelect = (next: Locale) => {
    setLangOpen(false);

    if (next === locale) return;

    persistLocale(next);

    const rest = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '');
    const nextPath = `/${next}${rest || ''}`;

    targetLocaleRef.current = next;
    setLangSwitching(true);

    if (langSwitchTimerRef.current) {
      clearTimeout(langSwitchTimerRef.current);
    }
    langSwitchTimerRef.current = setTimeout(() => {
      setLangSwitching(false);
      targetLocaleRef.current = null;
    }, 2000);

    router.replace(nextPath);
    // NOTE: do NOT call router.refresh() — it races with the
    // navigation and causes the old-language tree to render
    // after the URL changes.
  };

  return (
    <>
      <nav
        className={clsx(
          'rounded-b-4xl text-base border-b fixed top-0 z-50 w-screen transition-colors duration-300',
          scrolled
            ? 'bg-background/90 border-laurel-400 dark:border-laurel-900 shadow-sm'
            : 'bg-transparent border-laurel-400 dark:border-neutral-800'
        )}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            {/* ------------------------------ Logo ------------------------------ */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center"
            >
              <Link href={`/${locale}`} className="group">
                <span className="font-sans font-extrabold tracking-wide text-base inline-flex items-center">
                  <motion.span
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Image
                      src="/images/logo-r.png"
                      alt={t('brand')}
                      width={1576}
                      height={1576}
                      className="inline-flex mr-2 w-auto h-8"
                    />
                  </motion.span>
                  <strong className="text-transparent bg-clip-text bg-linear-to-r from-laurel-700 to-secondary group-hover:from-laurel-400 group-hover:to-secondary transition-all duration-300">
                    {t('brand')}
                  </strong>
                </span>
              </Link>
            </motion.div>

            {/* --------------------------- Desktop nav -------------------------- */}
            <div className="hidden md:block">
              <div className="flex space-x-4">
                {navItems.map((item, i) => {
                  const isActive = pathWithoutLocale === item.path;
                  return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                    >
                      <Link
                        href={`/${locale}${item.path === '/' ? '' : item.path}`}
                        className={clsx(
                          'text-foreground font-bold inline-flex tracking-wide leading-3 uppercase px-2 py-1.5 rounded-md text-sm transition-all duration-200 hover:bg-laurel-100 dark:hover:bg-laurel-900/30',
                          {
                            'underline underline-offset-4 text-laurel-700 dark:text-laurel-300':
                              isActive,
                          }
                        )}
                      >
                        {t(item.key)}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ------------------------- Right-side actions --------------------- */}
            <div className="flex items-center space-x-1">
              {/* ------------------------ Language switcher ------------------------ */}
              <div className="relative" ref={langRef}>
                <motion.button
                  type="button"
                  onClick={toggleLang}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-foreground hover:bg-laurel-100 dark:hover:bg-laurel-900/30 transition-colors duration-200"
                  aria-label={t('language')}
                  aria-expanded={langOpen}
                >
                  <span className="text-base leading-none">
                    {localeNames[locale].flag}
                  </span>
                  <span className="hidden sm:inline">
                    {locale.toUpperCase()}
                  </span>
                  <motion.svg
                    animate={{ rotate: langOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </motion.svg>
                </motion.button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.ul
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-44 origin-top-right rounded-xl border border-laurel-200 dark:border-neutral-700 bg-background shadow-lg overflow-hidden z-50"
                      role="menu"
                    >
                      {locales.map((code) => {
                        const { label, flag } = localeNames[code];
                        const active = code === locale;
                        return (
                          <li key={code}>
                            <button
                              onClick={() => handleLanguageSelect(code)}
                              className={clsx(
                                'flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150',
                                active
                                  ? 'bg-laurel-100 dark:bg-laurel-900/40 text-laurel-800 dark:text-laurel-200 font-semibold'
                                  : 'text-foreground/80 hover:bg-laurel-50 dark:hover:bg-neutral-700'
                              )}
                              role="menuitem"
                            >
                              <span className="text-base">{flag}</span>
                              <span>{label}</span>
                              {active && (
                                <motion.span
                                  layoutId="lang-check"
                                  className="ml-auto text-laurel-700 dark:text-laurel-300"
                                >
                                  ✓
                                </motion.span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* --------------------------- Auth area ---------------------------- */}
              {!isLoading && (
                <div className="flex items-center">
                  {user ? (
                    <UserMenu />
                  ) : (
                    <div className="hidden items-center space-x-4 px-2 md:flex">
                      <Link
                        href={`/${locale}/login`}
                        className="text-laurel-700 hover:text-laurel-900 dark:text-laurel-300 dark:hover:text-laurel-100"
                      >
                        {t('signIn')}
                      </Link>
                      <Link
                        href={`/${locale}/register`}
                        className="text-laurel-700 hover:text-laurel-900 dark:text-laurel-300 dark:hover:text-laurel-100"
                      >
                        {t('register')}
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* --------------------------- Theme toggle -------------------------- */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ThemeChanger />
              </motion.div>

              {/* ------------------------ Mobile menu toggle ---------------------- */}
              <div className="inline-block md:hidden">
                <motion.button
                  onClick={toggleMenu}
                  whileTap={{ scale: 0.9 }}
                  className="text-foreground/80 hover:text-foreground p-2 rounded-md transition-colors"
                  aria-label={isOpen ? t('mobile.close') : t('mobile.open')}
                  aria-expanded={isOpen}
                >
                  <motion.svg
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    {isOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                      />
                    )}
                  </motion.svg>
                </motion.button>
              </div>
            </div>
          </div>

          {/* --------------------------- Mega-menu trigger --------------------- */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-3 flex justify-center">
            <motion.button
              type="button"
              onClick={toggleMega}
              whileHover={{ y: 1 }}
              whileTap={{ scale: 0.96 }}
              aria-label={megaOpen ? t('mega.closeAria') : t('mega.openAria')}
              aria-expanded={megaOpen}
              className="pointer-events-auto group relative flex h-6 items-center gap-1.5 rounded-full border border-foreground/10 bg-background/95 px-3 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground/60 shadow-md backdrop-blur-md transition-colors hover:text-foreground dark:border-white/10"
            >
              <motion.svg
                animate={{ rotate: megaOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                viewBox="0 0 24 24"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M6 9l6 6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
              <span>{megaOpen ? t('mega.close') : t('mega.open')}</span>

              <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-medium text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                {t('mega.hint')}
              </span>
            </motion.button>
          </div>

          {/* --------------------------- Mobile menu ---------------------------- */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="overflow-hidden md:hidden"
              >
                <div
                  className={clsx(
                    'px-2 pt-2 pb-4 space-y-1 backdrop-blur-md rounded-b-md',
                    scrolled ? 'bg-background/90' : 'bg-background/80'
                  )}
                >
                  {navItems.map((item, i) => {
                    const isActive = pathWithoutLocale === item.path;
                    return (
                      <motion.div
                        key={item.key}
                        custom={i}
                        variants={mobileItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          href={`/${locale}${item.path === '/' ? '' : item.path}`}
                          onClick={toggleMenu}
                          className={clsx(
                            'block font-semibold text-foreground/80 tracking-wide leading-3 uppercase px-3 py-2 rounded-md text-xs transition-all duration-200',
                            'hover:bg-laurel-100 dark:hover:bg-laurel-900/30 hover:text-laurel-800 dark:hover:text-laurel-200',
                            {
                              'underline underline-offset-4 text-laurel-700 dark:text-laurel-300':
                                isActive,
                            }
                          )}
                        >
                          {t(item.key)}
                        </Link>
                      </motion.div>
                    );
                  })}

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex flex-col space-y-2 pt-2"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          Full-screen mega menu
          ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            key="mega"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl"
            onClick={(e) => {
              if (e.target === e.currentTarget) setMegaOpen(false);
            }}
          >
            <motion.div
              ref={megaRef}
              variants={megaMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mx-auto flex h-full max-w-7xl flex-col px-6 pb-10 pt-24 md:px-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid flex-1 gap-10 overflow-y-auto md:grid-cols-4 md:gap-12">
                {/* Column 1 — Navigate */}
                <motion.div
                  variants={megaColumnVariants}
                  className="flex flex-col"
                >
                  <ColumnHeading label={t('mega.navigate')} index="01" />

                  <div className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <MegaLink
                        key={item.key}
                        href={`/${locale}${item.path === '/' ? '' : item.path}`}
                        title={t(item.key)}
                        onNavigate={() => setMegaOpen(false)}
                        onHover={() => setHoveredPreview(null)}
                      />
                    ))}
                  </div>
                  <Image
                    src="/images/logo-r.png"
                    alt={t('brand')}
                    width={40}
                    height={40}
                    className="margin-auto w-10 h-10"
                  />
                </motion.div>

                {/* Column 2 — Experiences */}
                <motion.div
                  variants={megaColumnVariants}
                  className="flex flex-col"
                >
                  <ColumnHeading label={t('mega.experiences')} index="02" />
                  <div className="flex flex-col gap-2">
                    {experiences.map((exp) => (
                      <MegaLink
                        key={exp.slug}
                        href={`/${locale}${exp.path}`}
                        title={t(`experiences.${exp.slug}`)}
                        accent={exp.accent}
                        preview={exp.preview}
                        onNavigate={() => setMegaOpen(false)}
                        onHover={() => setHoveredPreview(exp.preview)}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Column 3 — Marketing */}
                <motion.div
                  variants={megaColumnVariants}
                  className="flex flex-col"
                >
                  <ColumnHeading label={t('mega.marketing')} index="03" />
                  <div className="flex flex-col gap-2">
                    {marketingItems.map((item) => (
                      <MegaLink
                        key={item.slug}
                        href={`/${locale}${item.path}`}
                        title={t(`marketing.${item.slug}`)}
                        onNavigate={() => setMegaOpen(false)}
                        onHover={() => setHoveredPreview(null)}
                      />
                    ))}
                  </div>
                  <Link
                    href={`/${locale}/marketing`}
                    onClick={() => setMegaOpen(false)}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-laurel-700 hover:underline dark:text-laurel-300"
                  >
                    {t('mega.allMarketing')} →
                  </Link>
                </motion.div>

                {/* Column 4 — Studio */}
                <motion.div
                  variants={megaColumnVariants}
                  className="flex flex-col"
                >
                  <ColumnHeading label={t('mega.studio')} index="04" />
                  <div className="flex flex-col gap-2">
                    {utilityItems.map((item) => (
                      <MegaLink
                        key={item.path}
                        href={`/${locale}${item.path}`}
                        title={t(`utility.${item.key}`)}
                        onNavigate={() => setMegaOpen(false)}
                        onHover={() => setHoveredPreview(null)}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* ── Bottom KHALAI STUDIO wordmark ────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-foreground/10 pt-6"
              >
                <div className="flex items-baseline gap-3">
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="font-serif text-[10px] uppercase tracking-[0.3em] text-foreground/40"
                  >
                    {t('mega.studioTagline')}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="h-px w-8 bg-foreground/20"
                  />
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-serif text-3xl font-semibold tracking-tight md:text-4xl"
                >
                  {t('mega.studioMarkPrimary')}
                  <span className="text-foreground/40">
                    {' '}
                    {t('mega.studioMarkSecondary')}
                  </span>
                </motion.p>

                <div className="flex gap-6 text-xs">
                  <Link
                    href={`/${locale}/privacy`}
                    onClick={() => setMegaOpen(false)}
                    className="group relative text-foreground/50 transition-colors hover:text-foreground"
                  >
                    {t('utility.privacy')}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                  <Link
                    href={`/${locale}/terms`}
                    onClick={() => setMegaOpen(false)}
                    className="group relative text-foreground/50 transition-colors hover:text-foreground"
                  >
                    {t('utility.terms')}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    onClick={() => setMegaOpen(false)}
                    className="group relative text-foreground/50 transition-colors hover:text-foreground"
                  >
                    {t('utility.contact')}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </div>
              </motion.div>

              {/* ── Preview card (hover-revealed image) ─────────── */}
              <AnimatePresence>
                {hoveredPreview && (
                  <motion.div
                    key={hoveredPreview}
                    initial={{ opacity: 0, scale: 0.94, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 12 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-none fixed bottom-24 right-8 hidden h-72 w-96 overflow-hidden rounded-2xl border border-foreground/10 shadow-2xl md:block"
                  >
                    <Image
                      src={hoveredPreview}
                      alt=""
                      fill
                      sizes="384px"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
          Language-switch splash
          ═══════════════════════════════════════════════════════════════ */}
      {langSwitching && <SplashOverlay />}
    </>
  );
};

/* ── Column heading — number + label, geometric ─────── */

function ColumnHeading({ label, index }: { label: string; index: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <span className="font-serif text-[10px] tabular-nums tracking-[0.2em] text-foreground/30">
        {index}
      </span>
      <span className="h-px w-6 bg-foreground/20" />
      <h3 className="font-serif text-sm font-medium uppercase tracking-[0.2em] text-foreground/60">
        {label}
      </h3>
    </div>
  );
}

/* ── Mega link — large geometric type, SVG arrow, underline sweep ─── */

function MegaLink({
  href,
  title,
  accent,
  preview,
  onNavigate,
  onHover,
}: {
  href: string;
  title: string;
  accent?: string;
  preview?: string;
  onNavigate: () => void;
  onHover: () => void;
}) {
  return (
    <motion.div variants={megaLinkVariants}>
      <Link
        href={href}
        onClick={onNavigate}
        onMouseEnter={onHover}
        onFocus={onHover}
        className="group relative flex items-center gap-3 rounded-lg py-1.5 pr-3 transition-colors"
      >
        {accent ? (
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150"
            style={{ backgroundColor: accent }}
          />
        ) : (
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/20 transition-all duration-300 group-hover:scale-150 group-hover:bg-foreground/60" />
        )}

        <span className="font-sans text-xl font-light tracking-tight text-foreground/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground md:text-2xl">
          {title}
        </span>

        {preview && (
          <svg
            viewBox="0 0 24 24"
            className="ml-auto h-4 w-4 shrink-0 text-foreground/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <motion.path
              d="M5 12h14M13 6l6 6-6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0.6 }}
              whileHover={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </svg>
        )}

        <span className="pointer-events-none absolute inset-x-2 bottom-0 h-px origin-left scale-x-0 bg-linear-to-r from-laurel-500 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
      </Link>
    </motion.div>
  );
}

export default Navbar;