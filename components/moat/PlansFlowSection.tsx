'use client';

import { useState } from 'react';

import TrooperMark from '@/components/ui/TrooperMark';
import { trooperLogomarkForSize } from '@/lib/trooperLogomark';
import { getTrooper } from '@/lib/troopers';

import styles from './plans-flow.module.css';

/**
 * Same geometry as the Cloudroom plans diagram: six sources on the left,
 * one hub, ten teammates on the right, with a dash traveling the curves.
 * The plans are the ones Trooper actually runs on.
 */

const PLAN_Y = [135, 201, 267, 333, 399, 465];
const AGENT_Y = [84, 132, 180, 228, 276, 324, 372, 420, 468, 516];

type TabId = 'all' | 'claude' | 'chatgpt' | 'keys';

const TABS: { id: TabId; label: string; plans: string[] | 'all' }[] = [
  { id: 'all', label: 'Trooper', plans: 'all' },
  { id: 'claude', label: "Claude's plan", plans: ['claude'] },
  { id: 'chatgpt', label: "ChatGPT's plan", plans: ['chatgpt'] },
  { id: 'keys', label: 'Your API keys', plans: ['keys'] },
];

const PLANS = [
  {
    id: 'claude',
    name: 'Claude Pro or Max',
    sub: 'Claude subscription',
    icon: '/images/providers/claude.svg',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT Plus or Pro',
    sub: 'ChatGPT subscription',
    icon: '/images/providers/openai.svg',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    sub: 'Google AI plan',
    icon: '/images/providers/google.svg',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    sub: 'Cursor plan',
    icon: '/images/desktop/dock/cursor.svg',
  },
  {
    id: 'keys',
    name: 'API keys',
    sub: 'OpenRouter or any provider',
    key: true,
  },
  {
    id: 'credits',
    name: 'Seat credits',
    sub: 'Recharge on Trooper',
    icon: '/images/trooper-logomark-64.webp',
  },
] as const;

const AGENTS: { name: string; handle: string }[] = [
  { name: 'Engineering', handle: 'rex' },
  { name: 'Support', handle: 'nova' },
  { name: 'Growth', handle: 'scout' },
  { name: 'Operations', handle: 'pip' },
  { name: 'Design', handle: 'wren' },
  { name: 'Sales', handle: 'nova' },
  { name: 'Finance', handle: 'pip' },
  { name: 'Research', handle: 'scout' },
  { name: 'Security', handle: 'rex' },
  { name: 'Calls', handle: 'wren' },
];

function leftPath(y: number) {
  return `M293.8,${y} C360.8,${y} 350.2,300 408.2,300`;
}

function rightPath(y: number) {
  return `M591.8,300 C649.8,300 655.9,${y} 722.9,${y}`;
}

function KeyGlyph() {
  return (
    <span className={styles.key} aria-hidden>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#191b1d" strokeWidth="1.8">
        <circle cx="8" cy="15" r="4" />
        <path d="M11 12l8-8M16 7l3 3M14 9l2 2" />
      </svg>
    </span>
  );
}

export default function PlansFlowSection() {
  const [tab, setTab] = useState<TabId>('all');
  const active = TABS.find((item) => item.id === tab) ?? TABS[0];
  const planOn = (id: string) => active.plans === 'all' || active.plans.includes(id);

  return (
    <div className="flex flex-col gap-7 sm:gap-10">
      <div className="flex flex-col">
        <h2 id="plans-title" className="h2-section">
          Use the plans you <span className="text-ink-muted">already pay for.</span>
        </h2>
      </div>

      <div className={styles.well}>
        <div className={styles.bar}>
          <div className={styles.tabs} role="group" aria-label="Which plan feeds the workforce">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={tab === item.id}
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.scroll}>
          <div className={styles.flow}>
            <svg viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden>
              {PLAN_Y.map((y, i) => (
                <path
                  key={`l-${y}`}
                  d={leftPath(y)}
                  className={planOn(PLANS[i].id) ? styles.live : styles.quiet}
                />
              ))}
              {AGENT_Y.map((y) => (
                <path key={`r-${y}`} d={rightPath(y)} className={styles.live} />
              ))}
            </svg>

            <svg viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden>
              {PLAN_Y.map((y, i) =>
                planOn(PLANS[i].id) ? (
                  <g key={`pl-${y}`} className={styles.pulse}>
                    <path d={leftPath(y)} />
                    <path d={leftPath(y)} />
                  </g>
                ) : null,
              )}
              {AGENT_Y.map((y) => (
                <g key={`pr-${y}`} className={`${styles.pulse} ${styles.late}`}>
                  <path d={rightPath(y)} />
                  <path d={rightPath(y)} />
                </g>
              ))}
            </svg>

            <div className={styles.plans}>
              <p className={styles.colHead}>Your plans and keys</p>
              {PLANS.map((plan) => (
                <div key={plan.id} className={planOn(plan.id) ? styles.fed : styles.off}>
                  {'key' in plan && plan.key ? (
                    <KeyGlyph />
                  ) : (
                    <img
                      className={styles.logo}
                      alt=""
                      src={'icon' in plan ? plan.icon : ''}
                      width={30}
                      height={30}
                    />
                  )}
                  <div>
                    <b>{plan.name}</b>
                    <small>{plan.sub}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.hub}>
              <img src={trooperLogomarkForSize(48)} alt="" width={40} height={40} />
              <b>Trooper</b>
              <span>Your models</span>
            </div>

            <div className={styles.agents}>
              <p className={styles.colHead}>Your workforce</p>
              {AGENTS.map((agent) => {
                const trooper = getTrooper(agent.handle);
                return (
                  <div key={agent.name} className={styles.fed}>
                    {trooper ? (
                      <TrooperMark trooper={trooper} size={22} className={styles.mark} />
                    ) : null}
                    {agent.name}
                    <em>ON</em>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
