"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/constants";
import SectionReveal from "@/components/effects/SectionReveal";
import Image from "next/image";

function TechCard({ skill, index }: { skill: typeof SKILLS[0], index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-300 h-full"
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ backgroundColor: skill.color }}
      />
      
      {/* Decorative Top Line */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] opacity-0 group-hover:w-1/2 group-hover:opacity-100 transition-all duration-300"
        style={{ backgroundColor: skill.color }}
      />
      
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Color dot indicator */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 group-hover:scale-110 transition-transform duration-300"
          style={{ 
            boxShadow: `inset 0 0 10px ${skill.color}20`,
            borderColor: `${skill.color}40` 
          }}
        >
          <span 
            className="w-4 h-4 rounded-full shadow-lg" 
            style={{ 
              backgroundColor: skill.color,
              boxShadow: `0 0 15px ${skill.color}` 
            }} 
          />
        </div>
        
        <div className="text-center">
          <h4 className="text-gray-900 dark:text-white font-semibold text-sm mb-1">{skill.name}</h4>
          <div className="flex items-center gap-2 justify-center">
            <div className="w-16 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000"
                style={{ 
                  width: `${skill.percentage}%`,
                  backgroundColor: skill.color 
                }}
              />
            </div>
            <span className="text-gray-500 dark:text-white/40 text-xs font-mono">{skill.percentage}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const categories = ["Frontend", "Backend", "Database", "Emerging"];

  return (
    <section id="skills" className="relative py-32 md:py-40 bg-gray-50 dark:bg-[#0a0a0f] overflow-hidden">
      {/* Ambient glowing background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[800px] bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <div className="text-center mb-16 md:mb-24">
            <motion.p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4">
              Enterprise Tech Stack
            </motion.p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Technology{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Arsenal
              </span>
            </h2>
            <p className="text-gray-500 dark:text-white/40 max-w-2xl mx-auto text-lg">
              We leverage modern, highly-scalable frameworks to ensure your application performs flawlessly under heavy load.
            </p>
          </div>
        </SectionReveal>

        <div className="space-y-16">
          {categories.map((category) => {
            const categorySkills = SKILLS.filter(s => s.category === category);
            if (categorySkills.length === 0) return null;
            
            return (
              <div key={category} className="relative">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-gray-900 dark:text-white text-lg font-bold tracking-wider uppercase whitespace-nowrap">
                    {category}
                  </h3>
                  <div className="h-[1px] w-full bg-gradient-to-r from-black/10 dark:from-white/10 to-transparent" />
                </div>
                
                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {categorySkills.map((skill, index) => (
                    <TechCard key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
