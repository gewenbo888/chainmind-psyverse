import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { CMProvider } from "@/lib/providers";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chainmind.psyverse.fun"),
  title: "ChainMind — cognitive system for blockchain security, architecture, and trust | 链脑",
  description:
    "An interactive system for security reasoning across blockchain architectures. Compare trust models, simulate cross-chain flows, replay historic exploits, and see where math protects you — and where you are simply trusting people.",
  keywords: [
    "blockchain security",
    "trust assumptions",
    "cross-chain bridge security",
    "rollup architecture",
    "ZK proof system",
    "trust model analysis",
    "bridge hack database",
    "Psy Protocol",
    "blockchain trust matrix",
    "区块链安全",
    "信任模型",
    "跨链桥",
    "ZK 证明",
    "Psyverse",
  ],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: {
    canonical: "/",
    languages: { en: "/", "zh-CN": "/", "x-default": "/" },
  },
  openGraph: {
    title: "ChainMind — where does the safety actually come from?",
    description:
      "An interactive system for blockchain security and trust analysis.",
    url: "https://chainmind.psyverse.fun/",
    siteName: "ChainMind",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChainMind — where does the safety actually come from?",
    description: "Architecture, trust, risks, simulation. Psy as case study.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#08090F" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <CMProvider>
          <Nav />
          {children}
          <Footer />
        </CMProvider>
        <Script
          src="https://analytics-dashboard-two-blue.vercel.app/tracker.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
