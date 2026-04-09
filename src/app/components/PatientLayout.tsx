"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Leaf,
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NotificationIcon } from "./NotificationIcon";
import { LogoutIcon } from "./LogoutIcon";
import { VideoIcon } from "./VideoIcon";
import { CalendarIcon } from "./CalendarIcon";
import { TimeCircleIcon } from "./TimeCircleIcon";
import { CategoryIcon } from "./CategoryIcon";
import { PaperIcon } from "./PaperIcon";
import { PillIcon } from "./PillIcon";
import { ShieldDoneIcon } from "./ShieldDoneIcon";
import { ProfileIcon } from "./ProfileIcon";
import { useState } from "react";

const doctorMale = "/images/doctor-male.png";
const doctorFemale = "/images/doctor-female.png";

type NotifItem = {
  id: number;
  category: "appointment" | "medicine" | "document" | "alert";
  title: string;
  desc: string;
  time: string;
  doctor?: string;
  gender?: string;
};

const notifByDate: Record<string, NotifItem[]> = {
  "2569-03-02": [
    { id: 1, category: "medicine", title: "ยาจัดส่งสำเร็จ", desc: "ยาสมุนไพรจาก Visit #003 จัดส่งแล้ว", time: "09:30 น." },
    { id: 2, category: "document", title: "เอกสารพร้อม", desc: "ใบสรุปการรักษา Visit #003 พร้อมดาวน์โหลด", time: "11:00 น." },
  ],
  "2569-03-03": [
    { id: 3, category: "appointment", title: "นัดหมาย", desc: "Video Consultation", time: "10:00 - 11:00 น.", doctor: "นพ. สมชาย แพทย์ไทย", gender: "male" },
    { id: 4, category: "alert", title: "แจ้งเตือนยา", desc: "ถึงเวลารับประทานยาแก้ปวดสมุนไพร", time: "12:00 น." },
    { id: 5, category: "appointment", title: "นัดหมาย", desc: "Video Consultation", time: "14:30 - 15:30 น.", doctor: "นพ. วิภา สมุนไพร", gender: "female" },
  ],
  "2569-03-10": [
    { id: 6, category: "appointment", title: "นัดหมาย", desc: "Video Consultation", time: "14:30 - 15:30 น.", doctor: "นพ. วิภา สมุนไพร", gender: "female" },
    { id: 7, category: "medicine", title: "ยาใกล้หมด", desc: "ยาขมิ้นชัน capsule เหลือ 3 วัน", time: "15:00 น." },
    { id: 8, category: "appointment", title: "นัดหมาย", desc: "ตรวจที่คลินิก", time: "16:00 - 17:00 น.", doctor: "นพ. ประยุทธ สุขภาพ", gender: "male" },
  ],
  "2569-03-15": [
    { id: 9, category: "appointment", title: "นัดหมาย", desc: "Video Consultation", time: "09:00 - 10:00 น.", doctor: "นพ. ประยุทธ สุขภาพ", gender: "male" },
    { id: 10, category: "document", title: "ผลตรวจพร้อม", desc: "ผลตรวจเลือดจาก Visit #004 พร้อมดูแล้ว", time: "13:00 น." },
  ],
  "2569-03-22": [
    { id: 11, category: "appointment", title: "นัดหมาย", desc: "Video Consultation", time: "13:00 - 14:00 น.", doctor: "พญ. สุภาพร ใจดี", gender: "female" },
    { id: 12, category: "alert", title: "แจ้งเตือน", desc: "นัดติดตามผลการรักษาปวดเข่า", time: "13:00 น." },
    { id: 13, category: "medicine", title: "ยาจัดส่ง", desc: "ยาประคบสมุนไพรกำลังจัดส่ง", time: "10:00 น." },
  ],
};

const notifCategoryConfig: Record<string, { icon: typeof NotificationIcon; color: string; badgeColor: string }> = {
  appointment: { icon: CalendarIcon, color: "text-forest-leaf bg-pale-mint", badgeColor: "bg-pale-mint text-forest-leaf" },
  medicine: { icon: PillIcon, color: "text-forest-leaf bg-pale-mint", badgeColor: "bg-[#FDF3E7] text-golden-turmeric" },
  document: { icon: PaperIcon, color: "text-golden-turmeric bg-[#FDF3E7]", badgeColor: "bg-[#FDF3E7] text-golden-turmeric" },
  alert: { icon: NotificationIcon, color: "text-red-600 bg-red-50", badgeColor: "bg-red-50 text-red-600" },
};

const thaiDays = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

function getWeekDates(centerDate: Date) {
  const day = centerDate.getDay();
  const start = new Date(centerDate);
  start.setDate(start.getDate() - day);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function toThaiDateKey(d: Date) {
  const y = d.getFullYear() + 543;
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dy = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dy}`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

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
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 3));

  const today = new Date(2026, 2, 3);
  const weekDates = getWeekDates(selectedDate);
  const dateKey = toThaiDateKey(selectedDate);
  const dayNotifs = notifByDate[dateKey] ?? [];

  const shiftWeek = (dir: number) => {
    setSelectedDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + dir * 7);
      return d;
    });
  };

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
          {/* Notification bell — mobile/tablet only, opens modal */}
          <button
            className="lg:hidden relative p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setShowNotifModal(true)}
          >
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

      {/* Notification Modal — mobile/tablet only */}
      {showNotifModal && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={() => setShowNotifModal(false)}
        >
          <div
            className="bg-white rounded-t-3xl w-full h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle + Header */}
            <div className="relative px-5 pt-4 pb-2">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <h3 className="text-[#20211F] text-base font-semibold">การแจ้งเตือน</h3>
                <button
                  onClick={() => setShowNotifModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-[#20211F]" />
                </button>
              </div>
            </div>

            {/* Calendar Header */}
            <div className="flex items-center justify-between px-5 py-3 border-y border-warm-sand">
              <button onClick={() => shiftWeek(-1)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <ChevronLeft className="w-4 h-4 text-[#20211F]" />
              </button>
              <div className="text-center">
                <button
                  onClick={() => setSelectedDate(today)}
                  className="text-xs text-forest-leaf bg-pale-mint px-2.5 py-0.5 rounded-full font-medium mb-1"
                >
                  วันนี้
                </button>
                <p className="text-sm font-semibold text-[#20211F]">
                  {selectedDate.getDate()} {thaiMonths[selectedDate.getMonth()]} {selectedDate.getFullYear() + 543}
                  {" • "}
                  {thaiDays[selectedDate.getDay()]}
                </p>
              </div>
              <button onClick={() => shiftWeek(1)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <ChevronRight className="w-4 h-4 text-[#20211F]" />
              </button>
            </div>

            {/* Week Day Selector */}
            <div className="grid grid-cols-7 gap-1 px-3 py-3 border-b border-warm-sand">
              {weekDates.map((d) => {
                const isSelected = isSameDay(d, selectedDate);
                const isToday = isSameDay(d, today);
                const hasNotifs = (notifByDate[toThaiDateKey(d)] ?? []).length > 0;
                return (
                  <button
                    key={d.toISOString()}
                    onClick={() => setSelectedDate(new Date(d))}
                    className={`flex flex-col items-center py-2 rounded-xl transition-colors ${
                      isSelected
                        ? "bg-forest-leaf text-white"
                        : isToday
                          ? "bg-pale-mint text-forest-leaf"
                          : "hover:bg-gray-50 text-[#20211F]"
                    }`}
                  >
                    <span className="text-[10px] opacity-70">{thaiDays[d.getDay()]}</span>
                    <span className="text-sm font-semibold mt-0.5">{d.getDate()}</span>
                    {hasNotifs && (
                      <span className={`w-1 h-1 rounded-full mt-1 ${isSelected ? "bg-white" : "bg-forest-leaf"}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Notification List */}
            <div className="px-4 py-3 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-[#20211F]">รายการ</h4>
                {dayNotifs.length > 0 && (
                  <span className="text-xs text-muted-moss">{dayNotifs.length} รายการ</span>
                )}
              </div>
              {dayNotifs.length > 0 ? (
                <div className="space-y-2.5">
                  {dayNotifs.map((n) => {
                    const config = notifCategoryConfig[n.category];
                    const Icon = config.icon;
                    return (
                      <div key={n.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                        {n.category === "appointment" && n.doctor ? (
                          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                            <img
                              src={n.gender === "female" ? doctorFemale : doctorMale}
                              alt="doctor"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${config.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#20211F] truncate">
                            {n.category === "appointment" && n.doctor ? n.doctor : n.title}
                          </p>
                          <p className="text-xs text-muted-moss mt-0.5 truncate">{n.desc}</p>
                          <div className="flex items-center gap-1 text-[10px] text-olive-charcoal mt-1">
                            <TimeCircleIcon className="w-3 h-3" />
                            {n.time}
                          </div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${config.badgeColor}`}>
                          {n.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-moss">
                  <NotificationIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">ไม่มีการแจ้งเตือนในวันนี้</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
