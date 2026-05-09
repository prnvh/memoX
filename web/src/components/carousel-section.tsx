"use client";

import { motion } from "framer-motion";
import { MemoryCarousel3D } from "@/components/memory-carousel-3d";

export function CarouselSection() {
  return (
    <section className="relative w-full bg-bg py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-8 text-center mb-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-4xl lg:text-[2.8rem] font-medium leading-[1.2] tracking-tight text-text"
        >
          Your AI memory should belong to you,
          <br className="hidden md:block" />
          {" "}not one chatbot.
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full h-[420px] md:h-[460px]"
      >
        <MemoryCarousel3D className="w-full h-full" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center text-text-muted/40 text-xs tracking-widest uppercase mt-2"
      >
        drag to explore
      </motion.p>
    </section>
  );
}
