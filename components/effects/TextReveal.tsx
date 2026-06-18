"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  staggerChildren?: number;
  once?: boolean;
  splitBy?: "word" | "character";
}

export default function TextReveal({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  staggerChildren = 0.04,
  once = true,
  splitBy = "word",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const units = splitBy === "word" ? children.split(" ") : children.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -90,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <Tag ref={ref} className={className} style={{ perspective: "1000px" }}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-flex flex-wrap"
        aria-label={children}
      >
        {units.map((unit, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block origin-bottom"
            style={{ willChange: "transform, opacity, filter" }}
          >
            {unit}
            {splitBy === "word" && index < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
