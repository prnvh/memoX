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
    title: "Tell it once",
    description:
      "Your preferences, decisions, and context are remembered across every session — no repeating yourself.",
  },
  {
    title: "Use it everywhere",
    description:
      "One memory for every AI you use. Switch tools freely — your context moves with you.",
  },
  {
    title: "See & edit anytime",
    description:
      "Browse your memory, correct mistakes, delete what you don't want. It's never a black box.",
  },
  {
    title: "No more setup prompts",
    description:
      "Stop pasting context documents. MemoX gives your AI the background it needs automatically.",
  },
  {
    title: "Built for real work",
    description:
      "Not random facts — your projects, team decisions, and timelines. Organized and connected.",
  },
  {
    title: "Private by default",
    description:
      "Your data stays yours. Full control over who sees what — export anytime, delete anything.",
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
            One memory for every
            <br />
            AI you use.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            MemoX gives your AI persistent memory that belongs to you — not locked
            into one chatbot. Tell it once, use it everywhere. See it, edit it,
            delete it anytime.
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
              Your AI memory should
              belong to you, not
              one chatbot.
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
              — gone. You end up repeating yourself, pasting setup prompts,
              maintaining context documents. It shouldn&apos;t be this way.
            </p>
            <p>
              MemoX gives you one persistent memory that works across every AI
              tool you use. Tell it once, and it remembers — your projects, your
              preferences, your team&apos;s decisions. Structured, searchable,
              and always up to date.
            </p>
            <p>
              And it&apos;s yours. You can see everything that&apos;s stored,
              edit it when things change, delete what you don&apos;t want kept.
              Separate memory spaces for work, personal projects, or different
              teams. Private by default. Controlled by you.
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
            What you get
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
