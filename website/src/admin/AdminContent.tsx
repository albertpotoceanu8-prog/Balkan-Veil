import React from "react";

import { supabase } from "@/lib/supabase/client";
import { siteContent } from "@/data/siteContent";
import { deepMerge, loadPublicCmsContent } from "@/lib/cms/publicContent";

type Path = (string | number)[];
type Json = unknown;

const LANGUAGE = "ro" as const;

// Sections a client can edit (structural navigation is intentionally excluded).
const SECTIONS: { key: string; label: string }[] = [
  { key: "images", label: "Images" },
  { key: "home", label: "Home" },
  { key: "servicesPage", label: "Services" },
  { key: "pricing", label: "Pricing" },
  { key: "protocol", label: "Protocol" },
  { key: "studio", label: "Studio" },
  { key: "work", label: "Work" },
  { key: "build", label: "Build" },
  { key: "access", label: "Access" },
  { key: "footer", label: "Footer" },
  { key: "terminal", label: "Terminal" },
];

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getByPath(root: Json, path: Path): Json {
  return path.reduce<Json>((node, key) => (node == null ? undefined : (node as Record<string | number, Json>)[key]), root);
}

function setByPath(root: Json, path: Path, value: Json): Json {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  const currentChild = (root as Record<string | number, Json> | undefined)?.[head];
  const childValue = setByPath(currentChild, rest, value);
  if (Array.isArray(root)) {
    const clone = [...root];
    clone[head as number] = childValue;
    return clone;
  }
  return { ...(root as Record<string, Json>), [head]: childValue };
}

function emptyLike(sample: Json): Json {
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return [];
  if (isPlainObject(sample)) {
    const out: Record<string, Json> = {};
    for (const [k, v] of Object.entries(sample)) out[k] = emptyLike(v);
    return out;
  }
  return "";
}

function humanize(key: string | number): string {
  return String(key)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function fieldRows(value: string): number {
  if (value.length > 160) return 4;
  if (value.length > 70) return 3;
  return 2;
}

function TreeEditor({ value, path, onChange, onArray }: {
  value: Json;
  path: Path;
  onChange: (path: Path, next: Json) => void;
  onArray: (op: "add" | "remove", path: Path) => void;
}) {
  if (typeof value === "string") {
    const looksLikeImage = /\.(png|jpe?g|webp|gif|svg|avif|mp4)(\?|$)/i.test(value) || /\/storage\/v1\/object\/public\//.test(value);
    return (
      <div>
        <textarea
          value={value}
          rows={fieldRows(value)}
          onChange={(e) => onChange(path, e.target.value)}
          className="w-full resize-y border border-[#D4AF37]/20 bg-[#050505] px-3 py-2 text-sm leading-6 text-[#F3EAD2] outline-none transition focus:border-[#D4AF37]"
        />
        {looksLikeImage && value ? (
          <img src={value} alt="" className="mt-2 h-24 w-auto max-w-full border border-[#D4AF37]/15 bg-black object-contain" />
        ) : null}
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(path, Number(e.target.value))}
        className="w-full border border-[#D4AF37]/20 bg-[#050505] px-3 py-2 text-sm text-[#F3EAD2] outline-none focus:border-[#D4AF37]"
      />
    );
  }

  if (typeof value === "boolean") {
    return (
      <input type="checkbox" checked={value} onChange={(e) => onChange(path, e.target.checked)} className="h-5 w-5 accent-[#D4AF37]" />
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="grid gap-3">
        {value.map((item, index) => (
          <div key={index} className="border border-[#D4AF37]/10 bg-black/30 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8F7835]">{String(index + 1).padStart(2, "0")}</span>
              <button
                type="button"
                onClick={() => onArray("remove", [...path, index])}
                className="border border-red-400/30 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-red-300 transition hover:bg-red-400/10"
              >
                Remove
              </button>
            </div>
            <TreeEditor value={item} path={[...path, index]} onChange={onChange} onArray={onArray} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onArray("add", path)}
          className="border border-[#D4AF37]/25 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
        >
          + Add item
        </button>
      </div>
    );
  }

  if (isPlainObject(value)) {
    return (
      <div className="grid gap-4">
        {Object.entries(value).map(([key, child]) => {
          const nested = isPlainObject(child) || Array.isArray(child);
          return (
            <div key={key} className={nested ? "border-l border-[#D4AF37]/15 pl-4" : ""}>
              <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.2em] text-[#8F7835]">{humanize(key)}</label>
              <TreeEditor value={child} path={[...path, key]} onChange={onChange} onArray={onArray} />
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}

export function AdminContent() {
  const [tree, setTree] = React.useState<Record<string, Json> | null>(null);
  const [section, setSection] = React.useState(SECTIONS[0].key);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let cancelled = false;
    loadPublicCmsContent(siteContent[LANGUAGE], LANGUAGE)
      .then((effective) => {
        if (!cancelled) setTree(effective as unknown as Record<string, Json>);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not load content.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onChange = React.useCallback((path: Path, next: Json) => {
    setStatus("");
    setTree((current) => (current ? (setByPath(current, path, next) as Record<string, Json>) : current));
  }, []);

  const onArray = React.useCallback((op: "add" | "remove", path: Path) => {
    setStatus("");
    setTree((current) => {
      if (!current) return current;
      if (op === "remove") {
        const parentPath = path.slice(0, -1);
        const index = path[path.length - 1] as number;
        const arr = getByPath(current, parentPath) as Json[];
        return setByPath(current, parentPath, arr.filter((_, i) => i !== index)) as Record<string, Json>;
      }
      const arr = getByPath(current, path) as Json[];
      const template = arr.length ? emptyLike(arr[arr.length - 1]) : "";
      return setByPath(current, path, [...arr, template]) as Record<string, Json>;
    });
  }, []);

  const publish = async () => {
    if (!tree) return;
    setSaving(true);
    setStatus("");
    setError("");

    const data: Record<string, Json> = {};
    for (const { key } of SECTIONS) if (tree[key] !== undefined) data[key] = tree[key];

    const { error: saveError } = await supabase
      .from("content_overrides")
      .upsert({ language: LANGUAGE, data, updated_at: new Date().toISOString() }, { onConflict: "language" });

    setSaving(false);
    if (saveError) setError(saveError.message);
    else setStatus("Published");
  };

  return (
    <main className="h-full overflow-y-auto p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37]">Command Center / Content</p>
          <h1 className="mt-3 text-4xl font-semibold">Site Content</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8E8878]">
            Edit every text on the public site, section by section. Changes publish to the live Romanian site.
          </p>
        </div>
        <div className="border border-green-400/20 bg-green-400/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-green-300">
          {status || (loading ? "Loading" : "Live")}
        </div>
      </div>

      {error ? <div className="mb-6 border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">{error}</div> : null}

      <div className="mb-6 flex flex-wrap gap-2">
        {SECTIONS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setSection(item.key)}
            className={`border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${section === item.key ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#F3EAD2]" : "border-[#D4AF37]/15 text-[#8E8878] hover:border-[#D4AF37]/40 hover:text-[#F3EAD2]"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {loading || !tree ? (
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#8E8878]">Loading content...</p>
      ) : (
        <div className="border border-[#D4AF37]/15 bg-[#0E0D0A] p-6">
          {tree[section] !== undefined ? (
            <TreeEditor value={tree[section]} path={[section]} onChange={onChange} onArray={onArray} />
          ) : (
            <p className="text-sm text-[#8E8878]">This section has no editable content.</p>
          )}
        </div>
      )}

      <div className="sticky bottom-0 mt-4 flex justify-end border-t border-[#D4AF37]/15 bg-[#050505]/90 py-5 backdrop-blur">
        <button
          type="button"
          onClick={publish}
          disabled={saving || loading}
          className="bg-[#D4AF37] px-7 py-3 text-sm font-semibold text-[#050505] disabled:opacity-70"
        >
          {saving ? "Publishing..." : "Publish Changes"}
        </button>
      </div>
    </main>
  );
}
