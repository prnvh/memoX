"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { getSupabase } from "@/lib/supabase";

const CELL_SIZE = 32;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function noise(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = seededRandom(ix + iy * 57);
  const b = seededRandom(ix + 1 + iy * 57);
  const c = seededRandom(ix + (iy + 1) * 57);
  const d = seededRandom(ix + 1 + (iy + 1) * 57);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function buildGrid(cols: number, rows: number) {
  const cells: boolean[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const nx = c / cols;
      const ny = r / rows;
      const grad = nx * 0.52 + ny * 0.48;
      const n1 = noise(c * 0.14, r * 0.14) * 0.28;
      const n2 = noise(c * 0.07 + 80, r * 0.07 + 80) * 0.15;
      cells.push(grad + n1 + n2 < 0.46);
    }
  }
  return cells;
}

function GridCanvas({ cols, rows }: { cols: number; rows: number }) {
  const cells = useMemo(() => buildGrid(cols, rows), [cols, rows]);
  const [hovered, setHovered] = useState(-1);
  const [flipped, setFlipped] = useState<Set<number>>(() => new Set());
  const gridRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = gridRef.current?.getBoundingClientRect();
      if (!rect) return;
      const c = Math.floor((e.clientX - rect.left) / CELL_SIZE);
      const r = Math.floor((e.clientY - rect.top) / CELL_SIZE);
      const idx = r * cols + c;
      if (idx >= 0 && idx < cells.length && c < cols && r < rows) setHovered(idx);
    },
    [cols, rows, cells.length]
  );

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      const rect = gridRef.current?.getBoundingClientRect();
      if (!rect) return;
      const c = Math.floor((e.clientX - rect.left) / CELL_SIZE);
      const r = Math.floor((e.clientY - rect.top) / CELL_SIZE);
      const idx = r * cols + c;
      if (idx >= 0 && idx < cells.length) {
        setFlipped((prev) => {
          const next = new Set(prev);
          if (next.has(idx)) next.delete(idx);
          else next.add(idx);
          return next;
        });
      }
    },
    [cols, cells.length]
  );

  return (
    <div
      ref={gridRef}
      className="absolute inset-0 cursor-pointer"
      onMouseMove={onMove}
      onMouseLeave={() => setHovered(-1)}
      onClick={onClick}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${CELL_SIZE}px)`,
        gridTemplateRows: `repeat(${rows}, ${CELL_SIZE}px)`,
      }}
    >
      {cells.map((filled, idx) => {
        const r = Math.floor(idx / cols);
        const c = idx % cols;
        const isFlipped = flipped.has(idx);
        const show = isFlipped ? !filled : filled;

        let near = false;
        if (hovered >= 0) {
          const hr = Math.floor(hovered / cols);
          const hc = hovered % cols;
          near = Math.abs(r - hr) + Math.abs(c - hc) <= 2;
        }
        const isH = idx === hovered;

        const hasDigit =
          seededRandom(c * 13 + r * 41 + 7) > 0.91 ? String(Math.floor(seededRandom(c * 7 + r * 23) * 3) + 1) : null;

        return (
          <div
            key={idx}
            className="relative transition-colors duration-150"
            style={{
              backgroundColor: show
                ? isH
                  ? "rgba(201,162,39,0.22)"
                  : near
                    ? "rgba(237,233,224,0.94)"
                    : "rgba(237,233,224,0.9)"
                : isH
                  ? "rgba(201,162,39,0.08)"
                  : near
                    ? "rgba(255,255,255,0.03)"
                    : "transparent",
              outline: `1px solid ${show ? "rgba(200,196,186,0.18)" : "rgba(255,255,255,0.04)"}`,
            }}
          >
            {hasDigit && (
              <span
                className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                style={{
                  fontSize: 9,
                  fontWeight: 300,
                  color: show ? "rgba(17,17,16,0.18)" : "rgba(255,255,255,0.08)",
                }}
              >
                {hasDigit}
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dims, setDims] = useState({ cols: 0, rows: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function calc() {
      if (!sectionRef.current) return;
      const { width, height } = sectionRef.current.getBoundingClientRect();
      setDims({
        cols: Math.ceil(width / CELL_SIZE),
        rows: Math.ceil(height / CELL_SIZE),
      });
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    const { error: dbError } = await getSupabase()
      .from("waitlist")
      .insert({ name: name || null, email });

    setLoading(false);

    if (dbError) {
      if (dbError.code === "23505") {
        setError("You're already on the list!");
      } else {
        setError("Something went wrong. Please try again.");
      }
      return;
    }

    setSubmitted(true);
  }

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="relative w-full overflow-hidden border-t border-border/20"
      style={{ height: "clamp(580px, 65vh, 740px)" }}
    >
      {dims.cols > 0 && <GridCanvas cols={dims.cols} rows={dims.rows} />}

      {/* Form — top-left, on the light side */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full max-w-[1400px] mx-auto px-10 md:px-16 lg:px-24 py-14 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="max-w-sm pointer-events-auto"
          >
            <h2
              className="font-display text-[2.6rem] md:text-5xl font-medium leading-[1.08] tracking-tight mb-5"
              style={{ color: "#111110" }}
            >
              Get early
              <br />
              access.
            </h2>
            <p className="text-[13px] leading-relaxed mb-8 max-w-[280px]" style={{ color: "rgba(17,17,16,0.5)" }}>
              Be among the first to give your AI persistent, structured memory. 1 GB free. No credit card.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-2.5 max-w-[260px]">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full text-[13px] focus:outline-none"
                  style={{ backgroundColor: "rgba(17,17,16,0.04)", border: "1px solid rgba(17,17,16,0.1)", color: "#111110" }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full text-[13px] focus:outline-none"
                  style={{ backgroundColor: "rgba(17,17,16,0.04)", border: "1px solid rgba(17,17,16,0.1)", color: "#111110" }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-full text-[13px] font-medium transition-opacity disabled:opacity-60"
                  style={{ backgroundColor: "#111110", color: "#ede9e0" }}
                >
                  {loading ? "Joining..." : "Join Waitlist"}
                </button>
                {error && (
                  <p className="text-[12px] text-center pt-1" style={{ color: "rgba(17,17,16,0.55)" }}>
                    {error}
                  </p>
                )}
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-[260px] p-4 rounded-xl"
                style={{ border: "1px solid rgba(201,162,39,0.3)", backgroundColor: "rgba(201,162,39,0.1)" }}
              >
                <p className="font-medium text-sm mb-0.5" style={{ color: "#111110" }}>You&apos;re in!</p>
                <p className="text-xs" style={{ color: "rgba(17,17,16,0.5)" }}>We&apos;ll reach out when MemoX is ready.</p>
              </motion.div>
            )}
          </motion.div>

          {/* Tagline — bottom-right, on the dark side */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="self-end max-w-[240px] text-right text-[11px] leading-relaxed pointer-events-none"
            style={{ color: "rgba(237,233,224,0.3)" }}
          >
            Tell it once. Use it everywhere. A persistent memory layer that belongs to you — not one chatbot.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
