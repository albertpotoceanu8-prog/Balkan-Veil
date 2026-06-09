import { motion } from "framer-motion";
import type { Language } from "@/data/siteContent";
import type { NavigationGroup, PageKey } from "@/types/navigation";

type MobileMenuProps = {
  page: PageKey;
  navigationGroups: readonly NavigationGroup[];
  labels: {
    openCommandMenu: string;
    language: string;
  };
  language: Language;
  onLanguageChange: (language: Language) => void;
  goToPage: (target: PageKey) => void;
  openCommandMenu: () => void;
};

export function MobileMenu({ page, navigationGroups, labels, language, onLanguageChange, goToPage, openCommandMenu }: MobileMenuProps) {
  const isGroupActive = (group: NavigationGroup) => page === group.page || Boolean(group.children?.some(([key]) => key === page));

  return (
    <motion.div
      id="mobile-menu"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.24 }}
      className="operator-surface relative z-30 mx-5 max-h-[calc(100svh-6.5rem)] !overflow-y-auto border border-amber-300/15 bg-black/90 p-4 backdrop-blur-md lg:hidden"
      role="dialog"
      aria-label="Mobile navigation"
    >
      <div className="grid gap-2.5">
        {navigationGroups.map((group) => (
          <div key={group.page} className="grid gap-2">
            <button
              type="button"
              onClick={() => goToPage(group.page)}
              aria-current={page === group.page ? "page" : undefined}
              className={`min-h-12 border px-4 py-3 text-left font-serif text-xl leading-tight transition ${isGroupActive(group) ? "border-amber-300/35 bg-amber-300/10 text-amber-100" : "border-stone-800 bg-stone-950/60 text-stone-300"}`}
            >
              {group.label}
            </button>
            {group.children?.length ? (
              <div className="grid grid-cols-2 gap-2 pl-3">
                {group.children.map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => goToPage(key)}
                    aria-current={page === key ? "page" : undefined}
                    className={`min-h-10 border px-3 py-2 text-left text-[11px] uppercase tracking-[0.2em] transition ${page === key ? "border-amber-300/30 bg-amber-300/10 text-amber-100" : "border-stone-800 bg-black/45 text-stone-500"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        <button type="button" onClick={openCommandMenu} className="mt-1 min-h-12 border border-stone-800 bg-black/50 px-4 py-3 text-left text-[11px] uppercase tracking-[0.22em] text-amber-200">
          {labels.openCommandMenu}
        </button>

        <div className="mt-1 border border-stone-800 bg-black/50 p-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">{labels.language}</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onLanguageChange("ro")}
              aria-pressed={language === "ro"}
              className={`min-h-11 border px-4 py-2.5 text-xs uppercase tracking-[0.2em] transition ${language === "ro" ? "border-amber-300/40 bg-amber-300/10 text-amber-100" : "border-stone-800 text-stone-500"}`}
            >
              RO
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange("en")}
              aria-pressed={language === "en"}
              className={`min-h-11 border px-4 py-2.5 text-xs uppercase tracking-[0.2em] transition ${language === "en" ? "border-amber-300/40 bg-amber-300/10 text-amber-100" : "border-stone-800 text-stone-500"}`}
            >
              ENG
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
