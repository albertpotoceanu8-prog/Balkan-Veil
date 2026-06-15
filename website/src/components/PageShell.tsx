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
      className="relative z-10 mx-auto max-w-[1500px] px-2.5 pb-20 pt-2.5 text-[#c8ad72] sm:px-5 sm:pb-28 md:px-8 md:pb-44 3xl:max-w-[1800px] 3xl:px-12 3xl:pb-52 4xl:max-w-[2560px] 4xl:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(185,138,50,0.08),transparent_28rem)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#7d6a45]/50 to-transparent sm:inset-x-5 md:inset-x-8" aria-hidden="true" />

      <header className="relative overflow-hidden border border-[#202224] bg-[#030201] shadow-[inset_0_1px_0_rgba(185,138,50,0.08)]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(185,138,50,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:44px_44px] sm:[background-size:56px_56px]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 operator-scan opacity-[0.12]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b98a32]/55 to-transparent" aria-hidden="true" />

        <div className="relative flex min-h-12 items-center justify-between gap-5 border-b border-[#202224] px-4 py-3 font-mono text-[9px] uppercase tracking-[0.24em] text-[#9a8255] sm:min-h-14 sm:px-6 sm:text-[10px] md:px-8">
          <span className="min-w-0 truncate text-[#b98a32]">{eyebrow}</span>
          <span className="hidden h-px w-24 bg-gradient-to-r from-transparent via-[#7d6a45]/55 to-transparent sm:block" aria-hidden="true" />
          <span className="text-right text-[#6f6654]">public dossier</span>
        </div>

        <div className="relative grid gap-0 lg:grid-cols-[minmax(0,1fr)_22rem] 3xl:grid-cols-[minmax(0,1fr)_28rem]">
          <div className="min-w-0 p-8 sm:p-10 md:p-14 lg:p-16 3xl:p-20 4xl:p-24">
            <div className="max-w-5xl 3xl:max-w-6xl">
              <h1 className="max-w-[820px] font-serif text-[clamp(2.65rem,6.2vw,5.35rem)] leading-[0.96] text-[#f0dfb0] 3xl:max-w-[1020px] 3xl:text-[clamp(5.35rem,4.8vw,7.4rem)]">
                <DecodeText text={title} disabled />
              </h1>
              {text && <p className="mt-6 max-w-3xl font-mono text-[10px] leading-6 text-[#8b816b] sm:text-xs sm:leading-7 md:mt-7 3xl:max-w-4xl 3xl:text-sm 3xl:leading-8">{text}</p>}
            </div>
          </div>

          <aside className="border-t border-[#202224] bg-black/22 p-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6f6654] lg:border-l lg:border-t-0 sm:p-10 md:p-14 3xl:p-16 3xl:text-xs">
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 lg:block lg:space-y-6">
              <div>
                <p className="text-[#b98a32]">&gt; file</p>
                <p className="mt-2 break-all">{fileCode || "BV"}.VEL</p>
              </div>
              <div>
                <p className="text-[#b98a32]">&gt; mode</p>
                <p className="mt-2">public</p>
              </div>
              <div>
                <p className="text-[#b98a32]">&gt; status</p>
                <p className="mt-2 text-emerald-300/70">online</p>
              </div>
              <div>
                <p className="text-[#b98a32]">&gt; signal</p>
                <div className="mt-3 h-px bg-gradient-to-r from-[#b98a32]/70 via-[#d2aa55]/20 to-transparent" />
              </div>
            </div>
          </aside>
        </div>
      </header>

      {topContent}
      <section className="relative mt-16 md:mt-24 3xl:mt-32">{children}</section>
      {bottomContent}
    </motion.section>
  );
}
