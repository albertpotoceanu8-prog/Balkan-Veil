import { motion } from "framer-motion";
import { cardMotion } from "@/components/motionConfig";
import type { VisualMockup } from "@/data/siteContent";

type VisualMockupCardProps = {
  item: VisualMockup;
  index: number;
};

export function VisualMockupCard({ item, index }: VisualMockupCardProps) {
  return (
    <motion.div {...cardMotion} className="operator-surface relative overflow-hidden border border-[#241d0c] bg-[#020100]/95 shadow-[inset_0_1px_0_rgba(197,130,63,0.07)] transition duration-500 hover:border-[#b99832]/60 hover:bg-[#050302] md:backdrop-blur-xl">
      <div className="absolute inset-0 operator-grid opacity-16" aria-hidden="true" />
      <div className="relative grid min-h-full md:grid-cols-[3.25rem_1fr]">
        <div className="hidden border-r border-[#241d0c] md:block">
          <div className="flex h-full flex-col items-center justify-between px-3 py-4">
            <p className="font-mono text-[10px] text-[#d4af37]">0{index + 1}</p>
            <div className="h-20 w-px bg-gradient-to-b from-transparent via-[#f0c85a]/70 to-transparent" aria-hidden="true" />
            <p className="-rotate-90 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.24em] text-[#75683d]">mockup</p>
          </div>
        </div>
        <div className="p-5">
          <div className="mb-5 flex items-center justify-between border-b border-[#241d0c] pb-4">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-2 w-8 border border-[#f0c85a]/50 bg-[#f0c85a]/12" />
              <span className="h-2 w-4 border border-emerald-300/30 bg-emerald-300/10" />
            </div>
            <p className="font-mono text-xs text-[#75683d]">BV-0{index + 1}</p>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#d4af37]">{item.label}</p>
          <h3 className="mt-4 font-serif text-3xl text-[#d8c7a3]">{item.title}</h3>
          <div className="mt-8 grid gap-px border border-[#241d0c] bg-[#241d0c]">
            {item.lines.map((line) => (
              <div key={line} className="grid grid-cols-[1fr_auto] items-center bg-[#020100] px-4 py-3">
                <p className="text-sm text-[#756650]">{line}</p>
                <span className="h-1.5 w-10 bg-[#f0c85a]/55" aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="mt-8 grid h-28 grid-cols-[1.2fr_0.8fr_1fr_0.5fr] border border-[#241d0c] bg-black/35" aria-hidden="true">
            <div className="border-r border-[#241d0c] bg-[#d4af37]/[0.035]" />
            <div className="border-r border-[#241d0c] bg-[#d4af37]/[0.06]" />
            <div className="border-r border-[#241d0c] bg-stone-300/[0.025]" />
            <div className="operator-scan" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
