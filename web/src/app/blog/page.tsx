"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 bg-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center max-w-lg"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/[0.06] mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-accent text-xs font-medium tracking-wide">Blog</span>
        </motion.div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-[3.2rem] font-medium leading-[1.1] tracking-tight mb-6">
          Coming Soon
        </h1>

        <p className="text-text-muted text-[15px] leading-relaxed mb-10 max-w-md mx-auto">
          Research papers, engineering deep-dives, and product updates from the MemoX team. We&apos;re
          working on something worth reading.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#waitlist"
            className="px-6 py-2.5 text-sm font-medium rounded-full bg-text text-bg hover:bg-accent hover:text-bg transition-all duration-300"
          >
            Join the Waitlist
          </Link>
          <Link
            href="/about"
            className="px-6 py-2.5 text-sm font-medium rounded-full border border-border hover:border-text-muted/40 text-text-muted hover:text-text transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-10 mt-20 grid grid-cols-3 gap-8 max-w-md"
      >
        {["Research", "Engineering", "Product"].map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
            className="text-center"
          >
            <div className="w-10 h-10 rounded-xl border border-border/40 bg-surface mx-auto mb-3 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-text-muted/30" />
            </div>
            <span className="text-xs text-text-muted/50 tracking-wide">{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
