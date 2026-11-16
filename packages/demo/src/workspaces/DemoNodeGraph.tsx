'use client';

import { Check, GitBranch, Play, Sparkles, Zap } from 'lucide-react';
import { TROOPER_DEMO as C } from '../components/demoTheme';
import type { DemoWorkflowGraph, DemoWorkflowNode } from '../components/demoTaskExecution';
import { DUR, EASE_OUT } from '../lib/demoMotion';

/**
 * Routine graph, mirroring the node styling in the app's
 * `workflows/WorkflowCanvas.jsx`. Hand-rolled SVG plus absolutely positioned
 * cards — the app uses @xyflow/react, which is not worth adding to a marketing
 * bundle for a non-interactive diagram.
 */

const NODE_W = 148;
const NODE_H = 52;

const KIND = {
  trigger: { border: 'rgba(97,170,100,0.38)', bg: 'rgba(97,170,100,0.12)', color: '#9ACD9C', icon: Zap, label: 'Trigger' },
  if: { border: 'rgba(217,154,71,0.38)', bg: 'rgba(217,154,71,0.12)', color: '#E9C48F', icon: GitBranch, label: 'If' },
  then: { border: C.border, bg: C.cardWarm, color: C.text, icon: Play, label: 'Then' },
  ai: { border: 'rgba(96,165,250,0.38)', bg: 'rgba(96,165,250,0.12)', color: '#A9CCFF', icon: Sparkles, label: 'AI' },
} as const;

function nodeCentre(node: DemoWorkflowNode) {
  return { x: node.x + NODE_W / 2, y: node.y + NODE_H / 2 };
}

export function DemoNodeGraph({
  graph,
  activeIds,
}: {
  graph: DemoWorkflowGraph;
  /** Nodes whose step has completed, in order. */
  activeIds: string[];
}) {
  const byId = new Map(graph.nodes.map(n => [n.id, n]));
  const width = Math.max(...graph.nodes.map(n => n.x + NODE_W)) + 24;
  const height = Math.max(...graph.nodes.map(n => n.y + NODE_H)) + 24;
  const activeSet = new Set(activeIds);
  const runningId = activeIds[activeIds.length - 1];

  return (
    <div data-demo-target="node-graph" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, background: C.bg }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', flexShrink: 0,
        borderBottom: `1px solid ${C.border}`, background: C.cardWarm,
      }}>
        <GitBranch size={13} color={C.textMuted} strokeWidth={2} />
        <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{graph.name}</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: C.textSubtle, fontVariantNumeric: 'tabular-nums' }}>
          {activeSet.size}/{graph.nodes.length} steps
        </span>
      </div>

      <div className="Trooper-scrollbar" style={{ flex: 1, minHeight: 0, overflow: 'auto', padding: 12 }}>
        <div style={{
          position: 'relative', width, height,
          backgroundImage: `radial-gradient(${C.border} 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}>
          <svg width={width} height={height} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {graph.edges.map((edge, i) => {
              const from = byId.get(edge.from);
              const to = byId.get(edge.to);
              if (!from || !to) return null;
              const a = nodeCentre(from);
              const bPt = nodeCentre(to);
              const lit = activeSet.has(edge.from) && activeSet.has(edge.to);
              const midY = (a.y + bPt.y) / 2;
              return (
                <g key={i}>
                  <path
                    d={`M ${a.x} ${a.y + NODE_H / 2} C ${a.x} ${midY}, ${bPt.x} ${midY}, ${bPt.x} ${bPt.y - NODE_H / 2}`}
                    fill="none"
                    stroke={lit ? C.success : C.border}
                    strokeWidth={lit ? 2 : 1.25}
                    strokeDasharray={lit ? undefined : '4 4'}
                    style={{ transition: `stroke ${DUR.panel}ms ${EASE_OUT}, stroke-width ${DUR.panel}ms ${EASE_OUT}` }}
                  />
                  {edge.label && (
                    <text
                      x={(a.x + bPt.x) / 2 + 6}
                      y={midY - 3}
                      fontSize={9}
                      fontWeight={600}
                      fill={lit ? '#9ACD9C' : C.textSubtle}
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {graph.nodes.map((node) => {
            const tone = KIND[node.kind];
            const Icon = tone.icon;
            const done = activeSet.has(node.id) && node.id !== runningId;
            const running = node.id === runningId;
            const touched = done || running;
            return (
              <div
                key={node.id}
                style={{
                  position: 'absolute', left: node.x, top: node.y, width: NODE_W, minHeight: NODE_H,
                  borderRadius: 10, border: `1px solid ${touched ? tone.border : C.border}`,
                  background: touched ? tone.bg : C.card,
                  boxShadow: running ? `0 0 0 3px rgba(97,170,100,0.18)` : '0 1px 2px rgba(0,0,0,0.24)',
                  padding: '8px 10px', opacity: touched ? 1 : 0.55,
                  transition: `opacity ${DUR.panel}ms ${EASE_OUT}, box-shadow ${DUR.panel}ms ${EASE_OUT}, background-color ${DUR.panel}ms ${EASE_OUT}, border-color ${DUR.panel}ms ${EASE_OUT}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                  <Icon size={11} strokeWidth={2.2} color={touched ? tone.color : C.textSubtle} />
                  <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: touched ? tone.color : C.textSubtle }}>
                    {tone.label}
                  </span>
                  {done && <Check size={11} strokeWidth={2.8} color={C.success} style={{ marginLeft: 'auto' }} />}
                  {running && <span className="demo-live-dot" style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: C.success }} />}
                </div>
                <div style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.35, color: touched ? C.text : C.textMuted }}>
                  {node.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
