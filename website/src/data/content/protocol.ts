import type { Language, SiteContent } from "../contentTypes";

export const protocolContent = {
  ro: {
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
  en: {
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
} satisfies Record<Language, SiteContent["protocol"]>;
