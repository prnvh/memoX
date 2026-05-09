import { getSiteUrl } from "@/lib/site";

export function JsonLd() {
  const url = getSiteUrl();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: "MemoX",
        description:
          "A persistent, structured memory layer that gives AI agents long-term recall.",
        inLanguage: "en",
        publisher: { "@id": `${url}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: "MemoX",
        url,
        logo: {
          "@type": "ImageObject",
          url: `${url}/logo.png`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: "hello@memox.dev",
          contactType: "customer support",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "MemoX",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        description:
          "Structured memory layer for AI agents and LLM tools including ChatGPT, Claude, Gemini, and Cursor.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
