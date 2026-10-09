import { useId, useState } from "react";
import type { CSSProperties } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowRight,
  Expand,
  Pause,
  Play,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { networkParts } from "@/data/lab";

// Seeded positions keep the conceptual network stable across renders.
const clusters = networkParts.map((part, group) => {
  const points = Array.from({ length: 44 }, (_, i) => {
    const angle = i * 2.399963 + group;
    const radius = Math.sqrt((i + 0.5) / 44) * 64;
    return {
      x: part.x + Math.cos(angle) * radius,
      y: part.y + Math.sin(angle) * radius * 0.82,
    };
  });
  return { ...part, points };
});
const links = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 3],
  [0, 5],
  [1, 3],
  [4, 0],
  [2, 4],
];

function NetworkMap({
  selected,
  onSelect,
  paused,
  zoom = 1,
  names = true,
}: {
  selected: number;
  onSelect: (n: number) => void;
  paused: boolean;
  zoom?: number;
  names?: boolean;
}) {
  const haloId = useId();
  return (
    <svg
      viewBox="0 0 820 560"
      className={`nerve-map ${paused ? "is-paused" : ""}`}
      aria-label="Illustrative NERVE network. Select a cluster to learn about its role."
    >
      <defs>
        <radialGradient id={haloId}>
          <stop stopColor="#719dff" stopOpacity=".2" />
          <stop offset="1" stopColor="#719dff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform={`translate(410 280) scale(${zoom}) translate(-410 -280)`}>
        <ellipse cx="410" cy="280" rx="335" ry="245" fill={`url(#${haloId})`} />
        {links.map(([a, b], i) => {
          const p = clusters[a],
            q = clusters[b];
          const d = `M ${p.x} ${p.y} Q ${(p.x + q.x) / 2 + (i % 2 ? 80 : -80)} ${(p.y + q.y) / 2 - 65} ${q.x} ${q.y}`;
          return (
            <g key={i}>
              <path
                d={d}
                fill="none"
                stroke="#698ac4"
                strokeWidth=".7"
                opacity=".26"
              />
              <path
                className="nerve-signal"
                d={d}
                fill="none"
                stroke={p.color}
                strokeWidth="1.8"
                pathLength="100"
                style={{ animationDelay: `${-i * 0.7}s` }}
              />
            </g>
          );
        })}
        {clusters.map((part, group) => (
          <g
            key={part.id}
            className={`nerve-cluster ${selected === group ? "is-selected" : ""}`}
            role="button"
            tabIndex={0}
            aria-label={`Explore ${part.name}`}
            aria-pressed={selected === group}
            onClick={() => onSelect(group)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(group);
              }
            }}
            style={{ "--cluster-color": part.color } as CSSProperties}
          >
            <circle className="cluster-target" cx={part.x} cy={part.y} r="74" />
            {part.points.map((p, i) => (
              <g key={i}>
                {[1, 4, 9].map((offset) => {
                  const q = part.points[(i + offset) % part.points.length];
                  return (
                    <line
                      key={offset}
                      x1={p.x}
                      y1={p.y}
                      x2={q.x}
                      y2={q.y}
                      stroke={part.color}
                      strokeWidth=".6"
                      opacity=".18"
                    />
                  );
                })}
                {i % 7 === 0 && (
                  <circle
                    className="neuron-glow"
                    cx={p.x}
                    cy={p.y}
                    r="7"
                    fill={part.color}
                    opacity=".12"
                  />
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={i % 7 === 0 ? 2.6 : 1.25}
                  fill={part.color}
                  opacity={i % 7 === 0 ? 1 : 0.6}
                />
              </g>
            ))}
            <circle
              className="cluster-ring"
              cx={part.x}
              cy={part.y}
              r="74"
              fill="none"
              stroke={part.color}
              strokeWidth="1"
            />
            {names && (
              <g className="cluster-label">
                <rect
                  x={part.labelX - 83}
                  y={part.labelY - 17}
                  width="166"
                  height="32"
                  rx="9"
                  fill="#0b1528"
                  fillOpacity=".94"
                />
                <text
                  x={part.labelX}
                  y={part.labelY + 4}
                  textAnchor="middle"
                  fill="#dce9ff"
                  fontSize="14"
                >
                  {part.name}
                </text>
              </g>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}

function Explorer({ expanded = false }: { expanded?: boolean }) {
  const [selected, setSelected] = useState(3);
  const [paused, setPaused] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [zoom, setZoom] = useState(1);
  const [names, setNames] = useState(true);
  const part = networkParts[selected];
  const order = [0, 1, 2, 3, 5, 4];
  return (
    <div className={`nerve-explorer ${expanded ? "expanded" : ""}`}>
      <div className="nerve-topbar">
        <span>
          <i className="status-dot" />{" "}
          {expanded
            ? "NERVE / explore connected intelligence"
            : "Adaptive intelligence architecture"}
        </span>
        <button
          className="quiet-button"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}{" "}
          {paused ? "Play" : "Pause"} animation
        </button>
      </div>
      <div className="nerve-heading">
        <h2>
          {expanded
            ? "Specialist agents. Shared learning."
            : "Adaptive intelligence, connected."}
        </h2>
        <p>
          {expanded
            ? "Select a cluster. Explore its role in the learning loop."
            : "Many agents. Shared context. Learning from feedback."}
        </p>
      </div>
      <div className="nerve-body">
        <div className="nerve-map-wrap">
          <NetworkMap
            selected={selected}
            onSelect={setSelected}
            paused={paused}
            zoom={zoom}
            names={names}
          />
        </div>
        {expanded && (
          <aside className="nerve-detail" aria-live="polite">
            <span className="lab-eyebrow">Selected / {part.name}</span>
            <h3>{part.summary}</h3>
            <p>{part.description}</p>
            <div className="nerve-detail-rule" />
            <h4>What this layer contributes</h4>
            <ul>
              {part.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </aside>
        )}
      </div>
      {expanded ? (
        <div className="nerve-controls">
          <div className="nerve-controls-group">
            <button
              className="quiet-button"
              onClick={() => setZoom((z) => Math.max(0.75, z - 0.15))}
              disabled={zoom <= 0.75}
              aria-label="Zoom out"
            >
              <ZoomOut size={17} />
            </button>
            <button
              className="quiet-button"
              onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))}
              disabled={zoom >= 1.6}
              aria-label="Zoom in"
            >
              <ZoomIn size={17} />
            </button>
            <button
              className="quiet-button"
              onClick={() => setNames(!names)}
              aria-pressed={names}
            >
              Names
            </button>
            <button
              className="quiet-button"
              onClick={() => {
                setZoom(1);
                setNames(true);
                setSelected(3);
              }}
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
          <button
            className="lab-button"
            onClick={() => {
              setSelected(order[(order.indexOf(selected) + 1) % order.length]);
              setZoom(1);
            }}
          >
            Trace the learning loop <ArrowRight size={17} />
          </button>
        </div>
      ) : (
        <div className="nerve-preview-bottom">
          <p aria-live="polite">
            <strong>{part.name}</strong>
            <br />
            {part.summary}
          </p>
          <NerveModal />
        </div>
      )}
      <p className="nerve-note">
        Illustrative architecture. Adaptive learning remains a research
        direction.
      </p>
    </div>
  );
}

export function NerveModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="lab-button">
        Explore the NERVE <Expand size={16} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="nerve-overlay" />
        <Dialog.Content className="nerve-modal">
          <Dialog.Title className="sr-only">
            NERVE network explorer
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Explore the proposed adaptive intelligence architecture. Select
            clusters for details, or trace the learning loop.
          </Dialog.Description>
          <Dialog.Close
            className="nerve-close"
            aria-label="Close NERVE explorer"
          >
            <X size={20} />
          </Dialog.Close>
          <Explorer expanded />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function NerveExplorer({ expanded = false }: { expanded?: boolean }) {
  return <Explorer expanded={expanded} />;
}
