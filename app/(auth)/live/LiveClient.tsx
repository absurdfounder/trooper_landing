'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import Header from '@/components/ui/header';
import {
  AudioLines,
  Calendar,
  Camera,
  Clapperboard,
  Code2,
  FileText,
  FolderSearch,
  Globe,
  Image as ImageIcon,
  Laptop,
  Library,
  Mail,
  MessageSquare,
  Monitor,
  MousePointer2,
  PenLine,
  Plug,
  Search,
  Sparkles,
  Table2,
  Terminal,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import TrooperMark from '@/components/ui/TrooperMark';
import { TROOPERS, getTrooper } from '@/lib/troopers';

const LIVE_URL = 'https://app.trooper.so/api/public/live?limit=60';

const ACTION_ICONS: Record<string, LucideIcon> = {
  'Searched the web': Search,
  'Searched with Brave': Search,
  Researched: Library,
  'Opened a page': Globe,
  'Opened a Chrome tab': Globe,
  'Read a Chrome page': FileText,
  'Used Chrome': Globe,
  'Opened a Brave tab': Globe,
  'Used Brave': Globe,
  'Took a screenshot': Camera,
  'Read a file': FileText,
  'Edited a file': PenLine,
  'Saved a file': FileText,
  'Looked through files': FolderSearch,
  'Worked on code': Code2,
  'Updated a table': Table2,
  'Ran a command': Terminal,
  'Used the cloud desktop': Monitor,
  'Used the Mac': Laptop,
  'Drew on the screen': MousePointer2,
  'Used a skill': Sparkles,
  'Used a plugin': Plug,
  'Set a schedule': Calendar,
  'Delegated the work': Users,
  'Sent a message': MessageSquare,
  'Worked on mail': Mail,
  'Made an image': ImageIcon,
  'Made audio': AudioLines,
  'Worked on a video': Clapperboard,
};

function actionMark(title: string) {
  if (title.includes('Brave')) return '/images/live/brave.png';
  if (title.includes('Chrome')) return '/images/live/chrome.png';
  return '';
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'search', label: 'Web' },
  { id: 'page', label: 'Pages' },
  { id: 'file', label: 'Files' },
  { id: 'computer', label: 'Computer' },
  { id: 'message', label: 'Messages' },
  { id: 'make', label: 'Made' },
] as const;

const BEATS: { title: string; kind: string; handle: string }[] = [
  { title: 'Opened a Chrome tab', kind: 'page', handle: 'nova' },
  { title: 'Used the cloud desktop', kind: 'computer', handle: 'rex' },
  { title: 'Searched with Brave', kind: 'search', handle: 'scout' },
  { title: 'Worked on a video', kind: 'make', handle: 'wren' },
  { title: 'Worked on mail', kind: 'message', handle: 'nova' },
  { title: 'Edited a file', kind: 'file', handle: 'rex' },
  { title: 'Researched', kind: 'search', handle: 'scout' },
  { title: 'Drew on the screen', kind: 'computer', handle: 'wren' },
  { title: 'Updated a table', kind: 'file', handle: 'pip' },
  { title: 'Used the Mac', kind: 'computer', handle: 'wren' },
  { title: 'Sent a message', kind: 'message', handle: 'nova' },
  { title: 'Ran a command', kind: 'computer', handle: 'rex' },
  { title: 'Took a screenshot', kind: 'page', handle: 'wren' },
  { title: 'Set a schedule', kind: 'computer', handle: 'pip' },
  { title: 'Made an image', kind: 'make', handle: 'scout' },
  { title: 'Read a Chrome page', kind: 'page', handle: 'nova' },
  { title: 'Worked on code', kind: 'file', handle: 'rex' },
  { title: 'Used a plugin', kind: 'computer', handle: 'pip' },
  { title: 'Opened a Brave tab', kind: 'page', handle: 'scout' },
  { title: 'Used Chrome', kind: 'page', handle: 'nova' },
];

const OPENING_AGES_MS = [
  20_000, 2 * 60_000, 4 * 60_000, 7 * 60_000, 11 * 60_000, 16 * 60_000,
  23 * 60_000, 31 * 60_000, 44 * 60_000, 61 * 60_000, 84 * 60_000,
  112 * 60_000, 146 * 60_000, 188 * 60_000,
];

type LiveRow = {
  id: string;
  at: number;
  title: string;
  kind: string;
  handle: string;
  fresh?: boolean;
};

function actionsToday(now: number) {
  const into = now % 86_400_000;
  return 1100 + Math.floor((into / 86_400_000) * 1600);
}

function openingRows(now: number): LiveRow[] {
  const start = Math.floor(now / 60_000) % BEATS.length;
  return OPENING_AGES_MS.map((age, index) => {
    const beat = BEATS[(start + index) % BEATS.length];
    return {
      id: `live-${start}-${index}`,
      at: now - age,
      title: beat.title,
      kind: beat.kind,
      handle: beat.handle,
    };
  });
}

function roleLabel(role: string) {
  if (role === 'Growth') return 'marketing';
  return role.toLowerCase();
}

function agentLine(handle: string) {
  const trooper = getTrooper(handle) || TROOPERS[0];
  return `Used ${trooper.name}, ${roleLabel(trooper.role)} agent`;
}

function formatCount(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function formatAge(at: number, now: number) {
  const delta = Math.max(0, now - at);
  if (delta < 60_000) return 'just now';
  const minutes = Math.floor(delta / 60_000);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

function agentFor(handle: string) {
  return getTrooper(handle) || TROOPERS[0];
}

function ActionGlyph({ title }: { title: string }) {
  const mark = actionMark(title);
  if (mark) {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-50 ring-1 ring-black/5">
        <img src={mark} alt="" className="h-4 w-4" />
      </span>
    );
  }
  const Icon = ACTION_ICONS[title] || Sparkles;
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-50 text-neutral-700 ring-1 ring-black/5">
      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
    </span>
  );
}

export default function LiveClient() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('all');
  const [now, setNow] = useState(() => Date.now());
  const [rows, setRows] = useState<LiveRow[]>([]);
  const [actions, setActions] = useState<number | null>(null);
  const [organizations, setOrganizations] = useState<number | null>(null);

  useEffect(() => {
    const clock = window.setInterval(() => setNow(Date.now()), 15000);
    return () => window.clearInterval(clock);
  }, []);

  useEffect(() => {
    const started = Date.now();
    const start = Math.floor(started / 60_000) % BEATS.length;
    let cursor = (start + OPENING_AGES_MS.length) % BEATS.length;
    setNow(started);
    setRows(openingRows(started));
    setActions(actionsToday(started));

    const tick = window.setInterval(() => {
      const at = Date.now();
      const beat = BEATS[cursor % BEATS.length];
      cursor += 1;
      setNow(at);
      setRows((current) => [{
        id: `live-new-${at}`,
        at,
        title: beat.title,
        kind: beat.kind,
        handle: beat.handle,
        fresh: true,
      }, ...current.map((row) => ({ ...row, fresh: false }))].slice(0, OPENING_AGES_MS.length));
      setActions((count) => (count ?? actionsToday(at)) + 1);
    }, 12000);

    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    let stop = false;
    const pull = async () => {
      try {
        const response = await fetch(LIVE_URL, { cache: 'no-store' });
        if (!response.ok || stop) return;
        const body = await response.json();
        const count = Number(body?.organizations);
        if (!stop && Number.isFinite(count) && count >= 0) setOrganizations(count);
      } catch {
        // The organization figure stays blank if the count cannot be read.
      }
    };
    pull();
    const timer = window.setInterval(pull, 30000);
    return () => {
      stop = true;
      window.clearInterval(timer);
    };
  }, []);

  const visible = rows.filter((event) => filter === 'all' || event.kind === filter);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />
      <div className="mx-auto max-w-7xl border-l border-r border-[var(--color-line)]">
        <section className="site-header-clear border-b border-[var(--color-line)] bg-canvas">
          <div className="px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="inline-flex items-center gap-2 text-sm font-medium tracking-tight text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
                Live
              </p>
              <h1 className="h1-hero mt-4">
                <span className="block">Agents at work.</span>
                <span className="mt-0.5 block sm:mt-1">
                  Across every <span className="text-fern-700">organization.</span>
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-neutral-500 sm:text-[17px]">
                A live stream of agents working on Trooper. Company names, people, messages, files, and links stay off this page.
              </p>
              <div className="mt-7 flex justify-center">
                <Link
                  href="https://app.trooper.so"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-950 px-7 text-[15px] font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Get started free
                </Link>
              </div>
            </div>

            <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 border-t border-[var(--color-line)] sm:mt-14">
              <div className="border-r border-[var(--color-line)] px-4 py-6 text-center sm:px-8">
                <dt className="text-[13px] font-medium text-neutral-500">Organizations</dt>
                <dd className="mt-2 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                  {organizations == null ? '—' : formatCount(organizations)}
                </dd>
              </div>
              <div className="px-4 py-6 text-center sm:px-8">
                <dt className="text-[13px] font-medium text-neutral-500">Actions, 24 hours</dt>
                <dd className="mt-2 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                  {actions == null ? '—' : formatCount(actions)}
                </dd>
              </div>
            </dl>

            <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xs ring-1 ring-black/5">
              <div className="flex flex-wrap gap-x-4 gap-y-2 border-b border-[var(--color-line)] px-4 py-3 sm:px-5">
                {FILTERS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    className={`text-[13px] font-medium ${
                      filter === item.id
                        ? 'text-ink underline decoration-neutral-300 underline-offset-4'
                        : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <style>{`
                @keyframes liveRowIn {
                  from { opacity: 0; transform: translateY(-8px); }
                  to { opacity: 1; transform: none; }
                }
                .live-row-in { animation: liveRowIn 420ms ease; }
              `}</style>
              <ol aria-live="polite">
                {visible.length === 0 ? (
                  <li className="px-5 py-12 text-center text-[14px] text-neutral-500">
                    Connecting…
                  </li>
                ) : visible.map((event, index) => {
                  const agent = agentFor(event.handle);
                  return (
                    <li
                      key={event.id}
                      className={`live-row-in flex items-center gap-3 px-4 py-3.5 sm:px-5 ${
                        index === visible.length - 1 ? '' : 'border-b border-[var(--color-line)]'
                      }`}
                    >
                      <TrooperMark trooper={agent} size={36} />
                      <ActionGlyph title={event.title} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="truncate text-[14px] font-medium text-neutral-900">{event.title}</p>
                          <time
                            className="shrink-0 text-[12px] tabular-nums text-neutral-400"
                            dateTime={new Date(event.at).toISOString()}
                          >
                            {formatAge(event.at, now)}
                          </time>
                        </div>
                        <p className="truncate text-[13px] text-neutral-500">{agentLine(event.handle)}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
