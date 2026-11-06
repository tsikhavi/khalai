'use client';

import React, {useRef, useEffect, useState} from 'react';
import type {PanelComponent, PanelEntry} from './panels/types';
import {usePanelAnimation} from './panels/usePanelAnimation';
import LinePanel from './panels/LinePanel';
import GridPanel from './panels/GridPanel';
import LayoutPanel from './panels/LayoutPanel';
import TypefacePanel from './panels/TypefacePanel';
import ColourPanel from './panels/ColourPanel';
import CodePanel from './panels/CodePanel';
import {ShowcaseSwitcher} from '@/components/showcase/switcher';

/**
 * Panel colors drawn from the Japanese-laurel palette
 * (see globals.css → --color-laurel-*).
 *
 * Each panel gets a distinct shade, mirroring the ramp in
 * CreativityStage so the two experiences feel part of one system.
 *
 * 01 Line     → laurel-700 (settled)
 * 02 Grid     → laurel-900 (structural)
 * 03 Layout   → laurel-600 (lifting)
 * 04 Typeface → laurel-500 (peak)
 * 05 Colour   → laurel-400 (glow)
 * 06 Code     → laurel-700 (settle)
 */
const PANELS: PanelEntry[] = [
  {
    id: 0,
    kicker: '01 — Line',
    title: 'A line.',
    body: 'Every project starts with guides. Where things belong is measured, not guessed.',
    bg: 'bg-background',
    ink: 'text-foreground',
    accent: '#059f00', // laurel-700
    render: LinePanel,
  },
  {
    id: 1,
    kicker: '02 — Grid',
    title: 'A grid.',
    body: 'Columns, gaps, a surface. The scaffolding everything lines up with later.',
    bg: 'bg-background',
    ink: 'text-foreground',
    accent: '#006600', // laurel-900
    render: GridPanel,
  },
  {
    id: 2,
    kicker: '03 — Layout',
    title: 'A layout.',
    body: 'Lines become surfaces: navigation, headline, image, button. Order first, ornament later.',
    bg: 'bg-background',
    ink: 'text-foreground',
    accent: '#0ad300', // laurel-600
    render: LayoutPanel,
  },
  {
    id: 3,
    kicker: '04 — Typeface',
    title: 'A typeface.',
    body: 'Type is attitude. Size, width and line breaks are tuned to every single line.',
    bg: 'bg-background',
    ink: 'text-foreground',
    accent: '#11ff00', // laurel-500
    render: TypefacePanel,
  },
  {
    id: 4,
    kicker: '05 — Colour',
    title: 'A colour.',
    body: 'Paper, ink, one accent. A brand needs no more when it fits.',
    bg: 'bg-background',
    ink: 'text-foreground',
    accent: '#15ff00', // laurel-400
    render: ColourPanel,
  },
  {
    id: 5,
    kicker: '06 — Code',
    title: 'A line of code.',
    body: 'What I draw, I also build. By hand, readable, no page builder.',
    bg: 'bg-background',
    ink: 'text-foreground',
    accent: '#059f00', // laurel-700
    render: CodePanel,
  },
];

export default function HorizontalScrollPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;
      const atStart = container.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = container.scrollLeft >= maxScroll - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY * 1.4;
    };

    let touchStartX = 0,
      touchStartY = 0,
      isScrolling = false;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isScrolling = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!touchStartX || !touchStartY || isScrolling) return;
      const dx = touchStartX - e.touches[0].clientX;
      const dy = touchStartY - e.touches[0].clientY;
      if (Math.abs(dy) > Math.abs(dx)) {
        e.preventDefault();
        isScrolling = true;
        container.scrollLeft += dy * 2;
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        setTimeout(() => {
          isScrolling = false;
        }, 100);
      }
    };
    const onTouchEnd = () => {
      touchStartX = touchStartY = 0;
      isScrolling = false;
    };

    const handleScroll = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(container.scrollLeft / maxScroll);
        const w = container.scrollWidth / PANELS.length;
        setActiveSection(
          Math.min(Math.round(container.scrollLeft / w), PANELS.length - 1)
        );
      }
    };

    window.addEventListener('wheel', handleWheel, {passive: false});
    window.addEventListener('touchstart', onTouchStart, {passive: true});
    window.addEventListener('touchmove', onTouchMove, {passive: false});
    window.addEventListener('touchend', onTouchEnd, {passive: true});
    container.addEventListener('scroll', handleScroll, {passive: true});
    handleScroll();

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({
      left: (container.scrollWidth / PANELS.length) * index,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background font-sans antialiased text-foreground">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-foreground/10 z-50">
        <div
          className="h-full bg-laurel-500 transition-[width] duration-100 ease-out"
          style={{width: `${scrollProgress * 100}%`}}
        />
      </div>

      {/* Section indicators */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-3 z-50">
        {PANELS.map((panel, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to panel ${i + 1}`}
            className={`w-1.5 md:w-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeSection === i
                ? 'h-6 md:h-8'
                : 'h-1.5 md:h-2 bg-foreground opacity-20 hover:opacity-60'
            }`}
            style={
              activeSection === i ? {backgroundColor: panel.accent} : undefined
            }
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="fixed bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-40 z-50 pointer-events-none mix-blend-difference text-white">
        <span>Scroll</span>
        <span className="animate-bounce inline-block">↓</span>
        <span className="animate-bounce inline-block [animation-delay:0.15s]">
          →
        </span>
      </div>

      {/* Panels */}
      <div
        ref={containerRef}
        className="flex w-full h-full overflow-x-auto overflow-y-hidden scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {PANELS.map((panel, index) => (
          <PanelSlot
            key={panel.id}
            panel={panel}
            index={index}
            activeIndex={activeSection}
          />
        ))}
      </div>
    </div>
  );
}

function PanelSlot({
  panel,
  index,
  activeIndex,
}: {
  panel: PanelEntry;
  index: number;
  activeIndex: number;
}) {
  const state = usePanelAnimation(activeIndex, index);
  const Active: PanelComponent = panel.render;

  return (
    <section
      className={`relative w-screen h-screen flex items-center justify-center overflow-hidden shrink-0 transition-colors duration-700 ${panel.bg} ${panel.ink}`}
      style={{minWidth: '100vw'}}>
      {/* Kicker */}
      <div
        className="absolute top-8 left-8 md:top-12 md:left-12 text-[10px] md:text-xs uppercase tracking-[0.3em]"
        style={{
          color: panel.accent,
          transform: state === 'idle' ? 'translateY(-8px)' : 'translateY(0)',
          opacity: state === 'idle' ? 0 : 0.7,
          transition: 'all .6s ease',
        }}>
        {panel.kicker}
      </div>

      {/* Index number — large watermark */}
      <div
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-7xl md:text-9xl font-black leading-none select-none"
        style={{
          color: panel.accent,
          opacity: state === 'idle' ? 0 : 0.06,
          transform: state === 'idle' ? 'translateY(12px)' : 'translateY(0)',
          transition: 'all .8s ease',
        }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Content */}
      <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center max-w-6xl w-full px-8 md:px-16">
        {/* Left: text */}
        <div
          className="order-2 md:order-1"
          style={{
            opacity: state === 'idle' ? 0 : 1,
            transform: state === 'idle' ? 'translateY(24px)' : 'translateY(0)',
            transition: 'all .7s cubic-bezier(.6,.1,.3,1)',
          }}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight leading-[0.95] mb-6 text-foreground">
            {panel.title}
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-md text-foreground/70 font-light">
            {panel.body}
          </p>
          <div
            className="mt-8 h-px w-16 origin-left"
            style={{
              backgroundColor: panel.accent,
              transform: state === 'idle' ? 'scaleX(0)' : 'scaleX(1)',
              transition: 'transform 1s cubic-bezier(.6,.1,.3,1) .2s',
            }}
          />
        </div>

        {/* Right: per-panel animation */}
        <div
          className="order-1 md:order-2 flex items-center justify-center"
          style={{
            opacity: state === 'idle' ? 0 : 1,
            transform: state === 'idle' ? 'scale(0.95)' : 'scale(1)',
            transition: 'all .7s cubic-bezier(.6,.1,.3,1) .1s',
          }}>
          <Active
            {...panel}
            state={state}
          />
        </div>
      </div>
      <ShowcaseSwitcher />
    </section>
  );
}
