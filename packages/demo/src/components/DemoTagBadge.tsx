'use client';

import { Hash, Tag, Target } from 'lucide-react';

import { DemoFavicon } from './DemoFavicon';
import type { DemoTag } from './demoTaskExecution';
import { TROOPER_DEMO as C } from './demoTheme';

/**
 * Inline entity pill.
 *
 * Extracted out of demoTaskModal so the marketing site can render the same
 * pill without pulling the whole task modal — and, through it, the entire
 * demo graph — into its bundle. The type is imported type-only so
 * demoTaskExecution's runtime exports never enter the graph either.
 */
export const TAG_COLORS: Record<DemoTag['type'], { bg: string; border: string; color: string }> = {
  channel: { bg: C.brandLight, border: C.border, color: C.textMuted },
  goal: { bg: C.successTint, border: C.border, color: C.success },
  site: { bg: 'rgba(217,154,71,0.14)', border: C.border, color: '#E9C48F' },
  topic: { bg: 'rgba(96,165,250,0.14)', border: C.border, color: '#A9CCFF' },
};

export function DemoTagBadge({ tag, size = 'sm' }: { tag: DemoTag; size?: 'sm' | 'xs' }) {
  const palette = TAG_COLORS[tag.type];
  const compact = size === 'xs';
  const iconSize = compact ? 10 : 11;
  const padY = compact ? 1 : 2;
  const padX = compact ? 5 : 7;
  const fontSize = compact ? 9 : 10;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: compact ? 3 : 4,
      padding: `${padY}px ${padX}px`, borderRadius: 999,
      background: palette.bg, border: `1px solid ${palette.border}`,
      color: palette.color, fontSize, fontWeight: 600, lineHeight: 1.2,
      whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {tag.type === 'site' && tag.domain ? (
        <DemoFavicon domain={tag.domain} size={iconSize + 2} rounded="sm" />
      ) : tag.type === 'channel' ? (
        <Hash size={iconSize} strokeWidth={2.25} />
      ) : tag.type === 'goal' ? (
        <Target size={iconSize} strokeWidth={2.25} />
      ) : (
        <Tag size={iconSize} strokeWidth={2.25} />
      )}
      {tag.type === 'channel' ? `#${tag.label}` : tag.label}
    </span>
  );
}
