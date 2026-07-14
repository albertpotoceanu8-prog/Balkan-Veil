import React from "react";

import { supabase } from "@/lib/supabase/client";

const BUCKET = "media";

type MediaItem = { name: string; url: string };

function publicUrl(name: string): string {
  return supabase.storage.from(BUCKET).getPublicUrl(name).data.publicUrl;
}

export function AdminMedia() {
  const [items, setItems] = React.useState<MediaItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [error, setError] = React.useState("");
  const [copied, setCopied] = React.useState("");

  const load = React.useCallback(async () => {
    setLoading(true);
    setError("");
    const { data, error: listError } = await supabase.storage
      .from(BUCKET)
      .list("", { limit: 200, sortBy: { column: "created_at", order: "desc" } });
    if (listError) {
      setError(listError.message);
    } else {
      setItems((data ?? []).filter((f) => f.id).map((f) => ({ name: f.name, url: publicUrl(f.name) })));
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    load().catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not load media."));
  }, [load]);

  const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    setStatus("");
    setError("");
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${Date.now()}-${safe}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: "3600", upsert: false });
    setUploading(false);
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    setStatus("Uploaded");
    await load();
  };

  const onDelete = async (name: string) => {
    setError("");
    const { error: removeError } = await supabase.storage.from(BUCKET).remove([name]);
    if (removeError) {
      setError(removeError.message);
      return;
    }
    await load();
  };

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      window.setTimeout(() => setCopied(""), 1500);
    } catch {
      setError("Could not copy. Select the URL manually.");
    }
  };

  return (
    <main className="h-full overflow-y-auto p-4 md:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37]">Command Center / Media</p>
          <h1 className="mt-3 text-4xl font-semibold">Media Library</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8E8878]">
            Upload images and copy their URL into any image field in Site Content.
          </p>
        </div>
        <div className="border border-green-400/20 bg-green-400/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-green-300">
          {status || (loading ? "Loading" : `${items.length} files`)}
        </div>
      </div>

      {error ? <div className="mb-6 border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">{error}</div> : null}

      <label className="mb-8 inline-flex cursor-pointer items-center gap-3 border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-6 py-3 text-sm text-[#F3EAD2] transition hover:bg-[#D4AF37]/10">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#D4AF37]">{uploading ? "Uploading..." : "+ Upload image"}</span>
        <input type="file" accept="image/*,video/mp4,image/svg+xml" onChange={onUpload} disabled={uploading} className="hidden" />
      </label>

      {loading ? (
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#8E8878]">Loading media...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-[#8E8878]">No files yet. Upload the first image.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.name} className="flex flex-col border border-[#D4AF37]/15 bg-[#0E0D0A]">
              <div className="flex h-40 items-center justify-center overflow-hidden border-b border-[#D4AF37]/10 bg-black">
                <img src={item.url} alt={item.name} loading="lazy" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-3">
                <p className="break-all font-mono text-[10px] leading-4 text-[#8E8878]">{item.name}</p>
                <div className="mt-auto flex gap-2">
                  <button
                    type="button"
                    onClick={() => copy(item.url)}
                    className="flex-1 border border-[#D4AF37]/25 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
                  >
                    {copied === item.url ? "Copied" : "Copy URL"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item.name)}
                    className="border border-red-400/25 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-red-300 transition hover:bg-red-400/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
