import {setRequestLocale} from 'next-intl/server';
import {Hero} from '@/components/studio/Hero';
import {ManifestoSection} from '@/components/studio/ManifestoSection';
import {ServicesGrid} from '@/components/studio/ServicesGrid';
import {SelectedWork} from '@/components/studio/SelectedWork';
import {JournalPreview} from '@/components/studio/JournalPreview';
import {ContactCTA} from '@/components/studio/ContactCTA';
import {LensProvider, LensHint} from '@/components/studio/LensToggle';
import {Footer} from '@/components/footer';

type Props = {params: Promise<{locale: string}>};

export default async function StudioPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <LensProvider>
      <Hero />
      <ManifestoSection />
      <ServicesGrid />
      <SelectedWork />
      <JournalPreview locale={locale} />
      <ContactCTA />
      <Footer />
      <LensHint />
    </LensProvider>
  );
}
