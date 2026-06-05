import React from "react";
import type { Session } from "@supabase/supabase-js";

import { AdminDashboard } from "@/admin/AdminDashboard";
import { AdminAccessRequests } from "@/admin/AdminAccessRequests";
import { AdminOfferCalculator } from "@/admin/AdminOfferCalculator";
import { AdminPackages } from "@/admin/AdminPackages";
import { AdminLogin } from "@/admin/AdminLogin";
import { AdminPlaceholder } from "@/admin/AdminPlaceholder";
import { AdminProspects } from "@/admin/AdminProspects";
import { AdminProtocol } from "@/admin/AdminProtocol";
import { AdminServices } from "@/admin/AdminServices";
import { AdminShell } from "@/admin/AdminShell";
import { AdminSiteSettings } from "@/admin/AdminSiteSettings";
import { supabase, supabaseConfigured } from "@/lib/supabase/client";

function getPath() {
  return window.location.pathname.replace(/\/$/, "") || "/";
}

function ConfigMissing() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-[#F3EAD2]">
      <section className="max-w-xl border border-[#D4AF37]/20 bg-[#0E0D0A] p-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37]">
          VEIL OS / Setup Required
        </p>
        <h1 className="mt-4 text-3xl font-semibold">Supabase env vars missing</h1>
        <p className="mt-4 text-sm leading-7 text-[#BDB39A]">
          Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>
          in <code>.env.local</code>, then restart the dev server.
        </p>
      </section>
    </main>
  );
}

export function AdminApp() {
  const [path, setPath] = React.useState(getPath);
  const [session, setSession] = React.useState<Session | null>(null);
  const [loading, setLoading] = React.useState(true);

  const navigate = React.useCallback((target: string) => {
    window.history.pushState({}, "", target);
    setPath(getPath());
  }, []);

  React.useEffect(() => {
    const handlePopState = () => setPath(getPath());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  React.useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false);
      return;
    }

    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (loading || !supabaseConfigured) return;

    if (!session && path !== "/admin/login") {
      window.history.replaceState({}, "", "/admin/login");
      setPath("/admin/login");
    }

    if (session && path === "/admin/login") {
      window.history.replaceState({}, "", "/admin");
      setPath("/admin");
    }
  }, [loading, path, session]);

  if (!supabaseConfigured) return <ConfigMissing />;

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#050505] text-[#D4AF37]">
        <p className="font-mono text-xs uppercase tracking-[0.28em]">Loading VEIL OS</p>
      </main>
    );
  }

  if (!session || path === "/admin/login") {
    return <AdminLogin navigate={navigate} />;
  }

  const pages: Record<string, React.ReactNode> = {
    "/admin": <AdminDashboard navigate={navigate} />,
    "/admin/site-settings": <AdminSiteSettings />,
    "/admin/services": <AdminServices />,
    "/admin/packages": <AdminPackages />,
    "/admin/protocol": <AdminProtocol />,
    "/admin/access-requests": <AdminAccessRequests />,
    "/admin/prospects": <AdminProspects />,
    "/admin/calculator": <AdminOfferCalculator />,
    "/admin/proposals": (
      <AdminPlaceholder
        title="Proposals"
        description="Create and manage proposal records for qualified prospects."
      />
    ),
    "/admin/copy": (
      <AdminPlaceholder
        title="Interface Copy"
        description="Manage page copy blocks for the public interface."
      />
    ),
    "/admin/analytics": (
      <AdminPlaceholder
        title="Analytics"
        description="Track public interface performance after analytics are connected."
      />
    ),
    "/admin/database": (
      <AdminPlaceholder
        title="Database"
        description="Supabase schema and data tools will live here in the next module."
      />
    ),
  };

  return (
    <AdminShell path={path} navigate={navigate}>
      {pages[path] || pages["/admin"]}
    </AdminShell>
  );
}
