'use client';

import {useEffect, useRef} from 'react';
import {useTranslations} from 'next-intl';

type State = 'idle' | 'view' | 'continue';

export default function Cursor({state}: {state: State}) {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations('Process.sections.projects');

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const pos = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    const target = {...pos};

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    let raf = 0;
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const label =
    state === 'view' ? t('view') : state === 'continue' ? t('continue') : '';

  const size = state === 'idle' ? 10 : 96;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-100 hidden md:block"
      style={{transform: 'translate3d(-100px, -100px, 0)'}}>
      <div
        className="flex items-center justify-center rounded-full transition-all duration-300 ease-out"
        style={{
          width: size,
          height: size,
          backgroundColor:
            state === 'idle' ? '#c9613f' : 'rgba(201, 97, 63, 0.95)',
          boxShadow: state === 'idle' ? '0 0 0 0 rgba(201,97,63,0.4)' : 'none',
        }}>
        {state !== 'idle' && (
          <span className="text-center text-[10px] font-medium uppercase leading-tight tracking-wider text-white px-2">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
