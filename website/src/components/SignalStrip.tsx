import { motion } from "framer-motion";
import { cardMotion } from "@/components/motionConfig";

type SignalStripProps = {
  items: readonly string[];
};

export function SignalStrip({ items }: SignalStripProps) {
  return (
    <motion.div {...cardMotion} className="operator-surface relative overflow-hidden border border-[#252729] bg-black/50 p-3 md:p-4 md:backdrop-blur-xl">
      <div className="absolute inset-0 operator-grid opacity-25" aria-hidden="true" />
      <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item, index) => (
          <div key={item} className="relative border border-[#202224] bg-[#050302]/88 px-4 py-4 transition duration-500 hover:border-[#7d6a45]/45 md:px-5 md:py-5">
            <span className="absolute right-4 top-4 h-2 w-2 bg-[#b98a32]/40" aria-hidden="true" />
            <p className="font-mono text-xs text-[#b98a32]">0{index + 1}</p>
            <p className="mt-3 font-serif text-lg leading-tight text-[#c8ad72] md:text-2xl">{item}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
