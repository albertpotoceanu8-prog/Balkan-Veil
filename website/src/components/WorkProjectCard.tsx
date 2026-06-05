import { motion } from "framer-motion";
import { cardMotion } from "@/components/motionConfig";
import type { SiteContent, WorkProject } from "@/data/siteContent";

type WorkProjectCardProps = {
  project: WorkProject;
  labels: SiteContent["work"]["labels"];
};

export function WorkProjectCard({ project, labels }: WorkProjectCardProps) {
  return (
    <motion.div {...cardMotion} className="grid gap-8 rounded-[2.75rem] border border-stone-800 bg-black/45 p-6 transition duration-500 hover:border-amber-300/30 hover:shadow-[0_0_70px_rgba(251,191,36,0.10)] md:p-8 md:backdrop-blur-xl lg:grid-cols-[0.85fr_1.15fr]">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-amber-300/15 bg-stone-950/70 p-6">
        <div className="absolute -right-20 -top-20 hidden h-56 w-56 rounded-full bg-amber-300/10 blur-3xl md:block" />
        <div className="mb-8 flex items-center justify-between border-b border-stone-800 pb-5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-stone-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
          </div>
          <p className="font-mono text-sm text-amber-300/60">WORK-{project.number}</p>
        </div>

        <p className="text-xs uppercase tracking-[0.32em] text-amber-300">{project.category}</p>
        <h3 className="mt-5 font-serif text-4xl leading-tight text-stone-100">{project.title}</h3>

        <div className="mt-10 grid gap-3">
          {project.stack.map((item) => (
            <div key={item} className="flex items-center justify-between rounded-2xl border border-stone-800 bg-black/45 px-4 py-3">
              <span className="text-sm text-stone-400">{item}</span>
              <span className="h-1.5 w-12 rounded-full bg-amber-300/30" />
            </div>
          ))}
        </div>

        <div className="mt-10 h-40 rounded-2xl border border-stone-800 bg-[linear-gradient(135deg,rgba(251,191,36,0.12),transparent_45%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,30px_30px,30px_30px]" />
      </div>

      <div className="flex flex-col justify-center p-2 md:p-4">
        <p className="font-serif text-7xl text-amber-100/15">{project.number}</p>
        <div className="mt-4 grid gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">{labels.problem}</p>
            <p className="mt-3 text-lg leading-8 text-stone-500">{project.problem}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">{labels.solution}</p>
            <p className="mt-3 text-lg leading-8 text-stone-500">{project.solution}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">{labels.result}</p>
            <p className="mt-3 text-lg leading-8 text-stone-400">{project.result}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
