'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {motion, AnimatePresence} from 'framer-motion';
import {RevealSection, RevealChild} from '../components/studio/RevealSection';
import {LandingStage} from './LandingStage';

const STEPS = [
  'line',
  'grid',
  'layout',
  'typeface',
  'colour',
  'codeLine',
] as const;

const STAGE_ANCHORS = [
  'stage-reveal',
  'stage-rotate',
  'stage-draw',
  'stage-type',
  'stage-drift-a',
  'stage-drift-b',
] as const;

export function ManifestoSection() {
  const t = useTranslations('Studio.manifesto');
  const [stageOpen, setStageOpen] = useState(false);

  return (
    <RevealSection
      as="section"
      direction="up"
      amount={0.1}
      className="border-y border-neutral-200 bg-(--paper)/40 py-20 dark:border-neutral-800 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12">
          <RevealChild>
            <p className="text-sm tracking-widest text-neutral-500 uppercase">
              {t('eyebrow')}
            </p>
          </RevealChild>
          <RevealChild
            as="h2"
            className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            {t('title')}
          </RevealChild>
        </div>

        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {STEPS.map((key, i) => (
            <RevealChild key={key}>
              <div
                id={`method-${i + 1}`}
                className="scroll-mt-24 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <a
                    href={`#${STAGE_ANCHORS[i]}`}
                    onClick={(e) => {
                      if (!stageOpen) {
                        e.preventDefault();
                        setStageOpen(true);
                        // Let the stage mount, then scroll
                        requestAnimationFrame(() => {
                          requestAnimationFrame(() => {
                            document
                              .getElementById(STAGE_ANCHORS[i])
                              ?.scrollIntoView({behavior: 'smooth'});
                          });
                        });
                      }
                    }}
                    className="text-[10px] font-medium uppercase tracking-[0.2em] text-laurel-700 hover:underline dark:text-laurel-300">
                    See in motion →
                  </a>
                </div>
                <h3 className="mt-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {t(`${key}.body`)}
                </p>
              </div>
            </RevealChild>
          ))}
        </div>

        {/* Fold button */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-neutral-200 pt-10 dark:border-neutral-800">
          <p className="max-w-md text-center text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {t('stageHint')}
          </p>
          <button
            type="button"
            onClick={() => setStageOpen((v) => !v)}
            aria-expanded={stageOpen}
            aria-controls="landing-stage"
            className="group inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-laurel-500 hover:text-laurel-700 dark:border-neutral-700 dark:hover:border-laurel-400 dark:hover:text-laurel-300">
            <span>{stageOpen ? t('stageClose') : t('stageOpen')}</span>
            <motion.svg
              animate={{rotate: stageOpen ? 180 : 0}}
              transition={{duration: 0.25, ease: [0.22, 1, 0.36, 1]}}
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>
        </div>
      </div>

      {/* Foldable stage */}
      <AnimatePresence initial={false}>
        {stageOpen && (
          <motion.div
            key="landing-stage"
            id="landing-stage"
            initial={{height: 0, opacity: 0}}
            animate={{height: 'auto', opacity: 1}}
            exit={{height: 0, opacity: 0}}
            transition={{
              height: {duration: 0.5, ease: [0.22, 1, 0.36, 1]},
              opacity: {duration: 0.3},
            }}
            className="overflow-hidden">
            <div className="border-t border-neutral-200 dark:border-neutral-800">
              <LandingStage />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </RevealSection>
  );
}
