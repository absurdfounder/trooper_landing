import type { ReactNode } from 'react'

import { mixHex } from '@/lib/avatars/bubblePalette'
import type { ClothesStyle, PortraitAccessory } from '@/lib/avatars/portraitCatalog'

type ClothesProps = {
  style: ClothesStyle
  primary: string
  secondary: string
  uid: string
  accessories: PortraitAccessory[]
}

function shade(color: string) {
  return {
    fill: color,
    light: mixHex(color, '#ffffff', 0.2),
    dark: mixHex(color, '#1a120c', 0.22),
    deep: mixHex(color, '#1a120c', 0.38),
  }
}

function Torso({ color, extra }: { color: string; extra?: ReactNode }) {
  const s = shade(color)
  return (
    <g>
          <path
            d="M32 198 C42 156 82 146 120 146 C158 146 198 156 208 198 C212 216 214 300 214 300 L26 300 C26 300 28 216 32 198Z"
            fill={s.fill}
          />
      <path
        d="M54 200 C80 168 160 168 186 200"
        fill="none"
        stroke={s.light}
        strokeWidth="8"
        opacity="0.28"
      />
      {extra}
    </g>
  )
}

function Collar({ color }: { color: string }) {
  const s = shade(color)
  return (
    <g>
      <path d="M88 168 C100 158 140 158 152 168 L148 186 C136 176 104 176 92 186 Z" fill={s.fill} />
      <path d="M96 172 L120 184 L144 172" fill="none" stroke={s.dark} strokeWidth="2" opacity="0.35" />
    </g>
  )
}

function Zipper() {
  return (
    <g>
      <rect x="118" y="172" width="4" height="128" rx="1.5" fill="#c5c0b6" />
      <rect x="116" y="170" width="8" height="10" rx="2" fill="#9a958c" />
    </g>
  )
}

function Tee({ color }: { color: string }) {
  const s = shade(color)
  return (
    <path d="M88 168 C102 156 138 156 152 168 L158 300 L82 300 Z" fill={s.fill} />
  )
}

function Blazer({ color }: { color: string }) {
  const s = shade(color)
  return (
    <g>
      <path d="M36 190 C50 156 86 148 120 148 C154 148 190 156 204 190 L216 300 L24 300 Z" fill={s.fill} />
      <path d="M88 168 L120 210 L120 300 L78 300 L70 200 Z" fill={s.dark} opacity="0.12" />
      <path d="M152 168 L120 210 L120 300 L162 300 L170 200 Z" fill={s.dark} opacity="0.08" />
      <path d="M88 168 L120 214" stroke={s.deep} strokeWidth="2.2" fill="none" opacity="0.45" />
      <path d="M152 168 L120 214" stroke={s.deep} strokeWidth="2.2" fill="none" opacity="0.45" />
    </g>
  )
}

function Turtleneck({ color }: { color: string }) {
  const s = shade(color)
  return (
    <g>
      <path d="M92 158 C104 148 136 148 148 158 L152 188 L88 188 Z" fill={s.fill} />
      <path d="M96 164 C110 156 130 156 144 164" fill="none" stroke={s.dark} strokeWidth="3" opacity="0.2" />
    </g>
  )
}

function Hoodie({ color }: { color: string }) {
  const s = shade(color)
  return (
    <g>
      <Torso color={color} />
      <path
        d="M78 168 C88 132 104 122 120 122 C136 122 152 132 162 168"
        fill="none"
        stroke={s.dark}
        strokeWidth="14"
        opacity="0.28"
      />
      <path d="M102 176 C110 184 130 184 138 176" fill="none" stroke={s.light} strokeWidth="4" opacity="0.5" />
      <circle cx="108" cy="186" r="3" fill={s.deep} />
      <circle cx="132" cy="186" r="3" fill={s.deep} />
    </g>
  )
}

export default function PortraitClothes({ style, primary, secondary, accessories }: ClothesProps) {
  const p = shade(primary)
  const bag = accessories.includes('bag-strap')
  const pen = accessories.includes('pocket-pen')

  let body: ReactNode = <Torso color={primary} />

  switch (style) {
    case 'overalls':
      body = (
        <g>
          <Torso color={secondary} />
          <path d="M70 198 L84 168 L96 168 L100 198 Z" fill={p.fill} />
          <path d="M140 198 L144 168 L156 168 L170 198 Z" fill={p.fill} />
          <path d="M48 196 L192 196 L200 300 L40 300 Z" fill={p.fill} />
          <circle cx="90" cy="172" r="3.5" fill={p.deep} />
          <circle cx="150" cy="172" r="3.5" fill={p.deep} />
        </g>
      )
      break
    case 'jacket-tee':
      body = (
        <g>
          <Tee color={secondary} />
          <path d="M34 192 C50 154 78 148 100 150 L108 300 L24 300 Z" fill={p.fill} />
          <path d="M206 192 C190 154 162 148 140 150 L132 300 L216 300 Z" fill={p.fill} />
          <path d="M100 150 L88 168" stroke={p.dark} strokeWidth="3" fill="none" />
          <path d="M140 150 L152 168" stroke={p.dark} strokeWidth="3" fill="none" />
        </g>
      )
      break
    case 'zip-sweater':
      body = (
        <g>
          <Torso color={primary} />
          <Collar color={primary} />
          <Zipper />
        </g>
      )
      break
    case 'button-shirt':
      body = (
        <g>
          <Tee color={secondary} />
          <path d="M32 194 C48 156 82 148 108 150 L70 300 L22 300 Z" fill={p.fill} />
          <path d="M208 194 C192 156 158 148 132 150 L170 300 L218 300 Z" fill={p.fill} />
          <circle cx="96" cy="200" r="2.4" fill={p.deep} />
        </g>
      )
      break
    case 'knit-sweater':
      body = (
        <g>
          <Torso color={primary} extra={<Collar color={primary} />} />
          {Array.from({ length: 6 }, (_, i) => (
            <path
              key={i}
              d={`M50 ${210 + i * 12} C90 ${204 + i * 12} 150 ${204 + i * 12} 190 ${210 + i * 12}`}
              fill="none"
              stroke={p.dark}
              strokeWidth="1.4"
              opacity="0.18"
            />
          ))}
        </g>
      )
      break
    case 'vest-tee':
      body = (
        <g>
          <Tee color={secondary} />
          <path d="M62 176 L88 156 L100 168 L108 300 L48 300 Z" fill={p.fill} />
          <path d="M178 176 L152 156 L140 168 L132 300 L192 300 Z" fill={p.fill} />
          {Array.from({ length: 7 }, (_, i) => (
            <path
              key={i}
              d={`M70 ${188 + i * 14} C96 ${184 + i * 14} 70 ${192 + i * 14} 70 ${188 + i * 14}`}
              fill="none"
              stroke={p.light}
              strokeWidth="2"
              opacity="0.2"
            />
          ))}
        </g>
      )
      break
    case 'hoodie-jacket':
      body = (
        <g>
          <Hoodie color={secondary} />
          <path d="M30 196 C46 158 78 150 102 152 L90 300 L20 300 Z" fill={p.fill} />
          <path d="M210 196 C194 158 162 150 138 152 L150 300 L220 300 Z" fill={p.fill} />
        </g>
      )
      break
    case 'turtleneck-blazer':
      body = (
        <g>
          <Blazer color={primary} />
          <Turtleneck color={secondary} />
          {pen ? (
            <g>
              <rect x="158" y="210" width="14" height="18" rx="2" fill={p.dark} opacity="0.2" />
              <rect x="162" y="200" width="4" height="24" rx="1" fill="#3b82f6" />
              <rect x="162" y="198" width="4" height="5" rx="1" fill="#ef4444" />
            </g>
          ) : null}
        </g>
      )
      break
    case 'zip-jumpsuit':
      body = (
        <g>
          <Torso color={primary} />
          <Collar color={primary} />
          <Zipper />
        </g>
      )
      break
    case 'hoodie':
      body = <Hoodie color={primary} />
      break
    case 'polo-zip':
      body = (
        <g>
          <Torso color={primary} />
          <Collar color={primary} />
          <Zipper />
        </g>
      )
      break
    case 'suit':
      body = (
        <g>
          <Blazer color={primary} />
          <path d="M108 168 L120 188 L132 168 L140 300 L100 300 Z" fill={secondary} />
          <path d="M92 176 C108 166 132 166 148 176 L144 188 C132 178 108 178 96 188 Z" fill={primary} />
        </g>
      )
      break
    case 'turtleneck':
      body = (
        <g>
          <Torso color={primary} extra={null} />
          <Turtleneck color={primary} />
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              d={`M48 ${200 + i * 10} C90 ${196 + i * 10} 150 ${196 + i * 10} 192 ${200 + i * 10}`}
              fill="none"
              stroke={p.dark}
              strokeWidth="1.6"
              opacity="0.16"
            />
          ))}
        </g>
      )
      break
  }

  return (
    <g>
      {body}
      {bag ? (
        <g>
          <path
            d="M78 168 C70 200 58 240 52 280"
            fill="none"
            stroke={mixHex(primary, '#1a120c', 0.45)}
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M78 168 C70 200 58 240 52 280"
            fill="none"
            stroke={mixHex(primary, '#ffffff', 0.15)}
            strokeWidth="3"
            opacity="0.35"
          />
        </g>
      ) : null}
    </g>
  )
}
