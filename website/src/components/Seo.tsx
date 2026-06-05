import React from "react";
import type { Language, SiteContent } from "@/data/siteContent";
import { buildCanonicalUrl, buildPublicPath } from "@/lib/routing";
import type { PageKey } from "@/types/navigation";

type SeoProps = {
  language: Language;
  page: PageKey;
  content: SiteContent;
  canonicalPath: string;
  isNotFound: boolean;
};

const ogImage = "/balkan-veil-logo.png";

export function Seo({ language, page, content, canonicalPath, isNotFound }: SeoProps) {
  React.useEffect(() => {
    const meta = isNotFound ? notFoundMeta(language) : getPageMeta(page, content);
    const title = `${meta.title} | Balkan Veil`;
    const canonicalUrl = buildCanonicalUrl(canonicalPath);

    document.title = title;
    document.documentElement.lang = language;
    setMeta("name", "description", meta.description);
    setMeta("name", "robots", isNotFound ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", buildCanonicalUrl(ogImage));
    setMeta("property", "og:locale", language === "ro" ? "ro_RO" : "en_US");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", meta.description);
    setLink("canonical", canonicalUrl);
    setAlternate("ro", buildCanonicalUrl(buildPublicPath("ro", page)));
    setAlternate("en", buildCanonicalUrl(buildPublicPath("en", page)));
    setAlternate("x-default", buildCanonicalUrl(buildPublicPath("ro", page)));
  }, [canonicalPath, content, isNotFound, language, page]);

  return null;
}

function getPageMeta(page: PageKey, content: SiteContent) {
  switch (page) {
    case "home":
      return { title: content.home.hero, description: content.home.text };
    case "studio":
      return { title: content.studio.title, description: content.studio.text };
    case "services":
      return { title: content.servicesPage.title, description: content.servicesPage.text };
    case "work":
      return { title: content.work.title, description: content.work.text };
    case "build":
      return { title: content.build.title, description: content.build.text };
    case "protocol":
      return { title: content.protocol.title, description: content.protocol.text };
    case "access":
      return { title: content.access.title, description: content.access.text };
  }
}

function notFoundMeta(language: Language) {
  if (language === "ro") {
    return {
      title: "Pagina nu exista",
      description: "Pagina ceruta nu exista sau a fost mutata.",
    };
  }

  return {
    title: "Page not found",
    description: "The requested page does not exist or has been moved.",
  };
}

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

function setAlternate(hreflang: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);

  if (!element) {
    element = document.createElement("link");
    element.rel = "alternate";
    element.hreflang = hreflang;
    document.head.appendChild(element);
  }

  element.href = href;
}
