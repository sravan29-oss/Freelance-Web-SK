"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { TRUSTED_COMPANIES } from "@/lib/constants";

export default function TrustedBySection() {
  const doubled = [...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES];

  return (
    <section className="relative py-14 md:py-20">
      <div className="section-shell">
        <div className="premium-panel overflow-hidden px-6 py-8 md:px-8 md:py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="max-w-2xl"
            >
              <span className="section-kicker">Client Confidence</span>
              <h3 className="mt-6 text-2xl font-bold tracking-tight text-gray-950 dark:text-white md:text-3xl">
                Built for high-trust sectors, modern operators, and ambitious
                businesses that need a premium digital face.
              </h3>
              <p className="section-copy mt-4 text-base md:text-lg">
                Every touchpoint is designed to look credible, feel considered,
                and communicate maturity from the first scroll.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex flex-wrap gap-3 lg:max-w-md lg:justify-end"
            >
              <span className="metric-chip">{TRUSTED_COMPANIES.length}+ brand profiles</span>
              <span className="metric-chip">Healthcare to AI</span>
              <span className="metric-chip">Founder-led collaboration</span>
            </motion.div>
          </div>

          <div className="section-divider my-8" />

          <div className="trusted-scroll-container rounded-[1.75rem] border border-black/8 bg-black/[0.02] py-4 dark:border-white/8 dark:bg-white/[0.02]">
            <div className="trusted-scroll-track">
              {doubled.map((company, index) => (
                <div key={`${company}-${index}`} className="mx-4 flex-shrink-0 md:mx-5">
                  <div className="group flex items-center gap-3 rounded-2xl border border-black/8 bg-white/84 px-5 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-black/14 hover:shadow-[0_18px_36px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[#0c0f16]/70 dark:shadow-none dark:hover:border-white/14">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/12 to-cyan-500/12 text-violet-500 transition-transform duration-300 group-hover:scale-110 dark:from-violet-500/20 dark:to-cyan-500/20 dark:text-violet-300">
                      <Building2 size={18} />
                    </div>
                    <span className="whitespace-nowrap text-sm font-semibold tracking-[0.12em] text-gray-600 transition-colors duration-300 group-hover:text-gray-950 dark:text-white/50 dark:group-hover:text-white/85">
                      {company}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
