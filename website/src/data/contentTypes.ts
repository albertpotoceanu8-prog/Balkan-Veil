import type { PageKey } from "@/types/navigation";

export type Language = "ro" | "en";
export type ServiceIcon = "Terminal" | "Network" | "Eye" | "Lock" | "Shield" | "ArrowRight";
export type NavItem = readonly [PageKey, string];
export type NavigationGroup = {
  page: PageKey;
  label: string;
  children?: readonly NavItem[];
};

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
  promoPrice?: string;
  promoLabel?: string;
  promoNote?: string;
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
  navigationGroups: NavigationGroup[];
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
    trust: {
      eyebrow: string;
      title: string;
      text: string;
      groups: {
        title: string;
        items: string[];
      }[];
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
    scopeNote: {
      eyebrow: string;
      title: string;
      text: string;
    };
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
