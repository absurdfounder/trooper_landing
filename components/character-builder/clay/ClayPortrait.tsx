'use client'

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

import { drawClayPortraitSvg } from '@/lib/avatars/drawClayPortrait'
import type { PortraitPreset } from '@/lib/avatars/portraitCatalog'
import { usePortraitPose, type HeadLook } from '@/lib/avatars/portraitPose'

const LOOK_LIMIT = 28

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export default function ClayPortrait({
  preset,
  size = 160,
  animation = 'idle',
  label,
  className = '',
  interactiveLook = false,
  liveMotion = true,
}: {
  preset: PortraitPreset
  size?: number
  animation?: string
  label?: string
  className?: string
  interactiveLook?: boolean
  liveMotion?: boolean
}) {
  const uid = useId().replace(/:/g, '')
  const [reduceMotion, setReduceMotion] = useState(false)
  const [look, setLook] = useState<HeadLook>({ x: 0, y: 0 })
  const dragRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    origin: HeadLook
  } | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    setLook({ x: 0, y: 0 })
  }, [preset.id])

  const pose = usePortraitPose(animation, liveMotion, look, reduceMotion)
  const height = Math.round(size * 1.28)
  const markup = drawClayPortraitSvg(preset, uid, pose)

  const onPointerDown = (e: ReactPointerEvent<HTMLSpanElement>) => {
    if (!interactiveLook || (e.pointerType === 'mouse' && e.button !== 0)) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origin: look,
    }
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLSpanElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    setLook({
      x: clamp(drag.origin.x - (e.clientY - drag.startY) * 0.16, -LOOK_LIMIT, LOOK_LIMIT),
      y: clamp(drag.origin.y + (e.clientX - drag.startX) * 0.2, -LOOK_LIMIT, LOOK_LIMIT),
    })
  }

  const onPointerUp = (e: ReactPointerEvent<HTMLSpanElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return
    dragRef.current = null
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  return (
    <span
      className={`inline-flex shrink-0 items-end justify-center overflow-visible ${
        interactiveLook ? 'cursor-grab touch-none active:cursor-grabbing' : ''
      } ${className}`}
      style={{ width: size, height, perspective: 820 }}
      onPointerDown={interactiveLook ? onPointerDown : undefined}
      onPointerMove={interactiveLook ? onPointerMove : undefined}
      onPointerUp={interactiveLook ? onPointerUp : undefined}
      onPointerCancel={interactiveLook ? onPointerUp : undefined}
      role="img"
      aria-label={
        interactiveLook
          ? `${label ?? preset.name}. Drag to look around.`
          : (label ?? preset.name)
      }
    >
      <span
        className="block h-full w-full"
        style={{
          transform: `translateY(${pose.bounce}px) rotateX(${pose.headX}deg) rotateY(${pose.headY}deg) rotateZ(${pose.headZ}deg) scaleY(${pose.squash})`,
          transformOrigin: '50% 38%',
          transformStyle: 'preserve-3d',
        }}
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    </span>
  )
}
