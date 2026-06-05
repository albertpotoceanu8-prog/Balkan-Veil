import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { WorkProjectCard } from "@/components/WorkProjectCard";
import { Button } from "@/components/ui/button";
import { cardMotion, panelClass } from "@/components/motionConfig";
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
          <div className="grid gap-5 md:grid-cols-2">
            {content.concepts.map((item, index) => (
              <motion.div key={item.title} {...cardMotion} className={panelClass + " p-7"}>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-amber-300">{item.tag}</p>
                  <p className="font-serif text-4xl text-amber-100/20">0{index + 1}</p>
                </div>
                <h3 className="mt-6 font-serif text-3xl text-stone-100">{item.title}</h3>
                <div className="mt-6 space-y-4 text-base leading-7 text-stone-500">
                  <p><span className="text-amber-200">{content.conceptLabels.problem}:</span> {item.problem}</p>
                  <p><span className="text-amber-200">{content.conceptLabels.direction}:</span> {item.direction}</p>
                  <p><span className="text-amber-200">{content.conceptLabels.system}:</span> {item.system}</p>
                  <p><span className="text-amber-200">{content.conceptLabels.package}:</span> {item.package}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-28 rounded-[2.5rem] border border-amber-300/20 bg-gradient-to-br from-stone-950 to-black p-10 text-center md:p-16">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.nextLabel}</p>
        <h2 className="mx-auto mt-6 max-w-4xl font-serif text-5xl leading-tight text-stone-100 md:text-7xl">{content.nextTitle}</h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-stone-500">{content.nextText}</p>
        <Button type="button" onClick={() => goToPage("access")} className="mt-10 inline-flex min-h-14 items-center justify-center rounded-full bg-amber-300 px-9 py-4 text-base font-semibold uppercase tracking-[0.24em] text-black transition duration-500 hover:bg-amber-200 hover:shadow-[0_0_45px_rgba(251,191,36,0.28)]">
          {content.cta} <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
        </Button>
      </div>
    </PageShell>
  );
}
