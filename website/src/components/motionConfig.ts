export const cardMotion = {
  initial: { opacity: 0.45, y: 12, scale: 0.96, filter: "blur(2px)" },
  whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  viewport: { once: false, amount: 0.6, margin: "0px 0px -8% 0px" },
  transition: { duration: 0.3, ease: "easeOut" },
} as const;

export const cardClass =
  "operator-surface relative overflow-hidden border border-[#2a190b] bg-[#020100]/95 text-[#c0aa86] shadow-[inset_0_1px_0_rgba(197,130,63,0.07)] transition duration-500 hover:border-[#9a6936]/60 hover:bg-[#050302]";

export const panelClass =
  "operator-surface relative overflow-hidden border border-[#2a190b] bg-[#020100]/95 shadow-[inset_0_1px_0_rgba(197,130,63,0.06)] transition duration-500 hover:border-[#9a6936]/60 hover:bg-[#050302]";
