import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import MarketingHeroDemo from '@/components/marketing/MarketingHeroDemo';
import PixelButton from '@/components/ui/PixelButton';
import type { SubpageContent } from '@/lib/subpageContent';
import { ArrowRight } from 'lucide-react';
import MarketingSubpageTail from '@/components/marketing/MarketingSubpageTail';
import MarketingSubpageBeam from '@/components/marketing/MarketingSubpageBeam';
import OverviewBenefits from '@/components/marketing/OverviewBenefits';

export default function SubpageLayout({ content }: { content: SubpageContent }) {
  return (
    <>
      <div className="marketing-subpage-hero trooper-hero">
        <Header dark darkOnLoad />
        <MarketingSubpageBeam />
        <section className="max-w-7xl mx-auto">
          <div className="page-hero-padding px-4 sm:px-6 lg:px-8 pb-8">
            <p className="subpage-mission-label">{content.missionLabel}</p>
            <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-[2.5rem] max-w-3xl leading-tight tracking-tight text-slate-900">
              {content.title}
              {content.titleAccent && (
                <>
                  <br />
                  <span className="text-slate-500 font-normal">{content.titleAccent}</span>
                </>
              )}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {content.description}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <PixelButton
                href="https://app.trooper.so"
                external
                size="lg"
                tone="brand"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Get Started
              </PixelButton>
              <PixelButton
                href="https://cal.com/set-meeting/trooper"
                external
                size="lg"
                variant="outline"
                tone="dark"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Talk to founder
              </PixelButton>
            </div>
          </div>

          <MarketingHeroDemo scenarioId={content.demoId} />
        </section>
      </div>

      <SectionShell eyebrow="Overview" eyebrowNumber="02" bgClass="bg-white" variant="marketing">
        <section>
          <div className="marketing-section-content">
            <div className="max-w-3xl">
              <h2 className="font-funneldisplay text-2xl sm:text-3xl tracking-tight text-slate-900 mb-6">
                {content.overviewTitle}
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                {content.overviewParagraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </div>

            <OverviewBenefits benefits={content.benefits} />
          </div>
        </section>
      </SectionShell>

      <MarketingSubpageTail />
    </>
  );
}
