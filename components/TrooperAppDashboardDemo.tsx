'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { Circle, Lock, Pause, Play, RotateCcw } from 'lucide-react';

const DEMO_WIDTH = 1320;
const DEMO_HEIGHT = 744;
const CHROME_HEIGHT = 44;

/** Product preview served from a static build of Trooper's own UI preview harness. */
export default function TrooperAppDashboardDemo({ maxHeight }: { maxHeight?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [paused, setPaused] = useState(false);
  const [revision, setRevision] = useState(0);

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
  }, [maxHeight]);

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
                  <Circle size={8} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                  {paused ? 'Paused' : 'Live demo — click anything'}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
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
                    setRevision((value) => value + 1);
                  }}
                  aria-label="Restart dashboard demo"
                  title="Restart demo"
                  className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  <RotateCcw size={13} />
                </button>
              </div>
            </div>
            <iframe
              key={revision}
              title="Interactive Trooper dashboard preview"
              srcDoc={dashboardDocument}
              loading="lazy"
              allow="clipboard-read; clipboard-write"
              style={{
                width: DEMO_WIDTH,
                height: DEMO_HEIGHT - CHROME_HEIGHT,
                border: 0,
                display: 'block',
                background: '#1A1A1A',
                pointerEvents: paused ? 'none' : 'auto',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
