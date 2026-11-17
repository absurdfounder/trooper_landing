import type { SubpageBenefit } from '@/lib/subpageContent';

export default function OverviewBenefits({ benefits }: { benefits: SubpageBenefit[] }) {
  return (
    <div className="subpage-benefits mt-10 grid gap-3 sm:mt-12 md:grid-cols-3 md:gap-4">
      {benefits.map((benefit) => (
        <div key={benefit.title} className="rounded-2xl bg-slate-50 p-5 sm:p-6">
          <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
}
