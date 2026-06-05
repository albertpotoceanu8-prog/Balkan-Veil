import { motion } from "framer-motion";
import { cardMotion } from "@/components/motionConfig";
import type { VisualMockup } from "@/data/siteContent";

type VisualMockupCardProps = {
  item: VisualMockup;
  index: number;
};

export function VisualMockupCard({ item, index }: VisualMockupCardProps) {
  return (
    <motion.div {...cardMotion} className="relative overflow-hidden rounded-[2.25rem] border border-amber-300/15 bg-black/55 p-5 shadow-2xl transition duration-500 hover:-translate-y-1 hover:border-amber-300/35 hover:shadow-[0_0_65px_rgba(251,191,36,0.11)] md:backdrop-blur-xl">
      <div className="absolute -right-16 -top-16 hidden h-40 w-40 rounded-full bg-amber-300/10 blur-3xl md:block" />
      <div className="mb-5 flex items-center justify-between border-b border-stone-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-stone-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
        </div>
        <p className="font-mono text-xs text-stone-600">BV-0{index + 1}</p>
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-amber-300">{item.label}</p>
      <h3 className="mt-4 font-serif text-3xl text-stone-100">{item.title}</h3>
      <div className="mt-8 space-y-3">
        {item.lines.map((line) => (
          <div key={line} className="flex items-center justify-between rounded-2xl border border-stone-800 bg-stone-950/60 px-4 py-3">
            <p className="text-sm text-stone-400">{line}</p>
            <span className="h-1.5 w-10 rounded-full bg-amber-300/35" />
          </div>
        ))}
      </div>
      <div className="mt-8 h-28 rounded-2xl border border-stone-800 bg-[linear-gradient(135deg,rgba(251,191,36,0.12),transparent_45%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,28px_28px,28px_28px]" />
    </motion.div>
  );
}
