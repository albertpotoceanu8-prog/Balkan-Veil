import { LOGO_SRC } from "@/data/logo";
import type { NavigationGroup, PageKey } from "@/types/navigation";

type FooterProps = {
  navigationGroups: readonly NavigationGroup[];
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

export function Footer({ navigationGroups, labels, activeCinematic, goToPage }: FooterProps) {
  return (
    <footer className="relative z-10 mx-auto max-w-[1500px] px-5 py-24 md:px-8 md:py-36">
      <div className="operator-surface border border-neutral-900 bg-black/45 p-9 md:p-16 md:backdrop-blur-xl">
        <div className="absolute inset-0 operator-grid opacity-15" aria-hidden="true" />
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] xl:gap-20">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-neutral-400/30 bg-black md:h-14 md:w-14">
                <img src={LOGO_SRC} alt="Balkan Veil logo" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-serif text-2xl tracking-[0.22em] text-neutral-200">BALKAN VEIL</p>
                <p className="text-xs uppercase tracking-[0.32em] text-neutral-600">{labels.brandLine}</p>
              </div>
            </div>
            <p className="mt-10 max-w-md text-lg leading-8 text-neutral-500">{labels.description}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-neutral-300">{labels.navigate}</p>
            <nav className="mt-6 space-y-4" aria-label="Footer navigation">
              {navigationGroups.map((group) => (
                <div key={group.page}>
                  <button type="button" onClick={() => goToPage(group.page)} className="block text-neutral-400 transition hover:text-neutral-200">
                    {group.label}
                  </button>
                  {group.children?.length ? (
                    <div className="mt-2 space-y-2 border-l border-neutral-800 pl-3">
                      {group.children.map(([key, label]) => (
                        <button key={key} type="button" onClick={() => goToPage(key)} className="block text-sm text-neutral-600 transition hover:text-neutral-200">
                          {label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-neutral-300">{labels.contact}</p>
            <div className="mt-6 space-y-3 text-neutral-500">
              <a href="mailto:contact@balkanveil.com" className="inline-block transition hover:text-neutral-200">contact@balkanveil.com</a>
              <p>{labels.contactLineOne}</p>
              <p>{labels.contactLineTwo}</p>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-neutral-300">{labels.nodeStatus}</p>
            <div className="mt-6 border border-neutral-800 bg-neutral-950/60 p-5 font-mono text-sm text-neutral-500">
              <p>
                <span className="text-neutral-300">studio</span>: balkan-veil
              </p>
              <p>
                <span className="text-neutral-300">{labels.status}</span>: {labels.operational}
              </p>
              <p>
                <span className="text-neutral-300">{labels.mode}</span>: {activeCinematic ? labels.cinematic : labels.standard}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-5 border-t border-neutral-900 pt-10 text-sm text-neutral-700 md:flex-row">
          <p>{labels.copyright}</p>
          <p>{labels.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
