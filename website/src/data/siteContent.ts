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
  problem: string;
  solution: string;
  result: string;
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
    };
    nextLabel: string;
    nextTitle: string;
    nextText: string;
    cta: string;
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
  };
  protocol: {
    eyebrow: string;
    title: string;
    text: string;
    protocol: string[];
    positioningLabel: string;
    decodeTitle: string;
    paragraphs: string[];
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
      ["work", "Lucrari"],
      ["build", "Build"],
      ["protocol", "Protocol"],
      ["access", "Acces"],
    ],
    commandItems: [
      { page: "studio", title: "Deschide Studio", description: "Vezi cum lucram si ce tip de proiect are sens." },
      { page: "services", title: "Deschide Servicii", description: "Vezi ce putem construi concret." },
      { page: "work", title: "Vezi Directii", description: "Exemple de proiecte si cum le-am aborda." },
      { page: "build", title: "Vezi Procesul", description: "Cum trece o idee bruta spre o versiune folosibila." },
      { page: "protocol", title: "Deschide Protocolul", description: "Regulile simple dupa care construim." },
      { page: "access", title: "Trimite Brief", description: "Scrie varianta bruta a proiectului." },
    ],
    navigation: {
      brandLine: "Software · Sisteme · Design",
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
      brandLine: "Software · Sisteme · Design",
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
      copyright: "© 2026 Balkan Veil.",
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
      text: "Balkan Veil este la inceput si lucreaza pe proiecte compacte: website-uri, landing pages, formulare, dashboard-uri simple si automatizari usoare. Ideea e simpla: arata bine, spune clar ce vinzi si nu complica inutil lucrurile.",
      primaryCta: "Trimite un Brief",
      secondaryCta: "Vezi Studio",
      builtAround: "Mod de lucru",
      builtTitle: "Incepem cu ce poate fi livrat bine.",
      valueProps: [
        { title: "Cu picioarele pe pamant", text: "Nu incercam sa parem mai mari decat suntem. Preferam un proiect mic, finalizat bine, in locul unei promisiuni mari." },
        { title: "Design cu functie", text: "Look-ul dark ramane, dar fiecare sectiune trebuie sa explice, sa califice sau sa duca omul mai aproape de contact." },
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
    },
    servicesPage: {
      eyebrow: "Capabilitati",
      title: "Lucruri concrete pe care le putem construi.",
      text: "Nu incercam sa acoperim tot. Incepem cu suprafete mici care conteaza: site, landing page, formular, dashboard simplu sau automatizare punctuala.",
      projectTypesLabel: "Tipuri de proiecte",
      ctaLabel: "Brief",
      ctaTitle: "Ai un proiect concret?",
      ctaText: "Trimite varianta bruta. O transformam intr-un scope mic, clar si realist.",
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
          problem: "Un fondator are nevoie de o pagina simpla care explica cine este, ce face si de ce merita contactat.",
          solution: "O structura one-page cu pozitionare scurta, dovada selectiva, CTA clar si zero umplutura.",
          result: "Un link credibil pentru outreach, prezentari si bio.",
          stack: ["React", "Tailwind", "Framer Motion", "Formular brief"],
        },
        {
          number: "02",
          title: "Landing Page Serviciu",
          category: "Business de Servicii Premium",
          problem: "Business-ul voia sa taxeze ca un specialist, dar pagina veche il facea sa para interschimbabil.",
          solution: "Un landing page intunecat, cu ierarhie mai clara a ofertei, dovada mai calma si un traseu de conversie care califica, nu cerseste.",
          result: "O pagina mai buna pentru reclame, recomandari si discutii comerciale.",
          stack: ["Landing page", "Structura copy", "Flux CTA", "Build responsive"],
        },
        {
          number: "03",
          title: "Portal Client Simplu",
          category: "Dashboard / Operatiuni",
          problem: "Cererile, statusurile si notitele ajung rapid in mesaje separate, chiar si intr-un business mic.",
          solution: "Un dashboard simplu care aduce lucrurile importante intr-un singur loc, fara sa promita un ERP complet.",
          result: "O baza practica pentru un portal care poate creste dupa ce este folosit.",
          stack: ["Dashboard UI", "Client records", "Status system", "Admin flow"],
        },
        {
          number: "04",
          title: "Automatizare de Pornire",
          category: "Automatizare Business",
          problem: "Workflow-ul depindea de memorie: mesaje repetate, verificari manuale si predari care puteau aluneca usor.",
          solution: "O harta de automatizare cu trigger points, cereri rutate, schimbari de status si timing intern mai curat.",
          result: "O prima automatizare utila, usor de verificat si extins dupa ce procesul devine stabil.",
          stack: ["Logica automatizare", "Formulare", "Harta workflow", "Pregatit pentru integrari"],
        },
      ],
      labels: {
        problem: "Ce lipseste",
        solution: "Cum il construim",
        result: "Ce ar iesi",
      },
      nextLabel: "Brief",
      nextTitle: "Ai ceva concret? Incepem cu o versiune mica.",
      nextText: "Trimite ideea in forma bruta. O curatam, taiem ce nu trebuie si pastram ce poate fi construit bine.",
      cta: "Trimite Brief",
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
      projectOptions: ["Website", "Landing Page", "Portal Client", "Dashboard", "Automatizare", "Prezenta Brand"],
      budgetOptions: ["Sub €500", "€500-€1.5k", "€1.5k-€3k", "€3k+", "Nu sunt sigur inca"],
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
      ["work", "Work"],
      ["build", "Build"],
      ["protocol", "Protocol"],
      ["access", "Access"],
    ],
    commandItems: [
      { page: "studio", title: "Open Studio", description: "See how we work and what kind of project makes sense." },
      { page: "services", title: "Open Services", description: "See what we can build concretely." },
      { page: "work", title: "View Directions", description: "Project examples and how we would approach them." },
      { page: "build", title: "View Process", description: "How a rough idea becomes something usable." },
      { page: "protocol", title: "Open Protocol", description: "The simple rules behind the work." },
      { page: "access", title: "Send Brief", description: "Write the rough version of the project." },
    ],
    navigation: {
      brandLine: "Software · Systems · Design",
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
      brandLine: "Software · Systems · Design",
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
      copyright: "© 2026 Balkan Veil.",
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
      text: "Balkan Veil is early and works on compact projects: websites, landing pages, forms, simple dashboards and light automations. The idea is simple: look good, explain what you sell and avoid pointless complexity.",
      primaryCta: "Send Brief",
      secondaryCta: "View Studio",
      builtAround: "Working Style",
      builtTitle: "Start with what can be delivered well.",
      valueProps: [
        { title: "Grounded", text: "We are not trying to look bigger than we are. A small project finished well beats a large promise." },
        { title: "Design with a job", text: "The dark look stays, but every section needs to explain, qualify or move people closer to contact." },
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
    },
    servicesPage: {
      eyebrow: "Capabilities",
      title: "Concrete things we can build.",
      text: "We are not trying to cover everything. We start with small surfaces that matter: a site, landing page, form, simple dashboard or targeted automation.",
      projectTypesLabel: "Project Types",
      ctaLabel: "Brief",
      ctaTitle: "Have something concrete?",
      ctaText: "Send the rough version. We turn it into a small, clear and realistic scope.",
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
          problem: "A founder needs a simple page that explains who they are, what they do and why they are worth contacting.",
          solution: "A one-page structure with short positioning, selective proof, a clear CTA and no filler.",
          result: "A credible link for outreach, presentations and bio.",
          stack: ["React", "Tailwind", "Framer Motion", "Brief form"],
        },
        {
          number: "02",
          title: "Service Landing Page",
          category: "Premium Service Business",
          problem: "The business wanted to charge like a specialist, but the old page made it feel interchangeable.",
          solution: "A dark landing page with a tighter offer hierarchy, calmer proof and a conversion path that qualifies instead of begging.",
          result: "A better page for ads, referrals and sales conversations.",
          stack: ["Landing page", "Copy structure", "CTA flow", "Responsive build"],
        },
        {
          number: "03",
          title: "Simple Client Portal",
          category: "Dashboard / Operations",
          problem: "Requests, statuses and notes quickly end up in separate messages, even in a small business.",
          solution: "A simple dashboard that brings the important parts into one place without promising a full ERP.",
          result: "A practical base for a portal that can grow after people actually use it.",
          stack: ["Dashboard UI", "Client records", "Status system", "Admin flow"],
        },
        {
          number: "04",
          title: "Starter Automation",
          category: "Business Automation",
          problem: "The workflow depended on memory: repeated messages, manual checks and handoffs that could easily slip.",
          solution: "A structured automation map with trigger points, routed requests, status changes and cleaner internal timing.",
          result: "A useful first automation that is easy to verify and extend after the process becomes stable.",
          stack: ["Automation logic", "Forms", "Workflow map", "Integration-ready"],
        },
      ],
      labels: {
        problem: "What is missing",
        solution: "How we build it",
        result: "What comes out",
      },
      nextLabel: "Brief",
      nextTitle: "Have something concrete? Start with a small version.",
      nextText: "Send the rough idea. We clean it up, cut what is not needed and keep what can be built well.",
      cta: "Start Project",
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
      projectOptions: ["Website", "Landing Page", "Client Portal", "Dashboard", "Automation", "Brand Presence"],
      budgetOptions: ["Under €500", "€500-€1.5k", "€1.5k-€3k", "€3k+", "Not sure yet"],
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
