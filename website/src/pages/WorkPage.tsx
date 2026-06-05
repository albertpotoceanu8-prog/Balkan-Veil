import { ArrowRight } from "lucide-react";
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
      <div className="space-y-10">
        {content.projects.map((project) => (
          <WorkProjectCard key={project.title} project={project} labels={content.labels} />
        ))}
      </div>

      <div className="mt-28 rounded-[2.5rem] border border-amber-300/20 bg-gradient-to-br from-stone-950 to-black p-10 text-center md:p-16">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.nextLabel}</p>
        <h2 className="mx-auto mt-6 max-w-4xl font-serif text-5xl leading-tight text-stone-100 md:text-7xl">{content.nextTitle}</h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-stone-500">{content.nextText}</p>
        <Button onClick={() => goToPage("access")} className="mt-10 rounded-full bg-amber-300 px-9 py-7 text-base font-semibold uppercase tracking-[0.24em] text-black transition duration-500 hover:bg-amber-200 hover:shadow-[0_0_45px_rgba(251,191,36,0.28)]">
          {content.cta} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </PageShell>
  );
}
