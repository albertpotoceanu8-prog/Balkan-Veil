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
    <section className="operator-surface relative z-10 overflow-hidden border border-[#202224] bg-[#030201] p-9 text-center shadow-[inset_0_1px_0_rgba(185,138,50,0.08)] md:p-16 3xl:p-20 4xl:p-24">
      <div className="absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(185,138,50,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:44px_44px]" aria-hidden="true" />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#7d6a45]/55 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl 3xl:max-w-5xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#b98a32] md:text-xs md:tracking-[0.35em]">{eyebrow}</p>
        <h2 className="mt-6 font-serif text-3xl leading-tight text-[#c8ad72] md:mt-7 md:text-7xl 3xl:text-8xl">{title}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#786f5e] md:mt-8 md:text-lg md:leading-8 3xl:max-w-3xl 3xl:text-xl 3xl:leading-9">{text}</p>
        <div className="mt-12 flex flex-col justify-center gap-6 sm:flex-row md:mt-14">
          <Button type="button" onClick={() => goToPage(primaryTarget)} className="inline-flex min-h-12 w-full items-center justify-center border border-[#b98a32] bg-[#b98a32] px-7 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-black transition duration-500 hover:bg-[#c8ad72] sm:w-auto md:tracking-[0.22em]">
            {primaryLabel} <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
          </Button>
          {secondaryLabel && secondaryTarget ? (
            <Button type="button" onClick={() => goToPage(secondaryTarget)} className="inline-flex min-h-12 w-full items-center justify-center border border-[#252729] bg-transparent px-7 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#b98a32] transition duration-500 hover:border-[#b98a32] hover:bg-[#090503] hover:text-[#c8ad72] sm:w-auto md:tracking-[0.22em]">
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
