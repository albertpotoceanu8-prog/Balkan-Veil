import type React from "react";
import { ArrowRight, Eye, Lock, Network, Shield, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { cardClass, cardMotion } from "@/components/motionConfig";
import type { ServiceIcon, SiteContent } from "@/data/siteContent";

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
};

export function ServicesPage({ content }: ServicesPageProps) {
  return (
    <PageShell eyebrow={content.eyebrow} title={content.title} text={content.text}>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {content.services.map((service) => (
          <motion.div key={service.title} {...cardMotion}>
            <Card className={cardClass + " bg-stone-950/60 md:backdrop-blur-xl"}>
              <CardContent className="p-10">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/5 text-amber-200">{serviceIcons[service.icon]}</div>
                <h3 className="font-serif text-3xl">{service.title}</h3>
                <p className="mt-5 text-lg leading-8 text-stone-500">{service.text}</p>
                <div className="mt-8 space-y-2 border-t border-stone-800 pt-6">
                  {service.deliverables.map((deliverable) => (
                    <p key={deliverable} className="text-sm text-stone-400">
                      {"\u2014"} {deliverable}
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
    </PageShell>
  );
}
