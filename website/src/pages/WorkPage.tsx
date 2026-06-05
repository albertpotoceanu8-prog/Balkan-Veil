import { ArrowRight } from "lucide-react";
import { DossierPanel } from "@/components/DossierPanel";
import { PageShell } from "@/components/PageShell";
import { WorkProjectCard } from "@/components/WorkProjectCard";
import { Button } from "@/components/ui/button";
import type { SiteContent } from "@/data/siteContent";
import type { PageKey } from "@/types/navigation";

type WorkPageProps = {
  content: SiteContent["work"];
  goToPage: (target: PageKey) => void;
};

export function WorkPage({ content, goToPage }: WorkPageProps) {
  return (
    <PageShell eyebrow={content.eyebrow} title={content.title} text={content.text}>
      <p className="mb-10 max-w-3xl border-l border-amber-300/25 bg-black/25 py-3 pl-5 pr-4 text-sm leading-6 text-stone-500">{content.disclaimer}</p>

      <div className="space-y-8">
        {content.projects.map((project) => (
          <WorkProjectCard key={project.title} project={project} labels={content.labels} />
        ))}
      </div>

      <div className="operator-surface mt-28 border border-stone-800 bg-stone-950/35 p-6 md:p-10">
        <div className="absolute inset-0 operator-grid opacity-15" aria-hidden="true" />
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.conceptLabel}</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.conceptTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-stone-500">{content.conceptText}</p>
          </div>
          <div className="relative divide-y divide-stone-800 border-y border-stone-800">
            {content.concepts.map((item, index) => (
              <article key={item.title} className="grid gap-5 py-6 md:grid-cols-[4rem_0.75fr_1.25fr] md:items-start">
                <p className="font-mono text-xs text-amber-300/60">0{index + 1}</p>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-amber-300/70">{item.tag}</p>
                  <h3 className="mt-3 font-serif text-2xl leading-tight text-stone-100">{item.title}</h3>
                  <p className="mt-3 text-sm text-amber-100/75">{item.package}</p>
                </div>
                <div className="grid gap-3 text-sm leading-6 text-stone-500">
                  <p><span className="text-amber-200">{content.conceptLabels.problem}:</span> {item.problem}</p>
                  <p><span className="text-amber-200">{content.conceptLabels.direction}:</span> {item.direction}</p>
                </div>
              </article>
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
