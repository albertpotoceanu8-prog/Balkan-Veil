import { LOGO_SRC } from "@/data/logo";
import type { NavItem, PageKey } from "@/types/navigation";

type FooterProps = {
  navItems: readonly NavItem[];
  labels: {
    brandLine: string;
    description: string;
    navigate: string;
    contact: string;
    contactLineOne: string;
    contactLineTwo: string;
    nodeStatus: string;
    status: string;
    mode: string;
    operational: string;
    cinematic: string;
    standard: string;
    copyright: string;
    tagline: string;
  };
  activeCinematic: boolean;
  goToPage: (target: PageKey) => void;
};

export function Footer({ navItems, labels, activeCinematic, goToPage }: FooterProps) {
  return (
    <footer className="relative z-10 mx-auto max-w-[1500px] px-8 py-20">
      <div className="rounded-[2.5rem] border border-stone-900 bg-black/40 p-8 md:p-12 md:backdrop-blur-xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-amber-400/30 bg-black shadow-[0_0_40px_rgba(245,158,11,0.18)] md:h-14 md:w-14">
                <img src={LOGO_SRC} alt="Balkan Veil logo" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-serif text-2xl tracking-[0.22em] text-amber-200">BALKAN VEIL</p>
                <p className="text-xs uppercase tracking-[0.32em] text-stone-600">{labels.brandLine}</p>
              </div>
            </div>
            <p className="mt-8 max-w-md text-lg leading-8 text-stone-500">{labels.description}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-300">{labels.navigate}</p>
            <div className="mt-6 space-y-3">
              {navItems.map(([key, label]) => (
                <button key={key} onClick={() => goToPage(key)} className="block text-stone-500 transition hover:text-amber-200">
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-300">{labels.contact}</p>
            <div className="mt-6 space-y-3 text-stone-500">
              <p>contact@balkanveil.com</p>
              <p>{labels.contactLineOne}</p>
              <p>{labels.contactLineTwo}</p>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-300">{labels.nodeStatus}</p>
            <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-950/60 p-5 font-mono text-sm text-stone-500">
              <p>
                <span className="text-amber-300">studio</span>: balkan-veil
              </p>
              <p>
                <span className="text-amber-300">{labels.status}</span>: {labels.operational}
              </p>
              <p>
                <span className="text-amber-300">{labels.mode}</span>: {activeCinematic ? labels.cinematic : labels.standard}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-stone-900 pt-8 text-sm text-stone-700 md:flex-row">
          <p>{labels.copyright}</p>
          <p>{labels.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
