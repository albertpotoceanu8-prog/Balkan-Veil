import { motion } from "framer-motion";
import { ArchiveStamp } from "@/components/ArchiveStamp";
import { cardMotion } from "@/components/motionConfig";
import { VeilFrame } from "@/components/VeilFrame";
import type { SiteContent, WorkProject } from "@/data/siteContent";

type WorkProjectCardProps = {
  project: WorkProject;
  labels: SiteContent["work"]["labels"];
};

export function WorkProjectCard({ project, labels }: WorkProjectCardProps) {
  const dossierRows = [
    [labels.problem, project.problem],
    [labels.solution, project.solution],
    [labels.result, project.result],
    [labels.plan, project.recommendedPlan],
  ];

  return (
    <motion.article {...cardMotion}>
      <VeilFrame label={`BV-WORK-${project.number}`} index={labels.scenario} className="archive-noise">
        <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="border-b border-[#202224] p-6 md:p-8 lg:border-b-0 lg:border-r">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#a7a39a] md:text-xs md:tracking-[0.3em]">{project.category}</p>
                <h3 className="mt-5 max-w-xl font-serif text-3xl leading-tight text-[#d1cec5] md:mt-6 md:text-5xl">{project.title}</h3>
              </div>
              <ArchiveStamp code={project.number} label="BV" status={labels.scenario} align="right" className="hidden sm:flex" />
            </div>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#787873] md:mt-8 md:text-lg md:leading-8">{project.summary}</p>

            <div className="mt-8 flex items-end justify-between gap-6 border-t border-[#252729] pt-6 md:mt-10">
              <p className="font-serif text-6xl leading-none text-[#a7a39a]/15 md:text-8xl">{project.number}</p>
              <div className="max-w-44 text-right">
                <span className="mb-4 ml-auto block h-2 w-14 bg-[#7b7a73]/35" aria-hidden="true" />
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#74726b]">{labels.status}</p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="divide-y divide-[#202224] border-y border-[#202224]">
              {dossierRows.map(([label, value], index) => (
                <div key={label} className="grid gap-3 py-5 md:grid-cols-[10rem_1fr] md:gap-6">
                  <div className="flex items-center gap-3">
                    <span className={index === 0 ? "h-2 w-2 bg-red-300/40" : "h-2 w-2 bg-[#7b7a73]/45"} aria-hidden="true" />
                    <span className="font-mono text-xs text-[#a7a39a]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#a7a39a]">{label}</span>
                  </div>
                  <p className={`text-base leading-7 ${index === dossierRows.length - 1 ? "font-serif text-xl text-[#d1cec5] md:text-2xl" : "text-[#787873]"}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 border border-[#202224] bg-black/35 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#74726b]">BV-WORK-{project.number}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#a7a39a]">{project.recommendedPlan}</span>
            </div>
          </div>
        </div>
      </VeilFrame>
    </motion.article>
  );
}
