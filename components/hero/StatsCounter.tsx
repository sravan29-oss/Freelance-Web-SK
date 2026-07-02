"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Number((eased * value).toFixed(value % 1 === 0 ? 0 : 1)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {STATS.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 + index * 0.08, ease: "easeOut" }}
          className="group"
        >
          <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-black/8 bg-white/84 px-4 py-5 text-center shadow-[0_12px_35px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20 dark:border-white/10 dark:bg-white/[0.05] dark:shadow-none">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <p className="bg-gradient-to-r from-gray-950 via-gray-700 to-gray-500 bg-clip-text text-2xl font-black tracking-tight text-transparent dark:from-white dark:via-white dark:to-white/70 md:text-3xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-white/42">
              {stat.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
