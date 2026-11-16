/** Trooper's ink appearance, mirrored from the app's `src/index.css`. */
export const TROOPER_DEMO = {
  brand: '#E6E6E6',
  brandHover: '#FFFFFF',
  brandForeground: '#1A1A1A',
  /** `--color-primary-light` and `--color-chip` in the app's ink appearance. */
  brandLight: '#313131',
  brandSoft: '#3F3F3F',
  /** The app's success/agent color remains a distinct, restrained accent. */
  success: '#61AA64',
  successTint: 'rgba(97,170,100,0.16)',
  warning: '#D99A47',
  danger: '#F07878',
  brandTint: 'rgba(97,170,100,0.16)',
  bg: '#1A1A1A',
  card: '#242424',
  cardWarm: '#1C1C1C',
  border: '#3F3F3F',
  borderWarm: '#2B2B2B',
  text: '#E6E6E6',
  textMuted: '#B3B3B3',
  textSubtle: '#8C8C8C',
  olive: '#69D8A6',
  radius: 12,
  radiusLg: 16,
  radiusSm: 8,
} as const;

/** Kanban surfaces adapted to the app's ink theme and semantic status colors. */
export const KANBAN_COLUMNS = {
  inbox: {
    id: 'inbox',
    label: 'TODO',
    emoji: '🎯',
    headerBg: '#313131',
    headerText: '#E6E6E6',
    bodyBg: 'rgba(49,49,49,0.34)',
  },
  in_progress: {
    id: 'in_progress',
    label: 'IN PROGRESS',
    emoji: '⏳',
    headerBg: '#2B2B2B',
    headerText: '#E6E6E6',
    bodyBg: 'rgba(49,49,49,0.3)',
  },
  review: {
    id: 'review',
    label: 'HUMAN REVIEW',
    emoji: '📝',
    headerBg: 'rgba(217,154,71,0.14)',
    headerText: '#E9C48F',
    bodyBg: 'rgba(49,49,49,0.3)',
  },
  done: {
    id: 'done',
    label: 'COMPLETED',
    emoji: '🎉',
    headerBg: 'rgba(97,170,100,0.16)',
    headerText: '#9ACD9C',
    bodyBg: 'rgba(49,49,49,0.3)',
  },
} as const;

export type DemoColumnId = keyof typeof KANBAN_COLUMNS;
