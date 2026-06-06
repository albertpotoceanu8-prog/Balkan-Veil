import { motion } from "framer-motion";
import { cardMotion } from "@/components/motionConfig";
import type { VisualMockup } from "@/data/siteContent";

type VisualMockupCardProps = {
  item: VisualMockup;
  index: number;
};

export function VisualMockupCard({ item, index }: VisualMockupCardProps) {
  return (
    <motion.div {...cardMotion} className="operator-surface relative overflow-hidden border border-amber-300/15 bg-black/55 p-5 shadow-2xl transition duration-500 hover:-translate-y-1 hover:border-amber-300/35 hover:shadow-[0_0_65px_rgba(251,191,36,0.11)] md:backdrop-blur-xl">
      <div className="absolute inset-0 operator-grid opacity-25" aria-hidden="true" />
      <div className="mb-5 flex items-center justify-between border-b border-stone-800 pb-4">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2 w-8 border border-amber-300/30 bg-amber-300/10" />
          <span className="h-2 w-4 border border-emerald-300/30 bg-emerald-300/10" />
        </div>
        <p className="font-mono text-xs text-stone-600">BV-0{index + 1}</p>
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-amber-300">{item.label}</p>
      <h3 className="mt-4 font-serif text-3xl text-stone-100">{item.title}</h3>
      <div className="mt-8 space-y-3">
        {item.lines.map((line) => (
          <div key={line} className="flex items-center justify-between border border-stone-800 bg-stone-950/60 px-4 py-3">
            <p className="text-sm text-stone-400">{line}</p>
            <span className="h-1.5 w-10 bg-amber-300/35" aria-hidden="true" />
          </div>
        ))}
      </div>
      <div className="mt-8 grid h-28 grid-cols-4 border border-stone-800 bg-black/35" aria-hidden="true">
        <div className="border-r border-stone-800 bg-amber-300/[0.035]" />
        <div className="border-r border-stone-800 bg-amber-300/[0.04]" />
        <div className="border-r border-stone-800 bg-stone-300/[0.025]" />
        <div className="operator-scan" />
      </div>
    </motion.div>
  );
}
