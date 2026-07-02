"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1.35 }}
        className="fixed inset-x-0 top-0 z-[100]"
      >
        <div className="section-shell pt-4">
          <div
            className={`flex items-center justify-between gap-3 rounded-[28px] border px-4 py-3 transition-all duration-500 md:px-5 ${
              isScrolled
                ? "border-black/10 bg-white/88 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#06070d]/82 dark:shadow-[0_18px_60px_rgba(0,0,0,0.38)]"
                : "border-black/6 bg-white/58 backdrop-blur-xl dark:border-white/8 dark:bg-white/[0.04]"
            }`}
          >
            <motion.a
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                handleNavClick("#home");
              }}
              className="relative z-10 flex min-w-0 items-center gap-3"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-violet-500 to-cyan-500 shadow-[0_12px_30px_rgba(139,92,246,0.3)]">
                <span className="text-base font-black tracking-tight text-white">SK</span>
                <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400 dark:border-[#06070d]" />
              </div>
              <div className="hidden min-w-0 sm:block">
                <p className="truncate text-lg font-bold tracking-tight text-gray-950 dark:text-white">
                  SK Digital
                </p>
                <p className="truncate text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-500 dark:text-white/45">
                  Strategy • Design • Engineering
                </p>
              </div>
            </motion.a>

            <div className="hidden xl:flex items-center gap-2 rounded-full border border-black/6 bg-black/[0.03] px-4 py-2 text-xs font-semibold text-gray-600 backdrop-blur-xl dark:border-white/8 dark:bg-white/[0.03] dark:text-white/55">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Founder-led delivery for ambitious brands
            </div>

            <div className="hidden lg:flex items-center gap-1 rounded-full border border-black/8 bg-white/80 px-2 py-2 shadow-[0_12px_40px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:border-white/8 dark:bg-white/[0.03] dark:shadow-none">
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-gray-950 dark:text-white/55 dark:hover:text-white"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.label}
                  <span className="absolute inset-x-4 bottom-1 h-[2px] scale-x-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />

              <motion.button
                onClick={() => handleNavClick("#contact")}
                className="hidden items-center gap-2 rounded-full bg-gray-950 px-5 py-2.5 text-sm font-bold text-white shadow-[0_14px_30px_rgba(15,23,42,0.16)] transition-all duration-300 hover:bg-violet-600 md:flex dark:bg-white dark:text-gray-950 dark:hover:bg-violet-400"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Start a Project
                <ArrowRight size={15} />
              </motion.button>

              <button
                onClick={() => setIsMobileOpen((open) => !open)}
                className="rounded-2xl border border-black/8 bg-black/[0.03] p-2.5 text-gray-700 transition-colors hover:text-gray-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/75 dark:hover:text-white lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-[#02040a]/60 backdrop-blur-xl lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-black/10 bg-white/96 shadow-2xl dark:border-white/10 dark:bg-[#060609]/96"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-black/8 p-6 dark:border-white/10">
                <div>
                  <p className="text-lg font-bold tracking-tight text-gray-950 dark:text-white">
                    SK Digital
                  </p>
                  <p className="text-xs uppercase tracking-[0.28em] text-gray-500 dark:text-white/45">
                    Product Studio
                  </p>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-2xl border border-black/8 bg-black/[0.03] p-2 text-gray-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-8 p-6">
                <div className="space-y-3">
                  {NAV_LINKS.map((link, index) => (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.08 }}
                      onClick={() => handleNavClick(link.href)}
                      className="flex w-full items-center justify-between rounded-2xl border border-black/8 bg-black/[0.02] px-4 py-4 text-left text-lg font-semibold text-gray-900 transition-colors hover:border-violet-500/20 hover:text-violet-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:hover:text-violet-300"
                    >
                      {link.label}
                      <ArrowRight size={18} className="text-gray-400 dark:text-white/35" />
                    </motion.button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="premium-panel p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-500 dark:text-violet-300">
                      Executive Feel
                    </p>
                    <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-white/60">
                      Premium presentation, founder-led communication, and delivery
                      systems designed to help your business look ready for the
                      next level.
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavClick("#contact")}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-950 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-violet-600 dark:bg-white dark:text-gray-950 dark:hover:bg-violet-400"
                  >
                    Start a Project
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
