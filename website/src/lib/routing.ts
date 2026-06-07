import type { Language } from "@/data/siteContent";
import type { PageKey } from "@/types/navigation";

export const defaultLanguage: Language = "ro";
const fallbackSiteOrigin = "https://balkanveil.com";
const configuredSiteOrigin = import.meta.env.VITE_SITE_ORIGIN?.trim();

export const siteOrigin = normalizeOrigin(configuredSiteOrigin || fallbackSiteOrigin);

export const pageSlugs: Record<Language, Record<PageKey, string>> = {
  ro: {
    home: "",
    studio: "studio",
    services: "servicii",
    pricing: "abonamente",
    work: "lucrari",
    build: "build",
    protocol: "protocol",
    access: "acces",
  },
  en: {
    home: "",
    studio: "studio",
    services: "services",
    pricing: "pricing",
    work: "work",
    build: "build",
    protocol: "protocol",
    access: "access",
  },
};

const legacySlugs: Record<string, PageKey> = {
  studio: "studio",
  services: "services",
  servicii: "services",
  pricing: "pricing",
  abonamente: "pricing",
  preturi: "pricing",
  work: "work",
  lucrari: "work",
  build: "build",
  protocol: "protocol",
  access: "access",
  acces: "access",
};

export type PublicRoute = {
  language: Language;
  page: PageKey;
  canonicalPath: string;
  isNotFound: boolean;
};

export function buildPublicPath(language: Language, page: PageKey) {
  const slug = pageSlugs[language][page];
  return slug ? `/${language}/${slug}` : `/${language}`;
}

export function parsePublicRoute(pathname: string): PublicRoute {
  const normalized = normalizePath(pathname);
  const parts = normalized.split("/").filter(Boolean);

  if (!parts.length) {
    return {
      language: defaultLanguage,
      page: "home",
      canonicalPath: buildPublicPath(defaultLanguage, "home"),
      isNotFound: false,
    };
  }

  const maybeLanguage = parts[0];

  if (maybeLanguage === "ro" || maybeLanguage === "en") {
    const language = maybeLanguage;
    const slug = parts[1] ?? "";
    const page = findPageBySlug(language, slug);

    if (page && parts.length <= 2) {
      return {
        language,
        page,
        canonicalPath: buildPublicPath(language, page),
        isNotFound: false,
      };
    }

    return {
      language,
      page: "home",
      canonicalPath: buildPublicPath(language, "home"),
      isNotFound: true,
    };
  }

  const legacyPage = legacySlugs[maybeLanguage] ?? "home";
  const language = defaultLanguage;

  return {
    language,
    page: legacyPage,
    canonicalPath: buildPublicPath(language, legacyPage),
    isNotFound: parts.length > 1 || !legacySlugs[maybeLanguage],
  };
}

export function buildCanonicalUrl(path: string) {
  return `${siteOrigin}${path}`;
}

function normalizeOrigin(origin: string) {
  return origin.replace(/\/+$/, "");
}

function normalizePath(pathname: string) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

function findPageBySlug(language: Language, slug: string): PageKey | null {
  const entries = Object.entries(pageSlugs[language]) as Array<[PageKey, string]>;
  return entries.find(([, value]) => value === slug)?.[0] ?? null;
}
