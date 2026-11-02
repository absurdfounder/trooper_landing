import type { ReactNode } from 'react';

/**
 * One moat slide: a single claim, then one figure.
 * Same rail and hairline as the rest of the page, with the taller rhythm
 * these diagrams need.
 */
export default function SlideFrame({
  id,
  labelledBy,
  children,
}: {
  id?: string;
  labelledBy: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className="bg-canvas">
      <div className="rail border-t border-[var(--color-line)] py-16 sm:py-24 lg:pb-32 lg:pt-24">
        {children}
      </div>
    </section>
  );
}
