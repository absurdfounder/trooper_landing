'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Circle, LoaderCircle, Lock, Pause, Play, RotateCcw } from 'lucide-react';

const DEMO_WIDTH = 1320;
const DEMO_HEIGHT = 744;
const CHROME_HEIGHT = 44;

const PREVIEW_TASKS = [
  { title: 'SEO Optimization for Wonder', owner: 'Aria', color: '#70c9a0', badge: 'Urgent' },
  { title: 'Improve Website User Experience', owner: 'Ren', color: '#83a9e8', badge: '' },
  { title: 'Update the launch gallery', owner: 'Jordan', color: '#d8a1e5', badge: '' },
  { title: 'Review launch day checklist', owner: 'Leo', color: '#e2bc72', badge: 'Review' },
];

function PreviewPoster() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex overflow-hidden bg-[#18191b] text-[#f4f4f5]">
      <aside className="flex w-[220px] shrink-0 flex-col border-r border-white/[0.08] bg-[#202123] p-3">
        <div className="flex h-10 items-center gap-2 px-2 text-[13px] font-semibold">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-[#74c8a2] text-[12px] font-bold text-[#101512]">T</span>
          trooper.so <span className="ml-auto text-white/40">⌄</span>
        </div>
        <div className="mt-4 space-y-1 text-[12px] text-white/65">
          <div className="rounded-lg bg-white/[0.09] px-3 py-2 text-white">◉&nbsp;&nbsp; Chats <span className="float-right text-white/45">3</span></div>
          <div className="px-3 py-2">▦&nbsp;&nbsp; Tasks</div>
          <div className="px-3 py-2">◷&nbsp;&nbsp; Activity</div>
          <div className="px-3 py-2">⌘&nbsp;&nbsp; Apps</div>
        </div>
        <div className="mt-6 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">Your team</div>
        <div className="mt-2 space-y-1 text-[12px]">
          {[
            ['J', 'Jordan', '#d7a6ed'],
            ['A', 'Aria', '#79c9a3'],
            ['R', 'Ren', '#84a9e8'],
            ['L', 'Leo', '#e3bd75'],
          ].map(([initial, name, color]) => (
            <div key={name} className="flex items-center gap-2 rounded-lg px-2 py-2 text-white/75">
              <span className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-semibold text-[#171719]" style={{ background: color }}>{initial}</span>
              {name}<span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#70c9a0]" />
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-lg border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-[10px] text-white/45">Shared workspace · 4 teammates</div>
      </aside>

      <main className="flex min-w-0 flex-1 overflow-hidden">
        <section className="flex min-w-0 flex-col border-r border-white/[0.08]" style={{ width: '42%' }}>
          <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.08] px-4 text-[12px]">
            <span className="font-medium"># general</span><span className="text-white/35">⌕ &nbsp; •••</span>
          </header>
          <div className="flex-1 space-y-3 overflow-hidden px-4 py-4 text-[11px] leading-[1.45]">
            <div className="mx-auto w-fit rounded-full bg-white/[0.07] px-3 py-1 text-[9px] text-white/45">Today</div>
            <div className="max-w-[88%] rounded-xl rounded-tl-sm border border-white/[0.07] bg-[#28292c] px-3 py-2.5 text-white/80">I’ve pulled together the launch work from our last three launches.</div>
            <div className="ml-auto max-w-[84%] rounded-xl rounded-tr-sm bg-[#344c42] px-3 py-2.5 text-white/90">Great. Assign it to the right people and keep everything in one place.</div>
            <div className="max-w-[88%] rounded-xl rounded-tl-sm border border-white/[0.07] bg-[#28292c] px-3 py-2.5 text-white/80">Done. Aria has growth, Ren has product, and Leo has operations.</div>
            <div className="flex items-center gap-2 pt-1 text-[9px] text-white/40"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#d7a6ed] text-[#1d1720]">J</span> Jordan · Chief of Staff</div>
          </div>
          <div className="mx-3 mb-3 flex h-9 shrink-0 items-center rounded-lg border border-white/[0.1] bg-white/[0.035] px-3 text-[10px] text-white/35">Message your team… <span className="ml-auto">＋</span></div>
        </section>

        <section className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#1b1c1e]">
          <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.08] px-4">
            <div><div className="text-[12px] font-semibold">Launch day</div><div className="mt-0.5 text-[9px] text-white/40">6 tasks · 4 teammates</div></div>
            <button type="button" tabIndex={-1} className="rounded-md border border-white/[0.1] px-2 py-1 text-[9px] text-white/55">＋ Add task</button>
          </header>
          <div className="grid min-h-0 flex-1 grid-cols-4 gap-2 overflow-hidden p-3">
            {[
              { label: 'TO DO', count: '0', tasks: [] as typeof PREVIEW_TASKS },
              { label: 'IN PROGRESS', count: '6', tasks: PREVIEW_TASKS.slice(0, 3) },
              { label: 'HUMAN REVIEW', count: '0', tasks: [] as typeof PREVIEW_TASKS },
              { label: 'COMPLETED', count: '0', tasks: [] as typeof PREVIEW_TASKS },
            ].map((column) => (
              <div key={column.label} className="min-w-0 rounded-lg bg-[#222326] p-2">
                <div className="mb-2 flex items-center justify-between gap-1 px-0.5 text-[8px] font-semibold tracking-[0.04em] text-white/50">
                  <span className="truncate">{column.label}</span><span>{column.count}</span>
                </div>
                <div className="space-y-2">
                  {column.tasks.map((task) => (
                    <div key={task.title} className="rounded-md border border-white/[0.08] bg-[#2b2c2f] p-2 text-[9px] leading-[1.35] text-white/80 shadow-[0_2px_8px_rgba(0,0,0,.18)]">
                      {task.badge ? <div className="mb-1.5 text-[7px] font-semibold uppercase tracking-[0.06em]" style={{ color: task.color }}>{task.badge}</div> : null}
                      <div className="line-clamp-2 min-h-[24px]">{task.title}</div>
                      <div className="mt-2 flex items-center gap-1.5 border-t border-white/[0.06] pt-2 text-[8px] text-white/45"><span className="grid h-4 w-4 place-items-center rounded-full text-[7px] text-[#171719]" style={{ background: task.color }}>{task.owner[0]}</span>{task.owner}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`block animate-pulse rounded bg-white/[0.075] motion-reduce:animate-none ${className}`} />;
}

function DashboardSkeleton() {
  return (
    <div role="status" aria-label="Loading Trooper workspace" className="absolute inset-0 flex overflow-hidden bg-[#191a1c] text-white">
      <span className="sr-only">Loading the Trooper workspace preview…</span>
      <aside aria-hidden="true" className="flex w-[220px] shrink-0 flex-col gap-5 border-r border-white/[0.08] bg-[#202123] p-4">
        <div className="flex items-center gap-2">
          <SkeletonBlock className="h-7 w-7 rounded-md" />
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="ml-auto h-2 w-2 rounded-full" />
        </div>
        <div className="space-y-2">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className={`flex h-9 items-center gap-3 rounded-lg px-3 ${item === 0 ? 'bg-white/[0.07]' : ''}`}>
              <SkeletonBlock className="h-3.5 w-3.5 rounded-sm" />
              <SkeletonBlock className={`h-2.5 ${item === 0 ? 'w-16' : 'w-20'}`} />
              {item === 0 ? <SkeletonBlock className="ml-auto h-3 w-4 rounded-full" /> : null}
            </div>
          ))}
        </div>
        <div className="mt-1 space-y-3">
          <SkeletonBlock className="h-2 w-16" />
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <SkeletonBlock className="h-7 w-7 rounded-full" />
              <SkeletonBlock className={`h-2.5 ${item % 2 === 0 ? 'w-16' : 'w-20'}`} />
              <SkeletonBlock className="ml-auto h-1.5 w-1.5 rounded-full" />
            </div>
          ))}
        </div>
        <SkeletonBlock className="mt-auto h-9 w-full rounded-lg" />
      </aside>

      <main aria-hidden="true" className="grid min-w-0 flex-1 grid-cols-[42%_1fr]">
        <section className="flex min-w-0 flex-col border-r border-white/[0.08]">
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.08] px-4">
            <SkeletonBlock className="h-3 w-20" />
            <SkeletonBlock className="h-3 w-8" />
          </div>
          <div className="flex-1 space-y-4 overflow-hidden p-5">
            <SkeletonBlock className="mx-auto h-5 w-12 rounded-full" />
            <SkeletonBlock className="h-14 w-[82%] rounded-xl" />
            <SkeletonBlock className="ml-auto h-16 w-[76%] rounded-xl" />
            <SkeletonBlock className="h-12 w-[78%] rounded-xl" />
            <div className="flex items-center gap-2 pt-1">
              <SkeletonBlock className="h-6 w-6 rounded-full" />
              <SkeletonBlock className="h-2 w-28" />
            </div>
          </div>
          <SkeletonBlock className="mx-3 mb-3 h-9 rounded-lg" />
        </section>

        <section className="flex min-w-0 flex-col bg-[#1b1c1e]">
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.08] px-4">
            <div className="space-y-1.5">
              <SkeletonBlock className="h-3 w-24" />
              <SkeletonBlock className="h-2 w-28" />
            </div>
            <SkeletonBlock className="h-7 w-20 rounded-md" />
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-4 gap-2 overflow-hidden p-3">
            {[0, 1, 2, 3].map((column) => (
              <div key={column} className="min-w-0 rounded-lg bg-[#222326] p-2">
                <div className="mb-3 flex items-center justify-between px-0.5">
                  <SkeletonBlock className="h-2 w-14" />
                  <SkeletonBlock className="h-2 w-3" />
                </div>
                {column === 1 ? (
                  <div className="space-y-2">
                    {[0, 1, 2].map((card) => (
                      <div key={card} className="space-y-2 rounded-md border border-white/[0.07] bg-[#2b2c2f] p-2.5">
                        {card === 0 ? <SkeletonBlock className="h-1.5 w-10" /> : null}
                        <SkeletonBlock className="h-2 w-[90%]" />
                        <SkeletonBlock className="h-2 w-[66%]" />
                        <div className="flex items-center gap-1.5 border-t border-white/[0.06] pt-2">
                          <SkeletonBlock className="h-4 w-4 rounded-full" />
                          <SkeletonBlock className="h-1.5 w-10" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/** Product preview served from a static build of Trooper's own UI preview harness. */
export default function TrooperAppDashboardDemo({ maxHeight, autoLoad = false }: { maxHeight?: number; autoLoad?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [paused, setPaused] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [frameLoaded, setFrameLoaded] = useState(false);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    if (!autoLoad) return;
    const element = containerRef.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) {
      setInteractive(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setInteractive(true);
      observer.disconnect();
    }, { rootMargin: '0px', threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [autoLoad]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const byWidth = el.clientWidth > 0 ? el.clientWidth / DEMO_WIDTH : 1;
      const byHeight = maxHeight && maxHeight > 0 ? maxHeight / DEMO_HEIGHT : Number.POSITIVE_INFINITY;
      const nextScale = Math.min(byWidth, byHeight);
      setScale((current) => (Math.abs(current - nextScale) < 0.002 ? current : nextScale));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [interactive, maxHeight]);

  const scaledWidth = DEMO_WIDTH * scale;
  const scaledHeight = DEMO_HEIGHT * scale;
  const dashboardDocument = `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<base href="/trooper-app-preview/">
<style>html,body,#root{width:100%;height:100%;margin:0;overflow:hidden;background:#1A1A1A}</style>
<script>try{localStorage.setItem('trooper.lookAndFeel.v1',JSON.stringify({appearance:'dark',colorTheme:'ink',themeId:'trooper',teamThemeId:'pastel',chatStyle:'bubbles'}));localStorage.setItem('trooper-sidebar-main-tab','chats');localStorage.setItem('trooper_tasks_view','board');document.documentElement.dataset.theme='ink';document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark'}catch{}</script>
<link rel="stylesheet" href="/trooper-app-preview/assets/trooper-preview.css"><link rel="stylesheet" href="/trooper-app-preview/assets/trooper-preview2.css"></head>
<body><div id="root"></div><script type="module" src="/trooper-app-preview/assets/trooper-preview.js"></script></body></html>`;

  return (
    <div ref={containerRef} className="w-full overflow-hidden" style={{ position: 'relative' }}>
      <div style={{ height: scaledHeight, display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{ width: scaledWidth, height: scaledHeight, position: 'relative', flexShrink: 0 }}>
          <div
            style={{
              width: DEMO_WIDTH,
              height: DEMO_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,.13)',
              borderRadius: 24,
              background: '#1A1A1A',
              boxShadow: '0 20px 80px rgba(0,0,0,.28)',
            }}
          >
            <div
              className="flex items-center justify-between border-b border-white/10 bg-[#1c1c1c] px-3"
              style={{ height: CHROME_HEIGHT }}
            >
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex min-w-0 items-center justify-center gap-2">
                <div className="flex h-7 w-[300px] max-w-[38vw] items-center justify-center gap-2 rounded-full border border-white/10 bg-black/15 px-3 text-[11px] text-white/55">
                  <Lock size={10} aria-hidden="true" />
                  <span className="truncate">app.trooper.so</span>
                </div>
                <div className="flex h-7 items-center gap-1.5 rounded-full border border-white/10 bg-black/15 px-3 text-[11px] font-medium text-white/55">
                  {interactive && !frameLoaded ? (
                    <LoaderCircle size={10} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
                  ) : (
                    <Circle size={8} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                  )}
                  {interactive ? (frameLoaded ? (paused ? 'Paused' : 'Live demo — click anything') : 'Loading workspace…') : autoLoad ? 'Preparing workspace…' : 'Trooper workspace preview'}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {interactive && frameLoaded ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setPaused((value) => !value)}
                      aria-label={paused ? 'Resume demo interactions' : 'Pause demo interactions'}
                      title={paused ? 'Resume' : 'Pause'}
                      className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 text-white/60 transition hover:bg-white/10 hover:text-white"
                    >
                      {paused ? <Play size={13} fill="currentColor" /> : <Pause size={13} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPaused(false);
                        setFrameLoaded(false);
                        setRevision((value) => value + 1);
                      }}
                      aria-label="Restart dashboard demo"
                      title="Restart demo"
                      className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 text-white/60 transition hover:bg-white/10 hover:text-white"
                    >
                      <RotateCcw size={13} />
                    </button>
                  </>
                ) : autoLoad || interactive ? (
                  <span role="status" className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-white/10 px-2.5 text-[10px] font-medium text-white/55">
                    <LoaderCircle size={11} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
                    Loading
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setInteractive(true)}
                    className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-[#72c9a1] px-2.5 text-[10px] font-semibold text-[#142019] transition hover:bg-[#8adab3]"
                  >
                    <Play size={10} fill="currentColor" aria-hidden="true" /> Try live demo
                  </button>
                )}
              </div>
            </div>
            {interactive ? (
              <iframe
                key={revision}
                title="Interactive Trooper dashboard preview"
                srcDoc={dashboardDocument}
                loading={autoLoad ? 'eager' : 'lazy'}
                allow="clipboard-read; clipboard-write"
                onLoad={() => setFrameLoaded(true)}
                style={{
                  width: DEMO_WIDTH,
                  height: DEMO_HEIGHT - CHROME_HEIGHT,
                  border: 0,
                  display: 'block',
                  position: 'absolute',
                  inset: 0,
                  background: '#1A1A1A',
                  opacity: frameLoaded ? 1 : 0,
                  transition: 'opacity 180ms ease',
                  pointerEvents: paused || !frameLoaded ? 'none' : 'auto',
                }}
              />
            ) : null}
            {!frameLoaded ? (
              <div style={{ height: DEMO_HEIGHT - CHROME_HEIGHT, position: 'relative' }}>
                {interactive || autoLoad ? <DashboardSkeleton /> : <PreviewPoster />}
                {autoLoad ? (
                  <div className="absolute inset-x-0 bottom-4 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#202123]/90 px-3 py-1.5 text-[10px] font-medium text-white/55 shadow-lg backdrop-blur">
                      <LoaderCircle size={12} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
                      Loading workspace
                    </span>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
