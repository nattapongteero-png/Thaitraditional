"use client";

import { useState } from "react";
import {
  Download,
  Package,
  Search,
  X,
} from "lucide-react";
import { PaperIcon } from "../../../components/PaperIcon";
import { PillIcon } from "../../../components/PillIcon";
import {
  BoxAddIcon,
  BoxIcon,
  DeliveryTruckIcon,
  HandPackageIcon,
  ContentCopyIcon,
} from "../../../components/DeliveryIcons";

const visits = [
  {
    id: "VIS-2026-004",
    date: "28 มี.ค. 2569",
    doctor: "นพ. สมชาย แพทย์ไทย",
    diagnosis: "ปวดเข่าเรื้อรัง (M17.1)",
    icd: "M17.1",
    medicines: ["ยาประคบสมุนไพร", "ว่านชักมดลูก capsule", "น้ำมันเขียว"],
    delivery: "processing",
    trackingNo: "",
  },
  {
    id: "VIS-2026-003",
    date: "15 ก.พ. 2569",
    doctor: "นพ. สมชาย แพทย์ไทย",
    diagnosis: "ไมเกรน (G43.9) + อาการปวดหัว",
    icd: "G43.9",
    medicines: ["ยาแก้ปวดสมุนไพร 500mg", "ขมิ้นชัน capsule", "ยาหม่อง สมุนไพร", "น้ำมันไพล"],
    delivery: "out_for_delivery",
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
    medicines: ["ยาแก้แพ้สมุนไพร", "น้ำมันเหลืองใส", "ยาต้ม สูตร 1"],
    delivery: "shipped",
    trackingNo: "TH56781234",
  },
  {
    id: "VIS-2025-015",
    date: "20 พ.ย. 2568",
    doctor: "นพ. ประยุทธ สุขภาพ",
    diagnosis: "ท้องอืด แน่นท้อง",
    icd: "R14.0",
    medicines: ["ยาธาตุบรรจบ", "ขิงแห้ง capsule"],
    delivery: "failed",
    trackingNo: "TH99887766",
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

const deliveryStatusConfig: Record<string, { label: string; badgeClass: string }> = {
  processing: { label: "กำลังจัดเตรียม", badgeClass: "bg-[#FDF3E7] text-[#B8860B]" },
  shipped: { label: "จัดส่งแล้ว", badgeClass: "bg-[#EEF0EB] text-[#5A6349]" },
  out_for_delivery: { label: "กำลังนำส่ง", badgeClass: "bg-[#E8F0EC] text-[#2D6A4F]" },
  delivered: { label: "ส่งสำเร็จ", badgeClass: "bg-[#D8F3DC] text-[#1B4332]" },
  failed: { label: "จัดส่งไม่สำเร็จ", badgeClass: "bg-[#F5E6E0] text-[#9B3B30]" },
};

type DeliveryStatus = "processing" | "shipped" | "out_for_delivery" | "delivered" | "failed";

const deliverySteps: {
  key: DeliveryStatus;
  labelActive: string;
  labelDone: string;
  icon: React.FC<{ className?: string }>;
  hasTracking: boolean;
}[] = [
  { key: "processing", labelActive: "กำลังจัดเตรียม", labelDone: "จัดเตรียมสำเร็จแล้ว", icon: BoxAddIcon, hasTracking: false },
  { key: "shipped", labelActive: "กำลังจัดส่ง", labelDone: "จัดส่งสำเร็จแล้ว", icon: BoxIcon, hasTracking: true },
  { key: "out_for_delivery", labelActive: "กำลังนำส่ง", labelDone: "นำส่งสำเร็จแล้ว", icon: DeliveryTruckIcon, hasTracking: true },
  { key: "delivered", labelActive: "กำลังส่งมอบ", labelDone: "ส่งสำเร็จ", icon: HandPackageIcon, hasTracking: true },
];

/*
 * Color scheme for delivery status:
 *
 * ✅ สำเร็จ (Completed) — เขียว (#2D6A4F / forest-leaf)
 *    วงกลม: bg เขียวอ่อน, icon เขียวเข้ม
 *    เหตุผล: สีเขียวสื่อถึงความสำเร็จ ผ่านขั้นตอนแล้ว
 *
 * 🔵 กำลังดำเนินการ (Current) — น้ำเงิน (#2563EB / blue-600)
 *    วงกลม: bg น้ำเงินอ่อน, icon น้ำเงิน + pulse animation
 *    เหตุผล: สีน้ำเงินสื่อถึงกำลังทำงานอยู่ ดึงดูดสายตา
 *
 * ⬜ ยังไม่ได้ทำ (Pending) — เทา (#d4d4d4)
 *    วงกลม: bg เทาอ่อน, icon เทา
 *    เหตุผล: สีเทาสื่อว่ายังไม่ถึงขั้นตอนนี้ ไม่ active
 *
 * ❌ ล้มเหลว (Failed) — แดง (#DC2626 / red-600)
 *    วงกลม: bg แดงอ่อน, icon แดง
 *    เหตุผล: สีแดงสื่อถึงข้อผิดพลาด ต้องตรวจสอบ
 */

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
    <div>
      <div className="sticky -top-4 lg:-top-6 z-10 -mx-4 px-4 lg:-mx-6 lg:px-6 pb-6 pt-4 lg:pt-6" style={{ backgroundColor: "#FDF8F2" }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-[#20211F]">ประวัติการรักษา</h2>
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
                    <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-lg font-medium font-mono">
                      {visit.id}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <PaperIcon className="w-3 h-3" /> {visit.date}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${deliveryStatusConfig[visit.delivery]?.badgeClass ?? "bg-gray-100 text-gray-600"}`}>
                      {visit.delivery === "delivered" && "✓ "}{deliveryStatusConfig[visit.delivery]?.label ?? visit.delivery}
                    </span>
                  </div>
                  <p className="font-semibold text-[#20211F] mt-2">{visit.diagnosis}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{visit.doctor}</p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {visit.medicines.map((med) => (
                      <span
                        key={med}
                        className="flex items-center gap-1 text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-lg border border-gray-200"
                      >
                        <PillIcon className="w-3 h-3 text-gray-400" /> {med}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">ดาวน์โหลด PDF</span>
                    <span className="sm:hidden">PDF</span>
                  </button>
                  <button
                    onClick={() => setSelectedVisit(visit)}
                    className="flex items-center gap-2 px-3 py-2 bg-forest-leaf text-white rounded-xl text-sm hover:bg-emerald-800 transition-colors"
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
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVisit(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-[398px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-0">
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold text-[#20211F] leading-normal">
                  ติดตามการจัดส่งยา
                </h3>
                <p className="text-[10px] text-[#a3a3a3] leading-normal">
                  {selectedVisit.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedVisit(null)}
                className="bg-[#ebebec] p-1 rounded-xl flex items-center justify-center"
              >
                <X className="w-4 h-4 text-[#20211F]" />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-[#e5e5e5] mt-4" />

            {/* Timeline */}
            <div className="px-0 py-4">
              {deliverySteps.map((step, idx) => {
                const isFailed = selectedVisit.delivery === "failed";
                const currentIdx = isFailed
                  ? -1
                  : deliverySteps.findIndex((s) => s.key === selectedVisit.delivery);
                const isDone = idx < currentIdx;
                const isCurrent = idx === currentIdx;
                const isActive = isDone || isCurrent;
                const isLast = idx === deliverySteps.length - 1;
                const Icon = step.icon;
                const showTracking = step.hasTracking && isActive;
                const remainingMeds = selectedVisit.medicines.length > 2
                  ? selectedVisit.medicines.length - 2
                  : 0;
                const extraMeds = selectedVisit.medicines.slice(2);

                // Color scheme
                let circleBg = "bg-[#f5f5f5]";
                let iconColor = "text-[#d4d4d4]";
                let textColor = "text-[#c5c5c5]";
                let lineColor = "border-[#e5e5e5]";

                if (isFailed && idx === 0) {
                  // Failed — น้ำตาลแดงนวล
                  circleBg = "bg-[#F5E6E0]";
                  iconColor = "text-[#9B3B30]";
                  textColor = "text-[#9B3B30]";
                } else if (isCurrent) {
                  // Current — ขมิ้นทอง (golden turmeric)
                  circleBg = "bg-[#FDF3E7]";
                  iconColor = "text-[#B8860B]";
                  textColor = "text-[#8B6914]";
                } else if (isDone) {
                  // Completed — เขียวใบไม้
                  circleBg = "bg-[#E8F0EC]";
                  iconColor = "text-[#2D6A4F]";
                  textColor = "text-[#1B4332]";
                  lineColor = "border-[#B7D4C4]";
                }

                return (
                  <div key={step.key} className="relative">
                    {/* Step Row */}
                    <div className="flex gap-4 items-center min-h-14 px-4">
                      {/* Icon Circle */}
                      <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${circleBg}`}>
                        <Icon className={`w-7 h-7 ${iconColor}`} />
                        {isCurrent && (
                          <span className="absolute inset-1 rounded-full animate-pulse bg-[#D4A373]/15 ring-1 ring-[#D4A373]/30" />
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <p className={`text-xs font-medium leading-normal ${textColor}`}>
                          {isDone ? step.labelDone : step.labelActive}
                          {isCurrent && (
                            <span className="ml-1.5 inline-flex items-center text-[9px] font-normal bg-[#FDF3E7] text-[#B8860B] px-1.5 py-0.5 rounded-full">
                              ปัจจุบัน
                            </span>
                          )}
                          {isFailed && idx === 0 && (
                            <span className="ml-1.5 inline-flex items-center text-[9px] font-normal bg-[#F5E6E0] text-[#9B3B30] px-1.5 py-0.5 rounded-full">
                              ล้มเหลว
                            </span>
                          )}
                        </p>
                        {/* Medicines inline - only show for active steps */}
                        {isActive && (
                          <div className="flex items-center gap-2 flex-wrap">
                            {selectedVisit.medicines.slice(0, 2).map((med) => (
                              <span
                                key={med}
                                className="text-[10px] text-[#a3a3a3] leading-[14px] whitespace-nowrap"
                              >
                                {med}
                              </span>
                            ))}
                            {remainingMeds > 0 && (
                              <span className="relative group/tooltip">
                                <span className="bg-[#e7e7e7] rounded-full w-4 h-4 flex items-center justify-center text-[8px] text-[#a3a3a3] flex-shrink-0 cursor-pointer hover:bg-[#d4d4d4] transition-colors">
                                  +{remainingMeds}
                                </span>
                                {/* Hover tooltip */}
                                <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+8px)] hidden group-hover/tooltip:flex flex-col gap-0.5 bg-[#1a1a1a] text-white text-[11px] leading-[18px] rounded-lg px-3 py-2 whitespace-nowrap z-50 shadow-xl">
                                  {extraMeds.map((med) => (
                                    <span key={med} className="flex items-center gap-1.5">
                                      <span className="w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                                      {med}
                                    </span>
                                  ))}
                                  {/* Arrow */}
                                  <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-[#1a1a1a]" />
                                </span>
                              </span>
                            )}
                          </div>
                        )}
                        {/* Tracking number - only show for active steps with tracking */}
                        {showTracking && selectedVisit.trackingNo && (
                          <button
                            onClick={() => navigator.clipboard.writeText(selectedVisit.trackingNo)}
                            className="flex items-center gap-1 hover:opacity-70 transition-opacity cursor-pointer"
                          >
                            <span className="text-[10px] text-[#a3a3a3] leading-[14px]">
                              หมายเลขพัสดุ :{" "}
                              <span className="font-medium text-[#20211F]">
                                {selectedVisit.trackingNo}
                              </span>
                            </span>
                            <ContentCopyIcon className="w-[10px] h-[10px] text-[#a3a3a3] flex-shrink-0" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Vertical Connector Line */}
                    {!isLast && (
                      <div className="flex justify-start px-4">
                        <div className="w-14 flex justify-center">
                          <div className={`h-6 border-l border-dashed ${isDone ? lineColor : "border-[#e5e5e5]"}`} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
