export type PageKey = "home" | "studio" | "services" | "work" | "build" | "protocol" | "access";

export type NavItem = readonly [PageKey, string];

export type CommandItem = {
  page: PageKey;
  title: string;
  description: string;
};
