'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

import { getFaviconUrl } from '@/lib/favicon';
import { trooperLogomarkForSize } from '@/lib/trooperLogomark';

import connect from './connect.module.css';
import frame from './moat.module.css';
import SlideFrame from './SlideFrame';

/**
 * Any session asks with nothing pasted in. The same company-brain facts
 * light up in the ledger, then the next agent does it again.
 */

type ClientId = 'cursor' | 'claude' | 'chatgpt' | 'claude-code' | 'gemini';

type Client = {
  id: ClientId;
  name: string;
  model: string;
  icon: string;
};

type ReadFact = {
  text: string;
  domain: string;
  since: string;
};

type Scene = {
  client: ClientId;
  prompt: string;
  tool: string;
  arg: string;
  facts: ReadFact[];
  reply: string;
  caption: string;
  reads: string[];
};

const CLIENTS: Client[] = [
  { id: 'cursor', name: 'Cursor', model: 'Composer', icon: '/images/desktop/dock/cursor.svg' },
  { id: 'claude', name: 'Claude', model: 'Opus', icon: '/images/providers/claude.svg' },
  { id: 'chatgpt', name: 'ChatGPT', model: 'GPT', icon: '/images/providers/openai.svg' },
  { id: 'claude-code', name: 'Claude Code', model: 'Opus', icon: '/images/providers/claude.svg' },
  { id: 'gemini', name: 'Gemini', model: 'Gemini', icon: '/images/providers/google.svg' },
];

const SCENES: Scene[] = [
  {
    client: 'cursor',
    prompt: 'Who signs off on the Friday release? New session, nothing pasted.',
    tool: 'get_neighbors',
    arg: 'Friday release',
    facts: [
      { text: 'Priya signs off on the Friday release', domain: 'gmail.com', since: 'today' },
      { text: 'Three people are waiting on the Friday PR', domain: 'linear.app', since: 'today' },
      { text: 'Marco owns the landing page from here', domain: 'gmail.com', since: 'today' },
    ],
    reply:
      'Priya signs off. Sam and Marco are waiting on the PR, and Marco owns the landing page from here. Drafted from 3 facts. Nothing pasted in.',
    caption: 'Cursor, in a new session with nothing pasted in, reads the same facts.',
    reads: ['priya', 'friday', 'marco'],
  },
  {
    client: 'claude',
    prompt: 'Draft the renewal note for Northwind. New session, you have no context.',
    tool: 'get_neighbors',
    arg: 'Northwind',
    facts: [
      { text: 'Northwind plans to close on November 6', domain: 'hubspot.com', since: 'Nov 2' },
      { text: 'Sam owns the Northwind deal', domain: 'hubspot.com', since: 'Nov 2' },
      { text: 'Ops review is Thursday at 9 am', domain: 'outlook.com', since: 'Nov 2' },
    ],
    reply:
      'I do, from the brain. “Northwind plans to close November 6. Sam owns the deal. Ops review is Thursday at 9.” Drafted from 3 facts. Nothing pasted in.',
    caption: 'Claude, in a new session with nothing pasted in, drafts from the same facts.',
    reads: ['northwind', 'sam', 'ops'],
  },
  {
    client: 'chatgpt',
    prompt: 'Where does Kestrel stand on the open invoice?',
    tool: 'search',
    arg: 'invoice #2184',
    facts: [
      { text: 'Invoice #2184 is 12 days late, $2,400', domain: 'stripe.com', since: 'Nov 2' },
      { text: 'Priya signs off on the Friday release', domain: 'gmail.com', since: 'today' },
    ],
    reply:
      'Invoice #2184 is 12 days late, $2,400. Priya still signs off on the Friday release. Nothing pasted in.',
    caption: 'ChatGPT asks in a fresh chat and gets the invoice the brain already kept.',
    reads: ['invoice', 'priya'],
  },
  {
    client: 'claude-code',
    prompt: 'What is blocking the Friday PR?',
    tool: 'find_entity',
    arg: 'ENG-482',
    facts: [
      { text: 'Three people are waiting on the Friday PR', domain: 'linear.app', since: 'today' },
      { text: 'Priya signs off on the Friday release', domain: 'gmail.com', since: 'today' },
      { text: 'Marco owns the landing page from here', domain: 'gmail.com', since: 'today' },
    ],
    reply:
      'The Friday PR is waiting on Priya, Sam, and Marco. Priya signs off. Marco owns the landing page. Nothing pasted in.',
    caption: 'Claude Code opens a new session and still sees who is blocking the release.',
    reads: ['friday', 'priya', 'marco'],
  },
  {
    client: 'gemini',
    prompt: 'What should I know before Thursday’s ops review?',
    tool: 'search',
    arg: 'since: 7d',
    facts: [
      { text: 'Ops review is Thursday at 9 am', domain: 'outlook.com', since: 'Nov 2' },
      { text: 'Invoice #2184 is 12 days late, $2,400', domain: 'stripe.com', since: 'Nov 2' },
      { text: 'Losing ad sets stop at Dana’s cap', domain: 'slack.com', since: 'Nov 1' },
    ],
    reply:
      'Ops review is Thursday at 9. Invoice #2184 is 12 days late, $2,400, and losing ad sets stop at Dana’s cap.',
    caption: 'Gemini reads the week: what is due, and what is still held.',
    reads: ['ops', 'invoice', 'dana'],
  },
];

const LEDGER: Array<{
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

const CALLS: Array<{ who: string; tool: string; q: string }> = [
  { who: 'cursor', tool: 'search', q: 'Friday release' },
  { who: 'claude', tool: 'get_neighbors', q: 'Northwind' },
  { who: 'chatgpt', tool: 'search', q: 'invoice #2184' },
  { who: 'gemini', tool: 'get_neighbors', q: 'Dana' },
  { who: 'claude', tool: 'find_entity', q: 'ENG-482' },
  { who: 'cursor', tool: 'search', q: 'landing page' },
  { who: 'gemini', tool: 'search', q: 'ops review' },
  { who: 'chatgpt', tool: 'find_entity', q: 'Priya' },
  { who: 'cursor', tool: 'get_neighbors', q: 'Kestrel' },
  { who: 'claude', tool: 'search', q: 'morning brief' },
  { who: 'gemini', tool: 'search', q: 'Thursday 9 am' },
  { who: 'chatgpt', tool: 'search', q: 'ad cap' },
];

const SCENE_MS = 6400;
const MARK = trooperLogomarkForSize(16);

function clock(index: number) {
  const mins = (41 + index) % 60;
  return `09:${String(mins).padStart(2, '0')}`;
}

export default function ConnectSection() {
  const scalerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(scalerRef, { amount: 0.25 });
  const reduced = useReducedMotion();
  const [live, setLive] = useState({ scene: 1, phase: 4, call: 4 });

  useEffect(() => {
    if (reduced !== false || !inView) return;
    let raf = 0;
    let prev = '';
    const start = performance.now() - (SCENE_MS + SCENE_MS * 0.82);
    const tick = (now: number) => {
      const elapsed = now - start;
      const scene = Math.floor(elapsed / SCENE_MS) % SCENES.length;
      const local = (elapsed % SCENE_MS) / SCENE_MS;
      const phase = local < 0.12 ? 0 : local < 0.3 ? 1 : local < 0.48 ? 2 : local < 0.66 ? 3 : 4;
      const call = Math.floor(elapsed / 780);
      const key = `${scene}:${phase}:${call}`;
      if (key !== prev) {
        prev = key;
        setLive({ scene, phase, call });
      }
      const list = listRef.current;
      if (list) {
        const loop = CALLS.length * 18;
        list.style.transform = `translateY(${-((elapsed / 780) * 18) % loop}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const scene = SCENES[live.scene];
  const client = CLIENTS.find((item) => item.id === scene.client) ?? CLIENTS[0];
  const asked = live.phase >= 1;
  const called = live.phase >= 2;
  const listed = live.phase >= 3;
  const replied = live.phase >= 4;
  const facts = 186 + Math.floor(live.call / 5);
  const rate = 28 + (live.call % 9);

  return (
    <SlideFrame id="connect" labelledBy="connect-title">
      <p className={connect.thesis}>Trooper Brain is an MCP</p>
      <div className={connect.split}>
        <h2 id="connect-title" className={frame.h2}>
          Ask anywhere.
          <br />
          <span>Same facts come back.</span>
        </h2>
      </div>
      <p className={connect.lead}>
        Cursor, Claude, ChatGPT, Claude Code, Gemini. Nothing pasted in. Each one calls the
        company brain and drafts from the facts already kept — who decides, what happened, when it
        is due, and why.
      </p>

      <div ref={scalerRef} className={connect.scaler}>
        <div
          className={connect.stage}
          role="img"
          aria-label="Cursor, Claude, ChatGPT, Claude Code, and Gemini each open a new session with nothing pasted in. They call the company brain and draft from the same facts: who signs off, the Northwind close, the late invoice, Thursday’s ops review, and Dana’s ad cap."
        >
          <div className={connect.ledger} aria-hidden>
            <div className={connect.head}>
              <img className={connect.mark} alt="" src={MARK} width={16} height={16} />
              <span className={connect.brainName}>brain</span>
              <span>·</span>
              <span key={facts} className={connect.count}>
                {facts.toLocaleString('en-US')}
              </span>
              <span>facts</span>
              <span>·</span>
              <span key={rate} className={connect.count}>
                {rate}
              </span>
              <span>calls/min</span>
              <span className={connect.live}>
                your models <i className={connect.pulse} />
              </span>
            </div>

            <div className={connect.calls}>
              <b>calls</b>
              <div className={connect.callWindow}>
                <div ref={listRef} className={connect.callTrack}>
                  {[...CALLS, ...CALLS].map((row, index) => (
                    <div className={connect.call} key={`${row.who}-${row.q}-${index}`}>
                      <span>{clock(index % CALLS.length)}</span>
                      <i>{row.who}</i>
                      <em>{row.tool}</em>
                      <span>{row.q}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={connect.cols}>
              <span>fact</span>
              <span>entity</span>
              <span>src</span>
              <span>since</span>
              <span>state</span>
            </div>

            {LEDGER.map((row) => {
              const hot = called && scene.reads.includes(row.id);
              return (
                <div key={row.id} className={`${connect.fact} ${hot ? connect.hot : ''}`}>
                  <b className={row.state === 'superseded' ? connect.struck : undefined}>{row.fact}</b>
                  <em>{row.entity}</em>
                  <span className={connect.src}>
                    <img alt="" src={getFaviconUrl(row.domain, 32)} width={11} height={11} />
                  </span>
                  <span className={connect.since}>{row.since}</span>
                  <span className={`${connect.state} ${row.state === 'new' ? connect.fresh : ''}`}>
                    {row.state}
                    <span className={connect.reader}>
                      <img alt="" src={client.icon} width={10} height={10} />
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          <div className={connect.client}>
            <div className={connect.tabs}>
              {CLIENTS.map((item) => {
                const on = item.id === client.id;
                return (
                  <span key={item.id} className={`${connect.tab} ${on ? connect.tabOn : ''}`}>
                    <span className={connect.chip}>
                      <img alt="" src={item.icon} width={11} height={11} />
                    </span>
                    {item.name}
                    <i className={connect.dot} />
                  </span>
                );
              })}
              <span className={connect.model}>{client.model}</span>
            </div>

            <div className={connect.body}>
              <div className={`${connect.ask} ${asked ? connect.on : ''}`}>{scene.prompt}</div>
              <div className={`${connect.tool} ${called ? connect.on : ''}`}>
                <div className={connect.toolRow}>
                  <img alt="" src={MARK} width={14} height={14} />
                  <span>Called the brain</span>
                  <span className={connect.dim}>·</span>
                  <span className={connect.toolName}>{scene.tool}</span>
                  <span className={connect.toolArg}>{scene.arg}</span>
                  <i className={`${connect.toolDot} ${called ? connect.on : ''}`} />
                </div>
                <div className={`${connect.found} ${listed ? connect.on : ''}`}>
                  <div className={connect.foundHead}>
                    <span>
                      {scene.facts.length} fact{scene.facts.length === 1 ? '' : 's'}
                    </span>
                    <span>source · since · state</span>
                  </div>
                  {scene.facts.map((fact) => (
                    <div key={fact.text} className={connect.foundRow}>
                      <span className={connect.src}>
                        <img alt="" src={getFaviconUrl(fact.domain, 32)} width={11} height={11} />
                      </span>
                      <span>{fact.text}</span>
                      <span className={connect.foundWhen}>{fact.since}</span>
                      <span className={connect.foundState}>current</span>
                    </div>
                  ))}
                  <div className={connect.foundHead} />
                </div>
              </div>
              <p className={`${connect.reply} ${replied ? connect.on : ''}`}>{scene.reply}</p>
            </div>

            <div className={connect.composer}>
              <span>Reply to {client.name}…</span>
              <span className={connect.send} aria-hidden>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 10V2M2.5 5.5 6 2l3.5 3.5" />
                </svg>
              </span>
            </div>
          </div>

          <div className={connect.caption}>
            <span className={connect.step}>
              {String(live.scene + 1).padStart(2, '0')} / {String(SCENES.length).padStart(2, '0')}
            </span>
            <p className={replied ? connect.on : ''}>{scene.caption}</p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
