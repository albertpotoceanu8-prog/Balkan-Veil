export type {
  CommandItem,
  Language,
  NavItem,
  Service,
  ServiceIcon,
  SiteContent,
  VisualMockup,
  WorkProject,
} from "./contentTypes";

import type { Language, SiteContent } from "./contentTypes";
import { sharedContent } from "./content/shared";
import { homeContent } from "./content/home";
import { studioContent } from "./content/studio";
import { servicesPageContent } from "./content/servicesPage";
import { pricingContent } from "./content/pricing";
import { workContent } from "./content/work";
import { buildContent } from "./content/build";
import { protocolContent } from "./content/protocol";
import { accessContent } from "./content/access";

export const siteContent: Record<Language, SiteContent> = {
  ro: {
    ...sharedContent.ro,
    home: homeContent.ro,
    studio: studioContent.ro,
    servicesPage: servicesPageContent.ro,
    pricing: pricingContent.ro,
    work: workContent.ro,
    build: buildContent.ro,
    protocol: protocolContent.ro,
    access: accessContent.ro,
  },
  en: {
    ...sharedContent.en,
    home: homeContent.en,
    studio: studioContent.en,
    servicesPage: servicesPageContent.en,
    pricing: pricingContent.en,
    work: workContent.en,
    build: buildContent.en,
    protocol: protocolContent.en,
    access: accessContent.en,
  },
};
