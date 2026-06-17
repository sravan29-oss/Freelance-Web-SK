"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Mail, ArrowRight, Quote } from "lucide-react";
import SectionReveal from "@/components/effects/SectionReveal";
import { CONTACT_INFO } from "@/lib/constants";

export default function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="leadership" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-[#060609]">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 dark:from-white/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: Founder Photo */}
            <div className="w-full lg:w-5/12 relative">
              <motion.div style={{ y }} className="relative z-10 w-full aspect-[4/5] rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-gray-100 dark:bg-white/5">
                {/* Decorative corner accent */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-violet-500 to-transparent opacity-20 z-20" />
                
                <Image
                  src="/images/profile-v2.jpeg"
                  alt="SK - Sravan Kumar Naredla"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                
                {/* Overlay gradient for text readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 bg-white/90 dark:bg-black/50 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-2xl px-5 py-3 shadow-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white shrink-0">
                    <span className="font-bold text-sm text-shimmer">SK</span>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-bold text-sm leading-tight">Sravan Kumar</p>
                    <p className="text-gray-500 dark:text-white/60 text-xs font-medium">Founder & Principal</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating SK AI Badge */}
              <motion.div 
                animate={{ y: [0, -15, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-8 z-30"
              >
                <div className="relative group cursor-default">
                  {/* Outer glow pulse */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl blur opacity-70 group-hover:opacity-100 animate-pulse transition duration-1000" />
                  
                  {/* Inner tech container */}
                  <div className="relative flex items-center justify-center bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 rounded-xl" />
                    
                    <span className="relative z-10 text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500 tracking-wider font-mono">
                      SK
                    </span>
                    
                    {/* Corner tech accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400 rounded-tl-md" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-violet-400 rounded-br-md" />
                  </div>
                </div>
              </motion.div>
              
              {/* Ambient Glow behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-full blur-[80px] -z-10" />
            </div>

            {/* Right: Content / Letter from Founder */}
            <div className="w-full lg:w-7/12">
              <div className="mb-8">
                <motion.p className="text-violet-600 dark:text-violet-400 text-sm font-medium tracking-widest uppercase mb-4">
                  Leadership
                </motion.p>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  A Message from our{" "}
                  <span className="bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
                    Founder
                  </span>
                </h2>
              </div>

              <div className="relative">
                <Quote className="absolute -top-4 -left-6 w-12 h-12 text-black/5 dark:text-white/5 rotate-180" />
                
                <div className="space-y-6 text-gray-600 dark:text-white/60 text-lg leading-relaxed relative z-10">
                  <p>
                    "When I started SK Digital, the vision was simple: bridge the gap between enterprise-grade technology and businesses that need to scale. We noticed that too many companies were settling for generic digital solutions that couldn't handle growth."
                  </p>
                  <p>
                    "Today, my team and I engineer highly scalable, performant architectures that serve as competitive advantages for our clients. Whether we're building a hospital management system or a high-traffic AI platform, our commitment to clean code and pixel-perfect design remains absolute."
                  </p>
                  <p className="font-medium text-gray-800 dark:text-white/80">
                    "Your success is our success. We don't just write code; we build digital businesses."
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center gap-6 justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-mono tracking-tight mb-1">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500 mr-2">
                      SK
                    </span>
                    | Sravan Kumar Naredla
                  </h3>
                  <p className="text-gray-500 dark:text-white/40 text-sm font-medium uppercase tracking-wider">
                    Founder & Principal Architect
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:bg-violet-600 dark:hover:bg-violet-400 hover:text-white dark:hover:text-gray-900 transition-all duration-300 group"
                  >
                    Message Me
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
