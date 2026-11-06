'use client';

import {motion, Variants, useReducedMotion} from 'motion/react';
import {ReactNode, ElementType} from 'react';

const container: Variants = {
  hidden: {},
  show: {
    transition: {staggerChildren: 0.08, delayChildren: 0.1},
  },
};

const item: Variants = {
  hidden: {opacity: 0, y: 24},
  show: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.6, ease: [0.22, 1, 0.36, 1]},
  },
};

type SupportedTag = 'div' | 'section' | 'ul' | 'ol' | 'article';

const MotionByTag: Record<SupportedTag, ElementType> = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  article: motion.article,
};

export function RevealOnScroll({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: SupportedTag;
}) {
  const prefersReduced = useReducedMotion();
  const Tag = MotionByTag[as];

  if (prefersReduced) {
    const Plain = as as unknown as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{once: true, margin: '-80px'}}>
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={item}
      className={className}>
      {children}
    </motion.div>
  );
}
