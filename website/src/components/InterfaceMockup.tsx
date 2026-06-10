import { motion } from "framer-motion";
import { cardMotion } from "@/components/motionConfig";

type InterfaceMockupProps = {
  eyebrow: string;
  title: string;
  text: string;
  systemLabel: string;
  statusLine: string;
  moduleLabel: string;
  metrics: readonly string[];
  rows: readonly string[];
};

export function InterfaceMockup({ eyebrow, title, text, systemLabel, statusLine, moduleLabel, metrics, rows }: InterfaceMockupProps) {
  return (
    <section className="relative z-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[#d4af37] md:text-sm md:tracking-[0.35em]">{eyebrow}</p>
        <h2 className="mt-5 font-serif text-3xl leading-tight text-[#d8c7a3] md:mt-6 md:text-6xl">{title}</h2>
        <p className="mt-5 text-base leading-7 text-[#6c5e4e] md:mt-6 md:text-lg md:leading-8">{text}</p>
      </div>
      <motion.div {...cardMotion} className="veil-frame operator-surface relative overflow-hidden border border-[#33270f] bg-black/70 p-4 shadow-[0_0_80px_rgba(251,191,36,0.08)] md:p-6 md:backdrop-blur-xl">
        <div className="absolute inset-0 operator-grid opacity-35" aria-hidden="true" />
        <div className="relative border border-[#241d0c] bg-[#050302]/92">
          <div className="flex flex-col gap-3 border-b border-[#241d0c] px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-5">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-2 w-8 border border-[#b99832]/45 bg-[#d4af37]/10" />
              <span className="h-2 w-5 border border-emerald-300/30 bg-emerald-300/10" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#f0c85a] md:text-xs md:tracking-[0.24em]">{systemLabel}</span>
          </div>
          <div className="grid gap-0 md:grid-cols-[0.85fr_1.15fr]">
            <div className="border-b border-[#241d0c] p-4 md:border-b-0 md:border-r md:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6c5e4e] md:tracking-[0.28em]">{statusLine}</p>
              <div className="mt-6 space-y-4 md:mt-8">
                {metrics.map((metric, index) => (
                  <div key={metric} className="relative border-l border-[#b99832]/40 pl-4">
                    <span className="absolute -left-[5px] top-1.5 h-2 w-2 bg-emerald-300/60" aria-hidden="true" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4af37] md:tracking-[0.24em]">signal 0{index + 1}</p>
                    <p className="mt-2 font-serif text-xl text-[#d8c7a3] md:text-2xl">{metric}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 md:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4af37] md:tracking-[0.28em]">{moduleLabel}</p>
              <div className="mt-5 divide-y divide-[#241d0c]">
                {rows.map((row, index) => (
                  <div key={row} className="grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 py-4 md:grid-cols-[3rem_1fr_auto] md:gap-4">
                    <span className="font-mono text-xs text-[#d4af37]">0{index + 1}</span>
                    <span className="text-sm text-[#a68b67]">{row}</span>
                    <span className={index % 3 === 1 ? "h-2 w-2 border border-red-300/35" : "h-2 w-2 border border-[#b99832]/55"} aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
