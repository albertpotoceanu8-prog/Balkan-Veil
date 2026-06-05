export type ServiceIcon = "Terminal" | "Network" | "Eye" | "Lock" | "Shield" | "ArrowRight";

export type Service = {
  icon: ServiceIcon;
  title: string;
  text: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    icon: "Terminal",
    title: "Website Build",
    text: "A focused site or landing page for businesses that need a more serious first presence: clear sections, mobile polish and a look that does not feel borrowed.",
    deliverables: ["Homepage or landing structure", "Responsive frontend", "Inquiry or contact flow", "Launch-ready implementation"],
  },
  {
    icon: "Network",
    title: "Workflow Automation",
    text: "Small automations for places where time is already being lost: follow-ups, routing, status updates, reminders and simple internal handoffs.",
    deliverables: ["Workflow map", "Trigger logic", "Tool connection plan", "Handover notes"],
  },
  {
    icon: "Eye",
    title: "Client Portal / Dashboard",
    text: "Internal screens for requests, clients, bookings, project states or activity, designed so the important things are easier to find.",
    deliverables: ["Dashboard interface", "Core user flow", "Admin-ready structure", "Data-shaped layout"],
  },
  {
    icon: "Lock",
    title: "Digital MVP",
    text: "A gated page, internal tool or invite-only experience in a first version: clear enough to test, without unnecessary complexity.",
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
];

export const projectTypes = [
  "Founder websites",
  "Service landing pages",
  "Client portals",
  "Booking and request systems",
  "Dashboards and admin panels",
  "Automation workflows",
  "AI-assisted tools",
  "Brand presentation pages",
];

export const valueProps = [
  { title: "Grounded", text: "We are not trying to look bigger than we are. A small project finished well beats a large promise." },
  { title: "Design with a job", text: "The dark look stays, but every section needs to explain, qualify or move people closer to contact." },
  { title: "Healthy scope", text: "If something does not help the first version, it does not go in just to make the project look complex." },
];

export const audience = [
  "Local businesses that need a more serious site",
  "Founders and solo operators shaping positioning",
  "Consultants and services that need clarity",
  "Creators with offers that need better presentation",
  "Small teams that need a first simple system",
  "Projects that need a strong visual MVP",
];
