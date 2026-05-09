import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HashScroll } from "@/components/hash-scroll";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

const description =
  "A persistent, structured memory layer that gives AI agents long-term recall. Join the waitlist for early access.";

const ogTitle = "MemoX — structured memory for AI agents & LLMs";

const ogDescription =
  "One persistent memory layer for ChatGPT, Claude, Gemini, Cursor, and custom agents — long-term structured recall you control.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MemoX",
  description,
  applicationName: "MemoX",
  keywords: [
    "MemoX",
    "AI memory",
    "structured memory",
    "LLM memory",
    "AI agent memory",
    "persistent AI context",
    "ChatGPT memory",
    "Claude memory",
    "Gemini memory",
    "Cursor AI memory",
    "long-term AI recall",
    "memory layer",
    "context layer",
    "AI waitlist",
  ],
  authors: [{ name: "MemoX", url: siteUrl }],
  creator: "MemoX",
  publisher: "MemoX",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "MemoX",
    title: ogTitle,
    description: ogDescription,
  },
  twitter: {
    card: "summary",
    title: ogTitle,
    description: ogDescription,
  },
  alternates: {
    canonical: "/",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#111110",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg text-text antialiased">
        <JsonLd />
        <HashScroll />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
