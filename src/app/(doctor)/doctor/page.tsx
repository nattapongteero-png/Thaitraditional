"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserX,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  ChevronRight,
  User,
  RefreshCw,
  Play,
} from "lucide-react";
import { VideoIcon } from "../../components/VideoIcon";
import { CalendarIcon } from "../../components/CalendarIcon";
import { TimeCircleIcon } from "../../components/TimeCircleIcon";

const patientFemale = "/images/avatar-female.png";
const patientMale = "/images/avatar-male.png";

type Status = "waiting" | "in_progress" | "done" | "no_show" | "rescheduled";

interface Patient {
  id: string;
  queueNo: number;
  name: string;
  hn: string;
  age: number;
  gender: "male" | "female";
  time: string;
  type: string;
  status: Status;
  waitTime: string;
  lastVisit: string;
}

const initialQueue: Patient[] = [
  { id: "P001", queueNo: 1, name: "นางสาว ขวัญใจ ดีมาก", hn: "HN-0001234", age: 35, gender: "female", time: "09:00", type: "ปรึกษาทั่วไป", status: "done", waitTime: "–", lastVisit: "20 ม.ค. 69" },
  { id: "P002", queueNo: 2, name: "นาย สมศักดิ์ รักแผนไทย", hn: "HN-0002345", age: 52, gender: "male", time: "09:30", type: "ติดตามผล", status: "done", waitTime: "–", lastVisit: "15 ก.พ. 69" },
  { id: "P003", queueNo: 3, name: "นาง วิไล สุขภาพดี", hn: "HN-0003456", age: 48, gender: "female", time: "10:00", type: "ปรึกษาทั่วไป", status: "in_progress", waitTime: "23 นาที", lastVisit: "ครั้งแรก" },
  { id: "P004", queueNo: 4, name: "นาย ประสิทธิ์ ใจดี", hn: "HN-0004567", age: 41, gender: "male", time: "10:30", type: "ปรึกษาทั่วไป", status: "waiting", waitTime: "45 นาที", lastVisit: "5 ธ.ค. 68" },
  { id: "P005", queueNo: 5, name: "นางสาว รัตนา แข็งแรง", hn: "HN-0005678", age: 29, gender: "female", time: "11:00", type: "ยาสมุนไพร", status: "waiting", waitTime: "1:15 ชม.", lastVisit: "8 ต.ค. 68" },
  { id: "P006", queueNo: 6, name: "นาย มานะ ดีสุข", hn: "HN-0006789", age: 63, gender: "male", time: "11:30", type: "ติดตามผล", status: "waiting", waitTime: "1:45 ชม.", lastVisit: "30 ม.ค. 69" },
  { id: "P007", queueNo: 7, name: "นาง สุดา ยิ้มแย้ม", hn: "HN-0007890", age: 55, gender: "female", time: "13:00", type: "ปรึกษาทั่วไป", status: "waiting", waitTime: "–", lastVisit: "ครั้งแรก" },
  { id: "P008", queueNo: 8, name: "นาย ธนา พึ่งสมุนไพร", hn: "HN-0008901", age: 44, gender: "male", time: "13:30", type: "ยาสมุนไพร", status: "no_show", waitTime: "–", lastVisit: "12 พ.ย. 68" },
];

const statusConfig: Record<Status, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  waiting: { label: "รอ", color: "bg-amber-100 text-amber-700", icon: TimeCircleIcon },
  in_progress: { label: "กำลังพบ", color: "bg-blue-100 text-blue-700", icon: VideoIcon },
  done: { label: "เสร็จแล้ว", color: "bg-pale-mint text-forest-leaf", icon: CheckCircle2 },
  no_show: { label: "ไม่มา", color: "bg-red-100 text-red-700", icon: UserX },
  rescheduled: { label: "เลื่อนนัด", color: "bg-purple-100 text-purple-700", icon: CalendarIcon },
};

export default function Page() {
  const router = useRouter();
  const [queue, setQueue] = useState<Patient[]>(initialQueue);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");

  const stats = {
    total: queue.length,
    waiting: queue.filter((q) => q.status === "waiting").length,
    done: queue.filter((q) => q.status === "done").length,
    inProgress: queue.filter((q) => q.status === "in_progress").length,
    noShow: queue.filter((q) => q.status === "no_show").length,
  };

  const filtered = queue.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.hn.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || p.status === filter;
    return matchSearch && matchFilter;
  });

  const setStatus = (id: string, status: Status) => {
    setQueue((q) => q.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-deep-emerald">คิววันนี้</h2>
          <p className="text-muted-moss text-sm mt-1">จันทร์ที่ 2 มีนาคม 2569</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-sm text-olive-charcoal hover:bg-pale-mint transition-colors shadow-sm">
          <RefreshCw className="w-4 h-4" />
          ดึงข้อมูลจาก EHP
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "ทั้งหมด", value: stats.total, color: "text-deep-emerald", bg: "bg-white" },
          { label: "รอพบแพทย์", value: stats.waiting, color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
          { label: "เสร็จแล้ว", value: stats.done, color: "text-forest-leaf", bg: "bg-pale-mint", border: "border-pale-mint" },
          { label: "ไม่มา", value: stats.noShow, color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 border ${s.border || "border-border"} shadow-sm`}>
            <p className={`text-2xl font-semibold ${s.color}`}>{s.value}</p>
            <p className="text-muted-moss text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* In Progress Banner */}
      {stats.inProgress > 0 && (
        <div className="bg-blue-600 text-white rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <VideoIcon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">กำลังพบผู้ป่วย: นาง วิไล สุขภาพดี (HN-0003456)</p>
            <p className="text-blue-100 text-sm">เริ่มตั้งแต่ 10:00 น. • ผ่านมา 23 นาที</p>
          </div>
          <button
            onClick={() => router.push("/doctor/visit/P003")}
            className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors"
          >
            กลับสู่ Visit <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-moss" />
          <input
            type="text"
            placeholder="ค้นหาชื่อผู้ป่วย, HN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm w-full"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "waiting", "in_progress", "done", "no_show"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-sm transition-all ${
                filter === f
                  ? "bg-slate-800 text-white"
                  : "bg-white border border-border text-olive-charcoal hover:bg-pale-mint"
              }`}
            >
              {f === "all" ? "ทั้งหมด" : statusConfig[f]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-warm-sand/50">
                <th className="text-left px-5 py-3 text-xs text-muted-moss font-medium">คิว</th>
                <th className="text-left px-5 py-3 text-xs text-muted-moss font-medium">ผู้ป่วย</th>
                <th className="text-left px-5 py-3 text-xs text-muted-moss font-medium hidden md:table-cell">HN</th>
                <th className="text-left px-5 py-3 text-xs text-muted-moss font-medium hidden lg:table-cell">ประเภท</th>
                <th className="text-left px-5 py-3 text-xs text-muted-moss font-medium">เวลา</th>
                <th className="text-left px-5 py-3 text-xs text-muted-moss font-medium">สถานะ</th>
                <th className="text-right px-5 py-3 text-xs text-muted-moss font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((patient) => {
                const status = statusConfig[patient.status];
                const StatusIcon = status.icon;
                return (
                  <tr key={patient.id} className="hover:bg-pale-mint/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-semibold text-slate-600">
                        {patient.queueNo}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[14px] overflow-hidden flex-shrink-0 bg-blue-100">
                          <img
                            src={patient.gender === "female" ? patientFemale : patientMale}
                            alt={patient.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-deep-emerald">{patient.name}</p>
                          <p className="text-xs text-muted-moss">{patient.age} ปี</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-xs font-mono text-olive-charcoal">{patient.hn}</span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">{patient.type}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm text-deep-emerald">{patient.time} น.</p>
                        {patient.status === "waiting" && (
                          <p className="text-xs text-amber-600">{patient.waitTime}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-medium ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {patient.status === "waiting" && (
                          <>
                            <button
                              onClick={() => router.push(`/doctor/visit/${patient.id}`)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700 transition-colors"
                            >
                              <Play className="w-3.5 h-3.5" />
                              Start Visit
                            </button>
                            <button
                              onClick={() => setStatus(patient.id, "no_show")}
                              className="p-1.5 text-muted-moss hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="No-show"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setStatus(patient.id, "rescheduled")}
                              className="p-1.5 text-muted-moss hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Reschedule"
                            >
                              <CalendarIcon className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {patient.status === "in_progress" && (
                          <button
                            onClick={() => router.push(`/doctor/visit/${patient.id}`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-xl text-xs font-medium hover:bg-blue-200 transition-colors"
                          >
                            กลับสู่ Visit <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                        {(patient.status === "done" || patient.status === "no_show" || patient.status === "rescheduled") && (
                          <span className="text-xs text-muted-moss">–</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
