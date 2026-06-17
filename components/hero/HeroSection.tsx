"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";
import TypeWriter from "./TypeWriter";
import StatsCounter from "./StatsCounter";
import { ArrowDown, Sparkles, Globe, Shield, Zap } from "lucide-react";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const floatingFeatures = [
    { Icon: Globe, label: "Global Scale", color: "text-cyan-400", delay: 0 },
    { Icon: Shield, label: "Enterprise Security", color: "text-violet-400", delay: 0.2 },
    { Icon: Zap, label: "Lightning Fast", color: "text-emerald-400", delay: 0.4 },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden"
    >
      <ParticleCanvas />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />

      {/* Background layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-cyan-950/10 pointer-events-none" />

      {/* Floating Feature Pills (Positioned relative to full screen) */}
      {floatingFeatures.map((item, index) => {
        const Icon = item.Icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + item.delay, type: "spring" }}
            className={`absolute hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-black/40 border border-black/10 dark:border-white/10 shadow-lg backdrop-blur-md z-20 ${
              index === 0 ? "top-[20%] left-[5%] xl:left-[10%]" :
              index === 1 ? "top-[30%] right-[5%] xl:right-[10%]" :
              "bottom-[30%] left-[10%] xl:left-[15%]"
            }`}
            style={{ animation: `float ${4 + index}s ease-in-out infinite ${index * 0.5}s` }}
          >
            <Icon className={item.color} size={16} />
            <span className="text-xs font-medium text-gray-800 dark:text-white/80">{item.label}</span>
          </motion.div>
        );
      })}

      {/* Main content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24"
      >
        {/* Agency Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-8 md:mb-12 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-gray-700 dark:text-white/70 text-sm font-medium">
            Trusted by 2+ businesses across India
          </span>
          <span className="hidden sm:inline text-gray-400 dark:text-white/30">•</span>
          <span className="hidden sm:inline text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
            Available for Projects
          </span>
        </motion.div>



        {/* Massive SK Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] select-none pointer-events-none -z-10 flex items-center justify-center w-full overflow-hidden">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-[15rem] sm:text-[25rem] md:text-[35rem] font-black text-gray-900/5 dark:text-white/[0.03] tracking-tighter leading-none"
          >
            SK
          </motion.span>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 relative z-10"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500 font-black drop-shadow-sm">SK DIGITAL</span>
          <br />
          <span className="text-black dark:text-white">Crafts Experiences</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            That Drive Growth
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-600 dark:text-white/60 max-w-2xl mx-auto mb-10 md:mb-12 font-light leading-relaxed"
        >
          A premium digital agency building high-performance solutions for{" "}
          <span className="text-black dark:text-white font-medium"><TypeWriter /></span>
          {" "}— from concept to scale.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-20 md:mb-32"
        >
          <button
            onClick={() => handleNavClick("#projects")}
            className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-medium rounded-full overflow-hidden hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Our Work
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => handleNavClick("#contact")}
            className="group px-8 py-4 bg-black/5 dark:bg-white/5 text-gray-900 dark:text-white font-medium rounded-full border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              <Sparkles size={16} className="text-violet-400 group-hover:text-cyan-400 transition-colors" />
              Start a Project
            </span>
          </button>
        </motion.div>

        {/* Stats */}
        <StatsCounter />

      </motion.div>
    </section>
  );
}
