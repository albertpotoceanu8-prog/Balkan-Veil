import { motion } from "framer-motion";
import { cardMotion } from "@/components/motionConfig";

type SignalStripProps = {
  items: readonly string[];
};

export function SignalStrip({ items }: SignalStripProps) {
  return (
    <motion.div {...cardMotion} className="relative overflow-hidden rounded-[2rem] border border-amber-300/15 bg-black/45 p-3 md:rounded-[2.5rem] md:p-4 md:backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(251,191,36,0.12),transparent_35%)]" aria-hidden="true" />
      <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item, index) => (
          <div key={item} className="rounded-[1.5rem] border border-stone-800 bg-stone-950/55 px-5 py-5">
            <p className="font-mono text-xs text-amber-300/70">0{index + 1}</p>
            <p className="mt-3 font-serif text-xl leading-tight text-stone-100 md:text-2xl">{item}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
