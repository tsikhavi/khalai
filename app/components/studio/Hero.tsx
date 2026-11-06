'use client';

import {useRef} from 'react';
import {motion, useScroll, useTransform} from 'motion/react';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {Lens} from './LensToggle';

export function Hero() {
  const t = useTranslations('Studio.hero');
  const locale = useLocale();

  const sectionRef = useRef<HTMLElement>(null);

  /*
   * Scroll choreography:
   *
   * The hero is a `h-[200vh]` outer container. Inside, a `sticky top-0`
   * child pins to the viewport for the full 200vh. The animation runs on
   * `scrollYProgress` offset ['start start', 'end end']:
   *
   *   0%   → sticky child just entered, animation starts
   *   100% → sticky child at its last frame, about to release
   *
   * Because the child is `sticky`, the user cannot scroll past it until
   * the 200vh parent has fully scrolled — i.e. until the animation is
   * complete. Then the parent naturally releases and normal scrolling
   * resumes.
   */
  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const wordmarkScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.15]);
  const wordmarkY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const wordmarkOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.9, 1],
    [0, 1, 1, 0.6]
  );

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[200vh]">
      {/* Sticky child — pinned to viewport for the whole 200vh */}
      <div className="sticky top-0 flex h-screen items-center justify-center px-6">
        <div className="mx-auto w-full max-w-5xl">
          <motion.p
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
            className="mb-6 text-sm tracking-widest text-neutral-500 uppercase">
            {t('location')} · {t('eyebrow')}
          </motion.p>

          {/* Wordmark: grows + fills while pinned */}
          <motion.div
            style={{
              scale: wordmarkScale,
              y: wordmarkY,
              opacity: wordmarkOpacity,
            }}
            className="relative origin-left"
            aria-label={t('wordmark')}>
            {/* Base layer — faint gray */}
            <p className="select-none font-serif text-[15vw] leading-[0.85] font-semibold tracking-[-0.04em] text-foreground/15 md:text-[10vw]">
              {t('wordmarkPrimary')}
              <span className="text-foreground/10">
                {' '}
                {t('wordmarkSecondary')}
              </span>
            </p>

            {/* Colored layer — clip-path reveal */}
            <motion.p
              aria-hidden
              style={{clipPath}}
              className="pointer-events-none absolute inset-0 select-none font-serif text-[15vw] leading-[0.85] font-semibold tracking-[-0.04em] text-laurel-700 md:text-[10vw] dark:text-laurel-300">
              {t('wordmarkPrimary')}
              <span className="text-secondary"> {t('wordmarkSecondary')}</span>
            </motion.p>
          </motion.div>

          <motion.h1
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1]}}
            className="mt-8 max-w-4xl text-3xl leading-[1.05] font-semibold tracking-tight text-neutral-900 md:mt-12 md:text-5xl dark:text-neutral-100">
            {t('titleLens')
              .split('|')
              .map((part, i, arr) => (
                <span key={i}>
                  {i === 1 ? (
                    <Lens reveal={<span className="text-accent">{part}</span>}>
                      {part}
                    </Lens>
                  ) : (
                    part
                  )}
                  {i < arr.length - 1 ? ' ' : ''}
                </span>
              ))}
          </motion.h1>

          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1]}}
            className="mt-8 max-w-xl text-lg text-neutral-600 dark:text-neutral-400">
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1]}}
            className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}/start`}
              className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02] dark:bg-neutral-100 dark:text-neutral-900">
              {t('startProject')} →
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-100">
              {t('readJournal')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
