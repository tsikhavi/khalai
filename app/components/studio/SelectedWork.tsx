'use client';

import Link from 'next/link';
import Image from 'next/image';
import {motion} from 'motion/react';
import {useLocale, useTranslations} from 'next-intl';
import {useEffect, useRef, useState} from 'react';

const PROJECTS = [
  {
    key: 'mavuno',
    image: '/images/work/mavuno.jpg',
    slug: 'mavuno',
    accent: '#059f00',
  },
  {
    key: 'sokoni',
    image: '/images/work/sokoni.jpg',
    slug: 'sokoni',
    accent: '#0ad300',
  },
  {
    key: 'chama',
    image: '/images/work/chama.jpg',
    slug: 'chama-ledger',
    accent: '#c9613f',
  },
] as const;

export function SelectedWork() {
  const t = useTranslations('Studio.selectedWork');
  const locale = useLocale();

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const w = container.scrollWidth / PROJECTS.length;
      setActiveIndex(
        Math.min(Math.round(container.scrollLeft / w), PROJECTS.length - 1)
      );
    };

    container.addEventListener('scroll', handleScroll, {passive: true});
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative">
      {/* ── Header ────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 pb-12 md:px-16">
        <p className="text-xs uppercase tracking-[0.3em] text-laurel-700 dark:text-laurel-300">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.05] md:text-5xl">
          Selected work.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/70">
          Swipe the gallery — or hold shift and scroll. Each project is one
          panel. Hover an image to see it in colour.
        </p>
      </div>

      {/* ── Horizontal full-viewport gallery ──────────── */}
      <div className="relative h-screen w-full overflow-hidden">
        <div
          ref={containerRef}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{WebkitOverflowScrolling: 'touch'}}>
          {PROJECTS.map((p, i) => {
            const title = t(`projects.${p.key}.title`);
            const category = t(`projects.${p.key}.category`);
            const href = `/${locale}/projects/${p.slug}`;
            const isActive = activeIndex === i;

            return (
              <article
                key={p.key}
                className="relative flex h-full w-screen shrink-0 snap-center items-center justify-center overflow-hidden"
                style={{minWidth: '100vw'}}>
                {/* Radial accent glow */}
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(60% 50% at 50% 50%, ${p.accent}15, transparent 70%)`,
                    opacity: isActive ? 1 : 0.4,
                  }}
                />

                {/* Index watermark */}
                <div
                  className="pointer-events-none absolute bottom-8 right-8 select-none font-black leading-none transition-all duration-700 md:bottom-12 md:right-12"
                  style={{
                    fontSize: 'clamp(4rem, 12vw, 9rem)',
                    color: p.accent,
                    opacity: isActive ? 0.06 : 0.02,
                  }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div className="relative z-10 grid w-7xl items-center gap-8 px-6 md:grid-cols-2 md:gap-16 md:px-16">
                  {/* Image */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.92,
                      opacity: isActive ? 1 : 0.6,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="order-1 md:order-2">
                    <Link
                      href={href}
                      className="group block">
                      <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-foreground/5 shadow-2xl">
                        <Image
                          src={p.image}
                          alt={title}
                          fill
                          sizes="100vw, 50vw"
                          className="object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                        />

                        {/* Optional hover overlay — subtle dark wash */}
                        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                      </div>
                    </Link>
                  </motion.div>

                  {/* Copy */}
                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : 0.35,
                      x: isActive ? 0 : -20,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="order-2 md:order-1">
                    <p
                      className="text-xs uppercase tracking-[0.3em]"
                      style={{color: p.accent}}>
                      {category}
                    </p>
                    <h3 className="mt-3 font-serif text-4xl leading-[1.05] md:text-6xl">
                      {title}
                    </h3>
                    <div
                      className="mt-6 h-px w-16 origin-left transition-transform duration-700"
                      style={{
                        backgroundColor: p.accent,
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      }}
                    />
                    <Link
                      href={href}
                      className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground/70 underline-offset-4 hover:text-foreground hover:underline">
                      {t('viewProject')} →
                    </Link>
                  </motion.div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
