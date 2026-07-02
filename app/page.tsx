"use client";

import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("@/components/hero/HeroSection"), {
  ssr: false,
});
const TrustedBySection = dynamic(
  () => import("@/components/trusted-by/TrustedBySection")
);
const SKBrandSection = dynamic(() => import("@/components/brand/SKBrandSection"), {
  ssr: false,
});
const FounderSection = dynamic(() => import("@/components/brand/FounderSection"));
const ServicesSection = dynamic(() => import("@/components/services/ServicesSection"));
const ProjectsSection = dynamic(() => import("@/components/projects/ProjectsSection"));
const ProcessSection = dynamic(() => import("@/components/process/ProcessSection"));
const WhyChooseSection = dynamic(
  () => import("@/components/why-choose/WhyChooseSection")
);
const SkillsSection = dynamic(() => import("@/components/skills/SkillsSection"));
const TestimonialsSection = dynamic(
  () => import("@/components/testimonials/TestimonialsSection")
);
const ContactSection = dynamic(() => import("@/components/contact/ContactSection"));

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[28rem] h-[32rem] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.14),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.1)_18%,transparent_42%,rgba(255,255,255,0.06)_100%)] dark:bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.02)_18%,transparent_42%,rgba(255,255,255,0.01)_100%)]" />

      <HeroSection />
      <TrustedBySection />
      <SKBrandSection />
      <FounderSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <WhyChooseSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
