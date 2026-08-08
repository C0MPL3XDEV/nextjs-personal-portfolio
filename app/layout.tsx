import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { CommandPalette } from "@/components/command-palette";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { getAllPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.title,
  url: siteConfig.url,
  image: `${siteConfig.url}logo.png`,
  email: `mailto:${siteConfig.email}`,
  description: siteConfig.description,
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.instagram,
    siteConfig.links.x,
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
};

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  manifest: "/site.webmanifest",

  description: siteConfig.description,

  applicationName: siteConfig.name,
  creator: siteConfig.name,

  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.links.github,
    },
  ],

  keywords: [
    "Full Stack Developer",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Portfolio",
    "Laravel",
    "Angular",
    "Cybersecurity",
    "CarmineDev",
    "carmine.developer",
    "C0MPL3XDEV",
    "c0mpl3xdev"
  ],

  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${siteConfig.url}blog/rss.xml`,
    },
  },

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
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/op-image.png",
        alt: `${siteConfig.name} - Portfolio`,
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@COMPLEXDEV2",
    images: ["/op-image.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts().map((post) => ({ title: post.title, slug: post.slug }));

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", dmSans.variable, spaceGrotesk.variable)}>
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          {children}
          <CommandPalette posts={posts} />
        </ThemeProvider>
      </body>
    </html>
  );
}
