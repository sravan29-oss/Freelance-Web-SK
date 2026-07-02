"use client";

import { MouseEvent, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionReveal from "@/components/effects/SectionReveal";
import TextReveal from "@/components/effects/TextReveal";
import { SERVICES } from "@/lib/constants";

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 26;
    const rotateY = (centerX - x) / 26;

    cardRef.current.style.transform =
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="gradient-border-card card-spotlight group relative h-full overflow-hidden rounded-[2rem] border border-black/[0.08] bg-white/80 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-500 ease-out hover:border-transparent dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-[0_20px_60px_rgba(0,0,0,0.22)] md:p-7"
        style={{
          transition:
            "transform 0.15s ease-out, border-color 0.5s, background-color 0.5s, box-shadow 0.5s",
        }}
      >
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
          style={{
            background: `radial-gradient(circle, ${service.accentColor}4d, transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div
              className="rounded-[1.25rem] p-[1px]"
              style={{
                background: `linear-gradient(135deg, ${service.accentColor}55, ${service.accentColor}12)`,
              }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-white dark:bg-[#0d0d14]">
                <Icon size={24} style={{ color: service.accentColor }} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full border border-black/8 bg-black/[0.03] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500 dark:border-white/8 dark:bg-white/[0.03] dark:text-white/42">
                {String(index + 1).padStart(2, "0")}
              </span>
              <ArrowUpRight
                size={18}
                className="text-gray-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gray-900 dark:text-white/28 dark:group-hover:text-white/75"
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
            {service.title}
          </h3>
          <p className="section-copy mt-3 text-sm md:text-base">
            {service.description}
          </p>

          <div className="mt-8 grid gap-2">
            {service.benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-2xl border border-black/6 bg-black/[0.02] px-4 py-3 text-sm font-medium text-gray-600 dark:border-white/6 dark:bg-white/[0.02] dark:text-white/55"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: service.accentColor }}
                />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-black/6 pt-5 dark:border-white/6">
            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-gray-500 dark:text-white/38">
              Strategy • Design • Build
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-[0.24em]"
              style={{ color: service.accentColor }}
            >
              Premium delivery
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />

      <div className="section-shell relative z-10">
        <SectionReveal>
          <div className="mb-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <span className="section-kicker">What We Offer</span>
              <h2 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
                <TextReveal
                  as="span"
                  className="text-gray-950 dark:text-white"
                  staggerChildren={0.06}
                >
                  Enterprise-grade
                </TextReveal>
                <br />
                <TextReveal
                  as="span"
                  className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-400"
                  delay={0.28}
                  staggerChildren={0.06}
                >
                  solutions with polish
                </TextReveal>
              </h2>
            </div>

            <div className="premium-panel p-6 md:p-7">
              <p className="section-copy text-base md:text-lg">
                We combine visual maturity, thoughtful UX, and modern engineering
                to create products that feel ready for serious business from day one.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="metric-chip">Founder-led scoping</span>
                <span className="metric-chip">Design-system thinking</span>
                <span className="metric-chip">Launch-ready execution</span>
              </div>
            </div>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
