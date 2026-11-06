'use client';

import {useEffect, useRef, useState, useCallback} from 'react';
import {motion} from 'framer-motion';
import Cursor from './cursor';
import FrontendSection from './sections/frontend';
import ApiSection from './sections/api';
import BackendSection from './sections/backend';
import PresentationSection from './sections/presentation';
import LegalSection from './sections/legal';
import LanguagesSection from './sections/languages';
import PracticesSection from './sections/practices';
import AiDevSection from './sections/ai-dev';
import AiDesignSection from './sections/ai-design';
import RefactoringSection from './sections/refactoring';
import ProjectsSection from './sections/projects';
import SeoSection from './sections/seo';

type Section = {
  kicker: string;
  title: string;
  body: string;
  view?: string;
  continue?: string;
};

type SectionKey =
  | 'frontend'
  | 'api'
  | 'backend'
  | 'presentation'
  | 'legal'
  | 'languages'
  | 'practices'
  | 'aiDev'
  | 'aiDesign'
  | 'refactoring'
  | 'seo'
  | 'projects';

const SECTIONS: {
  key: SectionKey;
  Component: React.ComponentType<{data: Section}>;
}[] = [
  {key: 'frontend', Component: FrontendSection},
  {key: 'api', Component: ApiSection},
  {key: 'backend', Component: BackendSection},
  {key: 'presentation', Component: PresentationSection},
  {key: 'legal', Component: LegalSection},
  {key: 'languages', Component: LanguagesSection},
  {key: 'practices', Component: PracticesSection},
  {key: 'aiDev', Component: AiDevSection},
  {key: 'aiDesign', Component: AiDesignSection},
  {key: 'seo', Component: SeoSection},
  {key: 'refactoring', Component: RefactoringSection},
];

export default function ProcessScroll({
  t,
  scrollHint,
}: {
  t: Record<SectionKey, Section>;
  scrollHint: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [cursorState, setCursorState] = useState<'idle' | 'view' | 'continue'>(
    'idle'
  );

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-step]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const idx = Number(entry.target.getAttribute('data-step'));
            setActive(idx);
          }
        });
      },
      {threshold: [0.5]}
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const scrollToStep = useCallback((idx: number) => {
    const node = document.querySelector<HTMLElement>(`[data-step="${idx}"]`);
    node?.scrollIntoView({behavior: 'smooth', block: 'center'});
  }, []);

  return (
    <>
      <Cursor state={cursorState} />

      <div
        ref={containerRef}
        className="relative w-full min-h-screen bg-background text-foreground">
        {/* Sticky step rail */}
        <aside className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex">
          {SECTIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToStep(i)}
              aria-label={`Go to step ${i + 1}`}
              className={`pointer-events-auto h-1.5 w-1.5 rounded-full transition-all ${
                active === i
                  ? 'h-5 bg-laurel-500'
                  : 'bg-foreground opacity-25 hover:opacity-60'
              }`}
            />
          ))}
          {/* Projects dot */}
          <button
            onClick={() => scrollToStep(SECTIONS.length)}
            aria-label="Go to projects"
            className={`pointer-events-auto h-1.5 w-1.5 rounded-full transition-all ${
              active === SECTIONS.length
                ? 'h-5 bg-laurel-500'
                : 'bg-foreground opacity-25 hover:opacity-60'
            }`}
          />
        </aside>

        {/* Build sections */}
        {SECTIONS.map(({key, Component}, i) => (
          <section
            key={key}
            data-step={i}
            className="min-h-screen flex items-center px-6 py-24 md:px-16">
            <Component data={t[key]} />
          </section>
        ))}

        {/* Projects */}
        <section
          data-step={SECTIONS.length}
          className="py-24">
          <ProjectsSection
            data={{
              kicker: t.projects.kicker,
              title: t.projects.title,
              body: t.projects.body,
              view: t.projects.view ?? 'View project',
              continue: t.projects.continue ?? 'Continue',
            }}
            onCursor={setCursorState}
          />
        </section>

        {/* Scroll hint */}
        <div className="pointer-events-none fixed bottom-6 inset-s-1/2 -translate-x-1/2 z-30 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] opacity-40 mix-blend-difference text-white">
          <span>{scrollHint}</span>
          <motion.span
            animate={{y: [0, 4, 0]}}
            transition={{duration: 1.6, repeat: Infinity}}>
            ↓
          </motion.span>
        </div>
      </div>
    </>
  );
}
