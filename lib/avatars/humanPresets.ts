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

/** Chibi body that stays inside the 300×300 viewBox under a centered head. */
const torso = (id: string, w = 64, h = 72, d = 54, y = 88) =>
  node(`${id}-torso`, 'Torso', 'capsule', { w, h, d, r: 1 }, [0, y, -12])

const arms = (id: string, spread = 74, y = 84, lean = 22, len = 52) => [
  node(`${id}-arm-l`, 'Arm L', 'capsule', { w: 22, h: len, d: 22, r: 1 }, [-spread, y, 10], [0, 0, lean]),
  node(`${id}-arm-r`, 'Arm R', 'capsule', { w: 22, h: len, d: 22, r: 1 }, [spread, y, 10], [0, 0, -lean]),
]

const feet = (id: string, spread = 22, y = 128, w = 36, h = 24) => [
  node(`${id}-foot-l`, 'Foot L', 'sphere', { w, h, d: 32, r: 1 }, [-spread, y, 6]),
  node(`${id}-foot-r`, 'Foot R', 'sphere', { w, h, d: 32, r: 1 }, [spread, y, 6]),
]

/** Soft blob people — same primitives as Dot / Mickey / Jello, with a body attached. */
export const HUMAN_PRESETS: CharacterPreset[] = [
  person(
    'pip',
    'Pip',
    'Dot with a pill body and stubby feet — the default little person.',
    { type: 'sphere', width: 148, height: 148, depth: 134, roundness: 1 },
    [torso('pip'), ...arms('pip'), ...feet('pip')],
    { body: '#7ebef0', eyes: '#3f3f46' },
  ),
  person(
    'mochi',
    'Mochi',
    'Poyo energy, standing up — round head, chubby torso, tiny feet.',
    { type: 'sphere', width: 156, height: 148, depth: 140, roundness: 1 },
    [torso('mochi', 86, 68, 66, 90), ...arms('mochi', 82, 86, 18, 42), ...feet('mochi', 22, 126, 40, 26)],
    { body: '#ffc2e9', eyes: '#3e4e65' },
  ),
  person(
    'reed',
    'Reed',
    'Taller oval head and slimmer limbs — still one soft shape.',
    { type: 'sphere', width: 124, height: 148, depth: 112, roundness: 1 },
    [torso('reed', 50, 86, 44, 92), ...arms('reed', 68, 78, 16, 58), ...feet('reed', 16, 136, 28, 20)],
    { body: '#b49aef', eyes: '#3f3f46' },
  ),
  person(
    'cub',
    'Cub',
    'Jello with a body — rounded cube head on a matching box torso.',
    { type: 'cube', width: 118, height: 118, depth: 106, roundness: 0.78 },
    [
      node('cub-torso', 'Torso', 'cube', { w: 86, h: 74, d: 70, r: 0.82 }, [0, 92, -12]),
      ...arms('cub', 78, 84, 12, 48),
      ...feet('cub', 22, 130, 36, 24),
    ],
    { body: '#e65c5c', eyes: '#111316' },
  ),
  person(
    'nook',
    'Nook',
    'Mickey with a little body underneath — ears, then arms and feet.',
    { type: 'mickey', width: 150, height: 140, depth: 108, roundness: 1 },
    [torso('nook', 62, 68, 50, 90), ...arms('nook', 74, 84, 22, 48), ...feet('nook', 18, 126, 30, 22)],
    { body: '#5b7fe5', eyes: '#111316' },
  ),
  person(
    'bop',
    'Bop',
    'Round person with two soft buns — hair as extra spheres.',
    { type: 'sphere', width: 136, height: 136, depth: 124, roundness: 1 },
    [
      node('bop-bun-l', 'Bun L', 'sphere', { w: 38, h: 38, d: 36, r: 1 }, [-16, -82, -4]),
      node('bop-bun-r', 'Bun R', 'sphere', { w: 38, h: 38, d: 36, r: 1 }, [16, -82, -4]),
      torso('bop', 66, 70, 52, 86),
      ...arms('bop', 74, 82, 22, 50),
      ...feet('bop', 20, 124, 34, 22),
    ],
    { body: '#e69a5c', eyes: '#3f3f46' },
  ),
  person(
    'puff',
    'Puff',
    'Nimbus with a body — cloud head, pill torso, little feet.',
    { type: 'sphere', width: 112, height: 112, depth: 108, roundness: 1 },
    [
      node('puff-puff-l', 'Puff L', 'sphere', { w: 58, h: 58, d: 56, r: 1 }, [-38, -14, -12]),
      node('puff-puff-ll', 'Puff LL', 'sphere', { w: 76, h: 62, d: 64, r: 1 }, [-46, 14, -12]),
      node('puff-puff-r', 'Puff R', 'sphere', { w: 68, h: 68, d: 62, r: 1 }, [42, 14, -12]),
      node('puff-puff-tr', 'Puff TR', 'sphere', { w: 66, h: 66, d: 70, r: 1 }, [30, -26, -12]),
      torso('puff', 56, 62, 48, 92),
      ...arms('puff', 70, 86, 18, 44),
      ...feet('puff', 18, 126, 32, 22),
    ],
    { body: '#f0b45c', eyes: '#3f3f46' },
  ),
  person(
    'tin',
    'Can',
    'Tin with arms and feet — cylinder head on a matching can-body.',
    { type: 'cylinder', width: 120, height: 132, depth: 108, roundness: 0.9, morphRoundness: 0.35 },
    [
      node('tin-torso', 'Torso', 'cylinder', { w: 70, h: 72, d: 60, r: 0.85, morph: 0.3 }, [0, 96, -12]),
      ...arms('tin', 74, 86, 10, 48),
      ...feet('tin', 18, 132, 30, 20),
    ],
    { body: '#ffcf24', eyes: '#3f3f46' },
  ),
]
