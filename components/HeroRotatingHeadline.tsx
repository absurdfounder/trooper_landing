'use client';

type HeroRotatingHeadlineProps = {
  className?: string;
};

export default function HeroRotatingHeadline({ className = '' }: HeroRotatingHeadlineProps) {
  return (
    <h1 className={`trooper-hero-title ${className}`.trim()}>
      <span>Give the order.</span>
      <span>Your troopers ship it.</span>
    </h1>
  );
}
