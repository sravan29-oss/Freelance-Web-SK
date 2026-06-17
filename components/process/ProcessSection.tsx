"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";
import SectionReveal from "@/components/effects/SectionReveal";

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
      {/* Vertical connecting line (hidden on last item, hidden on mobile) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-[72px] left-1/2 -translate-x-1/2 w-full h-[2px] z-0">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
            className="h-full bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/10 origin-left"
            style={{
              marginLeft: "50%",
            }}
          />
        </div>
      )}

      {/* Step card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, delay: index * 0.15 }}
        className="relative z-10 group w-full"
      >
        {/* Number badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.15, type: "spring" }}
          className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center relative"
          style={{
            background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)`,
            border: `1px solid ${step.color}30`,
          }}
        >
          {/* Pulse ring */}
          <motion.div
            animate={{
              boxShadow: [
                `0 0 0 0 ${step.color}40`,
                `0 0 0 12px ${step.color}00`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            className="absolute inset-0 rounded-2xl"
          />
          <Icon size={24} style={{ color: step.color }} />
        </motion.div>

        {/* Step number */}
        <div
          className="text-center mb-3 text-xs font-bold tracking-[0.3em] uppercase"
          style={{ color: step.color }}
        >
          Step {step.number}
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 transition-all duration-300">
          {step.title}
        </h4>

        {/* Description */}
        <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed text-center max-w-[280px] mx-auto">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-[#060609]" />
      <div className="absolute inset-0 gradient-mesh-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-20 md:mb-28">
            <motion.p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4">
              How We Work
            </motion.p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Proven{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Methodology
              </span>
            </h2>
            <p className="text-gray-500 dark:text-white/40 max-w-2xl mx-auto text-lg">
              A battle-tested process refined over 150+ projects. Predictable
              timelines, transparent communication, exceptional results.
            </p>
          </div>
        </SectionReveal>

        {/* Process steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              isLast={index === PROCESS_STEPS.length - 1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-gray-400 dark:text-white/30 text-sm mb-6">
            Average project delivery:{" "}
            <span className="text-violet-400 font-semibold">4–8 weeks</span>
          </p>
          <motion.button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-black/5 dark:bg-white/5 text-gray-900 dark:text-white font-medium rounded-full border border-black/10 dark:border-white/10 hover:border-violet-500/30 hover:bg-violet-500/5 dark:hover:bg-violet-500/10 transition-all duration-300"
          >
            Start Your Project →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
