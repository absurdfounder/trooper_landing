'use client';

import PixelButton from '@/components/ui/PixelButton';
import TrooperMark from '@/components/ui/TrooperMark';
import { TROOPERS } from '@/lib/troopers';
import { ArrowRight } from 'lucide-react';

const constellation = [
  { left: '9%', top: '57%', size: 62, delay: '0ms' },
  { left: '29%', top: '34%', size: 76, delay: '240ms' },
  { left: '51%', top: '62%', size: 92, delay: '520ms' },
  { left: '73%', top: '33%', size: 78, delay: '160ms' },
  { left: '92%', top: '56%', size: 64, delay: '400ms' },
];

/** A final, human-scale invitation before the site footer. */
export default function Newsletter() {
  return (
    <section aria-labelledby="team-cta-title" className="py-14 sm:py-18 lg:py-24">
      <div className="flex flex-col-reverse items-start gap-8 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-16">
        <div className="max-w-xl md:w-[40%] md:shrink-0 md:py-8">
          <p className="kicker mb-5">Make room for the team</p>
          <h2
            id="team-cta-title"
            className="max-w-[12ch] text-[2.65rem] leading-[0.98] tracking-[-0.055em] text-ink sm:text-5xl xl:text-[3.75rem]"
          >
            Add Troopers to your team.
          </h2>
          <p className="mt-5 max-w-[34rem] text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
            Hand Troopers a task from Slack, Linear, or the app. They use your tools and company
            context, then bring the work back ready for review.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PixelButton
              href="https://app.trooper.so?ref=cta"
              external
              size="lg"
              tone="dark"
              icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
            >
              Get started
            </PixelButton>
            <PixelButton href="/contact-us#demo" size="lg" variant="outline" tone="light">
              Book a demo
            </PixelButton>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative isolate mx-auto h-[15rem] w-full max-w-[40rem] sm:h-[19rem] md:min-w-0 md:flex-1 md:h-[22rem] lg:h-[25rem]"
        >
          <div
            className="absolute inset-[8%] -z-10 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(107,207,142,.19), rgba(126,190,240,.12) 43%, rgba(240,160,188,.08) 66%, transparent 78%)',
            }}
          />

          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 1000 450"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="team-cta-path" x1="90" y1="225" x2="920" y2="225" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7ebef0" stopOpacity=".15" />
                <stop offset=".48" stopColor="#6bcf8e" stopOpacity=".5" />
                <stop offset="1" stopColor="#f0a0bc" stopOpacity=".2" />
              </linearGradient>
            </defs>
            <path
              d="M90 255C164 255 209 143 290 153C370 163 425 278 510 279C600 280 648 137 732 147C811 156 853 250 920 252"
              stroke="url(#team-cta-path)"
              strokeWidth="2"
              strokeDasharray="3 11"
              strokeLinecap="round"
            />
            <path
              d="M90 255C164 255 209 143 290 153C370 163 425 278 510 279C600 280 648 137 732 147C811 156 853 250 920 252"
              stroke="url(#team-cta-path)"
              strokeWidth="30"
              strokeLinecap="round"
              opacity=".09"
            />
            <circle cx="90" cy="255" r="4" fill="#7ebef0" fillOpacity=".55" />
            <circle cx="290" cy="153" r="4" fill="#6bcf8e" fillOpacity=".6" />
            <circle cx="510" cy="279" r="5" fill="#f0b45c" fillOpacity=".7" />
            <circle cx="732" cy="147" r="4" fill="#b49aef" fillOpacity=".6" />
            <circle cx="920" cy="252" r="4" fill="#f0a0bc" fillOpacity=".55" />
          </svg>

          {constellation.map((point, index) => {
            const trooper = TROOPERS[index];

            return (
              <span
                key={trooper.handle}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: point.left, top: point.top }}
              >
                <span
                  className="relative block motion-safe:animate-mark-float"
                  style={{ animationDelay: point.delay }}
                >
                  <span
                    className="absolute inset-[-28%] -z-10 rounded-full blur-xl"
                    style={{ background: `radial-gradient(circle, ${trooper.tint} 0%, transparent 72%)` }}
                  />
                  <TrooperMark
                    trooper={trooper}
                    size={point.size}
                    className="drop-shadow-[0_9px_12px_rgba(35,45,38,0.16)]"
                  />
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
