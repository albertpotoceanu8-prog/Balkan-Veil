import { motion } from "framer-motion";
import { cardMotion } from "@/components/motionConfig";
import type { VisualMockup } from "@/data/siteContent";

type VisualMockupCardProps = {
  item: VisualMockup;
  index: number;
};

export function VisualMockupCard({ item, index }: VisualMockupCardProps) {
  return (
    <motion.div {...cardMotion} className="operator-surface relative overflow-hidden border border-[#241f16] bg-[#030303]/88 p-5 shadow-[inset_0_1px_0_rgba(212,175,55,0.06)] transition duration-500 hover:border-[#8f7835]/55 hover:bg-[#090704] md:backdrop-blur-xl">
      <div className="absolute inset-0 operator-grid opacity-16" aria-hidden="true" />
      <div className="mb-5 flex items-center justify-between border-b border-[#241f16] pb-4">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2 w-8 border border-[#8f7835]/35 bg-[#b9924b]/10" />
          <span className="h-2 w-4 border border-emerald-300/30 bg-emerald-300/10" />
        </div>
        <p className="font-mono text-xs text-[#51472f]">BV-0{index + 1}</p>
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#7f6a39]">{item.label}</p>
      <h3 className="mt-4 font-serif text-3xl text-[#d8c8a7]">{item.title}</h3>
      <div className="mt-8 space-y-3">
        {item.lines.map((line) => (
          <div key={line} className="flex items-center justify-between border border-[#241f16] bg-black/35 px-4 py-3">
            <p className="text-sm text-[#8a806c]">{line}</p>
            <span className="h-1.5 w-10 bg-[#8f7835]/45" aria-hidden="true" />
          </div>
        ))}
      </div>
      <div className="mt-8 grid h-28 grid-cols-4 border border-[#241f16] bg-black/35" aria-hidden="true">
        <div className="border-r border-[#241f16] bg-[#b9924b]/[0.035]" />
        <div className="border-r border-[#241f16] bg-[#b9924b]/[0.04]" />
        <div className="border-r border-[#241f16] bg-stone-300/[0.025]" />
        <div className="operator-scan" />
      </div>
    </motion.div>
  );
}
