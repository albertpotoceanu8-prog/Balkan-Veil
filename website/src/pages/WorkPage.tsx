import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ArchiveStamp } from "@/components/ArchiveStamp";
import { DossierPanel } from "@/components/DossierPanel";
import { PageShell } from "@/components/PageShell";
import { WorkProjectCard } from "@/components/WorkProjectCard";
import { Button } from "@/components/ui/button";
import { cardMotion } from "@/components/motionConfig";
import { VeilFrame } from "@/components/VeilFrame";
import type { SiteContent } from "@/data/siteContent";
import type { PageKey } from "@/types/navigation";

type WorkPageProps = {
  content: SiteContent["work"];
  goToPage: (target: PageKey) => void;
};

export function WorkPage({ content, goToPage }: WorkPageProps) {
  return (
    <PageShell eyebrow={content.eyebrow} title={content.title} text={content.text}>
      <div className="space-y-10">
        {content.projects.map((project) => (
          <WorkProjectCard key={project.title} project={project} labels={content.labels} />
        ))}
      </div>

      <div className="mt-28 rounded-[2.5rem] border border-stone-800 bg-stone-950/45 p-7 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.conceptLabel}</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.conceptTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-stone-500">{content.conceptText}</p>
          </div>
          <div className="grid gap-5">
            {content.concepts.map((item, index) => (
              <motion.div key={item.title} {...cardMotion}>
                <VeilFrame label={item.tag} index={`BV-WORK-${String(index + 1).padStart(2, "0")}`} className="archive-noise">
                  <div className="grid gap-6 p-5 md:grid-cols-[0.72fr_1.28fr] md:p-7">
                    <div>
                      <ArchiveStamp code={`0${index + 1}`} label={item.tag} status={item.package} />
                      <h3 className="mt-8 font-serif text-3xl leading-tight text-stone-100">{item.title}</h3>
                    </div>
                    <div className="grid gap-3">
                      {[
                        [content.conceptLabels.problem, item.problem],
                        [content.conceptLabels.direction, item.direction],
                        [content.conceptLabels.system, item.system],
                        [content.conceptLabels.package, item.package],
                      ].map(([label, value]) => (
                        <div key={label} className="border-l border-amber-300/20 bg-black/30 px-5 py-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-300/70">{label}</p>
                          <p className="mt-2 text-base leading-7 text-stone-400">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </VeilFrame>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <DossierPanel eyebrow={content.nextLabel} title={content.nextTitle} text={content.nextText} className="mt-28 border-amber-300/20 bg-gradient-to-br from-stone-950 to-black text-center md:p-16">
        <Button type="button" onClick={() => goToPage("access")} className="mt-10 inline-flex min-h-14 items-center justify-center rounded-full bg-amber-300 px-9 py-4 text-base font-semibold uppercase tracking-[0.24em] text-black transition duration-500 hover:bg-amber-200 hover:shadow-[0_0_45px_rgba(251,191,36,0.28)]">
          {content.cta} <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
        </Button>
      </DossierPanel>
    </PageShell>
  );
}
