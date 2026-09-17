import characterPresets from './characterPresets.json'
import { HUMAN_PRESETS } from './humanPresets'
import {
  PORTRAIT_PRESETS,
  isPortraitPreset,
  type PortraitPreset,
} from './portraitCatalog'

export type CharacterPresetCategory = 'human' | 'soft' | 'character' | 'simple'

export type CharacterPreset = {
  id: string
  name: string
  blurb: string
  category: CharacterPresetCategory
  kind?: 'blob'
  body: {
    primary: Record<string, unknown>
    nodes: unknown[]
  }
  eyes: Record<string, number>
  defaultColors: { body: string; eyes: string }
}

export type AnyCharacter = CharacterPreset

export const CHARACTER_PRESETS: CharacterPreset[] = [
  ...HUMAN_PRESETS,
  ...(characterPresets.presets as CharacterPreset[]),
]

export const ALL_CHARACTERS: AnyCharacter[] = CHARACTER_PRESETS

export const CHARACTER_CATEGORIES: {
  id: CharacterPresetCategory | 'all'
  label: string
}[] = [
  { id: 'all', label: 'All' },
  { id: 'human', label: 'People' },
  { id: 'soft', label: 'Soft / Disney-ish' },
  { id: 'character', label: 'Characters' },
  { id: 'simple', label: 'Simple shapes' },
]

/** Default silhouette per Trooper cast handle (matches shipping cast). */
export const DEFAULT_TEAM_PRESETS: Record<string, string> = {
  rex: 'cub',
  nova: 'nook',
  scout: 'puff',
  pip: 'pip',
  wren: 'mochi',
}

export function getCharacterPreset(id: string): CharacterPreset | undefined {
  return CHARACTER_PRESETS.find((p) => p.id === id)
}

export function getAnyCharacter(id: string): AnyCharacter | undefined {
  return ALL_CHARACTERS.find((p) => p.id === id)
}

export function presetsByCategory(category: CharacterPresetCategory | 'all'): AnyCharacter[] {
  if (category === 'all') return ALL_CHARACTERS
  return ALL_CHARACTERS.filter((p) => p.category === category)
}

export function isHumanPreset(preset: AnyCharacter): boolean {
  return preset.category === 'human'
}

export { PORTRAIT_PRESETS, isPortraitPreset, HUMAN_PRESETS }
export type { PortraitPreset }
