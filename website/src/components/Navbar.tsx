import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Languages, Menu, X } from "lucide-react";
import { LOGO_SRC } from "@/data/logo";
import type { Language } from "@/data/siteContent";
import type { NavigationGroup, PageKey } from "@/types/navigation";

type NavbarProps = {
  page: PageKey;
  navigationGroups: readonly NavigationGroup[];
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
  navigationGroups,
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
  const [openGroup, setOpenGroup] = React.useState<PageKey | null>(null);
  const languageMenuId = "language-menu";

  const chooseLanguage = (nextLanguage: Language) => {
    onLanguageChange(nextLanguage);
    setLanguageOpen(false);
  };

  const choosePage = (target: PageKey) => {
    setOpenGroup(null);
    setLanguageOpen(false);
    goToPage(target);
  };

  const isGroupActive = (group: NavigationGroup) => page === group.page || Boolean(group.children?.some(([key]) => key === page));

  return (
    <nav className="relative z-20 mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 md:px-8 md:py-8" aria-label="Primary navigation">
      <button type="button" onClick={() => goToPage("home")} className="flex items-center gap-4 text-left" aria-label="Balkan Veil home">
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-neutral-400/30 bg-black md:h-14 md:w-14">
          <img src={LOGO_SRC} alt="Balkan Veil logo" loading="eager" decoding="async" className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="font-serif text-lg tracking-[0.18em] text-neutral-200 md:text-2xl md:tracking-[0.24em]">BALKAN VEIL</p>
          <p className="hidden text-xs uppercase tracking-[0.35em] text-neutral-500 sm:block">{labels.brandLine}</p>
        </div>
      </button>

      <div className="hidden items-center gap-6 text-xs uppercase tracking-[0.28em] text-neutral-400 lg:flex">
        {navigationGroups.map((group) => {
          const active = isGroupActive(group);
          const hasChildren = Boolean(group.children?.length);

          return (
            <div key={group.page} className="relative" onMouseEnter={() => setOpenGroup(group.page)} onMouseLeave={() => setOpenGroup(null)}>
              <button
                type="button"
                onClick={() => choosePage(group.page)}
                onFocus={() => setOpenGroup(group.page)}
                aria-current={page === group.page ? "page" : undefined}
                aria-expanded={hasChildren ? openGroup === group.page : undefined}
                className={`flex items-center gap-1.5 transition hover:text-neutral-200 ${active ? "text-neutral-200" : ""}`}
              >
                {group.label}
                {hasChildren && <ChevronDown className={`h-3 w-3 transition ${openGroup === group.page ? "rotate-180" : ""}`} aria-hidden="true" />}
              </button>

              <AnimatePresence>
                {hasChildren && openGroup === group.page && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-0 top-full mt-4 min-w-44 border border-neutral-300/15 bg-black/95 p-2"
                  >
                    {group.children?.map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => choosePage(key)}
                        onFocus={() => setOpenGroup(group.page)}
                        className={`block w-full border border-transparent px-3 py-2 text-left text-[10px] uppercase tracking-[0.22em] transition ${page === key ? "border-neutral-300/20 bg-neutral-300/10 text-neutral-100" : "text-neutral-500 hover:bg-neutral-900 hover:text-neutral-200"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="hidden items-center gap-3 lg:flex">
        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          className="border border-neutral-800 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-neutral-400 transition hover:border-neutral-300/35 hover:text-neutral-200"
        >
          {labels.command}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setLanguageOpen((value) => !value)}
            className="flex items-center gap-2 border border-neutral-800 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-neutral-400 transition hover:border-neutral-300/35 hover:text-neutral-200"
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
                className="absolute right-0 mt-3 w-40 overflow-hidden border border-neutral-300/15 bg-black/95 p-2"
              >
                <button
                  type="button"
                  onClick={() => chooseLanguage("ro")}
                  aria-pressed={language === "ro"}
                  className={`block w-full border border-transparent px-3 py-2 text-left text-xs uppercase tracking-[0.2em] transition ${language === "ro" ? "border-neutral-300/20 bg-neutral-300/10 text-neutral-100" : "text-neutral-500 hover:bg-neutral-900 hover:text-neutral-200"}`}
                >
                  {labels.ro}
                </button>
                <button
                  type="button"
                  onClick={() => chooseLanguage("en")}
                  aria-pressed={language === "en"}
                  className={`mt-1 block w-full border border-transparent px-3 py-2 text-left text-xs uppercase tracking-[0.2em] transition ${language === "en" ? "border-neutral-300/20 bg-neutral-300/10 text-neutral-100" : "text-neutral-500 hover:bg-neutral-900 hover:text-neutral-200"}`}
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
          className={`border px-4 py-2 text-[10px] uppercase tracking-[0.24em] transition ${activeCinematic ? "border-neutral-300/40 bg-neutral-300/10 text-neutral-200" : "border-neutral-800 bg-black/30 text-neutral-500"}`}
        >
          {prefersReducedMotion ? labels.reducedMotion : activeCinematic ? labels.cinematicOn : labels.standard}
        </button>
      </div>

      <button
        type="button"
        onClick={() => setMobileOpen((value) => !value)}
        className="flex h-11 w-11 items-center justify-center border border-neutral-800 bg-black/40 text-neutral-300 lg:hidden"
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={mobileOpen}
        aria-controls="mobile-menu"
      >
        {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>
    </nav>
  );
}
