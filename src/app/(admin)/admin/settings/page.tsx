"use client";

import { useState } from "react";
import {
  Save,
  Plus,
  X,
  Globe,
  Plug,
  CheckCircle2,
} from "lucide-react";
import { CalendarIcon } from "../../../components/CalendarIcon";
import { NotificationIcon } from "../../../components/NotificationIcon";
import { PaperIcon } from "../../../components/PaperIcon";

const tabs = [
  { id: "general", label: "ทั่วไป", icon: Globe },
  { id: "slots", label: "ช่วงเวลา", icon: CalendarIcon },
  { id: "integration", label: "Integration", icon: Plug },
  { id: "notifications", label: "การแจ้งเตือน", icon: NotificationIcon },
  { id: "templates", label: "Templates", icon: PaperIcon },
];

const defaultSlots = [
  { id: 1, day: "จันทร์", start: "09:00", end: "17:00", active: true },
  { id: 2, day: "อังคาร", start: "09:00", end: "17:00", active: true },
  { id: 3, day: "พุธ", start: "09:00", end: "17:00", active: true },
  { id: 4, day: "พฤหัสบดี", start: "09:00", end: "17:00", active: true },
  { id: 5, day: "ศุกร์", start: "09:00", end: "16:00", active: true },
  { id: 6, day: "เสาร์", start: "09:00", end: "12:00", active: true },
  { id: 7, day: "อาทิตย์", start: "09:00", end: "12:00", active: false },
];

const templateList = [
  { id: 1, name: "ไมเกรน / ปวดหัว", lastUsed: "วันนี้", uses: 28 },
  { id: 2, name: "ปวดหลัง / กล้ามเนื้อ", lastUsed: "เมื่อวาน", uses: 22 },
  { id: 3, name: "ภูมิแพ้", lastUsed: "เมื่อวาน", uses: 18 },
  { id: 4, name: "อ่อนเพลีย / นอนไม่หลับ", lastUsed: "3 วันที่แล้ว", uses: 15 },
  { id: 5, name: "ระบบย่อยอาหาร", lastUsed: "5 วันที่แล้ว", uses: 10 },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("general");
  const [slots, setSlots] = useState(defaultSlots);
  const [saved, setSaved] = useState(false);
  const [integrations, setIntegrations] = useState({
    ehp: true,
    payment: true,
    mophCa: false,
    jitsi: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-deep-emerald">ตั้งค่าคลินิก</h2>
          <p className="text-muted-moss text-sm mt-1">กำหนดค่าระบบและการบูรณาการ</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm ${
            saved ? "bg-forest-leaf text-white" : "bg-forest-leaf text-white hover:bg-forest-leaf-hover"
          }`}
        >
          {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "บันทึกแล้ว!" : "บันทึกการตั้งค่า"}
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeTab === tab.id
                  ? "bg-forest-leaf text-white shadow-sm"
                  : "bg-white border border-border text-olive-charcoal hover:bg-pale-mint"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* General */}
      {activeTab === "general" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-5 space-y-4">
            <h4 className="text-deep-emerald">ข้อมูลคลินิก</h4>
            {[
              { label: "ชื่อคลินิก", value: "ศูนย์การแพทย์แผนไทย" },
              { label: "ที่อยู่", value: "123 ถ.ราชวิถี กรุงเทพฯ 10400" },
              { label: "โทรศัพท์", value: "02-XXX-XXXX" },
              { label: "อีเมล", value: "info@thaimed.go.th" },
              { label: "เว็บไซต์", value: "thaimed.go.th" },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs text-muted-moss block mb-1">{f.label}</label>
                <input
                  type="text"
                  defaultValue={f.value}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-warm-sand focus:outline-none focus:ring-2 focus:ring-forest-leaf text-sm"
                />
              </div>
            ))}
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5 space-y-4">
              <h4 className="text-deep-emerald">Feature Flags</h4>
              {[
                { label: "Standalone Mode", desc: "ทำงานโดยไม่ต้องเชื่อมต่อ EHP", enabled: false },
                { label: "Integrated Mode (EHP)", desc: "เชื่อมต่อ PhamEnpointAPI", enabled: true },
                { label: "Auto-generate PDF", desc: "สร้าง PDF อัตโนมัติหลัง Visit", enabled: true },
                { label: "Auto-sign Documents", desc: "ลงนามอัตโนมัติด้วย MOPH CA", enabled: false },
                { label: "Auto-notify Patient", desc: "แจ้งผู้ป่วยอัตโนมัติ", enabled: true },
              ].map((f) => (
                <div key={f.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-800">{f.label}</p>
                    <p className="text-xs text-muted-moss">{f.desc}</p>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full relative transition-all ${f.enabled ? "bg-forest-leaf" : "bg-gray-200"}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${f.enabled ? "right-1" : "left-1"}`} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-border shadow-sm p-5 space-y-3">
              <h4 className="text-deep-emerald">Session & Security</h4>
              {[
                { label: "Session Timeout (นาที)", value: "30" },
                { label: "Max Login Attempts", value: "5" },
                { label: "Password Min Length", value: "8" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <label className="text-sm text-olive-charcoal flex-1">{f.label}</label>
                  <input
                    type="number"
                    defaultValue={f.value}
                    className="w-20 px-3 py-2 rounded-xl border border-border bg-warm-sand focus:outline-none focus:ring-2 focus:ring-forest-leaf text-sm text-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Slots */}
      {activeTab === "slots" && (
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-deep-emerald">ช่วงเวลาให้บริการ</h4>
            <div className="flex items-center gap-2">
              <label className="text-sm text-olive-charcoal">ระยะเวลา Slot</label>
              <select className="px-3 py-2 rounded-xl border border-border bg-warm-sand text-sm focus:outline-none focus:ring-2 focus:ring-forest-leaf">
                <option>30 นาที</option>
                <option>45 นาที</option>
                <option>60 นาที</option>
              </select>
            </div>
          </div>
          <div className="space-y-3">
            {slots.map((slot) => (
              <div key={slot.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${slot.active ? "border-pale-mint bg-pale-mint/50" : "border-border bg-warm-sand/50 opacity-60"}`}>
                <div className="w-20 text-sm font-medium text-olive-charcoal">{slot.day}</div>
                <input
                  type="time"
                  value={slot.start}
                  disabled={!slot.active}
                  onChange={(e) => setSlots((s) => s.map((sl) => sl.id === slot.id ? { ...sl, start: e.target.value } : sl))}
                  className="px-3 py-2 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-leaf disabled:opacity-50"
                />
                <span className="text-muted-moss text-sm">ถึง</span>
                <input
                  type="time"
                  value={slot.end}
                  disabled={!slot.active}
                  onChange={(e) => setSlots((s) => s.map((sl) => sl.id === slot.id ? { ...sl, end: e.target.value } : sl))}
                  className="px-3 py-2 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-leaf disabled:opacity-50"
                />
                <div className="flex-1" />
                <button
                  onClick={() => setSlots((s) => s.map((sl) => sl.id === slot.id ? { ...sl, active: !sl.active } : sl))}
                  className={`w-11 h-6 rounded-full relative transition-all ${slot.active ? "bg-forest-leaf" : "bg-gray-300"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${slot.active ? "right-1" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integration */}
      {activeTab === "integration" && (
        <div className="space-y-5">
          {[
            { key: "ehp", name: "EHP (PhamEnpoint API)", desc: "ดึงข้อมูลผู้ป่วย นัดหมาย และยาจาก EHP", color: "blue" },
            { key: "payment", name: "Payment Gateway", desc: "ชำระเงินออนไลน์ผ่าน Gateway", color: "emerald" },
            { key: "mophCa", name: "MOPH CA (Digital Signature)", desc: "ลงนามดิจิทัลด้วยใบรับรองอิเล็กทรอนิกส์", color: "violet" },
            { key: "jitsi", name: "Jitsi Video Server", desc: "Video Consultation ผ่าน WebRTC", color: "teal" },
          ].map((intg) => {
            const enabled = integrations[intg.key as keyof typeof integrations];
            return (
              <div key={intg.key} className="bg-white rounded-2xl border border-border shadow-sm p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-${intg.color}-100 flex items-center justify-center flex-shrink-0`}>
                    <Plug className={`w-5 h-5 text-${intg.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-deep-emerald">{intg.name}</h4>
                      <button
                        onClick={() => setIntegrations((i) => ({ ...i, [intg.key]: !enabled }))}
                        className={`w-12 h-6 rounded-full relative transition-all ${enabled ? "bg-forest-leaf" : "bg-gray-200"}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${enabled ? "right-1" : "left-1"}`} />
                      </button>
                    </div>
                    <p className="text-sm text-muted-moss mt-0.5">{intg.desc}</p>
                    {enabled && (
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-muted-moss block mb-1">API Endpoint</label>
                          <input
                            type="text"
                            placeholder="https://api.example.com/v1"
                            className="w-full px-3 py-2 rounded-xl border border-border bg-warm-sand text-xs focus:outline-none focus:ring-2 focus:ring-forest-leaf"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-moss block mb-1">API Key / Token</label>
                          <input
                            type="password"
                            placeholder="••••••••••••"
                            className="w-full px-3 py-2 rounded-xl border border-border bg-warm-sand text-xs focus:outline-none focus:ring-2 focus:ring-forest-leaf"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Templates */}
      {activeTab === "templates" && (
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-moss">{templateList.length} templates</p>
            <button className="flex items-center gap-2 px-4 py-2 bg-forest-leaf text-white rounded-xl text-sm font-medium hover:bg-forest-leaf-hover transition-colors">
              <Plus className="w-4 h-4" />
              Template ใหม่
            </button>
          </div>
          <div className="space-y-3">
            {templateList.map((t) => (
              <div key={t.id} className="bg-white rounded-xl border border-border shadow-sm p-4 flex items-center gap-4">
                <div className="w-9 h-9 bg-pale-mint rounded-xl flex items-center justify-center flex-shrink-0">
                  <PaperIcon className="w-4 h-4 text-forest-leaf" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-deep-emerald">{t.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-muted-moss">ใช้ล่าสุด: {t.lastUsed}</span>
                    <span className="text-xs text-muted-moss">ใช้งาน {t.uses} ครั้ง</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">แก้ไข</button>
                  <button className="px-3 py-1.5 text-xs bg-muted text-olive-charcoal rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">ลบ</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 space-y-4">
          <h4 className="text-deep-emerald">การตั้งค่าการแจ้งเตือน</h4>
          {[
            { label: "SMS ยืนยันนัดหมาย", desc: "ส่ง SMS เมื่อผู้ป่วยจองนัด", enabled: true },
            { label: "SMS เตือนก่อนนัด 1 ชม.", desc: "แจ้งเตือนผู้ป่วยก่อนพบแพทย์", enabled: true },
            { label: "Email สรุปการรักษา", desc: "ส่ง PDF สรุปหลัง Visit", enabled: true },
            { label: "SMS จัดส่งยา", desc: "แจ้งเมื่อยาถูกจัดส่ง", enabled: true },
            { label: "Email ใบเสร็จ", desc: "ส่งใบเสร็จหลังชำระเงิน", enabled: false },
            { label: "LINE Notification", desc: "แจ้งเตือนผ่าน LINE (ต้องตั้งค่า LINE Channel)", enabled: false },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm text-gray-800">{n.label}</p>
                <p className="text-xs text-muted-moss">{n.desc}</p>
              </div>
              <button className={`w-11 h-6 rounded-full relative transition-all ${n.enabled ? "bg-forest-leaf" : "bg-gray-200"}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${n.enabled ? "right-1" : "left-1"}`} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
