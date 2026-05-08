import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Home", href: "/" },
      { label: "Waitlist", href: "/#waitlist" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Documentation", href: "#", soon: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com", external: true },
      { label: "Contact", href: "mailto:hello@memox.dev", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/20 bg-bg">
      <div className="max-w-5xl mx-auto px-8 pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-medium text-text mb-4 tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-muted hover:text-text transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : "soon" in link && link.soon ? (
                      <span className="text-sm text-text-muted/40 cursor-default">
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted hover:text-text transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-border/15 text-text-muted/40 text-xs">
          <span>&copy; {new Date().getFullYear()} MemoX</span>
          <div className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
