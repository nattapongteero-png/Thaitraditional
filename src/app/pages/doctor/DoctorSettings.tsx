import { Shield, Monitor } from "lucide-react";
import { NotificationIcon } from "../../components/NotificationIcon";
import { TimeCircleIcon } from "../../components/TimeCircleIcon";
import { useState } from "react";

type NotifKey = "newPatient" | "reminder" | "report";

interface NotifState {
  newPatient: boolean;
  reminder: boolean;
  report: boolean;
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative flex-shrink-0 w-10 h-6 rounded-full transition-colors ${
        checked ? "bg-blue-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function DoctorSettings() {
  const [notifications, setNotifications] = useState<NotifState>({
    newPatient: true,
    reminder: true,
    report: false,
  });
  const [consultTime, setConsultTime] = useState("20");
  const [breakTime, setBreakTime] = useState("5");

  const toggleNotif = (key: NotifKey) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const notifItems: { key: NotifKey; label: string; desc: string }[] = [
    {
      key: "newPatient",
      label: "แจ้งเตือนเมื่อมีผู้ป่วยเข้าคิวใหม่",
      desc: "รับแจ้งเตือนทันทีเมื่อผู้ป่วยลงทะเบียน",
    },
    {
      key: "reminder",
      label: "แจ้งเตือนก่อนนัดหมาย",
      desc: "แจ้งเตือน 15 นาทีก่อนการนัดหมายถัดไป",
    },
    {
      key: "report",
      label: "รายงานรายวัน",
      desc: "ส่งสรุปรายวันผ่านอีเมล",
    },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl text-gray-900">ตั้งค่า</h1>
        <p className="text-sm text-gray-500 mt-1">
          ปรับแต่งการทำงานของ Doctor Portal
        </p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-500" />
          <h2 className="text-sm text-gray-700">ข้อมูลแพทย์</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "ชื่อ-นามสกุล", value: "นพ. สมชาย แพทย์ไทย", readOnly: true },
            { label: "ใบอนุญาตประกอบวิชาชีพ", value: "MTT-12345", readOnly: true },
            { label: "ความเชี่ยวชาญ", value: "แพทย์แผนไทยประยุกต์", readOnly: false },
            { label: "เบอร์โทรศัพท์", value: "081-234-5678", readOnly: false },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-xs text-gray-500 mb-1">
                {field.label}
              </label>
              <input
                type="text"
                defaultValue={field.value}
                readOnly={field.readOnly}
                className={`w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  field.readOnly
                    ? "bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed"
                    : "border-gray-200 text-gray-700"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-2">
          <TimeCircleIcon className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm text-gray-700">เวลาตรวจ</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              เวลาตรวจต่อราย (นาที)
            </label>
            <select
              value={consultTime}
              onChange={(e) => setConsultTime(e.target.value)}
              className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-no-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundPosition: "right 12px center",
              }}
            >
              {["10", "15", "20", "30", "45", "60"].map((v) => (
                <option key={v} value={v}>
                  {v} นาที
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              พักระหว่างราย (นาที)
            </label>
            <select
              value={breakTime}
              onChange={(e) => setBreakTime(e.target.value)}
              className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-no-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundPosition: "right 12px center",
              }}
            >
              {["0", "5", "10", "15"].map((v) => (
                <option key={v} value={v}>
                  {v} นาที
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-2">
          <NotificationIcon className="w-4 h-4 text-violet-500" />
          <h2 className="text-sm text-gray-700">การแจ้งเตือน</h2>
        </div>
        {notifItems.map((n) => (
          <div key={n.key} className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-gray-700">{n.label}</p>
              <p className="text-xs text-gray-400">{n.desc}</p>
            </div>
            <Toggle
              checked={notifications[n.key]}
              onChange={() => toggleNotif(n.key)}
            />
          </div>
        ))}
      </div>

      {/* Display */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-green-500" />
          <h2 className="text-sm text-gray-700">การแสดงผล</h2>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">ภาษาของระบบ</label>
          <select
            className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-no-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundPosition: "right 12px center",
            }}
          >
            <option value="th">ภาษาไทย</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition-colors">
          บันทึกการตั้งค่า
        </button>
      </div>
    </div>
  );
}