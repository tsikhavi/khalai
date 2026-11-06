import {setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import {CreativityStage} from './creativity-stage';
import {ShowcaseSwitcher} from '@/components/showcase/switcher';

type Props = {params: Promise<{locale: string}>};

export const metadata: Metadata = {
  title: 'Creativity — Khalai Studio',
  description: 'Four scroll-driven animations, pinned to the viewport.',
};

export default async function CreativityPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  return (
    <>
      <CreativityStage />
      <ShowcaseSwitcher />
    </>
  );
}
