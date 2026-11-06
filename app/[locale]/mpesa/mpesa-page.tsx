'use client';

import {useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {MpesaHero} from '@/components/mpesa/MpesaHero';
import {MpesaWhy} from '@/components/mpesa/MpesaWhy';
import {MpesaPrinciples} from '@/components/mpesa/MpesaPrinciples';
import {MpesaAnatomy} from '@/components/mpesa/MpesaAnatomy';
import {MpesaPartners} from '@/components/mpesa/MpesaPartners';
import {MpesaFuture} from '@/components/mpesa/MpesaFuture';
import {MpesaProof} from '@/components/mpesa/MpesaProof';
import {MpesaCTA} from '@/components/mpesa/MpesaCTA';
import {MpesaVisualPanel} from '@/components/mpesa/MpesaVisualPanel';
import type {MpesaVisualKey} from '@/components/mpesa/MpesaVisualPanel';

/**
 * Wraps a section and reports when it becomes active (hover/focus).
 * Declared at module scope — not inside MpesaPage — so its component
 * identity is stable across renders.
 */
function Tracked({
  visual,
  onActive,
  children,
}: {
  visual: MpesaVisualKey;
  onActive: (key: MpesaVisualKey) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      data-visual={visual}
      className="scroll-mt-20"
      onMouseEnter={() => onActive(visual)}
      onFocus={() => onActive(visual)}>
      {children}
    </div>
  );
}

export function MpesaPage({locale}: {locale: string}) {
  const t = useTranslations('Mpesa');
  const [activeVisual, setActiveVisual] = useState<MpesaVisualKey>('hero');

  return (
    <main className="overflow-x-clip">
      <MpesaHero
        eyebrow={t('hero.eyebrow')}
        titleLens={t('hero.titleLens')}
        subtitle={t('hero.subtitle')}
        primaryLabel={t('hero.primary')}
        secondaryLabel={t('hero.secondary')}
        locale={locale}
      />

      {/* Two-column body: content on the left, sticky visual on the right */}
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="min-w-0">
          <Tracked
            visual="why"
            onActive={setActiveVisual}>
            <MpesaWhy
              eyebrow={t('why.eyebrow')}
              title={t('why.title')}
              subtitle={t('why.subtitle')}
              points={[
                {
                  key: 'default',
                  title: t('why.points.default.title'),
                  body: t('why.points.default.body'),
                },
                {
                  key: 'mobile',
                  title: t('why.points.mobile.title'),
                  body: t('why.points.mobile.body'),
                },
                {
                  key: 'trust',
                  title: t('why.points.trust.title'),
                  body: t('why.points.trust.body'),
                },
              ]}
            />
          </Tracked>

          <Tracked
            visual="principles"
            onActive={setActiveVisual}>
            <MpesaPrinciples
              eyebrow={t('principles.eyebrow')}
              title={t('principles.title')}
              steps={[
                {
                  key: 'ask',
                  num: '01',
                  title: t('principles.steps.ask.title'),
                  body: t('principles.steps.ask.body'),
                },
                {
                  key: 'frame',
                  num: '02',
                  title: t('principles.steps.frame.title'),
                  body: t('principles.steps.frame.body'),
                },
                {
                  key: 'confirm',
                  num: '03',
                  title: t('principles.steps.confirm.title'),
                  body: t('principles.steps.confirm.body'),
                },
                {
                  key: 'recover',
                  num: '04',
                  title: t('principles.steps.recover.title'),
                  body: t('principles.steps.recover.body'),
                },
              ]}
            />
          </Tracked>

          <Tracked
            visual="anatomy"
            onActive={setActiveVisual}>
            <MpesaAnatomy
              eyebrow={t('anatomy.eyebrow')}
              title={t('anatomy.title')}
              subtitle={t('anatomy.subtitle')}
              rows={[
                {
                  key: 'phone',
                  label: t('anatomy.rows.phone.label'),
                  value: t('anatomy.rows.phone.value'),
                },
                {
                  key: 'amount',
                  label: t('anatomy.rows.amount.label'),
                  value: t('anatomy.rows.amount.value'),
                },
                {
                  key: 'action',
                  label: t('anatomy.rows.action.label'),
                  value: t('anatomy.rows.action.value'),
                },
                {
                  key: 'wait',
                  label: t('anatomy.rows.wait.label'),
                  value: t('anatomy.rows.wait.value'),
                },
                {
                  key: 'done',
                  label: t('anatomy.rows.done.label'),
                  value: t('anatomy.rows.done.value'),
                },
                {
                  key: 'fail',
                  label: t('anatomy.rows.fail.label'),
                  value: t('anatomy.rows.fail.value'),
                },
              ]}
              goodLabel={t('anatomy.good')}
              badLabel={t('anatomy.bad')}
            />
          </Tracked>

          <Tracked
            visual="partners"
            onActive={setActiveVisual}>
            <MpesaPartners
              eyebrow={t('partners.eyebrow')}
              title={t('partners.title')}
              subtitle={t('partners.subtitle')}
              partners={[
                {
                  key: 'visa',
                  name: t('partners.items.visa.name'),
                  body: t('partners.items.visa.body'),
                },
                {
                  key: 'stripe',
                  name: t('partners.items.stripe.name'),
                  body: t('partners.items.stripe.body'),
                },
                {
                  key: 'flutter',
                  name: t('partners.items.flutter.name'),
                  body: t('partners.items.flutter.body'),
                },
                {
                  key: 'paypal',
                  name: t('partners.items.paypal.name'),
                  body: t('partners.items.paypal.body'),
                },
              ]}
            />
          </Tracked>

          <Tracked
            visual="future"
            onActive={setActiveVisual}>
            <MpesaFuture
              eyebrow={t('future.eyebrow')}
              title={t('future.title')}
              subtitle={t('future.subtitle')}
              features={[
                {
                  key: 'agents',
                  title: t('future.items.agents.title'),
                  body: t('future.items.agents.body'),
                },
                {
                  key: 'voice',
                  title: t('future.items.voice.title'),
                  body: t('future.items.voice.body'),
                },
                {
                  key: 'offline',
                  title: t('future.items.offline.title'),
                  body: t('future.items.offline.body'),
                },
                {
                  key: 'credit',
                  title: t('future.items.credit.title'),
                  body: t('future.items.credit.body'),
                },
              ]}
            />
          </Tracked>

          <Tracked
            visual="proof"
            onActive={setActiveVisual}>
            <MpesaProof
              eyebrow={t('proof.eyebrow')}
              title={t('proof.title')}
              subtitle={t('proof.subtitle')}
              stats={[
                {
                  key: 'flows',
                  value: t('proof.stats.flows.value'),
                  label: t('proof.stats.flows.label'),
                },
                {
                  key: 'uptime',
                  value: t('proof.stats.uptime.value'),
                  label: t('proof.stats.uptime.label'),
                },
                {
                  key: 'countries',
                  value: t('proof.stats.countries.value'),
                  label: t('proof.stats.countries.label'),
                },
              ]}
            />
          </Tracked>
        </div>

        {/* Sticky visual panel — desktop only */}
        <aside className="hidden md:block">
          <MpesaVisualPanel active={activeVisual} />
        </aside>
      </div>

      <Tracked
        visual="cta"
        onActive={setActiveVisual}>
        <MpesaCTA
          title={t('cta.title')}
          body={t('cta.body')}
          primaryLabel={t('cta.primary')}
          secondaryLabel={t('cta.secondary')}
          locale={locale}
        />
      </Tracked>
    </main>
  );
}
