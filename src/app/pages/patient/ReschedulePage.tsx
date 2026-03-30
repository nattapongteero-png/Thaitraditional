import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Stethoscope,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { TimeCircleIcon } from "../../components/TimeCircleIcon";
import { CalendarIcon } from "../../components/CalendarIcon";
import { VideoIcon } from "../../components/VideoIcon";

// ── shared data ──────────────────────────────────────────────
const daysOfWeek = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const months = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];
const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
];
const unavailableSlots = ["09:00", "11:30", "13:30", "15:00"];

function generateCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

// ── mock appointments (matched with MyAppointments) ──────────
const mockAppointments: Record<string, {
  id: string; doctor: string; specialty: string;
  day: number; month: number; year: number; time: string; type: string;
}> = {
  "APT-0342": {
    id: "APT-0342", doctor: "นพ. สมชาย แพทย์ไทย",
    specialty: "แพทย์แผนไทยประยุกต์",
    day: 15, month: 2, year: 2026, time: "10:00", type: "Video Consultation",
  },
  "APT-0341": {
    id: "APT-0341", doctor: "นพ. วิภา สมุนไพร",
    specialty: "แพทย์แผนไทย",
    day: 22, month: 2, year: 2026, time: "14:30", type: "Video Consultation",
  },
  "APT-0340": {
    id: "APT-0340", doctor: "นพ. ประยุทธ สุขภาพ",
    specialty: "แพทย์แผนไทยเฉพาะทาง",
    day: 28, month: 2, year: 2026, time: "09:30", type: "Video Consultation",
  },
};

const rescheduleReasons = [
  "ติดธุระฉุกเฉิน",
  "ไม่สบาย ไม่สะดวกเดินทาง",
  "ติดการประชุม / งาน",
  "ต้องการเปลี่ยนแพทย์",
  "อื่นๆ (โปรดระบุ)",
];

type Step = "pick" | "confirm" | "done";

export function ReschedulePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const aptId: string = (location.state as any)?.aptId ?? "APT-0342";
  const original = mockAppointments[aptId] ?? mockAppointments["APT-0342"];

  // new date selection
  const [currentMonth, setCurrentMonth] = useState(original.month);
  const [currentYear] = useState(original.year);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reasonIdx, setReasonIdx] = useState<number | null>(null);
  const [customReason, setCustomReason] = useState("");
  const [step, setStep] = useState<Step>("pick");

  const calendar = generateCalendar(currentYear, currentMonth);
  const todayDay = 2; // March 2, 2026
  const canProceed = selectedDay !== null && selectedTime !== null && reasonIdx !== null;

  const newDateLabel = selectedDay
    ? `${selectedDay} ${months[currentMonth]} ${currentYear + 543}`
    : null;

  // ── STEP: done ───────────────────────────────────────────────
  if (step === "done") {
    return (
      <div className="mx-auto">
        <div className="text-center py-10">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-gray-900">เลื่อนนัดหมายสำเร็จ!</h2>
          <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
            ระบบจะส่งการยืนยันผ่าน SMS และอีเมลของท่านภายใน 5 นาที
          </p>
        </div>

        {/* comparison card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            {/* old */}
            <div className="p-5 bg-gray-50">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">นัดเดิม</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Stethoscope className="w-4 h-4 flex-shrink-0" />
                  <span>{original.doctor}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                  <span>{original.day} {months[original.month]} {original.year + 543}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <TimeCircleIcon className="w-4 h-4 flex-shrink-0" />
                  <span>{original.time} น.</span>
                </div>
              </div>
            </div>
            {/* new */}
            <div className="p-5">
              <p className="text-xs text-emerald-600 uppercase tracking-wider mb-3">นัดใหม่</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-900">
                  <Stethoscope className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                  <span>{original.doctor}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-900">
                  <CalendarIcon className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                  <span>{newDateLabel}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-900">
                  <TimeCircleIcon className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                  <span>{selectedTime} น.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
          กรุณาเข้าระบบล่วงหน้า <strong>5 นาที</strong> ก่อนเวลานัดหมาย และเตรียมบัตรประชาชนให้พร้อม
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/patient/appointment")}
            className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            กลับหน้านัดหมาย
          </button>
          <button
            onClick={() => navigate("/patient")}
            className="flex-1 py-3 bg-emerald-700 text-white rounded-xl font-semibold hover:bg-emerald-800 transition-colors"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  // ── STEP: confirm ────────────────────────────────────────────
  if (step === "confirm") {
    return (
      <div className="space-y-5 pb-24 sm:pb-0">
        {/* back */}
        <button
          onClick={() => setStep("pick")}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> แก้ไขวันเวลา
        </button>

        <div>
          <h2 className="text-gray-900">ยืนยันการเลื่อนนัด</h2>
          <p className="text-gray-500 text-sm mt-1">ตรวจสอบข้อมูลก่อนยืนยัน</p>
        </div>

        {/* doctor card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
            <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Stethoscope className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{original.doctor}</p>
              <p className="text-sm text-gray-500">{original.specialty}</p>
            </div>
          </div>

          {/* comparison */}
          <div className="mt-4 grid grid-cols-[1fr_auto_1fr] gap-3 items-start">
            {/* old */}
            <div className="bg-red-50 border border-red-100 rounded-xl p-3">
              <p className="text-xs text-red-500 mb-2 font-medium">นัดเดิม</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-red-700">
                  <CalendarIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{original.day} {months[original.month]} {original.year + 543}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-red-700">
                  <TimeCircleIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{original.time} น.</span>
                </div>
              </div>
            </div>
            {/* arrow */}
            <div className="flex items-center justify-center pt-6">
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
            {/* new */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              <p className="text-xs text-emerald-600 mb-2 font-medium">นัดใหม่</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700">
                  <CalendarIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{newDateLabel}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700">
                  <TimeCircleIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{selectedTime} น.</span>
                </div>
              </div>
            </div>
          </div>

          {/* type */}
          <div className="mt-4 flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <VideoIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700 flex-1">ประเภทการพบ</span>
            <span className="text-sm font-medium text-gray-900">{original.type}</span>
          </div>

          {/* reason */}
          <div className="mt-4 p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-400 mb-1">เหตุผลในการเลื่อนนัด</p>
            <p className="text-sm text-gray-700">
              {reasonIdx === rescheduleReasons.length - 1
                ? customReason || "อื่นๆ"
                : rescheduleReasons[reasonIdx!]}
            </p>
          </div>
        </div>

        {/* warning */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            การเลื่อนนัดสามารถทำได้ <strong>สูงสุด 2 ครั้งต่อ 1 รายการนัดหมาย</strong>{" "}
            หากต้องการยกเลิกโปรดติดต่อคลินิก
          </p>
        </div>

        {/* actions */}
        <div className="flex gap-3 fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-100 sm:static sm:bg-transparent sm:border-0 sm:p-0 sm:backdrop-blur-none">
          <button
            onClick={() => setStep("pick")}
            className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors bg-white"
          >
            แก้ไข
          </button>
          <button
            onClick={() => setStep("done")}
            className="flex-1 py-3.5 bg-emerald-700 text-white rounded-xl font-semibold hover:bg-emerald-800 transition-colors shadow-sm"
          >
            ยืนยันการเลื่อนนัด
          </button>
        </div>
      </div>
    );
  }

  // ── STEP: pick (default) ─────────────────────────────────────
  return (
    <div className="space-y-5">
      {/* back */}
      <button
        onClick={() => navigate("/patient/appointment")}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> กลับหน้านัดหมาย
      </button>

      <div>
        <h2 className="text-gray-900">เลื่อนนัดหมาย</h2>
        <p className="text-gray-500 text-sm mt-1">เลือกวันและเวลาใหม่สำหรับการพบแพทย์</p>
      </div>

      {/* progress bar */}
      <div className="flex items-center gap-2">
        {(["เลือกวันเวลา", "ยืนยัน", "เสร็จสิ้น"] as const).map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 border-2 transition-all ${
              i === 0 ? "bg-emerald-700 border-emerald-700 text-white" : "bg-white border-gray-300 text-gray-400"
            }`}>
              {i + 1}
            </div>
            <span className={`text-xs ${i === 0 ? "text-emerald-700 font-medium" : "text-gray-400"}`}>{label}</span>
            {i < 2 && <div className="flex-1 h-px bg-gray-200 mx-1" />}
          </div>
        ))}
      </div>

      {/* current appointment banner */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">นัดหมายปัจจุบัน (#{original.id})</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Stethoscope className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{original.doctor}</p>
            <p className="text-xs text-gray-500">{original.specialty}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-sm text-red-600">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>{original.day} {months[original.month]} {original.year + 543}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-red-600 mt-0.5 justify-end">
              <TimeCircleIcon className="w-3.5 h-3.5" />
              <span>{original.time} น.</span>
            </div>
          </div>
        </div>
      </div>

      {/* calendar + time picker */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Calendar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h4>{months[currentMonth]} {currentYear + 543}</h4>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentMonth((m) => Math.max(2, m - 1))}
                disabled={currentMonth <= 2}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentMonth((m) => Math.min(11, m + 1))}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {daysOfWeek.map((d) => (
              <div key={d} className="text-center text-xs text-gray-400 py-2 font-medium">{d}</div>
            ))}
            {generateCalendar(currentYear, currentMonth).map((day, i) => {
              const isPast = day !== null && day <= todayDay && currentMonth === 2;
              const isOriginal = day === original.day && currentMonth === original.month;
              const isSelected = day === selectedDay && currentMonth === currentMonth;
              return (
                <button
                  key={i}
                  disabled={!day || isPast}
                  onClick={() => { if (day) { setSelectedDay(day); setSelectedTime(null); } }}
                  className={`relative text-center text-sm py-2 rounded-xl transition-all
                    ${!day ? "invisible" : ""}
                    ${isPast ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}
                    ${isSelected ? "bg-emerald-700 text-white font-semibold" : ""}
                    ${isOriginal && !isSelected && !isPast ? "bg-red-100 text-red-600 font-semibold" : ""}
                    ${!isSelected && !isOriginal && !isPast && day ? "hover:bg-gray-100" : ""}
                  `}
                >
                  {day}
                  {isOriginal && !isSelected && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-400" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-emerald-700" />
              <span className="text-gray-500">เลือก</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-red-100" />
              <span className="text-gray-500">นัดเดิม</span>
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h4 className="mb-4 text-gray-900">เลือกเวลาใหม่</h4>
          {selectedDay ? (
            <>
              <p className="text-xs text-gray-500 mb-3">
                {selectedDay} {months[currentMonth]} {currentYear + 543}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => {
                  const isUnavailable = unavailableSlots.includes(slot);
                  const isOriginalTime = slot === original.time && selectedDay === original.day && currentMonth === original.month;
                  const isSelected = slot === selectedTime;
                  return (
                    <button
                      key={slot}
                      disabled={isUnavailable || isOriginalTime}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2.5 rounded-xl text-sm transition-all relative
                        ${isUnavailable || isOriginalTime ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through" : ""}
                        ${isSelected ? "bg-emerald-700 text-white font-semibold" : ""}
                        ${!isUnavailable && !isSelected && !isOriginalTime ? "border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 text-gray-700" : ""}
                      `}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-50 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-emerald-700" />
                  <span className="text-gray-500">เลือก</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm border border-gray-200" />
                  <span className="text-gray-500">ว่าง</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-gray-100" />
                  <span className="text-gray-500">ไม่ว่าง</span>
                </div>
              </div>
            </>
          ) : (
            <div className="h-40 flex items-center justify-center">
              <p className="text-gray-400 text-sm text-center">
                เลือกวันที่ก่อน<br />เพื่อดูเวลาว่าง
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reason */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h4 className="text-gray-900 mb-3">เหตุผลในการเลื่อนนัด</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {rescheduleReasons.map((r, i) => (
            <button
              key={r}
              onClick={() => setReasonIdx(i)}
              className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left text-sm transition-all ${
                reasonIdx === i
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : "border-gray-100 text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                reasonIdx === i ? "border-emerald-500 bg-emerald-500" : "border-gray-300"
              }`}>
                {reasonIdx === i && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              {r}
            </button>
          ))}
        </div>
        {reasonIdx === rescheduleReasons.length - 1 && (
          <textarea
            rows={2}
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            placeholder="โปรดระบุเหตุผล..."
            className="mt-3 w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm resize-none"
          />
        )}
      </div>

      {/* Sticky summary + CTA */}
      <div className={`sticky bottom-4 bg-white rounded-2xl border shadow-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all ${
        canProceed ? "border-emerald-300 shadow-emerald-100" : "border-gray-200"
      }`}>
        <div className="flex flex-wrap gap-2 flex-1 text-sm">
          {selectedDay ? (
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg">
              <CalendarIcon className="w-3.5 h-3.5" />
              {selectedDay} {months[currentMonth]} {currentYear + 543}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-gray-100 text-gray-400 px-3 py-1.5 rounded-lg">
              <CalendarIcon className="w-3.5 h-3.5" /> เลือกวันที่
            </div>
          )}
          {selectedTime ? (
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg">
              <TimeCircleIcon className="w-3.5 h-3.5" />
              {selectedTime} น.
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-gray-100 text-gray-400 px-3 py-1.5 rounded-lg">
              <TimeCircleIcon className="w-3.5 h-3.5" /> เลือกเวลา
            </div>
          )}
          {reasonIdx !== null && (
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg">
              <Check className="w-3.5 h-3.5" /> มีเหตุผล
            </div>
          )}
        </div>
        <button
          disabled={!canProceed}
          onClick={() => setStep("confirm")}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all flex-shrink-0 flex items-center gap-2 ${
            canProceed
              ? "bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          ดำเนินการต่อ →
        </button>
      </div>
    </div>
  );
}