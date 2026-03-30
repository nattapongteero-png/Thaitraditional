"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Leaf,
  ChevronDown,
  Menu,
  X,
  User,
} from "lucide-react";
import { NotificationIcon } from "./NotificationIcon";
import { LogoutIcon } from "./LogoutIcon";
import { VideoIcon } from "./VideoIcon";
import { CalendarIcon } from "./CalendarIcon";
import { CategoryIcon } from "./CategoryIcon";
import { PaperIcon } from "./PaperIcon";
import { ShieldDoneIcon } from "./ShieldDoneIcon";
import { ProfileIcon } from "./ProfileIcon";
import { useState } from "react";

const navItems = [
  { to: "/patient", label: "หน้าหลัก", icon: CategoryIcon, end: true },
  { to: "/patient/appointment", label: "นัดหมาย", icon: CalendarIcon, end: false },
  { to: "/patient/waiting-room", label: "ห้องรอพบแพทย์", icon: VideoIcon, end: false },
  { to: "/patient/history", label: "ประวัติการรักษา", icon: PaperIcon, end: false },
  { to: "/patient/consent", label: "ความยินยอม", icon: ShieldDoneIcon, end: false },
];

export function PatientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-warm-sand flex">
      {/* Sidebar Overlay (mobile) */}
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
              <p className="text-deep-emerald font-semibold text-sm leading-tight">ศูนย์การแพทย์แผนไทย</p>
              <p className="text-muted-moss text-xs">Patient Portal</p>
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
                    : "text-olive-charcoal hover:bg-gray-100 hover:text-deep-emerald"
                  }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 mx-3 mb-2 bg-pale-mint rounded-xl border border-pale-mint">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-forest-leaf rounded-full flex items-center justify-center">
              <ProfileIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-deep-emerald truncate">นางสาว สมใจ รักสุขภาพ</p>
              <p className="text-xs text-forest-leaf">HN: 0012345</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="p-3  border-border">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-moss hover:bg-red-50 hover:text-red-600 transition-all w-full text-sm"
          >
            <LogoutIcon className="w-4 h-4" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-border px-4 lg:px-6 py-5 flex items-center gap-4 flex-shrink-0">
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

        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="pb-24">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
