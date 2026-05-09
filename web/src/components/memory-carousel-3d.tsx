"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";

interface CardData {
  title: string;
  description: string;
  detail: string;
  icon: ReactNode;
  visual: ReactNode;
}

const CARDS: CardData[] = [
  {
    title: "Tell it once. Use it everywhere.",
    description:
      "Your preferences, decisions, and context carry across every conversation — no repeating yourself.",
    detail: "Persistent context",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="8" r="3.5" stroke="rgba(201,162,39,0.7)" strokeWidth="1.2" />
        <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="rgba(201,162,39,0.5)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    visual: (
      <div className="w-full h-full rounded-xl bg-gradient-to-br from-accent/[0.12] to-accent/[0.03] flex items-center justify-center">
        <svg viewBox="0 0 120 80" fill="none" className="w-4/5 opacity-60">
          <rect x="10" y="10" width="40" height="24" rx="4" stroke="rgba(201,162,39,0.4)" strokeWidth="1" fill="rgba(201,162,39,0.06)" />
          <rect x="60" y="10" width="50" height="10" rx="2" fill="rgba(255,255,255,0.06)" />
          <rect x="60" y="24" width="35" height="10" rx="2" fill="rgba(255,255,255,0.04)" />
          <path d="M30 34v12" stroke="rgba(201,162,39,0.3)" strokeWidth="1" strokeDasharray="2 2" />
          <rect x="10" y="46" width="40" height="24" rx="4" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.03)" />
          <rect x="60" y="46" width="50" height="10" rx="2" fill="rgba(255,255,255,0.06)" />
          <rect x="60" y="60" width="40" height="10" rx="2" fill="rgba(255,255,255,0.04)" />
          <circle cx="105" cy="22" r="6" stroke="rgba(201,162,39,0.4)" strokeWidth="1" fill="rgba(201,162,39,0.08)" />
          <path d="M103 22l2 2 4-4" stroke="rgba(201,162,39,0.5)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
  },
  {
    title: "One memory for every AI you use.",
    description:
      "Works with ChatGPT, Claude, Gemini, Cursor, and your own agents. Your memory moves with you.",
    detail: "Multi-platform",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="2" y="4" width="7" height="7" rx="1.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
        <rect x="15" y="4" width="7" height="7" rx="1.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
        <rect x="8.5" y="14" width="7" height="7" rx="1.5" stroke="rgba(201,162,39,0.6)" strokeWidth="1.2" />
        <path d="M5.5 11v2a1.5 1.5 0 001.5 1.5h1M18.5 11v2a1.5 1.5 0 01-1.5 1.5h-1" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    visual: (
      <div className="w-full h-full rounded-xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] flex items-center justify-center">
        <svg viewBox="0 0 120 80" fill="none" className="w-4/5 opacity-60">
          <rect x="8" y="12" width="30" height="22" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="rgba(255,255,255,0.03)" />
          <text x="23" y="26" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6" fontFamily="Inter,sans-serif">GPT</text>
          <rect x="45" y="12" width="30" height="22" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="rgba(255,255,255,0.03)" />
          <text x="60" y="26" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6" fontFamily="Inter,sans-serif">Claude</text>
          <rect x="82" y="12" width="30" height="22" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="rgba(255,255,255,0.03)" />
          <text x="97" y="26" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6" fontFamily="Inter,sans-serif">Cursor</text>
          <path d="M23 34v8M60 34v8M97 34v8" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 2" />
          <rect x="30" y="48" width="60" height="22" rx="6" stroke="rgba(201,162,39,0.4)" strokeWidth="1" fill="rgba(201,162,39,0.06)" />
          <text x="60" y="62" textAnchor="middle" fill="rgba(201,162,39,0.5)" fontSize="7" fontFamily="Inter,sans-serif">MemoX</text>
          <path d="M23 42l17 10M60 42v6M97 42l-17 10" stroke="rgba(201,162,39,0.25)" strokeWidth="1" />
        </svg>
      </div>
    ),
  },
  {
    title: "No more context documents.",
    description:
      "Stop pasting the same setup prompts. MemoX gives your AI the context it needs automatically.",
    detail: "Zero setup",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="5" y="3" width="14" height="18" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
        <path d="M9 8h6M9 11h6M9 14h4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="4" y1="4" x2="20" y2="20" stroke="rgba(201,162,39,0.5)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    visual: (
      <div className="w-full h-full rounded-xl bg-gradient-to-br from-accent/[0.08] to-transparent flex items-center justify-center">
        <svg viewBox="0 0 120 80" fill="none" className="w-4/5 opacity-60">
          <rect x="15" y="8" width="50" height="64" rx="4" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
          <rect x="22" y="16" width="36" height="4" rx="1" fill="rgba(255,255,255,0.08)" />
          <rect x="22" y="24" width="28" height="4" rx="1" fill="rgba(255,255,255,0.06)" />
          <rect x="22" y="32" width="36" height="4" rx="1" fill="rgba(255,255,255,0.05)" />
          <rect x="22" y="40" width="20" height="4" rx="1" fill="rgba(255,255,255,0.04)" />
          <line x1="12" y1="5" x2="68" y2="75" stroke="rgba(201,162,39,0.35)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M80 30l12 12M80 42l12-12" stroke="rgba(201,162,39,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          <text x="92" y="60" fill="rgba(201,162,39,0.4)" fontSize="7" fontFamily="Inter,sans-serif">auto</text>
        </svg>
      </div>
    ),
  },
  {
    title: "A memory you can see, edit, and delete.",
    description:
      "It's not a black box. Browse your memory, correct mistakes, remove what you don't want kept.",
    detail: "Full transparency",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="12" r="8" stroke="rgba(201,162,39,0.5)" strokeWidth="1.2" />
        <path d="M9 12l2 2 4-4" stroke="rgba(201,162,39,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    visual: (
      <div className="w-full h-full rounded-xl bg-gradient-to-br from-accent/[0.06] to-white/[0.02] flex items-center justify-center">
        <svg viewBox="0 0 120 80" fill="none" className="w-4/5 opacity-60">
          <rect x="10" y="8" width="100" height="16" rx="3" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="rgba(255,255,255,0.03)" />
          <rect x="16" y="13" width="20" height="6" rx="1" fill="rgba(201,162,39,0.15)" />
          <rect x="40" y="13" width="40" height="6" rx="1" fill="rgba(255,255,255,0.06)" />
          <circle cx="96" cy="16" r="4" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <rect x="10" y="30" width="100" height="16" rx="3" stroke="rgba(201,162,39,0.2)" strokeWidth="1" fill="rgba(201,162,39,0.04)" />
          <rect x="16" y="35" width="24" height="6" rx="1" fill="rgba(201,162,39,0.12)" />
          <rect x="44" y="35" width="50" height="6" rx="1" fill="rgba(255,255,255,0.06)" />
          <path d="M94 36l4 4-4 4" stroke="rgba(201,162,39,0.4)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="10" y="52" width="100" height="16" rx="3" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
          <rect x="16" y="57" width="16" height="6" rx="1" fill="rgba(255,255,255,0.06)" />
          <rect x="36" y="57" width="34" height="6" rx="1" fill="rgba(255,255,255,0.04)" />
        </svg>
      </div>
    ),
  },
  {
    title: "Turn old conversations into memory.",
    description:
      "Past chats aren't wasted. MemoX extracts the important parts and saves them for next time.",
    detail: "Conversation mining",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M4 18l4-5 3 3 4-7 5 6" stroke="rgba(201,162,39,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="18" r="1.5" fill="rgba(255,255,255,0.2)" />
        <circle cx="20" cy="15" r="1.5" fill="rgba(201,162,39,0.3)" />
      </svg>
    ),
    visual: (
      <div className="w-full h-full rounded-xl bg-gradient-to-br from-white/[0.05] to-accent/[0.04] flex items-center justify-center">
        <svg viewBox="0 0 120 80" fill="none" className="w-4/5 opacity-60">
          <rect x="8" y="8" width="45" height="64" rx="4" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
          <rect x="14" y="14" width="33" height="4" rx="1" fill="rgba(255,255,255,0.08)" />
          <rect x="14" y="22" width="24" height="4" rx="1" fill="rgba(255,255,255,0.05)" />
          <rect x="14" y="30" width="33" height="4" rx="1" fill="rgba(255,255,255,0.06)" />
          <rect x="14" y="38" width="18" height="4" rx="1" fill="rgba(255,255,255,0.04)" />
          <rect x="14" y="46" width="30" height="4" rx="1" fill="rgba(255,255,255,0.05)" />
          <path d="M58 40h10" stroke="rgba(201,162,39,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M65 37l3 3-3 3" stroke="rgba(201,162,39,0.4)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="72" y="20" width="40" height="40" rx="6" stroke="rgba(201,162,39,0.3)" strokeWidth="1" fill="rgba(201,162,39,0.04)" />
          <circle cx="82" cy="34" r="3" fill="rgba(201,162,39,0.15)" stroke="rgba(201,162,39,0.3)" strokeWidth="1" />
          <circle cx="92" cy="40" r="5" fill="rgba(201,162,39,0.1)" stroke="rgba(201,162,39,0.25)" strokeWidth="1" />
          <circle cx="102" cy="34" r="2.5" fill="rgba(201,162,39,0.1)" stroke="rgba(201,162,39,0.2)" strokeWidth="1" />
          <line x1="82" y1="34" x2="92" y2="40" stroke="rgba(201,162,39,0.2)" strokeWidth="1" />
          <line x1="92" y1="40" x2="102" y2="34" stroke="rgba(201,162,39,0.2)" strokeWidth="1" />
          <text x="92" y="55" textAnchor="middle" fill="rgba(201,162,39,0.35)" fontSize="5" fontFamily="Inter,sans-serif">extracted</text>
        </svg>
      </div>
    ),
  },
  {
    title: "Private by default. Controlled by you.",
    description:
      "Your data stays yours. See who accessed what, export anytime, delete anything — no questions asked.",
    detail: "Data sovereignty",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="7" y="10" width="10" height="9" rx="1.5" stroke="rgba(201,162,39,0.6)" strokeWidth="1.2" />
        <path d="M9 10V8a3 3 0 016 0v2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="12" cy="15" r="1.2" fill="rgba(201,162,39,0.5)" />
      </svg>
    ),
    visual: (
      <div className="w-full h-full rounded-xl bg-gradient-to-br from-accent/[0.1] to-accent/[0.02] flex items-center justify-center">
        <svg viewBox="0 0 120 80" fill="none" className="w-4/5 opacity-60">
          <rect x="30" y="30" width="60" height="40" rx="5" stroke="rgba(201,162,39,0.3)" strokeWidth="1" fill="rgba(201,162,39,0.04)" />
          <path d="M42 30V22a18 18 0 0136 0v8" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <circle cx="60" cy="50" r="6" fill="rgba(201,162,39,0.12)" stroke="rgba(201,162,39,0.35)" strokeWidth="1" />
          <circle cx="60" cy="50" r="2" fill="rgba(201,162,39,0.4)" />
          <rect x="10" y="8" width="16" height="8" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <text x="18" y="14" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="4" fontFamily="Inter,sans-serif">export</text>
          <rect x="94" y="8" width="16" height="8" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <text x="102" y="14" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="4" fontFamily="Inter,sans-serif">delete</text>
        </svg>
      </div>
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
        setRotation((r) => r - 0.08);
      }
    }, 16);
    return () => clearInterval(autoRotate);
  }, []);

  const radius = 380;

  return (
    <div className={`${className} select-none`} ref={containerRef} style={{ cursor: "grab" }}>
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative"
          style={{
            width: "300px",
            height: "420px",
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
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
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div
                  className="w-[280px] rounded-2xl border border-white/[0.08] overflow-hidden flex flex-col"
                  style={{
                    backgroundColor: "rgba(22,21,19,0.96)",
                    boxShadow: "0 12px 48px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* Visual area */}
                  <div className="h-[140px] p-4">
                    {card.visual}
                  </div>

                  {/* Content */}
                  <div className="flex-1 px-6 pb-5 pt-2 flex flex-col">
                    <h3
                      className="text-white/90 font-medium text-[16px] leading-snug mb-2.5"
                      style={{ fontFamily: "Newsreader, serif" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-white/35 text-[12px] leading-relaxed flex-1"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {card.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/[0.06]">
                      <span className="text-[10px] text-white/25 tracking-wide uppercase">
                        {card.detail}
                      </span>
                      {card.icon}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
