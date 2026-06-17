"use client";

import dynamic from "next/dynamic";

// Dynamic imports with specific loading strategies for complex sections
const HeroSection = dynamic(() => import("@/components/hero/HeroSection"), {
  ssr: false, // Relies heavily on Three.js canvas which is client-only
});
const TrustedBySection = dynamic(() => import("@/components/trusted-by/TrustedBySection"));
const SKBrandSection = dynamic(() => import("@/components/brand/SKBrandSection"), {
  ssr: false, // 3D elements inside
});
const FounderSection = dynamic(() => import("@/components/brand/FounderSection"));
const ServicesSection = dynamic(() => import("@/components/services/ServicesSection"));
const ProjectsSection = dynamic(() => import("@/components/projects/ProjectsSection"));
const ProcessSection = dynamic(() => import("@/components/process/ProcessSection"));
const WhyChooseSection = dynamic(() => import("@/components/why-choose/WhyChooseSection"));
const SkillsSection = dynamic(() => import("@/components/skills/SkillsSection"));
const TestimonialsSection = dynamic(() => import("@/components/testimonials/TestimonialsSection"));
const ContactSection = dynamic(() => import("@/components/contact/ContactSection"));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden bg-white dark:bg-[#0a0a0f]">
      {/* 
        MNC / Enterprise flow:
        1. Hero (Hook)
        2. Trusted By (Social Proof)
        3. Brand (Mission & Culture)
        4. Founder (Leadership)
        5. Services (Offerings)
        6. Projects (Results)
        7. Process (Methodology)
        8. Why Choose (Value Props)
        9. Skills (Tech Stack)
        10. Testimonials (Validation)
        11. Contact (Conversion)
      */}
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
