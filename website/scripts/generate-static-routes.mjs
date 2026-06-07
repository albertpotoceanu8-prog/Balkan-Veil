import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const fallbackSiteOrigin = "https://balkanveil.com";
const siteOrigin = normalizeOrigin(process.env.VITE_SITE_ORIGIN || fallbackSiteOrigin);
const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");
const ogImage = `${siteOrigin}/balkan-veil-logo.png`;
const expectedRoutePaths = [
  "/ro",
  "/ro/studio",
  "/ro/servicii",
  "/ro/abonamente",
  "/ro/lucrari",
  "/ro/build",
  "/ro/protocol",
  "/ro/acces",
  "/en",
  "/en/studio",
  "/en/services",
  "/en/pricing",
  "/en/work",
  "/en/build",
  "/en/protocol",
  "/en/access",
];

const routes = [
  {
    path: "/ro",
    lang: "ro",
    title: "Site-uri clare, cu atmosfera. | Balkan Veil",
    description: "Website-uri, landing pages si sisteme mici pentru business-uri care vor sa arate mai clar si mai serios online.",
    alternate: { ro: "/ro", en: "/en" },
  },
  {
    path: "/ro/studio",
    lang: "ro",
    title: "Mic acum. Atent la detalii. | Balkan Veil",
    description: "Studio web pentru proiecte compacte: site-uri, landing pages, formulare, dashboard-uri simple si flow-uri automatizate.",
    alternate: { ro: "/ro/studio", en: "/en/studio" },
  },
  {
    path: "/ro/servicii",
    lang: "ro",
    title: "Lucruri concrete pe care le putem construi. | Balkan Veil",
    description: "Site-uri, landing pages, formulare, dashboard-uri simple si automatizari punctuale.",
    alternate: { ro: "/ro/servicii", en: "/en/services" },
  },
  {
    path: "/ro/abonamente",
    lang: "ro",
    title: "Abonamente Balkan Veil - Prezenta web administrata | Balkan Veil",
    description: "Abonamente pentru prezenta web administrata, CMS, suport tehnic si imbunatatiri lunare.",
    alternate: { ro: "/ro/abonamente", en: "/en/pricing" },
  },
  {
    path: "/ro/lucrari",
    lang: "ro",
    title: "Exemple de proiecte pe care le putem face. | Balkan Veil",
    description: "Directii de proiect potrivite pentru inceput si felul in care le-am aborda.",
    alternate: { ro: "/ro/lucrari", en: "/en/work" },
  },
  {
    path: "/ro/build",
    lang: "ro",
    title: "Prima versiune, nu platforma uriasa. | Balkan Veil",
    description: "Transformam o idee neclara intr-o versiune mica, prezentabila si usor de imbunatatit.",
    alternate: { ro: "/ro/build", en: "/en/build" },
  },
  {
    path: "/ro/protocol",
    lang: "ro",
    title: "Mai putin teatru. Mai multa claritate. | Balkan Veil",
    description: "Un site bun trebuie sa fie clar, rapid, coerent si sa duca omul unde trebuie.",
    alternate: { ro: "/ro/protocol", en: "/en/protocol" },
  },
  {
    path: "/ro/acces",
    lang: "ro",
    title: "Trimite un brief scurt. | Balkan Veil",
    description: "Spune ce vrei sa construiesti, ce te incurca acum si ce ar insemna o prima versiune buna.",
    alternate: { ro: "/ro/acces", en: "/en/access" },
  },
  {
    path: "/en",
    lang: "en",
    title: "Clear sites with atmosphere. | Balkan Veil",
    description: "Websites, landing pages and small systems for businesses that need to look clearer and more serious online.",
    alternate: { ro: "/ro", en: "/en" },
  },
  {
    path: "/en/studio",
    lang: "en",
    title: "Small now. Careful with details. | Balkan Veil",
    description: "Web studio for compact projects: sites, landing pages, forms, simple dashboards and automated flows.",
    alternate: { ro: "/ro/studio", en: "/en/studio" },
  },
  {
    path: "/en/services",
    lang: "en",
    title: "Concrete things we can build. | Balkan Veil",
    description: "Sites, landing pages, forms, simple dashboards and targeted automations.",
    alternate: { ro: "/ro/servicii", en: "/en/services" },
  },
  {
    path: "/en/pricing",
    lang: "en",
    title: "Balkan Veil Pricing - Managed Web Presence | Balkan Veil",
    description: "Subscription plans for managed web presence, CMS setup, technical support and monthly improvements.",
    alternate: { ro: "/ro/abonamente", en: "/en/pricing" },
  },
  {
    path: "/en/work",
    lang: "en",
    title: "Examples of projects we can make. | Balkan Veil",
    description: "Project directions that fit the start and how we would approach them.",
    alternate: { ro: "/ro/lucrari", en: "/en/work" },
  },
  {
    path: "/en/build",
    lang: "en",
    title: "First version, not a huge platform. | Balkan Veil",
    description: "Turning an unclear idea into a small, presentable version that can be improved quickly.",
    alternate: { ro: "/ro/build", en: "/en/build" },
  },
  {
    path: "/en/protocol",
    lang: "en",
    title: "Less theatre. More clarity. | Balkan Veil",
    description: "A good site should be clear, fast, coherent and move people where they need to go.",
    alternate: { ro: "/ro/protocol", en: "/en/protocol" },
  },
  {
    path: "/en/access",
    lang: "en",
    title: "Send a short brief. | Balkan Veil",
    description: "Say what you want to build, what is getting in the way now and what a good first version should do.",
    alternate: { ro: "/ro/acces", en: "/en/access" },
  },
];

validateRoutes(routes);

const template = await readTemplate();

await Promise.all(
  routes.map(async (route) => {
    const html = applyMeta(template, route);
    const outputDir = path.join(distDir, route.path.replace(/^\//, ""));
    await mkdir(outputDir, { recursive: true });
    await writeFile(path.join(outputDir, "index.html"), html, "utf8");
  }),
);

function applyMeta(templateHtml, route) {
  const canonicalUrl = `${siteOrigin}${route.path}`;
  const roUrl = `${siteOrigin}${route.alternate.ro}`;
  const enUrl = `${siteOrigin}${route.alternate.en}`;
  let html = templateHtml;

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${route.lang}">`);
  html = replaceTag(html, "title", escapeHtml(route.title));
  html = upsertMeta(html, "name", "description", route.description);
  html = upsertMeta(html, "name", "robots", "index, follow");
  html = upsertMeta(html, "property", "og:title", route.title);
  html = upsertMeta(html, "property", "og:description", route.description);
  html = upsertMeta(html, "property", "og:type", "website");
  html = upsertMeta(html, "property", "og:url", canonicalUrl);
  html = upsertMeta(html, "property", "og:image", ogImage);
  html = upsertMeta(html, "property", "og:locale", route.lang === "ro" ? "ro_RO" : "en_US");
  html = upsertMeta(html, "name", "twitter:card", "summary_large_image");
  html = upsertMeta(html, "name", "twitter:title", route.title);
  html = upsertMeta(html, "name", "twitter:description", route.description);
  html = upsertLink(html, "canonical", null, canonicalUrl);
  html = upsertLink(html, "alternate", "ro", roUrl);
  html = upsertLink(html, "alternate", "en", enUrl);
  html = upsertLink(html, "alternate", "x-default", `${siteOrigin}/ro`);

  return html;
}

async function readTemplate() {
  try {
    return await readFile(indexPath, "utf8");
  } catch (error) {
    throw new Error(`Static route generation requires ${indexPath}. Run vite build before this script. Original error: ${error.message}`);
  }
}

function validateRoutes(routeList) {
  const routePaths = new Set(routeList.map((route) => route.path));
  const missingRoutes = expectedRoutePaths.filter((routePath) => !routePaths.has(routePath));

  if (missingRoutes.length) {
    throw new Error(`Missing static route metadata for: ${missingRoutes.join(", ")}`);
  }

  const incompleteRoute = routeList.find((route) => !route.title || !route.description || !route.alternate?.ro || !route.alternate?.en);
  if (incompleteRoute) {
    throw new Error(`Incomplete static route metadata for: ${incompleteRoute.path}`);
  }
}

function replaceTag(html, tag, content) {
  return html.replace(new RegExp(`<${tag}>.*?</${tag}>`, "s"), `<${tag}>${content}</${tag}>`);
}

function upsertMeta(html, attribute, key, value) {
  const escaped = escapeHtml(value);
  const pattern = new RegExp(`<meta ${attribute}="${escapeRegExp(key)}" content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attribute}="${key}" content="${escaped}" />`;

  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function upsertLink(html, rel, hreflang, href) {
  const attrs = hreflang ? `rel="${rel}" hreflang="${hreflang}"` : `rel="${rel}"`;
  const pattern = hreflang
    ? new RegExp(`<link rel="${rel}" hreflang="${escapeRegExp(hreflang)}" href="[^"]*"\\s*/?>`)
    : new RegExp(`<link rel="${rel}" href="[^"]*"\\s*/?>`);
  const tag = `<link ${attrs} href="${escapeHtml(href)}" />`;

  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeOrigin(origin) {
  return String(origin).trim().replace(/\/+$/, "");
}
