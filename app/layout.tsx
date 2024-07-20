import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google"; // Set Custom font
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] }); // NextFont
export const metadata: Metadata = {
  title: "COMPLEXDEV",
  description: "COMPLEXDEV Portfolio in NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className} suppressHydrationWarning>

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
