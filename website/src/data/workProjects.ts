export type WorkProject = {
  number: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
};

export const workProjects: WorkProject[] = [
  {
    number: "01",
    title: "Early Founder Page",
    category: "Personal Brand / Authority",
    problem: "A founder needs a simple page that explains who they are, what they are building and why they are worth contacting without feeling exaggerated.",
    solution: "A one-page structure with short positioning, selective proof, a clear CTA and enough detail to start a real conversation.",
    result: "A credible first version for outreach, presentations and a link in bio.",
    stack: ["React", "Tailwind", "Framer Motion", "Brief form"],
  },
  {
    number: "02",
    title: "Service Landing Page",
    category: "Premium Service Business",
    problem: "The business wanted to charge like a specialist, but the old page made it feel interchangeable.",
    solution: "A dark landing page with a tighter offer hierarchy, calmer proof and a conversion path that qualifies instead of begging.",
    result: "A stronger starting page for first campaigns, ads or sales conversations.",
    stack: ["Landing page", "Copy structure", "CTA flow", "Responsive build"],
  },
  {
    number: "03",
    title: "Simple Client Portal",
    category: "Dashboard / Operations",
    problem: "Requests, project states and client notes quickly end up in separate messages, even in a small business.",
    solution: "A simple dashboard that brings requests, clients and statuses into one place without promising a full ERP.",
    result: "A realistic starting point for a portal that can grow after people actually use it.",
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
];
