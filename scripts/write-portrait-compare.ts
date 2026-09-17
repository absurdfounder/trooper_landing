import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { drawClayPortraitSvg } from '../lib/avatars/drawClayPortrait'
import { getPortraitPreset } from '../lib/avatars/portraitCatalog'

const ids = ['leo', 'jun', 'lila', 'mica'] as const
const rest: PortraitPoseLite = { lookX: 0, lookY: 0, lid: 0, wink: 0 }

type PortraitPoseLite = { lookX: number; lookY: number; lid: number; wink: number }

const cards = ids
  .map((id) => {
    const preset = getPortraitPreset(id)
    if (!preset) throw new Error(id)
    const svg = drawClayPortraitSvg(preset, `cmp-${id}`, rest)
    return `
      <section class="pair">
        <figure>
          ${svg}
          <figcaption>SVG · ${preset.name}</figcaption>
        </figure>
        <figure>
          <img src="images/portraits/${id}.webp" alt="${preset.name} reference"/>
          <figcaption>Reference · ${preset.name}</figcaption>
        </figure>
      </section>`
  })
  .join('\n')

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Portrait SVG vs reference</title>
  <style>
    body { margin: 0; background: #efebe4; font-family: ui-sans-serif, system-ui; color: #1a1a1a; }
    h1 { padding: 16px 20px 0; font-size: 16px; font-weight: 600; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 12px 16px 24px; }
    .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    figure { margin: 0; background: #fff; border-radius: 16px; padding: 8px; }
    svg, img { display: block; width: 100%; height: 340px; object-fit: contain; object-position: bottom; }
    figcaption { text-align: center; font-size: 12px; color: #666; padding-top: 6px; }
  </style>
</head>
<body>
  <h1>SVG portraits vs the four references</h1>
  <div class="grid">${cards}</div>
</body>
</html>
`

writeFileSync(join(process.cwd(), 'public/portrait-compare.html'), html)
console.log('wrote public/portrait-compare.html')
