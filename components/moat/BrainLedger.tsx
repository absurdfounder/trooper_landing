'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

import { getFaviconUrl } from '@/lib/favicon';
import { trooperLogomarkForSize } from '@/lib/trooperLogomark';

import styles from './brain-ledger.module.css';

/**
 * Compact brain ledger — the same calls ticker and fact table as the
 * connect section, sized to sit inside a product card.
 */

const READERS = [
  '/images/desktop/dock/cursor.svg',
  '/images/providers/claude.svg',
  '/images/providers/openai.svg',
  '/images/providers/google.svg',
];

const FACTS: Array<{
  id: string;
  fact: string;
  entity: string;
  domain: string;
  since: string;
  state: 'current' | 'new' | 'superseded';
}> = [
  { id: 'marco', fact: 'Marco owns the landing page from here', entity: 'Design', domain: 'gmail.com', since: 'today', state: 'new' },
  { id: 'priya', fact: 'Priya signs off on the Friday release', entity: 'Kestrel', domain: 'gmail.com', since: 'today', state: 'current' },
  { id: 'northwind', fact: 'Northwind plans to close on November 6', entity: 'Northwind', domain: 'hubspot.com', since: 'Nov 2', state: 'current' },
  { id: 'invoice', fact: 'Invoice #2184 is 12 days late, $2,400', entity: 'Kestrel', domain: 'stripe.com', since: 'Nov 2', state: 'current' },
  { id: 'ops', fact: 'Ops review is Thursday at 9 am', entity: 'Ops', domain: 'outlook.com', since: 'Nov 2', state: 'current' },
  { id: 'dana', fact: 'Losing ad sets stop at Dana’s cap', entity: 'Ads', domain: 'slack.com', since: 'Nov 1', state: 'current' },
  { id: 'sam', fact: 'Sam owns the Northwind deal', entity: 'Northwind', domain: 'hubspot.com', since: 'Nov 2', state: 'current' },
  { id: 'friday', fact: 'Three people are waiting on the Friday PR', entity: 'Release', domain: 'linear.app', since: 'today', state: 'current' },
  { id: 'old', fact: 'Close was set for October 30', entity: 'Northwind', domain: 'hubspot.com', since: 'Oct 12', state: 'superseded' },
];

const CALLS = [
  { who: 'chatgpt', tool: 'search', q: 'ad cap' },
  { who: 'cursor', tool: 'search', q: 'Friday release' },
  { who: 'claude', tool: 'get_neighbors', q: 'Northwind' },
  { who: 'chatgpt', tool: 'search', q: 'invoice #2184' },
  { who: 'gemini', tool: 'search', q: 'ops review' },
  { who: 'cursor', tool: 'search', q: 'landing page' },
  { who: 'claude', tool: 'find_entity', q: 'ENG-482' },
  { who: 'gemini', tool: 'get_neighbors', q: 'Dana' },
];

const HOT = ['marco', 'priya', 'northwind', 'invoice', 'ops', 'friday'];

function clock(index: number) {
  const mins = (41 + index) % 60;
  return `09:${String(mins).padStart(2, '0')}`;
}

export default function BrainLedger() {
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.3 });
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced !== false || !inView) return;
    let raf = 0;
    let prev = -1;
    const start = performance.now();
    const frame = (now: number) => {
      const elapsed = now - start;
      const next = Math.floor(elapsed / 780);
      if (next !== prev) {
        prev = next;
        setTick(next);
      }
      const list = listRef.current;
      if (list) {
        const loop = CALLS.length * 18;
        list.style.transform = `translateY(${-((elapsed / 780) * 18) % loop}px)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const hotId = HOT[tick % HOT.length];
  const reader = READERS[tick % READERS.length];
  const facts = 180 + (tick % 12);

  return (
    <div ref={rootRef} className={styles.ledger}>
      <div className={styles.head}>
        <img className={styles.mark} alt="" src={trooperLogomarkForSize(16)} width={16} height={16} />
        <span className={styles.brainName}>Brain</span>
        <span className={styles.dim}>·</span>
        <span className={styles.count}>{facts} facts</span>
        <span className={styles.dim}>·</span>
        <span>35 calls/min</span>
        <span className={styles.live}>
          your models <i className={styles.pulse} />
        </span>
      </div>

      <div className={styles.calls}>
        <b>Calls</b>
        <div className={styles.callWindow}>
          <div ref={listRef} className={styles.callTrack}>
            {[...CALLS, ...CALLS].map((row, index) => (
              <div className={styles.call} key={`${row.who}-${row.q}-${index}`}>
                <span>{clock(index % CALLS.length)}</span>
                <i>{row.who}</i>
                <em>{row.tool}</em>
                <span>{row.q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.cols}>
        <span>Fact</span>
        <span>Entity</span>
        <span>Src</span>
        <span>Since</span>
        <span>State</span>
      </div>

      <div className={styles.rows}>
        {FACTS.map((row) => {
          const hot = row.id === hotId;
          return (
            <div key={row.id} className={`${styles.fact} ${hot ? styles.hot : ''}`}>
              <b className={row.state === 'superseded' ? styles.struck : undefined}>{row.fact}</b>
              <em>{row.entity}</em>
              <span className={styles.src}>
                <img alt="" src={getFaviconUrl(row.domain, 32)} width={11} height={11} />
              </span>
              <span className={styles.since}>{row.since}</span>
              <span className={`${styles.state} ${row.state === 'new' ? styles.fresh : ''}`}>
                {row.state}
                <span className={styles.reader}>
                  <img alt="" src={reader} width={10} height={10} />
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
