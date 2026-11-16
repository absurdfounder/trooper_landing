'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Command,
  FileText,
  Folder,
  Globe2,
  HardDrive,
  Laptop,
  Link2,
  Mail,
  MessageCircle,
  Monitor,
  MousePointer2,
  Plus,
  Search,
  Table2,
  Terminal,
  Wifi,
} from 'lucide-react';
import {
  BrowserClaimPage,
  CLAIM_TABS,
  TabFavicon,
} from './BrowserClaimPanes';

/**
 * Marketing simulations for Where they work — real product surfaces
 * (Chrome tabs you already use, a Mac session, a device fleet routing work)
 * instead of schematic Wonder Analytics SVGs / static status lists.
 */

function useVisibleTick(steps: number, intervalMs: number) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(reduceMotion ? steps : 0);

  useEffect(() => {
    if (reduceMotion) {
      setTick(steps);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let id: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (id) return;
      id = setInterval(() => setTick((t) => (t >= steps ? 0 : t + 1)), intervalMs);
    };
    const stop = () => {
      if (id) clearInterval(id);
      id = null;
    };

    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [reduceMotion, steps, intervalMs]);

  return { ref, tick };
}

/* ═══════════════════════════════════════════════════════════════
 * Browser — claim a real logged-in tab (Stripe / Gmail / QuickBooks)
 * ═══════════════════════════════════════════════════════════════ */

const TAB_LABEL: Record<(typeof CLAIM_TABS)[number]['id'], string> = {
  gmail: 'Gmail',
  stripe: 'Stripe',
  qbo: 'QuickBooks',
  notion: 'Notion',
};

export function BrowserScene() {
  const { ref, tick } = useVisibleTick(4, 1900);
  const [pinned, setPinned] = useState<(typeof CLAIM_TABS)[number]['id'] | null>(null);
  const active =
    CLAIM_TABS.find((t) => t.id === pinned) ??
    CLAIM_TABS[Math.min(tick % CLAIM_TABS.length, CLAIM_TABS.length - 1)];

  const progress = [
    { label: 'Signed-in tab found', done: true },
    { label: 'Trooper is working', done: tick >= 1 },
    { label: 'Result back in the task', done: tick >= 3 },
  ];

  return (
    <div ref={ref} className="w-full bg-[#171917] p-3 text-white sm:p-4 lg:p-5">
      <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#202320] px-3 py-2.5 sm:px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/80">
            <Globe2 className="size-4" strokeWidth={1.8} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold sm:text-sm">Browser session</p>
            <p className="truncate text-[10px] text-white/45 sm:text-xs">One task · same workspace</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-medium text-emerald-200 sm:text-[11px]">
          <span className="size-1.5 rounded-full bg-emerald-300" />
          Session connected
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.35fr)_minmax(220px,.65fr)]">
        <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#f8f8f7] shadow-[0_16px_42px_rgba(0,0,0,.28)]">
          <div className="flex items-center gap-2 border-b border-black/10 bg-[#eceeeb] px-3 py-2">
            <span className="flex shrink-0 gap-1.5" aria-hidden="true">
              <span className="size-2 rounded-full bg-[#ff6259]" />
              <span className="size-2 rounded-full bg-[#f5bd4f]" />
              <span className="size-2 rounded-full bg-[#48c46a]" />
            </span>
            <div className="ml-1 flex min-w-0 flex-1 items-center gap-1 overflow-hidden" role="tablist" aria-label="Choose a signed-in browser app">
              {CLAIM_TABS.map((tab) => {
                const isActive = tab.id === active.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setPinned(tab.id)}
                    className={`flex min-w-0 items-center gap-1 rounded-t-lg px-1.5 py-1 text-[9px] transition-colors sm:px-2 sm:text-[10px] ${isActive ? 'bg-white text-neutral-900' : 'text-neutral-500 hover:bg-white/60'}`}
                  >
                    <TabFavicon tabId={tab.id} size={11} />
                    <span className="truncate">{TAB_LABEL[tab.id]}</span>
                  </button>
                );
              })}
            </div>
            <button type="button" className="hidden size-6 shrink-0 items-center justify-center rounded-md text-neutral-500 sm:flex" aria-label="Open a new tab">
              <Plus className="size-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-2 border-b border-black/10 bg-white px-3 py-2">
            <ArrowUpRight className="size-3.5 shrink-0 text-neutral-400" />
            <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-[#f1f2f0] px-3 py-1.5 text-[10px] text-neutral-600 sm:text-[11px]">
              <TabFavicon tabId={active.id} size={13} />
              <span className="truncate font-mono">{active.url}</span>
            </div>
            <span className="hidden shrink-0 items-center gap-1 text-[10px] text-neutral-500 sm:inline-flex">
              <Wifi className="size-3" /> Signed in
            </span>
          </div>
          <div className="relative h-[15rem] min-h-0 overflow-hidden bg-white sm:h-[18rem]">
            <div key={active.id} className="absolute inset-0 overflow-hidden [&>*]:min-h-full">
              <BrowserClaimPage tabId={active.id} />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 border-t border-black/[0.06] bg-white/95 px-3 py-2 text-[10px] text-neutral-700 backdrop-blur-sm sm:text-[11px]">
              {tick < 3 ? <Loader2 className="size-3.5 shrink-0 animate-spin text-emerald-600" strokeWidth={2.5} /> : <Check className="size-3.5 shrink-0 text-emerald-600" strokeWidth={2.5} />}
              <span className="min-w-0 truncate font-medium">{tick >= 3 ? 'Result returned to the task' : tick >= 1 ? active.action : 'Ready to work in your signed-in session'}</span>
            </div>
          </div>
        </div>

        <aside className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-[#202320] p-4 sm:p-5" aria-label="Task handoff from browser to Trooper">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/45">Trooper task</span>
            <span className="rounded-full bg-white/8 px-2 py-1 text-[10px] text-white/60">Q3 close</span>
          </div>
          <p className="mt-4 text-[15px] font-medium leading-snug text-white sm:text-base">Pull the latest numbers and prepare the close summary.</p>
          <div className="my-5 flex items-center gap-2 text-[10px] text-white/45 sm:text-[11px]">
            <span className="h-px flex-1 bg-white/10" />
            <Link2 className="size-3.5 text-emerald-300" />
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <ol className="space-y-3">
            {progress.map((step, index) => (
              <li key={step.label} className="flex items-center gap-2.5">
                <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${step.done ? 'border-emerald-300/40 bg-emerald-300/15 text-emerald-200' : 'border-white/15 text-white/35'}`}>
                  {step.done ? <Check className="size-3" strokeWidth={2.5} /> : <span className="size-1 rounded-full bg-current" />}
                </span>
                <span className={`text-[11px] sm:text-xs ${step.done ? 'text-white/85' : 'text-white/45'}`}>{step.label}</span>
                {index === 1 && tick === 2 ? <Loader2 className="ml-auto size-3 animate-spin text-emerald-300" /> : null}
              </li>
            ))}
          </ol>
          <div className="mt-auto pt-5">
            <div className="rounded-xl border border-white/10 bg-black/15 p-3">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-300/10 text-emerald-200"><Command className="size-3.5" /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium text-white/85">Shared task context</p>
                  <p className="mt-0.5 truncate text-[9px] text-white/40">Browser → desktop → team</p>
                </div>
                <ArrowRight className="size-3.5 text-white/35" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * Desktop — wake Mac, open real Numbers, work the sheet
 * ═══════════════════════════════════════════════════════════════ */

const DESKTOP_LINES = [
  '$ trooper device wake studio-mac',
  'device responded in 4.2s · seat acquired',
  '$ open -a Numbers ~/Finance/Q3-forecast.numbers',
  'workbook opened · recalculating model…',
  'wrote Total row · exported PDF to Desktop',
];

const NUMBERS_ROWS = [
  { region: 'North America', q2: '$412k', q3: '$486k', delta: '+18%', up: true },
  { region: 'EMEA', q2: '$288k', q3: '$274k', delta: '−5%', up: false },
  { region: 'APAC', q2: '$196k', q3: '$271k', delta: '+38%', up: true },
  { region: 'LATAM', q2: '$84k', q3: '$97k', delta: '+15%', up: true },
];

export function DesktopScene() {
  const { ref, tick } = useVisibleTick(DESKTOP_LINES.length, 1500);
  const lines = DESKTOP_LINES.slice(0, Math.max(1, tick));
  const sheetOpen = tick >= 2;

  return (
    <div
      ref={ref}
      className="flex h-[22rem] w-full flex-col overflow-hidden bg-[#1c1c1e] sm:h-[26rem]"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="flex items-center gap-2 text-[12px] text-white/90">
          <Laptop className="size-3.5 text-white/60" strokeWidth={2} />
          <span className="font-medium">Studio-Mac</span>
          <span className="text-white/40">macOS 15.2</span>
        </div>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/80 ring-1 ring-white/20">
          ● Busy
        </span>
      </div>

      <div className="relative min-h-0 flex-1 bg-[#2c2c2e]">
        <div
          className={`flex h-full flex-col overflow-hidden bg-white transition-opacity duration-500 ${
            sheetOpen ? 'opacity-100' : 'opacity-55'
          }`}
        >
          <div className="flex items-center gap-2 border-b border-neutral-200 bg-[#F5F5F5] px-3 py-1.5">
            <span className="flex gap-1">
              <span className="size-2.5 rounded-full bg-[#FF5F57]" />
              <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="size-2.5 rounded-full bg-[#28C840]" />
            </span>
            <span className="truncate text-[11px] font-medium text-neutral-700">
              Numbers — Q3-forecast.numbers
            </span>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden p-2">
            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#E8F0FE] text-left text-[10px] font-semibold uppercase tracking-wide text-[#1a73e8]">
                  <th className="border border-[#C5D7F5] px-2 py-1.5">Region</th>
                  <th className="border border-[#C5D7F5] px-2 py-1.5">Q2 actual</th>
                  <th className="border border-[#C5D7F5] px-2 py-1.5">Q3 forecast</th>
                  <th className="border border-[#C5D7F5] px-2 py-1.5">Δ</th>
                </tr>
              </thead>
              <tbody>
                {NUMBERS_ROWS.map((r) => (
                  <tr key={r.region}>
                    <td className="border border-neutral-200 px-2 py-1.5 font-medium text-neutral-800">
                      {r.region}
                    </td>
                    <td className="border border-neutral-200 px-2 py-1.5 tabular-nums text-neutral-600">
                      {r.q2}
                    </td>
                    <td className="border border-neutral-200 px-2 py-1.5 tabular-nums text-neutral-800">
                      {r.q3}
                    </td>
                    <td
                      className={`border border-neutral-200 px-2 py-1.5 font-semibold tabular-nums ${
                        r.up ? 'text-[#1e8e3e]' : 'text-[#d93025]'
                      }`}
                    >
                      {r.delta}
                    </td>
                  </tr>
                ))}
                <tr className="bg-neutral-50 font-semibold">
                  <td className="border border-neutral-200 px-2 py-1.5">Total</td>
                  <td className="border border-neutral-200 px-2 py-1.5 tabular-nums">$980k</td>
                  <td className="border border-neutral-200 px-2 py-1.5 tabular-nums">$1.128M</td>
                  <td className="border border-neutral-200 px-2 py-1.5 tabular-nums text-[#1e8e3e]">
                    +15%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black px-3 py-2 font-mono text-[10px] leading-relaxed text-ok-400">
        <div className="mb-1 flex items-center gap-1.5 text-[10px] text-white/45">
          <Terminal className="size-3" strokeWidth={2} />
          Terminal
        </div>
        {lines.map((line) => (
          <div key={line} className={line.startsWith('$') ? 'text-white' : 'text-ok-400/85'}>
            {line}
          </div>
        ))}
        <span className="inline-block h-3 w-1.5 animate-pulse bg-ok-400" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * Devices — route work: Home for forecast, Office for QuickBooks ledger
 * ═══════════════════════════════════════════════════════════════ */

type FleetApp = 'finder' | 'chrome' | 'xcode' | 'whatsapp' | 'numbers' | 'terminal';
type FleetMachine = {
  name: string;
  os: 'macOS 15' | 'Ubuntu 24.04';
  family: 'mac' | 'linux';
  icon: typeof Laptop;
  app: FleetApp;
  workItem: string;
  agent: string;
  startsAt: number;
};

const FLEET_MACHINES: FleetMachine[] = [
  { name: 'This Mac', os: 'macOS 15', family: 'mac', icon: Laptop, app: 'finder', workItem: 'Find the audit source', agent: 'Aria', startsAt: 0 },
  { name: 'Research Mac mini', os: 'macOS 15', family: 'mac', icon: Monitor, app: 'chrome', workItem: 'Confirm refund policy', agent: 'Mina', startsAt: 6 },
  { name: 'Build Mac', os: 'macOS 15', family: 'mac', icon: Laptop, app: 'xcode', workItem: 'Fix the cents conversion', agent: 'Jordan', startsAt: 12 },
  { name: 'Team Mac', os: 'macOS 15', family: 'mac', icon: Monitor, app: 'whatsapp', workItem: 'Hand off two exceptions', agent: 'Sam', startsAt: 18 },
  { name: 'Finance Mac', os: 'macOS 15', family: 'mac', icon: Laptop, app: 'numbers', workItem: 'Reconcile Q3 refunds', agent: 'Aria', startsAt: 24 },
  { name: 'Linux runner', os: 'Ubuntu 24.04', family: 'linux', icon: HardDrive, app: 'terminal', workItem: 'Run checks and publish preview', agent: 'Ren', startsAt: 30 },
];

const APP_LABELS: Record<FleetApp, string> = {
  finder: 'Finder',
  chrome: 'Google Chrome',
  xcode: 'Xcode',
  whatsapp: 'WhatsApp',
  numbers: 'Numbers',
  terminal: 'Terminal',
};

type DockItem = { id: string; label: string; Icon: typeof Folder; asset?: string; color: string };
const MAC_DOCK: DockItem[] = [
  { id: 'finder', label: 'Finder', Icon: Folder, asset: 'finder', color: 'text-sky-600' },
  { id: 'chrome', label: 'Chrome', Icon: Globe2, asset: 'chrome', color: 'text-blue-500' },
  { id: 'xcode', label: 'Xcode', Icon: Code2, color: 'text-slate-700' },
  { id: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle, asset: 'whatsapp', color: 'text-emerald-600' },
  { id: 'numbers', label: 'Numbers', Icon: Table2, color: 'text-emerald-600' },
  { id: 'mail', label: 'Mail', Icon: Mail, color: 'text-sky-600' },
  { id: 'trash', label: 'Trash', Icon: Folder, asset: 'trash', color: 'text-slate-500' },
];
const LINUX_DOCK: DockItem[] = [
  { id: 'files', label: 'Files', Icon: Folder, color: 'text-amber-500' },
  { id: 'chrome', label: 'Chrome', Icon: Globe2, asset: 'chrome', color: 'text-blue-500' },
  { id: 'terminal', label: 'Terminal', Icon: Terminal, color: 'text-emerald-300' },
  { id: 'settings', label: 'Settings', Icon: Command, color: 'text-slate-300' },
];

function TypeLine({ text, active }: { text: string; active: boolean }) {
  return (
    <motion.span
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: active ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
      transition={{ duration: active ? 0.52 : 0.16, ease: 'linear' }}
      className="inline-block max-w-full overflow-hidden whitespace-nowrap align-bottom"
    >
      {text}
    </motion.span>
  );
}

function FleetAppContent({ app, stage }: { app: FleetApp; stage: number }) {
  if (app === 'finder') {
    const files = [
      ['Q3-audit.pdf', 'PDF · 186 KB · Modified today'],
      ['refund-export.csv', 'CSV · 42 KB · Modified yesterday'],
      ['policy-notes.md', 'Markdown · 8 KB · Modified yesterday'],
    ];
    return (
      <div className="flex h-full min-h-0 bg-white text-[#3b4141]">
        <aside className="w-[26%] shrink-0 border-r border-black/[0.07] bg-[#f5f6f7] px-1.5 py-1.5 text-[8px] leading-[1.7] text-[#6f777b] sm:px-2 sm:text-[9px]">
          <b className="mb-1 block text-[7px] uppercase tracking-wide text-[#939a9d] sm:text-[8px]">Favorites</b>
          <div className="rounded bg-[#e5eefb] px-1 text-[#315f9f]">iCloud Drive</div>
          <div className="px-1">Downloads</div><div className="px-1">Documents</div>
          <b className="mb-1 mt-2 block text-[7px] uppercase tracking-wide text-[#939a9d] sm:text-[8px]">Tags</b>
          <div className="px-1">Q3 close</div>
        </aside>
        <div className="min-w-0 flex-1 px-2 py-1.5 sm:px-2.5">
          <div className="mb-1 flex items-center justify-between gap-1 border-b border-black/[0.06] pb-1 text-[8px] text-[#747c80] sm:text-[9px]">
            <span className="truncate font-semibold text-[#3d4448]">iCloud Drive / Q3 close</span><span>⌕ &nbsp; ▦</span>
          </div>
          <div className="mb-1 flex h-3 items-center gap-1 rounded bg-[#f1f3f4] px-1 text-[7px] text-[#6d777b] sm:text-[8px]"><Search className="size-2 shrink-0" />{stage >= 3 ? <TypeLine text="Q3-audit.pdf" active /> : <span>Search this folder</span>}</div>
          <div className="grid grid-cols-[1.2fr_1fr_.7fr] gap-x-1 border-b border-black/[0.06] pb-0.5 text-[7px] text-[#92999d] sm:text-[8px]"><span>Name</span><span>Date modified</span><span>Size</span></div>
          {files.map(([name, detail], index) => (
            <div key={name} className={`mt-0.5 grid grid-cols-[1.2fr_1fr_.7fr] items-center gap-x-1 rounded px-1 py-1 text-[8px] sm:text-[9px] ${stage >= 4 && index === 0 ? 'bg-[#dceaff] text-[#173f76] ring-1 ring-inset ring-[#8eb8f4]' : 'text-[#4c5458]'}`}>
              <span className="flex min-w-0 items-center gap-1 truncate"><FileText className="size-2.5 shrink-0 text-rose-500" />{name}</span>
              <span className="truncate text-[#80888b]">{detail.split(' · ')[2]}</span><span className="text-right text-[#80888b]">{detail.split(' · ')[1]}</span>
            </div>
          ))}
          <div className="mt-1 truncate text-[8px] text-emerald-700 sm:text-[9px]">{stage >= 5 ? 'Q3-audit.pdf added to shared task ✓' : stage >= 4 ? 'Selected · Q3-audit.pdf' : '3 items · iCloud Drive'}</div>
        </div>
      </div>
    );
  }

  if (app === 'chrome') {
    return (
      <div className="h-full bg-white text-[#3c4043]">
        <div className="flex h-5 items-center gap-1 border-b border-black/[0.06] bg-[#f8f9fa] px-2 text-[8px] text-[#657078] sm:text-[9px]">
          <span>‹</span><span>›</span><span>↻</span>
          <span className="ml-1 flex min-w-0 flex-1 items-center gap-1 rounded-full bg-white px-2 py-0.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)]"><Globe2 className="size-2 shrink-0" />google.com/search?q=<span className="truncate">refund+exceptions</span></span>
          <span className="flex size-3 items-center justify-center rounded-full bg-blue-500 text-[7px] text-white">A</span>
        </div>
        {stage < 4 ? (
          <div className="flex h-[calc(100%-20px)] flex-col items-center bg-white pt-2">
            <div className="mb-1 text-[18px] font-medium tracking-tight sm:text-[20px]"><span className="text-[#4285f4]">G</span><span className="text-[#ea4335]">o</span><span className="text-[#fbbc05]">o</span><span className="text-[#4285f4]">g</span><span className="text-[#34a853]">l</span><span className="text-[#ea4335]">e</span></div>
            <div className="flex h-5 w-[75%] items-center gap-1 rounded-full border border-[#dfe1e5] px-2 text-[8px] shadow-sm sm:text-[9px]"><Search className="size-2 shrink-0 text-[#8a9095]" />{stage >= 3 ? <TypeLine text="refund approval exceptions over $500" active /> : <span className="text-[#a0a5a9]">Search policy and exceptions</span>}</div>
            <div className="mt-1.5 flex gap-1 text-[7px] text-[#60666b] sm:text-[8px]"><span className="rounded bg-[#f8f9fa] px-2 py-1">Google Search</span><span className="rounded bg-[#f8f9fa] px-2 py-1">I'm Feeling Lucky</span></div>
          </div>
        ) : stage === 4 ? (
          <div className="h-[calc(100%-20px)] overflow-hidden px-3 pt-1.5 text-[8px] sm:text-[9px]">
            <div className="mb-1 border-b border-[#e8eaed] pb-1 text-[7px] text-[#6f777c]">All &nbsp; News &nbsp; Images &nbsp; Videos</div>
            <p className="text-[7px] text-[#70777c]">About 8,420 results</p>
            <div className="mt-1 rounded-md bg-blue-50 px-1.5 py-1 ring-1 ring-blue-200"><span className="text-[7px] text-[#687078]">Trooper Finance › Playbooks › Refunds</span><b className="block text-[9px] text-[#1a0dab] sm:text-[9px]">Q3 refund policy: approvals and exceptions</b><span className="block text-[#5f676d]">Exceptions above $500 need reviewer sign-off.</span></div>
            <div className="mt-1 px-1.5 text-[#1a0dab]">How to reconcile a refund · Stripe docs</div>
          </div>
        ) : (
          <div className="h-[calc(100%-20px)] overflow-hidden px-3 py-2 text-[8px] leading-relaxed sm:text-[9px]">
            <div className="text-[7px] text-[#64706b]">TROOPER FINANCE &nbsp; › &nbsp; PLAYBOOKS &nbsp; › &nbsp; REFUNDS</div>
            <b className="mt-1 block text-[12px] text-[#202626] sm:text-[14px]">Q3 refund policy</b>
            <p className="mt-1 text-[#65706c]">Refunds under $500 can be matched automatically. Route disputes and exceptions to a reviewer.</p>
            <div className="mt-1.5 flex gap-1.5"><span className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-1"><b className="block text-emerald-800">AUTO MATCH</b>Under $500</span><span className="rounded border border-amber-200 bg-amber-50 px-1.5 py-1"><b className="block text-amber-800">NEEDS REVIEW</b>2 exceptions</span></div>
            <div className="mt-1 text-[7px] text-emerald-700 sm:text-[8px]">Finding attached to Q3 refund close ✓</div>
          </div>
        )}
      </div>
    );
  }

  if (app === 'xcode') {
    return (
      <div className="flex h-full min-h-0 bg-[#1f242b] font-mono text-[8px] text-[#d7dee8] sm:text-[9px]">
        <aside className="w-[25%] shrink-0 border-r border-white/[0.06] bg-[#242a32] p-1.5 text-[7px] leading-[1.8] text-[#a6b0bd] sm:text-[8px]">
          <div className="mb-1 uppercase tracking-wide text-[#727e8c]">RefundsApp</div>
          <div>▾ Sources</div><div className="pl-1">Refunds.swift</div><div className="pl-1">ReviewTests.swift</div><div>▸ Assets</div>
        </aside>
        <div className="min-w-0 flex-1 p-1.5 sm:p-2">
          <div className="mb-1 flex items-center justify-between gap-1 border-b border-white/[0.07] pb-1 text-[7px] text-[#8995a3] sm:text-[8px]"><span>Refunds.swift</span><span className="text-emerald-300">▶ Run</span></div>
          <div className="leading-[1.65]">
            <div><span className="mr-1 text-[#677381]">18</span><span className="text-violet-300">func</span> <span className="text-sky-200">refundTotal</span>() { '{' }</div>
            <div className="pl-2 text-[#a9b5c3]">let cents = amount + tax</div>
            <div className={stage >= 3 ? 'rounded bg-emerald-400/10 text-emerald-200' : 'text-amber-200'}><span className="mr-1 text-[#677381]">20</span>{stage >= 3 ? 'return Decimal(cents) / 100' : 'return cents / 100  // rounding drift'}</div>
            <div className="text-[#a9b5c3]">{ '}' }</div>
          </div>
          <div className={`mt-1 flex items-center gap-1 text-[7px] sm:text-[8px] ${stage >= 5 ? 'text-emerald-300' : stage === 4 ? 'text-amber-200' : 'text-[#84909e]'}`}>
            {stage >= 5 ? <Check className="size-2" /> : <span className="size-1 rounded-full bg-current" />}
            {stage >= 5 ? 'Build succeeded · result shared to Q3 close' : stage === 4 ? 'Building RefundsApp…' : 'Edit · build · verify'}
          </div>
        </div>
      </div>
    );
  }

  if (app === 'whatsapp') {
    return (
      <div className="flex h-full min-h-0 bg-white text-[#374247]">
        <aside className="w-[31%] shrink-0 border-r border-black/[0.07] bg-[#f7f8f8] p-1.5 text-[7px] sm:text-[8px]">
          <div className="mb-1 flex items-center justify-between text-emerald-700"><b>Chats</b><span>✎</span></div>
          <div className="rounded bg-[#e6eee9] px-1 py-1"><b className="block truncate">Maya Chen</b><span className="text-[#858d8f]">Q3 close</span></div>
          <div className="mt-1 px-1 py-1"><b className="block truncate">Jordan Lee</b><span className="text-[#858d8f]">Build is green</span></div>
          <div className="mt-1 px-1 py-1"><b className="block truncate">Finance team</b><span className="text-[#858d8f]">2 members</span></div>
        </aside>
        <div className="relative flex min-w-0 flex-1 flex-col bg-[#f1f0e8]">
          <div className="flex h-5 shrink-0 items-center gap-1 border-b border-black/[0.05] bg-white px-1.5 text-[8px] sm:text-[9px]"><span className="flex size-3 items-center justify-center rounded-full bg-[#dfe8e4] text-[7px]">M</span><b>Maya Chen</b><span className="ml-auto text-[7px] text-[#83908b]">online</span></div>
          <div className="flex-1 space-y-1 overflow-hidden px-1.5 py-1 text-[7px] sm:text-[8px]">
            <div className="w-[78%] rounded-lg bg-white px-1.5 py-1 shadow-sm">Can you send the close summary?</div>
            {stage >= 3 ? <div className="ml-auto w-[82%] rounded-lg bg-[#d8f5ca] px-1.5 py-1 shadow-sm">Two exceptions need review. Policy cap is $500.</div> : null}
            {stage >= 5 ? <div className="ml-auto text-right text-[7px] text-[#4b8e66]">Delivered · 9:41</div> : null}
            {stage >= 5 ? <div className="w-[78%] rounded-lg bg-white px-1.5 py-1 shadow-sm">Got it — I’ll review both before close.</div> : null}
          </div>
            <div className="flex h-5 shrink-0 items-center gap-1 border-t border-black/[0.06] bg-white px-1.5 text-[7px] sm:text-[8px]"><span className="flex-1 truncate rounded-full bg-[#f1f3f4] px-2 py-1">{stage >= 3 && stage < 4 ? <TypeLine text="Two exceptions need review. Policy cap is $500." active /> : stage >= 4 ? 'Message sent' : 'Message Maya'}</span><span className="flex size-3 items-center justify-center rounded-full bg-[#00a884] text-white">➤</span></div>
        </div>
      </div>
    );
  }

  if (app === 'numbers') {
    const rows = [
      ['2381', '$420.00', 'matched'],
      ['2380', '$89.00', 'matched'],
      ['2379', '$1,240.00', stage >= 5 ? 'review' : 'matched'],
      ['2378', '$56.00', 'matched'],
    ];
    return (
      <div className="h-full bg-white text-[#3c4642]">
        <div className="flex h-4 items-center justify-between border-b border-black/[0.06] bg-[#f7f8f8] px-2 text-[7px] sm:text-[8px]"><b>Q3 refunds · Reconciliation</b><span className="text-[#7d8883]">fx &nbsp; + &nbsp;•••</span></div>
        <div className="grid grid-cols-[.8fr_1fr_1fr] border-b border-[#dce1df] bg-[#f5f7f6] text-[7px] font-semibold text-[#66716c] sm:text-[8px]"><span className="border-r border-[#dce1df] px-1 py-1">Refund</span><span className="border-r border-[#dce1df] px-1 py-1">Amount</span><span className="px-1 py-1">Status</span></div>
        {rows.map((row, index) => (
          <div key={row[0]} className={`grid grid-cols-[.8fr_1fr_1fr] border-b border-[#e5e9e7] text-[7px] sm:text-[8px] ${stage >= 4 && index === 2 ? 'bg-amber-50 text-amber-950 ring-1 ring-inset ring-amber-300' : 'text-[#535d58]'}`}>
            {row.map((value, cell) => <span key={cell} className="truncate border-r border-[#edf0ef] px-1 py-1">{value}</span>)}
          </div>
        ))}
        <div className="mt-1 flex items-center justify-between px-1.5 text-[7px] sm:text-[8px]"><span>12 refunds · 4 matched</span><span className={stage >= 5 ? 'font-semibold text-amber-700' : 'text-[#77817c]'}>{stage >= 5 ? '2 exceptions flagged · totals checked' : stage >= 4 ? 'Reviewing #2379…' : 'Stripe · Q3 close'}</span></div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden bg-[#14191e] p-1.5 font-mono text-[8px] leading-relaxed text-emerald-200 sm:p-2 sm:text-[9px]">
      <div className="mb-1 flex items-center justify-between border-b border-white/[0.08] pb-1 text-[7px] text-white/45 sm:text-[8px]"><span>trooper@linux: ~/refunds</span><span>zsh</span></div>
      <div className="text-white/80">$ git status --short</div>
      <div className="text-white/55"> M src/refunds.ts &nbsp; ?? review-notes.md</div>
      <div className="mt-1 text-white/80">$ {stage >= 3 ? <TypeLine text="pnpm test && trooper preview" active /> : <span className="text-white/45">_</span>}</div>
      {stage >= 4 ? <div className={stage >= 5 ? 'text-emerald-300' : 'animate-pulse text-sky-200'}>{stage >= 5 ? '✓ 18 tests passed · preview ready' : 'Running tests · building preview…'}</div> : null}
      {stage >= 5 ? <div className="mt-0.5 text-white/50">Report attached to Q3 refund close.</div> : null}
    </div>
  );
}

function DesktopPreview({ machine, stage, reducedMotion }: { machine: FleetMachine; stage: number; reducedMotion: boolean }) {
  const title = APP_LABELS[machine.app];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.86, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.2, 0.8, 0.2, 1] }}
      className="machine-app-window absolute left-[4%] top-[12%] z-[4] flex w-[92%] aspect-[1.82/1] origin-bottom flex-col overflow-hidden rounded-[8px] border border-black/25 bg-white shadow-[0_12px_28px_rgba(20,25,23,.30)] sm:rounded-[10px]"
    >
      <div className={`flex h-5 items-center gap-1.5 border-b border-black/[0.10] px-1.5 text-[8px] sm:h-6 sm:px-2 sm:text-[9px] ${machine.app === 'terminal' || machine.app === 'xcode' ? 'bg-[#252b31] text-white/80' : 'bg-[#f5f6f5] text-[#59615e]'}`}>
        <span className="flex shrink-0 gap-0.5"><i className="size-1.5 rounded-full bg-[#fb6158] sm:size-2" /><i className="size-1.5 rounded-full bg-[#f6bd4f] sm:size-2" /><i className="size-1.5 rounded-full bg-[#45c46a] sm:size-2" /></span>
        <span className="ml-1 truncate font-medium">{title}{machine.app === 'finder' ? ' · iCloud Drive' : machine.app === 'chrome' ? ' · Q3 refund policy' : machine.app === 'xcode' ? ' · RefundsApp' : machine.app === 'whatsapp' ? ' · Maya Chen' : machine.app === 'numbers' ? ' · Q3 refunds' : ' · ~/refunds'}</span>
        {machine.app === 'xcode' && stage >= 4 ? <span className="ml-auto shrink-0 text-emerald-300">{stage >= 5 ? '✓ Build' : '◌ Build'}</span> : null}
      </div>
      <div className="min-h-0 flex-1">
        <FleetAppContent app={machine.app} stage={stage} />
      </div>
    </motion.div>
  );
}

function MachineDesktop({ machine, phase, reducedMotion }: { machine: FleetMachine; phase: number; reducedMotion: boolean }) {
  const MachineIcon = machine.icon;
  const stage = phase - machine.startsAt;
  const complete = stage >= 5;
  const active = stage >= 0 && stage <= 4;
  const status = stage < 0 ? 'Queued' : stage < 2 ? 'Opening' : stage === 2 ? 'Opened' : stage === 3 ? 'Working' : stage === 4 ? 'Applying' : 'Synced';
  const dockItems = machine.family === 'linux' ? LINUX_DOCK : MAC_DOCK;
  const activeDockIndex = dockItems.findIndex((item) => item.id === machine.app);
  const dockPoint: [number, number] = machine.family === 'linux'
    ? [6, 52]
    : [24 + ((Math.max(0, activeDockIndex) + 0.5) / dockItems.length) * 52, 91];
  const fieldPoint: Record<FleetApp, [number, number]> = {
    finder: [57, 53], chrome: [52, 37], xcode: [60, 58], whatsapp: [65, 78], numbers: [75, 57], terminal: [36, 76],
  };
  const actionPoint: Record<FleetApp, [number, number]> = {
    finder: [50, 62], chrome: [54, 55], xcode: [82, 28], whatsapp: [87, 79], numbers: [75, 66], terminal: [35, 76],
  };
  const pointerPoint: [number, number] = stage <= 0
    ? [87, 80]
    : stage <= 2 ? dockPoint
      : stage === 3 ? fieldPoint[machine.app]
        : actionPoint[machine.app];
  const isClicking = stage === 1 || stage === 4;
  const statusText = stage < 0 ? 'Waiting for its part' : stage === 0 ? 'Joining shared task' : stage === 1 ? 'Opening from Dock' : stage === 2 ? `${APP_LABELS[machine.app]} is open` : stage === 3 ? 'Working in the app' : stage === 4 ? 'Applying the change' : 'Evidence returned';

  return (
    <article className={`machine-fleet-card flex min-h-[220px] min-w-0 snap-start flex-col overflow-hidden rounded-[11px] border border-white/[0.13] bg-[#151917] p-1.5 shadow-[0_10px_26px_rgba(0,0,0,.22)] sm:min-h-0 sm:rounded-[13px] sm:p-1.5 ${complete ? 'machine-card-complete' : ''}`}>
      <header className="flex h-6 shrink-0 items-center justify-between gap-2 px-1 text-white/85 sm:h-7 sm:px-1.5">
        <span className="flex min-w-0 items-center gap-1.5"><MachineIcon className="size-3.5 shrink-0 text-white/75" strokeWidth={1.8} /><span className="truncate text-[9px] font-semibold sm:text-[10px]">{machine.name}</span><span className="hidden shrink-0 rounded border border-white/[0.09] bg-white/[0.04] px-1 py-0.5 text-[8px] text-white/45 sm:inline-flex">{machine.os}</span></span>
        <span className={`flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] sm:text-[9px] ${complete ? 'bg-emerald-300/10 text-emerald-100' : active ? 'bg-sky-300/10 text-sky-100' : 'bg-white/[0.05] text-white/45'}`}><i className={`size-1.5 rounded-full ${complete ? 'bg-emerald-300' : active ? 'animate-pulse bg-sky-300' : 'bg-white/25'}`} />{status}</span>
      </header>
      <div className={`machine-mini-desktop relative min-h-0 flex-1 overflow-hidden rounded-[8px] border border-white/15 text-[#363a38] ${machine.family === 'linux' ? 'machine-linux-desktop' : 'bg-[#e8dece]'}`}>
        {machine.family === 'linux' ? <div aria-hidden="true" className="machine-linux-wallpaper pointer-events-none absolute inset-0" /> : <div aria-hidden="true" className="machine-desktop-wallpaper pointer-events-none absolute inset-0" />}
        {machine.family === 'mac' ? (
          <div className="machine-menu-bar absolute inset-x-0 top-0 z-[2] flex h-4 items-center justify-between border-b border-black/10 px-1.5 text-[7px] font-medium sm:h-5 sm:px-2 sm:text-[8px]">
            <span className="flex items-center gap-1"><b className="font-semibold">{stage >= 2 ? APP_LABELS[machine.app] : 'Finder'}</b><span>File</span><span>Edit</span></span><span className="flex items-center gap-1"><Wifi className="size-2" /><span>9:41</span></span>
          </div>
        ) : (
          <div className="absolute inset-x-0 top-0 z-[2] flex h-4 items-center justify-between border-b border-white/10 bg-[#211d2b]/90 px-1.5 text-[7px] font-medium text-white/85 backdrop-blur sm:h-5 sm:px-2 sm:text-[8px]">
            <span className="flex items-center gap-2"><b>Activities</b><span>Workspaces</span><span className="hidden sm:inline">Terminal</span></span><span>Nov 16 · 9:41</span>
          </div>
        )}
        <div className="pointer-events-none absolute left-[3%] top-[24%] z-[1] flex flex-col items-center text-[7px] text-black/65 drop-shadow-[0_1px_2px_rgba(255,255,255,.8)] sm:text-[8px]">
          {machine.app === 'finder' ? <FileText className="size-3.5 text-rose-600 sm:size-4" /> : <Folder className="size-3.5 fill-[#83b9dc] text-[#4d88b5] sm:size-4" />}
          <span className="mt-0.5">{machine.app === 'finder' ? 'Q3-audit.pdf' : 'Q3 close'}</span>
        </div>
        {machine.family === 'linux' ? (
          <div className="absolute bottom-[4%] left-[2%] top-[25%] z-10 flex w-5 flex-col items-center justify-center gap-1 rounded-md border border-white/10 bg-[#262233]/85 p-0.5 shadow-md" aria-label="Ubuntu application dock">
            {dockItems.map(({ id, Icon, label, color, asset }) => <span key={id} title={label} className={`flex size-3.5 items-center justify-center rounded bg-white/[0.08] ${id === machine.app && stage >= 1 ? 'ring-1 ring-emerald-300' : ''}`}>{asset ? <img src={`/images/desktop/dock/${asset}.png`} alt="" className="size-3 object-contain" /> : <Icon className={`size-2.5 ${color}`} />}</span>)}
          </div>
        ) : (
          <div className="absolute bottom-[2%] left-1/2 z-10 flex -translate-x-1/2 items-end gap-0.5 rounded-[7px] border border-white/85 bg-white/80 px-1 py-0.5 shadow-[0_2px_8px_rgba(29,34,30,.23)] backdrop-blur-md sm:gap-1 sm:rounded-[8px] sm:px-1.5" aria-label={`${machine.name} macOS Dock`}>
            {dockItems.map(({ id, Icon, label, color, asset }) => <span key={id} title={label} className={`flex size-3.5 items-center justify-center rounded-[3px] bg-white/80 p-0.5 sm:size-[17px] ${id === machine.app && stage >= 1 ? 'ring-1 ring-emerald-500/70' : ''}`}>{asset ? <img src={`/images/desktop/dock/${asset}.png`} alt="" className="size-full object-contain" /> : <Icon className={`size-full ${color}`} />}</span>)}
          </div>
        )}
        <AnimatePresence initial={false}>
          {stage >= 2 ? <DesktopPreview key={machine.app} machine={machine} stage={stage} reducedMotion={reducedMotion} /> : null}
        </AnimatePresence>
        {machine.app === 'numbers' && stage >= 5 ? (
          <motion.div initial={{ opacity: 0, scale: 0.94, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.32 }} className="absolute bottom-[15%] right-[4%] z-[6] w-[46%] overflow-hidden rounded-md border border-black/20 bg-white shadow-[0_8px_18px_rgba(0,0,0,.28)]">
            <div className="flex h-4 items-center gap-1 border-b border-black/10 bg-[#f5f6f7] px-1 text-[7px] text-[#5d6662]"><i className="size-1.5 rounded-full bg-[#fb6158]" /><i className="size-1.5 rounded-full bg-[#f6bd4f]" /><i className="size-1.5 rounded-full bg-[#45c46a]" /><span className="ml-1 truncate">Mail · New Message</span></div>
            <div className="space-y-0.5 px-1.5 py-1 text-[7px] text-[#58615d]"><div>To: Maya Chen</div><div>Subject: Q3 close ready</div><div className="truncate rounded bg-[#eef4fb] px-1 py-0.5 text-[#4a6175]">Q3-refunds.numbers attached</div><div className="text-emerald-700">Draft saved in Mail</div></div>
          </motion.div>
        ) : null}
        {active ? (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, left: '94%', top: '85%' }}
            animate={{ opacity: 1, left: `${pointerPoint[0]}%`, top: `${pointerPoint[1]}%`, scale: isClicking ? 0.88 : 1 }}
            transition={{ left: { duration: reducedMotion ? 0 : 0.52, ease: [0.22, 1, 0.36, 1] }, top: { duration: reducedMotion ? 0 : 0.52, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.16 }, scale: { duration: 0.14 } }}
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <MousePointer2 className="size-4 -rotate-[17deg] fill-white text-[#20a67a] drop-shadow-[0_1px_2px_rgba(0,0,0,.65)] sm:size-[18px]" strokeWidth={2.5} />
            {isClicking ? <i className="absolute -left-1 -top-1 size-5 animate-ping rounded-full border border-emerald-400/90" /> : null}
          </motion.div>
        ) : null}
      </div>
      <div className="flex h-[18px] shrink-0 items-center justify-between gap-1 px-1 pt-0.5 sm:h-5 sm:px-1.5">
        <span className="min-w-0 truncate text-[8px] text-white/80 sm:text-[9px]">{APP_LABELS[machine.app]} · {machine.workItem}</span>
        <span className={`shrink-0 text-[8px] ${complete ? 'text-emerald-200' : 'text-white/45'} sm:text-[9px]`}>{machine.agent} · {statusText}</span>
      </div>
    </article>
  );
}

export function DevicesScene() {
  const { ref, tick: phase } = useVisibleTick(35, 700);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userToggledDrawer = useRef(false);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (!userToggledDrawer.current && (reduceMotion || phase >= 3)) setDrawerOpen(true);
  }, [phase, reduceMotion]);

  const toggleDrawer = () => {
    userToggledDrawer.current = true;
    setDrawerOpen((open) => !open);
  };

  return (
    <div ref={ref} className="machine-desktop-scene relative isolate aspect-auto min-h-[640px] w-full overflow-hidden bg-[#e8dece] text-white sm:aspect-video sm:min-h-0">
      <div aria-hidden="true" className="machine-desktop-wallpaper pointer-events-none absolute inset-0" />
      <div className="machine-menu-bar absolute inset-x-0 top-0 z-[5] flex h-7 items-center justify-between border-b border-black/10 px-3 text-[9px] font-medium text-[#363a38] backdrop-blur-md sm:h-9 sm:px-5 sm:text-[11px]">
        <span className="flex items-center gap-2.5"><b className="font-semibold">Finder</b><span>File</span><span>Edit</span><span className="hidden sm:inline">View</span></span>
        <span className="flex items-center gap-2"><span className="hidden sm:inline">This Mac</span><Wifi className="size-3" strokeWidth={2} /><span>9:41</span></span>
      </div>
      <div className="absolute left-[7%] top-[17%] z-[2] hidden w-[49%] overflow-hidden rounded-xl border border-black/15 bg-white/95 text-[#3a403d] shadow-[0_16px_38px_rgba(42,36,28,.22)] sm:block">
        <div className="flex h-7 items-center gap-2 border-b border-black/[0.08] bg-[#f7f8f7] px-2.5 text-[10px]"><span className="flex gap-1"><i className="size-2 rounded-full bg-[#fb6158]" /><i className="size-2 rounded-full bg-[#f6bd4f]" /><i className="size-2 rounded-full bg-[#45c46a]" /></span><span className="ml-1 text-[#69716d]">Chrome · Q3 launch research</span></div>
        <div className="px-4 py-3"><div className="flex items-center gap-2 rounded-lg bg-[#f0f2f1] px-2.5 py-2 text-[10px] text-[#717976]"><Search className="size-3" />refund policy for annual plans</div><div className="mt-2 text-[12px] font-semibold">Refund policy — support notes</div><div className="mt-1 h-1.5 w-[88%] rounded-full bg-[#e3e7e4]" /><div className="mt-1 h-1.5 w-[72%] rounded-full bg-[#e3e7e4]" /></div>
      </div>
      <div className="absolute right-[7%] top-[30%] z-[2] hidden w-[30%] overflow-hidden rounded-xl border border-black/15 bg-white/95 text-[#3a403d] shadow-[0_16px_38px_rgba(42,36,28,.22)] sm:block">
        <div className="flex h-7 items-center justify-between border-b border-black/[0.08] bg-[#f7f8f7] px-2.5 text-[10px]"><span>Today</span><span className="text-[#8a928e]">•••</span></div>
        <div className="space-y-2.5 px-3 py-3 text-[10px]"><div className="text-[#8a928e] line-through">Review Q3 forecast</div><div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full border border-[#8a928e]" />Send notes to Jordan</div><div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full border border-[#8a928e]" />Check the preview</div></div>
      </div>
      <button
        type="button"
        onClick={toggleDrawer}
        aria-label={drawerOpen ? 'Close machines drawer' : 'Open machines drawer'}
        aria-expanded={drawerOpen}
        className="absolute left-1/2 top-0 z-30 h-[11px] w-[88px] -translate-x-1/2 rounded-b-[8px] border-x border-b border-black/70 bg-[#080908] shadow-[0_2px_6px_rgba(0,0,0,.32)] transition-[height,width,background-color] duration-300 hover:h-[14px] hover:w-[104px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 sm:h-[13px] sm:w-[112px]"
      >
        <span className={`absolute bottom-[3px] left-1/2 size-1 -translate-x-1/2 rounded-full transition-colors ${drawerOpen ? 'bg-emerald-300 shadow-[0_0_7px_rgba(110,231,183,.9)]' : 'bg-white/35'}`} />
      </button>
      <AnimatePresence initial={false}>
        {drawerOpen ? (
          <motion.div
            key="machines-drawer"
            initial={reduceMotion ? false : { opacity: 0, clipPath: 'inset(0 46% 96% round 26px)', y: -5, scale: 0.98 }}
            animate={{ opacity: 1, clipPath: 'inset(0 0% 0% round 20px)', y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, clipPath: 'inset(0 46% 96% round 26px)', y: -5, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="machine-fleet-window absolute bottom-[5%] left-[3%] right-[3%] top-[4%] z-10 flex min-h-0 flex-col overflow-hidden rounded-[16px] border border-white/[0.14] bg-[#090b0a]/[0.98] shadow-[0_24px_64px_rgba(29,24,18,.48)] sm:bottom-[6%] sm:left-[4%] sm:right-[4%] sm:top-[5%] sm:rounded-[20px]"
          >
            <div className="flex h-9 shrink-0 items-center justify-between gap-2 border-b border-white/[0.08] px-2.5 sm:h-11 sm:px-4">
              <div className="flex min-w-0 items-center gap-2 text-[10px] text-white/75 sm:gap-2.5 sm:text-[11px]">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-white/80 sm:size-7"><Monitor className="size-3.5" strokeWidth={1.7} /></span>
                <span className="truncate font-semibold">Your machines</span>
                <span className="hidden text-white/30 sm:inline">/</span>
                <span className="hidden text-white/45 sm:inline">Shared task · Q3 refund close</span>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-2 py-1 text-[8px] text-emerald-100/75 sm:px-2.5 sm:text-[9px]"><i className="size-1.5 rounded-full bg-emerald-300" />Connected</span>
            </div>
            <div className="flex h-6 shrink-0 items-center justify-between border-b border-white/[0.08] px-2.5 text-[8px] text-white/45 sm:h-7 sm:px-4 sm:text-[9px]">
              <span><b className="font-medium text-white/75">6 desktops</b><span className="px-1.5 text-white/20">·</span>one close, six work items</span>
              <span className="flex items-center gap-1"><Link2 className="size-3" />shared evidence</span>
            </div>
            <div tabIndex={0} aria-label="Six connected desktops" className="machine-fleet-scroll grid min-h-0 flex-1 snap-y snap-proximity grid-cols-1 auto-rows-[220px] gap-2 overflow-y-auto p-2 overscroll-contain focus-visible:outline focus-visible:outline-1 focus-visible:outline-emerald-300/60 sm:grid-cols-3 sm:grid-rows-2 sm:auto-rows-auto sm:gap-2 sm:overflow-hidden sm:p-2.5">
              {FLEET_MACHINES.map((machine) => (
                <MachineDesktop key={machine.name} machine={machine} phase={phase} reducedMotion={Boolean(reduceMotion)} />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="machine-scene-dock absolute bottom-[2.5%] left-1/2 z-20 hidden -translate-x-1/2 items-end gap-1 rounded-[12px] border border-white/80 bg-white/75 p-1 shadow-[0_3px_14px_rgba(29,34,30,.25)] backdrop-blur-xl sm:flex sm:gap-1.5 sm:rounded-[15px] sm:p-1.5" aria-label="This Mac desktop Dock">
        {['finder', 'chrome', 'codex', 'claude', 'cursor', 'whatsapp', 'trash'].map((asset) => <span key={asset} className="flex size-5 items-center justify-center rounded-md bg-white/70 p-0.5 sm:size-7 sm:rounded-lg sm:p-1"><img src={`/images/desktop/dock/${asset}.png`} alt="" className="size-full object-contain drop-shadow-sm" /></span>)}
      </div>
    </div>
  );
}
