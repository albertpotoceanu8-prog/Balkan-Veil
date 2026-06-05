type AdminPlaceholderProps = {
  title: string;
  description: string;
};

export function AdminPlaceholder({ title, description }: AdminPlaceholderProps) {
  return (
    <main className="h-full overflow-y-auto p-8">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37]">
        Command Center
      </p>
      <h1 className="mt-4 text-4xl font-semibold">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8E8878]">
        {description}
      </p>

      <section className="mt-8 border border-[#D4AF37]/15 bg-[#0E0D0A] p-6">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#8F7835]">
          Module Status
        </p>
        <p className="mt-5 text-sm leading-7 text-[#BDB39A]">
          This section is reserved for the next admin module. Site Settings is
          already connected to Supabase and can publish real content.
        </p>
      </section>
    </main>
  );
}
