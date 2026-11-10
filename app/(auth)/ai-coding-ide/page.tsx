import Link from 'next/link';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import PixelButton from '@/components/ui/PixelButton';
import { codingHubMeta, codingToolComparison } from '@/lib/alternativeContent';
import { buildPageMetadata } from '@/lib/og/buildMetadata';
import { ArrowRight } from 'lucide-react';
import MarketingSubpageTail from '@/components/marketing/MarketingSubpageTail';

export const metadata = buildPageMetadata({
  title: codingHubMeta.title,
  description: codingHubMeta.description,
  canonical: codingHubMeta.canonical,
  ogKind: 'page',
  ogSlug: 'ai-coding-ide',
});

function NameLink({ href, children }: { href: string; children: string }) {
  const className = 'hover:text-emerald-700';
  if (href.startsWith('http')) {
    return (
      <a href={href} className={className} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function AiCodingIdePage() {
  return (
    <div className="bg-white">
      <Header />
      <section className="max-w-7xl mx-auto border-l border-r border-slate-200">
        <div className="page-hero-padding px-4 sm:px-6 lg:px-8 pb-10">
          <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight text-slate-900 max-w-3xl">
            AI coding IDEs, including the free ones
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Cursor, Devin Desktop, Claude Code, GitHub Copilot, OpenCode, and Cline are the pages behind “AI coding IDE” and “free AI coding IDE.” Trooper is not an editor. It runs those agents for a company, on the plan you already pay for. Checked 11 Nov 2026.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <PixelButton
              href="https://app.trooper.so"
              external
              size="lg"
              tone="brand"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Try Trooper
            </PixelButton>
            <PixelButton href="/alternatives" size="lg" variant="outline" tone="dark">
              AI employees, compared
            </PixelButton>
          </div>
        </div>
      </section>

      <SectionShell eyebrow="The editors" eyebrowNumber="02" bgClass="bg-white">
        <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-16">
          <div className="overflow-x-auto border border-slate-200">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Tool</th>
                  <th className="px-4 py-3 font-medium">What it is</th>
                  <th className="px-4 py-3 font-medium">How you pay</th>
                  <th className="px-4 py-3 font-medium">Free route</th>
                </tr>
              </thead>
              <tbody>
                {codingToolComparison.map((row) => (
                  <tr key={row.name} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      <NameLink href={row.href}>{row.name}</NameLink>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.what}</td>
                    <td className="px-4 py-3 text-slate-600">{row.pay}</td>
                    <td className="px-4 py-3 text-slate-600">{row.free}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
            Prices move. This table says whether a free route exists, not a dollar amount. Vendor pages are the source for the current cap.
          </p>
        </div>
      </SectionShell>

      <MarketingSubpageTail />
    </div>
  );
}
