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
import { TROOPERS } from '@/lib/troopers';

const LIVE_URL = 'https://app.trooper.so/api/public/live?limit=60';

const TITLES = new Set([
  'Searched the web',
  'Searched with Brave',
  'Researched',
  'Opened a page',
  'Opened a Chrome tab',
  'Read a Chrome page',
  'Used Chrome',
  'Opened a Brave tab',
  'Used Brave',
  'Took a screenshot',
  'Read a file',
  'Edited a file',
  'Saved a file',
  'Looked through files',
  'Worked on code',
  'Updated a table',
  'Ran a command',
  'Used the cloud desktop',
  'Used the Mac',
  'Drew on the screen',
  'Used a skill',
  'Used a plugin',
  'Set a schedule',
  'Delegated the work',
  'Sent a message',
  'Worked on mail',
  'Made an image',
  'Made audio',
  'Worked on a video',
]);

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

type LiveEvent = {
  id: string;
  at: number;
  title: string;
  kind: string;
};

type Feed = {
  events: LiveEvent[];
  actions: number | null;
  organizations: number | null;
  ready: boolean;
};

function isLiveEvent(value: unknown): value is LiveEvent {
  if (!value || typeof value !== 'object') return false;
  const event = value as LiveEvent;
  return typeof event.id === 'string'
    && /^[a-f0-9]{8,32}$/.test(event.id)
    && Number.isFinite(event.at)
    && TITLES.has(event.title)
    && typeof event.kind === 'string';
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

function agentFor(id: string) {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) n += id.charCodeAt(i);
  return TROOPERS[n % TROOPERS.length];
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
  const [feed, setFeed] = useState<Feed>({
    events: [],
    actions: null,
    organizations: null,
    ready: false,
  });

  useEffect(() => {
    const clock = window.setInterval(() => setNow(Date.now()), 15000);
    return () => window.clearInterval(clock);
  }, []);

  useEffect(() => {
    let stop = false;
    let timer = 0;
    const pull = async () => {
      try {
        const response = await fetch(LIVE_URL, { cache: 'no-store' });
        if (response.ok) {
          const body = await response.json();
          const events = Array.isArray(body?.events) ? body.events.filter(isLiveEvent) : [];
          const actions = Number(body?.counts?.all);
          const organizations = Number(body?.organizations);
          if (!stop) {
            setFeed({
              events,
              actions: Number.isFinite(actions) ? actions : 0,
              organizations: Number.isFinite(organizations) && organizations >= 0 ? organizations : null,
              ready: true,
            });
          }
        }
      } catch {
        // Keep the last good frame. A failed poll is not a reason to invent work.
      }
      if (!stop) timer = window.setTimeout(pull, 3000);
    };
    pull();
    return () => {
      stop = true;
      window.clearTimeout(timer);
    };
  }, []);

  const visible = feed.events.filter((event) => filter === 'all' || event.kind === filter);

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
                  {feed.organizations == null ? '—' : formatCount(feed.organizations)}
                </dd>
              </div>
              <div className="px-4 py-6 text-center sm:px-8">
                <dt className="text-[13px] font-medium text-neutral-500">Actions, 24 hours</dt>
                <dd className="mt-2 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                  {feed.actions == null ? '—' : formatCount(feed.actions)}
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
              <ol aria-live="polite">
                {visible.length === 0 ? (
                  <li className="px-5 py-12 text-center text-[14px] text-neutral-500">
                    {feed.ready
                      ? 'Quiet right now. An agent shows up here when work starts.'
                      : 'Connecting…'}
                  </li>
                ) : visible.map((event, index) => {
                  const agent = agentFor(event.id);
                  return (
                    <li
                      key={event.id}
                      className={`flex items-center gap-3 px-4 py-3.5 sm:px-5 ${
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
                        <p className="text-[13px] text-neutral-500">Agent</p>
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
