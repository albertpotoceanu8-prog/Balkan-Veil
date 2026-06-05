import { motion } from "framer-motion";
import type { Language } from "@/data/siteContent";
import type { NavItem, PageKey } from "@/types/navigation";

type MobileMenuProps = {
  page: PageKey;
  navItems: readonly NavItem[];
  labels: {
    openCommandMenu: string;
    language: string;
  };
  language: Language;
  onLanguageChange: (language: Language) => void;
  goToPage: (target: PageKey) => void;
  openCommandMenu: () => void;
};

export function MobileMenu({ page, navItems, labels, language, onLanguageChange, goToPage, openCommandMenu }: MobileMenuProps) {
  return (
    <motion.div
      id="mobile-menu"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.24 }}
      className="operator-surface relative z-30 mx-6 border border-amber-300/15 bg-black/85 p-5 backdrop-blur-md lg:hidden"
      role="dialog"
      aria-label="Mobile navigation"
    >
      <div className="grid gap-3">
        {navItems.map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => goToPage(key)}
            aria-current={page === key ? "page" : undefined}
            className={`border px-5 py-4 text-left font-serif text-2xl transition ${page === key ? "border-amber-300/35 bg-amber-300/10 text-amber-100" : "border-stone-800 bg-stone-950/60 text-stone-300"}`}
          >
            {label}
          </button>
        ))}
        <button type="button" onClick={openCommandMenu} className="mt-2 border border-stone-800 bg-black/50 px-5 py-4 text-left text-xs uppercase tracking-[0.28em] text-amber-200">
          {labels.openCommandMenu}
        </button>

        <div className="mt-2 border border-stone-800 bg-black/50 p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">{labels.language}</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onLanguageChange("ro")}
              aria-pressed={language === "ro"}
              className={`border px-4 py-3 text-xs uppercase tracking-[0.24em] transition ${language === "ro" ? "border-amber-300/40 bg-amber-300/10 text-amber-100" : "border-stone-800 text-stone-500"}`}
            >
              RO
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange("en")}
              aria-pressed={language === "en"}
              className={`border px-4 py-3 text-xs uppercase tracking-[0.24em] transition ${language === "en" ? "border-amber-300/40 bg-amber-300/10 text-amber-100" : "border-stone-800 text-stone-500"}`}
            >
              ENG
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
