import type { ReactNode } from 'react';

/**
 * Draws a fixed-pixel composition, then scales it to the column.
 * String beads use offset-path in that pixel space, so the artboard
 * has to stay a real width and only the wrapper shrinks.
 */
export default function ScaledBoard({
  width,
  height,
  children,
  className = '',
}: {
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`pricing-scale-frame flex justify-center ${className}`}>
      <div
        className="relative shrink-0"
        style={{
          width: `min(100cqw, ${width}px)`,
          height: `calc(${height}px * min(100cqw, ${width}px) / ${width}px)`,
        }}
      >
        <div
          className="absolute left-0 top-0"
          style={{
            width,
            height,
            transformOrigin: 'top left',
            transform: `scale(calc(min(100cqw, ${width}px) / ${width}px))`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
