"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";

    // Simulate loading progress
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = ""; // Re-enable scrolling
        }, 400); // Wait for final state before hiding
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0f]"
        >
          {/* Decorative glowing orbs */}
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-violet-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="relative flex flex-col items-center">
            {/* Logo container */}
            <div className="relative w-24 h-24 mb-8">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl border border-black/10 dark:border-white/10"
              />
              {/* Inner rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-xl border border-dashed border-violet-500/50"
              />
              
              {/* Center Logo mark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                  <span className="text-white font-bold text-xl tracking-tight">SK</span>
                </div>
              </div>
            </div>

            {/* Branding Text */}
            <div className="overflow-hidden h-8 mb-2">
              <motion.div
                initial={{ y: 32 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight"
              >
                SK Digital
              </motion.div>
            </div>
            
            <div className="overflow-hidden h-6 mb-8">
              <motion.div
                initial={{ y: 24 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="text-sm text-gray-500 dark:text-white/40 tracking-[0.2em] uppercase"
              >
                Premium Agency
              </motion.div>
            </div>

            {/* Progress line */}
            <div className="w-48 h-[2px] bg-black/5 dark:bg-white/5 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 to-cyan-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Percentage */}
            <motion.div 
              className="mt-4 text-xs font-mono text-gray-400 dark:text-white/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Math.round(progress).toString().padStart(3, '0')}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
