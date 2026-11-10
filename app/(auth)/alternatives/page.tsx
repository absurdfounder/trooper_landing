import Link from 'next/link';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import PixelButton from '@/components/ui/PixelButton';
import { agentRuntimeComparison, aiEmployeeComparison, alternativeHubMeta, allAlternativeSlugs, getAlternativePage } from '@/lib/alternativeContent';
import { buildPageMetadata } from '@/lib/og/buildMetadata';
import { ArrowRight } from 'lucide-react';
import MarketingSubpageTail from '@/components/marketing/MarketingSubpageTail';

export const metadata = buildPageMetadata({
  title: alternativeHubMeta.title,
  description: alternativeHubMeta.description,
  canonical: alternativeHubMeta.canonical,
  ogKind: 'hub',
  ogSlug: 'alternatives',
});

export default function AlternativesHubPage() {
  const slugs = allAlternativeSlugs();

  return (
    <div className="bg-white">
      <Header />
      <section className="max-w-7xl mx-auto border-l border-r border-slate-200">
        <div className="page-hero-padding px-4 sm:px-6 lg:px-8 pb-10">
          <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight text-slate-900 max-w-3xl">
            AI employees, compared
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Odella, Plumo, Viktor, Ema, Lindy, and Grok Bot are the pages behind “AI employees.” Rakazo, Hermes, and OpenClaw are the pages behind “Grok Bot alternative.” This is what each one publishes. Checked 11 Nov 2026.
          </p>
          <p className="mt-3 text-base text-slate-600 max-w-2xl leading-relaxed">
            For the editor query, see <Link href="/ai-coding-ide" className="text-slate-900 underline underline-offset-2">AI coding IDEs, including the free ones</Link>.
          </p>
          <div className="mt-6">
            <PixelButton
              href="https://app.trooper.so"
              external
              size="lg"
              tone="brand"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Try Trooper
            </PixelButton>
          </div>
        </div>
      </section>

      <SectionShell eyebrow="The field" eyebrowNumber="02" bgClass="bg-white">
        <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-8">
          <div className="overflow-x-auto border border-slate-200">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">What it is</th>
                  <th className="px-4 py-3 font-medium">How you pay</th>
                  <th className="px-4 py-3 font-medium">Where it runs</th>
                </tr>
              </thead>
              <tbody>
                {aiEmployeeComparison.map((row) => (
                  <tr key={row.name} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      <Link href={row.href} className="hover:text-emerald-700">
                        {row.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.what}</td>
                    <td className="px-4 py-3 text-slate-600">{row.pay}</td>
                    <td className="px-4 py-3 text-slate-600">{row.runs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionShell>

      <SectionShell eyebrow="Grok Bot and the open-source agents" eyebrowNumber="03" bgClass="bg-white">
        <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-8">
          <p className="mb-4 max-w-2xl text-sm leading-relaxed text-slate-600">
            OpenClaw is the runtime Trooper is built on. The row below links to that page, not to an “OpenClaw alternative.”
          </p>
          <div className="overflow-x-auto border border-slate-200">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">What it is</th>
                  <th className="px-4 py-3 font-medium">How you pay</th>
                  <th className="px-4 py-3 font-medium">Where it runs</th>
                </tr>
              </thead>
              <tbody>
                {agentRuntimeComparison.map((row) => (
                  <tr key={row.name} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      <Link href={row.href} className="hover:text-emerald-700">
                        {row.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.what}</td>
                    <td className="px-4 py-3 text-slate-600">{row.pay}</td>
                    <td className="px-4 py-3 text-slate-600">{row.runs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionShell>

      <SectionShell eyebrow="Comparisons" eyebrowNumber="04" bgClass="bg-slate-50">
        <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-16 md:pb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {slugs.map((slug) => {
              const page = getAlternativePage(slug)!;
              return (
                <Link
                  key={slug}
                  href={`/alternatives/${slug}`}
                  className="group flex min-h-[120px] flex-col gap-2 border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  <h2 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {page.competitorName} alternative
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1 line-clamp-2">
                    {page.description}
                  </p>
                  <span className="text-xs font-mono uppercase tracking-[0.12em] text-slate-400 group-hover:text-emerald-600 transition-colors">
                    Compare →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </SectionShell>

      <MarketingSubpageTail />
    </div>
  );
}
