'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

import LiveAvatarPreview from '@/components/character-builder/LiveAvatarPreview'
import { assembleAvatarDefinition } from '@/lib/avatars/assembleAvatar'
import { getCharacterPreset } from '@/lib/avatars/characterCatalog'

/**
 * Soft blob silhouettes as letter-O replacements.
 * Colors match `text-neutral-200` so faces read as type, not stickers.
 */
const LETTER_INK = '#e5e5e5' // tailwind neutral-200
const LETTER_INK_DIM = '#d4d4d8' // slight second-O variation, still letter-family
const EYE_INK = '#a1a1aa' // neutral-400 — visible on light fills

const GLYPHS = [
  { presetId: 'strobi', body: LETTER_INK, animation: 'idle' },
  { presetId: 'cubee', body: LETTER_INK_DIM, animation: 'curious' },
] as const

/** Same faces as the footer, in the navbar wordmark colors. */
const NAV_GLYPHS = [
  { presetId: 'strobi', body: '#5bc2e5', animation: 'idle' },
  { presetId: 'cubee', body: '#69d8a6', animation: 'idle' },
] as const

const NAV_EYES = '#111316'

/** Drawn once at this size, then scaled with the type so refresh doesn't flash a bigger face. */
const FACE_PX = 128
const FACE_EM = 0.72

/** Static letter-colored O — off-screen / reduced-motion. */
function LetterOFallback({ size, body, eyes = EYE_INK }: { size: number; body: string; eyes?: string }) {
  const eye = Math.max(3, Math.round(size * 0.1))
  const gap = Math.max(3, Math.round(size * 0.12))

  return (
    <span
      className="relative inline-block rounded-full"
      style={{
        width: size,
        height: size,
        background: body,
      }}
    >
      <span
        className="absolute left-1/2 top-[52%] flex -translate-x-1/2 -translate-y-1/2"
        style={{ gap }}
      >
        <span
          className="rounded-full"
          style={{ width: eye, height: Math.round(eye * 1.25), background: eyes }}
        />
        <span
          className="rounded-full"
          style={{ width: eye, height: Math.round(eye * 1.25), background: eyes }}
        />
      </span>
    </span>
  )
}

function FooterLiveO({
  presetId,
  body,
  eyes = EYE_INK,
  animation,
  size,
  active,
}: {
  presetId: string
  body: string
  eyes?: string
  animation: string
  size: number
  active: boolean
}) {
  const definition = useMemo(() => {
    const preset = getCharacterPreset(presetId)
    if (!preset) return null
    return assembleAvatarDefinition({
      name: `footer-${presetId}`,
      preset,
      colors: { body, eyes },
    })
  }, [presetId, body, eyes])

  if (!definition || !active) {
    return <LetterOFallback size={size} body={body} eyes={eyes} />
  }

  return (
    <LiveAvatarPreview
      definition={definition}
      size={size}
      animation={animation}
      label=""
      className="!overflow-visible"
    />
  )
}

/**
 * Giant footer watermark: “tr” + two live letter-O faces + “per.”
 * Faces share the letter color (no bobbing) so they read as type, not stickers.
 */
export default function FooterWordmark({ variant = 'watermark' }: { variant?: 'watermark' | 'nav' }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const nearFooter = useInView(rootRef, { amount: 0.01, margin: '40% 0px' })
  const nav = variant === 'nav'
  const glyphs = nav ? NAV_GLYPHS : GLYPHS
  const eyes = nav ? NAV_EYES : EYE_INK
  const live = (nav || nearFooter) && !reduceMotion

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden={nav ? undefined : true}
      className={
        nav
          ? 'flex select-none items-center whitespace-nowrap font-display text-[1.65rem] font-medium lowercase leading-none tracking-[-0.045em] text-[#090909] sm:text-[1.85rem]'
          : 'pointer-events-none flex select-none items-baseline justify-center gap-[0.02em] overflow-x-hidden whitespace-nowrap font-display text-[clamp(2.75rem,16vw,11rem)] font-medium lowercase leading-none tracking-[-0.045em] text-neutral-200'
      }
    >
      <span>tr</span>
      <span
        className="inline-flex items-center"
        style={{ gap: nav ? '0.02em' : '0.06em', marginInline: '0.02em' }}
      >
        {glyphs.map((g, i) => (
          <span
            key={g.presetId}
            className="relative inline-flex shrink-0"
            style={{
              width: `${FACE_EM}em`,
              height: `${FACE_EM}em`,
              // Pull faces down onto the letter baseline (inline replaced boxes sit high otherwise).
              transform: nav ? 'translateY(0.06em)' : 'translateY(0.12em)',
              marginLeft: i === 1 ? '-0.1em' : 0,
              zIndex: glyphs.length - i,
            }}
          >
            <span
              className="absolute left-0 top-0 origin-top-left"
              style={{
                width: FACE_PX,
                height: FACE_PX,
                transform: `scale(calc(${FACE_EM}em / ${FACE_PX}px))`,
              }}
            >
              <FooterLiveO
                presetId={g.presetId}
                body={g.body}
                eyes={eyes}
                animation={g.animation}
                size={FACE_PX}
                active={live}
              />
            </span>
          </span>
        ))}
      </span>
      <span>{nav ? 'per' : 'per.'}</span>
    </div>
  )
}
