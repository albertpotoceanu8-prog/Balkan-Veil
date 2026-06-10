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

  return (
    <motion.section
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -18, scale: 0.99 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
      className="relative z-10 mx-auto min-h-[calc(100vh-120px)] max-w-[1500px] px-2.5 py-8 text-[#c7b99a] sm:px-5 sm:py-12 md:min-h-[calc(100vh-160px)] md:px-8 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(143,120,53,0.10),transparent_28rem)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#8f7835]/50 to-transparent sm:inset-x-5 md:inset-x-8" aria-hidden="true" />
      <header className="operator-surface relative overflow-hidden border border-[#241f16] bg-[#030303]/78 px-4 py-6 shadow-[inset_0_1px_0_rgba(212,175,55,0.08)] sm:px-6 sm:py-8 md:px-9 md:py-12">
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(212,175,55,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:44px_44px] sm:[background-size:56px_56px]" aria-hidden="true" />
        <div className="relative max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#241f16] pb-4 font-mono text-[9px] uppercase tracking-[0.22em] text-[#7f6a39] sm:text-[10px] sm:tracking-[0.3em]">
            <p>{eyebrow}</p>
            <p className="hidden text-[#51472f] sm:block">BV / classified file</p>
          </div>
          <h1 className="mt-7 max-w-[12ch] font-serif text-[clamp(3rem,14vw,5.75rem)] leading-[0.9] text-[#d8c8a7] drop-shadow-[0_0_22px_rgba(212,175,55,0.10)] sm:max-w-5xl sm:text-6xl md:text-8xl lg:text-[8rem]">
            <DecodeText text={title} disabled />
          </h1>
          {text && <p className="mt-6 max-w-4xl font-mono text-[10px] leading-6 text-[#8f856f] sm:text-xs sm:leading-7 md:mt-8 md:text-sm md:leading-8">{text}</p>}
        </div>
      </header>
      {topContent}
      <section className="relative mt-5 md:mt-8">{children}</section>
      {bottomContent}
    </motion.section>
  );
}
