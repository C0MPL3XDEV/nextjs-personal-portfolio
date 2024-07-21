import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google"; // Set Custom font
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] }); // NextFont

export const metadata: Metadata = {
    metadataBase: new URL("https://next-supabase-vote.vercel.app/"),

    title: {
        template: "COMPLEXDEV | DevPortfolio",
        default: "COMPLEXDEV | DevPortfolio",
    },
    authors: {
        name: "Carmine G.",
    },

    description:
        "Based in 🇮🇹, I'm CS Student studying to become a " +
        "Full Stack Developer, with passion for developing web application " +
        "and desktop application that users love ",
    openGraph: {
        title: "COMPLEXDEV | DevPortfolio",
        description:
            "Based in 🇮🇹, I'm CS Student studying to become a " +
            "Full Stack Developer, with passion for developing web application " +
            "and desktop application that users love ",
        url: "https://next-supabase-vote.vercel.app/",
        siteName: "COMPLEXDEV | DevPortfolio",
        images: "/portfolio-img.png",
        type: "website",
    },
    keywords: ["complexdev", "carmine giuseppe chessa", "E4GL3OS1NT", "C0MPL3XDEV", "carmine.developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className} suppressHydrationWarning>
      <SpeedInsights />
      <Analytics />

      <ThemeProvider // Set Default Theme ShadcnUI
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
      >
          {children}
      </ThemeProvider>

      </body>
    </html>
  );
}
