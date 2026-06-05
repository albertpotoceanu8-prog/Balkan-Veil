import React from "react";
import { Bell, Search } from "lucide-react";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { supabase } from "@/lib/supabase/client";

type AdminShellProps = {
  children: React.ReactNode;
  path: string;
  navigate: (path: string) => void;
};

const newSignalOptions = [
  { label: "New Prospect", path: "/admin/prospects" },
  { label: "New Access Request", path: "/admin/access-requests" },
  { label: "New Service Protocol", path: "/admin/services" },
  { label: "New Retainer Package", path: "/admin/packages" },
  { label: "New Protocol Step", path: "/admin/protocol" },
  { label: "New Proposal", path: "/admin/proposals" },
];

export function AdminShell({ children, path, navigate }: AdminShellProps) {
  const [newSignalOpen, setNewSignalOpen] = React.useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const openSignalTarget = (target: string) => {
    setNewSignalOpen(false);
    navigate(target);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#050608] text-[#F3EAD2]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.07),transparent_28%),linear-gradient(130deg,rgba(212,175,55,0.045)_0,transparent_28%,transparent_66%,rgba(212,175,55,0.04)_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:radial-gradient(circle_at_35%_80%,rgba(212,175,55,0.16),transparent_18%),radial-gradient(circle_at_72%_14%,rgba(255,255,255,0.06),transparent_22%)]" />

      <div className="relative grid h-screen w-screen grid-cols-[290px_minmax(0,1fr)]">
        <AdminSidebar path={path} navigate={navigate} onLogout={logout} />

        <section className="h-screen min-w-0 overflow-hidden">
          <header className="sticky top-0 z-20 flex h-[56px] items-center justify-between border-b border-white/[0.07] bg-[#050608]/88 px-8 backdrop-blur-xl">
            <button
              type="button"
              className="grid h-8 w-8 place-items-center rounded-full border border-white/[0.07] text-[#A8A8A8]"
            >
              <span className="h-2 w-2 rounded-full border border-[#F3EAD2]" />
            </button>

            <label className="ml-[125px] mr-auto flex h-[36px] w-[500px] items-center gap-3 rounded-[9px] border border-white/[0.10] bg-[#0d0f14]/86 px-4 shadow-[0_16px_50px_rgba(0,0,0,0.25)]">
              <Search size={18} className="text-[#A8A8A8]" />
              <input
                className="w-full bg-transparent text-sm text-[#F3EAD2] outline-none placeholder:text-[#A8A8A8]"
                placeholder="Search in studio..."
              />
              <span className="rounded-[6px] border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-[#A8A8A8]">
                ⌘ K
              </span>
            </label>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNewSignalOpen((current) => !current)}
                  className="inline-flex h-[36px] items-center gap-2 rounded-[8px] border border-[#D4AF37]/35 bg-[#100e08] px-5 text-sm font-semibold text-[#F2C75C] shadow-[0_0_28px_rgba(212,175,55,0.08)] transition hover:border-[#D4AF37]/70 hover:bg-[#161107]"
                >
                  <span className="text-lg leading-none">+</span>
                  New Signal
                </button>

                {newSignalOpen ? (
                  <div className="absolute right-0 top-[46px] z-50 w-[240px] overflow-hidden rounded-[10px] border border-[#D4AF37]/35 bg-[#080705]/98 p-2 shadow-[0_28px_90px_rgba(0,0,0,0.55),0_0_40px_rgba(212,175,55,0.08)] backdrop-blur-xl">
                    <p className="px-3 pb-2 pt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8F7835]">
                      Create Signal
                    </p>
                    <div className="grid gap-1">
                      {newSignalOptions.map((option) => (
                        <button
                          type="button"
                          key={option.label}
                          onClick={() => openSignalTarget(option.path)}
                          className="flex h-10 items-center justify-between rounded-[7px] border border-transparent px-3 text-left text-sm text-[#F3EAD2] transition hover:border-[#D4AF37]/35 hover:bg-[#D4AF37]/10 hover:text-[#F2C75C]"
                        >
                          <span>{option.label}</span>
                          <span className="font-mono text-xs text-[#8F7835]">+</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                className="relative grid h-10 w-10 place-items-center rounded-full text-[#D8D2C4]"
              >
                <Bell size={18} />
                <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-[#F2C75C] text-[10px] font-bold text-[#050608]">
                  3
                </span>
              </button>

              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#D4AF37]/50 bg-[#101218] font-serif text-sm text-[#F3EAD2] shadow-[0_0_25px_rgba(212,175,55,0.12)]"
              >
                BV
              </button>
            </div>
          </header>

          <div className="relative h-[calc(100vh-56px)] overflow-hidden">{children}</div>
        </section>
      </div>
    </div>
  );
}
