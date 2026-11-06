'use client';

import {MobileSidebar} from './mobile-sidebar';
import {UserMenu} from './user-menu';
import {NotificationBell} from './notification-bell';
import {Breadcrumbs} from './breadcrumbs';
import {clsx} from 'clsx';
import {locales, localeNames, type Locale} from '../../../i18n/config';
import {useRef, useState} from 'react';
import {motion, AnimatePresence, type Variants} from 'framer-motion';
import {persistLocale} from '@/lib/cookies';
import {usePathname, useRouter} from 'next/navigation';
import {useLocale, useTranslations} from 'next-intl';
import {useClickOutside} from '@/lib/hooks/use-click-outside';

export function Header({
  reportTitles,
}: {
  reportTitles?: Record<string, string>;
}) {
  const pathname = usePathname();
  const t = useTranslations('Nav');
  const locale = useLocale() as Locale;

  const langRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [langOpen, setLangOpen] = useState(false);

  // Close dropdown when clicking/tapping outside — hook reads the ref
  // only inside the effect, never during render.
  useClickOutside(langRef, () => setLangOpen(false));

  const toggleLang = () => setLangOpen((prev) => !prev);

  const dropdownVariants: Variants = {
    hidden: {opacity: 0, y: -8, scale: 0.96},
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {duration: 0.2, ease: 'easeOut'},
    },
    exit: {opacity: 0, y: -8, scale: 0.96, transition: {duration: 0.15}},
  };

  const handleLanguageSelect = (next: Locale) => {
    setLangOpen(false);
    persistLocale(next);
    const rest = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '');
    const nextPath = `/${next}${rest || ''}`;
    router.replace(nextPath);
    router.refresh();
  };

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 w-full',
        'min-h-14 h-auto',
        'flex items-center gap-3 border-b',
        'bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/95',
        'px-4 py-2'
      )}>
      <MobileSidebar key={pathname} />

      <div className="flex min-w-0 flex-1 items-center">
        <Breadcrumbs reportTitles={reportTitles} />
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        {/* Language switcher */}
        <div
          className="relative"
          ref={langRef}>
          <motion.button
            type="button"
            onClick={toggleLang}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-neutral-800 transition-colors duration-200 hover:bg-[#c4ffbb]/60 dark:text-neutral-200 dark:hover:bg-[#006600]/30"
            aria-label={t('language')}
            aria-expanded={langOpen}>
            <span className="text-base leading-none">
              {localeNames[locale].flag}
            </span>
            <span className="hidden sm:inline">{locale.toUpperCase()}</span>
            <motion.svg
              animate={{rotate: langOpen ? 180 : 0}}
              transition={{duration: 0.2}}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-3.5 w-3.5">
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
                className="absolute right-0 z-60 mt-2 w-44 origin-top-right overflow-hidden rounded-xl border border-green-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
                role="menu">
                {locales.map((code) => {
                  const {label, flag} = localeNames[code];
                  const active = code === locale;
                  return (
                    <li key={code}>
                      <button
                        onClick={() => handleLanguageSelect(code)}
                        className={clsx(
                          'flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150',
                          active
                            ? 'bg-[#c4ffbb] font-semibold text-green-700 dark:bg-[#006600]/40 dark:text-green-300'
                            : 'text-neutral-700 hover:bg-green-50 dark:text-neutral-200 dark:hover:bg-neutral-700'
                        )}
                        role="menuitem">
                        <span className="text-base">{flag}</span>
                        <span>{label}</span>
                        {active && (
                          <motion.span
                            layoutId="lang-check"
                            className="ml-auto text-green-600 dark:text-green-400">
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

        <NotificationBell />
        <UserMenu />
      </div>
    </header>
  );
}
