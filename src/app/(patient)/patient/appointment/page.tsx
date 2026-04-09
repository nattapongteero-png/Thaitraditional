"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Stethoscope,
  RefreshCw,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { DeleteIcon } from "../../../components/DeleteIcon";
import { RescheduleCalendarIcon } from "../../../components/RescheduleCalendarIcon";
import { VideoIcon } from "../../../components/VideoIcon";
import { CalendarIcon } from "../../../components/CalendarIcon";
import { TimeCircleIcon } from "../../../components/TimeCircleIcon";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";

const avatarDoctorMale = "/images/doctor-male.png";
const avatarDoctorFemale = "/images/doctor-female.png";

const doctors = [
  {
    id: 1,
    name: "นพ. สมชาย แพทย์ไทย",
    specialty: "แพทย์แผนไทยประยุกต์",
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 2,
    name: "นพ. วิภา สมุนไพร",
    specialty: "แพทย์แผนไทย",
    rating: 4.8,
    reviews: 95,
  },
  {
    id: 3,
    name: "นพ. ประยุทธ สุขภาพ",
    specialty: "แพทย์แผนไทยเฉพาะทาง",
    rating: 4.7,
    reviews: 67,
  },
];

const daysOfWeek = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const months = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

const upcomingAppointments = [
  {
    id: "APT-0342",
    doctor: "นพ. สมชาย แพทย์ไทย",
    specialty: "แพทย์แผนไทยประยุกต์",
    gender: "male",
    day: 15,
    month: 2,
    year: 2026,
    time: "10:00",
    type: "Video Consultation",
    status: "confirmed",
    rescheduleCount: 0,
  },
  {
    id: "APT-0341",
    doctor: "นพ. วิภา สมุนไพร",
    specialty: "แพทย์แผนไทย",
    gender: "female",
    day: 22,
    month: 2,
    year: 2026,
    time: "14:30",
    type: "Video Consultation",
    status: "confirmed",
    rescheduleCount: 1,
  },
  {
    id: "APT-0340",
    doctor: "นพ. ประยุทธ สุขภาพ",
    specialty: "แพทย์แผนไทยเฉพาะทาง",
    gender: "male",
    day: 28,
    month: 2,
    year: 2026,
    time: "09:30",
    type: "Video Consultation",
    status: "pending",
    rescheduleCount: 0,
  },
];

export default function Page() {
  const router = useRouter();
  const today = new Date(2026, 2, 2); // March 2, 2026
  const [tab, setTab] = useState<"my" | "book">("my");

  // booking state
  const [currentMonth, setCurrentMonth] = useState(2);
  const [currentYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number | null>(
    null,
  );
  const [selectedDoctor, setSelectedDoctor] = useState<
    number | null
  >(null);
  const [selectedTime, setSelectedTime] = useState<
    string | null
  >(null);
  const [step, setStep] = useState<
    "select" | "confirm" | "done"
  >("select");
  const [reason, setReason] = useState("");
  const [cancelTarget, setCancelTarget] = useState<typeof upcomingAppointments[0] | null>(null);
  const [mobileBookOpen, setMobileBookOpen] = useState(false);
  const [mobileBookStep, setMobileBookStep] = useState<"calendar" | "doctor" | "confirm">("calendar");

  const todayDay = today.getDate();
  const selectedDoctorData = doctors.find(
    (d) => d.id === selectedDoctor,
  );
  const canProceed =
    selectedDay && selectedDoctor && selectedTime;

  const resetBooking = () => {
    setStep("select");
    setSelectedDay(null);
    setSelectedTime(null);
    setSelectedDoctor(null);
    setReason("");
    setTab("my");
    setMobileBookOpen(false);
    setMobileBookStep("calendar");
  };

  // Success popup overlay (shown on top of current view)
  const successPopup = step === "done" && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={resetBooking} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 flex flex-col items-center gap-3">
        <button onClick={resetBooking} className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-sm text-[#20211F] leading-none">✕</span>
        </button>
        <div className="w-16 h-16 bg-pale-mint rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-forest-leaf" />
        </div>
        <h3 className="text-[#20211F] text-base font-semibold">จองนัดหมายสำเร็จ!</h3>
        <p className="text-muted-moss text-sm text-center">
          ระบบจะส่งการยืนยันผ่าน SMS และอีเมลภายใน 5 นาที
        </p>
        <div className="w-full bg-gray-50 rounded-xl p-4 space-y-2 mt-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-moss">แพทย์</span>
            <span className="text-[#20211F] font-medium">{selectedDoctorData?.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-moss">วันที่</span>
            <span className="text-[#20211F] font-medium">{selectedDay} {months[currentMonth]} {currentYear + 543}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-moss">เวลา</span>
            <span className="text-[#20211F] font-medium">{selectedTime} น.</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-moss">ประเภท</span>
            <span className="text-[#20211F] font-medium">Video Consultation</span>
          </div>
        </div>
        <div className="flex gap-3 w-full mt-2">
          <button onClick={resetBooking} className="flex-1 py-2.5 rounded-xl border border-border text-olive-charcoal text-sm font-medium hover:bg-pale-mint transition-colors">
            ปิด
          </button>
          <button onClick={resetBooking} className="flex-1 py-2.5 rounded-xl bg-forest-leaf text-white text-sm font-semibold hover:bg-emerald-800 transition-colors">
            ดูนัดหมายของฉัน
          </button>
        </div>
      </div>
    </div>
  );

  // Confirm step is now handled inside bottom sheet (mobile) or inline (desktop)
  // Desktop confirm page
  if (step === "confirm" && canProceed && !mobileBookOpen) {
    return (
      <>
      <div className="pb-24 sm:pb-0">
        <h2 className="text-[#20211F] mb-6">ยืนยันการนัดหมาย</h2>
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-warm-sand">
            <div className="w-12 h-12 bg-pale-mint rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-forest-leaf" />
            </div>
            <div>
              <p className="font-semibold text-[#20211F]">{selectedDoctorData?.name}</p>
              <p className="text-sm text-muted-moss">{selectedDoctorData?.specialty}</p>
            </div>
          </div>
          {[
            { label: "วันที่", value: `${selectedDay} ${months[currentMonth]} ${currentYear + 543}`, icon: CalendarIcon },
            { label: "เวลา", value: `${selectedTime} น.`, icon: TimeCircleIcon },
            { label: "ประเภทการพบ", value: "Video Consultation", icon: VideoIcon },
          ].map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.label} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-moss" />
                <span className="text-muted-moss text-sm flex-1">{row.label}</span>
                <span className="text-[#20211F] text-sm font-medium">{row.value}</span>
              </div>
            );
          })}
          <div className="pt-2">
            <label className="text-sm text-olive-charcoal block mb-1.5">อาการ/เหตุผลในการพบแพทย์</label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="อธิบายอาการหรือเหตุผลในการนัดหมาย..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-warm-sand focus:outline-none focus:ring-2 focus:ring-forest-leaf text-sm resize-none"
            />
          </div>
        </div>
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800"><strong>โปรดทราบ:</strong> กรุณาเตรียมบัตรประชาชนและพร้อมในระบบก่อนเวลานัดหมาย 5 นาที</p>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={() => setStep("select")} className="flex-1 py-3 border border-border text-olive-charcoal rounded-xl font-medium hover:bg-pale-mint transition-colors bg-white">แก้ไข</button>
          <button onClick={() => setStep("done")} className="flex-1 py-3 bg-forest-leaf text-white rounded-xl font-semibold hover:bg-forest-leaf-hover transition-colors">ยืนยันนัดหมาย</button>
        </div>
      </div>
      {successPopup}
      </>
    );
  }

  // ── Tab: นัดหมายของฉัน ───────────────────────────────────────
  if (tab === "my") {
    return (
      <>
      <div className="space-y-5">
        {/* header */}
        <div>
          <h2 className="text-[#20211F]">นัดหมาย</h2>
          <p className="text-muted-moss text-sm mt-0.5">
            จัดการนัดหมายทั้งหมดของคุณ
          </p>
        </div>

        {/* tab switcher */}


        {/* add new CTA — desktop goes to book tab, mobile opens bottom sheet */}
        <button
          onClick={() => {
            // Reset booking state
            setSelectedDay(null);
            setSelectedTime(null);
            setSelectedDoctor(null);
            setStep("select");
            // Desktop: switch tab, Mobile: open bottom sheet
            if (window.innerWidth >= 1024) {
              setTab("book");
            } else {
              setMobileBookOpen(true);
              setMobileBookStep("calendar");
            }
          }}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-300 text-gray-500 text-sm font-medium hover:bg-gray-50 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <CalendarIcon className="w-4 h-4" />จองนัดหมายใหม่
        </button>

        {/* upcoming count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-moss">
            นัดหมายที่กำลังจะมาถึง{" "}
            <span className="font-semibold text-[#20211F]">
              {upcomingAppointments.length} รายการ
            </span>
          </p>
        </div>

        {/* appointment cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingAppointments.map((apt) => (
            <div
              key={apt.id}
              className="group bg-white rounded-[24px] overflow-hidden shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
            >
              {/* Header gradient – matches home page banner style */}
              <div
                className={`mx-[6.5px] mt-[6px] rounded-[20px] pl-4 pr-24 py-4 relative overflow-hidden ${
                  apt.status === "confirmed"
                    ? "bg-gradient-to-r from-forest-leaf to-teal-600"
                    : "bg-gradient-to-r from-amber-700 to-amber-500"
                }`}
              >
                {/* Decorative circles like home banner */}
                <div className="absolute right-0 top-0 w-28 h-28 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="absolute right-16 bottom-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2" />

                {/* Doctor avatar */}
                <div className="absolute -right-2 bottom-0 h-[170%] w-32 pointer-events-none select-none">
                  <ImageWithFallback
                    src={apt.gender === "female" ? avatarDoctorFemale : avatarDoctorMale}
                    alt="doctor avatar"
                    className="w-full h-full object-contain object-bottom drop-shadow-lg origin-bottom transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Status badge */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                    {apt.status === "confirmed"
                      ? "ยืนยันแล้ว"
                      : "รอยืนยัน"}
                  </span>
                  {apt.rescheduleCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                      <RefreshCw className="w-3 h-3" />
                      เลื่อนนัดแล้ว {apt.rescheduleCount}/2 ครั้ง
                    </span>
                  )}
                </div>

                {/* Doctor name */}
                <p className="font-bold text-white mt-[14px] text-[18px] leading-tight">
                  {apt.doctor}
                </p>
                <p className="text-sm text-white/70 mt-1">
                  {apt.specialty}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mt-[12px] text-xs">
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-white/70" />
                    <span className="text-white/90">
                      {apt.day} {months[apt.month]}{" "}
                      {apt.year + 543}
                    </span>
                  </div>
                  <span className="text-white/50">•</span>
                  <div className="flex items-center gap-1.5">
                    <TimeCircleIcon className="w-3.5 h-3.5 text-white/70" />
                    <span className="text-white/90">
                      {apt.time} น.
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <VideoIcon className="w-3.5 h-3.5 text-white/70" />
                    <span className="text-white/90">
                      {apt.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom action bar – white bg */}
              <div className="flex items-center justify-between px-4 h-16">

                <div className="flex gap-2">
                  {apt.rescheduleCount < 2 ? (
                    <button
                      onClick={() =>
                        router.push(`/patient/reschedule?aptId=${apt.id}`)
                      }
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-[14px] text-sm font-medium transition-colors text-white ${
                        apt.status === "confirmed"
                          ? "bg-forest-leaf hover:bg-emerald-800"
                          : "bg-amber-500 hover:bg-amber-600"
                      }`}
                    >
                      <RescheduleCalendarIcon className="w-3.5 h-3.5" />
                      เลื่อนนัด
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 px-4 py-2 rounded-[14px] bg-gray-200 text-muted-moss text-sm">
                      <XCircle className="w-3.5 h-3.5" />
                      เลื่อนนัดครบ 2 ครั้ง
                    </span>
                  )}
                  <button
                    onClick={() => setCancelTarget(apt)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-[14px] text-sm font-medium transition-colors text-red-600 bg-red-50 hover:bg-red-100 border border-red-100"
                  >
                    <DeleteIcon className="w-3.5 h-3.5" />
                    ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Cancel Confirmation Modal */}
      {cancelTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCancelTarget(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 flex flex-col items-center gap-4">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>
            <div className="text-center">
              <h3 className="text-[#20211F] text-base font-semibold">ยืนยันการยกเลิกนัด?</h3>
              <p className="text-muted-moss text-sm mt-1">
                นัดหมายกับ <span className="font-medium text-olive-charcoal">{cancelTarget.doctor}</span>
              </p>
              <p className="text-muted-moss text-sm">
                วันที่ {cancelTarget.day} {months[cancelTarget.month]} {cancelTarget.year + 543} เวลา {cancelTarget.time} น.
              </p>
              <p className="text-red-500 text-xs mt-2">การยกเลิกนี้ไม่สามารถย้อนกลับได้</p>
            </div>
            <div className="flex gap-3 w-full mt-1">
              <button
                onClick={() => setCancelTarget(null)}
                className="flex-1 py-2.5 rounded-xl border border-border text-olive-charcoal text-sm font-medium hover:bg-pale-mint transition-colors"
              >
                ไม่ยกเลิก
              </button>
              <button
                onClick={() => setCancelTarget(null)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
              >
                ยืนยันยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Booking Bottom Sheet */}
      {mobileBookOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={() => setMobileBookOpen(false)}
        >
          <div
            className="bg-white rounded-t-3xl w-full h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle + Header */}
            <div className="relative px-5 pt-4 pb-3 border-b border-warm-sand flex-shrink-0">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {mobileBookStep !== "calendar" && (
                    <button
                      onClick={() => setMobileBookStep(mobileBookStep === "confirm" ? "doctor" : "calendar")}
                      className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#20211F]" />
                    </button>
                  )}
                  <div>
                    <h3 className="text-[#20211F] text-base font-semibold">
                      {mobileBookStep === "calendar" ? "เลือกวันและเวลา" : mobileBookStep === "doctor" ? "เลือกแพทย์" : "ยืนยันการนัดหมาย"}
                    </h3>
                    {mobileBookStep !== "calendar" && selectedDay && selectedTime && (
                      <p className="text-xs text-muted-moss mt-0.5">
                        {selectedDay} {months[currentMonth]} {currentYear + 543} • {selectedTime} น.
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setMobileBookOpen(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <span className="text-sm text-[#20211F] leading-none">✕</span>
                </button>
              </div>
            </div>

            {/* Page Views */}
            <div className="flex-1 overflow-hidden relative">
              {/* Step 1: Calendar + Time — fixed layout */}
              <div className={`absolute inset-0 flex flex-col transition-transform duration-300 ${
                mobileBookStep === "calendar" ? "translate-x-0" : "-translate-x-full"
              }`}>
                {/* Month Header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border flex-shrink-0">
                  <button onClick={() => setCurrentMonth((m) => Math.max(0, m - 1))} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="w-4 h-4 text-[#20211F]" />
                  </button>
                  <p className="text-sm font-semibold text-[#20211F]">{months[currentMonth]} {currentYear + 543}</p>
                  <button onClick={() => setCurrentMonth((m) => Math.min(11, m + 1))} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronRight className="w-4 h-4 text-[#20211F]" />
                  </button>
                </div>

                {/* Calendar */}
                <div className="px-4 pt-2 pb-1 flex-shrink-0 flex-1 flex flex-col justify-center">
                  <div className="grid grid-cols-7 gap-2 mb-1">
                    {daysOfWeek.map((d) => (
                      <div key={d} className="text-center text-[10px] text-muted-moss font-medium py-1">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {(() => {
                      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
                      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                      const cells: (number | null)[] = [];
                      for (let i = 0; i < firstDay; i++) cells.push(null);
                      for (let d = 1; d <= daysInMonth; d++) cells.push(d);
                      return cells.map((day, i) => {
                        const isToday = day === todayDay && currentMonth === 2;
                        const isPast = day !== null && day < todayDay && currentMonth === 2;
                        const isSelected = day === selectedDay;
                        return (
                          <button
                            key={i}
                            disabled={!day || isPast}
                            onClick={() => { if (day) { setSelectedDay(day); setSelectedTime(null); setSelectedDoctor(null); } }}
                            className={`text-center text-sm py-3.5 rounded-xl transition-all
                              ${!day ? "invisible" : ""}
                              ${isPast ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}
                              ${isSelected ? "bg-forest-leaf text-white font-semibold" : ""}
                              ${isToday && !isSelected ? "bg-pale-mint text-forest-leaf font-semibold" : ""}
                              ${!isSelected && !isToday && !isPast && day ? "hover:bg-pale-mint" : ""}
                            `}
                          >
                            {day}
                          </button>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Time Slots — fills remaining */}
                <div className="border-t border-border flex-1 overflow-y-auto px-4 py-3 flex flex-col justify-center">
                  <p className="text-sm font-semibold text-[#20211F] mb-2">เลือกเวลา</p>
                  <div className="grid grid-cols-4 gap-3">
                    {["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"].map((slot) => {
                      const isSlotSelected = slot === selectedTime;
                      return (
                        <button
                          key={slot}
                          disabled={!selectedDay}
                          onClick={() => { setSelectedTime(slot); setSelectedDoctor(null); }}
                          className={`py-3 rounded-xl text-sm transition-all ${
                            !selectedDay
                              ? "border border-gray-200 text-gray-300 cursor-not-allowed"
                              : isSlotSelected
                                ? "bg-forest-leaf text-white font-semibold"
                                : "border border-border hover:border-forest-leaf hover:bg-pale-mint text-olive-charcoal"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Next Button */}
                <div className="p-4 border-t border-warm-sand flex-shrink-0">
                  <button
                    disabled={!selectedDay || !selectedTime}
                    onClick={() => setMobileBookStep("doctor")}
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors ${
                      selectedDay && selectedTime
                        ? "bg-forest-leaf text-white hover:bg-emerald-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    เลือกแพทย์
                  </button>
                </div>
              </div>

              {/* Step 2: Doctor */}
              <div className={`absolute inset-0 flex flex-col transition-transform duration-300 ${
                mobileBookStep === "doctor" ? "translate-x-0" : mobileBookStep === "calendar" ? "translate-x-full" : "-translate-x-full"
              }`}>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {doctors.map((doc) => {
                    const isDocSelected = doc.id === selectedDoctor;
                    return (
                      <button
                        key={doc.id}
                        onClick={() => setSelectedDoctor(doc.id)}
                        className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                          isDocSelected ? "border-forest-leaf bg-pale-mint" : "border-border hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isDocSelected ? "bg-pale-mint" : "bg-gray-100"}`}>
                            <Stethoscope className={`w-5 h-5 ${isDocSelected ? "text-forest-leaf" : "text-muted-moss"}`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#20211F]">{doc.name}</p>
                            <p className="text-xs text-muted-moss">{doc.specialty}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-amber-400 text-xs">★</span>
                              <span className="text-xs text-olive-charcoal">{doc.rating}</span>
                              <span className="text-xs text-muted-moss">({doc.reviews})</span>
                            </div>
                          </div>
                          {isDocSelected && <Check className="w-5 h-5 text-forest-leaf flex-shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="p-4 border-t border-warm-sand flex-shrink-0">
                  <button
                    disabled={!canProceed}
                    onClick={() => setMobileBookStep("confirm")}
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors ${
                      canProceed
                        ? "bg-forest-leaf text-white hover:bg-emerald-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    ต่อไป
                  </button>
                </div>
              </div>

              {/* Step 3: Confirm */}
              <div className={`absolute inset-0 flex flex-col transition-transform duration-300 ${
                mobileBookStep === "confirm" ? "translate-x-0" : "translate-x-full"
              }`}>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="bg-white rounded-xl border border-border p-4 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-warm-sand">
                      <div className="w-10 h-10 bg-pale-mint rounded-xl flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-forest-leaf" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#20211F] text-sm">{selectedDoctorData?.name}</p>
                        <p className="text-xs text-muted-moss">{selectedDoctorData?.specialty}</p>
                      </div>
                    </div>
                    {[
                      { label: "วันที่", value: `${selectedDay} ${months[currentMonth]} ${currentYear + 543}`, icon: CalendarIcon },
                      { label: "เวลา", value: `${selectedTime} น.`, icon: TimeCircleIcon },
                      { label: "ประเภท", value: "Video Consultation", icon: VideoIcon },
                    ].map((row) => {
                      const Icon = row.icon;
                      return (
                        <div key={row.label} className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-muted-moss" />
                          <span className="text-muted-moss text-sm flex-1">{row.label}</span>
                          <span className="text-[#20211F] text-sm font-medium">{row.value}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <label className="text-sm text-olive-charcoal block mb-1.5">อาการ/เหตุผลในการพบแพทย์</label>
                    <textarea
                      rows={3}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="อธิบายอาการหรือเหตุผลในการนัดหมาย..."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-forest-leaf text-sm resize-none"
                    />
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-xs text-amber-800"><strong>โปรดทราบ:</strong> กรุณาเตรียมบัตรประชาชนและพร้อมในระบบก่อนเวลานัดหมาย 5 นาที</p>
                  </div>
                </div>
                <div className="p-4 border-t border-warm-sand flex-shrink-0">
                  <button
                    onClick={() => { setMobileBookOpen(false); setStep("done"); }}
                    className="w-full py-3 bg-forest-leaf text-white rounded-xl text-sm font-semibold hover:bg-emerald-800 transition-colors"
                  >
                    ยืนยันนัดหมาย
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {successPopup}
      </>
    );
  }

  // ── Tab: จองนัดใหม่ — Month x 24h Grid ─────────────────────
  const scheduleHours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
  const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const monthDays = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

  // Mock: slots ที่เต็มแล้ว (day-hour)
  const fullyBookedSlots = new Set([
    "3-09:00", "3-10:00", "3-14:00",
    "5-09:00", "5-10:00", "5-11:00",
    "10-13:00", "10-14:00",
    "15-09:00",
    "20-10:00", "20-11:00", "20-14:00", "20-15:00",
    "22-09:00", "22-10:00", "22-11:00", "22-13:00", "22-14:00", "22-15:00",
    "25-10:00",
    "28-09:00", "28-10:00",
  ]);

  const isSlotFull = (day: number, hour: string) => fullyBookedSlots.has(`${day}-${hour}`);

  const showDoctorPanel = selectedDay !== null && selectedTime !== null;

  const doctorPanelContent = (
    <div className="space-y-3">
      {showDoctorPanel ? (
        <>
          {doctors.map((doc) => {
            const isDocSelected = doc.id === selectedDoctor;
            return (
              <button
                key={doc.id}
                onClick={() => setSelectedDoctor(doc.id)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                  isDocSelected ? "border-forest-leaf bg-pale-mint" : "border-border hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isDocSelected ? "bg-pale-mint" : "bg-gray-100"}`}>
                    <Stethoscope className={`w-5 h-5 ${isDocSelected ? "text-forest-leaf" : "text-muted-moss"}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#20211F]">{doc.name}</p>
                    <p className="text-xs text-muted-moss">{doc.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-amber-400 text-xs">★</span>
                      <span className="text-xs text-olive-charcoal">{doc.rating}</span>
                      <span className="text-xs text-muted-moss">({doc.reviews})</span>
                    </div>
                  </div>
                  {isDocSelected && <Check className="w-5 h-5 text-forest-leaf flex-shrink-0" />}
                </div>
              </button>
            );
          })}
          {canProceed && (
            <button
              onClick={() => setStep("confirm")}
              className="w-full py-3 bg-forest-leaf text-white rounded-xl text-sm font-semibold hover:bg-emerald-800 transition-colors mt-1"
            >
              ต่อไป
            </button>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center py-12">
          <div className="text-center text-muted-moss">
            <CalendarIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">กรุณาเลือกวันที่และเวลา</p>
            <p className="text-sm">เพื่อทำการพบแพทย์</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="-mx-4 lg:-mx-6 -mb-24 flex flex-col" style={{ height: "calc(100vh - 3.5rem)" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 lg:px-6 py-3 flex-shrink-0">
        <button onClick={() => setTab("my")} className="p-1.5 hover:bg-pale-mint rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5 text-muted-moss" />
        </button>
        <div className="flex-1">
          <h2 className="text-[#20211F]">จองนัดหมายใหม่</h2>
          <p className="text-muted-moss text-sm mt-0.5">เลือกวัน เวลา และแพทย์ที่ต้องการ</p>
        </div>
        {/* Month nav */}
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentMonth((m) => Math.max(0, m - 1))} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-4 h-4 text-[#20211F]" />
          </button>
          <p className="text-sm font-semibold text-[#20211F] min-w-[120px] text-center">
            {months[currentMonth]} {currentYear + 543}
          </p>
          <button onClick={() => setCurrentMonth((m) => Math.min(11, m + 1))} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronRight className="w-4 h-4 text-[#20211F]" />
          </button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="flex-1 relative bg-white border-t border-border overflow-auto">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `56px repeat(${daysInCurrentMonth}, minmax(72px, 1fr))`,
            gridTemplateRows: `auto repeat(${scheduleHours.length}, 52px)`,
          }}
        >
          {/* Top-left corner — sticky both */}
          <div className="sticky top-0 left-0 z-30 bg-white border-b border-r border-border" />

          {/* Day headers — sticky top */}
          {monthDays.map((day) => {
            const date = new Date(currentYear, currentMonth, day);
            const dayName = daysOfWeek[date.getDay()];
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isToday = day === todayDay && currentMonth === 2;
            const isDaySelected = day === selectedDay;
            return (
              <div
                key={`h-${day}`}
                className={`sticky top-0 z-20 border-b border-r border-border text-center py-2.5 cursor-pointer transition-colors ${
                  isDaySelected ? "bg-forest-leaf/5" : isWeekend ? "bg-gray-50" : "bg-white"
                }`}
                onClick={() => { setSelectedDay(day); setSelectedTime(null); setSelectedDoctor(null); }}
              >
                <p className={`text-[10px] ${isWeekend ? "text-red-400" : "text-muted-moss"}`}>{dayName}</p>
                <p className={`text-xs font-semibold mt-0.5 w-7 h-7 rounded-full flex items-center justify-center mx-auto ${
                  isDaySelected
                    ? "bg-forest-leaf text-white"
                    : isToday
                      ? "bg-pale-mint text-forest-leaf"
                      : "text-[#20211F]"
                }`}>
                  {day}
                </p>
              </div>
            );
          })}

          {/* Rows: time label + cells */}
          {scheduleHours.flatMap((hour) => {
            const isHourSelected = hour === selectedTime;
            return [
            <div
              key={`t-${hour}`}
              className={`sticky left-0 z-10 border-b border-r border-border text-[11px] flex items-center justify-center font-medium ${
                isHourSelected ? "bg-forest-leaf/5 text-forest-leaf" : "bg-white text-muted-moss"
              }`}
            >
              {hour}
            </div>,
            ...monthDays.map((day) => {
              const isFull = isSlotFull(day, hour);
              const isCellSelected = day === selectedDay && hour === selectedTime;
              const isPast = currentMonth === 2 && day < todayDay;
              const date = new Date(currentYear, currentMonth, day);
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              const isDaySelected = day === selectedDay;
              const isDisabled = isPast || isFull;
              return (
                <div
                  key={`${day}-${hour}`}
                  className={`border-b border-r border-border transition-colors relative ${
                    isDisabled
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } ${
                    isCellSelected && !isFull
                      ? "bg-forest-leaf/15 ring-2 ring-inset ring-forest-leaf/60"
                      : isFull
                        ? "bg-red-50/60"
                        : isPast
                          ? "bg-gray-100/60"
                          : isDaySelected && isHourSelected
                            ? "bg-forest-leaf/[0.06]"
                            : isDaySelected
                              ? "bg-forest-leaf/[0.03]"
                              : isHourSelected
                                ? "bg-forest-leaf/[0.03]"
                                : isWeekend
                                  ? "bg-gray-50/50 hover:bg-pale-mint/30"
                                  : "hover:bg-pale-mint/30"
                  }`}
                  onClick={() => {
                    if (isDisabled) return;
                    if (day === selectedDay && hour === selectedTime) {
                      setSelectedTime(null);
                      setSelectedDoctor(null);
                      return;
                    }
                    setSelectedDay(day);
                    setSelectedTime(hour);
                    setSelectedDoctor(null);
                  }}
                >
                  {isFull && (
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] text-red-400 font-medium">เต็ม</span>
                  )}
                </div>
              );
            }),
          ];})}
        </div>

        {/* Floating Doctor Panel — desktop, show when day+time selected */}
        {showDoctorPanel && <div className="hidden lg:flex flex-col fixed top-[9.5rem] right-10 w-72 z-20 bg-white rounded-2xl border border-border shadow-xl max-h-[calc(100vh-12rem)] overflow-hidden">
          <div className="px-4 py-3 border-b border-warm-sand flex-shrink-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-[#20211F]">เลือกแพทย์</h4>
              {showDoctorPanel && (
                <button
                  onClick={() => { setSelectedTime(null); setSelectedDoctor(null); }}
                  className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <span className="text-xs text-[#20211F] leading-none">✕</span>
                </button>
              )}
            </div>
            {showDoctorPanel && (
              <p className="text-xs text-muted-moss mt-1">
                {selectedDay} {months[currentMonth]} {currentYear + 543} • {selectedTime} น.
              </p>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {doctorPanelContent}
          </div>
        </div>}
      </div>

      {/* Mobile: Doctor Bottom Sheet */}
      {showDoctorPanel && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={() => { setSelectedTime(null); setSelectedDoctor(null); }}
        >
          <div
            className="bg-white rounded-t-3xl w-full max-h-[70vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative px-5 pt-4 pb-3 border-b border-warm-sand flex-shrink-0">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[#20211F] text-base font-semibold">เลือกแพทย์</h3>
                  <p className="text-xs text-muted-moss mt-1">
                    {selectedDay} {months[currentMonth]} {currentYear + 543} • {selectedTime} น.
                  </p>
                </div>
                <button
                  onClick={() => { setSelectedTime(null); setSelectedDoctor(null); }}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <span className="text-sm text-[#20211F] leading-none">✕</span>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {doctorPanelContent}
            </div>
          </div>
        </div>
      )}

      {successPopup}
    </div>
  );
}
