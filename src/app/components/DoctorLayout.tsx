"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutList,
  Leaf,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Stethoscope,
  Settings,
  BarChart2,
} from "lucide-react";
import { PaperIcon } from "./PaperIcon";
import { NotificationIcon } from "./NotificationIcon";
import { useState } from "react";

const navItems = [
  { to: "/doctor", label: "คิววันนี้", icon: LayoutList, end: true },
  { to: "/doctor/reports", label: "รายงาน", icon: BarChart2, end: false },
  { to: "/doctor/templates", label: "แม่แบบ", icon: PaperIcon, end: false },
  { to: "/doctor/settings", label: "ตั้งค่า", icon: Settings, end: false },
];

export function DoctorLayout({ children }: { children: React.ReactNode }) {
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

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-border z-30 flex flex-col transition-transform duration-300 overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-forest-leaf rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[#20211F] font-semibold text-sm leading-tight">ศูนย์การแพทย์แผนไทย</p>
              <p className="text-muted-moss text-xs">Doctor Portal</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 mt-2">
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
                    ? "bg-forest-leaf text-white shadow-sm"
                    : "text-olive-charcoal hover:bg-gray-100 hover:text-[#20211F]"
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Doctor Info */}
        <div className="p-4 mx-3 mb-2 bg-pale-mint rounded-xl border border-pale-mint">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-forest-leaf rounded-full flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#20211F] truncate">นพ. สมชาย แพทย์ไทย</p>
              <p className="text-xs text-forest-leaf">แพทย์แผนไทยประยุกต์</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-forest-leaf animate-pulse" />
            <span className="text-xs text-muted-moss">พร้อมให้บริการ</span>
          </div>
          {/* Today mini stats */}
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[
              { num: "12", label: "นัดวันนี้" },
              { num: "5", label: "เสร็จแล้ว" },
              { num: "7", label: "รอ" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-lg p-2 text-center border border-pale-mint">
                <p className="text-forest-leaf font-semibold text-base leading-none">{s.num}</p>
                <p className="text-muted-moss text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="p-3 border-t border-border">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-moss hover:bg-red-50 hover:text-red-600 transition-all w-full text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-border px-4 lg:px-6 py-4 flex items-center gap-4 flex-shrink-0">
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex-1 flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-pale-mint text-forest-leaf px-3 py-1.5 rounded-lg border border-pale-mint text-sm">
              <span className="w-2 h-2 rounded-full bg-forest-leaf animate-pulse" />
              One-Person Clinic Mode
            </div>
          </div>
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <NotificationIcon className="w-5 h-5 text-olive-charcoal" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
            <div className="w-7 h-7 bg-forest-leaf rounded-full flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:block text-sm text-olive-charcoal">นพ. สมชาย</span>
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
