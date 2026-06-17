"use client";

import { motion } from "framer-motion";
import { SOCIAL_LINKS, NAV_LINKS, CONTACT_INFO } from "@/lib/constants";
import { ArrowUp, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gray-50 dark:bg-[#060609] pt-20 pb-10 border-t border-black/10 dark:border-white/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-violet-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToTop();
              }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm tracking-tight">SK</span>
              </div>
              <span className="text-gray-900 dark:text-white font-bold text-xl tracking-tight">
                Digital
              </span>
            </motion.a>
            <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed mb-6">
              A premium digital agency building high-performance websites and enterprise applications that drive measurable growth.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-white/50 hover:bg-violet-500 hover:text-white dark:hover:bg-violet-500 dark:hover:text-white transition-all duration-300"
                    aria-label={link.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-gray-900 dark:text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              {NAV_LINKS.slice(1, 5).map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-gray-500 dark:text-white/50 hover:text-violet-500 dark:hover:text-violet-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-1">
            <h4 className="text-gray-900 dark:text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><button onClick={() => handleNavClick("#services")} className="text-gray-500 dark:text-white/50 hover:text-violet-500 dark:hover:text-violet-400 text-sm transition-colors">Web Development</button></li>
              <li><button onClick={() => handleNavClick("#services")} className="text-gray-500 dark:text-white/50 hover:text-violet-500 dark:hover:text-violet-400 text-sm transition-colors">Mobile Applications</button></li>
              <li><button onClick={() => handleNavClick("#services")} className="text-gray-500 dark:text-white/50 hover:text-violet-500 dark:hover:text-violet-400 text-sm transition-colors">UI/UX Design</button></li>
              <li><button onClick={() => handleNavClick("#services")} className="text-gray-500 dark:text-white/50 hover:text-violet-500 dark:hover:text-violet-400 text-sm transition-colors">Cloud & DevOps</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-gray-900 dark:text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="group flex items-start gap-3 text-gray-500 dark:text-white/50 hover:text-violet-500 dark:hover:text-violet-400 text-sm transition-colors">
                  <Mail size={16} className="mt-0.5 shrink-0 group-hover:text-violet-500" />
                  <span className="break-all">{CONTACT_INFO.email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} className="group flex items-start gap-3 text-gray-500 dark:text-white/50 hover:text-violet-500 dark:hover:text-violet-400 text-sm transition-colors">
                  <Phone size={16} className="mt-0.5 shrink-0 group-hover:text-violet-500" />
                  <span>{CONTACT_INFO.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-500 dark:text-white/50 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{CONTACT_INFO.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 dark:text-white/40 text-sm text-center md:text-left">
            &copy; {currentYear} SK Digital. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">Terms of Service</a>
            
            <button
              onClick={handleScrollToTop}
              className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-white/50 hover:bg-black/10 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-all ml-4"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
