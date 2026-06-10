import { motion } from "framer-motion";
import { cardMotion } from "@/components/motionConfig";

type SignalStripProps = {
  items: readonly string[];
};

export function SignalStrip({ items }: SignalStripProps) {
  return (
    <motion.div {...cardMotion} className="operator-surface relative overflow-hidden border border-[#3a301e] bg-black/50 p-3 md:p-4 md:backdrop-blur-xl">
      <div className="absolute inset-0 operator-grid opacity-25" aria-hidden="true" />
      <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item, index) => (
          <div key={item} className="relative border border-[#241f16] bg-[#030303]/88 px-4 py-4 transition duration-500 hover:border-[#8f7835]/45 md:px-5 md:py-5">
            <span className="absolute right-4 top-4 h-2 w-2 bg-[#b9924b]/40" aria-hidden="true" />
            <p className="font-mono text-xs text-[#7f6a39]">0{index + 1}</p>
            <p className="mt-3 font-serif text-lg leading-tight text-[#d8c8a7] md:text-2xl">{item}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
