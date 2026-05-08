"use client";

import { motion } from "framer-motion";

const posts = [
  {
    title: "Why AI Agents Need Persistent Memory",
    excerpt:
      "Current AI systems forget everything between sessions. We explore why structured long-term memory is the missing piece for truly useful AI agents.",
    date: "Coming Soon",
    tag: "Research",
    author: "MemoX Team",
  },
  {
    title: "Introducing SML: Structured Memory Language",
    excerpt:
      "A deep dive into our approach to representing, querying, and patching memory — from wiki pages to temporal facts to semantic edges.",
    date: "Coming Soon",
    tag: "Engineering",
    author: "MemoX Team",
  },
  {
    title: "Benchmarking Long-Term Recall in LLMs",
    excerpt:
      "How we evaluate memory accuracy across hundreds of conversational turns using the LongMemEval framework.",
    date: "Coming Soon",
    tag: "Benchmarks",
    author: "MemoX Team",
  },
  {
    title: "From RAG to Governed Memory",
    excerpt:
      "Why retrieval-augmented generation alone isn't enough, and how governed, structured memory layers change the game for production AI systems.",
    date: "Coming Soon",
    tag: "Architecture",
    author: "MemoX Team",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-8 bg-surface">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-accent text-sm font-medium mb-3">Blog</p>
          <h1 className="font-display text-4xl md:text-[2.8rem] font-medium leading-[1.15] tracking-tight mb-4 max-w-lg">
            Research, ideas &amp; engineering updates.
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className="group rounded-xl border border-border/30 bg-bg p-7 hover:border-border/60 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <h2 className="font-display text-xl font-medium mb-2.5 leading-snug group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/[0.06]" />
                  <span className="text-xs text-text-muted">{post.author}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted/60">
                  <span>{post.date}</span>
                  <span className="text-text-muted/30">/</span>
                  <span className="text-accent/70">{post.tag}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
