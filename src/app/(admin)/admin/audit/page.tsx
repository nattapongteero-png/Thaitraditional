"use client";

import React, { useState } from "react";
import {
  Search,
  Download,
  Filter,
  User,
  CreditCard,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { PaperIcon } from "../../../components/PaperIcon";
import { TimeCircleIcon } from "../../../components/TimeCircleIcon";

type LogType = "auth" | "record" | "payment" | "signature" | "video" | "api" | "system";

interface LogEntry {
  id: string;
  timestamp: string;
  type: LogType;
  action: string;
  user: string;
  ip: string;
  details: string;
  status: "success" | "warning" | "error";
}

const typeConfig: Record<LogType, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  auth: { label: "Authentication", icon: Shield, color: "text-blue-600 bg-blue-50" },
  record: { label: "Medical Record", icon: PaperIcon, color: "text-forest-leaf bg-pale-mint" },
  payment: { label: "Payment", icon: CreditCard, color: "text-amber-600 bg-amber-50" },
  signature: { label: "Digital Sign", icon: PaperIcon, color: "text-forest-leaf bg-pale-mint" },
  video: { label: "Video Session", icon: TimeCircleIcon, color: "text-teal-600 bg-teal-50" },
  api: { label: "EHP API", icon: Activity, color: "text-indigo-600 bg-indigo-50" },
  system: { label: "System", icon: Activity, color: "text-olive-charcoal bg-muted" },
};

const statusConfig = {
  success: { icon: CheckCircle2, color: "text-forest-leaf bg-pale-mint", label: "สำเร็จ" },
  warning: { icon: AlertTriangle, color: "text-amber-500 bg-amber-50", label: "เตือน" },
  error: { icon: AlertTriangle, color: "text-red-500 bg-red-50", label: "ผิดพลาด" },
};

const logs: LogEntry[] = [
  { id: "LOG-001", timestamp: "02/03/2026 10:47:23", type: "signature", action: "Document Signed", user: "นพ. สมชาย แพทย์ไทย", ip: "192.168.1.10", details: "ENC-20260302-0034 | SHA256: a3f8b2c1...", status: "success" },
  { id: "LOG-002", timestamp: "02/03/2026 10:45:10", type: "payment", action: "Payment Confirmed", user: "ระบบ (Webhook)", ip: "10.0.0.5", details: "PAY-20260302-0034 | ฿900 | PromptPay", status: "success" },
  { id: "LOG-003", timestamp: "02/03/2026 10:23:41", type: "video", action: "Video Session Started", user: "นพ. สมชาย แพทย์ไทย", ip: "192.168.1.10", details: "ENC-0034 | Patient: HN-0003456 | Room: enc0034_x7f2", status: "success" },
  { id: "LOG-004", timestamp: "02/03/2026 10:05:17", type: "record", action: "Medical Record Accessed", user: "นพ. สมชาย แพทย์ไทย", ip: "192.168.1.10", details: "HN-0003456 | Read: History, Allergies", status: "success" },
  { id: "LOG-005", timestamp: "02/03/2026 09:58:32", type: "api", action: "EHP Sync Success", user: "ระบบ", ip: "10.0.0.1", details: "GET /appointments?date=2026-03-02 | 12 records", status: "success" },
  { id: "LOG-006", timestamp: "02/03/2026 09:45:11", type: "auth", action: "Login Success", user: "นพ. สมชาย แพทย์ไทย", ip: "192.168.1.10", details: "Browser: Chrome 122 | MFA: ✓", status: "success" },
  { id: "LOG-007", timestamp: "02/03/2026 09:42:50", type: "auth", action: "Login Failed (3 attempts)", user: "user@unknown.com", ip: "203.xxx.xxx.xxx", details: "Account locked for 30 minutes", status: "error" },
  { id: "LOG-008", timestamp: "02/03/2026 09:10:05", type: "auth", action: "Admin Login", user: "Admin", ip: "192.168.1.1", details: "Browser: Firefox 123 | MFA: ✓", status: "success" },
  { id: "LOG-009", timestamp: "02/03/2026 08:55:30", type: "api", action: "EHP API Timeout", user: "ระบบ", ip: "10.0.0.1", details: "GET /patients?hn=HN-0001 | Retry 2/2 | Fallback to local", status: "warning" },
  { id: "LOG-010", timestamp: "02/03/2026 08:30:00", type: "system", action: "System Startup", user: "ระบบ", ip: "10.0.0.1", details: "All services initialized successfully", status: "success" },
  { id: "LOG-011", timestamp: "01/03/2026 17:30:15", type: "record", action: "SOAP Note Saved", user: "นพ. วิภา สมุนไพร", ip: "192.168.1.11", details: "ENC-20260301-0033 | ICD-10: J30.1", status: "success" },
  { id: "LOG-012", timestamp: "01/03/2026 16:50:44", type: "signature", action: "Document Signed", user: "นพ. วิภา สมุนไพร", ip: "192.168.1.11", details: "ENC-20260301-0033 | PDF × 3 เอกสาร", status: "success" },
];

// ── Sub-component keeps Fragment away from Figma's prop injection ──
function LogTableRow({
  log,
  isExpanded,
  onToggle,
}: {
  log: LogEntry;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const type = typeConfig[log.type];
  const TypeIcon = type.icon;
  const status = statusConfig[log.status];
  const StatusIcon = status.icon;

  return (
    <>
      <tr className={`hover:bg-pale-mint/50 transition-colors ${isExpanded ? "bg-gray-50/50" : ""}`}>
        <td className="px-5 py-3">
          <div className="flex items-center gap-1 text-xs text-muted-moss">
            <Activity className="w-3 h-3" />
            <span className="font-mono">{log.timestamp}</span>
          </div>
        </td>
        <td className="px-5 py-3">
          <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg ${type.color}`}>
            <TypeIcon className="w-3 h-3" />
            <span className="hidden sm:inline">{type.label}</span>
          </span>
        </td>
        <td className="px-5 py-3">
          <p className="text-sm text-gray-800">{log.action}</p>
          <p className="text-xs text-muted-moss lg:hidden">{log.user}</p>
        </td>
        <td className="px-5 py-3 hidden md:table-cell">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-muted-moss" />
            </div>
            <span className="text-xs text-olive-charcoal truncate max-w-32">{log.user}</span>
          </div>
        </td>
        <td className="px-5 py-3 hidden lg:table-cell">
          <span className="text-xs font-mono text-muted-moss">{log.ip}</span>
        </td>
        <td className="px-5 py-3">
          <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg ${status.color}`}>
            <StatusIcon className="w-3 h-3" />
            {status.label}
          </span>
        </td>
        <td className="px-5 py-3">
          <button
            onClick={onToggle}
            className="p-1 hover:bg-pale-mint rounded-lg transition-colors"
          >
            <ChevronDown className={`w-4 h-4 text-muted-moss transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-50/80">
          <td colSpan={7} className="px-5 py-3">
            <div className="flex items-start gap-3">
              <div className="text-xs font-mono text-muted-moss bg-white rounded-lg px-3 py-2 border border-border flex-1">
                <span className="text-forest-leaf">LOG_ID:</span> {log.id}&nbsp;&nbsp;
                <span className="text-forest-leaf">Details:</span> {log.details}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function Page() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<LogType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "success" | "warning" | "error">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = logs.filter((l) => {
    const matchSearch =
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.id.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || l.type === typeFilter;
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[#20211F]">Audit Log</h2>
          <p className="text-muted-moss text-sm mt-1">บันทึกการใช้งานระบบและการเข้าถึงเวชระเบียน</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border text-olive-charcoal rounded-xl text-sm font-medium hover:bg-pale-mint transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "รวมทั้งหมด", value: logs.length, color: "text-[#20211F]" },
          { label: "คำเตือน", value: logs.filter((l) => l.status === "warning").length, color: "text-amber-700" },
          { label: "ผิดพลาด", value: logs.filter((l) => l.status === "error").length, color: "text-red-700" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-border shadow-sm">
            <p className={`text-xl font-semibold ${s.color}`}>{s.value}</p>
            <p className="text-muted-moss text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-moss" />
          <input
            type="text"
            placeholder="ค้นหา action, ผู้ใช้, Log ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-forest-leaf text-sm w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5 text-muted-moss" />
            <span className="text-xs text-muted-moss">ประเภท:</span>
          </div>
          {(["all", "auth", "record", "payment", "signature", "video", "api"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                typeFilter === t
                  ? "bg-forest-leaf text-white"
                  : "bg-white border border-border text-olive-charcoal hover:bg-pale-mint"
              }`}
            >
              {t === "all" ? "ทั้งหมด" : typeConfig[t]?.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 mr-2">
            <span className="text-xs text-muted-moss">สถานะ:</span>
          </div>
          {(["all", "success", "warning", "error"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                statusFilter === s
                  ? s === "all" ? "bg-slate-700 text-white" : s === "success" ? "bg-forest-leaf text-white" : s === "warning" ? "bg-amber-500 text-white" : "bg-red-600 text-white"
                  : "bg-white border border-border text-olive-charcoal hover:bg-pale-mint"
              }`}
            >
              {s === "all" ? "ทั้งหมด" : s === "success" ? "สำเร็จ" : s === "warning" ? "คำเตือน" : "ผิดพลาด"}
            </button>
          ))}
        </div>
      </div>

      {/* Log Table */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-xs text-muted-moss font-medium">เวลา</th>
                <th className="text-left px-5 py-3 text-xs text-muted-moss font-medium">ประเภท</th>
                <th className="text-left px-5 py-3 text-xs text-muted-moss font-medium">Action</th>
                <th className="text-left px-5 py-3 text-xs text-muted-moss font-medium hidden md:table-cell">ผู้ใช้</th>
                <th className="text-left px-5 py-3 text-xs text-muted-moss font-medium hidden lg:table-cell">IP</th>
                <th className="text-left px-5 py-3 text-xs text-muted-moss font-medium">สถานะ</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((log) => (
                <LogTableRow
                  key={log.id}
                  log={log}
                  isExpanded={expanded === log.id}
                  onToggle={() => setExpanded(expanded === log.id ? null : log.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
