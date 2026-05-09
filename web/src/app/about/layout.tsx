import type { Metadata } from "next";

const description =
  "About MemoX: a persistent, private memory layer for AI — structured recall for ChatGPT, Claude, Gemini, Cursor, and agents you build.";

export const metadata: Metadata = {
  title: "MemoX",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/about",
    siteName: "MemoX",
    title: "About MemoX — structured memory for AI",
    description,
  },
  twitter: {
    card: "summary",
    title: "About MemoX — structured memory for AI",
    description,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
