import { motion } from "framer-motion";
import { cardMotion } from "@/components/motionConfig";

type InterfaceMockupProps = {
  eyebrow: string;
  title: string;
  text: string;
  metrics: readonly string[];
  rows: readonly string[];
};

export function InterfaceMockup({ eyebrow, title, text, metrics, rows }: InterfaceMockupProps) {
  return (
    <section className="relative z-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{eyebrow}</p>
        <h2 className="mt-6 font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{title}</h2>
        <p className="mt-6 text-lg leading-8 text-stone-500">{text}</p>
      </div>
      <motion.div {...cardMotion} className="relative overflow-hidden rounded-[2.5rem] border border-amber-300/20 bg-black/70 p-5 shadow-[0_0_80px_rgba(251,191,36,0.08)] md:p-8 md:backdrop-blur-xl">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-50" aria-hidden="true" />
        <div className="relative rounded-[1.75rem] border border-stone-800 bg-stone-950/80">
          <div className="flex items-center gap-2 border-b border-stone-800 px-5 py-4">
            <span className="h-2.5 w-2.5 rounded-full bg-stone-700" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-700" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" aria-hidden="true" />
            <span className="ml-auto font-mono text-xs uppercase tracking-[0.24em] text-stone-600">veil interface</span>
          </div>
          <div className="grid gap-4 p-5 md:grid-cols-3 md:p-6">
            {metrics.map((metric) => (
              <div key={metric} className="rounded-2xl border border-stone-800 bg-black/50 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300/70">status</p>
                <p className="mt-3 font-serif text-2xl text-stone-100">{metric}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3 border-t border-stone-800 p-5 md:p-6">
            {rows.map((row, index) => (
              <div key={row} className="flex items-center gap-4 rounded-2xl border border-stone-900 bg-black/35 px-4 py-3">
                <span className="font-mono text-xs text-amber-300/70">0{index + 1}</span>
                <span className="h-px flex-1 bg-stone-800" aria-hidden="true" />
                <span className="text-right text-sm text-stone-400">{row}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
