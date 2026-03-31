"use client";

import {
  Users,
  TrendingUp,
  Activity,
  AlertTriangle,
  BarChart2,
  CheckCircle2,
} from "lucide-react";
import { VideoIcon } from "../../components/VideoIcon";
import { CalendarIcon } from "../../components/CalendarIcon";
import { TimeCircleIcon } from "../../components/TimeCircleIcon";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const visitData = [
  { day: "จ", visits: 8, revenue: 4200 },
  { day: "อ", visits: 12, revenue: 6800 },
  { day: "พ", visits: 10, revenue: 5500 },
  { day: "พฤ", visits: 15, revenue: 8100 },
  { day: "ศ", visits: 14, revenue: 7600 },
  { day: "ส", visits: 6, revenue: 3200 },
  { day: "อา", visits: 4, revenue: 2100 },
];

const weeklyRevenue = [
  { week: "ส.1", revenue: 28500 },
  { week: "ส.2", revenue: 34200 },
  { week: "ส.3", revenue: 29800 },
  { week: "ส.4", revenue: 41600 },
  { week: "ส.5", revenue: 37400 },
  { week: "ส.6", revenue: 44100 },
  { week: "ส.7", revenue: 38900 },
  { week: "ส.8", revenue: 52300 },
];

const diagnosisData = [
  { name: "ไมเกรน", value: 28, color: "#6366f1" },
  { name: "ปวดหลัง", value: 22, color: "#0ea5e9" },
  { name: "ภูมิแพ้", value: 18, color: "#10b981" },
  { name: "อ่อนเพลีย", value: 15, color: "#f59e0b" },
  { name: "อื่นๆ", value: 17, color: "#94a3b8" },
];

const recentActivity = [
  { id: 1, action: "Visit ENC-0034 เสร็จสิ้น", user: "นพ. สมชาย", time: "5 นาทีที่แล้ว", type: "success" },
  { id: 2, action: "ผู้ใช้ใหม่ลงทะเบียน: นาย ทดสอบ", user: "ระบบ", time: "12 นาทีที่แล้ว", type: "info" },
  { id: 3, action: "Payment PAY-0033 สำเร็จ ฿900", user: "ระบบ", time: "23 นาทีที่แล้ว", type: "success" },
  { id: 4, action: "Login ผิดพลาด 3 ครั้ง: user@xxx", user: "ระบบ", time: "45 นาทีที่แล้ว", type: "warning" },
  { id: 5, action: "Template 'ไมเกรน' อัปเดต", user: "Admin", time: "1 ชม.ที่แล้ว", type: "info" },
  { id: 6, action: "EHP sync สำเร็จ: 12 รายการ", user: "ระบบ", time: "2 ชม.ที่แล้ว", type: "success" },
];

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#20211F]">แดชบอร์ด</h2>
        <p className="text-muted-moss text-sm mt-1">ภาพรวมระบบ Telemedicine วันจันทร์ที่ 2 มีนาคม 2569</p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "ผู้ป่วยทั้งหมด",
            value: "1,284",
            change: "+23",
            changeLabel: "เดือนนี้",
            icon: Users,
            color: "text-forest-leaf",
            bg: "bg-pale-mint",
            border: "border-pale-mint",
          },
          {
            label: "นัดวันนี้",
            value: "12",
            change: "+2",
            changeLabel: "จากเมื่อวาน",
            icon: CalendarIcon,
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-100",
          },
          {
            label: "Video Sessions วันนี้",
            value: "5",
            change: "3 รอ",
            changeLabel: "ดำเนินการ",
            icon: VideoIcon,
            color: "text-forest-leaf",
            bg: "bg-pale-mint",
            border: "border-pale-mint",
          },
          {
            label: "รายได้วันนี้",
            value: "฿37,400",
            change: "+12%",
            changeLabel: "vs เมื่อวาน",
            icon: TrendingUp,
            color: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-100",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`bg-white rounded-2xl border ${stat.border} p-5 shadow-sm`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs text-forest-leaf bg-pale-mint px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-semibold text-[#20211F]">{stat.value}</p>
              <p className="text-muted-moss text-xs mt-0.5">{stat.label}</p>
              <p className="text-muted-moss text-xs">{stat.changeLabel}</p>
            </div>
          );
        })}
      </div>

      {/* System Health */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "EHP API", status: "online", value: "45ms" },
          { label: "Payment Gateway", status: "online", value: "120ms" },
          { label: "Jitsi Server", status: "online", value: "32ms" },
          { label: "MOPH CA", status: "warning", value: "timeout" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-3 border flex items-center gap-3
            ${s.status === "online" ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}>
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.status === "online" ? "bg-green-500 animate-pulse" : "bg-amber-500"}`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-olive-charcoal truncate">{s.label}</p>
              <p className={`text-xs ${s.status === "online" ? "text-green-600" : "text-amber-600"}`}>{s.value}</p>
            </div>
            {s.status === "online" ? (
              <Activity className="w-4 h-4 text-green-500 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visit Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[#20211F]">จำนวน Visit รายวัน (สัปดาห์นี้)</h4>
            <BarChart2 className="w-4 h-4 text-muted-moss" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={visitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: "12px" }}
              />
              <Area type="monotone" dataKey="visits" stroke="#7c3aed" fill="#ede9fe" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Diagnosis Pie */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
          <h4 className="text-[#20211F] mb-4">สัดส่วนการวินิจฉัย</h4>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={diagnosisData} cx="50%" cy="50%" outerRadius={65} dataKey="value" strokeWidth={2} stroke="#fff">
                {diagnosisData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value}%`, name]}
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {diagnosisData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-xs text-olive-charcoal">{d.name}</span>
                </div>
                <span className="text-xs font-medium text-olive-charcoal">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
        <h4 className="text-[#20211F] mb-4">รายได้รายสัปดาห์ (บาท)</h4>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={weeklyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
            <Tooltip
              formatter={(v: number) => [`฿${v.toLocaleString()}`, "รายได้"]}
              contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: "12px" }}
            />
            <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <h4 className="text-[#20211F]">กิจกรรมล่าสุด (Audit)</h4>
          <button className="text-forest-leaf text-sm hover:underline">ดูทั้งหมด →</button>
        </div>
        <div className="divide-y divide-gray-50">
          {recentActivity.map((act) => {
            const typeConfig = {
              success: { icon: CheckCircle2, color: "text-forest-leaf bg-pale-mint" },
              info: { icon: Activity, color: "text-blue-500 bg-blue-50" },
              warning: { icon: AlertTriangle, color: "text-amber-500 bg-amber-50" },
            };
            const cfg = typeConfig[act.type as keyof typeof typeConfig];
            const Icon = cfg.icon;
            return (
              <div key={act.id} className="px-5 py-3 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 truncate">{act.action}</p>
                  <p className="text-xs text-muted-moss">โดย {act.user}</p>
                </div>
                <div className="flex items-center gap-1 text-muted-moss text-xs flex-shrink-0">
                  <TimeCircleIcon className="w-3 h-3" />
                  {act.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
