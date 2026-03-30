"use client";

import { Plus, Search, Copy, Pencil, Trash2 } from "lucide-react";
import { PaperIcon } from "../../../components/PaperIcon";
import { useState } from "react";

const mockTemplates = [
  {
    id: "1",
    name: "ตรวจทั่วไป - ไข้หวัด",
    category: "อายุรกรรม",
    lastUsed: "02/03/2026",
    uses: 48,
    diagnosis: "ICD-10: J00 - Upper respiratory infection",
    herbs: ["ฟ้าทะลายโจร 500 mg", "ขิง 300 mg"],
  },
  {
    id: "2",
    name: "ปวดเมื่อย - กล้ามเนื้อ",
    category: "เวชกรรมไทย",
    lastUsed: "01/03/2026",
    uses: 35,
    diagnosis: "ICD-10: M79.3 - Panniculitis",
    herbs: ["ไพล 400 mg", "กระเจี๊ยบแดง 200 mg"],
  },
  {
    id: "3",
    name: "โรคกระเพาะ",
    category: "อายุรกรรม",
    lastUsed: "28/02/2026",
    uses: 27,
    diagnosis: "ICD-10: K29.7 - Gastritis",
    herbs: ["ขมิ้นชัน 500 mg", "เถาวัลย์เปรียง 300 mg"],
  },
  {
    id: "4",
    name: "นอนไม่หลับ",
    category: "จิตเวชศาสตร์",
    lastUsed: "25/02/2026",
    uses: 19,
    diagnosis: "ICD-10: G47.0 - Insomnia",
    herbs: ["ใบเตย 200 mg", "ดอกคำฝอย 150 mg"],
  },
];

export default function Page() {
  const [search, setSearch] = useState("");

  const filtered = mockTemplates.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl text-deep-emerald">แม่แบบการรักษา</h1>
          <p className="text-sm text-muted-moss mt-1">
            บันทึกรูปแบบการรักษาที่ใช้บ่อย เพื่อเรียกใช้ได้รวดเร็ว
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition-colors flex-shrink-0">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">สร้างแม่แบบ</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-moss" />
        <input
          type="text"
          placeholder="ค้นหาแม่แบบ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Template cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl border border-border shadow-sm p-5 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <PaperIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-deep-emerald">{t.name}</p>
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {t.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-pale-mint rounded-lg transition-colors text-muted-moss hover:text-olive-charcoal">
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 hover:bg-pale-mint rounded-lg transition-colors text-muted-moss hover:text-olive-charcoal">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-muted-moss hover:text-red-500">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-xs text-muted-moss bg-warm-sand rounded-lg px-3 py-2">
              <p>{t.diagnosis}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {t.herbs.map((h) => (
                <span
                  key={h}
                  className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100"
                >
                  {h}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-muted-moss pt-1 border-t border-gray-50">
              <span>ใช้ล่าสุด: {t.lastUsed}</span>
              <span>ใช้งาน {t.uses} ครั้ง</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="md:col-span-2 text-center py-16 text-muted-moss">
            <PaperIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">ไม่พบแม่แบบที่ตรงกัน</p>
          </div>
        )}
      </div>
    </div>
  );
}
