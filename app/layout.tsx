import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/providers/ClientShell";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

// Premium Sans-serif for body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Technical/Modern font for headings, numbers, and tech details
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SK Digital | Premium Web Development Agency",
  description: "Enterprise-grade web applications, mobile apps, and digital solutions built for scale. Transforming businesses through cutting-edge technology.",
  keywords: "web development agency, enterprise software, React development, Next.js experts, UI/UX design, cloud architecture",
  openGraph: {
    title: "SK Digital | Premium Web Development Agency",
    description: "Enterprise-grade web applications, mobile apps, and digital solutions built for scale.",
    url: "https://skdigital.agency",
    siteName: "SK Digital",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SK Digital | Premium Web Development Agency",
    description: "Enterprise-grade web applications, mobile apps, and digital solutions built for scale.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-white dark:bg-[#0a0a0f] text-gray-900 dark:text-white transition-colors duration-300`}
      >
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
