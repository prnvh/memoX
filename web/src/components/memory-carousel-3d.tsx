"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const CARDS = [
  {
    title: "Total Recall",
    description:
      "Your AI picks up right where you left off — remembering your context, preferences, and past decisions.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="14" r="6" stroke="rgba(201,162,39,0.6)" strokeWidth="1.5" fill="rgba(201,162,39,0.08)" />
        <path d="M12 38c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="rgba(201,162,39,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M30 14h8M38 10v8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "One Memory, Every Agent",
    description:
      "Use any AI tool you want. Your memory travels with you — not locked into a single chatbot.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="4" y="8" width="14" height="14" rx="3" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" />
        <rect x="30" y="8" width="14" height="14" rx="3" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" />
        <rect x="17" y="28" width="14" height="14" rx="3" stroke="rgba(201,162,39,0.5)" strokeWidth="1.5" fill="rgba(201,162,39,0.08)" />
        <path d="M11 22v4a3 3 0 003 3h3M37 22v4a3 3 0 01-3 3h-3" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Ask Anything",
    description:
      "Search your memory naturally. Ask \"What did we decide last week?\" and get a real answer.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="22" cy="22" r="10" stroke="rgba(201,162,39,0.5)" strokeWidth="1.5" fill="rgba(201,162,39,0.06)" />
        <path d="M30 30l8 8" stroke="rgba(201,162,39,0.5)" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 20h8M18 24h5" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "You Own Your Data",
    description:
      "Your memory is yours. Export it, delete it, control who accesses it. Full data sovereignty.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="12" y="6" width="24" height="30" rx="3" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" />
        <path d="M18 14h12M18 20h12M18 26h8" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="40" r="4" stroke="rgba(201,162,39,0.5)" strokeWidth="1.5" fill="rgba(201,162,39,0.1)" />
        <path d="M24 36v-2" stroke="rgba(201,162,39,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Smarter Over Time",
    description:
      "The more you use it, the better it gets. Your AI learns your patterns and adapts to you.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M8 36l8-10 6 6 8-14 10 12" stroke="rgba(201,162,39,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="8" cy="36" r="2.5" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <circle cx="40" cy="30" r="2.5" fill="rgba(201,162,39,0.2)" stroke="rgba(201,162,39,0.5)" strokeWidth="1" />
      </svg>
    ),
  },
  {
    title: "Private & Secure",
    description:
      "Enterprise-grade security. Every access logged, every change auditable and reversible.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="14" y="20" width="20" height="18" rx="3" stroke="rgba(201,162,39,0.5)" strokeWidth="1.5" fill="rgba(201,162,39,0.06)" />
        <path d="M18 20v-6a6 6 0 0112 0v6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="24" cy="30" r="2.5" fill="rgba(201,162,39,0.4)" />
      </svg>
    ),
  },
];

export function MemoryCarousel3D({ className = "" }: { className?: string }) {
  const count = CARDS.length;
  const angleStep = 360 / count;
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const animRef = useRef<number>(0);

  const startDrag = useCallback((clientX: number) => {
    isDragging.current = true;
    lastX.current = clientX;
    velocity.current = 0;
    cancelAnimationFrame(animRef.current);
  }, []);

  const onDrag = useCallback((clientX: number) => {
    if (!isDragging.current) return;
    const dx = clientX - lastX.current;
    lastX.current = clientX;
    velocity.current = dx * 0.3;
    setRotation((r) => r + dx * 0.3);
  }, []);

  const endDrag = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const decelerate = () => {
      velocity.current *= 0.95;
      if (Math.abs(velocity.current) > 0.05) {
        setRotation((r) => r + velocity.current);
        animRef.current = requestAnimationFrame(decelerate);
      }
    };
    animRef.current = requestAnimationFrame(decelerate);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => { e.preventDefault(); startDrag(e.clientX); };
    const onMouseMove = (e: MouseEvent) => onDrag(e.clientX);
    const onMouseUp = () => endDrag();
    const onTouchStart = (e: TouchEvent) => startDrag(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => onDrag(e.touches[0].clientX);
    const onTouchEnd = () => endDrag();

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(animRef.current);
    };
  }, [startDrag, onDrag, endDrag]);

  useEffect(() => {
    if (isDragging.current) return;
    const autoRotate = setInterval(() => {
      if (!isDragging.current) {
        setRotation((r) => r - 0.15);
      }
    }, 16);
    return () => clearInterval(autoRotate);
  }, []);

  const radius = 320;

  return (
    <div className={`${className} select-none`} ref={containerRef} style={{ cursor: "grab" }}>
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative"
          style={{
            width: "240px",
            height: "300px",
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging.current ? "none" : undefined,
          }}
        >
          {CARDS.map((card, i) => {
            const angle = i * angleStep;
            return (
              <motion.div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="w-[220px] rounded-2xl border border-white/[0.1] bg-[#161513]/95 backdrop-blur-sm p-7 flex flex-col items-center text-center gap-4"
                  style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
                >
                  <div className="mb-1">{card.icon}</div>
                  <h3
                    className="text-white/90 font-medium text-[15px] leading-snug"
                    style={{ fontFamily: "Newsreader, serif" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-white/40 text-xs leading-relaxed"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
