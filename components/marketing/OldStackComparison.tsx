'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUp, Check, Lock, Mic, Plus } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import TrooperLogo from '@/components/ui/TrooperLogo';
import {
  sumTools,
  type OldStackContent,
  type OldStackTool,
} from '@/lib/oldStackContent/types';

/** Keep these class strings in this file — Tailwind only scans components/, not lib/. */
const TOOL_POSITIONS = [
  {
    pos: 'left-[8px] top-0 z-[9] rotate-[-3deg]',
    posLg: 'lg:left-[2px] lg:top-0 lg:z-[9] lg:rotate-[-3.5deg]',
  },
  {
    pos: 'right-[4px] top-[14px] z-[8] rotate-[2.5deg]',
    posLg: 'lg:right-auto lg:left-[148px] lg:top-[14px] lg:z-[8] lg:rotate-[2.5deg]',
  },
  {
    pos: 'left-[18px] top-[80px] z-[7] rotate-[1.5deg]',
    posLg: 'lg:left-[34px] lg:top-[78px] lg:z-[7] lg:rotate-[1.5deg]',
  },
  {
    pos: 'right-[12px] top-[94px] z-[6] rotate-[-2deg]',
    posLg: 'lg:right-auto lg:left-[176px] lg:top-[96px] lg:z-[6] lg:rotate-[-2deg]',
  },
  {
    pos: 'left-[6px] top-[160px] z-[5] rotate-[2deg]',
    posLg: 'lg:left-[6px] lg:top-[158px] lg:z-[5] lg:rotate-[2deg]',
  },
  {
    pos: 'right-[6px] top-[178px] z-[4] rotate-[-1.5deg]',
    posLg: 'lg:right-auto lg:left-[150px] lg:top-[176px] lg:z-[4] lg:rotate-[-1.5deg]',
  },
  {
    pos: 'left-[14px] top-[242px] z-[3] rotate-[-2.5deg]',
    posLg: 'lg:left-[48px] lg:top-[236px] lg:z-[3] lg:rotate-[-2.5deg]',
  },
  {
    pos: 'right-[10px] top-[258px] z-[2] rotate-[3deg]',
    posLg: 'lg:right-auto lg:left-[188px] lg:top-[254px] lg:z-[2] lg:rotate-[3deg]',
  },
  {
    pos: 'left-[10px] top-[324px] z-[1] rotate-[1deg]',
    posLg: 'lg:left-[14px] lg:top-[316px] lg:z-[1] lg:rotate-[1deg]',
  },
  {
    pos: 'right-[8px] top-[338px] z-[1] rotate-[-3deg]',
    posLg: 'lg:right-auto lg:left-[158px] lg:top-[334px] lg:z-[1] lg:rotate-[-3deg]',
  },
] as const;

const NOTE_POSITIONS = [
  'left-[36px] top-[70px] z-[11] rotate-[4deg] lg:left-[114px] lg:top-[60px]',
  'left-[-2px] top-[230px] z-[11] rotate-[-4deg] lg:left-[-6px] lg:top-[212px]',
  'left-[93px] top-[390px] z-[11] rotate-[3.5deg] lg:left-[120px] lg:top-[300px]',
] as const;

function ToolCard({
  tool,
  pos,
  posLg,
}: {
  tool: OldStackTool;
  pos: string;
  posLg: string;
}) {
  return (
    <div className={`absolute w-[160px] lg:w-[212px] ${pos} ${posLg}`}>
    <div className="overflow-hidden rounded-[11px] border border-neutral-900/[0.12] bg-white saturate-[0.72] shadow-[0_1px_2px_rgba(15,23,42,0.05),0_14px_30px_-16px_rgba(15,23,42,0.22)] transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_28px_-14px_rgba(15,23,42,0.28)]">
      <div className="flex h-6 items-center gap-1.5 border-b border-neutral-900/[0.06] bg-neutral-50 px-[9px]">
        <div className="flex gap-1">
          <span className="block size-[7px] rounded-full bg-neutral-200" />
          <span className="block size-[7px] rounded-full bg-neutral-200" />
          <span className="block size-[7px] rounded-full bg-neutral-200" />
        </div>
        <div className="ml-1 h-[11px] flex-1 rounded-[3px] bg-neutral-100" />
      </div>
      <div className="flex items-start justify-between gap-2.5 px-3 pb-[13px] pt-[11px]">
        <div className="min-w-0">
          <div className="text-[12.5px] font-semibold leading-tight tracking-[-0.01em] text-neutral-600">
            {tool.name}
          </div>
          <div className="mt-[5px] flex items-center gap-[5px] font-mono text-[10px] text-neutral-400">
            <Lock className="size-[9px] opacity-70" strokeWidth={1.6} aria-hidden />
            sign in
          </div>
        </div>
        <div className="shrink-0 pt-px font-display text-[20px] leading-none text-rose-500">
          ${tool.price}
          <span className="font-mono text-[10px] text-rose-400">/mo</span>
        </div>
      </div>
    </div>
    </div>
  );
}

function StackWave({ uid, idSuffix, tone = 'rose' }: { uid: string; idSuffix: string; tone?: 'rose' | 'green' }) {
  const gradId = `oldstack-eq-grad-${idSuffix}-${uid}`;
  const soft = tone === 'green' ? '#c4d9a0' : '#fda4af';
  const mid = tone === 'green' ? '#7aa824' : '#f43f5e';
  const end = tone === 'green' ? '#3f6b00' : '#e11d48';
  return (
    <div aria-hidden className="-mb-1.5 mt-2.5 flex justify-center">
      <svg
        viewBox="0 0 44 50"
        width="44"
        height="50"
        fill="none"
        className={`oldstack-eq-wobble-${uid} overflow-visible`}
      >
        <defs>
          <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={soft} />
            <stop offset="55%" stopColor={mid} />
            <stop offset="100%" stopColor={end} />
          </linearGradient>
        </defs>
        {[15, 29].map((x) => (
          <g key={x}>
            <path
              d={`M ${x} 5 C ${x - 6} 14, ${x + 6} 21, ${x} 29 C ${x - 4} 35, ${x + 3} 39, ${x} 45`}
              stroke={soft}
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d={`M ${x} 5 C ${x - 6} 14, ${x + 6} 21, ${x} 29 C ${x - 4} 35, ${x + 3} 39, ${x} 45`}
              stroke={`url(#${gradId})`}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="6 6"
              className={`oldstack-eq-dash-${uid}`}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

function PriceFace({ label, tone }: { label: string; tone: 'rose' | 'green' }) {
  const match = label.match(/^(\$[\d,]+)(.*)$/);
  const amount = match ? match[1] : label;
  const unit = match ? match[2] : '';
  const amountClass =
    tone === 'rose'
      ? 'font-display text-[32px] leading-none tracking-[-0.01em] text-rose-600'
      : 'font-display text-[32px] leading-none tracking-[-0.01em] text-fern-600';
  const unitClass =
    tone === 'rose' ? 'font-mono text-[12px] text-rose-400' : 'font-mono text-[12px] text-fern-400';
  return (
    <span className={amountClass}>
      {amount}
      {unit ? <span className={unitClass}>{unit}</span> : null}
    </span>
  );
}

type Props = {
  content: OldStackContent;
  bgClass?: string;
};

/**
 * Old fragmented tool stack vs Mission Control chat — content-driven so each
 * page (pricing, industry, team, resellers) can show a custom comparison.
 */
export default function OldStackComparison({ content, bgClass = 'bg-white' }: Props) {
  const uid = useId().replace(/:/g, '');
  const runwayRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const [extra, setExtra] = useState(0);
  const total = sumTools(content.tools);
  const tools = content.tools.slice(0, TOOL_POSITIONS.length);
  const notes = content.notes.slice(0, NOTE_POSITIONS.length);

  useLayoutEffect(() => {
    const thread = threadRef.current;
    if (!thread) return;
    const measure = () => {
      const next = Math.max(0, thread.scrollHeight - thread.clientHeight);
      setExtra((prev) => (prev === next ? prev : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(thread);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sync = () => {
      const runway = runwayRef.current;
      const thread = threadRef.current;
      if (!runway || !thread) return;
      const max = thread.scrollHeight - thread.clientHeight;
      if (max <= 0 || reduced) return;
      const scrolled = Math.min(Math.max(-runway.getBoundingClientRect().top, 0), max);
      thread.scrollTop = scrolled;
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [extra]);

  return (
    <SectionShell rhythm eyebrow={content.eyebrow} bgClass={bgClass}>
      <style>{`
        @keyframes oldstack-eq-dash-${uid} { to { stroke-dashoffset: -24; } }
        @keyframes oldstack-eq-wobble-${uid} {
          0%, 100% { transform: rotate(-3deg); }
          50%      { transform: rotate(3deg); }
        }
        .oldstack-eq-dash-${uid} { animation: oldstack-eq-dash-${uid} 2.6s linear infinite; }
        .oldstack-eq-wobble-${uid} {
          animation: oldstack-eq-wobble-${uid} 4.5s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
      `}</style>

      <div
        ref={runwayRef}
        style={extra > 0 ? { height: `calc(100svh + ${extra}px)` } : undefined}
      >
      <div className={extra > 0 ? 'sticky top-0 flex h-svh flex-col justify-center' : undefined}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance font-display text-[2.5rem] leading-[1.04] tracking-[-0.02em] text-neutral-800 sm:text-[3.5rem]">
          {content.headline}{' '}
          <em className="italic text-fern-700">{content.headlineEmphasis}</em>
        </h2>
        {content.lede ? (
          <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-[1.6] text-neutral-500">
            {content.lede.replace('{total}', String(total))}
          </p>
        ) : null}
      </div>

      <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-[auto_auto_auto] lg:items-stretch lg:gap-0">
        <div className="lg:col-start-1 lg:row-span-3 lg:grid lg:grid-rows-subgrid">
          <div className="relative lg:self-end">
          <div className="relative mx-auto mt-[18px] h-[444px] w-full max-w-[336px] lg:mt-5 lg:h-[460px] lg:w-[412px] lg:max-w-none">
            {tools.map((tool, i) => (
              <ToolCard
                key={`${tool.name}-${i}`}
                tool={tool}
                pos={TOOL_POSITIONS[i].pos}
                posLg={TOOL_POSITIONS[i].posLg}
              />
            ))}

            {notes.map((note, i) => (
              <div
                key={note.text}
                className={`absolute w-[150px] rounded-[9px] border border-neutral-900/[0.06] bg-white px-[11px] py-[7px] text-[11px] italic leading-[1.4] text-neutral-500 saturate-[0.7] shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${NOTE_POSITIONS[i]}`}
              >
                + {note.text}{' '}
                <b className="font-mono text-[10.5px] font-semibold not-italic text-neutral-600">
                  {note.value}
                </b>
              </div>
            ))}
          </div>
          </div>

          <StackWave uid={uid} idSuffix="cost" />

          <div className="relative mx-auto mt-[26px] flex max-w-[430px] flex-wrap items-baseline justify-center gap-x-3.5 gap-y-1.5 rounded-2xl bg-white px-[18px] py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_0_0_1px_rgba(15,23,42,0.12)]">
            <span className="font-display text-[32px] leading-none tracking-[-0.01em] text-rose-600">
              ${total}
              <span className="font-mono text-[12px] text-rose-400">/mo</span>
            </span>
            <span aria-hidden className="self-center text-[14px] text-neutral-200">
              ·
            </span>
            <span className="font-mono text-[12px] text-neutral-500">{tools.length} logins</span>
            <span aria-hidden className="self-center text-[14px] text-neutral-200">
              ·
            </span>
            <span className="font-mono text-[12px] text-neutral-500">{content.timeLabel}</span>
            <span className="mt-0.5 basis-full text-center font-mono text-[10.5px] italic text-neutral-400">
              {content.footnote}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3.5 py-2 lg:col-start-2 lg:row-span-3 lg:flex-col lg:px-6 lg:py-0">
          <span className="h-px min-w-[36px] flex-1 bg-neutral-900/[0.12] lg:h-auto lg:min-h-[54px] lg:w-px lg:min-w-0 lg:flex-none" />
          <span className="whitespace-nowrap text-center text-[10px] font-semibold uppercase leading-normal tracking-[0.16em] text-neutral-400 lg:[writing-mode:vertical-rl] lg:rotate-180 lg:tracking-[0.18em]">
            {content.dividerLabel}
          </span>
          <span aria-hidden className="text-[13px] leading-none text-neutral-300">
            ↓
          </span>
          <span className="h-px min-w-[36px] flex-1 bg-neutral-900/[0.12] lg:h-auto lg:min-h-[54px] lg:w-px lg:min-w-0 lg:flex-none" />
        </div>

        <div className="lg:col-start-3 lg:row-span-3 lg:grid lg:grid-rows-subgrid">
          <div className="flex w-full justify-center lg:mt-5 lg:self-end">
          <div
            data-mock-ui
            className="flex h-[444px] w-full max-w-[440px] flex-col overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white shadow-[0_1px_2px_rgba(28,25,23,0.04)] lg:h-[460px]"
          >
            <div className="flex shrink-0 items-center border-b border-[#EDEBE9] px-3.5 py-2.5">
              <TrooperLogo className="!h-5 sm:!h-5" />
            </div>

            <div ref={threadRef} className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-hidden px-4 py-4">
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#E7E5E4] text-[10px] font-semibold text-[#57534E]">
                    Y
                  </span>
                  <span className="text-[13px] font-semibold text-[#1C1917]">You</span>
                  <span className="text-[11px] text-[#A8A29E]">9:14</span>
                </div>
                <p className="pl-8 text-[13px] leading-snug text-[#57534E]">{content.userAsk}</p>
              </div>

              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <img src="/images/cast/pip.svg" alt="" className="size-6 shrink-0 rounded-full bg-[#F5F5F4] object-contain" />
                  <span className="text-[13px] font-semibold text-[#1C1917]">Trooper</span>
                  <span className="inline-flex h-4 items-center rounded bg-[#F5F5F4] px-1.5 text-[9px] font-semibold text-[#1C1917]">
                    Manager
                  </span>
                  <span className="text-[11px] text-[#A8A29E]">9:14</span>
                </div>
                <div className="pl-8">
                  <p className="text-[13px] leading-snug text-[#57534E]">{content.agentAck}</p>
                  <div className="mt-3 flex flex-col gap-3">
                    {content.steps.map((step) => (
                      <div key={step.title} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-[#325600]" strokeWidth={2.5} aria-hidden />
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium leading-tight text-[#1C1917]">{step.title}</p>
                          <p className="mt-0.5 text-[12px] leading-snug text-[#78716C]">{step.detail}</p>
                          {step.tags && step.tags.length > 0 ? (
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {step.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center rounded-md border border-[#E7E5E4] bg-[#FAF9F6] px-1.5 py-0.5 text-[11px] font-medium leading-none text-[#57534E]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pl-8">
                <div className="flex items-center justify-between gap-3 rounded-lg border border-[#F5E6C8] bg-[#FFFBEB] px-3 py-2">
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold leading-tight text-[#78350F]">{content.pendingTitle}</p>
                    <p className="mt-1 text-[12px] leading-snug text-[#92400E]/80">{content.pendingDetail}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#f0f5e6] px-2 py-1 text-[11px] font-semibold text-[#325600]">
                    <Check className="size-3" strokeWidth={2.5} aria-hidden />
                    Approved
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-snug text-[#1C1917]">{content.closingLine}</p>
              </div>
            </div>

            <div className="shrink-0 border-t border-[#EDEBE9] px-3 pb-2.5 pt-2">
              <div className="rounded-2xl border border-[#E7E5E4] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
                <p className="px-3 pb-1 pt-2.5 text-[13px] leading-snug text-[#A8A29E]">Send a follow-up</p>
                <div className="flex items-center justify-between gap-2 px-2 pb-2">
                  <span className="inline-flex size-7 items-center justify-center rounded-lg border border-[#E7E5E4] text-[#78716C]">
                    <Plus className="size-3.5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-flex h-7 items-center rounded-lg border border-[#E7E5E4] bg-white px-2 text-[12px] font-medium text-[#525252]">
                      Auto
                    </span>
                    <span className="inline-flex size-7 items-center justify-center text-[#A8A29E]">
                      <Mic className="size-3.5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-[#3f6b00] text-white">
                      <ArrowUp className="size-3.5" strokeWidth={2.25} aria-hidden />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          </div>

          <StackWave uid={uid} idSuffix="trooper" tone="green" />

          <div className="relative mx-auto mt-[26px] flex max-w-[430px] flex-wrap items-baseline justify-center gap-x-3.5 gap-y-1.5 rounded-2xl bg-white px-[18px] py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_0_0_1px_rgba(15,23,42,0.12)]">
            <PriceFace label={content.trooperPriceLabel} tone="green" />
            <span aria-hidden className="self-center text-[14px] text-neutral-200">
              ·
            </span>
            <span className="font-mono text-[12px] text-neutral-500">1 login</span>
            <span aria-hidden className="self-center text-[14px] text-neutral-200">
              ·
            </span>
            <span className="font-mono text-[12px] text-neutral-500">one workspace</span>
            <span className="mt-0.5 basis-full text-center font-mono text-[10.5px] italic text-neutral-400">
              *one mission control
            </span>
          </div>
        </div>
      </div>
      </div>
      </div>
    </SectionShell>
  );
}
