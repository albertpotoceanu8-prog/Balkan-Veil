import { motion } from "framer-motion";
import { DecodeText } from "@/components/DecodeText";
import { PageShell } from "@/components/PageShell";
import { cardMotion } from "@/components/motionConfig";
import type { SiteContent } from "@/data/siteContent";

type ProtocolPageProps = {
  content: SiteContent["protocol"];
};

export function ProtocolPage({ content }: ProtocolPageProps) {
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
    </PageShell>
  );
}
