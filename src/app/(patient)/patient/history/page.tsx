"use client";

import { useState } from "react";
import {
  Download,
  Package,
  ChevronRight,
  Search,
  Pill,
  X,
  CheckCircle2,
} from "lucide-react";
import { PaperIcon } from "../../../components/PaperIcon";
import { PillIcon } from "../../../components/PillIcon";

const visits = [
  {
    id: "VIS-2026-003",
    date: "15 ก.พ. 2569",
    doctor: "นพ. สมชาย แพทย์ไทย",
    diagnosis: "ไมเกรน (G43.9) + อาการปวดหัว",
    icd: "G43.9",
    medicines: ["ยาแก้ปวดสมุนไพร 500mg", "ขมิ้นชัน capsule"],
    delivery: "delivered",
    trackingNo: "TH12345678",
  },
  {
    id: "VIS-2026-002",
    date: "20 ม.ค. 2569",
    doctor: "นพ. วิภา สมุนไพร",
    diagnosis: "อาการอ่อนเพลีย, นอนไม่หลับ",
    icd: "R53.83",
    medicines: ["ขิง + ไพล capsule", "ยานอนหลับสมุนไพร"],
    delivery: "delivered",
    trackingNo: "TH98765432",
  },
  {
    id: "VIS-2025-018",
    date: "5 ธ.ค. 2568",
    doctor: "นพ. สมชาย แพทย์ไทย",
    diagnosis: "โรคภูมิแพ้, คัดจมูก",
    icd: "J30.1",
    medicines: ["ยาแก้แพ้สมุนไพร", "น้ำมันเหลืองใส"],
    delivery: "delivered",
    trackingNo: "TH56781234",
  },
  {
    id: "VIS-2025-012",
    date: "8 ต.ค. 2568",
    doctor: "นพ. ประยุทธ สุขภาพ",
    diagnosis: "ปวดหลังเรื้อรัง (M54.5)",
    icd: "M54.5",
    medicines: ["ยานวดสมุนไพร", "Plai Extract capsule"],
    delivery: "delivered",
    trackingNo: "TH11223344",
  },
];

type DeliveryStatus = "processing" | "shipped" | "out_for_delivery" | "delivered";

const deliverySteps: { key: DeliveryStatus; label: string; icon: typeof Package }[] = [
  { key: "processing", label: "กำลังจัดเตรียม", icon: Package },
  { key: "shipped", label: "จัดส่งแล้ว", icon: Download },
  { key: "out_for_delivery", label: "กำลังนำส่ง", icon: ChevronRight },
  { key: "delivered", label: "ส่งสำเร็จ", icon: CheckCircle2 },
];

export default function Page() {
  const [search, setSearch] = useState("");
  const [selectedVisit, setSelectedVisit] = useState<typeof visits[0] | null>(null);

  const filtered = visits.filter(
    (v) =>
      v.id.toLowerCase().includes(search.toLowerCase()) ||
      v.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
      v.doctor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-deep-emerald">ประวัติการรักษา</h2>
          <p className="text-muted-moss text-sm mt-1">ดูประวัติการพบแพทย์และสถานะยา</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-moss" />
          <input
            type="text"
            placeholder="ค้นหา..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm w-full sm:w-60"
          />
        </div>
      </div>

      {/* Visit Cards */}
      <div className="space-y-3">
        {filtered.map((visit) => (
          <div
            key={visit.id}
            className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
          >
            <div className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-pale-mint text-forest-leaf px-2.5 py-1 rounded-lg font-medium">
                      {visit.id}
                    </span>
                    <span className="text-xs text-muted-moss flex items-center gap-1">
                      <PaperIcon className="w-3 h-3" /> {visit.date}
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      ✓ เสร็จสิ้น
                    </span>
                  </div>
                  <p className="font-semibold text-deep-emerald mt-2">{visit.diagnosis}</p>
                  <p className="text-sm text-muted-moss mt-0.5">{visit.doctor}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {visit.medicines.map((med) => (
                      <span
                        key={med}
                        className="flex items-center gap-1 text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg border border-amber-100"
                      >
                        <PillIcon className="w-3 h-3" /> {med}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm hover:bg-blue-100 transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">ดาวน์โหลด PDF</span>
                    <span className="sm:hidden">PDF</span>
                  </button>
                  <button
                    onClick={() => setSelectedVisit(visit)}
                    className="flex items-center gap-2 px-3 py-2 bg-pale-mint text-forest-leaf rounded-xl text-sm hover:bg-pale-mint transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    <span className="hidden sm:inline">ติดตามยา</span>
                    <span className="sm:hidden">ยา</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-moss">
            <PaperIcon className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>ไม่พบประวัติการรักษา</p>
          </div>
        )}
      </div>

      {/* Delivery Tracking Modal */}
      {selectedVisit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h3 className="text-deep-emerald">ติดตามการจัดส่งยา</h3>
                <p className="text-xs text-muted-moss mt-0.5">{selectedVisit.id}</p>
              </div>
              <button
                onClick={() => setSelectedVisit(null)}
                className="p-2 hover:bg-pale-mint rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-muted-moss" />
              </button>
            </div>

            <div className="p-5">
              {/* Medicines */}
              <div className="mb-5 bg-amber-50 rounded-xl p-4">
                <p className="text-xs text-amber-700 font-medium mb-2">รายการยา</p>
                {selectedVisit.medicines.map((m) => (
                  <p key={m} className="text-sm text-olive-charcoal flex items-center gap-2">
                    <Pill className="w-3.5 h-3.5 text-amber-600" /> {m}
                  </p>
                ))}
              </div>

              {/* Tracking */}
              <div className="bg-warm-sand rounded-xl p-3 mb-5 flex items-center justify-between">
                <span className="text-xs text-muted-moss">หมายเลขพัสดุ</span>
                <span className="text-sm font-mono font-semibold text-deep-emerald">{selectedVisit.trackingNo}</span>
              </div>

              {/* Status Timeline */}
              <div className="space-y-3">
                {deliverySteps.map((step, idx) => {
                  const currentIdx = deliverySteps.findIndex((s) => s.key === selectedVisit.delivery);
                  const isDone = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;
                  const Icon = step.icon;
                  return (
                    <div key={step.key} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                          ${isDone ? (isCurrent ? "bg-forest-leaf shadow-md" : "bg-pale-mint") : "bg-gray-200"}`}
                      >
                        <Icon className={`w-4 h-4 ${isDone ? (isCurrent ? "text-white" : "text-forest-leaf") : "text-muted-moss"}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${isDone ? "text-deep-emerald font-medium" : "text-muted-moss"}`}>
                          {step.label}
                          {isCurrent && (
                            <span className="ml-2 text-xs text-forest-leaf font-normal">• ปัจจุบัน</span>
                          )}
                        </p>
                      </div>
                      {isDone && <CheckCircle2 className="w-4 h-4 text-forest-leaf flex-shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
