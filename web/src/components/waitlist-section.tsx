"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Agent Memory Recall",
    description:
      "Your AI remembers past conversations, preferences, and decisions — across sessions and tools.",
    visual: "recall",
  },
  {
    title: "Knowledge Graph",
    description:
      "Facts, relations, and temporal events are stored as a structured graph — not raw text dumps.",
    visual: "graph",
  },
  {
    title: "Semantic Search",
    description:
      "Query memory by meaning. Ask 'What did we decide about pricing?' and get precise, sourced answers.",
    visual: "search",
  },
  {
    title: "Multi-Agent Sharing",
    description:
      "Multiple agents read from and write to the same memory space. Context stays synchronized.",
    visual: "share",
  },
];

function SlideVisual({ visual }: { visual: string }) {
  const visuals: Record<string, React.ReactNode> = {
    recall: (
      <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="h-2.5 rounded bg-white/10 w-3/4 mb-2" />
            <div className="h-2 rounded bg-white/[0.05] w-full" />
            <div className="h-2 rounded bg-white/[0.05] w-2/3 mt-1" />
          </div>
        </div>
        <div className="w-px h-4 bg-white/[0.06] ml-3.5" />
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-white/[0.08] border border-white/[0.08] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="h-2.5 rounded bg-white/10 w-1/2 mb-2" />
            <div className="h-2 rounded bg-accent/[0.08] w-full" />
            <div className="h-2 rounded bg-accent/[0.08] w-4/5 mt-1" />
          </div>
        </div>
        <div className="w-px h-4 bg-white/[0.06] ml-3.5" />
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-white/[0.08] border border-white/[0.08] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="h-2.5 rounded bg-white/10 w-2/3 mb-2" />
            <div className="h-2 rounded bg-white/[0.05] w-5/6" />
          </div>
        </div>
      </div>
    ),
    graph: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 280 200" className="w-full max-w-sm">
          <line x1="140" y1="80" x2="60" y2="40" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <line x1="140" y1="80" x2="220" y2="40" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <line x1="140" y1="80" x2="50" y2="140" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <line x1="140" y1="80" x2="230" y2="140" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <line x1="140" y1="80" x2="140" y2="170" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="60" y1="40" x2="220" y2="40" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <line x1="50" y1="140" x2="140" y2="170" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <line x1="230" y1="140" x2="140" y2="170" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <line x1="60" y1="40" x2="50" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <line x1="220" y1="40" x2="230" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

          <circle cx="140" cy="80" r="10" fill="rgba(201,162,39,0.25)" stroke="rgba(201,162,39,0.5)" strokeWidth="1.5" />
          <circle cx="60" cy="40" r="6" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <circle cx="220" cy="40" r="6" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <circle cx="50" cy="140" r="5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <circle cx="230" cy="140" r="5" fill="rgba(201,162,39,0.15)" stroke="rgba(201,162,39,0.35)" strokeWidth="1" />
          <circle cx="140" cy="170" r="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

          <text x="140" y="68" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Inter, sans-serif">user</text>
          <text x="60" y="30" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="Inter, sans-serif">prefs</text>
          <text x="220" y="30" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="Inter, sans-serif">projects</text>
          <text x="42" y="155" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6" fontFamily="Inter, sans-serif">notes</text>
          <text x="238" y="155" textAnchor="middle" fill="rgba(201,162,39,0.4)" fontSize="6" fontFamily="Inter, sans-serif">decisions</text>
          <text x="140" y="184" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6" fontFamily="Inter, sans-serif">timeline</text>
        </svg>
      </div>
    ),
    search: (
      <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02]">
          <svg className="w-3.5 h-3.5 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-xs text-text-muted/80">What did we decide about pricing?</span>
        </div>
        <div className="mt-1 px-4 py-3 rounded-xl bg-accent/[0.04] border border-accent/[0.12]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
            <span className="text-[10px] text-accent/60 font-medium">Best match — Pricing Decision</span>
          </div>
          <div className="h-2 rounded bg-accent/[0.08] w-full mb-1.5" />
          <div className="h-2 rounded bg-accent/[0.06] w-4/5" />
        </div>
        <div className="px-4 py-3 rounded-xl bg-white/[0.015] border border-white/[0.04]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="text-[10px] text-text-muted/50 font-medium">Related — Revenue Model</span>
          </div>
          <div className="h-2 rounded bg-white/[0.04] w-full mb-1.5" />
          <div className="h-2 rounded bg-white/[0.03] w-3/5" />
        </div>
      </div>
    ),
    share: (
      <div className="flex items-center justify-center gap-5 w-full max-w-xs mx-auto">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
            <span className="text-[10px] font-medium text-text-muted/70">Agent 1</span>
          </div>
          <div className="h-8 w-px bg-gradient-to-b from-white/10 to-transparent" />
        </div>
        <div className="flex flex-col items-center gap-2 -mt-4">
          <div className="w-16 h-16 rounded-2xl bg-accent/[0.08] border border-accent/20 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-accent/25 border border-accent/30" />
          </div>
          <span className="text-[9px] text-text-muted/50 tracking-widest uppercase font-medium mt-1">Shared Memory</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
            <span className="text-[10px] font-medium text-text-muted/70">Agent 2</span>
          </div>
          <div className="h-8 w-px bg-gradient-to-b from-white/10 to-transparent" />
        </div>
      </div>
    ),
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-10">
      {visuals[visual]}
    </div>
  );
}

export function WaitlistSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setActiveSlide(index);
    setPaused(true);
    setTimeout(() => setPaused(false), 6000);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveSlide((p) => (p + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section
      id="waitlist"
      className="relative w-full bg-bg border-t border-border/20"
    >
      <div className="w-full max-w-[1400px] mx-auto px-10 md:px-16 lg:px-24 py-32">
        <div className="flex flex-col items-center gap-20">
          {/* Centered copy + form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center max-w-2xl"
          >
            <h2 className="font-display text-3xl md:text-4xl font-medium leading-[1.25] tracking-tight mb-5">
              Get early access<span className="text-accent"> and 1 GB free</span>
              <br className="hidden md:block" />
              {" "}memory storage.
            </h2>
            <p className="text-text-muted text-[15px] leading-relaxed mb-14 max-w-md mx-auto">
              Be among the first to give your AI agents persistent, structured
              memory. No credit card required.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3.5 max-w-sm mx-auto">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3 rounded-full bg-transparent border border-border text-text text-sm placeholder:text-text-muted/70 focus:outline-none focus:border-accent/60 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3 rounded-full bg-transparent border border-border text-text text-sm placeholder:text-text-muted/70 focus:outline-none focus:border-accent/60 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-5 py-3 rounded-full bg-text text-bg text-sm font-medium hover:bg-accent hover:text-bg transition-all duration-300 mt-1"
                >
                  Join Waitlist
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-sm mx-auto p-5 rounded-xl border border-accent/20 bg-accent/5"
              >
                <p className="text-accent font-medium text-sm mb-1">
                  You&apos;re in!
                </p>
                <p className="text-text-muted text-xs">
                  We&apos;ll notify you as soon as MemoX is ready.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Centered slide carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="w-full max-w-xl"
          >
            <div className="rounded-2xl border border-border/30 bg-surface overflow-hidden">
              <div className="aspect-[4/3] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <div className="flex-1">
                      <SlideVisual visual={slides[activeSlide].visual} />
                    </div>
                    <div className="px-8 pb-6 text-center">
                      <h3 className="font-display text-base font-semibold mb-1.5">
                        {slides[activeSlide].title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {slides[activeSlide].description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between px-8 py-4 border-t border-border/20">
                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeSlide
                          ? "bg-accent w-6"
                          : "bg-text-muted/30 hover:bg-text-muted/50 w-1.5"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      goToSlide((activeSlide - 1 + slides.length) % slides.length)
                    }
                    className="w-8 h-8 rounded-full border border-border/40 flex items-center justify-center text-text-muted hover:text-text hover:border-text-muted/40 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      goToSlide((activeSlide + 1) % slides.length)
                    }
                    className="w-8 h-8 rounded-full border border-border/40 flex items-center justify-center text-text-muted hover:text-text hover:border-text-muted/40 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
