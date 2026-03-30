import { useState } from "react";
import { useNavigate } from "react-router";
import {
  User,
  Stethoscope,
  ShieldCheck,
  Eye,
  EyeOff,
  Leaf,
  ArrowRight,
  Phone,
} from "lucide-react";

const HERB_BG = "https://images.unsplash.com/photo-1656570788633-d6e6bbd48470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaGFpJTIwdHJhZGl0aW9uYWwlMjBtZWRpY2luZSUyMGhlcmJzJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzcyNDM1Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080";

type Role = "patient" | "doctor" | "admin" | null;

const roles = [
  {
    id: "patient" as Role,
    label: "ผู้ป่วย / ผู้รับบริการ",
    sublabel: "Patient Portal",
    icon: User,
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    border: "border-emerald-400",
    textColor: "text-emerald-700",
    path: "/patient",
  },
  {
    id: "doctor" as Role,
    label: "แพทย์ / ผู้ให้บริการ",
    sublabel: "Doctor Portal",
    icon: Stethoscope,
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    border: "border-blue-400",
    textColor: "text-blue-700",
    path: "/doctor",
  },
  {
    id: "admin" as Role,
    label: "ผู้ดูแลระบบ",
    sublabel: "Admin Portal",
    icon: ShieldCheck,
    color: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50",
    border: "border-violet-400",
    textColor: "text-violet-700",
    path: "/admin",
  },
];

export function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"role" | "login">("role");

  const selectedRoleData = roles.find((r) => r.id === selectedRole);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setStep("login");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRoleData) {
      navigate(selectedRoleData.path);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        <img
          src={HERB_BG}
          alt="Thai Traditional Medicine"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/85 via-emerald-800/75 to-teal-900/70" />

        {/* Content over image */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center border border-white/30">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-sm">ระบบ Telemedicine</p>
              <p className="text-white font-semibold">ศูนย์การแพทย์แผนไทย</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-white text-4xl leading-tight">
              การแพทย์แผนไทย
              <br />
              <span className="text-amber-300">ใกล้คุณมากกว่าเดิม</span>
            </h1>
            <p className="text-white/70 mt-4 text-lg leading-relaxed">
              พบแพทย์แผนไทยผ่านวิดีโอคอล รับใบสั่งยาและเอกสารดิจิทัล
              ติดตามการรักษาได้ทุกที่ทุกเวลา
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { num: "1,200+", label: "ผู้ป่วยที่รับบริการ" },
              { num: "98%", label: "ความพึงพอใจ" },
              { num: "24/7", label: "รองรับตลอดเวลา" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-3 text-center"
              >
                <p className="text-amber-300 font-semibold text-xl">{stat.num}</p>
                <p className="text-white/70 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-white/50 text-sm">
          <Phone className="w-4 h-4" />
          <span>สายด่วน 02-XXX-XXXX | ให้บริการ จ–ศ 08:00–17:00 น.</span>
        </div>
      </div>

      {/* Right Panel - Login */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">ระบบ Telemedicine</p>
              <p className="text-gray-900 font-semibold">ศูนย์การแพทย์แผนไทย</p>
            </div>
          </div>

          {step === "role" ? (
            <>
              <div className="mb-8">
                <h2 className="text-gray-900">เข้าสู่ระบบ</h2>
                <p className="text-gray-500 text-sm mt-1">กรุณาเลือกประเภทผู้ใช้งาน</p>
              </div>

              <div className="space-y-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 bg-white hover:border-current transition-all duration-200 group ${role.border} hover:shadow-md`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center flex-shrink-0 shadow-sm`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className={`font-semibold ${role.textColor}`}>{role.label}</p>
                        <p className="text-gray-400 text-sm">{role.sublabel}</p>
                      </div>
                      <ArrowRight
                        className={`w-5 h-5 ${role.textColor} opacity-0 group-hover:opacity-100 transition-opacity`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm">
                  ยังไม่มีบัญชี?{" "}
                  <button className="text-emerald-600 hover:underline">
                    ลงทะเบียนผู้ป่วยใหม่
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep("role")}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-sm transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                เปลี่ยนประเภทผู้ใช้
              </button>

              {selectedRoleData && (
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl ${selectedRoleData.bgLight} border ${selectedRoleData.border} mb-6`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg bg-gradient-to-br ${selectedRoleData.color} flex items-center justify-center`}
                  >
                    {selectedRoleData && (
                      <selectedRoleData.icon className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${selectedRoleData.textColor}`}>
                      {selectedRoleData.label}
                    </p>
                    <p className="text-gray-400 text-xs">{selectedRoleData.sublabel}</p>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-gray-900">ยินดีต้อนรับ</h2>
                <p className="text-gray-500 text-sm mt-1">กรอกชื่อผู้ใช้และรหัสผ่านเพื่อเข้าสู่ระบบ</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">
                    ชื่อผู้ใช้งาน / Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="กรอกชื่อผู้ใช้งาน"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">
                    รหัสผ่าน / Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="กรอกรหัสผ่าน"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-600">จดจำฉัน</span>
                  </label>
                  <button type="button" className="text-sm text-emerald-600 hover:underline">
                    ลืมรหัสผ่าน?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold transition-colors shadow-sm mt-2"
                >
                  เข้าสู่ระบบ
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-gray-50 px-3 text-gray-400 text-sm">หรือ</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full py-2.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors text-sm"
                >
                  เข้าสู่ระบบด้วย OTP (SMS)
                </button>
              </form>

              <p className="text-center text-gray-400 text-xs mt-6">
                ระบบนี้รองรับ TLS 1.3 • เข้ารหัสข้อมูลทุกการรับส่ง
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
