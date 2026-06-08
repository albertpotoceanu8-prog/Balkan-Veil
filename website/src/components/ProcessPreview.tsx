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
          <p className="text-xs uppercase tracking-[0.28em] text-amber-300 md:text-sm md:tracking-[0.35em]">{eyebrow}</p>
          <h2 className="mt-4 max-w-4xl font-serif text-3xl leading-tight text-stone-100 md:mt-5 md:text-6xl">{title}</h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        {steps.map((step, index) => (
          <motion.div key={step} {...cardMotion} className="operator-surface group relative overflow-hidden border border-stone-800 bg-stone-950/55 p-5 transition duration-500 hover:-translate-y-1 hover:border-amber-300/35 hover:bg-black/65 md:p-6">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/45 to-transparent" aria-hidden="true" />
            <div className="absolute right-5 top-5 h-2 w-2 border border-amber-300/45" aria-hidden="true" />
            <p className="font-serif text-4xl text-amber-100/20 md:text-5xl">0{index + 1}</p>
            <p className="mt-5 font-serif text-xl text-stone-100 transition group-hover:text-amber-100 md:mt-8 md:text-2xl">{step}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
