import React from "react";
import { motion } from "framer-motion";
import { DecodeText } from "@/components/DecodeText";

type PageShellProps = {
  eyebrow: string;
  title: string;
  text?: string;
  children: React.ReactNode;
};

export function PageShell({ eyebrow, title, text, children }: PageShellProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.99 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-10 mx-auto min-h-[calc(100vh-120px)] max-w-[1500px] px-5 py-14 md:min-h-[calc(100vh-160px)] md:px-8 md:py-28"
    >
      <header className="max-w-5xl">
        <p className="text-sm uppercase tracking-[0.38em] text-amber-300">{eyebrow}</p>
        <h1 className="mt-6 font-serif text-5xl leading-[0.95] text-stone-100 sm:text-6xl md:text-8xl lg:text-[8rem]">
          <DecodeText text={title} />
        </h1>
        {text && <p className="mt-7 max-w-4xl text-lg leading-8 text-stone-400 md:mt-8 md:text-2xl md:leading-10">{text}</p>}
      </header>
      <section className="mt-12 md:mt-16">{children}</section>
    </motion.section>
  );
}
