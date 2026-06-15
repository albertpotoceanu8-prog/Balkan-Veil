import { motion } from "framer-motion";
import { cardMotion } from "@/components/motionConfig";
import type { VisualMockup } from "@/data/siteContent";

type VisualMockupCardProps = {
  item: VisualMockup;
  index: number;
};

export function VisualMockupCard({ item, index }: VisualMockupCardProps) {
  return (
    <motion.div {...cardMotion} className="operator-surface relative overflow-hidden border border-[#202224] bg-[#030201] shadow-[inset_0_1px_0_rgba(185,138,50,0.07)] transition duration-500 hover:border-[#7d6a45]/60 hover:bg-[#050302] md:backdrop-blur-xl">
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(185,138,50,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:44px_44px]" aria-hidden="true" />
      <div className="relative grid min-h-full md:grid-cols-[3.25rem_1fr]">
        <div className="hidden border-r border-[#202224] md:block">
          <div className="flex h-full flex-col items-center justify-between px-3 py-4">
            <p className="font-mono text-[10px] text-[#b98a32]">0{index + 1}</p>
            <div className="h-20 w-px bg-gradient-to-b from-transparent via-[#d2aa55]/70 to-transparent" aria-hidden="true" />
            <p className="-rotate-90 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.24em] text-[#6f6654]">mockup</p>
          </div>
        </div>
        <div className="p-7 md:p-9">
          <div className="mb-8 flex items-center justify-between border-b border-[#202224] pb-5">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-2 w-8 border border-[#d2aa55]/50 bg-[#d2aa55]/12" />
              <span className="h-2 w-4 border border-emerald-300/30 bg-emerald-300/10" />
            </div>
            <p className="font-mono text-xs text-[#6f6654]">BV-0{index + 1}</p>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#b98a32]">{item.label}</p>
          <h3 className="mt-4 font-serif text-3xl text-[#c8ad72]">{item.title}</h3>
          <div className="mt-10 grid gap-px border border-[#202224] bg-[#202224]">
            {item.lines.map((line) => (
              <div key={line} className="grid grid-cols-[1fr_auto] items-center bg-[#020100] px-5 py-4">
                <p className="text-sm text-[#787873]">{line}</p>
                <span className="h-1.5 w-10 bg-[#d2aa55]/55" aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="mt-11 grid h-32 grid-cols-[1.2fr_0.8fr_1fr_0.5fr] border border-[#202224] bg-black/35" aria-hidden="true">
            <div className="border-r border-[#202224] bg-[#b98a32]/[0.035]" />
            <div className="border-r border-[#202224] bg-[#b98a32]/[0.06]" />
            <div className="border-r border-[#202224] bg-neutral-300/[0.025]" />
            <div className="operator-scan" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
