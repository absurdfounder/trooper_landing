'use client'

import { createElement, useEffect, useMemo, useRef, useState } from 'react'
import { Avatar as BsAvatar } from '@bible-strong/avatar-react'
import { useInView } from 'framer-motion'
import '@bible-strong/avatar-react/styles.css'

import { getTrooperAvatar } from '@/lib/avatars'
import type { Trooper } from '@/lib/troopers'
import TrooperMark from '@/components/ui/TrooperMark'

type TrooperAvatarProps = {
  trooper: Trooper
  size?: number
  className?: string
  /**
   * When true, mounts the procedural avatar and plays only while this
   * element is on screen. Default is the static SVG mark — cheap, no RAF.
   */
  live?: boolean
  /** Animation key used only when `live` and in view. */
  animation?: string
  /**
   * Walk a shuffled deck of expression-and-head timelines, then reshuffle.
   * Each mount gets its own order, so a row of agents never moves in sync.
   */
  cycle?: boolean
  label?: string
  /** Override the definition's body and eye fills. */
  colors?: { body: string; eyes: string }
  /** Scale the body so the cast reads at one size, keeping each character's colors. */
  fit?: boolean
}

const MOTIONS = [
  'listening',
  'thinking',
  'searching',
  'working',
  'excited',
  'happy',
  'curious',
  'confused',
  'surprised',
  'proud',
  'playful',
  'laughing',
  'celebrate',
  'idle',
] as const

function paintAvatar(
  definition: unknown,
  colors?: { body: string; eyes: string },
  fit?: boolean,
) {
  if (!definition || (!colors && !fit)) return definition
  const def = definition as {
    colors?: { body?: string; eyes?: string }
    body?: { primary?: { width?: number; height?: number; depth?: number } }
  }
  const primary = def.body?.primary
  let body = def.body
  if (fit && primary?.width && primary.height) {
    const max = Math.max(primary.width, primary.height, primary.depth ?? primary.width)
    const scale = 220 / max
    body = {
      ...def.body,
      primary: {
        ...primary,
        width: primary.width * scale,
        height: primary.height * scale,
        depth: (primary.depth ?? primary.width) * scale,
      },
    }
  }
  return {
    ...def,
    body,
    ...(colors ? { colors: { ...def.colors, body: colors.body, eyes: colors.eyes } } : {}),
  }
}

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

/**
 * Cast identity.
 *
 * Default: static SVG snapshot from the character builder (`/images/cast/*.svg`)
 * — no RAF, low memory. `live`: procedural avatar only while in view.
 */
export default function TrooperAvatar({
  trooper,
  size = 40,
  className = '',
  live = false,
  animation = 'idle',
  cycle = false,
  label,
  colors,
  fit = false,
}: TrooperAvatarProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const playerRef = useRef<{ play: (animation: string) => void }>(null)
  const opening = useRef<string | null>(null)
  if (cycle && opening.current === null) opening.current = shuffle(MOTIONS)[0]
  const inView = useInView(ref, { amount: 0.4, once: live ? undefined : true })
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    if (!live) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [live])

  const source = getTrooperAvatar(trooper.handle)
  const definition = useMemo(
    () => paintAvatar(source, colors, fit),
    [source, colors?.body, colors?.eyes, fit],
  )
  const shouldAnimate = live && !!definition && inView && !reduceMotion

  useEffect(() => {
    if (!cycle || !shouldAnimate) return
    let deck = shuffle(MOTIONS)
    let cursor = 0
    let last = opening.current ?? ''
    let timer = 0
    const step = () => {
      if (cursor >= deck.length) {
        const fresh = shuffle(MOTIONS)
        if (fresh[0] === last) fresh.push(fresh.shift() as (typeof MOTIONS)[number])
        deck = fresh
        cursor = 0
      }
      const motion = deck[cursor]
      cursor += 1
      last = motion
      playerRef.current?.play(motion)
      timer = window.setTimeout(step, 2800 + Math.random() * 3600)
    }
    timer = window.setTimeout(step, 500 + Math.random() * 2200)
    return () => window.clearTimeout(timer)
  }, [cycle, shouldAnimate])

  if (!shouldAnimate) {
    return (
      <span ref={ref} className={`inline-flex shrink-0 ${className}`}>
        <TrooperMark trooper={trooper} size={size} />
      </span>
    )
  }

  return (
    <span
      ref={ref}
      className={`inline-flex shrink-0 items-center justify-center overflow-visible ${className}`}
      style={{ width: size, height: size }}
    >
      {createElement(BsAvatar as never, {
        key: cycle ? trooper.handle : `${trooper.handle}-${animation}`,
        ref: cycle ? playerRef : undefined,
        definition,
        defaultAnimation: cycle ? opening.current : animation,
        size,
        ariaLabel: label ?? `${trooper.name} avatar`,
      })}
    </span>
  )
}
