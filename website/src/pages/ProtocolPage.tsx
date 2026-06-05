import { motion } from "framer-motion";
import { DecodeText } from "@/components/DecodeText";
import { PageShell } from "@/components/PageShell";
import { SectionCTA } from "@/components/SectionCTA";
import { cardMotion, panelClass } from "@/components/motionConfig";
import type { SiteContent } from "@/data/siteContent";
import type { PageKey } from "@/types/navigation";

type ProtocolPageProps = {
  content: SiteContent["protocol"];
  goToPage: (target: PageKey) => void;
};

export function ProtocolPage({ content, goToPage }: ProtocolPageProps) {
  return (
    <PageShell eyebrow={content.eyebrow} title={content.title} text={content.text}>
      <div className="rounded-[2.5rem] border border-amber-300/20 bg-gradient-to-br from-stone-950 to-black p-10 md:p-16 lg:p-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.protocol.map((item) => (
            <motion.div key={item} {...cardMotion} className="rounded-3xl border border-stone-800 bg-black/50 p-8 text-center transition duration-500 hover:-translate-y-1 hover:border-amber-300/30 hover:bg-black/70 hover:shadow-[0_0_35px_rgba(251,191,36,0.08)]">
              <p className="font-serif text-3xl text-amber-100">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.positioningLabel}</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-stone-100 md:text-6xl">
            <DecodeText text={content.decodeTitle} />
          </h2>
        </div>
        <div className="space-y-6 text-xl leading-9 text-stone-400">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.checklistLabel}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.checklistTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {content.checklist.map((item, index) => (
            <motion.div key={item.title} {...cardMotion} className={panelClass + " p-7"}>
              <p className="font-serif text-5xl text-amber-100/20">0{index + 1}</p>
              <h3 className="mt-8 font-serif text-3xl text-amber-100">{item.title}</h3>
              <p className="mt-5 text-base leading-7 text-stone-500">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <SectionCTA eyebrow={content.finalCta.eyebrow} title={content.finalCta.title} text={content.finalCta.text} primaryLabel={content.finalCta.primary} secondaryLabel={content.finalCta.secondary} primaryTarget="access" secondaryTarget="services" goToPage={goToPage} />
      </div>
    </PageShell>
  );
}
