import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Languages, Menu, X } from "lucide-react";
import { LOGO_SRC } from "@/data/logo";
import type { Language } from "@/data/siteContent";
import type { NavItem, PageKey } from "@/types/navigation";

type NavbarProps = {
  page: PageKey;
  navItems: readonly NavItem[];
  labels: {
    brandLine: string;
    command: string;
    language: string;
    ro: string;
    en: string;
    cinematicOn: string;
    standard: string;
    reducedMotion: string;
  };
  language: Language;
  onLanguageChange: (language: Language) => void;
  activeCinematic: boolean;
  prefersReducedMotion: boolean;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCinematic: React.Dispatch<React.SetStateAction<boolean>>;
  setCommandOpen: React.Dispatch<React.SetStateAction<boolean>>;
  goToPage: (target: PageKey) => void;
};

export function Navbar({
  page,
  navItems,
  labels,
  language,
  onLanguageChange,
  activeCinematic,
  prefersReducedMotion,
  mobileOpen,
  setMobileOpen,
  setCinematic,
  setCommandOpen,
  goToPage,
}: NavbarProps) {
  const [languageOpen, setLanguageOpen] = React.useState(false);
  const languageMenuId = "language-menu";

  const chooseLanguage = (nextLanguage: Language) => {
    onLanguageChange(nextLanguage);
    setLanguageOpen(false);
  };

  return (
    <nav className="relative z-20 mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 md:px-8 md:py-8" aria-label="Primary navigation">
      <button type="button" onClick={() => goToPage("home")} className="flex items-center gap-4 text-left" aria-label="Balkan Veil home">
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-amber-400/30 bg-black shadow-[0_0_40px_rgba(245,158,11,0.18)] md:h-14 md:w-14">
          <img src={LOGO_SRC} alt="Balkan Veil logo" loading="eager" decoding="async" className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="font-serif text-lg tracking-[0.18em] text-amber-200 md:text-2xl md:tracking-[0.24em]">BALKAN VEIL</p>
          <p className="hidden text-xs uppercase tracking-[0.35em] text-stone-500 sm:block">{labels.brandLine}</p>
        </div>
      </button>

      <div className="hidden items-center gap-6 text-xs uppercase tracking-[0.28em] text-stone-400 lg:flex">
        {navItems.map(([key, label]) => (
          <button key={key} type="button" onClick={() => goToPage(key)} aria-current={page === key ? "page" : undefined} className={`transition hover:text-amber-200 ${page === key ? "text-amber-200" : ""}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="hidden items-center gap-3 lg:flex">
        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          className="rounded-full border border-stone-800 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-stone-400 transition hover:border-amber-300/35 hover:text-amber-200"
        >
          {labels.command}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setLanguageOpen((value) => !value)}
            className="flex items-center gap-2 rounded-full border border-stone-800 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-stone-400 transition hover:border-amber-300/35 hover:text-amber-200"
            aria-label={labels.language}
            aria-expanded={languageOpen}
            aria-controls={languageMenuId}
          >
            <Languages className="h-3.5 w-3.5" aria-hidden="true" />
            {language === "ro" ? "RO" : "ENG"}
            <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <AnimatePresence>
            {languageOpen && (
              <motion.div
                id={languageMenuId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 mt-3 w-40 overflow-hidden rounded-2xl border border-amber-300/15 bg-black/95 p-2 shadow-[0_0_40px_rgba(251,191,36,0.10)]"
              >
                <button
                  type="button"
                  onClick={() => chooseLanguage("ro")}
                  aria-pressed={language === "ro"}
                  className={`block w-full rounded-xl px-3 py-2 text-left text-xs uppercase tracking-[0.2em] transition ${language === "ro" ? "bg-amber-300/10 text-amber-100" : "text-stone-500 hover:bg-stone-900 hover:text-amber-200"}`}
                >
                  {labels.ro}
                </button>
                <button
                  type="button"
                  onClick={() => chooseLanguage("en")}
                  aria-pressed={language === "en"}
                  className={`mt-1 block w-full rounded-xl px-3 py-2 text-left text-xs uppercase tracking-[0.2em] transition ${language === "en" ? "bg-amber-300/10 text-amber-100" : "text-stone-500 hover:bg-stone-900 hover:text-amber-200"}`}
                >
                  {labels.en}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => setCinematic((value) => !value)}
          aria-pressed={activeCinematic}
          className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.24em] transition ${activeCinematic ? "border-amber-300/40 bg-amber-300/10 text-amber-200" : "border-stone-800 bg-black/30 text-stone-500"}`}
        >
          {prefersReducedMotion ? labels.reducedMotion : activeCinematic ? labels.cinematicOn : labels.standard}
        </button>
      </div>

      <button
        type="button"
        onClick={() => setMobileOpen((value) => !value)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-800 bg-black/40 text-stone-300 lg:hidden"
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={mobileOpen}
        aria-controls="mobile-menu"
      >
        {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>
    </nav>
  );
}
