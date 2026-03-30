"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Settings,
  Leaf,
  ChevronDown,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { NotificationIcon } from "./NotificationIcon";
import { useState } from "react";

const navItems = [
  { to: "/admin", label: "แดชบอร์ด", icon: LayoutDashboard, end: true },
  { to: "/admin/users", label: "จัดการผู้ใช้", icon: Users, end: false },
  { to: "/admin/audit", label: "Audit Log", icon: ClipboardList, end: false },
  { to: "/admin/settings", label: "ตั้งค่าคลินิก", icon: Settings, end: false },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-warm-sand flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-deep-emerald z-30 flex flex-col transition-transform duration-300 overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-forest-leaf rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">ศูนย์การแพทย์แผนไทย</p>
              <p className="text-pale-mint text-xs">Admin Portal</p>
            </div>
          </div>
        </div>

        <div className="p-4 mx-3 mt-4 bg-white/10 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-forest-leaf rounded-full flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">ผู้ดูแลระบบ</p>
              <p className="text-xs text-pale-mint">admin@thaimed.go.th</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 mt-4">
          <p className="text-xs text-muted-moss px-3 mb-2 uppercase tracking-wider">เมนูหลัก</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.end
              ? pathname === item.to
              : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                href={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all text-sm
                  ${isActive
                    ? "bg-golden-turmeric text-white"
                    : "text-pale-mint hover:bg-white/10 hover:text-white"
                  }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-pale-mint hover:bg-red-500/20 hover:text-red-300 transition-all w-full text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-border px-4 lg:px-6 py-3 flex items-center gap-4 flex-shrink-0">
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex-1" />
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <NotificationIcon className="w-5 h-5 text-olive-charcoal" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
            <div className="w-7 h-7 bg-forest-leaf rounded-full flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:block text-sm text-olive-charcoal">Admin</span>
            <ChevronDown className="w-4 h-4 text-muted-moss" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
