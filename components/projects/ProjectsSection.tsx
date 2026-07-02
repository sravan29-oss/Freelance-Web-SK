"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import SectionReveal from "@/components/effects/SectionReveal";
import TextReveal from "@/components/effects/TextReveal";
import { PROJECT_CATEGORIES, PROJECTS } from "@/lib/constants";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.96, 1, 1, 0.96]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className="group relative mb-12 last:mb-0"
    >
      <div className="premium-panel overflow-hidden p-4 md:p-6 lg:p-8">
        <div
          className={`flex flex-col items-center gap-10 lg:gap-16 ${
            isEven ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
        >
          <div className="relative w-full lg:w-1/2">
            <motion.div
              style={{ y }}
              className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#0d0d14] dark:shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
            >
              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 z-30 rounded-full border border-black/10 bg-white/84 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-gray-700 backdrop-blur-xl dark:border-white/10 dark:bg-black/45 dark:text-white/70">
                {project.category}
              </div>
            </motion.div>

            <div
              className={`pointer-events-none absolute left-1/2 top-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${project.gradient} opacity-30 blur-[100px] transition-opacity duration-700 group-hover:opacity-50`}
            />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-black/8 bg-black/[0.03] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500 dark:border-white/8 dark:bg-white/[0.03] dark:text-white/42">
                Case Study {String(index + 1).padStart(2, "0")}
              </span>
              <span className="metric-chip">Outcome-led execution</span>
            </div>

            <h3 className="text-3xl font-black tracking-tight text-gray-950 transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-950 group-hover:to-gray-600 group-hover:bg-clip-text dark:text-white dark:group-hover:from-white dark:group-hover:to-white/55 md:text-4xl">
              {project.title}
            </h3>

            <div className="mt-8 grid gap-6">
              <div className="rounded-[1.5rem] border border-black/6 bg-black/[0.02] p-5 dark:border-white/6 dark:bg-white/[0.02]">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gray-500 dark:text-white/40">
                  The Challenge
                </p>
                <p className="section-copy mt-3 text-sm md:text-base">
                  {project.challenge}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-black/6 bg-black/[0.02] p-5 dark:border-white/6 dark:bg-white/[0.02]">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gray-500 dark:text-white/40">
                  Our Solution
                </p>
                <p className="section-copy mt-3 text-sm md:text-base">
                  {project.solution}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gray-500 dark:text-white/40">
                Results
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.results.map((result) => (
                  <div
                    key={result}
                    className="flex items-start gap-3 rounded-2xl border border-black/6 bg-white/70 px-4 py-3 text-sm text-gray-600 dark:border-white/6 dark:bg-white/[0.03] dark:text-white/55"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                    <span>{result}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-black/8 bg-black/[0.03] px-3 py-2 text-xs font-semibold text-gray-500 dark:border-white/8 dark:bg-white/[0.03] dark:text-white/45"
                >
                  {tech}
                </span>
              ))}
            </div>

            <button
              type="button"
              className="group/btn mt-8 inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)] transition-all duration-300 hover:bg-violet-600 dark:bg-white dark:text-gray-950 dark:hover:bg-violet-400"
            >
              View Case Study
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="absolute inset-0 bg-white/40 dark:bg-[#060609]" />

      <div className="section-shell relative z-10">
        <SectionReveal>
          <div className="mb-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <span className="section-kicker">Our Portfolio</span>
              <h2 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
                <TextReveal
                  as="span"
                  className="text-gray-950 dark:text-white"
                  staggerChildren={0.06}
                >
                  Client success stories
                </TextReveal>
                <br />
                <TextReveal
                  as="span"
                  className="bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-violet-400"
                  delay={0.28}
                  staggerChildren={0.06}
                >
                  presented like real case studies
                </TextReveal>
              </h2>
            </div>

            <div className="premium-panel p-6 md:p-7">
              <p className="section-copy text-base md:text-lg">
                These showcase projects are framed to communicate trust, outcomes,
                and execution quality the way serious clients expect.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="metric-chip">4 featured stories</span>
                <span className="metric-chip">Clear business outcomes</span>
                <span className="metric-chip">Presentation-ready portfolio</span>
              </div>
            </div>
          </div>
        </SectionReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-14 flex flex-wrap gap-3"
        >
          {PROJECT_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-[0_18px_36px_rgba(139,92,246,0.2)]"
                  : "border border-black/8 bg-white/80 text-gray-600 backdrop-blur-xl hover:border-black/14 hover:text-gray-950 dark:border-white/8 dark:bg-white/[0.04] dark:text-white/55 dark:hover:border-white/14 dark:hover:text-white"
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
