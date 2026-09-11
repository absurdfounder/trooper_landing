'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { TROOPERS } from '@/lib/troopers';
import TrooperLogo from '@/components/ui/TrooperLogo';
import TrooperMark from '@/components/ui/TrooperMark';
import PixelButton from '@/components/ui/PixelButton';

const ease = [0.22, 1, 0.36, 1] as const;

/** Cadu-style orbit: named troopers around the wordmark, not a grid of photos. */
const ORBIT: {
  handle: string;
  top: string;
  left?: string;
  right?: string;
  size: number;
  delay: number;
  rotate: number;
}[] = [
  { handle: 'rex', top: '8%', left: '8%', size: 92, delay: 0, rotate: -8 },
  { handle: 'nova', top: '10%', right: '10%', size: 68, delay: 0.12, rotate: 10 },
  { handle: 'scout', top: '42%', left: '3%', size: 108, delay: 0.18, rotate: -4 },
  { handle: 'pip', top: '38%', right: '4%', size: 84, delay: 0.08, rotate: 12 },
  { handle: 'wren', top: '72%', left: '14%', size: 76, delay: 0.22, rotate: -12 },
];

function trooperByHandle(handle: string) {
  return TROOPERS.find((t) => t.handle === handle) ?? TROOPERS[0];
}

/**
 * Homepage character splash — cream field, wordmark, floating cast.
 * Same energy as Cadu's Get Started screen, with Trooper's new silhouettes.
 */
export default function CastAtmosphereSection() {
  return (
    <section
      data-cast-atmosphere
      className="relative overflow-hidden border-y border-[var(--color-line)]"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 40%, #fffdf8 0%, #f6f1e6 55%, #efe8d8 100%)',
      }}
    >
      <div className="relative mx-auto min-h-[28rem] w-full max-w-[72rem] px-4 py-16 sm:min-h-[34rem] sm:px-6 sm:py-20 lg:min-h-[38rem] lg:py-24">
        {ORBIT.map((slot) => {
          const trooper = trooperByHandle(slot.handle);
          return (
            <motion.div
              key={slot.handle}
              className="pointer-events-none absolute hidden sm:block"
              style={{
                top: slot.top,
                left: slot.left,
                right: slot.right,
              }}
              initial={{ opacity: 0, scale: 0.82, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: slot.delay, ease }}
              viewport={{ once: true, margin: '-40px' }}
            >
              <div
                className="animate-mark-float"
                style={{ animationDelay: `${slot.delay * 1.4}s` }}
              >
                <div style={{ transform: `rotate(${slot.rotate}deg)` }}>
                  <TrooperMark trooper={trooper} size={slot.size} />
                </div>
              </div>
            </motion.div>
          );
        })}

        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="mb-8 flex justify-center gap-3 sm:hidden">
            {TROOPERS.map((trooper) => (
              <TrooperMark key={trooper.handle} trooper={trooper} size={48} />
            ))}
          </div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a7340]">
            Your machine, with a face
          </p>
          <TrooperLogo className="mt-5 h-10 w-auto sm:h-12" priority />
          <h2 className="mt-6 font-funneldisplay text-[1.65rem] leading-[1.15] tracking-tight text-ink sm:text-3xl md:text-4xl">
            A team that looks like a team.
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted sm:text-base">
            Rex, Nova, Scout, Pip, and Wren are the new Trooper characters — glossy,
            simple, and named. Build yours in the character studio.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PixelButton href="/characters" size="md" icon={<ArrowRight className="h-4 w-4" />}>
              Character builder
            </PixelButton>
            <Link
              href="https://app.trooper.so?ref=characters"
              className="inline-flex items-center gap-1.5 border-b border-transparent pb-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-current hover:text-ink sm:text-xs"
            >
              Hire your squad
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
