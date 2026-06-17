"use client";

import { useRef, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import SectionReveal from "@/components/effects/SectionReveal";
import { ArrowUpRight } from "lucide-react";

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] p-6 md:p-8 transition-all duration-500 ease-out hover:border-black/[0.15] dark:hover:border-white/[0.15] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] hover:shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_8px_32px_rgba(255,255,255,0.02)] overflow-hidden backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
        style={{
          transition: "transform 0.15s ease-out, border-color 0.5s, background-color 0.5s",
        }}
      >
        {/* Gradient glow */}
        <div
          className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${service.accentColor}40, transparent)` }}
        />

        {/* Icon */}
        <div
          className="relative w-14 h-14 rounded-2xl p-[1px] mb-6"
          style={{ background: `linear-gradient(135deg, ${service.accentColor}40, ${service.accentColor}10)` }}
        >
          <div className="w-full h-full rounded-2xl bg-white dark:bg-[#0d0d14] flex items-center justify-center">
            <Icon size={24} style={{ color: service.accentColor }} />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          {service.title}
          <ArrowUpRight
            size={16}
            className="text-gray-400 dark:text-white/20 group-hover:text-gray-900 dark:group-hover:text-white/60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
          />
        </h3>
        <p className="text-gray-600 dark:text-white/40 text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Benefits */}
        <ul className="space-y-2">
          {service.benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-center gap-2 text-gray-600 dark:text-white/30 text-sm"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: service.accentColor }}
              />
              {benefit}
            </li>
          ))}
        </ul>

        {/* Bottom gradient line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-60 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-24 md:py-32" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 dark:via-violet-950/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16 md:mb-20">
            <motion.p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-4">
              What We Offer
            </motion.p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Enterprise-Grade{" "}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-gray-600 dark:text-white/40 max-w-2xl mx-auto text-lg">
              End-to-end digital solutions built with cutting-edge technologies, designed to scale with your business.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
