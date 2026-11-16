import { ogImageMeta } from '@/lib/og/url';

const homeOg = ogImageMeta('home', 'Trooper: AI teammates that ship real work');
const homeDescription = 'Run Codex, Claude, Gemini, Grok, and your own models in one workspace. Agents use tools, hand off tasks, and work with your team. Switch providers and keep your chats and memory.';

export const metadata = {
  metadataBase: new URL('https://trooper.so'),
  title: 'Trooper: AI teammates that ship real work',
  description: homeDescription,
  alternates: {
    canonical: 'https://trooper.so',
  },
  openGraph: {
    title: 'Trooper: AI teammates that ship real work',
    description: homeDescription,
    url: 'https://trooper.so',
    siteName: 'Trooper',
    images: homeOg.openGraph!.images,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: 'Trooper: AI teammates that ship real work',
    description: homeDescription,
    site: '@trooper_so',
    images: homeOg.twitter!.images,
  },
  keywords: [
    'trooper',
    'ai teammates',
    'ai employees',
    'ai workforce',
    'loop api',
    'self-host ai agents',
    'openclaw',
  ],
}

import dynamic from 'next/dynamic'
import Link from 'next/link'
import Hero from '@/components/hero'
import Header from '@/components/ui/header'
import LoopRail from '@/components/LoopRail'
import { getLoopRailItems, LOOP_CATALOG_COUNT } from '@/lib/loopCatalog'
import IntegrationScroller from '@/components/IntegrationScroller'
import { getIntegrationTiles } from '@/lib/integrationScroller'
import { PLUGIN_CATALOG_COUNT } from '@/lib/pluginCatalog'
import FAQ from '@/components/faq'
import SectionShell from '@/components/ui/SectionShell'
import ComputerUseSection from '@/components/ComputerUseSection'

import PlansFlowSection from '@/components/moat/PlansFlowSection'
import ConnectSection from '@/components/moat/ConnectSection'

const OldWays = dynamic(() => import('@/components/OldWays'))
const LoopApiSection = dynamic(() => import('@/components/LoopApiSection'))
const MobileChannelsSection = dynamic(() => import('@/components/MobileChannelsSection'))
const CompanyBrainSection = dynamic(() => import('@/components/CompanyBrainSection'))
const OptimizeAgentsSection = dynamic(() => import('@/components/OptimizeAgentsSection'))

export default function Home() {
  const loopRailItems = getLoopRailItems(8)
  const integrationTiles = getIntegrationTiles(36)

  return (
    <div className="overflow-x-clip">
      <div className="hero-shell trooper-home-shell">
        <Header dark />
        <Hero />
      </div>

      <SectionShell rhythm>
        <IntegrationScroller tiles={integrationTiles} totalCount={PLUGIN_CATALOG_COUNT} />
      </SectionShell>

      <SectionShell rhythm>
        <CompanyBrainSection />
      </SectionShell>

      <SectionShell rhythm>
        <OldWays />
      </SectionShell>

      <ComputerUseSection />

      <SectionShell rhythm>
        <PlansFlowSection />
      </SectionShell>

      <SectionShell rhythm>
        <OptimizeAgentsSection />
      </SectionShell>

      <ConnectSection />

      <LoopApiSection />

      <SectionShell rhythm>
        <LoopRail items={loopRailItems} totalCount={LOOP_CATALOG_COUNT} />
      </SectionShell>

      <MobileChannelsSection />

      <SectionShell rhythm eyebrow="Work">
        <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['AI that codes', '/use-cases/writes-code'],
            ['Customer service AI', '/use-cases/customer-support'],
            ['Lead generation agent', '/use-cases/lead-generation'],
            ['Find email', '/use-cases/find-emails'],
            ['Browser agent', '/use-cases/uses-browser'],
            ['AI for small business', '/use-cases/small-business'],
            ['AI for startups', '/use-cases/startups'],
            ['AI employees, compared', '/alternatives'],
            ['AI coding IDEs, including the free ones', '/ai-coding-ide'],
            ['OpenClaw for a company', '/features/openclaw-powered'],
          ].map(([label, href]) => (
            <li key={href}>
              <Link
                className="text-sm text-ink-muted transition-colors hover:text-ink"
                href={href}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell rhythm>
        <FAQ />
      </SectionShell>
    </div>
  )
}
