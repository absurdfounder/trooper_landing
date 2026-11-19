'use client';

import { useMemo, useState } from 'react';
import {
  BarChart3,
  Building2,
  Code2,
  Megaphone,
  Plus,
  Rocket,
  Sparkles,
} from 'lucide-react';
import Header from '@/components/ui/header';
import PixelButton from '@/components/ui/PixelButton';

const AFFILIATE_SIGNUP = 'https://trooper.lemonsqueezy.com/affiliates';

/** Cloud plan ($99/mo) × 30% commission, illustrative. */
const COMMISSION_PER_REFERRAL_MONTHLY = 29.7;
const SLIDER_MIN = 5;
const SLIDER_MAX = 500;

function formatMoney(value: number) {
  return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function sliderProgress(value: number) {
  return `${((value - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100}%`;
}

function EarningsCalculator() {
  const [referrals, setReferrals] = useState(SLIDER_MIN);
  const monthly = useMemo(
    () => Math.round(referrals * COMMISSION_PER_REFERRAL_MONTHLY),
    [referrals],
  );

  return (
    <div className="grid gap-8 rounded-md border border-[var(--color-line)] bg-white p-5 sm:p-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:p-9">
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <label
            htmlFor="referral-count"
            className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl"
          >
            Active referrals
          </label>
          <span className="font-mono text-sm tabular-nums text-ink-muted">
            {referrals} {referrals === 1 ? 'customer' : 'customers'}
          </span>
        </div>
        <input
          id="referral-count"
          type="range"
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          value={referrals}
          onChange={(event) => setReferrals(Number(event.target.value))}
          className="earnings-slider mt-7 w-full"
          style={{ '--slider-progress': sliderProgress(referrals) } as React.CSSProperties}
        />
        <div className="mt-3 flex items-baseline justify-between font-mono text-[11px] text-ink-faint">
          <span>{SLIDER_MIN} referrals</span>
          <span>{SLIDER_MAX} referrals</span>
        </div>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-ink-muted">
          Move the slider to estimate recurring commission from active referrals.
        </p>
      </div>

      <div className="grid gap-px overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2">
        <div className="bg-white p-5 sm:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
            Per month
          </p>
          <p className="mt-3 font-display text-4xl font-medium tabular-nums tracking-tight text-ink sm:text-5xl">
            ~${formatMoney(monthly)}
          </p>
        </div>
        <div className="bg-[#eff6f0] p-5 sm:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fern-700">
            Per year
          </p>
          <p className="mt-3 font-display text-4xl font-medium tabular-nums tracking-tight text-fern-700 sm:text-5xl">
            ~${formatMoney(monthly * 12)}
          </p>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-ink-faint lg:col-span-2">
        Illustrative estimate based on Cloud plan referrals at $99/month and 30% commission. Actual payouts vary by plan mix and customer retention.
      </p>
    </div>
  );
}

const FAQ_ITEMS = [
  {
    question: 'How much commission do I earn?',
    answer:
      'You earn 30% recurring commission on every paying customer you refer. You get paid every month for as long as they stay subscribed. There is no cap on earnings.',
  },
  {
    question: 'How and when do I get paid?',
    answer:
      'Payouts are handled through Lemon Squeezy. PayPal and most bank options start at a $50 minimum balance. Wise and some international bank transfers typically start at $200.',
  },
  {
    question: 'How do I track my referrals?',
    answer:
      'After signup you get an affiliate dashboard with clicks, sign-ups, conversions, and earnings in near real time.',
  },
  {
    question: 'Can I promote Trooper alongside other offers?',
    answer:
      'Yes. Many partners recommend Trooper next to newsletters, courses, and other SaaS tools.',
  },
  {
    question: 'Can I use paid ads to promote Trooper?',
    answer:
      'Check your affiliate terms in the dashboard before running paid traffic. We generally expect organic promotion — content, newsletters, communities, and direct recommendations.',
  },
  {
    question: 'How long does the cookie last?',
    answer:
      'The affiliate cookie lasts 30 days. If someone clicks your link and converts within that window, you receive credit.',
  },
  {
    question: 'I have another question.',
    answer: 'Email support@troopermail.com and we will get back to you as soon as we can.',
  },
];

const steps = [
  {
    title: 'Join the program',
    description:
      'Sign up for free in under a minute. You get a unique affiliate link and access to your dashboard.',
  },
  {
    title: 'Share your link',
    description:
      'Share Trooper in videos, blog posts, newsletters, or social posts. Reach founders, operators, and builders.',
  },
  {
    title: 'Get paid every month',
    description:
      'Earn 30% recurring commission on every paying customer you refer, for as long as they stay subscribed.',
  },
];

const stats = [
  { value: '30%', label: 'Recurring commission' },
  { value: '30 days', label: 'Cookie duration' },
  { value: 'Lifetime', label: 'Commission duration' },
];

const audiences = [
  {
    icon: Rocket,
    title: 'Founders & startup operators',
    description:
      'For people shipping products, running lean teams, and looking for AI teammates that do real work.',
  },
  {
    icon: Code2,
    title: 'Developers & technical creators',
    description:
      'Show how Troopers work across GitHub, code, shell commands, and everyday development workflows.',
  },
  {
    icon: Megaphone,
    title: 'YouTubers & newsletter writers',
    description:
      'Give your audience a useful demo: assign a task, watch the team work, and show the result.',
  },
  {
    icon: BarChart3,
    title: 'Operators & business storytellers',
    description:
      'Talk about research, reporting, inbox triage, and recurring work teams can hand off.',
  },
  {
    icon: Building2,
    title: 'Agencies & consultants',
    description:
      'Recommend Trooper to clients who want coding, research, and execution handled continuously.',
  },
  {
    icon: Sparkles,
    title: 'AI tool & workflow reviewers',
    description:
      'Introduce a multi-agent workforce with browser control, persistent memory, and real tool access.',
  },
];

const whyPromote = [
  {
    title: 'A product people use for real work',
    description:
      'Trooper helps teams hand off coding, research, email, and browser tasks instead of collecting another chat tool.',
  },
  {
    title: 'Recurring commissions',
    description:
      'When a referred customer stays subscribed, your commission continues with them.',
  },
  {
    title: 'Easy to show',
    description:
      'A task going from instruction to finished work gives your audience something concrete to see.',
  },
  {
    title: 'Clear reporting',
    description:
      'Use the partner dashboard to follow clicks, sign-ups, conversions, and payouts.',
  },
];

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl sm:mb-10">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">{label}</p>
      <h2 className="mt-3 font-display text-3xl font-medium leading-tight tracking-[-0.035em] text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-muted sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function AffiliateClient() {
  return (
    <>
      <Header />
      <main className="bg-canvas">
        <section className="border-t border-[var(--color-line)]">
          <div className="rail py-10 sm:py-16 lg:py-20">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
              PARTNER PROGRAM
            </p>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
              <div className="max-w-3xl">
                <h1 className="font-display text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
                  Earn 30% recurring.
                  <br />
                  <span className="text-ink-muted">Every month they stay.</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:mt-6 sm:text-lg">
                  Refer customers to Trooper and earn commission for as long as they stay subscribed. Free to join, with no cap on referrals.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <PixelButton href={AFFILIATE_SIGNUP} external size="lg" tone="dark">
                    Become an affiliate
                  </PixelButton>
                  <a
                    href="#how-it-works"
                    className="text-sm font-medium text-ink underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    See how it works
                  </a>
                </div>
              </div>

              <div className="rounded-md border border-[var(--color-line)] bg-white p-6 sm:p-8 lg:p-9">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                  Your commission
                </p>
                <p className="mt-5 font-display text-7xl font-medium leading-none tracking-[-0.06em] text-fern-700 sm:text-8xl">
                  30%
                </p>
                <p className="mt-3 text-base text-ink-muted">Recurring, paid monthly</p>
                <div className="mt-7 flex flex-wrap gap-2 border-t border-[var(--color-line)] pt-5">
                  <span className="rounded-sm border border-[var(--color-line)] px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                    30-day cookie
                  </span>
                  <span className="rounded-sm border border-[var(--color-line)] px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                    No earning cap
                  </span>
                  <span className="rounded-sm border border-[var(--color-line)] px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                    Free to join
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 border-y border-[var(--color-line)] sm:mt-14 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex items-center justify-between gap-4 py-4 sm:block sm:py-5 ${
                    index ? 'border-t border-[var(--color-line)] sm:border-l sm:border-t-0 sm:pl-6 lg:pl-8' : ''
                  }`}
                >
                  <span className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
                    {stat.value}
                  </span>
                  <span className="text-sm text-ink-muted sm:mt-1 sm:block">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="earnings-calculator" className="border-t border-[var(--color-line)] bg-white">
          <div className="rail py-10 sm:py-16 lg:py-20">
            <SectionHeading
              label="Earnings calculator"
              title="See what recurring can add up to."
              description="Estimate your monthly and yearly commission as your referrals grow."
            />
            <EarningsCalculator />
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 border-t border-[var(--color-line)]">
          <div className="rail py-10 sm:py-16 lg:py-20">
            <SectionHeading label="How it works" title="Three steps to start earning." />
            <div className="grid gap-3 md:grid-cols-3 md:gap-4">
              {steps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-md border border-[var(--color-line)] bg-white p-5 sm:p-6"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-fern-700">
                    Step 0{index + 1}
                  </p>
                  <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-[15px]">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--color-line)] bg-white">
          <div className="rail py-10 sm:py-16 lg:py-20">
            <SectionHeading
              label="Who it’s for"
              title="Share Trooper with people who build and run things."
              description="The best recommendations come from creators and operators who can show how AI teammates fit into real work."
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {audiences.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-md border border-[var(--color-line)] bg-canvas p-5 sm:p-6"
                  >
                    <div className="flex size-10 items-center justify-center rounded-md border border-[var(--color-line)] bg-white text-fern-700">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-medium leading-snug tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-[15px]">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--color-line)]">
          <div className="rail py-10 sm:py-16 lg:py-20">
            <SectionHeading label="Why Trooper" title="A product you can show, not just describe." />
            <div className="grid gap-x-8 md:grid-cols-2 md:gap-x-12">
              {whyPromote.map((item) => (
                <article
                  key={item.title}
                  className="border-t border-[var(--color-line)] py-5 sm:py-6"
                >
                  <h3 className="font-display text-lg font-medium tracking-tight text-ink sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-[15px]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--color-line)] bg-white">
          <div className="rail py-10 sm:py-16 lg:py-20">
            <SectionHeading label="FAQ" title="A few things you might be wondering." />
            <div className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-display text-base font-medium text-ink marker:hidden sm:py-6 sm:text-lg">
                    {item.question}
                    <Plus
                      aria-hidden="true"
                      className="size-5 shrink-0 text-ink-muted transition-transform group-open:rotate-45"
                    />
                  </summary>
                  <p className="max-w-3xl pb-5 pr-8 text-sm leading-relaxed text-ink-muted sm:pb-6 sm:text-[15px]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--color-line)]">
          <div className="rail py-10 sm:py-16 lg:py-20">
            <div className="flex flex-col gap-7 rounded-md bg-ink p-6 text-white sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
              <div className="max-w-2xl">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/55">
                  Free to join
                </p>
                <h2 className="mt-3 font-display text-3xl font-medium leading-tight tracking-[-0.035em] sm:text-4xl">
                  Ready to share Trooper?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                  Get your referral link, follow your results, and earn recurring commission.
                </p>
              </div>
              <PixelButton
                href={AFFILIATE_SIGNUP}
                external
                size="lg"
                tone="brand"
                className="shrink-0"
              >
                Become an affiliate
              </PixelButton>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
