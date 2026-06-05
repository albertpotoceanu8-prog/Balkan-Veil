export type VisualMockup = {
  title: string;
  label: string;
  lines: string[];
};

export const visualMockups: VisualMockup[] = [
  {
    title: "Founder Presence",
    label: "First version",
    lines: ["Position", "Contact", "Proof"],
  },
  {
    title: "Client Portal",
    label: "Simple dashboard",
    lines: ["Requests", "Projects", "Status"],
  },
  {
    title: "Service Landing",
    label: "Test page",
    lines: ["Offer", "Trust", "Contact"],
  },
];
