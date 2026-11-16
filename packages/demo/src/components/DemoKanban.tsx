'use client';

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { MessageCircle, Zap, Clock } from 'lucide-react';
import { TROOPER_DEMO as C, KANBAN_COLUMNS, type DemoColumnId } from './demoTheme';
import type { DemoKanbanTask, DemoTaskPriority, DemoTaskProgress } from '../scenarios/types';
import { DUR, EASE_OUT } from '../lib/demoMotion';
import { CastAvatarDisc } from '../lib/CastAvatarDisc';

/**
 * Board surfaces ported from the Trooper app so the marketing replica is the
 * same component, not a lookalike.
 *
 * Sources: `src/components/TaskCard.jsx`, `src/components/KanbanColumn.jsx`,
 * and the DragOverlay in `src/components/KanbanBoard.jsx`.
 */

export const DEMO_KANBAN_COL_W = 200; // showcase board pane is tighter than full desktop
export const DEMO_KANBAN_GAP = 6;

/** TaskCard.jsx `priorityDots` */
const PRIORITY_DOT: Record<DemoTaskPriority, string> = {
  urgent: C.danger,
  high: '#fb923c', // orange-400
  medium: '#facc15', // yellow-400
  low: C.border,
};

/**
 * Stable stand-ins for `formatDistanceToNow(task.createdAt)`. The demo has no
 * real timestamps, and `Date.now()` would make SSR and hydration disagree.
 */
const AGE_LABELS = [
  '6 minutes', 'about 1 hour', '22 minutes', 'about 3 hours', '2 days',
  '41 minutes', 'about 2 hours', '1 day', '9 minutes', 'about 5 hours',
];

const PRIORITY_CYCLE: DemoTaskPriority[] = ['high', 'medium', 'low', 'medium', 'low', 'high'];

export type DemoTaskCardModel = {
  priority: DemoTaskPriority;
  assignee: string | null;
  age: string;
  progress: DemoTaskProgress | null;
  linkedProject?: string;
  linkedGoal?: string;
  artifactCount: number;
  comments: number;
};

/** Fills in the app-card fields a scenario didn't specify, deterministically. */
export function resolveTaskCardModel(task: DemoKanbanTask): DemoTaskCardModel {
  const seed = Math.abs(task.id);
  return {
    priority: task.priority ?? PRIORITY_CYCLE[seed % PRIORITY_CYCLE.length],
    assignee: task.assignee ?? task.watchers[0] ?? null,
    age: task.age ?? AGE_LABELS[seed % AGE_LABELS.length],
    progress: task.progress ?? null,
    linkedProject: task.linkedProject,
    linkedGoal: task.linkedGoal,
    artifactCount: task.artifactCount ?? 0,
    comments: task.comments,
  };
}

function Avatar({ name, src, size = 20 }: { name: string; src?: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const initial = name.charAt(0).toUpperCase() || '?';
  if (src && !failed && src.includes('/images/cast/')) {
    return (
      <span title={`Assigned to ${name}`}>
        <CastAvatarDisc src={src} size={size} alt={name} />
      </span>
    );
  }
  return (
    <div
      title={`Assigned to ${name}`}
      style={{
        position: 'relative', width: size, height: size, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', borderRadius: Math.max(6, Math.round(size * 0.28)), border: `1px solid ${C.border}`,
        background: C.brand, color: C.brandForeground, fontSize: 9, fontWeight: 500,
      }}
    >
      {initial}
      {src && !failed && (
        <img
          src={src}
          alt={name}
          onError={() => setFailed(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
    </div>
  );
}

function ContextChip({ label, bg, color, ring }: { label: string; bg: string; color: string; ring?: string }) {
  return (
    <span style={{
      borderRadius: 4, padding: '1px 6px', fontSize: 10, fontWeight: 500,
      background: bg, color, maxWidth: 140, overflow: 'hidden',
      textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      boxShadow: ring ? `inset 0 0 0 1px ${ring}` : undefined,
    }}>
      {label}
    </span>
  );
}

export type DemoTaskCardProps = {
  task: DemoKanbanTask;
  avatarFor: (name: string) => string | undefined;
  /** Spotlight ring for the task the script is walking through. */
  highlighted?: boolean;
  /** Source placeholder while this card is in flight. */
  ghosted?: boolean;
  /** Rendered inside the drag overlay — the app's lifted look. */
  lifted?: boolean;
  interactive?: boolean;
  onOpen?: (task: DemoKanbanTask) => void;
  onDragStart?: (task: DemoKanbanTask, event: ReactPointerEvent<HTMLDivElement>) => void;
};

export function DemoTaskCard({
  task, avatarFor, highlighted, ghosted, lifted, interactive, onOpen, onDragStart,
}: DemoTaskCardProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const model = resolveTaskCardModel(task);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  // TaskCard.jsx: hover:border-stone-300/55 hover:shadow-sm, active:bg-stone-100/85
  const hoverish = interactive && hovered && !ghosted;
  const border = highlighted ? C.brand : hoverish ? 'rgba(255,255,255,0.18)' : C.border;
  const shadow = lifted
    ? '0 12px 28px -8px rgba(0,0,0,0.62), 0 3px 10px rgba(0,0,0,0.35)'
    : highlighted
      ? `inset 0 0 0 1px rgba(230,230,230,0.18), 0 4px 18px rgba(0,0,0,0.22)`
      : hoverish
        ? '0 4px 14px rgba(0,0,0,0.24)'
        : 'none';

  const style: CSSProperties = {
    display: 'flex', flexDirection: 'column',
    borderRadius: 8, border: `1px solid ${border}`,
    background: pressed && interactive ? '#313131' : C.card,
    padding: 10,
    boxShadow: shadow,
    cursor: interactive ? (lifted ? 'grabbing' : 'pointer') : 'default',
    userSelect: 'none',
    opacity: ghosted ? 0.45 : 1,
    transform: lifted ? 'scale(1.05) rotate(1deg)' : undefined,
    transition: `border-color ${DUR.hover}ms ${EASE_OUT}, box-shadow ${DUR.hover}ms ${EASE_OUT}, background-color ${DUR.hover}ms ${EASE_OUT}, opacity ${DUR.hover}ms ${EASE_OUT}`,
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    pointerStart.current = { x: e.clientX, y: e.clientY };
    setPressed(true);
    onDragStart?.(task, e);
  };

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    setPressed(false);
    if (!interactive) return;
    const start = pointerStart.current;
    pointerStart.current = null;
    // TaskCard.jsx treats >5px of travel as a drag, not a click.
    if (start && (Math.abs(e.clientX - start.x) > 5 || Math.abs(e.clientY - start.y) > 5)) return;
    onOpen?.(task);
  };

  return (
    <div
      data-demo-target="task-card"
      data-task-id={task.id}
      style={style}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => { setHovered(false); setPressed(false); }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Title + priority — TaskCard.jsx:109 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
        <span
          title={model.priority}
          style={{ width: 6, height: 6, borderRadius: '50%', marginTop: 6, flexShrink: 0, background: PRIORITY_DOT[model.priority] }}
        />
        <h4 style={{
          minWidth: 0, flex: 1, margin: 0, fontSize: 14, fontWeight: 500, lineHeight: 1.375, color: C.text,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {task.title}
        </h4>
        {model.priority === 'urgent' && (
          <span style={{
            display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0,
            padding: '1px 5px', borderRadius: 4, fontSize: 10, fontWeight: 500,
            background: C.successTint, color: C.success,
          }}>
            <Zap size={11} strokeWidth={2} />
            URGENT
          </span>
        )}
        {model.priority === 'high' && (
          <span style={{
            display: 'flex', alignItems: 'center', flexShrink: 0,
            padding: '1px 5px', borderRadius: 4, background: 'rgba(217,154,71,0.14)', color: '#E9C48F',
          }}>
            <Zap size={11} strokeWidth={2} />
          </span>
        )}
      </div>

      {/* Execution progress intentionally omitted — keep cards clean. */}

      {/* Context links — TaskCard.jsx:167 */}
      {(model.linkedProject || model.linkedGoal || model.artifactCount > 0) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
          {model.linkedProject && <ContextChip label={model.linkedProject} bg="rgba(96,165,250,0.14)" color="#A9CCFF" />}
          {model.linkedGoal && <ContextChip label={model.linkedGoal} bg={C.brandTint} color="#9ACD9C" />}
          {model.artifactCount > 0 && (
            <ContextChip
              label={`${model.artifactCount} output${model.artifactCount === 1 ? '' : 's'}`}
              bg={C.brandLight}
              color={C.textMuted}
              ring="rgba(255,255,255,0.08)"
            />
          )}
        </div>
      )}

      {/* Footer — TaskCard.jsx:188 */}
      <div style={{
        marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: `1px solid ${C.border}`, paddingTop: 6,
      }}>
        <div style={{ display: 'flex', minWidth: 0, alignItems: 'center', gap: 8 }}>
          {model.comments > 0 && (
            <span style={{ display: 'flex', flexShrink: 0, alignItems: 'center', gap: 2, fontSize: 11, color: C.textMuted }}>
              <MessageCircle size={12} strokeWidth={1.75} />
              {model.comments}
            </span>
          )}
          <p style={{
            margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            fontSize: 11, fontWeight: 500, color: C.textMuted,
          }}>
            {model.age}
          </p>
        </div>
        <div style={{ display: 'flex', flexShrink: 0, alignItems: 'center', gap: 6 }}>
          <span style={{
            maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            fontSize: 11, fontWeight: 500, color: C.text,
          }}>
            {model.assignee ?? 'Unassigned'}
          </span>
          {model.assignee && <Avatar name={model.assignee} src={avatarFor(model.assignee)} />}
        </div>
      </div>
    </div>
  );
}

/** Count badge that visibly ticks when tasks arrive or leave. */
function ColumnCount({ count }: { count: number }) {
  const [bump, setBump] = useState(0);
  const prev = useRef(count);

  useEffect(() => {
    if (prev.current !== count) {
      prev.current = count;
      setBump((n) => n + 1);
    }
  }, [count]);

  return (
    <span
      key={bump}
      className={bump ? 'demo-count-bump' : undefined}
      style={{
        borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: C.textMuted, padding: '2px 6px',
        fontSize: 11, fontWeight: 500, fontVariantNumeric: 'tabular-nums',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)', display: 'inline-block',
      }}
    >
      {count}
    </span>
  );
}

export type DemoKanbanColumnProps = {
  colKey: DemoColumnId;
  tasks: DemoKanbanTask[];
  avatarFor: (name: string) => string | undefined;
  highlightedTaskId?: number | null;
  /** Card currently in flight out of / into this column. */
  draggingTaskId?: number | null;
  isOver?: boolean;
  interactive?: boolean;
  onOpenTask?: (task: DemoKanbanTask) => void;
  onDragStart?: (task: DemoKanbanTask, event: ReactPointerEvent<HTMLDivElement>) => void;
};

export function DemoKanbanColumn({
  colKey, tasks, avatarFor, highlightedTaskId, draggingTaskId, isOver, interactive, onOpenTask, onDragStart,
}: DemoKanbanColumnProps) {
  const col = KANBAN_COLUMNS[colKey];

  return (
    <div
      data-demo-target={`kanban-${colKey}`}
      style={{
        width: DEMO_KANBAN_COL_W, minWidth: DEMO_KANBAN_COL_W, flexShrink: 0,
        display: 'flex', flexDirection: 'column', height: '100%',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px', borderRadius: 8, marginBottom: 4,
        background: col.headerBg, color: col.headerText, userSelect: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>{col.emoji}</span>
          <h3 style={{ margin: 0, fontSize: 13, lineHeight: '20px', fontWeight: 600, whiteSpace: 'nowrap' }}>{col.label}</h3>
        </div>
        <ColumnCount count={tasks.length} />
      </div>

      {/* KanbanColumn.jsx:33 — droppable body with a live `isOver` state */}
      <div
        data-demo-target={`kanban-body-${colKey}`}
        className="Trooper-scrollbar"
        style={{
          minHeight: 0, flex: 1, overflowY: 'auto', borderRadius: 8, padding: 8,
          border: `1px solid ${isOver ? 'rgba(255,255,255,0.18)' : 'transparent'}`,
          background: isOver ? 'rgba(255,255,255,0.055)' : col.bodyBg,
          transition: `background-color ${DUR.hover}ms ${EASE_OUT}, border-color ${DUR.hover}ms ${EASE_OUT}`,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {tasks.map((task) => (
            <div key={task.id} className="demo-enter">
              <DemoTaskCard
                task={task}
                avatarFor={avatarFor}
                highlighted={highlightedTaskId === task.id}
                ghosted={draggingTaskId === task.id}
                interactive={interactive}
                onOpen={onOpenTask}
                onDragStart={onDragStart}
              />
            </div>
          ))}
          {tasks.length === 0 && (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              borderRadius: 8, border: `1px dashed rgba(255,255,255,0.18)`, background: 'rgba(36,36,36,0.72)',
              padding: '16px 8px', textAlign: 'center',
            }}>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 500, color: C.textMuted, userSelect: 'none' }}>Nothing here yet</p>
              <p style={{ margin: '2px 0 0', padding: '0 8px', fontSize: 10, lineHeight: 1.375, color: 'rgba(179,179,179,0.8)', userSelect: 'none' }}>
                Drop a task here or add one with +
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** The app's `<DragOverlay>` — a lifted copy of the card that follows the pointer. */
export function DemoDragOverlay({
  task, x, y, width, avatarFor, animateMs,
}: {
  task: DemoKanbanTask;
  x: number;
  y: number;
  width: number;
  avatarFor: (name: string) => string | undefined;
  animateMs: number;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute', left: x, top: y, width, zIndex: 190, pointerEvents: 'none',
        transition: animateMs > 0 ? `left ${animateMs}ms ${EASE_OUT}, top ${animateMs}ms ${EASE_OUT}` : undefined,
      }}
    >
      <DemoTaskCard task={task} avatarFor={avatarFor} lifted />
    </div>
  );
}
