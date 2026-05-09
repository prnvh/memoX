"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { getSupabase } from "@/lib/supabase";

const MemoryGraph3D = dynamic(
  () =>
    import("@/components/memory-graph-3d").then((mod) => ({
      default: mod.MemoryGraph3D,
    })),
  { ssr: false }
);

export function WaitlistSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    const { error: dbError } = await getSupabase()
      .from("waitlist")
      .insert({ name: name || null, email });

    setLoading(false);

    if (dbError) {
      if (dbError.code === "23505") {
        setError("You're already on the list!");
      } else {
        setError("Something went wrong. Please try again.");
      }
      return;
    }

    setSubmitted(true);
  }

  return (
    <section id="waitlist" className="relative w-full bg-bg overflow-hidden">
      {/* Top — Copy + Form */}
      <div className="relative z-10 pt-28 pb-8 flex flex-col items-center text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl lg:text-[3.4rem] font-medium leading-[1.1] tracking-tight text-text mb-5 max-w-2xl"
        >
          Tell it once.
          <br />
          Remember everywhere.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-muted text-[15px] leading-relaxed max-w-lg mb-10"
        >
          Give your AI persistent, structured memory that works across every
          tool — and belongs to you. Join the waitlist for early access.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg"
            >
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full sm:w-36 px-5 py-3 rounded-full bg-surface border border-border text-text text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:flex-1 px-5 py-3 rounded-full bg-surface border border-border text-text text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-text text-bg text-sm font-medium hover:bg-accent hover:text-bg transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-8 py-4 rounded-full border border-accent/25 bg-accent/[0.06]"
            >
              <p className="text-accent text-sm font-medium">
                You&apos;re in! We&apos;ll reach out when MemoX is ready.
              </p>
            </motion.div>
          )}

          {error && (
            <p className="text-text-muted text-xs mt-3">{error}</p>
          )}
        </motion.div>
      </div>

      {/* Bottom — Interactive 3D brain/graph */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative w-full h-[50vh] min-h-[400px] max-h-[600px]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent z-10 pointer-events-none" />
        <MemoryGraph3D className="w-full h-full" nodeCount={100} />
      </motion.div>
    </section>
  );
}
