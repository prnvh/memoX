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
    <section
      id="waitlist"
      className="relative w-full border-t border-border bg-bg"
    >
      <div className="mx-auto max-w-xl px-6 py-24 md:py-32">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="text-center text-[11px] font-medium uppercase tracking-[0.28em] text-text-muted"
        >
          Waitlist
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-display mt-5 text-center text-3xl font-medium leading-[1.15] tracking-tight text-text md:text-4xl"
        >
          Tell it once.
          <br />
          Remember everywhere.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-center text-[15px] leading-relaxed text-text-muted"
        >
          One memory layer for ChatGPT, Claude, Gemini, Cursor, and the agents
          you build. Beta includes{" "}
          <span className="text-text/90">5 GB of storage</span> — free, with no
          time limit. We&apos;ll email you when your access is ready.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 rounded-2xl border border-border bg-surface p-8 md:p-9"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="wl-name"
                  className="block text-left text-xs text-text-muted"
                >
                  Name <span className="text-text-muted/50">(optional)</span>
                </label>
                <input
                  id="wl-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-muted/45 focus:border-text-muted/50 focus:outline-none focus:ring-1 focus:ring-text-muted/25"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="wl-email"
                  className="block text-left text-xs text-text-muted"
                >
                  Email
                </label>
                <input
                  id="wl-email"
                  type="email"
                  placeholder="you@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-muted/45 focus:border-text-muted/50 focus:outline-none focus:ring-1 focus:ring-text-muted/25"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-text py-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Sending…" : "Request access"}
              </button>
              <p className="text-center text-xs leading-relaxed text-text-muted/80">
                No marketing noise. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <div className="border border-border bg-bg px-6 py-8 text-center">
              <p className="font-display text-lg text-text">
                You&apos;re on the list.
              </p>
              <p className="mt-2 text-sm text-text-muted">
                We&apos;ll be in touch when MemoX is ready for you.
              </p>
            </div>
          )}

          {error && (
            <p className="mt-4 text-center text-xs text-red-400/90">{error}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
