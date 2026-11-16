'use client';

import HeroArticleDemo from '@/components/HeroArticleDemo';
import type { DemoScenarioId } from '@trooper/demo';

/**
 * Product demo for marketing subpages (teams, features, channels, …).
 * Keep the product frame on a clean canvas; the homepage no longer uses the
 * dotted backdrop that used to surround subpage demos.
 */
export default function MarketingHeroDemo({ scenarioId }: { scenarioId: DemoScenarioId }) {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 pb-12 sm:px-6 lg:px-8">
      <HeroArticleDemo scenarioId={scenarioId} flush />
    </div>
  );
}
