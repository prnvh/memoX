"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const MemoryGraph3D = dynamic(
  () =>
    import("@/components/memory-graph-3d").then((mod) => ({
      default: mod.MemoryGraph3D,
    })),
  { ssr: false }
);

function scrollToWaitlist() {
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
}

export function HeroSection() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-bg">
      <motion.h1
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center font-display text-[20vw] font-extrabold leading-none tracking-tighter text-white/[0.04]"
      >
        MEMOX
      </motion.h1>

      <div className="relative z-10 h-full w-full">
        <MemoryGraph3D className="h-full w-full" nodeCount={120} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        className="absolute bottom-20 left-0 right-0 z-20 flex flex-col items-center gap-3 px-4"
      >
        <button
          type="button"
          onClick={scrollToWaitlist}
          className="rounded-full border border-text/25 bg-bg/55 px-9 py-3.5 text-sm font-medium text-text shadow-sm backdrop-blur-md transition-colors hover:border-text/45 hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-text/25 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Join beta
        </button>
        <p className="text-[11px] font-light tracking-[0.22em] text-text-muted">
          Waitlist below
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-text-muted/30 pt-2"
        >
          <div className="h-1.5 w-0.5 rounded-full bg-text-muted/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
