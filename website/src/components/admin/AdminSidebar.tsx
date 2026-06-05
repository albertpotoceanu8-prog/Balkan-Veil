import {
  Box,
  Gauge,
  Home,
  Image,
  KeyRound,
  Layers,
  Lock,
  Menu,
  Navigation,
  Package,
  Settings,
  Shield,
} from "lucide-react";

import { AdminBrand } from "./AdminBrand";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/site-settings", label: "Site Settings", icon: Settings },
  { href: "/admin/home-interface", label: "Home Interface", icon: Box },
  { href: "/admin/services", label: "Services Protocols", icon: Shield },
  { href: "/admin/packages", label: "Retainer Vault", icon: Package },
  { href: "/admin/protocol", label: "Execution Protocol", icon: Gauge },
  { href: "/admin/access-requests", label: "Access Requests", icon: Lock },
  { href: "/admin/prospects", label: "Prospect Vault", icon: Layers },
  { href: "/admin/calculator", label: "Offer Calculator", icon: Package },
  { href: "/admin/navigation", label: "Navigation Matrix", icon: Navigation },
  { href: "/admin/archive", label: "Signal Archive", icon: Layers },
  { href: "/admin/media", label: "Media Library", icon: Image },
  { href: "/admin/system", label: "System Settings", icon: Settings },
];

type AdminSidebarProps = {
  path: string;
  navigate: (path: string) => void;
  onLogout: () => void;
};

export function AdminSidebar({ path, navigate, onLogout }: AdminSidebarProps) {
  return (
    <aside className="flex h-screen w-[290px] flex-col border-r border-[#D4AF37]/15 bg-[#080705] px-6 py-6 text-[#F3EAD2] shadow-[18px_0_80px_rgba(0,0,0,0.35)]">
      <AdminBrand />

      <div className="mt-9 flex-1 overflow-y-auto">
        <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.20em] text-[#a8a8a8]">
          <span>Command Center</span>
          <Menu size={14} className="text-[#D4AF37]" />
        </div>

        <nav className="space-y-[7px]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin" ? path === "/admin" : path.startsWith(item.href);

            return (
              <button
                type="button"
                key={item.href}
                onClick={() => navigate(item.href)}
                className={[
                  "flex h-[40px] w-full items-center gap-3 rounded-[7px] border px-4 text-left text-[14px] transition",
                  active
                    ? "border-[#D4AF37]/45 bg-[linear-gradient(90deg,rgba(212,175,55,0.22),rgba(212,175,55,0.055))] text-[#f7df9a] shadow-[0_0_28px_rgba(212,175,55,0.10)]"
                    : "border-transparent text-[#d8d2c4] hover:border-[#D4AF37]/25 hover:bg-white/[0.035] hover:text-[#F3EAD2]",
                ].join(" ")}
              >
                <Icon size={18} className={active ? "text-[#F2C75C]" : "text-[#D7C27A]"} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-5 pt-5">
        <div className="rounded-[8px] border border-[#D4AF37]/30 bg-[#0d0f14]/84 p-4 shadow-[0_0_45px_rgba(212,175,55,0.06)]">
          <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
            <span className="text-[#F3EAD2]">System Status</span>
            <span className="flex items-center gap-2 text-green-400">
              <i className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_12px_rgba(34,197,94,0.9)]" />
              Online
            </span>
          </div>

          {[
            ["Environment", "Production"],
            ["Last Publish", "2h ago"],
            ["User", "Balkan Veil"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between border-t border-white/[0.06] py-3 text-[12px]"
            >
              <span className="text-[#a8a8a8]">{label}</span>
              <strong className="font-medium text-[#F3EAD2]">{value}</strong>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="flex h-[70px] w-full items-center gap-4 rounded-[8px] border border-[#D4AF37]/25 bg-[#101218]/78 px-5 text-left transition hover:border-[#D4AF37]/50"
        >
          <KeyRound size={24} className="text-[#F2C75C]" />
          <span>
            <span className="block text-[13px] tracking-[0.16em] text-[#F3EAD2]">
              BALKAN VEIL ·
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-[#a8a8a8]">
              Internal System
            </span>
          </span>
        </button>
      </div>
    </aside>
  );
}
