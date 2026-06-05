type StatusCardProps = {
  icon?: React.ReactNode;
  label: string;
  value: string;
  meta: string;
  tone?: "gold" | "green";
};

export function StatusCard({ icon, label, value, meta, tone = "gold" }: StatusCardProps) {
  return (
    <div className="group relative min-h-[104px] overflow-hidden rounded-[8px] border border-white/[0.08] bg-[#0d0f14]/88 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.28)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(212,175,55,0.10),transparent_34%)] opacity-70" />
      <div className="relative flex items-start gap-4">
        <div
          className={[
            "grid h-10 w-10 shrink-0 place-items-center rounded-[7px] border bg-[#08090c]",
            tone === "green"
              ? "border-green-400/25 text-green-400 shadow-[0_0_28px_rgba(34,197,94,0.10)]"
              : "border-[#d4af37]/25 text-[#f2c75c] shadow-[0_0_28px_rgba(212,175,55,0.12)]",
          ].join(" ")}
        >
          {icon}
        </div>
        <div>
          <p className="text-[26px] font-semibold leading-none text-[#f5f1e8]">{value}</p>
          <p className="mt-3 text-[12px] leading-5 text-[#f5f1e8]">{label}</p>
          <p className="mt-1 text-[12px] leading-5 text-[#a8a8a8]">{meta}</p>
        </div>
      </div>
    </div>
  );
}
