import type { SubpageBenefit } from '@/lib/subpageContent';

export default function OverviewBenefits({ benefits }: { benefits: SubpageBenefit[] }) {
  return (
    <div className="subpage-benefits mt-12 flex flex-col border-y border-slate-200 md:flex-row md:divide-x md:divide-slate-200">
      {benefits.map((benefit) => (
        <div key={benefit.title} className="flex-1 py-5 md:px-6 md:first:pl-0 md:last:pr-0">
          <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
}
