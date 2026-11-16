'use client';

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Cloud, Globe2, Laptop, Monitor, Server } from 'lucide-react';
import Link from 'next/link';

import EmbeddedDesktopHeroScene from '@/components/desktop-hero/EmbeddedDesktopHeroScene';
import OpenBotBeam from '@/components/desktop-hero/OpenBotBeam';
import PixelButton from '@/components/ui/PixelButton';
import { WORK_SURFACES, type WorkSurface } from '@/lib/whereTheyWork';
import { DevicesScene } from './where-they-work/WorkSurfaceScenes';

const SURFACE_SCENES = { devices: DevicesScene } satisfies Partial<Record<WorkSurface['id'], ComponentType>>;

const SURFACE_ICONS = {
  desktop: Monitor,
  browser: Globe2,
  devices: Laptop,
} satisfies Record<WorkSurface['id'], ComponentType<{ className?: string }>>;

const SURFACE_LABELS: Record<WorkSurface['id'], string> = {
  desktop: 'Desktop apps',
  browser: 'Your browser',
  devices: 'Your machines',
};

// Six machines take six beats each. Keep the tab timer aligned with the full
// fleet handoff so the last result has time to read before the next surface.
const SURFACE_DURATION_MS = 36 * 700;

const MACHINE_OPTIONS = [
  {
    icon: Laptop,
    title: 'This Mac',
    body: 'Start on this Mac and work with the apps and files already here.',
  },
  {
    icon: Server,
    title: 'Computers you own',
    body: 'Add another Mac or Linux box, then route work to the machine with the right tools.',
  },
  {
    icon: Cloud,
    title: 'Your cloud',
    body: 'Keep an enrolled cloud machine available for work that should keep moving.',
  },
];

function LaptopFrame({ mode, children }: { mode: WorkSurface['id']; children: ReactNode }) {
  const ariaLabel = mode === 'browser'
    ? 'Agent opens Google Chrome and researches a refund policy on the same Mac desktop'
    : mode === 'devices'
      ? 'Trooper agents route a shared task across six desktops on Macs, Linux, and cloud machines'
      : 'Agents use Xcode and WhatsApp on a Mac desktop';

  return (
    <figure className="mx-auto w-full max-w-[1220px]" aria-label={ariaLabel}>
      <div className="relative rounded-t-[18px] border border-[#555954] bg-gradient-to-b from-[#343733] via-[#242724] to-[#171917] p-2 pt-5 shadow-[0_24px_70px_rgba(17,24,17,.18)] sm:rounded-t-[24px] sm:p-3 sm:pt-6">
        <span aria-hidden="true" className="absolute left-1/2 top-[7px] h-1 w-1 -translate-x-1/2 rounded-full bg-black/70 shadow-[0_0_0_1px_rgba(255,255,255,.08)] sm:top-[9px]" />
        <div className={`overflow-hidden rounded-t-[10px] border border-black/50 bg-[#dce5de] sm:rounded-t-[14px] ${mode === 'devices' ? '' : 'aspect-[1.9/1]'}`}>
          {children}
        </div>
      </div>
      <div aria-hidden="true" className="relative z-10 mx-auto h-4 w-[104%] -translate-x-[2%] rounded-b-[9px] border border-white/15 bg-gradient-to-b from-[#555852] via-[#30332f] to-[#1b1d1b] shadow-[0_18px_42px_rgba(0,0,0,.22)] before:absolute before:left-[43%] before:top-0 before:h-1 before:w-[14%] before:rounded-b-lg before:bg-[#171917]">
        <span className="absolute inset-x-[33%] top-[5px] h-[5px] rounded-[2px] border border-white/[.08] bg-[repeating-linear-gradient(90deg,rgba(10,11,10,.45)_0_8px,rgba(255,255,255,.035)_8px_9px)]" />
        <span className="absolute left-1/2 top-[5px] h-[7px] w-[22%] -translate-x-1/2 rounded border border-white/[.08] bg-black/[.08]" />
      </div>
      <div aria-hidden="true" className="mx-auto h-1.5 w-[13%] rounded-b-full bg-[#252825]" />
      <figcaption className="sr-only">The animated Trooper desktop, with agents moving between files, spreadsheets, code, and a pull request.</figcaption>
    </figure>
  );
}

export default function ComputerUseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const elapsedRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const activeSurface = WORK_SURFACES[activeIndex] ?? WORK_SURFACES[0];
  const activeId = activeSurface.id;
  const Scene = SURFACE_SCENES[activeSurface.id];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(Boolean(entry?.isIntersecting)), { threshold: 0.05 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || reduceMotion || hasInteracted) return;
    let frame = 0;
    let previousTime: number | null = null;
    let lastPaint = 0;
    const advance = (now: number) => {
      if (document.hidden) {
        previousTime = null;
        frame = requestAnimationFrame(advance);
        return;
      }
      if (previousTime !== null) elapsedRef.current += Math.min(100, now - previousTime);
      previousTime = now;
      const nextProgress = Math.min(100, (elapsedRef.current / SURFACE_DURATION_MS) * 100);
      if (elapsedRef.current >= SURFACE_DURATION_MS) {
        elapsedRef.current = 0;
        setProgress(0);
        if (activeIndex === WORK_SURFACES.length - 1) setCompletedCount(0);
        else setCompletedCount(activeIndex + 1);
        setActiveIndex((current) => (current + 1) % WORK_SURFACES.length);
        return;
      }
      if (now - lastPaint >= 40) {
        setProgress(nextProgress);
        lastPaint = now;
      }
      frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, hasInteracted, isInView, reduceMotion]);

  const selectSurface = (index: number) => {
    setHasInteracted(true);
    elapsedRef.current = 0;
    setProgress(0);
    setCompletedCount(0);
    setActiveIndex(index);
  };

  return (
    <section ref={sectionRef} id="computer-use" className="relative isolate overflow-hidden border-y border-white/[0.08] bg-[#0b0e0c] py-14 text-white sm:py-20 lg:py-24" aria-labelledby="computer-use-title">
      <OpenBotBeam surfaceSelector="#computer-use" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_7%,rgba(83,190,151,.10),transparent_43%),radial-gradient(ellipse_at_4%_82%,rgba(50,154,185,.07),transparent_38%),linear-gradient(180deg,rgba(255,255,255,.012),transparent_35%,rgba(255,255,255,.018))]" />
      <div className="rail relative z-10">
        <header className="mx-auto max-w-3xl text-center">
          <p className="kicker !text-[#67d4ab]">Computer use</p>
          <h2 id="computer-use-title" className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.8rem)] font-medium leading-[1.04] tracking-[-0.05em] text-white text-balance">
            As many desktops as your computers can hold.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg sm:leading-8">
            Start on this Mac, add computers you own, or bring in a cloud machine. Troopers use the right desktop, then return the work to the same shared task and team workspace.
          </p>
        </header>

        <div className="mx-auto mt-9 max-w-[1440px] overflow-hidden rounded-[24px] border border-white/[0.10] bg-[#121614]/90 p-2 shadow-[0_34px_100px_-54px_rgba(0,0,0,.9),inset_0_1px_0_rgba(255,255,255,.035)] backdrop-blur-xl sm:mt-12 sm:rounded-[30px] sm:p-3">
          <div className="grid grid-cols-3 gap-1 px-1 py-1 sm:gap-2 sm:px-3 sm:py-2" role="tablist" aria-label="Computer-use surfaces">
            {WORK_SURFACES.map((surface, index) => {
              const Icon = SURFACE_ICONS[surface.id];
              const selected = activeIndex === index;
              const tabProgress = selected ? progress : index < completedCount ? 100 : 0;
              return (
                <button
                  key={surface.id}
                  id={`computer-use-tab-${surface.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="computer-use-panel"
                  onClick={() => selectSurface(index)}
                  className={`group relative inline-flex min-h-[48px] min-w-0 flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl px-1.5 pb-2 pt-1.5 text-[10px] font-medium transition-colors sm:min-h-[58px] sm:flex-row sm:gap-2 sm:px-5 sm:pb-2.5 sm:pt-2 sm:text-sm ${selected ? 'text-white' : 'text-white/48 hover:text-white/80'}`}
                >
                  <span className="inline-flex min-w-0 items-center justify-center gap-1.5 sm:gap-2">
                    <Icon className={`size-4 shrink-0 ${selected ? 'text-[#7be0bd]' : ''}`} strokeWidth={1.8} aria-hidden="true" />
                    <span className="truncate">{SURFACE_LABELS[surface.id]}</span>
                  </span>
                  <span className="absolute inset-x-2 bottom-1 h-[2px] overflow-hidden rounded-full bg-white/[0.09] sm:inset-x-4 sm:bottom-1.5" role="progressbar" aria-label={`${SURFACE_LABELS[surface.id]} animation progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(tabProgress)}>
                    <span className="block h-full rounded-full bg-gradient-to-r from-[#55d2a4] to-[#67c9df] shadow-[0_0_10px_rgba(91,210,174,.38)]" style={{ width: `${tabProgress}%`, transition: reduceMotion ? 'none' : 'width 80ms linear' }} />
                  </span>
                </button>
              );
            })}
          </div>

          <div id="computer-use-panel" role="tabpanel" aria-labelledby={`computer-use-tab-${activeId}`} className="mt-2 overflow-hidden rounded-[18px] border border-white/[0.09] bg-[#090b0a] shadow-[0_22px_64px_rgba(0,0,0,.28)] sm:rounded-[22px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSurface.id}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {activeSurface.id === 'desktop' || activeSurface.id === 'browser' ? (
                  <div className="p-1.5 sm:p-3 lg:p-4">
                    <LaptopFrame mode={activeSurface.id}>
                      <EmbeddedDesktopHeroScene mode={activeSurface.id} />
                    </LaptopFrame>
                  </div>
                ) : activeSurface.id === 'devices' ? (
                  <div className="p-1.5 sm:p-3 lg:p-4">
                    <LaptopFrame mode="devices">
                      {Scene ? <Scene /> : null}
                    </LaptopFrame>
                  </div>
                ) : null}

              {activeSurface.id === 'devices' ? (
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] bg-[#101311] px-4 py-3 sm:px-6 sm:py-4">
                    <p className="max-w-xl text-[13px] leading-relaxed text-white/60 sm:text-sm">
                      Keep your Mac, other computers, and cloud machines in one list. Every desktop stays connected to the same task.
                    </p>
                    <div className="flex shrink-0 items-center gap-4">
                      <PixelButton
                        href={activeSurface.cta.href}
                        external={activeSurface.cta.external}
                        size="sm"
                        tone="dark"
                        icon={<ArrowRight className="h-3.5 w-3.5" />}
                      >
                        {activeSurface.cta.label}
                      </PixelButton>
                      {activeSurface.secondary ? (
                        <Link className="group link-mono hidden sm:inline-flex" href={activeSurface.secondary.href}>
                          <span>{activeSurface.secondary.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid gap-3 px-1 pb-1 pt-5 sm:grid-cols-3 sm:gap-4 sm:px-2 sm:pt-6">
            {MACHINE_OPTIONS.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.025)] sm:p-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-xl bg-emerald-300/10 text-[#7be0bd] ring-1 ring-emerald-200/15"><Icon className="size-4" strokeWidth={1.8} /></span>
                  <h3 className="text-sm font-semibold text-white/90">{title}</h3>
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-white/55">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
