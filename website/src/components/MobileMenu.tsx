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

export function MobileMenu({ page, navigationGroups, labels, goToPage, openCommandMenu }: MobileMenuProps) {
  const isGroupActive = (group: NavigationGroup) => page === group.page || Boolean(group.children?.some(([key]) => key === page));

  return (
    <motion.div
      id="mobile-menu"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.24 }}
      className="operator-surface relative z-30 mx-5 max-h-[calc(100svh-6.5rem)] !overflow-y-auto border border-neutral-300/15 bg-black/90 p-4 backdrop-blur-md lg:hidden"
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
              className={`min-h-12 border px-4 py-3 text-left font-serif text-xl leading-tight transition ${isGroupActive(group) ? "border-neutral-300/35 bg-neutral-300/10 text-neutral-100" : "border-neutral-800 bg-neutral-950/60 text-neutral-300"}`}
            >
              {group.label}
            </button>
            {group.children?.length ? (
              <div className="grid gap-2 pl-3">
                {group.children.map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => goToPage(key)}
                    aria-current={page === key ? "page" : undefined}
                    className={`flex min-h-12 items-center gap-3 border px-4 py-3 text-left font-serif text-lg leading-tight transition ${page === key ? "border-neutral-300/30 bg-neutral-300/10 text-neutral-100" : "border-neutral-800 bg-black/45 text-neutral-400"}`}
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-neutral-500" aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        <button type="button" onClick={openCommandMenu} className="mt-1 min-h-12 border border-neutral-800 bg-black/50 px-4 py-3 text-left text-[11px] uppercase tracking-[0.22em] text-neutral-200">
          {labels.openCommandMenu}
        </button>
      </div>
    </motion.div>
  );
}
