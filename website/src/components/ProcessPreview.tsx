import { motion } from "framer-motion";
import { cardMotion } from "@/components/motionConfig";

type ProcessPreviewProps = {
  eyebrow: string;
  title: string;
  steps: readonly string[];
};

export function ProcessPreview({ eyebrow, title, steps }: ProcessPreviewProps) {
  return (
    <section className="relative z-10">
      <div className="mb-6 flex flex-col justify-between gap-5 md:mb-8 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#a7a39a] md:text-sm md:tracking-[0.35em]">{eyebrow}</p>
          <h2 className="mt-4 max-w-4xl font-serif text-3xl leading-tight text-[#d1cec5] md:mt-5 md:text-6xl">{title}</h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        {steps.map((step, index) => (
          <motion.div key={step} {...cardMotion} className="operator-surface group relative overflow-hidden border border-[#202224] bg-[#020100]/95 transition duration-500 hover:border-[#7b7a73]/60 hover:bg-[#050302]">
            <div className="grid min-h-full grid-rows-[auto_1fr_auto]">
              <div className="flex items-center justify-between border-b border-[#202224] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em]">
                <span className="text-[#a7a39a]">0{index + 1}</span>
                <span className="h-1.5 w-8 bg-[#d6d3ca]/55" aria-hidden="true" />
              </div>
              <div className="px-5 py-7 md:px-6">
                <p className="font-serif text-xl leading-tight text-[#d1cec5] transition group-hover:text-[#d6c3a0] md:text-2xl">{step}</p>
              </div>
              <div className="grid grid-cols-3 border-t border-[#202224]" aria-hidden="true">
                <span className="h-5 border-r border-[#202224] bg-[#a7a39a]/[0.035]" />
                <span className="h-5 border-r border-[#202224] bg-black/30" />
                <span className="h-5 bg-[#d6d3ca]/[0.08]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
