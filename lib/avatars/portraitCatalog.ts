/**
 * Half-body clay portraits — hair, clothes, and googly eyes.
 * Face fill comes from the builder theme; hair and wardrobe stay character-specific.
 */

export type HairStyle =
  | 'double-buns'
  | 'afro'
  | 'short-curls'
  | 'swept'
  | 'braid'
  | 'wavy'
  | 'bob'
  | 'spiky'
  | 'ponytail'
  | 'long-straight'
  | 'locs'
  | 'bun'
  | 'bangs-buns'
  | 'short-crop'

export type ClothesStyle =
  | 'overalls'
  | 'jacket-tee'
  | 'zip-sweater'
  | 'button-shirt'
  | 'knit-sweater'
  | 'vest-tee'
  | 'hoodie-jacket'
  | 'turtleneck-blazer'
  | 'zip-jumpsuit'
  | 'hoodie'
  | 'polo-zip'
  | 'suit'
  | 'turtleneck'

export type PortraitAccessory =
  | 'hoops'
  | 'beads'
  | 'necklace'
  | 'glasses'
  | 'tortoise-glasses'
  | 'headphones'
  | 'bag-strap'
  | 'pocket-pen'

export type PortraitPreset = {
  kind: 'portrait'
  id: string
  name: string
  blurb: string
  category: 'portrait'
  /** Default face fill — overridden by the active theme in the builder. */
  face: string
  hair: { style: HairStyle; color: string }
  clothes: { style: ClothesStyle; primary: string; secondary: string }
  accessories: PortraitAccessory[]
  ears: boolean
}

export const PORTRAIT_PRESETS: PortraitPreset[] = [
  {
    kind: 'portrait',
    id: 'nori',
    name: 'Nori',
    blurb: 'Teal buns, overalls, and gold hoops — crew lead energy.',
    category: 'portrait',
    face: '#2cb8c9',
    hair: { style: 'double-buns', color: '#2cb8c9' },
    clothes: { style: 'overalls', primary: '#cdbba4', secondary: '#f3eee6' },
    accessories: ['hoops', 'beads'],
    ears: true,
  },
  {
    kind: 'portrait',
    id: 'coco',
    name: 'Coco',
    blurb: 'Pink face, green coil afro, open jacket over a white tee.',
    category: 'portrait',
    face: '#ed5a9e',
    hair: { style: 'afro', color: '#2f6b38' },
    clothes: { style: 'jacket-tee', primary: '#e5d3b0', secondary: '#f7f4ef' },
    accessories: [],
    ears: false,
  },
  {
    kind: 'portrait',
    id: 'jun',
    name: 'Jun',
    blurb: 'Olive crew cut with a cream zip — calm and ready.',
    category: 'portrait',
    face: '#7ba33a',
    hair: { style: 'short-curls', color: '#4f7a2a' },
    clothes: { style: 'zip-sweater', primary: '#e6d9c6', secondary: '#f7f4ef' },
    accessories: [],
    ears: true,
  },
  {
    kind: 'portrait',
    id: 'leo',
    name: 'Leo',
    blurb: 'Violet face, ice-blue sweep, open camp shirt.',
    category: 'portrait',
    face: '#7b4fd1',
    hair: { style: 'swept', color: '#9eb6e8' },
    clothes: { style: 'button-shirt', primary: '#d7c4a6', secondary: '#f7f4ef' },
    accessories: [],
    ears: true,
  },
  {
    kind: 'portrait',
    id: 'lila',
    name: 'Lila',
    blurb: 'Long violet braid over a cream zip fleece.',
    category: 'portrait',
    face: '#9a7ae8',
    hair: { style: 'braid', color: '#8b68d9' },
    clothes: { style: 'zip-sweater', primary: '#ede6d8', secondary: '#ede6d8' },
    accessories: [],
    ears: false,
  },
  {
    kind: 'portrait',
    id: 'mica',
    name: 'Mica',
    blurb: 'Sunshine face, ocean waves, knit sweater and a gold chain.',
    category: 'portrait',
    face: '#e8c63a',
    hair: { style: 'wavy', color: '#2b62c9' },
    clothes: { style: 'knit-sweater', primary: '#f0ebe4', secondary: '#e4d9cc' },
    accessories: ['necklace', 'bag-strap'],
    ears: false,
  },
  {
    kind: 'portrait',
    id: 'viola',
    name: 'Viola',
    blurb: 'Purple bob with bangs, brown knit vest, bag on the shoulder.',
    category: 'portrait',
    face: '#8b5cf0',
    hair: { style: 'bob', color: '#6b21c8' },
    clothes: { style: 'vest-tee', primary: '#3f2e24', secondary: '#f7f4ef' },
    accessories: ['bag-strap'],
    ears: false,
  },
  {
    kind: 'portrait',
    id: 'ember',
    name: 'Ember',
    blurb: 'Spiky ginger, plush hoodie, fleece jacket — always on.',
    category: 'portrait',
    face: '#f0a020',
    hair: { style: 'spiky', color: '#e07818' },
    clothes: { style: 'hoodie-jacket', primary: '#e8dcc8', secondary: '#f5f2ed' },
    accessories: [],
    ears: true,
  },
  {
    kind: 'portrait',
    id: 'cole',
    name: 'Cole',
    blurb: 'Blue face, navy coils, turtleneck under a sand blazer.',
    category: 'portrait',
    face: '#2b6bea',
    hair: { style: 'short-curls', color: '#1e3f8f' },
    clothes: { style: 'turtleneck-blazer', primary: '#ddd0ba', secondary: '#f5f2ed' },
    accessories: [],
    ears: true,
  },
  {
    kind: 'portrait',
    id: 'frost',
    name: 'Frost',
    blurb: 'Teal skin, long silver hair, cream zip jumpsuit.',
    category: 'portrait',
    face: '#1fb5a8',
    hair: { style: 'long-straight', color: '#c5cad0' },
    clothes: { style: 'zip-jumpsuit', primary: '#e8ddcc', secondary: '#e8ddcc' },
    accessories: ['bag-strap'],
    ears: false,
  },
  {
    kind: 'portrait',
    id: 'tessa',
    name: 'Tessa',
    blurb: 'High orange ponytail, turtleneck, and a sharp beige blazer.',
    category: 'portrait',
    face: '#f07828',
    hair: { style: 'ponytail', color: '#e05210' },
    clothes: { style: 'turtleneck-blazer', primary: '#ddd0ba', secondary: '#f5f2ed' },
    accessories: [],
    ears: true,
  },
  {
    kind: 'portrait',
    id: 'rio',
    name: 'Rio',
    blurb: 'Olive face, grey locs, hoodie and a sling strap.',
    category: 'portrait',
    face: '#7aa32e',
    hair: { style: 'locs', color: '#9a9b88' },
    clothes: { style: 'hoodie', primary: '#a89886', secondary: '#c4b8aa' },
    accessories: ['bag-strap'],
    ears: true,
  },
  {
    kind: 'portrait',
    id: 'faye',
    name: 'Faye',
    blurb: 'Long pink hair over a cream zip polo.',
    category: 'portrait',
    face: '#e85a9b',
    hair: { style: 'long-straight', color: '#f084b0' },
    clothes: { style: 'polo-zip', primary: '#e8ddc8', secondary: '#e8ddc8' },
    accessories: [],
    ears: false,
  },
  {
    kind: 'portrait',
    id: 'ora',
    name: 'Ora',
    blurb: 'Pink bun, round glasses, ivory suit — the boardroom one.',
    category: 'portrait',
    face: '#e879a8',
    hair: { style: 'bun', color: '#e8a8c4' },
    clothes: { style: 'suit', primary: '#f4f0ea', secondary: '#efeae2' },
    accessories: ['glasses'],
    ears: true,
  },
  {
    kind: 'portrait',
    id: 'kiki',
    name: 'Kiki',
    blurb: 'Mint face, pink buns and bangs, studio headphones on.',
    category: 'portrait',
    face: '#4caf6a',
    hair: { style: 'bangs-buns', color: '#f3a8c8' },
    clothes: { style: 'zip-sweater', primary: '#e8dcc8', secondary: '#e8dcc8' },
    accessories: ['headphones'],
    ears: false,
  },
  {
    kind: 'portrait',
    id: 'nico',
    name: 'Nico',
    blurb: 'Tortoise glasses, ginger sweep, pen in the blazer pocket.',
    category: 'portrait',
    face: '#6b9a32',
    hair: { style: 'swept', color: '#e87828' },
    clothes: { style: 'turtleneck-blazer', primary: '#ddd0ba', secondary: '#f7f4ef' },
    accessories: ['tortoise-glasses', 'pocket-pen'],
    ears: true,
  },
]

export function getPortraitPreset(id: string): PortraitPreset | undefined {
  return PORTRAIT_PRESETS.find((p) => p.id === id)
}

export function isPortraitPreset(value: { kind?: string } | undefined): value is PortraitPreset {
  return value?.kind === 'portrait'
}
