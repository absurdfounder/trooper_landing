import React from 'react';

interface SectionShellProps {
  id?: string;
  eyebrow?: string;
  eyebrowNumber?: string;
  /** Default left. Use center when the section body is a centered composition. */
  eyebrowAlign?: 'left' | 'center';
  className?: string;
  bgClass?: string;
  /** Quiet presentation used by content sections on marketing subpages. */
  variant?: 'default' | 'marketing';
  noBorder?: boolean;
  noBorderBottom?: boolean;
  /** First section below fixed site header — clears TopBar + nav overlap */
  clearSiteHeader?: boolean;
  /**
   * Let the shell own the section's vertical rhythm instead of the child.
   *
   * Opt-in: most callers still pad their own children, and stacking both would
   * double the gap. Pass this only after removing the child's own padding.
   */
  rhythm?: boolean;
  children: React.ReactNode;
}

/**
 * SectionShell — establishes a consistent measure and vertical rhythm between
 * major landing-page sections, with an optional label for scroll waypoints.
 */
export default function SectionShell({
  id,
  eyebrow,
  eyebrowNumber,
  eyebrowAlign = 'left',
  className = '',
  bgClass = 'bg-canvas',
  variant = 'default',
  noBorder = false,
  noBorderBottom = true,
  clearSiteHeader = false,
  rhythm = false,
  children,
}: SectionShellProps) {
  const sectionClasses = [
    'relative',
    bgClass || 'bg-canvas',
    clearSiteHeader ? 'site-header-clear' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // The shared rail owns measure and gutter. Homepage sections keep their
  // subtle top rule; marketing subpages use an open, unnumbered presentation.
  const frameClasses = [
    'rail',
    bgClass || 'bg-canvas',
    !noBorder && variant !== 'marketing' ? 'border-t' : '',
    !noBorderBottom ? 'border-b' : '',
    variant === 'marketing'
      ? 'py-12 sm:py-16 lg:py-20'
      : rhythm
        ? 'py-9 sm:py-16 lg:py-20'
        : '',
  ]
    .filter(Boolean)
    .join(' ');

  const showLabel = Boolean(eyebrow || eyebrowNumber);
  const labelAlign = eyebrowAlign === 'center' ? 'justify-center text-center' : 'justify-start text-left';

  return (
    <section id={id} className={sectionClasses}>
      <div className={frameClasses}>
        {showLabel ? (
          <p className={`mb-4 flex items-baseline gap-2 sm:mb-6 ${labelAlign}`}>
            {eyebrowNumber && variant !== 'marketing' ? (
              <span className="font-mono text-[11px] tabular-nums text-ink-faint sm:text-[12px]">
                {eyebrowNumber}
              </span>
            ) : null}
            {eyebrow ? <span className="kicker !inline">{eyebrow}</span> : null}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
