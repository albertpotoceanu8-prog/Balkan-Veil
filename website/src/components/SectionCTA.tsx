import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PageKey } from "@/types/navigation";

type SectionCTAProps = {
  eyebrow: string;
  title: string;
  text: string;
  primaryLabel: string;
  secondaryLabel?: string;
  primaryTarget: PageKey;
  secondaryTarget?: PageKey;
  goToPage: (target: PageKey) => void;
};

export function SectionCTA({ eyebrow, title, text, primaryLabel, secondaryLabel, primaryTarget, secondaryTarget, goToPage }: SectionCTAProps) {
  return (
    <section className="operator-surface relative z-10 overflow-hidden border border-[#241d0c] bg-[#050302]/92 p-5 text-center shadow-[0_0_70px_rgba(197,130,63,0.06)] md:p-12">
      <div className="absolute inset-0 operator-grid opacity-18" aria-hidden="true" />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#b99832]/55 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#d4af37] md:text-xs md:tracking-[0.35em]">{eyebrow}</p>
        <h2 className="mt-5 font-serif text-3xl leading-tight text-[#d8c7a3] md:mt-6 md:text-7xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6c5e4e] md:mt-7 md:text-lg md:leading-8">{text}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:mt-10 md:gap-4">
          <Button type="button" onClick={() => goToPage(primaryTarget)} className="inline-flex min-h-12 w-full items-center justify-center border border-[#d4af37] bg-[#d4af37] px-7 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-black transition duration-500 hover:bg-[#d8c7a3] sm:w-auto md:tracking-[0.22em]">
            {primaryLabel} <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
          </Button>
          {secondaryLabel && secondaryTarget ? (
            <Button type="button" onClick={() => goToPage(secondaryTarget)} className="inline-flex min-h-12 w-full items-center justify-center border border-[#33270f] bg-transparent px-7 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4af37] transition duration-500 hover:border-[#d4af37] hover:bg-[#090503] hover:text-[#d8c7a3] sm:w-auto md:tracking-[0.22em]">
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
