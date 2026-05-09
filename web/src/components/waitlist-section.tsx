"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

const COLS = 36;
const ROWS = 18;
const CELL_LABELS = [
  "prefs", "context", "recall", "facts", "agents", "search",
  "memory", "graph", "notes", "history", "tasks", "goals",
  "docs", "keys", "sync", "log", "tags", "links",
];

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function noise2d(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;

  const a = seededRandom(ix + iy * 57);
  const b = seededRandom(ix + 1 + iy * 57);
  const c = seededRandom(ix + (iy + 1) * 57);
  const d = seededRandom(ix + 1 + (iy + 1) * 57);

  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);

  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function generateGrid() {
  const cells: { filled: boolean; label?: string; digit?: string }[] = [];
  let labelIdx = 0;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const nx = col / COLS;
      const ny = row / ROWS;

      const gradient = nx * 0.55 + ny * 0.45;
      const n = noise2d(col * 0.15, row * 0.15) * 0.35
              + noise2d(col * 0.08 + 100, row * 0.08 + 100) * 0.2;
      const threshold = gradient + n;

      const filled = threshold < 0.48;

      const nearBoundary = Math.abs(threshold - 0.48) < 0.12;
      let label: string | undefined;
      let digit: string | undefined;

      if (nearBoundary && seededRandom(col * 31 + row * 97) > 0.82) {
        label = CELL_LABELS[labelIdx++ % CELL_LABELS.length];
      } else if (seededRandom(col * 13 + row * 41 + 7) > 0.88) {
        digit = String(Math.floor(seededRandom(col * 7 + row * 23) * 3) + 1);
      }

      cells.push({ filled, label, digit });
    }
  }
  return cells;
}

function InteractiveGrid() {
  const grid = useMemo(() => generateGrid(), []);
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cellW = rect.width / COLS;
    const cellH = rect.height / ROWS;
    const col = Math.floor(x / cellW);
    const row = Math.floor(y / cellH);
    if (col >= 0 && col < COLS && row >= 0 && row < ROWS) {
      setHoveredIdx(row * COLS + col);
    }
  }, []);

  const handleClick = useCallback((idx: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 grid"
      style={{
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIdx(-1)}
    >
      {grid.map((cell, idx) => {
        const row = Math.floor(idx / COLS);
        const col = idx % COLS;

        const isFlipped = flipped.has(idx);
        const isFilled = isFlipped ? !cell.filled : cell.filled;

        let isNearHover = false;
        if (hoveredIdx >= 0) {
          const hRow = Math.floor(hoveredIdx / COLS);
          const hCol = hoveredIdx % COLS;
          const dist = Math.abs(row - hRow) + Math.abs(col - hCol);
          isNearHover = dist <= 2;
        }
        const isHovered = idx === hoveredIdx;

        return (
          <div
            key={idx}
            className="relative border transition-colors duration-200"
            style={{
              backgroundColor: isFilled
                ? isHovered
                  ? "rgba(201,162,39,0.2)"
                  : isNearHover
                    ? "rgba(237,233,224,0.92)"
                    : "rgba(237,233,224,0.88)"
                : isHovered
                  ? "rgba(201,162,39,0.12)"
                  : isNearHover
                    ? "rgba(237,233,224,0.06)"
                    : "transparent",
              borderColor: isFilled
                ? "rgba(237,233,224,0.15)"
                : "rgba(237,233,224,0.04)",
              cursor: "pointer",
            }}
            onClick={() => handleClick(idx)}
          >
            {cell.digit && (
              <span
                className="absolute inset-0 flex items-center justify-center text-[8px] font-light pointer-events-none select-none"
                style={{
                  color: isFilled ? "rgba(17,17,16,0.25)" : "rgba(237,233,224,0.12)",
                }}
              >
                {cell.digit}
              </span>
            )}
            {cell.label && (
              <span
                className="absolute inset-0 flex items-center justify-center text-[6px] tracking-wider uppercase pointer-events-none select-none leading-none"
                style={{
                  color: isFilled ? "rgba(17,17,16,0.3)" : "rgba(201,162,39,0.3)",
                }}
              >
                {cell.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function WaitlistSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section
      id="waitlist"
      className="relative w-full overflow-hidden border-t border-border/20"
      style={{ minHeight: "680px" }}
    >
      {mounted && <InteractiveGrid />}

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-10 md:px-16 lg:px-24 py-24 flex flex-col justify-between min-h-[680px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-md"
        >
          <h2
            className="font-display text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-6"
            style={{ color: "#111110" }}
          >
            Get early
            <br />
            access.
          </h2>
          <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(17,17,16,0.55)" }}>
            Be among the first to give your AI persistent, structured memory.
            <br />
            1 GB free. No credit card required.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3 max-w-xs">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3 rounded-full text-sm focus:outline-none transition-colors"
                style={{
                  backgroundColor: "rgba(17,17,16,0.04)",
                  border: "1px solid rgba(17,17,16,0.12)",
                  color: "#111110",
                }}
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-full text-sm focus:outline-none transition-colors"
                style={{
                  backgroundColor: "rgba(17,17,16,0.04)",
                  border: "1px solid rgba(17,17,16,0.12)",
                  color: "#111110",
                }}
              />
              <button
                type="submit"
                className="w-full px-5 py-3 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  backgroundColor: "#111110",
                  color: "#ede9e0",
                }}
              >
                Join Waitlist
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xs p-5 rounded-xl"
              style={{
                border: "1px solid rgba(201,162,39,0.3)",
                backgroundColor: "rgba(201,162,39,0.08)",
              }}
            >
              <p className="text-accent font-medium text-sm mb-1">You&apos;re in!</p>
              <p className="text-sm" style={{ color: "rgba(17,17,16,0.5)" }}>
                We&apos;ll notify you as soon as MemoX is ready.
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="self-end max-w-xs text-right text-xs leading-relaxed mt-16"
          style={{ color: "rgba(237,233,224,0.4)" }}
        >
          Tell it once. Use it everywhere. A persistent memory layer
          that belongs to you — not one chatbot.
        </motion.p>
      </div>
    </section>
  );
}
