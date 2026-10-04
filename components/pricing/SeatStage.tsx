'use client';

import { ArrowRight, Check, Headphones, Layers, Search, Wrench } from 'lucide-react';
import Link from 'next/link';
import ScaledBoard from '@/components/pricing/ScaledBoard';
import PixelButton from '@/components/ui/PixelButton';
import TrooperAvatar from '@/components/ui/TrooperAvatar';
import { formatUsd, PRICING_USD, SEAT_INCLUDES } from '@/lib/pricing';
import { getTrooper } from '@/lib/troopers';

const SPARKLES = [
  { x: 40, y: 6, size: 6, delay: '1.2s', duration: '9s' },
  { x: -6, y: 22, size: 5, delay: '4.5s', duration: '11s' },
  { x: 18, y: 42, size: 5, delay: '7s', duration: '10s' },
] as const;

const BOARD_W = 500;
const BOARD_H = 540;
const CX = 250;
const TRUNK_TOP = 36;
const AVATAR = 48;

type PropKind = 'wrench' | 'message' | 'call' | 'magnifier' | 'slides';

const FEATURES: {
  label: string;
  handle: string;
  prop: PropKind;
  side: 'left' | 'right';
  y: number;
}[] = [
  { label: 'Unlimited agents', handle: 'rex', prop: 'wrench', side: 'right', y: 72 },
  { label: 'Unlimited messaging', handle: 'nova', prop: 'message', side: 'left', y: 176 },
  { label: 'Unlimited calls', handle: 'scout', prop: 'call', side: 'right', y: 280 },
  { label: 'Unlimited research', handle: 'pip', prop: 'magnifier', side: 'left', y: 384 },
  { label: 'Cloud computer', handle: 'wren', prop: 'slides', side: 'right', y: 488 },
];

function layoutFeatures() {
  return FEATURES.map((feature, index) => {
    const elbow = feature.y + 16;
    const x = feature.side === 'right' ? CX + 28 : CX - 8;
    const branch = `M ${CX} ${feature.y} Q ${CX} ${elbow}, ${x} ${elbow}`;
    const travel = `M ${CX} ${TRUNK_TOP} L ${CX} ${feature.y} Q ${CX} ${elbow}, ${x} ${elbow}`;
    return { ...feature, index, elbow, x, branch, travel };
  });
}

function KeyMark({ name, src }: { name: string; src: string }) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap">
      {/* eslint-disable-next-line @next/next/no-img-element -- brand mark beside the name */}
      <img src={src} alt="" width={16} height={16} className="size-4" />
      {name}
    </span>
  );
}

function FeatureProp({ kind, side, color }: { kind: PropKind; side: 'left' | 'right'; color: string }) {
  const place = side === 'left' ? 'pricing-prop-left' : 'pricing-prop-right';
  if (kind === 'message') {
    return (
      <span className={`pricing-prop ${place}`} style={{ color }}>
        <span className="pricing-prop-motion pricing-prop-message">
          <span className="pricing-prop-bubble">
            <i />
            <i />
            <i />
          </span>
        </span>
      </span>
    );
  }

  const Icon = kind === 'wrench' ? Wrench : kind === 'call' ? Headphones : kind === 'magnifier' ? Search : Layers;
  return (
    <span className={`pricing-prop ${place}`} style={{ color }}>
      <span className={`pricing-prop-motion pricing-prop-${kind}`}>
        <Icon aria-hidden className="size-4" strokeWidth={2.25} />
      </span>
    </span>
  );
}

function Sparkles({ seed }: { seed: number }) {
  return (
    <span className="pricing-sparkles" aria-hidden>
      {SPARKLES.map((spark) => (
        <i
          key={`${spark.x}-${spark.y}`}
          className="pricing-spark"
          style={{
            left: spark.x,
            top: spark.y,
            width: spark.size,
            height: spark.size,
            animationDelay: `calc(${spark.delay} + ${seed * 1.7}s)`,
            animationDuration: spark.duration,
          }}
        />
      ))}
    </span>
  );
}

function SeatStrings({ price, unit }: { price: string; unit: string }) {
  const nodes = layoutFeatures();
  const trunk = `M ${CX} ${TRUNK_TOP} L ${CX} ${nodes[nodes.length - 1].y}`;

  return (
    <ScaledBoard width={BOARD_W} height={BOARD_H} className="mx-auto w-full">
      <div className="relative" style={{ width: BOARD_W, height: BOARD_H }}>
        <svg
          className="pointer-events-none absolute inset-0"
          width={BOARD_W}
          height={BOARD_H}
          viewBox={`0 0 ${BOARD_W} ${BOARD_H}`}
          aria-hidden
        >
          {[trunk, ...nodes.map((node) => node.branch)].map((d, index) => (
            <path
              key={d}
              className="pricing-string-line"
              d={d}
              pathLength={1}
              style={{ animationDelay: `${index * 70}ms` }}
            />
          ))}
          <circle cx={CX} cy={TRUNK_TOP} r="3" fill="#5c6168" />
        </svg>

        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {nodes.map((node) => (
            <span
              key={node.label}
              className="pricing-bead"
              style={{
                offsetPath: `path("${node.travel}")`,
                animationDelay: `${-node.index * 0.62}s`,
              }}
            />
          ))}
        </div>

        <p
          className="absolute z-[1] -translate-x-1/2 whitespace-nowrap rounded-2xl bg-white px-3.5 py-1.5 text-neutral-800 shadow-xs ring-1 ring-black/5"
          style={{ left: CX, top: 0 }}
        >
          <strong className="font-display text-[18px] font-semibold leading-none tracking-tight">{price}</strong>
          <span className="ml-1.5 text-[13px] font-semibold text-ink-muted">{unit}</span>
        </p>

        <ul className="absolute inset-0" aria-label="What a seat includes">
          {nodes.map((node) => {
            const trooper = getTrooper(node.handle);
            const wraps = node.label.length > 22;
            return (
              <li
                key={node.label}
                className="absolute z-[1]"
                style={
                  node.side === 'right'
                    ? { left: node.x + 10, top: node.elbow, transform: 'translateY(-50%)' }
                    : { right: BOARD_W - node.x + 10, top: node.elbow, transform: 'translateY(-50%)' }
                }
              >
                <div
                  className={`pricing-chip-in flex items-center gap-2 ${node.side === 'left' ? 'flex-row-reverse' : ''}`}
                  style={{ animationDelay: `${180 + node.index * 80}ms` }}
                >
                  <span
                    className={`chip px-2.5 py-1.5 text-[13px] font-bold leading-tight text-ink ${wraps ? 'max-w-[8rem] whitespace-normal' : 'whitespace-nowrap'}`}
                  >
                    {node.label}
                  </span>
                  {trooper ? (
                    <span className="relative z-[1] shrink-0 overflow-visible" style={{ width: AVATAR, height: AVATAR }}>
                      <Sparkles seed={node.index} />
                      <span className="grid h-full w-full place-items-center">
                        <TrooperAvatar
                          trooper={trooper}
                          size={AVATAR}
                          live
                          cycle
                          fit
                          label={`${trooper.name} ${node.label}`}
                        />
                      </span>
                      <FeatureProp kind={node.prop} side={node.side} color={trooper.accent} />
                    </span>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </ScaledBoard>
  );
}

function OfferCopy({
  titleAs,
  showFullPricingLink,
  onScene,
}: {
  titleAs: 'h1' | 'h2';
  showFullPricingLink: boolean;
  onScene: boolean;
}) {
  const Title = titleAs;
  const price = formatUsd(PRICING_USD.seatMonthly);

  const copy = (
    <>
      <p className="kicker">Trooper workspace</p>
      <Title className="text-balance font-display text-ink">One seat per person.</Title>
      <div className="pricing-ask-offer">
        <p className="pricing-ask-price" data-testid="plan-price">
          <span className="pricing-ask-amount font-display">{price}</span>
          <span className="pricing-ask-unit">per human / mo</span>
          <span className="pricing-ask-trial">7-day free trial</span>
        </p>
      </div>
      <p className="pricing-ask-lede">Your team. Your agents. One workspace.</p>
      <ul className="pricing-ask-gets" aria-label="What a seat includes">
        <li>
          <Check aria-hidden />
          <span>{SEAT_INCLUDES[0]}</span>
        </li>
        <li>
          <Check aria-hidden />
          <span>Recharge credits, or bring your own keys.</span>
        </li>
        <li>
          <Check aria-hidden />
          <span className="inline-flex flex-wrap items-center gap-x-1">
            Use your existing <KeyMark name="Claude" src="/images/providers/claude.svg" /> and
            <KeyMark name="ChatGPT" src="/images/providers/openai.svg" /> subscription.
          </span>
        </li>
        <li>
          <Check aria-hidden />
          <span>{SEAT_INCLUDES[3]}</span>
        </li>
      </ul>
      <div className="pricing-ask-cta">
        <PixelButton
          href="https://app.trooper.so"
          external
          size="md"
          tone="dark"
          className="w-full"
          icon={<ArrowRight className="h-4 w-4" aria-hidden />}
        >
          Start a workspace
        </PixelButton>
        {showFullPricingLink ? (
          <p className="mt-4 text-sm text-ink-muted">
            <Link href="/pricing" className="link-mono">
              How a seat works
            </Link>
          </p>
        ) : null}
      </div>
    </>
  );

  if (!onScene) {
    return <div className="pricing-ask max-w-xl">{copy}</div>;
  }

  return <article className="pricing-ask card w-full shadow-[0_24px_50px_-28px_rgba(8,20,12,0.45)]">{copy}</article>;
}

function SelfInstallCard() {
  return (
    <article className="pricing-lifetime">
      <div className="relative z-[1] flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="pricing-lifetime-flag">Limited time only</p>
          <p className="pricing-lifetime-title font-display">Self install</p>
          <p className="pricing-lifetime-note">Lifetime, on a machine you own. 30-day money-back guarantee.</p>
        </div>
        <p className="pricing-lifetime-price">
          <span className="font-display">{formatUsd(PRICING_USD.selfInstallLifetime)}</span>
          <span>one time</span>
        </p>
      </div>
      <div className="relative z-[1] mt-3">
        <PixelButton
          href="/self-host"
          size="sm"
          tone="light"
          className="w-full"
          icon={<ArrowRight className="h-3.5 w-3.5" aria-hidden />}
        >
          Install Trooper
        </PixelButton>
      </div>
    </article>
  );
}

export default function SeatStage({
  titleAs = 'h2',
  showFullPricingLink = false,
  scene = false,
  bleed = false,
}: {
  titleAs?: 'h1' | 'h2';
  showFullPricingLink?: boolean;
  /** Offer card and strings sitting on the dusk field. */
  scene?: boolean;
  /** Full-bleed under the site header. Pricing page only. */
  bleed?: boolean;
}) {
  const stage = (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:items-center lg:gap-x-4">
      <div className="flex w-full min-w-0 flex-col gap-2.5">
        <SelfInstallCard />
        <OfferCopy titleAs={titleAs} showFullPricingLink={showFullPricingLink} onScene={scene} />
      </div>
      <SeatStrings price={formatUsd(PRICING_USD.seatMonthly)} unit="per human / mo" />
    </div>
  );

  if (!scene) return stage;

  if (!bleed) return stage;

  return (
    <section className="pricing-hero site-header-clear">
      <div className="rail relative">
        <div className="relative z-10 py-8 sm:py-10 lg:py-12">{stage}</div>
      </div>
    </section>
  );
}
