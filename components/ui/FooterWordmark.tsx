'use client'

import { createElement, useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Avatar as BsAvatar, type AvatarController } from '@bible-strong/avatar-react'

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
  { presetId: 'strobi', body: LETTER_INK },
  { presetId: 'cubee', body: LETTER_INK_DIM },
] as const

/** Same faces as the footer, in the navbar wordmark colors. */
const NAV_GLYPHS = [
  { presetId: 'strobi', body: '#5bc2e5' },
  { presetId: 'cubee', body: '#69d8a6' },
] as const

const NAV_EYES = '#111316'

/** Drawn once at this size, then scaled with the type so refresh doesn't flash a bigger face. */
const FACE_PX = 128
const FACE_EM = 0.72

function shuffle<T>(items: readonly T[]) {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const held = next[i]
    next[i] = next[j]
    next[j] = held
  }
  return next
}

type LogoCue = { expression: string; animation: string; durationMs: number }

function buildLogoCycle(
  definition: ReturnType<typeof assembleAvatarDefinition>,
  characterIndex: number,
  cycleNumber: number
): LogoCue[] {
  const animations = shuffle(definition.animationOrder.map((key) => {
    const animation = definition.animations[key] as {
      steps?: { expression: string; transitionMs: number; holdMs: number }[]
    }
    const steps = animation?.steps ?? []
    const durationMs = steps.reduce(
      (duration, step) => duration + (step.transitionMs ?? 0) + (step.holdMs ?? 0),
      0
    )

    return { key, durationMs: Math.min(Math.max(2800, durationMs + 500), 4200) }
  }))
  const firstAnimation = definition.animationOrder[(characterIndex + cycleNumber + 7) % animations.length]
  const firstAnimationIndex = animations.findIndex((animation) => animation.key === firstAnimation)
  if (firstAnimationIndex > 0) {
    [animations[0], animations[firstAnimationIndex]] = [animations[firstAnimationIndex], animations[0]]
  }

  const expressions = shuffle(definition.expressionOrder)
  const firstExpression = definition.expressionOrder[
    (characterIndex + cycleNumber + 11) % expressions.length
  ]
  const firstExpressionIndex = expressions.indexOf(firstExpression)
  if (firstExpressionIndex > 0) {
    [expressions[0], expressions[firstExpressionIndex]] = [expressions[firstExpressionIndex], expressions[0]]
  }

  return expressions.map((expression, index) => {
    const animation = animations[index % animations.length]
    return { expression, animation: animation.key, durationMs: animation.durationMs }
  })
}

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

function useLogoMotionAllowed() {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const syncVisibility = () => setPageVisible(!document.hidden)
    syncVisibility()
    document.addEventListener('visibilitychange', syncVisibility)
    return () => document.removeEventListener('visibilitychange', syncVisibility)
  }, [])

  return !reduceMotion && pageVisible
}

function FooterLiveO({
  presetId,
  body,
  eyes = EYE_INK,
  size,
  active,
  characterIndex,
}: {
  presetId: string
  body: string
  eyes?: string
  size: number
  active: boolean
  characterIndex: number
}) {
  const playerRef = useRef<AvatarController | null>(null)
  const definition = useMemo(() => {
    const preset = getCharacterPreset(presetId)
    if (!preset) return null
    return assembleAvatarDefinition({
      name: `footer-${presetId}`,
      preset,
      colors: { body, eyes },
    })
  }, [presetId, body, eyes])

  useEffect(() => {
    if (!active || !definition) return
    let cycleNumber = 0
    let deck = buildLogoCycle(definition, characterIndex, cycleNumber++)
    let cursor = 0
    let last: LogoCue | null = null
    let timer = 0
    const step = () => {
      if (cursor >= deck.length) {
        const fresh = buildLogoCycle(definition, characterIndex, cycleNumber++)
        if (
          last &&
          (fresh[0]?.expression === last.expression || fresh[0]?.animation === last.animation)
        ) {
          const replacement = fresh.findIndex((cue, index) =>
            index > 0 && cue.expression !== last?.expression && cue.animation !== last?.animation
          )
          if (replacement > 0) [fresh[0], fresh[replacement]] = [fresh[replacement], fresh[0]]
        }
        deck = fresh
        cursor = 0
      }
      const cue = deck[cursor]
      cursor += 1
      last = cue
      playerRef.current?.setExpression(cue.expression)
      timer = window.setTimeout(() => {
        playerRef.current?.play(cue.animation)
        timer = window.setTimeout(step, cue.durationMs + Math.random() * 600)
      }, 1500 + Math.random() * 300)
    }
    timer = window.setTimeout(step, 300 + characterIndex * 1300 + Math.random() * 500)
    return () => window.clearTimeout(timer)
  }, [active, characterIndex, definition])

  if (!definition || !active) {
    return <LetterOFallback size={size} body={body} eyes={eyes} />
  }

  return (
    <span className="inline-flex shrink-0 overflow-visible" style={{ width: size, height: size }}>
      {createElement(BsAvatar as never, {
        key: presetId,
        ref: playerRef,
        definition,
        defaultExpression:
          definition.expressionOrder[characterIndex % definition.expressionOrder.length] ?? 'neutral',
        size,
        ariaLabel: '',
      })}
    </span>
  )
}

/**
 * Giant footer watermark: “tr” + two live letter-O faces + “per.”
 * Faces share the letter color (no bobbing) so they read as type, not stickers.
 */
export default function FooterWordmark({ variant = 'watermark' }: { variant?: 'watermark' | 'nav' | 'nav-dark' }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const nearFooter = useInView(rootRef, { amount: 0.01, margin: '40% 0px' })
  const motionAllowed = useLogoMotionAllowed()
  const nav = variant !== 'watermark'
  const darkNav = variant === 'nav-dark'
  const glyphs = nav ? NAV_GLYPHS : GLYPHS
  const eyes = nav ? NAV_EYES : EYE_INK
  const live = (nav || nearFooter) && motionAllowed

  return (
    <div
      ref={rootRef}
      aria-hidden={nav ? undefined : true}
      className={
        nav
          ? `flex select-none items-center whitespace-nowrap font-display font-medium lowercase leading-none tracking-[-0.045em] ${darkNav ? 'text-[1.65rem] text-white sm:text-[1.85rem]' : 'text-[1.8rem] text-[#090909] sm:text-[2rem]'}`
          : 'pointer-events-none flex select-none items-center justify-center gap-[0.02em] overflow-x-hidden whitespace-nowrap font-display text-[clamp(2.75rem,16vw,11rem)] font-medium lowercase leading-none tracking-[-0.045em] text-neutral-200'
      }
    >
      <span>tr</span>
      <span
        className="inline-flex items-center"
        style={{ gap: '0.02em', marginInline: '0.02em' }}
      >
        {glyphs.map((g, i) => {
          const faceEm = nav ? FACE_EM : 0.62
          return (
          <span
            key={g.presetId}
            className="relative inline-flex shrink-0"
            style={{
              width: `${faceEm}em`,
              height: `${faceEm}em`,
              // Nav faces sit on the type. The giant watermark centers on the lowercase band.
              transform: nav ? 'translateY(0.06em)' : 'translateY(-0.01em)',
              marginLeft: i === 1 ? (nav ? '-0.1em' : '-0.04em') : 0,
              zIndex: glyphs.length - i,
            }}
          >
            <span
              className="absolute left-0 top-0 origin-top-left"
              style={{
                width: FACE_PX,
                height: FACE_PX,
                transform: `scale(calc(${faceEm}em / ${FACE_PX}px))`,
              }}
            >
              <FooterLiveO
                presetId={g.presetId}
                body={g.body}
                eyes={eyes}
                size={FACE_PX}
                active={live}
                characterIndex={i}
              />
            </span>
          </span>
          )
        })}
      </span>
      <span>{nav ? 'per' : 'per.'}</span>
    </div>
  )
}

/** Two live Trooper avatars, scaled to sit inline with the hero headline. */
export function TrooperHeroCharacters() {
  const rootRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(rootRef, { amount: 0.01, margin: '40% 0px' })
  const motionAllowed = useLogoMotionAllowed()
  const active = inView && motionAllowed

  return (
    <span ref={rootRef} className="trooper-hero-characters" aria-hidden="true">
      {NAV_GLYPHS.map((glyph, index) => (
        <span
          key={glyph.presetId}
          className="relative inline-flex shrink-0"
          style={{
            width: '0.46em',
            height: '0.46em',
            marginLeft: index === 1 ? '-0.09em' : 0,
            transform: 'translateY(0.025em)',
            zIndex: 2 - index,
          }}
        >
          <span
            className="absolute left-0 top-0 origin-top-left"
            style={{
              width: FACE_PX,
              height: FACE_PX,
              transform: `scale(calc(0.46em / ${FACE_PX}px))`,
            }}
          >
            <FooterLiveO
              presetId={glyph.presetId}
              body={glyph.body}
              eyes={NAV_EYES}
              size={FACE_PX}
              active={active}
              characterIndex={index}
            />
          </span>
        </span>
      ))}
    </span>
  )
}
