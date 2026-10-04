import FAQ from '@/components/faq';
import IntegrationScroller from '@/components/IntegrationScroller';
import OldStackComparison from '@/components/marketing/OldStackComparison';
import PlanCompare from '@/components/pricing/PlanCompare';
import SeatStage from '@/components/pricing/SeatStage';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import { getIntegrationTiles } from '@/lib/integrationScroller';
import { getPricingOldStack } from '@/lib/oldStackContent';
import { PLUGIN_CATALOG_COUNT } from '@/lib/pluginCatalog';

export default function PricingClient() {
  const integrationTiles = getIntegrationTiles(36);
  const oldStack = getPricingOldStack();

  return (
    <div className="min-h-screen bg-canvas">
      <Header />
      <SeatStage scene bleed titleAs="h1" />
      <SectionShell rhythm bgClass="bg-canvas">
        <IntegrationScroller tiles={integrationTiles} totalCount={PLUGIN_CATALOG_COUNT} />
      </SectionShell>
      <SectionShell rhythm bgClass="bg-white">
        <PlanCompare />
      </SectionShell>
      <OldStackComparison content={{ ...oldStack, eyebrow: '' }} bgClass="bg-white" />
      <SectionShell rhythm bgClass="bg-canvas">
        <FAQ />
      </SectionShell>
    </div>
  );
}
