import { BarChart2, TrendingUp, Users } from "lucide-react";
import { TimeCircleIcon } from "../../components/TimeCircleIcon";

export function DoctorReports() {
  const stats = [
    {
      label: "ผู้ป่วยทั้งหมด (เดือนนี้)",
      value: "148",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "การนัดหมายสำเร็จ",
      value: "132",
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "เวลาตรวจเฉลี่ย",
      value: "22 นาที",
      icon: TimeCircleIcon,
      color: "bg-amber-100 text-amber-600",
    },
    {
      label: "อัตราความพึงพอใจ",
      value: "96%",
      icon: BarChart2,
      color: "bg-violet-100 text-violet-600",
    },
  ];

  const recentData = [
    { week: "สัปดาห์ที่ 1", patients: 34, completed: 32 },
    { week: "สัปดาห์ที่ 2", patients: 38, completed: 35 },
    { week: "สัปดาห์ที่ 3", patients: 41, completed: 38 },
    { week: "สัปดาห์ที่ 4", patients: 35, completed: 27 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl text-gray-900">รายงาน</h1>
        <p className="text-sm text-gray-500 mt-1">สรุปข้อมูลการให้บริการของคุณ</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Weekly table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm text-gray-700">สรุปรายสัปดาห์ (เดือนนี้)</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-5 py-3 text-gray-500">สัปดาห์</th>
              <th className="text-right px-5 py-3 text-gray-500">ผู้ป่วยทั้งหมด</th>
              <th className="text-right px-5 py-3 text-gray-500">ตรวจเสร็จ</th>
              <th className="text-right px-5 py-3 text-gray-500">อัตราสำเร็จ</th>
            </tr>
          </thead>
          <tbody>
            {recentData.map((row) => (
              <tr
                key={row.week}
                className="border-t border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-3 text-gray-700">{row.week}</td>
                <td className="px-5 py-3 text-right text-gray-700">{row.patients}</td>
                <td className="px-5 py-3 text-right text-gray-700">{row.completed}</td>
                <td className="px-5 py-3 text-right">
                  <span className="text-green-600">
                    {Math.round((row.completed / row.patients) * 100)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}