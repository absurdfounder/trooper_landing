import { mixHex } from './bubblePalette'
import type { PortraitPreset } from './portraitCatalog'
import type { PortraitPose } from './portraitPose'

type Clay = ReturnType<typeof clay>
type HairLayer = 'back' | 'face' | 'front'
type ClothLayer = 'body' | 'collar'

function clay(hex: string) {
  return {
    fill: hex,
    light: mixHex(hex, '#ffffff', 0.38),
    glow: mixHex(hex, '#ffffff', 0.62),
    mid: mixHex(hex, '#ffffff', 0.16),
    dark: mixHex(hex, '#1a120c', 0.22),
    deep: mixHex(hex, '#1a120c', 0.4),
    ao: mixHex(hex, '#0a0806', 0.52),
  }
}

function blob(cx: number, cy: number, rx: number, ry: number, rot: number, fill: string) {
  const t = rot ? ` transform="rotate(${rot} ${cx} ${cy})"` : ''
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"${t}/>`
}

function eyeSvg(
  cx: number,
  cy: number,
  r: number,
  lookX: number,
  lookY: number,
  lid: number,
  face: string,
  uid: string,
  side: string,
) {
  const f = clay(face)
  const pupilR = r * 0.42
  const px = cx + lookX * r * 0.14
  const py = cy + lookY * r * 0.12 + r * 0.05
  const lidH = Math.min(1, Math.max(0, lid)) * r * 2.15

  return `
    <ellipse cx="${cx}" cy="${cy + r * 0.5}" rx="${r * 1.06}" ry="${r * 0.42}" fill="${f.ao}" opacity="0.32"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 1.03}" fill="url(#${uid}-eye)"/>
    <ellipse cx="${cx + r * 0.1}" cy="${cy + r * 0.4}" rx="${r * 0.7}" ry="${r * 0.38}" fill="#b7b0a3" opacity="0.2"/>
    <ellipse cx="${cx - r * 0.28}" cy="${cy - r * 0.32}" rx="${r * 0.4}" ry="${r * 0.24}" fill="#ffffff" opacity="0.8"/>
    <circle cx="${px}" cy="${py}" r="${pupilR}" fill="#161310"/>
    <circle cx="${px - pupilR * 0.16}" cy="${py - pupilR * 0.22}" r="${pupilR * 0.3}" fill="#ffffff"/>
    <circle cx="${px + pupilR * 0.3}" cy="${py + pupilR * 0.16}" r="${pupilR * 0.08}" fill="#ffffff" opacity="0.5"/>
    <clipPath id="${uid}-lid-${side}">
      <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 1.03}"/>
    </clipPath>
    <g clip-path="url(#${uid}-lid-${side})">
      <rect x="${cx - r}" y="${cy - r * 1.03}" width="${r * 2}" height="${lidH}" fill="${f.fill}"/>
    </g>
  `
}

function torsoPath() {
  return 'M34 365 C48 298 98 268 148 262 C176 256 188 248 200 248 C212 248 224 256 252 262 C302 268 352 298 366 365 L378 520 L22 520 Z'
}

function clothesSvg(preset: PortraitPreset, uid: string, layer: ClothLayer) {
  const p = clay(preset.clothes.primary)
  const s = clay(preset.clothes.secondary)
  const style = preset.clothes.style
  const vol = `url(#${uid}-cloth-vol)`
  const tee = `url(#${uid}-tee)`

  if (style === 'button-shirt' || style === 'jacket-tee') {
    if (layer === 'body') {
      return `
        <path d="${torsoPath()}" fill="${tee}"/>
        <path d="M26 352 C58 280 114 252 176 256 L168 312 L132 520 L12 520 Z" fill="${p.fill}"/>
        <path d="M374 352 C342 280 286 252 224 256 L232 312 L268 520 L388 520 Z" fill="${p.fill}"/>
        <path d="M60 330 C110 292 150 270 176 256" fill="none" stroke="${p.light}" stroke-width="10" opacity="0.22"/>
        ${style === 'jacket-tee' ? `<circle cx="200" cy="368" r="4.5" fill="${p.deep}"/>` : ''}
        <path d="M84 372 h52 v56 h-52Z" fill="${p.dark}" opacity="0.1"/>
        <path d="M264 372 h52 v56 h-52Z" fill="${p.dark}" opacity="0.1"/>
        <path d="M84 372 h52 v10 h-52Z" fill="${p.deep}" opacity="0.16"/>
        <path d="M264 372 h52 v10 h-52Z" fill="${p.deep}" opacity="0.16"/>
      `
    }
    return `
      <path d="M154 260 C176 238 198 246 200 250 L176 296 L144 276 Z" fill="${p.mid}"/>
      <path d="M246 260 C224 238 202 246 200 250 L224 296 L256 276 Z" fill="${p.mid}"/>
      <path d="M156 264 C176 250 196 252 200 254" fill="none" stroke="${p.light}" stroke-width="3" opacity="0.4"/>
    `
  }

  if (style === 'zip-sweater' || style === 'zip-jumpsuit' || style === 'polo-zip') {
    if (layer === 'body') {
      return `
        <path d="${torsoPath()}" fill="${vol}"/>
        <path d="M72 338 C140 304 260 304 328 338" fill="none" stroke="${p.light}" stroke-width="16" opacity="0.18"/>
        <path d="M50 410 C130 442 270 442 350 410" fill="${p.dark}" opacity="0.06"/>
      `
    }
    return `
      <path d="M170 268 C186 256 214 256 230 268 L236 298 C220 286 180 286 164 298 Z" fill="${tee}"/>
      <path d="M150 278 C176 258 224 258 250 278 L242 308 C222 292 178 292 158 308 Z" fill="${p.fill}"/>
      <path d="M160 286 C180 272 220 272 240 286" fill="none" stroke="${p.light}" stroke-width="4" opacity="0.35"/>
      <path d="M200 304 L200 518" stroke="#d2cbc0" stroke-width="7" stroke-linecap="round"/>
      <path d="M200 304 L200 518" stroke="#8f877c" stroke-width="1.8"/>
      <rect x="191" y="296" width="18" height="20" rx="5" fill="#ddd6cc"/>
      <rect x="194" y="300" width="12" height="12" rx="3" fill="#b4ada3"/>
    `
  }

  if (style === 'knit-sweater') {
    if (layer === 'body') {
      const ribs = Array.from({ length: 20 }, (_, i) => {
        const x = 52 + i * 15.4
        return `<path d="M${x} 292 C${x + 5} 360 ${x - 5} 430 ${x + 3} 520" fill="none" stroke="${p.dark}" stroke-width="8" opacity="0.11"/>`
      }).join('')
      return `
        <path d="${torsoPath()}" fill="${vol}"/>
        <clipPath id="${uid}-knit"><path d="${torsoPath()}"/></clipPath>
        <g clip-path="url(#${uid}-knit)">${ribs}</g>
      `
    }
    return `
      <path d="M156 268 C178 248 222 248 244 268 L252 308 C228 286 172 286 148 308 Z" fill="${vol}"/>
    `
  }

  if (style === 'overalls') {
    if (layer === 'body') {
      return `
        <path d="${torsoPath()}" fill="${s.fill}"/>
        <path d="${torsoPath()}" fill="${vol}" opacity="0.35"/>
        <path d="M56 328 L344 328 L360 520 L40 520 Z" fill="${vol}"/>
        <path d="M118 332 L136 266 L168 266 L176 332 Z" fill="${vol}"/>
        <path d="M224 332 L232 266 L264 266 L282 332 Z" fill="${vol}"/>
      `
    }
    return `
      <circle cx="150" cy="274" r="6.5" fill="${p.deep}"/>
      <circle cx="250" cy="274" r="6.5" fill="${p.deep}"/>
      <circle cx="148" cy="272" r="2.4" fill="${p.light}"/>
      <circle cx="248" cy="272" r="2.4" fill="${p.light}"/>
    `
  }

  if (style === 'vest-tee') {
    if (layer === 'body') {
      return `
        <path d="${torsoPath()}" fill="${tee}"/>
        <path d="M90 298 L148 254 L172 280 L180 520 L62 520 Z" fill="${vol}"/>
        <path d="M310 298 L252 254 L228 280 L220 520 L338 520 Z" fill="${vol}"/>
      `
    }
    return ''
  }

  if (style === 'hoodie' || style === 'hoodie-jacket') {
    if (layer === 'body') {
      const fill = style === 'hoodie' ? vol : tee
      return `
        <path d="${torsoPath()}" fill="${fill}"/>
        ${
          style === 'hoodie-jacket'
            ? `<path d="M22 352 C56 278 110 252 164 254 L130 520 L8 520 Z" fill="${vol}"/><path d="M378 352 C344 278 290 252 236 254 L270 520 L392 520 Z" fill="${vol}"/>`
            : ''
        }
      `
    }
    return `
      <path d="M130 294 C148 234 176 216 200 216 C224 216 252 234 270 294" fill="none" stroke="${p.dark}" stroke-width="18" opacity="0.18"/>
      <path d="M168 304 C186 320 214 320 232 304" fill="none" stroke="${s.light}" stroke-width="5" opacity="0.4"/>
    `
  }

  if (style === 'turtleneck-blazer' || style === 'suit') {
    if (layer === 'body') {
      return `
        <path d="${torsoPath()}" fill="${vol}"/>
        <path d="M148 278 L200 354 L200 520 L122 520 L110 330 Z" fill="${p.dark}" opacity="0.1"/>
        <path d="M252 278 L200 354 L200 520 L278 520 L290 330 Z" fill="${p.dark}" opacity="0.07"/>
        <path d="M148 278 L200 358" stroke="${p.deep}" stroke-width="3" fill="none" opacity="0.32"/>
        <path d="M252 278 L200 358" stroke="${p.deep}" stroke-width="3" fill="none" opacity="0.32"/>
        ${preset.accessories.includes('pocket-pen') ? `<rect x="268" y="352" width="8" height="40" rx="2" fill="#3b82f6"/><rect x="268" y="348" width="8" height="8" rx="2" fill="#ef4444"/>` : ''}
      `
    }
    return `<path d="M154 262 C176 244 224 244 246 262 L254 308 L146 308 Z" fill="${s.fill}"/>`
  }

  if (style === 'turtleneck') {
    if (layer === 'body') return `<path d="${torsoPath()}" fill="${vol}"/>`
    return `<path d="M154 258 C176 240 224 240 246 258 L254 304 L146 304 Z" fill="${vol}"/>`
  }

  if (layer === 'body') return `<path d="${torsoPath()}" fill="${vol}"/>`
  return `<path d="M148 270 C176 246 224 246 252 270 L244 306 C222 286 178 286 156 306 Z" fill="${vol}"/>`
}

function accessoriesSvg(preset: PortraitPreset) {
  const items = preset.accessories
  let out = ''
  if (items.includes('hoops')) {
    out += `
      <g fill="none" stroke="#d4b56a" stroke-width="5.5">
        <ellipse cx="102" cy="216" rx="15" ry="20"/>
        <ellipse cx="298" cy="216" rx="15" ry="20"/>
      </g>
      <g fill="none" stroke="#f0d78a" stroke-width="1.6" opacity="0.65">
        <ellipse cx="99" cy="212" rx="12" ry="16"/>
        <ellipse cx="295" cy="212" rx="12" ry="16"/>
      </g>
    `
  }
  if (items.includes('beads')) {
    const cols = ['#f2c6c2', '#f0d48a', '#a8d4c4', '#c7b6e8', '#f2c6c2', '#a8d4c4', '#f0d48a', '#f2c6c2']
    out += cols
      .map((c, i) => {
        const x = 148 + i * 13.2
        const y = 296 + Math.sin(i * 0.9) * 4
        return `<circle cx="${x}" cy="${y}" r="8.5" fill="${c}"/><circle cx="${x - 2}" cy="${y - 2.4}" r="2.4" fill="#ffffff" opacity="0.35"/>`
      })
      .join('')
  }
  if (items.includes('necklace')) {
    out += `
      <path d="M166 288 Q200 332 234 288" fill="none" stroke="#d4b56a" stroke-width="2.3"/>
      <path d="M200 332 L194.5 321 L205.5 321 Z" fill="#d4b56a"/>
    `
  }
  if (items.includes('bag-strap')) {
    out += `<path d="M270 276 C280 358 294 430 306 512" fill="none" stroke="#e8ddd0" stroke-width="18" stroke-linecap="round"/>`
  }
  if (items.includes('headphones')) {
    out += `
      <path d="M108 148 C108 52 292 52 292 148" fill="none" stroke="#f4f1ea" stroke-width="14" stroke-linecap="round"/>
      <rect x="82" y="136" width="40" height="54" rx="16" fill="#f4f1ea"/>
      <rect x="278" y="136" width="40" height="54" rx="16" fill="#f4f1ea"/>
    `
  }
  if (items.includes('glasses') || items.includes('tortoise-glasses')) {
    const stroke = items.includes('tortoise-glasses') ? '#6b4a2b' : '#1a1a1a'
    out += `
      <g fill="none" stroke="${stroke}" stroke-width="${items.includes('tortoise-glasses') ? 7 : 6}">
        <ellipse cx="164" cy="176" rx="38" ry="32"/>
        <ellipse cx="236" cy="176" rx="38" ry="32"/>
        <path d="M202 176 H198" stroke-width="5"/>
        <path d="M126 172 L108 164"/>
        <path d="M274 172 L292 164"/>
      </g>
    `
  }
  return out
}

function sweptHair(h: Clay, layer: HairLayer) {
  if (layer === 'front') return ''
  if (layer === 'back') {
    return `
      ${blob(200, 92, 88, 48, 0, h.fill)}
      ${blob(128, 112, 32, 36, -12, h.fill)}
      ${blob(272, 110, 32, 36, 12, h.fill)}
    `
  }
  return `
    ${blob(200, 90, 70, 44, 0, h.fill)}
    ${blob(158, 94, 48, 40, -22, h.fill)}
    ${blob(242, 92, 48, 40, 20, h.fill)}
    ${blob(124, 118, 28, 34, -14, h.fill)}
    ${blob(276, 114, 28, 32, 14, h.fill)}
    ${blob(152, 126, 20, 26, -16, h.fill)}
    ${blob(182, 130, 18, 24, -4, h.fill)}
    ${blob(212, 128, 18, 22, 8, h.fill)}
    ${blob(240, 124, 20, 24, 16, h.fill)}
    ${blob(112, 148, 14, 20, -8, h.fill)}
    ${blob(288, 144, 14, 18, 10, h.fill)}
    <ellipse cx="176" cy="70" rx="30" ry="14" fill="${h.light}" opacity="0.4"/>
    <ellipse cx="244" cy="76" rx="22" ry="12" fill="${h.light}" opacity="0.28"/>
  `
}

function curlHair(h: Clay, layer: HairLayer) {
  if (layer === 'front') return ''
  if (layer === 'back') {
    return `<ellipse cx="200" cy="96" rx="90" ry="50" fill="${h.fill}"/>`
  }
  const coils: string[] = [`<ellipse cx="200" cy="94" rx="80" ry="46" fill="${h.fill}"/>`]
  for (let i = 0; i < 80; i++) {
    const u = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1
    const v = Math.abs(Math.sin(i * 78.233) * 23421.631) % 1
    const r = Math.sqrt(u)
    const a = v * Math.PI * 2
    const cx = 200 + Math.cos(a) * r * 78
    const cy = 94 + Math.sin(a) * r * 44
    if (cy > 138) continue
    const rot = (Math.abs(Math.sin(i * 3.7)) * 180) % 180
    const fill = i % 3 === 0 ? h.dark : i % 2 ? h.mid : h.fill
    coils.push(blob(cx, cy, 12 + (i % 4), 7 + (i % 3), rot, fill))
  }
  coils.push(`<ellipse cx="168" cy="70" rx="14" ry="9" fill="${h.light}" opacity="0.4"/>`)
  return coils.join('')
}

function braidHair(h: Clay, layer: HairLayer) {
  if (layer === 'back') {
    return `<ellipse cx="200" cy="96" rx="100" ry="56" fill="${h.fill}"/>`
  }
  if (layer === 'face') {
    return `
      <ellipse cx="200" cy="94" rx="90" ry="50" fill="${h.fill}"/>
      ${blob(116, 148, 22, 30, -8, h.fill)}
      ${blob(284, 148, 22, 30, 8, h.fill)}
      <path d="M200 56 L200 128" stroke="${h.deep}" stroke-width="3.2" opacity="0.45"/>
      ${Array.from({ length: 6 }, (_, i) => `<path d="M200 ${62 + i * 10} Q${176 - i * 2} ${78 + i * 10} ${128 - i} ${106 + i * 12}" fill="none" stroke="${h.dark}" stroke-width="6" opacity="0.25"/>`).join('')}
      ${Array.from({ length: 6 }, (_, i) => `<path d="M200 ${62 + i * 10} Q${224 + i * 2} ${78 + i * 10} ${272 + i} ${106 + i * 12}" fill="none" stroke="${h.dark}" stroke-width="6" opacity="0.25"/>`).join('')}
      <ellipse cx="186" cy="70" rx="36" ry="16" fill="${h.light}" opacity="0.32"/>
    `
  }
  return `
    <path fill="${h.fill}" d="M136 200 C118 258 110 328 118 392 C124 442 114 472 132 484 C100 470 90 428 94 372 C88 312 104 250 128 204Z"/>
    ${Array.from({ length: 12 }, (_, i) => {
      const t = i / 11
      const cx = 118 - t * 6
      const cy = 218 + t * 22
      return blob(cx, cy, 20 - i * 0.35, 13, 18 + i * 11, i % 2 ? h.dark : h.fill)
    }).join('')}
    <ellipse cx="114" cy="478" rx="20" ry="15" fill="${h.fill}"/>
    <ellipse cx="110" cy="470" rx="6" ry="4" fill="${h.light}" opacity="0.35"/>
  `
}

function wavyHair(h: Clay, layer: HairLayer) {
  if (layer === 'back') {
    return `
      <ellipse cx="200" cy="94" rx="106" ry="54" fill="${h.fill}"/>
      ${blob(108, 210, 40, 100, -6, h.fill)}
      ${blob(292, 210, 40, 100, 6, h.fill)}
    `
  }
  if (layer === 'face') {
    return `
      <ellipse cx="200" cy="88" rx="84" ry="42" fill="${h.fill}"/>
      ${blob(100, 175, 26, 50, -8, h.fill)}
      ${blob(300, 175, 26, 50, 8, h.fill)}
      <path d="M200 54 L200 112" stroke="${h.deep}" stroke-width="2.6" opacity="0.32"/>
      <ellipse cx="186" cy="66" rx="36" ry="14" fill="${h.light}" opacity="0.32"/>
    `
  }
  return `
    <path fill="${h.fill}" d="M88 200 C70 260 78 340 104 410 C80 340 66 268 90 208 C74 258 90 330 116 382 C92 320 78 250 88 200Z"/>
    <path fill="${h.fill}" d="M312 200 C330 260 322 340 296 410 C320 340 334 268 310 208 C326 258 310 330 284 382 C308 320 322 250 312 200Z"/>
  `
}

function hairSvg(preset: PortraitPreset, uid: string, layer: HairLayer) {
  const h = clay(preset.hair.color)
  const vol = h.fill
  const style = preset.hair.style

  if (style === 'swept') return sweptHair(h, layer)
  if (style === 'short-curls') return curlHair(h, layer)
  if (style === 'braid') return braidHair(h, layer)
  if (style === 'wavy') return wavyHair(h, layer)

  if (layer === 'front') return ''

  if (style === 'double-buns') {
    if (layer === 'face') {
      return `
        ${blob(200, 86, 92, 48, 0, vol)}
        ${blob(148, 110, 30, 36, -16, vol)}
        ${blob(252, 110, 30, 36, 16, vol)}
        <path d="M200 52 L200 120" stroke="url(#${uid}-hair-deep)" stroke-width="3" opacity="0.4"/>
      `
    }
    return `
      ${blob(118, 48, 44, 40, -12, vol)}
      ${blob(282, 48, 44, 40, 12, vol)}
      ${blob(118, 32, 20, 14, 0, vol)}
      ${blob(282, 32, 20, 14, 0, vol)}
    `
  }

  if (style === 'afro') {
    if (layer === 'face') {
      return Array.from({ length: 10 }, (_, i) => blob(136 + i * 14, 118 + (i % 2) * 10, 13, 13, 0, vol)).join('')
    }
    const bumps = Array.from({ length: 36 }, (_, i) => {
      const a = i * 2.399
      const ring = 0.4 + (i % 5) * 0.14
      const cx = 200 + Math.cos(a) * 110 * ring
      const cy = 100 + Math.sin(a) * 84 * ring - 12
      return blob(cx, cy, 17 + (i % 4) * 2, 17 + (i % 4) * 2, 0, vol)
    }).join('')
    return `${blob(200, 108, 126, 94, 0, vol)}${bumps}`
  }

  if (style === 'bob') {
    if (layer === 'face') {
      return `<path d="M116 156 C164 100 244 100 284 156 L274 114 C232 70 168 70 126 114Z" fill="${vol}"/>`
    }
    return `<path d="M96 186 C84 82 136 30 200 30 C268 30 320 84 304 186 C292 234 262 250 236 246 L164 246 C138 250 108 230 96 186Z" fill="${vol}"/>`
  }

  if (style === 'spiky') {
    if (layer === 'face') return `${blob(200, 110, 88, 40, 0, vol)}`
    return `<path d="M122 158 L138 56 L166 144 L188 40 L200 142 L224 36 L242 142 L272 54 L286 158Z" fill="${vol}"/>`
  }

  if (style === 'ponytail') {
    if (layer === 'face') return `${blob(200, 86, 90, 48, 8, vol)}${blob(150, 110, 32, 36, -16, vol)}`
    return `${blob(286, 170, 32, 90, 18, vol)}${blob(262, 90, 14, 10, 0, `url(#${uid}-hair-deep)`)}`
  }

  if (style === 'long-straight') {
    if (layer === 'face') return `${blob(200, 80, 96, 50, 0, vol)}${blob(120, 150, 24, 40, -8, vol)}${blob(280, 150, 24, 40, 8, vol)}`
    return `<path d="M98 176 C88 80 140 36 200 38 C268 40 322 84 308 176 C318 280 308 390 292 460 C304 360 314 248 296 172 C284 92 232 66 200 68 C156 70 118 104 108 172 C96 270 106 380 122 460 C102 370 90 258 98 176Z" fill="${vol}"/>`
  }

  if (style === 'locs') {
    if (layer === 'face') return ''
    const locs = Array.from({ length: 22 }, (_, i) => {
      const a = -2.4 + (i / 21) * 4.8
      const x = 200 + Math.sin(a) * 86
      const y = 86 + (i % 3) * 12
      return `<rect x="${x - 8}" y="${y}" width="16" height="${48 + (i % 4) * 10}" rx="8" fill="${vol}" transform="rotate(${a * 14} ${x} ${y})"/>`
    }).join('')
    return `${blob(200, 108, 100, 48, 0, vol)}${locs}`
  }

  if (style === 'bun') {
    if (layer === 'face') return `${blob(200, 108, 90, 44, 0, vol)}`
    return `${blob(200, 48, 42, 38, 0, vol)}${blob(200, 32, 20, 12, 0, vol)}`
  }

  if (style === 'bangs-buns') {
    if (layer === 'face') {
      return `<path d="M118 162 C148 108 252 108 282 162 L276 126 C240 80 160 80 124 130Z" fill="${vol}"/>`
    }
    return `${blob(200, 112, 96, 48, 0, vol)}${blob(126, 60, 40, 36, 0, vol)}${blob(274, 60, 40, 36, 0, vol)}`
  }

  if (layer === 'face') return ''
  return blob(200, 108, 100, 52, 0, vol)
}

export function drawClayPortraitSvg(
  preset: PortraitPreset,
  uid: string,
  pose: Pick<PortraitPose, 'lookX' | 'lookY' | 'lid' | 'wink'>,
) {
  const f = clay(preset.face)
  const h = clay(preset.hair.color)
  const c = clay(preset.clothes.primary)
  const neck = clay(mixHex(preset.face, '#1a120c', 0.1))

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520" width="100%" height="100%" overflow="visible" aria-hidden="true">
      <defs>
        <radialGradient id="${uid}-skin" cx="34%" cy="22%" r="78%">
          <stop offset="0%" stop-color="${f.glow}"/>
          <stop offset="28%" stop-color="${f.light}"/>
          <stop offset="58%" stop-color="${f.fill}"/>
          <stop offset="86%" stop-color="${f.dark}"/>
          <stop offset="100%" stop-color="${f.deep}"/>
        </radialGradient>
        <radialGradient id="${uid}-neck" cx="42%" cy="0%" r="90%">
          <stop offset="0%" stop-color="${neck.light}"/>
          <stop offset="55%" stop-color="${neck.fill}"/>
          <stop offset="100%" stop-color="${neck.deep}"/>
        </radialGradient>
        <radialGradient id="${uid}-eye" cx="34%" cy="28%" r="70%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="46%" stop-color="#f7f4ee"/>
          <stop offset="100%" stop-color="#c4bdb0"/>
        </radialGradient>
        <radialGradient id="${uid}-ear" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="${f.light}"/>
          <stop offset="70%" stop-color="${f.fill}"/>
          <stop offset="100%" stop-color="${f.deep}"/>
        </radialGradient>
        <radialGradient id="${uid}-hair-vol" cx="32%" cy="28%" r="72%">
          <stop offset="0%" stop-color="${h.glow}"/>
          <stop offset="38%" stop-color="${h.light}"/>
          <stop offset="70%" stop-color="${h.fill}"/>
          <stop offset="100%" stop-color="${h.deep}"/>
        </radialGradient>
        <radialGradient id="${uid}-hair-deep" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="${h.fill}"/>
          <stop offset="100%" stop-color="${h.ao}"/>
        </radialGradient>
        <radialGradient id="${uid}-cloth-vol" cx="30%" cy="18%" r="82%">
          <stop offset="0%" stop-color="${c.light}"/>
          <stop offset="48%" stop-color="${c.fill}"/>
          <stop offset="100%" stop-color="${c.deep}"/>
        </radialGradient>
        <radialGradient id="${uid}-tee" cx="40%" cy="20%" r="80%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="55%" stop-color="#f4f0ea"/>
          <stop offset="100%" stop-color="#ddd6cc"/>
        </radialGradient>
        <filter id="${uid}-hair" x="-40%" y="-40%" width="180%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed="7" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.14 0" result="g"/>
          <feBlend in="SourceGraphic" in2="g" mode="overlay"/>
        </filter>
        <filter id="${uid}-cloth" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="4" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.55  0 0 0 0 0.55  0 0 0 0.1 0" result="g"/>
          <feBlend in="SourceGraphic" in2="g" mode="overlay"/>
        </filter>
        <filter id="${uid}-soft" x="-35%" y="-20%" width="170%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="14" flood-color="#1a120c" flood-opacity="0.12"/>
        </filter>
        <filter id="${uid}-eye-s" x="-55%" y="-55%" width="210%" height="210%">
          <feDropShadow dx="0" dy="5" stdDeviation="3" flood-color="#1a120c" flood-opacity="0.26"/>
        </filter>
      </defs>
      <g filter="url(#${uid}-soft)">
        <ellipse cx="200" cy="510" rx="118" ry="14" fill="#1a120c" opacity="0.1"/>
        ${hairSvg(preset, uid, 'back')}
        <g filter="url(#${uid}-cloth)">${clothesSvg(preset, uid, 'body')}</g>
        <path d="M168 250 C180 236 220 236 232 250 L242 306 C226 322 174 322 158 306 Z" fill="url(#${uid}-neck)"/>
        <ellipse cx="200" cy="266" rx="34" ry="11" fill="${f.ao}" opacity="0.26"/>
        ${clothesSvg(preset, uid, 'collar')}
        ${
          preset.ears
            ? `<g>
                <ellipse cx="106" cy="196" rx="18" ry="26" fill="url(#${uid}-ear)"/>
                <ellipse cx="294" cy="196" rx="18" ry="26" fill="url(#${uid}-ear)"/>
                <ellipse cx="110" cy="198" rx="9" ry="14" fill="${f.dark}" opacity="0.28"/>
                <ellipse cx="290" cy="198" rx="9" ry="14" fill="${f.dark}" opacity="0.28"/>
              </g>`
            : ''
        }
        <ellipse cx="200" cy="172" rx="94" ry="112" fill="url(#${uid}-skin)"/>
        <ellipse cx="158" cy="126" rx="36" ry="22" fill="#ffffff" opacity="0.1"/>
        <ellipse cx="200" cy="256" rx="50" ry="18" fill="${f.ao}" opacity="0.16"/>
        ${hairSvg(preset, uid, 'face')}
        <ellipse cx="200" cy="142" rx="70" ry="16" fill="${f.ao}" opacity="0.1"/>
        <g filter="url(#${uid}-eye-s)">
          ${eyeSvg(160, 176, 35, pose.lookX, pose.lookY, pose.lid, preset.face, uid, 'l')}
          ${eyeSvg(240, 176, 35, pose.lookX, pose.lookY, Math.max(pose.lid, pose.wink), preset.face, uid, 'r')}
        </g>
        ${hairSvg(preset, uid, 'front')}
        ${accessoriesSvg(preset)}
      </g>
    </svg>
  `
}
