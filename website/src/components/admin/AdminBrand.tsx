import { VeilMark } from "./VeilMark";

export function AdminBrand() {
  return (
    <div className="flex min-w-[220px] items-center gap-4">
      <div className="shrink-0 text-[#D4AF37]">
        <VeilMark />
      </div>

      <div className="min-w-0">
        <div className="whitespace-nowrap font-serif text-[18px] font-semibold uppercase tracking-[0.28em] text-[#F3EAD2]">
          Balkan Veil
        </div>

        <div className="mt-1 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
          VEIL OS / CMS
        </div>
      </div>
    </div>
  );
}
