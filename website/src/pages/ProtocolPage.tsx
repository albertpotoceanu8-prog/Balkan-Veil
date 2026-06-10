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
      <div className="operator-surface border border-[#252729] bg-gradient-to-br from-[#050302] to-black p-10 md:p-16 lg:p-20">
        <div className="absolute inset-0 operator-grid opacity-20" aria-hidden="true" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.protocol.map((item) => (
            <motion.div key={item} {...cardMotion} className="relative border border-[#202224] bg-black/50 p-8 text-center transition duration-500 hover:-translate-y-1 hover:border-[#7d6a45]/45 hover:bg-black/70">
              <span className="absolute right-5 top-5 h-2 w-2 border border-[#7d6a45]/55" aria-hidden="true" />
              <p className="font-serif text-3xl text-[#c8ad72]">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#b98a32]">{content.positioningLabel}</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-[#c8ad72] md:text-6xl">
            <DecodeText text={content.decodeTitle} disabled />
          </h2>
        </div>
        <div className="space-y-6 text-xl leading-9 text-[#787873]">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b98a32]">{content.checklistLabel}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-[#c8ad72] md:text-6xl">{content.checklistTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {content.checklist.map((item, index) => (
            <motion.div key={item.title} {...cardMotion} className={panelClass + " operator-surface rounded-none p-7"}>
              <p className="font-serif text-5xl text-[#b98a32]/20">0{index + 1}</p>
              <h3 className="mt-8 font-serif text-3xl text-[#c8ad72]">{item.title}</h3>
              <p className="mt-5 text-base leading-7 text-[#786f5e]">{item.text}</p>
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
