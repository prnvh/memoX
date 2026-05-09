"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getSupabase } from "@/lib/supabase";

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
    <section id="waitlist" className="relative w-full bg-bg overflow-hidden py-28 px-6">
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,162,39,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/[0.06] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-accent text-xs font-medium tracking-wide">Early Access</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl lg:text-[3.4rem] font-medium leading-[1.1] tracking-tight text-text mb-5"
        >
          Tell it once.
          <br />
          Remember everywhere.
        </motion.h2>

        {/* Value prop */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-accent text-sm md:text-base font-medium mb-3"
        >
          Join the beta to access 5 GB of storage. Free. Forever.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-text-muted text-[15px] leading-relaxed max-w-lg mb-10"
        >
          Persistent, structured memory that works across ChatGPT, Claude,
          Gemini, Cursor, and your own agents — and belongs to you.
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-lg"
        >
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 w-full"
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
                {loading ? "Joining..." : "Join Beta"}
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

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-text-muted/40 text-xs mt-8"
        >
          No spam. Unsubscribe anytime. Your data stays yours.
        </motion.p>
      </div>
    </section>
  );
}
