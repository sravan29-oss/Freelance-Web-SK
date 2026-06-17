"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import SectionReveal from "@/components/effects/SectionReveal";
import { Quote, Star, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  // Handle responsive cards to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsToShow(3); // Desktop: 3 cards
      else if (window.innerWidth >= 768) setCardsToShow(2); // Tablet: 2 cards
      else setCardsToShow(1); // Mobile: 1 card
    };
    
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    // Move by the number of cards shown, but ensure we don't go out of bounds awkwardly
    setCurrentIndex((prev) => {
      const nextIndex = prev + newDirection;
      if (nextIndex < 0) return Math.max(0, TESTIMONIALS.length - cardsToShow);
      if (nextIndex > TESTIMONIALS.length - cardsToShow) return 0;
      return nextIndex;
    });
  };

  // Auto-scroll is disabled for multi-card view to prevent jarring UX
  
  // Get the visible testimonials based on current index and cards to show
  const visibleTestimonials = TESTIMONIALS.slice(currentIndex, currentIndex + cardsToShow);

  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-[#060609]">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-600/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <motion.p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium tracking-widest uppercase mb-4">
                Client Success
              </motion.p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Don't Just Take{" "}
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
                  Our Word
                </span>
              </h2>
              <p className="text-gray-500 dark:text-white/40 text-lg">
                Hear from the founders, CEOs, and administrators who trusted SK Digital to transform their operations.
              </p>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-3 pb-2">
              <button
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors z-20 ${
                  currentIndex === 0 
                    ? "bg-transparent border-black/5 dark:border-white/5 text-gray-300 dark:text-white/20 cursor-not-allowed" 
                    : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-gray-900 dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
                }`}
                onClick={() => currentIndex > 0 && paginate(-1)}
                disabled={currentIndex === 0}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors z-20 ${
                  currentIndex >= TESTIMONIALS.length - cardsToShow
                    ? "bg-transparent border-black/5 dark:border-white/5 text-gray-300 dark:text-white/20 cursor-not-allowed" 
                    : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-gray-900 dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
                }`}
                onClick={() => currentIndex < TESTIMONIALS.length - cardsToShow && paginate(1)}
                disabled={currentIndex >= TESTIMONIALS.length - cardsToShow}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </SectionReveal>

        <div className="relative min-h-[400px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleTestimonials.map((testimonial, i) => (
                <div 
                  key={testimonial.name}
                  className="bg-gray-50 dark:bg-[#0a0a0f] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl p-8 flex flex-col h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] relative"
                >
                  <Quote className="text-violet-500/20 w-12 h-12 absolute top-6 right-6 rotate-180" />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 dark:text-white/70 leading-relaxed mb-8 flex-grow">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto border-t border-black/5 dark:border-white/5 pt-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div className="text-left">
                      <h4 className="text-gray-900 dark:text-white font-semibold flex items-center gap-1.5">
                        {testimonial.name}
                        <BadgeCheck size={16} className="text-blue-500" />
                      </h4>
                      <p className="text-gray-500 dark:text-white/40 text-xs mt-0.5 font-medium">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation */}
          <div className="flex md:hidden justify-center gap-4 mt-8">
            <button
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                currentIndex === 0 
                  ? "bg-transparent border-black/5 dark:border-white/5 text-gray-300 dark:text-white/20" 
                  : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-gray-900 dark:text-white"
              }`}
              onClick={() => currentIndex > 0 && paginate(-1)}
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                currentIndex >= TESTIMONIALS.length - cardsToShow
                  ? "bg-transparent border-black/5 dark:border-white/5 text-gray-300 dark:text-white/20" 
                  : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-gray-900 dark:text-white"
              }`}
              onClick={() => currentIndex < TESTIMONIALS.length - cardsToShow && paginate(1)}
              disabled={currentIndex >= TESTIMONIALS.length - cardsToShow}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
