"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/constants";
import SectionReveal from "@/components/effects/SectionReveal";
import TextReveal from "@/components/effects/TextReveal";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

function ProjectCard({ project, index }: { project: typeof PROJECTS[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className="relative mb-32 md:mb-48 last:mb-0 group"
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
        {/* Image mockup container */}
        <div className="w-full lg:w-1/2 relative">
          <motion.div style={{ y }} className="relative z-10 w-full aspect-[4/3] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-white dark:bg-[#0d0d14]">
            {/* Glossy reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-20 pointer-events-none" />
            
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 text-xs text-gray-800 dark:text-white/80 uppercase tracking-wider">
              {project.category}
            </div>
          </motion.div>
          
          {/* Ambient Glow behind image */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r ${project.gradient} rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 -z-10`} />
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className={`inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] mb-6 text-sm`}>
            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.gradient}`} />
            <span className="text-gray-600 dark:text-white/60">Case Study {String(index + 1).padStart(2, '0')}</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-500 dark:group-hover:from-white dark:group-hover:to-white/50 transition-all duration-300">
            {project.title}
          </h3>

          <div className="space-y-6 mb-8">
            <div>
              <h4 className="text-gray-800 dark:text-white/80 font-medium mb-2 text-sm uppercase tracking-wider">The Challenge</h4>
              <p className="text-gray-500 dark:text-white/40 leading-relaxed text-sm md:text-base">{project.challenge}</p>
            </div>
            <div>
              <h4 className="text-gray-800 dark:text-white/80 font-medium mb-2 text-sm uppercase tracking-wider">Our Solution</h4>
              <p className="text-gray-500 dark:text-white/40 leading-relaxed text-sm md:text-base">{project.solution}</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-gray-800 dark:text-white/80 font-medium mb-4 text-sm uppercase tracking-wider">Results</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.results.map((result, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-gray-500 dark:text-white/50 text-sm">{result}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map(tech => (
              <span key={tech} className="px-3 py-1 rounded-md bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.05] text-gray-500 dark:text-white/50 text-xs">
                {tech}
              </span>
            ))}
          </div>

          <button className={`w-fit group/btn flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${project.gradient} text-white text-sm font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden`}>
            <span className="relative z-10 flex items-center gap-2">
              View Case Study
              <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-white dark:bg-[#060609]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16 md:mb-20">
            <motion.p className="text-cyan-600 dark:text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4">
              Our Portfolio
            </motion.p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <TextReveal as="span" className="text-gray-900 dark:text-white" staggerChildren={0.06}>
                Client Success
              </TextReveal>{" "}
              <TextReveal as="span" className="bg-gradient-to-r from-cyan-600 to-violet-600 dark:from-cyan-400 dark:to-violet-400 bg-clip-text text-transparent" delay={0.3} staggerChildren={0.06}>
                Stories
              </TextReveal>
            </h2>
            <p className="text-gray-500 dark:text-white/40 max-w-2xl mx-auto text-lg">
              Real case studies from real businesses. Measurable results that speak louder than promises.
            </p>
          </div>
        </SectionReveal>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-16 md:mb-24"
        >
          {PROJECT_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20"
                  : "bg-black/5 dark:bg-white/5 text-gray-600 dark:text-white/50 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="flex flex-col">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
