"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const MemoryGraph3D = dynamic(
  () =>
    import("@/components/memory-graph-3d").then((mod) => ({
      default: mod.MemoryGraph3D,
    })),
  { ssr: false }
);

const capabilities = [
  {
    title: "Structured Memory",
    description:
      "Wiki-style pages, semantic edges, and temporal facts — not just raw text blobs.",
  },
  {
    title: "Deduplication",
    description:
      "Incoming info is diffed against existing memory. Only net-new knowledge is committed.",
  },
  {
    title: "Temporal Awareness",
    description:
      "Resolves relative dates, tracks state changes, and answers temporal queries accurately.",
  },
  {
    title: "Read Orchestration",
    description:
      "Multi-stage recall pipeline: index scoring, evidence extraction, source-locked answers.",
  },
  {
    title: "Agent-Native API",
    description:
      "Drop-in memory layer for any AI agent. Simple read/write interface, complex internals.",
  },
  {
    title: "Governance",
    description:
      "Every mutation is logged. Patch history, provenance tracking, configurable retention.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="pt-36 pb-20 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl lg:text-[3.4rem] font-medium leading-[1.12] tracking-tight mb-6 max-w-3xl mx-auto"
          >
            Giving AI agents memory
            <br />
            that actually persists.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            MemoX is a structured memory layer for AI agents. It bridges the gap
            between stateless LLM conversations and truly intelligent,
            context-aware systems.
          </motion.p>
        </div>
      </section>

      {/* Visual */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="px-8 pb-24"
      >
        <div className="max-w-4xl mx-auto rounded-2xl border border-border/25 bg-surface overflow-hidden">
          <div className="aspect-[16/9]">
            <MemoryGraph3D className="w-full h-full" nodeCount={90} />
          </div>
        </div>
      </motion.section>

      {/* Two-column narrative */}
      <section className="px-8 pb-28">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-[2.2rem] font-medium leading-[1.2] tracking-tight">
              We&apos;re building the memory
              layer that agents need to
              reason over time.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5 text-text-muted text-[15px] leading-[1.75]"
          >
            <p>
              Every time you start a new conversation with an AI, it forgets
              everything. Your preferences, your project context, your decisions
              — all gone. Agents today are stateless by default.
            </p>
            <p>
              MemoX changes that. It provides a structured knowledge graph that
              persists across sessions, agents, and time. Facts are stored as
              wiki pages, relationships as semantic edges, and changes as
              temporal events — all governed, audited, and queryable.
            </p>
            <p>
              What started as an experiment in giving LLM workflows persistent
              context has evolved into a full memory architecture: read
              orchestration, write governance, deduplication, temporal
              resolution, and a simple API that any agent can plug into.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="px-8 pb-28">
        <div className="max-w-5xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="text-xs tracking-[0.25em] uppercase text-text-muted/60 font-medium mb-10"
          >
            Capabilities
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/20 rounded-xl overflow-hidden">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="bg-bg p-7"
              >
                <h4 className="font-display text-base font-medium mb-2">
                  {cap.title}
                </h4>
                <p className="text-text-muted text-sm leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
