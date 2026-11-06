import {getTranslations} from 'next-intl/server';
import MusicDemo from './music-demo';
import {ShowcaseSwitcher} from '@/components/showcase/switcher';

export default async function MusicPage() {
  const t = await getTranslations('Music');

  const sections = {
    kicker: t('kicker'),
    title: t('title'),
    body: t('body'),
    hero: {
      playAll: t('hero.playAll'),
      nowPlaying: t('hero.nowPlaying'),
      paused: t('hero.paused'),
    },
    player: {
      ariaLabel: t('player.ariaLabel'),
      play: t('player.play'),
      pause: t('player.pause'),
      next: t('player.next'),
      prev: t('player.prev'),
      volume: t('player.volume'),
      mute: t('player.mute'),
      unmute: t('player.unmute'),
      noTrack: t('player.noTrack'),
      unsupported: t('player.unsupported'),
    },
    credits: {
      title: t('credits.title'),
      body: t('credits.body'),
      columns: t.raw('credits.columns') as {
        year: string;
        project: string;
        network: string;
        role: string;
      },
      rows: t.raw('credits.rows') as {
        year: string;
        project: string;
        network: string;
        role: string;
      }[],
    },
    discography: {
      title: t('discography.title'),
      body: t('discography.body'),
      columns: t.raw('discography.columns') as {
        year: string;
        title: string;
        artist: string;
        role: string;
      },
      rows: t.raw('discography.rows') as {
        year: string;
        title: string;
        artist: string;
        role: string;
      }[],
    },
    process: {
      title: t('process.title'),
      body: t('process.body'),
      steps: t.raw('process.steps') as {title: string; body: string}[],
    },
    equipment: {
      title: t('equipment.title'),
      body: t('equipment.body'),
    },
    testimonials: {
      title: t('testimonials.title'),
      items: t.raw('testimonials.items') as {
        quote: string;
        author: string;
        role: string;
      }[],
    },
    services: {
      title: t('services.title'),
      body: t('services.body'),
      items: t.raw('services.items') as {title: string; body: string}[],
    },
    cta: {
      title: t('cta.title'),
      body: t('cta.body'),
      primary: t('cta.primary'),
      secondary: t('cta.secondary'),
    },
  };

  return (
    <>
      <MusicDemo sections={sections} />
      <ShowcaseSwitcher />
    </>
  );
}
