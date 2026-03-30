import { NavLink, Outlet, useNavigate } from "react-router";
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

export function PatientLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-30 flex flex-col transition-transform duration-300 overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-700 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-gray-900 font-semibold text-sm leading-tight">ศูนย์การแพทย์แผนไทย</p>
              <p className="text-gray-400 text-xs">Patient Portal</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 mt-2">
          <p className="text-xs text-gray-400 px-3 mb-2 uppercase tracking-wider">เมนูหลัก</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all text-sm
                  ${isActive
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 mx-3 mb-2 bg-emerald-50 rounded-xl border border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-700 rounded-full flex items-center justify-center">
              <ProfileIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">นางสาว สมใจ รักสุขภาพ</p>
              <p className="text-xs text-emerald-600">HN: 0012345</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="p-3  border-gray-100">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all w-full text-sm"
          >
            <LogoutIcon className="w-4 h-4" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-5 flex items-center gap-4 flex-shrink-0">
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex-1" />
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <NotificationIcon className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="pb-24">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}