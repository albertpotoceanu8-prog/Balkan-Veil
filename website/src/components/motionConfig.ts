export const cardMotion = {
  initial: { opacity: 0.45, y: 12, scale: 0.96, filter: "blur(2px)" },
  whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  viewport: { once: false, amount: 0.6, margin: "0px 0px -8% 0px" },
  transition: { duration: 0.3, ease: "easeOut" },
} as const;

export const cardClass =
  "border border-[#241f16] bg-[#030303]/88 text-[#c7b99a] shadow-[inset_0_1px_0_rgba(212,175,55,0.06)] transition duration-500 hover:border-[#8f7835]/55 hover:bg-[#090704]";

export const panelClass =
  "border border-[#241f16] bg-[#050505]/88 shadow-[inset_0_1px_0_rgba(212,175,55,0.05)] transition duration-500 hover:border-[#8f7835]/55 hover:bg-[#090704]";
