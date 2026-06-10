import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DecodeText } from "@/components/DecodeText";

type PageShellProps = {
  eyebrow: string;
  title: string;
  text?: string;
  children: React.ReactNode;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
};

export function PageShell({ eyebrow, title, text, children, topContent, bottomContent }: PageShellProps) {
  const shouldReduceMotion = useReducedMotion();
  const fileCode = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word.replace(/[^\p{L}\p{N}]/gu, "").slice(0, 8).toUpperCase())
    .filter(Boolean)
    .join("_");

  return (
    <motion.section
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -14 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease: "easeOut" }}
      className="relative z-10 mx-auto max-w-[1500px] px-3 py-8 text-[#d1cec5] sm:px-5 sm:py-12 md:px-8 md:py-16"
    >
      <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#a7a39a]/45 to-transparent sm:inset-x-5 md:inset-x-8" aria-hidden="true" />

      <header className="relative overflow-hidden border border-[#202224] bg-[#050302]/88 shadow-[inset_0_1px_0_rgba(155,155,148,0.08)]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(155,155,148,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:40px_40px]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a7a39a]/55 to-transparent" aria-hidden="true" />

        <div className="relative grid gap-0 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="min-w-0 p-5 sm:p-7 md:p-9">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[#202224] pb-4 font-mono text-[9px] uppercase tracking-[0.24em] text-[#a7a39a] sm:text-[10px] sm:tracking-[0.3em]">
              <p>{eyebrow}</p>
              <span className="hidden h-px w-12 bg-[#a7a39a]/40 sm:block" aria-hidden="true" />
              <p className="text-[#696b68]">public dossier</p>
            </div>

            <div className="max-w-5xl pt-8 md:pt-10">
              <h1 className="max-w-[820px] font-serif text-[clamp(2.65rem,6.2vw,5.35rem)] leading-[0.96] text-[#f0dfb0] drop-shadow-[0_0_20px_rgba(155,155,148,0.08)]">
                <DecodeText text={title} disabled />
              </h1>
              {text && <p className="mt-6 max-w-3xl font-mono text-[10px] leading-6 text-[#8b816b] sm:text-xs sm:leading-7 md:mt-7">{text}</p>}
            </div>
          </div>

          <aside className="border-t border-[#202224] bg-black/22 p-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#696b68] lg:border-l lg:border-t-0 sm:p-7">
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 lg:block lg:space-y-6">
              <div>
                <p className="text-[#a7a39a]">&gt; file</p>
                <p className="mt-2 break-all">{fileCode || "BV"}.VEL</p>
              </div>
              <div>
                <p className="text-[#a7a39a]">&gt; mode</p>
                <p className="mt-2">public</p>
              </div>
              <div>
                <p className="text-[#a7a39a]">&gt; status</p>
                <p className="mt-2 text-emerald-300/70">online</p>
              </div>
              <div>
                <p className="text-[#a7a39a]">&gt; signal</p>
                <div className="mt-3 h-px bg-gradient-to-r from-[#a7a39a]/70 via-[#d6d3ca]/20 to-transparent" />
              </div>
            </div>
          </aside>
        </div>
      </header>

      {topContent}
      <section className="relative mt-6 md:mt-10">{children}</section>
      {bottomContent}
    </motion.section>
  );
}
