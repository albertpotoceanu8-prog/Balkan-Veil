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
      <p className="mb-10 max-w-3xl border-l border-[#7b7a73]/40 bg-black/25 py-3 pl-5 pr-4 text-sm leading-6 text-[#74726b]">{content.disclaimer}</p>

      <div className="space-y-8">
        {content.projects.map((project) => (
          <WorkProjectCard key={project.title} project={project} labels={content.labels} />
        ))}
      </div>

      <div className="operator-surface mt-28 border border-[#202224] bg-[#050302]/86 p-6 md:p-10">
        <div className="absolute inset-0 operator-grid opacity-15" aria-hidden="true" />
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#a7a39a]">{content.conceptLabel}</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-[#d1cec5] md:text-6xl">{content.conceptTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-[#74726b]">{content.conceptText}</p>
          </div>
          <div className="relative divide-y divide-[#202224] border-y border-[#202224]">
            {content.concepts.map((item, index) => (
              <article key={item.title} className="grid gap-5 py-6 md:grid-cols-[4rem_0.75fr_1.25fr] md:items-start">
                <p className="font-mono text-xs text-[#a7a39a]">0{index + 1}</p>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#a7a39a]">{item.tag}</p>
                  <h3 className="mt-3 font-serif text-2xl leading-tight text-[#d1cec5]">{item.title}</h3>
                  <p className="mt-3 text-sm text-[#aaa59a]">{item.package}</p>
                </div>
                <div className="grid gap-3 text-sm leading-6 text-[#74726b]">
                  <p><span className="text-[#d6d3ca]">{content.conceptLabels.problem}:</span> {item.problem}</p>
                  <p><span className="text-[#d6d3ca]">{content.conceptLabels.direction}:</span> {item.direction}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <DossierPanel eyebrow={content.nextLabel} title={content.nextTitle} text={content.nextText} className="mt-28 border-[#252729] bg-gradient-to-br from-[#050302] to-black text-center md:p-16">
        <Button type="button" onClick={() => goToPage("access")} className="mt-10 inline-flex min-h-14 items-center justify-center border border-[#a7a39a] bg-[#a7a39a] px-9 py-4 font-mono text-[10px] uppercase tracking-[0.24em] text-black transition duration-500 hover:bg-[#d1cec5]">
          {content.cta} <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
        </Button>
      </DossierPanel>
    </PageShell>
  );
}
