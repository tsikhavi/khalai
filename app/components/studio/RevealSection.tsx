'use client';

import {motion, Variants, useReducedMotion} from 'motion/react';
import type {ComponentType, HTMLAttributes, ReactNode} from 'react';

/* ------------------------------------------------------------------
   Direction presets
   ------------------------------------------------------------------ */
export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'fade';

const OFFSET = 32;

function buildVariants(direction: RevealDirection): {
  container: Variants;
  item: Variants;
} {
  const axis =
    direction === 'left' || direction === 'right'
      ? 'x'
      : direction === 'fade'
        ? null
        : 'y';

  const sign =
    direction === 'down' || direction === 'right'
      ? 1
      : direction === 'up' || direction === 'left'
        ? -1
        : 0;

  const hidden = axis ? {opacity: 0, [axis]: sign * OFFSET} : {opacity: 0};
  const show = axis ? {opacity: 1, [axis]: 0} : {opacity: 1};

  return {
    container: {
      hidden: {},
      show: {
        transition: {staggerChildren: 0.08, delayChildren: 0.05},
      },
    },
    item: {
      hidden,
      show: {
        ...show,
        transition: {duration: 0.6, ease: [0.22, 1, 0.36, 1]},
      },
    },
  };
}

/* ------------------------------------------------------------------
   Motion-tag maps — typed so indexing is safe
   ------------------------------------------------------------------ */

type SectionTag = 'div' | 'section' | 'article' | 'ul' | 'ol';
type ItemTag = 'div' | 'li' | 'article' | 'h2' | 'h3' | 'p' | 'span';

/**
 * A shared props type for every motion element we render.
 * We don't try to make it fully polymorphic — motion's own types are
 * already complex enough. This is enough to pass className, variants,
 * initial, whileInView, exit, viewport.
 */
type MotionTagProps = HTMLAttributes<HTMLElement> & {
  variants?: Variants;
  initial?: string;
  whileInView?: string;
  exit?: string;
  viewport?: {once?: boolean; amount?: number};
};

type MotionTag = ComponentType<MotionTagProps>;

const SectionMotionTags: Record<SectionTag, MotionTag> = {
  div: motion.div as MotionTag,
  section: motion.section as MotionTag,
  article: motion.article as MotionTag,
  ul: motion.ul as MotionTag,
  ol: motion.ol as MotionTag,
};

const ItemMotionTags: Record<ItemTag, MotionTag> = {
  div: motion.div as MotionTag,
  li: motion.li as MotionTag,
  article: motion.article as MotionTag,
  h2: motion.h2 as MotionTag,
  h3: motion.h3 as MotionTag,
  p: motion.p as MotionTag,
  span: motion.span as MotionTag,
};

/* ------------------------------------------------------------------
   Section wrapper
   ------------------------------------------------------------------ */
export function RevealSection({
  children,
  className,
  as = 'section',
  direction = 'up',
  amount = 0.15,
  once = false,
}: {
  children: ReactNode;
  className?: string;
  as?: SectionTag;
  direction?: RevealDirection;
  /** Portion of the element that must be visible to trigger */
  amount?: number;
  /** true = animate only once; false = animate both ways */
  once?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const {container} = buildVariants(direction);

  if (prefersReduced) {
    const Plain = as as 'div';
    return <Plain className={className}>{children}</Plain>;
  }

  const Tag = SectionMotionTags[as];

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      exit="hidden"
      viewport={{once, amount}}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Item — child of RevealSection
   ------------------------------------------------------------------ */
export function RevealChild({
  children,
  className,
  direction = 'up',
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  as?: ItemTag;
}) {
  const prefersReduced = useReducedMotion();
  const {item} = buildVariants(direction);

  if (prefersReduced) {
    const Plain = as as 'div';
    return <Plain className={className}>{children}</Plain>;
  }

  const Tag = ItemMotionTags[as];

  return (
    <Tag
      variants={item}
      className={className}>
      {children}
    </Tag>
  );
}
