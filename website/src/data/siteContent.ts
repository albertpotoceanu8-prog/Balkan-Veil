import type { PageKey } from "@/types/navigation";

export type Language = "ro" | "en";
export type ServiceIcon = "Terminal" | "Network" | "Eye" | "Lock" | "Shield" | "ArrowRight";
export type NavItem = readonly [PageKey, string];

export type CommandItem = {
  page: PageKey;
  title: string;
  description: string;
};

export type Service = {
  icon: ServiceIcon;
  title: string;
  text: string;
  deliverables: string[];
};

export type WorkProject = {
  number: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  recommendedPlan: string;
  stack: string[];
};

export type VisualMockup = {
  title: string;
  label: string;
  lines: string[];
};

type PackageItem = {
  name: string;
  label: string;
  text: string;
  points: string[];
};

type ProcessStep = {
  step: string;
  title: string;
  text: string;
};

type CaseStudy = {
  title: string;
  label: string;
  text: string;
  result: string;
  metric: string;
};

type FaqItem = {
  q: string;
  a: string;
};

type Principle = {
  title: string;
  text: string;
};

type TitledText = {
  title: string;
  text: string;
};

type SectionCtaContent = {
  eyebrow: string;
  title: string;
  text: string;
  primary: string;
  secondary?: string;
};

type PricingPlan = {
  name: string;
  price: string;
  period: string;
  label: string;
  description: string;
  recommended?: string;
  included: string[];
  support: string;
  bestFor: string;
};

type PricingFaq = {
  q: string;
  a: string;
};

type BeforeAfterContent = {
  eyebrow: string;
  title: string;
  beforeLabel: string;
  afterLabel: string;
  before: string[];
  after: string[];
};

type SubscriptionStep = {
  step: string;
  title: string;
  client: string;
  veil: string;
  output: string;
};

type InterfacePreviewContent = {
  eyebrow: string;
  title: string;
  text: string;
  systemLabel: string;
  statusLine: string;
  moduleLabel: string;
  metrics: string[];
  rows: string[];
};

type HeroDossierContent = {
  stampCode: string;
  stampLabel: string;
  status: string;
  ledgerLabel: string;
  items: string[];
  note: string;
};

type ServiceArchitectureContent = {
  eyebrow: string;
  title: string;
  text: string;
  nodes: string[];
};

export type SiteContent = {
  navItems: NavItem[];
  commandItems: CommandItem[];
  navigation: {
    brandLine: string;
    command: string;
    language: string;
    ro: string;
    en: string;
    cinematicOn: string;
    standard: string;
    reducedMotion: string;
  };
  mobileMenu: {
    openCommandMenu: string;
    language: string;
  };
  commandMenu: {
    title: string;
    subtitle: string;
  };
  footer: {
    brandLine: string;
    description: string;
    navigate: string;
    contact: string;
    contactLineOne: string;
    contactLineTwo: string;
    nodeStatus: string;
    status: string;
    mode: string;
    operational: string;
    cinematic: string;
    standard: string;
    copyright: string;
    tagline: string;
  };
  terminal: {
    header: string;
    lines: string[];
  };
  home: {
    badge: string;
    hero: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
    builtAround: string;
    builtTitle: string;
    valueProps: Array<{ title: string; text: string }>;
    audience: string[];
    signalStrip: string[];
    launchChanges: {
      eyebrow: string;
      title: string;
      text: string;
      items: TitledText[];
    };
    methodPreview: {
      eyebrow: string;
      title: string;
      steps: string[];
    };
    interfacePreview: InterfacePreviewContent;
    dossier: HeroDossierContent;
    subscriptionIntro: TitledText & { eyebrow: string; points: string[] };
    beforeAfter: BeforeAfterContent;
    finalCta: SectionCtaContent;
  };
  studio: {
    eyebrow: string;
    title: string;
    text: string;
    positionLabel: string;
    positionTitle: string;
    positionText: string;
    signature: string;
    whatLabel: string;
    whatTitle: string;
    whatText: string;
    principles: Principle[];
    notes: string[];
    aesthetic: {
      eyebrow: string;
      title: string;
      text: string;
      points: string[];
    };
    avoids: {
      eyebrow: string;
      title: string;
      items: string[];
    };
    materials: {
      eyebrow: string;
      title: string;
      items: TitledText[];
    };
    operator: {
      eyebrow: string;
      title: string;
      text: string;
      statuses: string[];
    };
    attackSurface: {
      eyebrow: string;
      title: string;
      text: string;
      items: TitledText[];
    };
    reconNotes: {
      eyebrow: string;
      title: string;
      items: string[];
    };
    visualVectors: {
      eyebrow: string;
      title: string;
      items: TitledText[];
    };
    neutralizedNoise: {
      eyebrow: string;
      title: string;
      items: string[];
    };
  };
  servicesPage: {
    eyebrow: string;
    title: string;
    text: string;
    projectTypesLabel: string;
    ctaLabel: string;
    ctaTitle: string;
    ctaText: string;
    ctaAction: string;
    services: Service[];
    projectTypes: string[];
    layers: {
      eyebrow: string;
      title: string;
      items: TitledText[];
    };
    outcomes: {
      eyebrow: string;
      items: string[];
    };
    comparison: {
      eyebrow: string;
      title: string;
      items: TitledText[];
    };
    architecture: ServiceArchitectureContent;
    subscription: {
      eyebrow: string;
      title: string;
      text: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    monthly: {
      eyebrow: string;
      title: string;
      items: TitledText[];
    };
  };
  pricing: {
    eyebrow: string;
    title: string;
    text: string;
    seoTitle: string;
    seoDescription: string;
    minimumLabel: string;
    supportLabel: string;
    bestForLabel: string;
    includedLabel: string;
    notIncludedLabel: string;
    planIndexLabel: string;
    ledgerLabel: string;
    plans: PricingPlan[];
    subscriptionSteps: {
      eyebrow: string;
      title: string;
      steps: string[];
    };
    notIncluded: {
      eyebrow: string;
      title: string;
      items: string[];
    };
    buyoutNote: {
      eyebrow: string;
      title: string;
      text: string;
    };
    faqLabel: string;
    faqTitle: string;
    faq: PricingFaq[];
    finalCta: SectionCtaContent;
  };
  work: {
    eyebrow: string;
    title: string;
    text: string;
    projects: WorkProject[];
    labels: {
      problem: string;
      solution: string;
      result: string;
      plan: string;
      scenario: string;
      status: string;
    };
    disclaimer: string;
    nextLabel: string;
    nextTitle: string;
    nextText: string;
    cta: string;
    conceptLabel: string;
    conceptTitle: string;
    conceptText: string;
    conceptLabels: {
      problem: string;
      direction: string;
      system: string;
      package: string;
    };
    concepts: Array<{
      tag: string;
      title: string;
      problem: string;
      direction: string;
      system: string;
      package: string;
    }>;
  };
  build: {
    eyebrow: string;
    title: string;
    text: string;
    items: Array<{ title: string; text: string }>;
    visualLabel: string;
    visualTitle: string;
    visualText: string;
    visualMockups: VisualMockup[];
    processLabel: string;
    processSteps: ProcessStep[];
    caseStudies: CaseStudy[];
    resultLabel: string;
    phaseLabel: string;
    phaseTitle: string;
    phases: Array<ProcessStep & { deliverables: string[] }>;
    responsibilityLabel: string;
    responsibilityTitle: string;
    clientLabel: string;
    veilLabel: string;
    clientProvides: string[];
    veilBuilds: string[];
    finalCta: SectionCtaContent;
    howItWorks: {
      eyebrow: string;
      title: string;
      clientLabel: string;
      veilLabel: string;
      outputLabel: string;
      steps: SubscriptionStep[];
    };
  };
  protocol: {
    eyebrow: string;
    title: string;
    text: string;
    protocol: string[];
    positioningLabel: string;
    decodeTitle: string;
    paragraphs: string[];
    checklistLabel: string;
    checklistTitle: string;
    checklist: TitledText[];
    finalCta: SectionCtaContent;
  };
  access: {
    eyebrow: string;
    title: string;
    text: string;
    modalLabel: string;
    modalTitle: string;
    modalText: string;
    modalButton: string;
    panelTitle: string;
    panelText: string;
    steps: string[];
    inquiryLabel: string;
    inquiryTitle: string;
    inquiryText: string;
    form: {
      name: string;
      namePlaceholder: string;
      contact: string;
      contactPlaceholder: string;
      brand: string;
      brandPlaceholder: string;
      projectType: string;
      budgetRange: string;
      message: string;
      messagePlaceholder: string;
      selectedBrief: string;
      project: string;
      budget: string;
      submit: string;
      sending: string;
      requiredName: string;
      requiredContact: string;
      submitError?: string;
      backendMissing: string;
    };
    packagesLabel: string;
    faqLabel: string;
    beforeApply: {
      eyebrow: string;
      title: string;
      items: TitledText[];
    };
    fit: {
      eyebrow: string;
      title: string;
      goodLabel: string;
      badLabel: string;
      good: string[];
      bad: string[];
    };
    afterSubmit: {
      eyebrow: string;
      title: string;
      steps: TitledText[];
    };
    qualification: {
      interestedLabel: string;
      startLabel: string;
      interestedOptions: string[];
      startOptions: string[];
    };
    projectOptions: string[];
    budgetOptions: string[];
    packages: PackageItem[];
    faq: FaqItem[];
  };
};

export const siteContent: Record<Language, SiteContent> = {
  ro: {
    navItems: [
      ["home", "Acasa"],
      ["studio", "Studio"],
      ["services", "Servicii"],
      ["pricing", "Abonamente"],
      ["work", "Lucrari"],
      ["build", "Build"],
      ["protocol", "Protocol"],
      ["access", "Acces"],
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
    home: {
      badge: "Website-uri / sisteme mici",
      hero: "Site-uri clare, cu atmosfera.",
      text: "Balkan Veil construieste prezente web administrate pentru business-uri care au nevoie de claritate, atmosfera si un traseu curat catre cereri. Ideea ramane simpla: arata distinct, explica oferta si nu incarca inutil sistemul.",
      primaryCta: "Trimite un Brief",
      secondaryCta: "Vezi Studio",
      builtAround: "Mod de lucru",
      builtTitle: "Incepem cu ce poate fi livrat bine.",
      valueProps: [
        { title: "Cu picioarele pe pamant", text: "Nu incercam sa parem mai mari decat suntem. Preferam un proiect mic, finalizat bine, in locul unei promisiuni mari." },
        { title: "Design cu functie", text: "Look-ul dark ramane, dar fiecare sectiune trebuie sa explice, sa califice sau sa duca omul mai aproape de inquiry." },
        { title: "Scope sanatos", text: "Daca ceva nu ajuta prima versiune, nu-l bagam doar ca sa para complex. Mai curat inseamna de multe ori mai bun." },
      ],
      audience: [
        "Business-uri locale care au nevoie de un site mai bun",
        "Fondatori care vor o pagina simpla si serioasa",
        "Consultanti si servicii care trebuie explicate clar",
        "Creatori cu oferte care merita prezentate mai bine",
        "Echipe mici care vor ordine in cereri si statusuri",
        "Proiecte care au nevoie de un MVP vizual decent",
      ],
      signalStrip: ["Signal clarity", "Launch protocol", "CMS layer", "Inquiry path", "Operating layer"],
      launchChanges: {
        eyebrow: "Dupa lansare",
        title: "Site-ul trebuie sa schimbe felul in care esti perceput.",
        text: "Nu promitem miracole. Construim o prima versiune care face oferta mai clara, mai credibila si mai usor de trimis mai departe.",
        items: [
          { title: "Oferta devine citibila", text: "Vizitatorul intelege repede ce faci, pentru cine si de ce merita sa continue." },
          { title: "Prezenta nu mai pare improvizata", text: "Structura, ritmul vizual si detaliile mici dau senzatia de business asezat." },
          { title: "Cererea are un traseu", text: "CTA-urile, formularul si selectia de scope muta discutia spre un brief concret." },
        ],
      },
      methodPreview: {
        eyebrow: "Metoda",
        title: "Un proces mic, dar cu margini clare.",
        steps: ["Diagnose", "Frame", "Build", "Polish", "Launch"],
      },
      interfacePreview: {
        eyebrow: "Preview",
        title: "Website-ul ca interfata publica de business.",
        text: "Balkan Veil trateaza pagina publica ca pe un sistem operational: mesaj, incredere, traseu de inquiry si continut care poate fi administrat.",
        systemLabel: "Balkan Veil OS",
        statusLine: "status: public interface mapped",
        moduleLabel: "module ledger",
        metrics: ["Signal clarity", "Offer frame", "Launch path"],
        rows: ["Inquiry flow mapped", "CMS layer prepared", "Monthly support queued"],
      },
      dossier: {
        stampCode: "BV / 01",
        stampLabel: "digital dossier",
        status: "signal audit ready",
        ledgerLabel: "Operating signals",
        items: ["Clear offer interface", "Guided inquiry path", "Monthly operating layer"],
        note: "O prezenta publica trebuie sa arate ca o decizie, nu ca o tema reetichetata.",
      },
      subscriptionIntro: {
        eyebrow: "Abonament administrat",
        title: "Prezenta web administrata pentru business-uri care vor claritate online fara sa gestioneze stratul tehnic.",
        text: "Platesti lunar pentru build, hosting, mentenanta si suport. Contract minim 12 luni, ca sistemul public sa fie construit, lansat si imbunatatit corect.",
        points: ["Interfata publica custom", "Hosting si deploy incluse", "Strat lunar de suport", "Imbunatatiri controlate"],
      },
      beforeAfter: {
        eyebrow: "Before / After",
        title: "Ce se schimba cand site-ul este tratat ca sistem administrat.",
        beforeLabel: "Inainte",
        afterLabel: "Dupa",
        before: ["Oferta neclara", "Aspect de template generic", "Traseu slab catre contact", "Fara structura de continut", "Fara suport administrat"],
        after: ["Pozitionare clara", "Sistem vizual premium", "Flow ghidat de inquiry", "Continut pregatit pentru CMS", "Suport lunar definit"],
      },
      finalCta: {
        eyebrow: "Signal audit",
        title: "Trimite brief-ul. Mapam interfata publica.",
        text: "Pornim de la ideea bruta si o transformam intr-un scope clar: oferta, pagini, traseu de inquiry si lansare.",
        primary: "Trimite Brief",
        secondary: "Vezi Abonamente",
      },
    },
    studio: {
      eyebrow: "Studio",
      title: "Mic acum. Atent la detalii.",
      text: "Balkan Veil e un studio web la inceput. Lucram pe proiecte unde o prima versiune buna chiar ajuta: un site mai clar, un landing page, un formular, un dashboard simplu sau un flow automatizat.",
      positionLabel: "Pozitie",
      positionTitle: "Pozitie simpla.",
      positionText: "Nu avem nevoie sa sunam ca o agentie mare. Mai util este sa fim clari: alegem putine proiecte, le tinem usor de inteles si le construim pana la capat.",
      signature: "scope mic / design bun / livrare curata",
      whatLabel: "Ce este",
      whatTitle: "Look bun, lucru practic.",
      whatText: "Estetica ramane intunecata si premium, dar proiectul trebuie sa fie usor de folosit. Daca vizitatorul nu intelege ce faci si cum te contacteaza, designul nu si-a facut treaba.",
      principles: [
        { title: "Spune direct", text: "Clientul nu trebuie sa ghiceasca ce vinzi, cui se adreseaza si ce ar trebui sa faca dupa ce intra pe site." },
        { title: "Taie surplusul", text: "Un proiect mic poate arata foarte bine daca nu este incarcat cu sectiuni puse doar ca sa para mai mare." },
        { title: "Construieste pentru folosire", text: "Formularul, CTA-ul, flow-ul si versiunea de mobil conteaza la fel de mult ca imaginea de pe primul ecran." },
        { title: "Pastreaza caracterul", text: "Site-ul poate fi clar fara sa arate generic. Aici ramane partea de atmosfera Balkan Veil." },
      ],
      notes: [
        "Intunericul nu este decor. Este spatiu pentru contrast, liniste si selectie.",
        "Un site bun trebuie sa para decis, nu incarcat.",
        "Detaliile mici conteaza mai mult decat efectele mari.",
        "Daca estetica nu ajuta oferta sa fie citita, estetica nu este terminata.",
      ],
      aesthetic: {
        eyebrow: "Pozitie estetica",
        title: "Dark premium, dar cu disciplina editoriala.",
        text: "Balkan Veil foloseste atmosfera ca sa creeze incredere si tensiune vizuala, nu ca sa ascunda o structura slaba. Pagina trebuie sa se simta calma, precisa si construita pentru un business real.",
        points: ["Serif mare, dar controlat", "Linii subtiri, nu ornamente grele", "Auriu folosit ca semnal, nu ca fundal", "Spatiu negru care lasa continutul sa respire"],
      },
      avoids: {
        eyebrow: "Ce evitam",
        title: "Nu tot ce pare premium ajuta.",
        items: ["Hero-uri generice cu promisiuni mari", "Carduri repetate doar ca sa umple pagina", "Glow-uri agresive si efecte cyberpunk", "Mockup-uri false care nu spun nimic", "Copy care suna ca orice agentie", "Animatii care misca layout-ul"],
      },
      materials: {
        eyebrow: "Material vizual",
        title: "Din ce este construit limbajul Balkan Veil.",
        items: [
          { title: "Archive lines", text: "Hairlines, cadre subtile si margini care dau senzatia de dosar editorial." },
          { title: "Signal gold", text: "Auriu folosit pentru directie, status si accent, nu pentru suprafete mari." },
          { title: "Stone texture", text: "Tonuri inchise, usor mate, care pastreaza pagina serioasa si lizibila." },
          { title: "Cinematic restraint", text: "Miscare putina, tensiune vizuala controlata si spatiu pentru text." },
        ],
      },
      operator: {
        eyebrow: "Operator mindset",
        title: "Interfata publica este tratata ca suprafata controlata.",
        text: "Nu cautam spectacol. Scanam semnalele vizibile, izolam zgomotul si facem pagina sa para activa, clara si sub control.",
        statuses: ["RECON active", "SURFACE mapped", "SIGNAL clean", "TRACE sealed"],
      },
      attackSurface: {
        eyebrow: "Attack surface",
        title: "Ce vede vizitatorul in primele secunde.",
        text: "In branding, suprafata de atac este tot ce poate slabi increderea: mesaj ambiguu, ritm vizual slab, CTA neclar, dovada prost asezata. Balkan Veil inchide aceste puncte fara teatru.",
        items: [
          { title: "Oferta expusa", text: "Se vede rapid ce vinzi, pentru cine si de ce merita continuat." },
          { title: "Traseu de inquiry", text: "Actiunea urmatoare este vizibila, nu ascunsa intr-o pagina obosita." },
          { title: "Autoritate vizuala", text: "Compozitia sustine pretul si nivelul serviciului, fara decor ieftin." },
          { title: "Suprafata mobila", text: "Prima impresie ramane controlata si pe ecrane mici." },
        ],
      },
      reconNotes: {
        eyebrow: "Recon notes",
        title: "Semnale slabe detectate in interfete publice.",
        items: ["Headline care promite mult dar nu fixeaza oferta", "Carduri multe, dar fara ierarhie reala", "Sectiuni care arata premium doar prin gradient", "CTA-uri care cer contact inainte sa existe incredere", "Mobile care pierde ritmul si face brandul sa para improvizat"],
      },
      visualVectors: {
        eyebrow: "Visual vectors",
        title: "Directii tactice pentru un site mai ascutit.",
        items: [
          { title: "RECON", text: "Citire rapida a semnalelor publice: mesaj, ritm, incredere, actiune." },
          { title: "SURFACE", text: "Asezare a sectiunilor ca suprafete clare, nu blocuri decorative." },
          { title: "VECTOR", text: "Directie vizuala catre oferta si inquiry, fara trasee moarte." },
          { title: "SEALED", text: "Eliminarea zgomotului care slabeste perceptia de control." },
        ],
      },
      neutralizedNoise: {
        eyebrow: "Neutralized noise",
        title: "Ce scoatem dintr-o prezenta care vrea sa para serioasa.",
        items: ["Template energy", "Mockup-uri fara functie", "Glitch agresiv", "Copy vag de agentie", "Decor fara semnal", "Animatie care distrage de la decizie"],
      },
    },
    servicesPage: {
      eyebrow: "Capabilitati",
      title: "Lucruri concrete pe care le putem construi.",
      text: "Nu incercam sa acoperim tot. Construim suprafete publice si sisteme mici care clarifica oferta, traseul de inquiry si operarea lunara.",
      projectTypesLabel: "Tipuri de proiecte",
      ctaLabel: "Brief",
      ctaTitle: "Trimite brief-ul. Mapam interfata.",
      ctaText: "Pornim de la varianta bruta si definim un scope mic, clar si realist pentru lansare.",
      ctaAction: "Trimite Brief",
      services: [
        {
          icon: "Terminal",
          title: "Website Build",
          text: "Un site sau landing page care explica mai bine oferta si arata mai ingrijit pe desktop si mobil.",
          deliverables: ["Structura homepage sau landing", "Frontend responsive", "Flux de contact sau inquiry", "Implementare gata de lansare"],
        },
        {
          icon: "Network",
          title: "Automatizare Workflow",
          text: "Automatizari mici pentru lucruri care se repeta deja: follow-up, rutare, update-uri de status sau remindere.",
          deliverables: ["Harta workflow", "Logica de trigger", "Plan de conectare tool-uri", "Note de predare"],
        },
        {
          icon: "Eye",
          title: "Portal Client / Dashboard",
          text: "Ecrane simple pentru cereri, clienti, rezervari, statusuri sau activitate, ca informatia sa nu ramana imprastiata.",
          deliverables: ["Interfata dashboard", "Flux principal de utilizator", "Structura pregatita pentru admin", "Layout pregatit pentru date"],
        },
        {
          icon: "Lock",
          title: "MVP Digital",
          text: "O pagina gated, un tool intern sau o experienta mica pe care o poti testa fara sa construiesti o platforma intreaga.",
          deliverables: ["Flux de acces", "Interfata controlata", "Sectiuni custom", "Suport de deployment"],
        },
        {
          icon: "Shield",
          title: "Website Cleanup",
          text: "Pentru site-uri care exista tehnic, dar nu mai arata la nivelul business-ului: sectiuni neclare, mobile slab, pagini lente sau vizual obosit.",
          deliverables: ["Curatare vizuala", "Restructurare sectiuni", "Pass de performanta", "Fixuri de conversie"],
        },
        {
          icon: "ArrowRight",
          title: "Launch Support",
          text: "Ultimul pass inainte ca site-ul sa iasa public: formulare, deployment, verificari mobile, asezare continut si detaliile mici care se rateaza usor.",
          deliverables: ["Setup deployment", "QA final", "Predare continut", "Fixuri post-lansare"],
        },
      ],
      projectTypes: [
        "Website-uri pentru fondatori",
        "Landing pages pentru servicii",
        "Portaluri client",
        "Sisteme de rezervare si cereri",
        "Dashboard-uri si panouri admin",
        "Workflow-uri automatizate",
        "Tool-uri asistate de AI",
        "Pagini de prezentare brand",
      ],
      layers: {
        eyebrow: "Straturi",
        title: "Cum impachetam munca.",
        items: [
          { title: "Pozitionare", text: "Clarificam oferta, publicul si actiunea principala inainte sa incarcam pagina cu sectiuni." },
          { title: "Interfata", text: "Construim layout-ul, mobile-ul, ritmul vizual si componentele care fac site-ul usor de parcurs." },
          { title: "Lansare", text: "Conectam formularul, verificam rutele, pregatim deployment-ul si lasam loc pentru continut viitor." },
        ],
      },
      outcomes: {
        eyebrow: "Outcomes",
        items: ["Mesaj mai clar", "Mobile mai solid", "Brief-uri mai bune", "Lansare controlata"],
      },
      comparison: {
        eyebrow: "Pozitie",
        title: "Nu este doar o tema frumoasa.",
        items: [
          { title: "Nu template", text: "Folosim structura potrivita ofertei, nu o pagina generica reetichetata." },
          { title: "Nu doar vizual", text: "Designul trebuie sa ajute intelegerea, contactul si decizia, nu doar sa arate intunecat." },
          { title: "Interfata de business", text: "Pagina publica devine primul sistem simplu prin care clientul intelege si intra in discutie." },
        ],
      },
      architecture: {
        eyebrow: "Service architecture",
        title: "Ce contine sistemul public.",
        text: "Fiecare proiect este mapat ca o arhitectura mica: ce vede clientul, ce administrezi intern si cum ajunge cererea in locul potrivit.",
        nodes: ["Interface", "Structure", "CMS", "Inquiry", "Support", "Launch"],
      },
      subscription: {
        eyebrow: "Livrare pe abonament",
        title: "Serviciile sunt gandite ca prezenta web administrata lunar.",
        text: "Nu primesti doar un build si apoi ramai singur cu partea tehnica. Pachetele includ launch protocol, hosting/deploy, suport si un cadru lunar pentru modificari mici.",
        ctaPrimary: "Vezi Abonamente",
        ctaSecondary: "Trimite Brief",
      },
      monthly: {
        eyebrow: "Lunar",
        title: "Stratul operational de dupa lansare.",
        items: [
          { title: "Update-uri mici", text: "Ajustari de text, imagini, linkuri, sectiuni simple sau detalii de continut." },
          { title: "Ajustari continut", text: "Pagina poate ramane actuala pe masura ce oferta se schimba." },
          { title: "Monitorizare tehnica", text: "Verificari de baza pentru deploy, formular si functionare publica." },
          { title: "Imbunatatiri controlate", text: "Iteratii lunare sau trimestriale in functie de pachet." },
          { title: "Fereastra suport", text: "Timp lunar inclus pentru intrebari, modificari si prioritizare." },
        ],
      },
    },
    pricing: {
      eyebrow: "Abonamente",
      title: "Prezenta web administrata pe abonament lunar.",
      text: "Pentru business-uri care vor o interfata publica distincta fara sa gestioneze hosting, deploy, mentenanta si modificarile mici.",
      seoTitle: "Abonamente Balkan Veil - Prezenta web administrata",
      seoDescription: "Abonamente pentru prezenta web administrata, CMS, suport tehnic si imbunatatiri lunare.",
      minimumLabel: "Contract minim 12 luni",
      supportLabel: "Suport inclus",
      bestForLabel: "Recomandat pentru",
      includedLabel: "Inclus",
      notIncludedLabel: "Nu este inclus",
      planIndexLabel: "dossier",
      ledgerLabel: "plan ledger",
      plans: [
        {
          name: "Launch",
          price: "199 EUR",
          period: "/luna",
          label: "Prezenta initiala",
          description: "Pentru business-uri mici care au nevoie de o interfata publica clara si usor de lansat.",
          included: ["1-3 pagini", "Design custom", "Responsive", "Inquiry path", "Basic SEO", "Hosting/deploy inclus", "Modificari mici"],
          support: "30 min suport/luna",
          bestFor: "Business-uri mici care vor interfata publica rapid.",
        },
        {
          name: "Premium",
          price: "399 EUR",
          period: "/luna",
          label: "Operating layer",
          description: "Pentru servicii si branduri care au nevoie de continut mai amplu, CMS si iteratii lunare.",
          recommended: "Recomandat",
          included: ["5-7 pagini", "CMS inclus", "RO/EN optional", "Inquiry form", "SEO tehnic", "Analytics basic", "Modificari lunare", "O sectiune noua trimestrial"],
          support: "2 ore suport/luna",
          bestFor: "Business-uri care vor prezenta web administrata.",
        },
        {
          name: "Studio System",
          price: "699 EUR",
          period: "/luna",
          label: "Sistem administrat",
          description: "Pentru business-uri care vor prezenta web completa, CMS/admin si optimizare lunara.",
          included: ["Prezenta web completa", "CMS/admin separat", "Landing pages extra", "Lead pipeline basic", "Optimizare lunara", "Raport lunar", "Suport prioritar"],
          support: "4-5 ore suport/luna",
          bestFor: "Business-uri care vor sistem web administrat.",
        },
      ],
      subscriptionSteps: {
        eyebrow: "Cum functioneaza",
        title: "De la brief la suport lunar.",
        steps: ["Trimite brief", "Verificare potrivire", "Structura si oferta", "Construire", "Lansare", "Suport lunar"],
      },
      notIncluded: {
        eyebrow: "Limite",
        title: "Ce nu este inclus in abonament.",
        items: ["Branding/logo complet", "Fotografie/video", "Reclame Meta/Google", "Ecommerce complex", "Integrari custom avansate", "Modificari nelimitate", "Suport 24/7", "Copywriting complet nelimitat"],
      },
      buyoutNote: {
        eyebrow: "Dupa 12 luni",
        title: "Buyout sau transfer se pot discuta dupa perioada minima.",
        text: "Abonamentul are contract minim 12 luni. Dupa aceasta perioada putem discuta continuarea suportului, transferul sau un buyout, in functie de proiect si infrastructura.",
      },
      faqLabel: "FAQ",
      faqTitle: "Intrebari comerciale despre abonamente.",
      faq: [
        { q: "Hosting-ul este inclus?", a: "Da, hosting/deploy este inclus in pachete, in limite rezonabile pentru website-uri de prezentare si sisteme mici." },
        { q: "Pot cere modificari lunar?", a: "Da. Fiecare pachet include o fereastra de suport pentru modificari mici si ajustari de continut." },
        { q: "Ce inseamna modificare mica?", a: "Text, imagini, linkuri, mici ajustari de layout, sectiuni simple sau update-uri de continut deja existent." },
        { q: "Ce nu este inclus?", a: "Feature-uri mari, ecommerce complex, reclame, branding complet, fotografie/video si integrari avansate se quoteaza separat." },
        { q: "Pot anula?", a: "Exista contract minim 12 luni. Dupa perioada minima putem continua, ajusta sau discuta transferul/buyout-ul." },
        { q: "Ce se intampla dupa 12 luni?", a: "Putem continua abonamentul, schimba nivelul de suport sau discuta buyout/transfer." },
        { q: "Detin website-ul?", a: "Ai drept de folosire pe durata abonamentului. Detaliile de proprietate, transfer si buyout se clarifica in oferta." },
        { q: "Pot cumpara sau transfera site-ul?", a: "Da, se poate discuta dupa perioada minima de 12 luni, in functie de proiect." },
        { q: "CMS-ul este inclus?", a: "Este inclus in Premium si Studio System. Pentru Launch se poate discuta separat daca este necesar." },
        { q: "Copywriting-ul este inclus?", a: "Structura si ajustari de copy sunt incluse. Copywriting complet sau volum mare de continut se quoteaza separat." },
      ],
      finalCta: {
        eyebrow: "Urmatorul pas",
        title: "Alege stratul operational, apoi trimite brief-ul.",
        text: "Daca nu stii ce pachet se potriveste, trimite contextul si facem verificarea de fit.",
        primary: "Trimite Brief",
        secondary: "Vezi Servicii",
      },
    },
    work: {
      eyebrow: "Directii",
      title: "Exemple de proiecte pe care le putem face.",
      text: "Nu le prezentam ca studii de caz cu rezultate inventate. Sunt tipuri de proiecte potrivite pentru inceput si felul in care le-am aborda.",
      projects: [
        {
          number: "01",
          title: "Pagina de Fondator",
          category: "Personal Brand / Autoritate",
          summary: "O prezenta publica scurta pentru autoritate, outreach si conversatii comerciale mai clare.",
          problem: "Un fondator are nevoie de o pagina simpla care explica cine este, ce face si de ce merita contactat.",
          solution: "O structura one-page cu pozitionare scurta, dovada selectiva, CTA clar si zero umplutura.",
          result: "Un link credibil pentru outreach, prezentari si bio.",
          recommendedPlan: "Launch",
          stack: ["React", "Tailwind", "Framer Motion", "Formular brief"],
        },
        {
          number: "02",
          title: "Landing Page Serviciu",
          category: "Business de Servicii Premium",
          summary: "O interfata de oferta pentru servicii unde pretul, increderea si cererea trebuie sa fie mai usor de citit.",
          problem: "Business-ul voia sa taxeze ca un specialist, dar pagina veche il facea sa para interschimbabil.",
          solution: "Un landing page intunecat, cu ierarhie mai clara a ofertei, dovada mai calma si un traseu de conversie care califica, nu cerseste.",
          result: "O pagina mai buna pentru reclame, recomandari si discutii comerciale.",
          recommendedPlan: "Premium",
          stack: ["Landing page", "Structura copy", "Flux CTA", "Build responsive"],
        },
        {
          number: "03",
          title: "Portal Client Simplu",
          category: "Dashboard / Operatiuni",
          summary: "Un sistem mic pentru cereri, statusuri si vizibilitate interna, fara promisiunea unei platforme uriase.",
          problem: "Cererile, statusurile si notitele ajung rapid in mesaje separate, chiar si intr-un business mic.",
          solution: "Un dashboard simplu care aduce lucrurile importante intr-un singur loc, fara sa promita un ERP complet.",
          result: "O baza practica pentru un portal care poate creste dupa ce este folosit.",
          recommendedPlan: "Studio System",
          stack: ["Dashboard UI", "Client records", "Status system", "Admin flow"],
        },
        {
          number: "04",
          title: "Automatizare de Pornire",
          category: "Automatizare Business",
          summary: "Un traseu operational pentru follow-up, rutare si timing intern, construit ca prima versiune verificabila.",
          problem: "Workflow-ul depindea de memorie: mesaje repetate, verificari manuale si predari care puteau aluneca usor.",
          solution: "O harta de automatizare cu trigger points, cereri rutate, schimbari de status si timing intern mai curat.",
          result: "O prima automatizare utila, usor de verificat si extins dupa ce procesul devine stabil.",
          recommendedPlan: "Premium / Studio System",
          stack: ["Logica automatizare", "Formulare", "Harta workflow", "Pregatit pentru integrari"],
        },
      ],
      labels: {
        problem: "Ce lipseste",
        solution: "Cum il construim",
        result: "Ce ar iesi",
        plan: "Pachet recomandat",
        scenario: "Directie de concept",
        status: "Sample scenario",
      },
      disclaimer: "Acestea sunt directii de concept si sisteme exemplu, nu proiecte prezentate ca rezultate ale unor clienti reali.",
      nextLabel: "Brief",
      nextTitle: "Ai ceva concret? Il asezam intr-un dossier de lansare.",
      nextText: "Trimite ideea in forma bruta. O curatam, taiem ce nu trebuie si pastram ce poate deveni prima interfata publica.",
      cta: "Trimite Brief",
      conceptLabel: "Directii conceptuale",
      conceptTitle: "Scenarii pe care le putem transforma in sisteme reale.",
      conceptText: "Acestea nu sunt clienti reali sau studii de caz. Sunt exemple de contexte unde o prima versiune Balkan Veil poate aduce claritate.",
      conceptLabels: {
        problem: "Problema",
        direction: "Directie",
        system: "Sistem",
        package: "Pachet",
      },
      concepts: [
        { tag: "Premium local", title: "Serviciu local premium", problem: "Oferta exista, dar site-ul nu sustine pretul sau nivelul serviciului.", direction: "Pagina clara, vizual premium, cu traseu de lead si proof selectiv.", system: "Website 5-7 pagini cu formular lead-uri si CMS.", package: "Premium" },
        { tag: "Hospitality", title: "Boutique hospitality", problem: "Locatia are atmosfera, dar prezenta online pare generica.", direction: "Website cinematic cu pagini pentru experienta, camere/servicii si cereri.", system: "Website administrat cu sectiuni sezoniere si optimizari lunare.", package: "Premium / Studio System" },
        { tag: "Expert brand", title: "Consultant / expert", problem: "Expertiza nu este explicata suficient de clar pentru clienti noi.", direction: "Pozitionare, servicii, proof si formular de calificare.", system: "Website custom cu continut CMS-ready si suport lunar.", package: "Launch / Premium" },
        { tag: "Operations", title: "Sistem operational mic", problem: "Cererile si statusurile raman in mesaje separate.", direction: "Interfata simpla pentru lead-uri, prioritati si status.", system: "Dashboard basic + website public + pipeline simplu.", package: "Studio System" },
      ],
    },
    build: {
      eyebrow: "Build Digital",
      title: "Prima versiune, nu platforma uriasa.",
      text: "Cand o idee e inca neclara, nu are nevoie de 30 de features. Are nevoie de o versiune mica, buna, pe care o poti arata, testa si imbunatati.",
      items: [
        { title: "Website-uri de pornire", text: "Mesaj clar, structura buna, mobile curat si un traseu simplu spre contact." },
        { title: "Dashboard-uri simple", text: "Cereri, statusuri si proiecte puse intr-un loc unde pot fi urmarite fara haos." },
        { title: "Automatizari punctuale", text: "Un flow pentru follow-up, rutare sau remindere, acolo unde munca manuala se repeta." },
        { title: "Tool-uri interne usoare", text: "Instrumente mici pentru continut, triere sau decizii repetitive, fara complexitate inutila." },
      ],
      visualLabel: "Sisteme Vizuale",
      visualTitle: "Directii vizuale.",
      visualText: "Cardurile astea nu incearca sa vanda o poveste. Arata tipul de interfete mici pe care le putem transforma in proiecte reale.",
      visualMockups: [
        { title: "Prezenta Fondator", label: "Prima versiune", lines: ["Pozitie", "Contact", "Dovada"] },
        { title: "Portal Client", label: "Dashboard simplu", lines: ["Cereri", "Proiecte", "Status"] },
        { title: "Landing Serviciu", label: "Pagina de test", lines: ["Oferta", "Incredere", "Contact"] },
      ],
      processLabel: "Proces",
      processSteps: [
        { step: "01", title: "Brief", text: "Clarificam problema, publicul, oferta si ce trebuie sa faca prima versiune ca sa merite construita." },
        { step: "02", title: "Scope", text: "Taiem ce este prea mare pentru inceput si pastram livrabilele care pot fi finalizate bine." },
        { step: "03", title: "Build", text: "Construim website-ul, formularul, portalul sau automatizarea intr-o structura curata, usor de extins." },
        { step: "04", title: "Lansare", text: "Testam pe desktop si mobil, conectam ce este necesar si predam o versiune care poate fi folosita." },
      ],
      caseStudies: [
        {
          title: "Pagina de Fondator",
          label: "Fondator / Personal Brand",
          text: "Directie pentru o pagina one-page care ajuta un fondator sa explice rapid cine este, ce construieste si cum poate fi contactat.",
          result: "Prima versiune potrivita pentru validare si outreach.",
          metric: "01",
        },
        {
          title: "Landing Page Serviciu",
          label: "Business Local Premium",
          text: "Directie pentru un business de servicii care are nevoie sa para mai clar, mai serios si mai usor de contactat.",
          result: "Pagina de start mai buna pentru primele cereri si teste comerciale.",
          metric: "02",
        },
        {
          title: "Dashboard Operational Simplu",
          label: "Sistem Business",
          text: "Directie pentru un dashboard mic care strange cereri, clienti si statusuri intr-un singur loc.",
          result: "Baza realista pentru un tool intern care poate creste dupa folosire.",
          metric: "03",
        },
      ],
      resultLabel: "Output",
      phaseLabel: "Faze",
      phaseTitle: "De la idee la lansare controlata.",
      phases: [
        { step: "01", title: "Clarificare", text: "Stabilim oferta, publicul, obiectivul si ce trebuie sa faca prima versiune.", deliverables: ["Brief curatat", "Structura pagina", "Lista de riscuri"] },
        { step: "02", title: "Constructie", text: "Ridicam interfata, componentele, continutul si fluxul principal de contact sau operare.", deliverables: ["Frontend responsive", "Formular / flow", "Stari cheie"] },
        { step: "03", title: "Lansare", text: "Verificam mobile, viteza perceputa, SEO de baza si detaliile care fac livrarea credibila.", deliverables: ["QA final", "Deployment", "Note de predare"] },
      ],
      responsibilityLabel: "Responsabilitati",
      responsibilityTitle: "Ce aduci tu si ce construim noi.",
      clientLabel: "Client",
      veilLabel: "Balkan Veil",
      clientProvides: ["Oferta bruta", "Exemple de clienti", "Ton si limite", "Feedback rapid"],
      veilBuilds: ["Structura", "Interfata", "Flow de contact", "Lansare tehnica"],
      finalCta: {
        eyebrow: "Build",
        title: "Pastreaza prima versiune suficient de mica.",
        text: "Daca ideea are sens, o transformam intr-un build care poate fi lansat, vazut si imbunatatit.",
        primary: "Trimite Brief",
        secondary: "Vezi Protocol",
      },
      howItWorks: {
        eyebrow: "How it works",
        title: "Procesul comercial ramane simplu.",
        clientLabel: "Client",
        veilLabel: "Balkan Veil",
        outputLabel: "Livrabil",
        steps: [
          { step: "01", title: "Apply", client: "Trimiti brief-ul si alegi pachetul de interes.", veil: "Verificam fit-ul si riscurile de scope.", output: "Directie initiala" },
          { step: "02", title: "Fit check", client: "Clarifici oferta, bugetul si termenul.", veil: "Confirmam daca abonamentul este potrivit.", output: "Recomandare pachet" },
          { step: "03", title: "Offer structure", client: "Aprobi structura si limitele.", veil: "Definim pagini, continut si flow.", output: "Scope de lucru" },
          { step: "04", title: "Build", client: "Dai feedback rapid pe iteratii.", veil: "Construim website-ul si conexiunile necesare.", output: "Versiune pregatita" },
          { step: "05", title: "Launch", client: "Confirmi continutul final.", veil: "Facem QA, deploy si verificari.", output: "Site live" },
          { step: "06", title: "Monthly support", client: "Trimiti update-uri si prioritati.", veil: "Aplicam suportul lunar inclus.", output: "Website administrat" },
        ],
      },
    },
    protocol: {
      eyebrow: "Protocolul Studioului",
      title: "Mai putin teatru. Mai multa claritate.",
      text: "Un site bun nu trebuie sa explice prea mult ca sa para serios. Trebuie sa fie clar, rapid, coerent si sa duca omul unde trebuie.",
      protocol: ["Clar", "Util", "Rapid", "Extensibil"],
      positioningLabel: "Pozitionare",
      decodeTitle: "Spune ce faci. Arata bine. Livreaza curat.",
      paragraphs: [
        "Balkan Veil pastreaza partea vizuala intunecata, dar nu vrem ca site-ul sa para o masca. Daca suntem la inceput, asta trebuie sa se simta normal, nu ascuns.",
        "Se potriveste proiectelor care au nevoie de o prima versiune prezentabila: destul de buna ca sa fie folosita, destul de simpla ca sa poata fi imbunatatita repede.",
      ],
      checklistLabel: "Checklist",
      checklistTitle: "Ce verificam inainte sa numim proiectul gata.",
      checklist: [
        { title: "Mesaj", text: "Oferta poate fi inteleasa fara explicatii suplimentare." },
        { title: "Traseu", text: "Exista o actiune clara pentru vizitatorul potrivit." },
        { title: "Mobil", text: "Pagina pastreaza ritmul, citibilitatea si CTA-ul pe ecrane mici." },
        { title: "Extensibil", text: "Structura permite continut nou fara sa refacem tot." },
      ],
      finalCta: {
        eyebrow: "Protocol",
        title: "Daca regulile au sens, urmatorul pas este un brief scurt.",
        text: "Scrie versiunea bruta. Stabilim repede daca scope-ul poate fi construit bine.",
        primary: "Trimite Brief",
        secondary: "Vezi Servicii",
      },
    },
    access: {
      eyebrow: "Acces",
      title: "Trimite un brief scurt.",
      text: "Spune ce vrei sa construiesti, ce te incurca acum si ce ar insemna o prima versiune buna.",
      modalLabel: "Brief Inregistrat",
      modalTitle: "Brief primit.",
      modalText: "Cererea a fost trimisa. Urmatorul pas este verificarea scope-ului si confirmarea daca proiectul se potriveste pentru o prima versiune Balkan Veil.",
      modalButton: "Inapoi la formular",
      panelTitle: "Incepem simplu.",
      panelText: "Nu trebuie sa ai tot planul gata. Ajunge sa fie clar ce problema vrei sa rezolvi si ce ar trebui sa faca prima versiune.",
      steps: ["Spune ce vrei sa construiesti.", "Verificam daca scope-ul este potrivit.", "Daca are sens, definim prima versiune."],
      inquiryLabel: "Brief de Proiect",
      inquiryTitle: "Scrie varianta bruta.",
      inquiryText: "Nu trebuie sa fie perfect. Cu cat e mai concret, cu atat mai repede il putem transforma intr-un scope decent.",
      form: {
        name: "Nume",
        namePlaceholder: "Numele tau",
        contact: "Contact",
        contactPlaceholder: "Email sau telefon",
        brand: "Brand",
        brandPlaceholder: "Companie / proiect",
        projectType: "Tip Proiect",
        budgetRange: "Buget",
        message: "Mesaj",
        messagePlaceholder: "Spune-ne ce vrei sa construiesti, sa repari sau sa automatizezi...",
        selectedBrief: "Brief Curent",
        project: "Proiect",
        budget: "Buget",
        submit: "Trimite Brief-ul",
        sending: "Se trimite...",
        requiredName: "Numele este obligatoriu.",
        requiredContact: "Adauga un email sau un numar de telefon.",
        backendMissing: "Backend-ul formularului nu este configurat.",
      },
      packagesLabel: "Pachete",
      faqLabel: "FAQ",
      beforeApply: {
        eyebrow: "Inainte de brief",
        title: "Nu ai nevoie de un plan perfect.",
        items: [
          { title: "Problema", text: "Spune ce nu functioneaza acum sau ce trebuie sa devina mai clar." },
          { title: "Prima versiune", text: "Descrie ce ar trebui sa existe la lansare, nu tot ce ar putea exista vreodata." },
          { title: "Limite", text: "Mentioneaza buget, termen, continut disponibil si ce trebuie evitat." },
        ],
      },
      fit: {
        eyebrow: "Fit",
        title: "Alegem scope-uri unde prima versiune poate iesi bine.",
        goodLabel: "Good fit",
        badLabel: "Not a fit",
        good: ["Site sau landing page clar", "Portal mic / dashboard simplu", "Workflow care se repeta deja", "Business cu oferta reala"],
        bad: ["Platforma uriasa din prima", "Promisiuni de crestere nerealiste", "Brand fara oferta clara", "Deadline imposibil"],
      },
      afterSubmit: {
        eyebrow: "Dupa trimitere",
        title: "Ce se intampla dupa ce trimiti brief-ul.",
        steps: [
          { title: "Citire", text: "Verificam rapid problema, obiectivul si tipul de proiect." },
          { title: "Scope", text: "Daca se potriveste, propunem o prima versiune mai clara." },
          { title: "Decizie", text: "Confirmam daca merita construit acum sau daca trebuie taiat din scope." },
        ],
      },
      qualification: {
        interestedLabel: "Interesat de",
        startLabel: "Start preferat",
        interestedOptions: ["Launch subscription", "Premium subscription", "Studio System", "Nu sunt sigur inca"],
        startOptions: ["ASAP", "Luna aceasta", "Luna viitoare", "Doar explorez"],
      },
      projectOptions: ["Website", "Landing Page", "Portal Client", "Dashboard", "Automatizare", "Prezenta Brand"],
      budgetOptions: ["Sub EUR 500", "EUR 500-1.5k", "EUR 1.5k-3k", "EUR 3k+", "Nu sunt sigur inca"],
      packages: [
        {
          name: "Veil Start",
          label: "Website / Landing",
          text: "O prima versiune serioasa pentru un business care are nevoie de prezenta online clara, fara proiect supradimensionat.",
          points: ["Structura paginii", "Design responsive", "CTA si formular", "Lansare controlata"],
        },
        {
          name: "Veil Flow",
          label: "Automatizare / Formular",
          text: "Un flow mic pentru cereri, statusuri, remindere sau follow-up, construit acolo unde procesul manual consuma timp.",
          points: ["Scope workflow", "Formular sau trigger", "Logica simpla", "Predare documentata"],
        },
        {
          name: "Veil Pilot",
          label: "Portal / Dashboard",
          text: "Un dashboard sau portal in prima versiune, pentru un proces care are nevoie de ordine inainte de complexitate.",
          points: ["Structura ecrane", "Date principale", "Flow utilizator", "Baza pentru extindere"],
        },
      ],
      faq: [
        { q: "Balkan Veil este la inceput?", a: "Da. Preferam sa fie clar. Luam proiecte mai mici, le tinem realiste si le facem cat mai bine." },
        { q: "Ce construieste Balkan Veil acum?", a: "Website-uri, landing pages, formulare, dashboard-uri simple, portaluri client in prima versiune, fluxuri de automatizare si tool-uri mici pentru uz real de business." },
        { q: "Este un brand de cybersecurity?", a: "Nu. Limbajul vizual imprumuta din cultura tehnica intunecata, dar serviciul este web, software, automatizare si sisteme de business." },
        { q: "Pentru cine este?", a: "Fondatori, business-uri locale, consultanti, furnizori de servicii, creatori si echipe mici care vor o prima versiune digitala mai serioasa." },
        { q: "Poate folosi un business normal stilul asta?", a: "Da. Tonul poate ramane cinematic, iar structura sa fie clara, practica si usor de inteles pentru clienti." },
        { q: "Este doar design?", a: "Nu. Munca poate include frontend, formulare, dashboard-uri, logica de automatizare, integrari, deployment si suport de lansare." },
        { q: "Poate ramane scope-ul mic?", a: "Da. Asta este recomandarea pentru inceput. O prima versiune buna este mai valoroasa decat un plan urias care nu ajunge niciodata live." },
      ],
    },
  },
  en: {
    navItems: [
      ["home", "Home"],
      ["studio", "Studio"],
      ["services", "Services"],
      ["pricing", "Pricing"],
      ["work", "Work"],
      ["build", "Build"],
      ["protocol", "Protocol"],
      ["access", "Access"],
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
    home: {
      badge: "Websites / small systems",
      hero: "Clear sites with atmosphere.",
      text: "Balkan Veil builds managed web presences for businesses that need clarity, atmosphere and a clean path to qualified inquiries. The idea stays simple: look distinct, explain the offer and avoid pointless system weight.",
      primaryCta: "Send Brief",
      secondaryCta: "View Studio",
      builtAround: "Working Style",
      builtTitle: "Start with what can be delivered well.",
      valueProps: [
        { title: "Grounded", text: "We are not trying to look bigger than we are. A small project finished well beats a large promise." },
        { title: "Design with a job", text: "The dark look stays, but every section needs to explain, qualify or move people closer to inquiry." },
        { title: "Healthy scope", text: "If something does not help the first version, it does not go in just to make the project look complex." },
      ],
      audience: [
        "Local businesses that need a better site",
        "Founders who need a simple, serious page",
        "Consultants and services that need clarity",
        "Creators with offers worth presenting better",
        "Small teams that need order in requests and statuses",
        "Projects that need a decent visual MVP",
      ],
      signalStrip: ["Signal clarity", "Launch protocol", "CMS layer", "Inquiry path", "Operating layer"],
      launchChanges: {
        eyebrow: "After launch",
        title: "The site should change how the business is perceived.",
        text: "No miracle claims. The first version should make the offer clearer, more credible and easier to send to someone else.",
        items: [
          { title: "The offer becomes readable", text: "A visitor quickly understands what you do, who it is for and why they should continue." },
          { title: "The presence stops feeling improvised", text: "Structure, visual rhythm and small details create a more considered business surface." },
          { title: "The inquiry gets a path", text: "Calls to action, form choices and scope framing move the conversation toward a useful brief." },
        ],
      },
      methodPreview: {
        eyebrow: "Method",
        title: "A small process with clear edges.",
        steps: ["Diagnose", "Frame", "Build", "Polish", "Launch"],
      },
      interfacePreview: {
        eyebrow: "Preview",
        title: "The website as a public business interface.",
        text: "Balkan Veil treats the public page like an operating system: message, trust, inquiry path and content that can be managed.",
        systemLabel: "Balkan Veil OS",
        statusLine: "status: public interface mapped",
        moduleLabel: "module ledger",
        metrics: ["Signal clarity", "Offer frame", "Launch path"],
        rows: ["Inquiry flow mapped", "CMS layer prepared", "Monthly support queued"],
      },
      dossier: {
        stampCode: "BV / 01",
        stampLabel: "digital dossier",
        status: "signal audit ready",
        ledgerLabel: "Operating signals",
        items: ["Clear offer interface", "Guided inquiry path", "Monthly operating layer"],
        note: "A public presence should feel like a decision, not a renamed theme.",
      },
      subscriptionIntro: {
        eyebrow: "Managed subscription",
        title: "Managed web presence for businesses that want clarity online without handling the technical layer.",
        text: "You pay monthly for build, hosting, maintenance and support. Minimum 12-month contract, so the public system can be built, launched and improved properly.",
        points: ["Custom public interface", "Hosting and deploy included", "Monthly support layer", "Controlled improvements"],
      },
      beforeAfter: {
        eyebrow: "Before / After",
        title: "What changes when the website is treated as a managed system.",
        beforeLabel: "Before",
        afterLabel: "After",
        before: ["Unclear offer", "Generic template feel", "Weak contact path", "No content structure", "No managed support"],
        after: ["Clear positioning", "Premium visual system", "Guided inquiry flow", "CMS-ready content", "Monthly support path"],
      },
      finalCta: {
        eyebrow: "Signal audit",
        title: "Send the brief. We will map the public interface.",
        text: "We start from the rough idea and turn it into a clear scope: offer, pages, inquiry path and launch.",
        primary: "Send Brief",
        secondary: "View Pricing",
      },
    },
    studio: {
      eyebrow: "Studio",
      title: "Small now. Careful with details.",
      text: "Balkan Veil is an early web studio. We work on projects where a good first version actually helps: a clearer site, a landing page, a form, a simple dashboard or an automated flow.",
      positionLabel: "Position",
      positionTitle: "Plain position.",
      positionText: "We do not need to sound like a large agency. It is more useful to be clear: choose fewer projects, keep them easy to understand and build them properly.",
      signature: "small scope / good design / clean delivery",
      whatLabel: "What it is",
      whatTitle: "Good look, practical work.",
      whatText: "The aesthetic stays dark and premium, but the project still has to be easy to use. If visitors do not understand what you do and how to contact you, the design missed the point.",
      principles: [
        { title: "Say it directly", text: "A client should not have to guess what you sell, who it is for and what they should do after landing on the site." },
        { title: "Cut the excess", text: "A small project can look strong when it is not loaded with sections that only exist to make it feel bigger." },
        { title: "Build for use", text: "The form, CTA, flow and mobile version matter as much as the first screen." },
        { title: "Keep character", text: "A site can be clear without looking generic. That is where the Balkan Veil atmosphere stays useful." },
      ],
      notes: [
        "Darkness is not decoration. It is room for contrast, quiet and selection.",
        "A good site should feel decided, not loaded.",
        "Small details matter more than large effects.",
        "If the aesthetic does not help the offer read clearly, the aesthetic is not finished.",
      ],
      aesthetic: {
        eyebrow: "Aesthetic position",
        title: "Dark premium, held with editorial discipline.",
        text: "Balkan Veil uses atmosphere to create trust and visual tension, not to hide weak structure. The page should feel calm, precise and built for a real business.",
        points: ["Large serif, but controlled", "Thin lines, not heavy ornaments", "Gold as signal, not background", "Black space that lets content breathe"],
      },
      avoids: {
        eyebrow: "What we avoid",
        title: "Not everything that looks premium helps.",
        items: ["Generic hero promises", "Repeated cards just to fill space", "Aggressive glow and cyberpunk effects", "Fake mockups that say nothing", "Copy that sounds like any agency", "Animations that move the layout"],
      },
      materials: {
        eyebrow: "Visual material",
        title: "What the Balkan Veil language is built from.",
        items: [
          { title: "Archive lines", text: "Hairlines, subtle frames and margins that feel like an editorial dossier." },
          { title: "Signal gold", text: "Gold used for direction, status and accent, not large surfaces." },
          { title: "Stone texture", text: "Dark, matte tones that keep the page serious and readable." },
          { title: "Cinematic restraint", text: "Less motion, controlled visual tension and room for text." },
        ],
      },
      operator: {
        eyebrow: "Operator mindset",
        title: "The public interface is treated as a controlled surface.",
        text: "We are not chasing spectacle. We scan visible signals, isolate noise and make the page feel active, clear and under control.",
        statuses: ["RECON active", "SURFACE mapped", "SIGNAL clean", "TRACE sealed"],
      },
      attackSurface: {
        eyebrow: "Attack surface",
        title: "What the visitor sees in the first seconds.",
        text: "In brand terms, the attack surface is everything that can weaken trust: ambiguous message, weak visual rhythm, unclear CTA, poorly placed proof. Balkan Veil closes those points without theatre.",
        items: [
          { title: "Exposed offer", text: "It is clear quickly what you sell, who it is for and why someone should continue." },
          { title: "Inquiry path", text: "The next action is visible, not buried inside a tired page." },
          { title: "Visual authority", text: "The composition supports price and level of service without cheap decoration." },
          { title: "Mobile surface", text: "The first impression stays controlled on small screens." },
        ],
      },
      reconNotes: {
        eyebrow: "Recon notes",
        title: "Weak signals detected in public interfaces.",
        items: ["Headline that promises a lot but does not frame the offer", "Many cards without real hierarchy", "Sections that look premium only because of a gradient", "CTAs asking for contact before trust exists", "Mobile rhythm that makes the brand feel improvised"],
      },
      visualVectors: {
        eyebrow: "Visual vectors",
        title: "Tactical directions for a sharper site.",
        items: [
          { title: "RECON", text: "Fast reading of public signals: message, rhythm, trust, action." },
          { title: "SURFACE", text: "Sections arranged as clear surfaces, not decorative blocks." },
          { title: "VECTOR", text: "Visual direction toward the offer and inquiry, without dead paths." },
          { title: "SEALED", text: "Removing noise that weakens the perception of control." },
        ],
      },
      neutralizedNoise: {
        eyebrow: "Neutralized noise",
        title: "What we remove from a presence that wants to feel serious.",
        items: ["Template energy", "Mockups without function", "Aggressive glitch", "Vague agency copy", "Decoration without signal", "Motion that distracts from decision"],
      },
    },
    servicesPage: {
      eyebrow: "Capabilities",
      title: "Concrete things we can build.",
      text: "We are not trying to cover everything. We build public surfaces and small systems that clarify the offer, inquiry path and monthly operation.",
      projectTypesLabel: "Project Types",
      ctaLabel: "Brief",
      ctaTitle: "Send the brief. We map the interface.",
      ctaText: "We start from the rough version and define a small, clear and realistic launch scope.",
      ctaAction: "Send Brief",
      services: [
        {
          icon: "Terminal",
          title: "Website Build",
          text: "A site or landing page that explains the offer better and looks more considered on desktop and mobile.",
          deliverables: ["Homepage or landing structure", "Responsive frontend", "Inquiry or contact flow", "Launch-ready implementation"],
        },
        {
          icon: "Network",
          title: "Workflow Automation",
          text: "Small automations for things that already repeat: follow-ups, routing, status updates or reminders.",
          deliverables: ["Workflow map", "Trigger logic", "Tool connection plan", "Handover notes"],
        },
        {
          icon: "Eye",
          title: "Client Portal / Dashboard",
          text: "Simple screens for requests, clients, bookings, statuses or activity, so information stops being scattered.",
          deliverables: ["Dashboard interface", "Core user flow", "Admin-ready structure", "Data-shaped layout"],
        },
        {
          icon: "Lock",
          title: "Digital MVP",
          text: "A gated page, internal tool or small experience you can test without building a whole platform.",
          deliverables: ["Access flow", "Controlled interface", "Custom sections", "Deployment support"],
        },
        {
          icon: "Shield",
          title: "Website Cleanup",
          text: "For sites that technically exist, but no longer match the level of the business: unclear sections, weak mobile views, slow pages or tired visuals.",
          deliverables: ["Visual cleanup", "Section restructure", "Performance pass", "Conversion fixes"],
        },
        {
          icon: "ArrowRight",
          title: "Launch Support",
          text: "The final pass before a site goes public: forms, deployment, mobile checks, content placement and the small details that are easy to miss.",
          deliverables: ["Deployment setup", "Final QA", "Content handover", "Post-launch fixes"],
        },
      ],
      projectTypes: [
        "Founder websites",
        "Service landing pages",
        "Client portals",
        "Booking and request systems",
        "Dashboards and admin panels",
        "Automation workflows",
        "AI-assisted tools",
        "Brand presentation pages",
      ],
      layers: {
        eyebrow: "Layers",
        title: "How we package the work.",
        items: [
          { title: "Positioning", text: "We clarify the offer, audience and primary action before loading the page with sections." },
          { title: "Interface", text: "We build the layout, mobile experience, visual rhythm and components that make the site easy to scan." },
          { title: "Launch", text: "We connect the form, check routes, prepare deployment and leave room for future content." },
        ],
      },
      outcomes: {
        eyebrow: "Outcomes",
        items: ["Clearer message", "Stronger mobile", "Better briefs", "Controlled launch"],
      },
      comparison: {
        eyebrow: "Position",
        title: "Not just a pretty theme.",
        items: [
          { title: "Not a template", text: "The structure follows the offer, not a generic page with a renamed logo." },
          { title: "Not just visuals", text: "The design has to improve understanding, contact and decision, not only look dark." },
          { title: "Business interface", text: "The public page becomes the first simple system through which people understand and enter the conversation." },
        ],
      },
      architecture: {
        eyebrow: "Service architecture",
        title: "What the public system contains.",
        text: "Each project is mapped as a small architecture: what the client sees, what you manage internally and how the inquiry reaches the right place.",
        nodes: ["Interface", "Structure", "CMS", "Inquiry", "Support", "Launch"],
      },
      subscription: {
        eyebrow: "Delivered as subscription",
        title: "The services are packaged as a managed monthly web presence.",
        text: "You do not receive a build and then get left alone with the technical side. Plans include launch protocol, hosting/deploy, support and a monthly frame for small changes.",
        ctaPrimary: "View Pricing",
        ctaSecondary: "Send Brief",
      },
      monthly: {
        eyebrow: "Monthly",
        title: "The operating layer after launch.",
        items: [
          { title: "Small updates", text: "Text, image, link, simple section or content-detail adjustments." },
          { title: "Content adjustments", text: "The page can stay current as the offer changes." },
          { title: "Technical monitoring", text: "Basic checks for deployment, form flow and public functionality." },
          { title: "Controlled improvements", text: "Monthly or quarterly iterations depending on the plan." },
          { title: "Support window", text: "Included monthly time for questions, changes and prioritization." },
        ],
      },
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Managed web presence on monthly subscription.",
      text: "For businesses that want a distinct public interface without managing hosting, deployment, maintenance and small changes.",
      seoTitle: "Balkan Veil Pricing - Managed Web Presence",
      seoDescription: "Subscription plans for managed web presence, CMS setup, technical support and monthly improvements.",
      minimumLabel: "Minimum 12-month contract",
      supportLabel: "Included support",
      bestForLabel: "Best for",
      includedLabel: "Included",
      notIncludedLabel: "Not included",
      planIndexLabel: "dossier",
      ledgerLabel: "plan ledger",
      plans: [
        {
          name: "Launch",
          price: "199 EUR",
          period: "/month",
          label: "Initial presence",
          description: "For small businesses that need a clear public interface that can launch quickly.",
          included: ["1-3 pages", "Custom design", "Responsive", "Inquiry path", "Basic SEO", "Hosting/deploy included", "Small changes"],
          support: "30 min support/month",
          bestFor: "Small businesses that need a public interface quickly.",
        },
        {
          name: "Premium",
          price: "399 EUR",
          period: "/month",
          label: "Operating layer",
          description: "For services and brands that need more content, CMS and monthly iteration.",
          recommended: "Recommended",
          included: ["5-7 pages", "CMS included", "Optional RO/EN", "Inquiry form", "Technical SEO", "Basic analytics", "Monthly changes", "One new section quarterly"],
          support: "2 hours support/month",
          bestFor: "Businesses that want a managed web presence.",
        },
        {
          name: "Studio System",
          price: "699 EUR",
          period: "/month",
          label: "Managed system",
          description: "For businesses that want a full web presence, CMS/admin and monthly optimization.",
          included: ["Complete web presence", "Separate CMS/admin", "Extra landing pages", "Basic lead pipeline", "Monthly optimization", "Monthly report", "Priority support"],
          support: "4-5 hours support/month",
          bestFor: "Businesses that want a managed web system.",
        },
      ],
      subscriptionSteps: {
        eyebrow: "How it works",
        title: "From brief to monthly support.",
        steps: ["Apply", "Fit check", "Structure", "Build", "Launch", "Monthly support"],
      },
      notIncluded: {
        eyebrow: "Limits",
        title: "What is not included in the subscription.",
        items: ["Complete branding/logo", "Photography/video", "Meta/Google ads", "Complex ecommerce", "Advanced custom integrations", "Unlimited changes", "24/7 support", "Unlimited full copywriting"],
      },
      buyoutNote: {
        eyebrow: "After 12 months",
        title: "Buyout or transfer can be discussed after the minimum period.",
        text: "The subscription has a minimum 12-month contract. After that period we can discuss continued support, transfer or buyout depending on the project and infrastructure.",
      },
      faqLabel: "FAQ",
      faqTitle: "Commercial questions about subscriptions.",
      faq: [
        { q: "Is hosting included?", a: "Yes, hosting/deploy is included within reasonable limits for presentation websites and small systems." },
        { q: "Can I request changes every month?", a: "Yes. Each plan includes a support window for small changes and content adjustments." },
        { q: "What counts as a small change?", a: "Text, images, links, small layout adjustments, simple sections or updates to existing content." },
        { q: "What is not included?", a: "Large features, complex ecommerce, ads, full branding, photo/video and advanced integrations are quoted separately." },
        { q: "Can I cancel?", a: "There is a minimum 12-month contract. After the minimum period we can continue, adjust or discuss transfer/buyout." },
        { q: "What happens after 12 months?", a: "We can continue the subscription, change the support level or discuss buyout/transfer." },
        { q: "Do I own the website?", a: "You have usage rights during the subscription. Ownership, transfer and buyout details are clarified in the offer." },
        { q: "Can I buy out / transfer the website?", a: "Yes, this can be discussed after the minimum 12-month period, depending on the project." },
        { q: "Is CMS included?", a: "It is included in Premium and Studio System. For Launch it can be discussed separately if needed." },
        { q: "Is copywriting included?", a: "Structure and copy adjustments are included. Full copywriting or large content volume is quoted separately." },
      ],
      finalCta: {
        eyebrow: "Next step",
        title: "Choose the operating layer, then send the brief.",
        text: "If you are not sure which plan fits, send the context and we will do the fit check.",
        primary: "Send Brief",
        secondary: "View Services",
      },
    },
    work: {
      eyebrow: "Directions",
      title: "Examples of projects we can make.",
      text: "We are not pretending these are finished case studies. They are project types that fit the start and how we would approach them.",
      projects: [
        {
          number: "01",
          title: "Founder Page",
          category: "Personal Brand / Authority",
          summary: "A compact public presence for authority, outreach and clearer commercial conversations.",
          problem: "A founder needs a simple page that explains who they are, what they do and why they are worth contacting.",
          solution: "A one-page structure with short positioning, selective proof, a clear CTA and no filler.",
          result: "A credible link for outreach, presentations and bio.",
          recommendedPlan: "Launch",
          stack: ["React", "Tailwind", "Framer Motion", "Brief form"],
        },
        {
          number: "02",
          title: "Service Landing Page",
          category: "Premium Service Business",
          summary: "An offer interface for services where price, trust and inquiry need to be easier to read.",
          problem: "The business wanted to charge like a specialist, but the old page made it feel interchangeable.",
          solution: "A dark landing page with a tighter offer hierarchy, calmer proof and a conversion path that qualifies instead of begging.",
          result: "A better page for ads, referrals and sales conversations.",
          recommendedPlan: "Premium",
          stack: ["Landing page", "Copy structure", "CTA flow", "Responsive build"],
        },
        {
          number: "03",
          title: "Simple Client Portal",
          category: "Dashboard / Operations",
          summary: "A small system for requests, statuses and internal visibility without pretending to be a huge platform.",
          problem: "Requests, statuses and notes quickly end up in separate messages, even in a small business.",
          solution: "A simple dashboard that brings the important parts into one place without promising a full ERP.",
          result: "A practical base for a portal that can grow after people actually use it.",
          recommendedPlan: "Studio System",
          stack: ["Dashboard UI", "Client records", "Status system", "Admin flow"],
        },
        {
          number: "04",
          title: "Starter Automation",
          category: "Business Automation",
          summary: "An operating path for follow-up, routing and internal timing, built as a first version that can be checked.",
          problem: "The workflow depended on memory: repeated messages, manual checks and handoffs that could easily slip.",
          solution: "A structured automation map with trigger points, routed requests, status changes and cleaner internal timing.",
          result: "A useful first automation that is easy to verify and extend after the process becomes stable.",
          recommendedPlan: "Premium / Studio System",
          stack: ["Automation logic", "Forms", "Workflow map", "Integration-ready"],
        },
      ],
      labels: {
        problem: "What is missing",
        solution: "How we build it",
        result: "What comes out",
        plan: "Recommended plan",
        scenario: "Concept direction",
        status: "Sample scenario",
      },
      disclaimer: "These are concept directions and sample systems, not client claims.",
      nextLabel: "Brief",
      nextTitle: "Have something concrete? Put it into a launch dossier.",
      nextText: "Send the rough idea. We clean it up, cut what is not needed and keep what can become the first public interface.",
      cta: "Start Project",
      conceptLabel: "Concept directions",
      conceptTitle: "Scenarios we can turn into real systems.",
      conceptText: "These are not real clients or case studies. They are examples of contexts where a Balkan Veil first version can create clarity.",
      conceptLabels: {
        problem: "Problem",
        direction: "Direction",
        system: "System",
        package: "Package",
      },
      concepts: [
        { tag: "Premium local", title: "Premium local service", problem: "The offer exists, but the site does not support the price or level of service.", direction: "Clear page, premium visual system, lead path and selective proof.", system: "5-7 page website with lead form and CMS.", package: "Premium" },
        { tag: "Hospitality", title: "Boutique hospitality", problem: "The location has atmosphere, but the online presence feels generic.", direction: "Cinematic website for experience, rooms/services and inquiries.", system: "Managed website with seasonal sections and monthly optimization.", package: "Premium / Studio System" },
        { tag: "Expert brand", title: "Consultant / expert", problem: "The expertise is not explained clearly enough for new clients.", direction: "Positioning, services, proof and qualification form.", system: "Custom website with CMS-ready content and monthly support.", package: "Launch / Premium" },
        { tag: "Operations", title: "Small operations system", problem: "Requests and statuses stay scattered across messages.", direction: "Simple interface for leads, priorities and status.", system: "Basic dashboard + public website + simple pipeline.", package: "Studio System" },
      ],
    },
    build: {
      eyebrow: "Digital Build",
      title: "First version, not a huge platform.",
      text: "When an idea is still unclear, it does not need 30 features. It needs a small, good version you can show, test and improve.",
      items: [
        { title: "Starter websites", text: "Clear message, good structure, clean mobile and a simple path to contact." },
        { title: "Simple dashboards", text: "Requests, statuses and projects placed somewhere they can be followed without chaos." },
        { title: "Targeted automations", text: "One flow for follow-up, routing or reminders where manual work already repeats." },
        { title: "Light internal tools", text: "Small tools for content, triage or repeated decisions, without pointless complexity." },
      ],
      visualLabel: "Visual Systems",
      visualTitle: "Visual directions.",
      visualText: "These cards are not trying to sell a story. They show the kind of small interfaces we can turn into real projects.",
      visualMockups: [
        { title: "Founder Presence", label: "First version", lines: ["Position", "Contact", "Proof"] },
        { title: "Client Portal", label: "Simple dashboard", lines: ["Requests", "Projects", "Status"] },
        { title: "Service Landing", label: "Test page", lines: ["Offer", "Trust", "Contact"] },
      ],
      processLabel: "Process",
      processSteps: [
        { step: "01", title: "Brief", text: "We clarify the problem, audience, offer and what the first version needs to do to be worth building." },
        { step: "02", title: "Scope", text: "We cut what is too large for the start and keep the deliverables that can be finished well." },
        { step: "03", title: "Build", text: "We build the website, form, portal or automation in a clean structure that can be extended." },
        { step: "04", title: "Launch", text: "We test desktop and mobile, connect what is needed and hand over a version that can be used." },
      ],
      caseStudies: [
        {
          title: "Founder Page",
          label: "Founder / Personal Brand",
          text: "Direction for a one-page site that helps a founder quickly explain who they are, what they are building and how to contact them.",
          result: "A first version suitable for validation and outreach.",
          metric: "01",
        },
        {
          title: "Service Landing Page",
          label: "Premium Local Business",
          text: "Direction for a service business that needs to feel clearer, more serious and easier to contact.",
          result: "A better starting page for first inquiries and commercial tests.",
          metric: "02",
        },
        {
          title: "Simple Operations Dashboard",
          label: "Business System",
          text: "Direction for a small dashboard that brings requests, clients and statuses into one place.",
          result: "A realistic base for an internal tool that can grow after usage.",
          metric: "03",
        },
      ],
      resultLabel: "Output",
      phaseLabel: "Phases",
      phaseTitle: "From idea to controlled launch.",
      phases: [
        { step: "01", title: "Clarify", text: "We define the offer, audience, goal and what the first version needs to do.", deliverables: ["Clean brief", "Page structure", "Risk list"] },
        { step: "02", title: "Build", text: "We assemble the interface, components, content and main contact or operations flow.", deliverables: ["Responsive frontend", "Form / flow", "Key states"] },
        { step: "03", title: "Launch", text: "We check mobile, perceived speed, basic SEO and the details that make delivery credible.", deliverables: ["Final QA", "Deployment", "Handover notes"] },
      ],
      responsibilityLabel: "Responsibilities",
      responsibilityTitle: "What you bring and what we build.",
      clientLabel: "Client",
      veilLabel: "Balkan Veil",
      clientProvides: ["Rough offer", "Client examples", "Tone and limits", "Fast feedback"],
      veilBuilds: ["Structure", "Interface", "Contact flow", "Technical launch"],
      finalCta: {
        eyebrow: "Build",
        title: "Keep the first version small enough to finish.",
        text: "If the idea makes sense, we turn it into a build that can be launched, seen and improved.",
        primary: "Send Brief",
        secondary: "View Protocol",
      },
      howItWorks: {
        eyebrow: "How it works",
        title: "The commercial process stays simple.",
        clientLabel: "Client",
        veilLabel: "Balkan Veil",
        outputLabel: "Output",
        steps: [
          { step: "01", title: "Apply", client: "You send the brief and choose the plan you are interested in.", veil: "We check fit and scope risks.", output: "Initial direction" },
          { step: "02", title: "Fit check", client: "You clarify offer, budget and timing.", veil: "We confirm whether the subscription model fits.", output: "Plan recommendation" },
          { step: "03", title: "Offer structure", client: "You approve structure and limits.", veil: "We define pages, content and flow.", output: "Work scope" },
          { step: "04", title: "Build", client: "You give fast feedback on iterations.", veil: "We build the website and required connections.", output: "Prepared version" },
          { step: "05", title: "Launch", client: "You confirm final content.", veil: "We run QA, deploy and checks.", output: "Live website" },
          { step: "06", title: "Monthly support", client: "You send updates and priorities.", veil: "We apply the included monthly support.", output: "Managed website" },
        ],
      },
    },
    protocol: {
      eyebrow: "The Studio Protocol",
      title: "Less theatre. More clarity.",
      text: "A good site should not need to explain too much to feel serious. It should be clear, fast, coherent and move people where they need to go.",
      protocol: ["Clear", "Useful", "Fast", "Extendable"],
      positioningLabel: "Positioning",
      decodeTitle: "Say what you do. Look good. Ship clean.",
      paragraphs: [
        "Balkan Veil keeps the dark visual side, but the site should not feel like a mask. If we are early, that should feel normal, not hidden.",
        "It fits projects that need a presentable first version: good enough to use, simple enough to improve quickly.",
      ],
      checklistLabel: "Checklist",
      checklistTitle: "What we check before calling the project ready.",
      checklist: [
        { title: "Message", text: "The offer can be understood without extra explanation." },
        { title: "Path", text: "There is a clear action for the right visitor." },
        { title: "Mobile", text: "The page keeps rhythm, readability and CTA access on small screens." },
        { title: "Extendable", text: "The structure allows new content without rebuilding everything." },
      ],
      finalCta: {
        eyebrow: "Protocol",
        title: "If the rules make sense, the next step is a short brief.",
        text: "Write the rough version. We quickly decide whether the scope can be built well.",
        primary: "Send Brief",
        secondary: "View Services",
      },
    },
    access: {
      eyebrow: "Access",
      title: "Send a short brief.",
      text: "Say what you want to build, what is getting in the way now and what a good first version would need to do.",
      modalLabel: "Brief Logged",
      modalTitle: "Brief received.",
      modalText: "The request has been sent. The next step is checking the scope and confirming whether the project fits a Balkan Veil first version.",
      modalButton: "Back to form",
      panelTitle: "Start simple.",
      panelText: "You do not need the full plan ready. It is enough to know what problem you want solved and what the first version should do.",
      steps: ["Tell us what you want to build.", "We check whether the scope fits.", "If it makes sense, we define the first version."],
      inquiryLabel: "Project Brief",
      inquiryTitle: "Write the rough version.",
      inquiryText: "It does not need to be perfect. The more concrete it is, the faster we can turn it into a decent scope.",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        contact: "Contact",
        contactPlaceholder: "Email or phone",
        brand: "Brand",
        brandPlaceholder: "Company / project",
        projectType: "Project Type",
        budgetRange: "Budget Range",
        message: "Message",
        messagePlaceholder: "Tell us what you want to build, fix or automate...",
        selectedBrief: "Current Brief",
        project: "Project",
        budget: "Budget",
        submit: "Send Brief",
        sending: "Sending...",
        requiredName: "Name is required.",
        requiredContact: "Add an email or phone number.",
        backendMissing: "The form backend is not configured.",
      },
      packagesLabel: "Packages",
      faqLabel: "FAQ",
      beforeApply: {
        eyebrow: "Before you apply",
        title: "You do not need a perfect plan.",
        items: [
          { title: "Problem", text: "Say what is not working now or what needs to become clearer." },
          { title: "First version", text: "Describe what should exist at launch, not everything that could exist one day." },
          { title: "Limits", text: "Mention budget, timing, available content and anything that should be avoided." },
        ],
      },
      fit: {
        eyebrow: "Fit",
        title: "We choose scopes where a first version can be built well.",
        goodLabel: "Good fit",
        badLabel: "Not a fit",
        good: ["Clear website or landing page", "Small portal / simple dashboard", "Workflow that already repeats", "Business with a real offer"],
        bad: ["Huge platform from day one", "Unrealistic growth promises", "Brand with no clear offer", "Impossible deadline"],
      },
      afterSubmit: {
        eyebrow: "After sending",
        title: "What happens after you send the brief.",
        steps: [
          { title: "Read", text: "We quickly check the problem, goal and project type." },
          { title: "Scope", text: "If it fits, we propose a clearer first version." },
          { title: "Decision", text: "We confirm whether it is worth building now or needs a smaller scope." },
        ],
      },
      qualification: {
        interestedLabel: "Interested in",
        startLabel: "Preferred start",
        interestedOptions: ["Launch subscription", "Premium subscription", "Studio System", "Not sure yet"],
        startOptions: ["ASAP", "This month", "Next month", "Just exploring"],
      },
      projectOptions: ["Website", "Landing Page", "Client Portal", "Dashboard", "Automation", "Brand Presence"],
      budgetOptions: ["Under EUR 500", "EUR 500-1.5k", "EUR 1.5k-3k", "EUR 3k+", "Not sure yet"],
      packages: [
        {
          name: "Veil Start",
          label: "Website / Landing",
          text: "A serious first version for a business that needs clear online presence without an oversized project.",
          points: ["Page structure", "Responsive design", "CTA and form", "Controlled launch"],
        },
        {
          name: "Veil Flow",
          label: "Automation / Form",
          text: "A small flow for requests, statuses, reminders or follow-up, built where the manual process already costs time.",
          points: ["Workflow scope", "Form or trigger", "Simple logic", "Documented handoff"],
        },
        {
          name: "Veil Pilot",
          label: "Portal / Dashboard",
          text: "A dashboard or portal in first version, for a process that needs order before it needs complexity.",
          points: ["Screen structure", "Core data", "User flow", "Base for expansion"],
        },
      ],
      faq: [
        { q: "Is Balkan Veil early?", a: "Yes. We prefer to be clear about that. We take smaller projects, keep them realistic and build them as well as possible." },
        { q: "What does Balkan Veil build now?", a: "Websites, landing pages, forms, simple dashboards, first-version client portals, automation flows and small custom tools for real business use." },
        { q: "Is this a cybersecurity brand?", a: "No. The visual language borrows from dark technical culture, but the service is web, software, automation and business systems." },
        { q: "Who is it for?", a: "Founders, local businesses, consultants, service providers, creators and small teams that want a more serious first digital version." },
        { q: "Can a normal business use this style?", a: "Yes. The tone can stay cinematic while the structure remains clear, practical and easy for clients to understand." },
        { q: "Is it only design?", a: "No. The work can include frontend, forms, dashboards, automation logic, integrations, deployment and launch support." },
        { q: "Can the scope stay small?", a: "Yes. That is recommended at the start. A good first version is more useful than a giant plan that never goes live." },
      ],
    },
  },
};
