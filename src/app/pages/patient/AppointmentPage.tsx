import { useState } from "react";
import avatarDoctorMale from 'figma:asset/a8ded2880dfb49b5adb0c3286b9610f2558e0c92.png';
import avatarDoctorFemale from 'figma:asset/27b8b0cee838fb648384546cb5d7790a99097f4c.png';
import { useNavigate } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Stethoscope,
  RefreshCw,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { DeleteIcon } from "../../components/DeleteIcon";
import { RescheduleCalendarIcon } from "../../components/RescheduleCalendarIcon";
import { VideoIcon } from "../../components/VideoIcon";
import { CalendarIcon } from "../../components/CalendarIcon";
import { TimeCircleIcon } from "../../components/TimeCircleIcon";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

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

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
];

const unavailableSlots = ["09:30", "10:30", "14:00"];

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

function generateCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

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

export function AppointmentPage() {
  const navigate = useNavigate();
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

  const calendar = generateCalendar(currentYear, currentMonth);
  const todayDay = today.getDate();
  const selectedDoctorData = doctors.find(
    (d) => d.id === selectedDoctor,
  );
  const canProceed =
    selectedDay && selectedDoctor && selectedTime;

  // ── done ─────────────────────────────────────────────────────
  if (step === "done") {
    return (
      <div className="mt-16 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-gray-900">จองนัดหมายสำเร็จ!</h2>
        <p className="text-gray-500 mt-2 text-sm">
          ระบบจะส่งการยืนยันผ่าน SMS และอีเมลของท่านภายใน 5 นาที
        </p>
        <div className="mt-6 bg-gray-50 border border-gray-100 rounded-2xl p-5 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">แพทย์</span>
            <span className="text-gray-900 font-medium">
              {selectedDoctorData?.name}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">วันที่</span>
            <span className="text-gray-900 font-medium">
              {selectedDay} {months[currentMonth]}{" "}
              {currentYear + 543}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">เวลา</span>
            <span className="text-gray-900 font-medium">
              {selectedTime} น.
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">ประเภท</span>
            <span className="text-gray-900 font-medium">
              Video Consultation
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            setStep("select");
            setSelectedDay(null);
            setSelectedTime(null);
            setSelectedDoctor(null);
            setTab("my");
          }}
          className="mt-6 w-full py-3 bg-emerald-700 text-white rounded-xl font-semibold hover:bg-emerald-800 transition-colors"
        >
          ดูนัดหมายของฉัน
        </button>
      </div>
    );
  }

  // ── confirm ───────────────────────────────────────────────────
  if (step === "confirm" && canProceed) {
    return (
      <div className="pb-24 sm:pb-0">
        <h2 className="text-gray-900 mb-6">ยืนยันการนัดหมาย</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {selectedDoctorData?.name}
              </p>
              <p className="text-sm text-gray-500">
                {selectedDoctorData?.specialty}
              </p>
            </div>
          </div>
          {[
            {
              label: "วันที่",
              value: `${selectedDay} ${months[currentMonth]} ${currentYear + 543}`,
              icon: CalendarIcon,
            },
            {
              label: "เวลา",
              value: `${selectedTime} น.`,
              icon: TimeCircleIcon,
            },
            {
              label: "ประเภทการพบ",
              value: "Video Consultation",
              icon: VideoIcon,
            },
          ].map((row) => {
            const Icon = row.icon;
            return (
              <div
                key={row.label}
                className="flex items-center gap-3"
              >
                <Icon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500 text-sm flex-1">
                  {row.label}
                </span>
                <span className="text-gray-900 text-sm font-medium">
                  {row.value}
                </span>
              </div>
            );
          })}
          <div className="pt-2">
            <label className="text-sm text-gray-700 block mb-1.5">
              อาการ/เหตุผลในการพบแพทย์
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="อธิบายอาการหรือเหตุผลในการนัดหมาย..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm resize-none"
            />
          </div>
        </div>

        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800">
            <strong>โปรดทราบ:</strong>{" "}
            กรุณาเตรียมบัตรประชาชนและพร้อมในระบบก่อนเวลานัดหมาย
            5 นาที
          </p>
        </div>

        <div className="flex gap-3 mt-5 fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-100 sm:static sm:bg-transparent sm:border-0 sm:p-0 sm:backdrop-blur-none">
          <button
            onClick={() => setStep("select")}
            className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors bg-white"
          >
            แก้ไข
          </button>
          <button
            onClick={() => setStep("done")}
            className="flex-1 py-3 bg-emerald-700 text-white rounded-xl font-semibold hover:bg-emerald-800 transition-colors"
          >
            ยืนยันนัดหมาย
          </button>
        </div>
      </div>
    );
  }

  // ── Tab: นัดหมายของฉัน ───────────────────────────────────────
  if (tab === "my") {
    return (
      <>
      <div className="space-y-5">
        {/* header */}
        <div>
          <h2 className="text-gray-900">นัดหมาย</h2>
          <p className="text-gray-500 text-sm mt-0.5">
            จัดการนัดหมายทั้งหมดของคุณ
          </p>
        </div>

        {/* tab switcher */}
        

        {/* add new CTA */}
        <button
          onClick={() => setTab("book")}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-emerald-300 text-emerald-700 text-sm font-medium hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
        >
          <CalendarIcon className="w-4 h-4" />จองนัดหมายใหม่
        </button>

        {/* upcoming count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            นัดหมายที่กำลังจะมาถึง{" "}
            <span className="font-semibold text-gray-900">
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
              {/* Green gradient top section – inset from edges */}
              <div
                className={`mx-[6.5px] mt-[6px] rounded-[20px] px-4 py-4 relative overflow-hidden ${
                  apt.status === "confirmed"
                    ? "bg-gradient-to-r from-[#d7e9db] to-[#97d999]"
                    : "bg-gradient-to-r from-[#fef3c7] to-[#fcd34d]"
                }`}
              >
                {/* Doctor avatar */}
                <div className="absolute right-0 bottom-0 h-[160%] w-32 pointer-events-none select-none">
                  <ImageWithFallback
                    src={apt.gender === "female" ? avatarDoctorFemale : avatarDoctorMale}
                    alt="doctor avatar"
                    className="w-full h-full object-contain object-bottom drop-shadow-lg scale-110 origin-bottom transition-transform duration-300 group-hover:scale-125"
                  />
                </div>

                {/* Status badge */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[rgba(0,0,0,0.05)] text-black">
                    {apt.status === "confirmed"
                      ? "ยืนยันแล้ว"
                      : "รอยืนยัน"}
                  </span>
                  {apt.rescheduleCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[rgba(237,98,0,0.1)] text-[#ed6200]">
                      <RefreshCw className="w-3 h-3" />
                      เลื่อนนัดแล้ว {apt.rescheduleCount}/2 ครั้ง
                    </span>
                  )}
                </div>

                {/* Doctor name */}
                <p className="font-bold text-[#101828] mt-[14px] text-[18px] leading-tight">
                  {apt.doctor}
                </p>
                <p className="text-sm text-[#6a7282] mt-1">
                  {apt.specialty}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-[12px] text-sm text-[#4a5565]">
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-gray-700" />
                    <span className="text-[#4d5867] text-[#4d5867] text-[#4d5867] text-[#4d5867] text-[#4c5766] text-[#4b5564] text-[#48525f] text-[#444c58] text-[#3e454d] text-[#383d44] text-[#33373c] text-[#2e3135] text-[#2b2e31] text-[#292b2d] text-[#252729] text-[#212324] text-[#1d1e1f] text-[#191a1b] text-[#161616] text-[#131313] text-[#101011] text-[#0d0e0e] text-[#0b0b0b] text-[#080808] text-[#070707] text-[#060606] text-[#050505] text-[#050505] text-[#050505] text-[#060606] text-[#060606] text-[#070707] text-[#090909] text-[#090909] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000]">
                      {apt.day} {months[apt.month]}{" "}
                      {apt.year + 543}
                    </span>
                  </div>
                  <span className="text-[#000000]">•</span>
                  <div className="flex items-center gap-1.5">
                    <TimeCircleIcon className="w-3.5 h-3.5 text-[#000000]" />
                    <span className="text-[#617ea9] text-[#617ea8] text-[#617da8] text-[#607ca6] text-[#5c77a0] text-[#556d91] text-[#4b5e7b] text-[#425066] text-[#384353] text-[#2e3541] text-[#23282f] text-[#181a1e] text-[#0c0d0e] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000]">
                      {apt.time} น.
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <VideoIcon className="w-3.5 h-3.5 text-gray-700" />
                    <span className="text-[#9eb9df] text-[#9eb9df] text-[#9db8dd] text-[#9ab3d6] text-[#91a4bf] text-[#808a99] text-[#696d74] text-[#4c4d4e] text-[#2d2d2d] text-[#151515] text-[#060606] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000] text-[#000000]">
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
                        navigate("/patient/reschedule", {
                          state: { aptId: apt.id },
                        })
                      }
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-[14px] text-sm font-medium transition-colors text-white ${
                        apt.status === "confirmed"
                          ? "bg-[#009966] hover:bg-[#007a52]"
                          : "bg-amber-500 hover:bg-amber-600"
                      }`}
                    >
                      <RescheduleCalendarIcon className="w-3.5 h-3.5" />
                      เลื่อนนัด
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 px-4 py-2 rounded-[14px] bg-gray-200 text-gray-400 text-sm">
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
              <h3 className="text-gray-900 text-base font-semibold">ยืนยันการยกเลิกนัด?</h3>
              <p className="text-gray-500 text-sm mt-1">
                นัดหมายกับ <span className="font-medium text-gray-700">{cancelTarget.doctor}</span>
              </p>
              <p className="text-gray-500 text-sm">
                วันที่ {cancelTarget.day} {months[cancelTarget.month]} {cancelTarget.year + 543} เวลา {cancelTarget.time} น.
              </p>
              <p className="text-red-500 text-xs mt-2">การยกเลิกนี้ไม่สามารถย้อนกลับได้</p>
            </div>
            <div className="flex gap-3 w-full mt-1">
              <button
                onClick={() => setCancelTarget(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
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
      </>
    );
  }

  // ── Tab: จองนัดใหม่ ───────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* header with back */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setTab("my")}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </button>
        <div>
          <h2 className="text-gray-900">จองนัดหมายใหม่</h2>
          <p className="text-gray-500 text-sm mt-0.5">
            เลือกแพทย์ วัน และเวลาที่ต้องการ
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h4>
              {months[currentMonth]} {currentYear + 543}
            </h4>
            <div className="flex gap-1">
              <button
                onClick={() =>
                  setCurrentMonth((m) => Math.max(0, m - 1))
                }
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() =>
                  setCurrentMonth((m) => Math.min(11, m + 1))
                }
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {daysOfWeek.map((d) => (
              <div
                key={d}
                className="text-center text-xs text-gray-400 py-2 font-medium"
              >
                {d}
              </div>
            ))}
            {calendar.map((day, i) => {
              const isToday =
                day === todayDay && currentMonth === 2;
              const isPast =
                day !== null &&
                day < todayDay &&
                currentMonth === 2;
              const isSelected = day === selectedDay;
              return (
                <button
                  key={i}
                  disabled={!day || isPast}
                  onClick={() => day && setSelectedDay(day)}
                  className={`text-center text-sm py-2 rounded-xl transition-all
                    ${!day ? "invisible" : ""}
                    ${isPast ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}
                    ${isSelected ? "bg-emerald-700 text-white font-semibold" : ""}
                    ${isToday && !isSelected ? "bg-emerald-100 text-emerald-700 font-semibold" : ""}
                    ${!isSelected && !isToday && !isPast ? "hover:bg-gray-100" : ""}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h4 className="mb-4 text-gray-900">เลือกเวลา</h4>
          {selectedDay ? (
            <>
              <p className="text-xs text-gray-500 mb-3">
                {selectedDay} {months[currentMonth]}{" "}
                {currentYear + 543}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => {
                  const isUnavailable =
                    unavailableSlots.includes(slot);
                  const isSelected = slot === selectedTime;
                  return (
                    <button
                      key={slot}
                      disabled={isUnavailable}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2.5 rounded-xl text-sm transition-all
                        ${isUnavailable ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through" : ""}
                        ${isSelected ? "bg-emerald-700 text-white font-semibold" : ""}
                        ${!isUnavailable && !isSelected ? "border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 text-gray-700" : ""}
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
                เลือกวันที่ก่อน
                <br />
                เพื่อดูเวลาว่าง
              </p>
            </div>
          )}
        </div>

        {/* Doctor Selection */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h4 className="mb-4 text-gray-900">เลือกแพทย์</h4>
          <div className="space-y-3">
            {doctors.map((doc) => {
              const isSelected = doc.id === selectedDoctor;
              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc.id)}
                  className={`w-full text-left p-3 rounded-xl border-2 transition-all
                    ${isSelected ? "border-emerald-500 bg-emerald-50" : "border-gray-100 hover:border-gray-300"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {doc.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {doc.specialty}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-amber-400 text-xs">
                          ★
                        </span>
                        <span className="text-xs text-gray-600">
                          {doc.rating}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({doc.reviews})
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Bar sticky */}
      <div
        className={`sticky bottom-4 rounded-2xl border shadow-lg transition-all overflow-hidden ${canProceed ? "bg-emerald-700 border-emerald-600 shadow-emerald-200" : "bg-white border-gray-200 shadow-gray-100"} p-[0px]`}
      >
        {/* ── COMPLETE STATE ── */}
        {canProceed ? (
          <div className="bg-white p-[4px]">
            {/* Title */}
            <p
              className="font-bold text-[14px] text-black mx-[0px] mt-[0px] mb-[8px] px-[12px] pt-[8px] pb-[4px]"
              style={{
                fontFamily: "'Google Sans', sans-serif",
              }}
            >
              การนัดหมาย
            </p>
            {/* Inner green card — matches Figma bg-[#226a3b] rounded-[20px] */}
            <div className="bg-[#226a3b] rounded-[14px] p-3 flex flex-col gap-2 m-[0px]">
              {/* Row 1: date + time */}
              <div className="flex items-center gap-2">
                <div className="border border-white/40 rounded-[12px] px-2 py-2 text-[12px] text-white">
                  {selectedDay} {months[currentMonth]}{" "}
                  {currentYear + 543}
                </div>
                <div className="border border-white/40 rounded-[12px] px-2 py-2 text-[12px] text-white">
                  {selectedTime} น.
                </div>
              </div>
              {/* Row 2: doctor + ต่อไป button */}
              <div className="flex items-center justify-between gap-2">
                <div className="border border-white/40 rounded-[12px] px-2 py-2 text-[12px] text-white w-fit">
                  {selectedDoctorData?.name}
                </div>
                <button
                  onClick={() => setStep("confirm")}
                  className="flex items-center gap-2 bg-[#319754] rounded-[12px] px-3 py-2 text-[12px] text-white flex-shrink-0 hover:bg-[#3aad62] transition-colors"
                >
                  <span>ต่อไป</span>
                  <svg
                    width="8"
                    height="13"
                    viewBox="0 0 12.8388 8.03819"
                    fill="none"
                    className="-rotate-90 flex-shrink-0"
                  >
                    <path
                      d="M6.4194 8.03819C6.1893 8.03819 5.95923 7.94169 5.7838 7.7491L0.263377 1.68577C-0.0877925 1.30007 -0.0877925 0.674705 0.263377 0.289155C0.614407 -0.096385 1.18366 -0.096385 1.53486 0.289155L6.4194 5.65434L11.304 0.289345C11.6551 -0.096205 12.2243 -0.096205 12.5753 0.289345C12.9267 0.674895 12.9267 1.30025 12.5753 1.68596L7.05499 7.7493C6.87947 7.94191 6.64941 8.03819 6.41939 8.03819H6.4194Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ── PARTIAL / INCOMPLETE STATE ── */
          <div className="p-[0px]">
            {/* Title — เหมือน complete state */}
            <p className="font-bold text-[14px] text-black m-[0px] pl-[12px] pr-[16px] py-[8px]">
              การนัดหมาย
            </p>
            <div className="bg-[#fafafa] rounded-[12px] p-3 flex flex-col gap-2 m-[0px]">
              {/* Row 1: วันที่ + เวลา */}
              <div className="flex items-center gap-2">
                {/* Date chip */}
                <div
                  className={`flex items-center gap-1.5 px-2 py-2 rounded-[12px] border text-[12px] transition-all
                  ${
                    selectedDay
                      ? "border-[#226a3b] text-[#226a3b]"
                      : "border-[#d4d4d4] text-[#666]"
                  }`}
                >
                  {selectedDay
                    ? `${selectedDay} ${months[currentMonth]} ${currentYear + 543}`
                    : "เลือกวันที่"}
                </div>
                {/* Time chip */}
                <div
                  className={`flex items-center gap-1.5 px-2 py-2 rounded-[12px] border text-[12px] transition-all
                  ${
                    selectedTime
                      ? "border-[#226a3b] text-[#226a3b]"
                      : "border-[#d4d4d4] text-[#666]"
                  }`}
                >
                  {selectedTime
                    ? `${selectedTime} น.`
                    : "เลือกเวลา"}
                </div>
              </div>

              {/* Row 2: แพทย์ + ปุ่มต่อไป */}
              <div className="flex items-center justify-between gap-2">
                {/* Doctor chip */}
                <div
                  className={`flex items-center gap-1.5 px-2 py-2 rounded-[12px] border text-[12px] transition-all w-fit
                  ${
                    selectedDoctorData
                      ? "border-[#226a3b] text-[#226a3b]"
                      : "border-[#d4d4d4] text-[#666]"
                  }`}
                >
                  {selectedDoctorData
                    ? selectedDoctorData.name
                    : "เลือกแพทย์"}
                </div>

                {/* ต่อไป button — always disabled in partial state */}
                <button
                  disabled
                  className="flex items-center gap-2 bg-[#d4d4d4] text-[#666] px-3 py-2 rounded-[12px] text-[12px] cursor-not-allowed flex-shrink-0"
                >
                  <span>ต่อไป</span>
                  <svg
                    width="8"
                    height="13"
                    viewBox="0 0 12.8388 8.03819"
                    fill="none"
                    className="-rotate-90 flex-shrink-0"
                  >
                    <path
                      d="M6.4194 8.03819C6.1893 8.03819 5.95923 7.94169 5.7838 7.7491L0.263377 1.68577C-0.0877925 1.30007 -0.0877925 0.674705 0.263377 0.289155C0.614407 -0.096385 1.18366 -0.096385 1.53486 0.289155L6.4194 5.65434L11.304 0.289345C11.6551 -0.096205 12.2243 -0.096205 12.5753 0.289345C12.9267 0.674895 12.9267 1.30025 12.5753 1.68596L7.05499 7.7493C6.87947 7.94191 6.64941 8.03819 6.41939 8.03819H6.4194Z"
                      fill="#666"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}