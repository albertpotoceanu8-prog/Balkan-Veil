import type React from "react";
import { ArrowRight, Eye, Lock, Network, Shield, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cardClass, cardMotion } from "@/components/motionConfig";
import type { ServiceIcon, SiteContent } from "@/data/siteContent";
import type { PageKey } from "@/types/navigation";

const serviceIcons: Record<ServiceIcon, React.ReactNode> = {
  Terminal: <Terminal className="h-5 w-5" />,
  Network: <Network className="h-5 w-5" />,
  Eye: <Eye className="h-5 w-5" />,
  Lock: <Lock className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  ArrowRight: <ArrowRight className="h-5 w-5" />,
};

type ServicesPageProps = {
  content: SiteContent["servicesPage"];
  goToPage: (target: PageKey) => void;
};

export function ServicesPage({ content, goToPage }: ServicesPageProps) {
  return (
    <PageShell eyebrow={content.eyebrow} title={content.title} text={content.text}>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {content.services.map((service) => (
          <motion.div key={service.title} {...cardMotion} className="h-full">
            <Card className={cardClass + " h-full bg-stone-950/60 md:backdrop-blur-xl"}>
              <CardContent className="flex h-full flex-col p-7 md:p-10">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/5 text-amber-200" aria-hidden="true">{serviceIcons[service.icon]}</div>
                <h3 className="font-serif text-3xl leading-tight">{service.title}</h3>
                <p className="mt-5 text-lg leading-8 text-stone-500">{service.text}</p>
                <div className="mt-auto space-y-2 border-t border-stone-800 pt-6">
                  {service.deliverables.map((deliverable) => (
                    <p key={deliverable} className="flex gap-2 text-sm leading-6 text-stone-400">
                      <span className="text-amber-300/70" aria-hidden="true">{"\u2014"}</span> <span>{deliverable}</span>
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.projectTypesLabel}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.projectTypes.map((item) => (
            <motion.div key={item} {...cardMotion} className="rounded-2xl border border-stone-800 bg-black/40 p-6 transition duration-500 hover:-translate-y-1 hover:border-amber-300/30 hover:bg-black/60 hover:shadow-[0_0_35px_rgba(251,191,36,0.08)]">
              <p className="font-serif text-2xl text-stone-100">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20 rounded-[2rem] border border-amber-300/15 bg-black/45 p-6 md:mt-28 md:p-10 md:backdrop-blur-xl">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-300">{content.ctaLabel}</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-stone-100 md:text-5xl">{content.ctaTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-500">{content.ctaText}</p>
          </div>
          <Button type="button" onClick={() => goToPage("access")} className="inline-flex min-h-14 items-center justify-center rounded-full bg-amber-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition duration-500 hover:bg-amber-200 hover:shadow-[0_0_45px_rgba(251,191,36,0.28)] md:text-base">
            {content.ctaAction} <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
