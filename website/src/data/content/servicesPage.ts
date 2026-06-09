import type { Language, SiteContent } from "../contentTypes";

export const servicesPageContent = {
  ro: {
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
      trust: {
        eyebrow: "Cadru clar",
        title: "Lucram premium, dar cu margini clare.",
        text: "Balkan Veil construieste prezente web, aplicatii mici si sisteme digitale pentru business-uri care au nevoie de claritate, incredere si executie tehnica. Nu vindem ideea ca facem orice. Alegem proiecte unde rezultatul poate fi construit bine si intretinut corect.",
        groups: [
          {
            title: "Ce construim",
            items: ["Website-uri, landing pages si pagini de prezentare premium", "Aplicatii web mici, portaluri client si dashboard-uri", "Formulare, flow-uri de lead si sisteme de cereri", "CMS, panouri admin si integrari utile"],
          },
          {
            title: "Ce sustinem",
            items: ["Setup tehnic SEO de baza", "Analytics, pixeli si masurare basic", "Domeniu, DNS si deploy pe platforme moderne", "Integrari cu email, CRM, booking, formulare sau plati"],
          },
          {
            title: "Ce nu promitem",
            items: ["Pozitii garantate in Google", "Vanzari, lead-uri sau performanta ads garantate", "Revizii nelimitate si suport 24/7 enterprise", "Hosting proprietar sau infrastructura enterprise"],
          },
          {
            title: "Pentru cine",
            items: ["Business-uri mici si medii", "Branduri locale premium si servicii specializate", "Consultanti, creatori, antreprenori si startup-uri", "Echipe care au nevoie de executie tehnica clara"],
          },
        ],
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
  en: {
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
      trust: {
        eyebrow: "Clear frame",
        title: "Premium execution, with clear edges.",
        text: "Balkan Veil builds web presences, small applications and digital systems for businesses that need clarity, trust and technical execution. We do not sell the idea that we do everything. We choose projects where the result can be built well and maintained properly.",
        groups: [
          {
            title: "What we build",
            items: ["Premium websites, landing pages and presentation pages", "Small web apps, client portals and dashboards", "Forms, lead flows and request systems", "CMS, admin panels and useful integrations"],
          },
          {
            title: "What we support",
            items: ["Basic technical SEO setup", "Analytics, pixels and basic measurement", "Domain, DNS and deployment on modern platforms", "Email, CRM, booking, forms or payment integrations"],
          },
          {
            title: "What we do not promise",
            items: ["Guaranteed Google positions", "Guaranteed sales, leads or ad performance", "Unlimited revisions or 24/7 enterprise support", "Proprietary hosting or enterprise infrastructure"],
          },
          {
            title: "Best suited for",
            items: ["Small and medium businesses", "Premium local brands and specialized services", "Consultants, creators, entrepreneurs and startups", "Teams that need clear technical execution"],
          },
        ],
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
} satisfies Record<Language, SiteContent["servicesPage"]>;
