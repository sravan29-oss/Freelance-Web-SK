"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe, Shield, Sparkles, Zap } from "lucide-react";
import MagneticButton from "@/components/effects/MagneticButton";
import TextReveal from "@/components/effects/TextReveal";
import AuroraBackground from "./AuroraBackground";
import StatsCounter from "./StatsCounter";
import TypeWriter from "./TypeWriter";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  const floatingFeatures = [
    { Icon: Globe, label: "Global-ready polish", color: "text-cyan-400", delay: 0 },
    {
      Icon: Shield,
      label: "Trust-first delivery",
      color: "text-violet-400",
      delay: 0.2,
    },
    { Icon: Zap, label: "Fast, clean execution", color: "text-emerald-400", delay: 0.4 },
  ];

  const deliveryHighlights = [
    "Founder-led communication",
    "High-trust visual systems",
    "Production-minded engineering",
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[115vh] items-center justify-center overflow-hidden pb-16 pt-32 md:pt-36"
    >
      <AuroraBackground />

      <div className="absolute left-[-4rem] top-[16%] h-72 w-72 rounded-full bg-violet-600/12 blur-[110px]" />
      <div className="absolute bottom-[18%] right-[-5rem] h-96 w-96 rounded-full bg-cyan-500/12 blur-[130px]" />
      <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/6 blur-[160px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/10 via-transparent to-cyan-950/10" />

      {floatingFeatures.map((item, index) => {
        const Icon = item.Icon;

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 + item.delay, type: "spring" }}
            className={`absolute hidden items-center gap-2 rounded-full border border-black/8 bg-white/82 px-4 py-2 text-xs font-semibold text-gray-700 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-black/35 dark:text-white/75 lg:flex ${
              index === 0
                ? "left-[5%] top-[22%] xl:left-[9%]"
                : index === 1
                  ? "right-[5%] top-[30%] xl:right-[10%]"
                  : "bottom-[28%] left-[8%] xl:left-[13%]"
            }`}
            style={{
              animation: `float ${4 + index}s ease-in-out infinite ${index * 0.5}s`,
            }}
          >
            <Icon className={item.color} size={15} />
            <span>{item.label}</span>
          </motion.div>
        );
      })}

      <motion.div style={{ opacity, y }} className="section-shell relative z-10">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            <span className="section-kicker border-black/8 bg-white/76 text-gray-600 shadow-[0_16px_40px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60">
              Executive-grade digital craftsmanship
            </span>
          </motion.div>

          <div className="relative mt-10">
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 flex w-full -translate-x-1/2 -translate-y-[58%] select-none justify-center overflow-hidden">
              <motion.span
                initial={{ opacity: 0, scale: 0.84 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                className="text-[14rem] font-black leading-none tracking-[-0.08em] text-gray-900/[0.04] dark:text-white/[0.03] sm:text-[22rem] md:text-[30rem]"
              >
                SK
              </motion.span>
            </div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="relative z-10 mb-8 text-[clamp(3.6rem,10vw,8rem)] font-black leading-[0.9] tracking-[-0.06em] text-gray-950 dark:text-white"
            >
              <TextReveal
                as="span"
                className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm"
                delay={0.3}
                staggerChildren={0.08}
              >
                SK DIGITAL
              </TextReveal>
              <br />
              <TextReveal
                as="span"
                className="text-gray-950 dark:text-white"
                delay={0.6}
                staggerChildren={0.06}
              >
                Builds Premium
              </TextReveal>
              <br />
              <TextReveal
                as="span"
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 bg-clip-text text-transparent"
                delay={0.9}
                staggerChildren={0.06}
              >
                Growth Experiences
              </TextReveal>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.15 }}
            className="section-copy mx-auto max-w-3xl text-lg font-medium text-gray-600 dark:text-white/58 md:text-xl"
          >
            Founder-led product studio shipping elegant, high-performance systems
            for <span className="font-semibold text-gray-950 dark:text-white"><TypeWriter /></span>
            {" "}with the polish, clarity, and confidence modern brands expect.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.35 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
          >
            <MagneticButton
              onClick={() => handleNavClick("#projects")}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-[0_20px_50px_rgba(139,92,246,0.3)] transition-all duration-300 hover:shadow-[0_24px_60px_rgba(139,92,246,0.35)]"
              strength={0.35}
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Our Work
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
              <div className="absolute inset-0 bg-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </MagneticButton>

            <MagneticButton
              onClick={() => handleNavClick("#contact")}
              className="group rounded-full border border-black/10 bg-white/82 px-8 py-4 font-semibold text-gray-900 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-black/20 hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:border-white/20 dark:hover:bg-white/[0.08]"
              strength={0.25}
            >
              <span className="flex items-center gap-2">
                <Sparkles
                  size={16}
                  className="text-violet-500 transition-colors group-hover:text-cyan-400"
                />
                Start a Project
              </span>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.55 }}
            className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-3"
          >
            {deliveryHighlights.map((item) => (
              <span
                key={item}
                className="metric-chip border-black/8 bg-white/74 text-gray-600 shadow-[0_14px_35px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55"
              >
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.75 }}
            className="premium-panel mx-auto mt-14 max-w-4xl p-4 md:p-6"
          >
            <StatsCounter />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
