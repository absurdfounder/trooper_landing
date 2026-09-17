import type { CharacterPreset } from './characterCatalog'

type Vec3 = [number, number, number]

const EYES = {
  widthLeft: 16,
  widthRight: 16,
  heightLeft: 38,
  heightRight: 38,
  spacing: 26,
  positionXLeft: 0,
  positionXRight: 0,
  positionYLeft: -4,
  positionYRight: -4,
  leftAngle: 0,
  rightAngle: 0,
}

function node(
  id: string,
  name: string,
  type: 'sphere' | 'cube' | 'capsule' | 'cylinder',
  size: { w: number; h: number; d: number; r?: number; morph?: number },
  position: Vec3,
  rotation: Vec3 = [0, 0, 0],
) {
  return {
    id,
    name,
    surface: {
      type,
      width: size.w,
      height: size.h,
      depth: size.d,
      roundness: size.r ?? 1,
      ...(size.morph != null ? { morphRoundness: size.morph } : {}),
    },
    position,
    rotation,
  }
}

function person(
  id: string,
  name: string,
  blurb: string,
  primary: CharacterPreset['body']['primary'],
  extras: ReturnType<typeof node>[],
  defaultColors: CharacterPreset['defaultColors'],
  eyes: CharacterPreset['eyes'] = EYES,
): CharacterPreset {
  return {
    id,
    name,
    blurb,
    category: 'human',
    kind: 'blob',
    body: { primary, nodes: extras },
    eyes,
    defaultColors,
  }
}

/** Half-body bust: turtleneck in front, cropped jacket behind. No legs. */
const ears = (id: string, spread = 90, y = 8, w = 32, h = 38) => [
  node(`${id}-ear-l`, 'Ear L', 'sphere', { w, h, d: 22, r: 1 }, [-spread, y, 12]),
  node(`${id}-ear-r`, 'Ear R', 'sphere', { w, h, d: 22, r: 1 }, [spread, y, 12]),
]

const turtleneck = (id: string, w = 56, h = 58, y = 96) =>
  node(`${id}-neck`, 'Neck', 'capsule', { w, h, d: 50, r: 1 }, [0, y, 16])

const jacket = (id: string, w = 252, h = 150, y = 162) =>
  node(`${id}-jacket`, 'Jacket', 'cube', { w, h, d: 96, r: 0.58 }, [0, y, -28])

const bust = (id: string, withEars = true) => [
  ...(withEars ? ears(id) : []),
  turtleneck(id),
  jacket(id),
]

/** Soft blob people — same primitives as Dot / Mickey, framed as a half-body bust. */
export const HUMAN_PRESETS: CharacterPreset[] = [
  person(
    'pip',
    'Pip',
    'Dot as a half-body — round head, ears, turtleneck, cropped jacket.',
    { type: 'sphere', width: 178, height: 178, depth: 160, roundness: 1 },
    bust('pip'),
    { body: '#7ebef0', eyes: '#3f3f46' },
  ),
  person(
    'mochi',
    'Mochi',
    'Poyo as a bust — softer head, turtleneck, cropped at the chest.',
    { type: 'sphere', width: 188, height: 176, depth: 168, roundness: 1 },
    [turtleneck('mochi', 68, 54, 98), jacket('mochi', 268, 146, 164)],
    { body: '#ffc2e9', eyes: '#3e4e65' },
  ),
  person(
    'reed',
    'Reed',
    'Oval head on a slimmer bust — turtleneck, cropped jacket.',
    { type: 'sphere', width: 156, height: 188, depth: 140, roundness: 1 },
    [...ears('reed', 82, 10, 28, 36), turtleneck('reed', 44, 62, 100), jacket('reed', 214, 156, 166)],
    { body: '#b49aef', eyes: '#3f3f46' },
  ),
  person(
    'cub',
    'Cub',
    'Jello as a half-body — cube head on a matching box jacket.',
    { type: 'cube', width: 164, height: 164, depth: 146, roundness: 0.78 },
    [turtleneck('cub', 56, 50, 94), jacket('cub', 256, 146, 160)],
    { body: '#e65c5c', eyes: '#111316' },
  ),
  person(
    'nook',
    'Nook',
    'Mickey as a bust — ears, turtleneck, cropped at the chest.',
    { type: 'mickey', width: 186, height: 176, depth: 132, roundness: 1 },
    [turtleneck('nook', 50, 54, 92), jacket('nook', 246, 146, 158)],
    { body: '#5b7fe5', eyes: '#111316' },
  ),
  person(
    'bop',
    'Bop',
    'Round bust with two soft buns — hair on a half-body.',
    { type: 'sphere', width: 170, height: 170, depth: 154, roundness: 1 },
    [
      node('bop-bun-l', 'Bun L', 'sphere', { w: 48, h: 48, d: 42, r: 1 }, [-20, -94, -6]),
      node('bop-bun-r', 'Bun R', 'sphere', { w: 48, h: 48, d: 42, r: 1 }, [20, -94, -6]),
      ...bust('bop'),
    ],
    { body: '#e69a5c', eyes: '#3f3f46' },
  ),
  person(
    'puff',
    'Puff',
    'Nimbus as a half-body — cloud head on a cropped jacket.',
    { type: 'sphere', width: 140, height: 140, depth: 132, roundness: 1 },
    [
      node('puff-puff-l', 'Puff L', 'sphere', { w: 78, h: 78, d: 72, r: 1 }, [-50, -22, -12]),
      node('puff-puff-ll', 'Puff LL', 'sphere', { w: 90, h: 74, d: 76, r: 1 }, [-56, 6, -12]),
      node('puff-puff-r', 'Puff R', 'sphere', { w: 84, h: 84, d: 76, r: 1 }, [52, 4, -12]),
      node('puff-puff-tr', 'Puff TR', 'sphere', { w: 86, h: 86, d: 88, r: 1 }, [38, -38, -12]),
      jacket('puff', 236, 140, 156),
    ],
    { body: '#f0b45c', eyes: '#3f3f46' },
  ),
  person(
    'tin',
    'Can',
    'Tin as a bust — cylinder head on a cropped jacket.',
    { type: 'cylinder', width: 156, height: 176, depth: 140, roundness: 0.9, morphRoundness: 0.35 },
    [turtleneck('tin', 64, 50, 100), jacket('tin', 240, 140, 164)],
    { body: '#ffcf24', eyes: '#3f3f46' },
  ),
]
