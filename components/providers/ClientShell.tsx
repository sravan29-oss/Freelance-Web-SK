"use client";

import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

// All interactive/browser-dependent components loaded client-only
// This prevents hydration mismatches from browser extensions
// injecting attributes (e.g., fdprocessedid from password managers)
const LoadingScreen = dynamic(() => import("@/components/layout/LoadingScreen"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/effects/CustomCursor"), { ssr: false });
const MouseGlow = dynamic(() => import("@/components/effects/MouseGlow"), { ssr: false });
const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <LoadingScreen />
      <CustomCursor />
      <MouseGlow />
      <Navbar />
      {children}
      <Footer />
    </SmoothScrollProvider>
  );
}
