import {setRequestLocale, getTranslations} from 'next-intl/server';

import {Hero} from '@/components/studio/Hero';
import {ManifestoSection} from '@/components/studio/ManifestoSection';
import {ServicesGrid} from '@/components/studio/ServicesGrid';
import {SelectedWork} from '@/components/studio/SelectedWork';
import {JournalPreview} from '@/components/studio/JournalPreview';
import {ContactCTA} from '@/components/studio/ContactCTA';
import {StatsStrip} from '@/components/studio/StatsStrip';
import {CapabilitiesGrid} from '@/components/studio/CapabilitiesGrid';
import {StackCloud} from '@/components/studio/StackCloud';
import {ValuesGrid} from '@/components/studio/ValuesGrid';
import {MarketingSection} from '@/components/studio/MarketingSection';

import {LandingStage} from './LandingStage';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Meta'});
  return {title: t('title'), description: t('description')};
}

export default async function StudioLandingPage({params}: Props) {
  await new Promise((r) => setTimeout(r, 2000));

  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />

      <StatsStrip
        stats={[
          {key: 'projects', value: '32+'},
          {key: 'uptime', value: '99.95%'},
          {key: 'clients', value: '25+'},
          {key: 'countries', value: '4'},
        ]}
      />

      <CapabilitiesGrid
        capabilities={[
          {key: 'cloud', icon: '☁️'},
          {key: 'cicd', icon: '🔁'},
          {key: 'kubernetes', icon: '⎈'},
          {key: 'observability', icon: '📊'},
          {key: 'security', icon: '🔐'},
          {key: 'blockchain', icon: '⛓️'},
        ]}
      />

      <ManifestoSection />

      {/* Scroll-reveal sequence — no fixed chrome, no fullscreen pinning */}
      <LandingStage />

      <StackCloud
        groups={[
          {group: 'cloud', items: ['AWS', 'GCP', 'Azure', 'Hetzner']},
          {
            group: 'containers',
            items: ['Docker', 'Kubernetes', 'k3s', 'Podman'],
          },
          {group: 'iac', items: ['Terraform', 'Ansible', 'Pulumi']},
          {group: 'cicd', items: ['GitHub Actions', 'GitLab CI', 'ArgoCD']},
          {
            group: 'backend',
            items: ['Node.js', 'NestJS', 'Python', 'FastAPI', 'Django'],
          },
          {
            group: 'frontend',
            items: ['React', 'Next.js', 'Tailwind', 'TypeScript'],
          },
          {group: 'data', items: ['Postgres', 'Redis', 'TimescaleDB', 'Kafka']},
          {
            group: 'blockchain',
            items: ['Solidity', 'Foundry', 'Hardhat', 'Hyperledger'],
          },
          {
            group: 'obs',
            items: ['Prometheus', 'Grafana', 'Loki', 'OpenTelemetry'],
          },
        ]}
      />

      <ServicesGrid />
      <MarketingSection />

      <ValuesGrid
        values={[
          {key: 'craft', icon: '🛠️'},
          {key: 'speed', icon: '⚡'},
          {key: 'clarity', icon: '🔍'},
          {key: 'ownership', icon: '🤝'},
        ]}
      />

      <SelectedWork />

      <JournalPreview locale={locale} />

      <ContactCTA />
    </>
  );
}
