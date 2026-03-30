import { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Shield,
  UserX,
  ChevronDown,
  X,
  Check,
  User,
  Stethoscope,
  ShieldCheck,
  Users,
} from "lucide-react";

type Role = "PATIENT" | "DOCTOR" | "ADMIN" | "ONE_PERSON_CLINIC";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "inactive";
  lastLogin: string;
  createdAt: string;
}

const roleConfig: Record<Role, { label: string; color: string; icon: typeof User }> = {
  PATIENT: { label: "ผู้ป่วย", color: "bg-emerald-100 text-emerald-700", icon: User },
  DOCTOR: { label: "แพทย์", color: "bg-blue-100 text-blue-700", icon: Stethoscope },
  ADMIN: { label: "ผู้ดูแลระบบ", color: "bg-violet-100 text-violet-700", icon: ShieldCheck },
  ONE_PERSON_CLINIC: { label: "One-Person Clinic", color: "bg-amber-100 text-amber-700", icon: Users },
};

const mockUsers: UserRecord[] = [
  { id: "U001", name: "นพ. สมชาย แพทย์ไทย", email: "somchai@thaimed.go.th", role: "ONE_PERSON_CLINIC", status: "active", lastLogin: "วันนี้ 08:45", createdAt: "1 ม.ค. 2569" },
  { id: "U002", name: "นพ. วิภา สมุนไพร", email: "wipa@thaimed.go.th", role: "DOCTOR", status: "active", lastLogin: "เมื่อวาน 14:20", createdAt: "15 ม.ค. 2569" },
  { id: "U003", name: "Admin หลัก", email: "admin@thaimed.go.th", role: "ADMIN", status: "active", lastLogin: "วันนี้ 09:10", createdAt: "1 ม.ค. 2569" },
  { id: "U004", name: "นางสาว สมใจ รักสุขภาพ", email: "somjai@email.com", role: "PATIENT", status: "active", lastLogin: "วันนี้ 10:05", createdAt: "20 ก.พ. 2569" },
  { id: "U005", name: "นาย สมศักดิ์ รักแผนไทย", email: "somsak@email.com", role: "PATIENT", status: "active", lastLogin: "เมื่อวาน 11:30", createdAt: "5 ก.พ. 2569" },
  { id: "U006", name: "นาง วิไล สุขภาพดี", email: "wilai@email.com", role: "PATIENT", status: "active", lastLogin: "วันนี้ 10:00", createdAt: "10 ม.ค. 2569" },
  { id: "U007", name: "นาย ประยุทธ์ ไม่ใช้งาน", email: "prayuth@email.com", role: "PATIENT", status: "inactive", lastLogin: "30 ธ.ค. 2568", createdAt: "15 ธ.ค. 2568" },
  { id: "U008", name: "นพ. ประยุทธ สุขภาพ", email: "prayuth.dr@thaimed.go.th", role: "DOCTOR", status: "active", lastLogin: "เมื่อวาน 09:15", createdAt: "20 ม.ค. 2569" },
];

export function UserManagement() {
  const [users, setUsers] = useState<UserRecord[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all");
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "PATIENT" as Role });

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const toggleStatus = (id: string) => {
    setUsers((us) =>
      us.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
      )
    );
  };

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    doctors: users.filter((u) => u.role === "DOCTOR" || u.role === "ONE_PERSON_CLINIC").length,
    patients: users.filter((u) => u.role === "PATIENT").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-gray-900">จัดการผู้ใช้งาน (RBAC)</h2>
          <p className="text-gray-500 text-sm mt-1">จัดการบัญชีผู้ใช้และสิทธิ์การเข้าถึง</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          เพิ่มผู้ใช้
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "ผู้ใช้ทั้งหมด", value: stats.total, color: "text-gray-900" },
          { label: "ใช้งานอยู่", value: stats.active, color: "text-emerald-700" },
          { label: "แพทย์", value: stats.doctors, color: "text-blue-700" },
          { label: "ผู้ป่วย", value: stats.patients, color: "text-violet-700" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className={`text-2xl font-semibold ${s.color}`}>{s.value}</p>
            <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาชื่อ, อีเมล..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 text-sm w-full"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "PATIENT", "DOCTOR", "ONE_PERSON_CLINIC", "ADMIN"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-2 rounded-xl text-sm transition-all ${
                roleFilter === r
                  ? "bg-violet-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {r === "all" ? "ทั้งหมด" : roleConfig[r]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">ผู้ใช้</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium hidden md:table-cell">อีเมล</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">บทบาท</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium hidden lg:table-cell">เข้าสู่ระบบล่าสุด</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">สถานะ</th>
                <th className="text-right px-5 py-3 text-xs text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((user) => {
                const role = roleConfig[user.role];
                const RoleIcon = role.icon;
                return (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <RoleIcon className="w-4 h-4 text-violet-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-400 md:hidden">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-sm text-gray-600">{user.email}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-medium ${role.color}`}>
                        <RoleIcon className="w-3 h-3" />
                        {role.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-xs text-gray-500">{user.lastLogin}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700"
                            : "bg-red-100 text-red-700 hover:bg-green-100 hover:text-green-700"
                        }`}
                      >
                        {user.status === "active" ? "✓ ใช้งาน" : "✗ ปิดการใช้"}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors text-gray-400">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-violet-50 hover:text-violet-600 rounded-lg transition-colors text-gray-400">
                          <Shield className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors text-gray-400">
                          <UserX className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-gray-900">เพิ่มผู้ใช้ใหม่</h3>
              <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-sm text-gray-700 block mb-1.5">ชื่อ-นามสกุล</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="ชื่อผู้ใช้"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-400 text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 block mb-1.5">อีเมล</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-400 text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 block mb-1.5">บทบาท (Role)</label>
                <div className="relative">
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as Role })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-400 text-sm appearance-none"
                  >
                    {(Object.keys(roleConfig) as Role[]).map((r) => (
                      <option key={r} value={r}>{roleConfig[r].label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAdd(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={() => {
                    if (newUser.name && newUser.email) {
                      const u: UserRecord = {
                        id: `U${String(users.length + 1).padStart(3, "0")}`,
                        ...newUser,
                        status: "active",
                        lastLogin: "ยังไม่เข้าระบบ",
                        createdAt: "2 มี.ค. 2569",
                      };
                      setUsers([u, ...users]);
                      setNewUser({ name: "", email: "", role: "PATIENT" });
                      setShowAdd(false);
                    }
                  }}
                  className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  เพิ่มผู้ใช้
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
