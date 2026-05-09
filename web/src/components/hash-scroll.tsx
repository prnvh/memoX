"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Next.js client navigation to `/#section` does not always scroll to the hash.
 * Restore scroll when the home page loads with a hash (e.g. from /blog → /#waitlist).
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;

    const scroll = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    scroll();
    const t = window.setTimeout(scroll, 100);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
