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
    <section className="operator-surface relative z-10 overflow-hidden border border-amber-300/20 bg-gradient-to-br from-stone-950 via-black to-stone-950 p-7 text-center shadow-[0_0_90px_rgba(251,191,36,0.08)] md:p-14">
      <div className="absolute inset-0 operator-grid opacity-25" aria-hidden="true" />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/55 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-300">{eyebrow}</p>
        <h2 className="mt-6 font-serif text-4xl leading-tight text-stone-100 md:text-7xl">{title}</h2>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-stone-500">{text}</p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button type="button" onClick={() => goToPage(primaryTarget)} className="inline-flex min-h-14 items-center justify-center rounded-full bg-amber-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition duration-500 hover:bg-amber-200 hover:shadow-[0_0_45px_rgba(251,191,36,0.28)] md:text-base">
            {primaryLabel} <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
          </Button>
          {secondaryLabel && secondaryTarget ? (
            <Button type="button" onClick={() => goToPage(secondaryTarget)} className="inline-flex min-h-14 items-center justify-center rounded-full border border-stone-700 bg-transparent px-8 py-4 text-sm uppercase tracking-[0.2em] text-stone-200 transition duration-500 hover:border-amber-300/35 hover:bg-stone-900 hover:text-amber-200 md:text-base">
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
