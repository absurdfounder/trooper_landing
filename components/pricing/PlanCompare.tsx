import { Fragment } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import PixelButton from '@/components/ui/PixelButton';
import { formatUsd, PRICING_USD } from '@/lib/pricing';

type Cell = boolean | string;

type PlanKey = 'self' | 'seat';

type Row = {
  feature: string;
  self: Cell;
  seat: Cell;
};

const PLANS: { key: PlanKey; label: string; price: string }[] = [
  { key: 'self', label: 'Self install', price: `${formatUsd(PRICING_USD.selfInstallLifetime)} once` },
  { key: 'seat', label: 'Workspace', price: `${formatUsd(PRICING_USD.seatMonthly)} per human / mo` },
];

const GROUPS: { title: string; rows: Row[] }[] = [
  {
    title: 'Workspace',
    rows: [
      { feature: 'Unlimited agents', self: true, seat: true },
      { feature: 'Unlimited messaging and calls', self: true, seat: true },
      { feature: 'Unlimited research', self: true, seat: true },
      { feature: 'Multi-agent orchestration', self: true, seat: true },
      { feature: 'Cloud computer', self: false, seat: true },
      { feature: 'Runs on a machine you own', self: true, seat: true },
      { feature: 'Where your data lives', self: 'On your computer', seat: 'On your VPS' },
      { feature: 'Works when your computer is off', self: false, seat: true },
    ],
  },
  {
    title: 'Models',
    rows: [
      { feature: 'Recharge credits on Trooper', self: false, seat: true },
      { feature: 'Bring your own keys', self: true, seat: true },
      { feature: 'Existing Claude and ChatGPT subscription', self: true, seat: true },
    ],
  },
  {
    title: 'Memory and tools',
    rows: [
      { feature: 'Adaptive memory', self: true, seat: true },
      { feature: 'Shared team memory', self: false, seat: true },
      { feature: 'Skills, plugins, and browser automation', self: true, seat: true },
      { feature: 'GitHub, email, and the tools you already use', self: true, seat: true },
    ],
  },
  {
    title: 'Team',
    rows: [
      { feature: 'Who it’s for', self: 'Your machine', seat: 'Per person' },
      { feature: 'Add team members', self: false, seat: true },
      { feature: 'Mac, Windows, iOS, and Android apps', self: true, seat: true },
    ],
  },
  {
    title: 'Security and support',
    rows: [
      { feature: 'Privacy', self: true, seat: true },
      { feature: 'Encrypted workspace', self: true, seat: true },
      { feature: 'SSO and private VPC', self: 'Talk to us', seat: 'Talk to us' },
      { feature: 'Community support', self: true, seat: true },
      { feature: 'Priority email support', self: false, seat: true },
    ],
  },
];

function CellMark({ cell }: { cell: Cell }) {
  if (typeof cell === 'string') {
    return <span className="text-[13px] leading-snug text-ink">{cell}</span>;
  }
  return cell ? (
    <Check className="mx-auto size-4 text-ink" strokeWidth={2.25} aria-label="Included" />
  ) : (
    <X className="mx-auto size-4 text-ink-faint" strokeWidth={1.75} aria-label="Not included" />
  );
}

export default function PlanCompare() {
  return (
    <div>
      <h2 className="h2-section">Compare the plans.</h2>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-black/10">
              <th className="w-[34%] py-3 pr-4 text-[13px] font-medium text-ink-muted"> </th>
              {PLANS.map((plan) => (
                <th key={plan.key} className="px-3 py-3 text-center">
                  <span className="block font-display text-[15px] font-semibold text-ink">{plan.label}</span>
                  <span className="mt-1 block text-[13px] font-medium text-ink-muted">{plan.price}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GROUPS.map((group) => (
              <Fragment key={group.title}>
                <tr key={group.title}>
                  <th
                    colSpan={3}
                    className="pb-2 pt-8 text-left text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-muted"
                  >
                    {group.title}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.feature} className="border-b border-black/5">
                    <th className="py-3 pr-4 text-left text-[14px] font-medium text-ink">{row.feature}</th>
                    {PLANS.map((plan) => (
                      <td key={plan.key} className="px-3 py-3 text-center">
                        <CellMark cell={row[plan.key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-canvas px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="kicker">Enterprise</p>
          <p className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
            Install on your own server.
          </p>
          <p className="mt-1 max-w-xl text-sm leading-6 text-ink-muted">
            Your machines, your network. Custom price.
          </p>
        </div>
        <PixelButton
          href="mailto:vaibhav@trooper.so"
          external
          size="md"
          tone="dark"
          className="shrink-0"
          icon={<ArrowRight className="h-4 w-4" aria-hidden />}
        >
          Talk to us
        </PixelButton>
      </div>
    </div>
  );
}
