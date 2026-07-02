import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/providers/ClientShell";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const siteTitle = "SK Digital | Premium Web Development Agency";
const siteDescription =
  "Founder-led digital experiences, enterprise-grade web applications, and product design systems built to help ambitious businesses launch with confidence.";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#060609" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://skdigital.agency"),
  title: {
    default: siteTitle,
    template: "%s | SK Digital",
  },
  description: siteDescription,
  applicationName: "SK Digital",
  referrer: "origin-when-cross-origin",
  keywords: [
    "web development agency",
    "enterprise software",
    "Next.js experts",
    "product design studio",
    "digital transformation",
    "high performance websites",
  ],
  authors: [{ name: "SK Digital" }],
  creator: "SK Digital",
  publisher: "SK Digital",
  alternates: {
    canonical: "/",
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://skdigital.agency",
    siteName: "SK Digital",
    locale: "en_US",
    type: "website",
    images: ["/images/sk-hero-brand.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/sk-hero-brand.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} dark`}
    >
      <body className="font-sans text-gray-900 antialiased transition-colors duration-300 dark:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClientShell>{children}</ClientShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
