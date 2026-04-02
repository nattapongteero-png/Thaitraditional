"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Heart,
} from "lucide-react";
import { TimeCircleIcon } from "../../components/TimeCircleIcon";
import { VideoIcon } from "../../components/VideoIcon";
import { CalendarIcon } from "../../components/CalendarIcon";
import { NotificationIcon } from "../../components/NotificationIcon";
import { PaperIcon } from "../../components/PaperIcon";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { HeartIcon } from "../../components/HeartIcon";
import { PillIcon } from "../../components/PillIcon";

const avatarFemale = "/images/avatar-female.png";
const avatarMale = "/images/avatar-male.png";
const doctorMale = "/images/doctor-male.png";
const doctorFemale = "/images/doctor-female.png";

const mockUser = {
  name: "นางสาว สมใจ รักสุขภาพ",
  hn: "0012345",
  gender: "female" as "female" | "male",
};

const upcomingAppointments = [
  {
    id: 1,
    doctor: "นพ. สมชาย แพทย์ไทย",
    specialty: "แพทย์แผนไทยประยุกต์",
    gender: "male",
    date: "3 มี.ค. 2569",
    time: "10:00 น.",
    type: "Video Consultation",
    status: "confirmed",
  },
  {
    id: 2,
    doctor: "นพ. วิภา สมุนไพร",
    specialty: "แพทย์แผนไทย",
    gender: "female",
    date: "10 มี.ค. 2569",
    time: "14:30 น.",
    type: "Video Consultation",
    status: "confirmed",
  },
  {
    id: 3,
    doctor: "นพ. ประยุทธ สุขภาพ",
    specialty: "แพทย์แผนไทยประยุกต์",
    gender: "male",
    date: "15 มี.ค. 2569",
    time: "09:00 น.",
    type: "Video Consultation",
    status: "pending",
  },
  {
    id: 4,
    doctor: "พญ. สุภาพร ใจดี",
    specialty: "แพทย์แผนไทย",
    gender: "female",
    date: "22 มี.ค. 2569",
    time: "13:00 น.",
    type: "Video Consultation",
    status: "confirmed",
  },
];

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
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function Page() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 3)); // 3 มี.ค. 2569

  const weekDates = getWeekDates(selectedDate);
  const today = new Date(2026, 2, 3);
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
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-forest-leaf to-teal-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute right-12 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />

        {/* Gender avatar */}
        <div className="absolute right-2 bottom-0 h-[140%] w-44 pointer-events-none select-none">
          <ImageWithFallback
            src={mockUser.gender === "female" ? avatarFemale : avatarMale}
            alt="user avatar"
            className="w-full h-full object-contain object-bottom drop-shadow-xl scale-125 origin-bottom"
          />
        </div>

        <div className="relative z-10 pr-36">
          <p className="text-pale-mint text-sm">สวัสดี,</p>
          <h2 className="text-white mt-0.5">นางสาว สมใจ รักสุขภาพ</h2>
          <p className="text-pale-mint text-sm mt-1">HN: 0012345 • วันจันทร์ที่ 2 มีนาคม 2569</p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/patient/appointment")}
              className="flex items-center gap-2 bg-white text-forest-leaf px-4 py-2 rounded-xl text-sm font-semibold hover:bg-pale-mint transition-colors shadow-sm"
            >
              <CalendarIcon className="w-4 h-4" />
              จองนัดหมาย
            </button>
            <button
              onClick={() => router.push("/patient/waiting-room")}
              className="flex items-center gap-2 bg-white/20 text-white border border-white/30 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-white/30 transition-colors"
            >
              <VideoIcon className="w-4 h-4" />
              เข้าห้องรอ
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column — wider */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-warm-sand">
              <h3 className="text-[#20211F]">นัดหมายที่กำลังจะถึง</h3>
              <button
                onClick={() => router.push("/patient/appointment")}
                className="text-forest-leaf text-sm hover:underline flex items-center gap-1"
              >
                ดูทั้งหมด <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex gap-4 overflow-x-auto p-1 -m-1">
                {upcomingAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="flex-shrink-0 w-40 rounded-2xl border border-[#f5f5f5] shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => appt.status === "confirmed" ? router.push("/patient/waiting-room") : undefined}
                  >
                    <div className="relative">
                      <div className="h-[120px] bg-[#f8f8f8] overflow-hidden rounded-t-2xl">
                        <img
                          src={appt.gender === "female" ? doctorFemale : doctorMale}
                          alt="doctor"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <span
                        className={`absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          appt.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-[#FDF3E7] text-golden-turmeric"
                        }`}
                      >
                        {appt.status === "confirmed" ? "ยืนยันแล้ว" : "รอยืนยัน"}
                      </span>
                    </div>
                    <div className="border-t border-[#f0f0f0]" />
                    <div className="px-3 py-2.5">
                      <p className="font-semibold text-[#20211F] text-xs truncate">{appt.doctor}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1 text-[10px] text-olive-charcoal">
                          <CalendarIcon className="w-3 h-3" />
                          {appt.date}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-olive-charcoal">
                          <TimeCircleIcon className="w-3 h-3" />
                          {appt.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Health Tips */}
          <div className="bg-gradient-to-r from-pale-mint/40 to-pale-mint/20 border border-pale-mint rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-pale-mint rounded-xl flex items-center justify-center flex-shrink-0">
                <HeartIcon className="w-5 h-5 text-forest-leaf" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-[#20211F]">คำแนะนำสุขภาพจากแพทย์</h4>
                  <span className="bg-pale-mint text-forest-leaf text-xs px-2 py-0.5 rounded-full">Visit #003</span>
                </div>
                <p className="text-olive-charcoal text-sm mt-1 leading-relaxed">
                  ควรดื่มน้ำอย่างน้อย 8 แก้วต่อวัน รับประทานยาสมุนไพรตามที่แพทย์สั่งหลังอาหาร
                  และพักผ่อนให้เพียงพออย่างน้อย 7–8 ชั่วโมงต่อคืน
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <TrendingUp className="w-4 h-4 text-forest-leaf" />
                  <span className="text-xs text-forest-leaf font-medium">นัดติดตามผล: 10 มี.ค. 2569</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — calendar & notifications, sticky full-height */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-0 lg:h-[calc(100vh-6rem)] lg:max-h-[calc(100vh-6rem)] bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
            {/* Calendar Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-warm-sand">
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
                    className={`flex flex-col items-center py-2 rounded-xl transition-colors relative ${
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

            {/* Notification List for Selected Date */}
            <div className="px-4 py-3 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-[#20211F]">การแจ้งเตือน</h4>
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
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-medium text-[#20211F] truncate">
                              {n.category === "appointment" && n.doctor ? n.doctor : n.title}
                            </p>
                          </div>
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
      </div>
    </div>
  );
}
