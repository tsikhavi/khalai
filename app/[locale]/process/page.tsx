import {getTranslations} from 'next-intl/server';
import ProcessScroll from './process-scroll';

export default async function ProcessPage() {
  const t = await getTranslations('Process');
  return (
    <ProcessScroll
      t={t.raw('sections')}
      scrollHint={t('scrollHint')}
    />
  );
}
