"use client";

import { motion } from "framer-motion";
import { MemoryCarousel3D } from "@/components/memory-carousel-3d";

export function CarouselSection() {
  return (
    <section className="relative w-full bg-bg py-28 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-10 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-[0.45fr_1fr] gap-12 items-center">
          {/* Left — Heading + copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent text-sm font-medium mb-4 tracking-wide">
              What We Do
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.6rem] font-medium leading-[1.15] tracking-tight text-text mb-6">
              Your AI memory
              <br />
              should belong
              <br />
              to you.
            </h2>
            <p className="text-text-muted text-[15px] leading-relaxed max-w-sm mb-10">
              Not one chatbot. MemoX gives you persistent, structured memory
              that works across every AI tool — and stays under your control.
            </p>
            <p className="text-text-muted/40 text-xs tracking-widest uppercase">
              drag to explore &rarr;
            </p>
          </motion.div>

          {/* Right — Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="w-full h-[520px] md:h-[560px] -mr-10 md:-mr-16 lg:-mr-24"
          >
            <MemoryCarousel3D className="w-full h-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
