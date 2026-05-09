"use client";

import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8 bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-accent text-sm font-medium mb-4 tracking-wide">Blog</p>
        <h1 className="font-display text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-6">
          Coming Soon
        </h1>
        <p className="text-text-muted text-[15px] leading-relaxed max-w-md mx-auto">
          Research, engineering deep-dives, and updates from the MemoX team.
          <br />
          Stay tuned.
        </p>
      </motion.div>
    </div>
  );
}
