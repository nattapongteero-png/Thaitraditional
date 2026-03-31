"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  User,
  Stethoscope,
  Package,
  CreditCard,
  FileSignature,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Pill,
  Plus,
  X,
  QrCode,
  Download,
  Send,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
} from "lucide-react";
import { PaperIcon } from "../../../../components/PaperIcon";
import { VideoIcon } from "../../../../components/VideoIcon";

const STEPS = [
  { id: 1, label: "ยืนยันผู้ป่วย", icon: User, short: "Verify" },
  { id: 2, label: "คัดกรอง", icon: Stethoscope, short: "Triage" },
  { id: 3, label: "Video Call", icon: VideoIcon, short: "Video" },
  { id: 4, label: "SOAP Note", icon: PaperIcon, short: "SOAP" },
  { id: 5, label: "คำสั่งการรักษา", icon: Package, short: "Orders" },
  { id: 6, label: "ชำระเงิน", icon: CreditCard, short: "Payment" },
  { id: 7, label: "เอกสาร", icon: FileSignature, short: "Docs" },
  { id: 8, label: "ปิดเคส", icon: CheckCircle2, short: "Close" },
];

// Mock patient data
const patient = {
  name: "นาง วิไล สุขภาพดี",
  hn: "HN-0003456",
  cid: "3-1009-XXXXX-XX-X",
  age: 48,
  dob: "1 มกราคม 2521",
  gender: "หญิง",
  phone: "08X-XXX-XXXX",
  address: "123 ถ.สุขุมวิท กรุงเทพฯ",
  allergies: ["แพ้ยา Penicillin", "แพ้ถั่วลิสง"],
  bloodType: "A+",
  weight: "62 kg",
  height: "160 cm",
  bmi: "24.2",
  lastVisit: "ครั้งแรก",
};

const drugSuggestions = [
  "ขมิ้นชัน Capsule 500mg",
  "ไพล Extract 250mg",
  "กระชายดำ Capsule 400mg",
  "ขิง Capsule 300mg",
  "ฟ้าทะลายโจร Tablet 500mg",
];

export default function Page() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 2 - Triage
  const [vitals, setVitals] = useState({ bp: "120/80", pulse: "76", temp: "36.8", spo2: "98" });
  const [unsuitable, setUnsuitable] = useState(false);

  // Step 3 - Video
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [callActive, setCallActive] = useState(false);

  // Step 4 - SOAP
  const [soap, setSoap] = useState({ s: "", o: "", a: "", p: "" });
  const [icd10, setIcd10] = useState("G43.9");

  // Step 5 - Orders
  const [medicines, setMedicines] = useState<string[]>(["ขมิ้นชัน Capsule 500mg"]);
  const [newMed, setNewMed] = useState("");
  const [instructions, setInstructions] = useState("");

  // Step 6 - Payment
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "paid" | "failed">("pending");

  // Step 7 - Docs
  const [signed, setSigned] = useState(false);

  const canNext = () => {
    if (currentStep === 2 && unsuitable) return false;
    return true;
  };

  const handleFinish = () => {
    router.push("/doctor");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-blue-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#20211F]">{patient.name}</h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-olive-charcoal">
                    <span>HN: <strong>{patient.hn}</strong></span>
                    <span>อายุ: <strong>{patient.age} ปี</strong></span>
                    <span>กรุ๊ปเลือด: <strong>{patient.bloodType}</strong></span>
                  </div>
                  <p className="text-xs text-muted-moss mt-1">CID: {patient.cid}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
                <h4 className="text-[#20211F] mb-4">ข้อมูลทั่วไป</h4>
                <div className="space-y-2.5">
                  {[
                    { label: "วันเกิด", value: patient.dob },
                    { label: "เพศ", value: patient.gender },
                    { label: "โทรศัพท์", value: patient.phone },
                    { label: "น้ำหนัก / ส่วนสูง", value: `${patient.weight} / ${patient.height}` },
                    { label: "BMI", value: patient.bmi },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <span className="text-muted-moss">{row.label}</span>
                      <span className="text-[#20211F] font-medium">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
                <h4 className="text-[#20211F] mb-4">ประวัติแพ้ยา / ข้อควรระวัง</h4>
                <div className="space-y-2">
                  {patient.allergies.map((allergy) => (
                    <div
                      key={allergy}
                      className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3"
                    >
                      <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span className="text-sm text-red-800 font-medium">{allergy}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-50">
                  <p className="text-xs text-muted-moss">แหล่งข้อมูล: EHP · อัปเดตล่าสุด: 2 มี.ค. 69</p>
                </div>
              </div>
            </div>

            <div className="bg-pale-mint border border-pale-mint rounded-xl p-4">
              <p className="text-sm text-[#20211F]">
                ✓ ข้อมูลผู้ป่วยถูกดึงจากระบบ EHP เรียบร้อยแล้ว กรุณายืนยันตัวตนผู้ป่วยก่อนดำเนินการต่อ
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {unsuitable && (
              <div className="bg-red-50 border border-red-300 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-800">ผู้ป่วยไม่เหมาะสมสำหรับ Telemedicine</p>
                  <p className="text-sm text-red-600 mt-0.5">กรุณาส่งต่อผู้ป่วยเพื่อรับการรักษาแบบ Onsite</p>
                </div>
              </div>
            )}

            {/* Vitals */}
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
              <h4 className="text-[#20211F] mb-4">ข้อมูล Vital Signs</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "ความดันโลหิต", key: "bp", unit: "mmHg", placeholder: "120/80" },
                  { label: "ชีพจร", key: "pulse", unit: "bpm", placeholder: "76" },
                  { label: "อุณหภูมิ", key: "temp", unit: "°C", placeholder: "36.8" },
                  { label: "SpO2", key: "spo2", unit: "%", placeholder: "98" },
                ].map((v) => (
                  <div key={v.key}>
                    <label className="text-xs text-muted-moss block mb-1">{v.label}</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={vitals[v.key as keyof typeof vitals]}
                        onChange={(e) => setVitals({ ...vitals, [v.key]: e.target.value })}
                        placeholder={v.placeholder}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-warm-sand focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-moss">{v.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chief Complaint */}
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
              <h4 className="text-[#20211F] mb-4">อาการสำคัญ (Chief Complaint)</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                {["ปวดหัว/ไมเกรน", "ปวดกล้ามเนื้อ", "อ่อนเพลีย", "นอนไม่หลับ", "ระบบย่อยอาหาร", "ปัญหาผิวหนัง", "ปวดข้อ", "ภูมิแพ้", "อื่นๆ"].map((symptom) => (
                  <button
                    key={symptom}
                    className="py-2 px-3 text-xs border border-border rounded-xl hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-all text-left"
                  >
                    {symptom}
                  </button>
                ))}
              </div>
              <textarea
                rows={3}
                placeholder="บันทึกอาการเพิ่มเติม..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-warm-sand focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
              />
            </div>

            {/* Telemedicine Flag */}
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[#20211F]">ประเมินความเหมาะสม Telemedicine</h4>
                  <p className="text-sm text-muted-moss mt-0.5">ผู้ป่วยรายนี้เหมาะสมสำหรับการรักษาผ่าน Video หรือไม่?</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUnsuitable(false)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${!unsuitable ? "bg-forest-leaf text-white" : "border border-border text-olive-charcoal hover:bg-pale-mint"}`}
                  >
                    เหมาะสม ✓
                  </button>
                  <button
                    onClick={() => setUnsuitable(true)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${unsuitable ? "bg-red-600 text-white" : "border border-border text-olive-charcoal hover:bg-red-50"}`}
                  >
                    ไม่เหมาะสม ✗
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            {!callActive ? (
              <div className="bg-white border border-border rounded-2xl p-8 shadow-sm text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <VideoIcon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-[#20211F]">เริ่มการปรึกษาผ่านวิดีโอ</h3>
                <p className="text-muted-moss text-sm mt-2 mb-6">
                  ผู้ป่วย: {patient.name} · กำลังรอในห้องรอ
                </p>
                <div className="flex justify-center gap-3 mb-6">
                  <button
                    onClick={() => setMicOn(!micOn)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm ${micOn ? "bg-muted text-olive-charcoal" : "bg-red-100 text-red-700"} hover:opacity-80 transition-all`}
                  >
                    {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    {micOn ? "ไมค์เปิด" : "ไมค์ปิด"}
                  </button>
                  <button
                    onClick={() => setCamOn(!camOn)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm ${camOn ? "bg-muted text-olive-charcoal" : "bg-red-100 text-red-700"} hover:opacity-80 transition-all`}
                  >
                    {camOn ? <VideoIcon className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    {camOn ? "กล้องเปิด" : "กล้องปิด"}
                  </button>
                </div>
                <button
                  onClick={() => setCallActive(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  เริ่มต้น Video Call
                </button>
              </div>
            ) : (
              <div className="bg-slate-900 rounded-2xl overflow-hidden" style={{ height: "400px" }}>
                <div className="relative h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-forest-leaf rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-white">{patient.name}</p>
                    <p className="text-white/60 text-sm mt-1">เชื่อมต่อแล้ว • 00:05:23</p>
                  </div>

                  {/* Self view */}
                  <div className="absolute bottom-4 right-4 w-32 h-20 bg-slate-700 rounded-xl border-2 border-white/20 flex items-center justify-center">
                    <div className="text-center">
                      <Stethoscope className="w-6 h-6 text-white mx-auto" />
                      <p className="text-white text-xs mt-1">คุณ (หมอ)</p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                    <button
                      onClick={() => setMicOn(!micOn)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${micOn ? "bg-white/20" : "bg-red-600"}`}
                    >
                      {micOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
                    </button>
                    <button
                      onClick={() => { setCallActive(false); }}
                      className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center"
                    >
                      <PhoneOff className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={() => setCamOn(!camOn)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${camOn ? "bg-white/20" : "bg-red-600"}`}
                    >
                      {camOn ? <VideoIcon className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
                    </button>
                  </div>

                  <div className="absolute top-3 left-3 bg-black/40 backdrop-blur px-2 py-1 rounded-lg text-xs text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    กำลังบันทึก metadata
                  </div>
                </div>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-800">
                ⏺ ระบบบันทึก metadata ของการ Video Call (เวลาเริ่ม-สิ้นสุด, encounter_id, IP) ตาม พ.ร.บ. สุขภาพดิจิทัล
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { key: "s", label: "S – Subjective", placeholder: "อาการที่ผู้ป่วยบอก เช่น ปวดหัวมา 3 วัน ปวดบริเวณขมับ...", color: "border-blue-200 focus:ring-blue-400" },
                { key: "o", label: "O – Objective", placeholder: "ผลตรวจร่างกาย / Vital Signs เช่น BP 120/80, Pulse 76...", color: "border-teal-200 focus:ring-teal-400" },
                { key: "a", label: "A – Assessment", placeholder: "การวินิจฉัย เช่น Migraine without aura (G43.9)...", color: "border-amber-200 focus:ring-amber-400" },
                { key: "p", label: "P – Plan", placeholder: "แผนการรักษา เช่น สั่งยาขมิ้นชัน 500mg หลังอาหาร 2 มื้อ...", color: "border-pale-mint focus:ring-forest-leaf" },
              ].map((field) => (
                <div key={field.key} className="bg-white border border-border rounded-2xl p-5 shadow-sm">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">{field.label}</label>
                  <textarea
                    rows={4}
                    value={soap[field.key as keyof typeof soap]}
                    onChange={(e) => setSoap({ ...soap, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className={`w-full px-4 py-3 rounded-xl border bg-warm-sand focus:outline-none focus:ring-2 text-sm resize-none ${field.color}`}
                  />
                </div>
              ))}
            </div>

            {/* ICD-10 */}
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
              <h4 className="text-[#20211F] mb-3">รหัสโรค ICD-10-TM</h4>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={icd10}
                    onChange={(e) => setIcd10(e.target.value)}
                    placeholder="เช่น G43.9"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-warm-sand focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm font-mono"
                  />
                </div>
                <button className="px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl text-sm hover:bg-blue-100 transition-colors">
                  ค้นหา ICD
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["G43.9 - Migraine", "J30.1 - Allergic rhinitis", "M54.5 - Low back pain", "R53.83 - Fatigue"].map((code) => (
                  <button
                    key={code}
                    onClick={() => setIcd10(code.split(" ")[0])}
                    className="text-xs bg-muted text-olive-charcoal px-3 py-1.5 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-5">
            {/* Medicines */}
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
              <h4 className="text-[#20211F] mb-4">รายการยาสมุนไพร</h4>
              <div className="space-y-2 mb-4">
                {medicines.map((med, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3">
                    <Pill className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span className="flex-1 text-sm text-gray-800">{med}</span>
                    <button onClick={() => setMedicines(medicines.filter((_, i) => i !== idx))}>
                      <X className="w-4 h-4 text-muted-moss hover:text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMed}
                  onChange={(e) => setNewMed(e.target.value)}
                  placeholder="เพิ่มยาสมุนไพร..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-warm-sand focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                />
                <button
                  onClick={() => { if (newMed) { setMedicines([...medicines, newMed]); setNewMed(""); } }}
                  className="px-4 py-2.5 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {drugSuggestions.filter((d) => !medicines.includes(d)).map((d) => (
                  <button
                    key={d}
                    onClick={() => setMedicines([...medicines, d])}
                    className="text-xs bg-muted text-olive-charcoal px-2.5 py-1.5 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition-colors"
                  >
                    + {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Procedures */}
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
              <h4 className="text-[#20211F] mb-3">หัตถการ (Procedures)</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {["นวดแผนไทย", "ประคบสมุนไพร", "อบไอน้ำสมุนไพร", "รมยา", "กดจุด", "ไม่มี"].map((p) => (
                  <button
                    key={p}
                    className="py-2 px-3 text-xs border border-border rounded-xl hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-all"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
              <h4 className="text-[#20211F] mb-3">คำแนะนำผู้ป่วย</h4>
              <textarea
                rows={4}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="คำแนะนำในการปฏิบัติตัว เช่น ดื่มน้ำ 8 แก้ว/วัน พักผ่อน 8 ชม. รับประทานยาหลังอาหาร..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-warm-sand focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {["ดื่มน้ำมากๆ", "พักผ่อนให้เพียงพอ", "งดของมัน/หวาน", "ออกกำลังกายเบาๆ"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setInstructions((v) => v ? `${v}\n• ${t}` : `• ${t}`)}
                    className="text-xs bg-muted text-olive-charcoal px-2.5 py-1.5 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    + {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-5">
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
              <h4 className="text-[#20211F] mb-4">สรุปค่าบริการ</h4>
              <div className="space-y-3">
                {[
                  { label: "ค่าปรึกษาแพทย์ (Consultation Fee)", amount: "500" },
                  { label: "ยาสมุนไพร (ขมิ้นชัน + ไพล Extract)", amount: "350" },
                  { label: "ค่าจัดส่งยา", amount: "50" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-olive-charcoal">{item.label}</span>
                    <span className="text-[#20211F]">฿{item.amount}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-semibold text-[#20211F]">รวมทั้งสิ้น</span>
                  <span className="font-semibold text-forest-leaf text-lg">฿900.00</span>
                </div>
              </div>
            </div>

            {paymentStatus === "pending" && (
              <div className="bg-white border border-border rounded-2xl p-5 shadow-sm space-y-4">
                <h4 className="text-[#20211F]">ช่องทางชำระเงิน</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["PromptPay / QR Code", "บัตรเครดิต/เดบิต", "Mobile Banking", "เงินสด (Onsite)"].map((m) => (
                    <button
                      key={m}
                      className="p-3 border-2 border-border rounded-xl text-sm text-olive-charcoal hover:border-forest-leaf hover:bg-pale-mint hover:text-forest-leaf transition-all text-center"
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPaymentStatus("paid")}
                    className="flex-1 py-3 bg-forest-leaf text-white rounded-xl font-semibold hover:bg-forest-leaf-hover transition-colors"
                  >
                    สร้าง Payment Link
                  </button>
                  <button
                    onClick={() => setPaymentStatus("paid")}
                    className="flex-1 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium hover:bg-blue-100 transition-colors"
                  >
                    Mark as Paid
                  </button>
                </div>
              </div>
            )}

            {paymentStatus === "paid" && (
              <div className="bg-pale-mint border border-emerald-300 rounded-2xl p-6 text-center">
                <CheckCircle2 className="w-14 h-14 text-forest-leaf mx-auto mb-3" />
                <h3 className="text-[#20211F]">ชำระเงินสำเร็จ</h3>
                <p className="text-forest-leaf text-sm mt-1">฿900.00 · REF: PAY-20260302-0034</p>
                <p className="text-forest-leaf text-xs mt-0.5">2 มี.ค. 2569 เวลา 10:45:23 น.</p>
              </div>
            )}
          </div>
        );

      case 7:
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
                <h4 className="text-[#20211F] mb-4">เอกสารที่จะสร้าง</h4>
                <div className="space-y-3">
                  {[
                    { label: "ใบสรุปการรักษา (Visit Summary)", ready: true },
                    { label: "ใบสั่งยาแผนไทย (Thai Medicine Prescription)", ready: true },
                    { label: "ใบเสร็จรับเงิน (Receipt)", ready: true },
                    { label: "ใบส่งตัว (Referral) – ถ้ามี", ready: false },
                  ].map((doc) => (
                    <div key={doc.label} className="flex items-center gap-3 p-3 bg-warm-sand rounded-xl">
                      <PaperIcon className={`w-4 h-4 flex-shrink-0 ${doc.ready ? "text-blue-600" : "text-gray-300"}`} />
                      <span className={`flex-1 text-sm ${doc.ready ? "text-gray-800" : "text-muted-moss"}`}>{doc.label}</span>
                      {doc.ready && (
                        <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                          <Download className="w-3 h-3" /> Preview
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm">
                  Generate PDF ทั้งหมด
                </button>
              </div>

              <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
                <h4 className="text-[#20211F] mb-4">ลงนามดิจิทัล (MOPH CA)</h4>
                {!signed ? (
                  <div className="space-y-4">
                    <div className="bg-warm-sand rounded-xl p-4 text-center">
                      <FileSignature className="w-10 h-10 text-muted-moss mx-auto mb-2" />
                      <p className="text-sm text-olive-charcoal">ลงนามเอกสารด้วย MOPH CA Digital Signature</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-moss block mb-1">PIN ลงนาม</label>
                      <input
                        type="password"
                        placeholder="กรอก PIN 6 หลัก"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-warm-sand focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                        maxLength={6}
                      />
                    </div>
                    <button
                      onClick={() => setSigned(true)}
                      className="w-full py-2.5 bg-forest-leaf text-white rounded-xl font-medium hover:bg-violet-700 transition-colors text-sm"
                    >
                      ลงนามเอกสาร (Sign Documents)
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-pale-mint border border-pale-mint rounded-xl p-4 text-center">
                      <CheckCircle2 className="w-10 h-10 text-forest-leaf mx-auto mb-2" />
                      <p className="text-sm font-semibold text-[#20211F]">ลงนามสำเร็จ</p>
                      <p className="text-xs text-forest-leaf mt-1">Timestamp: 2026-03-02T10:47:23Z</p>
                      <p className="text-xs text-forest-leaf">Hash: SHA256: a3f8b2...</p>
                    </div>
                    <div className="bg-warm-sand rounded-xl p-4 text-center">
                      <QrCode className="w-16 h-16 text-olive-charcoal mx-auto" />
                      <p className="text-xs text-muted-moss mt-2">QR Code สำหรับตรวจสอบความถูกต้อง</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-5">
            {/* Summary */}
            <div className="bg-pale-mint border border-pale-mint rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-8 h-8 text-forest-leaf" />
                <div>
                  <h3 className="text-[#20211F]">Visit สำเร็จ</h3>
                  <p className="text-sm text-forest-leaf">Encounter ID: ENC-20260302-0034</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "ผู้ป่วย", value: patient.name },
                  { label: "การวินิจฉัย", value: `ICD-10: ${icd10}` },
                  { label: "ยาที่สั่ง", value: `${medicines.length} รายการ` },
                  { label: "ชำระเงิน", value: "฿900 ✓" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/70 rounded-xl p-3">
                    <p className="text-xs text-forest-leaf">{s.label}</p>
                    <p className="text-sm font-semibold text-[#20211F] mt-0.5">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notify Patient */}
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm space-y-3">
              <h4 className="text-[#20211F]">แจ้งผู้ป่วย</h4>
              <div className="space-y-2">
                {[
                  { label: "ส่ง SMS สรุปผลการรักษา", checked: true },
                  { label: "ส่งอีเมลเอกสาร PDF", checked: true },
                  { label: "แจ้ง LINE (ถ้ามี)", checked: false },
                ].map((n) => (
                  <label key={n.label} className="flex items-center gap-3 p-3 bg-warm-sand rounded-xl cursor-pointer hover:bg-pale-mint transition-colors">
                    <input type="checkbox" defaultChecked={n.checked} className="rounded" />
                    <span className="text-sm text-olive-charcoal">{n.label}</span>
                  </label>
                ))}
              </div>
              <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm">
                <Send className="w-4 h-4" />
                ส่งการแจ้งเตือนผู้ป่วย
              </button>
            </div>

            {/* Follow-up */}
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm space-y-3">
              <h4 className="text-[#20211F]">นัดติดตามผล (Follow-up)</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-moss block mb-1">วันนัด</label>
                  <input
                    type="date"
                    defaultValue="2026-03-10"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-warm-sand focus:outline-none focus:ring-2 focus:ring-forest-leaf text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-moss block mb-1">เหตุผล</label>
                  <input
                    type="text"
                    defaultValue="ติดตามอาการปวดหัว"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-warm-sand focus:outline-none focus:ring-2 focus:ring-forest-leaf text-sm"
                  />
                </div>
              </div>
              <button className="w-full py-2.5 bg-pale-mint text-forest-leaf border border-pale-mint rounded-xl font-medium hover:bg-pale-mint transition-colors text-sm">
                สร้างนัดติดตาม
              </button>
            </div>

            {/* Close */}
            <button
              onClick={handleFinish}
              className="w-full py-4 bg-forest-leaf text-white rounded-2xl font-semibold hover:bg-forest-leaf-hover transition-colors text-base flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              ปิดเคส (Close Case)
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Back */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/doctor")}
          className="flex items-center gap-2 text-muted-moss hover:text-olive-charcoal text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          กลับสู่คิว
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-olive-charcoal text-sm">Visit: {patient.name}</span>
        <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-lg">{patient.hn}</span>
      </div>

      {/* Step Progress */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-4 overflow-x-auto">
        <div className="flex items-center min-w-max">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isDone = step.id < currentStep;
            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex flex-col items-center gap-1 px-3 transition-all`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all
                      ${isActive ? "bg-blue-600 text-white shadow-md" : ""}
                      ${isDone ? "bg-forest-leaf text-white" : ""}
                      ${!isActive && !isDone ? "bg-muted text-muted-moss" : ""}`}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-xs whitespace-nowrap ${isActive ? "text-blue-600 font-semibold" : isDone ? "text-forest-leaf" : "text-muted-moss"}`}>
                    {step.short}
                  </span>
                </button>
                {idx < STEPS.length - 1 && (
                  <div className={`h-0.5 w-6 mx-1 rounded-full transition-colors ${isDone ? "bg-emerald-400" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Header — title only, no buttons */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#20211F]">
            Step {currentStep}: {STEPS[currentStep - 1].label}
          </h2>
          <p className="text-muted-moss text-sm mt-0.5">{currentStep} จาก 8 ขั้นตอน</p>
        </div>
      </div>

      {/* Step Content */}
      <div className="animate-in fade-in duration-200 pb-24 sm:pb-0">
        {renderStep()}
      </div>

      {/* Navigation Bar — fixed bottom on mobile, sticky on desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-3 p-4 bg-white/95 backdrop-blur-sm border-t border-border sm:static sm:bg-transparent sm:border-0 sm:p-0 sm:sticky sm:bottom-4 sm:z-10 sm:backdrop-blur-none">
        {currentStep > 1 ? (
          <button
            onClick={() => setCurrentStep((s) => s - 1)}
            className="flex items-center justify-center gap-2 flex-1 sm:flex-none sm:px-5 py-3 bg-white border border-border text-olive-charcoal rounded-xl text-sm font-medium hover:bg-pale-mint transition-colors shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            ย้อนกลับ
          </button>
        ) : (
          <div className="flex-1 sm:flex-none sm:hidden" />
        )}
        {currentStep < STEPS.length ? (
          <button
            onClick={() => canNext() && setCurrentStep((s) => s + 1)}
            disabled={!canNext()}
            className={`flex items-center justify-center gap-2 flex-1 sm:flex-none sm:px-5 py-3 rounded-xl text-sm font-medium transition-all shadow-sm
              ${canNext() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-muted-moss cursor-not-allowed"}`}
          >
            ถัดไป
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => canNext() && router.push("/doctor")}
            disabled={!canNext()}
            className={`flex items-center justify-center gap-2 flex-1 sm:flex-none sm:px-5 py-3 rounded-xl text-sm font-medium transition-all shadow-sm
              ${canNext() ? "bg-forest-leaf text-white hover:bg-forest-leaf" : "bg-gray-200 text-muted-moss cursor-not-allowed"}`}
          >
            บันทึกและเสร็จสิ้น
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
