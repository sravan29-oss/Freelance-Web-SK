"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionReveal from "@/components/effects/SectionReveal";
import { PROCESS_STEPS } from "@/lib/constants";

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof PROCESS_STEPS)[0];
  index: number;
  isLast: boolean;
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const Icon = step.icon;

  return (
    <div ref={cardRef} className="relative flex flex-col items-center">
      {!isLast && (
        <div className="absolute left-1/2 top-10 hidden h-[2px] w-full -translate-x-1/2 lg:block">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.45 + index * 0.18 }}
            className="h-full origin-left bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ marginLeft: "50%" }}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
        transition={{ duration: 0.65, delay: index * 0.12 }}
        className="group relative z-10 w-full"
      >
        <div className="premium-panel h-full p-6 text-center md:p-7">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.45, delay: 0.25 + index * 0.12, type: "spring" }}
            className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${step.color}26, ${step.color}0d)`,
              border: `1px solid ${step.color}40`,
            }}
          >
            <motion.div
              animate={{
                boxShadow: [`0 0 0 0 ${step.color}45`, `0 0 0 14px ${step.color}00`],
              }}
              transition={{ duration: 2.1, repeat: Infinity, delay: index * 0.25 }}
              className="absolute inset-0 rounded-2xl"
            />
            <Icon size={24} style={{ color: step.color }} />
          </motion.div>

          <span
            className="rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{
              color: step.color,
              borderColor: `${step.color}40`,
              backgroundColor: `${step.color}12`,
            }}
          >
            Step {step.number}
          </span>

          <h4 className="mt-5 text-2xl font-bold tracking-tight text-gray-950 transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-cyan-500 group-hover:bg-clip-text dark:text-white">
            {step.title}
          </h4>

          <p className="section-copy mx-auto mt-4 max-w-[18rem] text-sm md:text-base">
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-28 md:py-36">
      <div className="absolute inset-0 bg-gray-50/60 dark:bg-[#060609]" />
      <div className="absolute inset-0 gradient-mesh-bg opacity-70" />

      <div className="section-shell relative z-10">
        <SectionReveal>
          <div className="mb-16 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <span className="section-kicker">How We Work</span>
              <h2 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
                Structured delivery
                <br />
                <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
                  with premium control
                </span>
              </h2>
            </div>

            <div className="premium-panel p-6 md:p-7">
              <p className="section-copy text-base md:text-lg">
                Clear phases, clean handoffs, and visible progress help the entire
                engagement feel organized, senior, and trustworthy.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="metric-chip">Discovery to launch</span>
                <span className="metric-chip">Transparent milestones</span>
                <span className="metric-chip">Build-ready process</span>
              </div>
            </div>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PROCESS_STEPS.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              isLast={index === PROCESS_STEPS.length - 1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-14 flex flex-col items-start justify-between gap-5 rounded-[2rem] border border-black/8 bg-white/76 px-6 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-white/8 dark:bg-white/[0.04] dark:shadow-none md:flex-row md:items-center"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-500 dark:text-violet-300">
              Delivery cadence
            </p>
            <p className="section-copy mt-2 text-sm md:text-base">
              Clear ownership, practical reviews, and a launch path that keeps
              stakeholders confident at every step.
            </p>
          </div>

          <motion.button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-600 dark:bg-white dark:text-gray-950 dark:hover:bg-violet-400"
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
