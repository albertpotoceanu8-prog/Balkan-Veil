import type { CommandItem, NavItem } from "@/types/navigation";

export const navItems: NavItem[] = [
  ["home", "Home"],
  ["studio", "Studio"],
  ["services", "Services"],
  ["work", "Work"],
  ["build", "Build"],
  ["protocol", "Protocol"],
  ["access", "Access"],
];

export const commandItems: CommandItem[] = [
  { page: "studio", title: "Open Studio", description: "See how we work and what kind of project makes sense." },
  { page: "services", title: "Open Services", description: "See what we can build concretely." },
  { page: "work", title: "View Directions", description: "Project examples and how we would approach them." },
  { page: "build", title: "View Process", description: "How a rough idea becomes something usable." },
  { page: "protocol", title: "Open Protocol", description: "The simple rules behind the work." },
  { page: "access", title: "Send Brief", description: "Write the rough version of the project." },
];
