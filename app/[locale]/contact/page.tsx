import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import {getServiceFromT} from '@/lib/marketing-services';

import {ContactHero} from '@/components/contact/ContactHero';
import {ContactTrustStrip} from '@/components/contact/ContactTrustStrip';
import {ContactForm} from './contact-form';
import {ContactMethods} from '@/components/contact/ContactMethods';
import {ContactFAQ} from '@/components/contact/ContactFAQ';
import {ContactCTA} from '@/components/contact/ContactCTA';

type Props = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{service?: string; source?: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Contact'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      type: 'website',
    },
  };
}

export default async function ContactPage({params, searchParams}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const {service, source} = await searchParams;
  const t = await getTranslations('Contact');
  const tMarketing = await getTranslations('Marketing');

  // Resolve slug → friendly subject prefix.
  // Marketing translations live under the `Marketing` namespace,
  // so we pass the marketing translator, not the contact one.
  const known = service ? getServiceFromT(tMarketing, service) : null;
  const subjectPrefix = known?.plain.split(' — ')[0] ?? '';
  const defaultSubject = subjectPrefix ? `${subjectPrefix} — enquiry` : '';

  const methods = [
    {
      key: 'email',
      icon: '✉️',
      title: t('methods.email.title'),
      body: t('methods.email.body'),
      cta: t('methods.email.cta'),
      href: `mailto:${t('contactEmail')}`,
      external: false,
    },
    {
      key: 'whatsapp',
      icon: '💬',
      title: t('methods.whatsapp.title'),
      body: t('methods.whatsapp.body'),
      cta: t('methods.whatsapp.cta'),
      href: `https://wa.me/${t('contactWhatsapp')}?text=${encodeURIComponent(
        t('methods.whatsapp.prefill')
      )}`,
      external: true,
    },
    {
      key: 'call',
      icon: '📞',
      title: t('methods.call.title'),
      body: t('methods.call.body'),
      cta: t('methods.call.cta'),
      href: `tel:${t('contactPhone')}`,
      external: false,
    },
  ];

  const faqs = [
    {key: 'reach', q: t('faq.reach.q'), a: t('faq.reach.a')},
    {key: 'timezone', q: t('faq.timezone.q'), a: t('faq.timezone.a')},
    {key: 'budget', q: t('faq.budget.q'), a: t('faq.budget.a')},
    {key: 'payment', q: t('faq.payment.q'), a: t('faq.payment.a')},
    {key: 'remote', q: t('faq.remote.q'), a: t('faq.remote.a')},
  ];

  return (
    <>
      <ContactHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        locationLine={t('locationLine')}
      />

      <ContactTrustStrip
        items={[
          t('trust.item1'),
          t('trust.item2'),
          t('trust.item3'),
          t('trust.item4'),
        ]}
      />

      <ContactForm
        defaultSubject={defaultSubject}
        service={service ?? null}
        source={source ?? (service ? 'marketing-service' : null)}
        labels={{
          name: t('form.name'),
          email: t('form.email'),
          company: t('form.company'),
          subject: t('form.subject'),
          message: t('form.message'),
          send: t('form.send'),
          sending: t('form.sending'),
          success: t('form.success'),
          successBody: t('form.successBody'),
          errorGeneric: t('form.errorGeneric'),
          optional: t('form.optional'),
          namePlaceholder: t('form.namePlaceholder'),
          emailPlaceholder: t('form.emailPlaceholder'),
          companyPlaceholder: t('form.companyPlaceholder'),
          subjectPlaceholder: t('form.subjectPlaceholder'),
          messagePlaceholder: t('form.messagePlaceholder'),
          acceptTermsPrefix: t('form.acceptTermsPrefix'),
          acceptTermsLink: t('form.acceptTermsLink'),
          acceptTermsAnd: t('form.acceptTermsAnd'),
          acceptPrivacyLink: t('form.acceptPrivacyLink'),
          acceptTermsError: t('form.acceptTermsError'),
          formFootnote: t('form.formFootnote'),
        }}
      />
      <ContactMethods
        heading={t('methods.title')}
        subtitle={t('methods.subtitle')}
        methods={methods}
      />

      <ContactFAQ
        heading={t('faq.title')}
        subtitle={t('faq.subtitle')}
        faqs={faqs}
      />

      <ContactCTA
        title={t('cta.title')}
        body={t('cta.body')}
        primaryLabel={t('cta.primary')}
        secondaryLabel={t('cta.secondary')}
        locale={locale}
      />
    </>
  );
}