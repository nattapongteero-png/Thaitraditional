import { useState } from "react";
import { ShieldCheck, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { TimeCircleIcon } from "../../components/TimeCircleIcon";
import { PaperIcon } from "../../components/PaperIcon";

const consentHistory = [
  {
    id: 1,
    version: "v2.1",
    date: "15 ก.พ. 2569",
    ip: "171.xxx.xxx.xxx",
    status: "accepted",
    type: "Privacy Notice & Consent",
  },
  {
    id: 2,
    version: "v2.0",
    date: "20 ม.ค. 2569",
    ip: "171.xxx.xxx.xxx",
    status: "accepted",
    type: "Privacy Notice & Consent",
  },
  {
    id: 3,
    version: "v1.5",
    date: "5 ธ.ค. 2568",
    ip: "110.xxx.xxx.xxx",
    status: "accepted",
    type: "Privacy Notice & Consent",
  },
];

export function ConsentPage() {
  const [expanded, setExpanded] = useState(false);
  const [accepted, setAccepted] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">ความยินยอมและนโยบายความเป็นส่วนตัว</h2>
        <p className="text-gray-500 text-sm mt-1">จัดการการยินยอมและดูประวัติการลงนาม</p>
      </div>

      {/* Current Status */}
      <div className={`rounded-2xl border p-5 ${accepted ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${accepted ? "bg-emerald-100" : "bg-amber-100"}`}>
            {accepted ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            ) : (
              <AlertCircle className="w-7 h-7 text-amber-600" />
            )}
          </div>
          <div className="flex-1">
            <p className={`font-semibold ${accepted ? "text-emerald-800" : "text-amber-800"}`}>
              {accepted ? "ยินยอมแล้ว (ฉบับปัจจุบัน v2.1)" : "ยังไม่ได้ให้ความยินยอม"}
            </p>
            <p className={`text-sm mt-0.5 ${accepted ? "text-emerald-600" : "text-amber-600"}`}>
              {accepted
                ? "ให้ความยินยอมเมื่อ 15 ก.พ. 2569 เวลา 10:32 น."
                : "กรุณาอ่านและให้ความยินยอมเพื่อใช้บริการ"}
            </p>
          </div>
          {accepted && (
            <button
              onClick={() => setAccepted(false)}
              className="text-xs text-red-500 hover:underline"
            >
              ถอนความยินยอม
            </button>
          )}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <button
          className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-3">
            <PaperIcon className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="font-semibold text-gray-900">นโยบายความเป็นส่วนตัว (Privacy Notice)</p>
              <p className="text-xs text-gray-500">เวอร์ชัน 2.1 • อัปเดต 1 ก.พ. 2569</p>
            </div>
          </div>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {expanded && (
          <div className="px-5 pb-5 space-y-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
            <div className="pt-4">
              <h4 className="text-gray-900 mb-2">1. การเก็บรวบรวมข้อมูลส่วนบุคคล</h4>
              <p>ศูนย์การแพทย์แผนไทยจะเก็บรวบรวมข้อมูลส่วนบุคคลของท่าน ได้แก่ ชื่อ-นามสกุล หมายเลขบัตรประชาชน ข้อมูลสุขภาพ ประวัติการรักษา และข้อมูลการติดต่อ เพื่อวัตถุประสงค์ในการให้บริการทางการแพทย์แผนไทย</p>
            </div>
            <div>
              <h4 className="text-gray-900 mb-2">2. วัตถุประสงค์การใช้ข้อมูล</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>เพื่อการวินิจฉัยและรักษาโรคทางการแพทย์แผนไทย</li>
                <li>เพื่อจัดทำประวัติการรักษาและเอกสารทางการแพทย์</li>
                <li>เพื่อการชำระเงินค่าบริการ</li>
                <li>เพื่อการแจ้งนัดหมายและติดตามผลการรักษา</li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 mb-2">3. การเปิดเผยข้อมูล</h4>
              <p>ข้อมูลของท่านจะไม่ถูกเปิดเผยให้บุคคลภายนอก เว้นแต่เป็นไปตามที่กฎหมายกำหนด หรือได้รับความยินยอมจากท่าน</p>
            </div>
            <div>
              <h4 className="text-gray-900 mb-2">4. สิทธิของเจ้าของข้อมูล (PDPA)</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>สิทธิในการเข้าถึงและขอสำเนาข้อมูลส่วนบุคคล</li>
                <li>สิทธิในการแก้ไขข้อมูลส่วนบุคคล</li>
                <li>สิทธิในการลบข้อมูลส่วนบุคคล</li>
                <li>สิทธิในการถอนความยินยอม</li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 mb-2">5. ติดต่อเจ้าหน้าที่คุ้มครองข้อมูล</h4>
              <p>Email: dpo@thaimed.go.th | โทร: 02-XXX-XXXX</p>
            </div>
          </div>
        )}
      </div>

      {/* Consent Actions */}
      {!accepted && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <p className="text-sm text-gray-700">
            ท่านได้อ่านและเข้าใจนโยบายความเป็นส่วนตัวข้างต้นแล้ว และยินยอมให้ศูนย์การแพทย์แผนไทยเก็บรวบรวม
            ใช้ และเปิดเผยข้อมูลส่วนบุคคลของท่านตามวัตถุประสงค์ที่ระบุไว้
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setAccepted(true)}
              className="flex-1 py-3 bg-emerald-700 text-white rounded-xl font-semibold hover:bg-emerald-800 transition-colors"
            >
              ยินยอม (Accept)
            </button>
            <button className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              ปฏิเสธ (Decline)
            </button>
          </div>
        </div>
      )}

      {/* History */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-50">
          <TimeCircleIcon className="w-4 h-4 text-gray-400" />
          <h4 className="text-gray-900">ประวัติการให้ความยินยอม</h4>
        </div>
        <div className="divide-y divide-gray-50">
          {consentHistory.map((c) => (
            <div key={c.id} className="px-5 py-4 flex items-center gap-4">
              <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{c.type} {c.version}</p>
                <p className="text-xs text-gray-500 mt-0.5">{c.date} • IP: {c.ip}</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-lg">
                ✓ ยินยอม
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}