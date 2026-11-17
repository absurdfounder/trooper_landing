import Link from 'next/link';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import MarketingHeroDemo from '@/components/marketing/MarketingHeroDemo';
import PixelButton from '@/components/ui/PixelButton';
import type { UseCasePageContent } from '@/lib/useCaseContent';
import { ArrowRight } from 'lucide-react';
import MarketingSubpageTail from '@/components/marketing/MarketingSubpageTail';
import OldStackComparison from '@/components/marketing/OldStackComparison';
import type { OldStackContent } from '@/lib/oldStackContent';
import MarketingSubpageBeam from '@/components/marketing/MarketingSubpageBeam';
import OverviewBenefits from '@/components/marketing/OverviewBenefits';

export default function UseCaseSubpageLayout({
  content,
  hubHref = '/use-cases',
  hubLabel = 'All use cases',
  oldStack,
}: {
  content: UseCasePageContent;
  hubHref?: string;
  hubLabel?: string;
  oldStack?: OldStackContent;
}) {
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
                Deploy agents
              </PixelButton>
              <PixelButton
                href={hubHref}
                size="lg"
                variant="outline"
                tone="dark"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                {hubLabel}
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

      {oldStack ? <OldStackComparison content={oldStack} bgClass="bg-canvas" /> : null}

      <SectionShell eyebrow="How it works" eyebrowNumber="03" bgClass="bg-slate-50" variant="marketing">
        <section>
          <div className="marketing-section-content">
            <h2 className="font-funneldisplay text-2xl sm:text-3xl tracking-tight text-slate-900 mb-8">
              How Trooper handles this
            </h2>
            <ol className="grid gap-4 md:grid-cols-2 max-w-4xl">
              {content.howItWorks.map((step, index) => (
                <li
                  key={step.slice(0, 32)}
                  className="flex gap-4 border border-slate-200 bg-white p-5"
                >
                  <span className="font-mono text-lg text-slate-300 tabular-nums shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </SectionShell>

      <SectionShell eyebrow="Explore" bgClass="bg-white" variant="marketing">
        <section>
          <div className="marketing-section-content">
            <div className="grid md:grid-cols-2 gap-8">
              {content.relatedTeams.length > 0 && (
                <div>
                  <h3 className="font-funneldisplay text-lg font-semibold text-slate-900 mb-4">Related teams</h3>
                  <ul className="space-y-3">
                    {content.relatedTeams.map((t) => (
                      <li key={t.href}>
                        <Link
                          href={t.href}
                          className="group block border border-slate-200 p-4 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                        >
                          <span className="text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                            {t.label} →
                          </span>
                          {t.description && (
                            <p className="text-xs text-slate-500 mt-1">{t.description}</p>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {content.relatedIntegrations.length > 0 && (
                <div>
                  <h3 className="font-funneldisplay text-lg font-semibold text-slate-900 mb-4">Related integrations</h3>
                  <ul className="space-y-3">
                    {content.relatedIntegrations.map((i) => (
                      <li key={i.href}>
                        <Link
                          href={i.href}
                          className="group block border border-slate-200 p-4 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                        >
                          <span className="text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                            {i.label} →
                          </span>
                          {i.description && (
                            <p className="text-xs text-slate-500 mt-1">{i.description}</p>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      </SectionShell>

      <MarketingSubpageTail />
    </>
  );
}
