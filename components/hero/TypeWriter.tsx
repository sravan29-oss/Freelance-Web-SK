"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TYPEWRITER_WORDS } from "@/lib/constants";

export default function TypeWriter() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = TYPEWRITER_WORDS[currentWordIndex];

  const tick = useCallback(() => {
    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      } else {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      if (displayedText.length > 0) {
        setDisplayedText(displayedText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setCurrentWordIndex(
          (prevIndex) => (prevIndex + 1) % TYPEWRITER_WORDS.length
        );
        return;
      }
    }
  }, [displayedText, isDeleting, currentWord]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span className="inline-flex items-center">
      <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
        {displayedText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1em] bg-gradient-to-b from-violet-400 to-cyan-400 ml-1 align-middle"
      />
    </span>
  );
}
