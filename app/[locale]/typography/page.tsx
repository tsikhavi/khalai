import {getTranslations} from 'next-intl/server';
import TypographyDemo from './typography-demo';
import {ShowcaseSwitcher} from '@/components/showcase/switcher';

export default async function TypographyPage() {
  const t = await getTranslations('Typography');

  const sections = {
    kicker: t('kicker'),
    title: t('title'),
    body: t('body'),

    scrolly: {
      title: t('scrolly.title'),
      words: t.raw('scrolly.words') as string[],
    },

    masked: {
      title: t('masked.title'),
      shimmer: t('masked.shimmer'),
      image: t('masked.image'),
    },

    typewriter: {
      title: t('typewriter.title'),
      phrase: t('typewriter.phrase'),
    },

    kinetic: {
      title: t('kinetic.title'),
      words: t.raw('kinetic.words') as string[],
    },

    variable: {
      title: t('variable.title'),
      sample: t('variable.sample'),
      hint: t('variable.hint'),
    },

    shadow: {
      title: t('shadow.title'),
      sample: t('shadow.sample'),
    },

    burst: {
      title: t('burst.title'),
      word: t('burst.word'),
      hint: t('burst.hint'),
    },

    melt: {
      title: t('melt.title'),
      sample: t('melt.sample'),
    },

    spin: {
      title: t('spin.title'),
      sample: t('spin.sample'),
    },

    wave: {
      title: t('wave.title'),
      sample: t('wave.sample'),
    },

    join: {
      title: t('join.title'),
      left: t('join.left'),
      right: t('join.right'),
    },

    gooey: {
      title: t('gooey.title'),
      phrase: t('gooey.phrase'),
    },

    frame: {
      title: t('frame.title'),
      caption: t('frame.caption'),
      image: t('frame.image'),
    },

    editor: {
      title: t('editor.title'),
      caption: t('editor.caption'),
    },

    glitch: {title: t('glitch.title'), sample: t('glitch.sample')},
    splitFlap: {title: t('splitFlap.title'), sample: t('splitFlap.sample')},
    magnetic: {title: t('magnetic.title'), sample: t('magnetic.sample')},
    spotlight: {title: t('spotlight.title'), sample: t('spotlight.sample')},
    stagger: {title: t('stagger.title'), sample: t('stagger.sample')},
    typeCycle: {
      title: t('typeCycle.title'),
      phrases: t.raw('typeCycle.phrases') as string[],
    },
    bounce: {title: t('bounce.title'), sample: t('bounce.sample')},
    inkBleed: {title: t('inkBleed.title'), sample: t('inkBleed.sample')},
    zoomThrough: {
      title: t('zoomThrough.title'),
      sample: t('zoomThrough.sample'),
    },
    reflection: {title: t('reflection.title'), sample: t('reflection.sample')},
    outlineFill: {
      title: t('outlineFill.title'),
      sample: t('outlineFill.sample'),
    },
    stretch: {title: t('stretch.title'), sample: t('stretch.sample')},
    slice: {title: t('slice.title'), sample: t('slice.sample')},
    colorFill: {title: t('colorFill.title'), sample: t('colorFill.sample')},
  };

  return (
    <>
      <TypographyDemo sections={sections} />
      <ShowcaseSwitcher />
    </>
  );
}
