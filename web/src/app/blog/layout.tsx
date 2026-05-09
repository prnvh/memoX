import type { Metadata } from "next";

const description =
  "MemoX blog: research, engineering notes, and product updates on structured AI memory, long-term context, and agent recall.";

export const metadata: Metadata = {
  title: "MemoX",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/blog",
    siteName: "MemoX",
    title: "MemoX blog — AI memory & engineering",
    description,
  },
  twitter: {
    card: "summary",
    title: "MemoX blog — AI memory & engineering",
    description,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
