import { useEffect, useState } from 'react'

/** Same catalog as the blob runtime — portraits play every key. */
export const PORTRAIT_ANIMATIONS = [
  'sleeping',
  'waking',
  'idle',
  'listening',
  'thinking',
  'searching',
  'working',
  'excited',
  'bored',
  'suspicious',
  'angry',
  'drowsy',
  'happy',
  'curious',
  'confused',
  'surprised',
  'proud',
  'shy',
  'sad',
  'laughing',
  'scared',
  'playful',
  'celebrate',
] as const

export type PortraitAnimation = (typeof PORTRAIT_ANIMATIONS)[number]

export type PortraitPose = {
  headX: number
  headY: number
  headZ: number
  lookX: number
  lookY: number
  lid: number
  wink: number
  eyeScale: number
  bounce: number
  squash: number
}

export type HeadLook = { x: number; y: number }

const REST: PortraitPose = {
  headX: 0,
  headY: 0,
  headZ: 0,
  lookX: 0,
  lookY: 0,
  lid: 0,
  wink: 0,
  eyeScale: 1,
  bounce: 0,
  squash: 1,
}

const TARGETS: Record<string, Partial<PortraitPose>> = {
  sleeping: { headX: 14, lid: 1, bounce: 5, squash: 0.97 },
  waking: { headX: 7, lid: 0.42, lookY: 0.15 },
  idle: {},
  listening: { headZ: -9, lookX: 0.45 },
  thinking: { headZ: 11, lookX: 0.28, lookY: -0.48 },
  searching: { lookX: 0.55, lookY: -0.12, headY: 8 },
  working: { headX: -7, lookY: 0.42, lid: 0.08 },
  excited: { bounce: -5, eyeScale: 1.1, squash: 1.03 },
  bored: { headZ: -7, lookX: -0.55, lid: 0.38, squash: 0.98 },
  suspicious: { lookX: 0.62, lid: 0.22, eyeScale: 0.9, headY: 6 },
  angry: { headX: -5, lid: 0.3, eyeScale: 0.84, squash: 0.96 },
  drowsy: { headX: 9, lid: 0.58, bounce: 3 },
  happy: { lid: 0.2, squash: 0.97, bounce: -1 },
  curious: { lookY: -0.5, eyeScale: 1.14, headZ: -4 },
  confused: { headZ: 16, lookX: -0.22, lookY: -0.1 },
  surprised: { headX: -9, eyeScale: 1.28, lid: 0 },
  proud: { headX: -11, lookY: -0.12, squash: 1.02 },
  shy: { headZ: 10, lookX: 0.22, lookY: 0.52, lid: 0.16 },
  sad: { headX: 9, lookY: 0.58, lid: 0.28, squash: 0.98 },
  laughing: { lid: 0.72, bounce: -3, squash: 0.93, headZ: -4 },
  scared: { eyeScale: 1.32, lookY: -0.18, squash: 1.04 },
  playful: { lookX: 0.5, wink: 0.85, headZ: -8 },
  celebrate: { bounce: -7, eyeScale: 1.12, squash: 1.05, headZ: -6 },
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

export function targetPose(animation: string): PortraitPose {
  const patch = TARGETS[animation] ?? {}
  return { ...REST, ...patch }
}

function blinkEnvelope(t: number) {
  // Blink about every 3.4s, 140ms close.
  const cycle = ((t * 1000) % 3400) / 3400
  if (cycle > 0.94 && cycle < 0.98) {
    const local = (cycle - 0.94) / 0.04
    return local < 0.5 ? local * 2 : (1 - local) * 2
  }
  return 0
}

function wave(t: number, hz: number, amp: number) {
  return Math.sin(t * Math.PI * 2 * hz) * amp
}

/** Layer ambient life (blink, saccades, bob) on a target pose. */
export function livePose(animation: string, timeSec: number, look: HeadLook): PortraitPose {
  const base = targetPose(animation)
  const searching = animation === 'searching'
  const playful = animation === 'playful'
  const excited = animation === 'excited' || animation === 'celebrate' || animation === 'laughing'
  const idleish = animation === 'idle' || animation === 'listening' || animation === 'working'

  const saccadeX = searching
    ? wave(timeSec, 0.7, 0.7)
    : playful
      ? wave(timeSec, 0.55, 0.45)
      : idleish
        ? wave(timeSec, 0.17, 0.12)
        : 0
  const saccadeY = searching ? wave(timeSec + 0.4, 0.45, 0.22) : idleish ? wave(timeSec, 0.13, 0.06) : 0

  const bob = excited
    ? Math.abs(wave(timeSec, 1.6, 4))
    : idleish
      ? wave(timeSec, 0.35, 1.4)
      : 0

  const blink = animation === 'sleeping' ? 0 : blinkEnvelope(timeSec)
  const lid = Math.max(base.lid, blink)

  return {
    headX: base.headX + look.x + wave(timeSec, 0.11, idleish ? 1.2 : 0.4),
    headY: base.headY + look.y + (searching ? wave(timeSec, 0.35, 10) : 0),
    headZ: base.headZ + wave(timeSec, 0.09, idleish ? 1.4 : 0.3),
    lookX: clamp01((base.lookX + saccadeX + look.y * 0.012 + 1) / 2) * 2 - 1,
    lookY: clamp01((base.lookY + saccadeY - look.x * 0.012 + 1) / 2) * 2 - 1,
    lid,
    wink: base.wink,
    eyeScale: base.eyeScale,
    bounce: base.bounce + bob,
    squash: base.squash,
  }
}

export function freezePose(animation: string, look: HeadLook): PortraitPose {
  const base = targetPose(animation)
  return {
    ...base,
    headX: base.headX + look.x,
    headY: base.headY + look.y,
    lookX: clamp01((base.lookX + look.y * 0.012 + 1) / 2) * 2 - 1,
    lookY: clamp01((base.lookY - look.x * 0.012 + 1) / 2) * 2 - 1,
  }
}

export function usePortraitPose(
  animation: string,
  live: boolean,
  look: HeadLook,
  reduceMotion: boolean,
) {
  const [pose, setPose] = useState<PortraitPose>(() => freezePose(animation, look))

  useEffect(() => {
    if (!live || reduceMotion) {
      setPose(freezePose(animation, look))
      return
    }
    let raf = 0
    const started = performance.now()
    let current = freezePose(animation, look)

    const tick = (now: number) => {
      const target = livePose(animation, (now - started) / 1000, look)
      current = {
        headX: lerp(current.headX, target.headX, 0.18),
        headY: lerp(current.headY, target.headY, 0.18),
        headZ: lerp(current.headZ, target.headZ, 0.16),
        lookX: lerp(current.lookX, target.lookX, 0.22),
        lookY: lerp(current.lookY, target.lookY, 0.22),
        lid: lerp(current.lid, target.lid, 0.35),
        wink: lerp(current.wink, target.wink, 0.28),
        eyeScale: lerp(current.eyeScale, target.eyeScale, 0.2),
        bounce: lerp(current.bounce, target.bounce, 0.16),
        squash: lerp(current.squash, target.squash, 0.16),
      }
      setPose({ ...current })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [animation, live, look.x, look.y, reduceMotion])

  return pose
}
