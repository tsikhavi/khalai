// app/[locale]/error.tsx
'use client';
import {useTranslations} from 'next-intl';

export default function Error({reset}: {reset: () => void}) {
  const t = useTranslations('Errors');
  return (
    <div className="p-8 text-center">
      <h1>{t('title')}</h1>
      <button onClick={reset}>{t('retry')}</button>
    </div>
  );
}
