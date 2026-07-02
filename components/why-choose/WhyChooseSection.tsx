"use client";

import { motion } from "framer-motion";
import SectionReveal from "@/components/effects/SectionReveal";
import { BENEFITS } from "@/lib/constants";

function BenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof BENEFITS)[0];
  index: number;
}) {
  const Icon = benefit.icon;

  return (
    <SectionReveal delay={index * 0.08}>
      <div className="group premium-panel relative h-full overflow-hidden p-7">
        <div
          className={`absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br ${benefit.gradient} opacity-0 blur-[90px] transition-opacity duration-500 group-hover:opacity-40`}
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className={`rounded-[1.25rem] bg-gradient-to-br ${benefit.gradient} p-[1px]`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-white dark:bg-[#0a0a0f]">
                <Icon size={20} className="text-gray-950 dark:text-white/80" />
              </div>
            </div>

            <motion.span
              whileHover={{ scale: 1.03 }}
              className="rounded-full border border-black/8 bg-black/[0.03] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gray-600 dark:border-white/8 dark:bg-white/[0.04] dark:text-white/48"
            >
              {benefit.stat}
            </motion.span>
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-gray-950 transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-cyan-500 group-hover:bg-clip-text dark:text-white">
            {benefit.title}
          </h3>
          <p className="section-copy mt-4 text-sm md:text-base">{benefit.description}</p>
        </div>
      </div>
    </SectionReveal>
  );
}

export default function WhyChooseSection() {
  return (
    <section id="why-choose" className="relative py-28 md:py-36">
      <div className="section-shell relative z-10">
        <SectionReveal>
          <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <span className="section-kicker">The SK Digital Advantage</span>
              <h2 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
                Why premium clients
                <br />
                <span className="bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent dark:from-rose-400 dark:to-orange-300">
                  feel safer saying yes
                </span>
              </h2>
            </div>

            <div className="premium-panel p-6 md:p-7">
              <p className="section-copy text-base md:text-lg">
                This is where trust is won: strong communication, better framing,
                confident design decisions, and delivery systems that feel mature.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="metric-chip">Calm stakeholder experience</span>
                <span className="metric-chip">High-trust interfaces</span>
                <span className="metric-chip">Scale-conscious builds</span>
              </div>
            </div>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
