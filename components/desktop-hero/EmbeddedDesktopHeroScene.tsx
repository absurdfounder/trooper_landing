'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Check,
  CircleDashed,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  FileCode2,
  GitBranch,
  Image as ImageIcon,
  LockKeyhole,
  MessageCircle,
  Mic,
  MoreHorizontal,
  Paperclip,
  Phone,
  Plus,
  Puzzle,
  Search,
  Settings,
  Send,
  Smile,
  Star,
  Users,
  Video,
} from 'lucide-react';

import Draggable from './Draggable';
import TrooperAvatar from '@/components/ui/TrooperAvatar';
import { getTrooper } from '@/lib/troopers';

/** Original desktop stage, scaled proportionally to fit the laptop screen. */
const STAGE_W = 1600;
const STAGE_H = 780;

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

/** Remote icon with a local SVG fallback so a dead hotlink never shows a broken glyph. */
function RemoteIcon({
  src,
  size,
  className = '',
  fallback = null,
}: {
  src: string;
  size: number;
  className?: string;
  fallback?: React.ReactNode;
}) {
  const [broken, setBroken] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  // A hotlinked icon can fail before React hydrates, so the React onError
  // prop alone misses it. On mount: if the load already settled as a failure,
  // swap immediately; otherwise listen natively for the failure.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fail = () => setBroken(true);
    if (el.complete && el.naturalWidth === 0) {
      fail();
      return;
    }
    el.addEventListener('error', fail);
    return () => el.removeEventListener('error', fail);
  }, []);
  if (broken) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt=""
      width={size}
      height={size}
      draggable={false}
      decoding="async"
      className={className}
      onError={() => setBroken(true)}
    />
  );
}

function FolderSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 50" className={className} aria-hidden>
      <path
        d="M6 8a4 4 0 0 1 4-4h14l6 6h28a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z"
        fill="#59aef2"
      />
      <path d="M6 16h52v26a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z" fill="#8ccafd" />
    </svg>
  );
}

function FileGlyph({
  kind,
  className = '',
}: {
  kind: 'doc' | 'pdf' | 'img' | 'code' | 'csv';
  className?: string;
}) {
  const tint =
    kind === 'pdf'
      ? { sheet: '#fff', tab: '#fecaca', bar: '#ef4444', label: 'PDF' }
      : kind === 'img'
        ? { sheet: '#fff', tab: '#bbf7d0', bar: '#22c55e', label: 'PNG' }
        : kind === 'code'
          ? { sheet: '#fff', tab: '#ddd6fe', bar: '#7c3aed', label: 'TSX' }
          : kind === 'csv'
            ? { sheet: '#fff', tab: '#bfdbfe', bar: '#2563eb', label: 'CSV' }
            : { sheet: '#fff', tab: '#e7e5e4', bar: '#a8a29e', label: 'DOC' };

  return (
    <svg viewBox="0 0 48 56" className={className} aria-hidden>
      <path
        d="M6 4a3 3 0 0 1 3-3h22l11 11v37a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3Z"
        fill={tint.sheet}
        stroke="#e7e5e4"
      />
      <path d="M31 1l11 11h-8a3 3 0 0 1-3-3Z" fill={tint.tab} />
      <rect x="12" y="22" width="24" height="3" rx="1.5" fill={tint.bar} opacity="0.85" />
      <rect x="12" y="29" width="24" height="2.5" rx="1.25" fill="#e7e5e4" />
      <rect x="12" y="35" width="16" height="2.5" rx="1.25" fill="#e7e5e4" />
      <text
        x="24"
        y="48"
        textAnchor="middle"
        fontSize="7"
        fontWeight="700"
        fill={tint.bar}
        fontFamily="ui-sans-serif, system-ui"
      >
        {tint.label}
      </text>
    </svg>
  );
}

function FolderIcon({
  x,
  y,
  name,
  dataId,
}: {
  x: number;
  y: number;
  name: string;
  dataId: string;
}) {
  return (
    <Draggable x={x} y={y} dataId={dataId} className="z-[5] w-[72px] text-center">
      <div data-dh={`${dataId}-icon`}>
        <RemoteIcon
          src="/images/desktop/folder.png"
          size={56}
          className="mx-auto h-14 w-14 object-contain drop-shadow-sm"
          fallback={<FolderSvg className="mx-auto h-12 w-[58px]" />}
        />
        <span className="dh-icon-label mt-1 block truncate text-[11px] font-medium leading-4">
          {name}
        </span>
      </div>
    </Draggable>
  );
}

const CLI_IDS = ['claude', 'codex', 'cursor', 'grok'] as const;
type CliId = (typeof CLI_IDS)[number];

type CliConfig = {
  label: string;
  src: string;
  title: string;
  caption: string;
  accent: string;
  version: string;
  model: string;
  prompt: string;
  toolLine: string;
  checks: readonly [string, string, string];
  followUp: string;
  done: string;
  next: string;
  /** Authored resting spot — each CLI sits slightly differently so a switch feels like a new window. */
  x: number;
  y: number;
  w: number;
};

const CLI_APPS: Record<CliId, CliConfig> = {
  claude: {
    label: 'Claude Code',
    src: '/images/desktop/dock/claude.png',
    title: 'claude — zsh',
    caption: 'Claude Code CLI',
    accent: '#d97757',
    version: 'Claude Code v2.1.190',
    model: 'Sonnet 4.6 · high effort · ~/trooper-app',
    prompt: 'ship the auth middleware fix',
    toolLine: 'Reading src/middleware.ts · running checks',
    checks: ['Rewrote session guard', '12 tests green', 'PR #482 ready for review'],
    followUp: 'Want me to request review from Jordan?',
    done: '* Done in 8s',
    next: 'check pipeline status…',
    x: 24,
    y: 410,
    w: 360,
  },
  codex: {
    label: 'Codex',
    src: '/images/desktop/dock/codex.png',
    title: 'codex — zsh',
    caption: 'OpenAI Codex',
    accent: '#10a37f',
    version: 'Codex CLI',
    model: 'GPT-5 · ~/trooper-app',
    prompt: 'add a refunds ledger migration',
    toolLine: 'Planning · applying schema in db/migrations',
    checks: ['Created 2026_07_refunds.sql', 'Backfilled 1.2k rows', 'Migration dry-run clean'],
    followUp: 'Should I open the PR against main?',
    done: '* Finished in 14s',
    next: 'run migrate --check…',
    x: 36,
    y: 398,
    w: 372,
  },
  cursor: {
    label: 'Cursor',
    src: '/images/desktop/dock/cursor.png',
    title: 'cursor agent — zsh',
    caption: 'Cursor Agent',
    accent: '#8fc63f',
    version: 'Cursor Agent',
    model: 'Composer · ~/trooper-app',
    prompt: 'tighten the desktop hero choreography',
    toolLine: 'Editing DesktopHero.tsx · reviewing motion paths',
    checks: ['Staggered agent starts', 'Live target tracking OK', 'No overlap on dock'],
    followUp: 'Want a pass on reduced-motion next?',
    done: '* Applied in 6s',
    next: 'snapshot the hero layout…',
    x: 18,
    y: 418,
    w: 352,
  },
  grok: {
    label: 'Grok',
    src: '/images/desktop/dock/grok.png',
    title: 'grok — zsh',
    caption: 'Grok CLI',
    accent: '#c4e08a',
    version: 'Grok CLI',
    model: 'Grok 4 · ~/trooper-app',
    prompt: 'draft the deploy checklist for #482',
    toolLine: 'Scanning PR diff · writing ops notes',
    checks: ['Smoke paths listed', 'Rollback steps added', 'On-call ping drafted'],
    followUp: 'Drop this in #ship before Jordan merges?',
    done: '* Wrapped in 5s',
    next: 'post checklist to Slack…',
    x: 42,
    y: 404,
    w: 368,
  },
};

const DOCK_APPS = [
  { id: 'finder', label: 'Finder', src: '/images/desktop/dock/finder.png', kind: 'finder' as const },
  { id: 'claude', label: 'Claude Code', src: '/images/desktop/dock/claude.png', kind: 'cli' as const },
  { id: 'codex', label: 'Codex', src: '/images/desktop/dock/codex.png', kind: 'cli' as const },
  { id: 'cursor', label: 'Cursor', src: '/images/desktop/dock/cursor.png', kind: 'cli' as const },
  { id: 'grok', label: 'Grok', src: '/images/desktop/dock/grok.png', kind: 'cli' as const },
  { id: 'xcode', label: 'Xcode', src: '', kind: 'app' as const },
  { id: 'spotify', label: 'Spotify', src: '/images/desktop/dock/spotify.png', kind: 'app' as const },
  { id: 'chrome', label: 'Chrome', src: '/images/desktop/dock/chrome.png', kind: 'app' as const },
  { id: 'figma', label: 'Figma', src: '/images/desktop/dock/figma.png', kind: 'app' as const },
  { id: 'whatsapp', label: 'WhatsApp', src: '/images/desktop/dock/whatsapp.png', kind: 'app' as const },
  { id: 'trash', label: 'Trash', src: '/images/desktop/dock/trash.png', kind: 'app' as const },
] as const;

/**
 * macOS dock — Finder opens over deploy; CLI icons switch the agent terminal.
 * Trash sits past a hairline divider on the right.
 */
function MacDock({
  activeCli,
  onSelectCli,
  onOpenFinder,
  onOpenApp,
}: {
  activeCli: CliId;
  onSelectCli: (id: CliId) => void;
  onOpenFinder: () => void;
  onOpenApp: (id: string) => void;
}) {
  return (
    <div
      data-dh="dock"
      className="dh-dock pointer-events-auto absolute bottom-1.5 left-1/2 z-30 flex -translate-x-1/2 items-end gap-[5px] rounded-[16px] px-2.5 py-1.5"
    >
      {DOCK_APPS.map((app, i) => {
        const isCli = app.kind === 'cli';
        const isFinder = app.kind === 'finder';
        const isActive = isCli && app.id === activeCli;
        const isShowcaseApp = ['chrome', 'whatsapp', 'xcode'].includes(app.id);
        const interactive = isCli || isFinder || isShowcaseApp;
        return (
          <React.Fragment key={app.id}>
            {app.id === 'trash' ? (
              <span className="dh-dock-sep mx-0.5 mb-1 h-8 w-px self-center" />
            ) : null}
            <button
              type="button"
              data-dh={
                isCli ? `dock-${app.id}` : isFinder ? 'dock-finder' : isShowcaseApp ? `dock-${app.id}` : app.id === 'trash' ? 'trash' : undefined
              }
              aria-label={
                isCli ? `Open ${app.label}` : isFinder ? 'Open Finder' : `Open ${app.label}`
              }
              aria-pressed={isCli ? isActive : undefined}
              disabled={!interactive}
              onClick={() => {
                if (isCli) onSelectCli(app.id as CliId);
                if (isFinder) onOpenFinder();
                if (isShowcaseApp) onOpenApp(app.id);
              }}
              className={[
                'relative flex size-9 items-center justify-center rounded-[9px]',
                interactive
                  ? 'cursor-pointer transition-transform hover:-translate-y-0.5 active:translate-y-0'
                  : 'cursor-default disabled:opacity-100',
              ].join(' ')}
            >
              <span
                className={[
                  'flex size-9 items-center justify-center overflow-hidden rounded-[9px] shadow-[0_1px_3px_rgba(26,26,26,0.22)]',
                  isActive ? 'ring-2 ring-[#8fc63f] ring-offset-1 ring-offset-white/50' : '',
                ].join(' ')}
              >
                {app.id === 'xcode' ? (
                  <XcodeDockIcon />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={app.src}
                    alt=""
                    width={36}
                    height={36}
                    draggable={false}
                    className="pointer-events-none size-9 select-none object-cover"
                  />
                )}
              </span>
              {isActive ? (
                <span className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#8fc63f]" />
              ) : null}
            </button>
            {i === 0 ? <span className="dh-dock-sep mx-0.5 mb-1 h-8 w-px self-center" /> : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function DesktopFile({
  x,
  y,
  name,
  kind,
  dataId,
}: {
  x: number;
  y: number;
  name: string;
  kind: 'doc' | 'pdf' | 'img' | 'code' | 'csv';
  dataId?: string;
}) {
  return (
    <Draggable x={x} y={y} dataId={dataId} className="z-[5] w-[72px] text-center">
      <FileGlyph kind={kind} className="mx-auto h-[52px] w-[44px] drop-shadow-sm" />
      <span className="dh-icon-label mt-1 block truncate text-[11px] font-medium leading-4">
        {name}
      </span>
    </Draggable>
  );
}

/** Flat mac window — no tilt. Real desktops keep windows square to the screen. */
function MacWindow({
  x,
  y,
  w,
  title,
  caption,
  dataId,
  children,
}: {
  x: number;
  y: number;
  w: number;
  title?: string;
  caption?: string;
  dataId: string;
  children: React.ReactNode;
}) {
  return (
    <Draggable x={x} y={y} dataId={dataId} className="z-[12]">
      <div style={{ width: w }}>
        <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_1px_0_rgba(255,255,255,0.75)_inset,0_2px_4px_rgba(26,26,26,0.04),0_12px_32px_-8px_rgba(26,26,26,0.22),0_32px_64px_-16px_rgba(26,26,26,0.16)] ring-1 ring-black/[0.08]">
          <div className="flex items-center gap-1.5 border-b border-black/[0.05] bg-gradient-to-b from-neutral-50 to-neutral-100/90 px-3 py-2">
            <span className="size-3 rounded-full bg-[#ff5f57] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.25)]" />
            <span className="size-3 rounded-full bg-[#febc2e] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.2)]" />
            <span className="size-3 rounded-full bg-[#28c840] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.2)]" />
            {title ? (
              <span className="ml-2 truncate text-[11px] font-medium tracking-tight text-neutral-500">
                {title}
              </span>
            ) : null}
          </div>
          {children}
        </div>
        {caption ? (
          <p className="mt-2 text-center text-[11px] font-medium tracking-tight text-neutral-400">
            {caption}
          </p>
        ) : null}
      </div>
    </Draggable>
  );
}

/* ------------------------------------------------------------------ */
/* Window contents — what the troopers are “working on”                */
/* ------------------------------------------------------------------ */

/** Transient Preview window — opens when an agent double-clicks a desktop file. */
function PreviewDocMock() {
  return (
    <div className="relative overflow-hidden text-[11px] leading-[1.45] text-neutral-600">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/desktop/cats-monet-preview.jpg"
        alt=""
        className="h-[108px] w-full object-cover"
      />
      <div className="relative px-3.5 py-2.5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
          Article · Markdown
        </p>
        <p className="mt-1 font-semibold text-neutral-800">
          Six cats in Monet’s light
        </p>
        <p className="mt-1 line-clamp-3 text-[10px] text-neutral-500">
          Persian, Siamese, Maine Coon — Impressionist breed studies. Editorial playbook before publish.
        </p>
        <span data-dh="fx-readbar" className="dh-readbar pointer-events-none absolute left-2 right-2 h-5 rounded-sm bg-amber-200/50" />
      </div>
    </div>
  );
}

function PreviewCodeMock() {
  return (
    <div className="relative px-3 py-2.5 font-mono text-[10px] leading-[1.55] text-neutral-300">
      <p className="text-[9px] text-neutral-500">App.tsx — skim</p>
      <p className="mt-1.5">
        <span className="text-violet-300">export</span> <span className="text-sky-300">function</span>{' '}
        <span className="text-amber-200">TrooperApp</span>() {'{'}
      </p>
      <p className="pl-3 text-neutral-400">return &lt;Workforce /&gt;</p>
      <p>{'}'}</p>
      <p className="mt-1 text-emerald-400/90">// hooks ready · no blockers</p>
      <span data-dh="fx-readbar-code" className="dh-readbar pointer-events-none absolute left-2 right-2 h-4 rounded-sm bg-sky-400/25" />
    </div>
  );
}

/** Quick Look from Finder — Jordan scans a PDF before shipping. */
function PreviewFinderFileMock() {
  return (
    <div className="relative px-4 py-3 text-[11px] leading-[1.55] text-neutral-600">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
        PDF · 4 pages
      </p>
      <p className="mt-2 font-semibold text-neutral-800">Q3 refunds audit</p>
      <p className="mt-2">
        Matched Stripe payouts to the sheet. Four open disputes still need sign-off before close.
      </p>
      <ul className="mt-2 space-y-1 text-[10px] text-neutral-500">
        <li>· 18 refunds · $2,117.50 total</li>
        <li>· 0 chargebacks pending</li>
        <li>· Ledger export attached on p.3</li>
      </ul>
      <span
        data-dh="fx-readbar-finder"
        className="dh-readbar pointer-events-none absolute left-2 right-2 h-4 rounded-sm bg-amber-200/50"
      />
    </div>
  );
}

/** Chrome with a compact tab strip, full toolbar and a credible Google results page. */
function ChromeMock() {
  const tabs = [
    ['G', '#4285f4'], ['◉', '#8095a8'], ['T', '#20a878'], ['S', '#635bff'],
    ['⌘', '#c6d1e0'], ['G', '#4285f4'], ['↗', '#f5a623'], ['L', '#5e6ad2'],
    ['✦', '#d84d72'], ['D', '#4a86e8'], ['●', '#2ea44f'], ['X', '#111827'],
    ['◈', '#1f9d88'], ['F', '#7759d6'], ['A', '#e8793b'], ['G', '#4285f4'],
    ['M', '#d84d72'], ['◉', '#f5a623'], ['▣', '#4285f4'], ['K', '#111827'],
    ['◌', '#1f9d88'], ['P', '#e8793b'], ['↗', '#7759d6'], ['●', '#2ea44f'],
    ['N', '#d84d72'], ['S', '#4285f4'], ['⌘', '#8095a8'], ['T', '#f5a623'],
  ];
  return (
    <div data-dh="chrome-app" className="dh-chrome-app h-[535px] overflow-hidden bg-white text-[#202124]">
      <div className="flex h-9 items-end gap-1 overflow-hidden bg-[#292d36] px-2 pt-1">
        <div className="mb-[7px] mr-1 flex shrink-0 items-center gap-1.5">
          <button type="button" data-dh="win-chrome-close" aria-label="Close Google Chrome" onClick={(event) => { const win = event.currentTarget.closest('.dh-preview'); if (!win) return; win.classList.remove('dh-preview-open'); win.classList.add('dh-preview-closing'); window.setTimeout(() => { win.classList.add('dh-preview-closed'); win.classList.remove('dh-preview-closing'); }, 320); }} className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-end gap-[2px] overflow-hidden">
          {tabs.map(([icon, color], index) => (
            <div key={`${icon}-${index}`} className={`flex h-[26px] min-w-[20px] max-w-[38px] flex-1 items-center justify-center gap-1 rounded-t-[7px] px-0.5 ${index === 5 ? 'max-w-[152px] flex-[4] justify-start bg-[#f8f9fa] text-[#35363a]' : 'bg-[#353943] text-white/70'}`} title={index === 5 ? 'Q3 refund approval policy — Google Search' : 'Open tab'}>
              <span className="flex size-3 shrink-0 items-center justify-center rounded-[3px] text-[8px] font-semibold" style={{ color: '#fff', backgroundColor: color }}>{icon}</span>
              {index === 5 ? <span className="min-w-0 flex-1 truncate text-[9px]">Q3 refunds</span> : null}
              {index === 5 ? <span className="text-[9px] text-neutral-500">×</span> : null}
            </div>
          ))}
        </div>
        <button type="button" aria-label="New tab" className="mb-1.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[15px] text-white/80 hover:bg-white/10">+</button>
      </div>
      <div className="flex h-10 items-center gap-2 bg-[#353943] px-3 text-[10px] text-[#c3c7d0]">
        <span className="flex size-5 items-center justify-center rounded-full hover:bg-white/10"><ChevronLeft className="size-3.5" /></span>
        <span className="flex size-5 items-center justify-center rounded-full text-white/45"><ChevronRight className="size-3.5" /></span>
        <span className="flex size-5 items-center justify-center rounded-full hover:bg-white/10">⟳</span>
        <span className="flex size-5 items-center justify-center rounded-full text-white/70">⌂</span>
        <div data-dh="chrome-address" className="flex h-[27px] min-w-0 flex-1 items-center gap-2 rounded-full bg-[#20232b] px-3 text-[9px] text-[#d3d6dc] shadow-inner">
          <LockKeyhole className="size-3 shrink-0 text-[#a9b1be]" />
          <span data-dh="chrome-location" className="truncate">google.com/search?q=Q3+refund+approval+policy</span>
          <Star className="ml-auto size-3 shrink-0 text-[#aeb5c0]" />
        </div>
        <div className="flex shrink-0 items-center gap-1 text-[8px] text-white/85" aria-label="Browser extensions">
          <span className="flex size-4 items-center justify-center rounded bg-[#3079e6] text-[9px]">✦</span>
          <span className="flex size-4 items-center justify-center rounded bg-[#454a54] font-semibold">S</span>
          <span className="flex size-4 items-center justify-center rounded bg-[#df3f75] text-[9px]">↓</span>
          <span className="relative flex size-4 items-center justify-center rounded bg-[#7044d8]">◈<span className="absolute -right-1 -top-1 rounded-full bg-[#6f42c1] px-0.5 text-[6px] leading-3">5</span></span>
          <span className="flex size-4 items-center justify-center rounded bg-[#ee8a39] text-[9px]">✺</span>
          <span className="flex size-4 items-center justify-center rounded bg-[#2f8a55] text-[8px]">◉</span>
          <span className="flex size-4 items-center justify-center rounded bg-[#4b78ca] text-[8px]">V</span>
          <span className="flex size-4 items-center justify-center rounded bg-[#252933] text-[8px]">⌘</span>
          <Puzzle className="mx-0.5 size-3.5 text-[#d7dce5]" />
        </div>
        <span className="flex size-5 items-center justify-center rounded-full bg-[#d2e3fc] text-[8px] font-bold text-[#174ea6]">V</span>
        <MoreHorizontal className="size-4 shrink-0" />
      </div>
      <div className="flex h-6 items-center gap-4 border-b border-white/5 bg-[#353943] px-4 text-[8px] text-[#d0d3d9]">
        <span className="flex items-center gap-1"><span className="text-[#8ab4f8]">◉</span> Mail</span>
        <span className="flex items-center gap-1"><span className="text-[#8ab4f8]">▦</span> Drive</span>
        <span className="flex items-center gap-1"><span className="text-[#8ab4f8]">▣</span> Refunds board</span>
        <span className="flex items-center gap-1"><span className="text-[#8ab4f8]">◈</span> Stripe docs</span>
        <span className="ml-auto text-white/50">Other bookmarks</span>
      </div>
      <div className="relative h-[450px] overflow-hidden bg-white">
        <div data-dh="chrome-home" className="dh-chrome-home flex h-full flex-col items-center pt-14">
          <div className="mb-5 text-[38px] font-medium tracking-tight"><span className="text-[#4285f4]">G</span><span className="text-[#ea4335]">o</span><span className="text-[#fbbc05]">o</span><span className="text-[#4285f4]">g</span><span className="text-[#34a853]">l</span><span className="text-[#ea4335]">e</span></div>
          <div data-dh="chrome-google-field" className="flex h-11 w-[68%] items-center gap-2.5 rounded-full border border-[#dfe1e5] px-4 shadow-[0_1px_6px_rgba(32,33,36,.2)]">
            <Search className="size-4 shrink-0 text-neutral-500" aria-hidden="true" />
            <span data-dh="chrome-google-query" className="dh-type dh-t-idle min-w-0 truncate text-[12px] text-[#202124]" style={{ '--dh-w': '38ch' } as React.CSSProperties}>Q3 refund approval policy exceptions</span>
            <span className="ml-auto text-[15px] text-[#4285f4]">⌕</span>
          </div>
          <div className="mt-5 flex gap-3 text-[10px] text-[#3c4043]"><button type="button" data-dh="chrome-search-submit" onClick={(event) => event.currentTarget.closest('[data-dh="chrome-app"]')?.classList.add('dh-chrome-results-visible')} className="rounded bg-[#f8f9fa] px-4 py-2 hover:border hover:border-[#dadce0]">Google Search</button><span className="rounded bg-[#f8f9fa] px-4 py-2">I'm Feeling Lucky</span></div>
          <p className="mt-6 text-[8px] text-neutral-500">Google offered in: हिन्दी বাংলা తెలుగు मराठी</p>
        </div>
        <div data-dh="chrome-results" className="dh-chrome-results absolute inset-0 bg-white">
          <div className="flex h-[64px] items-center gap-5 border-b border-[#ebedef] px-6">
            <div className="shrink-0 text-[25px] font-medium tracking-tight"><span className="text-[#4285f4]">G</span><span className="text-[#ea4335]">o</span><span className="text-[#fbbc05]">o</span><span className="text-[#4285f4]">g</span><span className="text-[#34a853]">l</span><span className="text-[#ea4335]">e</span></div>
            <div className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-full border border-[#dfe1e5] px-3 text-[10px] shadow-[0_1px_4px_rgba(32,33,36,.12)]"><Search className="size-3.5 shrink-0 text-[#4285f4]" />Q3 refund approval policy exceptions<span className="ml-auto text-[#4285f4]">⌕</span></div>
            <span className="flex size-7 items-center justify-center rounded-full bg-[#d2e3fc] text-[9px] font-bold text-[#174ea6]">V</span>
          </div>
          <div className="flex h-9 items-end gap-5 border-b border-[#ebedef] pl-[153px] text-[9px] text-[#5f6368]"><span className="border-b-2 border-[#1a73e8] pb-2 text-[#1a73e8]">All</span><span className="pb-2">Images</span><span className="pb-2">News</span><span className="pb-2">Videos</span><span className="pb-2">More⌄</span><span className="pb-2">Tools⌄</span></div>
          <div className="grid h-[347px] grid-cols-[minmax(0,1fr)_250px] gap-7 overflow-hidden px-6 py-3">
            <div className="min-w-0 pl-[128px] text-[9px] leading-[1.5]">
              <p className="mb-3 text-[8px] text-[#70757a]">About 12,800 results (0.42 seconds)</p>
              <button type="button" data-dh="chrome-result" onClick={(event) => event.currentTarget.closest('[data-dh="chrome-app"]')?.classList.add('dh-chrome-page-open')} className="block w-full rounded-lg px-2 py-1 text-left transition-colors">
                <span className="flex items-center gap-2 text-[8px] text-[#202124]"><span className="flex size-4 items-center justify-center rounded-full bg-emerald-100 text-[8px] font-semibold text-emerald-700">T</span><span>Trooper Finance › Playbooks › Refunds</span><ExternalLink className="ml-auto size-3 text-[#70757a]" /></span>
                <span className="mt-1 block text-[15px] leading-5 text-[#1a0dab]">Q3 refund policy: approvals and exceptions</span>
                <span className="mt-1 block text-[#4d5156]">Refunds under $500 can be matched automatically. Disputes and exceptions above the threshold need a reviewer’s sign-off.</span>
              </button>
              <div className="mt-2 border-t border-[#ebedef] px-2 pt-2"><span className="text-[8px] text-[#5f6368]">support.trooper.so › finance › refunds</span><p className="mt-1 text-[13px] text-[#1a0dab]">How to reconcile a refund</p><p className="mt-1 text-[#4d5156]">Match the original payment, attach evidence, and route exceptions for review.</p></div>
              <div className="mt-2 border-t border-[#ebedef] px-2 pt-2"><span className="text-[8px] text-[#5f6368]">stripe.com › docs › refunds</span><p className="mt-1 text-[13px] text-[#1a0dab]">Refunds | Stripe Documentation</p><p className="mt-1 text-[#4d5156]">Learn how refunds work, when to issue one, and how long processing takes.</p></div>
            </div>
            <aside className="h-fit rounded-xl border border-[#dadce0] px-4 py-3 text-[8px] leading-[1.45] text-[#3c4043]">
              <p className="text-[12px] font-semibold">Refund approvals</p><p className="mt-1 text-[#70757a]">Finance playbook · Trooper</p>
              <div className="my-3 h-px bg-[#dadce0]" />
              <p className="font-semibold">Approval thresholds</p><p className="mt-1 text-[#5f6368]">Automatic match below $500</p><p className="mt-1 text-[#5f6368]">Manual review for disputes</p>
              <div className="my-3 h-px bg-[#dadce0]" />
              <p className="font-semibold">Related searches</p><p className="mt-1 text-[#1a0dab]">refund policy for annual plans</p><p className="mt-1 text-[#1a0dab]">how to reconcile Stripe refunds</p>
            </aside>
          </div>
        </div>
        <div data-dh="chrome-policy" className="dh-chrome-policy absolute inset-0 overflow-auto bg-white px-9 py-7 text-[10px] leading-[1.5]">
          <div className="-mx-9 -mt-7 flex h-11 items-center gap-2 border-b border-neutral-200 bg-[#fbfcfd] px-9 text-[8px] text-neutral-600"><span className="flex size-5 items-center justify-center rounded-md bg-[#1fa982] text-[8px] font-bold text-white">t</span><span className="font-semibold text-neutral-800">Trooper Finance</span><span className="ml-2 text-neutral-300">|</span><span>Playbooks</span><span className="text-neutral-300">/</span><span>Refunds</span><span className="ml-auto rounded-md border border-neutral-200 bg-white px-2 py-1">Share</span><span className="flex size-6 items-center justify-center rounded-full bg-[#dfeee7] text-[7px] font-semibold text-[#267356]">AR</span></div>
          <div className="mt-5 grid grid-cols-[minmax(0,1fr)_210px] gap-5">
            <main className="min-w-0">
              <div className="flex items-center gap-1.5 text-[8px] text-neutral-500"><span className="rounded bg-[#e8f5ef] px-1.5 py-0.5 font-semibold text-emerald-800">FINANCE</span><span>›</span><span>Close procedures</span><span>›</span><span>Refunds</span></div>
              <p className="mt-3 text-[8px] font-semibold uppercase tracking-[.13em] text-emerald-700">Finance playbook · Updated today</p>
              <h3 className="mt-1 text-[21px] font-semibold tracking-tight text-neutral-900">Q3 refund policy</h3>
              <p className="mt-1 max-w-[560px] text-[9px] text-neutral-600">Match each refund to its original payment. Send exceptions to a reviewer before closing the ledger.</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-neutral-200 p-2.5"><span className="text-[7px] font-semibold text-neutral-500">AUTO MATCH</span><p className="mt-1 font-semibold">Under $500</p><p className="text-[7px] text-neutral-500">Payment and amount match</p></div>
                <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-2.5"><span className="text-[7px] font-semibold text-amber-700">NEEDS REVIEW</span><p className="mt-1 font-semibold">Disputes</p><p className="text-[7px] text-neutral-500">Attach evidence and assign owner</p></div>
                <div className="rounded-lg border border-neutral-200 p-2.5"><span className="text-[7px] font-semibold text-neutral-500">CLOSE</span><p className="mt-1 font-semibold">After sign-off</p><p className="text-[7px] text-neutral-500">Export the ledger</p></div>
              </div>
              <div data-dh="chrome-finding" className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[8px] text-emerald-900"><Check className="size-3.5 shrink-0 text-emerald-600" /> 4 matched · 2 exceptions need reviewer sign-off</div>
              <section className="mt-4 rounded-lg border border-neutral-200 px-3 py-2"><p className="text-[9px] font-semibold text-neutral-800">Exception review checklist</p><div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[8px] text-neutral-600"><span>✓ Confirm original charge</span><span>✓ Attach invoice or receipt</span><span>○ Add reviewer note</span><span>○ Close after approval</span></div></section>
            </main>
            <aside className="h-fit rounded-xl border border-neutral-200 bg-[#fbfcfd] p-3 text-[8px] leading-[1.45] text-neutral-600">
              <div className="flex items-center gap-2"><span className="flex size-6 items-center justify-center rounded-full bg-[#f3d9be] text-[7px] font-semibold text-[#765237]">AR</span><div><p className="font-semibold text-neutral-800">Aria · Finance</p><p className="text-[7px] text-neutral-500">Playbook owner</p></div></div>
              <div className="my-3 h-px bg-neutral-200"/><p className="font-semibold text-neutral-800">Close status</p><p className="mt-1">4 refunds matched automatically.</p><p className="mt-1">2 exceptions are waiting for sign-off.</p><div className="my-3 h-px bg-neutral-200"/><p className="font-semibold text-neutral-800">Related files</p><p className="mt-1 text-[#1a73e8]">refunds-q3.csv</p><p className="mt-1 text-[#1a73e8]">Q3-audit.pdf</p>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Xcode with a real project navigator, editor tabs, line numbers and debug console. */
function XcodeMock() {
  const files = ['RefundReview.swift', 'RefundStore.swift', 'Refund.swift', 'RefundTests.swift'];
  return (
    <div data-dh="xcode-app" className="dh-xcode-app h-[490px] overflow-hidden bg-[#1c1c1e] text-[#d6d6d6]">
      <div className="flex h-[42px] items-center gap-2 border-b border-black/50 bg-[#292a2d] px-3 text-[9px]">
        <button type="button" aria-label="Toggle navigator" className="flex size-6 items-center justify-center rounded text-neutral-400 hover:bg-white/10">▣</button>
        <span className="flex size-6 items-center justify-center rounded text-neutral-400">☰</span>
        <span className="mx-1 h-5 w-px bg-white/10" />
        <button type="button" data-dh="xcode-run" onClick={(event) => { const app = event.currentTarget.closest('[data-dh="xcode-app"]'); const status = app?.querySelector('[data-dh="xcode-status"]'); const build = app?.querySelector('[data-dh="xcode-build"]'); if (status) status.textContent = 'Build Succeeded'; build?.classList.remove('dh-off'); }} className="flex size-7 items-center justify-center rounded-full bg-[#404146] text-white shadow-inner">▶</button>
        <span className="flex size-6 items-center justify-center rounded text-neutral-400">■</span>
        <div className="ml-2 min-w-0 flex-1 text-center leading-tight"><p className="truncate font-semibold text-neutral-200">RefundsApp</p><p className="truncate text-[8px] text-neutral-500">RefundReview.swift</p></div>
        <div className="flex min-w-0 items-center gap-1.5 rounded-md border border-white/10 bg-[#202124] px-2 py-1 text-[8px] text-neutral-300"><span className="text-blue-400">▣</span> RefundsApp <span className="text-neutral-500">›</span> iPhone 17 Pro <ChevronDown className="size-3 text-neutral-500" /></div>
        <span className="ml-2 min-w-0 truncate text-[8px] text-neutral-400">Finished running RefundsApp on iPhone 17 Pro</span>
        <span className="ml-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-400/10 text-[9px] text-amber-400">1</span>
      </div>
      <div className="flex h-[372px] min-h-0">
        <aside className="flex w-[204px] shrink-0 border-r border-black/30 bg-[#252629]">
          <div className="flex w-[34px] flex-col items-center gap-3 border-r border-white/[.04] py-3 text-[11px] text-neutral-500"><span className="rounded bg-blue-500/20 px-2 py-1 text-blue-300">▣</span><span>⌕</span><span>◇</span><span>⚠</span><span>⌑</span><span>▤</span></div>
          <div className="min-w-0 flex-1 px-2 py-3 text-[8px] text-neutral-400">
            <div className="mb-3 flex items-center justify-between text-[8px] font-semibold uppercase tracking-[.08em] text-neutral-500"><span>Project navigator</span><MoreHorizontal className="size-3" /></div>
            <p className="flex items-center gap-1 rounded bg-blue-500/20 px-1.5 py-1.5 text-blue-200"><ChevronDown className="size-3" /><span className="size-3 rounded bg-blue-400/80" /> RefundsApp</p>
            <p className="pl-4 pt-2 text-neutral-400">▸ Assets</p><p className="pl-4 pt-2 text-neutral-400">▾ RefundsApp</p>
            {files.map((file, index) => <p key={file} className={`mt-1 truncate rounded py-1 pl-6 pr-1 ${index === 0 ? 'bg-white/[.08] text-white' : 'text-neutral-400'}`}><FileCode2 className={`mr-1 inline size-3 ${index === 0 ? 'text-orange-300' : 'text-blue-300'}`} />{file}</p>)}
            <p className="pl-4 pt-2">▸ Preview Content</p><p className="pl-4 pt-2">▸ Products</p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col bg-[#1e1e20]">
          <div className="flex h-[31px] items-center border-b border-black/30 bg-[#292a2d] px-3 text-[8px] text-neutral-400"><span className="text-blue-300">RefundsApp</span><ChevronRight className="mx-1 size-3" /><span className="text-orange-300">RefundReview.swift</span><span className="ml-auto flex items-center gap-2"><GitBranch className="size-3" /> main <span className="mx-1 h-3 w-px bg-white/10" /> ⌘ S</span></div>
          <div className="relative min-h-0 flex-1 overflow-hidden px-2 py-2 font-mono text-[9px] leading-[1.8]">
            <div className="absolute inset-y-2 left-0 w-10 border-r border-white/[.04] text-right text-neutral-600"><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p></div>
            <div className="min-w-0 pl-12 pr-5 text-[#d6d6d6]">
              <p><span className="text-[#fc5fa3]">import</span> <span className="text-[#78c7ff]">SwiftUI</span></p>
              <p className="mt-1 text-neutral-500">// Refund summary shown in the iOS app</p>
              <p><span className="text-[#fc5fa3]">struct</span> <span className="text-[#a8d07b]">RefundReview</span>: <span className="text-[#a8d07b]">View</span> {'{'}</p>
              <p className="pl-4"><span className="text-[#fc5fa3]">let</span> refund: <span className="text-[#a8d07b]">Refund</span></p>
              <p className="pl-4"><span className="text-[#fc5fa3]">var</span> body: <span className="text-[#fc5fa3]">some</span> <span className="text-[#a8d07b]">View</span> {'{'}</p>
              <p className="pl-8"><span className="text-[#78c7ff]">VStack</span>(spacing: <span className="text-[#d69bff]">16</span>) {'{'}</p>
              <p className="pl-12"><span className="text-[#78c7ff]">Text</span>(refund.customerName)</p>
              <p className="pl-12"><span className="text-[#78c7ff]">Text</span>(refund.amount, format: .currency(code: <span className="text-[#fc8c64]">"USD"</span>))</p>
              <p className="pl-12"><span className="text-[#fc5fa3]">if</span> refund.needsReview {'{'}</p>
              <p data-dh="xcode-code" className="dh-type dh-t-idle pl-16 text-[#a8d07b]" style={{ '--dh-w': '38ch' } as React.CSSProperties}>Text("Needs reviewer sign-off")</p>
              <p className="pl-12">{'}'}</p><p className="pl-8">{'}'}</p><p className="pl-4">{'}'}</p><p>{'}'}</p>
              <p className="mt-2 rounded bg-blue-500/[.08] text-blue-100"><span className="text-neutral-600">16</span> <span className="pl-8">.accessibilityLabel("Refund review")</span></p>
            </div>
            <div aria-hidden="true" className="absolute right-2 top-3 flex h-[190px] w-[44px] flex-col gap-[3px] overflow-hidden opacity-40">{Array.from({ length: 30 }, (_, i) => <span key={i} className={`h-[2px] rounded ${i % 4 === 0 ? 'w-8 bg-red-400' : i % 3 === 0 ? 'w-6 bg-green-300' : 'w-10 bg-neutral-500'}`} />)}</div>
          </div>
        </div>
      </div>
      <div className="h-[76px] border-t border-black/50 bg-[#242528]">
        <div className="flex h-6 items-center gap-4 border-b border-black/40 px-3 text-[8px] text-neutral-400"><span className="text-white">All Output</span><span>Debug</span><span>Console</span><span className="ml-auto flex items-center gap-1"><span className="size-1.5 rounded-full bg-emerald-400" /> Debug session active</span></div>
        <div className="px-3 py-1.5 font-mono text-[8px] leading-[1.5] text-neutral-400"><p><span className="text-emerald-300">12:04:12</span> Build target RefundsApp · iPhone 17 Pro</p><p data-dh="xcode-status">Ready to build</p><p data-dh="xcode-build" className="dh-off text-emerald-300"><Check className="mr-1 inline size-3" /> Build Succeeded · 0 errors · 1 warning</p></div>
      </div>
    </div>
  );
}

/** A separate iOS Simulator window, with the app rendered inside a hardware frame. */
function SimulatorMock() {
  return (
    <div className="h-[458px] overflow-hidden bg-[#202124] text-neutral-200">
      <div className="flex h-8 items-center gap-2 border-b border-black/40 bg-[#2d2e31] px-2 text-[8px] text-neutral-300"><span className="flex size-5 items-center justify-center rounded bg-[#3c3d40]">▣</span><span className="font-medium">iPhone 17 Pro</span><ChevronDown className="size-3 text-neutral-500" /><span className="mx-1 h-4 w-px bg-white/10" /><span className="text-neutral-500">100%</span><span className="ml-auto flex items-center gap-2 text-neutral-400">◱　↻　▣</span></div>
      <div className="flex h-[426px] items-center justify-center bg-[radial-gradient(ellipse_at_center,#33363b_0%,#1d1e21_70%)] px-3 py-3">
        <div data-dh="simulator-app-screen" className="relative h-[398px] w-[205px] overflow-hidden rounded-[31px] border-[5px] border-[#44474b] bg-[#090a0d] p-[3px] shadow-[0_10px_28px_rgba(0,0,0,.58)]">
          <div className="relative h-full overflow-hidden rounded-[24px] bg-[#f7f8fa] text-[#101828]">
            <div className="absolute left-1/2 top-[6px] z-10 flex h-[18px] w-[70px] -translate-x-1/2 items-center justify-center rounded-full bg-black"><span className="size-1 rounded-full bg-[#243b50]" /></div>
            <div className="flex h-7 items-end justify-between px-3 pb-1 text-[7px] font-semibold"><span>9:41</span><span>●●●  ▰</span></div>
            <div className="flex h-9 items-center border-b border-black/[.05] bg-white px-3"><span className="flex size-5 items-center justify-center rounded-md bg-[#1fa982] text-[8px] font-bold text-white">t</span><span className="ml-2 text-[9px] font-semibold">Trooper</span><span className="ml-auto flex size-5 items-center justify-center rounded-full bg-[#eef4f2] text-[7px] font-semibold text-[#1b8066]">AR</span></div>
            <div className="h-[286px] overflow-hidden px-3 py-3">
              <p className="text-[7px] font-semibold uppercase tracking-[.12em] text-[#85909e]">Finance · shared task</p><h3 className="mt-1 text-[15px] font-semibold tracking-tight">Q3 close</h3><p className="mt-0.5 text-[7px] text-[#667085]">2 exceptions need your review</p>
              <div className="mt-3 rounded-xl border border-[#e3e7ec] bg-white p-2 shadow-sm"><div className="flex items-center justify-between"><span className="text-[7px] font-semibold">Refund #2379</span><span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[6px] font-semibold text-amber-700">REVIEW</span></div><p className="mt-1 text-[13px] font-semibold">$1,240.00</p><p className="text-[7px] text-[#667085]">Northstar Studio · Stripe</p><div className="mt-2 h-px bg-[#eef0f3]"/><p className="mt-2 text-[7px] leading-[1.4] text-[#475467]">Amount differs from the original invoice. Attach the supporting note before approving.</p><div className="mt-2 flex h-6 items-center justify-center rounded-md bg-[#e8f5f0] text-[7px] font-semibold text-[#17805f]">View evidence</div></div>
              <div className="mt-2 rounded-xl border border-[#e3e7ec] bg-white p-2"><div className="flex items-center justify-between"><span className="text-[7px] font-semibold">Refund #2382</span><span className="text-[7px] font-semibold text-[#17805f]">Matched</span></div><p className="mt-1 text-[9px] font-medium">$89.00 <span className="text-[7px] font-normal text-[#667085]">· complete</span></p></div>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex h-[49px] items-center justify-around border-t border-[#e6e9ee] bg-white text-[6px] text-[#7d8794]"><span className="flex flex-col items-center gap-0.5 text-[#19856a]"><span className="text-[12px]">⌂</span>Tasks</span><span className="flex flex-col items-center gap-0.5"><span className="text-[12px]">▤</span>Activity</span><span className="flex flex-col items-center gap-0.5"><span className="text-[12px]">◉</span>Team</span><span className="flex flex-col items-center gap-0.5"><span className="text-[12px]">⚙</span>Settings</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** WhatsApp for Mac in dark mode, with its navigation rail, chat list and thread. */
function WhatsAppMock() {
  return (
    <div data-dh="whatsapp-app" className="dh-whatsapp-app flex h-[390px] overflow-hidden bg-[#111b21] text-[#e9edef]">
      <nav aria-label="WhatsApp navigation" className="flex w-[42px] shrink-0 flex-col items-center gap-4 border-r border-white/[.04] bg-[#202c33] py-3 text-[#aebac1]">
        <span className="flex size-7 items-center justify-center rounded-full bg-[#2a3942] text-[#e9edef]"><MessageCircle className="size-4" /></span>
        <span className="text-[#00a884]"><CircleDashed className="size-[17px]" /></span>
        <Users className="size-[17px]" />
        <Phone className="size-[17px]" />
        <ImageIcon className="size-[17px]" />
        <Settings className="mt-auto size-[17px]" />
        <span className="size-5 rounded-full bg-gradient-to-br from-[#8c7561] to-[#465c64]" />
      </nav>
      <aside className="w-[184px] shrink-0 border-r border-white/[.05] bg-[#111b21] text-[8px]">
        <div className="flex h-11 items-center justify-between px-3"><span className="text-[11px] font-semibold">Chats</span><span className="text-[13px] text-[#aebac1]">✎　⋯</span></div>
        <div className="mx-2 mb-2 flex h-7 items-center gap-2 rounded-md bg-[#202c33] px-2 text-[#8696a0]"><Search className="size-3" /><span>Search or start a new chat</span></div>
        <div className="mx-1 flex h-[52px] items-center gap-2 rounded-md bg-[#202c33] px-2"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#608b75] text-[8px] font-semibold text-white">TT</span><div className="min-w-0 flex-1"><div className="flex justify-between"><span className="font-semibold">Trooper team</span><span className="text-[7px] text-[#00a884]">10:18</span></div><p className="mt-1 truncate text-[#aebac1]">You: Q3 checks are done…</p></div></div>
        <div className="flex h-[52px] items-center gap-2 px-2"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#506d8a] text-[8px] font-semibold">FO</span><div className="min-w-0 flex-1 border-b border-white/[.06] pb-2"><div className="flex justify-between"><span className="font-medium">Finance ops</span><span className="text-[7px] text-[#8696a0]">10:16</span></div><p className="mt-1 truncate text-[#aebac1]">Aria: two exceptions need sign-off</p></div></div>
        <div className="flex h-[52px] items-center gap-2 px-2"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#9a7152] text-[8px] font-semibold">JR</span><div className="min-w-0 flex-1 border-b border-white/[.06] pb-2"><div className="flex justify-between"><span className="font-medium">Jordan</span><span className="text-[7px] text-[#8696a0]">9:52</span></div><p className="mt-1 truncate text-[#aebac1]">The ledger notes look good.</p></div></div>
        <div className="flex h-[52px] items-center gap-2 px-2"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#9a6473] text-[8px] font-semibold">AR</span><div className="min-w-0 flex-1 border-b border-white/[.06] pb-2"><div className="flex justify-between"><span className="font-medium">Aria · Growth</span><span className="text-[7px] text-[#8696a0]">9:41</span></div><p className="mt-1 truncate text-[#aebac1]">Thanks, I’ll add the receipts.</p></div></div>
        <div className="px-3 pt-3 text-[7px] font-semibold uppercase tracking-[.08em] text-[#8696a0]">Archived　⌄</div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col bg-[#0b141a]">
        <div className="flex h-11 items-center gap-2 border-b border-white/[.06] bg-[#202c33] px-3"><span className="flex size-7 items-center justify-center rounded-full bg-[#608b75] text-[8px] font-semibold text-white">TT</span><div><p className="text-[9px] font-semibold">Trooper team</p><p className="text-[7px] text-[#aebac1]">Jordan, Aria, you</p></div><div className="ml-auto flex items-center gap-3 text-[#aebac1]"><Search className="size-3.5" /><Video className="size-3.5" /><Phone className="size-3.5" /><MoreHorizontal className="size-4" /></div></div>
        <div className="relative flex min-h-0 flex-1 flex-col gap-2 overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(29,48,56,.45),transparent_42%),#0b141a] px-3 py-2.5 text-[8px]">
          <div className="mx-auto rounded-md bg-[#182229] px-2.5 py-1 text-[7px] text-[#aebac1]">TODAY</div>
          <div className="w-fit max-w-[86%] rounded-lg rounded-tl-sm bg-[#202c33] px-2.5 py-2 text-[#e9edef] shadow-sm"><span className="mb-1 block text-[7px] font-semibold text-[#53bdeb]">Jordan</span>Can we close the Q3 refunds today?<span className="ml-2 text-[6px] text-[#8696a0]">10:14</span></div>
          <div className="w-fit max-w-[88%] rounded-lg rounded-tl-sm bg-[#202c33] px-2.5 py-2 text-[#e9edef]"><span className="mb-1 block text-[7px] font-semibold text-[#f0b56d]">Aria</span>Two exceptions need a sign-off. I attached the invoice notes.<span className="ml-2 text-[6px] text-[#8696a0]">10:16</span></div>
          <div data-dh="whatsapp-sent" className="dh-off ml-auto w-fit max-w-[88%] rounded-lg rounded-tr-sm bg-[#005c4b] px-2.5 py-2 text-[#e9edef]">Q3 checks are done. I added both exceptions and the ledger notes for review.<span className="ml-2 whitespace-nowrap text-[6px] text-[#a5cfc4]">10:18　✓✓</span></div>
          <div className="mt-auto flex h-9 items-center gap-2 rounded-lg bg-[#202c33] px-2"><Plus className="size-3.5 shrink-0 text-[#aebac1]" /><button type="button" className="flex size-5 items-center justify-center text-[#aebac1]"><Paperclip className="size-3" /></button><div data-dh="whatsapp-composer" className="flex min-w-0 flex-1 items-center"><span data-dh="whatsapp-message" className="dh-type dh-t-idle truncate text-[8px] text-[#d1d7da]" style={{ '--dh-w': '82ch' } as React.CSSProperties}>Q3 checks are done. I added both exceptions and the ledger notes for review.</span></div><Smile className="size-3.5 shrink-0 text-[#aebac1]" /><Mic className="size-3.5 shrink-0 text-[#aebac1]" /><button type="button" data-dh="whatsapp-send" onClick={(event) => event.currentTarget.closest('[data-dh="whatsapp-app"]')?.querySelector('[data-dh="whatsapp-sent"]')?.classList.remove('dh-off')} aria-label="Send message" className="flex size-6 items-center justify-center rounded-full bg-[#00a884] text-white"><Send className="size-3" /></button></div>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact macOS Finder — sidebar + icon grid. Opens over deploy — zsh so Jordan
 * can check folders/files, then the terminal comes back.
 */
function FinderMock() {
  const side = [
    { label: 'Recents', active: false },
    { label: 'Applications', active: false },
    { label: 'Downloads', active: false },
    { label: 'Desktop', active: false },
    { label: 'Documents', active: false },
    { label: 'iCloud Drive', active: true },
  ] as const;

  const items: {
    id: string;
    name: string;
    kind: 'folder' | 'img' | 'pdf';
    selected?: boolean;
  }[] = [
    { id: 'finder-item-desktop', name: 'Desktop', kind: 'folder' },
    { id: 'finder-item-docs', name: 'Documents', kind: 'folder' },
    { id: 'finder-item-receipts', name: 'Receipts', kind: 'folder' },
    { id: 'finder-item-pdf', name: 'Q3-audit.pdf', kind: 'pdf', selected: true },
    { id: 'finder-item-photo', name: 'persian.jpg', kind: 'img' },
  ];

  return (
    <div className="flex h-[248px] select-none bg-[#ececec] text-[10px] text-neutral-700">
      <aside className="w-[108px] shrink-0 border-r border-black/[0.06] bg-[#e8e8e8]/px-1.5 py-2">
        <p className="px-1.5 pb-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-neutral-400">
          Favorites
        </p>
        <ul className="space-y-0.5">
          {side.map((row) => (
            <li
              key={row.label}
              className={[
                'truncate rounded-md px-1.5 py-1 font-medium',
                row.active ? 'bg-white text-neutral-900 shadow-sm ring-1 ring-black/[0.04]' : 'text-neutral-600',
              ].join(' ')}
            >
              {row.label}
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-[#f6f6f6]">
        <div className="flex items-center gap-2 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#f3f3f3] px-2.5 py-1.5">
          <span className="text-[11px] text-neutral-400">‹</span>
          <span className="text-[11px] text-neutral-300">›</span>
          <span className="ml-1 truncate text-[11px] font-semibold text-neutral-700">iCloud Drive</span>
          <span className="ml-auto rounded border border-black/10 bg-white px-1.5 py-0.5 text-[8px] font-semibold text-neutral-500">
            Icons
          </span>
        </div>

        <div className="grid grid-cols-3 gap-x-2 gap-y-3 overflow-hidden px-3 py-3">
          {items.map((item) => (
            <div
              key={item.id}
              data-dh={item.id}
              className={[
                'flex flex-col items-center rounded-lg px-1 py-1 text-center',
                item.selected ? 'bg-[#d6e4f5] ring-1 ring-[#7aa7d9]/40' : '',
              ].join(' ')}
            >
              {item.kind === 'folder' ? (
                <RemoteIcon
                  src="/images/desktop/folder.png"
                  size={40}
                  className="h-10 w-10 object-contain"
                  fallback={<FolderSvg className="h-9 w-[44px]" />}
                />
              ) : item.kind === 'img' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/demo-assets/content/persian.jpg"
                  alt=""
                  className="h-10 w-10 rounded-[5px] object-cover shadow-sm ring-1 ring-black/10"
                />
              ) : (
                <FileGlyph kind="pdf" className="h-10 w-8" />
              )}
              <span className="mt-1 w-full truncate text-[9px] font-medium leading-tight text-neutral-700">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Closed by default; choreography opens → reads → closes. */
function TransientWindow({
  x,
  y,
  w,
  dataId,
  title,
  dark,
  nativeChrome = false,
  zClass = 'z-[25]',
  children,
}: {
  x: number;
  y: number;
  w: number;
  dataId: string;
  title: string;
  dark?: boolean;
  nativeChrome?: boolean;
  zClass?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-dh={dataId}
      className={`dh-preview dh-preview-closed absolute ${zClass}`}
      style={{ left: x, top: y, width: w }}
    >
      <div
        className={`overflow-hidden rounded-[10px] shadow-[0_1px_0_rgba(255,255,255,0.75)_inset,0_12px_32px_-8px_rgba(26,26,26,0.28),0_32px_64px_-16px_rgba(26,26,26,0.2)] ring-1 ring-black/[0.1] ${
          dark ? 'bg-neutral-950' : 'bg-white'
        }`}
      >
        {nativeChrome ? children : <>
          <div
            className={`flex items-center gap-1.5 border-b px-3 py-2 ${
              dark ? 'border-white/10 bg-neutral-900' : 'border-black/[0.05] bg-gradient-to-b from-neutral-50 to-neutral-100/90'
            }`}
          >
            <button
              type="button"
              data-dh={`${dataId}-close`}
              aria-label={`Close ${title}`}
              onClick={(event) => {
                const windowElement = event.currentTarget.closest('.dh-preview');
                if (!windowElement) return;
                windowElement.classList.remove('dh-preview-open');
                windowElement.classList.add('dh-preview-closing');
                window.setTimeout(() => {
                  windowElement.classList.add('dh-preview-closed');
                  windowElement.classList.remove('dh-preview-closing');
                }, 320);
              }}
              className="size-2.5 rounded-full bg-[#ff5f57]"
            />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span
              className={`ml-2 truncate text-[11px] font-medium tracking-tight ${
                dark ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {title}
            </span>
          </div>
          {children}
        </>}
      </div>
    </div>
  );
}

function SpreadsheetMock() {
  const rows = [
    ['#2381', '$420.00', 'matched'],
    ['#2380', '$89.00', 'matched'],
    ['#2379', '$1,240.00', 'review'],
    ['#2378', '$56.00', 'matched'],
    ['#2377', '$312.50', 'matched'],
  ];
  return (
    <div className="p-3.5 text-[11px] leading-4 text-neutral-600">
      <div className="mb-2 flex items-center justify-between px-0.5">
        <span className="text-[12px] font-semibold text-neutral-800">Q3 refunds</span>
        <span className="rounded-full bg-trooper-50 px-2 py-0.5 text-[10px] font-semibold text-trooper-700">
          4 matched
        </span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-px overflow-hidden rounded-md bg-neutral-200/70 p-px">
        <div className="bg-neutral-50 px-2 py-1.5 text-[10px] font-semibold text-neutral-500">Refund</div>
        <div className="bg-neutral-50 px-2 py-1.5 text-[10px] font-semibold text-neutral-500">Amount</div>
        <div className="bg-neutral-50 px-2 py-1.5 text-[10px] font-semibold text-neutral-500">Status</div>
        {rows.map(([id, amt, st], i) => (
          <React.Fragment key={id}>
            <div className={`bg-white px-2 py-1.5 ${i === 2 ? 'dh-row' : ''}`}>{id}</div>
            <div className={`bg-white px-2 py-1.5 tabular-nums ${i === 2 ? 'dh-row' : ''}`}>{amt}</div>
            <div className={`bg-white px-2 py-1.5 ${i === 2 ? 'dh-row' : ''}`}>
              <span
                className={
                  st === 'review'
                    ? 'rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700'
                    : 'rounded bg-trooper-50 px-1.5 py-0.5 text-[10px] font-medium text-trooper-700'
                }
              >
                {st}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function PrReviewMock() {
  return (
    <div className="p-3.5 text-[11px] leading-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[12px] font-semibold text-neutral-800">
            fix: retry failed webhooks
          </p>
          <p className="mt-0.5 text-[10px] text-neutral-400">#482 · trooper-app · +18 −4</p>
        </div>
        <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
          review
        </span>
      </div>
      <div className="mt-2.5 overflow-hidden rounded-md bg-neutral-950 p-2.5 font-mono text-[10px] leading-[1.5] text-neutral-300">
        <p className="text-red-400">- retries = 0</p>
        <p className="text-emerald-400">+ retries = 3</p>
        <p className="text-emerald-400">+ backoff = exp(2)</p>
        <p className="text-neutral-500">  await flush(queue)</p>
      </div>
      <div className="mt-2.5 flex items-center gap-1.5">
        <span className="relative inline-flex size-2.5">
          <span className="absolute inset-0 rounded-full bg-amber-300" />
          <span data-dh="fx-check" className="dh-fx absolute inset-0 rounded-full bg-trooper-400" />
        </span>
        <span className="text-[11px] text-neutral-500">All checks passed</span>
        <span className="ml-auto rounded-md bg-trooper-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
          Approve
        </span>
      </div>
    </div>
  );
}

function TerminalMock() {
  return (
    <div className="bg-[#14170f] p-3.5 font-mono text-[11px] leading-5 text-neutral-300">
      <p>
        <span className="text-trooper-400">trooper@ship</span>
        <span className="text-neutral-500"> ~ %</span> trooper deploy --prod
      </p>
      <p
        data-dh="fx-t2"
        className="dh-type text-neutral-500"
        style={{ '--dh-w': '22ch' } as React.CSSProperties}
      >
        bundling 42 modules…
      </p>
      <p
        data-dh="fx-t3"
        className="dh-type text-trooper-400"
        style={{ '--dh-w': '22ch' } as React.CSSProperties}
      >
        ✓ live on prod — 12s
      </p>
    </div>
  );
}

/**
 * Agent CLI chat — Claude / Codex / Cursor / Grok each run a different session.
 * Choreography hooks (fx-claude-*) stay stable across brands.
 */
function CliTerminalMock({ cli }: { cli: CliId }) {
  const cfg = CLI_APPS[cli];
  const accent = cfg.accent;
  return (
    <div className="select-none bg-[#1a1a1a] font-mono text-[9px] leading-[1.45] text-[#eceae6]">
      <div className="mx-2 mt-2 px-1 py-2">
        <div className="flex items-start gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cfg.src}
            alt=""
            width={28}
            height={28}
            draggable={false}
            className="mt-0.5 size-7 shrink-0 rounded-[6px] object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-medium text-white/70">
              {cfg.version}
            </p>
            <p className="text-[10px] font-medium text-white">Welcome back Vaibhav!</p>
            <p className="mt-0.5 truncate text-[8px] text-white/45">{cfg.model}</p>
          </div>
        </div>
      </div>

      <div className="mt-2.5">
        <div className="bg-white/[0.07] px-3 py-1.5">
          <p className="text-[10px] text-white/90">
            <span className="text-white/50">&gt;</span> {cfg.prompt}
          </p>
        </div>

        <div
          data-dh="fx-claude-1"
          className="dh-fx space-y-1.5 px-3 py-2.5 text-[9px] leading-[1.5]"
        >
          <p className="text-white/85">On it — working through this now.</p>
          <p className="text-white/40">{cfg.toolLine}</p>
          <div className="pt-0.5 text-white/80">
            {cfg.checks.map((line) => (
              <p key={line}>
                <span style={{ color: accent }}>✓</span> {line}
              </p>
            ))}
          </div>
          <p className="pt-0.5 text-white/75">{cfg.followUp}</p>
          <p className="text-white/35">{cfg.done}</p>
        </div>
      </div>

      <div className="border-t border-white/10 px-3 pb-2 pt-2">
        <p className="flex items-center gap-1.5 text-[10px]">
          <span className="text-white/70">&gt;</span>
          <span
            data-dh="fx-claude-2"
            className="dh-type text-white/55"
            style={{ '--dh-w': `${Math.max(18, cfg.next.length)}ch` } as React.CSSProperties}
          >
            {cfg.next}
          </span>
          <span className="inline-block h-[11px] w-[7px] animate-pulse bg-white/90" aria-hidden />
        </p>
        <div className="mt-1.5 flex justify-between text-[8px] text-white/30">
          <span>? for shortcuts</span>
          <span>{cfg.label}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Agent cursors                                                       */
/* ------------------------------------------------------------------ */

/* Rainbow identity — one saturated colour each (Gumloop-style). UI chrome
 * elsewhere stays monochrome; these cursors are how agents read apart. */
const AGENTS = [
  {
    id: 'aria',
    name: 'Aria',
    role: 'Growth',
    handle: 'scout' as const,
    arrow: '#f0b45c',
    pillBg: '#fbf5ea',
    pillText: '#5a3a12',
    home: [140, 100] as const,
  },
  {
    id: 'jordan',
    name: 'Jordan',
    role: 'Chief of staff',
    handle: 'nova' as const,
    arrow: '#7ebef0',
    pillBg: '#eef6fc',
    pillText: '#1a3f5c',
    home: [1420, 120] as const,
  },
  {
    id: 'leo',
    name: 'Leo',
    role: 'Finance',
    handle: 'pip' as const,
    arrow: '#b49aef',
    pillBg: '#f5f1fc',
    pillText: '#3a2866',
    // Resting on Claude Code (bottom-left).
    home: [180, 420] as const,
  },
];

function XcodeDockIcon() {
  return (
    <svg viewBox="0 0 64 64" className="size-9" aria-hidden="true">
      <defs>
        <linearGradient id="xcode-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9bd6ff" />
          <stop offset="1" stopColor="#2679d8" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#xcode-bg)" />
      <path d="m15 43 22-22 5 5-22 22z" fill="#f7fbff" />
      <path d="m25 17 5-5 18 18-5 5z" fill="#fff" />
      <path d="m22 41 5-5 9 9-5 5z" fill="#dceeff" />
      <path d="m38 18 5-5 7 7-5 5z" fill="#dceeff" />
      <circle cx="46" cy="45" r="7" fill="#f5fbff" />
      <path d="m43 45 2 2 4-5" fill="none" stroke="#2679d8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Keep cursors on the stage when a target is dragged way off-canvas. */
function clampToStage(x: number, y: number): [number, number] {
  return [Math.max(-40, Math.min(STAGE_W - 20, x)), Math.max(-20, Math.min(STAGE_H - 20, y))];
}

/** Fit the authored stage inside the rail scene without stretching. */
function useRailStageScale(sceneRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const apply = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      const scale = Math.min(width / STAGE_W, height / STAGE_H, 1);
      el.style.setProperty('--dh-scale', String(scale));
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sceneRef]);
}

function AgentCursor({ agent }: { agent: (typeof AGENTS)[number] }) {
  const trooper = getTrooper(agent.handle);
  return (
    <div
      data-dh={`cursor-${agent.id}`}
      className="dh-cursor"
      style={{ transform: `translate(${agent.home[0]}px, ${agent.home[1]}px)` }}
    >
      <div className="flex items-start gap-1">
        {trooper ? (
          <span className="-mt-1 flex size-9 shrink-0 items-center justify-center overflow-visible rounded-xl bg-white/90 drop-shadow-[0_4px_10px_rgba(0,0,0,0.18)]">
            {/* Static SVG mark — hero already animates cursor travel. */}
            <TrooperAvatar trooper={trooper} size={28} />
          </span>
        ) : null}
        <div>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="drop-shadow-[0_2px_4px_rgba(26,26,26,0.18)]"
            aria-hidden
          >
            <path
              d="M4.2 3.4 Q4 2.6 4.8 2.9 L20.3 9.8 Q21.1 10.2 20.2 10.7 L13.6 12.6 L11.1 19 Q10.7 19.9 10.3 19.1 Z"
              fill={agent.arrow}
              stroke="#fff"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="mt-1 block w-max rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)]"
            style={{ backgroundColor: agent.pillBg, color: agent.pillText }}
          >
            {agent.name} · {agent.role}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The choreography engine                                             */
/* ------------------------------------------------------------------ */

type SceneMode = 'desktop' | 'browser';
type StepTarget = string | readonly [number, number];
type Step = {
  /** Element id (data-dh) or absolute stage point. */
  to: StepTarget;
  /** Offset from the target element's top-left corner, in stage px. */
  off?: readonly [number, number];
  /** Travel time in ms. */
  move: number;
  /** Pause on arrival in ms. */
  dwell?: number;
  /** data-dh id of a desktop file that rides under the cursor for this leg. */
  carry?: string;
  /** Effect fired on arrival. */
  fx?: string;
  /** Switch the agent CLI window to this brand on arrival (Leo clicks the dock). */
  cli?: CliId;
};

/** Authored left/top for each carryable desktop file (stage px). */
const CARRY_HOMES: Record<string, readonly [number, number]> = {
  // Keep the animated files in a tidy left gutter until they are filed.
  file: [292, 315],
  'file-junk': [378, 315],
};

/** Scripts resolve targets from live element positions every frame. */
const SCRIPTS: Record<string, Step[]> = {
  aria: [
    // Open cats-monet.md → read → close, file the refunds csv, then trash the scratch file.
    { to: 'file-brief', off: [24, 28], move: 1800, dwell: 350, fx: 'openBrief' },
    { to: 'win-preview', off: [130, 90], move: 1400, fx: 'readBrief', dwell: 2400 },
    { to: 'win-preview', off: [28, 14], move: 700, fx: 'closeBrief', dwell: 450 },
    { to: 'file', off: [24, 28], move: 1800, dwell: 400 },
    { to: 'folder-inv', off: [24, 28], move: 2200, carry: 'file', fx: 'drop', dwell: 700 },
    { to: 'file-junk', off: [24, 28], move: 1600, dwell: 400 },
    { to: 'trash', off: [18, 18], move: 2400, carry: 'file-junk', fx: 'trash', dwell: 800 },
    { to: 'win-sheet', off: [120, 100], move: 2000, fx: 'flash', dwell: 600 },
  ],
  jordan: [
    // Open App.tsx → skim → close, then Finder over deploy, check a file, close, ship.
    { to: 'file-app', off: [24, 28], move: 1800, dwell: 350, fx: 'openCode' },
    { to: 'win-code', off: [120, 80], move: 1400, fx: 'readCode', dwell: 2200 },
    { to: 'win-code', off: [28, 14], move: 700, fx: 'closeCode', dwell: 450 },
    { to: 'dock-finder', off: [18, 18], move: 1600, dwell: 400, fx: 'openFinder' },
    { to: 'finder-item-receipts', off: [28, 36], move: 1400, dwell: 500 },
    { to: 'finder-item-pdf', off: [28, 36], move: 1200, dwell: 380, fx: 'openFinderFile' },
    { to: 'win-finder-preview', off: [120, 90], move: 1300, fx: 'readFinderFile', dwell: 2200 },
    { to: 'win-finder-preview', off: [28, 14], move: 700, fx: 'closeFinderFile', dwell: 400 },
    { to: 'win-finder', off: [20, 12], move: 800, fx: 'closeFinder', dwell: 500 },
    { to: 'win-pr', off: [140, 100], move: 2000, fx: 'approve', dwell: 700 },
    { to: 'win-term', off: [120, 60], move: 2200, fx: 'deploy', dwell: 1000 },
    { to: 'folder-shots', off: [24, 28], move: 2000, dwell: 1400 },
  ],
  leo: [
    // Cycle CLIs via the dock — click icon, then work in the shifted window.
    { to: 'dock-claude', off: [18, 18], move: 1600, dwell: 380, cli: 'claude' },
    { to: 'win-claude', off: [130, 78], move: 1900, fx: 'claude', dwell: 1500 },
    { to: 'dock-codex', off: [18, 18], move: 1500, dwell: 360, cli: 'codex' },
    { to: 'win-claude', off: [150, 64], move: 1800, fx: 'claude', dwell: 1600 },
    { to: 'win-sheet', off: [100, 160], move: 2200, dwell: 1100 },
    { to: 'dock-cursor', off: [18, 18], move: 1500, dwell: 360, cli: 'cursor' },
    { to: 'win-claude', off: [110, 88], move: 1800, fx: 'claude', dwell: 1600 },
    { to: 'dock-grok', off: [18, 18], move: 1500, dwell: 360, cli: 'grok' },
    { to: 'win-claude', off: [142, 56], move: 1800, fx: 'claude', dwell: 1700 },
  ],
};

/**
 * Runs the three cursors with requestAnimationFrame instead of CSS keyframes.
 *
 * The crucial difference from a keyframed timeline: a target's position is
 * resolved from its element's **live** bounding rect on every frame, so when
 * the visitor drags a window or a folder somewhere else, the agents follow it
 * there — mid-flight, even. Fixed keyframes kept clicking where the window
 * used to be.
 *
 * The engine also owns the in-window effects (row flash, check flip, terminal
 * typing, chat bubble) by toggling classes, so an effect can only ever fire
 * when its agent has actually arrived. Base styles are the completed state:
 * with the engine off (reduced motion, no JS) everything is simply visible.
 */
function useAgentChoreography(
  stageRef: React.RefObject<HTMLDivElement | null>,
  onSwitchCli: (id: CliId) => void,
  finderOpenRef: React.MutableRefObject<(() => void) | null>,
  appOpenRef: React.MutableRefObject<((id: string) => void) | null>,
  mode: SceneMode,
) {
  const switchCliRef = useRef(onSwitchCli);
  switchCliRef.current = onSwitchCli;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const q = (id: string) => stage.querySelector<HTMLElement>(`[data-dh="${id}"]`);
    const fileEl = q('file');
    const junkEl = q('file-junk');

    const moveCarried = (carryId: string | undefined, x: number, y: number) => {
      if (!carryId) return;
      const el = q(carryId);
      const home = CARRY_HOMES[carryId];
      if (!el || !home || el.classList.contains('dh-hide')) return;
      el.style.transform = `translate(${x - 30 - home[0]}px, ${y - 28 - home[1]}px)`;
    };

    const swallowFile = (el: HTMLElement | null) => {
      if (!el) return;
      el.classList.add('dh-hide');
      later(() => {
        el.style.transform = '';
        later(() => el.classList.remove('dh-hide'), 900);
      }, 500);
    };

    const timeouts = new Set<number>();
    const later = (fn: () => void, ms: number) => {
      const t = window.setTimeout(() => {
        timeouts.delete(t);
        fn();
      }, ms);
      timeouts.add(t);
    };

    // The story starts with these not yet done; the engine reveals them.
    const check = q('fx-check');
    const t2 = q('fx-t2');
    const t3 = q('fx-t3');
    const preview = q('win-preview');
    const codeWin = q('win-code');
    const finderWin = q('win-finder');
    const finderPreview = q('win-finder-preview');
    const chromeWin = q('win-chrome');
    const xcodeWin = q('win-xcode');
    const whatsappWin = q('win-whatsapp');
    const simulatorWin = q('win-simulator');
    const readbar = q('fx-readbar');
    const readbarCode = q('fx-readbar-code');
    const readbarFinder = q('fx-readbar-finder');
    const chromeApp = q('chrome-app');
    const chromeQuery = q('chrome-google-query');
    const chromeLocation = q('chrome-location');
    const chromeFinding = q('chrome-finding');
    const xcodeCode = q('xcode-code');
    const xcodeBuild = q('xcode-build');
    const xcodeStatus = q('xcode-status');
    const whatsappMessage = q('whatsapp-message');
    const whatsappSent = q('whatsapp-sent');
    check?.classList.add('dh-off');
    // CLI reply nodes remount when Leo switches brands — always re-query.
    const hideCliFx = () => {
      q('fx-claude-1')?.classList.add('dh-off');
      const c2 = q('fx-claude-2');
      c2?.classList.remove('dh-typing');
      c2?.classList.add('dh-t-idle');
    };
    hideCliFx();
    t2?.classList.add('dh-t-idle');
    t3?.classList.add('dh-t-idle');
    preview?.classList.add('dh-preview-closed');
    codeWin?.classList.add('dh-preview-closed');
    finderWin?.classList.add('dh-preview-closed');
    finderPreview?.classList.add('dh-preview-closed');
    chromeWin?.classList.add('dh-preview-closed');
    xcodeWin?.classList.add('dh-preview-closed');
    whatsappWin?.classList.add('dh-preview-closed');
    simulatorWin?.classList.add('dh-preview-closed');
    chromeFinding?.classList.add('dh-off');
    xcodeBuild?.classList.add('dh-off');
    whatsappSent?.classList.add('dh-off');
    chromeApp?.classList.remove('dh-chrome-results-visible', 'dh-chrome-page-open');
    if (xcodeStatus) xcodeStatus.textContent = 'Ready to build';
    if (chromeLocation) chromeLocation.textContent = 'google.com/search?q=Q3+refund+approval+policy';

    const typeLine = (el: HTMLElement | null) => {
      if (!el) return;
      const length = el.textContent?.length ?? 22;
      el.style.setProperty('--dh-w', `${length}ch`);
      el.style.setProperty('--dh-steps', String(length));
      el.classList.remove('dh-typing', 'dh-t-idle');
      void el.offsetWidth;
      el.classList.add('dh-typing');
    };

    const bounceIcon = (id: string) => {
      const el = q(id);
      if (!el) return;
      el.classList.remove('dh-bounce');
      void el.offsetWidth;
      el.classList.add('dh-bounce');
    };

    const switchCli = (id: CliId) => {
      switchCliRef.current(id);
      bounceIcon(`dock-${id}`);
      // Wait for React to remount the CLI body, then reset FX to “not yet done”.
      later(hideCliFx, 40);
    };

    const posOf = (t: StepTarget, off: readonly [number, number] = [0, 0]): [number, number] => {
      if (Array.isArray(t)) return clampToStage(t[0] + off[0], t[1] + off[1]);
      const el = q(t as string);
      const sr = stage.getBoundingClientRect();
      const s = sr.width / STAGE_W;
      if (!el || s <= 0) return clampToStage(STAGE_W / 2 + off[0], 360 + off[1]);
      // Hidden / dimmed targets still have a layout box — use it so agents
      // keep aiming at where the user left the window.
      const r = el.getBoundingClientRect();
      return clampToStage((r.left - sr.left) / s + off[0], (r.top - sr.top) / s + off[1]);
    };

    const placePreviewAt = (win: HTMLElement | null, targetId: string) => {
      if (!win) return;
      const [x, y] = posOf(targetId, [0, 0]);
      win.style.left = `${x}px`;
      win.style.top = `${y}px`;
    };

    const openPreview = (win: HTMLElement | null, bar: HTMLElement | null) => {
      if (!win) return;
      win.classList.remove('dh-preview-closed', 'dh-preview-closing');
      void win.offsetWidth;
      win.classList.add('dh-preview-open');
      bar?.classList.remove('dh-reading');
    };

    const readPreview = (bar: HTMLElement | null) => {
      if (!bar) return;
      bar.classList.remove('dh-reading');
      void bar.offsetWidth;
      bar.classList.add('dh-reading');
    };

    const closePreview = (win: HTMLElement | null, bar: HTMLElement | null) => {
      if (!win) return;
      win.classList.remove('dh-preview-open');
      win.classList.add('dh-preview-closing');
      bar?.classList.remove('dh-reading');
      later(() => {
        win.classList.add('dh-preview-closed');
        win.classList.remove('dh-preview-closing');
      }, 320);
    };

    const clickTarget = (id: string) => {
      const el = q(id);
      if (!el) return;
      el.classList.remove('dh-clicked');
      void el.offsetWidth;
      el.classList.add('dh-clicked');
      later(() => el.classList.remove('dh-clicked'), 700);
    };

    const typeReset = (el: HTMLElement | null) => {
      if (!el) return;
      el.classList.remove('dh-typing');
      el.classList.add('dh-t-idle');
    };

    const openApp = (win: HTMLElement | null, id: string) => {
      clickTarget(id);
      if (!win) return;
      win.classList.remove('dh-preview-closed', 'dh-preview-closing');
      void win.offsetWidth;
      win.classList.add('dh-preview-open');
    };

    const closeApp = (win: HTMLElement | null, id: string) => {
      clickTarget(id);
      if (!win) return;
      win.classList.remove('dh-preview-open');
      win.classList.add('dh-preview-closing');
      later(() => {
        win.classList.add('dh-preview-closed');
        win.classList.remove('dh-preview-closing');
      }, 320);
    };

    const FX: Record<string, () => void> = {
      drop: () => {
        bounceIcon('folder-inv-icon');
        swallowFile(fileEl);
      },
      trash: () => {
        bounceIcon('trash');
        swallowFile(junkEl);
      },
      flash: () => {
        const rows = stage.querySelectorAll('.dh-row');
        rows.forEach((el) => el.classList.add('dh-hl'));
        later(() => rows.forEach((el) => el.classList.remove('dh-hl')), 1700);
      },
      approve: () => {
        check?.classList.remove('dh-off');
        later(() => check?.classList.add('dh-off'), 9000);
      },
      deploy: () => {
        typeLine(t2);
        later(() => typeLine(t3), 1100);
      },
      claude: () => {
        // Re-query — nodes remount whenever the active CLI changes.
        q('fx-claude-1')?.classList.add('dh-off');
        const c2 = q('fx-claude-2');
        c2?.classList.remove('dh-typing');
        c2?.classList.add('dh-t-idle');
        later(() => {
          q('fx-claude-1')?.classList.remove('dh-off');
          later(() => typeLine(q('fx-claude-2')), 600);
        }, 120);
      },
      openBrief: () => {
        bounceIcon('file-brief');
        later(() => {
          // Open on the sheet's *live* spot (follows a user drag).
          placePreviewAt(preview, 'win-sheet');
          q('win-sheet')?.classList.add('dh-win-dim');
          openPreview(preview, readbar);
        }, 180);
      },
      readBrief: () => readPreview(readbar),
      closeBrief: () => {
        closePreview(preview, readbar);
        later(() => q('win-sheet')?.classList.remove('dh-win-dim'), 280);
      },
      openCode: () => {
        bounceIcon('file-app');
        later(() => {
          placePreviewAt(codeWin, 'win-pr');
          q('win-pr')?.classList.add('dh-win-dim');
          openPreview(codeWin, readbarCode);
        }, 180);
      },
      readCode: () => readPreview(readbarCode),
      closeCode: () => {
        closePreview(codeWin, readbarCode);
        later(() => q('win-pr')?.classList.remove('dh-win-dim'), 280);
      },
      openFinder: () => {
        bounceIcon('dock-finder');
        later(() => {
          // Cover deploy — zsh, but pull inward so Finder isn’t jammed in the corner.
          placePreviewAt(finderWin, 'win-term');
          if (finderWin) {
            const left = parseFloat(finderWin.style.left || '0');
            const top = parseFloat(finderWin.style.top || '0');
            finderWin.style.left = `${Math.max(980, left - 160)}px`;
            finderWin.style.top = `${Math.max(300, top - 55)}px`;
          }
          q('win-term')?.classList.add('dh-win-dim');
          openPreview(finderWin, null);
        }, 180);
      },
      openFinderFile: () => {
        bounceIcon('finder-item-pdf');
        later(() => {
          placePreviewAt(finderPreview, 'win-finder');
          if (finderPreview) {
            const left = parseFloat(finderPreview.style.left || '0');
            const top = parseFloat(finderPreview.style.top || '0');
            // Quick Look floats over the Finder content area, not the outer edge.
            finderPreview.style.left = `${left + 128}px`;
            finderPreview.style.top = `${top + 48}px`;
          }
          openPreview(finderPreview, readbarFinder);
        }, 180);
      },
      readFinderFile: () => readPreview(readbarFinder),
      closeFinderFile: () => {
        closePreview(finderPreview, readbarFinder);
      },
      closeFinder: () => {
        closePreview(finderWin, null);
        later(() => q('win-term')?.classList.remove('dh-win-dim'), 280);
      },
      openChrome: () => openApp(chromeWin, 'dock-chrome'),
      focusChromeSearch: () => clickTarget('chrome-google-field'),
      typeChrome: () => {
        clickTarget('chrome-google-field');
        typeLine(chromeQuery);
      },
      submitChromeSearch: () => {
        clickTarget('chrome-search-submit');
        chromeApp?.classList.add('dh-chrome-results-visible');
        if (chromeLocation) chromeLocation.textContent = 'google.com/search?q=Q3+refund+approval+policy';
      },
      openChromeResult: () => {
        clickTarget('chrome-result');
        chromeApp?.classList.add('dh-chrome-page-open');
        if (chromeLocation) chromeLocation.textContent = 'finance.trooper.so/playbooks/refunds';
      },
      readChromePolicy: () => {
        chromeFinding?.classList.remove('dh-off');
        later(() => chromeFinding?.classList.add('dh-off'), 10000);
      },
      closeChrome: () => closeApp(chromeWin, 'win-chrome-close'),
      openXcode: () => openApp(xcodeWin, 'dock-xcode'),
      typeXcode: () => {
        clickTarget('xcode-code');
        typeLine(xcodeCode);
      },
      buildXcode: () => {
        clickTarget('xcode-run');
        if (xcodeStatus) xcodeStatus.textContent = 'Building RefundsApp…';
        later(() => {
          if (xcodeStatus) xcodeStatus.textContent = 'Build Succeeded';
          xcodeBuild?.classList.remove('dh-off');
        }, 1100);
      },
      openSimulator: () => openApp(simulatorWin, 'win-simulator'),
      focusSimulator: () => clickTarget('simulator-app-screen'),
      closeSimulator: () => closeApp(simulatorWin, 'win-simulator-close'),
      closeXcode: () => closeApp(xcodeWin, 'win-xcode-close'),
      openWhatsApp: () => openApp(whatsappWin, 'dock-whatsapp'),
      typeWhatsApp: () => {
        clickTarget('whatsapp-composer');
        typeLine(whatsappMessage);
      },
      sendWhatsApp: () => {
        clickTarget('whatsapp-send');
        whatsappSent?.classList.remove('dh-off');
      },
      closeWhatsApp: () => closeApp(whatsappWin, 'win-whatsapp-close'),
    };

    // Dock Finder click uses the same open path as Jordan’s choreography.
    finderOpenRef.current = () => FX.openFinder();
    appOpenRef.current = (id) => {
      const openById: Record<string, string> = { chrome: 'openChrome', xcode: 'openXcode', whatsapp: 'openWhatsApp' };
      const effect = openById[id];
      if (effect) FX[effect]?.();
    };
    const clearFinderApi = () => {
      finderOpenRef.current = null;
      appOpenRef.current = null;
    };

    const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

    type CursorState = {
      el: HTMLElement | null;
      steps: Step[];
      i: number;
      phase: 'move' | 'dwell';
      t0: number;
      from: [number, number];
    };
    const chromeSteps: Step[] = [
      { to: 'dock-chrome', off: [18, 18], move: 1650, dwell: 420, fx: 'openChrome' },
      { to: 'chrome-google-field', off: [180, 18], move: 1500, dwell: 260, fx: 'focusChromeSearch' },
      { to: 'chrome-google-query', off: [190, 7], move: 900, dwell: 1550, fx: 'typeChrome' },
      { to: 'chrome-search-submit', off: [12, 10], move: 800, dwell: 520, fx: 'submitChromeSearch' },
      { to: 'chrome-result', off: [190, 56], move: 1200, dwell: 2450, fx: 'openChromeResult' },
      { to: 'chrome-finding', off: [240, 12], move: 1150, dwell: 9000, fx: 'readChromePolicy' },
      { to: 'win-chrome-close', off: [8, 6], move: 780, dwell: 380, fx: 'closeChrome' },
    ];
    const xcodeSteps: Step[] = [
      { to: 'dock-xcode', off: [18, 18], move: 1650, dwell: 420, fx: 'openXcode' },
      { to: 'xcode-code', off: [210, 8], move: 1300, dwell: 1750, fx: 'typeXcode' },
      { to: 'xcode-run', off: [22, 10], move: 850, dwell: 1600, fx: 'buildXcode' },
      { to: 'simulator-app-screen', off: [102, 180], move: 950, dwell: 850, fx: 'openSimulator' },
      { to: 'simulator-app-screen', off: [156, 300], move: 800, dwell: 7200, fx: 'focusSimulator' },
      { to: 'win-simulator-close', off: [8, 6], move: 780, dwell: 320, fx: 'closeSimulator' },
      { to: 'win-xcode-close', off: [8, 6], move: 850, dwell: 380, fx: 'closeXcode' },
    ];
    const whatsappSteps: Step[] = [
      { to: 'dock-whatsapp', off: [18, 18], move: 1750, dwell: 420, fx: 'openWhatsApp' },
      { to: 'whatsapp-composer', off: [175, 15], move: 1400, dwell: 1750, fx: 'typeWhatsApp' },
      { to: 'whatsapp-send', off: [15, 14], move: 850, dwell: 7200, fx: 'sendWhatsApp' },
      { to: 'win-whatsapp-close', off: [8, 6], move: 850, dwell: 380, fx: 'closeWhatsApp' },
    ];
    const modeScripts: Record<string, Step[]> = {
      aria: [...(mode === 'browser' ? chromeSteps : xcodeSteps), ...SCRIPTS.aria],
      leo: [...(mode === 'desktop' ? whatsappSteps : []), ...SCRIPTS.leo],
    };
    const cursors: CursorState[] = AGENTS.map((a, k) => ({
      el: q(`cursor-${a.id}`),
      steps: modeScripts[a.id] ?? SCRIPTS[a.id],
      i: 0,
      phase: 'move',
      // Staggered starts so the three agents never move in lockstep.
      t0: performance.now() + k * 500 + (mode === 'desktop' && a.id === 'leo' ? 5000 : 0),
      from: [a.home[0], a.home[1]],
    }));

    let raf = 0;
    const frame = (now: number) => {
      for (const c of cursors) {
        if (!c.el) continue;
        const st = c.steps[c.i];
        // Live target every frame — if the visitor dragged the window/file,
        // the cursor retargets mid-flight and mid-dwell.
        const tp = posOf(st.to, st.off);
        if (c.phase === 'move') {
          const p = Math.min(1, Math.max(0, (now - c.t0) / st.move));
          const e = ease(p);
          const x = c.from[0] + (tp[0] - c.from[0]) * e;
          const y = c.from[1] + (tp[1] - c.from[1]) * e;
          c.el.style.transform = `translate(${x}px, ${y}px)`;
          moveCarried(st.carry, x, y);
          if (p >= 1) {
            c.from = tp;
            c.phase = 'dwell';
            c.t0 = now;
            if (st.cli) switchCli(st.cli);
            if (st.fx) FX[st.fx]?.();
          }
        } else {
          c.from = tp;
          c.el.style.transform = `translate(${tp[0]}px, ${tp[1]}px)`;
          moveCarried(st.carry, tp[0], tp[1]);
          if (now - c.t0 >= (st.dwell ?? 300)) {
            c.i = (c.i + 1) % c.steps.length;
            c.phase = 'move';
            c.t0 = now;
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };

    // Pause the whole choreography while the hero is off screen.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!raf) {
          const now = performance.now();
          cursors.forEach((c) => {
            c.t0 = now;
          });
          raf = requestAnimationFrame(frame);
        }
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(stage);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      timeouts.forEach((t) => window.clearTimeout(t));
      clearFinderApi();
      // Leave the page in the completed, everything-visible state.
      check?.classList.remove('dh-off');
      q('fx-claude-1')?.classList.remove('dh-off');
      q('fx-claude-2')?.classList.remove('dh-t-idle', 'dh-typing');
      t2?.classList.remove('dh-t-idle', 'dh-typing');
      t3?.classList.remove('dh-t-idle', 'dh-typing');
      preview?.classList.add('dh-preview-closed');
      preview?.classList.remove('dh-preview-open', 'dh-preview-closing');
      codeWin?.classList.add('dh-preview-closed');
      codeWin?.classList.remove('dh-preview-open', 'dh-preview-closing');
      finderWin?.classList.add('dh-preview-closed');
      finderWin?.classList.remove('dh-preview-open', 'dh-preview-closing');
      finderPreview?.classList.add('dh-preview-closed');
      finderPreview?.classList.remove('dh-preview-open', 'dh-preview-closing');
      chromeWin?.classList.add('dh-preview-closed');
      chromeWin?.classList.remove('dh-preview-open', 'dh-preview-closing');
      xcodeWin?.classList.add('dh-preview-closed');
      xcodeWin?.classList.remove('dh-preview-open', 'dh-preview-closing');
      whatsappWin?.classList.add('dh-preview-closed');
      whatsappWin?.classList.remove('dh-preview-open', 'dh-preview-closing');
      simulatorWin?.classList.add('dh-preview-closed');
      simulatorWin?.classList.remove('dh-preview-open', 'dh-preview-closing');
      readbar?.classList.remove('dh-reading');
      readbarCode?.classList.remove('dh-reading');
      readbarFinder?.classList.remove('dh-reading');
      q('win-sheet')?.classList.remove('dh-win-dim');
      q('win-pr')?.classList.remove('dh-win-dim');
      q('win-term')?.classList.remove('dh-win-dim');
      if (fileEl) {
        fileEl.style.transform = '';
        fileEl.classList.remove('dh-hide');
      }
      if (junkEl) {
        junkEl.style.transform = '';
        junkEl.classList.remove('dh-hide');
      }
      typeReset(chromeQuery);
      typeReset(xcodeCode);
      typeReset(whatsappMessage);
      if (chromeLocation) chromeLocation.textContent = 'google.com/search?q=Q3+refund+approval+policy';
      chromeApp?.classList.remove('dh-chrome-results-visible', 'dh-chrome-page-open');
    };
  }, [stageRef, finderOpenRef, appOpenRef, mode]);
}

/* ------------------------------------------------------------------ */
/* The hero                                                            */
/* ------------------------------------------------------------------ */

/**
 * The hero is a desktop.
 *
 * The claim of the product is “AI employees doing real multi-window work on a
 * real computer”, so the scene shows a desktop where agents open real app
 * windows, type, search, build and message. Every window, folder and sticker can be picked
 * up and dragged — and because the choreography resolves targets from live
 * element positions, the agents follow wherever you put things.
 *
 * Below the scene, the real product demo band (as before this hero existed).
 *
 * Engineering notes:
 * - The scene lives on a fixed STAGE_W × STAGE_H stage, scaled to fit the laptop
 *   display and centred so the dock sits on the desktop floor.
 * - Cursors run on a rAF engine (see useAgentChoreography); in-window effects
 *   are class toggles whose base styles are the completed state, so with the
 *   engine off (reduced motion, no JS) nothing is hidden.
 * - The animated desktop stays decorative to assistive technology; its original
 *   drag, dock, and window choreography are kept intact.
 */
export default function EmbeddedDesktopHeroScene({ mode = 'desktop' }: { mode?: SceneMode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const finderOpenRef = useRef<(() => void) | null>(null);
  const appOpenRef = useRef<((id: string) => void) | null>(null);
  const [activeCli, setActiveCli] = useState<CliId>('claude');
  const cli = CLI_APPS[activeCli];
  useAgentChoreography(stageRef, setActiveCli, finderOpenRef, appOpenRef, mode);
  useRailStageScale(sceneRef);

  return (
    <div className="relative isolate aspect-[1.9/1] w-full overflow-hidden bg-[#f3f3f6] text-ink">
      <div className="dh-embedded-wallpaper pointer-events-none absolute inset-0" aria-hidden />

      {/* The original desktop stage, fitted to the laptop display without changing its animation. */}
      <div ref={sceneRef} className="pointer-events-none absolute inset-0 flex items-end justify-center" aria-hidden>
        <div
          ref={stageRef}
          className="dh-stage relative shrink-0"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: 'scale(var(--dh-scale, 0.75))',
            transformOrigin: 'bottom center',
          }}
        >
            {/*
              Clean four-corner grid. Icons sit in the side columns only —
              never on windows, never into the center copy band.
            */}
            <MacWindow
              x={24}
              y={48}
              w={248}
              dataId="win-sheet"
              title="refunds — Q3"
              caption="reconcile-refunds.numbers"
            >
              <SpreadsheetMock />
            </MacWindow>

            <MacWindow
              x={1345}
              y={48}
              w={240}
              dataId="win-pr"
              title="Pull request"
              caption="pr-482.diff"
            >
              <PrReviewMock />
            </MacWindow>

            <MacWindow
              x={1288}
              y={410}
              w={300}
              dataId="win-term"
              title="deploy — zsh"
              caption="trooper-cli"
            >
              <TerminalMock />
            </MacWindow>

            <MacWindow
              key={activeCli}
              x={cli.x}
              y={cli.y}
              w={cli.w}
              dataId="win-claude"
              title={cli.title}
              caption={cli.caption}
            >
              <div className="dh-cli-body max-h-[240px] overflow-hidden">
                <CliTerminalMock cli={activeCli} />
              </div>
            </MacWindow>

            {/*
              Side-column icons only — kept clear of every CLI resting box
              (CLIs sit ~x18–410, y398–670) and of the center copy band.
            */}
            <DesktopFile x={292} y={225} name="cats-monet.md" kind="doc" dataId="file-brief" />
            <FolderIcon x={430} y={680} name="invoices" dataId="folder-inv" />

            {/* Right icon column — left of right windows, clear gaps. */}
            <DesktopFile x={1500} y={300} name="App.tsx" kind="code" dataId="file-app" />
            <FolderIcon x={1410} y={680} name="screenshots" dataId="folder-shots" />

            {/* Preview readers — same corner as the window they replace. */}
            <TransientWindow x={24} y={48} w={248} dataId="win-preview" title="cats-monet.md">
              <PreviewDocMock />
            </TransientWindow>
            <TransientWindow x={1345} y={48} w={240} dataId="win-code" title="App.tsx" dark>
              <PreviewCodeMock />
            </TransientWindow>

            {/* Finder replaces deploy — zsh while open; Quick Look sits above it. */}
            <TransientWindow
              x={1250}
              y={330}
              w={350}
              dataId="win-finder"
              title="iCloud Drive"
              zClass="z-[26]"
            >
              <FinderMock />
            </TransientWindow>
            <TransientWindow
              x={1320}
              y={378}
              w={260}
              dataId="win-finder-preview"
              title="Q3-audit.pdf"
              zClass="z-[27]"
            >
              <PreviewFinderFileMock />
            </TransientWindow>

            {/* Real apps open from the dock; the browser tab keeps this same desktop. */}
            <TransientWindow x={280} y={36} w={1020} dataId="win-chrome" title="Google Chrome" nativeChrome zClass="z-[29]">
              <ChromeMock />
            </TransientWindow>
            <TransientWindow x={300} y={54} w={950} dataId="win-xcode" title="Xcode — RefundsApp" dark zClass="z-[28]">
              <XcodeMock />
            </TransientWindow>
            <TransientWindow x={700} y={280} w={620} dataId="win-whatsapp" title="WhatsApp" dark zClass="z-[30]">
              <WhatsAppMock />
            </TransientWindow>
            <TransientWindow x={1080} y={150} w={270} dataId="win-simulator" title="Simulator" zClass="z-[31]">
              <SimulatorMock />
            </TransientWindow>

            {/* Aria's files — refunds goes to invoices; scratch gets trashed. */}
            <div
              data-dh="file"
              className="dh-file w-[72px] text-center"
              style={{ left: CARRY_HOMES.file[0], top: CARRY_HOMES.file[1] }}
            >
              <FileGlyph kind="csv" className="mx-auto h-[52px] w-[44px] drop-shadow-sm" />
              <span className="dh-icon-label mt-1 block truncate text-[11px] font-medium leading-4">
                refunds-q3.csv
              </span>
            </div>
            <div
              data-dh="file-junk"
              className="dh-file w-[72px] text-center"
              style={{ left: CARRY_HOMES['file-junk'][0], top: CARRY_HOMES['file-junk'][1] }}
            >
              <FileGlyph kind="doc" className="mx-auto h-[52px] w-[44px] drop-shadow-sm" />
              <span className="dh-icon-label mt-1 block truncate text-[11px] font-medium leading-4">
                scratch.txt
              </span>
            </div>

            <MacDock
              activeCli={activeCli}
              onSelectCli={setActiveCli}
              onOpenFinder={() => finderOpenRef.current?.()}
              onOpenApp={(id) => appOpenRef.current?.(id)}
            />

            {AGENTS.map((agent) => (
              <AgentCursor key={agent.id} agent={agent} />
            ))}
        </div>
      </div>

    </div>
  );
}

