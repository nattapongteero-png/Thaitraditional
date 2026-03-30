"use client";

import { useRouter } from "next/navigation";
import {
  ChevronRight,
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
    status: "pending",
  },
];

const notifications = [
  {
    id: 1,
    icon: NotificationIcon,
    color: "text-blue-500 bg-blue-50",
    title: "ยืนยันนัดหมาย",
    desc: "นัดหมายวันที่ 3 มี.ค. ได้รับการยืนยันแล้ว",
    time: "30 นาทีที่แล้ว",
  },
  {
    id: 2,
    icon: PillIcon,
    color: "text-forest-leaf bg-pale-mint",
    title: "ยาจัดส่งสำเร็จ",
    desc: "ยาสมุนไพรที่สั่งจาก Visit #003 จัดส่งแล้ว",
    time: "2 ชั่วโมงที่แล้ว",
  },
  {
    id: 3,
    icon: PaperIcon,
    color: "text-amber-500 bg-amber-50",
    title: "เอกสารพร้อม",
    desc: "ใบสรุปการรักษา Visit #003 พร้อมดาวน์โหลด",
    time: "เมื่อวานนี้",
  },
];

export default function Page() {
  const router = useRouter();

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-warm-sand">
            <h3 className="text-deep-emerald">นัดหมายที่กำลังจะถึง</h3>
            <button
              onClick={() => router.push("/patient/appointment")}
              className="text-forest-leaf text-sm hover:underline flex items-center gap-1"
            >
              ดูทั้งหมด <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-warm-sand">
            {upcomingAppointments.map((appt) => (
              <div key={appt.id} className="px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-[14px] overflow-hidden flex-shrink-0 ${appt.status === "confirmed" ? "bg-[#d0fae5]" : "bg-amber-100"}`}>
                    <img
                      src={appt.gender === "female" ? doctorFemale : doctorMale}
                      alt="doctor"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-deep-emerald text-sm">{appt.doctor}</p>
                    <p className="text-muted-moss text-xs">{appt.specialty}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-xs text-olive-charcoal">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {appt.date}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-olive-charcoal">
                        <TimeCircleIcon className="w-3.5 h-3.5" />
                        {appt.time}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-lg font-medium flex-shrink-0 ${
                      appt.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {appt.status === "confirmed" ? "ยืนยันแล้ว" : "รอยืนยัน"}
                  </span>
                </div>
                {appt.status === "confirmed" && (
                  <button
                    onClick={() => router.push("/patient/waiting-room")}
                    className="mt-3 w-full py-2 bg-forest-leaf hover:bg-forest-leaf-hover text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    เข้าห้องรอพบแพทย์
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-warm-sand">
            <h3 className="text-deep-emerald">การแจ้งเตือน</h3>
            <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">3 ใหม่</span>
          </div>
          <div className="divide-y divide-warm-sand">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div key={n.id} className="px-5 py-4 flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${n.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-deep-emerald">{n.title}</p>
                    <p className="text-xs text-muted-moss mt-0.5">{n.desc}</p>
                  </div>
                  <span className="text-xs text-muted-moss flex-shrink-0">{n.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Health Tips */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <HeartIcon className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-deep-emerald">คำแนะนำสุขภาพจากแพทย์</h4>
              <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">Visit #003</span>
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
  );
}
