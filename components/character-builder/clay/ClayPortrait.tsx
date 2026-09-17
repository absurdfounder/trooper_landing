'use client'

import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'

import PortraitClothes from '@/components/character-builder/clay/PortraitClothes'
import PortraitHair from '@/components/character-builder/clay/PortraitHair'
import { mixHex } from '@/lib/avatars/bubblePalette'
import type { PortraitAccessory, PortraitPreset } from '@/lib/avatars/portraitCatalog'
import { usePortraitPose, type HeadLook } from '@/lib/avatars/portraitPose'

const LOOK_LIMIT = 28

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function GooglyEye({
  cx,
  cy,
  r,
  lookX,
  lookY,
  lid,
  scale,
  face,
  uid,
  side,
}: {
  cx: number
  cy: number
  r: number
  lookX: number
  lookY: number
  lid: number
  scale: number
  face: string
  uid: string
  side: 'left' | 'right'
}) {
  const pupilR = r * 0.46
  const maxLook = r * 0.28
  const px = cx + lookX * maxLook
  const py = cy + lookY * maxLook + r * 0.06
  const lidH = r * 2 * Math.min(1, Math.max(0, lid))

  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})`}>
      {/* Contact shadow on the clay face */}
      <ellipse
        cx={cx}
        cy={cy + r * 0.18}
        rx={r * 1.08}
        ry={r * 1.02}
        fill={mixHex(face, '#0a0a0a', 0.38)}
        opacity="0.45"
      />
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 1.04} fill={`url(#${uid}-eye)`} />
      <ellipse
        cx={cx - r * 0.22}
        cy={cy - r * 0.28}
        rx={r * 0.42}
        ry={r * 0.28}
        fill="#ffffff"
        opacity="0.55"
      />
      <circle cx={px} cy={py} r={pupilR} fill="#141414" />
      <circle cx={px + pupilR * 0.32} cy={py - pupilR * 0.38} r={pupilR * 0.28} fill="#ffffff" />
      <circle cx={px - pupilR * 0.22} cy={py + pupilR * 0.18} r={pupilR * 0.1} fill="#ffffff" opacity="0.45" />
      <clipPath id={`${uid}-lid-${side}`}>
        <ellipse cx={cx} cy={cy} rx={r} ry={r * 1.04} />
      </clipPath>
      <g clipPath={`url(#${uid}-lid-${side})`}>
        <rect
          x={cx - r}
          y={cy - r * 1.04}
          width={r * 2}
          height={lidH}
          fill={face}
        />
        {lid > 0.08 ? (
          <rect
            x={cx - r}
            y={cy - r * 1.04 + lidH - 3}
            width={r * 2}
            height="3"
            fill={mixHex(face, '#0a0a0a', 0.25)}
            opacity="0.5"
          />
        ) : null}
      </g>
    </g>
  )
}

function Accessories({ items }: { items: PortraitAccessory[] }) {
  return (
    <g>
      {items.includes('hoops') ? (
        <g fill="none" stroke="#d4b56a" strokeWidth="3.2">
          <ellipse cx="64" cy="128" rx="9" ry="12" />
          <ellipse cx="176" cy="128" rx="9" ry="12" />
        </g>
      ) : null}
      {items.includes('beads') ? (
        <g>
          {['#f2c6c2', '#f0d48a', '#a8d4c4', '#c7b6e8', '#f2c6c2', '#a8d4c4', '#f0d48a'].map(
            (c, i) => (
              <circle key={c + i} cx={90 + i * 10} cy={168 + Math.sin(i) * 2} r="5" fill={c} />
            ),
          )}
        </g>
      ) : null}
      {items.includes('necklace') ? (
        <g fill="none" stroke="#d4b56a" strokeWidth="1.8">
          <path d="M96 166 Q120 184 144 166" />
          <circle cx="120" cy="186" r="2.4" fill="#d4b56a" stroke="none" />
        </g>
      ) : null}
      {items.includes('headphones') ? (
        <g>
          <path
            d="M62 92 C62 38 178 38 178 92"
            fill="none"
            stroke="#f4f1ea"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <rect x="46" y="86" width="24" height="32" rx="11" fill="#f4f1ea" />
          <rect x="170" y="86" width="24" height="32" rx="11" fill="#f4f1ea" />
          <rect x="51" y="93" width="14" height="18" rx="6" fill="#e7e1d6" />
          <rect x="175" y="93" width="14" height="18" rx="6" fill="#e7e1d6" />
        </g>
      ) : null}
      {items.includes('glasses') || items.includes('tortoise-glasses') ? (
        <g
          fill="none"
          stroke={items.includes('tortoise-glasses') ? '#6b4a2b' : '#1a1a1a'}
          strokeWidth={items.includes('tortoise-glasses') ? 4.4 : 3.8}
        >
          <ellipse cx="94" cy="116" rx="24" ry="20" />
          <ellipse cx="146" cy="116" rx="24" ry="20" />
          <path d="M118 116 H122" strokeWidth="3.4" />
          <path d="M70 114 L60 108" />
          <path d="M170 114 L180 108" />
        </g>
      ) : null}
    </g>
  )
}

export default function ClayPortrait({
  preset,
  faceColor,
  size = 160,
  animation = 'idle',
  label,
  className = '',
  interactiveLook = false,
  liveMotion = true,
}: {
  preset: PortraitPreset
  faceColor: string
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
  }, [preset.id, faceColor])

  const pose = usePortraitPose(animation, liveMotion, look, reduceMotion)
  const face = faceColor
  const faceLight = mixHex(face, '#ffffff', 0.32)
  const faceDark = mixHex(face, '#1a120c', 0.28)
  const faceDeep = mixHex(face, '#1a120c', 0.42)
  const neck = mixHex(face, '#1a120c', 0.16)
  const height = Math.round(size * 1.22)

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
    const dx = e.clientX - drag.startX
    const dy = e.clientY - drag.startY
    setLook({
      x: clamp(drag.origin.x - dy * 0.16, -LOOK_LIMIT, LOOK_LIMIT),
      y: clamp(drag.origin.y + dx * 0.2, -LOOK_LIMIT, LOOK_LIMIT),
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
      style={{ width: size, height, perspective: 720 }}
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
      <svg
        viewBox="0 0 240 300"
        width={size}
        height={height}
        aria-hidden="true"
        style={{
          overflow: 'visible',
          transform: `translateY(${pose.bounce}px) rotateX(${pose.headX}deg) rotateY(${pose.headY}deg) rotateZ(${pose.headZ}deg) scaleY(${pose.squash})`,
          transformOrigin: '50% 42%',
          transformStyle: 'preserve-3d',
        }}
      >
        <defs>
          <radialGradient id={`${uid}-face`} cx="32%" cy="28%" r="72%">
            <stop offset="0%" stopColor={faceLight} />
            <stop offset="42%" stopColor={face} />
            <stop offset="100%" stopColor={faceDark} />
          </radialGradient>
          <radialGradient id={`${uid}-eye`} cx="34%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="58%" stopColor="#f2f0ea" />
            <stop offset="100%" stopColor="#cfc9be" />
          </radialGradient>
          <clipPath id={`${uid}-around`}>
            <path
              fillRule="evenodd"
              d="M0 0 H240 V300 H0 Z M120 108 m -50 0 a 50 62 0 1 0 100 0 a 50 62 0 1 0 -100 0"
            />
          </clipPath>
          <clipPath id={`${uid}-bangs`}>
            <rect x="62" y="40" width="116" height="58" rx="18" />
          </clipPath>
          <filter id={`${uid}-felt`} x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="n" />
            <feColorMatrix in="n" type="saturate" values="0" result="g" />
            <feComponentTransfer in="g" result="a">
              <feFuncA type="linear" slope="0.28" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="a" mode="multiply" />
          </filter>
          <filter id={`${uid}-soft`} x="-25%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="0" dy="12" stdDeviation="9" floodColor="#1a120c" floodOpacity="0.2" />
          </filter>
          <filter id={`${uid}-eye-shadow`} x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.2" floodColor="#1a120c" floodOpacity="0.32" />
          </filter>
        </defs>

        <g filter={`url(#${uid}-soft)`}>
          <ellipse cx="120" cy="292" rx="68" ry="9" fill="#1a120c" opacity="0.14" />

          <PortraitClothes
            style={preset.clothes.style}
            primary={preset.clothes.primary}
            secondary={preset.clothes.secondary}
            uid={uid}
            accessories={preset.accessories}
          />

          <path d="M102 146 C108 140 132 140 138 146 L142 172 C134 180 106 180 98 172 Z" fill={neck} />
          <ellipse cx="120" cy="150" rx="20" ry="7" fill={faceDeep} opacity="0.4" />

          {preset.ears ? (
            <g>
              <ellipse cx="68" cy="120" rx="10" ry="14" fill={faceDark} />
              <ellipse cx="172" cy="120" rx="10" ry="14" fill={faceDark} />
              <ellipse cx="70" cy="120" rx="6" ry="9" fill={mixHex(face, '#1a120c', 0.08)} />
              <ellipse cx="170" cy="120" rx="6" ry="9" fill={mixHex(face, '#1a120c', 0.08)} />
            </g>
          ) : null}

          <ellipse cx="120" cy="108" rx="52" ry="64" fill={`url(#${uid}-face)`} />
          <ellipse cx="100" cy="82" rx="20" ry="14" fill="#ffffff" opacity="0.18" />
          <ellipse cx="120" cy="158" rx="30" ry="12" fill={faceDeep} opacity="0.28" />
          <ellipse cx="80" cy="130" rx="14" ry="11" fill={faceDeep} opacity="0.16" />
          <ellipse cx="160" cy="130" rx="14" ry="11" fill={faceDeep} opacity="0.16" />

          <g clipPath={`url(#${uid}-around)`}>
            <PortraitHair style={preset.hair.style} color={preset.hair.color} uid={uid} />
          </g>

          {(preset.hair.style === 'bob' || preset.hair.style === 'bangs-buns') && (
            <g clipPath={`url(#${uid}-bangs)`} filter={`url(#${uid}-felt)`}>
              <path
                d="M70 98 C96 72 152 72 170 98 L166 70 C142 52 96 52 74 72Z"
                fill={preset.hair.color}
              />
            </g>
          )}

          <g filter={`url(#${uid}-eye-shadow)`}>
            <GooglyEye
              cx={94}
              cy={116}
              r={21}
              lookX={pose.lookX}
              lookY={pose.lookY}
              lid={pose.lid}
              scale={pose.eyeScale}
              face={face}
              uid={uid}
              side="left"
            />
            <GooglyEye
              cx={146}
              cy={116}
              r={21}
              lookX={pose.lookX}
              lookY={pose.lookY}
              lid={Math.max(pose.lid, pose.wink)}
              scale={pose.eyeScale}
              face={face}
              uid={uid}
              side="right"
            />
          </g>

          <Accessories items={preset.accessories} />
        </g>
      </svg>
    </span>
  )
}
