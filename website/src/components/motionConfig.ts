export const cardMotion = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.22, margin: "-8% 0px -8% 0px" },
  transition: { duration: 0.58, ease: "easeOut" },
} as const;

export const cardClass =
  "rounded-[2rem] border border-stone-800 bg-black/50 text-stone-100 transition duration-500 hover:-translate-y-1 hover:border-amber-300/35 hover:bg-stone-950/80 hover:shadow-[0_0_45px_rgba(251,191,36,0.09)]";

export const panelClass =
  "rounded-[2rem] border border-stone-800 bg-stone-950/50 transition duration-500 hover:-translate-y-1 hover:border-amber-300/30 hover:bg-stone-950/80 hover:shadow-[0_0_35px_rgba(251,191,36,0.08)]";
