"use client";

import { motion } from "framer-motion";
import { BENEFITS } from "@/lib/constants";
import SectionReveal from "@/components/effects/SectionReveal";

function BenefitCard({ benefit, index }: { benefit: typeof BENEFITS[0], index: number }) {
  const Icon = benefit.icon;
  
  return (
    <SectionReveal delay={index * 0.1}>
      <div className="group relative p-8 rounded-3xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/[0.05] hover:border-black/10 dark:hover:border-white/[0.1] transition-colors duration-500 overflow-hidden h-full">
        {/* Glow */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${benefit.gradient} rounded-full blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} p-[1px]`}>
              <div className="w-full h-full bg-white dark:bg-[#0a0a0f] rounded-xl flex items-center justify-center">
                <Icon size={20} className="text-gray-900 dark:text-white/80" />
              </div>
            </div>
            
            {/* Animated stat pill */}
            <motion.span 
              initial={{ opacity: 0.8, scale: 1 }}
              whileHover={{ scale: 1.05, opacity: 1 }}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/[0.05] text-gray-700 dark:text-white/70 border border-black/5 dark:border-white/5"
            >
              {benefit.stat}
            </motion.span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-cyan-500 transition-all duration-300">
            {benefit.title}
          </h3>
          <p className="text-gray-600 dark:text-white/40 text-sm leading-relaxed mt-auto">
            {benefit.description}
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}

export default function WhyChooseSection() {
  return (
    <section id="why-choose" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <div className="text-center mb-16 md:mb-20">
            <motion.p className="text-rose-600 dark:text-rose-400 text-sm font-medium tracking-widest uppercase mb-4">
              The SK Digital Advantage
            </motion.p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Industry Leaders{" "}
              <span className="bg-gradient-to-r from-rose-600 to-orange-600 dark:from-rose-400 dark:to-orange-400 bg-clip-text text-transparent">
                Trust Us
              </span>
            </h2>
            <p className="text-gray-500 dark:text-white/40 max-w-2xl mx-auto text-lg">
              We don't just build websites. We build highly scalable digital infrastructure that becomes your competitive advantage.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
