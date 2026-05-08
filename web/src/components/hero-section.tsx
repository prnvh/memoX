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

export function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-bg">
      <motion.h1
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-[20vw] leading-none tracking-tighter text-white/[0.04] select-none pointer-events-none z-0"
      >
        MEMOX
      </motion.h1>

      <div className="relative z-10 w-full h-full">
        <MemoryGraph3D className="w-full h-full" nodeCount={120} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        className="absolute bottom-20 left-0 right-0 z-20 text-center"
      >
        <p className="text-text-muted text-xs tracking-[0.35em] uppercase font-light">
          Structured Memory for AI Agents
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-text-muted/30 flex items-start justify-center pt-2"
        >
          <div className="w-0.5 h-1.5 rounded-full bg-text-muted/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
