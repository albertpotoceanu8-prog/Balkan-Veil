import React from "react";
import { Command, X } from "lucide-react";
import { motion } from "framer-motion";
import type { CommandItem, PageKey } from "@/types/navigation";

type CommandMenuProps = {
  commandItems: readonly CommandItem[];
  labels: {
    title: string;
    subtitle: string;
  };
  goToPage: (target: PageKey) => void;
  close: () => void;
};

export function CommandMenu({ commandItems, labels, goToPage, close }: CommandMenuProps) {
  const firstActionRef = React.useRef<HTMLButtonElement | null>(null);
  const titleId = "command-menu-title";
  const descriptionId = "command-menu-description";

  React.useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    firstActionRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocus?.focus();
    };
  }, [close]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-start justify-center bg-black/75 px-6 pt-28 backdrop-blur-md md:backdrop-blur-xl"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-amber-300/20 bg-stone-950/95 shadow-[0_0_90px_rgba(251,191,36,0.12)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stone-800 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/25 bg-amber-300/5 text-amber-200" aria-hidden="true">
                <Command className="h-5 w-5" />
              </div>
              <div>
                <p id={titleId} className="font-serif text-2xl text-amber-100">{labels.title}</p>
                <p id={descriptionId} className="text-xs uppercase tracking-[0.28em] text-stone-500">{labels.subtitle}</p>
              </div>
          </div>
          <button type="button" onClick={close} className="rounded-full border border-stone-800 p-2 text-stone-400 transition hover:text-amber-200" aria-label="Close command menu">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-4">
          {commandItems.map((item, index) => (
            <button
              key={item.title}
              ref={index === 0 ? firstActionRef : undefined}
              type="button"
              onClick={() => goToPage(item.page)}
              className="group flex w-full items-center justify-between rounded-2xl border border-transparent px-5 py-5 text-left transition hover:border-amber-300/25 hover:bg-black/45"
            >
              <div>
                <p className="font-serif text-2xl text-stone-100 transition group-hover:text-amber-100">{item.title}</p>
                <p className="mt-1 text-sm text-stone-500">{item.description}</p>
              </div>
              <span className="font-mono text-sm text-amber-300/50">0{index + 1}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
