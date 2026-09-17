import type { ReactElement, ReactNode } from 'react'

import { mixHex } from '@/lib/avatars/bubblePalette'
import type { HairStyle } from '@/lib/avatars/portraitCatalog'

type HairProps = {
  style: HairStyle
  color: string
  uid: string
}

function shade(color: string) {
  return {
    fill: color,
    light: mixHex(color, '#ffffff', 0.22),
    dark: mixHex(color, '#1a120c', 0.28),
    deep: mixHex(color, '#1a120c', 0.42),
  }
}

function FeltHair({ color, uid, children }: { color: string; uid: string; children: ReactNode }) {
  const s = shade(color)
  return (
    <g filter={`url(#${uid}-felt)`}>
      <g fill={s.fill}>{children}</g>
    </g>
  )
}

function DoubleBuns({ color, uid }: HairProps) {
  const s = shade(color)
  return (
    <g>
      <FeltHair color={color} uid={uid}>
        <ellipse cx="120" cy="78" rx="58" ry="42" />
        <ellipse cx="74" cy="42" rx="28" ry="26" />
        <ellipse cx="166" cy="42" rx="28" ry="26" />
        <ellipse cx="74" cy="28" rx="16" ry="12" fill={s.light} />
        <ellipse cx="166" cy="28" rx="16" ry="12" fill={s.light} />
      </FeltHair>
      <ellipse cx="74" cy="58" rx="10" ry="8" fill={s.deep} opacity="0.35" />
      <ellipse cx="166" cy="58" rx="10" ry="8" fill={s.deep} opacity="0.35" />
    </g>
  )
}

function Afro({ color, uid }: HairProps) {
  const s = shade(color)
  const bumps = Array.from({ length: 26 }, (_, i) => {
    const a = i * 2.399963
    const ring = 0.55 + (i % 4) * 0.12
    return {
      cx: 120 + Math.cos(a) * (36 + ring * 28),
      cy: 78 + Math.sin(a) * (30 + ring * 16) - 10,
      r: 13 + (i % 5) * 2.2,
    }
  })
  return (
    <FeltHair color={color} uid={uid}>
      <ellipse cx="120" cy="78" rx="68" ry="52" />
      {bumps.map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={i % 3 === 0 ? s.dark : s.fill} />
      ))}
      <circle cx="92" cy="48" r="16" fill={s.light} opacity="0.5" />
    </FeltHair>
  )
}

function ShortCurls({ color, uid }: HairProps) {
  const s = shade(color)
  const curls = [
    [88, 58, 16],
    [104, 46, 15],
    [120, 42, 16],
    [136, 46, 15],
    [152, 58, 16],
    [96, 70, 13],
    [144, 70, 13],
    [112, 56, 12],
    [128, 56, 12],
    [80, 78, 12],
    [160, 78, 12],
  ] as const
  return (
    <FeltHair color={color} uid={uid}>
      <ellipse cx="120" cy="70" rx="54" ry="32" />
      {curls.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 ? s.dark : s.fill} />
      ))}
      <circle cx="108" cy="48" r="9" fill={s.light} opacity="0.55" />
    </FeltHair>
  )
}

function Swept({ color, uid }: HairProps) {
  const s = shade(color)
  return (
    <FeltHair color={color} uid={uid}>
      <path d="M70 92 C68 54 92 36 128 38 C162 40 178 62 174 92 C168 70 150 52 122 50 C96 48 80 64 70 92Z" />
      <path
        d="M86 58 C108 40 148 36 170 62 C158 48 128 44 98 56Z"
        fill={s.light}
        opacity="0.55"
      />
      <path d="M74 88 C78 70 96 60 118 58 C100 70 86 80 74 88Z" fill={s.dark} opacity="0.35" />
    </FeltHair>
  )
}

function Braid({ color, uid }: HairProps) {
  const s = shade(color)
  return (
    <g>
      <FeltHair color={color} uid={uid}>
        <ellipse cx="120" cy="78" rx="56" ry="40" />
        <path d="M154 100 C168 130 172 170 164 210 C158 236 148 248 142 252 C150 230 156 190 150 150 C146 124 140 108 154 100Z" />
      </FeltHair>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <ellipse
          key={i}
          cx={156 - i * 1.6}
          cy={118 + i * 18}
          rx={10 - i * 0.5}
          ry={9}
          fill={i % 2 ? s.dark : s.fill}
          transform={`rotate(${8 + i * 2} ${156 - i * 1.6} ${118 + i * 18})`}
        />
      ))}
      <path d="M92 58 C110 44 140 42 158 58" stroke={s.light} strokeWidth="6" fill="none" opacity="0.45" />
    </g>
  )
}

function Wavy({ color, uid }: HairProps) {
  const s = shade(color)
  return (
    <FeltHair color={color} uid={uid}>
      <path d="M62 100 C58 48 92 28 120 30 C156 32 186 52 180 108 C184 150 178 188 168 210 C174 170 176 130 168 100 C160 64 136 48 120 50 C96 52 78 68 72 100 C68 140 70 180 76 210 C64 176 60 136 62 100Z" />
      <path d="M78 70 C100 44 148 42 168 72" fill={s.light} opacity="0.35" />
      <ellipse cx="78" cy="150" rx="16" ry="28" fill={s.dark} opacity="0.2" />
      <ellipse cx="164" cy="150" rx="16" ry="28" fill={s.dark} opacity="0.2" />
    </FeltHair>
  )
}

function Bob({ color, uid }: HairProps) {
  const s = shade(color)
  return (
    <FeltHair color={color} uid={uid}>
      <path d="M64 108 C60 52 88 28 120 28 C154 28 182 54 176 110 C170 132 158 140 146 138 L94 138 C82 140 70 130 64 108Z" />
      <path d="M78 86 C92 70 150 68 164 88 L168 78 C150 52 90 52 72 80Z" />
      {Array.from({ length: 11 }, (_, i) => (
        <rect
          key={i}
          x={78 + i * 8}
          y="28"
          width="6"
          height="52"
          rx="3"
          fill={i % 2 ? s.dark : s.fill}
          opacity="0.85"
        />
      ))}
      <path d="M74 92 C100 78 148 78 168 94 L166 78 C140 62 100 62 76 80Z" fill={s.dark} />
    </FeltHair>
  )
}

function Spiky({ color, uid }: HairProps) {
  const s = shade(color)
  return (
    <FeltHair color={color} uid={uid}>
      <ellipse cx="120" cy="78" rx="50" ry="28" />
      <path d="M78 86 L86 40 L98 78 L110 28 L122 76 L136 24 L146 76 L162 38 L168 88 Z" />
      <path d="M96 48 L110 22 L118 54" fill={s.light} opacity="0.5" />
    </FeltHair>
  )
}

function Ponytail({ color, uid }: HairProps) {
  const s = shade(color)
  return (
    <g>
      <FeltHair color={color} uid={uid}>
        <path d="M72 96 C70 52 96 34 128 38 C158 42 174 68 168 96 C160 70 140 54 118 54 C94 54 80 70 72 96Z" />
        <path d="M150 58 C176 48 188 78 182 120 C176 158 164 168 158 164 C168 140 172 100 158 72Z" />
      </FeltHair>
      <ellipse cx="158" cy="58" rx="8" ry="6" fill={s.deep} />
      <path d="M88 62 C112 44 148 46 164 70" fill={s.light} opacity="0.4" />
    </g>
  )
}

function LongStraight({ color, uid }: HairProps) {
  const s = shade(color)
  return (
    <FeltHair color={color} uid={uid}>
      <path d="M66 102 C62 48 90 26 120 28 C154 30 182 50 176 104 C180 160 176 214 168 240 C174 200 176 150 168 108 C160 64 138 48 120 50 C96 52 78 68 74 104 C68 156 70 210 76 240 C66 210 62 154 66 102Z" />
      <path d="M86 64 C112 40 152 40 168 68" fill={s.light} opacity="0.35" />
    </FeltHair>
  )
}

function Locs({ color, uid }: HairProps) {
  const s = shade(color)
  const locs = Array.from({ length: 18 }, (_, i) => {
    const a = -2.4 + (i / 17) * 4.8
    return {
      x: 120 + Math.sin(a) * 48,
      y: 58 + Math.cos(a * 0.6) * 10 + (i % 3) * 8,
      rot: a * 12,
      h: 28 + (i % 4) * 6,
    }
  })
  return (
    <FeltHair color={color} uid={uid}>
      <ellipse cx="120" cy="70" rx="54" ry="30" />
      {locs.map((l, i) => (
        <rect
          key={i}
          x={l.x - 5}
          y={l.y}
          width="10"
          height={l.h}
          rx="5"
          fill={i % 2 ? s.dark : s.fill}
          transform={`rotate(${l.rot} ${l.x} ${l.y})`}
        />
      ))}
    </FeltHair>
  )
}

function Bun({ color, uid }: HairProps) {
  const s = shade(color)
  return (
    <FeltHair color={color} uid={uid}>
      <ellipse cx="120" cy="72" rx="52" ry="30" />
      <ellipse cx="120" cy="36" rx="24" ry="22" />
      <ellipse cx="120" cy="26" rx="14" ry="10" fill={s.light} />
      <path d="M86 70 C110 52 140 52 156 72" fill={s.dark} opacity="0.25" />
    </FeltHair>
  )
}

function BangsBuns({ color, uid }: HairProps) {
  const s = shade(color)
  return (
    <g>
      <FeltHair color={color} uid={uid}>
        <ellipse cx="120" cy="78" rx="56" ry="36" />
        <ellipse cx="78" cy="44" rx="24" ry="22" />
        <ellipse cx="162" cy="44" rx="24" ry="22" />
        <path d="M72 96 C88 70 152 70 168 96 L164 78 C140 58 100 58 76 80Z" />
      </FeltHair>
      <ellipse cx="78" cy="32" rx="12" ry="8" fill={s.light} opacity="0.55" />
      <ellipse cx="162" cy="32" rx="12" ry="8" fill={s.light} opacity="0.55" />
      {Array.from({ length: 8 }, (_, i) => (
        <path
          key={i}
          d={`M${84 + i * 9} 78 Q${88 + i * 9} 102 ${86 + i * 9} 108`}
          stroke={s.dark}
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.55"
        />
      ))}
    </g>
  )
}

function ShortCrop({ color, uid }: HairProps) {
  const s = shade(color)
  return (
    <FeltHair color={color} uid={uid}>
      <ellipse cx="120" cy="72" rx="52" ry="28" />
      <path d="M74 90 C80 58 108 42 140 48 C166 54 174 78 168 94 C156 70 132 58 110 60 C90 62 80 74 74 90Z" />
      <path d="M96 54 C118 40 150 46 164 70" fill={s.light} opacity="0.4" />
    </FeltHair>
  )
}

const HAIR: Record<HairStyle, (props: HairProps) => ReactElement> = {
  'double-buns': DoubleBuns,
  afro: Afro,
  'short-curls': ShortCurls,
  swept: Swept,
  braid: Braid,
  wavy: Wavy,
  bob: Bob,
  spiky: Spiky,
  ponytail: Ponytail,
  'long-straight': LongStraight,
  locs: Locs,
  bun: Bun,
  'bangs-buns': BangsBuns,
  'short-crop': ShortCrop,
}

export default function PortraitHair(props: HairProps) {
  const Node = HAIR[props.style]
  return <Node {...props} />
}
