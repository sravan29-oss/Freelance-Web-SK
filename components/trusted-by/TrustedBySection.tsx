"use client";

import { motion } from "framer-motion";
import { TRUSTED_COMPANIES } from "@/lib/constants";
import { Building2 } from "lucide-react";

export default function TrustedBySection() {
  // Double the array for seamless infinite scroll
  const doubled = [...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-gray-400 dark:text-white/30 text-sm font-medium tracking-[0.2em] uppercase mb-2">
          Trusted by Industry Leaders
        </p>
        <h3 className="text-xl md:text-2xl font-semibold text-gray-600 dark:text-white/50">
          80+ businesses rely on{" "}
          <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent font-bold">
            SK Digital
          </span>
        </h3>
      </motion.div>

      {/* Scrolling logo track */}
      <div className="trusted-scroll-container">
        <div className="trusted-scroll-track">
          {doubled.map((company, index) => (
            <div
              key={`${company}-${index}`}
              className="flex-shrink-0 mx-6 md:mx-10 group"
            >
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] hover:border-black/[0.15] dark:hover:border-white/[0.15] hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-all duration-500 cursor-default">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 dark:from-violet-500/20 dark:to-cyan-500/20 flex items-center justify-center group-hover:from-violet-500/20 group-hover:to-cyan-500/20 dark:group-hover:from-violet-500/30 dark:group-hover:to-cyan-500/30 transition-all duration-500">
                  <Building2
                    size={18}
                    className="text-gray-400 dark:text-white/30 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-500"
                  />
                </div>
                <span className="text-gray-400 dark:text-white/30 font-semibold text-sm whitespace-nowrap group-hover:text-gray-700 dark:group-hover:text-white/70 transition-colors duration-500 tracking-wide">
                  {company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle separator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
      </div>
    </section>
  );
}
