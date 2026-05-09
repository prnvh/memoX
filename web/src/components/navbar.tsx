"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  function handleWaitlistClick(e: React.MouseEvent) {
    if (isHome) {
      e.preventDefault();
      document
        .getElementById("waitlist")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-bg/80 backdrop-blur-md border-b border-border/40">
      <Link
        href="/"
        aria-label="MemoX home"
        className="flex items-center opacity-95 transition-opacity hover:opacity-100"
      >
        <Image
          src="/logo.png"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
          priority
        />
      </Link>

      <div className="flex items-center gap-8">
        <Link
          href="/blog"
          className={`text-sm font-medium transition-colors ${
            pathname === "/blog"
              ? "text-text"
              : "text-text-muted hover:text-text"
          }`}
        >
          Blog
        </Link>
        <Link
          href="/about"
          className={`text-sm font-medium transition-colors ${
            pathname === "/about"
              ? "text-text"
              : "text-text-muted hover:text-text"
          }`}
        >
          About
        </Link>
        <Link
          href={isHome ? "#waitlist" : "/#waitlist"}
          onClick={handleWaitlistClick}
          className="px-5 py-2 text-sm font-semibold rounded-full bg-text text-bg hover:bg-accent hover:text-bg transition-all duration-300"
        >
          Waitlist
        </Link>
      </div>
    </nav>
  );
}
