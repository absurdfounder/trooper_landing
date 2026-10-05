'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import type { Voice } from '@/lib/voices';

const ease = [0.22, 1, 0.36, 1] as const;

type VoicesSectionProps = {
  voices: Voice[];
  /** Dark band, or the same light tile ground as the rest of the homepage. */
  tone?: 'dark' | 'light';
};

function Attribution({
  voice,
  compact = false,
  tone = 'dark',
}: {
  voice: Voice;
  compact?: boolean;
  tone?: 'dark' | 'light';
}) {
  const light = tone === 'light';
  return (
    <figcaption
      className={
        compact
          ? `mt-5 flex items-center gap-3 border-t pt-5 ${light ? 'border-[var(--color-line)]' : 'border-white/15'}`
          : `mt-6 flex flex-col items-start gap-4 border-t pt-6 sm:mt-7 sm:flex-row sm:items-center sm:justify-between sm:pt-7 ${light ? 'border-[var(--color-line)]' : 'border-white/15'}`
      }
    >
      <div className="flex items-center gap-3 sm:gap-3.5">
        {voice.avatar ? (
          <div
            className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-full border sm:h-12 sm:w-12 ${light ? 'border-black/10 bg-[#f3f3f6]' : 'border-white/10 bg-white/5'}`}
          >
            <Image
              src={voice.avatar}
              alt={voice.author}
              fill
              className="object-cover object-top grayscale"
              sizes="48px"
            />
          </div>
        ) : (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-semibold sm:h-12 sm:w-12 ${light ? 'border-black/10 bg-[#f3f3f6] text-ink-muted' : 'border-white/10 bg-white/5 text-white/70'}`}
          >
            {voice.author.charAt(0)}
          </div>
        )}
        <div className="min-w-0 text-left">
          <p
            className={`font-display text-[15px] font-medium tracking-tight sm:text-base ${light ? 'text-ink' : 'text-white'}`}
          >
            {voice.author}
          </p>
          <p className={`mt-0.5 text-xs sm:text-sm ${light ? 'text-ink-muted' : 'text-white/45'}`}>
            {voice.title}
          </p>
        </div>
      </div>

      {!compact && (
        <Link
          href={voice.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={light ? 'group link-mono' : 'group link-mono-dark'}
        >
          <span>{voice.sourceLabel}</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      )}
    </figcaption>
  );
}

/**
 * Social proof quote band.
 *
 * Layout is a function of how many quotes exist, so adding one is a data-only
 * change in lib/voices.ts:
 *   1   → the featured single quote
 *   2   → two-up
 *   3+  → hairline-gap grid, which is count- and breakpoint-independent
 */
export default function VoicesSection({ voices, tone = 'dark' }: VoicesSectionProps) {
  const featured = voices[0];
  if (!featured) return null;
  const light = tone === 'light';

  return (
    <div className="py-9 sm:py-16 lg:py-20">
      {voices.length === 1 ? (
        <motion.figure
          className="relative"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <blockquote className="border-l-2 border-[var(--color-quote-gold)] pl-4 sm:pl-5 lg:max-w-3xl">
            <p
              className={`font-display text-[1.125rem] font-medium leading-[1.4] tracking-tight sm:text-xl lg:text-[1.65rem] lg:leading-[1.35] ${light ? 'text-ink' : 'text-white'}`}
            >
              {featured.quote}
            </p>
          </blockquote>

          <Attribution voice={featured} tone={tone} />
        </motion.figure>
      ) : (
        <div
          className={[
            'grid gap-4',
            voices.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
          ].join(' ')}
        >
          {voices.map((voice, index) => (
            <motion.figure
              key={voice.id}
              className={`flex flex-col justify-between border-t pt-5 sm:pt-6 ${light ? 'border-[var(--color-line)]' : 'border-white/15'}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.07, ease }}
              viewport={{ once: true, margin: '-20px' }}
            >
              <blockquote className="border-l-2 border-[var(--color-quote-gold)] pl-4">
                <p
                  className={`font-display text-base font-medium leading-[1.45] tracking-tight sm:text-lg ${light ? 'text-ink' : 'text-white'}`}
                >
                  {voice.quote}
                </p>
              </blockquote>
              <Attribution voice={voice} compact tone={tone} />
            </motion.figure>
          ))}
        </div>
      )}
    </div>
  );
}
