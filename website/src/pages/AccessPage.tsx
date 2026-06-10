import React from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { PageShell } from "@/components/PageShell";
import { DecodeText } from "@/components/DecodeText";
import { TerminalPanel } from "@/components/TerminalPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cardClass, cardMotion, panelClass } from "@/components/motionConfig";
import { supabase, supabaseConfigured } from "@/lib/supabase/client";
import type { SiteContent } from "@/data/siteContent";

type AccessPageProps = {
  content: SiteContent["access"];
  terminal: SiteContent["terminal"];
  cinematic: boolean;
  compactMotion?: boolean;
};

const accessRequestSchema = z.object({
  name: z.string().trim().min(2).max(80),
  contact: z.string().trim().min(3).max(120),
  brand: z.string().trim().max(120),
  message: z.string().trim().max(2000),
  website: z.string().trim(),
});

const genericSubmitError = "We could not send the brief right now. Please try again or contact us directly.";

export function AccessPage({ content, terminal, cinematic, compactMotion = false }: AccessPageProps) {
  const [selectedProjectIndex, setSelectedProjectIndex] = React.useState(0);
  const [selectedBudgetIndex, setSelectedBudgetIndex] = React.useState(1);
  const [selectedInterestIndex, setSelectedInterestIndex] = React.useState(1);
  const [selectedStartIndex, setSelectedStartIndex] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const [form, setForm] = React.useState({
    name: "",
    contact: "",
    brand: "",
    message: "",
    website: "",
  });
  const selectedProject = content.projectOptions[selectedProjectIndex] ?? content.projectOptions[0];
  const selectedBudget = content.budgetOptions[selectedBudgetIndex] ?? content.budgetOptions[0];
  const selectedInterest = content.qualification.interestedOptions[selectedInterestIndex] ?? content.qualification.interestedOptions[0];
  const selectedStart = content.qualification.startOptions[selectedStartIndex] ?? content.qualification.startOptions[0];
  const hasSubmitError = Boolean(submitError);

  const submitAccessRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    if (form.website.trim()) {
      return;
    }

    const parsed = accessRequestSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      if (fieldErrors.name?.length) {
        setSubmitError(content.form.requiredName);
        return;
      }

      if (fieldErrors.contact?.length) {
        setSubmitError(content.form.requiredContact);
        return;
      }

      setSubmitError(content.form.submitError || genericSubmitError);
      return;
    }

    if (!supabaseConfigured) {
      setSubmitError(content.form.backendMissing);
      return;
    }

    setSubmitting(true);

    try {
      const message = [
        `Contact: ${parsed.data.contact}`,
        `${content.qualification.interestedLabel}: ${selectedInterest}`,
        `${content.qualification.startLabel}: ${selectedStart}`,
        parsed.data.message,
      ].filter(Boolean).join("\n\n");
      const { error } = await supabase.from("access_requests").insert({
        name: parsed.data.name,
        brand: parsed.data.brand || null,
        project_type: selectedProject,
        budget_range: selectedBudget,
        message,
        status: "new",
        priority: 1,
      });

      if (error) {
        setSubmitError(content.form.submitError || genericSubmitError);
        return;
      }

      setSubmitted(true);
      setForm({ name: "", contact: "", brand: "", message: "", website: "" });
    } catch {
      setSubmitError(content.form.submitError || genericSubmitError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell eyebrow={content.eyebrow} title={content.title} text={content.text}>
      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/80 px-6 backdrop-blur-md md:backdrop-blur-xl" role="dialog" aria-modal="true" aria-labelledby="access-success-title" aria-describedby="access-success-description">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.32 }}
              className="max-w-xl border border-[#33270f] bg-[#050302] p-10 text-center shadow-[0_0_70px_rgba(197,130,63,0.10)]"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37]">{content.modalLabel}</p>
              <h2 id="access-success-title" className="mt-6 font-serif text-5xl text-[#d8c7a3]">{content.modalTitle}</h2>
              <p id="access-success-description" className="mt-6 text-lg leading-8 text-[#6c5e4e]">{content.modalText}</p>
              <button type="button" onClick={() => setSubmitted(false)} className="mt-9 border border-[#d4af37]/45 bg-[#d4af37]/10 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.26em] text-[#d8c7a3] transition hover:bg-[#d4af37] hover:text-black">
                {content.modalButton}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="operator-surface border border-[#33270f] bg-[#050302]/90 text-[#d8c7a3] transition duration-500 hover:border-[#b99832]/55 hover:shadow-[0_0_55px_rgba(251,191,36,0.08)]">
          <CardContent className="p-7 md:p-12">
            <h2 className="font-serif text-4xl text-[#d8c7a3]">
              <DecodeText text={content.panelTitle} disabled />
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#6c5e4e]">{content.panelText}</p>
            <div className="mt-10 space-y-4 text-[#756650]">
              {content.steps.map((step, index) => (
                <p key={step}>
                  <span className="text-[#f0c85a]">{String(index + 1).padStart(2, "0")}</span> {step}
                </p>
              ))}
            </div>
            <a href="mailto:contact@balkanveil.com" className="mt-10 inline-flex min-h-14 items-center justify-center border border-[#d4af37] bg-[#d4af37] px-9 py-4 font-mono text-[10px] uppercase tracking-[0.24em] text-black transition duration-500 hover:bg-[#d8c7a3]">
              contact@balkanveil.com
            </a>
          </CardContent>
        </Card>

        <div className="relative lg:translate-y-10">
          <TerminalPanel cinematic={cinematic} loop slow compact={compactMotion} lines={terminal.lines} header={terminal.header} />
        </div>
      </div>

      <div className="operator-surface mt-24 border border-[#241d0c] bg-[#050302]/86 p-7 md:p-12">
        <div className="absolute inset-0 operator-grid opacity-15" aria-hidden="true" />
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">{content.beforeApply.eyebrow}</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-[#d8c7a3] md:text-6xl">{content.beforeApply.title}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {content.beforeApply.items.map((item, index) => (
              <motion.div key={item.title} {...cardMotion} className="border border-[#33270f] bg-black/45 p-6">
                <p className="font-mono text-xs text-[#d4af37]">0{index + 1}</p>
                <h3 className="mt-6 font-serif text-2xl text-[#d8c7a3]">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#6c5e4e]">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">{content.fit.eyebrow}</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-[#d8c7a3] md:text-6xl">{content.fit.title}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { label: content.fit.goodLabel, items: content.fit.good },
            { label: content.fit.badLabel, items: content.fit.bad },
          ].map((group) => (
            <div key={group.label} className="border border-[#241d0c] bg-black/45 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">{group.label}</p>
              <div className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <p key={item} className="border border-[#1a1007] bg-[#050302]/88 px-4 py-3 text-[#756650]">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="operator-surface mt-20 border border-[#33270f] bg-black/45 p-5 md:mt-28 md:p-12 md:backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 z-0 operator-grid opacity-15" aria-hidden="true" />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">{content.inquiryLabel}</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-[#d8c7a3] md:text-6xl">{content.inquiryTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-[#6c5e4e]">{content.inquiryText}</p>
          </div>

          <form onSubmit={submitAccessRequest} className="grid gap-5" aria-describedby={hasSubmitError ? "access-form-error" : undefined} noValidate>
            <div className="hidden" aria-hidden="true">
              <label htmlFor="access-website">
                Website
                <input id="access-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))} />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-[#241d0c] bg-[#050302]/88 p-5 transition focus-within:border-[#b99832]/55">
                <label htmlFor="access-name" className="text-xs uppercase tracking-[0.28em] text-[#6c5e4e]">{content.form.name}</label>
                <input id="access-name" name="name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder={content.form.namePlaceholder} autoComplete="name" required maxLength={80} aria-invalid={hasSubmitError && form.name.trim().length < 2} className="mt-3 h-10 w-full border-b border-[#241d0c] bg-transparent text-[#a68b67] outline-none placeholder:text-[#75683d]" />
              </div>
              <div className="border border-[#241d0c] bg-[#050302]/88 p-5 transition focus-within:border-[#b99832]/55">
                <label htmlFor="access-contact" className="text-xs uppercase tracking-[0.28em] text-[#6c5e4e]">{content.form.contact}</label>
                <input id="access-contact" name="contact" value={form.contact} onChange={(event) => setForm((current) => ({ ...current, contact: event.target.value }))} placeholder={content.form.contactPlaceholder} autoComplete="email" required maxLength={120} aria-invalid={hasSubmitError && form.contact.trim().length < 3} className="mt-3 h-10 w-full border-b border-[#241d0c] bg-transparent text-[#a68b67] outline-none placeholder:text-[#75683d]" />
              </div>
              <div className="border border-[#241d0c] bg-[#050302]/88 p-5 transition focus-within:border-[#b99832]/55">
                <label htmlFor="access-brand" className="text-xs uppercase tracking-[0.28em] text-[#6c5e4e]">{content.form.brand}</label>
                <input id="access-brand" name="organization" value={form.brand} onChange={(event) => setForm((current) => ({ ...current, brand: event.target.value }))} placeholder={content.form.brandPlaceholder} autoComplete="organization" maxLength={120} className="mt-3 h-10 w-full border-b border-[#241d0c] bg-transparent text-[#a68b67] outline-none placeholder:text-[#75683d]" />
              </div>
            </div>

            <div className="border border-[#241d0c] bg-[#050302]/88 p-4 md:p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[#6c5e4e]">{content.form.projectType}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.projectOptions.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedProjectIndex(index)}
                    aria-pressed={selectedProjectIndex === index}
                    className={`border px-4 py-2 text-sm transition ${selectedProjectIndex === index ? "border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d8c7a3]" : "border-[#241d0c] bg-black/40 text-[#6c5e4e] hover:border-[#b99832]/55 hover:text-[#d8c7a3]"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-[#241d0c] bg-[#050302]/88 p-4 md:p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[#6c5e4e]">{content.form.budgetRange}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.budgetOptions.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedBudgetIndex(index)}
                    aria-pressed={selectedBudgetIndex === index}
                    className={`border px-4 py-2 text-sm transition ${selectedBudgetIndex === index ? "border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d8c7a3]" : "border-[#241d0c] bg-black/40 text-[#6c5e4e] hover:border-[#b99832]/55 hover:text-[#d8c7a3]"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-[#241d0c] bg-[#050302]/88 p-4 md:p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-[#6c5e4e]">{content.qualification.interestedLabel}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {content.qualification.interestedOptions.map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedInterestIndex(index)}
                      aria-pressed={selectedInterestIndex === index}
                      className={`border px-4 py-2 text-sm transition ${selectedInterestIndex === index ? "border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d8c7a3]" : "border-[#241d0c] bg-black/40 text-[#6c5e4e] hover:border-[#b99832]/55 hover:text-[#d8c7a3]"}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-[#241d0c] bg-[#050302]/88 p-4 md:p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-[#6c5e4e]">{content.qualification.startLabel}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {content.qualification.startOptions.map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedStartIndex(index)}
                      aria-pressed={selectedStartIndex === index}
                      className={`border px-4 py-2 text-sm transition ${selectedStartIndex === index ? "border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d8c7a3]" : "border-[#241d0c] bg-black/40 text-[#6c5e4e] hover:border-[#b99832]/55 hover:text-[#d8c7a3]"}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-[#241d0c] bg-[#050302]/88 p-5 transition focus-within:border-[#b99832]/55">
              <label htmlFor="access-message" className="text-xs uppercase tracking-[0.28em] text-[#6c5e4e]">{content.form.message}</label>
              <textarea id="access-message" name="message" value={form.message} onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))} placeholder={content.form.messagePlaceholder} maxLength={2000} className="mt-4 min-h-28 w-full resize-none border border-[#1a1007] bg-black/30 p-4 text-[#a68b67] outline-none placeholder:text-[#75683d]" />
            </div>

            <div className="border border-[#33270f] bg-black/35 p-5" aria-live="polite">
              <p className="text-xs uppercase tracking-[0.28em] text-[#6c5e4e]">{content.form.selectedBrief}</p>
              <p className="mt-3 text-[#a68b67]">
                <span className="text-[#f0c85a]">{content.form.project}:</span> {selectedProject}
              </p>
              <p className="mt-1 text-[#a68b67]">
                <span className="text-[#f0c85a]">{content.form.budget}:</span> {selectedBudget}
              </p>
              <p className="mt-1 text-[#a68b67]">
                <span className="text-[#f0c85a]">{content.qualification.interestedLabel}:</span> {selectedInterest}
              </p>
              <p className="mt-1 text-[#a68b67]">
                <span className="text-[#f0c85a]">{content.qualification.startLabel}:</span> {selectedStart}
              </p>
            </div>

            <p id="access-form-error" className="min-h-5 text-sm text-red-300" role="alert" aria-live="polite">{submitError}</p>

            <Button type="submit" disabled={submitting} aria-busy={submitting} className="inline-flex min-h-14 items-center justify-center border border-[#d4af37] bg-[#d4af37] px-9 py-4 font-mono text-[10px] uppercase tracking-[0.24em] text-black transition duration-500 hover:bg-[#d8c7a3] disabled:cursor-not-allowed disabled:opacity-70">
              {submitting ? content.form.sending : content.form.submit} <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">{content.afterSubmit.eyebrow}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-[#d8c7a3] md:text-6xl">{content.afterSubmit.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {content.afterSubmit.steps.map((step, index) => (
            <motion.div key={step.title} {...cardMotion} className={panelClass + " operator-surface rounded-none p-7"}>
              <p className="font-serif text-5xl text-[#d4af37]/20">0{index + 1}</p>
              <h3 className="mt-8 font-serif text-3xl text-[#d8c7a3]">{step.title}</h3>
              <p className="mt-5 text-base leading-7 text-[#6c5e4e]">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">{content.packagesLabel}</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {content.packages.map((item) => (
            <motion.div key={item.name} {...cardMotion}>
              <Card className={cardClass}>
                <CardContent className="p-9">
                  <p className="text-xs uppercase tracking-[0.32em] text-[#d4af37]">{item.label}</p>
                  <h3 className="mt-6 font-serif text-4xl text-[#d8c7a3]">{item.name}</h3>
                  <p className="mt-5 text-lg leading-8 text-[#6c5e4e]">{item.text}</p>
                  <div className="mt-8 space-y-3">
                    {item.points.map((point) => (
                      <p key={point} className="text-[#756650]">
                        {"\u2014"} {point}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">{content.faqLabel}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {content.faq.map((item) => (
            <motion.div key={item.q} {...cardMotion} className={panelClass + " operator-surface rounded-none p-8"}>
              <h3 className="font-serif text-3xl text-[#d8c7a3]">{item.q}</h3>
              <p className="mt-5 text-lg leading-8 text-[#6c5e4e]">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
