"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Leaf,
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
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
  const [collapsed, setCollapsed] = useState(false);

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
        className={`fixed top-0 left-0 h-full bg-white border-r border-border z-30 flex flex-col overflow-y-auto overflow-x-hidden
          transition-[width,transform] duration-300
          ${collapsed ? "w-[72px]" : "w-64"}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative lg:z-auto`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-forest-leaf rounded-xl flex items-center justify-center flex-shrink-0">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-[#20211F] font-semibold text-sm leading-tight truncate">ศูนย์การแพทย์แผนไทย</p>
                <p className="text-muted-moss text-xs">Patient Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 mt-2">
          {!collapsed && (
            <p className="text-xs text-muted-moss px-3 mb-2 uppercase tracking-wider">เมนูหลัก</p>
          )}
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
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 rounded-xl mb-0.5 transition-all text-sm
                  ${collapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5"}
                  ${isActive
                    ? "bg-forest-leaf text-white shadow-sm"
                    : "text-olive-charcoal hover:bg-gray-100 hover:text-[#20211F]"
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        {collapsed ? (
          <div className="flex justify-center mb-2">
            <div className="w-9 h-9 bg-forest-leaf rounded-full flex items-center justify-center">
              <ProfileIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        ) : (
          <div className="p-4 mx-3 mb-2 bg-pale-mint rounded-xl border border-pale-mint">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-forest-leaf rounded-full flex items-center justify-center flex-shrink-0">
                <ProfileIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#20211F] truncate">นางสาว สมใจ รักสุขภาพ</p>
                <p className="text-xs text-forest-leaf">HN: 0012345</p>
              </div>
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="p-3 border-border">
          <button
            onClick={() => router.push("/")}
            title={collapsed ? "ออกจากระบบ" : undefined}
            className={`flex items-center gap-3 rounded-xl text-muted-moss hover:bg-red-50 hover:text-red-600 transition-all w-full text-sm
              ${collapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5"}`}
          >
            <LogoutIcon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>ออกจากระบบ</span>}
          </button>
        </div>

        {/* Collapse Toggle (desktop only) */}
        <div className="hidden lg:block p-3 border-t border-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`flex items-center gap-3 rounded-xl text-muted-moss hover:bg-gray-100 hover:text-[#20211F] transition-all w-full text-sm
              ${collapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5"}`}
          >
            {collapsed ? (
              <ChevronsRight className="w-4 h-4 flex-shrink-0" />
            ) : (
              <>
                <ChevronsLeft className="w-4 h-4 flex-shrink-0" />
                <span>ย่อเมนู</span>
              </>
            )}
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
