import type { Language, SiteContent } from "../contentTypes";

type SharedContent = Pick<SiteContent, "navItems" | "navigationGroups" | "commandItems" | "navigation" | "mobileMenu" | "commandMenu" | "footer" | "terminal">;

export const sharedContent = {
  ro: {
    navItems: [
      ["home", "Acasa"],
      ["studio", "Studio"],
      ["services", "Servicii"],
      ["access", "Acces"],
    ],
    navigationGroups: [
      { page: "home", label: "Acasa" },
      {
        page: "studio",
        label: "Studio",
        children: [
          ["protocol", "Protocol"],
          ["work", "Lucrari"],
        ],
      },
      {
        page: "services",
        label: "Servicii",
        children: [
          ["build", "Build"],
          ["pricing", "Abonamente"],
        ],
      },
      { page: "access", label: "Acces" },
    ],
    commandItems: [
      { page: "studio", title: "Deschide Studio", description: "Vezi cum lucram si ce tip de proiect are sens." },
      { page: "services", title: "Deschide Servicii", description: "Vezi ce putem construi concret." },
      { page: "pricing", title: "Vezi Abonamente", description: "Compara Launch, Premium si Studio System." },
      { page: "work", title: "Vezi Directii", description: "Exemple de proiecte si cum le-am aborda." },
      { page: "build", title: "Vezi Procesul", description: "Cum trece o idee bruta spre o versiune folosibila." },
      { page: "protocol", title: "Deschide Protocolul", description: "Regulile simple dupa care construim." },
      { page: "access", title: "Trimite Brief", description: "Scrie varianta bruta a proiectului." },
    ],
    navigation: {
      brandLine: "Software / Sisteme / Design",
      command: "Command",
      language: "Limba",
      ro: "RO Romana",
      en: "ENG English",
      cinematicOn: "Cinematic On",
      standard: "Standard",
      reducedMotion: "Reduced Motion",
    },
    mobileMenu: {
      openCommandMenu: "Deschide meniul Command",
      language: "Limba",
    },
    commandMenu: {
      title: "Balkan Console",
      subtitle: "Navigare rapida",
    },
    footer: {
      brandLine: "Software / Sisteme / Design",
      description: "Website-uri, landing pages si sisteme mici pentru business-uri care vor sa arate mai clar si mai serios online.",
      navigate: "Navigare",
      contact: "Contact",
      contactLineOne: "Proiecte mici si clare",
      contactLineTwo: "Scrie un brief scurt",
      nodeStatus: "Studio",
      status: "ritm",
      mode: "mode",
      operational: "lucram selectiv",
      cinematic: "cinematic",
      standard: "standard",
      copyright: "(c) 2026 Balkan Veil.",
      tagline: "Simplu. Inchis. Bine facut.",
    },
    terminal: {
      header: "veil://brief",
      lines: [
        "root@balkanveil:~$ citeste brief",
        "Scope mic. Miza clara.",
        "[01] Problema INTELEASA",
        "[02] Structura SCHITATA",
        "[03] Lansare REALISTA",
        "Mai putine promisiuni. Mai multa executie.",
        "status: in lucru",
      ],
    },
  },
  en: {
    navItems: [
      ["home", "Home"],
      ["studio", "Studio"],
      ["services", "Services"],
      ["access", "Access"],
    ],
    navigationGroups: [
      { page: "home", label: "Home" },
      {
        page: "studio",
        label: "Studio",
        children: [
          ["protocol", "Protocol"],
          ["work", "Work"],
        ],
      },
      {
        page: "services",
        label: "Services",
        children: [
          ["build", "Build"],
          ["pricing", "Pricing"],
        ],
      },
      { page: "access", label: "Access" },
    ],
    commandItems: [
      { page: "studio", title: "Open Studio", description: "See how we work and what kind of project makes sense." },
      { page: "services", title: "Open Services", description: "See what we can build concretely." },
      { page: "pricing", title: "View Pricing", description: "Compare Launch, Premium and Studio System." },
      { page: "work", title: "View Directions", description: "Project examples and how we would approach them." },
      { page: "build", title: "View Process", description: "How a rough idea becomes something usable." },
      { page: "protocol", title: "Open Protocol", description: "The simple rules behind the work." },
      { page: "access", title: "Send Brief", description: "Write the rough version of the project." },
    ],
    navigation: {
      brandLine: "Software / Systems / Design",
      command: "Command",
      language: "Language",
      ro: "RO Romana",
      en: "ENG English",
      cinematicOn: "Cinematic On",
      standard: "Standard",
      reducedMotion: "Reduced Motion",
    },
    mobileMenu: {
      openCommandMenu: "Open Command Menu",
      language: "Language",
    },
    commandMenu: {
      title: "Balkan Console",
      subtitle: "Quick Navigation Layer",
    },
    footer: {
      brandLine: "Software / Systems / Design",
      description: "Websites, landing pages and small systems for businesses that need to look clearer and more serious online.",
      navigate: "Navigate",
      contact: "Contact",
      contactLineOne: "Small, clear projects",
      contactLineTwo: "Send a short brief",
      nodeStatus: "Studio",
      status: "pace",
      mode: "mode",
      operational: "selective work",
      cinematic: "cinematic",
      standard: "standard",
      copyright: "(c) 2026 Balkan Veil.",
      tagline: "Simple. Dark. Well built.",
    },
    terminal: {
      header: "veil://brief",
      lines: [
        "root@balkanveil:~$ read brief",
        "Small scope. Clear reason.",
        "[01] Problem UNDERSTOOD",
        "[02] Structure SKETCHED",
        "[03] Launch path REALISTIC",
        "Fewer promises. More execution.",
        "status: in progress",
      ],
    },
  },
} satisfies Record<Language, SharedContent>;
