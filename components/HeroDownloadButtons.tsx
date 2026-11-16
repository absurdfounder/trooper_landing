'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

import PixelButton from '@/components/ui/PixelButton';
import LinuxMark from '@/components/ui/LinuxMark';
import { detectPlatform, getPlatformDownload, type Platform } from '@/lib/platformDownload';

function PlatformIcon({ src, className = '' }: { src: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" aria-hidden className={`h-4 w-4 object-contain ${className}`} />
  );
}

/**
 * One download CTA for the visitor's OS (Mac / Windows / iOS / Android).
 * Detects after mount so SSR stays stable; falls back to the apps page on web.
 */
export default function HeroDownloadButtons({
  className = '',
  size = 'lg',
  variant = 'outline',
  tone = 'dark',
  icon,
  split = false,
  beamSource = false,
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline';
  tone?: 'brand' | 'dark' | 'light';
  icon?: ReactNode;
  /** OpenBot-style split download control, with platform availability in its menu. */
  split?: boolean;
  /** Let the landing beam follow this visible download control. */
  beamSource?: boolean;
}) {
  // Keep the server render platform-neutral. The label updates immediately
  // after mount once the visitor's actual device is available.
  const [platform, setPlatform] = useState<Platform>('unknown');
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ left: number; top: number } | null>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (splitRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const reposition = () => {
      const rect = splitRef.current?.getBoundingClientRect();
      if (!rect) return;
      const width = Math.min(304, window.innerWidth - 24);
      const height = Math.min(352, window.innerHeight - 24);
      const below = rect.bottom + 10;
      const top = below + height <= window.innerHeight - 12
        ? below
        : rect.top - height - 10 >= 12
          ? rect.top - height - 10
          : Math.max(12, window.innerHeight - height - 12);
      setMenuPosition({
        left: Math.max(12, Math.min(rect.left, window.innerWidth - width - 12)),
        top,
      });
    };
    reposition();
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition, true);
    };
  }, [menuOpen]);

  const togglePlatformMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      return;
    }
    const rect = splitRef.current?.getBoundingClientRect();
    if (rect) {
      const width = Math.min(304, window.innerWidth - 24);
      const height = Math.min(352, window.innerHeight - 24);
      const below = rect.bottom + 10;
      const top = below + height <= window.innerHeight - 12
        ? below
        : rect.top - height - 10 >= 12
          ? rect.top - height - 10
          : Math.max(12, window.innerHeight - height - 12);
      setMenuPosition({
        left: Math.max(12, Math.min(rect.left, window.innerWidth - width - 12)),
        top,
      });
    }
    setMenuOpen(true);
  };

  const download = getPlatformDownload(platform);
  // Platform SVGs ship as near-black fills — invert on solid dark/brand faces
  // so the mark stays visible (header "Download for Mac" was black-on-black).
  const lightFace = variant === 'solid' && tone !== 'light';

  if (split) {
    const options = [
      { name: 'macOS', icon: 'apple', status: 'Available now', available: true },
      { name: 'Windows', icon: 'windows', status: 'Coming soon', available: false },
      { name: 'Linux', icon: 'linux', status: 'Not available', available: false },
      { name: 'iOS', icon: 'apple', status: 'Coming soon', available: false },
      { name: 'Android', icon: 'android', status: 'Coming soon', available: false },
    ] as const;

    return (
      <div ref={splitRef} className={`relative inline-flex ${className}`}>
        <div data-hero-beam-source={beamSource ? '' : undefined} className="inline-flex min-h-12 overflow-hidden rounded-full bg-white text-[#15151a] shadow-[0_10px_36px_rgba(0,0,0,.22)] ring-1 ring-white/70">
          <Link
            href="/download/mac"
            className="inline-flex min-h-12 items-center justify-center gap-2.5 px-5 text-[15px] font-semibold tracking-[-0.02em] transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7aa824] sm:px-6 sm:text-base"
          >
            <PlatformIcon src="/images/platforms/apple.svg" className="h-[18px] w-[18px]" />
            <span>Download for macOS</span>
          </Link>
          <span className="my-2 w-px bg-neutral-300" aria-hidden />
          <button
            type="button"
            onClick={togglePlatformMenu}
            aria-label="Choose a download platform"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-controls="hero-platform-menu"
            className="inline-flex min-h-12 w-12 items-center justify-center transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7aa824] sm:w-[3.25rem]"
          >
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {menuOpen && menuPosition ? createPortal(
          <div
            ref={menuRef}
            id="hero-platform-menu"
            role="menu"
            aria-label="Download by platform"
            style={{ left: menuPosition.left, top: menuPosition.top }}
            className="fixed z-[1000] max-h-[min(22rem,calc(100vh-1.5rem))] w-[min(19rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-white/12 bg-[#17171c]/95 p-2 text-white shadow-[0_24px_80px_rgba(0,0,0,.55)] ring-1 ring-black/30 backdrop-blur-2xl animate-[trooperPlatformMenuIn_.18s_cubic-bezier(.2,.8,.2,1)]"
          >
            <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
              Choose your platform
            </p>
            {options.map((option) => {
              const row = (
                <>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-white/80">
                    {option.icon === 'linux' ? (
                      <LinuxMark className="h-[17px] w-[17px] text-white/85" />
                    ) : (
                      <PlatformIcon
                        src={`/images/platforms/${option.icon === 'apple' ? 'apple' : option.icon}.svg`}
                        className="h-[17px] w-[17px] brightness-0 invert"
                      />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block text-sm font-medium text-white">{option.name}</span>
                    <span className={`mt-0.5 block text-[11px] ${option.available ? 'text-emerald-300' : 'text-white/45'}`}>
                      {option.status}
                    </span>
                  </span>
                  {option.available ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.7)]" aria-hidden />
                  ) : null}
                </>
              );

              return option.available ? (
                <Link
                  key={option.name}
                  href="/download/mac"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50"
                >
                  {row}
                </Link>
              ) : (
                <div
                  key={option.name}
                  role="menuitem"
                  aria-disabled="true"
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 opacity-80"
                >
                  {row}
                </div>
              );
            })}
          </div>,
          document.body,
        ) : null}
      </div>
    );
  }

  return (
    <PixelButton
      href={download.href}
      external={download.external}
      size={size}
      variant={variant}
      tone={tone}
      className={`max-sm:active:translate-x-0 max-sm:active:translate-y-0 ${className}`}
      icon={icon}
    >
      <span className="inline-flex items-center gap-2">
        <PlatformIcon
          src={download.iconSrc}
          className={lightFace ? 'brightness-0 invert' : undefined}
        />
        {download.label}
      </span>
    </PixelButton>
  );
}
